'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { Exercise, Module, Unit } from '@/lib/curriculum'
import { useModuleProgress } from '@/lib/use-progress'
import { SpeakButton, useVoice } from '@/components/SpeakButton'
import { RecordButton, recordingSupported } from '@/components/RecordButton'
import { cancelSpeech, firstVariant, speak } from '@/lib/speak'
import { uiStrings, type UiStrings } from '@/lib/ui-strings'

interface Props {
  modules: Module[]
  moduleBase: string   // e.g. '/module' or '/en/module'
  pdfBase: string      // e.g. '/api/pdf/pt' or '/api/pdf/en'
  progressKey: string  // localStorage key (teacher mode only)
  studentId?: string   // if provided, progress is read from and saved to the DB
  /**
   * BCP-47 tag of the language being taught, for speech synthesis. In both
   * curricula the `pt` field holds the target language, so this one tag covers
   * vocabulary, grammar examples and dialogue.
   */
  lang: string
}

export function LessonPageView({ modules, moduleBase, pdfBase, progressKey, studentId, lang }: Props) {
  const { mod: modId, unit: unitIndexStr } = useParams<{ mod: string; unit: string }>()
  const router = useRouter()
  const unitIndex = parseInt(unitIndexStr)
  const mod = modules.find(m => m.id === modId)
  const unit = mod?.units[unitIndex]

  const { done: completed, markDone } = useModuleProgress(modId, progressKey, studentId)
  const audio = useVoice(lang)
  const t = uiStrings(lang)
  const [step, setStep] = useState(0)

  /**
   * Reports one answered item. Only students are recorded — when the teacher
   * browses the course there is no studentId and nothing is stored.
   * Fire-and-forget: a failed save must never block the lesson.
   */
  const recordAttempt = useCallback<RecordAttempt>(a => {
    if (!studentId) return
    fetch('/api/attempts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, moduleId: modId, unitIndex, ...a }),
    }).catch(() => {})
  }, [studentId, modId, unitIndex])
  const [exerciseAnswers, setExerciseAnswers] = useState<Record<string, string | number>>({})
  const [revealed, setRevealed] = useState<Record<string, boolean>>({})

  const isDone = completed.includes(unitIndex)

  if (!mod || !unit) return <div style={{ padding: '2rem', color: 'var(--ink3)' }}>{t.lessonNotFound}</div>

  const steps = [t.steps.objectives, t.steps.vocabulary, t.steps.grammar, t.steps.dialogue, t.steps.exercises, t.steps.culture]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      {/* Top bar */}
      <div style={{ position: 'sticky', top: 0, background: '#fff', borderBottom: '1px solid var(--border)', padding: '.85rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10 }}>
        <Link href={`${moduleBase}/${modId}`} style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: 13, color: 'var(--ink3)', textDecoration: 'none' }}>
          ← {t.back}
        </Link>
        <div style={{ fontSize: 12, color: 'var(--ink3)', textAlign: 'center' }}>
          {mod.label} · {t.unit} {unitIndex + 1}/{mod.units.length}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
          <a
            href={`${pdfBase}/${modId}/${unitIndex}`}
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
            {mod.label} · {mod.name} · {t.unit} {unitIndex + 1}
          </div>
          <h2 style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 22, fontWeight: 600, marginBottom: '.35rem' }}>{unit.title}</h2>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,.6)', lineHeight: 1.55 }}>{unit.sub} · {unit.duration}</p>
          {isDone && <div style={{ marginTop: '.75rem', display: 'inline-flex', alignItems: 'center', gap: '.35rem', fontSize: 12, color: 'var(--green-light)', background: 'rgba(45,106,79,.3)', borderRadius: 6, padding: '.2rem .6rem' }}>✓ {t.completed}</div>}
        </div>

        {/* Step tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: '1.1rem', overflowX: 'auto', paddingBottom: 2 }}>
          {steps.map((s, i) => (
            <button
              key={s}
              onClick={() => setStep(i)}
              style={{ padding: '.35rem .75rem', borderRadius: 20, fontSize: 12, fontWeight: 600, border: '1.5px solid', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'inherit', background: step === i ? 'var(--ink)' : '#fff', color: step === i ? '#fff' : 'var(--ink3)', borderColor: step === i ? 'var(--ink)' : 'var(--border)' }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Content area */}
        {step === 0 && <ObjectivesStep unit={unit} t={t} />}
        {step === 1 && <VocabStep unit={unit} lang={lang} audio={audio} t={t} />}
        {step === 2 && <GrammarStep unit={unit} lang={lang} audio={audio} t={t} />}
        {step === 3 && <DialogueStep unit={unit} lang={lang} audio={audio} t={t} />}
        {step === 4 && (
          <ExercisesStep
            unit={unit}
            answers={exerciseAnswers}
            setAnswers={setExerciseAnswers}
            revealed={revealed}
            setRevealed={setRevealed}
            onAnswer={recordAttempt}
            t={t}
          />
        )}
        {step === 5 && <CultureStep unit={unit} t={t} />}

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
              onClick={() => { markDone(unitIndex); router.push(`${moduleBase}/${modId}`) }}
              style={{ flex: 1, padding: '.8rem', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', border: 'none', background: 'var(--green)', color: '#fff' }}
            >
              {isDone ? `✓ ${t.completed}` : `${t.markAsDone} ✓`}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ── STEP COMPONENTS ──────────────────────────────────────────────────────────

function SectionHeading({ icon, label }: { icon: string; label: string }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--ink3)', marginBottom: '.6rem', display: 'flex', alignItems: 'center', gap: '.4rem' }}>
      <span style={{ fontSize: 14 }}>{icon}</span> {label}
    </div>
  )
}

