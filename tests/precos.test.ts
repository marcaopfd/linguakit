import { readFileSync } from 'fs'
import { join } from 'path'
import { describe, expect, it } from 'vitest'
import { PRECOS, descontoDoAnual, emReais, mensalidadeDoAnual } from '@/lib/precos'

const ler = (p: string) => readFileSync(join(__dirname, '..', p), 'utf8')

/** Toda tela que mostra preço ao comprador. Nova tela de venda entra aqui. */
const TELAS = [
  'app/ingles-para-morar-fora/page.tsx',
  'app/learn/[studentId]/assinar/view.tsx',
]

/** Sem comentários: eles explicam justamente o preço que não deve ser digitado. */
const semComentarios = (fonte: string) => fonte
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/^\s*\/\/.*$/gm, '')
  .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')

describe('emReais', () => {
  it('esconde os centavos quando são zero', () => {
    expect(emReais(14900)).toBe('R$ 149')
  })

  it('mostra os centavos quando existem, com dois dígitos', () => {
    expect(emReais(1990)).toBe('R$ 19,90')
    expect(emReais(1905)).toBe('R$ 19,05')
  })

  it('separa o milhar como se escreve em português', () => {
    expect(emReais(149000)).toBe('R$ 1.490')
  })
})

describe('o que se deriva do preço', () => {
  it('divide o anual por doze em vez de confiar num número digitado', () => {
    expect(mensalidadeDoAnual()).toBe(emReais(Math.round(PRECOS.annual.centavos / 12)))
  })

  it('arredonda o desconto para baixo, nunca a favor de quem anuncia', () => {
    const real = (1 - PRECOS.annual.centavos / (PRECOS.monthly.centavos * 12)) * 100
    expect(descontoDoAnual()).toBeLessThanOrEqual(real)
    expect(descontoDoAnual()).toBeGreaterThan(real - 1)
  })

  it('só chama o anual de mais barato se ele for mais barato', () => {
    // Se um dia o anual passar dos doze meses do mensal, o desconto fica
    // negativo e a copy "X% mais barato" vira mentira. Melhor quebrar aqui.
    expect(descontoDoAnual()).toBeGreaterThan(0)
  })
})

describe('as telas de venda', () => {
  it('não têm nenhum preço digitado à mão', () => {
    // A regra inteira: achar "R$" na copy significa que alguém escreveu um
    // valor numa tela em vez de ler de lib/precos.ts — e é assim que o site
    // passa a anunciar um preço que a Kiwify não cobra.
    for (const tela of TELAS) {
      const copy = semComentarios(ler(tela)).replace(/rgba?\([^)]*\)/g, '')
      expect(copy, tela).not.toMatch(/R\$/)
    }
  })

  it('leem o preço de lib/precos.ts', () => {
    for (const tela of TELAS) {
      expect(ler(tela), tela).toMatch(/from '@\/lib\/precos'/)
    }
  })
})
