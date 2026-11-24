import { notFound } from 'next/navigation'
import { accentTag } from '@/lib/accents'
import { prisma, withDb } from '@/lib/db'
import { trilhaPorId } from '@/lib/trilhas'
import { LicoesDoModulo } from './view'

/** As lições de um módulo de trilha, uma lista curta antes de entrar. */
export default async function ModuloDaTrilhaPage({
  params,
}: {
  params: Promise<{ studentId: string; trilha: string; modulo: string }>
}) {
  const { studentId, trilha: trilhaId, modulo: moduloId } = await params

  const student = await withDb(() => prisma.student.findUnique({
    where: { id: studentId },
    select: {
      course: true, accent: true,
      lessons: { select: { moduleId: true, unitIndex: true } },
      testResult: { select: { course: true } },
    },
  }))
  if (!student) notFound()

  const curso = student.course ?? student.testResult?.course
  const trilha = trilhaPorId(trilhaId)
  const modulo = trilha?.modulos.find(m => m.id === moduloId)
  if (curso !== 'en' || !trilha || !modulo || !modulo.licoes.length) notFound()

  return (
    <LicoesDoModulo
      studentId={studentId}
      trilha={trilha}
      modulo={modulo}
      feitas={student.lessons.filter(l => l.moduleId === modulo.id).map(l => l.unitIndex)}
      lang={accentTag(curso, student.accent)}
    />
  )
}
