import type { Licao } from './tipos'

/**
 * Módulo 6 — Barganha e negociação.
 *
 * É por este módulo que alguém escolhe esta trilha. Nenhum curso de inglês
 * ensina a pedir desconto, porque nenhum curso de inglês foi escrito por
 * quem precisou. O inglês da barganha é curto e quase todo feito de educação:
 * a frase que funciona não é a mais firme, é a que deixa o vendedor com
 * vontade de continuar a conversa.
 *
 * As armadilhas são as de brasileiro, uma por uma. "I want discount" é a
 * tradução direta de "eu quero desconto" e soa como uma exigência; "it's very
 * expensive" fecha a porta; "can you cheaper?" não é frase. Todas as três
 * aparecem aqui como o que NÃO dizer, do lado do que dizer.
 */
export const LICOES_BARGANHA: Licao[] = [
  {
    id: 'viagem-6-1',
    titulo: 'Perguntar o preço e reagir',
    consegue: 'Você consegue perguntar quanto custa e reagir a um preço alto sem ofender ninguém.',
    minutos: 12,
    blocos: [
      {
        tipo: 'situacao',
        texto: 'Você está num mercado de rua. Viu uma bolsa que gostou e quer saber quanto custa — mas sabe que o primeiro preço nunca é o preço de verdade. O vendedor te olha e sorri.',
      },
      {
        tipo: 'frases',
        frases: [
          { en: 'How much is this one?', pt: 'Quanto custa esta aqui?', armadilha: 'Não diga "how much cost this". O verbo "to be" segura a pergunta sozinho: how much IS it.' },
          { en: "What's the price for two?", pt: 'Qual o preço por duas?' },
          { en: "Oh, that's a bit more than I expected.", pt: 'Puxa, é um pouco mais do que eu esperava.', armadilha: 'Melhor do que "it\'s very expensive". Dizer que está caro fecha a conversa; dizer que você esperava outro valor abre.' },
          { en: 'Hmm, let me think about it.', pt: 'Hmm, deixa eu pensar.' },
          { en: 'Is that your best price?', pt: 'Esse é o seu melhor preço?' },
          { en: 'Do you have anything cheaper?', pt: 'Você tem algo mais barato?', armadilha: 'Nunca "something more cheap". Em inglês o comparativo curto vira uma palavra só: cheap → cheaper.' },
          { en: "I'm just looking, thanks.", pt: 'Só estou olhando, obrigado.' },
        ],
      },
      {
        tipo: 'pratica',
        itens: [
          {
            key: 'v61-1', type: 'Escolha a resposta',
            instruction: 'O vendedor disse 800. Você achou caro. O que soa melhor?',
            question: '800 baht.',
            options: ["It's very expensive!", "Oh, that's a bit more than I expected.", 'I want discount.'],
            answerIndex: 1,
            expected: "Oh, that's a bit more than I expected.",
            why: 'Dizer que está caro soa como reclamação e fecha a conversa. Dizer que você esperava outro valor diz a mesma coisa e deixa o vendedor oferecer.',
            audio: { text: "Oh, that's a bit more than I expected.", afterAnswer: true },
            optionsSpeak: true,
            stage: 2,
          },
          {
            key: 'v61-2', type: 'Monte a frase',
            instruction: 'Monte a pergunta na ordem certa.',
            question: '',
            kind: 'order',
            tokens: ['best', 'is', 'price', 'that', 'your'],
            expected: 'Is that your best price',
            compare: 'loose',
            audio: { text: 'Is that your best price?', afterAnswer: true },
            stage: 6,
          },
          {
            key: 'v61-3', type: 'Ouça e escolha',
            instruction: 'Toque para ouvir e escolha o que significa.',
            question: 'Do you have anything cheaper?',
            audio: { text: 'Do you have anything cheaper?', isQuestion: true },
            options: ['Você tem algo mais barato?', 'Você aceita cartão?', 'Você tem outra cor?', 'Posso experimentar?'],
            answerIndex: 0,
            expected: 'Você tem algo mais barato?',
            stage: 1,
          },
          {
            key: 'v61-4', type: 'Qual é mais educado',
            instruction: 'As duas dizem a mesma coisa. Qual você diria para um vendedor?',
            question: '',
            options: ['Too expensive. Lower price.', 'Hmm, let me think about it.'],
            answerIndex: 1,
            expected: 'Hmm, let me think about it.',
            why: 'A primeira é uma ordem. A segunda diz exatamente o mesmo — você não vai pagar isso — e ainda deixa a porta aberta para ele baixar sozinho.',
            audio: { text: 'Hmm, let me think about it.', afterAnswer: true },
            optionsSpeak: true,
            stage: 3,
          },
          {
            key: 'v61-5', type: 'Ouça e escreva',
            instruction: 'Ouça e escreva o que você ouviu. Acento e pontuação não contam.',
            question: 'How much is this one?',
            audio: { text: 'How much is this one?', isQuestion: true },
            expected: 'How much is this one',
            compare: 'loose',
            stage: 7,
          },
        ],
      },
      { tipo: 'resumo' },
    ],
  },

  {
    id: 'viagem-6-2',
    titulo: 'Pedir desconto e justificar',
    consegue: 'Você consegue pedir desconto com um motivo na mão — e o motivo é o que faz o preço cair.',
    minutos: 14,
    blocos: [
      {
        tipo: 'situacao',
        texto: 'O vendedor disse 800 e não se mexeu. Pedir desconto sem motivo quase nunca funciona; com motivo, quase sempre. Você vai dar um motivo: viu mais barato na outra banca, vai levar duas, ou paga em dinheiro.',
      },
      {
        tipo: 'frases',
        frases: [
          { en: 'Could you do a better price?', pt: 'Consegue fazer um preço melhor?', armadilha: 'Esta é a frase do módulo. Não diga "I want discount" — em inglês isso soa como exigência, não como pedido.' },
          { en: 'I saw it for less at the other stall.', pt: 'Vi mais barato na outra banca.' },
          { en: "I'm on a budget.", pt: 'Estou com o dinheiro contado.' },
          { en: 'If I take two, can you do 900 for both?', pt: 'Se eu levar duas, faz 900 nas duas?' },
          { en: 'Cash price?', pt: 'Qual o preço à vista?', armadilha: 'Duas palavras e funciona no mundo inteiro. Dinheiro vivo vale desconto porque o vendedor não paga a taxa do cartão.' },
          { en: 'Would you take 400?', pt: 'Você aceita 400?', armadilha: 'Ancorar baixo: você diz um número bem abaixo e o encontro acaba no meio. Mas não diga um absurdo, ou ele para de levar você a sério.' },
          { en: "That's a bit out of my range.", pt: 'Isso está um pouco fora do que posso pagar.' },
        ],
      },
      {
        tipo: 'pratica',
        itens: [
          {
            key: 'v62-1', type: 'Escolha a resposta',
            instruction: 'Você quer desconto. Qual frase um vendedor responde com um número melhor?',
            question: '',
            options: ['I want discount.', 'Could you do a better price?', 'Give me cheaper.'],
            answerIndex: 1,
            expected: 'Could you do a better price?',
            why: '"I want" é exigência e "give me" é ordem. "Could you…" é um pedido, e pedido o vendedor pode atender sem perder a pose.',
            audio: { text: 'Could you do a better price?', afterAnswer: true },
            optionsSpeak: true,
            stage: 2,
          },
          {
            key: 'v62-2', type: 'Combine os pares',
            instruction: 'Ligue cada estratégia à frase que a põe em prática.',
            question: '',
            kind: 'pares',
            pares: [
              { a: 'Levar mais de um', b: 'If I take two, can you do 900 for both?' },
              { a: 'Pagar em dinheiro', b: 'Cash price?' },
              { a: 'Comparar com outra banca', b: 'I saw it for less at the other stall.' },
              { a: 'Ancorar baixo', b: 'Would you take 400?' },
            ],
            expected: 'pares',
            stage: 4,
          },
          {
            key: 'v62-3', type: 'Complete o diálogo',
            instruction: 'Complete com a frase que falta.',
            question: '— 800 baht, very good quality.\n— Hmm. ___ I saw it for less at the other stall.',
            options: ['Could you do a better price?', 'Where is the bathroom?', 'I am very angry.'],
            answerIndex: 0,
            expected: 'Could you do a better price?',
            audio: { text: 'Could you do a better price? I saw it for less at the other stall.', afterAnswer: true },
            stage: 5,
          },
          {
            key: 'v62-4', type: 'Monte a frase',
            instruction: 'Monte a oferta de pacote.',
            question: '',
            kind: 'order',
            tokens: ['two', 'take', 'I', 'if', 'can', '900', 'do', 'you'],
            expected: 'If I take two can you do 900',
            compare: 'loose',
            audio: { text: 'If I take two, can you do 900?', afterAnswer: true },
            stage: 6,
          },
          {
            key: 'v62-5', type: 'Ouça e escreva',
            instruction: 'Ouça e escreva. São duas palavras.',
            question: 'Cash price?',
            audio: { text: 'Cash price?', isQuestion: true },
            expected: 'Cash price',
            compare: 'loose',
            stage: 7,
          },
        ],
      },
      { tipo: 'resumo' },
    ],
  },

  {
    id: 'viagem-6-3',
    titulo: 'Fechar negócio — ou ir embora',
    consegue: 'Você consegue dividir a diferença, fechar o negócio e ir embora com educação quando o preço não desce.',
    minutos: 15,
    blocos: [
      {
        tipo: 'situacao',
        texto: 'Ele desceu para 650, você ofereceu 450. Agora é a parte que decide: ou vocês se encontram no meio, ou você vai embora. Ir embora não é desistir — é a jogada mais forte que existe numa barganha, e metade das vezes ele te chama de volta.',
      },
      {
        tipo: 'frases',
        frases: [
          { en: 'Okay, meet me in the middle — 500?', pt: 'Vamos no meio-termo: 500?', armadilha: '"Meet me in the middle" é a frase pronta para dividir a diferença. Traduzir "vamos no meio" ao pé da letra não existe em inglês.' },
          { en: "Let's say 500 and we have a deal.", pt: 'Fica 500 e está fechado.' },
          { en: "That's okay, thank you. Maybe later.", pt: 'Tudo bem, obrigado. Talvez mais tarde.', armadilha: 'Esta é a hora de ir embora. Diga sorrindo e comece a andar: é o teste final do preço dele.' },
          { en: 'Deal!', pt: 'Fechado!' },
          { en: "You've got a deal.", pt: 'Negócio fechado.' },
          { en: 'Can you throw in the small one?', pt: 'Você põe a pequena junto?', armadilha: '"Throw in" é incluir de brinde. Quando o preço não desce mais, peça um brinde — costuma vir.' },
          { en: 'Thanks anyway, have a good day.', pt: 'Obrigado assim mesmo, bom dia pra você.' },
        ],
      },
      {
        tipo: 'pratica',
        itens: [
          {
            key: 'v63-1', type: 'Escolha a resposta',
            instruction: 'Ele está em 650 e você em 450. Como você divide a diferença?',
            question: '',
            options: ['Okay, meet me in the middle — 500?', 'Okay, we go middle.', 'Half price, please.'],
            answerIndex: 0,
            expected: 'Okay, meet me in the middle — 500?',
            why: '"Meet me in the middle" é a frase que todo vendedor entende na hora. As outras duas são tradução ao pé da letra e não existem.',
            audio: { text: 'Okay, meet me in the middle — 500?', afterAnswer: true },
            optionsSpeak: true,
            stage: 2,
          },
          {
            key: 'v63-2', type: 'Qual é mais educado',
            instruction: 'Você decidiu não levar. Qual frase deixa a porta aberta?',
            question: '',
            options: ['No. Too expensive.', "That's okay, thank you. Maybe later."],
            answerIndex: 1,
            expected: "That's okay, thank you. Maybe later.",
            why: 'A segunda é o "walk away": você recusa, agradece e vai andando. É nela que o vendedor te chama de volta com um preço melhor — a primeira só encerra o assunto.',
            audio: { text: "That's okay, thank you. Maybe later.", afterAnswer: true },
            optionsSpeak: true,
            stage: 3,
          },
          {
            key: 'v63-3', type: 'Ouça e escolha',
            instruction: 'Toque para ouvir. O que ele está pedindo?',
            question: 'Can you throw in the small one?',
            audio: { text: 'Can you throw in the small one?', isQuestion: true },
            options: ['Que inclua a pequena de brinde', 'Que jogue a pequena fora', 'Que troque pela pequena', 'Que embrulhe a pequena'],
            answerIndex: 0,
            expected: 'Que inclua a pequena de brinde',
            why: '"Throw in" não tem nada a ver com jogar: é incluir algo junto, sem cobrar.',
            stage: 1,
          },
          {
            key: 'v63-4', type: 'Monte a frase',
            instruction: 'Monte o fechamento.',
            question: '',
            kind: 'order',
            tokens: ['deal', 'a', 'have', 'we', 'and', '500', 'say', "let's"],
            expected: "Let's say 500 and we have a deal",
            compare: 'loose',
            audio: { text: "Let's say 500 and we have a deal.", afterAnswer: true },
            stage: 6,
          },
          {
            key: 'v63-5', type: 'Combine os pares',
            instruction: 'Ligue o momento à frase.',
            question: '',
            kind: 'pares',
            pares: [
              { a: 'Dividir a diferença', b: 'Meet me in the middle.' },
              { a: 'Fechar', b: "You've got a deal." },
              { a: 'Ir embora', b: "That's okay, thank you. Maybe later." },
              { a: 'Pedir um brinde', b: 'Can you throw in the small one?' },
            ],
            expected: 'pares',
            stage: 4,
          },
        ],
      },
      { tipo: 'simulacao', simulacaoId: 'mercado-bolsa' },
      { tipo: 'resumo' },
    ],
  },
]
