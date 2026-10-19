import { readFileSync } from 'fs'
import { join } from 'path'
import { describe, expect, it } from 'vitest'
import {
  BANDS, MAX_TRIES, WORD_LENGTH, bandOfTheDay, dayKey, dayNumber, daysBeforeRepeat,
  msUntilNextWord, plain, poolSize, scoreGuess, wordOfTheDay,
} from '@/lib/daily-word'
import { DICTIONARY_SIZE, isRealWord } from '@/lib/word-dictionary-pt'
import { PT_EASY, PT_HARD, PT_MEDIUM } from '@/lib/word-list-pt'
import { PT_MEANINGS, meaningOf } from '@/lib/word-meanings-pt'

/** Comments explain these rules, so they must not be mistaken for code. */
const stripComments = (src: string) =>
  src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '')

describe('scoreGuess', () => {
  it('marks the easy case', () => {
    expect(scoreGuess('verde', 'verde')).toEqual(['right', 'right', 'right', 'right', 'right'])
    expect(scoreGuess('preto', 'verde')).toEqual(['absent', 'moved', 'moved', 'absent', 'absent'])
  })

  it('spends a letter once, even when the guess asks for it twice', () => {
    // The answer's two o's are both taken by the exact matches, so neither of
    // the guess's o's can also be "somewhere else".
    expect(scoreGuess('ovo', 'oco')).toEqual(['right', 'absent', 'right'])
  })

  it('does not credit a repeat the answer does not have', () => {
    expect(scoreGuess('aaab', 'abbb')).toEqual(['right', 'absent', 'absent', 'right'])
    expect(scoreGuess('aaaa', 'abab')).toEqual(['right', 'absent', 'right', 'absent'])
  })

  it('credits every repeat the answer does have', () => {
    expect(scoreGuess('aabb', 'bbaa')).toEqual(['moved', 'moved', 'moved', 'moved'])
  })

  it('prefers the exact position over an earlier near miss', () => {
    // The single "a" belongs to position 2, not to position 0.
    expect(scoreGuess('aba', 'cba')).toEqual(['absent', 'right', 'right'])
  })

  it('ignores accents, which nobody should have to type', () => {
    expect(scoreGuess('irmao', 'irmão')).toEqual(['right', 'right', 'right', 'right', 'right'])
    expect(scoreGuess('cafe', 'café')).toEqual(['right', 'right', 'right', 'right'])
  })

  it('ignores case', () => {
    expect(scoreGuess('VERDE', 'verde').every(m => m === 'right')).toBe(true)
  })
})

describe('the word of the day', () => {
  const noon = (y: number, m: number, d: number) => new Date(Date.UTC(y, m, d, 15, 0, 0))

  it('is the same for everyone on the same day', () => {
    const a = wordOfTheDay('pt', noon(2026, 5, 10))
    const b = wordOfTheDay('pt', new Date(Date.UTC(2026, 5, 10, 20, 30)))
    expect(a).toBe(b)
  })

  it('changes when the day does', () => {
    expect(wordOfTheDay('pt', noon(2026, 5, 10))).not.toBe(wordOfTheDay('pt', noon(2026, 5, 11)))
  })

  it('gives the two courses their own words', () => {
    expect(wordOfTheDay('pt', noon(2026, 5, 10))).not.toBe(wordOfTheDay('en', noon(2026, 5, 10)))
  })

  it('turns over at midnight in Brazil, not at nine in the evening', () => {
    // 02:00 UTC on the 11th is still the 10th in São Paulo.
    const lateOn10th = new Date(Date.UTC(2026, 5, 11, 2, 0))
    const earlyOn11th = new Date(Date.UTC(2026, 5, 11, 4, 0))
    expect(wordOfTheDay('pt', lateOn10th)).toBe(wordOfTheDay('pt', noon(2026, 5, 10)))
    expect(wordOfTheDay('pt', earlyOn11th)).not.toBe(wordOfTheDay('pt', lateOn10th))
  })

  it('climbs easy, medium, hard and starts again', () => {
    const start = noon(2026, 5, 10)
    const bands = Array.from({ length: 9 }, (_, i) =>
      bandOfTheDay(new Date(start.getTime() + i * 86400000)))
    // Whichever band today lands on, the next two are the other two in order.
    const first = BANDS.indexOf(bands[0])
    bands.forEach((band, i) => {
      expect(band, `day ${i}`).toBe(BANDS[(first + i) % 3])
    })
  })

  it('gets through a year without repeating an answer', () => {
    for (const course of ['pt', 'en'] as const) {
      expect(daysBeforeRepeat(course), course).toBeGreaterThanOrEqual(365)

      const start = noon(2026, 5, 10)
      const seen = new Set<string>()
      for (let i = 0; i < 365; i++) {
        seen.add(wordOfTheDay(course, new Date(start.getTime() + i * 86400000)))
      }
      expect(seen.size, course).toBe(365)
    }
  })

  it('holds more than the three hundred and sixty five a year needs', () => {
    expect(poolSize('pt')).toBeGreaterThanOrEqual(365)
    expect(poolSize('en')).toBeGreaterThanOrEqual(365)
  })

  it('only ever picks a word of exactly five letters', () => {
    const start = noon(2026, 0, 1)
    for (const course of ['pt', 'en'] as const) {
      for (let i = 0; i < 400; i++) {
        const word = wordOfTheDay(course, new Date(start.getTime() + i * 86400000))
        expect(plain(word).length, word).toBe(WORD_LENGTH)
        expect(word, word).toMatch(/^[a-zà-ÿ]+$/)
      }
    }
  })

  it('survives a clock set before the game existed', () => {
    expect(wordOfTheDay('pt', new Date(Date.UTC(2001, 0, 1)))).toBeTruthy()
    expect(dayNumber(new Date(Date.UTC(2001, 0, 1)))).toBeLessThan(0)
  })
})

