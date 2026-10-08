import { notFound } from 'next/navigation'
import { MODULES } from '@/lib/curriculum'
import { toModuleSummary } from '@/lib/curriculum-index'
import { ModulePageView } from '@/components/ModulePageView'

export default async function ModulePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const mod = MODULES.find(m => m.id === id)
  if (!mod) notFound()

  return (
    <ModulePageView
      mod={toModuleSummary(mod)}
      lessonBase="/lesson"
      backHref="/pt"
      progressKey="lk_progress"
      lang="pt-BR"
    />
  )
}
