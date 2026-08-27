'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const COURSES = [
  { id: 'pt' as const, flag: '🇧🇷', title: 'Português', sub: 'Para quem fala inglês', accent: '#1a5c9e' },
  { id: 'en' as const, flag: '🇺🇸', title: 'Inglês', sub: 'Para quem fala português', accent: '#9a4f0a' },
]

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [course, setCourse] = useState<'pt' | 'en' | null>(null)
  const [newsletter, setNewsletter] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const ready = name.trim() && email.trim() && password.length >= 8 && course

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!ready) return
    setLoading(true)
    setError('')

    const res = await fetch('/api/student/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, course, newsletter }),
    })
    const data = await res.json()

    if (res.ok) {
      router.push(`/learn/${data.studentId}`)
    } else {
      setError(data.error ?? 'Não foi possível criar a conta.')
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', padding: '2rem 1.5rem 4rem' }}>
      <div style={{ maxWidth: 420, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <h1 style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 28, fontWeight: 700, marginBottom: '.3rem' }}>
            Criar minha conta
          </h1>
          <p style={{ fontSize: 13, color: 'var(--ink3)', lineHeight: 1.5 }}>
            Acesso ao material do curso, do seu jeito e no seu ritmo.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 16, padding: '1.5rem' }}>
          <Field label="Nome">
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Como você quer ser chamado" autoFocus style={inputStyle()} />
          </Field>

          <Field label="E-mail">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="voce@exemplo.com" style={inputStyle()} />
          </Field>

          <Field label="Senha" hint="Mínimo de 8 caracteres">
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={inputStyle(password.length > 0 && password.length < 8)} />
          </Field>

          <div style={{ marginBottom: '1.1rem' }}>
            <label style={labelStyle}>Qual curso você quer fazer?</label>
            <div style={{ display: 'flex', gap: '.6rem' }}>
              {COURSES.map(c => {
                const active = course === c.id
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCourse(c.id)}
                    style={{
                      flex: 1, padding: '.85rem .6rem', borderRadius: 12, cursor: 'pointer', fontFamily: 'inherit',
                      textAlign: 'center', background: active ? '#fff' : 'var(--paper)',
                      border: `1.5px solid ${active ? c.accent : 'var(--border)'}`,
                      boxShadow: active ? `0 0 0 3px ${c.accent}22` : 'none',
                    }}
                  >
                    <div style={{ fontSize: 24, marginBottom: '.25rem' }}>{c.flag}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: active ? c.accent : 'var(--ink)' }}>{c.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--ink3)', marginTop: 1 }}>{c.sub}</div>
                  </button>
                )
              })}
            </div>
          </div>

          <label style={{ display: 'flex', gap: '.6rem', alignItems: 'flex-start', cursor: 'pointer', background: 'var(--paper)', border: '1px solid var(--border)', borderRadius: 10, padding: '.7rem .85rem', marginBottom: '1.1rem' }}>
            <input type="checkbox" checked={newsletter} onChange={e => setNewsletter(e.target.checked)} style={{ marginTop: 2, width: 16, height: 16, flexShrink: 0, cursor: 'pointer' }} />
            <span style={{ fontSize: 12.5, color: 'var(--ink2)', lineHeight: 1.5 }}>
              Quero receber dicas de estudo e novidades do curso por e-mail. Você pode cancelar quando quiser.
            </span>
          </label>

          {error && (
            <div style={{ fontSize: 13, color: 'var(--red)', marginBottom: '.85rem', background: '#fdecea', border: '1px solid #f5c6c2', borderRadius: 8, padding: '.6rem .8rem' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={!ready || loading}
            style={{
              width: '100%', padding: '.9rem', borderRadius: 10, border: 'none', fontSize: 15, fontWeight: 600,
              fontFamily: 'inherit', color: '#fff', background: !ready || loading ? 'var(--border)' : 'var(--ink)',
              cursor: !ready || loading ? 'default' : 'pointer',
            }}
          >
            {loading ? 'Criando...' : 'Criar conta e começar →'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--ink3)', marginTop: '1.1rem' }}>
          Já tem conta? <Link href="/entrar" style={{ color: 'var(--ink)', fontWeight: 600 }}>Entrar</Link>
        </p>
        <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--ink3)', marginTop: '.5rem' }}>
          Não sabe seu nível? <Link href="/test" style={{ color: 'var(--ink3)', textDecoration: 'underline' }}>Faça o teste de nivelamento</Link>
        </p>
      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = { display: 'block', fontSize: 13, fontWeight: 600, marginBottom: '.4rem' }

function inputStyle(invalid = false): React.CSSProperties {
  return {
    width: '100%', border: `1.5px solid ${invalid ? 'var(--red)' : 'var(--border)'}`, borderRadius: 10,
    padding: '.7rem .85rem', fontSize: 15, fontFamily: 'inherit', background: '#fff', outline: 'none',
  }
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={labelStyle}>
        {label}
        {hint && <span style={{ fontWeight: 400, color: 'var(--ink3)', marginLeft: '.4rem' }}>· {hint}</span>}
      </label>
      {children}
    </div>
  )
}
