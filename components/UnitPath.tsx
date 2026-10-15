'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Caramelo } from '@/components/Caramelo'
import { Icon } from '@/components/Icon'
import type { UiStrings } from '@/lib/ui-strings'

type PathUnit = {
  title: string
  sub: string
  emoji: string
  duration: string
}

/**
 * A module as a path rather than a list.
 *
 * The same units in the same order, but the shape carries the thing a list
 * cannot: that this is a route with a beginning, a place you have got to, and
 * a stretch still ahead. The dog stands on the unit you are on.
 *
 * Nodes are placed absolutely so the connecting line can be drawn between their
 * real centres; laying them out with margins and then guessing where the line
 * goes drifts apart the moment anything changes.
 */

const GAP = 78
const SWING = [0, 42, 64, 42, 0, -42, -64, -42]
const NODE = 54
const CURRENT_NODE = 62

/** Horizontal offset from the centre line, in pixels. */
function swing(index: number): number {
  return SWING[index % SWING.length]
}

export function UnitPath({ units, done, accent, bar, lessonBase, practiceBase, liveBase, modId, t }: {
  units: PathUnit[]
  done: number[]
  accent: string
  bar: string
  lessonBase: string
  practiceBase?: string
  liveBase?: string
  modId: string
  t: UiStrings
}) {
  const [open, setOpen] = useState<number | null>(null)

  const doneSet = new Set(done)
  // Where you are: the first unit still undone, or the end of the road.
  const current = units.findIndex((_, i) => !doneSet.has(i))
  const height = units.length * GAP + 60

  return (
    <div style={{ position: 'relative', padding: '1.5rem 0 0' }}>
      <div style={{ position: 'relative', height, maxWidth: 360, margin: '0 auto' }}>
        {/* The road, drawn under the nodes between their real centres. */}
        <svg
          width="100%"
          height={height}
          viewBox={`0 0 360 ${height}`}
          preserveAspectRatio="none"
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
          aria-hidden
        >
          {units.slice(0, -1).map((_, i) => {
            const x1 = 180 + swing(i), y1 = 40 + i * GAP
            const x2 = 180 + swing(i + 1), y2 = 40 + (i + 1) * GAP
            const walked = doneSet.has(i) && doneSet.has(i + 1)
            return (
              <line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={walked ? bar : 'var(--border)'}
                strokeWidth={walked ? 5 : 4}
                strokeLinecap="round"
                strokeDasharray={walked ? undefined : '1 9'}
              />
            )
          })}
        </svg>

        {units.map((unit, i) => {
          const isDone = doneSet.has(i)
          const isCurrent = i === current
          const diameter = isCurrent ? CURRENT_NODE : NODE
          const x = 180 + swing(i)
          const y = 40 + i * GAP

          return (
            <div key={i} style={{ position: 'absolute', left: `${(x / 360) * 100}%`, top: y, transform: 'translate(-50%, -50%)' }}>
              {isCurrent && (
                <span
                  className="lk-ring"
                  style={{ position: 'absolute', inset: -4, borderRadius: '50%', background: bar, pointerEvents: 'none' }}
                />
              )}
              <button
                onClick={() => setOpen(i)}
                aria-label={`${t.unit} ${i + 1}: ${unit.title}`}
                style={{
                  position: 'relative',
                  width: diameter, height: diameter, borderRadius: '50%',
                  border: `2.5px solid ${isDone ? bar : isCurrent ? accent : 'var(--border)'}`,
                  background: isDone ? bar : 'var(--surface)',
                  color: isDone ? 'var(--surface)' : isCurrent ? accent : 'var(--ink3)',
                  fontSize: isCurrent ? 20 : 17, fontWeight: 700, fontFamily: 'inherit',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: isCurrent ? '0 3px 0 rgba(0,0,0,.12)' : 'none',
                }}
              >
                {isDone ? '✓' : unit.emoji || i + 1}
              </button>

              {isCurrent && (
                <>
                  {/* On the inside of the bend: beside a node already swung
                      right, he would hang off the edge of a narrow phone. */}
                  <span
                    style={{
                      position: 'absolute', top: '50%', transform: 'translateY(-50%)',
                      [swing(i) > 0 ? 'right' : 'left']: diameter + 6,
                      color: 'var(--ink)', pointerEvents: 'none',
                    }}
                  >
                    <Caramelo mood="idle" size={42} />
                  </span>

                  {/* The one title worth showing: a path of emoji says where you
                      are but not what is there. */}
                  <span
                    style={{
                      position: 'absolute', top: diameter / 2 + 10, left: '50%',
                      transform: 'translateX(-50%)', maxWidth: 160, textAlign: 'center',
                      fontSize: 12.5, fontWeight: 700, color: 'var(--ink2)',
                      lineHeight: 1.3, pointerEvents: 'none', whiteSpace: 'nowrap',
                      overflow: 'hidden', textOverflow: 'ellipsis',
                      // Sits over the road, so it carries the background with it.
                      background: 'var(--cream)', padding: '2px 7px', borderRadius: 6,
                    }}
                  >
                    {unit.title}
                  </span>
                </>
              )}
            </div>
          )
        })}
      </div>

      {open !== null && (
        <UnitSheet
          unit={units[open]}
          index={open}
          isDone={doneSet.has(open)}
          lessonHref={`${lessonBase}/${modId}/${open}`}
          practiceHref={practiceBase ? `${practiceBase}/${modId}/${open}` : undefined}
          liveHref={liveBase ? `${liveBase}/${modId}/${open}` : undefined}
          onClose={() => setOpen(null)}
          t={t}
        />
      )}
    </div>
  )
}

