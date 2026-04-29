'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { MODULES } from '@/lib/curriculum'

export default function ModulePage() {
  const { id } = useParams<{ id: string }>()
  const mod = MODULES.find(m => m.id === id)
  const [progress, setProgress] = useState<number[]>([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('lk_progress')
      if (saved) {
        const all = JSON.parse(saved)
        setProgress(all[id] ?? [])
      }
    } catch {}
  }, [id])

  if (!mod) return <div style={{ padding: '2rem', color: 'var(--ink3)' }}>Module not found.</div>

  const done = progress.length
  const pct = Math.round((done / mod.units.length) * 100)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      {/* Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid var(--border)', padding: '1.5rem 1.5rem 1rem' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: 13, color: 'var(--ink3)', textDecoration: 'none', marginBottom: '.85rem', width: 'fit-content' }}>
          ← Back
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '.4rem' }}>
          <div style={{ width: 40, height: 40, borderRadius: 8, background: mod.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 18, fontWeight: 700, color: mod.accent }}>
            {mod.label}
          </div>
          <h2 style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 22, fontWeight: 600 }}>{mod.emoji} {mod.name}</h2>
        </div>
        <p style={{ fontSize: 13, color: 'var(--ink3)', lineHeight: 1.5 }}>{mod.desc}</p>
        <div style={{ marginTop: '.85rem', height: 4, background: 'var(--border)', borderRadius: 2 }}>
          <div style={{ height: 4, borderRadius: 2, background: mod.bar, width: `${pct}%`, transition: 'width .6s' }} />
        </div>
        <div style={{ marginTop: '.3rem', fontSize: 12, color: 'var(--ink3)' }}>{done} of {mod.units.length} units completed</div>
      </div>

      {/* Unit list */}
      <div style={{ padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
        {mod.units.map((unit, i) => {
          const isDone = progress.includes(i)
          return (
            <Link key={i} href={`/lesson/${id}/${i}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div
                style={{
                  border: `1px solid ${isDone ? '#b7e4c7' : 'var(--border)'}`,
                  borderRadius: 12,
                  padding: '.9rem 1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '.85rem',
                  cursor: 'pointer',
                  background: isDone ? '#f8fdf9' : '#fff',
                  transition: 'all .15s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = isDone ? '#b7e4c7' : 'var(--ink3)'; (e.currentTarget as HTMLElement).style.background = isDone ? '#f8fdf9' : 'var(--paper)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = isDone ? '#b7e4c7' : 'var(--border)'; (e.currentTarget as HTMLElement).style.background = isDone ? '#f8fdf9' : '#fff' }}
              >
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: isDone ? 'var(--green)' : 'var(--paper)',
                  border: `1.5px solid ${isDone ? 'var(--green)' : 'var(--border)'}`,
                  fontSize: 12, fontWeight: 600,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: isDone ? '#fff' : 'var(--ink3)',
                  flexShrink: 0,
                }}>
                  {isDone ? '✓' : i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.3 }}>{unit.emoji} {unit.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--ink3)', marginTop: 1 }}>{unit.sub}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
                  <div style={{ fontSize: 11, color: 'var(--ink3)' }}>{unit.duration}</div>
                  {isDone && <div style={{ fontSize: 11, color: 'var(--green)', fontWeight: 500 }}>✓ Done</div>}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
