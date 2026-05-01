/**
 * generate-en-curriculum.mjs
 *
 * Generates a complete English course (for Portuguese speakers) using Claude.
 * Same Unit structure as curriculum.ts, but:
 *   - pt field = English (the language being taught)
 *   - en field = Portuguese (native language translation)
 *   - grammar.explain = in Portuguese
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-... node scripts/generate-en-curriculum.mjs
 *
 * Saves progress to scripts/en-curriculum-cache.json.
 * Writes lib/curriculum-en.ts when done.
 */

import Anthropic from '@anthropic-ai/sdk'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const CACHE_PATH = join(__dirname, 'en-curriculum-cache.json')
const OUT_PATH = join(ROOT, 'lib', 'curriculum-en.ts')

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// Course structure: same 50-unit layout as the Portuguese course
const COURSE_PLAN = [
  {
    id: 'a1', label: 'A1', name: 'Inglês do Zero', emoji: '👋',
    desc: 'Inglês de sobrevivência. Cumprimentos, números, necessidades básicas e suas primeiras conversas reais.',
    color: '#e8f4fd', accent: '#1a5c9e', bar: '#5ba3d4',
    units: [
      { title: 'Hello & Goodbye', sub: 'Cumprimentos e despedidas', emoji: '👋', grammar_topic: 'To be — presente simples (I am, you are, he/she is)' },
      { title: 'Numbers & Age', sub: 'Números, idade e datas', emoji: '🔢', grammar_topic: 'How old are you? / I am + number + years old' },
      { title: 'Colors & Descriptions', sub: 'Cores e descrições básicas', emoji: '🎨', grammar_topic: 'Adjetivos em inglês — posição antes do substantivo' },
      { title: 'Family & People', sub: 'Família e pessoas ao redor', emoji: '👨‍👩‍👧', grammar_topic: 'Possessivos: my, your, his, her, our, their' },
      { title: 'Food & Drinks', sub: 'Comida e bebidas do dia a dia', emoji: '🍕', grammar_topic: 'Would you like...? / I\'d like...' },
      { title: 'Days, Months & Time', sub: 'Dias, meses e horas', emoji: '📅', grammar_topic: 'What time is it? / It\'s + hora' },
      { title: 'Home & Objects', sub: 'Cômodos e objetos da casa', emoji: '🏠', grammar_topic: 'There is / There are' },
      { title: 'Getting Around', sub: 'Direções e transporte', emoji: '🗺️', grammar_topic: 'Como pedir e dar direções: Turn left/right, Go straight' },
      { title: 'Shopping & Money', sub: 'Compras e dinheiro', emoji: '🛍️', grammar_topic: 'How much is it? / It costs...' },
      { title: 'Weather & Seasons', sub: 'Clima e estações do ano', emoji: '🌤️', grammar_topic: 'What\'s the weather like? / It\'s + adjetivo' },
      { title: 'Daily Routine', sub: 'Rotina e hábitos diários', emoji: '⏰', grammar_topic: 'Present Simple para rotinas: I wake up, I eat, I go' },
      { title: 'A1 Review & Conversation', sub: 'Revisão e primeira conversa completa', emoji: '🎯', grammar_topic: 'Revisão: to be, have got, present simple, questions' },
    ]
  },
  {
    id: 'a2', label: 'A2', name: 'Inglês Básico', emoji: '💬',
    desc: 'Comece a se expressar. Passado, futuro, opiniões e situações cotidianas.',
    color: '#fef3e2', accent: '#9a4f0a', bar: '#e8973e',
    units: [
      { title: 'Talking About the Past', sub: 'Passado simples — ações concluídas', emoji: '📖', grammar_topic: 'Simple Past: regular verbs (-ed) e irregulares' },
      { title: 'Making Plans', sub: 'Planos e intenções futuras', emoji: '📅', grammar_topic: 'Going to + verb para planos; Will para decisões espontâneas' },
      { title: 'Likes & Opinions', sub: 'Gostos, preferências e opiniões', emoji: '💭', grammar_topic: 'I like/love/hate + -ing; I think that...' },
      { title: 'Describing People & Places', sub: 'Descrições mais detalhadas', emoji: '🖼️', grammar_topic: 'Comparativos e superlativos: bigger, the biggest' },
      { title: 'Home & Living', sub: 'Casa, moradia e vizinhança', emoji: '🏡', grammar_topic: 'Present Continuous: I am living, she is working' },
      { title: 'Work & Study', sub: 'Trabalho, estudo e profissões', emoji: '💼', grammar_topic: 'Can / Can\'t para habilidades; Have to para obrigações' },
      { title: 'Hobbies & Free Time', sub: 'Hobbies, esportes e lazer', emoji: '🎮', grammar_topic: 'How often...? / Adverbs of frequency: always, usually, never' },
      { title: 'At the Restaurant', sub: 'Pedir comida e entender cardápios', emoji: '🍽️', grammar_topic: 'Would like, Could I have...?, Some/any' },
      { title: 'Travel & Tourism', sub: 'Viagens e situações de aeroporto', emoji: '✈️', grammar_topic: 'Present Perfect: Have you ever...? / I\'ve been to...' },
      { title: 'Emotions & Relationships', sub: 'Sentimentos e relacionamentos', emoji: '❤️', grammar_topic: 'Feel + adjetivo; Look + adjetivo; Seem + adjetivo' },
      { title: 'A2 Review & Consolidation', sub: 'Revisão e conversa do nível A2', emoji: '🎯', grammar_topic: 'Revisão: Simple Past, Going to, Comparatives, Present Perfect' },
    ]
  },
  {
    id: 'b1', label: 'B1', name: 'Inglês Intermediário', emoji: '🚀',
    desc: 'Expresse ideias complexas. Subjuntivo, condicionais e comunicação fluente.',
    color: '#f0fdf4', accent: '#1f6b2e', bar: '#4ade80',
    units: [
      { title: 'Unfinished Past', sub: 'Ações do passado com efeito no presente', emoji: '⏳', grammar_topic: 'Present Perfect vs Simple Past: I have lived / I lived' },
      { title: 'Hypothetical Situations', sub: 'Situações hipotéticas e irreais', emoji: '🤔', grammar_topic: '2nd Conditional: If I had..., I would...' },
      { title: 'Expressing Opinions', sub: 'Opiniões, concordância e discordância', emoji: '💬', grammar_topic: 'I agree/disagree; In my opinion...; That\'s a good point, but...' },
      { title: 'Passive Voice', sub: 'Voz passiva em contextos formais', emoji: '📰', grammar_topic: 'Passive Voice: The book was written by...' },
      { title: 'Advice & Obligation', sub: 'Dar conselhos e expressar obrigação', emoji: '🎓', grammar_topic: 'Should, ought to, must, have to — diferenças de uso' },
      { title: 'Probability & Uncertainty', sub: 'Probabilidade e incerteza', emoji: '🎲', grammar_topic: 'Modal verbs: might, may, could para probabilidade' },
      { title: 'Connectors & Discourse', sub: 'Conectivos e coesão textual', emoji: '🔗', grammar_topic: 'Although, however, therefore, moreover, on the other hand' },
      { title: 'Complaints & Problems', sub: 'Reclamar e resolver problemas', emoji: '⚠️', grammar_topic: 'I\'m afraid...; I\'d like to complain about...; Could you possibly...' },
      { title: 'Narrating Stories', sub: 'Contar histórias e anedotas', emoji: '📚', grammar_topic: 'Past Continuous + Simple Past: I was walking when I saw...' },
      { title: 'Media & Current Events', sub: 'Mídia e eventos atuais', emoji: '📺', grammar_topic: 'Reported Speech: She said that... / He told me that...' },
      { title: 'B1 Review & Assessment', sub: 'Revisão e avaliação B1', emoji: '🎯', grammar_topic: 'Revisão: Present Perfect, Conditionals, Passive, Reported Speech' },
    ]
  },
  {
    id: 'b2', label: 'B2', name: 'Inglês Avançado', emoji: '⭐',
    desc: 'Domine nuances. Vocabulário rico, gramática refinada e fluência real.',
    color: '#faf5ff', accent: '#6b21a8', bar: '#a855f7',
    units: [
      { title: 'Advanced Conditionals', sub: 'Condicionais avançados e mistos', emoji: '🔀', grammar_topic: '3rd Conditional & Mixed: If I had studied, I would have passed' },
      { title: 'Nuanced Vocabulary', sub: 'Vocabulário preciso e registro formal', emoji: '📘', grammar_topic: 'Collocations, phrasal verbs e diferenças de registro' },
      { title: 'Argumentation & Debate', sub: 'Argumentação e debate em inglês', emoji: '🗣️', grammar_topic: 'Hedging language: It seems to me / It could be argued that...' },
      { title: 'Literary English', sub: 'Inglês literário e estilístico', emoji: '📖', grammar_topic: 'Inversão para ênfase: Never have I seen..., Not only did he...' },
      { title: 'Advanced Grammar', sub: 'Refinamento gramatical avançado', emoji: '⚙️', grammar_topic: 'Cleft sentences: It was John who..., What I need is...' },
      { title: 'American Culture & Slang', sub: 'Cultura americana e gírias', emoji: '🇺🇸', grammar_topic: 'Informal spoken English: gonna, wanna, kinda, yeah, nope' },
      { title: 'Advanced Reading', sub: 'Compreensão avançada de textos', emoji: '📑', grammar_topic: 'Nominalization e linguagem acadêmica' },
      { title: 'B2 Consolidation', sub: 'Consolidação e fluência B2', emoji: '🎯', grammar_topic: 'Revisão: Advanced Conditionals, Inversão, Cleft Sentences' },
    ]
  },
  {
    id: 'c1', label: 'C1', name: 'Inglês Proficiente', emoji: '💎',
    desc: 'Expressão sofisticada. Ironia, humor e domínio cultural.',
    color: '#fff1f2', accent: '#9b1c1c', bar: '#f87171',
    units: [
      { title: 'Idiomatic English', sub: 'Expressões idiomáticas nativas', emoji: '🗣️', grammar_topic: 'Idioms em contexto: break a leg, hit the nail on the head...' },
      { title: 'Advanced Listening', sub: 'Compreensão de sotaques e velocidade', emoji: '🎧', grammar_topic: 'Reduced speech: gonna, wanna, shoulda, coulda, wouldda' },
      { title: 'Academic Writing', sub: 'Escrita acadêmica e formal', emoji: '✍️', grammar_topic: 'Complex sentence structures e coesão em textos longos' },
      { title: 'Humour & Irony', sub: 'Humor e ironia em inglês', emoji: '😄', grammar_topic: 'Understatement, sarcasm e double meaning em inglês' },
      { title: 'C1 Synthesis', sub: 'Síntese e maestria C1', emoji: '🎯', grammar_topic: 'Revisão: Idioms, Advanced Writing, Cultural Nuance' },
    ]
  },
  {
    id: 'c2', label: 'C2', name: 'Inglês Nativo', emoji: '👑',
    desc: 'Precisão absoluta. Sociolinguística, variação regional e maestria total.',
    color: '#fafaf9', accent: '#1a1814', bar: '#57534e',
    units: [
      { title: 'Native-Level Precision', sub: 'Precisão e elegância nativa', emoji: '🎯', grammar_topic: 'Subtle distinctions: shall/will, can/may, that/which' },
      { title: 'Sociolinguistics', sub: 'Variação regional e sociolinguística', emoji: '🌍', grammar_topic: 'British vs American English; dialects e register shifts' },
      { title: 'C2 Capstone', sub: 'Maestria total em inglês', emoji: '👑', grammar_topic: 'Revisão total: do nível A1 ao C2 — consolidação final' },
    ]
  },
]

