/**
 * O link do checkout, com o comprador dentro.
 *
 * A Kiwify aceita `email` e `name` na URL e já preenche os campos do
 * checkout. Isso não é conveniência: o aviso de compra volta identificado
 * pelo e-mail do comprador, e é por ele — e só por ele — que o webhook acha
 * o aluno. E-mail digitado diferente é dinheiro que entra sem liberar nada.
 *
 * A pessoa ainda pode trocar o campo na tela da Kiwify. Para esse dia existe
 * o "já paguei e não liberou", na Conta, e a lista de pagamentos sem dono no
 * painel do professor.
 */
export function linkDoCheckout(base: string, email: string, nome?: string | null): string {
  try {
    const url = new URL(base)
    url.searchParams.set('email', email)
    const limpo = nome?.trim()
    if (limpo) url.searchParams.set('name', limpo)
    return url.toString()
  } catch {
    // Link mal colado na variável de ambiente: melhor mandar como está do que
    // sumir com o botão de pagar.
    return base
  }
}
