import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import { describe, expect, it } from 'vitest'

const root = join(__dirname, '..')
const read = (p: string) => readFileSync(join(root, p), 'utf8')

/** Comments explain these rules, so they must not be mistaken for code. */
const stripComments = (src: string) =>
  src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '')

function apiRoutes(): string[] {
  const out: string[] = []
  const walk = (dir: string) => {
    for (const entry of readdirSync(join(root, dir), { withFileTypes: true })) {
      const rel = `${dir}/${entry.name}`
      if (entry.isDirectory()) walk(rel)
      else if (entry.name === 'route.ts') out.push(rel)
    }
  }
  walk('app/api')
  return out
}

const STUDENT_DELETE_ROUTE = 'app/api/students/[id]/route.ts'

/**
 * Models that point at Student. Every one of them has to be cleared before the
 * student row can go, because the foreign keys are RESTRICT.
 */
function modelsReferencingStudent(): string[] {
  const schema = read('prisma/schema.prisma')
  const models: string[] = []
  for (const block of schema.split(/^model\s+/m).slice(1)) {
    const name = block.slice(0, block.indexOf(' ')).trim()
    if (/\bStudent\s+@relation\b/.test(block)) models.push(name)
  }
  return models
}

/** Prisma exposes `model Foo` as `prisma.foo`. */
const delegate = (model: string) => model.charAt(0).toLowerCase() + model.slice(1)

describe('deleting a student', () => {
  it('finds the tables that reference Student (guards the test itself)', () => {
    const models = modelsReferencingStudent()
    expect(models).toContain('TestResult')
    expect(models).toContain('StudentLesson')
    expect(models).toContain('ExerciseAttempt')
  })

  /**
   * The bug this encodes: adding ExerciseAttempt without extending the delete
   * handler made DELETE /api/students/[id] fail with a 500 for any student who
   * had answered an exercise. A new table that references Student fails here
   * until its cleanup is added.
   */
  it('clears every table that references Student', () => {
    const source = read(STUDENT_DELETE_ROUTE)
    const deleteHandler = source.slice(source.indexOf('export async function DELETE'))

    for (const model of modelsReferencingStudent()) {
      expect(
        deleteHandler.includes(`prisma.${delegate(model)}.delete`),
        `DELETE ${STUDENT_DELETE_ROUTE} never removes ${model} rows. ` +
        `Its foreign key is RESTRICT, so deleting such a student will fail at runtime. ` +
        `Add prisma.${delegate(model)}.deleteMany({ where: { studentId: id } }) before the student is deleted.`,
      ).toBe(true)
    }
  })
})

describe('teacher-only handlers check for themselves', () => {
  /**
   * /api/students and /api/results sit in the proxy allowlist so the student
   * portal and the placement test can reach them, which means the proxy cannot
   * protect the teacher-only halves. Each handler must call requireTeacher.
   */
  const teacherOnly: [string, string][] = [
    ['app/api/results/route.ts', 'GET'],
    ['app/api/students/[id]/route.ts', 'DELETE'],
    ['app/api/students/[id]/reset-password/route.ts', 'POST'],
    ['app/api/attempts/route.ts', 'GET'],
  ]

  it.each(teacherOnly)('%s %s calls requireTeacher', (file, method) => {
    const source = read(file)
    const start = source.indexOf(`export async function ${method}`)
    expect(start, `${file} has no ${method} handler`).toBeGreaterThan(-1)

    // Up to the next exported handler, or the end of the file.
    const rest = source.slice(start + 1)
    const nextExport = rest.indexOf('\nexport async function ')
    const handler = nextExport === -1 ? rest : rest.slice(0, nextExport)

    expect(
      handler.includes('requireTeacher'),
      `${method} in ${file} is reachable without a teacher session: the path is in ` +
      `the proxy allowlist, so the handler itself must call requireTeacher.`,
    ).toBe(true)
  })
})

describe('the public student route does not leak columns', () => {
  /**
   * GET /api/students/[id] is public — the student portal reads it. It used to
   * return the whole row, which started shipping the password hash the moment
   * that column was added. Selecting fields explicitly keeps a new sensitive
   * column from leaking by default.
   */
  it('selects fields explicitly instead of returning the whole row', () => {
    const source = read('app/api/students/[id]/route.ts')
    const getHandler = stripComments(source.slice(
      source.indexOf('export async function GET'),
      source.indexOf('export async function DELETE'),
    ))

    expect(getHandler).toContain('select:')
    expect(
      getHandler.includes('include:'),
      'GET /api/students/[id] is public; `include` returns every scalar column, ' +
      'so a new sensitive field would be served to anyone with the link. Use `select`.',
    ).toBe(false)
    expect(
      getHandler.includes('password'),
      'GET /api/students/[id] must never select or return the password hash.',
    ).toBe(false)
  })
})

