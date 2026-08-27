/**
 * expand-curriculum-en.mjs
 *
 * The English-course counterpart of expand-curriculum.mjs. Calls Claude for
 * each unit in lib/curriculum-en.ts to add:
 *   extraVocab, extendedExamples, commonMistakes, extraExercises, teacherTip
 *
 * Field convention in the EN curriculum (see the header of lib/curriculum-en.ts):
 *   "pt" = English  (the language being taught)
 *   "en" = Portuguese (the learner's native language)
 * Instructions and explanations are written in Portuguese for the learner.
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-... node scripts/expand-curriculum-en.mjs
 *
 * Progress is saved to scripts/en-expansion-cache.json after every unit, so you
 * can Ctrl+C and re-run — already-processed units are skipped and cost nothing.
 *
 * When finished it writes lib/curriculum-en-expanded.ts. Review it, then:
 *   cp lib/curriculum-en-expanded.ts lib/curriculum-en.ts
 */

import Anthropic from '@anthropic-ai/sdk'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const CACHE_PATH = join(__dirname, 'en-expansion-cache.json')
const CURRICULUM_PATH = join(ROOT, 'lib', 'curriculum-en.ts')
const MARKER = 'export const EN_MODULES'

function loadSource() {
  return readFileSync(CURRICULUM_PATH, 'utf8')
}

/** Locate the module array literal so we can parse it and later splice it back. */
function findArrayBounds(src) {
  const idx = src.indexOf(MARKER)
  if (idx === -1) throw new Error(`Could not find "${MARKER}" in ${CURRICULUM_PATH}`)
  const eqIdx = src.indexOf('= [', idx)
  const arrStart = eqIdx + 2
  let depth = 0, i = arrStart
  for (; i < src.length; i++) {
    if (src[i] === '[') depth++
    else if (src[i] === ']') { depth--; if (depth === 0) break }
  }
  return { arrStart, arrEnd: i }
}

function loadModules(src) {
  const { arrStart, arrEnd } = findArrayBounds(src)
  return JSON.parse(src.slice(arrStart, arrEnd + 1))
}

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

