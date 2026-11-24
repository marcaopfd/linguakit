'use client'

import { useCallback, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AutoAudioToggle, useAutoSpeak } from '@/components/AutoAudio'
import { Caramelo } from '@/components/Caramelo'
import { Icon } from '@/components/Icon'
import { SpeakButton, useVoice } from '@/components/SpeakButton'
import type { DrillItem } from '@/lib/drill'
import { isCorrect } from '@/lib/drill'
import { speak } from '@/lib/speak'
import type { Bloco, Licao, ModuloTrilha, Trilha } from '@/lib/trilhas'
import { Simulador } from './simulador'
import { uiStrings } from '@/lib/ui-strings'

/**
 * A lição, uma tela por vez.
 *
 * A ordem é sempre a mesma — a situação em português, as frases, a prática,
 * a conversa e o resumo — porque a pessoa estuda quinze minutos no ônibus e
 * não deve ter de descobrir onde está cada vez que abre.
 *
 * Cada bloco de prática vira uma tela só sua: uma pergunta de cada vez, com a
 * barra em cima dizendo quanto falta. Errar mostra a resposta e o porquê, e
 * segue — nada trava a lição.
 */
export function PlayerDaLicao({ studentId, trilha, modulo, licao, posicao, ultima, lang }: {
  studentId: string
  trilha: Trilha
  modulo: ModuloTrilha
  licao: Licao
  posicao: number
  ultima: boolean
  lang: string
}) {
  const t = uiStrings(lang)
  const audio = useVoice(lang)
  const autoSpeak = useAutoSpeak()
  const router = useRouter()

  // Cada bloco é uma tela, menos a prática: lá cada item é a sua.
  const telas = useMemo(() => achatar(licao.blocos), [licao])
  const [at, setAt] = useState(0)
  const [acertos, setAcertos] = useState(0)
  const [erros, setErros] = useState<string[]>([])
  const tela = telas[at]

  const avancar = useCallback(() => setAt(i => Math.min(i + 1, telas.length - 1)), [telas.length])

  const registrar = useCallback((item: DrillItem, resposta: string, certo: boolean) => {
    if (certo) setAcertos(n => n + 1)
    else setErros(e => [...e, item.expected])

    // Mesmo endereço do resto do produto: a prática da trilha alimenta os
    // "seus erros" e a revisão como qualquer outro exercício.
    fetch('/api/attempts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentId, moduleId: modulo.id, unitIndex: posicao, itemKey: item.key,
        exerciseType: item.type, question: item.question || item.instruction,
        answer: resposta, expected: item.expected, correct: certo,
      }),
    }).catch(() => { /* a lição não para por causa da rede */ })
  }, [studentId, modulo.id, posicao])

  const concluir = useCallback(() => {
    fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, moduleId: modulo.id, unitIndex: posicao }),
    })
      .catch(() => {})
      .finally(() => router.push(`/learn/${studentId}/trilha/${trilha.id}/${modulo.id}`))
  }, [studentId, modulo.id, posicao, trilha.id, router])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', flexDirection: 'column' }}>
      {/* A barra fina em cima: onde estou e quanto falta. */}
      <div style={{ background: 'var(--panel)', color: 'var(--on-panel)', padding: '.85rem 1rem 1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '.6rem' }}>
          <Link
            href={`/learn/${studentId}/trilha/${trilha.id}/${modulo.id}`}
            aria-label={t.trilhaVoltar}
            style={{ minHeight: 44, display: 'inline-flex', alignItems: 'center', color: 'rgba(255,255,255,.5)', textDecoration: 'none', fontSize: 20, flexShrink: 0 }}
          >
            ✕
          </Link>
          <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,.15)', borderRadius: 3 }}>
            <div style={{ height: 6, borderRadius: 3, background: 'var(--accent)', width: `${((at + 1) / telas.length) * 100}%`, transition: 'width .35s' }} />
          </div>
          {audio.supported !== false && (
            <AutoAudioToggle auto={autoSpeak.auto} onChange={autoSpeak.setAuto} label={t.autoAudio} state={autoSpeak.auto ? t.autoAudioOn : t.autoAudioOff} />
          )}
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,.5)' }}>{modulo.emoji} {licao.titulo}</div>
      </div>

      <main style={{ flex: 1, width: '100%', maxWidth: 620, margin: '0 auto', padding: '1.25rem 1rem 1.5rem' }}>
        {tela.tipo === 'situacao' && (
          <Situacao texto={tela.texto} consegue={licao.consegue} onSeguir={avancar} />
        )}

        {tela.tipo === 'frases' && (
          <Frases frases={tela.frases} lang={lang} audio={audio} t={t} onSeguir={avancar} />
        )}

        {tela.tipo === 'item' && (
          <Exercicio
            key={tela.item.key}
            item={tela.item}
            lang={lang}
            audio={audio}
            autoSpeak={autoSpeak.auto}
            t={t}
            onResponder={registrar}
            onSeguir={avancar}
          />
        )}

        {tela.tipo === 'simulacao' && (
          <Simulador simulacaoId={tela.simulacaoId} lang={lang} audio={audio} onSeguir={avancar} />
        )}

        {tela.tipo === 'resumo' && (
          <Resumo
            licao={licao} acertos={acertos} erros={erros}
            ultima={ultima} onConcluir={concluir}
          />
        )}
      </main>
    </div>
  )
}

