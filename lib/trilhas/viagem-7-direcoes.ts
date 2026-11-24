import type { Licao } from './tipos'

/**
 * Módulo 7 — Direções e passeios.
 *
 * Pedir direção é fácil; o difícil é ENTENDER a resposta, que vem rápida e
 * cheia de palavras curtas. Por isso metade desta lição é ouvir, e a frase
 * mais importante do módulo é a que pede para repetir devagar.
 */
export const LICOES_DIRECOES: Licao[] = [
  {
    id: 'viagem-7-1',
    titulo: 'Pedir e entender uma direção',
    consegue: 'Você consegue pedir uma direção e, principalmente, entender a resposta.',
    minutos: 12,
    blocos: [
      {
        tipo: 'situacao',
        texto: 'Você está perdido e o mapa do celular morreu. Pedir a direção é a parte fácil — a resposta vem em dez palavras rápidas, e é aí que você precisa de uma frase na manga para fazer a pessoa repetir mais devagar.',
      },
      {
        tipo: 'frases',
        frases: [
          { en: 'Excuse me, how do I get to the station?', pt: 'Com licença, como chego na estação?', armadilha: '"Excuse me" abre a conversa com um desconhecido. Começar direto na pergunta soa rude em inglês.' },
          { en: 'Is it far from here?', pt: 'É longe daqui?' },
          { en: 'Could you say that again, more slowly?', pt: 'Pode repetir mais devagar?', armadilha: 'A frase mais útil deste módulo. Quase ninguém se incomoda de repetir — mas é preciso pedir.' },
          { en: 'Go straight on, then turn left.', pt: 'Siga reto e depois vire à esquerda.' },
          { en: "It's on your right, next to the bank.", pt: 'Fica à sua direita, do lado do banco.' },
          { en: 'About ten minutes on foot.', pt: 'Uns dez minutos a pé.', armadilha: '"On foot" é a pé. "Walking" também serve, mas "by foot" está errado.' },
          { en: 'Am I going the right way?', pt: 'Estou indo pelo caminho certo?' },
        ],
      },
      {
        tipo: 'pratica',
        itens: [
          {
            key: 'v71-1', type: 'Ouça e escolha',
            instruction: 'Você perguntou e ouviu isto. Para onde você vai?',
            question: 'Go straight on, then take the second left. It\'s opposite the church.',
            audio: { text: "Go straight on, then take the second left. It's opposite the church.", isQuestion: true },
            options: ['Reto, segunda à esquerda, em frente à igreja', 'Reto, segunda à direita, atrás da igreja', 'Vire na primeira, depois na igreja', 'Siga até a igreja e pare'],
            answerIndex: 0,
            expected: 'Reto, segunda à esquerda, em frente à igreja',
            why: '"Opposite" é em frente, do outro lado da rua — não é "ao lado", que seria "next to".',
            stage: 1,
          },
          {
            key: 'v71-2', type: 'Escolha a resposta',
            instruction: 'Você não entendeu nada do que a pessoa falou. O que diz?',
            question: '',
            options: ['Could you say that again, more slowly?', 'Speak slow.', 'I not understand, repeat.'],
            answerIndex: 0,
            expected: 'Could you say that again, more slowly?',
            why: 'A primeira é um pedido e a pessoa repete com prazer. As outras duas soam como ordem — e ainda estão erradas.',
            audio: { text: 'Could you say that again, more slowly?', afterAnswer: true },
            optionsSpeak: true,
            stage: 2,
          },
          {
            key: 'v71-3', type: 'Combine os pares',
            instruction: 'Ligue a instrução ao desenho dela.',
            question: '',
            kind: 'pares',
            pares: [
              { a: 'Siga reto', b: 'Go straight on.' },
              { a: 'Vire à esquerda', b: 'Turn left.' },
              { a: 'Em frente a', b: 'Opposite the church.' },
              { a: 'Do lado de', b: 'Next to the bank.' },
            ],
            expected: 'pares',
            stage: 4,
          },
          {
            key: 'v71-4', type: 'Monte a frase',
            instruction: 'Monte a pergunta, com o "com licença" na frente.',
            question: '',
            kind: 'order',
            tokens: ['station', 'the', 'to', 'get', 'I', 'do', 'how', 'me', 'excuse'],
            expected: 'Excuse me how do I get to the station',
            compare: 'loose',
            audio: { text: 'Excuse me, how do I get to the station?', afterAnswer: true },
            stage: 6,
          },
          {
            key: 'v71-5', type: 'Ouça e escreva',
            instruction: 'Ouça e escreva.',
            question: 'Is it far from here?',
            audio: { text: 'Is it far from here?', isQuestion: true },
            expected: 'Is it far from here',
            compare: 'loose',
            stage: 7,
          },
        ],
      },
      { tipo: 'resumo' },
    ],
  },

  {
    id: 'viagem-7-2',
    titulo: 'Ingresso, horário e fila',
    consegue: 'Você consegue comprar ingresso, perguntar horário e descobrir se precisa reservar.',
    minutos: 11,
    blocos: [
      {
        tipo: 'situacao',
        texto: 'Você chegou ao museu e tem duas filas, três tipos de ingresso e um cartaz dizendo "last entry 16:30". Vale perguntar antes de entrar na fila errada — e descobrir se dá para comprar pelo celular e pular tudo.',
      },
      {
        tipo: 'frases',
        frases: [
          { en: 'Two tickets, please.', pt: 'Dois ingressos, por favor.' },
          { en: 'What time do you open?', pt: 'Que horas abre?' },
          { en: 'What time is the last entry?', pt: 'Qual é o horário da última entrada?', armadilha: '"Last entry" é a hora em que param de deixar entrar — costuma ser bem antes de fechar.' },
          { en: 'Do I need to book in advance?', pt: 'Preciso reservar antes?', armadilha: 'No Reino Unido e na Irlanda se diz "book"; nos Estados Unidos, "make a reservation" ou "book" também.' },
          { en: 'Is there a student discount?', pt: 'Tem desconto para estudante?' },
          { en: 'How long is the tour?', pt: 'Quanto tempo dura a visita?' },
          { en: 'Is this the queue for tickets?', pt: 'Esta é a fila do ingresso?', armadilha: '"Queue" é fila no inglês britânico, e se diz "quiu". Nos Estados Unidos é "line".' },
        ],
      },
      {
        tipo: 'pratica',
        itens: [
          {
            key: 'v72-1', type: 'Ouça e escolha',
            instruction: 'Na bilheteria ouviram a sua pergunta e responderam:',
            question: 'Last entry is at half four, and the tour takes about an hour.',
            audio: { text: 'Last entry is at half four, and the tour takes about an hour.', isQuestion: true },
            options: ['Última entrada 16:30, visita de uma hora', 'Última entrada às 4, visita de meia hora', 'Abre às quatro e meia', 'Quatro visitas por hora'],
            answerIndex: 0,
            expected: 'Última entrada 16:30, visita de uma hora',
            why: '"Half four" no inglês britânico é quatro e meia — meia hora DEPOIS das quatro, ao contrário do alemão e do holandês.',
            stage: 1,
          },
          {
            key: 'v72-2', type: 'Escolha a resposta',
            instruction: 'Você quer saber se precisa comprar antes pela internet.',
            question: '',
            options: ['Do I need to book in advance?', 'I need to buy before?', 'Is necessary to mark before?'],
            answerIndex: 0,
            expected: 'Do I need to book in advance?',
            why: '"Book in advance" é a expressão pronta para reservar com antecedência. As outras duas são tradução direta e não existem.',
            audio: { text: 'Do I need to book in advance?', afterAnswer: true },
            optionsSpeak: true,
            stage: 2,
          },
          {
            key: 'v72-3', type: 'Combine os pares',
            instruction: 'Ligue cada pergunta ao que ela descobre.',
            question: '',
            kind: 'pares',
            pares: [
              { a: 'Hora de abrir', b: 'What time do you open?' },
              { a: 'Duração da visita', b: 'How long is the tour?' },
              { a: 'Desconto de estudante', b: 'Is there a student discount?' },
              { a: 'Se a fila é a certa', b: 'Is this the queue for tickets?' },
            ],
            expected: 'pares',
            stage: 4,
          },
          {
            key: 'v72-4', type: 'Monte a frase',
            instruction: 'Pergunte pela última entrada.',
            question: '',
            kind: 'order',
            tokens: ['entry', 'last', 'the', 'is', 'time', 'what'],
            expected: 'What time is the last entry',
            compare: 'loose',
            audio: { text: 'What time is the last entry?', afterAnswer: true },
            stage: 6,
          },
          {
            key: 'v72-5', type: 'Ouça e escreva',
            instruction: 'Ouça e escreva.',
            question: 'Is there a student discount?',
            audio: { text: 'Is there a student discount?', isQuestion: true },
            expected: 'Is there a student discount',
            compare: 'loose',
            stage: 7,
          },
        ],
      },
      { tipo: 'resumo' },
    ],
  },
]
