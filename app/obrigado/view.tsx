'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Icon } from '@/components/Icon'
import { Rabisco } from '@/components/Rabisco'

/**
 * Três estados, e nenhum deles mente:
 *
 * - liberado: o plano já está valendo. É o caso comum.
 * - esperando: a compra foi feita mas o aviso ainda não chegou. A tela diz
 *   isso e deixa conferir de novo, em vez de fingir que deu errado.
 * - sem-sessao: não dá para saber quem é. Pede para entrar, e o plano cai
 *   na conta assim que ela abrir.
 */
export function DeVolta({ estado, studentId }: {
  estado: 'liberado' | 'esperando' | 'sem-sessao'
  studentId?: string
}) {
  const router = useRouter()
  const [conferindo, setConferindo] = useState(false)
  const [semSorte, setSemSorte] = useState(false)

  async function conferir() {
    if (!studentId || conferindo) return
    setConferindo(true)
    setSemSorte(false)
    try {
      const res = await fetch('/api/student/pagamento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId }),
      })
      const dados = await res.json()
      if (dados.encontrado) router.refresh()
      else setSemSorte(true)
    } catch {
      setSemSorte(true)
    }
    setConferindo(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <header style={{ position: 'relative', overflow: 'hidden', background: 'var(--panel)', color: 'var(--on-panel)', padding: '2rem 1.5rem 2.25rem' }}>
        {/* Atrás do texto e fora do caminho dele: num celular estreito o
            título ocupa a largura toda, e o rabisco cruzava por cima. */}
        <div style={{ position: 'absolute', top: -6, right: -62, opacity: .5, zIndex: 0 }} aria-hidden>
          <Rabisco largura={150} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 480, margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'var(--font-display), Bricolage Grotesque, sans-serif', fontSize: 27, fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em' }}>
            {estado === 'liberado' ? 'Pronto. Está tudo seu.' : 'Compra recebida'}
          </h1>
          <p style={{ fontSize: 14.5, color: 'rgba(242,244,233,.7)', lineHeight: 1.55, marginTop: '.5rem' }}>
            {estado === 'liberado' && 'As trilhas, as conversas, o kit de bolso e as quarenta músicas já estão abertos na sua conta.'}
            {estado === 'esperando' && 'O pagamento foi feito. O aviso da Kiwify chega em instantes — às vezes um minuto, quando é Pix.'}
            {estado === 'sem-sessao' && 'Falta uma coisa: entrar na sua conta, para a gente saber onde pôr o plano.'}
          </p>
        </div>
      </header>

      <main style={{ maxWidth: 480, margin: '0 auto', padding: '1.5rem 1.25rem 3rem' }}>
        {estado === 'liberado' && studentId && (
          <Link href={`/learn/${studentId}`} style={botao(true)}>
            Começar agora →
          </Link>
        )}

        {estado === 'esperando' && (
          <>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>
                <Icon name="clock" size={16} /> Confirmando o pagamento
              </div>
              <p style={{ fontSize: 13, color: 'var(--ink3)', lineHeight: 1.55, marginTop: '.35rem' }}>
                Você não precisa ficar aqui esperando: o plano entra sozinho na
                sua conta assim que o aviso chegar. Se quiser conferir agora,
                é só tocar abaixo.
              </p>
            </div>

            <button type="button" onClick={conferir} disabled={conferindo} style={botao(!conferindo)}>
              {conferindo ? 'Conferindo…' : 'Conferir agora'}
            </button>

            {semSorte && (
              <p style={{ fontSize: 12.5, color: 'var(--ink2)', lineHeight: 1.55, marginTop: '.6rem' }}>
                Ainda não chegou. Pix e cartão costumam levar segundos; boleto
                leva até alguns dias úteis. Pode seguir estudando — e, se
                demorar mais que isso, use o <strong>&ldquo;já paguei e não
                liberou&rdquo;</strong> em Minha conta.
              </p>
            )}

            {studentId && (
              <Link href={`/learn/${studentId}`} style={botaoFraco()}>
                Ir para o curso
              </Link>
            )}
          </>
        )}

        {estado === 'sem-sessao' && (
          <>
            <Link href="/entrar" style={botao(true)}>
              Entrar na minha conta →
            </Link>
            <p style={{ fontSize: 12.5, color: 'var(--ink3)', lineHeight: 1.55, marginTop: '.8rem', textAlign: 'center' }}>
              Use o mesmo e-mail da compra. Se você ainda não tem conta,{' '}
              <Link href="/cadastro" style={{ color: 'var(--ink)', fontWeight: 600 }}>crie uma agora</Link>
              {' '}com esse e-mail: o plano cai nela sozinho.
            </p>
          </>
        )}
      </main>
    </div>
  )
}

function botao(ativo: boolean): React.CSSProperties {
  return {
    width: '100%', minHeight: 52, marginTop: '1rem',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    borderRadius: 999, border: 'none', textDecoration: 'none',
    background: ativo ? 'var(--accent)' : 'var(--border)',
    color: ativo ? 'var(--on-accent)' : 'var(--ink3)',
    fontSize: 15.5, fontWeight: 700, fontFamily: 'inherit',
    cursor: ativo ? 'pointer' : 'default',
  }
}

function botaoFraco(): React.CSSProperties {
  return {
    width: '100%', minHeight: 48, marginTop: '.6rem',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    borderRadius: 999, background: 'var(--surface)', textDecoration: 'none',
    border: '1px solid var(--border)', color: 'var(--ink2)',
    fontSize: 14.5, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer',
  }
}
