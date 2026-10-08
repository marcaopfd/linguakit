import { notFound } from 'next/navigation'
import { EN_MODULES } from '@/lib/curriculum-en'
import { findLesson } from '@/lib/curriculum-index'
import { LessonPageView } from '@/components/LessonPageView'

export default async function EnLessonPage({ params }: { params: Promise<{ mod: string; unit: string }> }) {
  const { mod: modId, unit: unitParam } = await params
  const lesson = findLesson(EN_MODULES, modId, Number(unitParam))
  if (!lesson) notFound()

  return (
    <LessonPageView
      unit={lesson.unit}
      mod={lesson.mod}
      unitIndex={Number(unitParam)}
      moduleBase="/en/module"
      pdfBase="/api/pdf/en"
      progressKey="lk_progress_en"
      lang="en-US"
    />
  )
}
