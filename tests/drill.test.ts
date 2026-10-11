import { describe, expect, it } from 'vitest'
import { buildDrill, isCorrect, nextUnitIndex } from '@/lib/drill'
import type { Unit } from '@/lib/curriculum'

const unit = {
  exercises: [
    { type: 'Multiple choice', instruction: 'Pick one.', items: [
      { q: 'Ela ___ médica.', opts: ['sou', 'é', 'são'], ans: 1 },
      { q: 'Eu ___ aqui.', opts: ['é', 'estou'], ans: 1 },
    ] },
    { type: 'Fill in the blank', instruction: 'Complete.', items: [
      { q: 'Eu ___ Sarah.', ans: 'sou' },
    ] },
  ],
  extraExercises: [
    { type: 'Translation', instruction: 'Translate.', items: [
      { q: 'Eu sou médico.', ans: 'I am a doctor.' },
    ] },
  ],
} as unknown as Unit

describe('buildDrill', () => {
  it('flattens every block into one list, core before extra', () => {
    const items = buildDrill(unit)
    expect(items.map(i => i.key)).toEqual(['c0-0', 'c0-1', 'c1-0', 'x0-0'])
  })

  it('uses the same item keys as the lesson, so an answer is not counted twice', () => {
    const items = buildDrill(unit)
    expect(items[0].key).toBe('c0-0')
    expect(items.at(-1)!.key).toBe('x0-0')
  })

  it('carries the option list only for multiple choice', () => {
    const [mc, , fill] = buildDrill(unit)
    expect(mc.options).toEqual(['sou', 'é', 'são'])
    expect(fill.options).toBeUndefined()
  })

  it('resolves the expected answer to what the learner should see', () => {
    const items = buildDrill(unit)
    expect(items[0].expected).toBe('é')          // option text, not the index
    expect(items[2].expected).toBe('sou')        // typed answer as written
    expect(items[3].expected).toBe('I am a doctor.')
  })

  it('survives a unit with no extra practice', () => {
    const bare = { exercises: unit.exercises } as unknown as Unit
    expect(buildDrill(bare)).toHaveLength(3)
  })

  it('survives a unit with no exercises at all', () => {
    expect(buildDrill({} as Unit)).toEqual([])
  })
})

describe('isCorrect', () => {
  const [mc, , fill, translation] = buildDrill(unit)

  it('judges multiple choice by the chosen index', () => {
    expect(isCorrect(mc, 1)).toBe(true)
    expect(isCorrect(mc, 0)).toBe(false)
  })

  it('forgives case and surrounding space on a typed answer', () => {
    expect(isCorrect(fill, '  SOU ')).toBe(true)
    expect(isCorrect(translation, 'i am a doctor.')).toBe(true)
  })

  it('rejects a wrong typed answer', () => {
    expect(isCorrect(fill, 'estou')).toBe(false)
    expect(isCorrect(fill, '')).toBe(false)
  })

  it('treats no answer as wrong rather than throwing', () => {
    expect(isCorrect(mc, null)).toBe(false)
    expect(isCorrect(fill, null)).toBe(false)
  })

  it('does not accept an index as an answer to a typed question', () => {
    expect(isCorrect(fill, 0)).toBe(false)
  })
})

describe('nextUnitIndex', () => {
  it('advances within the module', () => {
    expect(nextUnitIndex(0, 12)).toBe(1)
    expect(nextUnitIndex(10, 12)).toBe(11)
  })

  it('stops at the last unit instead of running past it', () => {
    expect(nextUnitIndex(11, 12)).toBeNull()
  })
})
