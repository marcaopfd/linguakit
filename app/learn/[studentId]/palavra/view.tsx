'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Caramelo } from '@/components/Caramelo'
import { SpeakButton, useVoice } from '@/components/SpeakButton'
import { MAX_TRIES, WORD_LENGTH, type Band, type Mark, plain, scoreGuess } from '@/lib/daily-word'
import { uiStrings } from '@/lib/ui-strings'

const ROWS = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'] as const

type Saved = {
  day: string
  guesses: string[]
  streak: number
  lastWon: string | null
}

/**
 * One word a day, the same one for everybody.
 *
 * The answer and the day are decided on the server, so nothing here can be
 * read out of the page source before it is guessed — the word arrives already
 * scored, never as itself.
 *
 * Progress lives in this browser rather than the database. It costs no table
 * and works offline, and the trade is honest: clearing site data or picking up
 * another phone starts the day over. A streak kept across devices would need
 * somewhere to keep it.
 */
export function DailyWordView({
  studentId, dayKey, band, scoreAction, revealAction, lang, course,
}: {
  studentId: string
  dayKey: string
  band: Band
  /** Scores a guess on the server, so the answer never crosses over. */
  scoreAction: (course: string, guess: string) => Promise<Mark[]>
  /** Fetched only once the game is over. */
  revealAction: (course: string) => Promise<string>
  lang: string
  course: 'en' | 'pt'
}) {
  const t = uiStrings(lang)
  const audio = useVoice(lang)

  const storageKey = `lk_word_${course}`

  const [guesses, setGuesses] = useState<string[]>([])
  const [marks, setMarks] = useState<Mark[][]>([])
  const [typed, setTyped] = useState('')
  const [streak, setStreak] = useState(0)
  const [note, setNote] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [answer, setAnswer] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const won = marks.length > 0 && marks[marks.length - 1].every(m => m === 'right')
  const over = won || guesses.length >= MAX_TRIES

  // Read once on the client: localStorage is not there during the server
  // render, and reading it in the body would make the two disagree.
  useEffect(() => {
    let saved: Saved | null = null
    try { saved = JSON.parse(localStorage.getItem(storageKey) ?? 'null') } catch { saved = null }

    if (saved?.day === dayKey) {
      setGuesses(saved.guesses)
      Promise.all(saved.guesses.map(g => scoreAction(course, g))).then(setMarks)
    }
    setStreak(saved?.streak ?? 0)
    setLoaded(true)
  }, [dayKey, storageKey, course])

  // Asked for only when the game is over, so nothing left to spoil.
  useEffect(() => {
    if (over && !answer) revealAction(course).then(setAnswer).catch(() => {})
  }, [over, answer, course, revealAction])

  const persist = useCallback((next: string[], justWon: boolean) => {
    let saved: Saved | null = null
    try { saved = JSON.parse(localStorage.getItem(storageKey) ?? 'null') } catch { saved = null }

    // A streak counts consecutive days won: yesterday's win extends it, an
    // older one starts it over.
    let nextStreak = saved?.streak ?? 0
    if (justWon) {
      const yesterday = new Date(new Date(dayKey + 'T12:00:00Z').getTime() - 86400000)
        .toISOString().slice(0, 10)
      nextStreak = saved?.lastWon === yesterday ? nextStreak + 1 : 1
      setStreak(nextStreak)
    }

    try {
      localStorage.setItem(storageKey, JSON.stringify({
        day: dayKey,
        guesses: next,
        streak: nextStreak,
        lastWon: justWon ? dayKey : saved?.lastWon ?? null,
      } satisfies Saved))
    } catch { /* private window, or storage full: the game still plays */ }
  }, [dayKey, storageKey])

  const submit = useCallback(async () => {
    if (over || busy) return
    if (typed.length !== WORD_LENGTH) {
      setNote(t.wordTooShort)
      return
    }
    setBusy(true)
    setNote(null)

    // Emptied before the round trip, not after: scoring happens on the server,
    // and anyone who starts the next word while the last one is still in the
    // air would otherwise watch those letters disappear when the reply lands.
    const guess = typed
    setTyped('')

    try {
      const scored = await scoreAction(course, guess)
      const next = [...guesses, guess]
      setGuesses(next)
      setMarks(m => [...m, scored])
      persist(next, scored.every(s => s === 'right'))
    } catch {
      // The guess was never counted, so it is handed back rather than lost —
      // unless the next word is already being typed over it.
      setTyped(v => (v.length > 0 ? v : guess))
      setNote(t.wordNoReply)
    } finally {
      setBusy(false)
    }
  }, [typed, guesses, over, busy, scoreAction, course, persist, t])

  const press = useCallback((key: string) => {
    if (over) return
    if (key === 'enter') return void submit()
    if (key === 'back') return setTyped(v => v.slice(0, -1))
    setTyped(v => (v.length >= WORD_LENGTH ? v : v + key))
  }, [over, submit])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key === 'Enter') press('enter')
      else if (e.key === 'Backspace') press('back')
      else if (/^[a-zA-ZÀ-ÿ]$/.test(e.key)) press(plain(e.key))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [press])

  /** The best news each letter has had, for colouring the keyboard. */
  const letterState = useMemo(() => {
    const rank: Record<Mark, number> = { absent: 1, moved: 2, right: 3 }
    const best = new Map<string, Mark>()
    guesses.forEach((guess, gi) => {
      plain(guess).split('').forEach((letter, li) => {
        const mark = marks[gi]?.[li]
        if (!mark) return
        const current = best.get(letter)
        if (!current || rank[mark] > rank[current]) best.set(letter, mark)
      })
    })
    return best
  }, [guesses, marks])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: 'var(--panel)', color: 'var(--on-panel)', padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <Link href={`/learn/${studentId}`} style={{ minHeight: 44, display: 'inline-flex', alignItems: 'center', fontSize: 13, color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>
            ← {t.exitPractice}
          </Link>
          {streak > 0 && (
            <span style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 600 }}>{t.wordStreak(streak)}</span>
          )}
        </div>
        <div style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 20, fontWeight: 700, marginTop: '.3rem' }}>
          {t.wordTitle}
        </div>
        <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,.55)', lineHeight: 1.45, marginTop: '.15rem' }}>
          {t.wordToday(t.wordBands[band])}
        </div>
      </div>

      <div style={{ flex: 1, width: '100%', maxWidth: 420, margin: '0 auto', padding: '1.25rem 1rem 0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: '.85rem' }}>
          {/* Once the game is over the rows nobody got to are just empty space
              between the board and the result, so they come away. */}
          {Array.from({ length: over ? guesses.length : MAX_TRIES }, (_, row) => {
            const guess = guesses[row]
            const current = row === guesses.length && !over
            const letters = guess ?? (current ? typed : '')
            return (
              <div key={row} style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
                {Array.from({ length: WORD_LENGTH }, (_, col) => (
                  <Tile
                    key={col}
                    letter={letters[col] ?? ''}
                    mark={marks[row]?.[col]}
                    filled={current && col < typed.length}
                  />
                ))}
              </div>
            )
          })}
        </div>

        {note && (
          <div className="lk-rise" style={{ textAlign: 'center', fontSize: 13, color: 'var(--bad-ink)', marginBottom: '.6rem' }}>
            {note}
          </div>
        )}

        {over && loaded && (
          <div className="lk-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '1.1rem', textAlign: 'center', marginBottom: '.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '.35rem', color: 'var(--ink)' }}>
              <Caramelo mood={won ? 'happy' : 'sad'} size={64} />
            </div>
            <div style={{ fontSize: 15.5, fontWeight: 700, marginBottom: '.25rem' }}>
              {won ? t.wordWon(guesses.length) : t.wordLost}
            </div>
            {answer && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem', fontSize: 14, color: 'var(--ink3)', marginBottom: '.5rem' }}>
                {t.wordAnswerWas} <strong style={{ color: 'var(--ink)' }}>{answer}</strong>
                <SpeakButton text={answer} lang={lang} voice={audio.voice} ready={audio.ready} listen={t.listen} />
              </div>
            )}
            <div style={{ fontSize: 12.5, color: 'var(--ink3)', lineHeight: 1.5 }}>
              {t.wordComeBack}
              <br />
              <Countdown label={t.wordNextIn} />
            </div>
          </div>
        )}

        {!over && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingBottom: '1.25rem' }}>
            {ROWS.map((row, ri) => (
              <div key={ri} style={{ display: 'flex', gap: 5, justifyContent: 'center' }}>
                {ri === 2 && <Key wide label={t.wordEnter} onPress={() => press('enter')} />}
                {row.split('').map(letter => (
                  <Key key={letter} label={letter} mark={letterState.get(letter)} onPress={() => press(letter)} />
                ))}
                {ri === 2 && <Key wide label="⌫" aria={t.wordDelete} onPress={() => press('back')} />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function Tile({ letter, mark, filled }: { letter: string; mark?: Mark; filled?: boolean }) {
  const colours: Record<Mark, { bg: string; border: string; fg: string }> = {
    right: { bg: 'var(--ok-bg)', border: 'var(--ok-border)', fg: 'var(--ok-ink)' },
    moved: { bg: 'var(--note-bg)', border: 'var(--note-border)', fg: 'var(--note-ink)' },
    absent: { bg: 'var(--paper)', border: 'var(--border)', fg: 'var(--ink3)' },
  }
  const skin = mark ? colours[mark] : null

  return (
    <div
      style={{
        width: 52, height: 52, borderRadius: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 24, fontWeight: 700, textTransform: 'uppercase',
        background: skin?.bg ?? 'var(--surface)',
        border: `2px solid ${skin?.border ?? (filled ? 'var(--ink3)' : 'var(--border)')}`,
        color: skin?.fg ?? 'var(--ink)',
      }}
    >
      {letter}
    </div>
  )
}

function Key({ label, mark, wide, aria, onPress }: {
  label: string
  mark?: Mark
  wide?: boolean
  aria?: string
  onPress: () => void
}) {
  const colours: Record<Mark, { bg: string; fg: string }> = {
    right: { bg: 'var(--ok-bg)', fg: 'var(--ok-ink)' },
    moved: { bg: 'var(--note-bg)', fg: 'var(--note-ink)' },
    // A letter known to be absent is dimmed, not hidden: it still has to be
    // visibly ruled out rather than quietly missing.
    absent: { bg: 'var(--paper)', fg: 'var(--ink3)' },
  }
  const skin = mark ? colours[mark] : null

  return (
    <button
      onClick={onPress}
      aria-label={aria ?? label}
      style={{
        minWidth: wide ? 56 : 30, flex: wide ? '0 0 auto' : '1 1 0',
        minHeight: 48, borderRadius: 8, padding: 0,
        border: '1px solid var(--border)',
        background: skin?.bg ?? 'var(--surface)',
        color: skin?.fg ?? 'var(--ink)',
        fontSize: wide ? 12 : 15, fontWeight: 600, textTransform: 'uppercase',
        fontFamily: 'inherit', cursor: 'pointer',
      }}
    >
      {label}
    </button>
  )
}

/** Time left on today's word, so "come back tomorrow" has a number on it. */
function Countdown({ label }: { label: string }) {
  const [left, setLeft] = useState<string | null>(null)

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const shifted = now.getTime() - 3 * 60 * 60 * 1000
      const ms = 86400000 - (((shifted % 86400000) + 86400000) % 86400000)
      const h = Math.floor(ms / 3600000)
      const m = Math.floor((ms % 3600000) / 60000)
      setLeft(`${h}h ${String(m).padStart(2, '0')}min`)
    }
    tick()
    const id = setInterval(tick, 30000)
    return () => clearInterval(id)
  }, [])

  if (!left) return null
  return <span>{label} {left}</span>
}
