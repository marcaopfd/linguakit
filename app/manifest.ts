import type { MetadataRoute } from 'next'

/**
 * Lets a learner keep LinguaKit on their phone's home screen.
 *
 * `display: standalone` opens it without the browser chrome, which on iOS is
 * what makes it feel like an app rather than a bookmark.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'LinguaKit',
    short_name: 'LinguaKit',
    description: 'Português e inglês, no seu ritmo.',
    start_url: '/entrar',
    display: 'standalone',
    background_color: '#faf7f0',
    theme_color: '#1a1814',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
