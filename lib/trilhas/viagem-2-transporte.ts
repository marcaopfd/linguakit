import type { Licao } from './tipos'

/**
 * Módulo 2 — Transporte.
 *
 * O táxi sem taxímetro é onde o turista brasileiro mais perde dinheiro, e a
 * defesa é uma pergunta só, feita antes de entrar: "how much to the city
 * centre?". Perguntada depois, já não é pergunta, é discussão.
 */
export const LICOES_TRANSPORTE: Licao[] = [
  {
    id: 'viagem-2-1',
    titulo: 'Táxi e aplicativo',
    consegue: 'Você consegue combinar o preço antes de entrar no táxi e dizer para onde vai.',
    minutos: 12,
    blocos: [
      {
        tipo: 'situacao',
        texto: 'Você sai do aeroporto e três motoristas chamam ao mesmo tempo. Nenhum deles liga o taxímetro. A pergunta que te protege é feita com a mala ainda na mão, antes de sentar no carro.',
      },
      {
        tipo: 'frases',
        frases: [
          { en: 'How much to the city centre?', pt: 'Quanto custa até o centro?', armadilha: 'Pergunte ANTES de entrar. Depois de sentar, o preço vira discussão e você já perdeu.' },
          { en: 'Do you use the meter?', pt: 'Você liga o taxímetro?' },
          { en: 'Can you take me to this address?', pt: 'Pode me levar até este endereço?' },
          { en: 'How long does it take?', pt: 'Quanto tempo leva?', armadilha: 'Em inglês quem "leva" tempo é a viagem, não você: "it takes", nunca "I take".' },
          { en: 'Could you stop here, please?', pt: 'Pode parar aqui, por favor?' },
          { en: 'Can I pay by card?', pt: 'Posso pagar com cartão?' },
          { en: 'Keep the change.', pt: 'Pode ficar com o troco.' },
        ],
      },
      {
        tipo: 'pratica',
        itens: [
          {
            key: 'v21-1', type: 'Escolha a resposta',
            instruction: 'Você está na calçada, com a mala. O que pergunta primeiro?',
            question: '',
            options: ['How much to the city centre?', 'Is it expensive to the centre?', 'The centre is how much money?'],
            answerIndex: 0,
            expected: 'How much to the city centre?',
            why: 'A pergunta direta pede um número e combina o preço na hora. As outras duas pedem opinião — e opinião não vira acordo.',
            audio: { text: 'How much to the city centre?', afterAnswer: true },
            optionsSpeak: true,
            stage: 2,
          },
          {
            key: 'v21-2', type: 'Qual é mais educado',
            instruction: 'Você quer descer antes do destino. Qual frase você diria?',
            question: '',
            options: ['Stop here.', 'Could you stop here, please?'],
            answerIndex: 1,
            expected: 'Could you stop here, please?',
            why: '"Stop here" é uma ordem — funciona, mas soa áspero. "Could you…, please?" custa duas palavras a mais e muda o tom da viagem inteira.',
            audio: { text: 'Could you stop here, please?', afterAnswer: true },
            optionsSpeak: true,
            stage: 3,
          },
          {
            key: 'v21-3', type: 'Ouça e escolha',
            instruction: 'O motorista respondeu. O que ele disse?',
            question: 'About twenty-five minutes, depending on traffic.',
            audio: { text: 'About twenty-five minutes, depending on traffic.', isQuestion: true },
            options: ['Uns 25 minutos, dependendo do trânsito', 'Custa 25, mais o trânsito', 'São 25 quilômetros', 'Chega às 25 para a hora'],
            answerIndex: 0,
            expected: 'Uns 25 minutos, dependendo do trânsito',
            stage: 1,
          },
          {
            key: 'v21-4', type: 'Monte a frase',
            instruction: 'Monte a pergunta sobre o tempo de viagem.',
            question: '',
            kind: 'order',
            tokens: ['take', 'does', 'long', 'how', 'it'],
            expected: 'How long does it take',
            compare: 'loose',
            audio: { text: 'How long does it take?', afterAnswer: true },
            stage: 6,
          },
          {
            key: 'v21-5', type: 'Ouça e escreva',
            instruction: 'Ouça e escreva a pergunta do pagamento.',
            question: 'Can I pay by card?',
            audio: { text: 'Can I pay by card?', isQuestion: true },
            expected: 'Can I pay by card',
            compare: 'loose',
            stage: 7,
          },
        ],
      },
      { tipo: 'simulacao', simulacaoId: 'taxi-sem-taximetro' },
      { tipo: 'resumo' },
    ],
  },

  {
    id: 'viagem-2-2',
    titulo: 'Ônibus, metrô e trem',
    consegue: 'Você consegue comprar a passagem certa, descobrir a plataforma e saber onde descer.',
    minutos: 12,
    blocos: [
      {
        tipo: 'situacao',
        texto: 'Transporte público é mais barato e quase sempre mais rápido — o problema é a máquina de bilhete em inglês e a dúvida de onde descer. São cinco frases que resolvem a cidade inteira.',
      },
      {
        tipo: 'frases',
        frases: [
          { en: 'A single to Camden, please.', pt: 'Uma passagem só de ida para Camden, por favor.', armadilha: '"Single" é só de ida e "return" é ida e volta — no Reino Unido e na Irlanda. Nos EUA é "one-way" e "round trip".' },
          { en: 'Does this bus go to the station?', pt: 'Este ônibus vai para a estação?' },
          { en: 'Which platform is it?', pt: 'Qual é a plataforma?' },
          { en: 'Where do I get off?', pt: 'Onde eu desço?', armadilha: '"Get off" é descer de ônibus, trem ou metrô. De carro e de táxi é "get out".' },
          { en: 'Could you tell me when to get off?', pt: 'Pode me avisar quando for a minha parada?' },
          { en: 'How often does it run?', pt: 'De quanto em quanto tempo passa?' },
          { en: 'Is this seat taken?', pt: 'Este lugar está ocupado?' },
        ],
      },
      {
        tipo: 'pratica',
        itens: [
          {
            key: 'v22-1', type: 'Escolha a resposta',
            instruction: 'Você vai e volta no mesmo dia, em Londres. O que pede na bilheteria?',
            question: '',
            options: ['A return to Camden, please.', 'A round ticket to Camden.', 'Two tickets of going and coming.'],
            answerIndex: 0,
            expected: 'A return to Camden, please.',
            why: 'No inglês britânico, ida e volta é "return". "Round trip" é americano e também se entende; as outras duas não existem.',
            audio: { text: 'A return to Camden, please.', afterAnswer: true },
            optionsSpeak: true,
            stage: 2,
          },
          {
            key: 'v22-2', type: 'Combine os pares',
            instruction: 'Ligue cada frase ao que você quer saber.',
            question: '',
            kind: 'pares',
            pares: [
              { a: 'Onde desço', b: 'Where do I get off?' },
              { a: 'Qual plataforma', b: 'Which platform is it?' },
              { a: 'De quanto em quanto tempo passa', b: 'How often does it run?' },
              { a: 'Este lugar está livre', b: 'Is this seat taken?' },
            ],
            expected: 'pares',
            stage: 4,
          },
          {
            key: 'v22-3', type: 'Ouça e escolha',
            instruction: 'A pessoa no balcão respondeu. O que ela disse?',
            question: 'Platform four, it leaves in six minutes.',
            audio: { text: 'Platform four, it leaves in six minutes.', isQuestion: true },
            options: ['Plataforma 4, sai em 6 minutos', 'Plataforma 6, sai às 4', 'Quatro paradas, 6 minutos', 'Custa 4, espere 6 minutos'],
            answerIndex: 0,
            expected: 'Plataforma 4, sai em 6 minutos',
            stage: 1,
          },
          {
            key: 'v22-4', type: 'Monte a frase',
            instruction: 'Peça para o motorista te avisar.',
            question: '',
            kind: 'order',
            tokens: ['off', 'me', 'when', 'tell', 'to', 'get', 'could', 'you'],
            expected: 'Could you tell me when to get off',
            compare: 'loose',
            audio: { text: 'Could you tell me when to get off?', afterAnswer: true },
            stage: 6,
          },
          {
            key: 'v22-5', type: 'Ouça e escreva',
            instruction: 'Ouça e escreva.',
            question: 'Does this bus go to the station?',
            audio: { text: 'Does this bus go to the station?', isQuestion: true },
            expected: 'Does this bus go to the station',
            compare: 'loose',
            stage: 7,
          },
        ],
      },
      { tipo: 'resumo' },
    ],
  },
]
