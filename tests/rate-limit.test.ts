import { describe, expect, it } from 'vitest'
import { callerKey, isLockedOut, noteFailure, noteSuccess } from '@/lib/rate-limit'

const req = (ip?: string) =>
  new Request('https://example.test/api/login', {
    headers: ip ? { 'x-forwarded-for': ip } : {},
  })

describe('callerKey', () => {
  it('takes the first address, which is the caller behind a proxy chain', () => {
    expect(callerKey(req('203.0.113.7, 70.41.3.18'), 'login')).toBe('login:203.0.113.7')
  })

  it('still produces a key when the header is missing', () => {
    expect(callerKey(req(), 'login')).toBe('login:unknown')
  })

  it('keeps the two logins in separate buckets', () => {
    const ip = '198.51.100.9'
    expect(callerKey(req(ip), 'student-login')).not.toBe(callerKey(req(ip), 'teacher-login'))
  })
})

describe('lockout', () => {
  it('lets the first attempts through', () => {
    expect(isLockedOut('test:fresh-' + Math.random())).toBe(false)
  })

  it('locks out after enough failures', async () => {
    const key = 'test:burst-' + Math.random()
    for (let i = 0; i < 8; i++) {
      expect(isLockedOut(key), `attempt ${i}`).toBe(false)
      await noteFailure(key)
    }
    expect(isLockedOut(key)).toBe(true)
  }, 20000)

  it('forgives a typo once the password is right', async () => {
    const key = 'test:typo-' + Math.random()
    await noteFailure(key)
    await noteFailure(key)
    noteSuccess(key)

    for (let i = 0; i < 7; i++) await noteFailure(key)
    // Without the reset those two earlier slips would have tipped it over.
    expect(isLockedOut(key)).toBe(false)
  }, 20000)

  it('makes a wrong answer slow, which is what blunts a brute force', async () => {
    const key = 'test:slow-' + Math.random()
    const started = Date.now()
    await noteFailure(key)
    expect(Date.now() - started).toBeGreaterThanOrEqual(450)
  }, 10000)

  it('keeps separate callers independent', async () => {
    const mine = 'test:a-' + Math.random()
    const theirs = 'test:b-' + Math.random()
    for (let i = 0; i < 8; i++) await noteFailure(mine)
    expect(isLockedOut(mine)).toBe(true)
    expect(isLockedOut(theirs)).toBe(false)
  }, 20000)
})
