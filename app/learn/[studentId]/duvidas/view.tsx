'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Icon } from '@/components/Icon'
import { LIMITE_PERGUNTA, MINIMO_PERGUNTA } from '@/lib/duvidas'

export type DuvidaNaTela = {
  id: string
  texto: string
  resposta: string | null
  publicada: boolean
  criadaEm: string
  respondidaEm: string | null
}

/**
 * Mandar uma dúvida e ler a resposta.
 *
 * Duas promessas que a tela precisa cumprir ao pé da letra:
 *
 *   1. não existe resposta automática. A tela diz que quem responde é uma
 *      pessoa, e por isso demora — prometer "resposta na hora" seria mentira,
 *      e a honestidade aqui é o produto.
 *   2. nada vira página pública sem decisão humana, e nunca com o nome de
 *      quem perguntou. Isso está escrito ao lado do botão, não escondido numa
 *      política.
 */
export function MinhasDuvidas({ studentId, nome, iniciais }: {
  studentId: string
  nome: string
  iniciais: DuvidaNaTela[]
}) {
  const [duvidas, setDuvidas] = useState(iniciais)
  const [texto, setTexto] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)
  const [enviada, setEnviada] = useState(false)

  const curta = texto.trim().length > 0 && texto.trim().length < MINIMO_PERGUNTA

  async function enviar() {
    setEnviando(true)
    setErro(null)
    try {
      const res = await fetch('/api/duvidas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, texto }),
      })
      const dados = await res.json()
      if (!res.ok) throw new Error(dados.error ?? 'Não foi possível enviar.')

      setDuvidas([
        {
          id: dados.id,
          texto: texto.replace(/\s+/g, ' ').trim(),
          resposta: null,
          publicada: false,
          criadaEm: new Date().toISOString(),
          respondidaEm: null,
        },
        ...duvidas,
      ])
      setTexto('')
      setEnviada(true)
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Não foi possível enviar.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', paddingBottom: '3rem' }}>
      <header style={{ background: 'var(--panel)', color: 'var(--on-panel)', padding: '1.25rem 1.25rem 1.75rem' }}>
        <Link
          href={`/learn/${studentId}`}
          style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, fontSize: 13, color: 'rgba(242,244,233,.55)', textDecoration: 'none' }}
        >
          ← Voltar para o curso
        </Link>
        <h1 style={{ fontFamily: 'var(--font-display), Bricolage Grotesque, sans-serif', fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em', marginTop: '.3rem' }}>
          Minhas dúvidas
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(242,244,233,.72)', lineHeight: 1.55, marginTop: '.5rem', maxWidth: '42ch' }}>
          Pergunte o que travou, {nome.split(' ')[0]}. Quem responde sou eu, na
          mão — então não é na hora, mas é de verdade.
        </p>
      </header>

      <main style={{ maxWidth: 620, margin: '0 auto', padding: '1.25rem 1rem 0' }}>
        <section
          style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 16, padding: '1.1rem',
          }}
        >
          <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>
            Qual é a sua dúvida?
            <textarea
              value={texto}
              onChange={e => { setTexto(e.target.value); setEnviada(false); setErro(null) }}
              rows={4}
              maxLength={LIMITE_PERGUNTA}
              placeholder="Ex.: na lição do aeroporto aparece &ldquo;I'm here on holiday&rdquo;. Nos Estados Unidos eu falo isso também?"
              style={{
                display: 'block', width: '100%', marginTop: '.5rem',
                background: 'var(--paper)', border: '1px solid var(--border)',
                borderRadius: 12, padding: '.7rem .8rem',
                fontFamily: 'inherit', fontSize: 14.5, color: 'var(--ink)',
                lineHeight: 1.55, resize: 'vertical',
              }}
            />
          </label>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '.75rem', marginTop: '.7rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 11.5, color: 'var(--ink3)' }}>
              {texto.length}/{LIMITE_PERGUNTA}
            </span>
            <button
              type="button"
              onClick={enviar}
              disabled={enviando || curta || !texto.trim()}
              style={{
                minHeight: 46, padding: '.6rem 1.3rem', borderRadius: 999, border: 'none',
                background: enviando || curta || !texto.trim() ? 'var(--border)' : 'var(--accent)',
                color: enviando || curta || !texto.trim() ? 'var(--ink3)' : 'var(--on-accent)',
                fontSize: 14.5, fontWeight: 700, fontFamily: 'inherit',
                cursor: enviando || curta || !texto.trim() ? 'default' : 'pointer',
              }}
            >
              {enviando ? 'Enviando…' : 'Mandar a dúvida'}
            </button>
          </div>

          {curta && (
            <p style={{ fontSize: 12.5, color: 'var(--ink3)', marginTop: '.5rem' }}>
              Escreva um pouco mais, para dar para entender a dúvida.
            </p>
          )}
          {erro && (
            <p style={{ fontSize: 13, color: 'var(--red)', marginTop: '.5rem' }}>{erro}</p>
          )}
          {enviada && (
            <p style={{ fontSize: 13, color: 'var(--ink2)', marginTop: '.5rem' }}>
              Recebida. A resposta aparece aqui nesta página.
            </p>
          )}

          <p style={{ fontSize: 11.5, color: 'var(--ink3)', lineHeight: 1.55, marginTop: '.9rem' }}>
            Se a sua dúvida servir para mais gente, ela pode ir para a página{' '}
            <Link href="/duvidas" style={{ color: 'var(--ink2)' }}>Dúvidas respondidas</Link>,{' '}
            <strong style={{ color: 'var(--ink2)' }}>sem o seu nome</strong> e com a
            pergunta revisada se ela trouxer algum dado seu. Isso é decisão
            minha, nunca automática — e é só pedir que eu tiro.
          </p>
        </section>

        <h2 style={{ fontSize: 15.5, fontWeight: 700, color: 'var(--ink)', marginTop: '1.8rem' }}>
          {duvidas.length === 0 ? 'Você ainda não mandou nenhuma' : 'O que você já perguntou'}
        </h2>

        {duvidas.length === 0 ? (
          <p style={{ fontSize: 13.5, color: 'var(--ink3)', lineHeight: 1.6, marginTop: '.4rem' }}>
            Quando mandar, fica tudo aqui — pergunta e resposta, lado a lado.
          </p>
        ) : (
          <div style={{ display: 'grid', gap: '.75rem', marginTop: '.75rem' }}>
            {duvidas.map(d => (
              <article
                key={d.id}
                style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: 14, padding: '.95rem 1rem',
                }}
              >
                <p style={{ fontSize: 14, color: 'var(--ink)', lineHeight: 1.55, fontWeight: 600 }}>
                  {d.texto}
                </p>

                {d.resposta ? (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem', marginTop: '.8rem', color: 'var(--ink3)' }}>
                      <Icon name="check" size={14} />
                      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase' }}>
                        Respondida
                      </span>
                    </div>
                    {d.resposta.split('\n').filter(Boolean).map((p, i) => (
                      <p key={i} style={{ fontSize: 13.5, color: 'var(--ink2)', lineHeight: 1.65, marginTop: '.4rem' }}>
                        {p}
                      </p>
                    ))}
                    {d.publicada && (
                      <p style={{ fontSize: 11.5, color: 'var(--ink3)', marginTop: '.6rem' }}>
                        Esta também está em{' '}
                        <Link href="/duvidas" style={{ color: 'var(--ink2)' }}>Dúvidas respondidas</Link>, sem o seu nome.
                      </p>
                    )}
                  </>
                ) : (
                  <p style={{ fontSize: 12.5, color: 'var(--ink3)', marginTop: '.6rem' }}>
                    Esperando resposta. Enviada em{' '}
                    {new Date(d.criadaEm).toLocaleDateString('pt-BR')}.
                  </p>
                )}
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
