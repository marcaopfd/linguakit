'use client'

import { useCallback, useEffect, useState } from 'react'
import { Icon } from './Icon'

const KEY = 'lk_audio_auto'

/**
 * Whether sound starts on its own when a new question appears.
 *
 * Off unless the learner turns it on. Audio that begins before the question
 * has been read talks over the reading of it, and the learner who is on a bus
 * with no headphones gets a surprise rather than a lesson. Nothing is lost by
 * leaving it off: every exercise that can be heard keeps its play button, so
 * the sound is one tap away whenever it is wanted.
 *
 * Kept in this browser rather than on the student record: it is a property of
 * where you are sitting, not of who you are, and the answer can differ between
 * the phone on the train and the laptop at home.
 */
export function useAutoSpeak() {
  const [auto, setState] = useState(false)

  useEffect(() => {
    try { setState(localStorage.getItem(KEY) === 'on') } catch { /* private window */ }
  }, [])

  const setAuto = useCallback((value: boolean) => {
    setState(value)
    try { localStorage.setItem(KEY, value ? 'on' : 'off') } catch { /* nothing to remember it with */ }
  }, [])

  return { auto, setAuto }
}

/** The switch itself, made for the dark header the activities sit under. */
export function AutoAudioToggle({ auto, onChange, label, state }: {
  auto: boolean
  onChange: (value: boolean) => void
  /** "Sound starts on its own", for the screen reader and the tooltip. */
  label: string
  /** "on" / "off", shown next to the speaker. */
  state: string
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!auto)}
      aria-pressed={auto}
      aria-label={label}
      title={label}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '.35rem',
        minHeight: 44, padding: '0 .6rem', borderRadius: 999,
        border: `1px solid ${auto ? 'var(--gold)' : 'rgba(255,255,255,.25)'}`,
        background: 'transparent',
        color: auto ? 'var(--gold)' : 'rgba(255,255,255,.55)',
        fontFamily: 'inherit', fontSize: 11.5, fontWeight: 600,
        letterSpacing: '.04em', textTransform: 'uppercase',
        cursor: 'pointer', flexShrink: 0,
      }}
    >
      <Icon name="speaker" size={15} strokeWidth={1.9} />
      {state}
    </button>
  )
}
