'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { SpeakButton, useVoice } from '@/components/SpeakButton'
import { isCorrect, roundBounds, roundCount, roundOf, type DrillItem } from '@/lib/drill'
import { speak } from '@/lib/speak'
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
 * Every item makes a sound. Some are spoken the moment they appear because the
 * audio *is* the question; the rest hold their audio back until the answer is
 * out, since it would otherwise give the answer away.
 *
 * Takes `lang` rather than a resolved strings object: that object holds
 * functions, which cannot cross the server/client boundary.
 */
export function PracticeView({
  studentId, moduleId, unitIndex, unitTitle, moduleLabel, items, nextUnit, lang,
}: Props) {
  const t = uiStrings(lang)
  const audio = useVoice(lang)

  const [index, setIndex] = useState(0)
  const [choice, setChoice] = useState<number | null>(null)
  const [typed, setTyped] = useState('')
  const [picked, setPicked] = useState<number[]>([])
  const [checked, setChecked] = useState(false)
  const [rightCount, setRightCount] = useState(0)
  // Set when a round ends, so the learner gets a breather instead of the next
  // question appearing as if nothing had happened.
  const [resting, setResting] = useState(false)
  const [roundRight, setRoundRight] = useState(0)

  const item = items[index]
  const finished = index >= items.length
  const ordering = item?.kind === 'order'

  const rounds = roundCount(items.length)
  const round = roundOf(index, items.length)
  const bounds = roundBounds(round, items.length)
  const roundLength = bounds.end - bounds.start

  const assembled = ordering && item.tokens
    ? picked.map(i => item.tokens![i]).join(' ')
    : ''

  const given = item?.options ? choice : ordering ? assembled : typed
  const right = item ? isCorrect(item, given) : false
  const canCheck = item?.options
    ? choice !== null
    : ordering
      ? picked.length > 0
      : typed.trim().length > 0

  // Items whose question is the sound play on their own. The click that brought
  // the learner here counts as the gesture browsers want before audio.
  useEffect(() => {
    if (!item?.audio?.auto || !audio.ready) return
    speak(item.audio.text, lang, audio.voice)
  }, [item?.key, item?.audio?.auto, item?.audio?.text, audio.ready, audio.voice, lang])

  const check = useCallback(() => {
    if (!item || checked || !canCheck) return
    setChecked(true)
    if (right) {
      setRightCount(c => c + 1)
      setRoundRight(c => c + 1)
    }

    // Hearing the right form at the moment of judgement is the whole point of
    // the audio on a written exercise.
    if (item.audio && audio.ready) speak(item.audio.text, lang, audio.voice)

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
        answer: item.options
          ? (choice === null ? '' : item.options[choice])
          : ordering ? assembled : typed,
        expected: item.expected,
        correct: right,
      }),
    }).catch(() => {})
  }, [item, checked, canCheck, right, studentId, moduleId, unitIndex, choice, typed, ordering, assembled, audio.ready, audio.voice, lang])

  const advance = useCallback(() => {
    setChecked(false)
    setChoice(null)
    setTyped('')
    setPicked([])
    setIndex(i => {
      const next = i + 1
      // A boundary that is not the end of the unit earns a round screen.
      if (next < items.length && next === roundBounds(roundOf(i, items.length), items.length).end) {
        setResting(true)
      }
      return next
    })
  }, [items.length])

  const nextRound = useCallback(() => {
    setResting(false)
    setRoundRight(0)
  }, [])

  function restart() {
    setIndex(0); setChoice(null); setTyped(''); setPicked([])
    setChecked(false); setRightCount(0); setRoundRight(0); setResting(false)
  }

  if (items.length === 0) {
    return (
      <Shell studentId={studentId} t={t} title={unitTitle} label={moduleLabel} progress={0} round={1} rounds={1}>
        <Card><div style={{ fontSize: 14, color: 'var(--ink3)' }}>{t.practiceEmpty}</div></Card>
      </Shell>
    )
  }

  if (resting && !finished) {
    const previous = roundOf(index - 1, items.length)
    const { start, end } = roundBounds(previous, items.length)
    const size = end - start
    const pct = size ? Math.round((roundRight / size) * 100) : 0

    return (
      <Shell
        studentId={studentId} t={t} title={unitTitle} label={moduleLabel}
        progress={100} round={previous + 1} rounds={rounds}
      >
        <Card animateKey={`rest-${previous}`}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '.75rem' }}>
              <Medal />
            </div>
            <div style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 21, fontWeight: 700, marginBottom: '.2rem' }}>
              {t.roundDone}
            </div>
            <div style={{ fontSize: 13.5, color: 'var(--ink3)', marginBottom: '.2rem' }}>
              {t.roundLabel(previous + 1, rounds)} · {t.practiceScore(roundRight, size)} · {pct}%
            </div>
            <div style={{ fontSize: 13, color: 'var(--ink3)', marginBottom: '1.25rem' }}>
              {t.roundDoneHint}
            </div>

            <button
              onClick={nextRound}
              style={{ width: '100%', padding: '.9rem', background: 'var(--green)', color: '#fff', borderRadius: 12, border: 'none', fontSize: 15, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer', marginBottom: '.6rem' }}
            >
              {t.keepGoing} →
            </button>
            <Link href={`/learn/${studentId}`} style={{ ...secondaryBtn, display: 'block', textAlign: 'center', textDecoration: 'none' }}>
              {t.takeABreak}
            </Link>
          </div>
        </Card>
      </Shell>
    )
  }

  if (finished) {
    const pct = Math.round((rightCount / items.length) * 100)
    return (
      <Shell studentId={studentId} t={t} title={unitTitle} label={moduleLabel} progress={100} round={rounds} rounds={rounds}>
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

  const audioIsQuestion = Boolean(item.audio?.isQuestion)
  // Only reveal the text of a spoken question once we know this device cannot
  // speak at all. While that is still unknown, the player stands in its place.
  const revealSpokenText = audioIsQuestion && audio.supported === false
  // Word order has audio but nothing written to hang a small speaker off, and
  // its instruction says to listen — so it gets the big player too.
  const wantsBigPlayer = Boolean(
    item.audio && !item.audio.afterAnswer && (audioIsQuestion || !item.question),
  )

  return (
    <Shell
      studentId={studentId} t={t} title={unitTitle} label={moduleLabel}
      progress={roundLength ? ((index - bounds.start) / roundLength) * 100 : 0}
      round={round + 1} rounds={rounds}
    >
      <Card animateKey={index}>
        <div style={{ fontSize: 10.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--ink3)', marginBottom: '.5rem' }}>
          {item.type}
        </div>
        <div style={{ fontSize: 12.5, color: 'var(--ink3)', marginBottom: '.85rem', lineHeight: 1.45 }}>{item.instruction}</div>

        {revealSpokenText ? (
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: 19, lineHeight: 1.45, fontWeight: 500 }}>{item.question}</div>
            <div style={{ fontSize: 12, color: 'var(--ink3)', marginTop: '.5rem' }}>{t.noAudioHere}</div>
          </div>
        ) : wantsBigPlayer && audio.supported !== false ? (
          <BigPlayer
            text={item.audio!.text}
            lang={lang}
            voice={audio.voice}
            ready={audio.ready}
            label={t.playAudio}
            again={t.playAgain}
          />
        ) : item.question ? (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.6rem', marginBottom: '1.25rem' }}>
            <div style={{ fontSize: 19, lineHeight: 1.45, fontWeight: 500, flex: 1 }}>{item.question}</div>
            {item.audio && !item.audio.afterAnswer && (
              <SpeakButton text={item.audio.text} lang={lang} voice={audio.voice} ready={audio.ready} listen={t.playAudio} size="md" />
            )}
          </div>
        ) : null}

        {ordering ? (
          <TokenBoard
            tokens={item.tokens ?? []}
            picked={picked}
            onPick={i => !checked && setPicked(p => [...p, i])}
            onUnpick={at => !checked && setPicked(p => p.filter((_, k) => k !== at))}
            onClear={() => !checked && setPicked([])}
            checked={checked}
            right={right}
            t={t}
          />
        ) : item.options ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
            {item.options.map((opt, oi) => {
              const pickedOpt = choice === oi
              const isAnswer = oi === item.answerIndex
              let border = 'var(--border)', bg = '#fff', color = 'var(--ink)'
              if (checked && isAnswer) { border = 'var(--green)'; bg = '#eaf7ee'; color = '#1f6b2e' }
              else if (checked && pickedOpt) { border = 'var(--red)'; bg = '#fdecea'; color = 'var(--red)' }
              else if (pickedOpt) { border = 'var(--ink)'; bg = 'var(--paper)' }
              return (
                <div
                  key={oi}
                  className={checked && pickedOpt ? (right ? 'lk-pop' : 'lk-shake') : undefined}
                  // The padding lives on the button, not here: a row that looks
                  // tappable everywhere but only answers on the text line is
                  // worse than a small button, because it looks fine.
                  style={{ display: 'flex', alignItems: 'center', borderRadius: 12, border: `1.5px solid ${border}`, background: bg, overflow: 'hidden' }}
                >
                  <button
                    onClick={() => !checked && setChoice(oi)}
                    disabled={checked}
                    style={{ flex: 1, textAlign: 'left', minHeight: 48, padding: '.85rem 1rem', border: 'none', background: 'none', color, fontSize: 15.5, fontFamily: 'inherit', cursor: checked ? 'default' : 'pointer' }}
                  >
                    {opt}
                  </button>
                  {item.optionsSpeak && (
                    <span style={{ paddingRight: '.5rem', display: 'inline-flex' }}>
                      <SpeakButton text={opt} lang={lang} voice={audio.voice} ready={audio.ready} listen={t.playAudio} />
                    </span>
                  )}
                </div>
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
            className={checked ? (right ? 'lk-pop' : 'lk-shake') : undefined}
            autoFocus
            style={{ width: '100%', padding: '.85rem 1rem', fontSize: 16, borderRadius: 12, fontFamily: 'inherit', background: checked ? (right ? '#eaf7ee' : '#fdecea') : '#fff', border: `1.5px solid ${checked ? (right ? 'var(--green)' : 'var(--red)') : 'var(--border)'}`, outline: 'none' }}
          />
        )}

        {checked && (
          <div className="lk-rise" style={{ marginTop: '1rem', padding: '.85rem 1rem', borderRadius: 12, background: right ? '#eaf7ee' : '#fdecea', border: `1px solid ${right ? '#b7e4c7' : '#f5c6c2'}`, display: 'flex', alignItems: 'center', gap: '.6rem' }}>
            {right ? <CorrectMark /> : <WrongMark />}
            <div style={{ fontSize: 14, fontWeight: 700, color: right ? '#1f6b2e' : 'var(--red)', flex: 1 }}>
              {right ? t.correctFeedback : `${t.wrongFeedback} ${item.expected}`}
            </div>
            {item.audio && (
              <SpeakButton text={item.audio.text} lang={lang} voice={audio.voice} ready={audio.ready} listen={t.hearAnswer} />
            )}
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

/**
 * The player that stands in for a written question. Deliberately large: on a
 * phone it is the thing the learner reaches for several times per item.
 */
function BigPlayer({ text, lang, voice, ready, label, again }: {
  text: string
  lang: string
  voice: SpeechSynthesisVoice | null
  ready: boolean
  label: string
  again: string
}) {
  const [played, setPlayed] = useState(false)
  const [speaking, setSpeaking] = useState(false)

  const play = useCallback(async () => {
    if (!ready) return
    setSpeaking(true)
    setPlayed(true)
    await speak(text, lang, voice)
    setSpeaking(false)
  }, [text, lang, voice, ready])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
      <button
        onClick={play}
        disabled={!ready}
        aria-label={`${label}: ${text}`}
        className={speaking ? 'lk-pop' : undefined}
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.45rem',
          padding: '1.4rem 2.2rem', borderRadius: 18, cursor: ready ? 'pointer' : 'wait',
          border: `1.5px solid ${speaking ? 'var(--ink)' : 'var(--border)'}`,
          background: speaking ? 'var(--ink)' : 'var(--paper)',
          color: speaking ? '#fff' : 'var(--ink2)',
          fontFamily: 'inherit', transition: 'background .15s, color .15s, border-color .15s',
        }}
      >
        <span style={{ fontSize: 30, lineHeight: 1 }}>{speaking ? '🔈' : '🔊'}</span>
        <span style={{ fontSize: 12.5, fontWeight: 600 }}>{played ? again : label}</span>
      </button>
    </div>
  )
}

/** Tap the words into place; tap one in the answer row to take it back. */
function TokenBoard({ tokens, picked, onPick, onUnpick, onClear, checked, right, t }: {
  tokens: string[]
  picked: number[]
  onPick: (index: number) => void
  onUnpick: (at: number) => void
  onClear: () => void
  checked: boolean
  right: boolean
  t: ReturnType<typeof uiStrings>
}) {
  const used = new Set(picked)

  return (
    <div>
      <div
        className={checked ? (right ? 'lk-pop' : 'lk-shake') : undefined}
        style={{
          minHeight: 62, display: 'flex', flexWrap: 'wrap', gap: '.4rem', alignItems: 'center',
          padding: '.7rem', borderRadius: 12, marginBottom: '.85rem',
          background: checked ? (right ? '#eaf7ee' : '#fdecea') : 'var(--paper)',
          border: `1.5px dashed ${checked ? (right ? 'var(--green)' : 'var(--red)') : 'var(--border)'}`,
        }}
      >
        {picked.length === 0 ? (
          <span style={{ fontSize: 13, color: 'var(--ink3)' }}>{t.tapWordsInOrder}</span>
        ) : (
          picked.map((tokenIndex, at) => (
            <button
              key={`${tokenIndex}-${at}`}
              onClick={() => onUnpick(at)}
              disabled={checked}
              style={{ ...chip, background: '#fff', borderColor: 'var(--ink)', cursor: checked ? 'default' : 'pointer' }}
            >
              {tokens[tokenIndex]}
            </button>
          ))
        )}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem' }}>
        {tokens.map((token, i) =>
          used.has(i) ? (
            // The gap is kept so the row does not reflow under the finger.
            <span key={i} style={{ ...chip, visibility: 'hidden' }}>{token}</span>
          ) : (
            <button
              key={i}
              onClick={() => onPick(i)}
              disabled={checked}
              style={{ ...chip, cursor: checked ? 'default' : 'pointer' }}
            >
              {token}
            </button>
          ),
        )}
      </div>

      {picked.length > 0 && !checked && (
        <button
          onClick={onClear}
          style={{ marginTop: '.7rem', padding: 0, border: 'none', background: 'none', color: 'var(--ink3)', fontSize: 12.5, fontFamily: 'inherit', textDecoration: 'underline', cursor: 'pointer' }}
        >
          {t.clearSentence}
        </button>
      )}
    </div>
  )
}

const chip: React.CSSProperties = {
  // Tall enough to be a comfortable touch target on a phone: these chips are
  // the whole interaction here, and they are tapped several times per question.
  minHeight: 44,
  padding: '.6rem .85rem',
  borderRadius: 10,
  border: '1.5px solid var(--border)',
  background: '#fff',
  color: 'var(--ink)',
  fontSize: 15,
  fontFamily: 'inherit',
  lineHeight: 1.2,
}

/** A tick that draws itself, with a ring pulsing out behind it. */
function CorrectMark() {
  return (
    <span style={{ position: 'relative', display: 'inline-flex', width: 22, height: 22, flexShrink: 0 }}>
      <span className="lk-ring" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--green)' }} />
      <svg className="lk-check" width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ position: 'relative' }}>
        <path d="M5 13l4.5 4.5L19 7" stroke="#1f6b2e" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

function WrongMark() {
  return (
    <svg className="lk-check" width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M7 7l10 10M17 7L7 17" stroke="var(--red)" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  )
}

const secondaryBtn: React.CSSProperties = {
  flex: 1, padding: '.75rem', borderRadius: 10, border: '1px solid var(--border)',
  background: 'var(--paper)', color: 'var(--ink2)', fontSize: 13.5, fontWeight: 600,
  fontFamily: 'inherit', cursor: 'pointer',
}

function Card({ children, animateKey }: { children: React.ReactNode; animateKey?: string | number }) {
  return (
    // `key` restarts the entrance animation on each new question; without it
    // React reuses the node and the card never moves again.
    <div key={animateKey} className="lk-card" style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 16, padding: '1.5rem' }}>
      {children}
    </div>
  )
}

/** A ring that pulses out from behind a filled tick, for finishing a round. */
function Medal() {
  return (
    <span style={{ position: 'relative', display: 'inline-flex', width: 56, height: 56 }}>
      <span className="lk-ring" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--green)' }} />
      <span
        className="lk-pop"
        style={{
          position: 'relative', width: 56, height: 56, borderRadius: '50%',
          background: '#eaf7ee', border: '2px solid var(--green)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <svg className="lk-check" width="30" height="30" viewBox="0 0 24 24" fill="none">
          <path d="M5 13l4.5 4.5L19 7" stroke="#1f6b2e" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </span>
  )
}

function Shell({ studentId, t, title, label, progress, round, rounds, children }: {
  studentId: string
  t: ReturnType<typeof uiStrings>
  title: string
  label: string
  progress: number
  round: number
  rounds: number
  children: React.ReactNode
}) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <div style={{ background: 'var(--ink)', color: 'var(--cream)', padding: '1.25rem 1.5rem 1.1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '.7rem' }}>
          <Link href={`/learn/${studentId}`} style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, fontSize: 13, color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>
            ← {t.exitPractice}
          </Link>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,.5)' }}>{label} · {title}</span>
        </div>

        {/* The bar fills within the round; the dots say how far through the unit. */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '.7rem' }}>
          <div style={{ flex: 1, height: 8, background: 'rgba(255,255,255,.15)', borderRadius: 4 }}>
            <div style={{ height: 8, borderRadius: 4, background: 'var(--gold)', width: `${progress}%`, transition: 'width .3s' }} />
          </div>
          {rounds > 1 && (
            <div style={{ display: 'flex', gap: '.25rem', flexShrink: 0 }} aria-hidden>
              {Array.from({ length: rounds }, (_, i) => (
                <span
                  key={i}
                  style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: i < round ? 'var(--gold)' : 'rgba(255,255,255,.25)',
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {rounds > 1 && (
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,.45)', marginTop: '.45rem' }}>
            {t.roundLabel(round, rounds)}
          </div>
        )}
      </div>
      <div style={{ padding: '1.5rem', maxWidth: 560, margin: '0 auto' }}>{children}</div>
    </div>
  )
}
