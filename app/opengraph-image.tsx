import { ImageResponse } from 'next/og'

/**
 * The card that appears when the link is pasted into WhatsApp, Instagram or
 * anywhere else that unfurls a URL.
 *
 * Drawn here rather than shipped as a file so it stays in step with the site:
 * same ink, same cream, same dog. The dog is the landing page's paths inlined,
 * because ImageResponse renders its own small subset of CSS and cannot reach
 * into a React component that relies on stylesheets.
 */

export const alt = 'LinguaKit — inglês e português, do zero ao avançado'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const INK = '#1a1814'
const CREAM = '#faf8f3'

/**
 * Fraunces is the site's heading face. Fetched at build time with a fallback:
 * if Google is unreachable the card still renders, just in the default face,
 * which is far better than failing the build over a typeface.
 */
async function fraunces(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700&display=swap',
      { headers: { 'User-Agent': 'Mozilla/5.0' } },
    ).then(r => r.text())

    const url = css.match(/src: url\((https:[^)]+)\) format\('(?:truetype|opentype)'\)/)?.[1]
    if (!url) return null
    return await fetch(url).then(r => r.arrayBuffer())
  } catch {
    return null
  }
}

export default async function Image() {
  const font = await fraunces()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: INK,
          color: CREAM,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 90px',
          textAlign: 'center',
        }}
      >
        <svg
          viewBox="40 36 278 266"
          width={168}
          height={161}
          fill="none"
          stroke={CREAM}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M272 236 C290 228 303 210 302 192 C301 180 292 175 285 180 C278 185 278 194 283 200" />
          <path d="M178 118 C190 126 198 138 203 152 C212 176 228 190 244 200 C262 212 272 228 274 248" />
          <path d="M134 155 C141 168 143 180 143 192 C141 216 140 240 140 258" />
          <path d="M140 258 C137 270 140 278 150 280 C161 282 172 281 176 276 C179 272 178 264 176 258" />
          <path d="M176 258 C176 238 174 216 172 200" />
          <path d="M244 200 C256 212 262 228 260 244 C258 262 246 274 228 278 C212 282 196 280 188 272 C180 264 182 250 192 238 C202 226 216 214 228 206" />
          <path d="M274 248 C274 264 266 274 254 278" />
          <path d="M188 272 C184 276 185 280 192 281 C202 282 212 282 218 280" />
          <path d="M56 124 C72 116 88 111 102 109 C106 96 114 84 128 79 C140 75 152 77 160 84 C170 92 176 104 178 118" />
          <path d="M56 124 C51 131 53 139 61 142 C74 147 92 147 105 143 C118 139 128 144 134 155" />
          <path d="M134 80 C146 58 164 46 176 48 C186 50 186 64 178 78 C171 90 163 97 155 100" />
          <path d="M56 117 C62 116 67 120 67 125 C67 130 62 133 57 132 C52 131 50 127 51 123 C52 119 54 117 56 117 Z" fill={CREAM} />
          <path d="M100 113 C104 106 112 106 116 113" />
          <path d="M61 134 C68 146 82 148 90 139 C82 141 70 139 61 134 Z" />
          <path d="M69 145 C66 156 71 163 78 161 C84 159 85 150 82 144" />
        </svg>

        <div
          style={{
            display: 'flex',
            fontSize: 70,
            fontWeight: 700,
            lineHeight: 1.1,
            marginTop: 38,
            fontFamily: font ? 'Fraunces' : undefined,
          }}
        >
          Inglês e português
        </div>

        <div style={{ display: 'flex', fontSize: 31, color: 'rgba(250,248,243,.6)', marginTop: 22, lineHeight: 1.4 }}>
          Do zero ao avançado, no sotaque de onde você vai
        </div>

        <div style={{ display: 'flex', fontSize: 23, color: 'rgba(250,248,243,.38)', marginTop: 44, letterSpacing: 2 }}>
          6 NÍVEIS · 50 UNIDADES · TUDO FALADO
        </div>
      </div>
    ),
    {
      ...size,
      fonts: font
        ? [{ name: 'Fraunces', data: font, style: 'normal' as const, weight: 700 as const }]
        : undefined,
    },
  )
}
