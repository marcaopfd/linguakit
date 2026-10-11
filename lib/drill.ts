import type { Exercise, Unit } from './curriculum'

/**
 * Flattens a unit's exercises into a single list to be answered one at a time.
 *
 * Item keys match the ones the lesson screen uses — "c0-2" for core block 0
 * item 2, "x1-3" for an extra block — so an answer given here and one given in
 * the lesson are the same item to the attempt log and the review queue.
 */
export type DrillItem = {
  key: string
  type: string
  instruction: string
  question: string
  /** Present for multiple choice; absent means the learner types the answer. */
  options?: string[]
  /** The correct answer as the learner should see it. */
  expected: string
  answerIndex?: number
}

function fromBlocks(blocks: Exercise[], prefix: 'c' | 'x'): DrillItem[] {
  return blocks.flatMap((block, bi) =>
    block.items.map((item, ii) => {
      const multipleChoice = Array.isArray(item.opts) && typeof item.ans === 'number'
      return {
        key: `${prefix}${bi}-${ii}`,
        type: block.type,
        instruction: block.instruction,
        question: item.q,
        options: multipleChoice ? item.opts : undefined,
        answerIndex: multipleChoice ? (item.ans as number) : undefined,
        expected: multipleChoice ? (item.opts as string[])[item.ans as number] : String(item.ans),
      }
    }),
  )
}

/** Core exercises first, then the extra practice, in lesson order. */
export function buildDrill(unit: Unit): DrillItem[] {
  return [
    ...fromBlocks(unit.exercises ?? [], 'c'),
    ...fromBlocks(unit.extraExercises ?? [], 'x'),
  ]
}

/** Typed answers forgive case and surrounding space, as the lesson does. */
export function isCorrect(item: DrillItem, given: string | number | null): boolean {
  if (given === null || given === undefined) return false

  if (item.options) return given === item.answerIndex

  if (typeof given !== 'string') return false
  return given.trim().toLowerCase() === item.expected.trim().toLowerCase()
}

/** Where the learner goes after finishing a unit. Null when the module ends. */
export function nextUnitIndex(current: number, unitCount: number): number | null {
  const next = current + 1
  return next < unitCount ? next : null
}
