/**
 * How long since a student last completed a unit or answered an exercise.
 *
 * The teacher's most actionable signal: who is going cold. `days` is exposed
 * alongside the label so the caller can colour by recency without re-parsing.
 */
export type Activity = { label: string; days: number }

export function lastActive(iso: string | null | undefined, now: number = Date.now()): Activity {
  if (!iso) return { label: 'nunca estudou', days: Infinity }

  const then = new Date(iso).getTime()
  if (Number.isNaN(then)) return { label: 'nunca estudou', days: Infinity }

  // Clamp: a clock skew that puts activity in the future should read as today,
  // not as a negative age.
  const days = Math.max(0, Math.floor((now - then) / 86_400_000))

  if (days === 0) return { label: 'estudou hoje', days }
  if (days === 1) return { label: 'estudou ontem', days }
  if (days < 30) return { label: `há ${days} dias`, days }

  const months = Math.floor(days / 30)
  return { label: `há ${months} ${months === 1 ? 'mês' : 'meses'}`, days }
}

/** Green while recent, amber after a few days, red once the student is cold. */
export function activityColor(days: number) {
  if (days <= 2) return { fg: '#1f6b2e', bg: '#eaf7ee' }
  if (days <= 7) return { fg: '#7a5a0a', bg: 'var(--gold-light)' }
  return { fg: '#9b1c1c', bg: '#fdecea' }
}
