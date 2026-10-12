import { describe, expect, it } from 'vitest'
import {
  ACCENTS, DEFAULT_ACCENT, accentTag, courseLang, findAccent, isKnownAccent,
} from '@/lib/accents'

describe('courseLang', () => {
  it('reads the English course, and treats anything else as Portuguese', () => {
    expect(courseLang('en')).toBe('en')
    expect(courseLang('pt')).toBe('pt')
    expect(courseLang(null)).toBe('pt')
    expect(courseLang(undefined)).toBe('pt')
  })
})

describe('accentTag', () => {
  it('honours a choice that belongs to the course', () => {
    expect(accentTag('en', 'en-IE')).toBe('en-IE')
    expect(accentTag('en', 'en-AU')).toBe('en-AU')
    expect(accentTag('pt', 'pt-PT')).toBe('pt-PT')
  })

  it('falls back to the course default when nothing is chosen', () => {
    expect(accentTag('en', null)).toBe('en-US')
    expect(accentTag('pt', undefined)).toBe('pt-BR')
  })

  it('refuses an accent from the other course', () => {
    // Otherwise a student who switched courses would hear Portuguese read by
    // an Australian voice, or English by a Brazilian one.
    expect(accentTag('pt', 'en-IE')).toBe('pt-BR')
    expect(accentTag('en', 'pt-PT')).toBe('en-US')
  })

  it('ignores anything that is not an accent we offer', () => {
    expect(accentTag('en', 'en-ZZ')).toBe('en-US')
    expect(accentTag('en', '')).toBe('en-US')
    expect(accentTag('en', 'javascript:alert(1)')).toBe('en-US')
  })
})

describe('isKnownAccent', () => {
  it('accepts every tag we offer and nothing else', () => {
    for (const accent of [...ACCENTS.en, ...ACCENTS.pt]) {
      expect(isKnownAccent(accent.tag), accent.tag).toBe(true)
    }
    expect(isKnownAccent('en-ZZ')).toBe(false)
    expect(isKnownAccent(null)).toBe(false)
    expect(isKnownAccent(42)).toBe(false)
    expect(isKnownAccent({ tag: 'en-IE' })).toBe(false)
  })
})

describe('the catalogue itself', () => {
  it('offers Ireland and Australia, which is the point of all this', () => {
    const tags = ACCENTS.en.map(a => a.tag)
    expect(tags).toContain('en-IE')
    expect(tags).toContain('en-AU')
  })

  it('gives each course a default that is in its own list', () => {
    for (const lang of ['en', 'pt'] as const) {
      expect(ACCENTS[lang].map(a => a.tag)).toContain(DEFAULT_ACCENT[lang])
    }
  })

  it('uses tags whose base matches the course they belong to', () => {
    for (const lang of ['en', 'pt'] as const) {
      for (const accent of ACCENTS[lang]) {
        expect(accent.tag.startsWith(lang + '-'), accent.tag).toBe(true)
      }
    }
  })

  it('never repeats a tag, which would render two identical buttons', () => {
    const all = [...ACCENTS.en, ...ACCENTS.pt].map(a => a.tag)
    expect(new Set(all).size).toBe(all.length)
  })

  it('labels every accent with a place and a flag', () => {
    for (const accent of [...ACCENTS.en, ...ACCENTS.pt]) {
      expect(accent.place.length, accent.tag).toBeGreaterThan(2)
      expect(accent.flag.length, accent.tag).toBeGreaterThan(0)
    }
  })

  it('finds an accent by tag, for showing what is chosen', () => {
    expect(findAccent('en-IE')?.place).toBe('Irlanda')
    expect(findAccent('pt-PT')?.place).toBe('Portugal')
    expect(findAccent('en-ZZ')).toBeUndefined()
  })
})
