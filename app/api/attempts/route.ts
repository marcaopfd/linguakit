import { NextRequest, NextResponse } from 'next/server'
import { prisma, withDb } from '@/lib/db'
import { firstSchedule } from '@/lib/review'
import { requireTeacher } from '@/lib/auth'

const MAX_TEXT = 500

/**
 * Records a student's answer to one exercise item.
 *
 * Public, like /api/progress: the student portal is reached either by session
 * or by the unguessable /learn/<id> link, and both must be able to report.
 * Only the first answer per item is kept — `create` on conflict does nothing,
 * because the lesson reveals the correct answer immediately and a second try
 * would record reading rather than knowing.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { studentId, moduleId, unitIndex, itemKey, exerciseType, question, answer, expected, correct } = body

    if (!studentId || !moduleId || typeof unitIndex !== 'number' || !itemKey) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (typeof correct !== 'boolean') {
      return NextResponse.json({ error: 'correct must be a boolean' }, { status: 400 })
    }

    const trim = (v: unknown) => String(v ?? '').slice(0, MAX_TEXT)

    const created = await withDb(() => prisma.exerciseAttempt.createMany({
      data: [{
        studentId,
        moduleId: trim(moduleId),
        unitIndex,
        itemKey: trim(itemKey),
        exerciseType: trim(exerciseType),
        question: trim(question),
        answer: trim(answer),
        expected: trim(expected),
        correct,
      }],
      skipDuplicates: true,
    }))

    /**
     * A missed item joins the review queue — but only on the first encounter.
     * createMany reports 0 when the row already existed, which is also when the
     * student is re-answering something already scheduled; re-queueing then
     * would reset their progress on it.
     */
    if (created.count > 0 && !correct) {
      const { box, dueAt } = firstSchedule()
      await withDb(() => prisma.reviewItem.createMany({
        data: [{
          studentId,
          moduleId: trim(moduleId),
          unitIndex,
          itemKey: trim(itemKey),
          exerciseType: trim(exerciseType),
          question: trim(question),
          expected: trim(expected),
          box,
          dueAt,
        }],
        skipDuplicates: true,
      }))
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: 'Could not save answer', details: String(err) }, { status: 500 })
  }
}

/** The teacher's view of what a student has answered. */
export async function GET(req: NextRequest) {
  const denied = requireTeacher(req)
  if (denied) return denied

  const studentId = req.nextUrl.searchParams.get('studentId')
  if (!studentId) return NextResponse.json({ error: 'Missing studentId' }, { status: 400 })

  try {
    const attempts = await withDb(() => prisma.exerciseAttempt.findMany({
      where: { studentId },
      orderBy: { answeredAt: 'desc' },
    }))
    return NextResponse.json({ attempts })
  } catch (err) {
    return NextResponse.json({ error: 'Database error', details: String(err) }, { status: 500 })
  }
}
