import { describe, expect, it } from 'vitest'
import { EN_MODULES } from '@/lib/curriculum-en'
import { toCourseIndex } from '@/lib/curriculum-index'
import { TRILHAS, caminhoDoModulo, modulosDa, trilhaPorId } from '@/lib/trilhas'

/**
 * As trilhas são dados escritos à mão, e o que quebra em dados escritos à mão
 * é sempre a mesma coisa: um id repetido, uma meta faltando, um caminho que
 * leva a uma tela que não existe.
 */
describe('as trilhas', () => {
  it('tem id único e nenhum módulo com id repetido', () => {
    const ids = TRILHAS.map(t => t.id)
    expect(new Set(ids).size).toBe(ids.length)

    const modulos = TRILHAS.flatMap(t => t.modulos.map(m => m.id))
    expect(new Set(modulos).size, modulos.join(' ')).toBe(modulos.length)
  })

  it('nunca usa o id de um módulo de nível', () => {
    // O progresso do aluno é endereçado por moduleId. Uma trilha chamada "a1"
    // marcaria unidades do curso como feitas, ou pior, o contrário.
    const niveis = new Set(EN_MODULES.map(m => m.id))
    for (const t of TRILHAS) {
      for (const m of t.modulos) expect(niveis.has(m.id), m.id).toBe(false)
    }
  })

  it('diz a cada módulo o que o aluno vai conseguir fazer', () => {
    for (const t of TRILHAS) {
      for (const m of t.modulos) {
        expect(m.consegue, `${m.id} sem meta`).toMatch(/^Você consegue/)
        expect(m.nome.trim()).not.toBe('')
        expect(m.emoji.trim()).not.toBe('')
      }
    }
  })

  it('numera os módulos em ordem, de um até o fim', () => {
    for (const t of TRILHAS) {
      t.modulos.forEach((m, i) => expect(m.numero, `${t.id}`).toBe(i + 1))
    }
  })

  it('empresta ao Inglês Geral os módulos que o curso já tem', () => {
    const geral = trilhaPorId('geral')!
    const niveis = toCourseIndex(EN_MODULES)
    const modulos = modulosDa(geral, niveis)
    expect(modulos.length).toBe(EN_MODULES.length)
    expect(modulos[0].id).toBe(EN_MODULES[0].id)
  })

  it('só abre o módulo que tem lição escrita', () => {
    const viagem = trilhaPorId('viagem')!
    // Enquanto as lições não existem, o cartão não leva a uma tela vazia.
    expect(caminhoDoModulo('abc', viagem, viagem.modulos[0])).toBeNull()

    const geral = trilhaPorId('geral')!
    const niveis = toCourseIndex(EN_MODULES)
    const primeiro = modulosDa(geral, niveis)[0]
    expect(caminhoDoModulo('abc', geral, primeiro)).toBe('/learn/abc/module/a1')
  })

  it('mantém de pé as duas que ainda não existem, marcadas como tal', () => {
    const emBreve = TRILHAS.filter(t => !t.disponivel)
    expect(emBreve.map(t => t.id)).toEqual(['online', 'vender'])
    for (const t of emBreve) expect(t.modulos).toHaveLength(0)
  })

  it('promete em uma linha, não em um parágrafo', () => {
    for (const t of TRILHAS) {
      expect(t.promessa.length, t.id).toBeLessThan(90)
      expect(t.promessa.length, t.id).toBeGreaterThan(20)
    }
  })
})
