'use client'

/**
 * The last resort: a failure in the root layout itself, which replaces it.
 *
 * It has to carry its own <html> and <body>, and it cannot rely on the app's
 * stylesheet or fonts loading, so everything here is inline and self-contained.
 * That is also why the dog is absent — importing a component is one more thing
 * that could be the reason this page is on screen at all.
 */
export default function GlobalError({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, background: '#faf8f3', color: '#1a1814', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem', textAlign: 'center' }}>
          <div style={{ maxWidth: 400 }}>
            <h1 style={{ fontSize: 23, fontWeight: 700, marginBottom: '.5rem' }}>
              O LinguaKit não conseguiu carregar
            </h1>
            <p style={{ fontSize: 14, color: '#6f6a5d', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Seu progresso está salvo. Tente de novo em instantes.
              <br />
              Your progress is safe — please try again.
            </p>
            <button
              onClick={() => retry()}
              style={{ minHeight: 48, padding: '0 1.5rem', borderRadius: 12, border: 'none', background: '#2d6a4f', color: '#faf8f3', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}
            >
              Tentar de novo · Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
