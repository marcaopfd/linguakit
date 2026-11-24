/**
 * As simulações: uma conversa com uma pessoa que resiste.
 *
 * Sem IA, de propósito. Uma árvore escrita à mão não improvisa, mas também
 * não custa nada por aluno, funciona com o celular no modo avião e nunca
 * responde uma bobagem às três da manhã. O vendedor tem um preço mínimo que
 * ele não fura e reage à estratégia que o aluno usa — que é o que a conversa
 * precisa ter para ensinar barganha.
 *
 * O preço é a nota: no fim o aluno vê quanto pagou, qual era a meta, que
 * estratégias usou e como teria dito melhor cada frase fraca que escolheu.
 */

export type Opcao = {
  en: string
  pt: string
  /** Quanto esta jogada tira do preço. Zero quando não funciona. */
  corta: number
  /** O nome da estratégia, para a tela do fim. */
  estrategia?: string
  /** O que o vendedor responde. */
  resposta: string
  respostaPt: string
  /** Como teria soado melhor, quando a escolha foi fraca. */
  melhor?: string
  /** Fecha o negócio pelo preço que estiver na mesa. */
  fecha?: boolean
  /** O "walk away": sair andando. Ele chama de volta com o melhor preço. */
  saiEmbora?: boolean
}

export type Turno = {
  /** O que o vendedor diz antes de o aluno escolher. */
  fala: string
  falaPt: string
  opcoes: Opcao[]
}

export type Simulacao = {
  id: string
  personagem: string
  papel: string
  /** O que o aluno tem de conseguir, em português. */
  missao: string
  precoInicial: number
  /** Abaixo disto ele não vende, aconteça o que acontecer. */
  precoMinimo: number
  meta: number
  moeda: string
  turnos: Turno[]
}

