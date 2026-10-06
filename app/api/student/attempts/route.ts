import { NextRequest, NextResponse } from 'next/server'
import { prisma, withDb } from '@/lib/db'

/**
 * A student's own answers, for the "your mistakes" view in the portal.
 *
 * Deliberately separate from GET /api/attempts, which stays teacher-only: that
 * one is the panel's analysis feed and may grow to carry more. This one is
 * scoped to a single studentId and returns only the fields the review screen
 * shows.
 *
 * Public by studentId for the same reason /api/progress is: the portal is
 * reached either by a student session or by the unguessable /learn/<id> link,
 * and both have to work. It exposes the student's own answers — nothing about
 * anyone else, and no credentials.
 */
export async function GET(req: NextRequest) {
  const studentId = req.nextUrl.searchParams.get('studentId')
  if (!studentId) return NextResponse.json({ error: 'Missing studentId' }, { status: 400 })

  try {
    const attempts = await withDb(() => prisma.exerciseAttempt.findMany({
      where: { studentId },
      select: {
        moduleId: true,
        unitIndex: true,
        exerciseType: true,
        question: true,
        answer: true,
        expected: true,
        correct: true,
        answeredAt: true,
      },
      orderBy: { answeredAt: 'desc' },
    }))
    return NextResponse.json({ attempts })
  } catch (err) {
    return NextResponse.json({ error: 'Database error', details: String(err) }, { status: 500 })
  }
}
