'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MODULES } from '@/lib/curriculum'
import { EN_MODULES } from '@/lib/curriculum-en'

export default function DashboardPage() {
  const [ptProgress, setPtProgress] = useState<Record<string, number[]>>({})
  const [enProgress, setEnProgress] = useState<Record<string, number[]>>({})
  const [activeTab, setActiveTab] = useState<'courses' | 'students'>('courses')

  useEffect(() => {
    try {
      const pt = localStorage.getItem('lk_progress')
      if (pt) setPtProgress(JSON.parse(pt))
      const en = localStorage.getItem('lk_progress_en')
      if (en) setEnProgress(JSON.parse(en))
    } catch {}
  }, [])

  const ptDone = MODULES.reduce((s, m) => s + (ptProgress[m.id]?.length ?? 0), 0)
  const ptTotal = MODULES.reduce((s, m) => s + m.units.length, 0)
  const enDone = EN_MODULES.reduce((s, m) => s + (enProgress[m.id]?.length ?? 0), 0)
  const enTotal = EN_MODULES.reduce((s, m) => s + m.units.length, 0)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      {/* Hero */}
      <div style={{ background: 'var(--ink)', color: 'var(--cream)', padding: '3rem 2rem 2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 32, fontWeight: 600, letterSpacing: '-.5px', marginBottom: '.3rem' }}>LinguaKit</h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,.5)' }}>Dashboard do Professor · by Marcos</p>
      </div>

      {/* Tab bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid var(--border)', display: 'flex' }}>
        {(['courses', 'students'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ flex: 1, padding: '.85rem', fontSize: 14, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', borderBottom: activeTab === tab ? '2px solid var(--ink)' : '2px solid transparent', color: activeTab === tab ? 'var(--ink)' : 'var(--ink3)' }}>
            {tab === 'courses' ? '📚 Cursos' : '👥 Alunos'}
          </button>
        ))}
      </div>

      {activeTab === 'courses' ? (
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Portuguese course card */}
          <CourseCard
            flag="🇧🇷"
            title="Ensino de Português"
            subtitle="Para falantes de inglês · A1 → C2"
            href="/pt"
            moduleHref={(id) => `/module/${id}`}
            modules={MODULES}
            progress={ptProgress}
            done={ptDone}
            total={ptTotal}
            accentColor="#1a5c9e"
            barColor="#5ba3d4"
          />

          {/* English course card */}
          <CourseCard
            flag="🇺🇸"
            title="Ensino de Inglês"
            subtitle="Para falantes de português · A1 → C2"
            href="/en"
            moduleHref={(id) => `/en/module/${id}`}
            modules={EN_MODULES}
            progress={enProgress}
            done={enDone}
            total={enTotal}
            accentColor="#9a4f0a"
            barColor="#e8973e"
            emptyLabel={enTotal === 0 ? 'Currículo sendo gerado...' : undefined}
          />
        </div>
      ) : (
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
          <Link href="/students" style={{ display: 'inline-block', background: 'var(--ink)', color: 'var(--cream)', padding: '.9rem 1.75rem', borderRadius: 10, textDecoration: 'none', fontWeight: 600, fontSize: 15 }}>
            Abrir painel de alunos →
          </Link>
          <Link href="/test" style={{ display: 'inline-block', color: 'var(--ink3)', padding: '.5rem', textDecoration: 'none', fontSize: 13 }}>
            🔗 Compartilhar teste de nivelamento com aluno
          </Link>
        </div>
      )}
    </div>
  )
}

interface CourseCardProps {
  flag: string
  title: string
  subtitle: string
  href: string
  moduleHref: (id: string) => string
  modules: typeof MODULES
  progress: Record<string, number[]>
  done: number
  total: number
  accentColor: string
  barColor: string
  emptyLabel?: string
}

function CourseCard({ flag, title, subtitle, href, moduleHref, modules, progress, done, total, accentColor, barColor, emptyLabel }: CourseCardProps) {
  const [expanded, setExpanded] = useState(false)
  const pct = total > 0 ? Math.round((done / total) * 100) : 0

  return (
    <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
      {/* Card header — click to expand or go to course */}
      <div style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ fontSize: 36, flexShrink: 0 }}>{flag}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 17, fontWeight: 700, marginBottom: '.15rem' }}>{title}</div>
          <div style={{ fontSize: 12, color: 'var(--ink3)' }}>{subtitle}</div>
          <div style={{ marginTop: '.6rem', display: 'flex', alignItems: 'center', gap: '.6rem' }}>
            <div style={{ flex: 1, height: 4, background: 'var(--border)', borderRadius: 2 }}>
              <div style={{ height: 4, borderRadius: 2, background: barColor, width: `${pct}%`, transition: 'width .6s' }} />
            </div>
            <span style={{ fontSize: 12, color: 'var(--ink3)', whiteSpace: 'nowrap' }}>{done}/{total} units</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem', alignItems: 'flex-end' }}>
          <Link
            href={href}
            style={{ padding: '.4rem .85rem', background: accentColor, color: '#fff', borderRadius: 8, textDecoration: 'none', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' }}
          >
            Abrir →
          </Link>
          <button
            onClick={() => setExpanded(e => !e)}
            style={{ padding: '.3rem .6rem', border: '1px solid var(--border)', borderRadius: 6, background: 'var(--paper)', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', color: 'var(--ink3)' }}
          >
            {expanded ? '▲ Fechar' : '▼ Módulos'}
          </button>
        </div>
      </div>

      {/* Expandable module list */}
      {expanded && (
        <div style={{ borderTop: '1px solid var(--border)', background: 'var(--cream)', padding: '.75rem' }}>
          {emptyLabel ? (
            <div style={{ padding: '1rem', textAlign: 'center', fontSize: 13, color: 'var(--ink3)' }}>{emptyLabel}</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
              {modules.map(mod => {
                const modDone = progress[mod.id]?.length ?? 0
                const modPct = Math.round((modDone / mod.units.length) * 100)
                return (
                  <Link key={mod.id} href={moduleHref(mod.id)} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 10, padding: '.65rem 1rem', display: 'flex', alignItems: 'center', gap: '.75rem' }}>
                      <div style={{ width: 32, height: 32, borderRadius: 6, background: mod.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 13, fontWeight: 700, color: mod.accent, flexShrink: 0 }}>
                        {mod.label}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{mod.emoji} {mod.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--ink3)' }}>{mod.units.length} units</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: mod.accent }}>{modPct}%</div>
                        <div style={{ width: 48, height: 3, background: 'var(--border)', borderRadius: 2, marginTop: 3 }}>
                          <div style={{ height: 3, borderRadius: 2, background: mod.bar, width: `${modPct}%` }} />
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
