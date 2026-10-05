import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { NextRequest } from 'next/server'
import { isTeacher, requireTeacher } from '@/lib/auth'

const SECRET = 'teacher-secret-for-tests'

function request(cookie?: string) {
  const headers = new Headers()
  if (cookie !== undefined) headers.set('cookie', cookie)
  return new NextRequest('http://localhost/api/results', { headers })
}

beforeEach(() => { process.env.SESSION_SECRET = SECRET })
afterEach(() => { delete process.env.SESSION_SECRET })

describe('isTeacher', () => {
  it('accepts the matching session cookie', () => {
    expect(isTeacher(request(`lk_session=${SECRET}`))).toBe(true)
  })

  it('rejects a wrong value, an empty one and no cookie at all', () => {
    expect(isTeacher(request('lk_session=nope'))).toBe(false)
    expect(isTeacher(request('lk_session='))).toBe(false)
    expect(isTeacher(request())).toBe(false)
  })

  it('rejects a different cookie carrying the right value', () => {
    expect(isTeacher(request(`lk_student=${SECRET}`))).toBe(false)
  })

  /**
   * The original bug: the check was `session === process.env.SESSION_SECRET`.
   * With the variable unset, both sides were undefined on a request with no
   * cookie, so every visitor passed as the teacher. Deploying without the env
   * var set would have opened the whole panel.
   */
  it('denies everyone when SESSION_SECRET is unset, instead of letting undefined match undefined', () => {
    delete process.env.SESSION_SECRET
    expect(isTeacher(request())).toBe(false)
    expect(isTeacher(request('lk_session='))).toBe(false)
    expect(isTeacher(request('lk_session=undefined'))).toBe(false)
  })
})

describe('requireTeacher', () => {
  it('returns null — meaning "carry on" — for an authenticated teacher', () => {
    expect(requireTeacher(request(`lk_session=${SECRET}`))).toBeNull()
  })

  it('returns a 401 response for anyone else', async () => {
    const denied = requireTeacher(request('lk_session=nope'))
    expect(denied).not.toBeNull()
    expect(denied!.status).toBe(401)
    await expect(denied!.json()).resolves.toEqual({ error: 'Unauthorized' })
  })

  it('returns a 401 when SESSION_SECRET is unset', () => {
    delete process.env.SESSION_SECRET
    expect(requireTeacher(request())?.status).toBe(401)
  })
})
