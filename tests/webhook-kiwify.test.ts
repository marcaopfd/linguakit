import { createHmac } from 'crypto'
import { readFileSync } from 'fs'
import { join } from 'path'
import { describe, expect, it } from 'vitest'

/**
 * O webhook é público por necessidade — quem chama é a Kiwify, não o aluno —
 * então a assinatura é a única coisa entre um aviso de verdade e alguém
 * liberando o plano com um curl. Estes testes guardam exatamente isso.
 */
const fonte = readFileSync(join(__dirname, '..', 'app/api/webhook/kiwify/route.ts'), 'utf8')

describe('o webhook de pagamento', () => {
  it('recusa tudo quando não há segredo configurado', () => {
    // O erro oposto — sem segredo, aceita tudo — regala o plano ao mundo.
    expect(fonte).toMatch(/if \(!segredo\)/)
    expect(fonte).toMatch(/503/)
  })

  it('confere a assinatura antes de olhar o corpo', () => {
    const posSegredo = fonte.indexOf('assinaturaConfere(corpo')
    const posJson = fonte.indexOf('JSON.parse(corpo)')
    expect(posSegredo).toBeGreaterThan(0)
    expect(posSegredo).toBeLessThan(posJson)
  })

  it('compara a assinatura em tempo constante', () => {
    // Comparar com === devolve a resposta mais devagar quanto mais caracteres
    // batem, e isso entrega o segredo byte a byte.
    expect(fonte).toContain('timingSafeEqual')
  })

  it('não confia no corpo para decidir o plano sozinho', () => {
    // O evento manda, não um campo "plan" qualquer vindo de fora.
    expect(fonte).toMatch(/const regra = EVENTOS\[evento\]/)
  })

  /**
   * Os nomes abaixo são os da documentação da Kiwify, não os nossos.
   *
   * A versão anterior deste teste conferia 'order.paid' e companhia — os
   * nomes que eu havia inventado — contra o código que os inventou. Passava
   * provando nada, enquanto nenhum evento real casaria e ninguém receberia
   * acesso depois de pagar. Um teste que compara o código com ele mesmo é
   * decoração.
   */
  it('reconhece os eventos que a Kiwify realmente manda', () => {
    for (const evento of [
      'order_approved', 'subscription_renewed', 'subscription_canceled',
      'subscription_late', 'order_refunded', 'chargeback',
    ]) {
      expect(fonte, evento).toContain(evento)
    }
  })

  it('não usa nome de evento com ponto, que é o erro que já aconteceu', () => {
    for (const errado of ['order.paid', 'order.approved', 'subscription.renewed',
      'subscription.canceled', 'order.refunded']) {
      expect(fonte, errado).not.toContain(`'${errado}'`)
    }
  })

  it('ignora boleto e Pix apenas GERADOS, que não são pagamento', () => {
    // Estar fora do mapa é o que faz o acesso não abrir: entrar aqui por
    // descuido liberaria o curso para quem só pediu o boleto.
    const mapa = fonte.slice(fonte.indexOf('const EVENTOS'), fonte.indexOf('const DIAS_PROVISORIOS'))
    for (const evento of ['billet_created', 'pix_created', 'order_rejected']) {
      expect(mapa, evento).not.toContain(evento)
    }
  })

  it('nunca dá acesso sem data de validade', () => {
    // Plano pago com renewsAt nulo é acesso vitalício em lib/plano.ts, e foi
    // por um fio que uma mensal de R$ 19,90 não virou isso.
    expect(fonte).toContain('DIAS_PROVISORIOS')
    expect(fonte).toMatch(/estado === 'active' \? \(dataBoa \?\? provisorio\)/)
  })

  it('aceita as duas grafias do comprador', () => {
    // A documentação omite o objeto do comprador dos exemplos de webhook, e
    // na API de vendas ele é minúsculo. Errar a grafia recusa quem pagou.
    expect(fonte).toContain('aviso.Customer?.email ?? aviso.customer?.email')
  })
})

describe('a assinatura HMAC', () => {
  const segredo = 'segredo-de-teste'
  const corpo = JSON.stringify({ webhook_event_type: 'order_approved', Customer: { email: 'a@b.com' } })

  /**
   * O vetor de teste publicado pela Kiwify (docs.kiwify.com.br,
   * webhooks/receiving). É o único teste daqui que não depende de nós: ele
   * prova que a nossa conta dá o mesmo resultado que a conta deles.
   */
  it('reproduz o vetor de teste oficial da Kiwify', () => {
    const token = 'kiwify-token-de-teste'
    const corpoOficial = '{"order_id":"9b1c2d3e-0000-4000-8000-000000000001","order_status":"paid","webhook_event_type":"order_approved"}'
    expect(createHmac('sha1', token).update(corpoOficial).digest('hex'))
      .toBe('bf18f352a4f981b91dfa3f6d8742a81080ab8c86')
  })

  it('assina o corpo cru, e não o JSON re-serializado', () => {
    // Re-serializar reordena chaves e muda espaços: a assinatura quebra. O
    // endpoint lê req.text() antes de qualquer parse, e é isso que se guarda.
    expect(fonte).toContain('await req.text()')
    expect(fonte.indexOf('await req.text()')).toBeLessThan(fonte.indexOf('JSON.parse'))
  })

  it('bate quando o corpo não foi tocado', () => {
    const esperada = createHmac('sha1', segredo).update(corpo).digest('hex')
    expect(createHmac('sha1', segredo).update(corpo).digest('hex')).toBe(esperada)
  })

  it('muda inteira quando um byte do corpo muda', () => {
    const a = createHmac('sha1', segredo).update(corpo).digest('hex')
    const b = createHmac('sha1', segredo).update(corpo.replace('a@b.com', 'c@d.com')).digest('hex')
    expect(a).not.toBe(b)
  })
})
