import type { Exercise, Unit } from './curriculum'
import { generatedActivities } from './activities'

/**
 * Flattens a unit's exercises into a single list to be answered one at a time.
 *
 * Item keys match the ones the lesson screen uses — "c0-2" for core block 0
 * item 2, "x1-3" for an extra block — so an answer given here and one given in
 * the lesson are the same item to the attempt log and the review queue.
 * Generated activities carry their own prefixes ("gl", "gs", "gd", "go", "gw")
 * and cannot collide with either.
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

  /** What this item sounds like. Every item has some. */
  audio?: {
    text: string
    /** Speak it the moment the item appears. */
    auto?: boolean
    /** The sound IS the question: show a player, not the text. */
    isQuestion?: boolean
    /** It gives the answer away, so only offer it once the answer is out. */
    afterAnswer?: boolean
  }
  /** Let the learner hear each option before choosing. */
  optionsSpeak?: boolean

  /** How the learner answers. Absent means choice or typing, as `options` says. */
  kind?: 'order'
  /** For `kind: 'order'`: the words, already scrambled. */
  tokens?: string[]

  /** Loose judging ignores accents and punctuation. Default is exact. */
  compare?: 'exact' | 'loose'

  /** Difficulty step, used to order the unit from recognition to production. */
  stage?: number
}

/**
 * The spoken form of an authored exercise.
 *
 * In both courses the answer is always in the language being taught, so it is
 * always safe to read out. Better still, an exercise with a gap becomes a whole
 * sentence once the answer is dropped in — "Eu ___ Sarah." read as "Eu sou
 * Sarah." — which is worth far more to the ear than the bare word.
 */
export function spokenAnswer(question: string, expected: string): string {
  return /_{2,}/.test(question) ? question.replace(/_{2,}/g, expected) : expected
}

/** Recognition first, then production: where each authored type belongs. */
function stageFor(type: string): number {
  const name = type.toLowerCase()
  if (name.includes('multiple choice')) return 2
  if (name.includes('translation')) return 8
  return 5 // fill in the blank, and anything added later
}

function fromBlocks(blocks: Exercise[], prefix: 'c' | 'x'): DrillItem[] {
  return blocks.flatMap((block, bi) =>
    block.items.map((item, ii) => {
      const multipleChoice = Array.isArray(item.opts) && typeof item.ans === 'number'
      const expected = multipleChoice
        ? (item.opts as string[])[item.ans as number]
        : String(item.ans)

      return {
        key: `${prefix}${bi}-${ii}`,
        type: block.type,
        instruction: block.instruction,
        question: item.q,
        options: multipleChoice ? item.opts : undefined,
        answerIndex: multipleChoice ? (item.ans as number) : undefined,
        expected,
        audio: { text: spokenAnswer(item.q, expected), afterAnswer: true },
        stage: stageFor(block.type),
      }
    }),
  )
}

/**
 * A unit's practice, in one list, ordered as a climb: hear and recognise, then
 * choose, then assemble, then write it unaided.
 *
 * Without `opts` only the authored exercises come back, which is what the tests
 * and any caller that just wants the written material use.
 */
export function buildDrill(
  unit: Unit,
  opts?: { lang: string; seed: string },
): DrillItem[] {
  const authored = [
    ...fromBlocks(unit.exercises ?? [], 'c'),
    ...fromBlocks(unit.extraExercises ?? [], 'x'),
  ]

  const generated = opts ? generatedActivities(unit, opts.lang, opts.seed) : []

  // Stable: items of equal stage keep the order they were built in.
  return [...authored, ...generated]
    .map((item, i) => ({ item, i }))
    .sort((a, b) => (a.item.stage ?? 5) - (b.item.stage ?? 5) || a.i - b.i)
    .map(({ item }) => item)
}

/**
 * Drops accents and punctuation. Used where the point is the ear, not the
 * spelling: dictation and word order.
 */
function loosen(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Typed answers forgive case and surrounding space, as the lesson does. */
export function isCorrect(item: DrillItem, given: string | number | null): boolean {
  if (given === null || given === undefined) return false

  if (item.options) return given === item.answerIndex

  if (typeof given !== 'string') return false

  return item.compare === 'loose'
    ? loosen(given) === loosen(item.expected)
    : given.trim().toLowerCase() === item.expected.trim().toLowerCase()
}

/**
 * How many questions a learner answers before being let off the hook.
 *
 * A unit holds between thirty and forty items once the generated activities are
 * counted, which is too long to face as one block. Because the list is ordered
 * by difficulty, cutting it into rounds also means each round is harder than
 * the one before: the first is nearly all listening, the last is writing
 * unaided.
 */
export const ROUND_SIZE = 12

/**
 * How many rounds to split a list of this length into — never none, and never
 * so many that the last one is a stub. Rounding rather than dividing up is what
 * avoids a final round of two questions: 42 items become four rounds of ten or
 * eleven, not three of twelve and one of six.
 */
export function roundCount(total: number, size = ROUND_SIZE): number {
  return Math.max(1, Math.round(total / size))
}

/** Where a round starts and ends, spreading any remainder across the rounds. */
export function roundBounds(
  round: number,
  total: number,
  size = ROUND_SIZE,
): { start: number; end: number } {
  const n = roundCount(total, size)
  const at = Math.min(Math.max(round, 0), n - 1)
  return {
    start: Math.floor((at * total) / n),
    end: Math.floor(((at + 1) * total) / n),
  }
}

/** The round a given item index falls in. */
export function roundOf(index: number, total: number, size = ROUND_SIZE): number {
  const n = roundCount(total, size)
  for (let r = 0; r < n; r++) {
    if (index < Math.floor(((r + 1) * total) / n)) return r
  }
  return n - 1
}

/** Where the learner goes after finishing a unit. Null when the module ends. */
export function nextUnitIndex(current: number, unitCount: number): number | null {
  const next = current + 1
  return next < unitCount ? next : null
}
