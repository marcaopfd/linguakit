import { NextRequest, NextResponse } from 'next/server'

/**
 * Paths reachable without a teacher session.
 *
 * These are an *edge-level* allowlist only. Where a path mixes public and
 * private operations (e.g. GET /api/results lists every student, but POST
 * /api/results receives a placement-test submission), the route handler does
 * the real per-method check with `requireTeacher` from lib/auth.
 */
/**
 * Matched exactly, not as a prefix: "/" as a prefix would open the whole site.
 */
const PUBLIC_EXACT = [
  '/',               // the front door: which course did you come for
  '/robots.txt',     // must be reachable, or crawlers assume nothing is barred
  '/sitemap.xml',
]

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

/**
 * A prefix only opens its own subtree. Plain `startsWith` would let a future
 * route called "/learners-admin" through on the back of "/learn", which is the
 * sort of hole nobody notices until it is being used.
 */
function isUnder(pathname: string, prefix: string): boolean {
  return pathname === prefix || pathname.startsWith(prefix + '/')
}

/**
 * The teacher's half of the site. Everything here needs the session.
 *
 * Listing it explicitly is what lets an unknown path fall through to the real
 * 404 instead of the login form: before this, a visitor who mistyped the
 * address was shown "Teacher access" and a password box, which is a confusing
 * thing to meet and tells a stranger there is something to log into.
 *
 * The risk of a list is forgetting to add to it, so a test walks app/ and
 * fails if a page route is neither public nor named here.
 */
const PROTECTED_PREFIXES = [
  '/painel',
  '/students',
  '/pt',
  '/en',
  '/lesson',
  '/module',
]

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Always allow public paths and static assets
  if (
    PUBLIC_EXACT.includes(pathname) ||
    PUBLIC_PATHS.some(p => isUnder(pathname, p)) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    // Home-screen install assets: iOS fetches these without a session, and a
    // redirect here silently gives the learner a generic icon.
    pathname === '/manifest.webmanifest' ||
    /^\/(apple-icon|icon-192|icon-512)\.png$/.test(pathname) ||
    // The link preview card. WhatsApp and the rest fetch this with no session,
    // and a redirect here means the link unfurls with no image at all.
    pathname === '/opengraph-image'
  ) {
    return NextResponse.next()
  }

  // Anything that is not a teacher area is left to Next, which answers with
  // the app's own 404 rather than a password prompt.
  if (!PROTECTED_PREFIXES.some(p => isUnder(pathname, p))) {
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
