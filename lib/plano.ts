/**
 * O que cada aluno pode abrir.
 *
 * Um lugar só. A tentação é espalhar `if (aluno.plan === 'free')` pelas telas,
 * e seis meses depois ninguém sabe o que é grátis — então toda decisão passa
 * por `podeAbrir`, e mudar a régua é mudar uma função.
 *
 * O princípio da divisão: o que já estava construído e pago continua de graça
 * — o teste de nível, as 50 unidades do curso Geral, a palavra do dia, a
 * revisão. O que se cobra é o que ninguém mais tem: as trilhas escritas para
 * quem vai viajar ou morar fora, as conversas, o kit de bolso e as músicas.
 *
 * O primeiro módulo de cada trilha fica aberto de propósito. Vender uma trilha
 * que a pessoa nunca abriu é vender uma promessa; depois do módulo 1 ela já
 * sabe o que está comprando.
 */

export type Plano = 'free' | 'monthly' | 'annual'
export type EstadoDoPlano = 'active' | 'paused' | 'canceled'

/** O pedaço do aluno que interessa a esta decisão. */
export type AlunoComPlano = {
  plan?: string | null
  planStatus?: string | null
  renewsAt?: Date | string | null
}

export type Recurso =
  /** Qualquer módulo de trilha que não seja o primeiro. */
  | { tipo: 'modulo-de-trilha'; numero: number }
  /** As conversas com personagem. */
  | { tipo: 'simulacao' }
  /** O PDF para levar na viagem. */
  | { tipo: 'kit-de-bolso' }
  /** Uma música da seção de Músicas. A primeira de cada família é aberta. */
  | { tipo: 'musica'; livre: boolean }
  /** O curso A1–C2, a palavra do dia, a revisão e o teste. */
  | { tipo: 'curso-geral' }
  | { tipo: 'palavra-do-dia' }
  | { tipo: 'revisao' }

/**
 * Se a assinatura está valendo agora.
 *
 * Pausada não é cancelada: quem pausou volta de onde parou, mas enquanto está
 * pausado não tem acesso pago. E uma assinatura cuja data de renovação já
 * passou vale até o fim do período pago, não até o dia do cancelamento — é o
 * que a pessoa comprou.
 */
export function assinaturaValendo(aluno: AlunoComPlano, agora: Date = new Date()): boolean {
  const plano = (aluno.plan ?? 'free') as Plano
  if (plano === 'free') return false

  const estado = (aluno.planStatus ?? 'active') as EstadoDoPlano
  if (estado === 'paused') return false

  if (!aluno.renewsAt) return estado === 'active'

  const ate = new Date(aluno.renewsAt)
  return ate.getTime() > agora.getTime()
}

/** O portão. Toda tela pergunta aqui. */
export function podeAbrir(aluno: AlunoComPlano, recurso: Recurso, agora: Date = new Date()): boolean {
  switch (recurso.tipo) {
    // Grátis para sempre: é o que prova que o produto é bom.
    case 'curso-geral':
    case 'palavra-do-dia':
    case 'revisao':
      return true

    // O primeiro módulo de cada trilha é a amostra.
    case 'modulo-de-trilha':
      return recurso.numero <= 1 || assinaturaValendo(aluno, agora)

    // Uma música de cada nível de dificuldade abre sem pagar, pela mesma
    // razão do módulo 1: a pessoa precisa descobrir onde o ouvido dela está.
    case 'musica':
      return recurso.livre || assinaturaValendo(aluno, agora)

    case 'simulacao':
    case 'kit-de-bolso':
      return assinaturaValendo(aluno, agora)
  }
}

/** Para a tela dizer por que algo está fechado, sem inventar outra regra. */
export function motivoDoBloqueio(aluno: AlunoComPlano, recurso: Recurso): 'pausado' | 'pago' | null {
  if (podeAbrir(aluno, recurso)) return null
  return (aluno.planStatus ?? 'active') === 'paused' ? 'pausado' : 'pago'
}
