'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import type { ModuleSummary } from '@/lib/curriculum-index'
import { uiStrings, type UiStrings } from '@/lib/ui-strings'

type StudentData = {
  id: string
  name: string
  email?: string | null
  course?: string | null
  testResult?: {
    level: string
    levelName: string
    course: string
    pct: number
    totalScore: number
  }
  lessons: { moduleId: string; unitIndex: number }[]
}

type Attempt = {
  moduleId: string
  unitIndex: number
  exerciseType: string
  question: string
  answer: string
  expected: string
  correct: boolean
  answeredAt: string
}

const LEVEL_COLORS: Record<string, string> = {
  A1: '#1a5c9e', A2: '#9a4f0a', B1: '#1f6b2e',
  B2: '#6b21a8', C1: '#9b1c1c', C2: '#1a1814',
}

export function LearnView({ ptModules, enModules }: { ptModules: ModuleSummary[]; enModules: ModuleSummary[] }) {
  const { studentId } = useParams<{ studentId: string }>()
  const router = useRouter()
  const [student, setStudent] = useState<StudentData | null>(null)
  const [attempts, setAttempts] = useState<Attempt[]>([])
  const [dueCount, setDueCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  // Only students who signed up have a session to end. Those reached through a
  // shared /learn/<id> link have nothing to log out of, so the button is hidden.
  const [signedIn, setSignedIn] = useState(false)

  useEffect(() => {
    fetch('/api/student/me')
      .then(r => r.json())
      .then(d => setSignedIn(d.student?.id === studentId))
      .catch(() => {})
  }, [studentId])

  async function logout() {
    await fetch('/api/student/logout', { method: 'POST' })
    router.push('/entrar')
    router.refresh()
  }

  useEffect(() => {
    fetch(`/api/students/${studentId}`)
      .then(r => r.json())
      .then(data => { setStudent(data.student); setLoading(false) })
      .catch(() => setLoading(false))

    fetch(`/api/student/attempts?studentId=${encodeURIComponent(studentId)}`)
      .then(r => r.json())
      .then(data => setAttempts(data.attempts ?? []))
      .catch(() => {})

    fetch(`/api/student/reviews?studentId=${encodeURIComponent(studentId)}`)
      .then(r => r.json())
      .then(data => setDueCount(data.dueCount ?? 0))
      .catch(() => {})
  }, [studentId])

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)' }}>
      <div style={{ fontSize: 14, color: 'var(--ink3)' }}>{uiStrings('en-US').loading}</div>
    </div>
  )
  if (!student) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)' }}>
      <div style={{ fontSize: 14, color: 'var(--ink3)' }}>{uiStrings('en-US').studentNotFound}</div>
    </div>
  )

  const isEN = (student.course ?? student.testResult?.course) === 'en'
  const modules = isEN ? enModules : ptModules
  // The chrome follows the learner's own language: the opposite of the course.
  const t = uiStrings(isEN ? 'en-US' : 'pt-BR')
  const completedSet = new Set(student.lessons.map(l => `${l.moduleId}-${l.unitIndex}`))
  const lvlColor = student.testResult ? (LEVEL_COLORS[student.testResult.level] ?? 'var(--ink)') : 'var(--ink)'

  const totalUnits = modules.reduce((s, m) => s + m.units.length, 0)
  const totalDone = student.lessons.length
  const overallPct = totalUnits > 0 ? Math.round((totalDone / totalUnits) * 100) : 0

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      {/* Header */}
      <div style={{ background: 'var(--ink)', color: 'var(--cream)', padding: '2rem 1.5rem 1.75rem' }}>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,.4)', marginBottom: '.35rem', textTransform: 'uppercase', letterSpacing: '.07em' }}>
          {isEN ? '🇺🇸' : '🇧🇷'} {t.courseLabel} · LinguaKit
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
          <h1 style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 26, fontWeight: 700, marginBottom: '.5rem' }}>
            {t.hello}, {student.name} 👋
          </h1>
          {signedIn && (
            <button
              onClick={logout}
              style={{ flexShrink: 0, padding: '.35rem .75rem', borderRadius: 8, border: '1px solid rgba(255,255,255,.25)', background: 'transparent', color: 'rgba(255,255,255,.7)', fontSize: 12.5, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}
            >
              {t.signOut}
            </button>
          )}
        </div>
        {student.testResult && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 18, fontWeight: 700, color: lvlColor, background: 'rgba(255,255,255,.12)', borderRadius: 8, padding: '.15rem .65rem' }}>
              {student.testResult.level}
            </span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,.55)' }}>
              {student.testResult.levelName} · {student.testResult.totalScore}/30 ({student.testResult.pct}%)
            </span>
          </div>
        )}
        {/* Overall progress */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,.4)', marginBottom: '.3rem' }}>
            <span>{t.overallProgress}</span>
            <span>{totalDone}/{totalUnits} units · {overallPct}%</span>
          </div>
          <div style={{ height: 5, background: 'rgba(255,255,255,.15)', borderRadius: 3 }}>
            <div style={{ height: 5, borderRadius: 3, background: 'rgba(255,255,255,.7)', width: `${overallPct}%`, transition: 'width .6s' }} />
          </div>
        </div>
      </div>

      {/* Review queue */}
      {dueCount !== null && (
        <div style={{ padding: '1.5rem 1.5rem 0', maxWidth: 620, margin: '0 auto' }}>
          {dueCount > 0 ? (
            <Link href={`/learn/${studentId}/revisar`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ background: 'var(--ink)', color: 'var(--cream)', borderRadius: 14, padding: '1.1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ fontSize: 28, flexShrink: 0 }}>🔁</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 17, fontWeight: 700 }}>{t.review}</div>
                  <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,.6)', marginTop: 1 }}>{t.reviewDue(dueCount)}</div>
                </div>
                <span style={{ flexShrink: 0, background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.25)', borderRadius: 9, padding: '.5rem .9rem', fontSize: 13, fontWeight: 600 }}>
                  {t.reviewStart} →
                </span>
              </div>
            </Link>
          ) : (
            <div style={{ background: '#fff', border: '1px dashed var(--border)', borderRadius: 14, padding: '1rem 1.25rem' }}>
              <div style={{ fontSize: 13.5, fontWeight: 600, marginBottom: '.2rem' }}>🔁 {t.reviewNothingDue}</div>
              <div style={{ fontSize: 12.5, color: 'var(--ink3)', lineHeight: 1.5 }}>{t.reviewNothingDueHint}</div>
            </div>
          )}
        </div>
      )}

      {/* Your mistakes */}
      <div style={{ padding: '1.5rem 1.5rem 0', maxWidth: 620, margin: '0 auto' }}>
        <MyMistakes attempts={attempts} modules={modules} t={t} />
      </div>

      {/* Module list */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '.75rem', maxWidth: 620, margin: '0 auto' }}>
        <div style={{ fontSize: 12, color: 'var(--ink3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.07em' }}>
          {t.modules}
        </div>
        {modules.map(mod => {
          const done = mod.units.filter((_, i) => completedSet.has(`${mod.id}-${i}`)).length
          const pct = Math.round((done / mod.units.length) * 100)
          return (
            <Link key={mod.id} href={`/learn/${studentId}/module/${mod.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 14, padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', transition: 'box-shadow .15s' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: mod.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 16, fontWeight: 700, color: mod.accent, flexShrink: 0 }}>
                  {mod.label}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, marginBottom: '.25rem' }}>{mod.emoji} {mod.name}</div>
                  <div style={{ height: 4, background: 'var(--border)', borderRadius: 2, marginBottom: '.2rem' }}>
                    <div style={{ height: 4, borderRadius: 2, background: mod.bar, width: `${pct}%`, transition: 'width .6s' }} />
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--ink3)' }}>{done}/{mod.units.length} units · {pct}%</div>
                </div>
                <div style={{ fontSize: 20, color: 'var(--ink3)', flexShrink: 0 }}>›</div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

function MyMistakes({ attempts, modules, t }: {
  attempts: Attempt[]
  modules: ModuleSummary[]
  t: UiStrings
}) {
  const [showAll, setShowAll] = useState(false)

  if (attempts.length === 0) {
    return (
      <div style={{ background: '#fff', border: '1px dashed var(--border)', borderRadius: 14, padding: '1.25rem', textAlign: 'center' }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: '.3rem' }}>{t.noMistakesYet}</div>
        <div style={{ fontSize: 12.5, color: 'var(--ink3)', lineHeight: 1.5 }}>{t.noMistakesHint}</div>
      </div>
    )
  }

  const wrong = attempts.filter(a => !a.correct)
  const pct = Math.round(((attempts.length - wrong.length) / attempts.length) * 100)
  const accuracyColor = pct >= 80 ? 'var(--green)' : pct >= 60 ? '#9a4f0a' : 'var(--red)'

  const unitTitle = (moduleId: string, unitIndex: number) => {
    const mod = modules.find(m => m.id === moduleId)
    const unit = mod?.units[unitIndex]
    return unit ? `${mod!.label} · ${unit.title}` : moduleId.toUpperCase()
  }

  const visible = showAll ? wrong : wrong.slice(0, 5)

  return (
    <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
      <div style={{ padding: '1rem 1.25rem', borderBottom: wrong.length ? '1px solid var(--border)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 17, fontWeight: 700 }}>🎯 {t.yourMistakes}</div>
          <div style={{ fontSize: 12, color: 'var(--ink3)', marginTop: 2 }}>
            {t.answeredCount(attempts.length)} · {t.mistakeCount(wrong.length)}
          </div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 24, fontWeight: 700, color: accuracyColor }}>{pct}%</div>
          <div style={{ fontSize: 11, color: 'var(--ink3)' }}>{t.accuracy}</div>
        </div>
      </div>

      {wrong.length > 0 && (
        <div style={{ padding: '.85rem 1.25rem 1.1rem', display: 'flex', flexDirection: 'column', gap: '.55rem' }}>
          {visible.map((a, i) => (
            <div key={i} style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 10, padding: '.7rem .85rem' }}>
              <div style={{ fontSize: 10.5, color: 'var(--ink3)', marginBottom: '.3rem', textTransform: 'uppercase', letterSpacing: '.05em' }}>
                {unitTitle(a.moduleId, a.unitIndex)}
              </div>
              <div style={{ fontSize: 13.5, marginBottom: '.4rem', lineHeight: 1.45 }}>{a.question}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.15rem', fontSize: 12.5 }}>
                <span style={{ color: 'var(--red)' }}>
                  {t.youAnswered}: {a.answer || <em style={{ color: 'var(--ink3)' }}>{t.blank}</em>}
                </span>
                <span style={{ color: 'var(--green)', fontWeight: 600 }}>{t.correctAnswer}: {a.expected}</span>
              </div>
            </div>
          ))}
          {wrong.length > 5 && (
            <button
              onClick={() => setShowAll(v => !v)}
              style={{ marginTop: '.1rem', width: '100%', padding: '.6rem', borderRadius: 9, border: '1px dashed var(--border)', background: 'var(--paper)', color: 'var(--ink2)', fontSize: 13, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}
            >
              {showAll ? t.showLess : t.seeAll(wrong.length)}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
