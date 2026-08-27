'use client'

import { useCallback, useEffect, useState } from 'react'

type LessonRow = { moduleId: string; unitIndex: number }

/**
 * Completed unit indexes for one module.
 *
 * Teacher browsing (no studentId) keeps using localStorage — it is a personal
 * scratch pad and never leaves the machine. The student portal reads and
 * writes the database instead, so progress follows the student across devices
 * and two students sharing one browser never see each other's checkmarks.
 */
export function useModuleProgress(modId: string, progressKey: string, studentId?: string) {
  const [done, setDone] = useState<number[]>([])

  useEffect(() => {
    let cancelled = false

    if (studentId) {
      fetch(`/api/progress?studentId=${encodeURIComponent(studentId)}`)
        .then(r => r.json())
        .then((data: { lessons?: LessonRow[] }) => {
          if (cancelled) return
          setDone((data.lessons ?? []).filter(l => l.moduleId === modId).map(l => l.unitIndex))
        })
        .catch(() => {})
      return () => { cancelled = true }
    }

    try {
      const saved = localStorage.getItem(progressKey)
      if (saved) setDone(JSON.parse(saved)[modId] ?? [])
    } catch {}
    return () => { cancelled = true }
  }, [modId, progressKey, studentId])

  const markDone = useCallback((unitIndex: number) => {
    setDone(prev => (prev.includes(unitIndex) ? prev : [...prev, unitIndex]))

    if (studentId) {
      fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, moduleId: modId, unitIndex }),
      }).catch(() => {})
      return
    }

    try {
      const saved = localStorage.getItem(progressKey)
      const all = saved ? JSON.parse(saved) : {}
      const modProgress: number[] = all[modId] ?? []
      if (!modProgress.includes(unitIndex)) modProgress.push(unitIndex)
      all[modId] = modProgress
      localStorage.setItem(progressKey, JSON.stringify(all))
    } catch {}
  }, [modId, progressKey, studentId])

  return { done, markDone }
}
