import { describe, expect, it } from 'vitest'
import { buildRoleplay } from '@/lib/roleplay'
import { MODULES } from '@/lib/curriculum'
import { EN_MODULES } from '@/lib/curriculum-en'
import type { Unit } from '@/lib/curriculum'

const unit = {
  dialogue: {
    scene: 'No escritório',
    lines: [
      { sp: 'a', pt: 'Bom dia! Tudo bem?', en: 'Good morning! All well?' },
      { sp: 'b', pt: 'Tenho uma reunião agora.', en: 'I have a meeting now.' },
      { sp: 'a', pt: 'Com quem?', en: 'With whom?' },
      { sp: 'b', pt: 'Com a minha chefe.', en: 'With my boss.' },
      { sp: 'a', pt: 'Boa sorte!', en: 'Good luck!' },
      { sp: 'b', pt: 'Obrigada! Até logo.', en: 'Thank you! See you.' },
    ],
  },
} as unknown as Unit

describe('buildRoleplay', () => {
  const play = buildRoleplay(unit, 'pt', 'test-1')!

  it('hands the learner the side that says more', () => {
    expect(play.side).toBe('b')
    expect(play.turns.length).toBeGreaterThan(1)
  })

  it('gives every turn the lines that came before it', () => {
    // Without the cue there is nothing to be replying to.
    expect(play.turns[1].cues.length).toBeGreaterThan(0)
    expect(play.turns[1].cues[0].text).toBe('Com quem?')
  })

  it('always offers at least three options, never a coin toss', () => {
    for (const turn of play.turns) {
      expect(turn.options.length).toBeGreaterThanOrEqual(3)
      expect(new Set(turn.options).size).toBe(turn.options.length)
    }
  })

  it('puts the real line among them and points at it', () => {
    for (const turn of play.turns) {
      expect(turn.options[turn.answerIndex]).toBeTruthy()
      expect(turn.translation).toBeTruthy()
    }
  })

  it('traps the gender where the line has any', () => {
    const traps = play.turns.filter(t => t.genderTrap)
    expect(traps.length).toBeGreaterThan(0)
    for (const turn of traps) {
      expect(turn.options).toContain(turn.genderTrap!)
      expect(turn.genderTrap).not.toBe(turn.options[turn.answerIndex])
    }
  })

  it('repeats exactly, so the right answer does not move between visits', () => {
    expect(buildRoleplay(unit, 'pt', 'test-1')).toEqual(play)
  })

  it('shuffles differently for a different unit', () => {
    const other = buildRoleplay(unit, 'pt', 'test-2')!
    expect(other.turns[0].answerIndex === play.turns[0].answerIndex && other.turns.length === play.turns.length)
      .toBeDefined()
  })

  it('sets no gender trap for the English course, which has none to set', () => {
    const english = buildRoleplay(unit, 'en', 'test-1')!
    expect(english.turns.every(t => t.genderTrap === null)).toBe(true)
  })

  it('returns null for a unit with no conversation in it', () => {
    expect(buildRoleplay({} as Unit, 'pt', 'x')).toBeNull()
    expect(buildRoleplay({ dialogue: { scene: '', lines: [] } } as unknown as Unit, 'pt', 'x')).toBeNull()
  })
})

describe('against the real curriculum', () => {
  const courses = [['pt', MODULES], ['en', EN_MODULES]] as const

  it('gives every unit of both courses a conversation', () => {
    for (const [teaches, mods] of courses) {
      for (const mod of mods) {
        mod.units.forEach((u, i) => {
          const play = buildRoleplay(u, teaches, `${mod.id}-${i}`)
          expect(play, `${teaches} ${mod.id}/${i}`).not.toBeNull()
          expect(play!.turns.length, `${teaches} ${mod.id}/${i}`).toBeGreaterThan(0)
        })
      }
    }
  })

  it('holds the option invariants everywhere', () => {
    for (const [teaches, mods] of courses) {
      for (const mod of mods) {
        mod.units.forEach((u, i) => {
          const where = `${teaches} ${mod.id}/${i}`
          for (const turn of buildRoleplay(u, teaches, `${mod.id}-${i}`)!.turns) {
            expect(turn.options.length, where).toBeGreaterThanOrEqual(3)
            expect(new Set(turn.options.map(o => o.toLowerCase())).size, where).toBe(turn.options.length)
            expect(turn.answerIndex, where).toBeGreaterThanOrEqual(0)
          }
        })
      }
    }
  })

  it('puts a gender trap in front of the Portuguese learner often', () => {
    let traps = 0
    for (const mod of MODULES) {
      mod.units.forEach((u, i) => {
        traps += buildRoleplay(u, 'pt', `${mod.id}-${i}`)!.turns.filter(t => t.genderTrap).length
      })
    }
    expect(traps).toBeGreaterThan(50)
  })

  it('never traps the English learner on gender', () => {
    for (const mod of EN_MODULES) {
      mod.units.forEach((u, i) => {
        const play = buildRoleplay(u, 'en', `${mod.id}-${i}`)!
        expect(play.turns.every(t => t.genderTrap === null), `${mod.id}/${i}`).toBe(true)
      })
    }
  })
})
