import { notFound } from 'next/navigation'
import { accentTag } from '@/lib/accents'
import { MODULES } from '@/lib/curriculum'
import { EN_MODULES } from '@/lib/curriculum-en'
import { prisma, withDb } from '@/lib/db'
import { buildRoleplay } from '@/lib/roleplay'
import { RoleplayView } from './view'

export default async function ConversationPage({
  params,
}: {
  params: Promise<{ studentId: string; mod: string; unit: string }>
}) {
  const { studentId, mod: modId, unit: unitParam } = await params
  const unitIndex = Number(unitParam)

  const student = await withDb(() => prisma.student.findUnique({
    where: { id: studentId },
    select: { course: true, accent: true, testResult: { select: { course: true } } },
  }))
  if (!student) notFound()

  const course = student.course ?? student.testResult?.course
  const isEN = course === 'en'
  const mod = (isEN ? EN_MODULES : MODULES).find(m => m.id === modId)
  const unit = mod?.units[unitIndex]
  if (!mod || !unit) notFound()

  // Built on the server: the options are shuffled, and a shuffle repeated in
  // the browser would not match what was rendered.
  const roleplay = buildRoleplay(unit, isEN ? 'en' : 'pt', `${mod.id}-${unitIndex}`)
  if (!roleplay) notFound()

  return (
    <RoleplayView
      studentId={studentId}
      moduleId={mod.id}
      unitIndex={unitIndex}
      unitTitle={unit.title}
      moduleLabel={mod.label}
      roleplay={roleplay}
      lang={accentTag(course, student.accent)}
    />
  )
}
