'use client'

import { useCallback, useEffect, useState } from 'react'
import { Icon } from '@/components/Icon'
import { ACCENTS, accentTag, courseLang, type Accent } from '@/lib/accents'
import { loadVoices, speak, speechSupported } from '@/lib/speak'
import type { UiStrings } from '@/lib/ui-strings'

/** What the learner hears when trying an accent on. */
const SAMPLE: Record<'en' | 'pt', string> = {
  en: 'Hello! Nice to meet you. How are you today?',
  pt: 'Olá! Prazer em conhecer você. Tudo bem?',
}

/**
 * Lets the learner pick the accent the course is spoken in.
 *
 * Only accents this device can actually produce are offered. Offering Irish and
 * then reading the lesson in an American voice because no Irish voice is
 * installed would be worse than not offering it, so the missing ones are named
 * rather than silently dropped.
 *
 * Choosing plays a sample immediately: the whole point is the sound, and it is
 * the only way to tell the options apart.
 */
export function AccentPicker({ studentId, course, current, t }: {
  studentId: string
  course: string | null | undefined
  current: string | null | undefined
  t: UiStrings
}) {
  const lang = courseLang(course)
  const options = ACCENTS[lang]

  const [chosen, setChosen] = useState(() => accentTag(course, current))
  const [available, setAvailable] = useState<string[] | null>(null)
  const [saving, setSaving] = useState<string | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (!speechSupported()) { setAvailable([]); return }
    let cancelled = false
    loadVoices().then(voices => {
      if (cancelled) return
      const have = new Set(voices.map(v => v.lang.replace('_', '-').toLowerCase()))
      setAvailable(options.filter(o => have.has(o.tag.toLowerCase())).map(o => o.tag))
    })
    return () => { cancelled = true }
  }, [options])

  const choose = useCallback(async (accent: Accent) => {
    setChosen(accent.tag)
    setFailed(false)
    setSaving(accent.tag)

    // Speak first: the learner asked to hear it, and a slow network should not
    // hold up the sample.
    loadVoices().then(voices => {
      const voice = voices.find(v => v.lang.replace('_', '-').toLowerCase() === accent.tag.toLowerCase())
      speak(SAMPLE[lang], accent.tag, voice ?? null)
    })

    try {
      const res = await fetch('/api/student/accent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, accent: accent.tag }),
      })
      if (!res.ok) setFailed(true)
    } catch {
      setFailed(true)
    } finally {
      setSaving(null)
    }
  }, [studentId, lang])

  // Until the voice list has loaded there is nothing honest to show.
  if (available === null) return null
  if (available.length < 2) return null

  const missing = options.filter(o => !available.includes(o.tag))

  return (
    <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '1rem 1.1rem', marginBottom: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: 13.5, fontWeight: 700, marginBottom: '.2rem' }}>
        <Icon name="headphones" size={16} /> {t.accentTitle}
      </div>
      <div style={{ fontSize: 12.5, color: 'var(--ink3)', lineHeight: 1.5, marginBottom: '.75rem' }}>
        {t.accentHint}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.45rem' }}>
        {options.filter(o => available.includes(o.tag)).map(option => {
          const picked = chosen === option.tag
          return (
            <button
              key={option.tag}
              onClick={() => choose(option)}
              disabled={saving === option.tag}
              aria-pressed={picked}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '.4rem',
                minHeight: 44, padding: '.5rem .8rem', borderRadius: 10,
                border: `1.5px solid ${picked ? 'var(--ink)' : 'var(--border)'}`,
                background: picked ? 'var(--ink)' : '#fff',
                color: picked ? '#fff' : 'var(--ink2)',
                fontSize: 13.5, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer',
              }}
            >
              <span aria-hidden style={{ fontSize: 15 }}>{option.flag}</span>
              {option.place}
            </button>
          )
        })}
      </div>

      {missing.length > 0 && (
        <div style={{ fontSize: 11.5, color: 'var(--ink3)', marginTop: '.6rem', lineHeight: 1.45 }}>
          {t.accentMissing(missing.map(m => m.place).join(', '))}
        </div>
      )}

      {failed && (
        <div style={{ fontSize: 12, color: 'var(--red)', marginTop: '.5rem' }}>{t.accentNotSaved}</div>
      )}
    </div>
  )
}
