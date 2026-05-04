'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { MODULES } from '@/lib/curriculum'
import { EN_MODULES } from '@/lib/curriculum-en'

type StudentData = {
  id: string
  name: string
  testResult?: {
    level: string
    levelName: string
    course: string
    pct: number
    totalScore: number
  }
  lessons: { moduleId: string; unitIndex: number }[]
}

const LEVEL_COLORS: Record<string, string> = {
  A1: '#1a5c9e', A2: '#9a4f0a', B1: '#1f6b2e',
  B2: '#6b21a8', C1: '#9b1c1c', C2: '#1a1814',
}

export default function LearnPage() {
  const { studentId } = useParams<{ studentId: string }>()
  const [student, setStudent] = useState<StudentData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/students/${studentId}`)
      .then(r => r.json())
      .then(data => { setStudent(data.student); setLoading(false) })
      .catch(() => setLoading(false))
  }, [studentId])

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)' }}>
      <div style={{ fontSize: 14, color: 'var(--ink3)' }}>A carregar...</div>
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
  const lvlColor = student.testResult ? (LEVEL_COLORS[student.testResult.level] ?? 'var(--ink)') : 'var(--ink)'

  const totalUnits = modules.reduce((s, m) => s + m.units.length, 0)
  const totalDone = student.lessons.length
  const overallPct = totalUnits > 0 ? Math.round((totalDone / totalUnits) * 100) : 0

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      {/* Header */}
      <div style={{ background: 'var(--ink)', color: 'var(--cream)', padding: '2rem 1.5rem 1.75rem' }}>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,.4)', marginBottom: '.35rem', textTransform: 'uppercase', letterSpacing: '.07em' }}>
          {isEN ? '🇺🇸 English Course' : '🇧🇷 Portuguese Course'} · LinguaKit
        </div>
        <h1 style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 26, fontWeight: 700, marginBottom: '.5rem' }}>
          Olá, {student.name} 👋
        </h1>
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
            <span>Progresso geral</span>
            <span>{totalDone}/{totalUnits} units · {overallPct}%</span>
          </div>
          <div style={{ height: 5, background: 'rgba(255,255,255,.15)', borderRadius: 3 }}>
            <div style={{ height: 5, borderRadius: 3, background: 'rgba(255,255,255,.7)', width: `${overallPct}%`, transition: 'width .6s' }} />
          </div>
        </div>
      </div>

      {/* Module list */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '.75rem', maxWidth: 620, margin: '0 auto' }}>
        <div style={{ fontSize: 12, color: 'var(--ink3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.07em' }}>
          Módulos
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
