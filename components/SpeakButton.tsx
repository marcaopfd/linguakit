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

  useEffect(() => {
    let cancelled = false
    if (!speechSupported()) return

    loadVoices().then(voices => {
      if (cancelled) return
      setVoice(pickVoice(voices, lang))
      setReady(true)
    })

    return () => { cancelled = true }
  }, [lang])

  // Stop audio when leaving the lesson; speechSynthesis outlives the component.
  useEffect(() => cancelSpeech, [])

  return { voice, ready }
}

type Props = {
  text: string
  lang: string
  voice: SpeechSynthesisVoice | null
  ready: boolean
  rate?: number
  label?: string
  size?: 'sm' | 'md'
}

export function SpeakButton({ text, lang, voice, ready, rate, label, size = 'sm' }: Props) {
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
    <button
      onClick={handleClick}
      aria-label={label ?? `Ouvir: ${text}`}
      title={label ?? 'Ouvir'}
      style={{
        flexShrink: 0,
        width: label ? 'auto' : dim,
        height: dim,
        padding: label ? '0 .6rem' : 0,
        borderRadius: label ? 7 : '50%',
        border: '1px solid var(--border)',
        background: speaking ? 'var(--ink)' : 'var(--paper)',
        color: speaking ? '#fff' : 'var(--ink3)',
        fontSize: size === 'md' ? 13 : 11,
        fontFamily: 'inherit',
        fontWeight: 600,
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '.3rem',
        lineHeight: 1,
        transition: 'background .15s, color .15s',
      }}
    >
      {speaking ? '■' : '▶'}{label && <span>{label}</span>}
    </button>
  )
}
