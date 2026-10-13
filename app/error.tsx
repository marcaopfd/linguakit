'use client'

import Link from 'next/link'
import { Caramelo } from '@/components/Caramelo'

/**
 * The fallback when a page throws while rendering.
 *
 * `retry` re-renders the segment — in this version of Next the prop is `retry`,
 * not the `reset` older ones passed — and it is offered first, because most of
 * what fails here is a database that was still waking up.
 *
 * The error itself is never printed. A learner can do nothing with a stack
 * trace, and it is the kind of text that quietly names a host or a table.
 */
export default function Error({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem' }}>
      <div style={{ textAlign: 'center', maxWidth: 430 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: 'var(--ink)' }}>
          <Caramelo mood="sad" size={104} />
        </div>
        <h1 style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 25, fontWeight: 700, marginBottom: '.5rem' }}>
          Algo deu errado aqui
        </h1>
        <p style={{ fontSize: 14, color: 'var(--ink3)', lineHeight: 1.6, marginBottom: '.25rem' }}>
          Não foi culpa sua, e seu progresso está salvo. Tentar de novo costuma resolver.
        </p>
        <p style={{ fontSize: 13.5, color: 'var(--ink3)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
          Something went wrong — not your doing, and your progress is safe.
        </p>

        <button
          onClick={() => retry()}
          style={{ width: '100%', minHeight: 48, borderRadius: 12, border: 'none', background: 'var(--green)', color: 'var(--on-panel)', fontSize: 15, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer', marginBottom: '.6rem' }}
        >
          Tentar de novo · Try again
        </button>
        <Link
          href="/"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 48, borderRadius: 12, border: '1px solid var(--border)', background: 'var(--paper)', color: 'var(--ink2)', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}
        >
          Voltar ao início · Back home
        </Link>
      </div>
    </div>
  )
}
