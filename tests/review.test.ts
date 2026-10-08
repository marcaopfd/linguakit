import { describe, expect, it } from 'vitest'
import { BOX_INTERVALS_DAYS, MAX_BOX, clampBox, firstSchedule, nextSchedule } from '@/lib/review'

const NOW = new Date('2026-10-08T09:00:00Z')
const daysBetween = (a: Date, b: Date) => Math.round((b.getTime() - a.getTime()) / 86_400_000)

describe('nextSchedule', () => {
  it('moves up a box on a correct answer, with the longer interval', () => {
    for (let box = 1; box < MAX_BOX; box++) {
      const s = nextSchedule(box, true, NOW)
      expect(s.retired).toBe(false)
      if (s.retired) return
      expect(s.box).toBe(box + 1)
      expect(daysBetween(NOW, s.dueAt)).toBe(BOX_INTERVALS_DAYS[box])
    }
  })

  it('retires an item answered correctly in the last box, so the queue drains', () => {
    expect(nextSchedule(MAX_BOX, true, NOW)).toEqual({ retired: true })
  })

  it('sends a wrong answer back to box 1 from anywhere, due tomorrow', () => {
    for (let box = 1; box <= MAX_BOX; box++) {
      const s = nextSchedule(box, false, NOW)
      expect(s.retired).toBe(false)
      if (s.retired) return
      expect(s.box).toBe(1)
      expect(daysBetween(NOW, s.dueAt)).toBe(1)
    }
  })

  it('never retires an item that was answered wrong, even in the last box', () => {
    expect(nextSchedule(MAX_BOX, false, NOW).retired).toBe(false)
  })

  it('intervals grow strictly, so review effort keeps falling', () => {
    for (let i = 1; i < BOX_INTERVALS_DAYS.length; i++) {
      expect(BOX_INTERVALS_DAYS[i]).toBeGreaterThan(BOX_INTERVALS_DAYS[i - 1])
    }
  })
})

describe('firstSchedule', () => {
  it('puts a freshly missed item in box 1, due tomorrow', () => {
    const s = firstSchedule(NOW)
    expect(s.box).toBe(1)
    expect(daysBetween(NOW, s.dueAt)).toBe(1)
  })
})

describe('clampBox', () => {
  it('keeps a drifted value inside the range instead of indexing past the end', () => {
    expect(clampBox(0)).toBe(1)
    expect(clampBox(-5)).toBe(1)
    expect(clampBox(99)).toBe(MAX_BOX)
    expect(clampBox(NaN)).toBe(1)
    expect(clampBox(2.7)).toBe(2)
  })

  it('does not let an out-of-range box produce an invalid date', () => {
    const s = nextSchedule(99, true, NOW)
    expect(s.retired).toBe(true)
    const low = nextSchedule(-3, true, NOW)
    expect(low.retired).toBe(false)
    if (!low.retired) expect(Number.isNaN(low.dueAt.getTime())).toBe(false)
  })
})
