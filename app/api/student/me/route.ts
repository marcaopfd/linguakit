import { NextRequest, NextResponse } from 'next/server'
import { prisma, withDb } from '@/lib/db'
import { readStudentId } from '@/lib/student-auth'

/** Who is logged in on this browser — used to bounce visitors to their course. */
export async function GET(req: NextRequest) {
  const studentId = readStudentId(req)
  if (!studentId) return NextResponse.json({ student: null })

  try {
    const student = await withDb(() => prisma.student.findUnique({
      where: { id: studentId },
      select: { id: true, name: true, course: true },
    }))
    return NextResponse.json({ student })
  } catch (err) {
    return NextResponse.json({ error: 'Database error', details: String(err) }, { status: 500 })
  }
}
