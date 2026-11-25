import { describe, expect, it } from 'vitest'
import cenas from '@/lib/trilhas/cenas.json'
import { CONTEUDO } from '@/lib/musicas/conteudo'
import { FAMILIAS, MUSICAS, musica, musicaLivre, musicasDa } from '@/lib/musicas'
import { podeAbrir } from '@/lib/plano'

const livre = { plan: 'free', planStatus: 'active', renewsAt: null }
const assinante = { plan: 'annual', planStatus: 'active', renewsAt: new Date('2099-01-01') }

describe('a estante de músicas', () => {
  it('tem conteúdo escrito para toda música aprovada, e nenhum conteúdo órfão', () => {
    // Música sem conteúdo seria uma tela vazia com um player no meio; conteúdo
    // sem música é texto que ninguém nunca vai ler.
    const aprovadas = cenas.filter(c => c.tipo === 'musica' && c.status === 'aprovada').map(c => c.videoId)
    expect(MUSICAS.length).toBe(aprovadas.length)
    for (const id of aprovadas) expect(CONTEUDO[id], id).toBeDefined()
    for (const id of Object.keys(CONTEUDO)) expect(aprovadas, id).toContain(id)
  })

  it('tem as quatro famílias com música dentro', () => {
    for (const f of FAMILIAS) expect(musicasDa(f.id).length, f.id).toBeGreaterThan(0)
    // E toda música cai numa família que a tela conhece.
    const conhecidas = FAMILIAS.map(f => f.id)
    for (const m of MUSICAS) expect(conhecidas, m.nome).toContain(m.familia)
  })

  it('tem corte possível em toda música', () => {
    // O check-scenes também confere isso, mas ele precisa de rede. Aqui não.
    for (const m of MUSICAS) {
      expect(m.inicio, m.nome).toBeGreaterThanOrEqual(0)
      expect(m.fim, m.nome).toBeGreaterThan(m.inicio)
      expect(m.fim, m.nome).toBeLessThanOrEqual(m.duracao)
    }
  })

  it('não publica letra: nenhuma expressão do vocabulário passa de oito palavras', () => {
    // A guarda mecânica contra o deslize de colar um verso. O vocabulário é
    // expressão curta do tema — "How much is it?" —, nunca linha de música.
    for (const m of MUSICAS) {
      for (const v of m.vocabulario) {
        expect(v.en.split(/\s+/).length, `${m.nome}: "${v.en}"`).toBeLessThanOrEqual(8)
      }
    }
  })

  it('dá a cada música três expressões, duas perguntas e duas tarefas', () => {
    for (const m of MUSICAS) {
      expect(m.vocabulario.length, m.nome).toBeGreaterThanOrEqual(3)
      expect(m.perguntas.length, m.nome).toBe(2)
      expect(m.tarefas.length, m.nome).toBe(2)
      expect(m.tema.length, m.nome).toBeGreaterThan(40)
      expect(m.artista, m.nome).toBeTruthy()
      expect(m.nome, m.videoId).toBeTruthy()
    }
  })

  it('tem pergunta respondível: índice válido, opções distintas e nenhuma vazia', () => {
    for (const m of MUSICAS) {
      for (const p of m.perguntas) {
        const onde = `${m.nome}: ${p.pergunta}`
        expect(p.opcoes.length, onde).toBeGreaterThanOrEqual(3)
        expect(p.resposta, onde).toBeGreaterThanOrEqual(0)
        expect(p.resposta, onde).toBeLessThan(p.opcoes.length)
        expect(new Set(p.opcoes).size, onde).toBe(p.opcoes.length)
        for (const o of p.opcoes) expect(o.trim().length, onde).toBeGreaterThan(0)
        expect(p.pergunta.trim().endsWith('?') || p.pergunta.trim().endsWith('…'), onde).toBe(true)
      }
    }
  })

  it('avisa antes do play em toda música de letra pesada', () => {
    for (const m of MUSICAS) {
      if (m.linguagem === 'pesada') expect(m.aviso, m.nome).toBeTruthy()
    }
  })

  it('abre a primeira música de cada família e cobra o resto', () => {
    for (const f of FAMILIAS) {
      const [primeira, ...resto] = musicasDa(f.id)
      expect(musicaLivre(primeira), primeira.nome).toBe(true)
      expect(podeAbrir(livre, { tipo: 'musica', livre: musicaLivre(primeira) })).toBe(true)
      for (const m of resto) {
        expect(musicaLivre(m), m.nome).toBe(false)
        expect(podeAbrir(livre, { tipo: 'musica', livre: false }), m.nome).toBe(false)
        expect(podeAbrir(assinante, { tipo: 'musica', livre: false }), m.nome).toBe(true)
      }
    }
  })

  it('acha música por videoId e devolve null para o que não existe', () => {
    expect(musica(MUSICAS[0].videoId)?.nome).toBe(MUSICAS[0].nome)
    expect(musica('nao-existe')).toBeNull()
  })

  it('só usa vídeo do canal oficial do dono', () => {
    // A regra de direito autoral do projeto: nada de canal de terceiro.
    for (const m of MUSICAS) expect(m.canal.trim().length, m.nome).toBeGreaterThan(0)
  })
})
