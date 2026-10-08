import { notFound } from 'next/navigation'
import { MODULES } from '@/lib/curriculum'
import { EN_MODULES } from '@/lib/curriculum-en'
import { findLesson } from '@/lib/curriculum-index'
import { LessonPageView } from '@/components/LessonPageView'
import { prisma, withDb } from '@/lib/db'

/**
 * The student's course used to be resolved by a fetch from the browser, which
 * meant both curricula had to be in the client bundle. Reading it here keeps
 * them server-side and sends down a single unit.
 */
export default async function LearnLessonPage({
  params,
}: {
  params: Promise<{ studentId: string; mod: string; unit: string }>
}) {
  const { studentId, mod: modId, unit: unitParam } = await params

  const student = await withDb(() => prisma.student.findUnique({
    where: { id: studentId },
    select: { course: true, testResult: { select: { course: true } } },
  }))
  if (!student) notFound()

  const isEN = (student.course ?? student.testResult?.course) === 'en'
  const lesson = findLesson(isEN ? EN_MODULES : MODULES, modId, Number(unitParam))
  if (!lesson) notFound()

  return (
    <LessonPageView
      unit={lesson.unit}
      mod={lesson.mod}
      unitIndex={Number(unitParam)}
      moduleBase={`/learn/${studentId}/module`}
      pdfBase={isEN ? '/api/pdf/en' : '/api/pdf/pt'}
      progressKey={isEN ? 'lk_progress_en' : 'lk_progress'}
      studentId={studentId}
      lang={isEN ? 'en-US' : 'pt-BR'}
    />
  )
}
