import type { Unit } from './curriculum'
import { wrongGender } from './gender'
import { normaliseForSpeech } from './speech-text'

/**
 * The unit's dialogue, turned into a conversation the learner is in.
 *
 * Every unit already carries a scene and a short exchange between two people.
 * Read, that is a text; played, with the learner holding one side and choosing
 * what they say, it is the closest thing here to using the language with
 * somebody. Nothing new is authored — the roleplay is the dialogue, seen from
 * the inside.
 *
 * In the Portuguese course one of the wrong answers is the same line with its
 * agreement in the wrong gender, because that is the mistake English speakers
 * keep making and the one a multiple choice can corner them on. The English
 * course has no such thing to get wrong, so its distractors are other lines.
 */

export type RoleplayTurn = {
  /** What the other person says first. Usually one line, sometimes two. */
  cues: { text: string; translation: string }[]
  options: string[]
  answerIndex: number
  /** What the right answer means, shown once it is chosen. */
  translation: string
  /** The wrong option that is a gender slip, when there is one. */
  genderTrap: string | null
}

export type Roleplay = {
  scene: string
  /** Who the learner is playing, for the label above the conversation. */
  side: 'a' | 'b'
  turns: RoleplayTurn[]
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

function shuffled<T>(list: readonly T[], rng: () => number): T[] {
  const out = list.slice()
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

const same = (a: string, b: string) => a.trim().toLowerCase() === b.trim().toLowerCase()

/**
 * `teaches` is the language being taught. Gender traps are only built for
 * Portuguese; English has no agreement to get wrong.
 */
export function buildRoleplay(unit: Unit, teaches: string, seed: string): Roleplay | null {
  const lines = unit.dialogue?.lines ?? []
  if (lines.length < 3) return null

  const rng = mulberry32(seedFrom(seed))
  const portuguese = !teaches.startsWith('en')

  // The learner takes whichever side says more, so the conversation gives them
  // the most to do. A tie goes to the second speaker, since the first usually
  // only opens.
  const countA = lines.filter(l => l.sp === 'a').length
  const side: 'a' | 'b' = countA > lines.filter(l => l.sp === 'b').length ? 'a' : 'b'

  const mine = lines.filter(l => l.sp === side)
  if (mine.length === 0) return null

  const turns: RoleplayTurn[] = []
  let cues: RoleplayTurn['cues'] = []

  lines.forEach(line => {
    if (line.sp !== side) {
      cues.push({ text: line.pt, translation: line.en })
      return
    }

    const correct = line.pt
    const wrong: string[] = []

    // First choice of distractor: the same sentence, agreed wrongly.
    const trap = portuguese ? wrongGender(correct) : null
    if (trap && !same(trap, correct)) wrong.push(trap)

    // Then other things this person says, which are plausible but not the reply
    // to what was just said.
    for (const other of shuffled(mine, rng)) {
      if (wrong.length >= 2) break
      if (same(other.pt, correct) || wrong.some(w => same(w, other.pt))) continue
      wrong.push(other.pt)
    }

    // A two-option question is a coin toss; skip the turn rather than ask one.
    if (wrong.length < 2) {
      cues.push({ text: line.pt, translation: line.en })
      return
    }

    const options = shuffled([correct, ...wrong], rng)
    turns.push({
      cues,
      options,
      answerIndex: options.findIndex(o => same(o, correct)),
      translation: line.en,
      genderTrap: trap && options.some(o => same(o, trap)) ? trap : null,
    })
    cues = []
  })

  if (turns.length === 0) return null
  return { scene: normaliseForSpeech(unit.dialogue?.scene ?? ''), side, turns }
}
