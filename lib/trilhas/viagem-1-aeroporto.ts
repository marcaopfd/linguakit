import type { Licao } from './tipos'

/**
 * Módulo 1 — Aeroporto e imigração.
 *
 * A primeira conversa da viagem é também a mais intimidadora: um oficial de
 * imigração perguntando coisas em inglês, com fila atrás. São sempre as
 * mesmas cinco perguntas, e respondidas em três palavras cada. O medo é maior
 * que a conversa.
 */
export const LICOES_AEROPORTO: Licao[] = [
  {
    id: 'viagem-1-1',
    titulo: 'Passar pela imigração',
    consegue: 'Você consegue responder às perguntas da imigração sem travar, em três palavras cada.',
    minutos: 12,
    blocos: [
      {
        tipo: 'situacao',
        texto: 'Você desembarcou, pegou a fila e agora é a sua vez. O oficial puxa o seu passaporte e faz a primeira pergunta. Ele faz isso duzentas vezes por dia — não quer conversa, quer resposta curta.',
      },
      {
        tipo: 'frases',
        frases: [
          { en: "I'm here on holiday.", pt: 'Estou aqui a passeio.', armadilha: 'Nos Estados Unidos se diz "on vacation"; no Reino Unido e na Irlanda, "on holiday". As duas se entendem.' },
          { en: 'Two weeks.', pt: 'Duas semanas.', armadilha: 'Responda só isso. "I will stay here during two weeks" está errado e ainda chama atenção.' },
          { en: "I'm staying at a hotel in the city centre.", pt: 'Vou ficar num hotel no centro.' },
          { en: 'This is the address.', pt: 'Este é o endereço.' },
          { en: "I'm travelling alone.", pt: 'Estou viajando sozinho.' },
          { en: 'Here is my return ticket.', pt: 'Aqui está a minha passagem de volta.' },
          { en: "Sorry, could you repeat that?", pt: 'Desculpe, pode repetir?', armadilha: 'A frase mais útil da viagem inteira. Não diga "repeat please" seco — soa como ordem.' },
        ],
      },
      {
        tipo: 'pratica',
        itens: [
          {
            key: 'v11-1', type: 'Ouça e escolha',
            instruction: 'O oficial perguntou. O que ele quer saber?',
            question: "What's the purpose of your visit?",
            audio: { text: "What's the purpose of your visit?", isQuestion: true },
            options: ['Por que você veio', 'Onde você vai ficar', 'Quanto tempo você fica', 'Com quem você veio'],
            answerIndex: 0,
            expected: 'Por que você veio',
            why: '"Purpose of your visit" é a pergunta mais comum da imigração. A resposta é curta: holiday, business ou study.',
            stage: 1,
          },
          {
            key: 'v11-2', type: 'Escolha a resposta',
            instruction: '— How long are you staying?',
            question: 'How long are you staying?',
            options: ['Two weeks.', 'I stay during two weeks.', 'Two weeks of staying.'],
            answerIndex: 0,
            expected: 'Two weeks.',
            why: 'Em inglês a resposta curta basta e soa natural. As outras duas são tradução do português e deixam o oficial repetindo a pergunta.',
            audio: { text: 'Two weeks.', afterAnswer: true },
            optionsSpeak: true,
            stage: 2,
          },
          {
            key: 'v11-3', type: 'Monte a frase',
            instruction: 'Monte a frase que salva qualquer conversa.',
            question: '',
            kind: 'order',
            tokens: ['repeat', 'you', 'could', 'that', 'sorry'],
            expected: 'Sorry could you repeat that',
            compare: 'loose',
            audio: { text: 'Sorry, could you repeat that?', afterAnswer: true },
            stage: 6,
          },
          {
            key: 'v11-4', type: 'Combine os pares',
            instruction: 'Ligue a pergunta do oficial à resposta certa.',
            question: '',
            kind: 'pares',
            pares: [
              { a: 'Purpose of your visit?', b: "I'm here on holiday." },
              { a: 'How long are you staying?', b: 'Two weeks.' },
              { a: 'Where are you staying?', b: 'At a hotel in the city centre.' },
              { a: 'Are you travelling alone?', b: "Yes, I'm travelling alone." },
            ],
            expected: 'pares',
            stage: 4,
          },
          {
            key: 'v11-5', type: 'Ouça e escreva',
            instruction: 'Ouça e escreva. É a frase que você mais vai usar.',
            question: 'Sorry, could you repeat that?',
            audio: { text: 'Sorry, could you repeat that?', isQuestion: true },
            expected: 'Sorry could you repeat that',
            compare: 'loose',
            stage: 7,
          },
        ],
      },
      { tipo: 'resumo' },
    ],
  },

  {
    id: 'viagem-1-2',
    titulo: 'Bagagem, portão e atraso',
    consegue: 'Você consegue despachar a mala, achar o portão e entender quando avisam que o voo atrasou.',
    minutos: 12,
    blocos: [
      {
        tipo: 'situacao',
        texto: 'Passou da imigração. Agora é o balcão da companhia, a esteira, o portão — e o aviso no alto-falante que ninguém entende. As palavras são poucas e sempre as mesmas: gate, delayed, boarding, carousel.',
      },
      {
        tipo: 'frases',
        frases: [
          { en: 'I have one bag to check in.', pt: 'Tenho uma mala para despachar.', armadilha: '"Check in" é despachar a mala e também se apresentar. "Luggage" é a bagagem toda; "bag" é cada mala.' },
          { en: 'Is this carry-on allowed?', pt: 'Posso levar isto na cabine?' },
          { en: 'Which gate is it?', pt: 'Qual é o portão?' },
          { en: 'My flight is delayed.', pt: 'Meu voo atrasou.' },
          { en: 'Where is the baggage claim?', pt: 'Onde fica a esteira de bagagem?', armadilha: 'A placa diz "baggage claim" nos EUA e "baggage reclaim" no Reino Unido. A esteira em si é o "carousel".' },
          { en: "My suitcase didn't arrive.", pt: 'Minha mala não chegou.' },
          { en: 'Is there a connection to Dublin?', pt: 'Tem conexão para Dublin?' },
        ],
      },
      {
        tipo: 'pratica',
        itens: [
          {
            key: 'v12-1', type: 'Ouça e escolha',
            instruction: 'O alto-falante anunciou. O que aconteceu?',
            question: 'Flight EI 342 to Dublin is delayed by forty minutes.',
            audio: { text: 'Flight EI 342 to Dublin is delayed by forty minutes.', isQuestion: true },
            options: ['O voo atrasou quarenta minutos', 'O voo foi cancelado', 'O portão mudou', 'O embarque começou'],
            answerIndex: 0,
            expected: 'O voo atrasou quarenta minutos',
            why: '"Delayed" é atrasado. Se fosse cancelado seria "cancelled", e se o portão mudasse, "gate change".',
            stage: 1,
          },
          {
            key: 'v12-2', type: 'Complete o diálogo',
            instruction: 'Complete no balcão da companhia.',
            question: '— Good morning. Checking in?\n— Yes. ___',
            options: ['I have one bag to check in.', 'I have one bag to despatch.', 'I want to send one bag.'],
            answerIndex: 0,
            expected: 'I have one bag to check in.',
            audio: { text: 'I have one bag to check in.', afterAnswer: true },
            stage: 5,
          },
          {
            key: 'v12-3', type: 'Combine os pares',
            instruction: 'Ligue a placa do aeroporto ao que ela quer dizer.',
            question: '',
            kind: 'pares',
            pares: [
              { a: 'Esteira de bagagem', b: 'Baggage claim' },
              { a: 'Embarque', b: 'Boarding' },
              { a: 'Portão', b: 'Gate' },
              { a: 'Partidas', b: 'Departures' },
            ],
            expected: 'pares',
            stage: 4,
          },
          {
            key: 'v12-4', type: 'Monte a frase',
            instruction: 'A sua mala não apareceu. Monte a frase.',
            question: '',
            kind: 'order',
            tokens: ['arrive', 'suitcase', 'my', "didn't"],
            expected: "My suitcase didn't arrive",
            compare: 'loose',
            audio: { text: "My suitcase didn't arrive.", afterAnswer: true },
            stage: 6,
          },
          {
            key: 'v12-5', type: 'Ouça e escreva',
            instruction: 'Ouça e escreva a pergunta.',
            question: 'Which gate is it?',
            audio: { text: 'Which gate is it?', isQuestion: true },
            expected: 'Which gate is it',
            compare: 'loose',
            stage: 7,
          },
        ],
      },
      { tipo: 'resumo' },
    ],
  },
]
