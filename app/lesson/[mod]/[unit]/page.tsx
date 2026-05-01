'use client'

import { MODULES } from '@/lib/curriculum'
import { LessonPageView } from '@/components/LessonPageView'

export default function LessonPage() {
  return (
    <LessonPageView
      modules={MODULES}
      moduleBase="/module"
      pdfBase="/api/pdf/pt"
      progressKey="lk_progress"
    />
  )
}
