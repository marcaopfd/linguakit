import { notFound } from 'next/navigation'
import { MODULES } from '@/lib/curriculum'
import { EN_MODULES } from '@/lib/curriculum-en'
import { toModuleSummary } from '@/lib/curriculum-index'
import { ModulePageView } from '@/components/ModulePageView'
import { accentTag } from '@/lib/accents'
import { prisma, withDb } from '@/lib/db'

export default async function LearnModulePage({
  params,
}: {
  params: Promise<{ studentId: string; id: string }>
}) {
  const { studentId, id } = await params

  const student = await withDb(() => prisma.student.findUnique({
    where: { id: studentId },
    select: { course: true, accent: true, testResult: { select: { course: true } } },
  }))
  if (!student) notFound()

  const isEN = (student.course ?? student.testResult?.course) === 'en'
  const mod = (isEN ? EN_MODULES : MODULES).find(m => m.id === id)
  if (!mod) notFound()

  return (
    <ModulePageView
      mod={toModuleSummary(mod)}
      lessonBase={`/learn/${studentId}/lesson`}
      backHref={`/learn/${studentId}`}
      progressKey={isEN ? 'lk_progress_en' : 'lk_progress'}
      studentId={studentId}
      practiceBase={`/learn/${studentId}/praticar`}
      lang={accentTag(student.course ?? student.testResult?.course, student.accent)}
    />
  )
}
