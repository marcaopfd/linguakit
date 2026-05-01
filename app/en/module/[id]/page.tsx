'use client'

import { useParams } from 'next/navigation'
import { EN_MODULES } from '@/lib/curriculum-en'
import { ModulePageView } from '@/components/ModulePageView'

export default function EnModulePage() {
  const { id } = useParams<{ id: string }>()
  return (
    <ModulePageView
      modId={id}
      modules={EN_MODULES}
      lessonBase="/en/lesson"
      backHref="/en"
      progressKey="lk_progress_en"
    />
  )
}
