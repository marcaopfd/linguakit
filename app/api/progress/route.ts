import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { studentId, moduleId, unitIndex } = await req.json()
    if (!studentId || !moduleId || unitIndex === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await prisma.studentLesson.upsert({
      where: { studentId_moduleId_unitIndex: { studentId, moduleId, unitIndex } },
      update: { completedAt: new Date() },
      create: { studentId, moduleId, unitIndex },
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: 'Could not save progress', details: String(err) }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const studentId = searchParams.get('studentId')
  if (!studentId) return NextResponse.json({ error: 'Missing studentId' }, { status: 400 })

  try {
    const lessons = await prisma.studentLesson.findMany({ where: { studentId } })
    return NextResponse.json({ lessons })
  } catch (err) {
    return NextResponse.json({ error: 'Database error', details: String(err) }, { status: 500 })
  }
}
