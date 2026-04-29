'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { MODULES, Unit } from '@/lib/curriculum'

type GeneratedExercise =
  | { type: 'multiple_choice'; question: string; options: string[]; answer: number; explanation?: string }
  | { type: 'fill_blank'; question: string; answer: string }
  | { type: 'translation'; english: string; portuguese: string }

export default function LessonPage() {
  const { mod: modId, unit: unitIndexStr } = useParams<{ mod: string; unit: string }>()
  const router = useRouter()
  const unitIndex = parseInt(unitIndexStr)
  const mod = MODULES.find(m => m.id === modId)
  const unit = mod?.units[unitIndex]

  const [isDone, setIsDone] = useState(false)
  const [step, setStep] = useState(0)
  const [exerciseAnswers, setExerciseAnswers] = useState<Record<string, string | number>>({})
  const [revealed, setRevealed] = useState<Record<string, boolean>>({})
  const [extraExercises, setExtraExercises] = useState<GeneratedExercise[] | null>(null)
  const [generating, setGenerating] = useState(false)
  const [genError, setGenError] = useState('')

  useEffect(() => {
    try {
      const saved = localStorage.getItem('lk_progress')
      if (saved) {
        const all = JSON.parse(saved)
        setIsDone((all[modId] ?? []).includes(unitIndex))
      }
    } catch {}
  }, [modId, unitIndex])

  if (!mod || !unit) return <div style={{ padding: '2rem', color: 'var(--ink3)' }}>Lesson not found.</div>

  const steps = ['Objectives', 'Vocabulary', 'Grammar', 'Dialogue', 'Exercises', 'Culture']

  function markDone() {
    try {
      const saved = localStorage.getItem('lk_progress')
      const all = saved ? JSON.parse(saved) : {}
      const modProgress: number[] = all[modId] ?? []
      if (!modProgress.includes(unitIndex)) modProgress.push(unitIndex)
      all[modId] = modProgress
      localStorage.setItem('lk_progress', JSON.stringify(all))
      setIsDone(true)
    } catch {}
  }

  async function generateExtraExercises() {
    setGenerating(true)
    setGenError('')
    try {
      const res = await fetch('/api/exercises', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ unit }),
      })
      const data = await res.json()
      if (data.exercises) {
        setExtraExercises(data.exercises)
      } else {
        setGenError(data.error || 'Failed to generate exercises.')
      }
    } catch {
      setGenError('Network error. Check your API key in .env.')
    }
    setGenerating(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      {/* Top bar */}
      <div style={{ position: 'sticky', top: 0, background: '#fff', borderBottom: '1px solid var(--border)', padding: '.85rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10 }}>
        <Link href={`/module/${modId}`} style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: 13, color: 'var(--ink3)', textDecoration: 'none' }}>
          ← Back
        </Link>
        <div style={{ fontSize: 12, color: 'var(--ink3)', textAlign: 'center' }}>
          {mod.label} · Unit {unitIndex + 1}/{mod.units.length}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
          <a
            href={`/api/pdf/${modId}/${unitIndex}`}
            download
            style={{ fontSize: 12, color: 'var(--ink3)', textDecoration: 'none', border: '1px solid var(--border)', borderRadius: 6, padding: '.2rem .55rem', background: 'var(--paper)' }}
          >
            ↓ PDF
          </a>
          <span style={{ fontSize: 12, color: 'var(--ink3)' }}>{step + 1}/{steps.length}</span>
        </div>
      </div>

      <div style={{ maxWidth: 620, margin: '0 auto', padding: '1.5rem 1.5rem 5rem' }}>
        {/* Hero card */}
        <div style={{ background: 'var(--ink)', color: 'var(--cream)', borderRadius: 16, padding: '1.5rem', marginBottom: '1.25rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', fontSize: 56, opacity: .2, pointerEvents: 'none' }}>{unit.emoji}</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,.45)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '.5rem' }}>
            {mod.label} · {mod.name} · Unit {unitIndex + 1}
          </div>
          <h2 style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 22, fontWeight: 600, marginBottom: '.35rem' }}>{unit.title}</h2>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,.6)', lineHeight: 1.55 }}>{unit.sub} · {unit.duration}</p>
          {isDone && <div style={{ marginTop: '.75rem', display: 'inline-flex', alignItems: 'center', gap: '.35rem', fontSize: 12, color: 'var(--green-light)', background: 'rgba(45,106,79,.3)', borderRadius: 6, padding: '.2rem .6rem' }}>✓ Completed</div>}
        </div>

        {/* Step tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: '1.1rem', overflowX: 'auto', paddingBottom: 2 }}>
          {steps.map((s, i) => (
            <button
              key={s}
              onClick={() => setStep(i)}
              style={{
                padding: '.35rem .75rem', borderRadius: 20, fontSize: 12, fontWeight: 600,
                border: '1.5px solid', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'inherit',
                background: step === i ? 'var(--ink)' : '#fff',
                color: step === i ? '#fff' : 'var(--ink3)',
                borderColor: step === i ? 'var(--ink)' : 'var(--border)',
              }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Content area */}
        {step === 0 && <ObjectivesStep unit={unit} />}
        {step === 1 && <VocabStep unit={unit} />}
        {step === 2 && <GrammarStep unit={unit} />}
        {step === 3 && <DialogueStep unit={unit} />}
        {step === 4 && (
          <ExercisesStep
            unit={unit}
            answers={exerciseAnswers}
            setAnswers={setExerciseAnswers}
            revealed={revealed}
            setRevealed={setRevealed}
            extraExercises={extraExercises}
            generating={generating}
            genError={genError}
            onGenerate={generateExtraExercises}
          />
        )}
        {step === 5 && <CultureStep unit={unit} />}

        {/* Bottom nav */}
        <div style={{ display: 'flex', gap: '.6rem', marginTop: '1.5rem' }}>
          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)} style={{ flex: 1, padding: '.8rem', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', border: '1.5px solid var(--border)', background: 'var(--paper)', color: 'var(--ink)' }}>
              ← {steps[step - 1]}
            </button>
          )}
          {step < steps.length - 1 ? (
            <button onClick={() => setStep(s => s + 1)} style={{ flex: 1, padding: '.8rem', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', border: 'none', background: 'var(--ink)', color: '#fff' }}>
              {steps[step + 1]} →
            </button>
          ) : (
            <button
              onClick={() => { markDone(); router.push(`/module/${modId}`) }}
              style={{ flex: 1, padding: '.8rem', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', border: 'none', background: isDone ? 'var(--green)' : 'var(--green)', color: '#fff' }}
            >
              {isDone ? '✓ Completed' : 'Mark as done ✓'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ── STEP COMPONENTS ──

function SectionHeading({ icon, label }: { icon: string; label: string }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--ink3)', marginBottom: '.6rem', display: 'flex', alignItems: 'center', gap: '.4rem' }}>
      <span style={{ fontSize: 14 }}>{icon}</span> {label}
    </div>
  )
}

function ObjectivesStep({ unit }: { unit: Unit }) {
  return (
    <div>
      <SectionHeading icon="🎯" label="Learning Objectives" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
        {unit.objectives.map((obj, i) => (
          <div key={i} style={{ background: 'var(--green-light)', borderRadius: 8, padding: '.6rem .85rem', fontSize: 13, color: 'var(--green)', display: 'flex', alignItems: 'flex-start', gap: '.5rem', lineHeight: 1.4 }}>
            <span style={{ fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
            {obj}
          </div>
        ))}
      </div>
    </div>
  )
}

function VocabStep({ unit }: { unit: Unit }) {
  return (
    <div>
      <SectionHeading icon="📖" label="Vocabulary" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.5rem' }}>
        {unit.vocabulary.map((v, i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 10, padding: '.75rem' }}>
            <div style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 16, fontWeight: 600, color: 'var(--ink)' }}>{v.pt}</div>
            <div style={{ fontSize: 12, color: 'var(--ink3)', margin: '.15rem 0 .4rem' }}>{v.en}</div>
            <div style={{ fontSize: 12, color: 'var(--ink2)', fontStyle: 'italic', lineHeight: 1.45 }}>{v.ex}</div>
            <div style={{ fontSize: 11, color: 'var(--ink3)', marginTop: 2 }}>{v.exEn}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function GrammarStep({ unit }: { unit: Unit }) {
  const g = unit.grammar
  return (
    <div>
      <SectionHeading icon="⚙️" label="Grammar" />
      <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ background: 'var(--ink)', color: 'var(--cream)', padding: '.85rem 1.1rem' }}>
          <div style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 16, fontWeight: 600, marginBottom: '.2rem' }}>{g.title}</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,.6)', lineHeight: 1.5 }}>{g.explain}</div>
        </div>
        <div style={{ padding: '.85rem 1.1rem' }}>
          <div style={{ fontFamily: 'monospace', fontSize: 13, background: 'var(--paper)', border: '1px solid var(--border)', borderRadius: 6, padding: '.5rem .75rem', marginBottom: '.75rem', color: 'var(--green)' }}>
            {g.structure}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
            {g.examples.map((ex, i) => (
              <div key={i} style={{ display: 'flex', gap: '.75rem', fontSize: 13, padding: '.35rem 0', borderBottom: i < g.examples.length - 1 ? '1px solid var(--border)' : 'none', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 500, flex: 1 }}>{ex.pt}</span>
                <span style={{ color: 'var(--ink3)', flex: 1 }}>{ex.en}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function DialogueStep({ unit }: { unit: Unit }) {
  const d = unit.dialogue
  return (
    <div>
      <SectionHeading icon="💬" label="Dialogue" />
      <div style={{ fontSize: 12, color: 'var(--ink3)', fontStyle: 'italic', background: 'var(--paper)', borderRadius: 8, padding: '.5rem .75rem', marginBottom: '.75rem' }}>
        📍 {d.scene}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
        {d.lines.map((line, i) => (
          <div key={i} style={{ display: 'flex', gap: '.65rem', alignItems: 'flex-start' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: 'var(--font-fraunces), Fraunces, serif', background: line.sp === 'a' ? 'var(--ink)' : 'var(--gold)', color: line.sp === 'a' ? 'var(--cream)' : 'var(--ink)' }}>
              {line.sp === 'a' ? 'S' : 'M'}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.4 }}>{line.pt}</div>
              <div style={{ fontSize: 12, color: 'var(--ink3)', marginTop: 2 }}>{line.en}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ExercisesStep({
  unit, answers, setAnswers, revealed, setRevealed,
  extraExercises, generating, genError, onGenerate
}: {
  unit: Unit
  answers: Record<string, string | number>
  setAnswers: (v: Record<string, string | number>) => void
  revealed: Record<string, boolean>
  setRevealed: (v: Record<string, boolean>) => void
  extraExercises: GeneratedExercise[] | null
  generating: boolean
  genError: string
  onGenerate: () => void
}) {
  return (
    <div>
      <SectionHeading icon="✏️" label="Exercises" />

      {[...unit.exercises, ...(unit.extraExercises ?? [])].map((ex, ei) => (
        <div key={ei} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '1rem 1.1rem', marginBottom: '.6rem' }}>
          <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--ink3)', marginBottom: '.35rem' }}>{ex.type}</div>
          <div style={{ fontSize: 13, color: 'var(--ink2)', marginBottom: '.75rem', lineHeight: 1.4 }}>{ex.instruction}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
            {ex.items.map((item, ii) => {
              const key = `${ei}-${ii}`
              const userAns = answers[key]
              const isRevealed = revealed[key]
              const correct = typeof item.ans === 'number'
                ? userAns === item.ans
                : (userAns as string)?.toLowerCase().trim() === (item.ans as string).toLowerCase().trim()
              return (
                <div key={ii} style={{ fontSize: 14, color: 'var(--ink)' }}>
                  <div style={{ fontWeight: 400, lineHeight: 1.5, marginBottom: '.3rem' }}>{item.q}</div>
                  {item.opts ? (
                    <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap' }}>
                      {item.opts.map((opt, oi) => {
                        let bg = '#fff', borderColor = 'var(--border)', color = 'var(--ink)'
                        if (userAns === oi) {
                          bg = isRevealed ? (oi === item.ans ? '#e8fdf0' : '#fdecea') : 'var(--ink)'
                          borderColor = isRevealed ? (oi === item.ans ? 'var(--green)' : 'var(--red)') : 'var(--ink)'
                          color = isRevealed ? (oi === item.ans ? 'var(--green)' : 'var(--red)') : '#fff'
                        }
                        return (
                          <button
                            key={oi}
                            onClick={() => {
                              setAnswers({ ...answers, [key]: oi })
                              setRevealed({ ...revealed, [key]: true })
                            }}
                            style={{ padding: '.3rem .7rem', border: `1.5px solid ${borderColor}`, borderRadius: 6, fontSize: 14, background: bg, color, cursor: 'pointer', fontFamily: 'inherit' }}
                          >
                            {opt}
                          </button>
                        )
                      })}
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
                      <input
                        type="text"
                        value={(userAns as string) ?? ''}
                        onChange={e => setAnswers({ ...answers, [key]: e.target.value })}
                        placeholder="Type your answer..."
                        style={{ flex: 1, padding: '.4rem .7rem', border: `1.5px solid ${isRevealed ? (correct ? 'var(--green)' : 'var(--red)') : 'var(--border)'}`, borderRadius: 6, fontSize: 14, fontFamily: 'inherit', background: isRevealed ? (correct ? '#e8fdf0' : '#fdecea') : '#fff' }}
                      />
                      <button
                        onClick={() => setRevealed({ ...revealed, [key]: true })}
                        style={{ padding: '.4rem .8rem', border: '1.5px solid var(--border)', borderRadius: 6, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', background: 'var(--paper)' }}
                      >
                        Check
                      </button>
                      {isRevealed && !correct && (
                        <span style={{ fontSize: 12, color: 'var(--green)' }}>→ {item.ans}</span>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}

      {/* AI Extra Exercises */}
      <div style={{ marginTop: '1rem', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ background: 'var(--gold-light)', borderBottom: '1px solid #e8d48a', padding: '.75rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#7a5a0a' }}>✨ AI-Generated Exercises</div>
            <div style={{ fontSize: 11, color: '#9a6b0a', marginTop: 1 }}>3 extra practice exercises from Claude</div>
          </div>
          <button
            onClick={onGenerate}
            disabled={generating}
            style={{ padding: '.45rem .9rem', background: generating ? 'var(--border)' : 'var(--ink)', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: generating ? 'default' : 'pointer', fontFamily: 'inherit' }}
          >
            {generating ? '⏳ Generating...' : extraExercises ? '↺ Regenerate' : 'Generate →'}
          </button>
        </div>
        {genError && <div style={{ padding: '.75rem 1rem', fontSize: 13, color: 'var(--red)' }}>{genError}</div>}
        {extraExercises && (
          <div style={{ padding: '.75rem 1rem', display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
            {extraExercises.map((ex, i) => (
              <ExtraExerciseItem key={i} ex={ex} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ExtraExerciseItem({ ex, index }: { ex: GeneratedExercise; index: number }) {
  const [selected, setSelected] = useState<number | null>(null)
  const [typed, setTyped] = useState('')
  const [revealed, setReveal] = useState(false)

  if (ex.type === 'multiple_choice') {
    return (
      <div>
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: '.4rem' }}>{index + 1}. {ex.question}</div>
        <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap' }}>
          {ex.options.map((opt, oi) => {
            let bg = '#fff', borderColor = 'var(--border)', color = 'var(--ink)'
            if (selected === oi) {
              bg = revealed ? (oi === ex.answer ? '#e8fdf0' : '#fdecea') : 'var(--ink)'
              borderColor = revealed ? (oi === ex.answer ? 'var(--green)' : 'var(--red)') : 'var(--ink)'
              color = revealed ? (oi === ex.answer ? 'var(--green)' : 'var(--red)') : '#fff'
            }
            return (
              <button key={oi} onClick={() => { setSelected(oi); setReveal(true) }} style={{ padding: '.3rem .7rem', border: `1.5px solid ${borderColor}`, borderRadius: 6, fontSize: 13, background: bg, color, cursor: 'pointer', fontFamily: 'inherit' }}>
                {opt}
              </button>
            )
          })}
        </div>
        {revealed && ex.explanation && <div style={{ fontSize: 12, color: 'var(--ink3)', marginTop: '.35rem', fontStyle: 'italic' }}>{ex.explanation}</div>}
      </div>
    )
  }

  if (ex.type === 'fill_blank') {
    const correct = typed.toLowerCase().trim() === ex.answer.toLowerCase().trim()
    return (
      <div>
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: '.4rem' }}>{index + 1}. {ex.question}</div>
        <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
          <input type="text" value={typed} onChange={e => setTyped(e.target.value)} style={{ flex: 1, padding: '.4rem .7rem', border: `1.5px solid ${revealed ? (correct ? 'var(--green)' : 'var(--red)') : 'var(--border)'}`, borderRadius: 6, fontSize: 13, fontFamily: 'inherit' }} />
          <button onClick={() => setReveal(true)} style={{ padding: '.4rem .8rem', border: '1.5px solid var(--border)', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', background: 'var(--paper)' }}>Check</button>
          {revealed && !correct && <span style={{ fontSize: 12, color: 'var(--green)' }}>→ {ex.answer}</span>}
        </div>
      </div>
    )
  }

  // translation
  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 500, marginBottom: '.4rem' }}>{index + 1}. Translate: &ldquo;{ex.english}&rdquo;</div>
      <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
        <input type="text" value={typed} onChange={e => setTyped(e.target.value)} style={{ flex: 1, padding: '.4rem .7rem', border: `1.5px solid ${revealed ? 'var(--green)' : 'var(--border)'}`, borderRadius: 6, fontSize: 13, fontFamily: 'inherit' }} />
        <button onClick={() => setReveal(true)} style={{ padding: '.4rem .8rem', border: '1.5px solid var(--border)', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', background: 'var(--paper)' }}>Reveal</button>
      </div>
      {revealed && <div style={{ fontSize: 12, color: 'var(--green)', marginTop: '.3rem' }}>✓ {ex.portuguese}</div>}
    </div>
  )
}

function CultureStep({ unit }: { unit: Unit }) {
  const c = unit.culture
  return (
    <div>
      <SectionHeading icon="🇧🇷" label="Cultural Note" />
      <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ background: 'var(--gold-light)', borderBottom: '1px solid #e8d48a', padding: '.85rem 1.1rem' }}>
          <div style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>{c.title}</div>
        </div>
        <div style={{ padding: '.85rem 1.1rem', fontSize: 14, color: 'var(--ink2)', lineHeight: 1.65 }}>
          {c.text}
        </div>
      </div>
    </div>
  )
}
