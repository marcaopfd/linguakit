import { readFileSync } from 'fs'
import { join } from 'path'
import { describe, expect, it } from 'vitest'

/**
 * O que a gente promete tem que existir.
 *
 * A promessa de "pausar a assinatura por até três meses" nasceu numa tela e
 * foi copiada para cinco — landing, planos, paywall, reembolso e contato —
 * antes de alguém conferir se dava para cumprir. Não dava: a Kiwify não tem
 * evento de pausa nenhum na lista de gatilhos dela, então nada no sistema
 * jamais colocaria um aluno em pausa.
 *
 * Isto é pior do que um bug: é o cliente cobrando uma coisa que você
 * anunciou e não tem como entregar — e é a mesma família do preço anunciado
 * diferente do cobrado (CDC, art. 30 e 37, que obrigam a cumprir o que foi
 * veiculado).
 *
 * O mecanismo de pausa continua no código (lib/plano.ts sabe o que fazer com
 * um aluno pausado, e está testado). O que saiu foi a PROMESSA. Se um dia
 * existir um jeito de pausar de verdade, é só apagar este arquivo.
 */

const ler = (p: string) => readFileSync(join(__dirname, '..', p), 'utf8')

/** Tudo que o cliente lê antes ou depois de pagar. */
const TELAS_DE_VENDA = [
  'app/ingles-para-morar-fora/page.tsx',
  'app/learn/[studentId]/assinar/view.tsx',
  'app/reembolso/page.tsx',
  'app/contato/page.tsx',
  'components/Paywall.tsx',
]

const semComentarios = (fonte: string) => fonte
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/^\s*\/\/.*$/gm, '')
  .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')

describe('as promessas das telas de venda', () => {
  it('não oferece pausar a assinatura, que a Kiwify não sabe fazer', () => {
    for (const tela of TELAS_DE_VENDA) {
      const copy = semComentarios(ler(tela))
      expect(copy, `${tela} promete pausa`).not.toMatch(/paus(ar|a\b)/i)
    }
  })

  it('não promete prazo de pausa em meses', () => {
    for (const tela of TELAS_DE_VENDA) {
      expect(semComentarios(ler(tela)), tela).not.toMatch(/três meses/i)
    }
  })

  it('mantém o mecanismo de pausa, que não é promessa e pode voltar a servir', () => {
    // Tirar a oferta da copy não é motivo para jogar fora a regra: ela está
    // certa, está testada, e um painel de pausa manual a usaria amanhã.
    expect(ler('lib/plano.ts')).toContain("'paused'")
  })
})
