import { NextRequest, NextResponse } from 'next/server'
import { prisma, withDb } from '@/lib/db'
import { requireTeacher } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const denied = requireTeacher(req)
  if (denied) return denied

  try {
    // Explicit select: the password hash must never leave the server.
    const students = await withDb(() => prisma.student.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        course: true,
        newsletter: true,
        newsletterAt: true,
        createdAt: true,
        testResult: true,
        // Newest row from each activity table, so "last active" costs two
        // indexed lookups per student instead of loading their whole history.
        lessons: { select: { completedAt: true }, orderBy: { completedAt: 'desc' }, take: 1 },
        attempts: { select: { answeredAt: true }, orderBy: { answeredAt: 'desc' }, take: 1 },
      },
      orderBy: { createdAt: 'desc' },
    }))

    const formatted = students.map(s => {
      const marks = [s.lessons[0]?.completedAt, s.attempts[0]?.answeredAt].filter(Boolean) as Date[]
      const lastActiveAt = marks.length ? new Date(Math.max(...marks.map(d => d.getTime()))) : null
      return {
      id: s.id,
      name: s.name,
      email: s.email,
      course: s.course ?? s.testResult?.course ?? null,
      newsletter: s.newsletter,
      newsletterAt: s.newsletterAt,
      hasAccount: Boolean(s.email),
      lastActiveAt,
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
      }
    })

    return NextResponse.json({ students: formatted })
  } catch (err) {
    return NextResponse.json({ error: 'Database error', details: String(err) }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, level, levelName, totalCorrect, pct, sectionScores, skillPcts, strengths, weaknesses, course } = body

    const student = await withDb(() => prisma.student.create({
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
    }))

    return NextResponse.json({ ok: true, studentId: student.id })
  } catch (err) {
    return NextResponse.json({ error: 'Could not save result', details: String(err) }, { status: 500 })
  }
}
