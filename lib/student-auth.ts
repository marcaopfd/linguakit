import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

export const STUDENT_COOKIE = 'lk_student'
const MAX_AGE_SECONDS = 60 * 60 * 24 * 90 // 90 days
const KEY_LENGTH = 64

/**
 * Password storage uses Node's built-in scrypt — no extra dependency, and it is
 * a memory-hard KDF, so it stays expensive to brute-force. Node's crypto module
 * is unavailable on the Edge runtime, so everything here must run inside a
 * route handler (Node.js runtime), never in proxy.ts.
 */
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex')
  const hash = scryptSync(password, salt, KEY_LENGTH).toString('hex')
  return `scrypt:${salt}:${hash}`
}

export function verifyPassword(password: string, stored: string | null): boolean {
  if (!stored) return false
  const [scheme, salt, hash] = stored.split(':')
  if (scheme !== 'scrypt' || !salt || !hash) return false

  const expected = Buffer.from(hash, 'hex')
  const actual = scryptSync(password, salt, expected.length)
  return expected.length === actual.length && timingSafeEqual(expected, actual)
}

function sign(payload: string, secret: string): string {
  return createHmac('sha256', secret).update(payload).digest('base64url')
}

/**
 * Session token: "<studentId>.<expiresAt>.<hmac>". Stateless, so there is no
 * session table to keep, and tampering with the id or the expiry invalidates
 * the signature.
 */
export function createStudentToken(studentId: string): string | null {
  const secret = process.env.SESSION_SECRET
  if (!secret) return null
  const payload = `${studentId}.${Date.now() + MAX_AGE_SECONDS * 1000}`
  return `${payload}.${sign(payload, secret)}`
}

export function readStudentId(req: NextRequest): string | null {
  return readStudentIdFromToken(req.cookies.get(STUDENT_COOKIE)?.value ?? null)
}

/**
 * The same check, for a Server Component, which reads the cookie through
 * `await cookies()` instead of a request object.
 */
export function readStudentIdFromToken(token: string | null | undefined): string | null {
  const secret = process.env.SESSION_SECRET
  if (!secret) return null
  if (!token) return null

  const cut = token.lastIndexOf('.')
  if (cut === -1) return null
  const payload = token.slice(0, cut)
  const signature = token.slice(cut + 1)

  const expected = Buffer.from(sign(payload, secret))
  const actual = Buffer.from(signature)
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null

  const [studentId, expiresAt] = payload.split('.')
  if (!studentId || !expiresAt) return null
  if (Number(expiresAt) < Date.now()) return null

  return studentId
}

/**
 * Se quem está pedindo pode agir como este aluno.
 *
 * Duas identidades convivem no curso, e por boas razões:
 *
 *   - a sessão, um cookie assinado, de quem criou conta;
 *   - o próprio link /learn/<id>, que é a única credencial de quem chegou
 *     pelo teste de nível antes de existir cadastro.
 *
 * Para quem TEM senha, o link não basta. Ele circula em histórico de
 * navegador, print e grupo de WhatsApp, e o que a pessoa escreve nas aulas é
 * dela. Para quem NÃO tem senha, o link é tudo o que existe: exigir sessão
 * tiraria o acesso de quem está estudando hoje.
 *
 * Pura de propósito: quem chama busca `temSenha` no banco e passa aqui, para
 * esta regra poder ser testada sem subir servidor.
 */
export function podeAgirComo(
  { sessao, studentId, temSenha }: { sessao: string | null; studentId: string; temSenha: boolean },
): boolean {
  if (sessao && sessao === studentId) return true
  return !temSenha
}

export function setStudentCookie(res: NextResponse, studentId: string): boolean {
  const token = createStudentToken(studentId)
  if (!token) return false
  res.cookies.set(STUDENT_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: MAX_AGE_SECONDS,
    path: '/',
  })
  return true
}

export function clearStudentCookie(res: NextResponse) {
  res.cookies.set(STUDENT_COOKIE, '', { httpOnly: true, path: '/', maxAge: 0 })
}

/** Normalised so "Ana@Example.com " and "ana@example.com" are the same account. */
export function normaliseEmail(email: string): string {
  return email.trim().toLowerCase()
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
}
