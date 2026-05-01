'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { EN_MODULES } from '@/lib/curriculum-en'

export default function EnHomePage() {
  const [progress, setProgress] = useState<Record<string, number[]>>({})

  useEffect(() => {
    try {
      const saved = localStorage.getItem('lk_progress_en')
      if (saved) setProgress(JSON.parse(saved))
    } catch {}
  }, [])

  const totalUnits = EN_MODULES.reduce((s, m) => s + m.units.length, 0)
  const totalDone = EN_MODULES.reduce((s, m) => s + (progress[m.id]?.length ?? 0), 0)
  const overallPct = totalUnits > 0 ? Math.round((totalDone / totalUnits) * 100) : 0

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <div style={{ background: 'var(--ink)', color: 'var(--cream)', padding: '3rem 2rem 2.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -20, top: -20, fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 160, fontWeight: 700, color: 'rgba(255,255,255,.04)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>EN</div>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: 13, color: 'rgba(255,255,255,.45)', textDecoration: 'none', marginBottom: '1.25rem', width: 'fit-content' }}>
          ← Dashboard
        </Link>
        <span style={{ fontSize: 28, display: 'block', marginBottom: '.75rem' }}>🇺🇸</span>
        <h1 style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 32, fontWeight: 600, letterSpacing: '-.5px', marginBottom: '.3rem' }}>English Course</h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,.55)', lineHeight: 1.6, maxWidth: 340 }}>
          Inglês para falantes de português · A1 → C2 · {totalUnits} units
        </p>
        <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,.15)', borderRadius: 2 }}>
            <div style={{ height: 4, background: 'var(--gold)', borderRadius: 2, width: `${overallPct}%`, transition: 'width .6s' }} />
          </div>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', whiteSpace: 'nowrap' }}>{totalDone} / {totalUnits} units</span>
        </div>
      </div>

      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
        {EN_MODULES.length === 0 && (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--ink3)', fontSize: 14 }}>
            Currículo sendo gerado... Volte em instantes.
          </div>
        )}
        {EN_MODULES.map(mod => {
          const done = progress[mod.id]?.length ?? 0
          const pct = Math.round((done / mod.units.length) * 100)
          return (
            <Link key={mod.id} href={`/en/module/${mod.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div
                style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', cursor: 'pointer', transition: 'box-shadow .15s, transform .15s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(0,0,0,.08)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.transform = 'none' }}
              >
                <div style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 10, background: mod.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 22, fontWeight: 700, color: mod.accent, flexShrink: 0 }}>
                    {mod.label}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, marginBottom: '.2rem' }}>{mod.emoji} {mod.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--ink3)', lineHeight: 1.4 }}>{mod.desc}</div>
                  </div>
                  <div style={{ textAlign: 'right', minWidth: 60 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: mod.accent }}>{pct}%</div>
                    <div style={{ fontSize: 11, color: 'var(--ink3)' }}>{done}/{mod.units.length}</div>
                    <div style={{ width: 60, height: 3, background: 'var(--border)', borderRadius: 2, marginTop: 4 }}>
                      <div style={{ height: 3, borderRadius: 2, background: mod.bar, width: `${pct}%`, transition: 'width .6s' }} />
                    </div>
                  </div>
                </div>
                <div style={{ padding: '.5rem 1.25rem .75rem', display: 'flex', gap: 4, flexWrap: 'wrap', borderTop: '1px solid var(--border)', background: 'var(--cream)' }}>
                  {mod.units.map((_, i) => (
                    <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: (progress[mod.id] ?? []).includes(i) ? 'var(--green)' : 'var(--border)' }} />
                  ))}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
