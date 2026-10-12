/**
 * The interface icons, drawn in the same hand as the mascot: one stroke weight,
 * round caps, no fill, colour inherited from whatever they sit in.
 *
 * They replace emoji in the chrome. Emoji are a different picture on every
 * device — the target on an iPhone is not the target on a Mac, and none of them
 * match a line drawing of a dog — and they cannot take the colour of the thing
 * they label. Emoji that belong to the *content*, like the one on each unit,
 * stay as they are: those are the author's, not the interface's.
 */

const PATHS: Record<string, React.ReactNode> = {
  key: (
    <>
      <circle cx="8" cy="8" r="4" />
      <path d="M11 11l8 8M16 16l2.5-2.5M19 19l2-2" />
    </>
  ),
  copy: (
    <>
      <rect x="9" y="9" width="11" height="12" rx="2" />
      <path d="M15 5.5A1.5 1.5 0 0013.5 4h-8A1.5 1.5 0 004 5.5v9A1.5 1.5 0 005.5 16" />
    </>
  ),
  repeat: (
    <>
      <path d="M4 9a5 5 0 015-5h10M19 4l-3-3M19 4l-3 3" />
      <path d="M20 15a5 5 0 01-5 5H5M5 20l3-3M5 20l3 3" />
    </>
  ),
  headphones: (
    <>
      <path d="M4 14v-2a8 8 0 0116 0v2" />
      <rect x="2.5" y="13" width="5" height="7" rx="2.2" />
      <rect x="16.5" y="13" width="5" height="7" rx="2.2" />
    </>
  ),
  speaker: (
    <>
      <path d="M11 5L6.5 9H3v6h3.5L11 19V5z" />
      <path d="M15 9.5a3.5 3.5 0 010 5M17.5 7a7 7 0 010 10" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20V4" />
      <path d="M4 20h16" />
      <path d="M8.5 20v-6M13 20V8.5M17.5 20v-9" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21v-6" />
      <path d="M8 4h8l-1.2 4.2A4 4 0 0017 12v1H7v-1a4 4 0 002.2-3.8L8 4z" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8 12.2l2.8 2.8L16 9.5" />
    </>
  ),
  pencil: (
    <>
      <path d="M4 20l1-4.5L15.5 5a2.1 2.1 0 013 3L8 18.5 4 20z" />
      <path d="M14 6.5l3.5 3.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5.4l3.4 2" />
    </>
  ),
  flag: (
    <>
      <path d="M5 21V4" />
      <path d="M5 5h11l-1.8 3.5L16 12H5" />
    </>
  ),
  book: (
    <>
      <path d="M4 5.5A1.5 1.5 0 015.5 4H10a3 3 0 013 3v12a2.5 2.5 0 00-2.5-2.5H4V5.5z" />
      <path d="M20 5.5A1.5 1.5 0 0018.5 4H14a3 3 0 00-3 3v12a2.5 2.5 0 012.5-2.5H20V5.5z" />
    </>
  ),
  trash: (
    <>
      <path d="M4 7h16" />
      <path d="M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2" />
      <path d="M6 7l1 12.5A1.5 1.5 0 008.5 21h7a1.5 1.5 0 001.5-1.5L18 7" />
    </>
  ),
}

export type IconName = keyof typeof PATHS

export function Icon({ name, size = 16, strokeWidth = 1.9, style }: {
  name: IconName
  size?: number
  strokeWidth?: number
  style?: React.CSSProperties
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      style={{ flexShrink: 0, display: 'block', ...style }}
    >
      {PATHS[name]}
    </svg>
  )
}
