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
