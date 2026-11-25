import { notFound } from 'next/navigation'
import { Paywall } from '@/components/Paywall'
import { prisma, withDb } from '@/lib/db'
import { musica, musicaLivre } from '@/lib/musicas'
import { motivoDoBloqueio } from '@/lib/plano'
import { AulaDeMusica } from './view'

/** Uma música: o trecho, o vocabulário do tema, duas perguntas e a escrita. */
export default async function MusicaPage({
  params,
}: {
  params: Promise<{ studentId: string; videoId: string }>
}) {
  const { studentId, videoId } = await params

  const student = await withDb(() => prisma.student.findUnique({
    where: { id: studentId },
    select: {
      course: true,
      plan: true, planStatus: true, renewsAt: true,
      testResult: { select: { course: true } },
    },
  }))
  if (!student) notFound()

  const curso = student.course ?? student.testResult?.course
  const m = musica(videoId)
  if (curso !== 'en' || !m) notFound()

  const bloqueio = motivoDoBloqueio(student, { tipo: 'musica', livre: musicaLivre(m) })
  if (bloqueio) {
    return <Paywall studentId={studentId} oQue={`${m.artista} — ${m.nome}`} motivo={bloqueio} />
  }

  return <AulaDeMusica studentId={studentId} musica={m} />
}