/** Tapping a node opens this rather than navigating: a unit has two ways in. */
function UnitSheet({ unit, index, isDone, lessonHref, practiceHref, liveHref, onClose, t }: {
  unit: PathUnit
  index: number
  isDone: boolean
  lessonHref: string
  practiceHref?: string
  liveHref?: string
  onClose: () => void
  t: UiStrings
}) {
  return (
    <>
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(26,24,20,.35)', zIndex: 40 }}
      />
      <div
        className="lk-rise"
        style={{
          position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 41,
          background: 'var(--surface)', borderTop: '1px solid var(--border)',
          borderRadius: '18px 18px 0 0', padding: '1.25rem 1.5rem 1.75rem',
          maxWidth: 560, margin: '0 auto',
        }}
      >
        <div style={{ width: 38, height: 4, borderRadius: 2, background: 'var(--border)', margin: '0 auto .9rem' }} />

        <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--ink3)', marginBottom: '.3rem' }}>
          {t.unit} {index + 1}{isDone ? ` · ✓ ${t.done}` : ''} · {unit.duration}
        </div>
        <div style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 20, fontWeight: 700, marginBottom: '.25rem' }}>
          {unit.emoji} {unit.title}
        </div>
        <div style={{ fontSize: 13.5, color: 'var(--ink3)', lineHeight: 1.5, marginBottom: '1.1rem' }}>{unit.sub}</div>

        {practiceHref && (
          <Link
            href={practiceHref}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 50, borderRadius: 12, background: 'var(--green)', color: 'var(--on-panel)', fontSize: 15, fontWeight: 700, textDecoration: 'none', marginBottom: '.55rem' }}
          >
            {t.practiceStart} →
          </Link>
        )}
        {liveHref && (
          <Link
            href={liveHref}
            style={{ display: 'block', minHeight: 50, borderRadius: 12, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--ink)', textDecoration: 'none', padding: '.6rem .9rem', marginBottom: '.55rem' }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: 14.5, fontWeight: 700 }}>
              <Icon name="chat" size={16} /> {t.liveTitle}
            </span>
            <span style={{ display: 'block', fontSize: 12, color: 'var(--ink3)', lineHeight: 1.4 }}>{t.liveSub}</span>
          </Link>
        )}
        <Link
          href={lessonHref}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 50, borderRadius: 12, border: '1px solid var(--border)', background: 'var(--paper)', color: 'var(--ink2)', fontSize: 14.5, fontWeight: 600, textDecoration: 'none' }}
        >
          {t.steps.vocabulary} · {t.steps.grammar} · {t.steps.dialogue}
        </Link>
      </div>
    </>
  )
}
