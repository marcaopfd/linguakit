import { notFound } from 'next/navigation'
import { MODULES } from '@/lib/curriculum'
import { findLesson } from '@/lib/curriculum-index'
import { LessonPageView } from '@/components/LessonPageView'

/**
 * Server component: the curriculum is read here and only this unit crosses to
 * the browser, instead of the whole 374 KB course going into the client bundle.
 */
export default async function LessonPage({ params }: { params: Promise<{ mod: string; unit: string }> }) {
  const { mod: modId, unit: unitParam } = await params
  const lesson = findLesson(MODULES, modId, Number(unitParam))
  if (!lesson) notFound()

  return (
    <LessonPageView
      unit={lesson.unit}
      mod={lesson.mod}
      unitIndex={Number(unitParam)}
      moduleBase="/module"
      pdfBase="/api/pdf/pt"
      progressKey="lk_progress"
      lang="pt-BR"
    />
  )
}
