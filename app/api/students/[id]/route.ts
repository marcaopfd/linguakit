import { NextRequest, NextResponse } from 'next/server'
import { prisma, withDb } from '@/lib/db'
import { requireTeacher } from '@/lib/auth'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    // This route is public (the student portal calls it), so select fields
    // explicitly — never spread the row, which would ship the password hash.
    const student = await withDb(() => prisma.student.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        course: true,
        createdAt: true,
        testResult: true,
        lessons: { orderBy: { completedAt: 'asc' } },
      },
    }))
    if (!student) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ student })
  } catch (err) {
    return NextResponse.json({ error: 'Database error', details: String(err) }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = requireTeacher(req)
  if (denied) return denied

  const { id } = await params
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

  try {
    // Every table that references Student must be cleared first: the foreign
    // keys are RESTRICT, so a leftover row blocks the delete.
    await withDb(() => prisma.reviewItem.deleteMany({ where: { studentId: id } }))
    await withDb(() => prisma.exerciseAttempt.deleteMany({ where: { studentId: id } }))
    await withDb(() => prisma.testResult.deleteMany({ where: { studentId: id } }))
    await withDb(() => prisma.studentLesson.deleteMany({ where: { studentId: id } }))
    await withDb(() => prisma.student.delete({ where: { id } }))
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: 'Could not delete student', details: String(err) }, { status: 500 })
  }
}
