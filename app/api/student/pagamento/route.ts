import { NextRequest, NextResponse } from 'next/server'
import { prisma, withDb } from '@/lib/db'
import { aplicarPagamentoPendente } from '@/lib/pagamento'

/**
 * "Já paguei e não liberou."
 *
 * Procura um aviso da Kiwify guardado para o e-mail desta conta e o aplica.
 * Isso cobre o caso de quem comprou antes de se cadastrar e o de quem se
 * cadastrou enquanto o aviso ainda estava a caminho.
 *
 * Público por studentId, como o resto do portal: esse id é a chave. E o que
 * esta rota pode fazer é estreito de propósito — só aplica um pagamento que
 * já estava registrado NO E-MAIL daquela conta. Ela não cria acesso nenhum
 * que a Kiwify não tenha avisado antes.
 */
export async function POST(req: NextRequest) {
  let studentId: unknown
  try {
    ({ studentId } = await req.json())
  } catch {
    return NextResponse.json({ error: 'Pedido inválido.' }, { status: 400 })
  }
  if (typeof studentId !== 'string' || !studentId) {
    return NextResponse.json({ error: 'Falta o aluno.' }, { status: 400 })
  }

  try {
    const student = await withDb(() => prisma.student.findUnique({
      where: { id: studentId },
      select: { id: true, email: true },
    }))
    if (!student) return NextResponse.json({ error: 'Aluno não encontrado.' }, { status: 404 })

    // Sem e-mail não há como casar: a Kiwify avisa por e-mail de quem comprou.
    if (!student.email) {
      return NextResponse.json({ ok: true, encontrado: false, semEmail: true })
    }

    const aplicado = await aplicarPagamentoPendente(student.email, student.id)
    return NextResponse.json({
      ok: true,
      encontrado: Boolean(aplicado),
      plano: aplicado?.plan ?? null,
    })
  } catch {
    return NextResponse.json({ error: 'Não foi possível conferir agora.' }, { status: 500 })
  }
}
