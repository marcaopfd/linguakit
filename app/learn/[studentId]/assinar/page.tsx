import { notFound } from 'next/navigation'
import { prisma, withDb } from '@/lib/db'
import { assinaturaValendo } from '@/lib/plano'
import { TelaDePlanos } from './view'

/** Os planos. O pagamento acontece fora: aqui só se escolhe. */
export default async function AssinarPage({
  params,
}: {
  params: Promise<{ studentId: string }>
}) {
  const { studentId } = await params

  const student = await withDb(() => prisma.student.findUnique({
    where: { id: studentId },
    select: { name: true, plan: true, planStatus: true, renewsAt: true },
  }))
  if (!student) notFound()

  return (
    <TelaDePlanos
      studentId={studentId}
      nome={student.name}
      plano={student.plan}
      estado={student.planStatus}
      valendo={assinaturaValendo(student)}
      renovaEm={student.renewsAt ? student.renewsAt.toISOString() : null}
      /* Os links de checkout da Kiwify. Enquanto não existirem, a tela mostra
         o aviso em vez de um botão que não leva a lugar nenhum. */
      linkMensal={process.env.KIWIFY_LINK_MENSAL ?? null}
      linkAnual={process.env.KIWIFY_LINK_ANUAL ?? null}
    />
  )
}
