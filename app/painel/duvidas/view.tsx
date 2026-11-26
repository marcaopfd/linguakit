'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LIMITE_RESPOSTA } from '@/lib/duvidas'

export type DuvidaDoPainel = {
  id: string
  texto: string
  contexto: string | null
  perguntaRevisada: string | null
  resposta: string | null
  publicada: boolean
  criadaEm: string
  respondidaEm: string | null
  aluno: string
  email: string | null
}

/**
 * Responder, revisar e publicar.
 *
 * Três coisas que esta tela faz de propósito:
 *
 *   - Publicar é um passo SEPARADO de responder. Responder é conversa com uma
 *     pessoa; publicar é pôr texto no site. Juntar os dois num botão só faria
 *     toda resposta virar página, inclusive as que não deveriam.
 *   - O campo "pergunta revisada" vem ao lado da original, porque dúvida real
 *     traz nome de rua e nome de empresa, e o original não pode ir ao ar sem
 *     alguém reler.
 *   - O nome e o e-mail do aluno aparecem AQUI e só aqui. A página pública
 *     não os recebe nem por engano: a consulta dela não os seleciona.
 */
export function ResponderDuvidas({ duvidas }: { duvidas: DuvidaDoPainel[] }) {
  const [lista, setLista] = useState(duvidas)
  const esperando = lista.filter(d => !d.resposta)
  const prontas = lista.filter(d => d.resposta)

  function atualizar(id: string, mudanca: Partial<DuvidaDoPainel>) {
    setLista(l => l.map(d => (d.id === id ? { ...d, ...mudanca } : d)))
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', padding: '1.5rem 1.25rem 4rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <Link href="/painel" style={{ fontSize: 13, color: 'var(--ink3)', textDecoration: 'none' }}>
          ← Painel
        </Link>
        <h1 style={{ fontFamily: 'var(--font-display), Bricolage Grotesque, sans-serif', fontSize: 30, fontWeight: 800, letterSpacing: '-0.025em', marginTop: '.4rem' }}>
          Dúvidas
        </h1>
        <p style={{ fontSize: 14, color: 'var(--ink2)', lineHeight: 1.6, marginTop: '.4rem' }}>
          {esperando.length === 0
            ? 'Nenhuma esperando resposta.'
            : `${esperando.length} esperando resposta.`}
          {' '}O que você publicar aparece em{' '}
          <Link href="/duvidas" style={{ color: 'var(--ink2)' }}>/duvidas</Link>, sem o nome de quem perguntou.
        </p>

        {esperando.length > 0 && (
          <>
            <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ink3)', marginTop: '2rem' }}>
              Esperando você
            </h2>
            {esperando.map(d => <Cartao key={d.id} duvida={d} onMudar={atualizar} />)}
          </>
        )}

        {prontas.length > 0 && (
          <>
            <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ink3)', marginTop: '2.5rem' }}>
              Já respondidas
            </h2>
            {prontas.map(d => <Cartao key={d.id} duvida={d} onMudar={atualizar} />)}
          </>
        )}

        {lista.length === 0 && (
          <p style={{ fontSize: 14, color: 'var(--ink3)', marginTop: '2rem', lineHeight: 1.6 }}>
            Ninguém mandou dúvida ainda. Elas chegam de dentro do curso, em
            Minhas dúvidas.
          </p>
        )}
      </div>
    </div>
  )
}

