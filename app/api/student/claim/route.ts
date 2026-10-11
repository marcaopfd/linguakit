import { NextRequest, NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import { prisma, withDb } from '@/lib/db'
import { hashPassword, isValidEmail, normaliseEmail, setStudentCookie } from '@/lib/student-auth'

/**
 * Turns a student created by the placement test into a real account.
 *
 * The test creates a Student with no email and no password, reachable only
 * through its /learn/<id> link. Signing up separately used to make a *second*
 * student, splitting one person's level from their login. This attaches the
 * credentials to the record they already have, keeping their test result.
 *
 * Public by studentId, like the rest of the portal: that id is the capability.
 * Claiming is refused once an account exists, so a link cannot be used to
 * overwrite someone's password.
 */
export async function POST(req: NextRequest) {
  try {
    const { studentId, email, password, newsletter } = await req.json()
    if (!studentId) return NextResponse.json({ error: 'Missing studentId' }, { status: 400 })

    const cleanEmail = typeof email === 'string' ? normaliseEmail(email) : ''
    if (!isValidEmail(cleanEmail)) {
      return NextResponse.json({ error: 'E-mail inválido.' }, { status: 400 })
    }
    if (!password || password.length < 8) {
      return NextResponse.json({ error: 'A senha precisa ter pelo menos 8 caracteres.' }, { status: 400 })
    }

    const student = await withDb(() => prisma.student.findUnique({
      where: { id: studentId },
      select: { id: true, email: true, password: true },
    }))
    if (!student) return NextResponse.json({ error: 'Aluno não encontrado.' }, { status: 404 })

    if (student.email || student.password) {
      return NextResponse.json(
        { error: 'Esta conta já existe. Use "Entrar" com seu e-mail e senha.' },
        { status: 409 },
      )
    }

    const optedIn = newsletter === true
    await withDb(() => prisma.student.update({
      where: { id: studentId },
      data: {
        email: cleanEmail,
        password: hashPassword(password),
        newsletter: optedIn,
        newsletterAt: optedIn ? new Date() : null,
      },
    }))

    const res = NextResponse.json({ ok: true, studentId })
    if (!setStudentCookie(res, studentId)) {
      return NextResponse.json({ error: 'Servidor sem SESSION_SECRET configurado.' }, { status: 500 })
    }
    return res
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      return NextResponse.json({ error: 'Já existe uma conta com esse e-mail.' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Não foi possível criar a conta.', details: String(err) }, { status: 500 })
  }
}