export const SIMULACOES: Simulacao[] = [
  {
    id: 'mercado-bolsa',
    personagem: 'Somchai',
    papel: 'vendedor de bolsas no mercado de Chatuchak, em Bangkok',
    missao: 'Compre a bolsa por no máximo 550 baht. Ele começa pedindo 800.',
    precoInicial: 800,
    precoMinimo: 480,
    meta: 550,
    moeda: 'baht',
    turnos: [
      {
        fala: 'Hello my friend! Very good quality, real leather. For you, 800 baht.',
        falaPt: 'Olá, meu amigo! Qualidade muito boa, couro de verdade. Para você, 800 baht.',
        opcoes: [
          {
            en: "Oh, that's a bit more than I expected.",
            pt: 'Puxa, é um pouco mais do que eu esperava.',
            corta: 60, estrategia: 'Mostrar surpresa sem ofender',
            resposta: 'Ah, okay okay. How much you want to pay? Maybe I do 740 for you.',
            respostaPt: 'Ah, tá bom. Quanto você quer pagar? Talvez eu faça 740 para você.',
          },
          {
            en: "It's very expensive!",
            pt: 'É muito caro!',
            corta: 0,
            resposta: 'Expensive? No, no. Best price in market. Real leather, my friend.',
            respostaPt: 'Caro? Não, não. Melhor preço do mercado. Couro de verdade, meu amigo.',
            melhor: "Oh, that's a bit more than I expected.",
          },
          {
            en: 'I want discount.',
            pt: 'Eu quero desconto.',
            corta: 0,
            resposta: 'Everybody want discount! 800 is already special price.',
            respostaPt: 'Todo mundo quer desconto! 800 já é preço especial.',
            melhor: 'Could you do a better price?',
          },
        ],
      },
      {
        fala: 'So? What is your price?',
        falaPt: 'E então? Qual é o seu preço?',
        opcoes: [
          {
            en: 'Would you take 400?',
            pt: 'Você aceita 400?',
            corta: 130, estrategia: 'Ancorar baixo',
            resposta: 'Four hundred! You kill me. Look — 610, very last.',
            respostaPt: 'Quatrocentos! Você me mata. Olha — 610, última mesmo.',
          },
          {
            en: 'I saw it for less at the other stall.',
            pt: 'Vi mais barato na outra banca.',
            corta: 110, estrategia: 'Comparar com outra banca',
            resposta: 'Other stall? Not same quality. But okay, for you 630.',
            respostaPt: 'Outra banca? Não é a mesma qualidade. Mas tá bom, para você 630.',
          },
          {
            en: 'I don\'t know. What do you think?',
            pt: 'Não sei. O que você acha?',
            corta: 10,
            resposta: 'I think 800 is very good price! Okay okay, 730.',
            respostaPt: 'Eu acho que 800 é um preço muito bom! Tá bom, 730.',
            melhor: 'Would you take 400?',
          },
        ],
      },
      {
        fala: 'This is my price. Good deal for you.',
        falaPt: 'Esse é o meu preço. Bom negócio para você.',
        opcoes: [
          {
            en: 'Cash price?',
            pt: 'Qual o preço à vista?',
            corta: 70, estrategia: 'Pagar em dinheiro',
            resposta: 'Cash? Ah, cash is better for me. Okay, I take off a little.',
            respostaPt: 'Dinheiro? Ah, dinheiro é melhor para mim. Tá, tiro um pouco.',
          },
          {
            en: 'If I take two, can you do a better price for both?',
            pt: 'Se eu levar duas, faz um preço melhor nas duas?',
            corta: 90, estrategia: 'Oferecer em pacote',
            resposta: 'Two bags? Okay, now we talk business. Better price for you.',
            respostaPt: 'Duas bolsas? Agora sim estamos negociando. Preço melhor para você.',
          },
          {
            en: 'Okay, I will pay that.',
            pt: 'Tá bom, eu pago.',
            corta: 0, fecha: true,
            resposta: 'Very good! Thank you my friend.',
            respostaPt: 'Muito bom! Obrigado, meu amigo.',
            melhor: 'Okay, meet me in the middle?',
          },
        ],
      },
      {
        fala: 'Okay. Final price. What you say?',
        falaPt: 'Tá bom. Preço final. O que você diz?',
        opcoes: [
          {
            en: 'Okay, meet me in the middle?',
            pt: 'Vamos no meio-termo?',
            corta: 55, estrategia: 'Dividir a diferença', fecha: true,
            resposta: 'You are tough! Okay — middle. Deal.',
            respostaPt: 'Você é duro na queda! Tá bom — no meio. Fechado.',
          },
          {
            en: "That's okay, thank you. Maybe later.",
            pt: 'Tudo bem, obrigado. Talvez mais tarde.',
            corta: 0, estrategia: 'Ir embora com educação', saiEmbora: true,
            resposta: 'Wait, wait! Come back! For you — my very best price.',
            respostaPt: 'Espera, espera! Volta aqui! Para você — meu melhor preço mesmo.',
          },
          {
            en: 'Deal!',
            pt: 'Fechado!',
            corta: 0, fecha: true,
            resposta: 'Deal! Good choice, my friend.',
            respostaPt: 'Fechado! Boa escolha, meu amigo.',
            melhor: 'Okay, meet me in the middle?',
          },
        ],
      },
    ],
  },
]

export function simulacaoPorId(id: string): Simulacao | undefined {
  return SIMULACOES.find(s => s.id === id)
}

/** O preço nunca passa do mínimo do vendedor, por mais bem que o aluno jogue. */
export function precoApos(sim: Simulacao, cortes: number[]): number {
  const bruto = cortes.reduce((p, c) => p - c, sim.precoInicial)
  return Math.max(sim.precoMinimo, bruto)
}

/** Quantas estrelas o aluno levou: a meta é duas, o mínimo do vendedor é três. */
export function estrelas(sim: Simulacao, preco: number): number {
  if (preco <= sim.precoMinimo + 20) return 3
  if (preco <= sim.meta) return 2
  return 1
}
