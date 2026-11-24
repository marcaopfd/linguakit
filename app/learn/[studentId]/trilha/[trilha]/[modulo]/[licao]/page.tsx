import { notFound } from 'next/navigation'
import { accentTag } from '@/lib/accents'
import { prisma, withDb } from '@/lib/db'
import { trilhaPorId } from '@/lib/trilhas'
import { PlayerDaLicao } from './view'

/** Uma lição de trilha, do começo ao fim. */
export default async function LicaoPage({
  params,
}: {
  params: Promise<{ studentId: string; trilha: string; modulo: string; licao: string }>
}) {
  const { studentId, trilha: trilhaId, modulo: moduloId, licao: indice } = await params

  const student = await withDb(() => prisma.student.findUnique({
    where: { id: studentId },
    select: { course: true, accent: true, testResult: { select: { course: true } } },
  }))
  if (!student) notFound()

  const curso = student.course ?? student.testResult?.course
  const trilha = trilhaPorId(trilhaId)
  const modulo = trilha?.modulos.find(m => m.id === moduloId)
  const posicao = Number(indice)
  const licao = modulo?.licoes[posicao]
  if (curso !== 'en' || !trilha || !modulo || !licao) notFound()

  return (
    <PlayerDaLicao
      studentId={studentId}
      trilha={trilha}
      modulo={modulo}
      licao={licao}
      posicao={posicao}
      ultima={posicao >= modulo.licoes.length - 1}
      lang={accentTag(curso, student.accent)}
    />
  )
}