function Cartao({ duvida, onMudar }: {
  duvida: DuvidaDoPainel
  onMudar: (id: string, mudanca: Partial<DuvidaDoPainel>) => void
}) {
  const [resposta, setResposta] = useState(duvida.resposta ?? '')
  const [revisada, setRevisada] = useState(duvida.perguntaRevisada ?? '')
  const [salvando, setSalvando] = useState(false)
  const [recado, setRecado] = useState<string | null>(null)

  async function mandar(corpo: Record<string, unknown>, aviso: string) {
    setSalvando(true)
    setRecado(null)
    try {
      const res = await fetch(`/api/duvidas/${duvida.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(corpo),
      })
      const dados = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(dados.error ?? 'Não deu para salvar.')
      setRecado(aviso)
    } catch (e) {
      setRecado(e instanceof Error ? e.message : 'Não deu para salvar.')
    } finally {
      setSalvando(false)
    }
  }

  async function apagar() {
    if (!confirm('Apagar esta dúvida? Não dá para desfazer.')) return
    setSalvando(true)
    try {
      const res = await fetch(`/api/duvidas/${duvida.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      onMudar(duvida.id, { resposta: null, publicada: false })
      setRecado('Apagada. Recarregue para sumir da lista.')
    } catch {
      setRecado('Não deu para apagar.')
    } finally {
      setSalvando(false)
    }
  }

  const campo = {
    display: 'block', width: '100%', marginTop: '.4rem',
    background: 'var(--paper)', border: '1px solid var(--border)',
    borderRadius: 10, padding: '.6rem .7rem',
    fontFamily: 'inherit', fontSize: 14, color: 'var(--ink)',
    lineHeight: 1.6, resize: 'vertical' as const,
  }

  return (
    <article
      style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 14, padding: '1.1rem', marginTop: '.75rem',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '.75rem', flexWrap: 'wrap', fontSize: 11.5, color: 'var(--ink3)' }}>
        <span>
          {duvida.aluno}{duvida.email ? ` · ${duvida.email}` : ' · sem conta de e-mail'}
          {duvida.contexto ? ` · ${duvida.contexto}` : ''}
        </span>
        <span>{new Date(duvida.criadaEm).toLocaleDateString('pt-BR')}</span>
      </div>

      <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.55, marginTop: '.5rem' }}>
        {duvida.texto}
      </p>

      <label style={{ display: 'block', fontSize: 12.5, color: 'var(--ink2)', marginTop: '1rem', fontWeight: 600 }}>
        Resposta
        <textarea
          value={resposta}
          onChange={e => setResposta(e.target.value)}
          rows={5}
          maxLength={LIMITE_RESPOSTA}
          placeholder="Escreva como você falaria com a pessoa. Linha em branco separa parágrafo."
          style={campo}
        />
      </label>

      <label style={{ display: 'block', fontSize: 12.5, color: 'var(--ink2)', marginTop: '.8rem', fontWeight: 600 }}>
        Pergunta revisada <span style={{ fontWeight: 400, color: 'var(--ink3)' }}>— opcional, é o que vai ao ar no lugar da original</span>
        <textarea
          value={revisada}
          onChange={e => setRevisada(e.target.value)}
          rows={2}
          placeholder={duvida.texto}
          style={campo}
        />
      </label>

      <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', marginTop: '.9rem', alignItems: 'center' }}>
        <button
          type="button"
          disabled={salvando}
          onClick={() => {
            onMudar(duvida.id, { resposta: resposta.trim() || null })
            void mandar({ resposta, perguntaRevisada: revisada }, 'Resposta salva. O aluno já vê.')
          }}
          style={botao('var(--panel)', 'var(--on-panel)')}
        >
          Salvar resposta
        </button>

        <button
          type="button"
          disabled={salvando || !resposta.trim()}
          onClick={() => {
            const novo = !duvida.publicada
            onMudar(duvida.id, { publicada: novo })
            void mandar(
              { resposta, perguntaRevisada: revisada, publicar: novo },
              novo ? 'No ar em /duvidas.' : 'Saiu do ar.',
            )
          }}
          style={botao(
            duvida.publicada ? 'var(--accent-soft)' : 'var(--accent)',
            duvida.publicada ? 'var(--ink)' : 'var(--on-accent)',
            salvando || !resposta.trim(),
          )}
        >
          {duvida.publicada ? 'Tirar do ar' : 'Publicar em /duvidas'}
        </button>

        <button
          type="button"
          disabled={salvando}
          onClick={apagar}
          style={{ ...botao('transparent', 'var(--ink3)'), border: '1px solid var(--border)' }}
        >
          Apagar
        </button>

        {duvida.publicada && (
          <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ink2)' }}>
            No ar
          </span>
        )}
      </div>

      {recado && (
        <p style={{ fontSize: 12.5, color: 'var(--ink2)', marginTop: '.6rem' }}>{recado}</p>
      )}
    </article>
  )
}

function botao(fundo: string, tinta: string, desligado = false) {
  return {
    minHeight: 42, padding: '.5rem 1rem', borderRadius: 999,
    border: 'none', cursor: desligado ? 'default' : 'pointer',
    background: desligado ? 'var(--border)' : fundo,
    color: desligado ? 'var(--ink3)' : tinta,
    fontSize: 13.5, fontWeight: 700, fontFamily: 'inherit',
  }
}
