'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function StudentLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/student/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()

    if (res.ok) {
      router.push(`/learn/${data.studentId}`)
    } else {
      setError(data.error ?? 'Não foi possível entrar.')
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)', padding: '2rem 1.5rem' }}>
      <div style={{ width: '100%', maxWidth: 380 }}>
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <h1 style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 28, fontWeight: 700, marginBottom: '.3rem' }}>
            Entrar
          </h1>
          <p style={{ fontSize: 13, color: 'var(--ink3)' }}>Continue de onde você parou.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 16, padding: '1.6rem' }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: '.4rem' }}>E-mail</label>
          <input
            type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="voce@exemplo.com" autoFocus
            style={{ width: '100%', border: '1.5px solid var(--border)', borderRadius: 10, padding: '.7rem .85rem', fontSize: 15, fontFamily: 'inherit', background: '#fff', outline: 'none', marginBottom: '.9rem' }}
          />

          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: '.4rem' }}>Senha</label>
          <input
            type="password" value={password} onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            style={{ width: '100%', border: `1.5px solid ${error ? 'var(--red)' : 'var(--border)'}`, borderRadius: 10, padding: '.7rem .85rem', fontSize: 15, fontFamily: 'inherit', background: '#fff', outline: 'none', marginBottom: '.9rem' }}
          />

          {error && (
            <div style={{ fontSize: 13, color: 'var(--red)', marginBottom: '.85rem', background: '#fdecea', border: '1px solid #f5c6c2', borderRadius: 8, padding: '.6rem .8rem' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !email || !password}
            style={{
              width: '100%', padding: '.85rem', borderRadius: 10, border: 'none', fontSize: 15, fontWeight: 600,
              fontFamily: 'inherit', color: '#fff',
              background: loading || !email || !password ? 'var(--border)' : 'var(--ink)',
              cursor: loading || !email || !password ? 'default' : 'pointer',
            }}
          >
            {loading ? 'Entrando...' : 'Entrar →'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--ink3)', marginTop: '1.1rem' }}>
          Ainda não tem conta? <Link href="/cadastro" style={{ color: 'var(--ink)', fontWeight: 600 }}>Cadastre-se</Link>
        </p>
      </div>
    </div>
  )
}
