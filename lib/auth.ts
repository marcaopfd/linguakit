import { NextRequest, NextResponse } from 'next/server'

/**
 * Teacher session check.
 *
 * The proxy already gates most pages, but Next's docs are explicit that proxy
 * is an optimistic check only — every sensitive route handler must verify on
 * its own. See node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md
 */
export function isTeacher(req: NextRequest): boolean {
  const secret = process.env.SESSION_SECRET
  if (!secret) return false
  return req.cookies.get('lk_session')?.value === secret
}

/** Returns a 401 response when the request is not an authenticated teacher. */
export function requireTeacher(req: NextRequest): NextResponse | null {
  if (isTeacher(req)) return null
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

/**
 * Whether this request may read course material.
 *
 * The unit PDFs used to be open to anyone who guessed the URL, which is the
 * whole curriculum — a hundred units across both courses — given away to
 * someone who never made an account. A learner reaches them from inside a
 * lesson, so their id comes along in the query; a teacher has the session.
 */
export async function mayReadCourse(req: NextRequest): Promise<boolean> {
  if (isTeacher(req)) return true

  const studentId = new URL(req.url).searchParams.get('s')
  if (!studentId) return false

  // Imported here so the module stays usable from the edge proxy, which must
  // not pull in Prisma.
  const { prisma, withDb } = await import('./db')
  const student = await withDb(() => prisma.student.findUnique({
    where: { id: studentId },
    select: { id: true },
  }))
  return Boolean(student)
}
