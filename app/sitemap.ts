import type { MetadataRoute } from 'next'

/** Only the pages meant to be found: the door and the two tests. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://linguakit.vercel.app'
  const now = new Date()
  return [
    { url: base, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/test?lang=en`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/test?lang=pt`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/cadastro`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
  ]
}
