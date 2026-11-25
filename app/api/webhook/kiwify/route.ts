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

/**
 * O que cada evento da Kiwify significa para o nosso aluno.
 *
 * Os nomes são os que a Kiwify manda em `webhook_event_type`, conferidos na
 * documentação dela (docs.kiwify.com.br, webhooks/receiving) e NÃO inventados:
 * underscore, não ponto. Este mapa já esteve escrito com ponto
 * (`order.paid`, `subscription.renewed`), e o efeito era silencioso e total —
 * nenhum evento casava, todo aviso caía no galho "ignorado", e ninguém jamais
 * receberia acesso depois de pagar. Um 200 em cada entrega, e nada
 * acontecendo.
 *
 * Note que o gatilho configurado no painel tem outro nome do que o evento que
 * chega: "compra_aprovada" no painel chega aqui como `order_approved`.
 *
 * Fora da lista de propósito: `billet_created` e `pix_created` (boleto ou Pix
 * GERADO não é pago), `order_rejected` e `carrinho_abandonado`.
 */
const EVENTOS: Record<string, { plano?: string; estado: string }> = {
  order_approved: { estado: 'active' },
  subscription_renewed: { estado: 'active' },
  // Período de teste conta como acesso enquanto dura.
  subscription_trial_started: { estado: 'active' },
  subscription_canceled: { estado: 'canceled' },
  // Renovação que falhou. "canceled" aqui não tira o acesso na hora: quem tem
  // renewsAt no futuro vale até o fim do período pago (lib/plano.ts).
  subscription_late: { estado: 'canceled' },
  subscription_trial_canceled: { plano: 'free', estado: 'canceled' },
  order_refunded: { plano: 'free', estado: 'canceled' },
  chargeback: { plano: 'free', estado: 'canceled' },
}

/**
 * Quanto tempo de acesso dar quando a Kiwify diz que foi pago mas não diz até
 * quando.
 *
 * Sem data, `assinaturaValendo` trata plano pago + ativo como acesso que nunca
 * expira — ou seja, uma assinatura mensal de R$ 19,90 viraria acesso vitalício
 * se o aviso da primeira cobrança chegasse sem o objeto Subscription. Então o
 * acesso sem data é PROVISÓRIO, e se corrige sozinho: a próxima renovação
 * manda `subscription_renewed` com `next_payment` e estende.
 *
 * Isto vale porque hoje os dois planos são assinatura. Se um dia existir um
 * produto de pagamento único, ele precisa de acesso sem prazo, e esta regra
 * tem que passar a olhar se há assinatura.
 */
const DIAS_PROVISORIOS = 40

