/**
 * A brake on repeated failed logins.
 *
 * Two things happen on a wrong password: the answer is slowed to a fixed delay,
 * and the address is counted. The delay is the part that does the work — a
 * handler that answers in 20ms lets someone try millions of passwords a day,
 * and one that takes half a second does not — while the counter stops a burst
 * from one place.
 *
 * Be clear about the limit: this runs in the memory of one serverless instance,
 * and an attacker spread across instances or addresses gets more attempts than
 * the number below suggests. It raises the cost; it does not close the door.
 * The door is a long password. A real limiter needs shared storage, and this is
 * the honest version of what can be done without it.
 */

const WINDOW_MS = 10 * 60 * 1000
const MAX_FAILURES = 8
/** Every wrong answer takes at least this long. */
const PENALTY_MS = 500

type Entry = { count: number; until: number }
const failures = new Map<string, Entry>()

/** Keeps the map from growing without bound on a long-lived instance. */
function sweep(now: number) {
  if (failures.size < 500) return
  for (const [key, entry] of failures) {
    if (entry.until <= now) failures.delete(key)
  }
}

/** Best-effort caller address; behind Vercel the real one is in this header. */
export function callerKey(req: Request, scope: string): string {
  const forwarded = req.headers.get('x-forwarded-for') ?? ''
  const ip = forwarded.split(',')[0].trim() || 'unknown'
  return `${scope}:${ip}`
}

/** True when this caller has failed too often lately. */
export function isLockedOut(key: string): boolean {
  const now = Date.now()
  const entry = failures.get(key)
  if (!entry || entry.until <= now) {
    failures.delete(key)
    return false
  }
  return entry.count >= MAX_FAILURES
}

/** Records a failure and waits out the penalty before the caller hears back. */
export async function noteFailure(key: string): Promise<void> {
  const now = Date.now()
  sweep(now)

  const entry = failures.get(key)
  if (!entry || entry.until <= now) {
    failures.set(key, { count: 1, until: now + WINDOW_MS })
  } else {
    entry.count += 1
  }

  await new Promise(resolve => setTimeout(resolve, PENALTY_MS))
}

/** A success wipes the slate, so a typo does not count against a real user. */
export function noteSuccess(key: string): void {
  failures.delete(key)
}

export const LOCKOUT_MINUTES = WINDOW_MS / 60000
