import type { Unit } from './curriculum'
import type { DrillItem } from './drill'
import { firstVariant, normaliseForSpeech } from './speech-text'
import { uiStrings } from './ui-strings'

/**
 * Practice activities generated from what a unit already holds.
 *
 * Every item is derived from the unit's own vocabulary, grammar examples and
 * dialogue, so the activity count grows with the curriculum without a word of
 * new content and without a single API call. All five are built around sound:
 * the learner hears the language and then has to recognise, choose, assemble or
 * write it.
 *
 * Generation is seeded by module and unit, so the same learner meets the same
 * items in the same order on every visit — which matters because an item key is
 * what the attempt log and the review queue use to recognise one question
 * across sessions.
 */

/** Smallest decent seeded generator; we only need repeatable shuffles. */
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

/** Loose equality, used to keep an option from repeating the answer. */
function sameText(a: string, b: string): boolean {
  return a.trim().toLowerCase() === b.trim().toLowerCase()
}

/**
 * Three wrong options drawn from the unit itself, so every distractor is
 * plausible: same topic, same level, same register. Returns null when the pool
 * is too thin to make a real question — a two-option "choice" is a coin toss,
 * not practice.
 */
function withDistractors(
  correct: string,
  pool: readonly string[],
  rng: () => number,
  wanted = 3,
): { options: string[]; answerIndex: number } | null {
  const seen = new Set([correct.trim().toLowerCase()])
  const wrong: string[] = []

  for (const candidate of shuffled(pool, rng)) {
    const key = candidate.trim().toLowerCase()
    if (!candidate.trim() || seen.has(key)) continue
    seen.add(key)
    wrong.push(candidate)
    if (wrong.length === wanted) break
  }
  if (wrong.length < 2) return null

  const options = shuffled([correct, ...wrong], rng)
  return { options, answerIndex: options.findIndex(o => sameText(o, correct)) }
}

/** Sentences worth speaking: long enough to carry meaning, short enough to hold. */
function speakable(text: string, minWords = 2, maxWords = 12): boolean {
  const words = normaliseForSpeech(text).split(/\s+/).filter(Boolean)
  return words.length >= minWords && words.length <= maxWords
}

type Ctx = {
  rng: () => number
  t: ReturnType<typeof uiStrings>
}

/**
 * Hear a word, pick what it means. The first contact with a term is by ear,
 * before the learner has seen it written in that session.
 */
function listenAndChoose(unit: Unit, ctx: Ctx, limit: number): DrillItem[] {
  const terms = [...(unit.vocabulary ?? []), ...(unit.extraVocab ?? [])]
  const glosses = terms.map(v => firstVariant(v.en)).filter(Boolean)
  const out: DrillItem[] = []
  // A term can appear in both the core list and the extra one; asking it twice
  // in the same sitting looks like a bug to the learner.
  const asked = new Set<string>()

  for (const term of shuffled(terms, ctx.rng)) {
    if (out.length >= limit) break
    const spoken = firstVariant(term.pt)
    const meaning = firstVariant(term.en)
    if (!spoken || !meaning) continue

    const seen = spoken.toLowerCase()
    if (asked.has(seen)) continue
    asked.add(seen)

    const choice = withDistractors(meaning, glosses, ctx.rng)
    if (!choice) continue

    out.push({
      key: `gl${out.length}`,
      type: ctx.t.actListenChoose,
      instruction: ctx.t.actListenChooseHint,
      question: spoken,
      audio: { text: spoken, auto: true, isQuestion: true },
      options: choice.options,
      answerIndex: choice.answerIndex,
      expected: choice.options[choice.answerIndex],
      stage: 1,
    })
  }
  return out
}

/**
 * Read it in your own language, pick it in the one you are learning. Every
 * option can be played, so choosing is also listening.
 */
function sayIt(unit: Unit, ctx: Ctx, limit: number): DrillItem[] {
  const pairs = [
    ...(unit.vocabulary ?? []).map(v => ({ target: v.ex, own: v.exEn })),
    ...(unit.grammar?.examples ?? []).map(g => ({ target: g.pt, own: g.en })),
    ...(unit.grammar?.extendedExamples ?? []).map(g => ({ target: g.pt, own: g.en })),
  ].filter(p => p.target && p.own && speakable(p.target))

  const targets = pairs.map(p => p.target)
  const out: DrillItem[] = []

  for (const pair of shuffled(pairs, ctx.rng)) {
    if (out.length >= limit) break
    const choice = withDistractors(pair.target, targets, ctx.rng)
    if (!choice) continue

    out.push({
      key: `gs${out.length}`,
      type: ctx.t.actSayIt,
      instruction: ctx.t.actSayItHint,
      question: pair.own,
      options: choice.options,
      answerIndex: choice.answerIndex,
      expected: choice.options[choice.answerIndex],
      // The question is in the learner's own language, so nothing is given away
      // by letting them hear the candidates before deciding.
      optionsSpeak: true,
      // Hearing the candidates gives nothing away, but a single player sitting
      // on the right answer would, so that one waits until the answer is out.
      audio: { text: choice.options[choice.answerIndex], afterAnswer: true },
      stage: 3,
    })
  }
  return out
}