describe('the front door', () => {
  const proxy = read('proxy.ts')

  it('lets the public reach the root', () => {
    // The teacher dashboard used to live at "/", so anyone handed the site
    // address met a login form for an account they do not have.
    expect(proxy).toMatch(/PUBLIC_EXACT\.includes\(pathname\)/)
  })

  it('opens the root by exact match, never as a prefix', () => {
    // "/" in the prefix list would make every page on the site public.
    const prefixes = proxy.slice(proxy.indexOf('const PUBLIC_PATHS'), proxy.indexOf('export function proxy'))
    expect(prefixes).not.toMatch(/^\s*'\/',/m)
  })

  it('keeps the teacher dashboard behind the login', () => {
    expect(read('app/painel/page.tsx')).toMatch(/DashboardView/)
    const allowed = proxy.slice(proxy.indexOf('const PUBLIC_EXACT'), proxy.indexOf('export function proxy'))
    expect(allowed).not.toMatch(/painel/)
  })

  it('serves the course choice at the root, not one of the two courses', () => {
    expect(read('app/page.tsx')).toMatch(/CoursePicker/)
  })

  it('offers both courses from the picker', () => {
    const picker = read('components/CoursePicker.tsx')
    expect(picker).toMatch(/\/test\?lang=en/)
    expect(picker).toMatch(/\/test\?lang=pt/)
  })

  it('opens a prefix only for its own subtree', () => {
    // Plain startsWith would make "/learners-admin" public on the back of
    // "/learn", and nobody would notice until someone did.
    expect(proxy).toMatch(/function isUnder/)
    expect(proxy).toMatch(/pathname === prefix \|\| pathname\.startsWith\(prefix \+ '\/'\)/)
    expect(proxy).not.toMatch(/PUBLIC_PATHS\.some\(p => pathname\.startsWith\(p\)\)/)
  })

  it('lets the link preview card through without a session', () => {
    // Every platform that unfurls a link fetches this anonymously; behind the
    // login it would silently become no preview at all.
    expect(proxy).toMatch(/opengraph-image/)
  })

  it('asks which course instead of assuming one, when the test is opened bare', () => {
    const test = read('app/test/page.tsx')
    expect(test).toMatch(/return <CoursePicker \/>/)
  })
})

describe('what the scan found', () => {
  it('keeps the course PDFs behind a teacher or a real student', () => {
    // They used to answer anyone who guessed the URL, which is the whole
    // curriculum given away to someone who never made an account.
    for (const course of ['pt', 'en']) {
      const route = read(`app/api/pdf/${course}/[mod]/[unit]/route.ts`)
      expect(stripComments(route), course).toMatch(/mayReadCourse\(req\)/)
    }
    expect(stripComments(read('lib/auth.ts'))).toMatch(/export async function mayReadCourse/)
  })

  it('never hands the raw internal error back to the caller', () => {
    // A Prisma connection error carries the database host in its message.
    for (const file of apiRoutes()) {
      expect(read(file), file).not.toMatch(/details: String\((?:err|error)\)/)
    }
  })

  it('slows down a wrong password on both logins', () => {
    for (const route of ['app/api/login/route.ts', 'app/api/student/login/route.ts']) {
      const src = stripComments(read(route))
      expect(src, route).toMatch(/isLockedOut\(/)
      expect(src, route).toMatch(/noteFailure\(/)
    }
  })

  it('tells crawlers to stay out of the learner pages', () => {
    // The link to a learner page is that learner's only credential.
    expect(read('app/robots.ts')).toMatch(/disallow[\s\S]*\/learn\//)
    expect(read('app/learn/layout.tsx')).toMatch(/index: false/)
  })

  it('leaves robots.txt reachable, or the rules are never read', () => {
    const proxy = read('proxy.ts')
    const exact = proxy.slice(proxy.indexOf('const PUBLIC_EXACT'), proxy.indexOf('const PUBLIC_PATHS'))
    expect(exact).toMatch(/'\/robots\.txt'/)
  })

  it('says the page is in the language the learner reads', () => {
    expect(read('app/layout.tsx')).toMatch(/<html lang="pt-BR"/)
  })
})
