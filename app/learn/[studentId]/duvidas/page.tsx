import { notFound } from 'next/navigation'
import { prisma, withDb } from '@/lib/db'
import { MinhasDuvidas } from './view'

/**
 * As dúvidas do aluno: onde ele manda e onde ele lê a resposta.
 *
 * O aluno vê as dele, respondidas ou não. A publicação na página aberta é
 * decisão do professor, e a tela diz isso em vez de deixar a pessoa
 * descobrir que a dúvida dela virou página.
 */
export default async function DuvidasDoAlunoPage({
  params,
}: {
  params: Promise<{ studentId: string }>
}) {
  const { studentId } = await params

  const aluno = await withDb(() => prisma.student.findUnique({
    where: { id: studentId },
    select: { name: true },
  }))
  if (!aluno) notFound()

  const duvidas = await withDb(() => prisma.question.findMany({
    where: { studentId },
    orderBy: { createdAt: 'desc' },
    take: 50,
    select: { id: true, text: true, answer: true, published: true, createdAt: true, answeredAt: true },
  }))

  return (
    <MinhasDuvidas
      studentId={studentId}
      nome={aluno.name}
      iniciais={duvidas.map(d => ({
        id: d.id,
        texto: d.text,
        resposta: d.answer,
        publicada: d.published,
        criadaEm: d.createdAt.toISOString(),
        respondidaEm: d.answeredAt ? d.answeredAt.toISOString() : null,
      }))}
    />
  )
}
