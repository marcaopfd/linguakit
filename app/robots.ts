import type { MetadataRoute } from 'next'

/**
 * Keeps the private half of the site out of search results.
 *
 * A learner's page is addressed by an unguessable id and that link is their
 * only credential — which holds right up until the link appears somewhere a
 * crawler can reach, and then their name, level and every mistake they have
 * made are a search away. There was no robots.txt at all before this: the path
 * was not public, so crawlers got a redirect to the login and assumed nothing
 * was off limits.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/test', '/cadastro', '/entrar'],
      disallow: ['/learn/', '/painel', '/students', '/login', '/api/'],
    },
    sitemap: 'https://linguakit.vercel.app/sitemap.xml',
  }
}
