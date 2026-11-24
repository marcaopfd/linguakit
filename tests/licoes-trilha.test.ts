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

describe('a Trilha Viagem, inteira', () => {
  const viagem = TRILHAS.find(t => t.id === 'viagem')!

  it('tem os oito módulos escritos, nenhum vazio', () => {
    expect(viagem.modulos).toHaveLength(8)
    for (const m of viagem.modulos) {
      expect(m.licoes.length, `${m.id} sem lição`).toBeGreaterThanOrEqual(2)
    }
  })

  it('dá a cada módulo pelo menos vinte minutos de aula', () => {
    for (const m of viagem.modulos) {
      const minutos = m.licoes.reduce((n, l) => n + l.minutos, 0)
      expect(minutos, m.id).toBeGreaterThanOrEqual(20)
    }
  })

  it('põe uma simulação nos módulos em que há alguém do outro lado', () => {
    // Táxi, hotel, restaurante e barganha: quatro conversas em que a outra
    // pessoa quer algo diferente do que o aluno quer.
    const comSimulacao = viagem.modulos.filter(m =>
      m.licoes.some(l => l.blocos.some(b => b.tipo === 'simulacao')))
    expect(comSimulacao.map(m => m.id).sort())
      .toEqual(['viagem-2', 'viagem-3', 'viagem-4', 'viagem-6'])
  })

  it('não repete a mesma frase em dois módulos', () => {
    // Uma frase repetida é uma lição a menos: o aluno já sabe aquilo.
    const vistas = new Map<string, string>()
    for (const m of viagem.modulos) {
      for (const l of m.licoes) {
        for (const b of l.blocos) {
          if (b.tipo !== 'frases') continue
          for (const f of b.frases) {
            const chave = f.en.toLowerCase().replace(/[^a-z ]/g, '').trim()
            const antes = vistas.get(chave)
            // "Keep the change" cabe no táxi e na conta do restaurante.
            if (antes && antes !== m.id) {
              expect(['keep the change'], `"${f.en}" repete em ${antes} e ${m.id}`).toContain(chave)
            }
            vistas.set(chave, m.id)
          }
        }
      }
    }
  })
})

describe('todas as simulações', () => {
  it('nunca dá três estrelas a quem joga mal', () => {
    // A folga da terceira estrela era fixa em 20, maior do que a negociação
    // inteira do restaurante: jogando mal, três estrelas.
    for (const sim of SIMULACOES) {
      const pior = sim.turnos.map(t => Math.min(...t.opcoes.map(o => o.corta)))
      expect(estrelas(sim, precoApos(sim, pior)), sim.id).toBe(1)
    }
  })

  it('dá três estrelas a quem joga tudo certo', () => {
    for (const sim of SIMULACOES) {
      const melhor = sim.turnos.map(t => Math.max(...t.opcoes.map(o => o.corta)))
      expect(estrelas(sim, precoApos(sim, melhor)), sim.id).toBe(3)
    }
  })

  it('deixa a meta alcançável e o mínimo abaixo dela', () => {
    for (const sim of SIMULACOES) {
      expect(sim.precoMinimo, sim.id).toBeLessThanOrEqual(sim.meta)
      expect(sim.meta, sim.id).toBeLessThan(sim.precoInicial)
      const melhor = sim.turnos.map(t => Math.max(...t.opcoes.map(o => o.corta)))
      expect(precoApos(sim, melhor), sim.id).toBeLessThanOrEqual(sim.meta)
    }
  })

  it('tem personagem, papel e missão em português', () => {
    for (const sim of SIMULACOES) {
      expect(sim.personagem.trim(), sim.id).not.toBe('')
      expect(sim.papel.trim(), sim.id).not.toBe('')
      expect(sim.missao.length, sim.id).toBeGreaterThan(30)
    }
  })
})
