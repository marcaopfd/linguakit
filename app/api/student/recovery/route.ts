import { NextRequest, NextResponse } from 'next/server'
import { prisma, withDb } from '@/lib/db'
import { callerKey, isLockedOut, noteFailure, noteSuccess } from '@/lib/rate-limit'
import { gerarCodigo, hashDoCodigo } from '@/lib/recovery'
import { readStudentId, verifyPassword } from '@/lib/student-auth'

/**
 * Gera um código de recuperação novo e o devolve UMA vez.
 *
 * O que sai daqui em claro não existe em lugar nenhum depois: o banco guarda
 * só o hash. Gerar outro invalida o anterior, que é o que se quer de quem
 * acha que o papel velho se perdeu.
 *
 * Mesma prova de dono da troca de senha: sessão deste navegador, ou a senha.
 * O link do curso não basta — senão quem recebesse o link conseguiria um
 * código e, com ele, a conta inteira.
 */
export async function POST(req: NextRequest) {
  let corpo: { studentId?: unknown; senha?: unknown }
  try {
    corpo = await req.json()
  } catch {
    return NextResponse.json({ error: 'Pedido inválido.' }, { status: 400 })
  }

  const { studentId, senha } = corpo
  if (typeof studentId !== 'string' || !studentId) {
    return NextResponse.json({ error: 'Falta o aluno.' }, { status: 400 })
  }

  const chave = callerKey(req, 'codigo-recuperacao')
  if (isLockedOut(chave)) {
    return NextResponse.json({ error: 'Muitas tentativas. Espere alguns minutos.' }, { status: 429 })
  }

  try {
    const student = await withDb(() => prisma.student.findUnique({
      where: { id: studentId },
      select: { id: true, email: true, password: true },
    }))
    if (!student) return NextResponse.json({ error: 'Aluno não encontrado.' }, { status: 404 })
    if (!student.email) {
      return NextResponse.json(
        { error: 'Esta conta ainda não existe. Crie a conta primeiro.' },
        { status: 400 },
      )
    }

    const temSessao = readStudentId(req) === studentId
    const senhaConfere = typeof senha === 'string' && verifyPassword(senha, student.password)
    if (!temSessao && !senhaConfere) {
      await noteFailure(chave)
      return NextResponse.json({ error: 'Senha incorreta.' }, { status: 401 })
    }

    const codigo = gerarCodigo()
    await withDb(() => prisma.student.update({
      where: { id: studentId },
      data: { recoveryCode: hashDoCodigo(codigo), recoveryCodeAt: new Date() },
    }))
    noteSuccess(chave)

    return NextResponse.json({ ok: true, codigo })
  } catch {
    return NextResponse.json({ error: 'Não foi possível gerar o código.' }, { status: 500 })
  }
}
