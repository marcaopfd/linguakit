'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Icon } from '@/components/Icon'
import { SceneClip } from '@/components/SceneClip'
import { SpeakButton, useVoice } from '@/components/SpeakButton'
import { levelTone } from '@/lib/levels'
import { MUSICAS, type Musica } from '@/lib/musicas'

/**
 * A aula de uma música, na ordem em que se aprende de verdade:
 *
 *   1. do que isso fala, em português — para o ouvido chegar sabendo o tema;
 *   2. o vocabulário do tema, com áudio;
 *   3. o trecho, no player oficial, quantas vezes quiser e em 0,75×;
 *   4. duas perguntas: uma de sentido, uma de língua;
 *   5. o que você escreve. Essa parte não tem gabarito, e é a mais importante.
 *
 * Nada toca sozinho. O play é do aluno, aqui e em todo o resto do curso.
 */
export function AulaDeMusica({ studentId, musica }: {
  studentId: string
  musica: Musica
}) {
  const cor = levelTone(musica.nivel)
  const { voice, ready } = useVoice('en-US')
  const indice = MUSICAS.findIndex(m => m.videoId === musica.videoId)
  const proxima = MUSICAS[indice + 1] ?? null

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', paddingBottom: '3rem' }}>
      <header style={{ background: 'var(--panel)', color: 'var(--on-panel)', padding: '1.25rem 1.25rem 1.5rem' }}>
        <Link
          href={`/learn/${studentId}/musicas`}
          style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, fontSize: 13, color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}
        >
          ← Todas as músicas
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginTop: '.2rem' }}>
          <span style={{ background: cor.bg, color: cor.ink, borderRadius: 6, padding: '.15rem .45rem', fontSize: 11, fontWeight: 700 }}>
            {musica.nivel}
          </span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,.45)' }}>
            {musica.fim - musica.inicio} segundos de trecho
          </span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-display), Bricolage Grotesque, sans-serif', fontSize: 23, fontWeight: 700, marginTop: '.4rem' }}>
          {musica.nome}
        </h1>
        <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,.6)', marginTop: '.15rem' }}>
          {musica.artista} · {musica.foco}
        </p>
      </header>

      <main style={{ maxWidth: 620, margin: '0 auto', padding: '1.1rem 1rem 0' }}>
        {musica.aviso && (
          <div
            style={{
              display: 'flex', gap: '.6rem', alignItems: 'flex-start',
              background: 'var(--paper)', border: '1px solid var(--border)',
              borderRadius: 12, padding: '.8rem .9rem', marginBottom: '1rem',
            }}
          >
            <span style={{ flexShrink: 0, color: 'var(--ink2)', marginTop: 1 }}>
              <Icon name="flag" size={16} />
            </span>
            <span style={{ fontSize: 12.5, color: 'var(--ink2)', lineHeight: 1.5 }}>
              <strong style={{ fontWeight: 700 }}>Antes de dar play: </strong>
              {musica.aviso}
            </span>
          </div>
        )}

        <Secao numero={1} titulo="Do que fala">
          <p style={{ fontSize: 14, color: 'var(--ink2)', lineHeight: 1.6 }}>{musica.tema}</p>
        </Secao>

        <Secao numero={2} titulo="O inglês do tema" sub="Leia e ouça antes do play. Depois você reconhece.">
          <div style={{ display: 'grid', gap: '.5rem' }}>
            {musica.vocabulario.map(v => (
              <div
                key={v.en}
                style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: 12, padding: '.75rem .85rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                  <span lang="en" translate="no" style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--ink)' }}>
                    {v.en}
                  </span>
                  <SpeakButton text={v.en} lang="en-US" voice={voice} ready={ready} listen="Ouvir" />
                </div>
                <div style={{ fontSize: 13, color: 'var(--ink2)', marginTop: '.2rem' }}>{v.pt}</div>
                {v.nota && (
                  <div style={{ fontSize: 12, color: 'var(--ink3)', lineHeight: 1.5, marginTop: '.35rem' }}>
                    {v.nota}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Secao>

        <Secao numero={3} titulo="Ouça o trecho" sub="O play é seu. Repita quantas vezes quiser, e use 0,75× quando a fala for rápida.">
          <SceneClip
            videoId={musica.videoId}
            inicio={musica.inicio}
            fim={musica.fim}
            titulo={`${musica.artista} — ${musica.nome}`}
            foco={musica.foco}
            naoCarregou="Este vídeo saiu do ar ou o dono desligou a incorporação. O resto da aula continua funcionando — e nós vamos trocar o trecho."
          />
          <p style={{ fontSize: 11.5, color: 'var(--ink3)', lineHeight: 1.5, marginTop: '.6rem' }}>
            O vídeo toca no canal oficial de {musica.canal}. Nada aqui é baixado
            nem recortado, e a letra não é publicada: ela é de quem a escreveu.
          </p>
        </Secao>

        <Secao numero={4} titulo="Duas perguntas">
          <div style={{ display: 'grid', gap: '.75rem' }}>
            {musica.perguntas.map((p, i) => (
              <Pergunta key={i} pergunta={p} />
            ))}
          </div>
        </Secao>

        <Secao numero={5} titulo="Agora escreva" sub="Sem gabarito: o que você escrever aqui é a prova de que ouviu.">
          <div style={{ display: 'grid', gap: '.75rem' }}>
            {musica.tarefas.map((tarefa, i) => (
              <Tarefa key={i} chave={`lk_musica_${musica.videoId}_${i}`} enunciado={tarefa} />
            ))}
          </div>
        </Secao>

        <div style={{ display: 'flex', gap: '.6rem', marginTop: '1.4rem' }}>
          <Link
            href={`/learn/${studentId}/musicas`}
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
              minHeight: 48, borderRadius: 999, textDecoration: 'none',
              background: 'var(--surface)', border: '1px solid var(--border)',
              color: 'var(--ink2)', fontSize: 14, fontWeight: 600,
            }}
          >
            Todas as músicas
          </Link>
          {proxima && (
            <Link
              href={`/learn/${studentId}/musicas/${proxima.videoId}`}
              style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                minHeight: 48, borderRadius: 999, textDecoration: 'none',
                background: 'var(--accent)', color: 'var(--on-accent)',
                fontSize: 14, fontWeight: 700,
              }}
            >
              Próxima →
            </Link>
          )}
        </div>
      </main>
    </div>
  )
}

