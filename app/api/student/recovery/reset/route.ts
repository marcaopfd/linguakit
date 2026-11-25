import { NextRequest, NextResponse } from 'next/server'
import { prisma, withDb } from '@/lib/db'
import { callerKey, isLockedOut, noteFailure, noteSuccess } from '@/lib/rate-limit'
import { codigoConfere, gerarCodigo, hashDoCodigo, pareceCodigo } from '@/lib/recovery'
import { hashPassword, isValidEmail, normaliseEmail, setStudentCookie } from '@/lib/student-auth'

/**
 * Esqueci a senha: e-mail + código de recuperação = senha nova.
 *
 * O caminho que não precisa de e-mail nenhum sendo enviado. Três cuidados:
 *
 * 1. A resposta é a mesma para e-mail que não existe, código errado e conta
 *    sem código. Dizer "esse e-mail não tem conta" transforma esta tela num
 *    detector de quem é cliente — e dizer "essa conta não tem código" diz a
 *    um atacante onde insistir.
 * 2. Toda tentativa errada passa pelo freio de lib/rate-limit, o mesmo do
 *    login, que atrasa a resposta e conta os erros.
 * 3. O código é de um uso. Gastou, some — e esta mesma resposta já traz o
 *    próximo, para a pessoa não ficar sem rede de proteção depois de usar.
 */
const MESMA_RESPOSTA = {
  error: 'E-mail ou código não conferem. Confira os dois e tente de novo.',
}

export async function POST(req: NextRequest) {
  let corpo: { email?: unknown; codigo?: unknown; senha?: unknown }
  try {
    corpo = await req.json()
  } catch {
    return NextResponse.json({ error: 'Pedido inválido.' }, { status: 400 })
  }

  const email = typeof corpo.email === 'string' ? normaliseEmail(corpo.email) : ''
  const codigo = typeof corpo.codigo === 'string' ? corpo.codigo : ''
  const senha = typeof corpo.senha === 'string' ? corpo.senha : ''

  if (!isValidEmail(email)) return NextResponse.json(MESMA_RESPOSTA, { status: 401 })
  if (senha.length < 8) {
    return NextResponse.json({ error: 'A nova senha precisa ter pelo menos 8 caracteres.' }, { status: 400 })
  }

  const chave = callerKey(req, 'recuperar-senha')
  if (isLockedOut(chave)) {
    return NextResponse.json(
      { error: 'Muitas tentativas deste aparelho. Espere alguns minutos.' },
      { status: 429 },
    )
  }

  // Formato errado nem chega ao banco: é erro de digitação, não tentativa.
  if (!pareceCodigo(codigo)) {
    await noteFailure(chave)
    return NextResponse.json(MESMA_RESPOSTA, { status: 401 })
  }

  try {
    const student = await withDb(() => prisma.student.findUnique({
      where: { email },
      select: { id: true, recoveryCode: true },
    }))

    if (!student || !codigoConfere(codigo, student.recoveryCode)) {
      await noteFailure(chave)
      return NextResponse.json(MESMA_RESPOSTA, { status: 401 })
    }

    // Senha nova e código novo na mesma escrita: o antigo morre aqui.
    const proximo = gerarCodigo()
    await withDb(() => prisma.student.update({
      where: { id: student.id },
      data: {
        password: hashPassword(senha),
        recoveryCode: hashDoCodigo(proximo),
        recoveryCodeAt: new Date(),
      },
    }))
    noteSuccess(chave)

    const res = NextResponse.json({ ok: true, studentId: student.id, codigo: proximo })
    if (!setStudentCookie(res, student.id)) {
      return NextResponse.json({ error: 'Servidor sem SESSION_SECRET configurado.' }, { status: 500 })
    }
    return res
  } catch {
    return NextResponse.json({ error: 'Não foi possível trocar a senha agora.' }, { status: 500 })
  }
}