describe('the day itself', () => {
  it('labels the day the word belongs to', () => {
    expect(dayKey(new Date(Date.UTC(2026, 5, 11, 2, 0)))).toBe('2026-06-10')
    expect(dayKey(new Date(Date.UTC(2026, 5, 11, 4, 0)))).toBe('2026-06-11')
  })

  it('counts down to the next word without ever going negative', () => {
    for (const hour of [0, 3, 12, 23]) {
      const ms = msUntilNextWord(new Date(Date.UTC(2026, 5, 10, hour)))
      expect(ms).toBeGreaterThan(0)
      expect(ms).toBeLessThanOrEqual(86400000)
    }
  })
})

describe('the rules', () => {
  it('gives six tries, as the game everybody knows does', () => {
    expect(MAX_TRIES).toBe(6)
  })
})

describe('whose language the word is in', () => {
  const src = stripComments(
    readFileSync(join(__dirname, '..', 'app/learn/[studentId]/palavra/page.tsx'), 'utf8'))

  it('is Portuguese for both courses, not the course being studied', () => {
    expect(src).toMatch(/course="pt"/)
    // The old behaviour picked the list from the course. If that ever comes
    // back it should be a decision, not a line that crept in.
    expect(src).not.toMatch(/course=\{.*isEN/)
  })

  it('speaks the answer in the language the answer is written in', () => {
    // The interface follows the learner; the voice follows the word. Reading
    // "salvo" with an American voice is the bug this guards.
    expect(src).toMatch(/speakLang=\{accentTag\('pt'/)
  })
})

describe('the dictionary of allowed guesses', () => {
  it('takes real words, including the inflected ones a lemma list misses', () => {
    for (const word of ['certo', 'junto', 'sonho', 'vazio', 'amiga', 'antes', 'salvo'])
      expect(isRealWord(word), word).toBe(true)
  })

  it('turns down what is not a word', () => {
    for (const junk of ['zzzzz', 'abcde', 'qwert', 'aaaaa', 'xpton'])
      expect(isRealWord(junk), junk).toBe(false)
  })

  it('accepts every answer it could ever be asked about', () => {
    // The day the game rejects its own word is the day it looks broken.
    for (const word of [...PT_EASY, ...PT_MEDIUM, ...PT_HARD])
      expect(isRealWord(plain(word)), word).toBe(true)
  })

  it('holds enough words to be worth consulting', () => {
    expect(DICTIONARY_SIZE).toBeGreaterThan(8000)
  })

  it('stays on the server, where twelve thousand words belong', () => {
    const view = readFileSync(join(__dirname, '..', 'app/learn/[studentId]/palavra/view.tsx'), 'utf8')
    expect(view).toContain("'use client'")
    expect(view).not.toMatch(/word-dictionary|word-meanings/)
  })
})

describe('what the word means', () => {
  it('has a line for every answer, in both languages', () => {
    for (const word of [...PT_EASY, ...PT_MEDIUM, ...PT_HARD]) {
      const entry = PT_MEANINGS[word]
      expect(entry, `${word} has no meaning`).toBeTruthy()
      expect(entry.pt.length, `${word} pt`).toBeGreaterThan(8)
      expect(entry.en.length, `${word} en`).toBeGreaterThan(2)
    }
  })

  it('carries no meaning for a word that is not an answer', () => {
    const answers = new Set<string>([...PT_EASY, ...PT_MEDIUM, ...PT_HARD])
    for (const word of Object.keys(PT_MEANINGS)) expect(answers.has(word), word).toBe(true)
  })

  it('gives the meaning in the language the learner reads', () => {
    expect(meaningOf('salvo', 'pt')).toMatch(/perigo/)
    expect(meaningOf('salvo', 'en')).toMatch(/Safe/)
    expect(meaningOf('naoexiste', 'pt')).toBeNull()
  })
})
