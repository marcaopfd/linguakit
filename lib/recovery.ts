import { randomInt } from 'crypto'
import { hashPassword, verifyPassword } from './student-auth'

/**
 * O código de recuperação: como voltar para dentro da conta sem e-mail.
 *
 * Enquanto não houver envio de e-mail, não existe link de "redefinir senha"
 * para mandar a ninguém. O código é a saída que não depende de servidor de
 * e-mail nenhum: ele aparece uma vez, quando a conta nasce, a pessoa guarda
 * onde quiser, e com ele troca a senha sozinha mais tarde.
 *
 * Três decisões que valem explicar:
 *
 * 1. É guardado como hash scrypt, igual à senha. Quem ler o banco não
 *    consegue entrar na conta de ninguém com o que viu.
 * 2. Ele é de um uso só. Usar o código gasta o código — e a mesma tela já
 *    devolve um novo, para a pessoa não sair de lá sem rede de proteção.
 * 3. O alfabeto não tem 0, O, 1, l nem I. Este código vai ser copiado à mão
 *    de um papel ou lido em voz alta, e essas cinco letras são onde isso dá
 *    errado.
 *
 * Quando houver domínio e envio de e-mail, o link por e-mail entra ao lado
 * disto, não no lugar: o código continua servindo para quem perdeu o acesso
 * à própria caixa de entrada.
 */

const ALFABETO = 'abcdefghijkmnpqrstuvwxyz23456789'
const GRUPOS = 4
const POR_GRUPO = 4

/**
 * Um código novo, em claro. Só existe nesta forma uma vez: o que vai para o
 * banco é o hash, e o que vai para a tela é este texto.
 *
 * 16 caracteres de um alfabeto de 32 são 80 bits. Com o hash scrypt e o
 * limite de tentativas da rota, adivinhar não é um caminho.
 */
export function gerarCodigo(): string {
  const grupo = () => Array.from({ length: POR_GRUPO }, () => ALFABETO[randomInt(ALFABETO.length)]).join('')
  return Array.from({ length: GRUPOS }, grupo).join('-')
}

/**
 * Aceita o código como a pessoa o digitar: com ou sem traço, em maiúscula,
 * com espaço colado do copiar e colar.
 *
 * Quem acabou de perder a senha não precisa de um segundo motivo para errar.
 */
export function normalizarCodigo(bruto: string): string {
  return bruto.toLowerCase().replace(/[^a-z0-9]/g, '')
}

/** O formato certo, para a tela mostrar e para o teste conferir. */
export function formatarCodigo(normalizado: string): string {
  const partes = normalizado.match(new RegExp(`.{1,${POR_GRUPO}}`, 'g')) ?? []
  return partes.join('-')
}

/** Tem a cara de um código, antes de gastar scrypt para conferir. */
export function pareceCodigo(bruto: string): boolean {
  const limpo = normalizarCodigo(bruto)
  if (limpo.length !== GRUPOS * POR_GRUPO) return false
  return [...limpo].every(c => ALFABETO.includes(c))
}

/** O que vai para o banco. */
export function hashDoCodigo(codigo: string): string {
  return hashPassword(normalizarCodigo(codigo))
}

/** Confere o que a pessoa digitou contra o hash guardado. */
export function codigoConfere(digitado: string, guardado: string | null): boolean {
  if (!guardado) return false
  return verifyPassword(normalizarCodigo(digitado), guardado)
}
