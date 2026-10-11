'use client'

import { useCallback, useState } from 'react'
import Link from 'next/link'
import { isCorrect, type DrillItem } from '@/lib/drill'
import { uiStrings } from '@/lib/ui-strings'

type Props = {
  studentId: string
  moduleId: string
  unitIndex: number
  unitTitle: string
  moduleLabel: string
  items: DrillItem[]
  nextUnit: number | null
  lang: string
}

/**
 * One question at a time, answer, immediate feedback, continue — then straight
 * into the next unit. The lesson screen stays as the reference material; this
 * is the drill.
 *
 * Takes `lang` rather than a resolved strings object: that object holds
 * functions, which cannot cross the server/client boundary.
 */
export function PracticeView({
  studentId, moduleId, unitIndex, unitTitle, moduleLabel, items, nextUnit, lang,
}: Props) {
  const t = uiStrings(lang)

  const [index, setIndex] = useState(0)
  const [choice, setChoice] = useState<number | null>(null)
  const [typed, setTyped] = useState('')
  const [checked, setChecked] = useState(false)
  const [rightCount, setRightCount] = useState(0)

  const item = items[index]
  const finished = index >= items.length

  const given = item?.options ? choice : typed
  const right = item ? isCorrect(item, given) : false
  const canCheck = item?.options ? choice !== null : typed.trim().length > 0

  const check = useCallback(() => {
    if (!item || checked || !canCheck) return
    setChecked(true)
    if (right) setRightCount(c => c + 1)

    // Same shape the lesson sends, so one item is one record either way.
    fetch('/api/attempts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentId,
        moduleId,
        unitIndex,
        itemKey: item.key,
        exerciseType: item.type,
        question: item.question,
        answer: item.options ? (choice === null ? '' : item.options[choice]) : typed,
        expected: item.expected,
        correct: right,
      }),
    }).catch(() => {})
  }, [item, checked, canCheck, right, studentId, moduleId, unitIndex, choice, typed])

  const advance = useCallback(() => {
    setChecked(false)
    setChoice(null)
    setTyped('')
    setIndex(i => i + 1)
  }, [])

  function restart() {
    setIndex(0); setChoice(null); setTyped(''); setChecked(false); setRightCount(0)
  }

  if (items.length === 0) {
    return (
      <Shell studentId={studentId} t={t} title={unitTitle} label={moduleLabel} progress={0}>
        <Card><div style={{ fontSize: 14, color: 'var(--ink3)' }}>{t.practiceEmpty}</div></Card>
      </Shell>
    )
  }

  if (finished) {
    const pct = Math.round((rightCount / items.length) * 100)
    return (
      <Shell studentId={studentId} t={t} title={unitTitle} label={moduleLabel} progress={100}>
        <Card>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: '.5rem' }}>{pct >= 80 ? '🎉' : '✅'}</div>
            <div style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 21, fontWeight: 700, marginBottom: '.25rem' }}>
              {t.practiceDone}
            </div>
            <div style={{ fontSize: 14, color: 'var(--ink3)', marginBottom: '1.25rem' }}>
              {t.practiceScore(rightCount, items.length)} · {pct}%
            </div>

            {nextUnit !== null ? (
              <Link
                href={`/learn/${studentId}/praticar/${moduleId}/${nextUnit}`}
                style={{ display: 'block', padding: '.9rem', background: 'var(--green)', color: '#fff', borderRadius: 12, textDecoration: 'none', fontSize: 15, fontWeight: 700, marginBottom: '.6rem' }}
              >
                {t.nextUnit} →
              </Link>
            ) : (
              <div style={{ fontSize: 13.5, color: 'var(--green)', fontWeight: 600, marginBottom: '.85rem' }}>
                🏁 {t.moduleFinished}
              </div>
            )}

            <div style={{ display: 'flex', gap: '.5rem' }}>
              <button onClick={restart} style={secondaryBtn}>{t.practiceAgain}</button>
              <Link href={`/learn/${studentId}`} style={{ ...secondaryBtn, textAlign: 'center', textDecoration: 'none', display: 'block' }}>
                {t.exitPractice}
              </Link>
            </div>
          </div>
        </Card>
      </Shell>
    )
  }

  return (
    <Shell studentId={studentId} t={t} title={unitTitle} label={moduleLabel} progress={(index / items.length) * 100}>
      <Card>
        <div style={{ fontSize: 10.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--ink3)', marginBottom: '.5rem' }}>
          {item.type}
        </div>
        <div style={{ fontSize: 12.5, color: 'var(--ink3)', marginBottom: '.85rem', lineHeight: 1.45 }}>{item.instruction}</div>
        <div style={{ fontSize: 19, lineHeight: 1.45, fontWeight: 500, marginBottom: '1.25rem' }}>{item.question}</div>

        {item.options ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
            {item.options.map((opt, oi) => {
              const picked = choice === oi
              const isAnswer = oi === item.answerIndex
              let border = 'var(--border)', bg = '#fff', color = 'var(--ink)'
              if (checked && isAnswer) { border = 'var(--green)'; bg = '#eaf7ee'; color = '#1f6b2e' }
              else if (checked && picked) { border = 'var(--red)'; bg = '#fdecea'; color = 'var(--red)' }
              else if (picked) { border = 'var(--ink)'; bg = 'var(--paper)' }
              return (
                <button
                  key={oi}
                  onClick={() => !checked && setChoice(oi)}
                  disabled={checked}
                  style={{ textAlign: 'left', padding: '.85rem 1rem', borderRadius: 12, border: `1.5px solid ${border}`, background: bg, color, fontSize: 15.5, fontFamily: 'inherit', cursor: checked ? 'default' : 'pointer' }}
                >
                  {opt}
                </button>
              )
            })}
          </div>
        ) : (
          <input
            value={typed}
            onChange={e => !checked && setTyped(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') (checked ? advance() : check()) }}
            placeholder={t.typeAnswer}
            disabled={checked}
            autoFocus
            style={{ width: '100%', padding: '.85rem 1rem', fontSize: 16, borderRadius: 12, fontFamily: 'inherit', background: checked ? (right ? '#eaf7ee' : '#fdecea') : '#fff', border: `1.5px solid ${checked ? (right ? 'var(--green)' : 'var(--red)') : 'var(--border)'}`, outline: 'none' }}
          />
        )}

        {checked && (
          <div style={{ marginTop: '1rem', padding: '.85rem 1rem', borderRadius: 12, background: right ? '#eaf7ee' : '#fdecea', border: `1px solid ${right ? '#b7e4c7' : '#f5c6c2'}` }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: right ? '#1f6b2e' : 'var(--red)' }}>
              {right ? `✓ ${t.correctFeedback}` : `✗ ${t.wrongFeedback} ${item.expected}`}
            </div>
          </div>
        )}

        <button
          onClick={checked ? advance : check}
          disabled={!checked && !canCheck}
          style={{ width: '100%', marginTop: '1.1rem', padding: '.9rem', borderRadius: 12, border: 'none', fontSize: 15, fontWeight: 700, fontFamily: 'inherit', color: '#fff', background: !checked && !canCheck ? 'var(--border)' : checked ? 'var(--ink)' : 'var(--green)', cursor: !checked && !canCheck ? 'default' : 'pointer' }}
        >
          {checked ? t.continueOn : t.verify}
        </button>
      </Card>
    </Shell>
  )
}

