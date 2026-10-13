import type { Metadata } from 'next'

/**
 * Everything under /learn belongs to one person and is reached by a link that
 * is itself the credential. Search engines are told to stay out, in the page
 * as well as in robots.txt, because a crawler that finds the link some other
 * way never reads robots.txt for permission to keep what it already has.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
}

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return children
}
