import { notFound } from 'next/navigation'
import { prisma, withDb } from '@/lib/db'
import { ReviewView } from './view'

export default async function ReviewPage({ params }: { params: Promise<{ studentId: string }> }) {
  const { studentId } = await params

  const student = await withDb(() => prisma.student.findUnique({
    where: { id: studentId },
    select: { course: true, testResult: { select: { course: true } } },
  }))
  if (!student) notFound()

  const isEN = (student.course ?? student.testResult?.course) === 'en'

  const items = await withDb(() => prisma.reviewItem.findMany({
    where: { studentId, dueAt: { lte: new Date() } },
    select: { id: true, exerciseType: true, question: true, expected: true, box: true },
    orderBy: { dueAt: 'asc' },
    take: 20,
  }))

  return <ReviewView studentId={studentId} items={items} lang={isEN ? 'en-US' : 'pt-BR'} />
}
