import { notFound } from 'next/navigation'
import { MODULES } from '@/lib/curriculum'
import { EN_MODULES } from '@/lib/curriculum-en'
import { toCourseIndex } from '@/lib/curriculum-index'
import { prisma, withDb } from '@/lib/db'
import { LearnView } from './view'

export default async function Page({ params }: { params: Promise<{ studentId: string }> }) {
  const { studentId } = await params

  // The portal used to answer 200 for a learner who does not exist: the page
  // rendered fine and the client fetch then said "not found" inside a perfectly
  // successful response. Crawlers and link checkers read that as a real page.
  //
  // A failed *lookup* is not the same as a missing learner, though, and the
  // difference matters to someone whose link is their only way in. If the
  // database cannot be reached the page still renders, and the view says so in
  // its own words rather than claiming the learner is gone.
  try {
    const student = await withDb(() => prisma.student.findUnique({
      where: { id: studentId },
      select: { id: true },
    }))
    if (!student) notFound()
  } catch (err) {
    // notFound() works by throwing, so it must not be swallowed here.
    if (err && typeof err === 'object' && 'digest' in err) throw err
  }

  return <LearnView ptModules={toCourseIndex(MODULES)} enModules={toCourseIndex(EN_MODULES)} />
}
