import { Caramelo } from '@/components/Caramelo'
import { Icon } from '@/components/Icon'

/**
 * What one question actually looks like, on the landing page.
 *
 * Built from the app's own tokens rather than screenshotted: it weighs
 * nothing, stays sharp at any size, and follows the theme into dark mode,
 * where a PNG of a cream-coloured card would sit there glowing.
 *
 * It is a still of the real screen, not the real screen — nothing here is
 * clickable, and the answer is shown already chosen, because the point is to
 * let someone see the shape of a question before deciding to start.
 */
export function ProductPreview() {
  return (
    <div
      role="img"
      aria-label="Uma questão do curso: um botão de ouvir, quatro opções de resposta e a correção na hora."
      style={{
        maxWidth: 330,
        margin: '0 auto',
        borderRadius: 24,
        border: '1px solid var(--border)',
        background: 'var(--cream)',
        overflow: 'hidden',
        boxShadow: '0 18px 40px -24px rgba(0,0,0,.35)',
      }}
    >
      {/* The bar the learner sees above every question. */}
      <div style={{ background: 'var(--panel)', color: 'var(--on-panel)', padding: '.9rem 1rem .8rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, color: 'rgba(255,255,255,.5)', marginBottom: '.5rem' }}>
          <span>A1 · Hello &amp; Goodbye</span>
          <span>Rodada 1 de 3</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
          <div style={{ flex: 1, height: 6, borderRadius: 3, background: 'rgba(255,255,255,.15)' }}>
            <div style={{ width: '38%', height: 6, borderRadius: 3, background: 'var(--gold)' }} />
          </div>
          <div style={{ display: 'flex', gap: 3 }} aria-hidden>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)' }} />
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(255,255,255,.25)' }} />
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(255,255,255,.25)' }} />
          </div>
        </div>
      </div>

      <div style={{ padding: '1rem' }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.6rem', marginBottom: '.7rem' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--ink3)', marginBottom: '.3rem' }}>
                Ouvir e escolher
              </div>
              <div style={{ fontSize: 11, color: 'var(--ink3)', lineHeight: 1.4 }}>
                Toque para ouvir e escolha o que significa.
              </div>
            </div>
            <div style={{ flexShrink: 0, color: 'var(--ink)' }}>
              <Caramelo mood="happy" size={44} />
            </div>
          </div>

          {/* The player stands in for the question: the sound is the question. */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '.8rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.3rem', padding: '.85rem 1.4rem', borderRadius: 14, border: '1.5px solid var(--border)', background: 'var(--paper)', color: 'var(--ink2)' }}>
              <Icon name="speaker" size={22} strokeWidth={1.7} />
              <span style={{ fontSize: 10, fontWeight: 600 }}>Ouvir</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '.35rem' }}>
            {['hello', 'nice to meet you', 'good evening'].map(opt => (
              <div key={opt} style={{ padding: '.55rem .7rem', borderRadius: 9, border: '1.5px solid var(--border)', background: 'var(--surface)', fontSize: 12 }}>
                {opt}
              </div>
            ))}
            <div style={{ padding: '.55rem .7rem', borderRadius: 9, border: '1.5px solid var(--ok-border)', background: 'var(--ok-bg)', color: 'var(--ok-ink)', fontSize: 12, fontWeight: 600 }}>
              bye
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '.45rem', marginTop: '.6rem', padding: '.5rem .7rem', borderRadius: 9, background: 'var(--ok-bg)', border: '1px solid var(--ok-border)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden style={{ flexShrink: 0 }}>
              <path d="M5 13l4.5 4.5L19 7" stroke="var(--ok-ink)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--ok-ink)' }}>Acertou!</span>
          </div>
        </div>
      </div>
    </div>
  )
}
