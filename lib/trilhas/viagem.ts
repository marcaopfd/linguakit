import type { ModuloTrilha } from './tipos'
import { LICOES_AEROPORTO } from './viagem-1-aeroporto'
import { LICOES_TRANSPORTE } from './viagem-2-transporte'
import { LICOES_HOTEL } from './viagem-3-hotel'
import { LICOES_COMIDA } from './viagem-4-comida'
import { LICOES_COMPRAS } from './viagem-5-compras'
import { LICOES_BARGANHA } from './viagem-6-barganha'
import { LICOES_DIRECOES } from './viagem-7-direcoes'
import { LICOES_EMERGENCIAS } from './viagem-8-emergencias'

/**
 * Inglês de Viagem — oito módulos, na ordem em que a viagem acontece.
 *
 * Começa no avião e termina no que ninguém quer precisar: farmácia, polícia,
 * passaporte perdido. O módulo 6 é o que não existe em curso nenhum — pedir
 * desconto sem parecer grosseiro — e é por ele que alguém escolhe esta trilha.
 *
 * As lições de cada módulo vivem num arquivo próprio: são conteúdo escrito à
 * mão, e um arquivo de duas mil linhas seria impossível de revisar.
 */
export const MODULOS_VIAGEM: ModuloTrilha[] = [
  {
    id: 'viagem-1', numero: 1, emoji: '🛂',
    nome: 'Aeroporto e imigração',
    consegue: 'Você consegue responder à imigração sem travar, despachar a mala e achar o portão.',
    licoes: LICOES_AEROPORTO,
  },
  {
    id: 'viagem-2', numero: 2, emoji: '🚕',
    nome: 'Transporte',
    consegue: 'Você consegue pegar táxi, Uber, ônibus e trem, e perguntar quanto custa e quanto tempo leva.',
    licoes: LICOES_TRANSPORTE,
  },
  {
    id: 'viagem-3', numero: 3, emoji: '🏨',
    nome: 'Hotel e hospedagem',
    consegue: 'Você consegue fazer o check-in, reclamar de um problema no quarto e pedir o que precisa na recepção.',
    licoes: LICOES_HOTEL,
  },
  {
    id: 'viagem-4', numero: 4, emoji: '🍽️',
    nome: 'Comida e restaurante',
    consegue: 'Você consegue pedir comida, perguntar o que vem no prato, avisar de uma alergia e dividir a conta.',
    licoes: LICOES_COMIDA,
  },
  {
    id: 'viagem-5', numero: 5, emoji: '🏷️',
    nome: 'Perguntar preço e comprar',
    consegue: 'Você consegue perguntar preço, tamanho e cor, pagar com cartão ou dinheiro e pedir a nota.',
    licoes: LICOES_COMPRAS,
  },
  {
    id: 'viagem-6', numero: 6, emoji: '🤝',
    nome: 'Barganha e negociação',
    consegue: 'Você consegue pedir desconto, justificar, fazer uma contraproposta e sair sem fechar — tudo com educação.',
    licoes: LICOES_BARGANHA,
  },
  {
    id: 'viagem-7', numero: 7, emoji: '🗺️',
    nome: 'Direções e passeios',
    consegue: 'Você consegue pedir e entender uma direção, comprar ingresso e perguntar horário.',
    licoes: LICOES_DIRECOES,
  },
  {
    id: 'viagem-8', numero: 8, emoji: '🚑',
    nome: 'Emergências',
    consegue: 'Você consegue explicar o que está sentindo na farmácia ou no médico, e pedir ajuda quando algo dá errado.',
    licoes: LICOES_EMERGENCIAS,
  },
]
