'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { ModuleSummary } from '@/lib/curriculum-index'
import { MUSICAS } from '@/lib/musicas'
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
  const pct = modulos.length ? Math.round((feitos / modulos.length) * 100) : 0

  // Separadas de propósito: o que dá para abrir hoje vira cartão, o que ainda
  // não existe vira uma linha. Antes as duas "em breve" eram dois cartões do
  // mesmo tamanho das trilhas de verdade — metade da seção anunciava o que
  // não dá para fazer.
  const outrasAbertas = TRILHAS.filter(x => x.disponivel && x.id !== trilha.id && x.id !== 'geral')
  const emBreve = TRILHAS.filter(x => !x.disponivel)

  return (
    <section className="tr" style={{ padding: '1.5rem 1.25rem 0', maxWidth: 620, margin: '0 auto' }}>
      <style>{`
        .tr { --saida: cubic-bezier(.23, 1, .32, 1); }
        .tr a, .tr button { -webkit-tap-highlight-color: transparent; }
        .tr-cartao {
          display: block; text-decoration: none; color: inherit;
          transition: transform 170ms var(--saida), box-shadow 220ms var(--saida), border-color 170ms ease;
        }
        .tr-cartao:active { transform: scale(.985); }
        @media (hover: hover) and (pointer: fine) {
          .tr-cartao:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(0,0,0,.10); }
        }
        .tr-dupla { display: grid; gap: .65rem; grid-template-columns: 1fr; }
        @media (min-width: 420px) { .tr-dupla { grid-template-columns: 1fr 1fr; } }
        /* Grão no cartão da trilha ativa: é a única superfície escura desta
           tela, e lisa ela parece uma div. */
        .tr-ativa { position: relative; isolation: isolate; overflow: clip; }
        .tr-ativa::before {
          content: ''; position: absolute; inset: 0; z-index: -1; opacity: .45;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.82' numOctaves='3'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.06'/%3E%3C/svg%3E");
        }
      `}</style>

      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '.55rem' }}>
        <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--ink3)' }}>
          {t.trilhaSua}
        </span>
        <button
          onClick={() => { setEscolhida(null); try { localStorage.removeItem(CHAVE) } catch { /* ok */ } }}
          style={{ minHeight: 44, background: 'none', border: 'none', padding: '0 .2rem', fontFamily: 'inherit', fontSize: 12.5, color: 'var(--ink3)', textDecoration: 'underline', cursor: 'pointer' }}
        >
          {t.trilhaTrocar}
        </button>
      </div>

      {/* A trilha ativa: a maior coisa da tela, porque é o que a pessoa veio
          fazer. O número grande é o progresso — ele responde "quanto falta"
          antes de qualquer texto. */}
      <Link href={`/learn/${studentId}/trilha/${trilha.id}`} className="tr-cartao tr-ativa" style={{ background: 'var(--forest)', color: 'var(--on-panel)', borderRadius: 22, padding: '1.35rem 1.4rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
          <div style={{ minWidth: 0 }}>
            <span style={{ fontSize: 28 }}>{trilha.emoji}</span>
            <h2
              style={{
                fontFamily: 'var(--font-display), Bricolage Grotesque, sans-serif',
                fontSize: 'clamp(1.35rem, 6vw, 1.7rem)', fontWeight: 800,
                letterSpacing: '-0.03em', lineHeight: 1.1, color: 'var(--accent)',
                marginTop: '.5rem',
              }}
            >
              {trilha.nome}
            </h2>
            <p style={{ fontSize: 13.5, color: 'color-mix(in srgb, var(--on-panel) 72%, transparent)', lineHeight: 1.55, marginTop: '.4rem' }}>
              {trilha.promessa}
            </p>
          </div>
          <div style={{ flexShrink: 0, textAlign: 'right' }}>
            <div
              style={{
                fontFamily: 'var(--font-display), Bricolage Grotesque, sans-serif',
                fontSize: 34, fontWeight: 800, letterSpacing: '-0.04em',
                lineHeight: 1, fontVariantNumeric: 'tabular-nums',
              }}
            >
              {pct}<span style={{ fontSize: 17 }}>%</span>
            </div>
          </div>
        </div>

        <div style={{ height: 8, background: 'color-mix(in srgb, var(--on-panel) 16%, transparent)', borderRadius: 4, marginTop: '1rem' }}>
          <div style={{ height: 8, borderRadius: 4, background: 'var(--accent)', width: `${pct}%`, transition: 'width .5s var(--saida)' }} />
        </div>

        {/* A contagem mora embaixo da barra, não ao lado do número: no
            celular ela roubava largura do título, que quebrava em três
            linhas. Aqui ela fica junto do que explica. */}
        <div style={{ fontSize: 12, color: 'color-mix(in srgb, var(--on-panel) 58%, transparent)', marginTop: '.45rem' }}>
          {t.trilhaFeitos(feitos, modulos.length)}
        </div>

        <div style={{ marginTop: '.9rem' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.3rem', background: 'var(--accent)', color: 'var(--on-accent)', borderRadius: 999, padding: '.55rem 1.1rem', fontSize: 14, fontWeight: 700 }}>
            {feitos ? t.trilhaContinuar : t.trilhaComecar} →
          </span>
        </div>
      </Link>

      {/* Inglês Geral e Músicas deixaram de ser linha fina: são o que a pessoa
          abre quando a trilha dela acaba, e mereciam o mesmo peso. */}
      <div className="tr-dupla" style={{ marginTop: '.65rem' }}>
        {trilha.id !== 'geral' && (
          <Link href={`/learn/${studentId}/trilha/geral`} className="tr-cartao" style={cartao()}>
            <span style={{ fontSize: 24 }}>{geral.emoji}</span>
            <div style={{ fontSize: 14.5, fontWeight: 700, marginTop: '.5rem', letterSpacing: '-0.012em' }}>
              {t.trilhaGeralCartao}
            </div>
            <div style={{ fontSize: 12, color: 'var(--ink3)', lineHeight: 1.45, marginTop: '.2rem' }}>
              {geral.ritmo}
            </div>
          </Link>
        )}

        <Link href={`/learn/${studentId}/musicas`} className="tr-cartao" style={cartao()}>
          <span style={{ fontSize: 24 }}>🎧</span>
          <div style={{ fontSize: 14.5, fontWeight: 700, marginTop: '.5rem', letterSpacing: '-0.012em' }}>
            Músicas
          </div>
          <div style={{ fontSize: 12, color: 'var(--ink3)', lineHeight: 1.45, marginTop: '.2rem' }}>
            {MUSICAS.length} para ouvir, entender e interpretar
          </div>
        </Link>
      </div>

      {/* As outras trilhas que ABREM hoje. */}
      {outrasAbertas.length > 0 && (
        <div style={{ marginTop: '1.25rem' }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--ink3)', marginBottom: '.5rem' }}>
            {t.trilhaExplorar}
          </div>
          <div style={{ display: 'grid', gap: '.65rem' }}>
            {outrasAbertas.map(x => {
              const cor = levelTone(x.tom)
              return (
                <Link key={x.id} href={`/learn/${studentId}/trilha/${x.id}`} className="tr-cartao" style={{ ...cartao(), display: 'flex', alignItems: 'center', gap: '.85rem' }}>
                  <span style={{ fontSize: 26, flexShrink: 0 }}>{x.emoji}</span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: 'block', fontSize: 14.5, fontWeight: 700, color: cor.ink, letterSpacing: '-0.012em' }}>{x.nome}</span>
                    <span style={{ display: 'block', fontSize: 12.5, color: 'var(--ink3)', lineHeight: 1.45, marginTop: 1 }}>{x.promessa}</span>
                  </span>
                  <span style={{ flexShrink: 0, color: 'var(--ink3)', fontSize: 18 }}>›</span>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* O que ainda não existe vira UMA LINHA, não dois cartões. Continua
          dito — esconder o que vem depois faz a pessoa achar que acabou — mas
          deixa de disputar atenção com o que dá para fazer hoje. */}
      {emBreve.length > 0 && (
        <p style={{ fontSize: 12, color: 'var(--ink3)', lineHeight: 1.55, marginTop: '.9rem' }}>
          {/* Separador em ponto, não " e ": uma das trilhas se chama "Vender e
              Prospectar", e juntar com "e" daria "Trabalhar Online e Vender e
              Prospectar", que lê como três coisas. */}
          <span style={{ textTransform: 'capitalize' }}>{t.trilhaEmBreve}</span>
          {': '}
          {emBreve.map(x => x.nome).join(' · ')}
        </p>
      )}
    </section>
  )
}

/** O cartão comum desta tela, para os três lugares que usam o mesmo. */
function cartao(): React.CSSProperties {
  return {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 16,
    padding: '1rem 1.05rem',
  }
}

function estiloEscolha(_: Trilha): React.CSSProperties {
  return {
    display: 'flex', alignItems: 'center', gap: '.8rem', textAlign: 'left',
    width: '100%', minHeight: 76, padding: '1rem',
    background: 'var(--surface)', border: '1.5px solid var(--border)', borderRadius: 18,
    fontFamily: 'inherit', cursor: 'pointer',
  }
}
