import type { DrillItem } from '../drill'

/**
 * As trilhas: o curso de inglês organizado pelo motivo de quem estuda, e não
 * pelo capítulo de gramática.
 *
 * Quem procura este curso vai viajar ou vai morar fora. A pessoa não quer
 * "aprender o present perfect", quer conseguir passar pela imigração, alugar
 * um quarto e entender o encarregado na obra. A trilha é esse caminho, e cada
 * lição termina numa frase que começa com "Você consegue…".
 *
 * O Inglês Geral continua sendo os seis módulos A1–C2 que já existem: a trilha
 * não substitui o curso, ela é outra porta para o mesmo lugar. Por isso um
 * módulo de trilha e um módulo de nível são coisas separadas aqui, e o id de
 * um nunca colide com o do outro ("viagem-6" contra "a1").
 */

export type TrilhaId = 'viagem' | 'morar-fora' | 'geral' | 'online' | 'vender'

/**
 * A cor de cada trilha sai da paleta de níveis que o produto já usa. A
 * identidade visual nova ainda não foi decidida, e inventar cinco cores agora
 * seria criar uma segunda linguagem visual para apagar depois.
 */
export type Tom = 'a1' | 'a2' | 'b1' | 'b2' | 'c1' | 'c2'

export type Trilha = {
  id: TrilhaId
  nome: string
  /** Uma linha: o que a pessoa vai conseguir fazer. Aparece no cartão. */
  promessa: string
  emoji: string
  tom: Tom
  /** Quanto tempo leva, em palavras ("3 semanas, 15 min por dia"). */
  ritmo: string
  /**
   * Falso enquanto o conteúdo não existe. A trilha continua aparecendo na
   * home, marcada como "em breve", porque esconder o que vem depois é o que
   * faz a pessoa achar que acabou — mas ela não abre.
   */
  disponivel: boolean
  modulos: ModuloTrilha[]
}

export type ModuloTrilha = {
  /** Único no app inteiro: nunca "a1", sempre "viagem-6". */
  id: string
  numero: number
  nome: string
  /** A meta, escrita como o aluno a leria: "Você consegue pedir desconto…". */
  consegue: string
  emoji: string
  licoes: Licao[]
}

export type Licao = {
  id: string
  titulo: string
  consegue: string
  minutos: number
  blocos: Bloco[]
}

/**
 * A anatomia de uma lição, na ordem em que o aluno atravessa: a cena em
 * português, as frases, o vídeo, a prática, a conversa e o resumo.
 */
export type Bloco =
  | { tipo: 'situacao'; texto: string }
  | { tipo: 'frases'; frases: Frase[] }
  | { tipo: 'cena'; cena: Cena }
  | { tipo: 'pratica'; itens: DrillItem[] }
  | { tipo: 'simulacao'; simulacaoId: string }
  | { tipo: 'resumo' }

export type Frase = {
  /** O inglês, que é o que se aprende. */
  en: string
  /** A tradução natural — o que um brasileiro diria, não o decalque. */
  pt: string
  /** O erro que todo mundo comete aqui, quando há um. */
  armadilha?: string
}

/**
 * Um trecho de vídeo do YouTube, tocado pelo player oficial.
 *
 * Nada é baixado, cortado ou reenviado, e nada é transcrito: a letra de uma
 * música e a fala de um filme são de quem as escreveu. O que é nosso são as
 * perguntas e as expressões curtas em `expressoes` — uma expressão por vez,
 * que é o que a lei permite citar e o que o aluno precisa aprender.
 */
export type Cena = {
  /** Uma cena de filme ou série, ou um clipe de música. */
  tipo: 'clipe' | 'musica'
  videoId: string
  /** O canal oficial que publicou. Só entra vídeo do dono. */
  canal: string
  inicio: number
  fim: number
  titulo: string
  /** O que se treina aqui: "pedir desconto", "entender contração falada". */
  foco: string
  expressoes: { en: string; pt: string; nota?: string }[]
  perguntas: PerguntaCena[]
}

export type PerguntaCena = {
  /** A pergunta, em português. */
  pergunta: string
  opcoes: string[]
  resposta: number
  /** Por que essa é a certa, em uma linha. */
  porque?: string
}