function buildPrompt(modLabel, modName, unitPlan) {
  return `You are creating content for a Brazilian Portuguese speaker learning English from scratch.
Module: ${modLabel} — ${modName}
Unit: "${unitPlan.title}" (${unitPlan.sub})
Grammar focus: ${unitPlan.grammar_topic}

IMPORTANT FIELD CONVENTION:
- "pt" field = the English word/phrase being TAUGHT (even though it says "pt")
- "en" field = the Portuguese TRANSLATION (even though it says "en")
- "ex" field = an example sentence IN ENGLISH
- "exEn" field = the PORTUGUESE translation of that example
- grammar.explain = explanation IN PORTUGUESE (the learner's native language)
- dialogue lines: "pt" = what is said IN ENGLISH, "en" = PORTUGUESE translation

Generate ONLY a valid JSON object (no markdown, no extra text) with this exact structure:

{
  "title": "${unitPlan.title}",
  "sub": "${unitPlan.sub}",
  "emoji": "${unitPlan.emoji}",
  "duration": "~45 min",
  "objectives": [
    "objective 1 written in Portuguese",
    "objective 2 written in Portuguese",
    "objective 3 written in Portuguese"
  ],
  "vocabulary": [
    { "pt": "English word", "en": "tradução em português", "ex": "English example sentence.", "exEn": "Tradução da frase em português." }
  ],
  "grammar": {
    "title": "${unitPlan.grammar_topic}",
    "explain": "Explanation of the grammar rule IN PORTUGUESE (2-3 sentences)",
    "structure": "English grammar pattern / structure",
    "examples": [
      { "pt": "English example sentence", "en": "Tradução em português" }
    ]
  },
  "dialogue": {
    "scene": "Scene description in Portuguese",
    "lines": [
      { "sp": "a", "pt": "What speaker A says in English", "en": "Tradução em português" }
    ]
  },
  "exercises": [
    {
      "type": "Fill in the blank",
      "instruction": "Complete a frase com a palavra correta.",
      "items": [
        { "q": "English sentence with ___ blank", "ans": "correct English word" }
      ]
    },
    {
      "type": "Multiple choice",
      "instruction": "Escolha a opção correta.",
      "items": [
        { "q": "English sentence or question", "opts": ["Option A", "Option B", "Option C", "Option D"], "ans": 0 }
      ]
    }
  ],
  "culture": {
    "title": "Cultural title in Portuguese",
    "text": "Cultural note about English-speaking countries IN PORTUGUESE (3-4 sentences)"
  }
}

Rules:
- objectives: exactly 3, written IN PORTUGUESE (what the student will learn)
- vocabulary: exactly 8 items — English words/phrases in "pt", Portuguese in "en"
- grammar.explain: IN PORTUGUESE, clear for a beginner/intermediate learner
- grammar.examples: exactly 5 — English in "pt", Portuguese in "en"
- dialogue: 6-8 lines alternating between speakers a and b, scene in Portuguese
- exercises[0] (fill blank): exactly 5 items
- exercises[1] (multiple choice): exactly 5 items, "ans" is 0-based index of correct option
  - FILL IN THE BLANK rule: if ans is a verb, the sentence already has the subject. If ans is a subject, sentence already has the verb. Never embed the answer in the question.
  - MULTIPLE CHOICE rule: all 4 options must be the same grammatical type; exactly one is correct
- culture: 3-4 sentences IN PORTUGUESE about culture from English-speaking countries
- All exercise instructions IN PORTUGUESE
- CEFR level: ${modLabel}`
}

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('Set ANTHROPIC_API_KEY env var first.')
    process.exit(1)
  }

  const totalUnits = COURSE_PLAN.reduce((n, m) => n + m.units.length, 0)
  console.log(`Generating English course: ${totalUnits} units across ${COURSE_PLAN.length} modules.\n`)

  const cache = existsSync(CACHE_PATH) ? JSON.parse(readFileSync(CACHE_PATH, 'utf8')) : {}
  let generated = 0, skipped = 0, errors = 0

  for (const mod of COURSE_PLAN) {
    for (let ui = 0; ui < mod.units.length; ui++) {
      const key = `${mod.id}-${ui}`
      if (cache[key]) {
        process.stdout.write(`  ⏭  ${mod.label} Unit ${ui + 1}: ${mod.units[ui].title}\n`)
        skipped++
        continue
      }

      const unitPlan = mod.units[ui]
      process.stdout.write(`  ⏳  ${mod.label} Unit ${ui + 1}/${mod.units.length}: ${unitPlan.title} ... `)

      try {
        const msg = await client.messages.create({
          model: 'claude-sonnet-4-6',
          max_tokens: 4096,
          messages: [{ role: 'user', content: buildPrompt(mod.label, mod.name, unitPlan) }],
        })

        const raw = msg.content[0].text.trim()
        const jsonStr = raw.startsWith('{') ? raw : raw.replace(/^```json?\n?/, '').replace(/\n?```$/, '')
        const unit = JSON.parse(jsonStr)
        cache[key] = unit
        writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2))
        generated++
        process.stdout.write('✓\n')
      } catch (e) {
        errors++
        process.stdout.write(`✗ ${e.message.slice(0, 80)}\n`)
      }

      await new Promise(r => setTimeout(r, 500))
    }
  }

  console.log(`\nDone. Generated: ${generated}, Skipped: ${skipped}, Errors: ${errors}`)

  if (Object.keys(cache).length === 0) {
    console.log('No data in cache — nothing to write.')
    return
  }

  console.log('Building curriculum-en.ts ...')

  const modules = COURSE_PLAN.map(mod => ({
    id: mod.id,
    label: mod.label,
    name: mod.name,
    desc: mod.desc,
    emoji: mod.emoji,
    color: mod.color,
    accent: mod.accent,
    bar: mod.bar,
    units: mod.units.map((_, ui) => cache[`${mod.id}-${ui}`]).filter(Boolean),
  }))

  const interfaces = `// Auto-generated English course curriculum
// Field convention: "pt" = English (target language), "en" = Portuguese (native language)
// Grammar explanations are in Portuguese for the learner.

import { Module } from './curriculum'

`

  const out = interfaces + `export const EN_MODULES: Module[] = ${JSON.stringify(modules, null, 2)}\n`

  writeFileSync(OUT_PATH, out)
  console.log(`\n✅  Written: lib/curriculum-en.ts`)
}

main().catch(err => { console.error(err); process.exit(1) })
