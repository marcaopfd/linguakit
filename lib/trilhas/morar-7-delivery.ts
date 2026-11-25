import type { Licao } from './tipos'

/**
 * Módulo 7 — Delivery e atendimento.
 *
 * Entregar comida e atender no balcão são as duas primeiras portas de entrada
 * para quem chega, e as duas vivem de frases curtas repetidas o dia inteiro.
 * O difícil não é falar: é entender o cliente irritado ao telefone.
 */
export const LICOES_DELIVERY: Licao[] = [
  {
    id: 'morar-7-1',
    titulo: 'Na entrega',
    consegue: 'Você consegue achar o endereço, entregar o pedido e resolver quando o cliente não aparece.',
    minutos: 12,
    blocos: [
      {
        tipo: 'situacao',
        texto: 'Prédio sem número visível, campainha quebrada, e o cliente não atende o telefone. Isso acontece todo dia, e existe uma sequência de frases que resolve sem reclamação e sem perder a corrida.',
      },
      {
        tipo: 'frases',
        frases: [
          { en: "Hi, I have a delivery for you.", pt: 'Oi, tenho uma entrega para você.' },
          { en: "I'm outside — which buzzer is yours?", pt: 'Estou lá fora — qual é a sua campainha?', armadilha: '"Buzzer" é o interfone. "Bell" é a campainha da porta; nos prédios, pergunte pelo buzzer.' },
          { en: 'Sorry, I can\'t find the entrance.', pt: 'Desculpe, não estou achando a entrada.' },
          { en: 'Could you come down, please?', pt: 'Pode descer, por favor?' },
          { en: 'Should I leave it at the door?', pt: 'Deixo na porta?' },
          { en: 'The restaurant forgot the drink — I\'m sorry about that.', pt: 'O restaurante esqueceu a bebida — me desculpe por isso.', armadilha: 'Assuma o problema sem assumir a culpa: diz o que aconteceu e já pede desculpa. É o que evita a avaliação de uma estrela.' },
          { en: 'Have a good evening!', pt: 'Boa noite para você!' },
        ],
      },
      {
        tipo: 'pratica',
        itens: [
          {
            key: 'n71-1', type: 'Escolha a resposta',
            instruction: 'Você está na frente do prédio e não sabe qual apartamento.',
            question: '',
            options: ["I'm outside — which buzzer is yours?", 'Where is your house?', 'I am in the street, come.'],
            answerIndex: 0,
            expected: "I'm outside — which buzzer is yours?",
            why: 'Diz onde você está e faz a pergunta útil numa frase. As outras obrigam o cliente a adivinhar o que você precisa.',
            audio: { text: "I'm outside — which buzzer is yours?", afterAnswer: true },
            optionsSpeak: true,
            stage: 2,
          },
          {
            key: 'n71-2', type: 'Ouça e escolha',
            instruction: 'O cliente respondeu no telefone. O que ele disse?',
            question: "Just leave it at the door, thanks — I'm on a call.",
            audio: { text: "Just leave it at the door, thanks — I'm on a call.", isQuestion: true },
            options: ['Deixe na porta, ele está ao telefone', 'Ele vai descer agora', 'Ele não pediu nada', 'Ele quer que você ligue'],
            answerIndex: 0,
            expected: 'Deixe na porta, ele está ao telefone',
            stage: 1,
          },
          {
            key: 'n71-3', type: 'Qual é mais educado',
            instruction: 'O restaurante esqueceu a bebida. O que você diz na porta?',
            question: '',
            options: ['The restaurant forgot the drink — I\'m sorry about that.', 'Not my fault, the restaurant forgot.'],
            answerIndex: 0,
            expected: 'The restaurant forgot the drink — I\'m sorry about that.',
            why: 'As duas dizem que o erro não é seu. A primeira ainda cuida do cliente — e é a sua avaliação que está em jogo.',
            audio: { text: 'The restaurant forgot the drink — I\'m sorry about that.', afterAnswer: true },
            optionsSpeak: true,
            stage: 3,
          },
          {
            key: 'n71-4', type: 'Monte a frase',
            instruction: 'Peça para o cliente descer.',
            question: '',
            kind: 'order',
            tokens: ['please', 'down', 'come', 'you', 'could'],
            expected: 'Could you come down please',
            compare: 'loose',
            audio: { text: 'Could you come down, please?', afterAnswer: true },
            stage: 6,
          },
          {
            key: 'n71-5', type: 'Ouça e escreva',
            instruction: 'Ouça e escreva a primeira frase de toda entrega.',
            question: 'Hi, I have a delivery for you.',
            audio: { text: 'Hi, I have a delivery for you.', isQuestion: true },
            expected: 'Hi I have a delivery for you',
            compare: 'loose',
            stage: 7,
          },
        ],
      },
      { tipo: 'resumo' },
    ],
  },

  {
    id: 'morar-7-2',
    titulo: 'No balcão do café',
    consegue: 'Você consegue atender, anotar o pedido certo e lidar com reclamação sem se perder.',
    minutos: 12,
    blocos: [
      {
        tipo: 'situacao',
        texto: 'Fila de oito pessoas no balcão e cada uma pede o café de um jeito. As frases do atendente são sempre as mesmas seis — e a mais importante é a que repete o pedido em voz alta, porque é ela que evita o erro.',
      },
      {
        tipo: 'frases',
        frases: [
          { en: 'What can I get you?', pt: 'O que vai ser?', armadilha: 'É assim que se atende em café e bar. "What do you want?" soa quase agressivo.' },
          { en: 'To have in or take away?', pt: 'Para comer aqui ou para viagem?', armadilha: 'No Reino Unido e na Irlanda é "take away"; nos Estados Unidos, "to go". As duas se entendem.' },
          { en: 'So that\'s one flat white and a croissant — is that right?', pt: 'Então é um flat white e um croissant — é isso?', armadilha: 'Repetir o pedido é o que evita o erro, e é o que todo cliente espera ouvir.' },
          { en: 'Sorry about the wait.', pt: 'Desculpe a espera.' },
          { en: "I'll get that sorted for you right away.", pt: 'Vou resolver isso para você agora mesmo.' },
          { en: 'Would you like anything else?', pt: 'Mais alguma coisa?' },
          { en: 'Card or cash?', pt: 'Cartão ou dinheiro?' },
        ],
      },
      {
        tipo: 'pratica',
        itens: [
          {
            key: 'n72-1', type: 'Escolha a resposta',
            instruction: 'O cliente chegou ao balcão. Como você abre?',
            question: '',
            options: ['What can I get you?', 'What do you want?', 'Yes?'],
            answerIndex: 0,
            expected: 'What can I get you?',
            why: 'É a frase do atendimento em todo café de língua inglesa. As outras duas soam impacientes, mesmo ditas com sorriso.',
            audio: { text: 'What can I get you?', afterAnswer: true },
            optionsSpeak: true,
            stage: 2,
          },
          {
            key: 'n72-2', type: 'Ouça e escolha',
            instruction: 'O cliente pediu. O que ele quer?',
            question: 'Two flat whites to take away, please.',
            audio: { text: 'Two flat whites to take away, please.', isQuestion: true },
            options: ['Dois flat whites para viagem', 'Dois cafés para beber ali', 'Um café branco grande', 'Dois cafés com leite extra'],
            answerIndex: 0,
            expected: 'Dois flat whites para viagem',
            stage: 1,
          },
          {
            key: 'n72-3', type: 'Combine os pares',
            instruction: 'Ligue o momento à frase.',
            question: '',
            kind: 'pares',
            pares: [
              { a: 'Confirmar o pedido', b: "So that's one flat white — is that right?" },
              { a: 'A fila demorou', b: 'Sorry about the wait.' },
              { a: 'O cliente reclamou', b: "I'll get that sorted for you right away." },
              { a: 'Antes de fechar a conta', b: 'Would you like anything else?' },
            ],
            expected: 'pares',
            stage: 4,
          },
          {
            key: 'n72-4', type: 'Monte a frase',
            instruction: 'Pergunte se é para comer ali ou levar.',
            question: '',
            kind: 'order',
            tokens: ['away', 'take', 'or', 'in', 'have', 'to'],
            expected: 'To have in or take away',
            compare: 'loose',
            audio: { text: 'To have in or take away?', afterAnswer: true },
            stage: 6,
          },
          {
            key: 'n72-5', type: 'Ouça e escreva',
            instruction: 'Ouça e escreva a frase que acalma qualquer reclamação.',
            question: "I'll get that sorted for you right away.",
            audio: { text: "I'll get that sorted for you right away.", isQuestion: true },
            expected: 'Ill get that sorted for you right away',
            compare: 'loose',
            stage: 7,
          },
        ],
      },
      { tipo: 'resumo' },
    ],
  },
]
