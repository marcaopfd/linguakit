import { NextRequest, NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import { prisma, withDb } from '@/lib/db'
import { aplicarPagamentoPendente } from '@/lib/pagamento'
import { callerKey, noteAccountCreated, tooManyAccounts } from '@/lib/rate-limit'
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
    const key = callerKey(req, 'create-account')
    if (tooManyAccounts(key)) {
      return NextResponse.json(
        { error: 'Muitos cadastros deste aparelho. Tente de novo mais tarde.' },
        { status: 429 },
      )
    }

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

    noteAccountCreated(key)

    // Quem pagou antes de se cadastrar recebe o plano agora, e não na
    // renovação. O aviso da Kiwify estava guardado esperando este e-mail.
    //
    // Protegido por um try próprio: a conta já existe neste ponto, e deixar
    // uma falha daqui cair no catch de baixo devolveria "não foi possível
    // criar a conta" para alguém cuja conta foi criada. Se isto falhar, o
    // plano se recupera depois no botão "já paguei e não liberou".
    let pago = null
    try {
      pago = await aplicarPagamentoPendente(cleanEmail, student.id)
    } catch { /* a conta vale mais que o plano; ele se recupera na Conta */ }

    const res = NextResponse.json({ ok: true, studentId: student.id, plano: pago?.plan ?? null })
    if (!setStudentCookie(res, student.id)) {
      return NextResponse.json({ error: 'Servidor sem SESSION_SECRET configurado.' }, { status: 500 })
    }
    return res
  } catch (err) {
    // P2002 = unique constraint, i.e. this email already has an account.
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      return NextResponse.json({ error: 'Já existe uma conta com esse e-mail.' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Não foi possível criar a conta.' }, { status: 500 })
  }
}
