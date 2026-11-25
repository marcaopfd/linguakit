import { createHmac, timingSafeEqual } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { prisma, withDb } from '@/lib/db'
import { normaliseEmail } from '@/lib/student-auth'

export const runtime = 'nodejs'

/**
 * O aviso de pagamento da Kiwify.
 *
 * O app nunca vê cartão: a Kiwify cobra, e manda aqui o que aconteceu. Este
 * endpoint é público por necessidade — é a Kiwify que chama, não o aluno —,
 * então a assinatura HMAC é a única coisa que separa um aviso de verdade de
 * alguém liberando o plano de graça com um curl. Sem segredo configurado, o
 * endpoint recusa tudo, em vez de aceitar tudo.
 *
 * O que ele faz é pequeno de propósito: acha o aluno pelo e-mail da compra e
 * grava plano, estado e validade. Toda a régua de o que isso abre vive em
 * lib/plano.ts, não aqui.
 */

/** O que cada evento da Kiwify significa para o nosso aluno. */
const EVENTOS: Record<string, { plano?: string; estado: string }> = {
  'order.paid': { estado: 'active' },
  'order.approved': { estado: 'active' },
  'subscription.renewed': { estado: 'active' },
  'subscription.paused': { estado: 'paused' },
  'subscription.canceled': { estado: 'canceled' },
  'subscription.late': { estado: 'canceled' },
  'order.refunded': { plano: 'free', estado: 'canceled' },
  'chargeback': { plano: 'free', estado: 'canceled' },
}

function assinaturaConfere(corpo: string, enviada: string | null, segredo: string): boolean {
  if (!enviada) return false
  const esperada = createHmac('sha1', segredo).update(corpo).digest('hex')
  const a = Buffer.from(esperada)
  const b = Buffer.from(enviada.trim())
  // Comparação de tempo constante: comparar com === vaza o segredo aos poucos.
  return a.length === b.length && timingSafeEqual(a, b)
}

export async function POST(req: NextRequest) {
  const segredo = process.env.KIWIFY_WEBHOOK_SECRET
  if (!segredo) {
    return NextResponse.json({ error: 'Webhook não configurado' }, { status: 503 })
  }

  const corpo = await req.text()
  const assinatura = new URL(req.url).searchParams.get('signature')
    ?? req.headers.get('x-kiwify-signature')

  if (!assinaturaConfere(corpo, assinatura, segredo)) {
    return NextResponse.json({ error: 'Assinatura inválida' }, { status: 401 })
  }

  let aviso: {
    order_status?: string
    webhook_event_type?: string
    subscription_id?: string
    Customer?: { email?: string }
    Subscription?: { plan?: { frequency?: string }; next_payment?: string }
  }
  try {
    aviso = JSON.parse(corpo)
  } catch {
    return NextResponse.json({ error: 'Corpo inválido' }, { status: 400 })
  }

  const evento = aviso.webhook_event_type ?? ''
  const regra = EVENTOS[evento]
  if (!regra) {
    // Evento que não nos diz respeito. 200 de propósito: devolver erro faz a
    // Kiwify reenviar para sempre uma coisa que nunca vamos querer.
    return NextResponse.json({ ok: true, ignorado: evento })
  }

  const email = normaliseEmail(aviso.Customer?.email ?? '')
  if (!email) return NextResponse.json({ error: 'Compra sem e-mail' }, { status: 400 })

  const plano = regra.plano
    ?? (aviso.Subscription?.plan?.frequency === 'monthly' ? 'monthly' : 'annual')
  const renovaEm = aviso.Subscription?.next_payment
    ? new Date(aviso.Subscription.next_payment)
    : null

  try {
    const atualizados = await withDb(() => prisma.student.updateMany({
      where: { email },
      data: {
        plan: plano,
        planStatus: regra.estado,
        renewsAt: renovaEm && !Number.isNaN(renovaEm.getTime()) ? renovaEm : null,
        billingRef: aviso.subscription_id ?? undefined,
      },
    }))

    // Comprou antes de criar a conta. Não é erro: quando ela se cadastrar com
    // o mesmo e-mail, o próximo aviso de renovação a encontra.
    if (!atualizados.count) {
      return NextResponse.json({ ok: true, aviso: 'sem conta com este e-mail' })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Não foi possível gravar' }, { status: 500 })
  }
}