function Secao({ numero, titulo, sub, children }: {
  numero: number
  titulo: string
  sub?: string
  children: React.ReactNode
}) {
  return (
    <section style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
        <span
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 22, height: 22, borderRadius: 999, flexShrink: 0,
            // Lima nos dois temas: no escuro, o preto do painel some dentro
            // do próprio fundo e o número fica boiando sem círculo.
            background: 'var(--accent)', color: 'var(--on-accent)',
            fontSize: 11.5, fontWeight: 700,
          }}
        >
          {numero}
        </span>
        <h2 style={{ fontSize: 15.5, fontWeight: 700, color: 'var(--ink)' }}>{titulo}</h2>
      </div>
      {sub && (
        <p style={{ fontSize: 12.5, color: 'var(--ink3)', lineHeight: 1.45, margin: '.2rem 0 0 1.9rem' }}>
          {sub}
        </p>
      )}
      <div style={{ marginTop: '.6rem' }}>{children}</div>
    </section>
  )
}

/**
 * Uma pergunta de múltipla escolha que não esconde o erro: marcou errado,
 * a certa aparece junto com o porquê. Esconder a resposta até acertar
 * transforma a pergunta em adivinhação.
 */
function Pergunta({ pergunta }: { pergunta: Musica['perguntas'][number] }) {
  const [escolhida, setEscolhida] = useState<number | null>(null)
  const respondida = escolhida !== null

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '.9rem' }}>
      <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.45 }}>{pergunta.pergunta}</p>
      <div style={{ display: 'grid', gap: '.4rem', marginTop: '.65rem' }}>
        {pergunta.opcoes.map((opcao, i) => {
          const certa = i === pergunta.resposta
          const minha = i === escolhida
          const fundo = respondida && certa ? 'var(--accent-soft)' : 'var(--paper)'
          const borda = respondida && certa
            ? 'var(--accent-dim)'
            : respondida && minha ? 'var(--ink3)' : 'var(--border)'
          return (
            <button
              key={i}
              type="button"
              onClick={() => { if (!respondida) setEscolhida(i) }}
              disabled={respondida}
              style={{
                display: 'flex', alignItems: 'center', gap: '.5rem',
                textAlign: 'left', width: '100%', minHeight: 44,
                padding: '.6rem .75rem', borderRadius: 10,
                background: fundo, border: `1.5px solid ${borda}`,
                color: 'var(--ink)', fontSize: 13.5, fontFamily: 'inherit',
                cursor: respondida ? 'default' : 'pointer',
              }}
            >
              <span style={{ flex: 1 }}>{opcao}</span>
              {respondida && certa && (
                <span style={{ flexShrink: 0, color: 'var(--ink)' }}><Icon name="check" size={15} /></span>
              )}
              {respondida && minha && !certa && (
                <span style={{ flexShrink: 0, color: 'var(--ink3)', fontSize: 15 }}>×</span>
              )}
            </button>
          )
        })}
      </div>
      {respondida && pergunta.porque && (
        <p style={{ fontSize: 12.5, color: 'var(--ink2)', lineHeight: 1.5, marginTop: '.6rem' }}>
          {pergunta.porque}
        </p>
      )}
    </div>
  )
}

/**
 * O que o aluno escreve fica neste navegador, e a tela diz isso.
 *
 * Mandar para o banco exige conta, e conta é o passo seguinte do produto.
 * Até lá, prometer que "ficou salvo" seria mentira na primeira troca de
 * aparelho.
 */
function Tarefa({ chave, enunciado }: { chave: string; enunciado: string }) {
  const [texto, setTexto] = useState('')
  const [carregado, setCarregado] = useState(false)

  useEffect(() => {
    try { setTexto(localStorage.getItem(chave) ?? '') } catch { /* janela anônima */ }
    setCarregado(true)
  }, [chave])

  function mudar(valor: string) {
    setTexto(valor)
    try { localStorage.setItem(chave, valor) } catch { /* nada a guardar */ }
  }

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '.9rem' }}>
      <label style={{ display: 'block', fontSize: 13.5, color: 'var(--ink2)', lineHeight: 1.5 }}>
        {enunciado}
        <textarea
          value={texto}
          onChange={e => mudar(e.target.value)}
          rows={3}
          spellCheck={false}
          placeholder={carregado ? 'Escreva aqui…' : ''}
          style={{
            display: 'block', width: '100%', marginTop: '.5rem',
            background: 'var(--paper)', border: '1px solid var(--border)',
            borderRadius: 10, padding: '.6rem .7rem',
            fontFamily: 'inherit', fontSize: 14, color: 'var(--ink)',
            lineHeight: 1.5, resize: 'vertical',
          }}
        />
      </label>
      <p style={{ fontSize: 11, color: 'var(--ink3)', marginTop: '.4rem' }}>
        Fica guardado neste aparelho.
      </p>
    </div>
  )
}
