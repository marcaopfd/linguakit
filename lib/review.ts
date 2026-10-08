/**
 * Leitner scheduling for the review queue.
 *
 * Five boxes, each with a longer interval. A correct answer moves the item up a
 * box; a wrong one sends it back to box 1. Getting it right in the last box
 * retires the item — the queue drains instead of growing forever.
 *
 * Chosen over SM-2 because every number here is explainable to the learner and
 * there is nothing to tune.
 */

/** Days until an item in box 1..5 comes back. */
export const BOX_INTERVALS_DAYS = [1, 3, 7, 14, 30] as const
export const MAX_BOX = BOX_INTERVALS_DAYS.length

const DAY_MS = 86_400_000

export type Schedule =
  | { retired: true }
  | { retired: false; box: number; dueAt: Date }

export function nextSchedule(box: number, correct: boolean, now: Date = new Date()): Schedule {
  if (!correct) {
    // Straight back to the start, however far along it was.
    return { retired: false, box: 1, dueAt: new Date(now.getTime() + BOX_INTERVALS_DAYS[0] * DAY_MS) }
  }

  const current = clampBox(box)
  if (current >= MAX_BOX) return { retired: true }

  const next = current + 1
  return { retired: false, box: next, dueAt: new Date(now.getTime() + BOX_INTERVALS_DAYS[next - 1] * DAY_MS) }
}

/** Where an item lands the first time it is missed in a lesson. */
export function firstSchedule(now: Date = new Date()): { box: number; dueAt: Date } {
  return { box: 1, dueAt: new Date(now.getTime() + BOX_INTERVALS_DAYS[0] * DAY_MS) }
}

/** Defends the arithmetic against a box value that drifted out of range. */
export function clampBox(box: number): number {
  if (!Number.isFinite(box)) return 1
  return Math.min(MAX_BOX, Math.max(1, Math.floor(box)))
}
