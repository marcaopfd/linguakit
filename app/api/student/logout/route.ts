import { NextResponse } from 'next/server'
import { clearStudentCookie } from '@/lib/student-auth'

export async function POST() {
  const res = NextResponse.json({ ok: true })
  clearStudentCookie(res)
  return res
}
