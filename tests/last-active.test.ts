import { describe, expect, it } from 'vitest'
import { activityColor, lastActive } from '@/lib/last-active'

const NOW = new Date('2026-10-06T12:00:00Z').getTime()
const daysAgo = (n: number) => new Date(NOW - n * 86_400_000).toISOString()

describe('lastActive', () => {
  it('reports a student who has never studied', () => {
    expect(lastActive(null, NOW)).toEqual({ label: 'nunca estudou', days: Infinity })
    expect(lastActive(undefined, NOW).days).toBe(Infinity)
    expect(lastActive('not-a-date', NOW).days).toBe(Infinity)
  })

  it('names today and yesterday instead of counting', () => {
    expect(lastActive(daysAgo(0), NOW).label).toBe('estudou hoje')
    expect(lastActive(daysAgo(1), NOW).label).toBe('estudou ontem')
  })

  it('counts days up to a month', () => {
    expect(lastActive(daysAgo(2), NOW).label).toBe('há 2 dias')
    expect(lastActive(daysAgo(29), NOW).label).toBe('há 29 dias')
  })

  it('switches to months at thirty days, with the singular spelled correctly', () => {
    expect(lastActive(daysAgo(30), NOW).label).toBe('há 1 mês')
    expect(lastActive(daysAgo(59), NOW).label).toBe('há 1 mês')
    expect(lastActive(daysAgo(60), NOW).label).toBe('há 2 meses')
  })

  it('treats a future timestamp as today rather than a negative age', () => {
    const tomorrow = new Date(NOW + 86_400_000).toISOString()
    expect(lastActive(tomorrow, NOW)).toEqual({ label: 'estudou hoje', days: 0 })
  })
})

describe('activityColor', () => {
  it('goes green, amber, red as the student cools off', () => {
    expect(activityColor(0).fg).toBe(activityColor(2).fg)
    expect(activityColor(3).fg).not.toBe(activityColor(2).fg)
    expect(activityColor(8).fg).not.toBe(activityColor(7).fg)
  })

  it('marks a student who never studied as cold', () => {
    expect(activityColor(lastActive(null).days)).toEqual(activityColor(999))
  })
})
