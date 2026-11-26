'use client'

import { useState } from 'react'
import Link from 'next/link'
import { linkDoCheckout } from '@/lib/kiwify'
import { PRECOS, descontoDoAnual, emReais, mensalidadeDoAnual } from '@/lib/precos'
import { Icon } from '@/components/Icon'
import { Rabisco } from '@/components/Rabisco'
import { LEGAL } from '@/lib/legal'

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
export function TelaDePlanos({ studentId, nome, email, plano, estado, valendo, renovaEm, linkMensal, linkAnual }: {
  studentId: string
  nome: string
  plano: string
  estado: string
  valendo: boolean
  renovaEm: string | null
  /** Nulo em quem veio pelo teste e ainda não criou conta. */
  email: string | null
  linkMensal: string | null
  linkAnual: string | null
}) {
  const [escolhido, setEscolhido] = useState<'annual' | 'monthly'>('annual')
  const base = escolhido === 'annual' ? linkAnual : linkMensal
  const link = base && email ? linkDoCheckout(base, email, nome) : base

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

          <ComoCancelar />
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
            titulo={PRECOS.annual.titulo} preco={emReais(PRECOS.annual.centavos)} por={PRECOS.annual.por}
            nota={`${mensalidadeDoAnual()} por mês — ${descontoDoAnual()}% mais barato`}
            selo="Recomendado"
          />
          <Plano
            id="monthly" escolhido={escolhido === 'monthly'} onEscolher={setEscolhido}
            titulo={PRECOS.monthly.titulo} preco={emReais(PRECOS.monthly.centavos)} por={PRECOS.monthly.por}
            nota="Cancele quando quiser, sem multa"
          />
        </div>

        {!email ? (
          <>
            <Link href={`/learn/${studentId}/conta`} style={botao('var(--accent)', 'var(--on-accent)')}>
              Criar minha conta para assinar →
            </Link>
            <p style={{ fontSize: 12.5, color: 'var(--ink3)', textAlign: 'center', marginTop: '.9rem', lineHeight: 1.55 }}>
              A Kiwify avisa a compra pelo seu e-mail, e é por ele que o plano
              chega até você. Sem conta, o pagamento não teria onde cair.
            </p>
          </>
        ) : link ? (
          <a href={link} target="_blank" rel="noopener noreferrer" style={botao('var(--accent)', 'var(--on-accent)')}>
            Assinar o plano {escolhido === 'annual' ? 'anual' : 'mensal'} →
          </a>
        ) : (
          <div style={{ marginTop: '1.25rem', background: 'var(--note-bg)', border: '1px solid var(--note-border)', borderRadius: 14, padding: '.9rem 1rem', fontSize: 13, color: 'var(--note-ink)', lineHeight: 1.5 }}>
            O pagamento ainda não está aberto. Assim que a Kiwify estiver
            configurada, o botão aparece aqui.
          </div>
        )}

        {email && (
          <p style={{ fontSize: 12.5, color: 'var(--ink3)', textAlign: 'center', marginTop: '.9rem', lineHeight: 1.55 }}>
            Pagamento pela Kiwify — Pix, boleto ou cartão parcelado.<br />
            O checkout já vem com <strong style={{ color: 'var(--ink2)' }}>{email}</strong>: não troque,
            ou a compra não acha a sua conta.<br />
            Cancele quando quiser: sem multa, e você usa até o fim do período pago.
          </p>
        )}
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

/**
 * Como cancelar, dito por extenso e sem precisar pedir.
 *
 * Isto não é cortesia: esconder o cancelamento é prática que o CDC trata como
 * abusiva, e é a primeira coisa que alguém procura antes de confiar o cartão.
 * Uma assinatura fácil de cancelar vende MAIS, não menos.
 *
 * Os caminhos vêm da central de ajuda da Kiwify, porque a assinatura vive lá:
 * é ela quem cobra, e nós só recebemos o aviso. Por isso não existe um botão
 * "cancelar" aqui — ele seria mentira, já que este site não tem como
 * interromper a cobrança. O que existe é o endereço exato de onde o botão
 * mora, mais o nosso e-mail para quem não quiser se virar sozinho.
 */
function ComoCancelar() {
  return (
    <details
      style={{
        marginTop: '2rem', textAlign: 'left',
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 14, padding: '0 1rem',
      }}
    >
      <summary
        style={{
          cursor: 'pointer', listStyle: 'none', minHeight: 52,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          fontSize: 14, fontWeight: 600, color: 'var(--ink)',
        }}
      >
        Como cancelar a assinatura
        <span style={{ color: 'var(--ink3)', fontSize: 18 }}>+</span>
      </summary>

      <div style={{ paddingBottom: '1rem' }}>
        <p style={{ fontSize: 13.5, color: 'var(--ink2)', lineHeight: 1.65 }}>
          A cobrança é feita pela {LEGAL.pagamento.nome}, então o cancelamento
          acontece lá. São dois caminhos, os dois seus, sem precisar falar com
          ninguém:
        </p>

        <ol style={{ fontSize: 13.5, color: 'var(--ink2)', lineHeight: 1.65, paddingLeft: '1.1rem', marginTop: '.6rem' }}>
          <li style={{ marginBottom: '.5rem' }}>
            No e-mail <strong>&ldquo;Pagamento de assinatura aprovado&rdquo;</strong>, que
            você recebe na compra e a cada renovação, tem um botão para
            gerenciar a assinatura. Por ele dá para cancelar ou trocar o
            cartão.
          </li>
          <li>
            Ou entre em{' '}
            <a
              href="https://dashboard.kiwify.com.br/minhas-compras"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--ink)', fontWeight: 600 }}
            >
              dashboard.kiwify.com.br/minhas-compras
            </a>
            , encontre a assinatura e cancele.
          </li>
        </ol>

        <p style={{ fontSize: 13, color: 'var(--ink2)', lineHeight: 1.6, marginTop: '.8rem' }}>
          <strong>O que o cancelamento faz:</strong> impede as próximas
          cobranças. Ele não devolve o que já foi pago — e você{' '}
          <strong>continua com o acesso até o fim do período que já pagou</strong>.
          Para pedir dinheiro de volta dentro dos sete dias, veja{' '}
          <Link href="/reembolso" style={{ color: 'var(--ink)', fontWeight: 600 }}>
            Reembolso e cancelamento
          </Link>.
        </p>

        <p style={{ fontSize: 13, color: 'var(--ink3)', lineHeight: 1.6, marginTop: '.7rem' }}>
          Se pagou com Pix automático, dá para cancelar a autorização direto no
          aplicativo do seu banco.
        </p>

        <p style={{ fontSize: 13, color: 'var(--ink2)', lineHeight: 1.6, marginTop: '.7rem' }}>
          {/* Link para /contato em vez do endereço aqui: esta tela é um
              componente de cliente, e o e-mail vem de uma variável de
              servidor — no navegador ela seria undefined e a frase viraria
              "o canal de contato está sendo montado". */}
          Não achou, ou prefere que eu resolva?{' '}
          <Link href="/contato" style={{ color: 'var(--ink)', fontWeight: 600 }}>
            Fale comigo
          </Link>{' '}
          que eu cancelo para você.
        </p>
      </div>
    </details>
  )
}
