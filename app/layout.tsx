import type { Metadata, Viewport } from 'next'
import { Fraunces, DM_Sans } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  weight: ['300', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'LinguaKit — Brazilian Portuguese',
  description: 'Professional Brazilian Portuguese teaching platform by Marcos',
  icons: {
    icon: [{ url: '/icon-192.png', sizes: '192x192', type: 'image/png' }],
    // iOS uses this one for the home-screen tile.
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  // iOS reads these when the learner adds the site to their home screen.
  appleWebApp: {
    capable: true,
    title: 'LinguaKit',
    statusBarStyle: 'black-translucent',
  },
}

export const viewport: Viewport = {
  // A barra do navegador e a do iOS pegam esta cor. Com um valor só, o tema
  // escuro ganhava uma faixa que não combinava com nada da página.
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1a1814' },
    { media: '(prefers-color-scheme: dark)', color: '#14130f' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
