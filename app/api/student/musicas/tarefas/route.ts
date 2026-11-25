import { NextRequest, NextResponse } from 'next/server'
import { prisma, withDb } from '@/lib/db'
import { MUSICAS } from '@/lib/musicas'
import { podeAgirComo, readStudentId } from '@/lib/student-auth'

/**
 * As respostas escritas das tarefas de uma música.
 *
 * Texto livre vindo do navegador, então três limites antes de gravar:
 *
 *   1. quem — `podeAgirComo`, e não "veio um studentId na requisição";
 *   2. o quê — a música tem que existir em lib/musicas e o índice tem que ser
 *      uma tarefa daquela música, senão qualquer par inventado criaria linha;
 *   3. quanto — texto cortado no servidor, porque `maxLength` no textarea é
 *      sugestão para quem usa a tela, não limite para quem usa curl.
 */

/** Resposta de uma tarefa. Generoso para quem escreve, finito para o banco. */
const LIMITE = 4000

function musicaETarefa(videoId: unknown, indice: unknown): { ok: true } | { ok: false; erro: string } {
  if (typeof videoId !== 'string' || !videoId) return { ok: false, erro: 'Música não informada.' }
  if (typeof indice !== 'number' || !Number.isInteger(indice) || indice < 0) {
    return { ok: false, erro: 'Tarefa não informada.' }
  }
  const musica = MUSICAS.find(m => m.videoId === videoId)
  if (!musica) return { ok: false, erro: 'Música não existe.' }
  if (indice >= musica.tarefas.length) return { ok: false, erro: 'Tarefa não existe nesta música.' }
  return { ok: true }
}

/** A mesma pergunta das duas pontas: esta pessoa pode mexer neste aluno? */
async function autorizado(req: NextRequest, studentId: string): Promise<boolean> {
  const aluno = await withDb(() => prisma.student.findUnique({
    where: { id: studentId },
    select: { password: true },
  }))
  if (!aluno) return false
  return podeAgirComo({ sessao: readStudentId(req), studentId, temSenha: aluno.password !== null })
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const studentId = searchParams.get('studentId')
  const videoId = searchParams.get('videoId')
  if (!studentId || !videoId) {
    return NextResponse.json({ error: 'Missing studentId or videoId' }, { status: 400 })
  }

  try {
    if (!await autorizado(req, studentId)) {
      return NextResponse.json({ error: 'Sem acesso a estas respostas.' }, { status: 403 })
    }

    const notas = await withDb(() => prisma.musicNote.findMany({
      where: { studentId, videoId },
      select: { taskIndex: true, text: true },
      take: 50,
    }))

    // Devolve um mapa índice → texto: é como a tela usa, e poupa a tela de
    // procurar na lista a cada render.
    const respostas: Record<number, string> = {}
    for (const n of notas) respostas[n.taskIndex] = n.text
    return NextResponse.json({ respostas })
  } catch {
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { studentId, videoId, indice, texto } = await req.json()
    if (typeof studentId !== 'string' || !studentId) {
      return NextResponse.json({ error: 'Missing studentId' }, { status: 400 })
    }

    const alvo = musicaETarefa(videoId, indice)
    if (!alvo.ok) return NextResponse.json({ error: alvo.erro }, { status: 400 })

    if (typeof texto !== 'string') {
      return NextResponse.json({ error: 'Texto inválido.' }, { status: 400 })
    }
    // Corta, não recusa: devolver erro para quem escreveu demais apagaria o
    // que a pessoa acabou de digitar na tela.
    const limpo = texto.slice(0, LIMITE)

    if (!await autorizado(req, studentId)) {
      return NextResponse.json({ error: 'Sem acesso a estas respostas.' }, { status: 403 })
    }

    await withDb(() => prisma.musicNote.upsert({
      where: { studentId_videoId_taskIndex: { studentId, videoId: videoId as string, taskIndex: indice as number } },
      update: { text: limpo },
      create: { studentId, videoId: videoId as string, taskIndex: indice as number, text: limpo },
    }))

    return NextResponse.json({ ok: true, cortado: limpo.length < texto.length })
  } catch {
    return NextResponse.json({ error: 'Não foi possível salvar.' }, { status: 500 })
  }
}
