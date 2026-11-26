'use client'

import Link from 'next/link'
import { Icon } from '@/components/Icon'
import { numerosDoProduto } from '@/lib/numeros'
import { assinaturaValendo, type AlunoComPlano } from '@/lib/plano'
import { PRECOS, emReais, descontoDoAnual } from '@/lib/precos'

/**
 * O convite para assinar, dentro do curso.
 *
 * Por que isto existe: até agora /assinar só era alcançável de dois lugares —
 * de dentro de "Minha conta", e esbarrando num cadeado. Quem estava
 * estudando nunca via um convite. Vender exige que a porta esteja visível
 * para quem está gostando do produto, não só para quem bateu numa parede.
 *
 * Duas regras de decência que esta tela segue:
 *
 *   - Quem JÁ assinou não vê convite nenhum. Vendedor que continua vendendo
 *     para quem já comprou é a definição de propaganda irritante.
 *   - Os números vêm de numerosDoProduto() e os preços de lib/precos.ts.
 *     Nada aqui é digitado à mão, então este cartão não envelhece sozinho
 *     quando o curso crescer ou o preço mudar.
 */
export function ConviteAssinatura({ studentId, aluno }: {
  studentId: string
  aluno: AlunoComPlano
}) {
  const valendo = assinaturaValendo(aluno)
  const n = numerosDoProduto()

  // Quem já tem plano recebe uma linha discreta, não um anúncio.
  if (valendo) {
    return (
      <Link
        href={`/learn/${studentId}/assinar`}
        style={{
          display: 'flex', alignItems: 'center', gap: '.6rem',
          background: 'var(--accent-soft)', border: '1px solid var(--accent-dim)',
          borderRadius: 12, padding: '.7rem .9rem',
          textDecoration: 'none', color: 'var(--ink)',
        }}
      >
        <Icon name="check" size={16} />
        <span style={{ fontSize: 13.5, fontWeight: 600 }}>
          Plano ativo — tudo aberto
        </span>
        <span style={{ marginLeft: 'auto', fontSize: 18, color: 'var(--ink3)' }}>›</span>
      </Link>
    )
  }

  return (
    <div
      className="lk-convite"
      style={{
        background: 'var(--panel)', color: 'var(--on-panel)',
        borderRadius: 18, padding: '1.25rem 1.3rem',
        position: 'relative', overflow: 'clip',
      }}
    >
      <style>{`
        .lk-convite { --saida: cubic-bezier(.23, 1, .32, 1); }
        .lk-convite-cta {
          display: inline-flex; align-items: center; justify-content: center;
          min-height: 48px; padding: .7rem 1.3rem; border-radius: 999px;
          background: var(--accent); color: var(--on-accent);
          font-size: 14.5; font-weight: 700; text-decoration: none;
          transition: transform 160ms var(--saida), box-shadow 220ms var(--saida);
        }
        @media (hover: hover) and (pointer: fine) {
          .lk-convite-cta:hover { transform: translateY(-1px); box-shadow: 0 10px 24px rgba(0,0,0,.25); }
        }
        .lk-convite-cta:active { transform: scale(.97); }
      `}</style>

      <div
        style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '.16em',
          textTransform: 'uppercase', color: 'var(--accent)',
        }}
      >
        O que ainda está fechado
      </div>

      <h2
        style={{
          fontFamily: 'var(--font-display), Bricolage Grotesque, sans-serif',
          fontSize: 'clamp(1.25rem, 5vw, 1.6rem)', fontWeight: 800,
          letterSpacing: '-0.025em', lineHeight: 1.12, marginTop: '.5rem',
        }}
      >
        As trilhas inteiras, as conversas<br />e o kit de bolso.
      </h2>

      {/* O que o dinheiro compra, em números que vêm do conteúdo de verdade. */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem', marginTop: '.9rem' }}>
        {[
          `${n.modulos} módulos de trilha`,
          `${n.conversas} conversas`,
          `${n.musicas} músicas`,
          'kit de bolso em PDF',
        ].map(item => (
          <span
            key={item}
            style={{
              fontSize: 12, padding: '.3rem .6rem', borderRadius: 999,
              background: 'color-mix(in srgb, var(--on-panel) 10%, transparent)',
              color: 'color-mix(in srgb, var(--on-panel) 80%, transparent)',
            }}
          >
            {item}
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '.75rem', marginTop: '1.15rem' }}>
        <Link href={`/learn/${studentId}/assinar`} className="lk-convite-cta">
          Ver os planos →
        </Link>
        <span style={{ fontSize: 12.5, color: 'color-mix(in srgb, var(--on-panel) 60%, transparent)', lineHeight: 1.5 }}>
          {emReais(PRECOS.annual.centavos)} por ano<br />
          ou {emReais(PRECOS.monthly.centavos)} por mês
        </span>
      </div>

      <p
        style={{
          fontSize: 11.5, lineHeight: 1.55, marginTop: '.9rem',
          color: 'color-mix(in srgb, var(--on-panel) 55%, transparent)',
        }}
      >
        O curso do A1 ao C2 continua de graça, sem prazo. O plano abre o que
        foi escrito para quem vai viajar ou morar fora — e sai {descontoDoAnual()}% mais
        barato no anual.
      </p>
    </div>
  )
}
