/**
 * Quem responde pelo site, num lugar só.
 *
 * As quatro páginas legais leem daqui. Trocar o e-mail de contato ou o nome
 * do responsável é mexer neste arquivo, não em quatro textos — e assim eles
 * não podem discordar entre si, que é o jeito clássico de uma política de
 * privacidade ficar errada.
 *
 * O que está vazio está vazio de propósito: a página se vira sem o dado em
 * vez de mostrar um "[preencher]" para o visitante.
 */

import { SITE_URL } from './site'

export const LEGAL = {
  produto: 'LinguaKit',
  site: SITE_URL,

  /**
   * O responsável pelo site, como pessoa física.
   *
   * Confira se é assim que você quer aparecer — é o nome que o visitante lê
   * e o que dá sentido aos Termos.
   */
  responsavel: 'Marcos Dias',

  /** Cidade e país de quem mantém o site. Não é endereço de cobrança. */
  localidade: 'Dublin, Irlanda',

  /**
   * O e-mail de contato. Enquanto for nulo, as páginas dizem que o canal
   * ainda está sendo montado em vez de apontar para um endereço que não
   * existe. Vem de LINGUAKIT_SUPORTE, a mesma variável que a tela de "já
   * paguei e não liberou" usa.
   */
  email: process.env.LINGUAKIT_SUPORTE ?? null,

  /**
   * Quem processa o pagamento. Importa nas três páginas: é a Kiwify quem
   * vende formalmente, emite a nota e opera o estorno — o site aqui não vê
   * cartão nenhum.
   */
  pagamento: {
    nome: 'Kiwify',
    site: 'https://kiwify.com.br',
  },

  /**
   * A data que aparece como "atualizado em". Mexeu no texto, mexa aqui —
   * uma política com data velha é uma política em que ninguém confia.
   */
  atualizadoEm: '2026-11-25',
} as const

/** A data no formato que o leitor brasileiro espera. */
export function dataPorExtenso(iso: string): string {
  const [ano, mes, dia] = iso.split('-').map(Number)
  const meses = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
  ]
  return `${dia} de ${meses[mes - 1]} de ${ano}`
}
