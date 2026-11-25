'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Icon } from '@/components/Icon'
import { NavInferior } from '@/components/NavInferior'
import { levelTone } from '@/lib/levels'
import { FAMILIAS, musicaLivre, musicasDa, type Musica } from '@/lib/musicas'
import { uiStrings } from '@/lib/ui-strings'

/**
 * As músicas, agrupadas por dificuldade de ouvido — não por década.
 *
 * Pop primeiro porque a letra é simples e repetida; rap atual no fim porque é
 * rápido e cheio de gíria. Quem chega aqui não sabe onde o ouvido dele está,
 * então a primeira de cada grupo abre sem pagar: é assim que ele descobre.
 *
 * Todo texto desta tela está em português, escrito aqui mesmo: a seção só
 * existe no curso de inglês, e `uiStrings` guarda os textos que os dois
 * cursos dividem. Se um dia houver música brasileira no curso de português,
 * é aqui que os dois passam a precisar da mesma frase — e é aí que ela sobe
 * para o `uiStrings`.
 */
export function ListaDeMusicas({ studentId, assinante }: {
  studentId: string
  assinante: boolean
}) {
  const t = uiStrings('en-US')
  const [trilha, setTrilha] = useState('viagem')

  useEffect(() => {
    try {
      const guardada = localStorage.getItem('lk_trilha')
      if (guardada) setTrilha(guardada)
    } catch { /* janela anônima: a aba vai para a trilha padrão */ }
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <header style={{ background: 'var(--panel)', color: 'var(--on-panel)', padding: '1.5rem 1.25rem 1.6rem' }}>
        <Link
          href={`/learn/${studentId}`}
          style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, fontSize: 13, color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}
        >
          ← {t.trilhaVoltar}
        </Link>
        <div style={{ fontSize: 30, marginTop: '.2rem' }}>🎧</div>
        <h1 style={{ fontFamily: 'var(--font-display), Bricolage Grotesque, sans-serif', fontSize: 25, fontWeight: 700, marginTop: '.25rem' }}>
          Músicas
        </h1>
        <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,.6)', lineHeight: 1.5, marginTop: '.3rem' }}>
          Ouvir, tentar entender, traduzir, interpretar. Um trecho por música,
          o vocabulário do tema antes do play, e no fim você escreve o que
          pegou de ouvido.
        </p>
      </header>

      <main style={{ maxWidth: 620, margin: '0 auto', padding: '1.25rem 1rem 0' }}>
        {FAMILIAS.map(familia => {
          const musicas = musicasDa(familia.id)
          if (!musicas.length) return null
          return (
            <section key={familia.id} style={{ marginBottom: '1.6rem' }}>
              <h2 style={{ fontSize: 15.5, fontWeight: 700, color: 'var(--ink)' }}>{familia.nome}</h2>
              <p style={{ fontSize: 12.5, color: 'var(--ink3)', lineHeight: 1.45, margin: '.15rem 0 .6rem' }}>
                {familia.sub}
              </p>
              <div style={{ display: 'grid', gap: '.5rem' }}>
                {musicas.map(m => (
                  <CartaoDaMusica
                    key={m.videoId}
                    studentId={studentId}
                    musica={m}
                    aberta={assinante || musicaLivre(m)}
                  />
                ))}
              </div>
            </section>
          )
        })}
      </main>

      <NavInferior studentId={studentId} trilha={trilha} t={t} />
    </div>
  )
}

function CartaoDaMusica({ studentId, musica, aberta }: {
  studentId: string
  musica: Musica
  aberta: boolean
}) {
  const cor = levelTone(musica.nivel)
  const segundos = musica.fim - musica.inicio

  const corpo = (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: '.75rem',
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 14, padding: '.8rem .9rem', minHeight: 64,
        opacity: aberta ? 1 : 0.7,
      }}
    >
      <span
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 38, height: 38, borderRadius: 10, flexShrink: 0,
          background: cor.bg, color: cor.ink, fontSize: 11, fontWeight: 700,
        }}
      >
        {musica.nivel}
      </span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'block', fontSize: 14.5, fontWeight: 700, color: 'var(--ink)' }}>
          {musica.nome}
        </span>
        <span style={{ display: 'block', fontSize: 12.5, color: 'var(--ink3)', marginTop: 1 }}>
          {musica.artista} · {segundos}s
          {musica.linguagem === 'pesada' && ' · letra pesada'}
        </span>
      </span>
      <span style={{ flexShrink: 0, color: 'var(--ink3)', display: 'flex', alignItems: 'center' }}>
        {aberta ? '›' : <Icon name="key" size={16} />}
      </span>
    </div>
  )

  // Quem não assina vê o cartão e chega no paywall com o nome da música na
  // mão. Esconder o que está fechado é o que faz o curso parecer pequeno.
  return (
    <Link
      href={`/learn/${studentId}/musicas/${musica.videoId}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      {corpo}
    </Link>
  )
}
