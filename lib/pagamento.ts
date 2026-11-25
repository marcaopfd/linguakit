import { prisma, withDb } from './db'

/**
 * O encontro entre o dinheiro e a conta.
 *
 * A Kiwify avisa por e-mail de quem comprou — não por id de aluno, que ela
 * não conhece. Então existem três ordens possíveis, e as três precisam
 * terminar no mesmo lugar:
 *
 *   1. cria a conta, depois paga  → o webhook acha o aluno e grava nele;
 *   2. paga, depois cria a conta  → o aviso fica guardado e o cadastro o acha;
 *   3. paga com outro e-mail      → o aviso fica sem dono, visível no painel.
 *
 * O caso 2 era o furo: o aviso virava um 200 e sumia. Quem comprasse o plano
 * anual antes de se cadastrar esperaria a renovação — um ano — para ter
 * acesso ao que já tinha pago.
 */

export type DadosDoPlano = {
  plan: string
  planStatus: string
  renewsAt: Date | null
  billingRef?: string
}

/** O que guardamos de um aviso, na parte que interessa a esta decisão. */
export type AvisoGuardado = {
  plan: string
  status: string
  renewsAt: Date | null
  billingRef: string | null
  createdAt: Date
}

/**
 * Qual dos avisos guardados vale.
 *
 * O mais recente, sempre. Quem pagou em janeiro e cancelou em março tem dois
 * avisos esperando, e aplicar o de janeiro daria acesso a quem cancelou. A
 * ordem que a Kiwify mandou é a ordem dos fatos.
 */
export function avisoQueVale<T extends { createdAt: Date }>(avisos: T[]): T | null {
  if (!avisos.length) return null
  return avisos.reduce((a, b) => (b.createdAt.getTime() > a.createdAt.getTime() ? b : a))
}

/** O aviso traduzido para as colunas do aluno. */
export function planoDoAviso(aviso: AvisoGuardado): DadosDoPlano {
  return {
    plan: aviso.plan,
    planStatus: aviso.status,
    renewsAt: aviso.renewsAt,
    // Só sobrescreve o billingRef quando o aviso traz um: `undefined` em
    // Prisma quer dizer "não mexe", e apagar uma referência que já existia
    // deixaria a renovação seguinte sem como achar o aluno.
    ...(aviso.billingRef ? { billingRef: aviso.billingRef } : {}),
  }
}

/**
 * Aplica a um aluno o pagamento que já estava esperando pelo e-mail dele.
 *
 * Chamado no cadastro e em "já paguei e não liberou". Quando há mais de um
 * aviso para o mesmo e-mail, vale o mais recente: o último evento é a verdade
 * de agora (quem pagou e depois cancelou está cancelado, não ativo).
 *
 * Devolve o que foi aplicado, ou null quando não havia nada esperando.
 */
export async function aplicarPagamentoPendente(
  email: string,
  studentId: string,
): Promise<DadosDoPlano | null> {
  const avisos = await withDb(() => prisma.paymentNotice.findMany({
    where: { email, appliedAt: null },
    orderBy: { createdAt: 'desc' },
  }))

  const atual = avisoQueVale(avisos)
  if (!atual) return null
  const dados = planoDoAviso(atual)

  await withDb(() => prisma.student.update({ where: { id: studentId }, data: dados }))

  // Todos os avisos daquele e-mail passam a ter dono, não só o que venceu:
  // os anteriores são história desta mesma assinatura, e deixá-los pendentes
  // faria o próximo cadastro com o mesmo e-mail aplicar um estado antigo.
  await withDb(() => prisma.paymentNotice.updateMany({
    where: { email, appliedAt: null },
    data: { studentId, appliedAt: new Date() },
  }))

  return dados
}

/** Os avisos que chegaram e não acharam ninguém. O painel mostra esta lista. */
export async function pagamentosSemDono() {
  return withDb(() => prisma.paymentNotice.findMany({
    where: { studentId: null },
    orderBy: { createdAt: 'desc' },
    take: 100,
  }))
}
