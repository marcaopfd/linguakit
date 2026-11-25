import { MUSICAS } from './musicas'
import { SIMULACOES } from './trilhas/simulacoes'
import { TRILHAS, type Trilha } from './trilhas'

/**
 * Os números do produto, contados do próprio conteúdo.
 *
 * A página de vendas lê daqui em vez de trazer "19 módulos" escrito à mão.
 * O motivo é simples: copy com número cravado apodrece. No dia em que uma
 * lição nova entrar, ou um módulo sair, a promessa da página mente sozinha —
 * e ninguém percebe, porque ninguém relê a landing.
 *
 * Contando do conteúdo, a página só pode prometer o que existe.
 */

export type NumerosDoProduto = {
  /** Trilhas com conteúdo escrito (as "em breve" não entram). */
  trilhas: number
  modulos: number
  licoes: number
  /** Frases en/pt escritas à mão, com a armadilha quando há uma. */
  frases: number
  /** Exercícios de prática dentro das lições de trilha. */
  exercicios: number
  /** Conversas com personagem, sem IA. */
  conversas: number
  musicas: number
}

function contarTrilha(trilha: Trilha) {
  let licoes = 0
  let frases = 0
  let exercicios = 0

  for (const modulo of trilha.modulos) {
    for (const licao of modulo.licoes) {
      licoes++
      for (const bloco of licao.blocos) {
        if (bloco.tipo === 'frases') frases += bloco.frases.length
        if (bloco.tipo === 'pratica') exercicios += bloco.itens.length
      }
    }
  }

  return { modulos: trilha.modulos.length, licoes, frases, exercicios }
}

export function numerosDoProduto(): NumerosDoProduto {
  // O Inglês Geral empresta os módulos do currículo A1–C2 e não tem lição
  // própria; contá-lo aqui misturaria duas coisas diferentes.
  const comConteudo = TRILHAS.filter(t => t.disponivel && t.id !== 'geral' && t.modulos.length > 0)

  const total = comConteudo.reduce(
    (soma, trilha) => {
      const t = contarTrilha(trilha)
      return {
        modulos: soma.modulos + t.modulos,
        licoes: soma.licoes + t.licoes,
        frases: soma.frases + t.frases,
        exercicios: soma.exercicios + t.exercicios,
      }
    },
    { modulos: 0, licoes: 0, frases: 0, exercicios: 0 },
  )

  return {
    trilhas: comConteudo.length,
    ...total,
    conversas: SIMULACOES.length,
    musicas: MUSICAS.length,
  }
}

/** Um número arredondado para baixo, para a página nunca prometer a mais. */
export function arredondaParaBaixo(n: number, passo = 10): number {
  return Math.floor(n / passo) * passo
}
