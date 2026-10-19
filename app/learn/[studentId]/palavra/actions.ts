'use server'

import { type GuessResult, plain, scoreGuess, wordOfTheDay } from '@/lib/daily-word'
import { meaningOf } from '@/lib/word-meanings-pt'
import { isRealWord } from '@/lib/word-dictionary-pt'

/**
 * Scoring happens here so the answer never reaches the browser.
 *
 * Sent as a prop it would sit in the page source, readable by anyone curious
 * enough to look — which is most of the fun gone for the price of one glance.
 * The guess goes out, the colours come back, and the word stays on the server
 * until the game is over.
 *
 * The dictionary lives here for the same reason and one more: twelve thousand
 * words have no business in a phone's download when the only question ever
 * asked of them is answered here.
 *
 * Be straight about the limit: there is no server-side game state, so nothing
 * stops someone calling the reveal below before they have used their tries.
 * Closing that needs somewhere to keep each player's day, and the thing worth
 * preventing — the word being visible by accident — is already prevented.
 */

function course(value: string): 'en' | 'pt' {
  return value === 'en' ? 'en' : 'pt'
}

export async function scoreGuessAction(forCourse: string, guess: string): Promise<GuessResult> {
  const answer = wordOfTheDay(course(forCourse))
  const flat = plain(guess).slice(0, answer.length)

  // The answer itself is always in the dictionary, so this can never reject
  // the one word the player is looking for.
  if (!isRealWord(flat)) return { ok: false, reason: 'unknown-word' }

  return { ok: true, marks: scoreGuess(flat, answer) }
}

/**
 * Asked for only once the game is over, when there is nothing left to spoil.
 *
 * `readIn` is the language the learner reads, which is not the language of the
 * word: a Brazilian gets the meaning in Portuguese, someone learning
 * Portuguese gets it in English. The view knows which, so it says.
 */
export async function revealAnswerAction(
  forCourse: string,
  readIn: string,
): Promise<{ word: string; meaning: string | null }> {
  const word = wordOfTheDay(course(forCourse))
  return { word, meaning: meaningOf(word, readIn.startsWith('pt') ? 'pt' : 'en') }
}
