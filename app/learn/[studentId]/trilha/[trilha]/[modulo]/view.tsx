'use client'

import Link from 'next/link'
import { NavInferior } from '@/components/NavInferior'
import type { ModuloTrilha, Trilha } from '@/lib/trilhas'
import { uiStrings } from '@/lib/ui-strings'

export function LicoesDoModulo({ studentId, trilha, modulo, feitas, lang }: {
  studentId: string
  trilha: Trilha
  modulo: ModuloTrilha
  feitas: number[]
  lang: string
}) {
  const t = uiStrings(lang)
  const prontas = new Set(feitas)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <header style={{ background: 'var(--panel)', color: 'var(--on-panel)', padding: '1.25rem 1.25rem 1.5rem' }}>
        <Link href={`/learn/${studentId}/trilha/${trilha.id}`} style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, fontSize: 13, color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>
          ← {trilha.nome}
        </Link>
        <div style={{ fontSize: 28, marginTop: '.2rem' }}>{modulo.emoji}</div>
        <h1 style={{ fontFamily: 'var(--font-display), Bricolage Grotesque, sans-serif', fontSize: 23, fontWeight: 700, marginTop: '.2rem' }}>
          {modulo.nome}
        </h1>
        <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,.65)', lineHeight: 1.5, marginTop: '.35rem' }}>{modulo.consegue}</p>
      </header>

      <main style={{ maxWidth: 620, margin: '0 auto', padding: '1.25rem 1rem 0', display: 'flex', flexDirection: 'column', gap: '.65rem' }}>
        {modulo.licoes.map((licao, i) => (
          <Link key={licao.id} href={`/learn/${studentId}/trilha/${trilha.id}/${modulo.id}/${i}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '.95rem 1rem', display: 'flex', alignItems: 'center', gap: '.85rem' }}>
              <div style={{
                width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 700,
                background: prontas.has(i) ? 'var(--accent)' : 'var(--paper)',
                color: prontas.has(i) ? 'var(--on-accent)' : 'var(--ink2)',
              }}>
                {prontas.has(i) ? '✓' : i + 1}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{licao.titulo}</div>
                <div style={{ fontSize: 12.5, color: 'var(--ink3)', marginTop: 2 }}>{licao.minutos} min</div>
              </div>
              <span style={{ color: 'var(--ink3)', fontSize: 18, flexShrink: 0 }}>›</span>
            </div>
          </Link>
        ))}
      </main>

      <NavInferior studentId={studentId} trilha={trilha.id} t={t} />
    </div>
  )
}