/**
 * Hear one line of the unit's dialogue, choose the reply that follows. The
 * wrong options are other lines from the same conversation, so the learner has
 * to follow the exchange rather than spot the odd one out.
 */
function dialogueGap(unit: Unit, ctx: Ctx, limit: number): DrillItem[] {
  const lines = (unit.dialogue?.lines ?? []).filter(l => speakable(l.pt, 1, 16))
  if (lines.length < 4) return []

  const replies = lines.map(l => l.pt)
  const out: DrillItem[] = []

  // Only positions with a line before them: that line is the spoken cue.
  const positions = shuffled(
    lines.map((_, i) => i).filter(i => i > 0),
    ctx.rng,
  )

  for (const at of positions) {
    if (out.length >= limit) break
    const cue = lines[at - 1].pt
    const reply = lines[at].pt

    // The cue was just played out loud; offering it back as a candidate reply
    // reads like a mistake.
    const choice = withDistractors(
      reply,
      replies.filter(r => !sameText(r, cue)),
      ctx.rng,
    )
    if (!choice) continue

    out.push({
      key: `gd${out.length}`,
      type: ctx.t.actDialogueGap,
      instruction: unit.dialogue?.scene
        ? `${ctx.t.actDialogueGapHint} — ${unit.dialogue.scene}`
        : ctx.t.actDialogueGapHint,
      question: cue,
      audio: { text: cue, auto: true, isQuestion: true },
      options: choice.options,
      answerIndex: choice.answerIndex,
      expected: choice.options[choice.answerIndex],
      optionsSpeak: true,
      stage: 4,
    })
  }
  return out
}

/**
 * Put a sentence back together from its words. Production, but with the
 * vocabulary handed over — the work is word order, not recall.
 */
function wordOrder(unit: Unit, ctx: Ctx, limit: number): DrillItem[] {
  const sentences = [
    ...(unit.grammar?.examples ?? []).map(g => g.pt),
    ...(unit.grammar?.extendedExamples ?? []).map(g => g.pt),
    ...(unit.vocabulary ?? []).map(v => v.ex),
  ].filter(s => s && speakable(s, 3, 8))

  const out: DrillItem[] = []
  const used = new Set<string>()

  for (const sentence of shuffled(sentences, ctx.rng)) {
    if (out.length >= limit) break
    const clean = normaliseForSpeech(sentence)
    const key = clean.toLowerCase()
    if (used.has(key)) continue

    // Punctuation has to come off the words: a chip ending in a full stop
    // announces itself as the last one, and the judging ignores it anyway.
    const tokens = clean
      .split(/\s+/)
      .map(w => w.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, ''))
      .filter(Boolean)
    if (tokens.length < 3) continue
    used.add(key)

    out.push({
      key: `go${out.length}`,
      type: ctx.t.actWordOrder,
      instruction: ctx.t.actWordOrderHint,
      question: '',
      audio: { text: clean, auto: true },
      kind: 'order',
      tokens: shuffled(tokens, ctx.rng),
      expected: clean,
      compare: 'loose',
      stage: 6,
    })
  }
  return out
}

/**
 * Hear a sentence, write it down. The hardest of the five, and the only one
 * where the learner produces every word unaided.
 *
 * Marked loose on purpose: this trains the ear, so a missing accent or comma is
 * not the mistake being looked for.
 */
function dictation(unit: Unit, ctx: Ctx, limit: number): DrillItem[] {
  const sentences = [
    ...(unit.vocabulary ?? []).map(v => v.ex),
    ...(unit.grammar?.examples ?? []).map(g => g.pt),
  ].filter(s => s && speakable(s, 2, 9))

  const out: DrillItem[] = []
  const used = new Set<string>()

  for (const sentence of shuffled(sentences, ctx.rng)) {
    if (out.length >= limit) break
    const clean = normaliseForSpeech(sentence)
    const key = clean.toLowerCase()
    if (used.has(key)) continue
    used.add(key)

    out.push({
      key: `gw${out.length}`,
      type: ctx.t.actDictation,
      instruction: ctx.t.actDictationHint,
      question: clean,
      audio: { text: clean, auto: true, isQuestion: true },
      expected: clean,
      compare: 'loose',
      stage: 7,
    })
  }
  return out
}


