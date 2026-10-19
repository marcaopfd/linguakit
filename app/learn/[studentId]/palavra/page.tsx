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

  /*
   * The word is Portuguese for everybody, whichever course they are on.
   *
   * It does not follow the course the way the lessons do: one word a day for
   * the whole site means a Brazilian and the American they are studying with
   * are stuck on the same five letters, which is the part people talk about.
   * `wordOfTheDay` still takes a course and the English list is still there,
   * so this is one argument away from being a choice if it should be.
   *
   * The interface stays in the learner's own language — that is `lang`, which
   * `uiStrings` flips. `speakLang` is separate because the answer is read
   * aloud, and a Portuguese word in an American voice is no use to anyone.
   */
  return (
    <DailyWordView
      studentId={studentId}
      dayKey={dayKey()}
      band={bandOfTheDay()}
      course="pt"
      scoreAction={scoreGuessAction}
      revealAction={revealAnswerAction}
      lang={accentTag(course, student.accent)}
      speakLang={accentTag('pt', student.accent)}
    />
  )
}
