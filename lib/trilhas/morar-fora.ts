import { LICOES_ALUGUEL } from './morar-2-aluguel'
import { LICOES_ENTREVISTA } from './morar-4-entrevista'
import { LICOES_COZINHA } from './morar-5-cozinha'
import { LICOES_OBRA } from './morar-6-obra'
import type { ModuloTrilha } from './tipos'

/**
 * Inglês para Morar e Trabalhar Fora — dez módulos, na ordem em que a mudança
 * acontece.
 *
 * Os módulos 5, 6 e 7 são o motivo de esta trilha existir. Quase todo curso
 * ensina o inglês do escritório; quase nenhum ensina o inglês de quem chega e
 * começa na cozinha, na obra ou no delivery, que é por onde a maioria dos
 * brasileiros entra. Quem escreveu este curso lavou prato antes de virar chef
 * e depois trabalhar em engenharia, e esse é o inglês que faltou a ele.
 */
export const MODULOS_MORAR_FORA: ModuloTrilha[] = [
  {
    id: 'morar-1', numero: 1, emoji: '🧾',
    nome: 'Primeiros dias',
    consegue: 'Você consegue abrir conta no banco, comprar um chip e se registrar nos órgãos.',
    licoes: [],
  },
  {
    id: 'morar-2', numero: 2, emoji: '🔑',
    nome: 'Alugar casa',
    consegue: 'Você consegue ligar para um anúncio, perguntar o que importa na visita e negociar o aluguel.',
    licoes: LICOES_ALUGUEL,
  },
  {
    id: 'morar-3', numero: 3, emoji: '📄',
    nome: 'Procurando emprego',
    consegue: 'Você consegue ler um anúncio, escrever um CV curto e mandar o e-mail de candidatura.',
    licoes: [],
  },
  {
    id: 'morar-4', numero: 4, emoji: '💼',
    nome: 'Entrevista de emprego',
    consegue: 'Você consegue responder às perguntas que sempre caem, falar da sua experiência e negociar salário e horário.',
    licoes: LICOES_ENTREVISTA,
  },
  {
    id: 'morar-5', numero: 5, emoji: '👨‍🍳',
    nome: 'Inglês da cozinha',
    consegue: 'Você consegue trabalhar numa cozinha profissional: entender a comanda, o chef e o ritmo do serviço.',
    licoes: LICOES_COZINHA,
  },
  {
    id: 'morar-6', numero: 6, emoji: '🦺',
    nome: 'Inglês da obra',
    consegue: 'Você consegue entender a ordem do encarregado, nomear ferramenta e material e seguir a regra de segurança.',
    licoes: LICOES_OBRA,
  },
  {
    id: 'morar-7', numero: 7, emoji: '🛵',
    nome: 'Delivery e atendimento',
    consegue: 'Você consegue falar com o cliente, resolver um problema de entrega e atender no balcão.',
    licoes: [],
  },
  {
    id: 'morar-8', numero: 8, emoji: '🖥️',
    nome: 'Inglês do escritório',
    consegue: 'Você consegue escrever um e-mail, participar de uma reunião e puxar conversa com o colega.',
    licoes: [],
  },
  {
    id: 'morar-9', numero: 9, emoji: '🩺',
    nome: 'Médico, escola e burocracia',
    consegue: 'Você consegue marcar consulta, explicar o sintoma e falar com a escola do seu filho.',
    licoes: [],
  },
  {
    id: 'morar-10', numero: 10, emoji: '🍺',
    nome: 'Vida social',
    consegue: 'Você consegue conversar no pub, entender a gíria e sacar a piada local.',
    licoes: [],
  },
]
