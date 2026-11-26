import { prisma, withDb } from '@/lib/db'
import { ResponderDuvidas } from './view'

/**
 * Onde o professor responde.
 *
 * Esta página é a que decide o que aparece numa página pública do site, então
 * ela mostra as não respondidas primeiro: a fila é o trabalho, e o que já foi
 * respondido é histórico.
 */
export const dynamic = 'force-dynamic'

export default async function PainelDuvidasPage() {
  const duvidas = await withDb(() => prisma.question.findMany({
    orderBy: [{ answeredAt: 'asc' }, { createdAt: 'asc' }],
    take: 200,
    select: {
      id: true, text: true, context: true, publishedText: true,
      answer: true, published: true, createdAt: true, answeredAt: true,
      student: { select: { name: true, email: true } },
    },
  }))

  return (
    <ResponderDuvidas
      duvidas={duvidas.map(d => ({
        id: d.id,
        texto: d.text,
        contexto: d.context,
        perguntaRevisada: d.publishedText,
        resposta: d.answer,
        publicada: d.published,
        criadaEm: d.createdAt.toISOString(),
        respondidaEm: d.answeredAt ? d.answeredAt.toISOString() : null,
        aluno: d.student.name,
        email: d.student.email,
      }))}
    />
  )
}
