'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Icon } from './Icon'

/**
 * Um trecho de vídeo do YouTube, no player oficial.
 *
 * Nada é baixado, cortado ou reenviado: o vídeo toca no player de quem o
 * publicou, com o anúncio dele e a contagem de views dele. O que é nosso são
 * os controles ao lado — repetir o trecho e abaixar a velocidade — e as
 * perguntas, que vivem no conteúdo da lição.
 *
 * Usa youtube-nocookie.com, que não planta cookie de rastreio antes de o
 * aluno dar play.
 *
 * Se o vídeo sair do ar ou o dono desligar a incorporação, a cena avisa e a
 * lição segue. Um vídeo que sumiu não pode derrubar a aula.
 */

type Player = {
  playVideo: () => void
  pauseVideo: () => void
  seekTo: (segundos: number, exato: boolean) => void
  setPlaybackRate: (taxa: number) => void
  getCurrentTime: () => number
  destroy: () => void
}

declare global {
  interface Window {
    YT?: { Player: new (el: HTMLElement, opts: unknown) => Player }
    onYouTubeIframeAPIReady?: () => void
  }
}

/** Carrega a API do YouTube uma vez só, por mais cenas que a página tenha. */
let apiCarregando: Promise<void> | null = null

function carregarApi(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  if (window.YT?.Player) return Promise.resolve()
  if (apiCarregando) return apiCarregando

  apiCarregando = new Promise<void>(resolve => {
    const anterior = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => { anterior?.(); resolve() }
    const script = document.createElement('script')
    script.src = 'https://www.youtube.com/iframe_api'
    document.head.appendChild(script)
  })
  return apiCarregando
}

export function SceneClip({ videoId, inicio, fim, titulo, foco, naoCarregou }: {
  videoId: string
  inicio: number
  fim: number
  titulo: string
  foco: string
  /** O que dizer quando o vídeo não puder tocar. */
  naoCarregou: string
}) {
  const caixa = useRef<HTMLDivElement>(null)
  const player = useRef<Player | null>(null)
  const [pronto, setPronto] = useState(false)
  const [falhou, setFalhou] = useState(false)
  const [devagar, setDevagar] = useState(false)

  useEffect(() => {
    let vivo = true
    const limite = setTimeout(() => { if (vivo && !pronto) setFalhou(true) }, 8000)

    carregarApi().then(() => {
      if (!vivo || !caixa.current || !window.YT) return
      player.current = new window.YT.Player(caixa.current, {
        videoId,
        playerVars: {
          start: inicio, end: fim,
          rel: 0, modestbranding: 1, playsinline: 1, cc_load_policy: 0,
          origin: window.location.origin,
        },
        host: 'https://www.youtube-nocookie.com',
        events: {
          onReady: () => { if (vivo) { setPronto(true); clearTimeout(limite) } },
          // 2, 5, 100, 101 e 150: id inválido, sem suporte, removido, ou o
          // dono desligou a incorporação. Todos dão no mesmo para o aluno.
          onError: () => { if (vivo) setFalhou(true) },
        },
      })
    })

    return () => {
      vivo = false
      clearTimeout(limite)
      try { player.current?.destroy() } catch { /* já foi */ }
    }
  }, [videoId, inicio, fim, pronto])

  const repetir = useCallback(() => {
    player.current?.seekTo(inicio, true)
    player.current?.playVideo()
  }, [inicio])

  const trocarVelocidade = useCallback(() => {
    const lento = !devagar
    setDevagar(lento)
    player.current?.setPlaybackRate(lento ? 0.75 : 1)
  }, [devagar])

  if (falhou) {
    return (
      <div style={{ background: 'var(--paper)', border: '1px dashed var(--border)', borderRadius: 14, padding: '1rem', fontSize: 13.5, color: 'var(--ink3)', lineHeight: 1.5 }}>
        {naoCarregou}
      </div>
    )
  }

  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ink3)', marginBottom: '.5rem' }}>
        A cena · {foco}
      </div>

      <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', background: 'var(--panel)', borderRadius: 14, overflow: 'hidden' }}>
        <div ref={caixa} style={{ width: '100%', height: '100%' }} />
      </div>

      <div style={{ display: 'flex', gap: '.5rem', marginTop: '.6rem' }}>
        <button onClick={repetir} disabled={!pronto} style={controle(false)}>
          <Icon name="repeat" size={15} /> Repetir o trecho
        </button>
        <button onClick={trocarVelocidade} disabled={!pronto} style={controle(devagar)}>
          {devagar ? '0,75×' : '1×'}
        </button>
      </div>

      <div style={{ fontSize: 12, color: 'var(--ink3)', marginTop: '.5rem', lineHeight: 1.45 }}>
        {titulo}
      </div>
    </div>
  )
}

function controle(ativo: boolean): React.CSSProperties {
  return {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '.35rem',
    minHeight: 44, padding: '0 .85rem', borderRadius: 10,
    border: `1px solid ${ativo ? 'var(--accent-dim)' : 'var(--border)'}`,
    background: ativo ? 'var(--accent)' : 'var(--surface)',
    color: ativo ? 'var(--on-accent)' : 'var(--ink2)',
    fontSize: 13, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer',
  }
}