function ObjectivesStep({ unit, t }: { unit: Unit; t: UiStrings }) {
  return (
    <div>
      <SectionHeading icon="🎯" label={t.learningObjectives} />
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

type Audio = ReturnType<typeof useVoice>

type Attempt = {
  itemKey: string
  exerciseType: string
  question: string
  answer: string
  expected: string
  correct: boolean
}
type RecordAttempt = (a: Attempt) => void

function VocabStep({ unit, lang, audio, t }: { unit: Unit; lang: string; audio: Audio; t: UiStrings }) {
  const items = [
    ...unit.vocabulary.map(v => ({ v, extra: false })),
    ...(unit.extraVocab ?? []).map(v => ({ v, extra: true })),
  ]
  return (
    <div>
      <SectionHeading icon="📖" label={t.steps.vocabulary} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.5rem' }}>
        {items.map(({ v, extra }, i) => (
          <div key={i} style={{ background: '#fff', border: `1px ${extra ? 'dashed' : 'solid'} var(--border)`, borderRadius: 10, padding: '.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem' }}>
              <div style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 16, fontWeight: 600, color: 'var(--ink)', flex: 1 }}>{v.pt}</div>
              <SpeakButton text={firstVariant(v.pt)} lang={lang} voice={audio.voice} ready={audio.ready} listen={t.listen} />
            </div>
            <div style={{ fontSize: 12, color: 'var(--ink3)', margin: '.15rem 0 .4rem' }}>{v.en}</div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.4rem' }}>
              <div style={{ fontSize: 12, color: 'var(--ink2)', fontStyle: 'italic', lineHeight: 1.45, flex: 1 }}>{v.ex}</div>
              <SpeakButton text={v.ex} lang={lang} voice={audio.voice} ready={audio.ready} listen={t.listen} />
            </div>
            <div style={{ fontSize: 11, color: 'var(--ink3)', marginTop: 2 }}>{v.exEn}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function GrammarStep({ unit, lang, audio, t }: { unit: Unit; lang: string; audio: Audio; t: UiStrings }) {
  const g = unit.grammar
  const allExamples = [...g.examples, ...(g.extendedExamples ?? [])]
  return (
    <div>
      <SectionHeading icon="⚙️" label={t.steps.grammar} />
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
            {allExamples.map((ex, i) => (
              <div key={i} style={{ display: 'flex', gap: '.6rem', fontSize: 13, padding: '.35rem 0', borderBottom: i < allExamples.length - 1 ? '1px solid var(--border)' : 'none', alignItems: 'center' }}>
                <SpeakButton text={ex.pt} lang={lang} voice={audio.voice} ready={audio.ready} listen={t.listen} />
                <span style={{ fontWeight: 500, flex: 1 }}>{ex.pt}</span>
                <span style={{ color: 'var(--ink3)', flex: 1 }}>{ex.en}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {unit.commonMistakes && unit.commonMistakes.length > 0 && (
        <div style={{ marginTop: '.75rem', display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
          <SectionHeading icon="⚠️" label={t.commonMistakes} />
          {unit.commonMistakes.map((m, i) => (
            <div key={i} style={{ background: '#fdecea', borderRadius: 8, padding: '.6rem .85rem' }}>
              <div style={{ fontSize: 13, color: '#c0392b', fontWeight: 600, textDecoration: 'line-through', marginBottom: 2 }}>✗ {m.wrong}</div>
              <div style={{ fontSize: 13, color: 'var(--green)', fontWeight: 600, marginBottom: 2 }}>✓ {m.correct}</div>
              {(m.note ?? m.en) && <div style={{ fontSize: 12, color: 'var(--ink2)' }}>{m.note ?? m.en}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function DialogueStep({ unit, lang, audio, t }: { unit: Unit; lang: string; audio: Audio; t: UiStrings }) {
  const d = unit.dialogue
  const [playingAll, setPlayingAll] = useState(false)
  const [current, setCurrent] = useState(-1)
  const [slow, setSlow] = useState(false)
  const [micError, setMicError] = useState('')
  const [canRecord, setCanRecord] = useState(false)
  // Lets an in-flight sequence know it was cancelled without racing state.
  const runId = useRef(0)

  useEffect(() => { setCanRecord(recordingSupported()) }, [])

  useEffect(() => () => { runId.current++; cancelSpeech() }, [])

  async function playAll() {
    if (playingAll) {
      runId.current++
      cancelSpeech()
      setPlayingAll(false)
      setCurrent(-1)
      return
    }

    const run = ++runId.current
    setPlayingAll(true)
    for (let i = 0; i < d.lines.length; i++) {
      if (runId.current !== run) return
      setCurrent(i)
      await speak(d.lines[i].pt, lang, audio.voice, slow ? 0.65 : 0.95)
      // A short gap makes the exchange sound like two people, not one block.
      await new Promise(r => setTimeout(r, 350))
    }
    if (runId.current !== run) return
    setPlayingAll(false)
    setCurrent(-1)
  }

  return (
    <div>
      <SectionHeading icon="💬" label={t.steps.dialogue} />
      <div style={{ fontSize: 12, color: 'var(--ink3)', fontStyle: 'italic', background: 'var(--paper)', borderRadius: 8, padding: '.5rem .75rem', marginBottom: '.75rem' }}>
        📍 {d.scene}
      </div>
      {audio.ready && (
        <div style={{ display: 'flex', gap: '.5rem', marginBottom: '.75rem' }}>
          <button
            onClick={playAll}
            style={{ padding: '.45rem .85rem', borderRadius: 8, border: '1px solid var(--border)', background: playingAll ? 'var(--ink)' : '#fff', color: playingAll ? '#fff' : 'var(--ink)', fontSize: 13, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}
          >
            {playingAll ? `■ ${t.stop}` : `▶ ${t.playDialogue}`}
          </button>
          <button
            onClick={() => setSlow(v => !v)}
            aria-pressed={slow}
            style={{ padding: '.45rem .75rem', borderRadius: 8, border: `1px solid ${slow ? 'var(--ink)' : 'var(--border)'}`, background: slow ? 'var(--paper)' : '#fff', color: slow ? 'var(--ink)' : 'var(--ink3)', fontSize: 13, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}
          >
            🐢 {t.slow}
          </button>
        </div>
      )}
      {canRecord && (
        <div style={{ fontSize: 11.5, color: 'var(--ink3)', lineHeight: 1.5, marginBottom: '.65rem', background: 'var(--paper)', border: '1px solid var(--border)', borderRadius: 8, padding: '.5rem .7rem' }}>
          🎤 {t.recordingStaysHere}
        </div>
      )}
      {micError && (
        <div style={{ fontSize: 12, color: 'var(--red)', background: '#fdecea', border: '1px solid #f5c6c2', borderRadius: 8, padding: '.5rem .7rem', marginBottom: '.65rem' }}>
          {micError}
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
        {d.lines.map((line, i) => (
          <div key={i} style={{ display: 'flex', gap: '.65rem', alignItems: 'flex-start', background: current === i ? 'var(--gold-light)' : 'transparent', borderRadius: 8, padding: current === i ? '.4rem' : '.4rem', margin: current === i ? '-.4rem' : '-.4rem', transition: 'background .2s' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: 'var(--font-fraunces), Fraunces, serif', background: line.sp === 'a' ? 'var(--ink)' : 'var(--gold)', color: line.sp === 'a' ? 'var(--cream)' : 'var(--ink)' }}>
              {line.sp === 'a' ? 'S' : 'M'}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.4rem' }}>
                <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.4, flex: 1 }}>{line.pt}</div>
                <SpeakButton text={line.pt} lang={lang} voice={audio.voice} ready={audio.ready} rate={slow ? 0.65 : 0.95} listen={t.listen} />
                <RecordButton
                  labels={{ record: t.record, recordAgain: t.recordAgain, stopRecording: t.stopRecording, playYours: t.playYours, micDenied: t.micDenied }}
                  onError={setMicError}
                />
              </div>
              <div style={{ fontSize: 12, color: 'var(--ink3)', marginTop: 2 }}>{line.en}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ExercisesStep({
  unit, answers, setAnswers, revealed, setRevealed, onAnswer, t,
}: {
  unit: Unit
  answers: Record<string, string | number>
  setAnswers: (v: Record<string, string | number>) => void
  revealed: Record<string, boolean>
  setRevealed: (v: Record<string, boolean>) => void
  onAnswer: RecordAttempt
  t: UiStrings
}) {
  const [showExtra, setShowExtra] = useState(false)
  const extra = unit.extraExercises ?? []
  const extraCount = extra.reduce((n, ex) => n + ex.items.length, 0)

  return (
    <div>
      <SectionHeading icon="✏️" label={t.steps.exercises} />
      {unit.exercises.map((ex, ei) => (
        <ExerciseCard
          key={`c${ei}`} ex={ex} keyPrefix={`c${ei}`}
          answers={answers} setAnswers={setAnswers}
          revealed={revealed} setRevealed={setRevealed}
          onAnswer={onAnswer}
          t={t}
        />
      ))}

      {/* Extra practice — static exercises from the curriculum, unlocked on demand */}
      {extra.length > 0 && (
        showExtra ? (
          <>
            <div style={{ margin: '1.25rem 0 .6rem', display: 'flex', alignItems: 'center', gap: '.5rem' }}>
              <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--ink3)' }}>
                {t.extraPractice}
              </div>
              <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            </div>
            {extra.map((ex, ei) => (
              <ExerciseCard
                key={`x${ei}`} ex={ex} keyPrefix={`x${ei}`}
                answers={answers} setAnswers={setAnswers}
                revealed={revealed} setRevealed={setRevealed}
                onAnswer={onAnswer}
                t={t}
              />
            ))}
          </>
        ) : (
          <button
            onClick={() => setShowExtra(true)}
            style={{ width: '100%', marginTop: '1rem', padding: '.85rem', border: '1.5px dashed var(--border)', borderRadius: 12, background: 'var(--paper)', color: 'var(--ink2)', fontSize: 14, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}
          >
            {t.moreExercises(extraCount)}
          </button>
        )
      )}
    </div>
  )
}

function ExerciseCard({
  ex, keyPrefix, answers, setAnswers, revealed, setRevealed, onAnswer, t,
}: {
  ex: Exercise
  keyPrefix: string
  answers: Record<string, string | number>
  setAnswers: (v: Record<string, string | number>) => void
  revealed: Record<string, boolean>
  setRevealed: (v: Record<string, boolean>) => void
  onAnswer: RecordAttempt
  t: UiStrings
}) {
  return (
    <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '1rem 1.1rem', marginBottom: '.6rem' }}>
      <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--ink3)', marginBottom: '.35rem' }}>{ex.type}</div>
      <div style={{ fontSize: 13, color: 'var(--ink2)', marginBottom: '.75rem', lineHeight: 1.4 }}>{ex.instruction}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
        {ex.items.map((item, ii) => {
          const key = `${keyPrefix}-${ii}`
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
                          // Correctness comes from `oi`, not the `correct` above:
                          // that one still holds the previous answer at this point.
                          onAnswer({
                            itemKey: key,
                            exerciseType: ex.type,
                            question: item.q,
                            answer: opt,
                            expected: item.opts?.[item.ans as number] ?? String(item.ans),
                            correct: oi === item.ans,
                          })
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
                  <input type="text" value={(userAns as string) ?? ''} onChange={e => setAnswers({ ...answers, [key]: e.target.value })} placeholder={t.typeYourAnswer} style={{ flex: 1, padding: '.4rem .7rem', border: `1.5px solid ${isRevealed ? (correct ? 'var(--green)' : 'var(--red)') : 'var(--border)'}`, borderRadius: 6, fontSize: 14, fontFamily: 'inherit', background: isRevealed ? (correct ? '#e8fdf0' : '#fdecea') : '#fff' }} />
                  <button
                    onClick={() => {
                      setRevealed({ ...revealed, [key]: true })
                      onAnswer({
                        itemKey: key,
                        exerciseType: ex.type,
                        question: item.q,
                        answer: (userAns as string) ?? '',
                        expected: String(item.ans),
                        correct,
                      })
                    }}
                    style={{ padding: '.4rem .8rem', border: '1.5px solid var(--border)', borderRadius: 6, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', background: 'var(--paper)' }}
                  >{t.check}</button>
                  {isRevealed && !correct && <span style={{ fontSize: 12, color: 'var(--green)' }}>&rarr; {item.ans}</span>}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function CultureStep({ unit, t }: { unit: Unit; t: UiStrings }) {
  const c = unit.culture
  return (
    <div>
      <SectionHeading icon="🌍" label={t.culturalNote} />
      <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ background: 'var(--gold-light)', borderBottom: '1px solid #e8d48a', padding: '.85rem 1.1rem' }}>
          <div style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>{c.title}</div>
        </div>
        <div style={{ padding: '.85rem 1.1rem', fontSize: 14, color: 'var(--ink2)', lineHeight: 1.65 }}>{c.text}</div>
      </div>
      {unit.teacherTip && (
        <div style={{ marginTop: '.75rem', background: '#edf7ed', border: '1px solid #b7e4c7', borderRadius: 8, padding: '.6rem .85rem' }}>
          <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.05em', color: 'var(--green)', marginBottom: 3 }}>📋 {t.teacherTip}</div>
          <div style={{ fontSize: 13, color: '#1f6b2e', lineHeight: 1.5 }}>{unit.teacherTip}</div>
        </div>
      )}
    </div>
  )
}
