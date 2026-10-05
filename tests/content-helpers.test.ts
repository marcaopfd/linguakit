import { describe, expect, it } from 'vitest'
import { firstVariant, normaliseForSpeech } from '@/lib/speak'
import { uiStrings } from '@/lib/ui-strings'

describe('text prepared for speech', () => {
  it('drops parenthetical glosses that would be read aloud', () => {
    expect(normaliseForSpeech('book (a ticket)')).toBe('book')
    expect(normaliseForSpeech('boa noite (ao chegar)')).toBe('boa noite')
    expect(normaliseForSpeech('miss (someone)')).toBe('miss')
  })

  it('leaves ordinary sentences alone', () => {
    expect(normaliseForSpeech('Hello! My name is Ana.')).toBe('Hello! My name is Ana.')
    expect(normaliseForSpeech('Ela é médica.')).toBe('Ela é médica.')
  })

  it('speaks only the first of several synonyms', () => {
    expect(firstVariant('olá / oi')).toBe('olá')
    expect(firstVariant('tchau / até logo')).toBe('tchau')
    expect(firstVariant('um / uma')).toBe('um')
  })

  it('leaves a single term untouched', () => {
    expect(firstVariant('hello')).toBe('hello')
    expect(firstVariant('good morning')).toBe('good morning')
  })

  it('never returns surrounding whitespace, which would be spoken as a pause', () => {
    expect(firstVariant('  olá  /  oi  ')).toBe('olá')
    expect(normaliseForSpeech('  spaced   out  ')).toBe('spaced out')
  })
})

describe('interface language', () => {
  /**
   * Easy to get backwards: the chrome is shown in the language the learner
   * already speaks, which is the opposite of the one the course teaches.
   */
  it('shows English chrome in the course that teaches Portuguese', () => {
    const t = uiStrings('pt-BR')
    expect(t.back).toBe('Back')
    expect(t.steps.vocabulary).toBe('Vocabulary')
    expect(t.check).toBe('Check')
    expect(t.listen).toBe('Listen')
  })

  it('shows Portuguese chrome in the course that teaches English', () => {
    const t = uiStrings('en-US')
    expect(t.back).toBe('Voltar')
    expect(t.steps.vocabulary).toBe('Vocabulário')
    expect(t.check).toBe('Conferir')
    expect(t.listen).toBe('Ouvir')
  })

  it('formats counts in the right language', () => {
    expect(uiStrings('pt-BR').moreExercises(15)).toBe('+ More exercises (15)')
    expect(uiStrings('en-US').moreExercises(15)).toBe('+ Mais exercícios (15)')
    expect(uiStrings('pt-BR').unitsCompleted(3, 12)).toBe('3 of 12 units completed')
    expect(uiStrings('en-US').unitsCompleted(3, 12)).toBe('3 de 12 units concluídas')
  })

  it('covers every key in both languages, so nothing falls back to the wrong one', () => {
    const en = uiStrings('pt-BR')
    const pt = uiStrings('en-US')
    expect(Object.keys(pt).sort()).toEqual(Object.keys(en).sort())
    expect(Object.keys(pt.steps).sort()).toEqual(Object.keys(en.steps).sort())
  })
})
