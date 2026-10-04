'use client'

/**
 * Text-to-speech through the browser's built-in Web Speech API.
 *
 * No server, no API key, no per-use cost. The trade-off is that voice quality
 * depends on the learner's device: macOS and iOS ship good voices, Android
 * relies on Google TTS, and older Windows is noticeably worse. Treat it as a
 * pronunciation hint, not studio audio.
 */

/**
 * Apple ships joke voices (Boing, Bubbles, Bad News...) in the same list as
 * real ones, and some are tagged en-US. Picking by language alone can land on
 * one of these, so they are excluded by name.
 */
const NOVELTY_VOICES = new Set([
  'Albert', 'Bad News', 'Bahh', 'Bells', 'Boing', 'Bubbles', 'Cellos',
  'Good News', 'Jester', 'Organ', 'Superstar', 'Trinoids', 'Whisper',
  'Wobble', 'Zarvox', 'Deranged', 'Hysterical', 'Junior', 'Princess',
  'Ralph', 'Fred', 'Kathy', 'Grandma', 'Grandpa', 'Rocko', 'Shelley',
  'Sandy', 'Flo', 'Eddy', 'Reed',
])

/** Known-good voices per language, best first. Missing ones are skipped. */
const PREFERRED: Record<string, string[]> = {
  'pt-BR': ['Luciana', 'Google português do Brasil', 'Microsoft Francisca', 'Joana'],
  'en-US': ['Samantha', 'Google US English', 'Microsoft Aria', 'Alex', 'Ava'],
}

/**
 * Strips editorial asides that read badly out loud, e.g. the gloss in
 * "book (a ticket)" or "boa noite (ao chegar)". Safe on full sentences too.
 */
export function normaliseForSpeech(text: string): string {
  return text.replace(/\([^)]*\)/g, ' ').replace(/\s+/g, ' ').trim()
}

/**
 * Vocabulary entries list synonyms as "olá / oi". Speaking the slash turns into
 * noise, so only the first variant is pronounced. Sentences never go through
 * this — a slash inside one is meaningful.
 */
export function firstVariant(term: string): string {
  return normaliseForSpeech(term.split('/')[0])
}

export function speechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

/**
 * Voices load asynchronously in some browsers: the first getVoices() can return
 * an empty array, with the real list arriving on the voiceschanged event.
 */
export function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  if (!speechSupported()) return Promise.resolve([])

  const existing = window.speechSynthesis.getVoices()
  if (existing.length) return Promise.resolve(existing)

  return new Promise(resolve => {
    const done = () => resolve(window.speechSynthesis.getVoices())
    window.speechSynthesis.addEventListener('voiceschanged', done, { once: true })
    // Safari sometimes never fires the event; don't hang on it.
    setTimeout(done, 1500)
  })
}

export function pickVoice(voices: SpeechSynthesisVoice[], lang: string): SpeechSynthesisVoice | null {
  const base = lang.split('-')[0]
  const usable = voices.filter(v => !NOVELTY_VOICES.has(v.name))

  const exact = usable.filter(v => v.lang.replace('_', '-') === lang)
  const sameLanguage = usable.filter(v => v.lang.startsWith(base))
  const pool = exact.length ? exact : sameLanguage
  if (!pool.length) return null

  for (const name of PREFERRED[lang] ?? []) {
    const match = pool.find(v => v.name === name || v.name.startsWith(name))
    if (match) return match
  }

  // Local voices work offline and start instantly; network voices can lag.
  return pool.find(v => v.default) ?? pool.find(v => v.localService) ?? pool[0]
}

export function cancelSpeech() {
  if (speechSupported()) window.speechSynthesis.cancel()
}

/** Speaks one phrase. Resolves when it finishes, is cancelled, or errors. */
export function speak(
  text: string,
  lang: string,
  voice: SpeechSynthesisVoice | null,
  rate = 0.95,
): Promise<void> {
  const spoken = normaliseForSpeech(text)
  if (!speechSupported() || !spoken) return Promise.resolve()

  cancelSpeech()
  return new Promise(resolve => {
    const utterance = new SpeechSynthesisUtterance(spoken)
    utterance.lang = lang
    utterance.rate = rate
    if (voice) utterance.voice = voice

    let settled = false
    const finish = () => {
      if (settled) return
      settled = true
      resolve()
    }
    utterance.onend = finish
    utterance.onerror = finish

    window.speechSynthesis.speak(utterance)
  })
}
