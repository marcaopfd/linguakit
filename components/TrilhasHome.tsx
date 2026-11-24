'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { ModuleSummary } from '@/lib/curriculum-index'
import { levelTone } from '@/lib/levels'
import { TRILHAS, concluidosNa, modulosDa, trilhaPorId, type Trilha } from '@/lib/trilhas'
import { uiStrings } from '@/lib/ui-strings'

const CHAVE = 'lk_trilha'

/**
 * As trilhas na home do aluno de inglês.
 *
 * Na primeira visita a pergunta é o motivo, não o nível: ninguém aprende
 * inglês "em geral", aprende porque vai viajar ou vai se mudar. Escolhida a
 * trilha, ela fica no topo — e logo abaixo, sempre, o Inglês Geral e as
 * outras áreas, porque a viagem acaba e o curso não pode acabar junto.
 *
 * A escolha mora neste navegador por enquanto. Vai para o banco junto com a
 * conta, que é quando passa a valer entre aparelhos.
 */
export function TrilhasHome({ studentId, niveis, lessons, t }: {
  studentId: string
  niveis: ModuleSummary[]
  lessons: { moduleId: string; unitIndex: number }[]
  t: ReturnType<typeof uiStrings>
}) {
  const [escolhida, setEscolhida] = useState<string | null>(null)
  const [lido, setLido] = useState(false)

  useEffect(() => {
    try { setEscolhida(localStorage.getItem(CHAVE)) } catch { /* janela anônima */ }
    setLido(true)
  }, [])

  function escolher(id: string) {
    setEscolhida(id)
    try { localStorage.setItem(CHAVE, id) } catch { /* nada para guardar nisso */ }
  }

  // Nada é desenhado antes de saber: a home piscando entre a pergunta e a
  // trilha escolhida é pior do que meio segundo de espera.
  if (!lido) return null

  const trilha = escolhida ? trilhaPorId(escolhida) : undefined
  const disponiveis = TRILHAS.filter(x => x.disponivel)

  if (!trilha) {
    return (
      <section style={{ padding: '1.5rem 1.25rem 0', maxWidth: 620, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-display), Bricolage Grotesque, sans-serif', fontSize: 19, fontWeight: 700, marginBottom: '.2rem' }}>
          {t.trilhaPergunta}
        </h2>
        <p style={{ fontSize: 13, color: 'var(--ink3)', marginBottom: '.9rem' }}>{t.trilhaPerguntaSub}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
          {disponiveis.map(x => (
            <button key={x.id} onClick={() => escolher(x.id)} style={estiloEscolha(x)}>
              <span style={{ fontSize: 24, flexShrink: 0 }}>{x.emoji}</span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 15.5, fontWeight: 700, color: 'var(--ink)' }}>{x.nome}</span>
                <span style={{ display: 'block', fontSize: 12.5, color: 'var(--ink2)', lineHeight: 1.45, marginTop: 2 }}>{x.promessa}</span>
              </span>
            </button>
          ))}
        </div>
      </section>
    )
  }

  const modulos = modulosDa(trilha, niveis)
  const unidadesPorModulo = new Map(niveis.map(n => [n.id, n.units.length]))
  const feitos = concluidosNa(trilha, modulos, lessons, unidadesPorModulo)
  const geral = trilhaPorId('geral')!
  const outras = TRILHAS.filter(x => x.id !== trilha.id && x.id !== 'geral')

  return (
    <section style={{ padding: '1.5rem 1.25rem 0', maxWidth: 620, margin: '0 auto' }}>
      {/* A trilha ativa, em destaque */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '.5rem' }}>
        <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--ink3)' }}>
          {t.trilhaSua}
        </span>
        <button
          onClick={() => { setEscolhida(null); try { localStorage.removeItem(CHAVE) } catch { /* ok */ } }}
          style={{ minHeight: 44, background: 'none', border: 'none', padding: '0 .2rem', fontFamily: 'inherit', fontSize: 12.5, color: 'var(--ink3)', textDecoration: 'underline', cursor: 'pointer' }}
        >
          {t.trilhaTrocar}
        </button>
      </div>

      <Link href={`/learn/${studentId}/trilha/${trilha.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{ background: 'var(--forest)', color: 'var(--on-panel)', borderRadius: 20, padding: '1.2rem 1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}>
            <span style={{ fontSize: 26 }}>{trilha.emoji}</span>
            <span style={{ fontFamily: 'var(--font-display), Bricolage Grotesque, sans-serif', fontSize: 20, fontWeight: 700, color: 'var(--accent)' }}>
              {trilha.nome}
            </span>
          </div>
          <p style={{ fontSize: 13.5, color: 'rgba(242,244,233,.72)', lineHeight: 1.5, margin: '.5rem 0 .85rem' }}>{trilha.promessa}</p>
          <div style={{ height: 7, background: 'rgba(242,244,233,.16)', borderRadius: 4 }}>
            <div style={{ height: 7, borderRadius: 4, background: 'var(--accent)', width: `${modulos.length ? Math.round((feitos / modulos.length) * 100) : 0}%`, transition: 'width .5s' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '.6rem' }}>
            <span style={{ fontSize: 12, color: 'rgba(242,244,233,.55)' }}>{t.trilhaFeitos(feitos, modulos.length)}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.3rem', background: 'var(--accent)', color: 'var(--on-accent)', borderRadius: 999, padding: '.4rem .85rem', fontSize: 13, fontWeight: 700 }}>
              {feitos ? t.trilhaContinuar : t.trilhaComecar} →
            </span>
          </div>
        </div>
      </Link>

      {/* O Inglês Geral, que nunca sai da tela */}
      {trilha.id !== 'geral' && (
        <Link href={`/learn/${studentId}/trilha/geral`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.7rem', marginTop: '.7rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '.85rem 1rem' }}>
            <span style={{ fontSize: 20, flexShrink: 0 }}>{geral.emoji}</span>
            <span style={{ flex: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 14, fontWeight: 700 }}>{t.trilhaGeralCartao}</span>
              <span style={{ display: 'block', fontSize: 12.5, color: 'var(--ink3)', marginTop: 1 }}>{geral.ritmo}</span>
            </span>
            <span style={{ flexShrink: 0, color: 'var(--ink3)', fontSize: 18 }}>›</span>
          </div>
        </Link>
      )}

      {/* O que mais existe aqui dentro */}
      <div style={{ marginTop: '1.1rem' }}>
        <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--ink3)', marginBottom: '.5rem' }}>
          {t.trilhaExplorar}
        </div>
        <div className="lk-trilhas-fileira">
          {outras.map(x => {
            const cor = levelTone(x.tom)
            const corpo = (
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '.85rem .9rem', height: '100%', opacity: x.disponivel ? 1 : .6 }}>
                <div style={{ fontSize: 20 }}>{x.emoji}</div>
                <div style={{ fontSize: 13.5, fontWeight: 700, marginTop: '.3rem', color: x.disponivel ? cor.ink : 'var(--ink3)' }}>{x.nome}</div>
                <div style={{ fontSize: 12, color: 'var(--ink3)', lineHeight: 1.45, marginTop: '.2rem' }}>{x.promessa}</div>
                {!x.disponivel && (
                  <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--ink3)', marginTop: '.4rem' }}>
                    {t.trilhaEmBreve}
                  </div>
                )}
              </div>
            )
            return x.disponivel
              ? <Link key={x.id} href={`/learn/${studentId}/trilha/${x.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>{corpo}</Link>
              : <div key={x.id}>{corpo}</div>
          })}
        </div>
      </div>
    </section>
  )
}

function estiloEscolha(_: Trilha): React.CSSProperties {
  return {
    display: 'flex', alignItems: 'center', gap: '.8rem', textAlign: 'left',
    width: '100%', minHeight: 76, padding: '1rem',
    background: 'var(--surface)', border: '1.5px solid var(--border)', borderRadius: 18,
    fontFamily: 'inherit', cursor: 'pointer',
  }
}
