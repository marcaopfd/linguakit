import { NextRequest, NextResponse } from 'next/server'
import { prisma, withDb } from '@/lib/db'
import { callerKey, isLockedOut, noteFailure, noteSuccess } from '@/lib/rate-limit'
import { hashPassword, readStudentId, verifyPassword } from '@/lib/student-auth'

/**
 * Trocar a senha, sabendo a senha.
 *
 * Quem prova ser o dono: a sessão deste navegador, ou a senha atual. O link
 * /learn/<id> NÃO serve, de propósito — ele já é a chave de ler o curso, e
 * aceitar ele aqui transformaria um link compartilhado por descuido em tomar
 * a conta de alguém. É a mesma regra que o /claim já segue ao recusar pôr
 * senha numa conta que já tem uma.
 */
export async function POST(req: NextRequest) {
  let corpo: { studentId?: unknown; atual?: unknown; nova?: unknown }
  try {
    corpo = await req.json()
  } catch {
    return NextResponse.json({ error: 'Pedido inválido.' }, { status: 400 })
  }

  const { studentId, atual, nova } = corpo
  if (typeof studentId !== 'string' || !studentId) {
    return NextResponse.json({ error: 'Falta o aluno.' }, { status: 400 })
  }
  if (typeof nova !== 'string' || nova.length < 8) {
    return NextResponse.json({ error: 'A nova senha precisa ter pelo menos 8 caracteres.' }, { status: 400 })
  }

  const chave = callerKey(req, 'troca-senha')
  if (isLockedOut(chave)) {
    return NextResponse.json({ error: 'Muitas tentativas. Espere alguns minutos.' }, { status: 429 })
  }

  try {
    const student = await withDb(() => prisma.student.findUnique({
      where: { id: studentId },
      select: { id: true, password: true },
    }))
    if (!student) return NextResponse.json({ error: 'Aluno não encontrado.' }, { status: 404 })

    const temSessao = readStudentId(req) === studentId
    const senhaConfere = typeof atual === 'string' && verifyPassword(atual, student.password)

    if (!temSessao && !senhaConfere) {
      await noteFailure(chave)
      return NextResponse.json({ error: 'Senha atual incorreta.' }, { status: 401 })
    }

    await withDb(() => prisma.student.update({
      where: { id: studentId },
      data: { password: hashPassword(nova) },
    }))
    noteSuccess(chave)

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Não foi possível trocar a senha.' }, { status: 500 })
  }
}
