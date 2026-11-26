import { NextRequest, NextResponse } from 'next/server'
import { prisma, withDb } from '@/lib/db'
import { LIMITE_RESPOSTA, podePublicar } from '@/lib/duvidas'
import { requireTeacher } from '@/lib/auth'

/**
 * Responder e publicar. Só o professor.
 *
 * O portão é `requireTeacher` na primeira linha, antes de ler o corpo: é esta
 * rota que decide o que aparece numa página pública do site.
 */

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const negado = requireTeacher(req)
  if (negado) return negado

  const { id } = await params
  try {
    const { resposta, perguntaRevisada, publicar } = await req.json()

    const atual = await withDb(() => prisma.question.findUnique({
      where: { id },
      select: { answer: true },
    }))
    if (!atual) return NextResponse.json({ error: 'Dúvida não existe.' }, { status: 404 })

    const dados: {
      answer?: string | null
      answeredAt?: Date | null
      publishedText?: string | null
      published?: boolean
    } = {}

    if (typeof resposta === 'string') {
      const limpa = resposta.trim().slice(0, LIMITE_RESPOSTA)
      dados.answer = limpa || null
      // A data da resposta acompanha a resposta: apagar o texto apaga a data,
      // senão sobra uma dúvida "respondida em março" sem resposta nenhuma.
      dados.answeredAt = limpa ? new Date() : null
    }

    if (typeof perguntaRevisada === 'string') {
      dados.publishedText = perguntaRevisada.trim().slice(0, 1200) || null
    }

    if (typeof publicar === 'boolean') {
      // Publicar sem resposta deixaria no site uma dúvida de aluno em aberto,
      // assinada pelo produto. A régua mora em lib/duvidas.ts.
      const respostaFinal = dados.answer !== undefined ? dados.answer : atual.answer
      if (publicar && !podePublicar({ answer: respostaFinal })) {
        return NextResponse.json(
          { error: 'Escreva a resposta antes de publicar.' },
          { status: 400 },
        )
      }
      dados.published = publicar
    }

    if (!Object.keys(dados).length) {
      return NextResponse.json({ error: 'Nada para mudar.' }, { status: 400 })
    }

    await withDb(() => prisma.question.update({ where: { id }, data: dados }))
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Não foi possível salvar.' }, { status: 500 })
  }
}

/** Apagar. É como o spam sai, e como uma pessoa pede para a dúvida dela sumir. */
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const negado = requireTeacher(req)
  if (negado) return negado

  const { id } = await params
  try {
    await withDb(() => prisma.question.delete({ where: { id } }))
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Não foi possível apagar.' }, { status: 500 })
  }
}
