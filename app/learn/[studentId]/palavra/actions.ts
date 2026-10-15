'use server'

import { type Mark, plain, scoreGuess, wordOfTheDay } from '@/lib/daily-word'

/**
 * Scoring happens here so the answer never reaches the browser.
 *
 * Sent as a prop it would sit in the page source, readable by anyone curious
 * enough to look — which is most of the fun gone for the price of one glance.
 * The guess goes out, the colours come back, and the word stays on the server
 * until the game is over.
 *
 * Be straight about the limit: there is no server-side game state, so nothing
 * stops someone calling the reveal below before they have used their tries.
 * Closing that needs somewhere to keep each player's day, and the thing worth
 * preventing — the word being visible by accident — is already prevented.
 */

function course(value: string): 'en' | 'pt' {
  return value === 'en' ? 'en' : 'pt'
}

export async function scoreGuessAction(forCourse: string, guess: string): Promise<Mark[]> {
  const answer = wordOfTheDay(course(forCourse))
  return scoreGuess(plain(guess).slice(0, answer.length), answer)
}

export async function revealAnswerAction(forCourse: string): Promise<string> {
  return wordOfTheDay(course(forCourse))
}
