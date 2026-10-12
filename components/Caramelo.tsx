/**
 * The mascot: a caramelo in outline, drawn in parts so it can react.
 *
 * Nothing here is a picture file. The dog is paths in one SVG, split into
 * groups — tail, ears, face — so a mood changes a handful of lines rather than
 * swapping an image, which keeps it sharp at any size and lets the animation
 * live in CSS next to the rest of the drill's.
 *
 * The joins are why the head never rotates: the skull and the back are one
 * continuous line, and turning the head would tear it open. The reacting is
 * done by the parts that genuinely hinge — ears at their base, tail at the
 * rump — plus the whole body rising or settling.
 */

export type Mood = 'idle' | 'happy' | 'sad'

export function Caramelo({ mood = 'idle', size = 64, title }: {
  mood?: Mood
  size?: number
  /** Leave unset for decoration; screen readers then skip it. */
  title?: string
}) {
  return (
    <svg
      viewBox="40 36 278 266"
      width={Math.round(size * (278 / 266))}
      height={size}
      className={`lk-dog lk-dog-${mood}`}
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      fill="none"
      stroke="currentColor"
      strokeWidth="5.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Tail first, so the body line sits over where they meet. */}
      <g className="lk-dog-tail">
        <path d="M272 236 C290 228 303 210 302 192 C301 180 292 175 285 180 C278 185 278 194 283 200" />
      </g>

      <g className="lk-dog-body">
        {/* Neck, back, rump */}
        <path d="M178 118 C190 126 198 138 203 152 C212 176 228 190 244 200 C262 212 272 228 274 248" />
        {/* Chest down to the front paw */}
        <path d="M134 155 C141 168 143 180 143 192 C141 216 140 240 140 258" />
        {/* Front paw, with one toe */}
        <path d="M140 258 C137 270 140 278 150 280 C161 282 172 281 176 276 C179 272 178 264 176 258" />
        <path d="M160 280 C159 274 159 270 160 266" strokeWidth="3.5" />
        <path d="M176 258 C176 238 174 216 172 200" />
        {/* The thigh: what says he is sitting */}
        <path d="M244 200 C256 212 262 228 260 244 C258 262 246 274 228 278 C212 282 196 280 188 272 C180 264 182 250 192 238 C202 226 216 214 228 206" />
        <path d="M274 248 C274 264 266 274 254 278" />
        {/* Back paw peeking out in front of the thigh */}
        <path d="M188 272 C184 276 185 280 192 281 C202 282 212 282 218 280" strokeWidth="4.5" />
        <path d="M176 272 C182 276 185 278 188 278" />
      </g>

      <g className="lk-dog-head">
        {/* Muzzle, stop, skull */}
        <path d="M56 124 C72 116 88 111 102 109 C106 96 114 84 128 79 C140 75 152 77 160 84 C170 92 176 104 178 118" />
        {/* Jaw and throat */}
        <path d="M56 124 C51 131 53 139 61 142 C74 147 92 147 105 143 C118 139 128 144 134 155" />

        <g className="lk-dog-ear">
          <path d="M134 80 C146 58 164 46 176 48 C186 50 186 64 178 78 C171 90 163 97 155 100" />
        </g>

        <path
          d="M56 117 C62 116 67 120 67 125 C67 130 62 133 57 132 C52 131 50 127 51 123 C52 119 54 117 56 117 Z"
          fill="currentColor"
          stroke="none"
        />

        {/* The eye closes to a happy arc, or droops when he is sorry. */}
        {mood === 'happy' ? (
          <path d="M100 113 C104 106 112 106 116 113" strokeWidth="5" />
        ) : (
          <circle cx="107" cy="112" r="6" fill="currentColor" stroke="none" />
        )}
        <path
          className="lk-dog-brow"
          d={mood === 'sad' ? 'M98 103 C103 97 111 97 116 102' : 'M98 100 C103 96 111 96 116 100'}
          strokeWidth="4"
        />

        {/* Mouth: open and grinning, flat, or turned down. */}
        {mood === 'happy' ? (
          <>
            <path d="M61 134 C68 146 82 148 90 139 C82 141 70 139 61 134 Z" strokeWidth="4" />
            {/* The tongue does the heavy lifting: at 58px the eye and the
                mouth are a few pixels, but a tongue still reads as a happy
                dog. */}
            <path d="M69 145 C66 156 71 163 78 161 C84 159 85 150 82 144" strokeWidth="4" />
          </>
        ) : mood === 'sad' ? (
          <path d="M62 141 C70 135 80 135 88 139" strokeWidth="4" />
        ) : (
          <path d="M61 136 C69 141 80 141 88 138" strokeWidth="4" />
        )}
      </g>
    </svg>
  )
}
