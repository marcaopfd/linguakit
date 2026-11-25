import Link from 'next/link'
import { dataPorExtenso, LEGAL } from '@/lib/legal'

/**
 * O formato das quatro páginas legais.
 *
 * Uma coisa só importa aqui: que dê para ler. Política escrita para ninguém
 * ler é a norma do mercado — parágrafo de dez linhas, letra miúda, jargão —,
 * e o efeito prático é que a pessoa aceita sem saber o que aceitou. Então:
 * largura de leitura, títulos de verdade, frases curtas, e o texto em
 * português de gente.
 */
export function PaginaLegal({ titulo, resumo, children }: {
  titulo: string
  /** Uma linha dizendo do que trata, antes do texto. */
  resumo: string
  children: React.ReactNode
}) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', color: 'var(--ink)' }}>
      <style>{`
        .legal h2 {
          font-family: var(--font-display), 'Bricolage Grotesque', sans-serif;
          font-size: 1.32rem; font-weight: 700; letter-spacing: -0.015em;
          margin: 2.6rem 0 .7rem;
        }
        .legal h2:first-of-type { margin-top: 1.5rem; }
        .legal p { margin: 0 0 1rem; font-size: 1rem; line-height: 1.72; color: var(--ink2); }
        .legal li { font-size: 1rem; line-height: 1.72; color: var(--ink2); margin-bottom: .5rem; }
        .legal ul { margin: 0 0 1rem; padding-left: 1.15rem; }
        .legal strong { color: var(--ink); font-weight: 650; }
        .legal a { color: var(--ink); text-decoration: underline; text-underline-offset: 2px; }
        .legal code {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: .9em; background: var(--paper);
          padding: .1rem .3rem; border-radius: 5px;
        }
      `}</style>

      <header style={{ background: 'var(--panel)', color: 'var(--on-panel)', padding: '2rem 1.5rem 2.25rem' }}>
        <div style={{ maxWidth: '44rem', margin: '0 auto' }}>
          <Link
            href="/"
            style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, fontSize: 13, color: 'rgba(242,244,233,.6)', textDecoration: 'none' }}
          >
            ← {LEGAL.produto}
          </Link>
          <h1
            style={{
              fontFamily: 'var(--font-display), Bricolage Grotesque, sans-serif',
              fontSize: 'clamp(1.9rem, 5.5vw, 2.6rem)', fontWeight: 800,
              letterSpacing: '-0.025em', lineHeight: 1.1, marginTop: '.3rem',
            }}
          >
            {titulo}
          </h1>
          <p style={{ fontSize: 14.5, color: 'rgba(242,244,233,.68)', lineHeight: 1.55, marginTop: '.6rem' }}>
            {resumo}
          </p>
          <p style={{ fontSize: 12.5, color: 'rgba(242,244,233,.55)', marginTop: '.9rem' }}>
            Atualizado em {dataPorExtenso(LEGAL.atualizadoEm)}
          </p>
        </div>
      </header>

      <main className="legal" style={{ maxWidth: '44rem', margin: '0 auto', padding: '1rem 1.5rem 4rem' }}>
        {children}

        <hr style={{ border: 0, borderTop: '1px solid var(--border)', margin: '3rem 0 1.5rem' }} />
        <RodapeLegal />
      </main>
    </div>
  )
}

/** As quatro páginas se apontam, para quem chegou numa e precisa de outra. */
export function RodapeLegal() {
  const paginas: [string, string][] = [
    ['/termos', 'Termos de uso'],
    ['/privacidade', 'Privacidade'],
    ['/reembolso', 'Reembolso e cancelamento'],
    ['/contato', 'Contato'],
  ]
  return (
    <p style={{ fontSize: 13, color: 'var(--ink3)', lineHeight: 2 }}>
      {paginas.map(([href, nome], i) => (
        <span key={href}>
          {i > 0 && <span style={{ margin: '0 .5rem' }}>·</span>}
          <Link href={href} style={{ color: 'var(--ink2)', textDecoration: 'none' }}>{nome}</Link>
        </span>
      ))}
    </p>
  )
}

/**
 * O e-mail, quando houver um. Enquanto não houver, diz a verdade em vez de
 * mostrar um endereço inventado — a pessoa que precisa falar com alguém
 * merece saber que o canal ainda não existe.
 */
export function Contato() {
  if (!LEGAL.email) {
    return (
      <span>
        o canal de contato está sendo montado junto com o domínio próprio, e
        aparece aqui assim que existir
      </span>
    )
  }
  return <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>
}
