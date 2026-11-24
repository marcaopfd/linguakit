'use client'

import { useState } from 'react'
import { Caramelo } from '@/components/Caramelo'
import { SpeakButton, useVoice } from '@/components/SpeakButton'
import { estrelas, precoApos, simulacaoPorId, type Opcao } from '@/lib/trilhas/simulacoes'
import { botaoPrincipal } from './view'

/**
 * A conversa com o vendedor.
 *
 * Ele tem um preço mínimo e não o fura. Cada escolha do aluno derruba o preço
 * de acordo com a estratégia usada — ou não derruba nada, quando a frase foi
 * uma exigência. No fim o aluno vê quanto pagou, quanto era a meta, que
 * estratégias usou e como teria dito melhor as frases fracas.
 */
export function Simulador({ simulacaoId, lang, audio, onSeguir }: {
  simulacaoId: string
  lang: string
  audio: ReturnType<typeof useVoice>
  onSeguir: () => void
}) {
  const sim = simulacaoPorId(simulacaoId)
  const [turno, setTurno] = useState(0)
  const [escolhidas, setEscolhidas] = useState<Opcao[]>([])
  const [acabou, setAcabou] = useState(false)
  const [ajuda, setAjuda] = useState(false)

  if (!sim) return <button onClick={onSeguir} style={botaoPrincipal()}>Continuar</button>

  const preco = precoApos(sim, escolhidas.map(o => o.corta))
  const atual = sim.turnos[turno]

  function escolher(o: Opcao) {
    if (!sim) return
    const todas = [...escolhidas, o]
    setEscolhidas(todas)
    setAjuda(false)

    // Ir embora é a jogada mais forte: ele chama de volta com o preço mínimo.
    if (o.saiEmbora) { setAcabou(true); return }
    if (o.fecha || turno >= sim.turnos.length - 1) { setAcabou(true); return }
    setTurno(t => t + 1)
  }

  if (acabou) {
    const saiu = escolhidas[escolhidas.length - 1]?.saiEmbora
    const final = saiu ? sim.precoMinimo : preco
    const nota = estrelas(sim, final)
    const bateu = final <= sim.meta
    const estrategias = escolhidas.map(o => o.estrategia).filter(Boolean) as string[]
    const melhores = escolhidas.filter(o => o.melhor)

    return (
      <div className="lk-card" style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', color: 'var(--ink)' }}>
          <Caramelo mood={bateu ? 'happy' : 'sad'} size={68} />
        </div>
        <div style={{ fontSize: 26, letterSpacing: '.1em', marginTop: '.2rem' }}>
          {'★'.repeat(nota)}<span style={{ color: 'var(--border)' }}>{'★'.repeat(3 - nota)}</span>
        </div>
        <h3 style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 21, fontWeight: 700, marginTop: '.4rem' }}>
          Você pagou {final} {sim.moeda}
        </h3>
        <p style={{ fontSize: 13.5, color: 'var(--ink3)', marginTop: '.2rem' }}>
          Meta: {sim.meta} {sim.moeda} {bateu ? '✅' : '— ficou acima'}
        </p>

        {estrategias.length > 0 && (
          <div style={{ marginTop: '1rem', textAlign: 'left', background: 'var(--ok-bg)', border: '1px solid var(--ok-border)', borderRadius: 12, padding: '.8rem .9rem' }}>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--ok-ink)', marginBottom: '.35rem' }}>
              O que você usou
            </div>
            {estrategias.map((e, i) => (
              <div key={i} style={{ fontSize: 13.5, color: 'var(--ink)', lineHeight: 1.6 }}>• {e}</div>
            ))}
          </div>
        )}

        {melhores.length > 0 && (
          <div style={{ marginTop: '.7rem', textAlign: 'left', background: 'var(--note-bg)', border: '1px solid var(--note-border)', borderRadius: 12, padding: '.8rem .9rem' }}>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--note-ink)', marginBottom: '.35rem' }}>
              Daria para dizer melhor
            </div>
            {melhores.map((o, i) => (
              <div key={i} style={{ fontSize: 13, color: 'var(--note-ink)', lineHeight: 1.6, marginBottom: '.3rem' }}>
                <s>{o.en}</s><br />→ <strong>{o.melhor}</strong>
              </div>
            ))}
          </div>
        )}

        <button onClick={onSeguir} style={botaoPrincipal()}>Continuar</button>
      </div>
    )
  }

  return (
    <div>
      <div className="lk-card" style={{ padding: '.9rem 1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '.75rem' }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 14.5, fontWeight: 700 }}>{sim.personagem}</div>
            <div style={{ fontSize: 12, color: 'var(--ink3)', lineHeight: 1.4 }}>{sim.papel}</div>
          </div>
          <div style={{ flexShrink: 0, textAlign: 'right' }}>
            <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--ink3)' }}>na mesa</div>
            <div style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 20, fontWeight: 700 }}>{preco}</div>
          </div>
        </div>
        <div style={{ marginTop: '.6rem', fontSize: 12.5, color: 'var(--ink2)', background: 'var(--paper)', borderRadius: 10, padding: '.55rem .7rem' }}>
          🎯 {sim.missao}
        </div>
      </div>

      {/* O que ele diz */}
      <div style={{ display: 'flex', gap: '.6rem', margin: '1rem 0', alignItems: 'flex-start' }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0, background: 'var(--panel)', color: 'var(--on-panel)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>
          {sim.personagem[0]}
        </div>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px 16px 16px 16px', padding: '.8rem .95rem', flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.5rem' }}>
            <div style={{ flex: 1, fontSize: 15.5, lineHeight: 1.45 }}>{atual.fala}</div>
            <SpeakButton text={atual.fala} lang={lang} voice={audio.voice} ready={audio.ready} listen="Ouvir" />
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--ink3)', marginTop: '.35rem' }}>{atual.falaPt}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
        {atual.opcoes.map(o => (
          <button
            key={o.en}
            onClick={() => escolher(o)}
            style={{
              textAlign: 'left', minHeight: 56, padding: '.8rem 1rem', borderRadius: 14,
              border: '1.5px solid var(--border)', background: 'var(--surface)',
              fontFamily: 'inherit', cursor: 'pointer',
            }}
          >
            <span style={{ display: 'block', fontSize: 15, color: 'var(--ink)' }}>{o.en}</span>
            {ajuda && <span style={{ display: 'block', fontSize: 12.5, color: 'var(--ink3)', marginTop: 2 }}>{o.pt}</span>}
          </button>
        ))}
      </div>

      <button
        onClick={() => setAjuda(a => !a)}
        style={{ width: '100%', marginTop: '.8rem', minHeight: 44, borderRadius: 10, border: '1px dashed var(--border)', background: 'transparent', color: 'var(--ink3)', fontSize: 13, fontFamily: 'inherit', cursor: 'pointer' }}
      >
        {ajuda ? 'Esconder a tradução' : 'Me ajuda — mostrar o que cada uma quer dizer'}
      </button>
    </div>
  )
}
