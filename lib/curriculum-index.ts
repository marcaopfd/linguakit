import type { Module, Unit } from './curriculum'

/**
 * Trimmed shapes for the screens that only navigate the course.
 *
 * The full curricula are ~374 KB (PT) and ~461 KB (EN) of JSON. Importing them
 * from a client component ships all of it to the browser, so a lesson used to
 * download a whole course to render one ~6 KB unit. Server components read the
 * curriculum and hand down one of these instead.
 *
 * Only the TYPES are safe to import from a client component — they vanish at
 * compile time. The functions take the modules as an argument rather than
 * importing them, so nothing here pulls the big files in by accident.
 */

/** What a module list shows for each unit. */
export type UnitSummary = {
  title: string
  sub: string
  emoji: string
  duration: string
}

/** A module without any of its lesson content. */
export type ModuleSummary = {
  id: string
  label: string
  name: string
  desc: string
  emoji: string
  color: string
  accent: string
  bar: string
  units: UnitSummary[]
}

/** Everything a lesson screen needs about the module around it. */
export type LessonContext = {
  id: string
  label: string
  name: string
  unitCount: number
}

export function toModuleSummary(mod: Module): ModuleSummary {
  return {
    id: mod.id,
    label: mod.label,
    name: mod.name,
    desc: mod.desc,
    emoji: mod.emoji,
    color: mod.color,
    accent: mod.accent,
    bar: mod.bar,
    units: mod.units.map(u => ({
      title: u.title,
      sub: u.sub,
      emoji: u.emoji,
      duration: u.duration,
    })),
  }
}

export function toCourseIndex(modules: Module[]): ModuleSummary[] {
  return modules.map(toModuleSummary)
}

/** The one unit a lesson renders, plus the module context around it. */
export function findLesson(
  modules: Module[],
  modId: string,
  unitIndex: number,
): { unit: Unit; mod: LessonContext } | null {
  const mod = modules.find(m => m.id === modId)
  const unit = mod?.units[unitIndex]
  if (!mod || !unit) return null

  return {
    unit,
    mod: { id: mod.id, label: mod.label, name: mod.name, unitCount: mod.units.length },
  }
}
