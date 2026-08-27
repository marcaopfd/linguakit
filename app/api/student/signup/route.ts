import { NextRequest, NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import { prisma, withDb } from '@/lib/db'
import { hashPassword, isValidEmail, normaliseEmail, setStudentCookie } from '@/lib/student-auth'

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, course, newsletter } = await req.json()

    if (!name?.trim()) return NextResponse.json({ error: 'Informe o seu nome.' }, { status: 400 })

    // Normalise before validating: a trailing space the user never sees should
    // not come back as "e-mail inválido".
    const cleanEmail = typeof email === 'string' ? normaliseEmail(email) : ''
    if (!isValidEmail(cleanEmail)) return NextResponse.json({ error: 'E-mail inválido.' }, { status: 400 })
    if (!password || password.length < 8) {
      return NextResponse.json({ error: 'A senha precisa ter pelo menos 8 caracteres.' }, { status: 400 })
    }
    if (course !== 'pt' && course !== 'en') {
      return NextResponse.json({ error: 'Escolha um curso.' }, { status: 400 })
    }

    const optedIn = newsletter === true
    const student = await withDb(() => prisma.student.create({
      data: {
        name: name.trim(),
        email: cleanEmail,
        password: hashPassword(password),
        course,
        newsletter: optedIn,
        newsletterAt: optedIn ? new Date() : null,
      },
    }))

    const res = NextResponse.json({ ok: true, studentId: student.id })
    if (!setStudentCookie(res, student.id)) {
      return NextResponse.json({ error: 'Servidor sem SESSION_SECRET configurado.' }, { status: 500 })
    }
    return res
  } catch (err) {
    // P2002 = unique constraint, i.e. this email already has an account.
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      return NextResponse.json({ error: 'Já existe uma conta com esse e-mail.' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Não foi possível criar a conta.', details: String(err) }, { status: 500 })
  }
}
