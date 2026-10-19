'use client'

import { useEffect } from 'react'

/**
 * Declares the language the page is actually written in.
 *
 * The root layout says pt-BR for the whole site, but the interface is in
 * whichever language the learner reads — English for someone learning
 * Portuguese. Chrome takes the declared language at its word and offers to
 * translate; with "always translate Portuguese" turned on it does it silently.
 * On the word game that reached the keyboard and translated the letters: "a"
 * came out as "the" and "e" as "and".
 *
 * Setting it from the client is the only way round one <html> per app. The
 * keys themselves also carry translate="no", because a single letter is not a
 * word and no translator should touch it.
 */
export function PageLang({ tag }: { tag: string }) {
  useEffect(() => {
    const previous = document.documentElement.lang
    document.documentElement.lang = tag
    return () => { document.documentElement.lang = previous }
  }, [tag])

  return null
}

/** The language the learner reads, given the one being taught. */
export function uiLangTag(taught: string): string {
  return taught.startsWith('pt') ? 'en' : 'pt-BR'
}
