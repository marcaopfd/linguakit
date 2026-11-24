import type { ModuleSummary } from '../curriculum-index'
import { MODULOS_MORAR_FORA } from './morar-fora'
import type { ModuloTrilha, Trilha, TrilhaId } from './tipos'
import { MODULOS_VIAGEM } from './viagem'

export * from './tipos'

/**
 * As trilhas do curso de inglês.
 *
 * Duas estão sendo escritas — Viagem e Morar Fora, que são o produto — e duas
 * ficam visíveis como "em breve". Mostrar o que vem depois é de propósito: a
 * pessoa entra por causa de uma viagem, e se a home não disser que há mais, a
 * viagem acaba e ela vai embora junto.
 *
 * O Inglês Geral não tem módulos aqui porque já tem: são os seis níveis do
 * curso, lidos do currículo. Ele é a espinha, e aparece sempre.
 */
export const TRILHAS: Trilha[] = [
  {
    id: 'viagem',
    nome: 'Inglês de Viagem',
    promessa: 'Se virar sozinho na viagem — do aeroporto à barganha no mercado.',
    emoji: '✈️',
    tom: 'a1',
    ritmo: '8 módulos · 3 semanas com 15 min por dia',
    disponivel: true,
    modulos: MODULOS_VIAGEM,
  },
  {
    id: 'morar-fora',
    nome: 'Morar e Trabalhar Fora',
    promessa: 'Chegar, alugar, arrumar trabalho e aguentar o primeiro mês.',
    emoji: '🧳',
    tom: 'b2',
    ritmo: '10 módulos · 6 semanas com 15 min por dia',
    disponivel: true,
    modulos: MODULOS_MORAR_FORA,
  },
  {
    id: 'geral',
    nome: 'Inglês Geral',
    promessa: 'O curso inteiro, do A1 ao C2, com cena e jogo em cada unidade.',
    emoji: '📚',
    tom: 'b1',
    ritmo: '6 módulos · 50 unidades',
    disponivel: true,
    modulos: [],
  },
  {
    id: 'online',
    nome: 'Trabalhar Online',
    promessa: 'Atender cliente de fora: e-mail, call, proposta e cobrança.',
    emoji: '💻',
    tom: 'a2',
    ritmo: '8 módulos',
    disponivel: false,
    modulos: [],
  },
  {
    id: 'vender',
    nome: 'Vender e Prospectar',
    promessa: 'Oferecer o seu serviço lá fora e responder às objeções.',
    emoji: '🤝',
    tom: 'c1',
    ritmo: '7 módulos',
    disponivel: false,
    modulos: [],
  },
]

export function trilhaPorId(id: string): Trilha | undefined {
  return TRILHAS.find(t => t.id === id)
}

/** A trilha que serve de base e nunca some da home. */
export const TRILHA_GERAL = TRILHAS.find(t => t.id === 'geral')!

/**
 * Os módulos de uma trilha. O Inglês Geral empresta os do currículo, para que
 * o mapa seja um só componente e não dois parecidos.
 */
export function modulosDa(trilha: Trilha, niveis: ModuleSummary[]): ModuloTrilha[] {
  if (trilha.id !== 'geral') return trilha.modulos

  return niveis.map((m, i) => ({
    id: m.id,
    numero: i + 1,
    nome: m.name,
    consegue: m.desc,
    emoji: m.emoji,
    licoes: [],
  }))
}

/** Para onde o cartão de um módulo leva. */
export function caminhoDoModulo(studentId: string, trilha: Trilha, modulo: ModuloTrilha): string | null {
  if (trilha.id === 'geral') return `/learn/${studentId}/module/${modulo.id}`
  // As trilhas novas ainda não têm lição escrita; o cartão não leva a lugar
  // nenhum até ter, em vez de abrir uma tela vazia.
  return modulo.licoes.length ? `/learn/${studentId}/trilha/${trilha.id}/${modulo.id}` : null
}

/** Quantos módulos da trilha o aluno já terminou. */
export function concluidosNa(
  trilha: Trilha,
  modulos: ModuloTrilha[],
  lessons: { moduleId: string; unitIndex: number }[],
  unidadesPorModulo: Map<string, number>,
): number {
  return modulos.filter(mod => {
    const total = unidadesPorModulo.get(mod.id) ?? mod.licoes.length
    if (!total) return false
    const feitas = new Set(lessons.filter(l => l.moduleId === mod.id).map(l => l.unitIndex))
    return feitas.size >= total
  }).length
}

export type { TrilhaId }
