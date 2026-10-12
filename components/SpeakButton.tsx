'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { cancelSpeech, loadVoices, pickVoice, speak, speechSupported } from '@/lib/speak'

/**
 * Resolves the best available voice for `lang` once, on the client.
 *
 * `ready` starts false so the server render and the first client render match;
 * the effect flips it afterwards, which is what hides the buttons on browsers
 * without speech synthesis instead of showing dead controls.
 */
export function useVoice(lang: string) {
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null)
  const [ready, setReady] = useState(false)
  // Null until the client has looked: a screen whose question IS the audio must
  // not fall back to showing the text during that first render, or it hands the
  // answer over for a frame.
  const [supported, setSupported] = useState<boolean | null>(null)

  useEffect(() => {
    let cancelled = false
    const can = speechSupported()
    setSupported(can)
    if (!can) return

    loadVoices().then(voices => {
      if (cancelled) return
      setVoice(pickVoice(voices, lang))
      setReady(true)
    })

    return () => { cancelled = true }
  }, [lang])

  // Stop audio when leaving the lesson; speechSynthesis outlives the component.
  useEffect(() => cancelSpeech, [])

  return { voice, ready, supported }
}

type Props = {
  text: string
  lang: string
  voice: SpeechSynthesisVoice | null
  ready: boolean
  rate?: number
  label?: string
  /** The word for "listen" in the learner's own language, for the accessible name. */
  listen: string
  size?: 'sm' | 'md'
}

export function SpeakButton({ text, lang, voice, ready, rate, label, listen, size = 'sm' }: Props) {
  const [speaking, setSpeaking] = useState(false)
  const mounted = useRef(true)

  useEffect(() => () => { mounted.current = false }, [])

  const handleClick = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (speaking) {
      cancelSpeech()
      setSpeaking(false)
      return
    }

    setSpeaking(true)
    await speak(text, lang, voice, rate)
    if (mounted.current) setSpeaking(false)
  }, [text, lang, voice, rate, speaking])

  if (!ready) return null

  const dim = size === 'md' ? 28 : 22
  return (
    // The button is the touch target and the span is what you see. A 22px dot
    // is the right size next to a vocabulary word and far too small for a
    // thumb, and this is the most-tapped control in the whole app.
    <button
      onClick={handleClick}
      aria-label={label ?? `${listen}: ${text}`}
      title={label ?? listen}
      style={{
        flexShrink: 0,
        minWidth: 44,
        minHeight: 44,
        padding: 0,
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'inherit',
      }}
    >
      <span
        style={{
          width: label ? 'auto' : dim,
          height: dim,
          padding: label ? '0 .6rem' : 0,
          borderRadius: label ? 7 : '50%',
          border: '1px solid var(--border)',
          background: speaking ? 'var(--panel)' : 'var(--paper)',
          color: speaking ? 'var(--surface)' : 'var(--ink3)',
          fontSize: size === 'md' ? 13 : 11,
          fontWeight: 600,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '.3rem',
          lineHeight: 1,
          transition: 'background .15s, color .15s',
        }}
      >
        {speaking ? '■' : '▶'}{label && <span>{label}</span>}
      </span>
    </button>
  )
}
