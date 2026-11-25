'use client'

import Link from 'next/link'
import { Icon } from './Icon'
import { Rabisco } from './Rabisco'

/**
 * A tela de "isto é do plano pago".
 *
 * Diz o que está fechado, o que vem junto e quanto custa — e nunca esconde o
 * que continua aberto, porque a pessoa que acabou de bater numa porta
 * fechada precisa saber que o resto do curso continua lá.
 *
 * O botão leva para fora: o pagamento acontece na Kiwify, e o app nunca vê
 * dado de cartão.
 */
export function Paywall({ studentId, oQue, motivo }: {
  studentId: string
  /** O nome do que ele tentou abrir, para a tela não falar em abstrato. */
  oQue: string
  motivo: 'pago' | 'pausado'
}) {
  const pausado = motivo === 'pausado'

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <header style={{ background: 'var(--panel)', color: 'var(--on-panel)', padding: '1.5rem 1.25rem 2rem', position: 'relative', overflow: 'hidden' }}>
        <Link href={`/learn/${studentId}`} style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, fontSize: 13, color: 'rgba(242,244,233,.55)', textDecoration: 'none' }}>
          ← Voltar para o curso
        </Link>
        <div style={{ position: 'absolute', top: 24, right: -46, opacity: .75 }}>
          <Rabisco largura={165} />
        </div>
        <div style={{ position: 'relative', maxWidth: 560, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.35rem', background: 'var(--accent)', color: 'var(--on-accent)', borderRadius: 999, padding: '.3rem .75rem', fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', marginTop: '.6rem' }}>
            {pausado ? 'Assinatura pausada' : 'Plano completo'}
          </div>
          <h1 style={{ fontFamily: 'var(--font-display), Bricolage Grotesque, sans-serif', fontSize: 26, fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em', marginTop: '.6rem' }}>
            {pausado ? 'Sua assinatura está pausada' : `${oQue} faz parte do plano completo`}
          </h1>
          <p style={{ fontSize: 14.5, color: 'rgba(242,244,233,.7)', lineHeight: 1.55, marginTop: '.5rem' }}>
            {pausado
              ? 'Retome quando quiser — o seu progresso, as frases salvas e o seu nível continuam exatamente onde estavam.'
              : 'O curso completo do A1 ao C2, a palavra do dia e a revisão continuam abertos de graça. O que o plano abre é o inglês da viagem e da mudança.'}
          </p>
        </div>
      </header>

      <main style={{ maxWidth: 560, margin: '0 auto', padding: '1.25rem 1.25rem 2.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
          {[
            ['Trilha Viagem inteira', 'Oito módulos, do aeroporto à barganha no mercado.'],
            ['As conversas', 'Negocie com o vendedor, o taxista e a recepção — e veja o que daria para dizer melhor.'],
            ['Kit de bolso', 'As 50 frases em PDF, para usar no celular sem internet.'],
            ['Morar e Trabalhar Fora', 'Dez módulos: aluguel, entrevista, cozinha, obra.'],
            ['Quarenta músicas', 'Do pop ao rap: ouvir, entender e interpretar com o trecho certo.'],
          ].map(([titulo, texto]) => (
            <div key={titulo} style={{ display: 'flex', gap: '.7rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '.85rem 1rem' }}>
              <span style={{ flexShrink: 0, color: 'var(--ink)' }}><Icon name="check" size={17} /></span>
              <span style={{ minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 14.5, fontWeight: 700 }}>{titulo}</span>
                <span style={{ display: 'block', fontSize: 12.5, color: 'var(--ink3)', lineHeight: 1.45, marginTop: 1 }}>{texto}</span>
              </span>
            </div>
          ))}
        </div>

        <Link
          href={`/learn/${studentId}/assinar`}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            minHeight: 54, marginTop: '1.25rem', borderRadius: 14,
            background: 'var(--accent)', color: 'var(--on-accent)',
            fontSize: 15.5, fontWeight: 700, textDecoration: 'none',
          }}
        >
          {pausado ? 'Retomar assinatura' : 'Ver os planos'}
        </Link>

        <p style={{ fontSize: 12.5, color: 'var(--ink3)', textAlign: 'center', marginTop: '.8rem', lineHeight: 1.5 }}>
          Dá para pausar a qualquer momento, sem perder nada.
        </p>
      </main>
    </div>
  )
}
