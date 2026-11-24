'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icon, type IconName } from './Icon'
import type { uiStrings } from '@/lib/ui-strings'

/**
 * A barra de baixo, onde o polegar alcança.
 *
 * Quatro destinos, todos existindo de verdade: a home, a trilha ativa, a
 * revisão e a palavra do dia. O documento pedia uma aba de Perfil; ela entra
 * quando houver conta e plano para mostrar nela — aba que abre tela vazia é
 * pior do que aba que não existe.
 *
 * Só aparece no curso de inglês, que é onde as trilhas existem.
 */
export function NavInferior({ studentId, trilha, t }: {
  studentId: string
  /** A trilha ativa, para a segunda aba saber para onde ir. */
  trilha: string
  t: ReturnType<typeof uiStrings>
}) {
  const aqui = usePathname()
  const base = `/learn/${studentId}`

  const abas: { href: string; rotulo: string; icone: IconName; ativa: boolean }[] = [
    { href: base, rotulo: t.navInicio, icone: 'book', ativa: aqui === base },
    { href: `${base}/trilha/${trilha}`, rotulo: t.navTrilha, icone: 'target', ativa: aqui.startsWith(`${base}/trilha`) },
    { href: `${base}/revisar`, rotulo: t.navRevisao, icone: 'repeat', ativa: aqui.startsWith(`${base}/revisar`) },
    { href: `${base}/palavra`, rotulo: t.navPalavra, icone: 'key', ativa: aqui.startsWith(`${base}/palavra`) },
  ]

  return (
    <>
      {/* O mesmo espaço que a barra ocupa, para ela não cobrir o fim da página. */}
      <div style={{ height: 'calc(64px + env(safe-area-inset-bottom, 0px))' }} aria-hidden />
      <nav
        style={{
          position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 20,
          display: 'flex', background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        {abas.map(aba => (
          <Link
            key={aba.href}
            href={aba.href}
            aria-current={aba.ativa ? 'page' : undefined}
            style={{
              flex: 1, minHeight: 64, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 3,
              textDecoration: 'none',
              color: aba.ativa ? 'var(--ink)' : 'var(--ink3)',
              fontWeight: aba.ativa ? 600 : 500,
            }}
          >
            <Icon name={aba.icone} size={20} strokeWidth={aba.ativa ? 2.1 : 1.8} />
            <span style={{ fontSize: 11 }}>{aba.rotulo}</span>
          </Link>
        ))}
      </nav>
    </>
  )
}
