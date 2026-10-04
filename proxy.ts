import { NextRequest, NextResponse } from 'next/server'

/**
 * Paths reachable without a teacher session.
 *
 * These are an *edge-level* allowlist only. Where a path mixes public and
 * private operations (e.g. GET /api/results lists every student, but POST
 * /api/results receives a placement-test submission), the route handler does
 * the real per-method check with `requireTeacher` from lib/auth.
 */
const PUBLIC_PATHS = [
  '/test',           // placement test — shared publicly with students
  '/login',
  '/api/login',
  '/learn',          // student portal, addressed by unguessable student id
  '/cadastro',       // student self-signup
  '/entrar',         // student login
  '/api/student',    // student signup / login / logout / me
  '/api/progress',   // student portal marks units complete
  '/api/attempts',   // POST records an answer; GET is teacher-only
  '/api/pdf',        // student downloads the unit PDF from inside a lesson
  '/api/results',    // POST is public (test submission); GET is teacher-only
  '/api/students',   // GET is public (student portal); DELETE is teacher-only
]

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Always allow public paths and static assets
  if (
    PUBLIC_PATHS.some(p => pathname.startsWith(p)) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon')
  ) {
    return NextResponse.next()
  }

  const session = req.cookies.get('lk_session')?.value
  if (session && session === process.env.SESSION_SECRET) {
    return NextResponse.next()
  }

  const loginUrl = new URL('/login', req.url)
  loginUrl.searchParams.set('from', pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
