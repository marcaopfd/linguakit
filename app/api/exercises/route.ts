import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { Unit } from '@/lib/curriculum'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'your_anthropic_api_key_here') {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY not configured in .env' }, { status: 400 })
  }

  try {
    const { unit }: { unit: Unit } = await req.json()

    const prompt = `You are a Brazilian Portuguese language teacher. Generate 3 additional practice exercises for the following unit:

Unit: ${unit.title}
Grammar focus: ${unit.grammar.title} — ${unit.grammar.explain}
Vocabulary: ${unit.vocabulary.map(v => v.pt).join(', ')}

Return ONLY valid JSON in this exact format:
{
  "exercises": [
    { "type": "multiple_choice", "question": "...", "options": ["...", "...", "...", "..."], "answer": 0, "explanation": "..." },
    { "type": "fill_blank", "question": "Complete: ...", "answer": "..." },
    { "type": "translation", "english": "...", "portuguese": "..." }
  ]
}`

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = message.content[0].type === 'text' ? message.content[0].text : ''
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) return NextResponse.json({ error: 'Could not parse Claude response.' }, { status: 500 })

    const parsed = JSON.parse(jsonMatch[0])
    return NextResponse.json(parsed)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to generate exercises', details: String(err) }, { status: 500 })
  }
}
