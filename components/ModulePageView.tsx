'use client'

import Link from 'next/link'
import { levelTone } from '@/lib/levels'
import { UnitPath } from '@/components/UnitPath'
import type { ModuleSummary } from '@/lib/curriculum-index'
import { useModuleProgress } from '@/lib/use-progress'
import { uiStrings } from '@/lib/ui-strings'

interface Props {
  /** Module metadata and unit titles only — no lesson content. */
  mod: ModuleSummary
  lessonBase: string  // e.g. '/lesson' or '/en/lesson'
  backHref: string
  progressKey: string
  studentId?: string   // when set, progress comes from the DB instead of localStorage
  /** When set, each unit also offers the one-at-a-time drill. */
  practiceBase?: string
  /** Language being taught; the chrome is shown in the learner's other language. */
  lang: string
}

export function ModulePageView({ mod, lessonBase, backHref, progressKey, studentId, lang, practiceBase }: Props) {
  const { done: progress } = useModuleProgress(mod.id, progressKey, studentId)
  const t = uiStrings(lang)

  const done = progress.length
  const pct = Math.round((done / mod.units.length) * 100)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '1.5rem 1.5rem 1rem' }}>
        <Link href={backHref} style={{ minHeight: 44, display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: 13, color: 'var(--ink3)', textDecoration: 'none', marginBottom: '.85rem', width: 'fit-content' }}>
          ← {t.back}
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '.4rem' }}>
          <div style={{ width: 40, height: 40, borderRadius: 8, background: levelTone(mod.id).bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 18, fontWeight: 700, color: levelTone(mod.id).ink }}>
            {mod.label}
          </div>
          <h2 style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 22, fontWeight: 600 }}>{mod.emoji} {mod.name}</h2>
        </div>
        <p style={{ fontSize: 13, color: 'var(--ink3)', lineHeight: 1.5 }}>{mod.desc}</p>
        <div style={{ marginTop: '.85rem', height: 4, background: 'var(--border)', borderRadius: 2 }}>
          <div style={{ height: 4, borderRadius: 2, background: levelTone(mod.id).bar, width: `${pct}%`, transition: 'width .6s' }} />
        </div>
        <div style={{ marginTop: '.3rem', fontSize: 12, color: 'var(--ink3)' }}>{t.unitsCompleted(done, mod.units.length)}</div>
      </div>

      <UnitPath
        units={mod.units}
        done={progress}
        accent={levelTone(mod.id).ink}
        bar={levelTone(mod.id).bar}
        lessonBase={lessonBase}
        practiceBase={practiceBase}
        modId={mod.id}
        t={t}
      />
    </div>
  )
}
