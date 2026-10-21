import { describe, expect, it } from 'vitest'
import { MODULES, type Exercise, type Module } from '@/lib/curriculum'
import { EN_MODULES } from '@/lib/curriculum-en'

/**
 * The authored exercises, checked for the kinds of damage a person editing two
 * thousand questions by hand actually does.
 *
 * None of this judges whether an answer is *right* — no test can read
 * Portuguese. It catches the mechanical breakage, which is what an audit of
 * the two courses turned up: a question whose answer index pointed past the
 * end of its options, so it could not be answered at all; an option listed
 * twice; and five places where the author's own note — "both b and c correct"
 * — had been typed inside an option, which made the note the answer.
 */

type Located = { where: string; block: Exercise; item: Exercise['items'][number] }

function everyItem(courses: { name: string; mods: Module[] }[]): Located[] {
  const out: Located[] = []
  for (const { name, mods } of courses) {
    for (const mod of mods) {
      mod.units.forEach((unit, ui) => {
        const blocks: [string, Exercise[]][] = [
          ['exercises', unit.exercises ?? []],
          ['extraExercises', unit.extraExercises ?? []],
        ]
        for (const [origin, list] of blocks) {
          list.forEach((block, bi) => {
            block.items.forEach((item, ii) => {
              out.push({ where: `${name} ${mod.id}/${ui} ${origin}[${bi}].items[${ii}]`, block, item })
            })
          })
        }
      })
    }
  }
  return out
}

const items = everyItem([
  { name: 'português', mods: MODULES },
  { name: 'inglês', mods: EN_MODULES },
])

describe('every authored question', () => {
  it('is worth testing — there are thousands of them', () => {
    expect(items.length).toBeGreaterThan(2000)
  })

  it('has a question and an answer', () => {
    for (const { where, item } of items) {
      expect(String(item.q ?? '').trim(), `${where} has no question`).not.toBe('')
      const answer = typeof item.ans === 'number' ? item.opts?.[item.ans] : item.ans
      expect(String(answer ?? '').trim(), `${where} has no answer`).not.toBe('')
    }
  })

  it('points its answer at an option that exists', () => {
    // The one that started this: ans 3 with three options, so the question had
    // no right answer and could not be got past.
    for (const { where, item } of items) {
      if (typeof item.ans !== 'number') continue
      const options = item.opts ?? []
      expect(options.length, `${where} indexes options it does not have`).toBeGreaterThan(0)
      expect(item.ans, `${where} ans=${item.ans} of ${options.length}`).toBeLessThan(options.length)
      expect(item.ans, `${where} ans=${item.ans}`).toBeGreaterThanOrEqual(0)
    }
  })

  it('answers with one of its own options when it offers them', () => {
    for (const { where, item } of items) {
      if (typeof item.ans === 'number' || !item.opts?.length) continue
      const given = String(item.ans).trim().toLowerCase()
      const offered = item.opts.map(o => o.trim().toLowerCase())
      expect(offered, `${where} answers "${item.ans}", not offered`).toContain(given)
    }
  })

  it('never offers the same option twice', () => {
    for (const { where, item } of items) {
      const options = (item.opts ?? []).map(o => o.trim().toLowerCase())
      expect(new Set(options).size, `${where}: ${options.join(' | ')}`).toBe(options.length)
    }
  })

  it('keeps the author out of the answers', () => {
    // "Não obstante os desafios — all are correct" was a real option, and the
    // one marked correct. A note about the question does not belong inside it.
    const note = /\b(both [a-z] and [a-z]|all are correct|both correct|also correct|all correct)\b/i
    for (const { where, item } of items) {
      for (const option of item.opts ?? []) {
        expect(note.test(option), `${where}: "${option}"`).toBe(false)
      }
      if (typeof item.ans === 'string') {
        expect(note.test(item.ans), `${where}: "${item.ans}"`).toBe(false)
      }
    }
  })

  it('does not leave the gap in the answer', () => {
    for (const { where, item } of items) {
      const answer = typeof item.ans === 'number' ? item.opts?.[item.ans] : item.ans
      expect(/_{2,}/.test(String(answer ?? '')), `${where}: "${answer}"`).toBe(false)
    }
  })
})
