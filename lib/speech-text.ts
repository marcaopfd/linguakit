/**
 * Text tidying for speech, kept apart from the speech engine itself.
 *
 * `speak.ts` is a client module, so nothing on the server can call into it.
 * These two helpers are pure string work and the practice activities need them
 * while being generated on the server, so they live here and `speak.ts`
 * re-exports them for the components that already import from there.
 */

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
