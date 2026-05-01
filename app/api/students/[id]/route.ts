import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

  try {
    await prisma.testResult.deleteMany({ where: { studentId: id } })
    await prisma.studentLesson.deleteMany({ where: { studentId: id } })
    await prisma.student.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: 'Could not delete student', details: String(err) }, { status: 500 })
  }
}
