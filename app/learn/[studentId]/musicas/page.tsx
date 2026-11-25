import { notFound } from 'next/navigation'
import { prisma, withDb } from '@/lib/db'
import { assinaturaValendo } from '@/lib/plano'
import { ListaDeMusicas } from './view'

/**
 * A estante de músicas.
 *
 * Existe só no curso de inglês: são quarenta músicas em inglês, escolhidas
 * para quem fala português. O dia em que o curso de português tiver as suas,
 * esta tela ganha uma irmã — e não um `if` dentro dela.
 */
export default async function MusicasPage({
  params,
}: {
  params: Promise<{ studentId: string }>
}) {
  const { studentId } = await params

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
  if (curso !== 'en') notFound()

  return <ListaDeMusicas studentId={studentId} assinante={assinaturaValendo(student)} />
}
