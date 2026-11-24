import { describe, expect, it } from 'vitest'
import { TRILHAS } from '@/lib/trilhas'
import { SIMULACOES, estrelas, precoApos, simulacaoPorId } from '@/lib/trilhas/simulacoes'

const licoes = TRILHAS.flatMap(t => t.modulos.flatMap(m => m.licoes.map(l => ({ trilha: t.id, modulo: m.id, licao: l }))))

describe('as lições escritas', () => {
  it('tem pelo menos o módulo de barganha pronto', () => {
    expect(licoes.length).toBeGreaterThanOrEqual(3)
  })

  it('abre pela situação e fecha pelo resumo', () => {
    // A ordem é a mesma em toda lição porque a pessoa estuda quinze minutos
    // no ônibus e não deve ter de descobrir onde está cada vez que abre.
    for (const { licao } of licoes) {
      expect(licao.blocos[0]?.tipo, licao.id).toBe('situacao')
      expect(licao.blocos[licao.blocos.length - 1]?.tipo, licao.id).toBe('resumo')
    }
  })

  it('diz em cada lição o que o aluno vai conseguir', () => {
    for (const { licao } of licoes) {
      expect(licao.consegue, licao.id).toMatch(/^Você consegue/)
      expect(licao.minutos).toBeGreaterThan(5)
      expect(licao.minutos).toBeLessThanOrEqual(20)
    }
  })

  it('ensina de seis a dez frases por lição, com tradução', () => {
    for (const { licao } of licoes) {
      const bloco = licao.blocos.find(b => b.tipo === 'frases')
      expect(bloco, licao.id).toBeTruthy()
      if (bloco?.tipo !== 'frases') return
      expect(bloco.frases.length, licao.id).toBeGreaterThanOrEqual(6)
      expect(bloco.frases.length, licao.id).toBeLessThanOrEqual(10)
      for (const f of bloco.frases) {
        expect(f.en.trim(), licao.id).not.toBe('')
        expect(f.pt.trim(), licao.id).not.toBe('')
      }
    }
  })

  it('avisa das armadilhas que o brasileiro cai', () => {
    const todas = licoes.flatMap(({ licao }) =>
      licao.blocos.flatMap(b => (b.tipo === 'frases' ? b.frases : [])))
    const comArmadilha = todas.filter(f => f.armadilha)
    expect(comArmadilha.length).toBeGreaterThanOrEqual(5)
  })

  it('não repete a chave de nenhum exercício dentro do módulo', () => {
    for (const t of TRILHAS) {
      for (const m of t.modulos) {
        const chaves = m.licoes.flatMap(l =>
          l.blocos.flatMap(b => (b.tipo === 'pratica' ? b.itens.map(i => i.key) : [])))
        expect(new Set(chaves).size, m.id).toBe(chaves.length)
      }
    }
  })

  it('dá a cada exercício uma resposta e um jeito de responder', () => {
    for (const { licao } of licoes) {
      for (const b of licao.blocos) {
        if (b.tipo !== 'pratica') continue
        for (const item of b.itens) {
          expect(item.expected.trim(), item.key).not.toBe('')
          if (item.options) {
            expect(item.answerIndex, item.key).toBeGreaterThanOrEqual(0)
            expect(item.answerIndex!, item.key).toBeLessThan(item.options.length)
            expect(item.options[item.answerIndex!], item.key).toBe(item.expected)
          } else {
            expect(['order', 'pares'].includes(item.kind ?? '') || item.compare === 'loose', item.key).toBe(true)
          }
        }
      }
    }
  })

  it('aponta cada simulação para uma que existe', () => {
    for (const { licao } of licoes) {
      for (const b of licao.blocos) {
        if (b.tipo === 'simulacao') expect(simulacaoPorId(b.simulacaoId), b.simulacaoId).toBeTruthy()
      }
    }
  })
})

describe('a simulação da barganha', () => {
  const sim = SIMULACOES[0]

  it('nunca vende abaixo do preço mínimo do vendedor', () => {
    // Jogando perfeito em todos os turnos, o preço para no mínimo e não passa.
    const melhores = sim.turnos.map(t => Math.max(...t.opcoes.map(o => o.corta)))
    expect(precoApos(sim, melhores)).toBe(sim.precoMinimo)

    // E com cortes absurdos também não.
    expect(precoApos(sim, [9999])).toBe(sim.precoMinimo)
  })

  it('deixa a meta ao alcance de quem joga bem, e fora de quem não joga', () => {
    const melhores = sim.turnos.map(t => Math.max(...t.opcoes.map(o => o.corta)))
    const piores = sim.turnos.map(t => Math.min(...t.opcoes.map(o => o.corta)))
    expect(precoApos(sim, melhores)).toBeLessThanOrEqual(sim.meta)
    expect(precoApos(sim, piores)).toBeGreaterThan(sim.meta)
  })

  it('dá três estrelas só a quem chega no fundo', () => {
    expect(estrelas(sim, sim.precoMinimo)).toBe(3)
    expect(estrelas(sim, sim.meta)).toBe(2)
    expect(estrelas(sim, sim.precoInicial)).toBe(1)
  })

  it('oferece três saídas por turno, e todas têm resposta', () => {
    for (const turno of sim.turnos) {
      expect(turno.opcoes.length).toBe(3)
      for (const o of turno.opcoes) {
        expect(o.resposta.trim(), o.en).not.toBe('')
        expect(o.respostaPt.trim(), o.en).not.toBe('')
        expect(o.pt.trim(), o.en).not.toBe('')
      }
    }
  })

  it('mostra o jeito melhor de dizer toda frase que não funcionou', () => {
    // Uma escolha que não corta nada e não fecha o negócio foi uma frase
    // fraca: a tela do fim precisa ter o que pôr no lugar dela.
    for (const turno of sim.turnos) {
      for (const o of turno.opcoes) {
        if (o.corta === 0 && !o.fecha && !o.saiEmbora) {
          expect(o.melhor, o.en).toBeTruthy()
        }
      }
    }
  })

  it('premia quem vai embora: ele chama de volta com o melhor preço', () => {
    const saida = sim.turnos.flatMap(t => t.opcoes).find(o => o.saiEmbora)
    expect(saida).toBeTruthy()
    expect(saida!.estrategia).toMatch(/embora/i)
  })
})
