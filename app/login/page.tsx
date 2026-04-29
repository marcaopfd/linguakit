'use client'

import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

function LoginForm() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get('from') || '/'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      router.push(from)
    } else {
      setError('Wrong password.')
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: 360 }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: 40, marginBottom: '.75rem' }}>🇧🇷</div>
          <h1 style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 26, fontWeight: 700, marginBottom: '.25rem' }}>LinguaKit</h1>
          <p style={{ fontSize: 13, color: 'var(--ink3)' }}>Teacher access</p>
        </div>

        <form onSubmit={handleSubmit} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 16, padding: '1.75rem' }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: '.4rem' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter password"
            autoFocus
            style={{ width: '100%', border: `1.5px solid ${error ? 'var(--red)' : 'var(--border)'}`, borderRadius: 10, padding: '.75rem .9rem', fontSize: 15, fontFamily: 'inherit', background: '#fff', outline: 'none', marginBottom: '.75rem' }}
          />
          {error && <div style={{ fontSize: 13, color: 'var(--red)', marginBottom: '.75rem' }}>{error}</div>}
          <button
            type="submit"
            disabled={loading || !password}
            style={{ width: '100%', background: loading || !password ? 'var(--border)' : 'var(--ink)', color: '#fff', border: 'none', borderRadius: 10, padding: '.85rem', fontSize: 15, fontWeight: 600, cursor: loading || !password ? 'default' : 'pointer', fontFamily: 'inherit' }}
          >
            {loading ? 'Entering...' : 'Enter →'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