const secondaryBtn: React.CSSProperties = {
  flex: 1, padding: '.75rem', borderRadius: 10, border: '1px solid var(--border)',
  background: 'var(--paper)', color: 'var(--ink2)', fontSize: 13.5, fontWeight: 600,
  fontFamily: 'inherit', cursor: 'pointer',
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 16, padding: '1.5rem' }}>
      {children}
    </div>
  )
}

function Shell({ studentId, t, title, label, progress, children }: {
  studentId: string
  t: ReturnType<typeof uiStrings>
  title: string
  label: string
  progress: number
  children: React.ReactNode
}) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <div style={{ background: 'var(--ink)', color: 'var(--cream)', padding: '1.25rem 1.5rem 1.1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '.7rem' }}>
          <Link href={`/learn/${studentId}`} style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>
            ← {t.exitPractice}
          </Link>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,.5)' }}>{label} · {title}</span>
        </div>
        <div style={{ height: 8, background: 'rgba(255,255,255,.15)', borderRadius: 4 }}>
          <div style={{ height: 8, borderRadius: 4, background: 'var(--gold)', width: `${progress}%`, transition: 'width .3s' }} />
        </div>
      </div>
      <div style={{ padding: '1.5rem', maxWidth: 560, margin: '0 auto' }}>{children}</div>
    </div>
  )
}
