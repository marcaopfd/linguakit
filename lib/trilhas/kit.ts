import type { Frase, Trilha } from './tipos'

/**
 * O Kit de bolso: as frases da trilha que valem estar no celular sem internet.
 *
 * Não são todas. Uma lista de cento e trinta frases não se consulta no balcão
 * da imigração com fila atrás — e o kit existe exatamente para esse momento.
 * A ordem de prioridade é essa:
 *
 *   1. As frases com armadilha, porque são as que a pessoa erra sob pressão
 *      ("I want discount", "I was stolen", "I am with pain").
 *   2. A primeira frase de cada lição, que é a que abre a conversa.
 *   3. O resto, até dar cinquenta.
 *
 * Fica na ordem da viagem — aeroporto primeiro, polícia por último — porque é
 * assim que a pessoa vai precisar delas.
 */

export type GrupoDoKit = {
  modulo: string
  emoji: string
  frases: Frase[]
}

export const TAMANHO_DO_KIT = 50

export function frasesDoKit(trilha: Trilha, limite = TAMANHO_DO_KIT): GrupoDoKit[] {
  const escolhidas = new Set<string>()
  const candidatas: { moduloId: string; frase: Frase; prioridade: number }[] = []

  for (const modulo of trilha.modulos) {
    for (const licao of modulo.licoes) {
      for (const bloco of licao.blocos) {
        if (bloco.tipo !== 'frases') continue
        bloco.frases.forEach((frase, i) => {
          candidatas.push({
            moduloId: modulo.id,
            frase,
            prioridade: frase.armadilha ? 0 : i === 0 ? 1 : 2,
          })
        })
      }
    }
  }

  // Estável: dentro da mesma prioridade, a ordem da viagem é mantida.
  const ordenadas = candidatas
    .map((c, i) => ({ ...c, i }))
    .sort((a, b) => a.prioridade - b.prioridade || a.i - b.i)
    .slice(0, limite)

  const porModulo = new Map<string, Frase[]>()
  for (const { moduloId, frase } of ordenadas) {
    const chave = frase.en.toLowerCase()
    if (escolhidas.has(chave)) continue
    escolhidas.add(chave)
    porModulo.set(moduloId, [...(porModulo.get(moduloId) ?? []), frase])
  }

  // De volta à ordem dos módulos, que é a ordem da viagem.
  return trilha.modulos
    .filter(m => porModulo.has(m.id))
    .map(m => ({ modulo: m.nome, emoji: m.emoji, frases: porModulo.get(m.id)! }))
}

/** Quantas frases o kit traz de verdade, depois de tirar as repetidas. */
export function tamanhoDoKit(trilha: Trilha): number {
  return frasesDoKit(trilha).reduce((n, g) => n + g.frases.length, 0)
}
