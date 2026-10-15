import { notFound } from 'next/navigation'
import { accentTag } from '@/lib/accents'
import { bandOfTheDay, dayKey } from '@/lib/daily-word'
import { prisma, withDb } from '@/lib/db'
import { revealAnswerAction, scoreGuessAction } from './actions'
import { DailyWordView } from './view'

/** Never cached: the word turns over at midnight and the page must turn with it. */
export const dynamic = 'force-dynamic'

export default async function DailyWordPage({
  params,
}: {
  params: Promise<{ studentId: string }>
}) {
  const { studentId } = await params

  const student = await withDb(() => prisma.student.findUnique({
    where: { id: studentId },
    select: { course: true, accent: true, testResult: { select: { course: true } } },
  }))
  if (!student) notFound()

  const course = student.course ?? student.testResult?.course
  const isEN = course === 'en'

  return (
    <DailyWordView
      studentId={studentId}
      dayKey={dayKey()}
      band={bandOfTheDay()}
      course={isEN ? 'en' : 'pt'}
      scoreAction={scoreGuessAction}
      revealAction={revealAnswerAction}
      lang={accentTag(course, student.accent)}
    />
  )
}