/**
 * Which of these is right? Grammar, from the mistakes the unit already warns
 * about — the ones a learner of this language really makes, written down by
 * someone who has heard them a hundred times.
 *
 * The wrong options are other units' flavours of wrong from the same list, so
 * every candidate is a mistake somebody has actually made.
 */
function fixMistake(unit: Unit, ctx: Ctx, limit: number): DrillItem[] {
  const slips = (unit.commonMistakes ?? []).filter(m => m.correct?.trim() && m.wrong?.trim())
  if (!slips.length) return []

  const wrongPool = slips.map(m => m.wrong)
  const out: DrillItem[] = []

  for (const slip of shuffled(slips, ctx.rng)) {
    if (out.length >= limit) break

    const choice = withDistractors(
      slip.correct,
      wrongPool.filter(w => !sameText(w, slip.correct)),
      ctx.rng,
      2,
    )
    if (!choice) continue

    out.push({
      key: `gm${out.length}`,
      type: ctx.t.actFixMistake,
      instruction: ctx.t.actFixMistakeHint,
      // The note explains why, so it waits: printed above the options it names
      // the wrong one and the question answers itself.
      why: slip.note?.trim() || undefined,
      question: '',
      options: choice.options,
      answerIndex: choice.answerIndex,
      expected: choice.options[choice.answerIndex],
      optionsSpeak: true,
      // Hearing the right one at the end is the correction that sticks.
      audio: { text: slip.correct, afterAnswer: true },
      stage: 5,
    })
  }
  return out
}

/**
 * Read it in your own language, write it in the other one. Writing proper:
 * no words handed over, no options to pick from, nothing to recognise.
 *
 * Short sentences only, and judged loosely — the exercise is to produce the
 * sentence, not to place the accents, which dictation already asks for.
 */
function writeIt(unit: Unit, ctx: Ctx, limit: number): DrillItem[] {
  const pairs = [
    ...(unit.vocabulary ?? []).map(v => ({ target: v.ex, own: v.exEn })),
    ...(unit.grammar?.examples ?? []).map(g => ({ target: g.pt, own: g.en })),
  ].filter(p => p.target && p.own && speakable(p.target, 2, 6))

  const out: DrillItem[] = []
  const used = new Set<string>()

  for (const pair of shuffled(pairs, ctx.rng)) {
    if (out.length >= limit) break
    const clean = normaliseForSpeech(pair.target)
    const key = clean.toLowerCase()
    if (used.has(key)) continue
    used.add(key)

    out.push({
      key: `gt${out.length}`,
      type: ctx.t.actWriteIt,
      instruction: ctx.t.actWriteItHint,
      question: pair.own,
      expected: clean,
      compare: 'loose',
      // Nothing is given away by the question, but the answer is, so it waits.
      audio: { text: clean, afterAnswer: true },
      stage: 8,
    })
  }
  return out
}

/** How many of each to build per unit. */
/*
 * Split on purpose between what the learner does, not just what the unit
 * holds: listening was two thirds of the practice and a whole round could go
 * by without a word being written or a form being chosen.
 *
 *   listening  listenChoose 5 + dialogueGap 2
 *   grammar    fixMistake 3 + wordOrder 3
 *   writing    dictation 3 + writeIt 3
 *   choosing   sayIt 3
 *
 * A unit that cannot fill a slot — no common mistakes written down, a dialogue
 * too short to cut up — simply yields fewer of that kind.
 */
export const ACTIVITY_LIMITS = {
  listenChoose: 5,
  sayIt: 3,
  dialogueGap: 2,
  fixMistake: 3,
  wordOrder: 3,
  dictation: 3,
  writeIt: 3,
} as const

/**
 * The generated half of a unit's practice. `lang` is the language being taught;
 * the labels come back in the learner's own one.
 */
export function generatedActivities(
  unit: Unit,
  lang: string,
  seed: string,
): DrillItem[] {
  const ctx: Ctx = { rng: mulberry32(seedFrom(seed)), t: uiStrings(lang) }

  return [
    ...listenAndChoose(unit, ctx, ACTIVITY_LIMITS.listenChoose),
    ...sayIt(unit, ctx, ACTIVITY_LIMITS.sayIt),
    ...dialogueGap(unit, ctx, ACTIVITY_LIMITS.dialogueGap),
    ...fixMistake(unit, ctx, ACTIVITY_LIMITS.fixMistake),
    ...wordOrder(unit, ctx, ACTIVITY_LIMITS.wordOrder),
    ...dictation(unit, ctx, ACTIVITY_LIMITS.dictation),
    ...writeIt(unit, ctx, ACTIVITY_LIMITS.writeIt),
  ]
}
