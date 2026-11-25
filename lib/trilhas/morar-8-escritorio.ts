import type { Licao } from './tipos'

/**
 * Módulo 8 — Inglês do escritório.
 *
 * Aqui o problema não é vocabulário técnico: é tom. O mesmo pedido escrito de
 * dois jeitos vira "colega prestativo" ou "pessoa difícil", e brasileiro
 * costuma soar mais ríspido do que é porque traduz direto.
 */
export const LICOES_ESCRITORIO: Licao[] = [
  {
    id: 'morar-8-1',
    titulo: 'E-mail e mensagem de trabalho',
    consegue: 'Você consegue escrever um e-mail de trabalho que soa profissional, e não ríspido.',
    minutos: 13,
    blocos: [
      {
        tipo: 'situacao',
        texto: 'Você precisa de uma resposta que não vem há três dias. Em português você escreveria "preciso disso hoje". Escrito assim em inglês, soa como ordem — e a mesma cobrança, com três palavras diferentes, chega como colaboração.',
      },
      {
        tipo: 'frases',
        frases: [
          { en: 'Just following up on this.', pt: 'Só retomando este assunto.', armadilha: '"Following up" é a forma de cobrar sem cobrar. É a frase mais útil do e-mail de trabalho.' },
          { en: 'Would you be able to send it by Friday?', pt: 'Você conseguiria enviar até sexta?', armadilha: '"Would you be able to…" é um pedido; "I need it by Friday" é uma ordem. A diferença é a sua reputação no time.' },
          { en: 'Thanks for getting back to me.', pt: 'Obrigado pelo retorno.' },
          { en: 'Sorry for the delay in replying.', pt: 'Desculpe a demora em responder.' },
          { en: 'Let me know if that works for you.', pt: 'Me diz se funciona para você.' },
          { en: 'Just to confirm — we agreed on Tuesday, right?', pt: 'Só confirmando — ficou terça, certo?' },
          { en: 'Happy to help if you need a hand.', pt: 'Posso ajudar se precisar.' },
        ],
      },
      {
        tipo: 'pratica',
        itens: [
          {
            key: 'n81-1', type: 'Qual é mais educado',
            instruction: 'Você precisa do arquivo até sexta. Qual e-mail você manda?',
            question: '',
            options: ['I need this by Friday.', 'Would you be able to send it by Friday?'],
            answerIndex: 1,
            expected: 'Would you be able to send it by Friday?',
            why: 'As duas pedem a mesma coisa na mesma data. A primeira soa como ordem vinda de quem não é seu chefe — e é assim que se ganha fama de difícil sem perceber.',
            audio: { text: 'Would you be able to send it by Friday?', afterAnswer: true },
            optionsSpeak: true,
            stage: 3,
          },
          {
            key: 'n81-2', type: 'Escolha a resposta',
            instruction: 'Ninguém respondeu seu e-mail há três dias. Como você cobra?',
            question: '',
            options: ['Just following up on this.', 'You did not answer me.', 'I am still waiting.'],
            answerIndex: 0,
            expected: 'Just following up on this.',
            why: '"Following up" cobra sem acusar ninguém de nada — por isso é a frase mais repetida em caixa de entrada de trabalho.',
            audio: { text: 'Just following up on this.', afterAnswer: true },
            optionsSpeak: true,
            stage: 2,
          },
          {
            key: 'n81-3', type: 'Combine os pares',
            instruction: 'Ligue a situação à frase.',
            question: '',
            kind: 'pares',
            pares: [
              { a: 'Você demorou a responder', b: 'Sorry for the delay in replying.' },
              { a: 'A pessoa respondeu', b: 'Thanks for getting back to me.' },
              { a: 'Confirmar o combinado', b: 'Just to confirm — we agreed on Tuesday, right?' },
              { a: 'Oferecer ajuda', b: 'Happy to help if you need a hand.' },
            ],
            expected: 'pares',
            stage: 4,
          },
          {
            key: 'n81-4', type: 'Monte a frase',
            instruction: 'Monte o fecho que devolve a decisão ao outro.',
            question: '',
            kind: 'order',
            tokens: ['you', 'for', 'works', 'that', 'if', 'know', 'me', 'let'],
            expected: 'Let me know if that works for you',
            compare: 'loose',
            audio: { text: 'Let me know if that works for you.', afterAnswer: true },
            stage: 6,
          },
          {
            key: 'n81-5', type: 'Ouça e escreva',
            instruction: 'Ouça e escreva a cobrança educada.',
            question: 'Just following up on this.',
            audio: { text: 'Just following up on this.', isQuestion: true },
            expected: 'Just following up on this',
            compare: 'loose',
            stage: 7,
          },
        ],
      },
      { tipo: 'resumo' },
    ],
  },

  {
    id: 'morar-8-2',
    titulo: 'Reunião e conversa de corredor',
    consegue: 'Você consegue entrar numa reunião, pedir para repetir e puxar conversa com o colega.',
    minutos: 12,
    blocos: [
      {
        tipo: 'situacao',
        texto: 'Reunião com seis pessoas falando por cima umas das outras, e você precisa dizer uma coisa. Depois vem a parte que assusta mais brasileiro do que a reunião: os cinco minutos de conversa fiada na cozinha do escritório.',
      },
      {
        tipo: 'frases',
        frases: [
          { en: 'Can I just add something here?', pt: 'Posso acrescentar uma coisa?', armadilha: 'É assim que se entra numa reunião sem interromper feio. Esperar o silêncio perfeito é esperar para sempre.' },
          { en: 'Sorry, I missed that — could you say it again?', pt: 'Desculpe, não peguei — pode repetir?' },
          { en: 'Just to make sure I understood…', pt: 'Só para eu confirmar que entendi…', armadilha: 'Resume com as suas palavras depois dessa frase. É o jeito de confirmar sem admitir que se perdeu.' },
          { en: "I'll take care of that.", pt: 'Eu cuido disso.' },
          { en: 'How was your weekend?', pt: 'Como foi seu fim de semana?' },
          { en: 'Any plans for the weekend?', pt: 'Tem plano para o fim de semana?', armadilha: 'Conversa de corredor é ritual, não interrogatório: responda em uma frase e devolva a pergunta.' },
          { en: 'Mad weather today, isn\'t it?', pt: 'Tempo doido hoje, né?' },
        ],
      },
      {
        tipo: 'pratica',
        itens: [
          {
            key: 'n82-1', type: 'Escolha a resposta',
            instruction: 'Você quer falar na reunião. Como entra?',
            question: '',
            options: ['Can I just add something here?', 'I want to speak now.', 'Listen to me, please.'],
            answerIndex: 0,
            expected: 'Can I just add something here?',
            why: 'O "just" é o que suaviza: pede um espaço pequeno em vez de tomar a palavra. Funciona mesmo quando as pessoas estão falando por cima.',
            audio: { text: 'Can I just add something here?', afterAnswer: true },
            optionsSpeak: true,
            stage: 2,
          },
          {
            key: 'n82-2', type: 'Ouça e escolha',
            instruction: 'O colega puxou conversa. O que ele perguntou?',
            question: 'Any plans for the weekend?',
            audio: { text: 'Any plans for the weekend?', isQuestion: true },
            options: ['Se você tem plano para o fim de semana', 'Se você trabalha no fim de semana', 'Como foi seu fim de semana', 'Se você quer sair hoje'],
            answerIndex: 0,
            expected: 'Se você tem plano para o fim de semana',
            why: 'É conversa de ritual: responda curto e devolva a pergunta. Ninguém está pedindo a sua agenda.',
            stage: 1,
          },
          {
            key: 'n82-3', type: 'Monte a frase',
            instruction: 'Confirme que entendeu, sem admitir que se perdeu.',
            question: '',
            kind: 'order',
            tokens: ['understood', 'I', 'sure', 'make', 'to', 'just'],
            expected: 'Just to make sure I understood',
            compare: 'loose',
            audio: { text: 'Just to make sure I understood...', afterAnswer: true },
            stage: 6,
          },
          {
            key: 'n82-4', type: 'Combine os pares',
            instruction: 'Ligue o momento à frase.',
            question: '',
            kind: 'pares',
            pares: [
              { a: 'Não ouvi o que disseram', b: 'Sorry, I missed that — could you say it again?' },
              { a: 'Quero assumir a tarefa', b: "I'll take care of that." },
              { a: 'Segunda de manhã na cozinha', b: 'How was your weekend?' },
              { a: 'Quebrar o gelo no elevador', b: "Mad weather today, isn't it?" },
            ],
            expected: 'pares',
            stage: 4,
          },
          {
            key: 'n82-5', type: 'Ouça e escreva',
            instruction: 'Ouça e escreva.',
            question: "I'll take care of that.",
            audio: { text: "I'll take care of that.", isQuestion: true },
            expected: 'Ill take care of that',
            compare: 'loose',
            stage: 7,
          },
        ],
      },
      { tipo: 'resumo' },
    ],
  },
]
