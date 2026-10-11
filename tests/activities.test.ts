import { describe, expect, it } from 'vitest'
import { ACTIVITY_LIMITS, generatedActivities } from '@/lib/activities'
import { MODULES } from '@/lib/curriculum'
import { EN_MODULES } from '@/lib/curriculum-en'
import type { Unit } from '@/lib/curriculum'

const unit = {
  vocabulary: [
    { pt: 'a regra', en: 'rule', ex: 'Essa é a regra da casa.', exEn: 'That is the house rule.' },
    { pt: 'o conselho', en: 'advice', ex: 'Ela me deu um bom conselho.', exEn: 'She gave me good advice.' },
    { pt: 'o prazo', en: 'deadline', ex: 'O prazo termina amanhã.', exEn: 'The deadline is tomorrow.' },
    { pt: 'o dever', en: 'duty', ex: 'Cumprir o dever é importante.', exEn: 'Doing your duty matters.' },
  ],
  extraVocab: [
    // Deliberately repeats "a regra" from the core list.
    { pt: 'a regra', en: 'rule', ex: 'A regra mudou.', exEn: 'The rule changed.' },
    { pt: 'o aviso', en: 'warning', ex: 'O aviso estava na porta.', exEn: 'The warning was on the door.' },
  ],
  grammar: {
    title: 'Deve',
    explain: '',
    structure: '',
    examples: [
      { pt: 'Você deve chegar na hora.', en: 'You must arrive on time.' },
      { pt: 'Eu tenho que trabalhar hoje.', en: 'I have to work today.' },
      { pt: 'Ela não deveria fumar aqui.', en: 'She should not smoke here.' },
    ],
    extendedExamples: [
      { pt: 'Nós precisamos de um aviso.', en: 'We need a warning.' },
      { pt: 'Eles devem seguir a regra.', en: 'They must follow the rule.' },
    ],
  },
  dialogue: {
    scene: 'No escritório',
    lines: [
      { sp: 'a', pt: 'Bom dia! Você chegou na hora.', en: 'Good morning! You arrived on time.' },
      { sp: 'b', pt: 'Claro, é o meu dever.', en: 'Of course, it is my duty.' },
      { sp: 'a', pt: 'E o relatório, está pronto?', en: 'And the report, is it ready?' },
      { sp: 'b', pt: 'Ainda não, o prazo é amanhã.', en: 'Not yet, the deadline is tomorrow.' },
      { sp: 'a', pt: 'Então temos tempo.', en: 'So we have time.' },
    ],
  },
  exercises: [],
} as unknown as Unit

const items = generatedActivities(unit, 'pt-BR', 'a1-0')
const of = (prefix: string) => items.filter(i => i.key.startsWith(prefix))

describe('generatedActivities', () => {
  it('builds all five kinds from one unit', () => {
    expect(of('gl').length).toBeGreaterThan(0) // listen and choose
    expect(of('gs').length).toBeGreaterThan(0) // say it
    expect(of('gd').length).toBeGreaterThan(0) // dialogue reply
    expect(of('go').length).toBeGreaterThan(0) // word order
    expect(of('gw').length).toBeGreaterThan(0) // dictation
  })

  it('keeps to the per-unit limits', () => {
    expect(of('gl').length).toBeLessThanOrEqual(ACTIVITY_LIMITS.listenChoose)
    expect(of('gs').length).toBeLessThanOrEqual(ACTIVITY_LIMITS.sayIt)
    expect(of('gd').length).toBeLessThanOrEqual(ACTIVITY_LIMITS.dialogueGap)
    expect(of('go').length).toBeLessThanOrEqual(ACTIVITY_LIMITS.wordOrder)
    expect(of('gw').length).toBeLessThanOrEqual(ACTIVITY_LIMITS.dictation)
  })

  it('gives every item something to listen to', () => {
    for (const item of items) {
      expect(item.audio?.text, item.key).toBeTruthy()
    }
  })

  it('repeats exactly, so an item key means the same question tomorrow', () => {
    const again = generatedActivities(unit, 'pt-BR', 'a1-0')
    expect(again).toEqual(items)
  })

  it('shuffles differently for a different unit', () => {
    const other = generatedActivities(unit, 'pt-BR', 'a1-7')
    expect(other.map(i => i.question)).not.toEqual(items.map(i => i.question))
  })

  it('labels in the learner own language, not the one being taught', () => {
    // A pt-BR course is for English speakers, so the chrome is English.
    expect(of('gw')[0].type).toBe('Dictation')
    expect(generatedActivities(unit, 'en-US', 'a1-0').filter(i => i.key.startsWith('gw'))[0].type)
      .toBe('Ditado')
  })

  it('cannot collide with the keys the lesson screen uses', () => {
    for (const item of items) {
      expect(item.key).toMatch(/^g[lsdow]\d+$/)
    }
  })
})

