import { describe, expect, it } from 'vitest'
import { assinaturaValendo, motivoDoBloqueio, podeAbrir } from '@/lib/plano'

const livre = { plan: 'free', planStatus: 'active', renewsAt: null }
const emDia = { plan: 'annual', planStatus: 'active', renewsAt: new Date('2099-01-01') }
const pausado = { plan: 'annual', planStatus: 'paused', renewsAt: new Date('2099-01-01') }
const vencido = { plan: 'monthly', planStatus: 'active', renewsAt: new Date('2020-01-01') }

describe('o portão do plano', () => {
  it('deixa o curso Geral, a palavra e a revisão abertos para todo mundo', () => {
    // É o que já estava construído e pago: dar custa zero e prova o produto.
    for (const recurso of [{ tipo: 'curso-geral' }, { tipo: 'palavra-do-dia' }, { tipo: 'revisao' }] as const) {
      expect(podeAbrir(livre, recurso), recurso.tipo).toBe(true)
    }
  })

  it('abre o primeiro módulo de cada trilha para quem não paga', () => {
    expect(podeAbrir(livre, { tipo: 'modulo-de-trilha', numero: 1 })).toBe(true)
    expect(podeAbrir(livre, { tipo: 'modulo-de-trilha', numero: 2 })).toBe(false)
  })

  it('cobra pelas conversas e pelo kit', () => {
    expect(podeAbrir(livre, { tipo: 'simulacao' })).toBe(false)
    expect(podeAbrir(livre, { tipo: 'kit-de-bolso' })).toBe(false)
    expect(podeAbrir(emDia, { tipo: 'simulacao' })).toBe(true)
    expect(podeAbrir(emDia, { tipo: 'kit-de-bolso' })).toBe(true)
  })

  it('abre tudo para quem está em dia', () => {
    expect(podeAbrir(emDia, { tipo: 'modulo-de-trilha', numero: 8 })).toBe(true)
  })

  it('fecha o pago de quem pausou, sem cancelar nada', () => {
    // Pausar é para quem assinou por causa de uma viagem que acabou: o acesso
    // pago para, mas a conta e o progresso continuam de pé.
    expect(assinaturaValendo(pausado)).toBe(false)
    expect(podeAbrir(pausado, { tipo: 'simulacao' })).toBe(false)
    expect(podeAbrir(pausado, { tipo: 'curso-geral' })).toBe(true)
    expect(podeAbrir(pausado, { tipo: 'modulo-de-trilha', numero: 1 })).toBe(true)
  })

  it('honra o período já pago e nem um dia a mais', () => {
    expect(assinaturaValendo(vencido)).toBe(false)
    expect(assinaturaValendo(emDia)).toBe(true)

    const ultimoDia = { plan: 'monthly', planStatus: 'active', renewsAt: new Date('2026-03-10T12:00:00Z') }
    expect(assinaturaValendo(ultimoDia, new Date('2026-03-10T11:59:00Z'))).toBe(true)
    expect(assinaturaValendo(ultimoDia, new Date('2026-03-10T12:01:00Z'))).toBe(false)
  })

  it('trata aluno antigo, sem nenhum campo de plano, como gratuito', () => {
    // A migração não pode mudar o comportamento de quem já existia.
    expect(podeAbrir({}, { tipo: 'curso-geral' })).toBe(true)
    expect(podeAbrir({}, { tipo: 'simulacao' })).toBe(false)
  })

  it('diz por que fechou, para a tela não inventar outra regra', () => {
    expect(motivoDoBloqueio(livre, { tipo: 'simulacao' })).toBe('pago')
    expect(motivoDoBloqueio(pausado, { tipo: 'simulacao' })).toBe('pausado')
    expect(motivoDoBloqueio(emDia, { tipo: 'simulacao' })).toBeNull()
  })
})
