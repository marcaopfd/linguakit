'use client'

import Link from 'next/link'
import { Icon } from '@/components/Icon'
import { NavInferior } from '@/components/NavInferior'
import type { ModuleSummary } from '@/lib/curriculum-index'
import { levelTone } from '@/lib/levels'
import { caminhoDoModulo, modulosDa, type Trilha } from '@/lib/trilhas'
import { tamanhoDoKit } from '@/lib/trilhas/kit'
import { uiStrings } from '@/lib/ui-strings'

/**
 * Os módulos de cima para baixo, ligados por um fio.
 *
 * Nada fica escondido: o módulo que ainda não tem lição aparece igual aos
 * outros, com a meta escrita, e só não abre. A pessoa precisa ver o caminho
 * inteiro para saber onde está indo — esconder o que vem depois é o que faz
 * um curso parecer que acabou.
 */
export function MapaDaTrilha({ studentId, trilha, niveis, lessons, assinante }: {
  studentId: string
  trilha: Trilha
  niveis: ModuleSummary[]
  lessons: { moduleId: string; unitIndex: number }[]
  /** Quem não assina vê o cadeado do segundo módulo em diante. */
  assinante: boolean
}) {
  // No curso de inglês quem lê a interface é brasileiro.
  const t = uiStrings('en-US')
  const modulos = modulosDa(trilha, niveis)
  const frasesNoKit = tamanhoDoKit(trilha)
  const temKit = frasesNoKit > 0
  const tom = levelTone(trilha.tom)

  const unidadesPorModulo = new Map(niveis.map(n => [n.id, n.units.length]))
  const feitasEm = (id: string) => new Set(lessons.filter(l => l.moduleId === id).map(l => l.unitIndex)).size

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <header style={{ background: 'var(--panel)', color: 'var(--on-panel)', padding: '1.5rem 1.25rem 1.6rem' }}>
        <Link
          href={`/learn/${studentId}`}
          style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, fontSize: 13, color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}
        >
          ← {t.trilhaVoltar}
        </Link>
        <div style={{ fontSize: 30, marginTop: '.2rem' }}>{trilha.emoji}</div>
        <h1 style={{ fontFamily: 'var(--font-display), Bricolage Grotesque, sans-serif', fontSize: 25, fontWeight: 700, marginTop: '.25rem' }}>
          {trilha.nome}
        </h1>
        <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,.6)', lineHeight: 1.5, marginTop: '.3rem' }}>
          {trilha.promessa}
        </p>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,.4)', marginTop: '.5rem' }}>{trilha.ritmo}</div>
      </header>

      <main style={{ maxWidth: 620, margin: '0 auto', padding: '1.25rem 1rem 0' }}>
        {/* O kit só existe onde há frase escrita para pôr nele. */}
        {temKit && assinante && (
          <a
            href={`/api/pdf/trilha/${trilha.id}?s=${studentId}`}
            style={{
              display: 'flex', alignItems: 'center', gap: '.75rem',
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 14, padding: '.85rem 1rem', marginBottom: '1rem',
              textDecoration: 'none', color: 'inherit', minHeight: 60,
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 38, borderRadius: 10, background: 'var(--accent)', color: 'var(--on-accent)', flexShrink: 0 }}>
              <Icon name="book" size={19} />
            </span>
            <span style={{ flex: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 14.5, fontWeight: 700 }}>{t.kitTitulo}</span>
              <span style={{ display: 'block', fontSize: 12.5, color: 'var(--ink3)', marginTop: 1 }}>{t.kitSub(frasesNoKit)}</span>
            </span>
            <span style={{ flexShrink: 0, color: 'var(--ink3)', fontSize: 16 }}>↓</span>
          </a>
        )}

        {modulos.map((mod, i) => {
          const total = unidadesPorModulo.get(mod.id) ?? mod.licoes.length
          const feitas = feitasEm(mod.id)
          const pronto = total > 0 && feitas >= total
          const href = caminhoDoModulo(studentId, trilha, mod)
          // A trilha Geral é de graça inteira; nas outras, o primeiro módulo
          // é a amostra e o resto é do plano.
          const fechado = trilha.id !== 'geral' && !assinante && mod.numero > 1

          const corpo = (
            <div style={{ display: 'flex', gap: '.85rem', alignItems: 'flex-start' }}>
              {/* A coluna do caminho: o número e o fio que liga ao próximo. */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: 'stretch', flexShrink: 0 }}>
                <div
                  style={{
                    width: 38, height: 38, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 15, fontWeight: 700,
                    background: pronto ? 'var(--accent)' : 'var(--surface)',
                    color: pronto ? 'var(--on-accent)' : 'var(--ink3)',
                    border: `2px solid ${pronto ? 'var(--accent)' : 'var(--border)'}`,
                  }}
                >
                  {pronto ? '✓' : mod.numero}
                </div>
                {i < modulos.length - 1 && (
                  <div style={{ flex: 1, width: 2, minHeight: 22, background: 'var(--border)', marginTop: 4 }} />
                )}
              </div>

              <div
                style={{
                  flex: 1, minWidth: 0, marginBottom: '.85rem',
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: 14, padding: '.9rem 1rem',
                  opacity: href ? 1 : .72,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.2rem' }}>
                  <span style={{ fontSize: 17 }}>{mod.emoji}</span>
                  <span style={{ flex: 1, minWidth: 0, fontSize: 15.5, fontWeight: 700, color: 'var(--ink)' }}>{mod.nome}</span>
                  {fechado && (
                    <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: '.25rem', background: 'var(--paper)', border: '1px solid var(--border)', borderRadius: 999, padding: '.15rem .5rem', fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em', color: 'var(--ink3)' }}>
                      <Icon name="key" size={11} /> Plano
                    </span>
                  )}
                </div>
                <p style={{ fontSize: 13, color: 'var(--ink2)', lineHeight: 1.5 }}>{mod.consegue}</p>

                {total > 0 ? (
                  <div style={{ marginTop: '.6rem' }}>
                    <div style={{ height: 5, background: 'var(--paper)', borderRadius: 3 }}>
                      <div style={{ height: 5, borderRadius: 3, background: 'var(--accent-dim)', width: `${Math.round((feitas / total) * 100)}%`, transition: 'width .4s' }} />
                    </div>
                    <div style={{ fontSize: 11.5, color: 'var(--ink3)', marginTop: '.3rem' }}>{feitas}/{total}</div>
                  </div>
                ) : (
                  <div style={{ fontSize: 11.5, color: 'var(--ink3)', marginTop: '.5rem', fontStyle: 'italic' }}>
                    {t.trilhaEscrevendo}
                  </div>
                )}
              </div>
            </div>
          )

          return href
            ? <Link key={mod.id} href={href} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>{corpo}</Link>
            : <div key={mod.id}>{corpo}</div>
        })}
      </main>

      <NavInferior studentId={studentId} trilha={trilha.id} t={t} />
    </div>
  )
}
