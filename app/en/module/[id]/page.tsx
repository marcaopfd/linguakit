import { notFound } from 'next/navigation'
import { EN_MODULES } from '@/lib/curriculum-en'
import { toModuleSummary } from '@/lib/curriculum-index'
import { ModulePageView } from '@/components/ModulePageView'

export default async function EnModulePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const mod = EN_MODULES.find(m => m.id === id)
  if (!mod) notFound()

  return (
    <ModulePageView
      mod={toModuleSummary(mod)}
      lessonBase="/en/lesson"
      backHref="/en"
      progressKey="lk_progress_en"
      lang="en-US"
    />
  )
}
