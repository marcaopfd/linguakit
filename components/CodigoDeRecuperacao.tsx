'use client'

import { useState } from 'react'
import { Icon } from './Icon'

/**
 * O código de recuperação, mostrado a única vez em que ele existe em claro.
 *
 * O que esta tela precisa conseguir: que a pessoa realmente guarde. Por isso
 * o código é grande, dá para copiar num toque, e o aviso diz o que acontece
 * se ela não guardar — em vez de um "anote em local seguro" que ninguém lê.
 *
 * Não existe botão de "ver de novo": o servidor não tem o código, só o hash.
 * Quem perder gera outro, o que invalida este.
 */
export function CodigoDeRecuperacao({ codigo, emPortugues = true }: {
  codigo: string
  emPortugues?: boolean
}) {
  const [copiado, setCopiado] = useState(false)

  async function copiar() {
    try {
      await navigator.clipboard.writeText(codigo)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2500)
    } catch {
      window.prompt(emPortugues ? 'Copie o seu código:' : 'Copy your code:', codigo)
    }
  }

  return (
    <div style={{ background: 'var(--gold-light)', border: '1px solid #e8d48a', borderRadius: 14, padding: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: 13.5, fontWeight: 700, color: 'var(--note-ink)' }}>
        <Icon name="key" size={15} />
        {emPortugues ? 'Guarde este código' : 'Save this code'}
      </div>
      <p style={{ fontSize: 12.5, color: 'var(--note-ink)', lineHeight: 1.55, marginTop: '.3rem' }}>
        {emPortugues
          ? 'É com ele que você volta para a sua conta se esquecer a senha. Ele aparece só agora: depois desta tela, ninguém — nem nós — consegue mostrar este código de novo.'
          : 'This is how you get back in if you forget your password. It is shown only now: after this screen, nobody — not even us — can show it again.'}
      </p>

      <div
        translate="no"
        style={{
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          // Acompanha a largura: num cartão estreito, 20px partia o código em
          // duas linhas, e um código quebrado ao meio é um código copiado
          // errado.
          fontSize: 'clamp(14px, 4.4vw, 20px)', fontWeight: 700, letterSpacing: '.04em',
          color: 'var(--ink)', background: 'var(--surface)',
          border: '1px solid #e8d48a', borderRadius: 10,
          padding: '.7rem .8rem', marginTop: '.7rem',
          textAlign: 'center', whiteSpace: 'nowrap', userSelect: 'all',
        }}
      >
        {codigo}
      </div>

      <button
        type="button"
        onClick={copiar}
        style={{
          width: '100%', minHeight: 44, marginTop: '.55rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.4rem',
          borderRadius: 999, border: '1px solid #e8d48a', background: 'var(--surface)',
          color: 'var(--ink2)', fontSize: 13.5, fontWeight: 600,
          fontFamily: 'inherit', cursor: 'pointer',
        }}
      >
        {copiado ? '✓' : <Icon name="copy" size={15} />}
        {copiado
          ? (emPortugues ? 'Copiado' : 'Copied')
          : (emPortugues ? 'Copiar código' : 'Copy code')}
      </button>
    </div>
  )
}
