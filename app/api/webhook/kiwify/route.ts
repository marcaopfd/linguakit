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
 * O que ele faz é pequeno de propósito: grava o aviso, acha o aluno pelo
 * e-mail da compra e escreve plano, estado e validade nele. Toda a régua de o
 * que isso abre vive em lib/plano.ts, não aqui.
 *
 * O aviso é gravado SEMPRE, mesmo quando não acha ninguém. Antes, um aviso
 * sem dono virava um 200 e sumia — e quem comprasse o plano anual antes de
 * criar a conta esperaria a renovação, um ano depois, para receber o que já
 * tinha pagado. Agora o cadastro procura esse aviso guardado.
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

  const valeAte = renovaEm && !Number.isNaN(renovaEm.getTime()) ? renovaEm : null

  try {
    // Quem é o dono, se já houver um. A busca vem antes da escrita para que o
    // aviso gravado já saiba se encontrou alguém.
    const dono = await withDb(() => prisma.student.findFirst({
      where: { email },
      select: { id: true },
    }))

    if (dono) {
      await withDb(() => prisma.student.update({
        where: { id: dono.id },
        data: {
          plan: plano,
          planStatus: regra.estado,
          renewsAt: valeAte,
          billingRef: aviso.subscription_id ?? undefined,
        },
      }))
    }

    await withDb(() => prisma.paymentNotice.create({
      data: {
        email,
        plan: plano,
        status: regra.estado,
        renewsAt: valeAte,
        billingRef: aviso.subscription_id ?? null,
        event: evento,
        studentId: dono?.id ?? null,
        appliedAt: dono ? new Date() : null,
      },
    }))

    // Sem dono não é erro: é alguém que comprou antes de criar a conta, ou
    // que pagou com outro e-mail. O aviso fica guardado esperando.
    return NextResponse.json({ ok: true, aplicado: Boolean(dono) })
  } catch {
    return NextResponse.json({ error: 'Não foi possível gravar' }, { status: 500 })
  }
}