// ── As telas, achatadas ──────────────────────────────────────────────────────

type Tela =
  | { tipo: 'situacao'; texto: string }
  | { tipo: 'frases'; frases: { en: string; pt: string; armadilha?: string }[] }
  | { tipo: 'item'; item: DrillItem }
  | { tipo: 'simulacao'; simulacaoId: string }
  | { tipo: 'resumo' }

function achatar(blocos: Bloco[]): Tela[] {
  const out: Tela[] = []
  for (const b of blocos) {
    if (b.tipo === 'situacao') out.push({ tipo: 'situacao', texto: b.texto })
    else if (b.tipo === 'frases') out.push({ tipo: 'frases', frases: b.frases })
    else if (b.tipo === 'pratica') for (const item of b.itens) out.push({ tipo: 'item', item })
    else if (b.tipo === 'simulacao') out.push({ tipo: 'simulacao', simulacaoId: b.simulacaoId })
    else if (b.tipo === 'resumo') out.push({ tipo: 'resumo' })
  }
  return out.length ? out : [{ tipo: 'resumo' }]
}

// ── Blocos ───────────────────────────────────────────────────────────────────

function Situacao({ texto, consegue, onSeguir }: { texto: string; consegue: string; onSeguir: () => void }) {
  return (
    <div className="lk-card">
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ink3)', marginBottom: '.5rem' }}>
        A situação
      </div>
      <p style={{ fontSize: 16.5, lineHeight: 1.6, color: 'var(--ink)' }}>{texto}</p>
      <div style={{ marginTop: '1.1rem', padding: '.8rem .9rem', background: 'var(--ok-bg)', border: '1px solid var(--ok-border)', borderRadius: 12 }}>
        <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--ok-ink)' }}>{consegue}</div>
      </div>
      <Seguir onClick={onSeguir} rotulo="Começar" />
    </div>
  )
}

function Frases({ frases, lang, audio, t, onSeguir }: {
  frases: { en: string; pt: string; armadilha?: string }[]
  lang: string
  audio: ReturnType<typeof useVoice>
  t: ReturnType<typeof uiStrings>
  onSeguir: () => void
}) {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ink3)', marginBottom: '.6rem' }}>
        As frases
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
        {frases.map(f => (
          <div key={f.en} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '.9rem 1rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.6rem' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 16.5, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.4 }}>{f.en}</div>
                <div style={{ fontSize: 13.5, color: 'var(--ink3)', marginTop: 2 }}>{f.pt}</div>
              </div>
              <div style={{ flexShrink: 0 }}>
                <SpeakButton text={f.en} lang={lang} voice={audio.voice} ready={audio.ready} listen={t.listen} />
              </div>
            </div>
            {f.armadilha && (
              <div style={{ marginTop: '.6rem', padding: '.6rem .7rem', background: 'var(--note-bg)', border: '1px solid var(--note-border)', borderRadius: 10, fontSize: 12.5, color: 'var(--note-ink)', lineHeight: 1.5 }}>
                {f.armadilha}
              </div>
            )}
          </div>
        ))}
      </div>
      <Seguir onClick={onSeguir} rotulo="Praticar" />
    </div>
  )
}

