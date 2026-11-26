import { describe, expect, it } from 'vitest'
import {
  LIMITE_PERGUNTA, MINIMO_PERGUNTA,
  estadoDaDuvida, limparPergunta, perguntaPublica, podePublicar, recadoDoProblema,
} from '@/lib/duvidas'

describe('limpar a pergunta', () => {
  it('junta o espaço que vem de texto colado', () => {
    const r = limparPergunta('  Como    se diz\n\n"obrigado"\tna Irlanda?  ')
    expect(r.ok && r.texto).toBe('Como se diz "obrigado" na Irlanda?')
  })

  it('recusa texto vazio e o que não é texto', () => {
    for (const ruim of ['', '   ', null, undefined, 42, {}]) {
      const r = limparPergunta(ruim)
      expect(r.ok, String(ruim)).toBe(false)
    }
  })

  it('recusa o teste de teclado', () => {
    const r = limparPergunta('asd')
    expect(r.ok).toBe(false)
    expect(!r.ok && r.erro).toBe('curta')
  })

  it('corta no limite em vez de recusar', () => {
    // Recusar apagaria o que a pessoa acabou de escrever.
    const r = limparPergunta('a'.repeat(LIMITE_PERGUNTA + 500))
    expect(r.ok && r.texto.length).toBe(LIMITE_PERGUNTA)
  })

  it('explica o problema em português, sem jargão', () => {
    expect(recadoDoProblema('curta')).toContain(String(MINIMO_PERGUNTA))
    expect(recadoDoProblema('vazia')).toMatch(/Escreva/)
  })
})

describe('o que pode ir ao ar', () => {
  it('não publica pergunta sem resposta', () => {
    // Deixaria no site uma dúvida em aberto assinada pelo produto: a prova
    // contrária da que a página quer dar.
    expect(podePublicar({ answer: null })).toBe(false)
    expect(podePublicar({ answer: '   ' })).toBe(false)
    expect(podePublicar({ answer: 'Dá sim, e funciona assim…' })).toBe(true)
  })

  it('publica a versão revisada quando ela existe', () => {
    const d = { text: 'Moro na Rua X, 123 e queria saber...', publishedText: 'Queria saber...' }
    expect(perguntaPublica(d)).toBe('Queria saber...')
  })

  it('cai no original quando não há versão revisada', () => {
    expect(perguntaPublica({ text: 'A dúvida', publishedText: null })).toBe('A dúvida')
    expect(perguntaPublica({ text: 'A dúvida', publishedText: '   ' })).toBe('A dúvida')
  })
})

describe('o estado da dúvida', () => {
  it('diz onde ela está, para a tela não prometer o que não houve', () => {
    expect(estadoDaDuvida({ answer: null, published: false })).toBe('esperando')
    expect(estadoDaDuvida({ answer: 'resposta', published: false })).toBe('respondida')
    expect(estadoDaDuvida({ answer: 'resposta', published: true })).toBe('publicada')
    // Publicada sem resposta não existe; se o banco trouxer isso, é "esperando".
    expect(estadoDaDuvida({ answer: null, published: true })).toBe('esperando')
  })
})
