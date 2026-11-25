import { notFound } from 'next/navigation'
import { prisma, withDb } from '@/lib/db'
import { assinaturaValendo } from '@/lib/plano'
import { TelaDePlanos } from './view'

/**
 * Os planos. O pagamento acontece fora: aqui só se escolhe.
 *
 * O e-mail vai junto para o checkout, e não por conveniência: a Kiwify avisa
 * a compra pelo e-mail do comprador, e é por ele que o webhook acha o aluno.
 * E-mail diferente do da conta é uma compra que não libera nada. Por isso
 * quem ainda não tem conta é mandado para criá-la antes de ver o botão.
 */
export default async function AssinarPage({
  params,
}: {
  params: Promise<{ studentId: string }>
}) {
  const { studentId } = await params

  const student = await withDb(() => prisma.student.findUnique({
    where: { id: studentId },
    select: { name: true, email: true, plan: true, planStatus: true, renewsAt: true },
  }))
  if (!student) notFound()

  return (
    <TelaDePlanos
      studentId={studentId}
      nome={student.name}
      email={student.email}
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
