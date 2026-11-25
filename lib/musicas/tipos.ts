/**
 * A seção de Músicas: ouvir, tentar entender, traduzir, interpretar.
 *
 * O que uma aula de música aqui NÃO é: a letra impressa com a tradução ao
 * lado. A letra é de quem a escreveu, e copiá-la seria publicar a obra dela
 * no nosso site. O vídeo toca no player oficial do dono, nada é baixado, e
 * nada é transcrito.
 *
 * O que ela é: o aluno chega com o vocabulário do tema na mão, ouve o trecho
 * quantas vezes quiser (com o botão de 0,75× quando a fala for rápida),
 * responde duas perguntas de sentido e escreve o que entendeu. As perguntas
 * são sobre o assunto da música e sobre o inglês do tema — nunca "qual é a
 * terceira palavra do refrão", que seria exigir a letra que não mostramos.
 *
 * O trecho que importa é o que o aluno escreve no fim: a frase que ele
 * conseguiu pegar de ouvido é dele, e é a prova de que ouviu.
 */

export type Familia = 'pop' | 'classico' | 'rap-antigo' | 'rap-atual'

/** O que vem de `cenas.json`: o vídeo, o corte e a conferência. */
export type CenaBruta = {
  videoId: string
  canal: string
  titulo: string
  tipo: string
  trilha: string
  nivel: string
  foco: string
  /** `pesada` = palavrão ou tema adulto. O aluno é avisado antes do play. */
  linguagem: 'livre' | 'pesada'
  duracao: number
  inicio: number
  fim: number
  status: string
}

/** O que escrevemos à mão para cada música. */
export type ConteudoMusica = {
  /** O artista, separado do título, para a lista e para a busca. */
  artista: string
  /** Só o nome da música, sem o artista. */
  nome: string
  familia: Familia
  /** Do que a música fala, em português. Comentário nosso, não a letra. */
  tema: string
  /**
   * O vocabulário do tema: o inglês que serve para falar daquele assunto,
   * para a pessoa chegar no play com o ouvido preparado. Não é a letra
   * recortada — é o que a gente ensinaria sobre o tema de qualquer jeito.
   */
  vocabulario: { en: string; pt: string; nota?: string }[]
  perguntas: PerguntaMusica[]
  /** O que escrever depois de ouvir. Sem gabarito, de propósito. */
  tarefas: string[]
  /** Por que a música é pesada, quando é. Aparece antes do play. */
  aviso?: string
}

export type PerguntaMusica = {
  /** Sobre o sentido da música, ou sobre o inglês do tema. Em português. */
  pergunta: string
  opcoes: string[]
  resposta: number
  porque?: string
}

/** A música pronta: a cena conferida mais o conteúdo escrito. */
export type Musica = CenaBruta & ConteudoMusica
