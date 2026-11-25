import type { MetadataRoute } from 'next'

/**
 * Só as páginas feitas para serem achadas.
 *
 * A de vendas vem com prioridade 1, igual à raiz: é ela que responde à busca
 * de quem procura "inglês para morar fora", e é para onde o anúncio aponta.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://linguakit.vercel.app'
  const now = new Date()
  return [
    { url: base, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/ingles-para-morar-fora`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/test?lang=en`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/test?lang=pt`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/cadastro`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${base}/termos`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${base}/privacidade`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${base}/reembolso`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/contato`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
