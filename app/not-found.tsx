import Link from 'next/link'
import { Caramelo } from '@/components/Caramelo'

/**
 * Shown when a page does not exist, and when a route calls notFound() — a
 * lesson or unit number that is not in the curriculum, most often.
 *
 * Bilingual, like the front door: whoever lands here could have come from
 * either course, and this is the one page that cannot know which.
 */
export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem' }}>
      <div style={{ textAlign: 'center', maxWidth: 420 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: 'var(--ink)' }}>
          <Caramelo mood="sad" size={104} />
        </div>
        <h1 style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 25, fontWeight: 700, marginBottom: '.5rem' }}>
          Esta página não existe
        </h1>
        <p style={{ fontSize: 14, color: 'var(--ink3)', lineHeight: 1.6, marginBottom: '.25rem' }}>
          O link pode estar incompleto ou ter mudado.
        </p>
        <p style={{ fontSize: 13.5, color: 'var(--ink3)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
          This page does not exist — the link may be incomplete or have changed.
        </p>
        <Link
          href="/"
          style={{ display: 'inline-flex', alignItems: 'center', minHeight: 48, padding: '.85rem 1.5rem', borderRadius: 12, background: 'var(--green)', color: 'var(--on-panel)', fontSize: 15, fontWeight: 700, textDecoration: 'none' }}
        >
          Voltar ao início · Back home
        </Link>
      </div>
    </div>
  )
}
