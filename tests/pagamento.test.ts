import { readFileSync } from 'fs'
import { join } from 'path'
import { describe, expect, it } from 'vitest'
import { linkDoCheckout } from '@/lib/kiwify'
import { avisoQueVale, planoDoAviso, type AvisoGuardado } from '@/lib/pagamento'

const raiz = join(__dirname, '..')
const ler = (p: string) => readFileSync(join(raiz, p), 'utf8')

function aviso(parcial: Partial<AvisoGuardado> & { createdAt: Date }): AvisoGuardado {
  return {
    plan: 'annual',
    status: 'active',
    renewsAt: null,
    billingRef: null,
    ...parcial,
  }
}

describe('qual aviso de pagamento vale', () => {
  it('não acha nada quando não há aviso guardado', () => {
    expect(avisoQueVale([])).toBeNull()
  })

  it('escolhe o mais recente, não o primeiro da lista', () => {
    // O bug que isto guarda: pegar avisos[0] confiando na ordenação do banco.
    // Se a consulta mudar de ordem um dia, quem cancelou volta a ter acesso.
    const janeiro = aviso({ createdAt: new Date('2026-01-10'), status: 'active' })
    const marco = aviso({ createdAt: new Date('2026-03-10'), status: 'canceled' })
    expect(avisoQueVale([janeiro, marco])?.status).toBe('canceled')
    expect(avisoQueVale([marco, janeiro])?.status).toBe('canceled')
  })

  it('traduz o aviso ativo para as colunas do aluno', () => {
    const vale = new Date('2027-01-01')
    const dados = planoDoAviso(aviso({
      createdAt: new Date('2026-01-01'),
      plan: 'monthly',
      status: 'active',
      renewsAt: vale,
      billingRef: 'sub_123',
    }))
    expect(dados).toEqual({
      plan: 'monthly',
      planStatus: 'active',
      renewsAt: vale,
      billingRef: 'sub_123',
    })
  })

  it('não deixa um aviso cancelado carregar data de validade', () => {
    // A Kiwify manda, no aviso de cancelamento, a data em que a assinatura ia
    // renovar. Aplicar essa data devolveria acesso a quem cancelou, porque em
    // lib/plano.ts data futura vale mais que estado cancelado — e um reembolso
    // seguido do cancelamento automático da assinatura cairia exatamente aqui.
    for (const status of ['canceled', 'paused']) {
      const dados = planoDoAviso(aviso({
        createdAt: new Date('2026-01-01'),
        plan: 'monthly',
        status,
        renewsAt: new Date('2027-01-01'),
      }))
      expect(dados.renewsAt, status).toBeNull()
    }
  })

  it('não apaga a referência da assinatura quando o aviso não traz uma', () => {
    // billingRef é como a renovação acha o aluno quando o e-mail muda. Gravar
    // null por cima de uma referência existente a perderia para sempre.
    const dados = planoDoAviso(aviso({ createdAt: new Date('2026-01-01'), billingRef: null }))
    expect('billingRef' in dados).toBe(false)
  })
})

