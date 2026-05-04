'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { MODULES } from '@/lib/curriculum'
import { EN_MODULES } from '@/lib/curriculum-en'

type StudentDetail = {
  id: string
  name: string
  createdAt: string
  testResult?: {
    level: string
    levelName: string
    course: string
    pct: number
    totalScore: number
  }
  lessons: { moduleId: string; unitIndex: number; completedAt: string }[]
}

const LEVEL_COLORS: Record<string, string> = {
  A1: '#1a5c9e', A2: '#9a4f0a', B1: '#1f6b2e',
  B2: '#6b21a8', C1: '#9b1c1c', C2: '#1a1814',
}

export default function StudentDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [student, setStudent] = useState<StudentDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/students/${id}`)
      .then(r => r.json())
      .then(data => { setStudent(data.student); setLoading(false) })
      .catch(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)' }}>
      <div style={{ fontSize: 14, color: 'var(--ink3)' }}>Carregando...</div>
    </div>
  )
  if (!student) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)' }}>
      <div style={{ fontSize: 14, color: 'var(--ink3)' }}>Aluno não encontrado.</div>
    </div>
  )

  const isEN = student.testResult?.course === 'en'
  const modules = isEN ? EN_MODULES : MODULES
  const completedSet = new Set(student.lessons.map(l => `${l.moduleId}-${l.unitIndex}`))
  const lvlColor = student.testResult ? (LEVEL_COLORS[student.testResult.level] ?? 'var(--ink)') : 'var(--ink3)'

  const totalUnits = modules.reduce((s, m) => s + m.units.length, 0)
  const totalDone = student.lessons.length
  const overallPct = totalUnits > 0 ? Math.round((totalDone / totalUnits) * 100) : 0

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      {/* Header */}
      <div style={{ background: 'var(--ink)', color: 'var(--cream)', padding: '2rem 1.5rem 1.5rem' }}>
        <Link href="/students" style={{ display: 'inline-flex', alignItems: 'center', gap: '.35rem', fontSize: 13, color: 'rgba(255,255,255,.5)', textDecoration: 'none', marginBottom: '1rem' }}>
          ← Alunos
        </Link>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 26, fontWeight: 700, marginBottom: '.4rem' }}>{student.name}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', flexWrap: 'wrap' }}>
              {student.testResult ? (
                <>
                  <span style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 18, fontWeight: 700, color: lvlColor, background: 'rgba(255,255,255,.12)', borderRadius: 8, padding: '.1rem .6rem' }}>
                    {student.testResult.level}
                  </span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,.55)' }}>{student.testResult.levelName}</span>
                  <span style={{ fontSize: 12, padding: '.1rem .45rem', borderRadius: 5, fontWeight: 600,
                    background: isEN ? 'rgba(154,79,10,.35)' : 'rgba(26,92,158,.35)',
                    color: isEN ? '#f5c899' : '#a8d0f0'
                  }}>
                    {isEN ? '🇺🇸 EN' : '🇧🇷 PT'}
                  </span>
                </>
              ) : (
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,.4)' }}>Sem resultado de teste</span>
              )}
            </div>
          </div>
          <Link href={`/learn/${student.id}`} target="_blank" style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: '.4rem', padding: '.5rem 1rem', background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.2)', borderRadius: 10, color: '#fff', textDecoration: 'none', fontSize: 13, fontWeight: 600 }}>
            🔗 Curso do aluno
          </Link>
        </div>

        {/* Overall progress bar */}
        <div style={{ marginTop: '1.1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,.4)', marginBottom: '.3rem' }}>
            <span>Progresso geral</span>
            <span>{totalDone}/{totalUnits} units · {overallPct}%</span>
          </div>
          <div style={{ height: 6, background: 'rgba(255,255,255,.12)', borderRadius: 3 }}>
            <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,.65)', width: `${overallPct}%`, transition: 'width .6s' }} />
          </div>
        </div>
      </div>

      {/* Module cards */}
      <div style={{ padding: '1.5rem', maxWidth: 700, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '.85rem' }}>
        {modules.map(mod => {
          const modDone = mod.units.filter((_, i) => completedSet.has(`${mod.id}-${i}`)).length
          const modPct = Math.round((modDone / mod.units.length) * 100)
          const status: 'complete' | 'in-progress' | 'not-started' =
            modDone === mod.units.length ? 'complete' : modDone > 0 ? 'in-progress' : 'not-started'

          return (
            <div key={mod.id} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
              {/* Module header */}
              <div style={{ padding: '.9rem 1.1rem', display: 'flex', alignItems: 'center', gap: '.85rem' }}>
                <div style={{ width: 42, height: 42, borderRadius: 8, background: mod.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 15, fontWeight: 700, color: mod.accent, flexShrink: 0 }}>
                  {mod.label}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '.45rem', marginBottom: '.25rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 14, fontWeight: 600 }}>{mod.emoji} {mod.name}</span>
                    <span style={{ fontSize: 11, padding: '.1rem .4rem', borderRadius: 5, fontWeight: 600,
                      background: status === 'complete' ? 'var(--green-light)' : status === 'in-progress' ? 'var(--gold-light)' : 'var(--border)',
                      color: status === 'complete' ? 'var(--green)' : status === 'in-progress' ? '#7a5a0a' : 'var(--ink3)'
                    }}>
                      {status === 'complete' ? '✓ Completo' : status === 'in-progress' ? '⏳ Em progresso' : '· Não iniciado'}
                    </span>
                  </div>
                  <div style={{ height: 4, background: 'var(--border)', borderRadius: 2, marginBottom: '.2rem' }}>
                    <div style={{ height: 4, borderRadius: 2, background: mod.bar, width: `${modPct}%`, transition: 'width .6s' }} />
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--ink3)' }}>{modDone}/{mod.units.length} units · {modPct}%</div>
                </div>
              </div>

              {/* Unit grid */}
              <div style={{ borderTop: '1px solid var(--border)', background: 'var(--cream)', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))', gap: '.3rem', padding: '.7rem' }}>
                {mod.units.map((unit, i) => {
                  const done = completedSet.has(`${mod.id}-${i}`)
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '.4rem', padding: '.4rem .6rem', borderRadius: 7, background: done ? 'var(--green-light)' : '#fff', border: `1px solid ${done ? 'var(--green)' : 'var(--border)'}` }}>
                      <span style={{ fontSize: 13, flexShrink: 0, color: done ? 'var(--green)' : 'var(--border)' }}>
                        {done ? '✓' : '○'}
                      </span>
                      <span style={{ fontSize: 11, fontWeight: done ? 600 : 400, color: done ? 'var(--green)' : 'var(--ink3)', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {unit.title}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
