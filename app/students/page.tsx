'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type SkillScore = { correct: number; pct: number }

type Student = {
  id: string
  name: string
  email?: string
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
        {students.map(s => <StudentCard key={s.id} student={s} />)}
      </div>
    </div>
  )
}

function StudentCard({ student: s }: { student: Student }) {
  const r = s.testResult
  const levelColor = r ? (LEVEL_COLORS[r.level] ?? 'var(--ink)') : 'var(--ink3)'

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
            {r?.course && (
              <span style={{ fontSize: 11, padding: '.15rem .45rem', borderRadius: 5, background: r.course === 'en' ? '#fff3e8' : '#e8f1fb', color: r.course === 'en' ? '#9a4f0a' : '#1a5c9e', fontWeight: 600 }}>
                {r.course === 'en' ? '🇺🇸 EN' : '🇧🇷 PT'}
              </span>
            )}
          </div>
          <div style={{ fontSize: 12, color: 'var(--ink3)' }}>
            {r ? `${r.level} · ${r.levelName}` : 'No test result yet'} · joined {new Date(s.createdAt).toLocaleDateString('en-IE', { day: 'numeric', month: 'short', year: 'numeric' })}
          </div>
        </div>
        {r && (
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 22, fontWeight: 700, color: levelColor }}>{r.level}</div>
            <div style={{ fontSize: 12, color: 'var(--ink3)' }}>{r.totalScore}/30 · {r.pct}%</div>
          </div>
        )}
      </div>

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
          <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
            {r.weaknesses.slice(0, 3).map(w => (
              <span key={w} style={{ fontSize: 11, padding: '.2rem .5rem', borderRadius: 5, background: 'var(--red-light)', color: 'var(--red)', fontWeight: 500 }}>
                ↓ {SKILL_LABELS[w] ?? w}
              </span>
            ))}
            <span style={{ fontSize: 11, padding: '.2rem .5rem', borderRadius: 5, background: 'var(--gold-light)', color: '#7a5a0a', fontWeight: 500 }}>
              🎯 {r.recommendation.replace('Module', 'Mod.')}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
