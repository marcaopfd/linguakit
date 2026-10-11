import { notFound } from 'next/navigation'
import { MODULES } from '@/lib/curriculum'
import { EN_MODULES } from '@/lib/curriculum-en'
import { buildDrill, nextUnitIndex } from '@/lib/drill'
import { prisma, withDb } from '@/lib/db'
import { PracticeView } from './view'

export default async function PracticePage({
  params,
}: {
  params: Promise<{ studentId: string; mod: string; unit: string }>
}) {
  const { studentId, mod: modId, unit: unitParam } = await params
  const unitIndex = Number(unitParam)

  const student = await withDb(() => prisma.student.findUnique({
    where: { id: studentId },
    select: { course: true, testResult: { select: { course: true } } },
  }))
  if (!student) notFound()

  const isEN = (student.course ?? student.testResult?.course) === 'en'
  const mod = (isEN ? EN_MODULES : MODULES).find(m => m.id === modId)
  const unit = mod?.units[unitIndex]
  if (!mod || !unit) notFound()

  const lang = isEN ? 'en-US' : 'pt-BR'

  return (
    <PracticeView
      studentId={studentId}
      moduleId={mod.id}
      unitIndex={unitIndex}
      unitTitle={unit.title}
      moduleLabel={mod.label}
      // Built here, on the server: the generated activities shuffle, and a
      // shuffle repeated in the browser would not match the server render.
      items={buildDrill(unit, { lang, seed: `${mod.id}-${unitIndex}` })}
      nextUnit={nextUnitIndex(unitIndex, mod.units.length)}
      lang={lang}
    />
  )
}