function Resumo({ licao, acertos, erros, ultima, onConcluir }: {
  licao: Licao
  acertos: number
  erros: string[]
  ultima: boolean
  onConcluir: () => void
}) {
  const total = acertos + erros.length
  return (
    <div className="lk-card" style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', color: 'var(--ink)' }}>
        <Caramelo mood="happy" size={72} />
      </div>
      <h2 style={{ fontFamily: 'var(--font-display), Bricolage Grotesque, sans-serif', fontSize: 22, fontWeight: 700, marginTop: '.3rem' }}>
        Lição concluída
      </h2>
      <p style={{ fontSize: 14, color: 'var(--ink2)', lineHeight: 1.55, marginTop: '.4rem' }}>{licao.consegue}</p>

      {total > 0 && (
        <div style={{ marginTop: '1rem', display: 'inline-flex', gap: '.5rem', alignItems: 'center', background: 'var(--accent)', color: 'var(--on-accent)', borderRadius: 999, padding: '.45rem 1rem', fontSize: 13.5, fontWeight: 700 }}>
          <Icon name="target" size={15} /> {acertos} de {total}
        </div>
      )}

      {erros.length > 0 && (
        <div style={{ marginTop: '1rem', textAlign: 'left', background: 'var(--paper)', border: '1px solid var(--border)', borderRadius: 12, padding: '.8rem .9rem' }}>
          <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--ink3)', marginBottom: '.4rem' }}>
            Para levar na memória
          </div>
          {erros.map((e, i) => (
            <div key={i} style={{ fontSize: 14, color: 'var(--ink)', lineHeight: 1.6 }}>• {e}</div>
          ))}
        </div>
      )}

      <button onClick={onConcluir} style={botaoPrincipal()}>
        {ultima ? 'Terminar o módulo' : 'Próxima lição'}
      </button>
    </div>
  )
}

function Seguir({ onClick, rotulo }: { onClick: () => void; rotulo: string }) {
  return <button onClick={onClick} style={botaoPrincipal()}>{rotulo}</button>
}

export function botaoPrincipal(desativado = false): React.CSSProperties {
  return {
    width: '100%', marginTop: '1.25rem', minHeight: 52, padding: '.9rem',
    borderRadius: 12, border: 'none',
    fontSize: 15.5, fontWeight: 700, fontFamily: 'inherit',
    color: desativado ? 'var(--ink3)' : 'var(--on-accent)',
    background: desativado ? 'var(--border)' : 'var(--accent)',
    cursor: desativado ? 'default' : 'pointer',
  }
}

// ── O exercício ──────────────────────────────────────────────────────────────

