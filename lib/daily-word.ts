import { EN_EASY, EN_HARD, EN_MEDIUM } from './word-list-en'
import { PT_EASY, PT_HARD, PT_MEDIUM } from './word-list-pt'

/**
 * The word everyone gets today.
 *
 * Five letters, always, and the difficulty climbs on a three-day cycle: an
 * easy one, then a middling one, then a hard one, and round again. Which word
 * inside the band is fixed for the day but unguessable from the one before.
 *
 * The lists are written out rather than taken from the course vocabulary,
 * which only held fifty five-letter words — fifty days before the game starts
 * repeating itself. There are over four hundred now per course, and a band is
 * only revisited after it has been used through, so no answer comes back
 * inside a year.
 */

/** Accents are shown but never typed; "irmão" is answered with "irmao". */
export function plain(word: string): string {
  return word.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

export const WORD_LENGTH = 5

export type Band = 'easy' | 'medium' | 'hard'
export const BANDS: readonly Band[] = ['easy', 'medium', 'hard']

const LISTS: Record<'en' | 'pt', Record<Band, readonly string[]>> = {
  en: { easy: EN_EASY, medium: EN_MEDIUM, hard: EN_HARD },
  pt: { easy: PT_EASY, medium: PT_MEDIUM, hard: PT_HARD },
}

function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function seedFrom(text: string): number {
  let h = 2166136261
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/** One fixed order per band, so yesterday's word stays yesterday's word. */
function shuffleOf(course: 'en' | 'pt', band: Band): string[] {
  const words = [...LISTS[course][band]].sort()
  const rng = mulberry32(seedFrom(`${course}:${band}`))
  for (let i = words.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[words[i], words[j]] = [words[j], words[i]]
  }
  return words
}

const CYCLES: Record<'en' | 'pt', Record<Band, string[]>> = {
  en: { easy: shuffleOf('en', 'easy'), medium: shuffleOf('en', 'medium'), hard: shuffleOf('en', 'hard') },
  pt: { easy: shuffleOf('pt', 'easy'), medium: shuffleOf('pt', 'medium'), hard: shuffleOf('pt', 'hard') },
}

/**
 * Which day it is, counted from a fixed start.
 *
 * The day turns over at midnight in Brazil rather than UTC, which would change
 * the word at nine in the evening — in the middle of when people study. One
 * clock for everybody is also the point: the word is meant to be the same one
 * your friend is trying.
 */
const BRAZIL_OFFSET_MS = 3 * 60 * 60 * 1000
const EPOCH = Date.UTC(2026, 0, 1)

export function dayNumber(now: Date = new Date()): number {
  return Math.floor((now.getTime() - BRAZIL_OFFSET_MS - EPOCH) / 86400000)
}

/** A stable label for the day, used to key what has been played. */
export function dayKey(now: Date = new Date()): string {
  const shifted = new Date(now.getTime() - BRAZIL_OFFSET_MS)
  return shifted.toISOString().slice(0, 10)
}

/** Milliseconds until the word changes. */
export function msUntilNextWord(now: Date = new Date()): number {
  const shifted = now.getTime() - BRAZIL_OFFSET_MS
  return 86400000 - (((shifted % 86400000) + 86400000) % 86400000)
}

/** Which band today falls on: easy, then medium, then hard, then round again. */
export function bandOfTheDay(now: Date = new Date()): Band {
  const day = dayNumber(now)
  return BANDS[((day % 3) + 3) % 3]
}

export function wordOfTheDay(course: 'en' | 'pt', now: Date = new Date()): string {
  const day = dayNumber(now)
  const band = bandOfTheDay(now)
  const cycle = CYCLES[course][band]
  // Each band advances once every three days, so it is used right through
  // before any word in it comes back.
  const step = Math.floor(day / 3)
  return cycle[((step % cycle.length) + cycle.length) % cycle.length]
}

/** How many days before any answer repeats. */
export function daysBeforeRepeat(course: 'en' | 'pt'): number {
  return 3 * Math.min(...BANDS.map(b => CYCLES[course][b].length))
}

export function poolSize(course: 'en' | 'pt'): number {
  return BANDS.reduce((n, b) => n + CYCLES[course][b].length, 0)
}

export type Mark = 'right' | 'moved' | 'absent'

/**
 * Scores a guess the way Wordle does, which is less obvious than it looks.
 *
 * A letter is only ever credited once. Guess "ovo" against "oco" and the
 * second "o" is not "somewhere else" — the answer's two o's are both already
 * accounted for by the first and third positions. So exact matches are taken
 * first and spent, and only what is left over can be marked as misplaced.
 */
export function scoreGuess(guess: string, answer: string): Mark[] {
  const g = plain(guess).split('')
  const a = plain(answer).split('')
  const marks: Mark[] = new Array(g.length).fill('absent')

  const left = new Map<string, number>()
  g.forEach((letter, i) => {
    if (letter === a[i]) marks[i] = 'right'
    else left.set(a[i], (left.get(a[i]) ?? 0) + 1)
  })

  g.forEach((letter, i) => {
    if (marks[i] === 'right') return
    const remaining = left.get(letter) ?? 0
    if (remaining > 0) {
      marks[i] = 'moved'
      left.set(letter, remaining - 1)
    }
  })

  return marks
}

/**
 * What comes back from a guess.
 *
 * A guess of five letters that is not a word is not a wrong guess — it is not
 * a guess at all, so it is told apart here and costs no try.
 */
export type GuessResult =
  | { ok: true; marks: Mark[] }
  | { ok: false; reason: 'unknown-word' }

export const MAX_TRIES = 6
