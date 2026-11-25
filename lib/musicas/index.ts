import cenas from '../trilhas/cenas.json'
import { CONTEUDO } from './conteudo'
import type { CenaBruta, Familia, Musica } from './tipos'

export type { Familia, Musica, PerguntaMusica } from './tipos'

/**
 * As músicas prontas: a cena conferida (vídeo, canal, corte, nível) casada
 * com o conteúdo escrito à mão.
 *
 * `cenas.json` é a fonte única do vídeo e do corte, porque é o arquivo que o
 * `npm run check-scenes` confere contra o YouTube toda semana. O conteúdo
 * mora separado para que trocar um trecho de 0:55 para 1:10 não encoste no
 * texto da aula, e vice-versa.
 *
 * Uma música só entra na lista se tiver as duas metades. Música sem conteúdo
 * escrito seria uma tela vazia com um player no meio.
 */
const TODAS: Musica[] = (cenas as CenaBruta[])
  .filter(c => c.tipo === 'musica' && c.status === 'aprovada')
  .map(c => {
    const conteudo = CONTEUDO[c.videoId]
    return conteudo ? { ...c, ...conteudo } : null
  })
  .filter((m): m is Musica => m !== null)

export const MUSICAS = TODAS

/** A ordem em que as famílias aparecem na tela, com o nome que o aluno lê. */
export const FAMILIAS: { id: Familia; nome: string; sub: string }[] = [
  { id: 'pop', nome: 'Pop', sub: 'Letra simples e muito repetida. Comece por aqui.' },
  { id: 'classico', nome: 'Clássicos', sub: 'O que toca em qualquer bar do mundo há cinquenta anos.' },
  { id: 'rap-antigo', nome: 'Rap old school', sub: 'Anos 80 e 90: pronúncia marcada, mais fácil de acompanhar.' },
  { id: 'rap-atual', nome: 'Rap atual', sub: 'Rápido e cheio de gíria. O teste final do ouvido.' },
]

export function musicasDa(familia: Familia): Musica[] {
  return MUSICAS.filter(m => m.familia === familia)
}

export function musica(videoId: string): Musica | null {
  return MUSICAS.find(m => m.videoId === videoId) ?? null
}

/** Quantos segundos dura o trecho escolhido. Aparece no cartão. */
export function duracaoDoTrecho(m: Musica): number {
  return m.fim - m.inicio
}

/**
 * A primeira música de cada família abre de graça; o resto é do plano.
 *
 * Quatro músicas livres não são amostra de cortesia: são uma de cada tipo de
 * dificuldade, para a pessoa descobrir onde o ouvido dela está antes de
 * decidir pagar.
 */
export function musicaLivre(m: Musica): boolean {
  return musicasDa(m.familia)[0]?.videoId === m.videoId
}
