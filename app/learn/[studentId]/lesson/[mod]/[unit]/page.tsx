'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { MODULES } from '@/lib/curriculum'
import { EN_MODULES } from '@/lib/curriculum-en'
import { LessonPageView } from '@/components/LessonPageView'

export default function LearnLessonPage() {
  const { studentId } = useParams<{ studentId: string; mod: string; unit: string }>()
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
    <LessonPageView
      modules={isEN ? EN_MODULES : MODULES}
      moduleBase={`/learn/${studentId}/module`}
      pdfBase={isEN ? '/api/pdf/en' : '/api/pdf/pt'}
      progressKey={isEN ? 'lk_progress_en' : 'lk_progress'}
      studentId={studentId}
    />
  )
}
