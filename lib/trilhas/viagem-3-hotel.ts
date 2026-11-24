import type { Licao } from './tipos'

/**
 * Módulo 3 — Hotel e hospedagem.
 *
 * Reclamar em inglês é onde o brasileiro mais se enrola: ou engole o problema,
 * ou reclama com uma frase que soa agressiva. O caminho do meio existe e cabe
 * numa fórmula — desculpa, problema, pedido.
 */
export const LICOES_HOTEL: Licao[] = [
  {
    id: 'viagem-3-1',
    titulo: 'Check-in e o que perguntar',
    consegue: 'Você consegue fazer o check-in, guardar a mala antes do horário e perguntar o que está incluído.',
    minutos: 12,
    blocos: [
      {
        tipo: 'situacao',
        texto: 'Você chegou às dez da manhã e o quarto só fica pronto às três. Isso é normal em qualquer hotel do mundo, e existe uma frase para resolver: eles guardam a sua mala de graça, se você souber pedir.',
      },
      {
        tipo: 'frases',
        frases: [
          { en: 'I have a reservation under Silva.', pt: 'Tenho uma reserva no nome Silva.', armadilha: '"Under" é a palavra: a reserva está "sob" um nome. "In the name of" também serve, mas ninguém diz.' },
          { en: 'Can I leave my luggage here until check-in?', pt: 'Posso deixar minha mala aqui até o check-in?' },
          { en: 'What time is check-out?', pt: 'Que horas é o check-out?' },
          { en: 'Is breakfast included?', pt: 'O café da manhã está incluído?' },
          { en: 'Is there Wi-Fi in the room?', pt: 'Tem wi-fi no quarto?' },
          { en: 'Could I have a late check-out?', pt: 'Consigo sair mais tarde?' },
          { en: 'Do you have a room with a view?', pt: 'Tem quarto com vista?' },
        ],
      },
      {
        tipo: 'pratica',
        itens: [
          {
            key: 'v31-1', type: 'Escolha a resposta',
            instruction: 'São dez da manhã e o quarto não está pronto. O que você pede?',
            question: '',
            options: ['Can I leave my luggage here until check-in?', 'I want to put my bags in some place.', 'Where I let my luggage?'],
            answerIndex: 0,
            expected: 'Can I leave my luggage here until check-in?',
            why: 'Guardar a mala é serviço padrão e sai de graça — basta pedir com a frase que a recepção reconhece.',
            audio: { text: 'Can I leave my luggage here until check-in?', afterAnswer: true },
            optionsSpeak: true,
            stage: 2,
          },
          {
            key: 'v31-2', type: 'Ouça e escolha',
            instruction: 'A recepção respondeu. O que foi dito?',
            question: 'Breakfast is served from seven to ten, on the ground floor.',
            audio: { text: 'Breakfast is served from seven to ten, on the ground floor.', isQuestion: true },
            options: ['Café das 7 às 10, no térreo', 'Café às 7, no primeiro andar', 'O café custa dez', 'O café acaba às sete'],
            answerIndex: 0,
            expected: 'Café das 7 às 10, no térreo',
            why: '"Ground floor" é o térreo no inglês britânico. O "first floor" lá é o nosso primeiro andar, não o térreo.',
            stage: 1,
          },
          {
            key: 'v31-3', type: 'Combine os pares',
            instruction: 'Ligue a pergunta ao que ela descobre.',
            question: '',
            kind: 'pares',
            pares: [
              { a: 'Que horas tenho de sair', b: 'What time is check-out?' },
              { a: 'Se o café está incluído', b: 'Is breakfast included?' },
              { a: 'Se posso sair mais tarde', b: 'Could I have a late check-out?' },
              { a: 'Se tem internet no quarto', b: 'Is there Wi-Fi in the room?' },
            ],
            expected: 'pares',
            stage: 4,
          },
          {
            key: 'v31-4', type: 'Monte a frase',
            instruction: 'Diga que você tem reserva.',
            question: '',
            kind: 'order',
            tokens: ['Silva', 'a', 'under', 'have', 'reservation', 'I'],
            expected: 'I have a reservation under Silva',
            compare: 'loose',
            audio: { text: 'I have a reservation under Silva.', afterAnswer: true },
            stage: 6,
          },
          {
            key: 'v31-5', type: 'Ouça e escreva',
            instruction: 'Ouça e escreva.',
            question: 'What time is check-out?',
            audio: { text: 'What time is check-out?', isQuestion: true },
            expected: 'What time is check out',
            compare: 'loose',
            stage: 7,
          },
        ],
      },
      { tipo: 'resumo' },
    ],
  },

  {
    id: 'viagem-3-2',
    titulo: 'Reclamar sem brigar',
    consegue: 'Você consegue reclamar de um problema no quarto e conseguir que resolvam — sem levantar a voz.',
    minutos: 14,
    blocos: [
      {
        tipo: 'situacao',
        texto: 'O ar-condicionado não liga, o chuveiro sai frio e o quarto ao lado fez festa até as três. Existe uma fórmula para reclamar em inglês que funciona em qualquer hotel: "sorry to bother you, but…" + o problema + o que você quer. Nessa ordem.',
      },
      {
        tipo: 'frases',
        frases: [
          { en: "Sorry to bother you, but the air conditioning isn't working.", pt: 'Desculpe incomodar, mas o ar-condicionado não está funcionando.', armadilha: 'O "sorry to bother you" não é frescura: é o que faz a recepção ouvir em vez de se defender.' },
          { en: 'There is no hot water.', pt: 'Não tem água quente.' },
          { en: 'The room next door is very noisy.', pt: 'O quarto ao lado está muito barulhento.' },
          { en: 'Could someone come and have a look?', pt: 'Alguém pode vir dar uma olhada?' },
          { en: 'Would it be possible to change rooms?', pt: 'Seria possível trocar de quarto?', armadilha: '"Would it be possible…" é o pedido mais forte que existe em inglês, justamente por ser o mais macio.' },
          { en: 'The room hasn\'t been cleaned.', pt: 'O quarto não foi limpo.' },
          { en: 'Thanks for sorting that out.', pt: 'Obrigado por resolver.' },
        ],
      },
      {
        tipo: 'pratica',
        itens: [
          {
            key: 'v32-1', type: 'Qual é mais educado',
            instruction: 'O ar não funciona. Qual frase faz a recepção agir?',
            question: '',
            options: ['The air conditioning is broken. Fix it.', "Sorry to bother you, but the air conditioning isn't working."],
            answerIndex: 1,
            expected: "Sorry to bother you, but the air conditioning isn't working.",
            why: 'As duas dizem o mesmo. A primeira põe a recepção na defensiva; a segunda põe os dois do mesmo lado do problema — e é a que resolve mais rápido.',
            audio: { text: "Sorry to bother you, but the air conditioning isn't working.", afterAnswer: true },
            optionsSpeak: true,
            stage: 3,
          },
          {
            key: 'v32-2', type: 'Escolha a resposta',
            instruction: 'Você quer outro quarto. Como pede?',
            question: '',
            options: ['Would it be possible to change rooms?', 'I want to change the room.', 'Give me another room.'],
            answerIndex: 0,
            expected: 'Would it be possible to change rooms?',
            why: 'Quanto mais indireto o pedido, mais fácil é dizer sim. "I want" é exigência e "give me" é ordem.',
            audio: { text: 'Would it be possible to change rooms?', afterAnswer: true },
            optionsSpeak: true,
            stage: 2,
          },
          {
            key: 'v32-3', type: 'Combine os pares',
            instruction: 'Ligue o problema à frase.',
            question: '',
            kind: 'pares',
            pares: [
              { a: 'Chuveiro só sai frio', b: 'There is no hot water.' },
              { a: 'Vizinho fazendo barulho', b: 'The room next door is very noisy.' },
              { a: 'Ninguém arrumou o quarto', b: "The room hasn't been cleaned." },
              { a: 'Quero que alguém venha ver', b: 'Could someone come and have a look?' },
            ],
            expected: 'pares',
            stage: 4,
          },
          {
            key: 'v32-4', type: 'Monte a frase',
            instruction: 'Monte o agradecimento depois de resolvido.',
            question: '',
            kind: 'order',
            tokens: ['out', 'that', 'sorting', 'for', 'thanks'],
            expected: 'Thanks for sorting that out',
            compare: 'loose',
            audio: { text: 'Thanks for sorting that out.', afterAnswer: true },
            stage: 6,
          },
          {
            key: 'v32-5', type: 'Ouça e escreva',
            instruction: 'Ouça e escreva a reclamação mais curta do módulo.',
            question: 'There is no hot water.',
            audio: { text: 'There is no hot water.', isQuestion: true },
            expected: 'There is no hot water',
            compare: 'loose',
            stage: 7,
          },
        ],
      },
      { tipo: 'simulacao', simulacaoId: 'hotel-upgrade' },
      { tipo: 'resumo' },
    ],
  },
]
