import { NextRequest, NextResponse } from 'next/server'
import { prisma, withDb } from '@/lib/db'
import { LIMITE_PERGUNTA, limparPergunta, recadoDoProblema } from '@/lib/duvidas'
import { callerKey, tooManyAccounts, noteAccountCreated } from '@/lib/rate-limit'
import { podeAgirComo, readStudentId } from '@/lib/student-auth'

/**
 * Onde o aluno manda uma dúvida.
 *
 * Só quem o site reconhece pode perguntar — `podeAgirComo`, a mesma régua das
 * tarefas das músicas. Caixa de texto aberta ao mundo num site que vende
 * produto é spam garantido, e a alternativa (um CAPTCHA) traria um terceiro
 * para dentro de um site que promete, na política de privacidade, não ter
 * nenhum.
 *
 * Nada do que entra aqui fica público: `published` nasce falso e só sai disso
 * pela mão do professor, em PATCH.
 */

/** Dúvidas por aparelho por hora. Reusa o balde do cadastro, que é o mesmo
 *  problema: alguém de má-fé apertando o botão muitas vezes. */
const ESCOPO = 'duvida'

export async function POST(req: NextRequest) {
  try {
    const { studentId, texto, contexto } = await req.json()
    if (typeof studentId !== 'string' || !studentId) {
      return NextResponse.json({ error: 'Missing studentId' }, { status: 400 })
    }

    const pergunta = limparPergunta(texto)
    if (!pergunta.ok) {
      return NextResponse.json({ error: recadoDoProblema(pergunta.erro) }, { status: 400 })
    }

    const aluno = await withDb(() => prisma.student.findUnique({
      where: { id: studentId },
      select: { password: true },
    }))
    if (!aluno) return NextResponse.json({ error: 'Sem acesso.' }, { status: 403 })
    if (!podeAgirComo({ sessao: readStudentId(req), studentId, temSenha: aluno.password !== null })) {
      return NextResponse.json({ error: 'Sem acesso.' }, { status: 403 })
    }

    const chave = callerKey(req, ESCOPO)
    if (tooManyAccounts(chave)) {
      return NextResponse.json(
        { error: 'Muitas dúvidas enviadas deste aparelho. Tente de novo mais tarde.' },
        { status: 429 },
      )
    }

    const duvida = await withDb(() => prisma.question.create({
      data: {
        studentId,
        text: pergunta.texto,
        context: typeof contexto === 'string' && contexto.trim()
          ? contexto.trim().slice(0, 200)
          : null,
      },
      select: { id: true, createdAt: true },
    }))
    noteAccountCreated(chave)

    return NextResponse.json({ ok: true, id: duvida.id })
  } catch {
    return NextResponse.json({ error: 'Não foi possível enviar a dúvida.' }, { status: 500 })
  }
}

/** As dúvidas de um aluno, para ele acompanhar as próprias. */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const studentId = searchParams.get('studentId')
  if (!studentId) return NextResponse.json({ error: 'Missing studentId' }, { status: 400 })

  try {
    const aluno = await withDb(() => prisma.student.findUnique({
      where: { id: studentId },
      select: { password: true },
    }))
    if (!aluno) return NextResponse.json({ error: 'Sem acesso.' }, { status: 403 })
    if (!podeAgirComo({ sessao: readStudentId(req), studentId, temSenha: aluno.password !== null })) {
      return NextResponse.json({ error: 'Sem acesso.' }, { status: 403 })
    }

    const duvidas = await withDb(() => prisma.question.findMany({
      where: { studentId },
      orderBy: { createdAt: 'desc' },
      take: 50,
      select: { id: true, text: true, answer: true, published: true, createdAt: true, answeredAt: true },
    }))
    return NextResponse.json({ duvidas, limite: LIMITE_PERGUNTA })
  } catch {
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}