/** De "annually", "monthly" e companhia para os nossos dois planos. */
function planoDaFrequencia(frequencia: string | undefined): string | null {
  if (!frequencia) return null
  // A Kiwify tem weekly, monthly, bimonthly, quarterly, semi-annually e
  // annually. Só "annually" é o nosso anual; qualquer outra coisa recebe o
  // acesso mais curto, que é o erro que se conserta na renovação seguinte.
  return frequencia === 'annually' ? 'annual' : 'monthly'
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
    order_id?: string
    order_status?: string
    webhook_event_type?: string
    subscription_id?: string
    // A documentação omite o objeto do comprador dos exemplos de webhook, e na
    // API de vendas ele é `customer`, minúsculo. Aceitar as duas grafias custa
    // uma linha; errar a grafia devolve "compra sem e-mail" para quem pagou.
    Customer?: { email?: string }
    customer?: { email?: string }
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

  const email = normaliseEmail(aviso.Customer?.email ?? aviso.customer?.email ?? '')
  if (!email) return NextResponse.json({ error: 'Compra sem e-mail' }, { status: 400 })

  // O plano vem da frequência da assinatura. Sem ela, mensal: é o acesso mais
  // curto, e a renovação seguinte corrige.
  const plano = regra.plano
    ?? planoDaFrequencia(aviso.Subscription?.plan?.frequency)
    ?? 'monthly'

  const renovaEm = aviso.Subscription?.next_payment
    ? new Date(aviso.Subscription.next_payment)
    : null
  const dataBoa = renovaEm && !Number.isNaN(renovaEm.getTime()) ? renovaEm : null

  // Quem ganha acesso precisa de uma data, senão o acesso nunca expira — ver
  // DIAS_PROVISORIOS.
  const provisorio = new Date(Date.now() + DIAS_PROVISORIOS * 24 * 60 * 60 * 1000)
  const valeAte = regra.estado === 'active' ? (dataBoa ?? provisorio) : dataBoa

  /**
   * O que escrever no aluno, que não é a mesma coisa para quem entra e para
   * quem sai.
   *
   * Três casos, e os dois últimos existem por causa de uma ordem de eventos
   * que a própria documentação da Kiwify descreve: reembolsar uma cobrança de
   * assinatura CANCELA a assinatura, então depois de `order_refunded` chega um
   * `subscription_canceled`. Se esse segundo aviso reescrevesse plano e data,
   * ele devolveria "monthly" com a data de renovação no futuro — e o aluno
   * reembolsado voltaria a ter acesso, porque em lib/plano.ts data futura vale
   * mais que estado cancelado.
   *
   *   - ganhou acesso: escreve plano, estado e validade;
   *   - perdeu o dinheiro de volta (reembolso, chargeback): derruba tudo na
   *     hora, plano free e sem data;
   *   - cancelou ou atrasou: mexe SÓ no estado. O plano e a data que já estão
   *     lá é que garantem o acesso até o fim do período pago — que é o que a
   *     pessoa comprou.
   */
  const dadosDoAluno = regra.estado === 'active'
    ? { plan: plano, planStatus: regra.estado, renewsAt: valeAte, billingRef: aviso.subscription_id ?? undefined }
    : regra.plano === 'free'
      ? { plan: 'free', planStatus: regra.estado, renewsAt: null }
      : { planStatus: regra.estado }

  try {
    // Quem é o dono, se já houver um.
    const dono = await withDb(() => prisma.student.findFirst({
      where: { email },
      select: { id: true },
    }))

    // O AVISO PRIMEIRO, antes de tentar aplicar.
    //
    // Esta ordem é o contrário da intuitiva, e é de propósito. Antes a escrita
    // no aluno vinha primeiro, e as duas moravam no mesmo try: qualquer erro
    // ao gravar no aluno — uma colisão de chave única em billingRef, o banco
    // dormindo — devolvia 500 e o aviso nunca era gravado. Ou seja, um pedido
    // PAGO desaparecia inteiro, e a Kiwify reenviava por dez minutos batendo
    // no mesmo erro até desistir.
    //
    // Gravado o aviso, o dinheiro está registrado mesmo que aplicá-lo falhe, e
    // "já paguei e não liberou" (lib/pagamento.ts) encontra e aplica depois,
    // porque ele procura exatamente os avisos com appliedAt nulo.
    const guardado = await withDb(() => prisma.paymentNotice.create({
      data: {
        email,
        plan: plano,
        status: regra.estado,
        renewsAt: valeAte,
        billingRef: aviso.subscription_id ?? null,
        event: evento,
        studentId: dono?.id ?? null,
        appliedAt: null,
      },
    }))

    // Sem dono não é erro: é alguém que comprou antes de criar a conta, ou que
    // pagou com outro e-mail. O aviso fica guardado esperando.
    if (!dono) return NextResponse.json({ ok: true, aplicado: false })

    try {
      await withDb(() => prisma.student.update({
        where: { id: dono.id },
        data: dadosDoAluno,
      }))
      await withDb(() => prisma.paymentNotice.update({
        where: { id: guardado.id },
        data: { appliedAt: new Date() },
      }))
      return NextResponse.json({ ok: true, aplicado: true })
    } catch {
      // 200, e não 500: o aviso está guardado, então reenviar só criaria
      // avisos repetidos. Fica pendente para a Conta aplicar.
      return NextResponse.json({ ok: true, aplicado: false, pendente: true })
    }
  } catch {
    // Aqui o aviso não foi gravado. 500 é certo: queremos o reenvio.
    return NextResponse.json({ error: 'Não foi possível gravar' }, { status: 500 })
  }
}
