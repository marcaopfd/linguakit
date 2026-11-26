import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Inter } from 'next/font/google'
import './globals.css'
import { SITE_URL } from '@/lib/site'

/*
 * Duas fontes, cada uma com um trabalho.
 *
 * A Bricolage Grotesque tem a personalidade que as referências pedem: larga,
 * firme, um pouco estranha nas curvas — serve para o título e para o número
 * grande, onde se quer que a pessoa olhe. A Inter é a que se lê sem reparar,
 * que é exatamente o que uma interface precisa.
 */
const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['600', '700', '800'],
  display: 'swap',
})

const ui = Inter({
  subsets: ['latin'],
  variable: '--font-ui',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  /**
   * Sem isto, `alternates.canonical: '/pagina'` e `openGraph.url` saíam
   * RELATIVOS no HTML — e og:url relativo não é URL para o WhatsApp nem para
   * o Facebook, que esperam endereço absoluto. A página de vendas estava
   * servindo <link rel="canonical" href="/ingles-para-morar-fora"> justo na
   * semana de comprar tráfego.
   *
   * Vindo de lib/site.ts, trocar de domínio resolve canonical, og:url e
   * og:image de uma vez.
   */
  metadataBase: new URL(SITE_URL),
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
    { media: '(prefers-color-scheme: light)', color: '#12150f' },
    { media: '(prefers-color-scheme: dark)', color: '#0e100c' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${ui.variable}`}>
      <body style={{ fontFamily: 'var(--font-ui), Inter, system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
