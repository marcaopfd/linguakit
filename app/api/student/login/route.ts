import { NextRequest, NextResponse } from 'next/server'
import { prisma, withDb } from '@/lib/db'
import { normaliseEmail, setStudentCookie, verifyPassword } from '@/lib/student-auth'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) {
      return NextResponse.json({ error: 'Informe e-mail e senha.' }, { status: 400 })
    }

    const student = await withDb(() => prisma.student.findUnique({
      where: { email: normaliseEmail(String(email)) },
    }))

    // Same message either way, so the response cannot be used to discover
    // which e-mail addresses have an account.
    if (!student || !verifyPassword(password, student.password)) {
      return NextResponse.json({ error: 'E-mail ou senha incorretos.' }, { status: 401 })
    }

    const res = NextResponse.json({ ok: true, studentId: student.id })
    if (!setStudentCookie(res, student.id)) {
      return NextResponse.json({ error: 'Servidor sem SESSION_SECRET configurado.' }, { status: 500 })
    }
    return res
  } catch (err) {
    return NextResponse.json({ error: 'Não foi possível entrar.', details: String(err) }, { status: 500 })
  }
}
