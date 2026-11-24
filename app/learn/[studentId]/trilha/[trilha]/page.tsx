import { notFound } from 'next/navigation'
import { EN_MODULES } from '@/lib/curriculum-en'
import { toCourseIndex } from '@/lib/curriculum-index'
import { prisma, withDb } from '@/lib/db'
import { trilhaPorId } from '@/lib/trilhas'
import { MapaDaTrilha } from './view'

/**
 * O mapa de uma trilha: os módulos como um caminho de cima para baixo.
 *
 * Só existe no curso de inglês. Quem estuda português cai no 404, que é a
 * verdade — a trilha não existe para ele.
 */
export default async function TrilhaPage({
  params,
}: {
  params: Promise<{ studentId: string; trilha: string }>
}) {
  const { studentId, trilha: trilhaId } = await params

  const student = await withDb(() => prisma.student.findUnique({
    where: { id: studentId },
    select: { course: true, lessons: { select: { moduleId: true, unitIndex: true } }, testResult: { select: { course: true } } },
  }))
  if (!student) notFound()

  const isEN = (student.course ?? student.testResult?.course) === 'en'
  const trilha = trilhaPorId(trilhaId)
  if (!isEN || !trilha || !trilha.disponivel) notFound()

  return (
    <MapaDaTrilha
      studentId={studentId}
      trilha={trilha}
      niveis={toCourseIndex(EN_MODULES)}
      lessons={student.lessons}
    />
  )
}
