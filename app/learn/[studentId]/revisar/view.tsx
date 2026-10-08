'use client'

import { useState } from 'react'
import Link from 'next/link'
import { uiStrings } from '@/lib/ui-strings'

export type DueItem = {
  id: string
  exerciseType: string
  question: string
  expected: string
  box: number
}

/**
 * Flashcard review: show the question, reveal the answer, let the student say
 * whether they had it. Self-assessment rather than typing, because the stored
 * items came from multiple choice as well as written answers and matching text
 * against an option label would be the wrong test.
 */
/**
 * Takes `lang` rather than a resolved UiStrings object: that object holds
 * functions (reviewDue, reviewProgress...), and functions cannot cross the
 * server/client boundary. Resolving here keeps the props serialisable.
 */
export function ReviewView({ studentId, items, lang }: { studentId: string; items: DueItem[]; lang: string }) {
  const t = uiStrings(lang)
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [saving, setSaving] = useState(false)

  const item = items[index]
  const finished = index >= items.length

  async function answer(correct: boolean) {
    if (saving || !item) return
    setSaving(true)
    // Fire-and-forget would risk losing the last answer on navigation.
    await fetch('/api/student/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, id: item.id, correct }),
    }).catch(() => {})
    setRevealed(false)
    setIndex(i => i + 1)
    setSaving(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <div style={{ background: 'var(--ink)', color: 'var(--cream)', padding: '1.5rem 1.5rem 1.25rem' }}>
        <Link href={`/learn/${studentId}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '.35rem', fontSize: 13, color: 'rgba(255,255,255,.5)', textDecoration: 'none', marginBottom: '.75rem' }}>
          ← {t.backToCourse}
        </Link>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1rem' }}>
          <h1 style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 24, fontWeight: 700 }}>🔁 {t.review}</h1>
          {!finished && (
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,.55)' }}>{t.reviewProgress(index + 1, items.length)}</span>
          )}
        </div>
        <div style={{ marginTop: '.75rem', height: 4, background: 'rgba(255,255,255,.15)', borderRadius: 2 }}>
          <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,.7)', width: `${(index / Math.max(items.length, 1)) * 100}%`, transition: 'width .3s' }} />
        </div>
      </div>

      <div style={{ padding: '1.5rem', maxWidth: 560, margin: '0 auto' }}>
        {finished ? (
          <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 14, padding: '2rem 1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: 36, marginBottom: '.75rem' }}>✅</div>
            <div style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 19, fontWeight: 700, marginBottom: '.4rem' }}>{t.reviewDone}</div>
            <div style={{ fontSize: 13, color: 'var(--ink3)', lineHeight: 1.55, marginBottom: '1.25rem' }}>{t.reviewDoneHint}</div>
            <Link href={`/learn/${studentId}`} style={{ display: 'inline-block', background: 'var(--ink)', color: 'var(--cream)', padding: '.75rem 1.5rem', borderRadius: 10, textDecoration: 'none', fontWeight: 600, fontSize: 14 }}>
              {t.backToCourse}
            </Link>
          </div>
        ) : (
          <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 14, padding: '1.5rem' }}>
            <div style={{ fontSize: 10.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--ink3)', marginBottom: '.75rem' }}>
              {item.exerciseType}
            </div>
            <div style={{ fontSize: 17, lineHeight: 1.5, marginBottom: '1.25rem' }}>{item.question}</div>

            {revealed ? (
              <>
                <div style={{ background: '#eaf7ee', border: '1px solid #b7e4c7', borderRadius: 10, padding: '.85rem 1rem', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: 11, color: 'var(--green)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '.2rem' }}>
                    {t.correctAnswer}
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#1f6b2e' }}>{item.expected}</div>
                </div>
                <div style={{ display: 'flex', gap: '.6rem' }}>
                  <button onClick={() => answer(false)} disabled={saving} style={{ flex: 1, padding: '.85rem', borderRadius: 10, border: '1.5px solid var(--red)', background: '#fff', color: 'var(--red)', fontSize: 14, fontWeight: 600, fontFamily: 'inherit', cursor: saving ? 'default' : 'pointer' }}>
                    ✗ {t.missedIt}
                  </button>
                  <button onClick={() => answer(true)} disabled={saving} style={{ flex: 1, padding: '.85rem', borderRadius: 10, border: 'none', background: 'var(--green)', color: '#fff', fontSize: 14, fontWeight: 600, fontFamily: 'inherit', cursor: saving ? 'default' : 'pointer' }}>
                    ✓ {t.gotIt}
                  </button>
                </div>
              </>
            ) : (
              <button onClick={() => setRevealed(true)} style={{ width: '100%', padding: '.85rem', borderRadius: 10, border: 'none', background: 'var(--ink)', color: '#fff', fontSize: 15, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}>
                {t.showAnswer}
              </button>
            )}
          </div>
        )}

        <div style={{ fontSize: 12, color: 'var(--ink3)', textAlign: 'center', marginTop: '1rem', lineHeight: 1.5 }}>
          {t.reviewExplain}
        </div>
      </div>
    </div>
  )
}
