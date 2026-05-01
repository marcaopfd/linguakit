'use client'

import { EN_MODULES } from '@/lib/curriculum-en'
import { LessonPageView } from '@/components/LessonPageView'

export default function EnLessonPage() {
  return (
    <LessonPageView
      modules={EN_MODULES}
      moduleBase="/en/module"
      pdfBase="/api/pdf/en"
      progressKey="lk_progress_en"
    />
  )
}
