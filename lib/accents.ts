/**
 * Which accent the course is spoken in.
 *
 * Someone moving to Dublin and someone moving to Sydney are learning the same
 * English, but they will spend the next year listening to very different
 * versions of it. The curriculum does not change; the voice does.
 *
 * A choice is a place, not a language tag — "Irlanda", not "en-IE" — because
 * that is how the learner thinks about it, and because the tag is an
 * implementation detail of the browser's speech engine.
 */

export type Accent = {
  /** BCP-47 tag handed to speech synthesis. */
  tag: string
  /** Where the learner is going, in the learner's OWN language. */
  place: string
  flag: string
}

/**
 * Keyed by the language being taught. The labels are written in the other one,
 * since that is the language the learner reads the interface in.
 */
export const ACCENTS: Record<'en' | 'pt', Accent[]> = {
  // Taught: English. Read by Brazilians, so the places are in Portuguese.
  en: [
    { tag: 'en-US', place: 'Estados Unidos', flag: '🇺🇸' },
    { tag: 'en-IE', place: 'Irlanda', flag: '🇮🇪' },
    { tag: 'en-GB', place: 'Reino Unido', flag: '🇬🇧' },
    { tag: 'en-AU', place: 'Austrália', flag: '🇦🇺' },
    { tag: 'en-CA', place: 'Canadá', flag: '🇨🇦' },
  ],
  // Taught: Portuguese. Read by English speakers.
  pt: [
    { tag: 'pt-BR', place: 'Brazil', flag: '🇧🇷' },
    { tag: 'pt-PT', place: 'Portugal', flag: '🇵🇹' },
  ],
}

export const DEFAULT_ACCENT = { en: 'en-US', pt: 'pt-BR' } as const

export type CourseLang = 'en' | 'pt'

/** The course a student is on, as a two-letter key. */
export function courseLang(course: string | null | undefined): CourseLang {
  return course === 'en' ? 'en' : 'pt'
}

/**
 * The tag to speak in. A stored choice is only honoured when it belongs to the
 * course being studied — otherwise a student who switched courses would be read
 * Portuguese in an Australian voice.
 */
export function accentTag(course: string | null | undefined, stored?: string | null): string {
  const lang = courseLang(course)
  const allowed = ACCENTS[lang]
  const match = stored && allowed.find(a => a.tag === stored)
  return match ? match.tag : DEFAULT_ACCENT[lang]
}

/** Whether a tag is one we offer at all, for validating what arrives over HTTP. */
export function isKnownAccent(tag: unknown): tag is string {
  return typeof tag === 'string'
    && (ACCENTS.en.some(a => a.tag === tag) || ACCENTS.pt.some(a => a.tag === tag))
}

/** The entry for a tag, for showing the learner what is currently chosen. */
export function findAccent(tag: string): Accent | undefined {
  return [...ACCENTS.en, ...ACCENTS.pt].find(a => a.tag === tag)
}
