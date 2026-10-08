import { NextRequest, NextResponse } from 'next/server'
import { prisma, withDb } from '@/lib/db'
import { clampBox, nextSchedule } from '@/lib/review'

/** Cap on one sitting, so a long-neglected queue is not an endless wall. */
const SESSION_LIMIT = 20

/**
 * The student's review queue.
 *
 * Public by studentId for the same reason /api/progress is: the portal is
 * reached by session or by the unguessable /learn/<id> link. It returns the
 * student's own missed items and nothing else.
 */
export async function GET(req: NextRequest) {
  const studentId = req.nextUrl.searchParams.get('studentId')
  if (!studentId) return NextResponse.json({ error: 'Missing studentId' }, { status: 400 })

  try {
    const now = new Date()
    const [due, total] = await Promise.all([
      withDb(() => prisma.reviewItem.findMany({
        where: { studentId, dueAt: { lte: now } },
        select: { id: true, moduleId: true, unitIndex: true, exerciseType: true, question: true, expected: true, box: true },
        orderBy: { dueAt: 'asc' },
        take: SESSION_LIMIT,
      })),
      withDb(() => prisma.reviewItem.count({ where: { studentId } })),
    ])

    return NextResponse.json({ due, dueCount: due.length, total })
  } catch (err) {
    return NextResponse.json({ error: 'Database error', details: String(err) }, { status: 500 })
  }
}

/**
 * Records how a review went and reschedules the item: up a box when the student
 * got it, back to box 1 when they did not, and deleted once it clears the last
 * box so the queue drains.
 */
export async function POST(req: NextRequest) {
  try {
    const { studentId, id, correct } = await req.json()
    if (!studentId || !id || typeof correct !== 'boolean') {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const item = await withDb(() => prisma.reviewItem.findUnique({ where: { id } }))
    // Scoped by studentId too, so an id alone cannot reschedule someone else's item.
    if (!item || item.studentId !== studentId) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const schedule = nextSchedule(clampBox(item.box), correct)

    if (schedule.retired) {
      await withDb(() => prisma.reviewItem.delete({ where: { id } }))
      return NextResponse.json({ ok: true, retired: true })
    }

    await withDb(() => prisma.reviewItem.update({
      where: { id },
      data: { box: schedule.box, dueAt: schedule.dueAt, lastReviewedAt: new Date() },
    }))
    return NextResponse.json({ ok: true, retired: false, box: schedule.box })
  } catch (err) {
    return NextResponse.json({ error: 'Could not save review', details: String(err) }, { status: 500 })
  }
}