function Exercicio({ item, lang, audio, autoSpeak, t, onResponder, onSeguir }: {
  item: DrillItem
  lang: string
  audio: ReturnType<typeof useVoice>
  autoSpeak: boolean
  t: ReturnType<typeof uiStrings>
  onResponder: (item: DrillItem, resposta: string, certo: boolean) => void
  onSeguir: () => void
}) {
  const [escolha, setEscolha] = useState<number | null>(null)
  const [digitado, setDigitado] = useState('')
  const [ordem, setOrdem] = useState<number[]>([])
  const [casados, setCasados] = useState<string[]>([])
  const [conferido, setConferido] = useState(false)

  const pares = item.kind === 'pares' ? item.pares ?? [] : []
  const montada = item.tokens ? ordem.map(i => item.tokens![i]).join(' ') : ''
  const resposta = item.options ? (escolha !== null ? item.options[escolha] : '') : item.kind === 'order' ? montada : digitado
  const certo = item.kind === 'pares'
    ? casados.length === pares.length
    : item.options ? escolha === item.answerIndex : isCorrect(item, resposta)

  const podeConferir = item.kind === 'pares'
    ? casados.length === pares.length
    : item.options ? escolha !== null : item.kind === 'order' ? ordem.length > 0 : digitado.trim().length > 0

  function conferir() {
    if (conferido || !podeConferir) return
    setConferido(true)
    onResponder(item, resposta || 'pares', certo)
    if (item.audio && audio.ready) speak(item.audio.text, lang, audio.voice)
  }

  // O áudio que é a própria pergunta só toca sozinho se o aluno pediu.
  const audioEhPergunta = Boolean(item.audio?.isQuestion)

  return (
    <div className="lk-card">
      <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ink3)' }}>
        {item.type}
      </div>
      <p style={{ fontSize: 13, color: 'var(--ink3)', lineHeight: 1.5, marginTop: '.35rem' }}>{item.instruction}</p>

      {audioEhPergunta ? (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '1.1rem 0' }}>
          <TocarGrande texto={item.audio!.text} lang={lang} audio={audio} auto={autoSpeak} />
        </div>
      ) : item.question ? (
        <p style={{ fontSize: 17.5, fontWeight: 500, lineHeight: 1.5, margin: '.9rem 0 1rem', whiteSpace: 'pre-line' }}>{item.question}</p>
      ) : <div style={{ height: '.6rem' }} />}

      {/* Alternativas */}
      {item.options && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
          {item.options.map((opcao, i) => {
            const escolhida = escolha === i
            const certa = i === item.answerIndex
            let borda = 'var(--border)', fundo = 'var(--surface)', cor = 'var(--ink)'
            if (conferido && certa) { borda = 'var(--green)'; fundo = 'var(--ok-bg)'; cor = 'var(--ok-ink)' }
            else if (conferido && escolhida) { borda = 'var(--red)'; fundo = 'var(--bad-bg)'; cor = 'var(--red)' }
            else if (escolhida) { borda = 'var(--ink)'; fundo = 'var(--paper)' }
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${borda}`, background: fundo, borderRadius: 12, overflow: 'hidden' }}>
                <button
                  onClick={() => !conferido && setEscolha(i)}
                  style={{ flex: 1, minHeight: 52, textAlign: 'left', padding: '.85rem 1rem', background: 'none', border: 'none', color: cor, fontSize: 15, fontFamily: 'inherit', cursor: conferido ? 'default' : 'pointer' }}
                >
                  {opcao}
                </button>
                {item.optionsSpeak && (
                  <span style={{ paddingRight: '.6rem', flexShrink: 0 }}>
                    <SpeakButton text={opcao} lang={lang} voice={audio.voice} ready={audio.ready} listen={t.listen} />
                  </span>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Montar a frase */}
      {item.kind === 'order' && item.tokens && (
        <MontarFrase tokens={item.tokens} ordem={ordem} setOrdem={setOrdem} travado={conferido} />
      )}

      {/* Combinar os pares */}
      {item.kind === 'pares' && (
        <CombinarPares pares={pares} casados={casados} setCasados={setCasados} travado={conferido} />
      )}

      {/* Digitar */}
      {!item.options && item.kind !== 'order' && item.kind !== 'pares' && (
        <input
          value={digitado}
          onChange={e => !conferido && setDigitado(e.target.value)}
          placeholder="Digite sua resposta"
          autoComplete="off"
          style={{ width: '100%', minHeight: 52, padding: '.85rem 1rem', borderRadius: 12, border: '1.5px solid var(--border)', background: 'var(--surface)', color: 'var(--ink)', fontSize: 15.5, fontFamily: 'inherit' }}
        />
      )}

      {conferido && (
        <div className="lk-rise" style={{ marginTop: '1rem', padding: '.85rem 1rem', borderRadius: 12, background: certo ? 'var(--ok-bg)' : 'var(--bad-bg)', border: `1px solid ${certo ? 'var(--ok-border)' : 'var(--bad-border)'}` }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: certo ? 'var(--ok-ink)' : 'var(--red)' }}>
            {certo ? 'Isso!' : `Resposta certa: ${item.expected}`}
          </div>
          {item.why && (
            <div style={{ fontSize: 13, color: 'var(--ink2)', lineHeight: 1.55, marginTop: '.4rem' }}>{item.why}</div>
          )}
        </div>
      )}

      <button
        onClick={conferido ? onSeguir : conferir}
        disabled={!conferido && !podeConferir}
        style={botaoPrincipal(!conferido && !podeConferir)}
      >
        {conferido ? 'Continuar' : 'Conferir'}
      </button>
    </div>
  )
}

function TocarGrande({ texto, lang, audio, auto }: {
  texto: string
  lang: string
  audio: ReturnType<typeof useVoice>
  auto: boolean
}) {
  const [tocando, setTocando] = useState(false)

  async function tocar() {
    if (!audio.ready) return
    setTocando(true)
    await speak(texto, lang, audio.voice)
    setTocando(false)
  }

  // Toca sozinho só com o interruptor ligado; o aluno decide.
  useMemo(() => { if (auto && audio.ready) void tocar() }, [auto, audio.ready])

  return (
    <button
      onClick={tocar}
      aria-label="Ouvir"
      className={tocando ? 'lk-pop' : undefined}
      style={{
        width: 124, minHeight: 104, borderRadius: 18,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '.35rem',
        border: `1.5px solid ${tocando ? 'var(--ink)' : 'var(--border)'}`,
        background: tocando ? 'var(--panel)' : 'var(--paper)',
        color: tocando ? 'var(--on-panel)' : 'var(--ink2)',
        fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer',
      }}
    >
      <Icon name="speaker" size={30} strokeWidth={1.7} />
      Ouvir
    </button>
  )
}

function MontarFrase({ tokens, ordem, setOrdem, travado }: {
  tokens: string[]
  ordem: number[]
  setOrdem: (f: (o: number[]) => number[]) => void
  travado: boolean
}) {
  const usados = new Set(ordem)
  return (
    <div>
      <div style={{ minHeight: 56, borderBottom: '2px dashed var(--border)', display: 'flex', flexWrap: 'wrap', gap: '.4rem', padding: '.5rem 0 .7rem', marginBottom: '.9rem' }}>
        {ordem.map((tokenIndex, posicao) => (
          <button
            key={`${tokenIndex}-${posicao}`}
            onClick={() => !travado && setOrdem(o => o.filter((_, k) => k !== posicao))}
            style={ficha('var(--panel)', 'var(--on-panel)')}
          >
            {tokens[tokenIndex]}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem' }}>
        {tokens.map((palavra, i) => !usados.has(i) && (
          <button key={i} onClick={() => !travado && setOrdem(o => [...o, i])} style={ficha('var(--surface)', 'var(--ink)')}>
            {palavra}
          </button>
        ))}
      </div>
    </div>
  )
}

function ficha(fundo: string, cor: string): React.CSSProperties {
  return {
    minHeight: 44, padding: '.5rem .85rem', borderRadius: 10,
    border: '1.5px solid var(--border)', background: fundo, color: cor,
    fontSize: 15, fontFamily: 'inherit', cursor: 'pointer',
  }
}

function CombinarPares({ pares, casados, setCasados, travado }: {
  pares: { a: string; b: string }[]
  casados: string[]
  setCasados: (f: (c: string[]) => string[]) => void
  travado: boolean
}) {
  const [pegou, setPegou] = useState<string | null>(null)
  const [errou, setErrou] = useState<string | null>(null)

  // Embaralhado uma vez só: a coluna da direita não pode reordenar a cada toque.
  const direita = useMemo(
    () => pares.map(p => p.b).sort((x, y) => x.localeCompare(y)),
    [pares],
  )

  function tocarB(b: string) {
    if (travado || !pegou) return
    const certo = pares.some(p => p.a === pegou && p.b === b)
    if (certo) setCasados(c => [...c, pegou])
    else { setErrou(b); setTimeout(() => setErrou(null), 600) }
    setPegou(null)
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.5rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '.45rem' }}>
        {pares.map(p => {
          const feito = casados.includes(p.a)
          return (
            <button
              key={p.a}
              onClick={() => !travado && !feito && setPegou(p.a)}
              style={cartaoPar(feito, pegou === p.a, false)}
            >
              {p.a}
            </button>
          )
        })}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '.45rem' }}>
        {direita.map(b => {
          const feito = casados.some(a => pares.find(p => p.a === a)?.b === b)
          return (
            <button
              key={b}
              onClick={() => tocarB(b)}
              className={errou === b ? 'lk-shake' : undefined}
              style={cartaoPar(feito, false, errou === b)}
            >
              {b}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function cartaoPar(feito: boolean, pego: boolean, errado: boolean): React.CSSProperties {
  return {
    minHeight: 54, padding: '.6rem .7rem', borderRadius: 12, textAlign: 'left',
    border: `1.5px solid ${errado ? 'var(--red)' : feito ? 'var(--green)' : pego ? 'var(--ink)' : 'var(--border)'}`,
    background: errado ? 'var(--bad-bg)' : feito ? 'var(--ok-bg)' : pego ? 'var(--paper)' : 'var(--surface)',
    color: feito ? 'var(--ok-ink)' : 'var(--ink)',
    fontSize: 13.5, lineHeight: 1.35, fontFamily: 'inherit',
    cursor: feito ? 'default' : 'pointer',
  }
}
