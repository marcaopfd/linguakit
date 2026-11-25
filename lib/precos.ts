/**
 * O preço, num lugar só.
 *
 * Antes disto o valor estava escrito à mão na landing e na tela de planos, e
 * uma terceira vez — a que cobra de verdade — dentro da Kiwify. Trocar o
 * plano para R$ 24,90 e esquecer a landing não dá erro nenhum: o site segue
 * anunciando um preço que o checkout não cobra, a pessoa descobre no último
 * clique, e preço anunciado diferente do cobrado é publicidade enganosa
 * (CDC, art. 37). Ninguém relê a landing depois de mexer no painel da
 * Kiwify, então o código tem que impedir a divergência em vez de confiar na
 * memória.
 *
 * O que dá para garantir aqui: as telas leem daqui, e um teste proíbe
 * "R$" solto nelas. O que NÃO dá: conferir a Kiwify, que não publica o preço
 * do produto por API. Esse par continua sendo humano — está na lista do
 * README, no passo de configurar a Kiwify.
 *
 * Tudo em centavos, inteiro. Preço em float soma errado.
 */

export type IdDoPlano = 'annual' | 'monthly'

export type PlanoAVenda = {
  id: IdDoPlano
  titulo: string
  centavos: number
  /** O período, como se lê embaixo do número. */
  por: string
}

export const PRECOS: Record<IdDoPlano, PlanoAVenda> = {
  annual: { id: 'annual', titulo: 'Anual', centavos: 14900, por: 'por ano' },
  monthly: { id: 'monthly', titulo: 'Mensal', centavos: 1990, por: 'por mês' },
}

/**
 * "R$ 149" e "R$ 19,90".
 *
 * Formatado à mão, e não com Intl: o Intl devolve "R$ 149,00" com espaço
 * fino não separável, que quebra a comparação em teste e muda de uma versão
 * de ICU para outra. Centavos zerados somem, porque "R$ 149,00" numa landing
 * parece formulário de banco.
 */
export function emReais(centavos: number): string {
  const inteiro = Math.floor(centavos / 100)
  const resto = centavos % 100
  const milhar = inteiro.toLocaleString('pt-BR')
  return resto === 0 ? `R$ ${milhar}` : `R$ ${milhar},${String(resto).padStart(2, '0')}`
}

/** O anual dividido por doze, que é como a pessoa compara. */
export function mensalidadeDoAnual(): string {
  return emReais(Math.round(PRECOS.annual.centavos / 12))
}

/**
 * Quanto o anual economiza contra doze meses do mensal, em pontos inteiros.
 * Calculado, nunca digitado: mexer num dos dois preços mexe neste número.
 *
 * Arredonda para BAIXO de propósito. Com os preços de hoje a conta dá 37,6%,
 * e arredondar para 38% seria anunciar um desconto maior do que o que a
 * pessoa recebe. Em propaganda o arredondamento é sempre contra quem
 * anuncia.
 */
export function descontoDoAnual(): number {
  const doze = PRECOS.monthly.centavos * 12
  return Math.floor((1 - PRECOS.annual.centavos / doze) * 100)
}
