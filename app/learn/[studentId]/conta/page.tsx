import { notFound } from 'next/navigation'
import { prisma, withDb } from '@/lib/db'
import { assinaturaValendo } from '@/lib/plano'
import { TelaDaConta } from './view'

/**
 * A conta do aluno.
 *
 * Antes disto, quem chegava pelo teste de nível vivia dentro de um link
 * /learn/<id> e nada mais: trocou de celular sem copiar o link, perdeu tudo.
 * Com produto pago isso deixa de ser inconveniente e vira prejuízo, porque o
 * pagamento acha a pessoa pelo e-mail — e sem e-mail não há o que achar.
 */
export default async function ContaPage({
  params,
}: {
  params: Promise<{ studentId: string }>
}) {
  const { studentId } = await params

  const student = await withDb(() => prisma.student.findUnique({
    where: { id: studentId },
    select: {
      name: true, email: true, course: true, recoveryCodeAt: true,
      plan: true, planStatus: true, renewsAt: true,
      testResult: { select: { course: true } },
    },
  }))
  if (!student) notFound()

  return (
    <TelaDaConta
      studentId={studentId}
      nome={student.name}
      email={student.email}
      curso={student.course ?? student.testResult?.course ?? 'en'}
      plano={student.plan}
      estado={student.planStatus}
      valendo={assinaturaValendo(student)}
      renovaEm={student.renewsAt ? student.renewsAt.toISOString() : null}
      /* Para onde mandar quem pagou com outro e-mail. Enquanto não houver
         endereço configurado, a tela não inventa um: pede o e-mail usado e
         não promete um canal que não existe. */
      suporte={process.env.LINGUAKIT_SUPORTE ?? null}
      codigoEm={student.recoveryCodeAt ? student.recoveryCodeAt.toISOString() : null}
    />
  )
}
