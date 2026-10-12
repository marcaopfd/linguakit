/**
 * The colour each level is drawn in.
 *
 * These used to be hex values stored in the curriculum alongside the lessons —
 * a pale background, a dark accent and a mid-tone bar per module. That works
 * until the page behind them goes dark, at which point six pale chips sit on a
 * near-black page like windows left on in an empty building, and the content
 * files are the last place you want to go to fix a theme.
 *
 * So the values move to CSS variables, which the dark theme can redefine, and
 * the content keeps only the fact of which level a module is. The two courses
 * carried slightly different hexes for the same hues; they are one set now.
 *
 * Module ids and level codes are the same six strings, so this answers for both
 * "what colour is module b2" and "what colour is a B2 result".
 */

export type LevelTone = {
  /** Pale behind a chip in light, deep in dark. */
  bg: string
  /** Text and small marks on that chip. */
  ink: string
  /** The progress bar and the path, which read on either background. */
  bar: string
}

const LEVELS = ['a1', 'a2', 'b1', 'b2', 'c1', 'c2'] as const
export type LevelId = (typeof LEVELS)[number]

export function isLevelId(id: string): id is LevelId {
  return (LEVELS as readonly string[]).includes(id.toLowerCase())
}

/**
 * Takes a module id ("b2") or a level code ("B2"). Anything unrecognised falls
 * back to the neutral ink, which is readable in both themes.
 */
export function levelTone(id: string | null | undefined): LevelTone {
  const key = (id ?? '').toLowerCase()
  if (!isLevelId(key)) {
    return { bg: 'var(--paper)', ink: 'var(--ink2)', bar: 'var(--ink3)' }
  }
  return {
    bg: `var(--lvl-${key}-bg)`,
    ink: `var(--lvl-${key}-ink)`,
    bar: `var(--lvl-${key}-bar)`,
  }
}