describe('listen and choose', () => {
  it('never asks the same word twice, even when two lists share it', () => {
    const asked = of('gl').map(i => i.question.toLowerCase())
    expect(new Set(asked).size).toBe(asked.length)
  })

  it('plays on arrival, because the sound is the question', () => {
    for (const item of of('gl')) {
      expect(item.audio?.auto).toBe(true)
      expect(item.audio?.isQuestion).toBe(true)
    }
  })

  it('offers distinct options with the answer among them', () => {
    for (const item of of('gl')) {
      expect(item.options!.length).toBeGreaterThanOrEqual(3)
      expect(new Set(item.options!.map(o => o.toLowerCase())).size).toBe(item.options!.length)
      expect(item.options![item.answerIndex!]).toBe(item.expected)
    }
  })
})

describe('say it', () => {
  it('asks in the learner own language and answers in the taught one', () => {
    // This fixture is a Portuguese course, so the learner reads English.
    const own = [
      ...unit.vocabulary.map(v => v.exEn),
      ...unit.grammar.examples.map(g => g.en),
      ...(unit.grammar.extendedExamples ?? []).map(g => g.en),
    ]
    const taught = [
      ...unit.vocabulary.map(v => v.ex),
      ...unit.grammar.examples.map(g => g.pt),
      ...(unit.grammar.extendedExamples ?? []).map(g => g.pt),
    ]

    for (const item of of('gs')) {
      expect(own, item.key).toContain(item.question)
      expect(taught, item.key).toContain(item.expected)
      expect(item.optionsSpeak).toBe(true)
      for (const option of item.options!) expect(taught, item.key).toContain(option)
    }
  })

  it('holds its audio back, because that audio is the answer', () => {
    for (const item of of('gs')) {
      expect(item.audio?.afterAnswer).toBe(true)
      expect(item.audio?.auto).toBeFalsy()
    }
  })
})

describe('dialogue reply', () => {
  it('never offers the line it just played as a candidate reply', () => {
    for (const item of of('gd')) {
      const cue = item.question.trim().toLowerCase()
      expect(item.options!.map(o => o.trim().toLowerCase())).not.toContain(cue)
    }
  })

  it('names the scene so the exchange has a setting', () => {
    expect(of('gd')[0].instruction).toContain('No escritório')
  })
})

describe('word order', () => {
  it('hands over exactly the words of the sentence, scrambled', () => {
    for (const item of of('go')) {
      const expected = item.expected
        .split(/\s+/)
        .map(w => w.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, ''))
        .filter(Boolean)
      expect([...item.tokens!].sort()).toEqual([...expected].sort())
    }
  })

  it('strips the full stop, which would announce the last word', () => {
    for (const item of of('go')) {
      for (const token of item.tokens!) {
        expect(token).not.toMatch(/[.!?,;:]$/)
      }
    }
  })

  it('is judged loosely, since the punctuation was taken away', () => {
    for (const item of of('go')) {
      expect(item.compare).toBe('loose')
      expect(item.kind).toBe('order')
    }
  })
})

describe('dictation', () => {
  it('plays on arrival and forgives accents', () => {
    for (const item of of('gw')) {
      expect(item.audio?.auto).toBe(true)
      expect(item.compare).toBe('loose')
      expect(item.options).toBeUndefined()
    }
  })
})

describe('against the real curriculum', () => {
  const courses = [
    ['pt-BR', MODULES],
    ['en-US', EN_MODULES],
  ] as const

  it('produces activities for every unit of both courses', () => {
    for (const [lang, mods] of courses) {
      for (const mod of mods) {
        mod.units.forEach((u, i) => {
          const built = generatedActivities(u, lang, `${mod.id}-${i}`)
          expect(built.length, `${lang} ${mod.id}/${i}`).toBeGreaterThan(8)
        })
      }
    }
  })

  it('holds every invariant across all 100 units', () => {
    for (const [lang, mods] of courses) {
      for (const mod of mods) {
        mod.units.forEach((u, i) => {
          const where = `${lang} ${mod.id}/${i}`
          const built = generatedActivities(u, lang, `${mod.id}-${i}`)
          const keys = built.map(b => b.key)
          expect(new Set(keys).size, where).toBe(keys.length)

          for (const b of built) {
            expect(b.audio?.text, `${where} ${b.key}`).toBeTruthy()
            expect(b.expected, `${where} ${b.key}`).toBeTruthy()

            if (b.options) {
              expect(b.options.length, `${where} ${b.key}`).toBeGreaterThanOrEqual(3)
              expect(b.options[b.answerIndex!], `${where} ${b.key}`).toBe(b.expected)
              expect(new Set(b.options.map(o => o.toLowerCase())).size, `${where} ${b.key}`)
                .toBe(b.options.length)
            }
            if (b.tokens) {
              expect(b.tokens.length, `${where} ${b.key}`).toBeGreaterThanOrEqual(3)
            }
          }
        })
      }
    }
  })
})
