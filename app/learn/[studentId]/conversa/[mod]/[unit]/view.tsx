'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Caramelo } from '@/components/Caramelo'
import { AutoAudioToggle, useAutoSpeak } from '@/components/AutoAudio'
import { SpeakButton, useVoice } from '@/components/SpeakButton'
import { differingWord } from '@/lib/gender'
import type { Roleplay } from '@/lib/roleplay'
import { speak } from '@/lib/speak'
import { uiStrings } from '@/lib/ui-strings'

type Said = { from: 'them' | 'me'; text: string; translation: string }

/**
 * The unit's dialogue, with the learner holding one side of it.
 *
 * It builds downward like a chat, because that is the shape of a conversation
 * and because the lines already said are the context for choosing the next one
 * — a question that replaced the screen each time would be a quiz again.
 *
 * A wrong choice is not punished with a skip: the options stay, the mistake is
 * named, and the learner picks again. Getting to the end of a conversation
 * matters more here than scoring it, and the score only counts the ones that
 * were right the first time.
 */
export function RoleplayView({
  studentId, moduleId, unitIndex, unitTitle, moduleLabel, roleplay, lang,
}: {
  studentId: string
  moduleId: string
  unitIndex: number
  unitTitle: string
  moduleLabel: string
  roleplay: Roleplay
  lang: string
}) {
  const t = uiStrings(lang)
  const audio = useVoice(lang)

  const autoSpeak = useAutoSpeak()
  const [turnIndex, setTurnIndex] = useState(0)
  const [said, setSaid] = useState<Said[]>([])
  const [wrongPick, setWrongPick] = useState<number | null>(null)
  const [firstTry, setFirstTry] = useState(0)
  const [missedHere, setMissedHere] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  const turn = roleplay.turns[turnIndex]
  const finished = turnIndex >= roleplay.turns.length

  // The other person speaks the moment it is their turn, as they would — but
  // only with the sound switch on. What they said is written in the thread
  // either way, with a player on every line, so the conversation still works
  // in a quiet room.
  useEffect(() => {
    if (!turn) return
    setSaid(prev => [...prev, ...turn.cues.map(c => ({ from: 'them' as const, text: c.text, translation: c.translation }))])
    if (turn.cues.length && audio.ready && autoSpeak.auto) {
      speak(turn.cues.map(c => c.text).join('. '), lang, audio.voice)
    }
  }, [turnIndex, audio.ready, autoSpeak.auto])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [said.length, wrongPick])

  const choose = useCallback((index: number) => {
    if (!turn) return

    if (index !== turn.answerIndex) {
      setWrongPick(index)
      setMissedHere(true)
      return
    }

    if (!missedHere) setFirstTry(n => n + 1)
    setWrongPick(null)
    setMissedHere(false)
    setSaid(prev => [...prev, { from: 'me', text: turn.options[index], translation: turn.translation }])
    if (audio.ready) speak(turn.options[index], lang, audio.voice)
    setTurnIndex(i => i + 1)
  }, [turn, missedHere, audio.ready, audio.voice, lang])

  function restart() {
    setTurnIndex(0); setSaid([]); setWrongPick(null); setFirstTry(0); setMissedHere(false)
  }

  // Naming the slip is the lesson; "wrong" on its own is not.
  const hint = (() => {
    if (wrongPick === null || !turn?.genderTrap) return null
    const picked = turn.options[wrongPick]
    if (picked !== turn.genderTrap) return null
    const diff = differingWord(turn.options[turn.answerIndex], picked)
    return diff ? t.liveGenderHint(diff.right, diff.wrong) : null
  })()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: 'var(--panel)', color: 'var(--on-panel)', padding: '1.1rem 1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '.5rem' }}>
          <Link href={`/learn/${studentId}`} style={{ minHeight: 44, display: 'inline-flex', alignItems: 'center', fontSize: 13, color: 'rgba(255,255,255,.5)', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
            ← {t.exitPractice}
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', minWidth: 0 }}>
            {audio.supported !== false && (
              <AutoAudioToggle
                auto={autoSpeak.auto}
                onChange={autoSpeak.setAuto}
                label={t.autoAudio}
                state={autoSpeak.auto ? t.autoAudioOn : t.autoAudioOff}
              />
            )}
            <span style={{
              fontSize: 12, color: 'rgba(255,255,255,.5)',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {moduleLabel} · {unitTitle}
            </span>
          </div>
        </div>
        <div style={{ fontSize: 13.5, lineHeight: 1.5 }}>{roleplay.scene}</div>
      </div>

      <div style={{ flex: 1, maxWidth: 560, width: '100%', margin: '0 auto', padding: '1.25rem 1.25rem 0' }}>
        {said.map((line, i) => (
          <Bubble key={i} line={line} lang={lang} audio={audio} listen={t.listen} />
        ))}

        {!finished && turn && (
          <div style={{ marginTop: '1.1rem' }}>
            <div style={{ fontSize: 11.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--ink3)', marginBottom: '.5rem' }}>
              {t.liveYourTurn}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
              {turn.options.map((option, oi) => {
                const wrong = wrongPick === oi
                return (
                  <button
                    key={oi}
                    onClick={() => choose(oi)}
                    className={wrong ? 'lk-shake' : undefined}
                    style={{
                      textAlign: 'left', minHeight: 48, padding: '.75rem .9rem', borderRadius: 12,
                      border: `1.5px solid ${wrong ? 'var(--bad-border)' : 'var(--border)'}`,
                      background: wrong ? 'var(--bad-bg)' : 'var(--surface)',
                      color: wrong ? 'var(--bad-ink)' : 'var(--ink)',
                      fontSize: 14.5, fontFamily: 'inherit', lineHeight: 1.45, cursor: 'pointer',
                    }}
                  >
                    {option}
                  </button>
                )
              })}
            </div>

            {wrongPick !== null && (
              <div className="lk-rise" style={{ marginTop: '.7rem', padding: '.7rem .9rem', borderRadius: 10, background: 'var(--bad-bg)', border: '1px solid var(--bad-border)', fontSize: 13.5, color: 'var(--bad-ink)', lineHeight: 1.5 }}>
                <strong>{t.liveWrong}</strong>{hint ? ` ${hint}` : ''}
              </div>
            )}
          </div>
        )}

        {finished && (
          <div className="lk-card" style={{ marginTop: '1.25rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '.5rem', color: 'var(--ink)' }}>
              <Caramelo mood="happy" size={84} />
            </div>
            <div style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 20, fontWeight: 700, marginBottom: '.25rem' }}>
              {t.liveDone}
            </div>
            <div style={{ fontSize: 13.5, color: 'var(--ink3)', marginBottom: '1.1rem' }}>
              {t.liveDoneHint(firstTry, roleplay.turns.length)}
            </div>
            <button onClick={restart} style={{ width: '100%', minHeight: 48, borderRadius: 12, border: 'none', background: 'var(--green)', color: 'var(--on-panel)', fontSize: 15, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer', marginBottom: '.55rem' }}>
              {t.liveAgain}
            </button>
            <Link href={`/learn/${studentId}/praticar/${moduleId}/${unitIndex}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 48, borderRadius: 12, border: '1px solid var(--border)', background: 'var(--paper)', color: 'var(--ink2)', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
              {t.practiceStart} →
            </Link>
          </div>
        )}

        <div ref={endRef} style={{ height: '1.5rem' }} />
      </div>
    </div>
  )
}

function Bubble({ line, lang, audio, listen }: {
  line: Said
  lang: string
  audio: ReturnType<typeof useVoice>
  listen: string
}) {
  const mine = line.from === 'me'
  return (
    <div style={{ display: 'flex', justifyContent: mine ? 'flex-end' : 'flex-start', marginBottom: '.6rem' }}>
      <div
        style={{
          maxWidth: '84%',
          padding: '.65rem .85rem',
          borderRadius: mine ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
          background: mine ? 'var(--ok-bg)' : 'var(--surface)',
          border: `1px solid ${mine ? 'var(--ok-border)' : 'var(--border)'}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.5rem' }}>
          <div style={{ fontSize: 14.5, lineHeight: 1.45, color: mine ? 'var(--ok-ink)' : 'var(--ink)' }}>
            {line.text}
          </div>
          <SpeakButton text={line.text} lang={lang} voice={audio.voice} ready={audio.ready} listen={listen} />
        </div>
        <div style={{ fontSize: 12, color: 'var(--ink3)', marginTop: '.3rem', lineHeight: 1.4 }}>
          {line.translation}
        </div>
      </div>
    </div>
  )
}
