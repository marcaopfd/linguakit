/**
 * As dúvidas dos alunos.
 *
 * A regra que organiza tudo aqui: **nada do que um aluno escreve vai ao ar
 * sem o professor mandar.** Uma caixa de texto pública num site que vende
 * produto é um convite a spam, e página indexada não se desfaz — então
 * `published` nasce falso e só sai do falso por uma ação humana.
 *
 * A segunda regra: o nome de quem perguntou nunca é publicado. A pessoa
 * mandou uma dúvida, não um depoimento.
 */

/** O teto do que o aluno escreve. Generoso para dúvida, finito para o banco. */
export const LIMITE_PERGUNTA = 1200

/** O teto da resposta do professor. */
export const LIMITE_RESPOSTA = 6000

/** O mínimo para uma pergunta ser uma pergunta, e não um teste de teclado. */
export const MINIMO_PERGUNTA = 12

export type ProblemaNaPergunta = 'curta' | 'vazia'

/**
 * Limpa o texto da pergunta, ou diz por que ele não serve.
 *
 * Corta no limite em vez de recusar: devolver erro para quem escreveu demais
 * apaga o que a pessoa acabou de digitar.
 */
export function limparPergunta(bruto: unknown): { ok: true; texto: string } | { ok: false; erro: ProblemaNaPergunta } {
  if (typeof bruto !== 'string') return { ok: false, erro: 'vazia' }
  // Espaço em excesso vira um espaço: a pessoa cola de outro lugar e vem com
  // quebra de linha dupla, tabulação e espaço no fim.
  const texto = bruto.replace(/\s+/g, ' ').trim()
  if (!texto) return { ok: false, erro: 'vazia' }
  if (texto.length < MINIMO_PERGUNTA) return { ok: false, erro: 'curta' }
  return { ok: true, texto: texto.slice(0, LIMITE_PERGUNTA) }
}

/** O que a tela diz para cada problema, em português, sem jargão. */
export function recadoDoProblema(erro: ProblemaNaPergunta): string {
  return erro === 'curta'
    ? `Escreva um pouco mais — pelo menos ${MINIMO_PERGUNTA} caracteres, para dar para entender a dúvida.`
    : 'Escreva a sua dúvida antes de enviar.'
}

export type DuvidaGuardada = {
  text: string
  publishedText: string | null
  answer: string | null
  published: boolean
}

/**
 * Se esta dúvida pode ir ao ar.
 *
 * Publicar pergunta sem resposta deixaria no site uma dúvida de aluno em
 * aberto, assinada pelo produto — exatamente a prova contrária da que a
 * página quer dar.
 */
export function podePublicar(d: Pick<DuvidaGuardada, 'answer'>): boolean {
  return Boolean(d.answer && d.answer.trim().length > 0)
}

/**
 * O texto da pergunta como o público vê.
 *
 * O professor pode reescrever a pergunta ao publicar, e isso não é maquiagem:
 * dúvida real vem com nome de rua, nome de empresa e coisa que a pessoa não
 * queria num site. Publicar o original sem revisão seria publicar dado
 * pessoal de alguém que só queria tirar uma dúvida.
 */
export function perguntaPublica(d: Pick<DuvidaGuardada, 'text' | 'publishedText'>): string {
  const limpa = d.publishedText?.trim()
  return limpa && limpa.length > 0 ? limpa : d.text
}

/** O estado da dúvida, para a tela do aluno dizer onde ela está. */
export type EstadoDaDuvida = 'esperando' | 'respondida' | 'publicada'

export function estadoDaDuvida(d: Pick<DuvidaGuardada, 'answer' | 'published'>): EstadoDaDuvida {
  if (d.published && d.answer) return 'publicada'
  if (d.answer) return 'respondida'
  return 'esperando'
}
