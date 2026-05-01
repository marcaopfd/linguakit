'use client'

import { useParams } from 'next/navigation'
import { MODULES } from '@/lib/curriculum'
import { ModulePageView } from '@/components/ModulePageView'

export default function ModulePage() {
  const { id } = useParams<{ id: string }>()
  return (
    <ModulePageView
      modId={id}
      modules={MODULES}
      lessonBase="/lesson"
      backHref="/pt"
      progressKey="lk_progress"
    />
  )
}
