import { NextRequest, NextResponse } from 'next/server'
import { callerKey, isLockedOut, noteFailure, noteSuccess } from '@/lib/rate-limit'

export async function POST(req: NextRequest) {
  const { password } = await req.json()

  if (!process.env.TEACHER_PASSWORD || !process.env.SESSION_SECRET) {
    return NextResponse.json({ error: 'Server not configured' }, { status: 500 })
  }

  // This one password opens every student's record, so it is the one most
  // worth slowing down.
  const key = callerKey(req, 'teacher-login')
  if (isLockedOut(key)) {
    return NextResponse.json({ error: 'Too many attempts. Try again later.' }, { status: 429 })
  }

  if (password !== process.env.TEACHER_PASSWORD) {
    await noteFailure(key)
    return NextResponse.json({ error: 'Wrong password' }, { status: 401 })
  }

  noteSuccess(key)

  const res = NextResponse.json({ ok: true })
  res.cookies.set('lk_session', process.env.SESSION_SECRET, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  })
  return res
}
