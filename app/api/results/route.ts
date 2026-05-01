import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const students = await prisma.student.findMany({
      include: { testResult: true },
      orderBy: { createdAt: 'desc' },
    })

    const formatted = students.map(s => ({
      id: s.id,
      name: s.name,
      email: s.email,
      createdAt: s.createdAt,
      testResult: s.testResult
        ? {
            level: s.testResult.level,
            levelName: s.testResult.levelName,
            totalScore: s.testResult.totalScore,
            pct: s.testResult.pct,
            skills: JSON.parse(s.testResult.skills),
            weaknesses: JSON.parse(s.testResult.weaknesses),
            strengths: JSON.parse(s.testResult.strengths),
            recommendation: s.testResult.recommendation,
            course: s.testResult.course,
            createdAt: s.testResult.createdAt,
          }
        : null,
    }))

    return NextResponse.json({ students: formatted })
  } catch (err) {
    return NextResponse.json({ error: 'Database error', details: String(err) }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, level, levelName, totalCorrect, pct, sectionScores, skillPcts, strengths, weaknesses, course } = body

    const student = await prisma.student.create({
      data: {
        name: name || 'Student',
        testResult: {
          create: {
            level,
            levelName,
            totalScore: totalCorrect,
            pct,
            skills: JSON.stringify(
              Object.fromEntries(
                Object.entries(skillPcts as Record<string, number>).map(([k, v]) => [k, { correct: (sectionScores as Record<string, number>)[k], pct: v }])
              )
            ),
            weaknesses: JSON.stringify(weaknesses),
            strengths: JSON.stringify(strengths),
            recommendation: body.recommendation ?? level,
            course: course ?? 'pt',
          },
        },
      },
      include: { testResult: true },
    })

    return NextResponse.json({ ok: true, studentId: student.id })
  } catch (err) {
    return NextResponse.json({ error: 'Could not save result', details: String(err) }, { status: 500 })
  }
}