describe('o encontro entre o pagamento e a conta', () => {
  const webhook = ler('app/api/webhook/kiwify/route.ts')
  const cadastro = ler('app/api/student/signup/route.ts')
  const reivindicar = ler('app/api/student/claim/route.ts')
  const exclusao = ler('app/api/students/[id]/route.ts')

  it('grava o aviso ANTES de tentar aplicá-lo', () => {
    // Esta ordem é o que impede um pedido pago de desaparecer. Com a escrita
    // no aluno primeiro, qualquer erro ali — colisão de chave única em
    // billingRef, banco dormindo — devolvia 500 sem ter gravado nada, e o
    // dinheiro sumia enquanto a Kiwify batia no mesmo erro por dez minutos.
    expect(webhook).toContain('prisma.paymentNotice.create')
    const posCreate = webhook.indexOf('prisma.paymentNotice.create')
    const posUpdate = webhook.indexOf('prisma.student.update')
    expect(posCreate).toBeGreaterThan(0)
    expect(posUpdate).toBeGreaterThan(0)
    expect(posCreate).toBeLessThan(posUpdate)
  })

  it('nasce pendente, para o conserto depois conseguir achá-lo', () => {
    // lib/pagamento.ts procura avisos com appliedAt nulo. Gravar já aplicado
    // antes de aplicar de fato esconderia o aviso de quem iria consertá-lo.
    const bloco = webhook.slice(webhook.indexOf('prisma.paymentNotice.create'))
    expect(bloco.slice(0, 500)).toContain('appliedAt: null')
  })

  it('devolve 2xx quando o aviso está guardado mas não deu para aplicar', () => {
    // 500 aqui faria a Kiwify reenviar e criar avisos repetidos de uma coisa
    // que já está registrada.
    expect(webhook).toContain('pendente: true')
  })

  it('procura o pagamento à espera quando a conta nasce', () => {
    for (const [nome, fonte] of [['cadastro', cadastro], ['claim', reivindicar]] as const) {
      expect(fonte, nome).toContain('aplicarPagamentoPendente')
    }
  })

  it('leva o aviso junto quando o aluno é apagado', () => {
    // Ele guarda o e-mail da pessoa, então é dado dela, mesmo sem chave
    // estrangeira que obrigue.
    const handler = exclusao.slice(exclusao.indexOf('export async function DELETE'))
    expect(handler).toContain('prisma.paymentNotice.deleteMany')
  })
})

describe('o checkout leva o comprador junto', () => {
  const planos = ler('app/learn/[studentId]/assinar/view.tsx')

  it('põe e-mail e nome na URL da Kiwify', () => {
    // Sem isso a pessoa digita outro e-mail no checkout e a compra não acha
    // a conta — o dinheiro entra e o acesso não.
    const url = new URL(linkDoCheckout('https://pay.kiwify.com.br/abc123', 'ana@exemplo.com', ' Ana Maria '))
    expect(url.searchParams.get('email')).toBe('ana@exemplo.com')
    expect(url.searchParams.get('name')).toBe('Ana Maria')
    expect(url.origin + url.pathname).toBe('https://pay.kiwify.com.br/abc123')
  })

  it('preserva os parâmetros que o link já trazia', () => {
    // O link da Kiwify pode vir com rastreamento colado. Trocar a URL inteira
    // apagaria isso sem ninguém notar.
    const url = new URL(linkDoCheckout('https://pay.kiwify.com.br/abc?src=instagram', 'ana@exemplo.com'))
    expect(url.searchParams.get('src')).toBe('instagram')
    expect(url.searchParams.get('email')).toBe('ana@exemplo.com')
    expect(url.searchParams.has('name')).toBe(false)
  })

  it('devolve o link como está quando ele não é uma URL válida', () => {
    // Variável de ambiente mal colada não pode sumir com o botão de pagar.
    expect(linkDoCheckout('isso-nao-e-url', 'ana@exemplo.com')).toBe('isso-nao-e-url')
  })

  it('não mostra botão de pagar para quem ainda não tem conta', () => {
    expect(planos).toContain('{!email ?')
    expect(planos).toContain('/conta')
  })
})

describe('a volta da Kiwify', () => {
  const pagina = ler('app/obrigado/page.tsx')
  const proxy = ler('proxy.ts')

  it('deixa a página de obrigado aberta a quem não tem sessão de professor', () => {
    // É para onde a Kiwify manda o comprador. Atrás de qualquer login, o
    // dinheiro entraria e a pessoa bateria numa porta fechada.
    const publicas = proxy.slice(proxy.indexOf('const PUBLIC_PATHS'), proxy.indexOf('function isUnder'))
    expect(publicas).toContain("'/obrigado'")
  })

  it('descobre quem voltou pelo cookie, já que a Kiwify não manda parâmetro', () => {
    expect(pagina).toContain('readStudentIdFromToken')
    expect(pagina).toContain('STUDENT_COOKIE')
  })

  it('tenta casar o pagamento guardado antes de dizer que está esperando', () => {
    const pos = pagina.indexOf('aplicarPagamentoPendente')
    const esperando = pagina.indexOf("estado=\"esperando\"")
    expect(pos).toBeGreaterThan(0)
    expect(esperando).toBeGreaterThan(pos)
  })
})
