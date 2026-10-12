import { NextRequest, NextResponse } from 'next/server'
import { accentTag, isKnownAccent } from '@/lib/accents'
import { prisma, withDb } from '@/lib/db'

/**
 * Saves which accent a student wants the course spoken in.
 *
 * Takes the student id from the body rather than a session, the same way
 * progress and attempts do: a student created by the placement test has no
 * account, and their /learn/<id> link is the credential. The worst a stranger
 * with someone's link can do here is change the voice.
 */
export async function POST(req: NextRequest) {
  try {
    const { studentId, accent } = await req.json()

    if (!studentId || typeof studentId !== 'string') {
      return NextResponse.json({ error: 'Missing studentId' }, { status: 400 })
    }
    if (!isKnownAccent(accent)) {
      return NextResponse.json({ error: 'Unknown accent' }, { status: 400 })
    }

    const student = await withDb(() => prisma.student.findUnique({
      where: { id: studentId },
      select: { course: true, testResult: { select: { course: true } } },
    }))
    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }

    // An accent from the other course would have the lesson read in the wrong
    // language, so it is rejected rather than quietly ignored.
    const course = student.course ?? student.testResult?.course
    if (accentTag(course, accent) !== accent) {
      return NextResponse.json({ error: 'Accent does not belong to this course' }, { status: 400 })
    }

    await withDb(() => prisma.student.update({
      where: { id: studentId },
      data: { accent },
    }))

    return NextResponse.json({ ok: true, accent })
  } catch (err) {
    return NextResponse.json(
      { error: 'Could not save the accent', details: String(err) },
      { status: 500 },
    )
  }
}