function buildPrompt(unit, modLabel) {
  return `You are an English teacher creating extra practice material for a Brazilian Portuguese-speaking student learning English.

Unit: ${unit.title} (${modLabel})
Grammar: ${unit.grammar.title}
Pattern: ${unit.grammar.structure}

Generate ONLY a valid JSON object (no markdown, no extra text).

FIELD CONVENTION — this is the opposite of what you might assume:
- "pt" holds the ENGLISH text (the language being taught)
- "en" holds the PORTUGUESE translation (the learner's native language)
- "ex" is an English example sentence, "exEn" is its Portuguese translation

All "instruction" strings must be written in PORTUGUESE, because the learner reads Portuguese.

FILL IN THE BLANK rules:
- The ___ blank must be exactly what the answer provides
- If answer is a VERB (e.g. "am"), the sentence must already have the subject: "I ___ a teacher." ✓ — NOT "___ am a teacher." ✗
- If answer is a SUBJECT PRONOUN (e.g. "I"), the sentence must already have the verb: "___ am a teacher." ✓
- Never put the answer word in both the question AND the answer
- Each item must have a clean, unambiguous correct answer

MULTIPLE CHOICE rules:
- The ___ blank in "q" must be filled by one of the opts (not by something already in the sentence)
- All 4 options must be the same TYPE (all verbs, all nouns, all pronouns, etc.)
- Exactly one option must be clearly correct; the other 3 must be plausible but wrong
- Do NOT embed the answer inside the question text
- "ans" is the 0-based index of the correct option

TRANSLATION rules:
- "q" is the PORTUGUESE sentence, "ans" is the ENGLISH translation
- Keep sentences at ${modLabel} level

{
  "extraVocab": [
    { "pt": "doctor", "en": "médico", "ex": "She is a doctor.", "exEn": "Ela é médica." }
  ],
  "extendedExamples": [
    { "pt": "I am a student.", "en": "Eu sou estudante." }
  ],
  "commonMistakes": [
    { "wrong": "I have 25 years.", "correct": "I am 25 years old.", "note": "Em inglês usa-se o verbo 'to be' para idade, não 'to have'." }
  ],
  "extraExercises": [
    {
      "type": "Fill in the blank",
      "instruction": "Complete a frase com a palavra correta.",
      "items": [
        { "q": "I ___ a teacher.", "ans": "am" }
      ]
    },
    {
      "type": "Multiple choice",
      "instruction": "Escolha a opção correta.",
      "items": [
        { "q": "She ___ Brazilian.", "opts": ["am", "is", "are", "be"], "ans": 1 }
      ]
    },
    {
      "type": "Translation",
      "instruction": "Traduza para o inglês.",
      "items": [
        { "q": "Eu sou médico.", "ans": "I am a doctor." }
      ]
    }
  ],
  "teacherTip": "Dica de ensino em português, 1-2 frases, específica para esta unit."
}

Rules:
- extraVocab: exactly 5 items, thematically related to "${unit.title}"
- extendedExamples: exactly 5 items using the pattern "${unit.grammar.structure}"
- commonMistakes: exactly 3 mistakes Brazilian Portuguese speakers make with this grammar/vocab; the "note" must be in Portuguese
- extraExercises: each block has exactly 5 items
- English should be neutral/standard (American spelling)
- Level: CEFR ${modLabel}`
}

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('Set ANTHROPIC_API_KEY env var first.')
    process.exit(1)
  }

  const src = loadSource()
  const modules = loadModules(src)
  const totalUnits = modules.reduce((n, m) => n + m.units.length, 0)
  console.log(`Loaded ${totalUnits} units across ${modules.length} modules.\n`)

  const cache = existsSync(CACHE_PATH) ? JSON.parse(readFileSync(CACHE_PATH, 'utf8')) : {}
  let saved = 0, skipped = 0, errors = 0

  for (const mod of modules) {
    for (let ui = 0; ui < mod.units.length; ui++) {
      const key = `${mod.id}-${ui}`
      if (cache[key]) {
        process.stdout.write(`  ⏭  ${mod.label} Unit ${ui + 1}: ${mod.units[ui].title}\n`)
        skipped++
        continue
      }

      const unit = mod.units[ui]
      process.stdout.write(`  ⏳  ${mod.label} Unit ${ui + 1}/${mod.units.length}: ${unit.title} ... `)

      try {
        const msg = await client.messages.create({
          model: 'claude-sonnet-5',
          max_tokens: 4096,
          messages: [{ role: 'user', content: buildPrompt(unit, mod.label) }],
        })

        const raw = msg.content.find(b => b.type === 'text').text.trim()
        const jsonStr = raw.startsWith('{') ? raw : raw.replace(/^```json?\n?/, '').replace(/\n?```$/, '')
        const expansion = JSON.parse(jsonStr)
        cache[key] = expansion
        writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2))
        saved++
        process.stdout.write('✓\n')
      } catch (e) {
        errors++
        process.stdout.write(`✗ ${e.message.slice(0, 80)}\n`)
      }

      await new Promise(r => setTimeout(r, 500))
    }
  }

  console.log(`\nDone. New: ${saved}, Skipped: ${skipped}, Errors: ${errors}`)

  if (Object.keys(cache).length === 0) {
    console.log('No data in cache — nothing to write.')
    return
  }

  console.log('Building curriculum-en-expanded.ts ...')

  const expandedModules = modules.map(mod => ({
    ...mod,
    units: mod.units.map((unit, ui) => {
      const exp = cache[`${mod.id}-${ui}`]
      if (!exp) return unit
      const merged = { ...unit }
      if (exp.extraVocab?.length) merged.extraVocab = exp.extraVocab
      if (exp.extendedExamples?.length) merged.grammar = { ...unit.grammar, extendedExamples: exp.extendedExamples }
      if (exp.commonMistakes?.length) merged.commonMistakes = exp.commonMistakes
      if (exp.extraExercises?.length) merged.extraExercises = exp.extraExercises
      if (exp.teacherTip) merged.teacherTip = exp.teacherTip
      return merged
    }),
  }))

  const { arrStart, arrEnd } = findArrayBounds(src)
  const out = src.slice(0, arrStart) + JSON.stringify(expandedModules, null, 2) + src.slice(arrEnd + 1)

  const outPath = join(ROOT, 'lib', 'curriculum-en-expanded.ts')
  writeFileSync(outPath, out)
  console.log(`\n✅  Written: lib/curriculum-en-expanded.ts`)
  console.log('Review it, then run:')
  console.log('  cp lib/curriculum-en-expanded.ts lib/curriculum-en.ts')
}

main().catch(err => { console.error(err); process.exit(1) })
