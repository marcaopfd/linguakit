import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { NextRequest, NextResponse } from 'next/server'
import {
  createStudentToken,
  hashPassword,
  isValidEmail,
  normaliseEmail,
  readStudentId,
  setStudentCookie,
  STUDENT_COOKIE,
  verifyPassword,
} from '@/lib/student-auth'

const SECRET = 'test-secret-do-not-use-in-production'

/** A request carrying whatever student cookie value we want to probe. */
function requestWithToken(token: string | null) {
  const headers = new Headers()
  if (token !== null) headers.set('cookie', `${STUDENT_COOKIE}=${token}`)
  return new NextRequest('http://localhost/learn/abc', { headers })
}

beforeEach(() => { process.env.SESSION_SECRET = SECRET })
afterEach(() => { delete process.env.SESSION_SECRET })

describe('hashPassword / verifyPassword', () => {
  it('accepts the right password', () => {
    expect(verifyPassword('correct horse battery', hashPassword('correct horse battery'))).toBe(true)
  })

  it('rejects the wrong password', () => {
    expect(verifyPassword('wrong', hashPassword('correct horse battery'))).toBe(false)
  })

  it('never stores the password in the hash', () => {
    expect(hashPassword('hunter2')).not.toContain('hunter2')
  })

  it('salts, so the same password hashes differently every time', () => {
    expect(hashPassword('same')).not.toBe(hashPassword('same'))
  })

  it('rejects a missing or malformed stored hash instead of throwing', () => {
    expect(verifyPassword('x', null)).toBe(false)
    expect(verifyPassword('x', '')).toBe(false)
    expect(verifyPassword('x', 'not-a-hash')).toBe(false)
    expect(verifyPassword('x', 'bcrypt:salt:hash')).toBe(false)
    expect(verifyPassword('x', 'scrypt::')).toBe(false)
  })
})

describe('session token', () => {
  it('round-trips the student id', () => {
    const token = createStudentToken('student-123')!
    expect(readStudentId(requestWithToken(token))).toBe('student-123')
  })

  it('refuses a token whose student id was swapped', () => {
    const token = createStudentToken('student-123')!
    const [, expiry, signature] = token.split('.')
    expect(readStudentId(requestWithToken(`someone-else.${expiry}.${signature}`))).toBeNull()
  })

  it('refuses a forged signature', () => {
    const token = createStudentToken('student-123')!
    const [id, expiry] = token.split('.')
    expect(readStudentId(requestWithToken(`${id}.${expiry}.AAAAAAAAAAAAAAAAAAAAAAAAAAA`))).toBeNull()
  })

  it('refuses an expiry stretched by hand', () => {
    const token = createStudentToken('student-123')!
    const [id, expiry, signature] = token.split('.')
    const later = String(Number(expiry) + 60_000)
    expect(readStudentId(requestWithToken(`${id}.${later}.${signature}`))).toBeNull()
  })

  it('refuses an expired token even when properly signed', () => {
    const past = Date.now() - 1000
    // Signed with the real secret, so only the expiry check can reject it.
    const payload = `student-123.${past}`
    const { createHmac } = require('crypto') as typeof import('crypto')
    const signature = createHmac('sha256', SECRET).update(payload).digest('base64url')
    expect(readStudentId(requestWithToken(`${payload}.${signature}`))).toBeNull()
  })

  it('refuses garbage and an absent cookie', () => {
    expect(readStudentId(requestWithToken('abc'))).toBeNull()
    expect(readStudentId(requestWithToken(''))).toBeNull()
    expect(readStudentId(requestWithToken(null))).toBeNull()
  })

  it('issues nothing and trusts nothing when SESSION_SECRET is unset', () => {
    const token = createStudentToken('student-123')!
    delete process.env.SESSION_SECRET
    expect(createStudentToken('student-123')).toBeNull()
    expect(readStudentId(requestWithToken(token))).toBeNull()
  })

  it('does not accept a token signed with a different secret', () => {
    const token = createStudentToken('student-123')!
    process.env.SESSION_SECRET = 'a-completely-different-secret'
    expect(readStudentId(requestWithToken(token))).toBeNull()
  })
})

describe('setStudentCookie', () => {
  it('sets an httpOnly cookie and reports success', () => {
    const res = NextResponse.json({ ok: true })
    expect(setStudentCookie(res, 'student-123')).toBe(true)
    const cookie = res.cookies.get(STUDENT_COOKIE)
    expect(cookie?.value).toBeTruthy()
    expect(res.headers.get('set-cookie')).toContain('HttpOnly')
  })

  it('reports failure when SESSION_SECRET is unset, rather than setting an unsigned cookie', () => {
    delete process.env.SESSION_SECRET
    const res = NextResponse.json({ ok: true })
    expect(setStudentCookie(res, 'student-123')).toBe(false)
    expect(res.cookies.get(STUDENT_COOKIE)?.value).toBeFalsy()
  })
})

describe('email handling', () => {
  it('normalises case and surrounding space, so one person is one account', () => {
    expect(normaliseEmail('  Ana@Example.COM ')).toBe('ana@example.com')
  })

  it('accepts ordinary addresses', () => {
    expect(isValidEmail('ana@example.com')).toBe(true)
    expect(isValidEmail('a.b+tag@sub.example.co.uk')).toBe(true)
  })

  it('rejects malformed ones', () => {
    for (const bad of ['', 'nope', 'a@b', 'a@b.c', 'no spaces@example.com', '@example.com', 'a@@b.com']) {
      expect(isValidEmail(bad), bad).toBe(false)
    }
  })
})
