/**
 * expand-curriculum.mjs
 *
 * Calls Claude for each unit in lib/curriculum.ts to add:
 *   extraVocab, extendedExamples, commonMistakes, extraExercises, teacherTip
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-... node scripts/expand-curriculum.mjs
 *
 * Progress is saved to scripts/expansion-cache.json after every unit so you
 * can Ctrl+C and re-run — already-processed units are skipped.
 *
 * When finished it writes lib/curriculum-expanded.ts. Review it, then replace
 * lib/curriculum.ts with it.
 */

import Anthropic from '@anthropic-ai/sdk'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const CACHE_PATH = join(__dirname, 'expansion-cache.json')
const CURRICULUM_PATH = join(ROOT, 'lib', 'curriculum.ts')

function loadModules() {
  const src = readFileSync(CURRICULUM_PATH, 'utf8')
  const marker = 'export const MODULES'
  const idx = src.indexOf(marker)
  const eqIdx = src.indexOf('= [', idx)
  const arrStart = eqIdx + 2
  let depth = 0, i = arrStart
  for (; i < src.length; i++) {
    if (src[i] === '[') depth++
    else if (src[i] === ']') { depth--; if (depth === 0) break }
  }
  return JSON.parse(src.slice(arrStart, i + 1))
}

function loadSource() {
  return readFileSync(CURRICULUM_PATH, 'utf8')
}

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

function buildPrompt(unit, modLabel) {
  return `You are a Brazilian Portuguese language teacher creating extra practice material for an English-speaking student.

Unit: ${unit.title} (${modLabel})
Grammar: ${unit.grammar.title}
Pattern: ${unit.grammar.structure}

Generate ONLY a valid JSON object (no markdown, no extra text). Follow these rules strictly:

FILL IN THE BLANK rules:
- The ___ blank must be exactly what the answer provides
- If answer is a VERB (e.g. "sou"), the sentence must already have the subject: "Eu ___ médico." ✓ — NOT "___ sou médico." ✗
- If answer is a SUBJECT PRONOUN (e.g. "Eu"), the sentence must already have the verb: "___ sou médico." ✓
- Never put "sou" in both the question AND the answer
- Each item must have a clean, unambiguous correct answer

MULTIPLE CHOICE rules:
- The ___ blank in "q" must be filled by one of the opts (not by something already in the sentence)
- All 4 options must be the same TYPE (all verbs, all nouns, all pronouns, etc.)
- Exactly one option must be clearly correct; the other 3 must be plausible but wrong
- Do NOT embed the answer inside the question text
- "ans" is the 0-based index of the correct option

TRANSLATION rules:
- "q" is English, "ans" is the Brazilian Portuguese translation
- Keep sentences at ${modLabel} level

{
  "extraVocab": [
    { "pt": "...", "en": "...", "ex": "...", "exEn": "..." }
  ],
  "extendedExamples": [
    { "pt": "...", "en": "..." }
  ],
  "commonMistakes": [
    { "wrong": "...", "correct": "...", "note": "..." }
  ],
  "extraExercises": [
    {
      "type": "Fill in the blank",
      "instruction": "Complete the sentence with the correct word.",
      "items": [
        { "q": "Eu ___ professor.", "ans": "sou" }
      ]
    },
    {
      "type": "Multiple choice",
      "instruction": "Choose the correct option.",
      "items": [
        { "q": "Ela ___ brasileira.", "opts": ["sou", "é", "somos", "são"], "ans": 1 }
      ]
    },
    {
      "type": "Translation",
      "instruction": "Translate into Brazilian Portuguese.",
      "items": [
        { "q": "I am a doctor.", "ans": "Eu sou médico." }
      ]
    }
  ],
  "teacherTip": "1-2 sentence teaching tip for this specific unit."
}

Rules:
- extraVocab: exactly 5 items, thematically related to "${unit.title}"
- extendedExamples: exactly 5 items using the pattern "${unit.grammar.structure}"
- commonMistakes: exactly 3 mistakes English speakers make with this grammar/vocab
- extraExercises: each block has exactly 5 items
- All Portuguese must be Brazilian Portuguese (not European)
- Level: CEFR ${modLabel}`
}

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('Set ANTHROPIC_API_KEY env var first.')
    process.exit(1)
  }

  const modules = loadModules()
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
          model: 'claude-sonnet-4-6',
          max_tokens: 4096,
          messages: [{ role: 'user', content: buildPrompt(unit, mod.label) }],
        })

        const raw = msg.content[0].text.trim()
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

  console.log('Building curriculum-expanded.ts ...')

  const src = loadSource()
  const expandedModules = modules.map(mod => ({
    ...mod,
    units: mod.units.map((unit, ui) => {
      const key = `${mod.id}-${ui}`
      const exp = cache[key]
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

  // Replace MODULES value in source while keeping all the interface definitions
  const marker = 'export const MODULES'
  const idx = src.indexOf(marker)
  const eqIdx = src.indexOf('= [', idx)
  const arrStart = eqIdx + 2
  let depth = 0, i = arrStart
  for (; i < src.length; i++) {
    if (src[i] === '[') depth++
    else if (src[i] === ']') { depth--; if (depth === 0) break }
  }
  // i now points at the closing ']' of MODULES
  const beforeArr = src.slice(0, arrStart)
  const afterArr = src.slice(i + 1) // ';' or '\n' etc.

  const out = beforeArr + JSON.stringify(expandedModules, null, 2) + afterArr

  const outPath = join(ROOT, 'lib', 'curriculum-expanded.ts')
  writeFileSync(outPath, out)
  console.log(`\n✅  Written: lib/curriculum-expanded.ts`)
  console.log('Review it, then run:')
  console.log('  cp lib/curriculum-expanded.ts lib/curriculum.ts')
}

main().catch(err => { console.error(err); process.exit(1) })
