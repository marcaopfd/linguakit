import { NextRequest, NextResponse } from 'next/server'
import { renderToStream, DocumentProps } from '@react-pdf/renderer'
import { createElement, JSXElementConstructor, ReactElement } from 'react'
import { mayReadCourse } from '@/lib/auth'
import { prisma, withDb } from '@/lib/db'
import { podeAbrir } from '@/lib/plano'
import { KitDeBolsoPDF } from '@/lib/pdf-kit'
import { trilhaPorId } from '@/lib/trilhas'
import { frasesDoKit } from '@/lib/trilhas/kit'

export const runtime = 'nodejs'

/** O Kit de bolso de uma trilha, em PDF. */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ trilha: string }> },
) {
  if (!(await mayReadCourse(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Quem pediu. `mayReadCourse` já conferiu que este aluno existe.
  const studentId = new URL(req.url).searchParams.get('s')
  const student = studentId
    ? await withDb(() => prisma.student.findUnique({
        where: { id: studentId },
        select: { plan: true, planStatus: true, renewsAt: true },
      }))
    : null

  if (!student || !podeAbrir(student, { tipo: 'kit-de-bolso' })) {
    return NextResponse.json({ error: 'O kit faz parte do plano completo' }, { status: 402 })
  }

  const { trilha: trilhaId } = await params
  const trilha = trilhaPorId(trilhaId)
  const grupos = trilha ? frasesDoKit(trilha) : []
  if (!trilha || !grupos.length) {
    return NextResponse.json({ error: 'Trilha sem kit' }, { status: 404 })
  }

  const stream = await renderToStream(
    createElement(KitDeBolsoPDF, { trilha: trilha.nome, promessa: trilha.promessa, grupos }) as unknown as ReactElement<DocumentProps, JSXElementConstructor<DocumentProps>>,
  )

  const chunks: Uint8Array[] = []
  for await (const chunk of stream as AsyncIterable<Uint8Array>) chunks.push(chunk)

  const nome = `LinguaKit_Kit_de_bolso_${trilha.nome.replace(/[^a-z0-9]/gi, '_')}.pdf`
  return new NextResponse(Buffer.concat(chunks), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${nome}"`,
    },
  })
}
