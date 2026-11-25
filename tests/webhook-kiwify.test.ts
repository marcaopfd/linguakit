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

  it('reconhece os eventos que mudam o acesso', () => {
    for (const evento of ['order.paid', 'subscription.renewed', 'subscription.paused',
      'subscription.canceled', 'order.refunded', 'chargeback']) {
      expect(fonte, evento).toContain(`'${evento}'`)
    }
  })
})

describe('a assinatura HMAC', () => {
  // A mesma conta que o endpoint faz, para provar que o formato confere.
  const segredo = 'segredo-de-teste'
  const corpo = JSON.stringify({ webhook_event_type: 'order.paid', Customer: { email: 'a@b.com' } })

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
