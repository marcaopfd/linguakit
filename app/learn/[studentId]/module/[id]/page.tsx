'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { MODULES } from '@/lib/curriculum'
import { EN_MODULES } from '@/lib/curriculum-en'
import { ModulePageView } from '@/components/ModulePageView'

export default function LearnModulePage() {
  const { studentId, id } = useParams<{ studentId: string; id: string }>()
  const [course, setCourse] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/api/students/${studentId}`)
      .then(r => r.json())
      .then(data => setCourse(data.student?.testResult?.course ?? 'pt'))
      .catch(() => setCourse('pt'))
  }, [studentId])

  if (!course) return null

  const isEN = course === 'en'
  return (
    <ModulePageView
      modId={id}
      modules={isEN ? EN_MODULES : MODULES}
      lessonBase={`/learn/${studentId}/lesson`}
      backHref={`/learn/${studentId}`}
      progressKey={isEN ? 'lk_progress_en' : 'lk_progress'}
    />
  )
}
