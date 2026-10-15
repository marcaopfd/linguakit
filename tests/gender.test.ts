import { describe, expect, it } from 'vitest'
import { differingWord, hasGenderedAgreement, wrongGender } from '@/lib/gender'
import { MODULES } from '@/lib/curriculum'

describe('wrongGender', () => {
  it('makes the mistake an English speaker actually makes', () => {
    expect(wrongGender('Tenho uma irmã.')).toBe('Tenho um irmã.')
    expect(wrongGender('A Maria é alta.')).toBe('A Maria é alto.')
    expect(wrongGender('São dez da manhã.')).toBe('São dez do manhã.')
  })

  it('flips the word that agrees, never the noun that decides', () => {
    // "professora" for a man is a different person, not a grammar slip.
    const out = wrongGender('O meu pai é professor.')
    expect(out).not.toBeNull()
    expect(out).toContain('pai')
    expect(out).toContain('professor')
  })

  it('catches the one that depends on who is speaking', () => {
    expect(wrongGender('Obrigada!')).toBe('Obrigado!')
  })

  it('keeps the capital when the first word changes', () => {
    expect(wrongGender('Esta é a casa.')).toBe('Este é a casa.')
  })

  it('changes exactly one word, so the answer cannot be found by shape', () => {
    const correct = 'Esta é a minha família, e este é o meu pai.'
    const wrong = wrongGender(correct)!
    const pairs = correct.split(/\s+/).map((w, i) => [w, wrong.split(/\s+/)[i]])
    expect(pairs.filter(([a, b]) => a !== b)).toHaveLength(1)
  })

  it('leaves alone the pronoun that only looks like an article', () => {
    // "Nos vemos" is "we see each other"; flipping it gave "Nas vemos".
    expect(wrongGender('Nos vemos quinta.')).toBeNull()
  })

  it('leaves the exclamation alone and looks elsewhere', () => {
    // "Nossa!" is "wow", not "our". The guard skips it rather than the
    // sentence: there is still a real adjective further along.
    const out = wrongGender('Nossa, está caro!')
    expect(out).not.toMatch(/^Nosso/)
    expect(out).toBe('Nossa, está cara!')
  })

  it('passes over a preposition to reach something that really agrees', () => {
    // The "a" in "a uns cinco minutos" is a preposition and flipping it gave
    // nonsense. "uns" agrees with "minutos" and is fair game.
    expect(wrongGender('Fica a uns cinco minutos a pé.')).toBe('Fica a umas cinco minutos a pé.')
  })

  it('reaches for the most instructive word when several would do', () => {
    // "muita obrigado" is a slip nobody makes; the gender of "obrigado" is the
    // one worth cornering someone on.
    expect(wrongGender('Muito obrigado.')).toBe('Muito obrigada.')
  })

  it('still treats "nossa" as a possessive when it possesses something', () => {
    expect(wrongGender('Nossa casa é grande.')).toBe('Nosso casa é grande.')
  })

  it('returns null when there is nothing to get wrong', () => {
    expect(wrongGender('Bom dia!')).toBeNull()
    expect(wrongGender('')).toBeNull()
  })

  it('picks a different word when asked for a different one', () => {
    const s = 'Esta é a minha casa nova.'
    expect(wrongGender(s, 0)).not.toBe(wrongGender(s, 1))
  })
})

describe('hasGenderedAgreement', () => {
  it('agrees with wrongGender about what can be got wrong', () => {
    for (const line of ['Tenho uma irmã.', 'Bom dia!', 'Obrigada!', 'Nos vemos quinta.']) {
      expect(hasGenderedAgreement(line), line).toBe(wrongGender(line) !== null)
    }
  })
})

describe('differingWord', () => {
  it('names the slip, which is the whole lesson', () => {
    expect(differingWord('A Maria é alta.', 'A Maria é alto.')).toEqual({ right: 'alta', wrong: 'alto' })
  })

  it('refuses when the two differ in more than one place', () => {
    expect(differingWord('Esta é a casa.', 'Este é o carro.')).toBeNull()
  })

  it('refuses when the sentences are different lengths', () => {
    expect(differingWord('Bom dia.', 'Bom dia a todos.')).toBeNull()
  })
})

describe('against the real curriculum', () => {
  it('produces a gender trap for a good share of the dialogue', () => {
    let total = 0
    let trapped = 0
    for (const mod of MODULES) {
      for (const unit of mod.units) {
        for (const line of unit.dialogue?.lines ?? []) {
          total += 1
          if (wrongGender(line.pt)) trapped += 1
        }
      }
    }
    // Not every line has agreement in it; a third or more is plenty to keep
    // the point in front of the learner across fifty units.
    expect(total).toBeGreaterThan(200)
    expect(trapped / total).toBeGreaterThan(0.3)
  })

  it('never changes more than one word anywhere in the curriculum', () => {
    for (const mod of MODULES) {
      for (const unit of mod.units) {
        for (const line of unit.dialogue?.lines ?? []) {
          const wrong = wrongGender(line.pt)
          if (!wrong) continue
          expect(differingWord(line.pt, wrong), line.pt).not.toBeNull()
        }
      }
    }
  })
})
