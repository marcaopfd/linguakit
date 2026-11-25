'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Icon } from '@/components/Icon'
import { Rabisco } from '@/components/Rabisco'

/**
 * A tela de planos.
 *
 * O anual aparece em destaque porque é o que paga a hospedagem adiantada e o
 * que faz sentido para quem está estudando para uma mudança — mas o mensal
 * fica ao lado, sem letra miúda.
 *
 * O botão leva para fora. O pagamento acontece na Kiwify, que resolve Pix,
 * boleto e parcelado, e o app nunca vê dado de cartão. Enquanto os links não
 * estiverem configurados, a tela diz isso em vez de fingir um botão.
 */
export function TelaDePlanos({ studentId, nome, plano, estado, valendo, renovaEm, linkMensal, linkAnual }: {
  studentId: string
  nome: string
  plano: string
  estado: string
  valendo: boolean
  renovaEm: string | null
  linkMensal: string | null
  linkAnual: string | null
}) {
  const [escolhido, setEscolhido] = useState<'annual' | 'monthly'>('annual')
  const link = escolhido === 'annual' ? linkAnual : linkMensal

  if (valendo) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--cream)', padding: '2rem 1.25rem' }}>
        <div style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem', background: 'var(--accent)', color: 'var(--on-accent)', borderRadius: 999, padding: '.35rem .9rem', fontSize: 12, fontWeight: 700 }}>
            <Icon name="check" size={14} /> Plano ativo
          </div>
          <h1 style={{ fontFamily: 'var(--font-display), Bricolage Grotesque, sans-serif', fontSize: 24, fontWeight: 800, marginTop: '.8rem' }}>
            Está tudo aberto, {nome.split(' ')[0]}
          </h1>
          <p style={{ fontSize: 14, color: 'var(--ink3)', lineHeight: 1.55, marginTop: '.5rem' }}>
            Plano {plano === 'annual' ? 'anual' : 'mensal'}
            {renovaEm && ` · renova em ${new Date(renovaEm).toLocaleDateString('pt-BR')}`}.
          </p>
          <Link href={`/learn/${studentId}`} style={botao('var(--panel)', 'var(--on-panel)')}>
            Voltar para o curso
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <header style={{ background: 'var(--panel)', color: 'var(--on-panel)', padding: '1.4rem 1.25rem 2rem', position: 'relative', overflow: 'hidden' }}>
        <Link href={`/learn/${studentId}`} style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, fontSize: 13, color: 'rgba(242,244,233,.55)', textDecoration: 'none' }}>
          ← Voltar para o curso
        </Link>
        <div style={{ position: 'absolute', top: 18, right: -44, opacity: .75 }}><Rabisco largura={165} /></div>
        <div style={{ position: 'relative', maxWidth: 520, margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'var(--font-display), Bricolage Grotesque, sans-serif', fontSize: 27, fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.02em', marginTop: '.5rem' }}>
            Aprenda o inglês que você vai usar amanhã
          </h1>
          <p style={{ fontSize: 14.5, color: 'rgba(242,244,233,.7)', lineHeight: 1.55, marginTop: '.55rem' }}>
            {estado === 'paused'
              ? 'Sua assinatura está pausada. Retome e tudo volta de onde parou.'
              : 'O curso do A1 ao C2 continua de graça. O plano abre as trilhas de viagem e de mudança, as conversas, o kit de bolso e as quarenta músicas.'}
          </p>
        </div>
      </header>

      <main style={{ maxWidth: 520, margin: '0 auto', padding: '1.25rem 1.25rem 2.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '.65rem' }}>
          <Plano
            id="annual" escolhido={escolhido === 'annual'} onEscolher={setEscolhido}
            titulo="Anual" preco="R$ 149" por="por ano" nota="R$ 12,42 por mês — 37% mais barato" selo="Recomendado"
          />
          <Plano
            id="monthly" escolhido={escolhido === 'monthly'} onEscolher={setEscolhido}
            titulo="Mensal" preco="R$ 19,90" por="por mês" nota="Cancele ou pause quando quiser"
          />
        </div>

        {link ? (
          <a href={link} target="_blank" rel="noopener noreferrer" style={botao('var(--accent)', 'var(--on-accent)')}>
            Assinar o plano {escolhido === 'annual' ? 'anual' : 'mensal'} →
          </a>
        ) : (
          <div style={{ marginTop: '1.25rem', background: 'var(--note-bg)', border: '1px solid var(--note-border)', borderRadius: 14, padding: '.9rem 1rem', fontSize: 13, color: 'var(--note-ink)', lineHeight: 1.5 }}>
            O pagamento ainda não está aberto. Assim que a Kiwify estiver
            configurada, o botão aparece aqui.
          </div>
        )}

        <p style={{ fontSize: 12.5, color: 'var(--ink3)', textAlign: 'center', marginTop: '.9rem', lineHeight: 1.55 }}>
          Pagamento pela Kiwify — Pix, boleto ou cartão parcelado.<br />
          Dá para pausar a assinatura por até três meses sem perder nada.
        </p>
      </main>
    </div>
  )
}

function Plano({ id, titulo, preco, por, nota, selo, escolhido, onEscolher }: {
  id: 'annual' | 'monthly'
  titulo: string
  preco: string
  por: string
  nota: string
  selo?: string
  escolhido: boolean
  onEscolher: (id: 'annual' | 'monthly') => void
}) {
  return (
    <button
      onClick={() => onEscolher(id)}
      aria-pressed={escolhido}
      style={{
        display: 'flex', alignItems: 'center', gap: '.85rem', textAlign: 'left',
        width: '100%', minHeight: 76, padding: '1rem',
        background: 'var(--surface)',
        border: `2px solid ${escolhido ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: 16, fontFamily: 'inherit', cursor: 'pointer',
      }}
    >
      <span
        aria-hidden
        style={{
          flexShrink: 0, width: 20, height: 20, borderRadius: '50%',
          border: `2px solid ${escolhido ? 'var(--accent-dim)' : 'var(--border)'}`,
          background: escolhido ? 'var(--accent)' : 'transparent',
        }}
      />
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '.4rem' }}>
          <span style={{ fontSize: 15.5, fontWeight: 700 }}>{titulo}</span>
          {selo && (
            <span style={{ background: 'var(--accent)', color: 'var(--on-accent)', borderRadius: 999, padding: '.1rem .45rem', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.04em' }}>
              {selo}
            </span>
          )}
        </span>
        <span style={{ display: 'block', fontSize: 12.5, color: 'var(--ink3)', marginTop: 2 }}>{nota}</span>
      </span>
      <span style={{ flexShrink: 0, textAlign: 'right' }}>
        <span style={{ display: 'block', fontFamily: 'var(--font-display), Bricolage Grotesque, sans-serif', fontSize: 19, fontWeight: 800 }}>{preco}</span>
        <span style={{ display: 'block', fontSize: 11, color: 'var(--ink3)' }}>{por}</span>
      </span>
    </button>
  )
}

function botao(fundo: string, cor: string): React.CSSProperties {
  return {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    minHeight: 54, marginTop: '1.25rem', borderRadius: 14,
    background: fundo, color: cor,
    fontSize: 15.5, fontWeight: 700, textDecoration: 'none',
  }
}
