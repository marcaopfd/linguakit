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
  {
    id: 'taxi-sem-taximetro',
    personagem: 'Dimitris',
    papel: 'taxista na saída do aeroporto, sem taxímetro ligado',
    missao: 'Chegue ao centro pagando no máximo 25 euros. Ele começa pedindo 45.',
    precoInicial: 45,
    precoMinimo: 20,
    meta: 25,
    moeda: 'euros',
    turnos: [
      {
        fala: 'Taxi? City centre? Forty-five euro, very good price, we go now.',
        falaPt: 'Táxi? Centro? Quarenta e cinco euros, preço muito bom, vamos agora.',
        opcoes: [
          {
            en: 'Do you use the meter?',
            pt: 'Você liga o taxímetro?',
            corta: 12, estrategia: 'Pedir o taxímetro',
            resposta: 'Meter, meter... is broken today. Okay, for you thirty-three.',
            respostaPt: 'Taxímetro, taxímetro... está quebrado hoje. Tá bom, para você trinta e três.',
          },
          {
            en: "Okay, let's go.",
            pt: 'Tá bom, vamos.',
            corta: 0, fecha: true,
            resposta: 'Good! Get in, get in.',
            respostaPt: 'Ótimo! Entra, entra.',
            melhor: 'Do you use the meter?',
          },
          {
            en: 'That is too much money for me.',
            pt: 'Isso é dinheiro demais para mim.',
            corta: 3,
            resposta: 'Too much? Is airport price, my friend. Forty-two, final.',
            respostaPt: 'Demais? É preço de aeroporto, meu amigo. Quarenta e dois, final.',
            melhor: 'The app says it is about twenty.',
          },
        ],
      },
      {
        fala: 'So? We go or no?',
        falaPt: 'E então? Vamos ou não?',
        opcoes: [
          {
            en: 'The app says it is about twenty.',
            pt: 'O aplicativo diz que dá uns vinte.',
            corta: 10, estrategia: 'Comparar com o aplicativo',
            resposta: 'App, app! Always the app. Okay — twenty-four, because you know.',
            respostaPt: 'Aplicativo, aplicativo! Sempre o aplicativo. Tá bom — vinte e quatro, porque você sabe.',
          },
          {
            en: 'How much to the city centre?',
            pt: 'Quanto até o centro?',
            corta: 4,
            resposta: 'I tell you already! Okay okay, I make it a little less.',
            respostaPt: 'Eu já te disse! Tá bom, tá bom, faço um pouco menos.',
            melhor: 'The app says it is about twenty.',
          },
          {
            en: 'I will take the bus, thank you.',
            pt: 'Vou de ônibus, obrigado.',
            corta: 0, estrategia: 'Ir embora com educação', saiEmbora: true,
            resposta: 'Bus! No, no, wait — come back. My best price, okay?',
            respostaPt: 'Ônibus! Não, não, espera — volta aqui. Meu melhor preço, tá?',
          },
        ],
      },
      {
        fala: 'Fine. But is far, you know. Traffic now.',
        falaPt: 'Tudo bem. Mas é longe, sabe. Tem trânsito agora.',
        opcoes: [
          {
            en: 'Cash, and we agree on the price now.',
            pt: 'Dinheiro, e combinamos o preço agora.',
            corta: 6, estrategia: 'Combinar antes de entrar', fecha: true,
            resposta: 'Hah! You are not a tourist. Okay, agreed. Get in.',
            respostaPt: 'Hah! Você não é turista. Tá bom, combinado. Entra.',
          },
          {
            en: 'Okay, meet me in the middle?',
            pt: 'Vamos no meio-termo?',
            corta: 4, estrategia: 'Dividir a diferença', fecha: true,
            resposta: 'Middle, middle. Okay, we go.',
            respostaPt: 'Meio, meio. Tá bom, vamos.',
          },
          {
            en: 'Fine, whatever you say.',
            pt: 'Tanto faz, o que você disser.',
            corta: 0, fecha: true,
            resposta: 'Good man. Get in.',
            respostaPt: 'Isso aí. Entra.',
            melhor: 'Cash, and we agree on the price now.',
          },
        ],
      },
    ],
  },

  {
    id: 'hotel-upgrade',
    personagem: 'Niamh',
    papel: 'recepcionista de um hotel em Dublin, no check-in',
    missao: 'Pague no máximo 120 euros pela diária com vista. A tabela está 160.',
    precoInicial: 160,
    precoMinimo: 116,
    meta: 120,
    moeda: 'euros',
    turnos: [
      {
        fala: 'Welcome! I have you in a standard room. The room with the view is 160 a night.',
        falaPt: 'Bem-vindo! Tenho um quarto padrão para você. O quarto com vista sai 160 por noite.',
        opcoes: [
          {
            en: "We're staying four nights — is there a better rate for that?",
            pt: 'Vamos ficar quatro noites — tem um preço melhor para isso?',
            corta: 18, estrategia: 'Usar o tempo de estadia',
            resposta: 'Four nights? Let me see... I can do 142 a night for the four.',
            respostaPt: 'Quatro noites? Deixa eu ver... posso fazer 142 por noite nas quatro.',
          },
          {
            en: 'That is very expensive.',
            pt: 'Isso é muito caro.',
            corta: 0,
            resposta: "It's our standard rate, I'm afraid. It is high season.",
            respostaPt: 'É a nossa tarifa padrão, infelizmente. É alta temporada.',
            melhor: "We're staying four nights — is there a better rate for that?",
          },
          {
            en: 'Okay, the standard room is fine.',
            pt: 'Tudo bem, o quarto padrão serve.',
            corta: 0, fecha: true,
            resposta: 'Lovely, I will get your key.',
            respostaPt: 'Perfeito, vou pegar a sua chave.',
            melhor: "We're staying four nights — is there a better rate for that?",
          },
        ],
      },
      {
        fala: 'Would that work for you?',
        falaPt: 'Isso funciona para você?',
        opcoes: [
          {
            en: "I saw it online for less — is that rate still available?",
            pt: 'Vi mais barato no site — essa tarifa ainda vale?',
            corta: 16, estrategia: 'Comparar com o preço do site',
            resposta: 'Ah, the online rate. Let me match it for you — 126.',
            respostaPt: 'Ah, a tarifa do site. Deixa eu igualar para você — 126.',
          },
          {
            en: 'Is breakfast included at that price?',
            pt: 'O café está incluído nesse preço?',
            corta: 8, estrategia: 'Incluir o café da manhã',
            resposta: "It isn't, but I can add it at no charge if you book direct.",
            respostaPt: 'Não está, mas posso incluir sem custo se você reservar direto.',
          },
          {
            en: 'I want a discount.',
            pt: 'Eu quero desconto.',
            corta: 0,
            resposta: "I'm afraid 142 is the best I can do on that room.",
            respostaPt: 'Infelizmente 142 é o melhor que consigo nesse quarto.',
            melhor: "I saw it online for less — is that rate still available?",
          },
        ],
      },
      {
        fala: 'Shall I book you in at that?',
        falaPt: 'Posso fechar nesse valor?',
        opcoes: [
          {
            en: 'If you can do 120, I will book the four nights right now.',
            pt: 'Se fizer 120, fecho as quatro noites agora.',
            corta: 10, estrategia: 'Fechar na hora em troca do preço', fecha: true,
            resposta: 'Four nights, booked direct... go on then, 120. Welcome to Dublin.',
            respostaPt: 'Quatro noites, reserva direta... tá bom, 120. Bem-vindo a Dublin.',
          },
          {
            en: "That's okay, thank you. I will look elsewhere.",
            pt: 'Tudo bem, obrigado. Vou procurar em outro lugar.',
            corta: 0, estrategia: 'Ir embora com educação', saiEmbora: true,
            resposta: 'Hold on — let me speak to my manager. I can do better than that.',
            respostaPt: 'Espera — deixa eu falar com o meu gerente. Consigo fazer melhor.',
          },
          {
            en: 'Yes, that is fine.',
            pt: 'Sim, está bom.',
            corta: 0, fecha: true,
            resposta: 'Wonderful. Room 402, with the view.',
            respostaPt: 'Maravilha. Quarto 402, com a vista.',
            melhor: 'If you can do 120, I will book the four nights right now.',
          },
        ],
      },
    ],
  },

  {
    id: 'restaurante-prato-errado',
    personagem: 'Tom',
    papel: 'garçom de um restaurante em Londres',
    missao: 'Você avisou da alergia e veio o prato errado. Resolva — e a conta de 46 libras não pode passar de 34.',
    precoInicial: 46,
    precoMinimo: 30,
    meta: 34,
    moeda: 'libras',
    turnos: [
      {
        fala: 'Here you go — the chicken with peanut sauce. Enjoy!',
        falaPt: 'Aqui está — o frango com molho de amendoim. Bom apetite!',
        opcoes: [
          {
            en: "Sorry, I think there's been a mix-up — I'm allergic to peanuts.",
            pt: 'Desculpe, acho que houve uma confusão — sou alérgico a amendoim.',
            corta: 6, estrategia: 'Avisar com calma e ser claro sobre a alergia',
            resposta: "Oh goodness, I am so sorry. I'll take that straight back to the kitchen.",
            respostaPt: 'Nossa, me desculpe mesmo. Vou levar isso direto de volta para a cozinha.',
          },
          {
            en: 'This is wrong! I told you about the allergy!',
            pt: 'Isto está errado! Eu avisei da alergia!',
            corta: 0,
            resposta: "I... right. I'll see what I can do.",
            respostaPt: 'Eu... certo. Vou ver o que posso fazer.',
            melhor: "Sorry, I think there's been a mix-up — I'm allergic to peanuts.",
          },
          {
            en: 'Thank you.',
            pt: 'Obrigado.',
            corta: 0,
            resposta: 'Lovely. Let me know if you need anything.',
            respostaPt: 'Ótimo. É só chamar se precisar de algo.',
            melhor: "Sorry, I think there's been a mix-up — I'm allergic to peanuts.",
          },
        ],
      },
      {
        fala: 'The kitchen says they can do you something else. What would you like?',
        falaPt: 'A cozinha disse que pode fazer outra coisa. O que você gostaria?',
        opcoes: [
          {
            en: 'Could you check with the kitchen that it has no nuts at all?',
            pt: 'Pode confirmar com a cozinha que não tem castanha nenhuma?',
            corta: 5, estrategia: 'Pedir confirmação na cozinha',
            resposta: "Absolutely — I'll check it myself with the chef.",
            respostaPt: 'Com certeza — vou conferir eu mesmo com o chef.',
          },
          {
            en: 'Anything is fine.',
            pt: 'Qualquer coisa serve.',
            corta: 0,
            resposta: "I'll bring the fish, then.",
            respostaPt: 'Então trago o peixe.',
            melhor: 'Could you check with the kitchen that it has no nuts at all?',
          },
          {
            en: 'How long will it take? We have a show at eight.',
            pt: 'Quanto tempo leva? Temos um espetáculo às oito.',
            corta: 4, estrategia: 'Dizer que o tempo é curto',
            resposta: "I'll have them put it first. Ten minutes, I promise.",
            respostaPt: 'Vou pedir para fazerem na frente. Dez minutos, prometo.',
          },
        ],
      },
      {
        fala: 'Again, I am sorry about that. Here is your bill — forty-six pounds.',
        falaPt: 'De novo, desculpe por isso. Aqui está a sua conta — quarenta e seis libras.',
        opcoes: [
          {
            en: 'Sorry, I think there may be a mistake — the first dish is still on here.',
            pt: 'Desculpe, acho que tem um engano — o primeiro prato ainda está aqui.',
            corta: 12, estrategia: 'Conferir a conta antes de pagar', fecha: true,
            resposta: 'You are quite right. I will take that off, and the drinks are on us.',
            respostaPt: 'Você tem toda razão. Vou tirar isso, e as bebidas ficam por nossa conta.',
          },
          {
            en: 'Is service included?',
            pt: 'A taxa de serviço está incluída?',
            corta: 5, estrategia: 'Perguntar pela taxa de serviço', fecha: true,
            resposta: 'It is, yes — and given what happened, I have taken it off.',
            respostaPt: 'Está, sim — e pelo que aconteceu, eu já tirei.',
          },
          {
            en: 'Okay, here you are.',
            pt: 'Tá bom, aqui está.',
            corta: 0, fecha: true,
            resposta: 'Thank you very much. Have a good evening.',
            respostaPt: 'Muito obrigado. Tenha uma boa noite.',
            melhor: 'Sorry, I think there may be a mistake — the first dish is still on here.',
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

/**
 * Quantas estrelas o aluno levou: bater a meta vale duas, chegar ao fundo do
 * vendedor vale três.
 *
 * A folga para a terceira estrela é proporcional ao tamanho da negociação, e
 * não um valor fixo. Com os vinte fixos de antes, quem jogasse MAL numa
 * conversa de dezesseis libras de diferença levava três estrelas — a folga
 * era maior que a negociação inteira.
 */
export function estrelas(sim: Simulacao, preco: number): number {
  const folga = (sim.precoInicial - sim.precoMinimo) * 0.1
  if (preco <= sim.precoMinimo + folga) return 3
  if (preco <= sim.meta) return 2
  return 1
}
