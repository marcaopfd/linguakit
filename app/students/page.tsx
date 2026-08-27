'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type SkillScore = { correct: number; pct: number }

type Student = {
  id: string
  name: string
  email?: string | null
  course?: string | null
  newsletter?: boolean
  newsletterAt?: string | null
  hasAccount?: boolean
  createdAt: string
  testResult?: {
    level: string
    levelName: string
    totalScore: number
    pct: number
    skills: Record<string, SkillScore>
    weaknesses: string[]
    strengths: string[]
    recommendation: string
    course?: string
    createdAt: string
  }
}

const LEVEL_COLORS: Record<string, string> = {
  A1: '#1a5c9e', A2: '#9a4f0a', B1: '#1f6b2e',
  B2: '#6b21a8', C1: '#9b1c1c', C2: '#1a1814',
}

const SKILL_LABELS: Record<string, string> = {
  vocab: 'Vocabulary', grammar: 'Grammar', reading: 'Reading',
  listening: 'Comprehension', writing: 'Language Use',
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  const [copied, setCopied] = useState(false)

  const subscribers = students.filter(s => s.newsletter && s.email)

  async function copySubscribers() {
    const list = subscribers.map(s => s.email).join(', ')
    try {
      await navigator.clipboard.writeText(list)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('Copie os e-mails:', list)
    }
  }

  async function fetchStudents(showSpinner = false) {
    if (showSpinner) setRefreshing(true)
    try {
      const r = await fetch('/api/results')
      const data = await r.json()
      setStudents(data.students ?? [])
      setLastUpdated(new Date())
      setError('')
    } catch {
      setError('Could not load students.')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchStudents()
    const interval = setInterval(() => fetchStudents(), 30_000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      {/* Header */}
      <div style={{ background: 'var(--ink)', color: 'var(--cream)', padding: '2rem 1.5rem 1.5rem' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: 13, color: 'rgba(255,255,255,.5)', textDecoration: 'none', marginBottom: '1rem', width: 'fit-content' }}>
          ← Home
        </Link>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 26, fontWeight: 600, marginBottom: '.3rem' }}>👥 Students</h1>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.5)' }}>
              {students.length} student{students.length !== 1 ? 's' : ''} · placement test results
              {lastUpdated && <span> · updated {lastUpdated.toLocaleTimeString('en-IE', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>}
            </p>
          </div>
          <button
            onClick={() => fetchStudents(true)}
            disabled={refreshing}
            style={{ marginTop: '.25rem', padding: '.4rem .85rem', border: '1px solid rgba(255,255,255,.25)', borderRadius: 8, background: 'rgba(255,255,255,.1)', color: '#fff', fontSize: 13, cursor: refreshing ? 'default' : 'pointer', fontFamily: 'inherit', opacity: refreshing ? 0.6 : 1 }}
          >
            {refreshing ? '⏳' : '↺'} Refresh
          </button>
        </div>
      </div>

      {/* Share test links */}
      <div style={{ background: 'var(--gold-light)', borderBottom: '1px solid #e8d48a', padding: '.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '.75rem', flexWrap: 'wrap' }}>
        <span style={{ fontSize: 13, color: '#7a5a0a', flex: 1 }}>Share the placement test:</span>
        <a
          href="/test"
          target="_blank"
          style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', textDecoration: 'none', padding: '.35rem .75rem', background: '#fff', border: '1px solid #e8d48a', borderRadius: 8 }}
        >
          🇧🇷 Português →
        </a>
        <a
          href="/test?lang=en"
          target="_blank"
          style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', textDecoration: 'none', padding: '.35rem .75rem', background: '#fff', border: '1px solid #e8d48a', borderRadius: 8 }}
        >
          🇺🇸 English →
        </a>
      </div>

      {/* Signup link + newsletter list */}
      <div style={{ background: '#eef4fb', borderBottom: '1px solid #cfe0f2', padding: '.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '.75rem', flexWrap: 'wrap' }}>
        <span style={{ fontSize: 13, color: '#1a5c9e', flex: 1 }}>
          Cadastro de aluno · <strong>{subscribers.length}</strong> {subscribers.length === 1 ? 'inscrito' : 'inscritos'} na newsletter
        </span>
        <a
          href="/cadastro"
          target="_blank"
          style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', textDecoration: 'none', padding: '.35rem .75rem', background: '#fff', border: '1px solid #cfe0f2', borderRadius: 8 }}
        >
          🔗 Link do cadastro →
        </a>
        <button
          onClick={copySubscribers}
          disabled={subscribers.length === 0}
          style={{ fontSize: 13, fontWeight: 600, color: subscribers.length ? 'var(--ink)' : 'var(--ink3)', padding: '.35rem .75rem', background: '#fff', border: '1px solid #cfe0f2', borderRadius: 8, fontFamily: 'inherit', cursor: subscribers.length ? 'pointer' : 'default' }}
        >
          {copied ? '✓ Copiado' : '✉️ Copiar e-mails'}
        </button>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '1.5rem' }}>
        {loading && <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--ink3)', fontSize: 14 }}>Loading...</div>}
        {error && <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--red)', fontSize: 14 }}>{error}</div>}
        {!loading && students.length === 0 && (
          <div style={{ padding: '3rem', textAlign: 'center' }}>
            <div style={{ fontSize: 36, marginBottom: '1rem' }}>📋</div>
            <div style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 18, fontWeight: 600, marginBottom: '.5rem' }}>No students yet</div>
            <div style={{ fontSize: 14, color: 'var(--ink3)', lineHeight: 1.6 }}>Share the placement test link with your first student.<br />Results will appear here automatically.</div>
          </div>
        )}
        {students.map(s => <StudentCard key={s.id} student={s} onDelete={id => setStudents(prev => prev.filter(x => x.id !== id))} />)}
      </div>
    </div>
  )
}

function StudentCard({ student: s, onDelete }: { student: Student; onDelete: (id: string) => void }) {
  const r = s.testResult
  const course = s.course ?? r?.course ?? null
  const levelColor = r ? (LEVEL_COLORS[r.level] ?? 'var(--ink)') : 'var(--ink3)'
  const [confirming, setConfirming] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [resetting, setResetting] = useState(false)
  const [confirmingReset, setConfirmingReset] = useState(false)
  const [tempPassword, setTempPassword] = useState('')
  const [resetError, setResetError] = useState('')
  const [copiedPassword, setCopiedPassword] = useState(false)

  async function handleReset() {
    setResetting(true)
    setResetError('')
    try {
      const res = await fetch(`/api/students/${s.id}/reset-password`, { method: 'POST' })
      const data = await res.json()
      if (res.ok) setTempPassword(data.password)
      else setResetError(data.error ?? 'Não foi possível resetar.')
    } catch {
      setResetError('Falha de rede.')
    } finally {
      setResetting(false)
      setConfirmingReset(false)
    }
  }

  async function copyPassword() {
    try {
      await navigator.clipboard.writeText(tempPassword)
      setCopiedPassword(true)
      setTimeout(() => setCopiedPassword(false), 2000)
    } catch {
      window.prompt('Copie a senha:', tempPassword)
    }
  }

  async function handleDelete() {
    setDeleting(true)
    try {
      const res = await fetch(`/api/students/${s.id}`, { method: 'DELETE' })
      if (res.ok) onDelete(s.id)
    } finally {
      setDeleting(false)
      setConfirming(false)
    }
  }

  return (
    <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 14, marginBottom: '.75rem', overflow: 'hidden' }}>
      {/* Card header */}
      <div style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: r ? levelColor : 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 14, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
          {s.name.charAt(0).toUpperCase()}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
            <span style={{ fontSize: 15, fontWeight: 600 }}>{s.name}</span>
            {course && (
              <span style={{ fontSize: 11, padding: '.15rem .45rem', borderRadius: 5, background: course === 'en' ? '#fff3e8' : '#e8f1fb', color: course === 'en' ? '#9a4f0a' : '#1a5c9e', fontWeight: 600 }}>
                {course === 'en' ? '🇺🇸 EN' : '🇧🇷 PT'}
              </span>
            )}
            {s.newsletter && (
              <span title={s.newsletterAt ? `Aceitou em ${new Date(s.newsletterAt).toLocaleDateString('pt-BR')}` : undefined} style={{ fontSize: 11, padding: '.15rem .45rem', borderRadius: 5, background: '#eaf7ee', color: '#1f6b2e', fontWeight: 600 }}>
                ✉️ newsletter
              </span>
            )}
            {s.hasAccount && (
              <span style={{ fontSize: 11, padding: '.15rem .45rem', borderRadius: 5, background: 'var(--paper)', color: 'var(--ink3)', fontWeight: 600 }}>
                🔑 conta
              </span>
            )}
          </div>
          <div style={{ fontSize: 12, color: 'var(--ink3)' }}>
            {r ? `${r.level} · ${r.levelName}` : 'No test result yet'} · joined {new Date(s.createdAt).toLocaleDateString('en-IE', { day: 'numeric', month: 'short', year: 'numeric' })}
          </div>
          {s.email && <div style={{ fontSize: 12, color: 'var(--ink3)', marginTop: 1 }}>{s.email}</div>}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '.35rem' }}>
          {r && (
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 22, fontWeight: 700, color: levelColor }}>{r.level}</div>
              <div style={{ fontSize: 12, color: 'var(--ink3)' }}>{r.totalScore}/30 · {r.pct}%</div>
            </div>
          )}
          {confirming ? (
            <div style={{ display: 'flex', gap: '.3rem' }}>
              <button onClick={() => setConfirming(false)} style={{ fontSize: 11, padding: '.2rem .5rem', borderRadius: 5, border: '1px solid var(--border)', background: 'var(--paper)', cursor: 'pointer', fontFamily: 'inherit', color: 'var(--ink3)' }}>
                Cancelar
              </button>
              <button onClick={handleDelete} disabled={deleting} style={{ fontSize: 11, padding: '.2rem .5rem', borderRadius: 5, border: 'none', background: 'var(--red)', color: '#fff', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>
                {deleting ? '...' : 'Confirmar'}
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '.3rem' }}>
              {s.hasAccount && (
                confirmingReset ? (
                  <>
                    <button onClick={() => setConfirmingReset(false)} style={{ fontSize: 11, padding: '.2rem .5rem', borderRadius: 5, border: '1px solid var(--border)', background: 'var(--paper)', cursor: 'pointer', fontFamily: 'inherit', color: 'var(--ink3)' }}>
                      Cancelar
                    </button>
                    <button onClick={handleReset} disabled={resetting} style={{ fontSize: 11, padding: '.2rem .5rem', borderRadius: 5, border: 'none', background: 'var(--ink)', color: '#fff', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>
                      {resetting ? '...' : 'Gerar senha'}
                    </button>
                  </>
                ) : (
                  <button onClick={() => { setConfirmingReset(true); setTempPassword(''); setResetError('') }} style={{ fontSize: 11, padding: '.2rem .5rem', borderRadius: 5, border: '1px solid var(--border)', background: 'none', cursor: 'pointer', fontFamily: 'inherit', color: 'var(--ink3)' }}>
                    🔑 Resetar senha
                  </button>
                )
              )}
              <button onClick={() => setConfirming(true)} style={{ fontSize: 11, padding: '.2rem .5rem', borderRadius: 5, border: '1px solid var(--border)', background: 'none', cursor: 'pointer', fontFamily: 'inherit', color: 'var(--ink3)' }}>
                🗑 Excluir
              </button>
            </div>
          )}
        </div>
      </div>

      {resetError && (
        <div style={{ borderTop: '1px solid var(--border)', padding: '.6rem 1.25rem', background: '#fdecea', fontSize: 12.5, color: 'var(--red)' }}>
          {resetError}
        </div>
      )}

      {tempPassword && (
        <div style={{ borderTop: '1px solid var(--border)', padding: '.85rem 1.25rem', background: '#eef4fb' }}>
          <div style={{ fontSize: 12, color: '#1a5c9e', marginBottom: '.5rem', lineHeight: 1.5 }}>
            Senha temporária de <strong>{s.name}</strong>. Ela aparece <strong>uma única vez</strong> — copie e envie ao aluno agora.
          </div>
          <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <code style={{ fontSize: 15, fontWeight: 700, letterSpacing: '.5px', background: '#fff', border: '1px solid #cfe0f2', borderRadius: 8, padding: '.4rem .7rem', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
              {tempPassword}
            </code>
            <button onClick={copyPassword} style={{ fontSize: 12, fontWeight: 600, padding: '.4rem .7rem', borderRadius: 8, border: '1px solid #cfe0f2', background: '#fff', cursor: 'pointer', fontFamily: 'inherit', color: 'var(--ink)' }}>
              {copiedPassword ? '✓ Copiada' : '📋 Copiar'}
            </button>
            <button onClick={() => setTempPassword('')} style={{ fontSize: 12, padding: '.4rem .7rem', borderRadius: 8, border: 'none', background: 'none', cursor: 'pointer', fontFamily: 'inherit', color: 'var(--ink3)' }}>
              Ocultar
            </button>
          </div>
        </div>
      )}

      {r && (
        <div style={{ borderTop: '1px solid var(--border)', padding: '.85rem 1.25rem', background: 'var(--cream)' }}>
          {/* Skill bars */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.4rem .75rem', marginBottom: '.75rem' }}>
            {Object.entries(r.skills).map(([key, val]) => (
              <div key={key}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--ink3)', marginBottom: 2 }}>
                  <span>{SKILL_LABELS[key] ?? key}</span>
                  <span>{val.pct}%</span>
                </div>
                <div style={{ height: 4, background: 'var(--border)', borderRadius: 2 }}>
                  <div style={{ height: 4, borderRadius: 2, background: val.pct >= 60 ? 'var(--green)' : val.pct >= 40 ? 'var(--gold)' : 'var(--red)', width: `${val.pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Weaknesses & recommendation */}
          <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', marginBottom: '.65rem' }}>
            {r.weaknesses.slice(0, 3).map(w => (
              <span key={w} style={{ fontSize: 11, padding: '.2rem .5rem', borderRadius: 5, background: 'var(--red-light)', color: 'var(--red)', fontWeight: 500 }}>
                ↓ {SKILL_LABELS[w] ?? w}
              </span>
            ))}
            <span style={{ fontSize: 11, padding: '.2rem .5rem', borderRadius: 5, background: 'var(--gold-light)', color: '#7a5a0a', fontWeight: 500 }}>
              🎯 {r.recommendation.replace('Module', 'Mod.')}
            </span>
          </div>
          {/* Actions */}
          <div style={{ display: 'flex', gap: '.5rem' }}>
            <Link href={`/students/${s.id}`} style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)', textDecoration: 'none', padding: '.3rem .7rem', border: '1px solid var(--border)', borderRadius: 7, background: '#fff', display: 'inline-flex', alignItems: 'center', gap: '.3rem' }}>
              📊 Ver progresso
            </Link>
            <Link href={`/learn/${s.id}`} target="_blank" style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink3)', textDecoration: 'none', padding: '.3rem .7rem', border: '1px solid var(--border)', borderRadius: 7, background: '#fff', display: 'inline-flex', alignItems: 'center', gap: '.3rem' }}>
              🔗 Link do curso
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
