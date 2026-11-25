import type { Licao } from './tipos'

/**
 * Módulo 1 — Primeiros dias.
 *
 * A primeira semana é toda de burocracia, e a burocracia tem um inglês só
 * dela: "proof of address", "PPS number", "sort code". São palavras que não
 * aparecem em curso nenhum e que travam quem chega — não por não saber
 * inglês, mas por nunca ter ouvido aquilo.
 */
export const LICOES_PRIMEIROS_DIAS: Licao[] = [
  {
    id: 'morar-1-1',
    titulo: 'Abrir conta e comprar chip',
    consegue: 'Você consegue abrir conta no banco e comprar um chip, entendendo o que pedem de você.',
    minutos: 12,
    blocos: [
      {
        tipo: 'situacao',
        texto: 'Terceiro dia no país. Sem conta no banco não entra salário, e sem comprovante de endereço não abre conta — e para ter comprovante você precisa de uma conta. Todo mundo passa por esse nó, e sair dele é saber as palavras certas.',
      },
      {
        tipo: 'frases',
        frases: [
          { en: "I'd like to open a bank account.", pt: 'Queria abrir uma conta no banco.' },
          { en: 'What documents do I need?', pt: 'Quais documentos eu preciso?' },
          { en: 'I have proof of address here.', pt: 'Tenho o comprovante de endereço aqui.', armadilha: '"Proof of address" é o documento que prova onde você mora — conta de luz, contrato ou carta do banco. Pedem em tudo.' },
          { en: "I don't have a proof of address yet.", pt: 'Ainda não tenho comprovante de endereço.' },
          { en: 'Is there a monthly fee?', pt: 'Tem taxa mensal?' },
          { en: 'I need a pay-as-you-go SIM card.', pt: 'Preciso de um chip pré-pago.', armadilha: '"Pay as you go" é pré-pago e "contract" é plano com fatura. Pedir "prepaid" se entende, mas ninguém fala assim.' },
          { en: 'How long will the card take to arrive?', pt: 'Quanto tempo o cartão demora para chegar?' },
        ],
      },
      {
        tipo: 'pratica',
        itens: [
          {
            key: 'n11-1', type: 'Ouça e escolha',
            instruction: 'A atendente do banco pediu. O que ela quer?',
            question: 'Could I see some photo ID and a proof of address?',
            audio: { text: 'Could I see some photo ID and a proof of address?', isQuestion: true },
            options: ['Documento com foto e comprovante de endereço', 'Só o passaporte', 'Uma foto sua e o endereço escrito', 'Carteira de motorista do seu país'],
            answerIndex: 0,
            expected: 'Documento com foto e comprovante de endereço',
            why: '"Photo ID" é qualquer documento com foto; "proof of address" é o que prova onde você mora. São sempre os dois.',
            stage: 1,
          },
          {
            key: 'n11-2', type: 'Escolha a resposta',
            instruction: 'Você quer um chip sem plano mensal. O que pede?',
            question: '',
            options: ['I need a pay-as-you-go SIM card.', 'I need a prepaid chip.', 'I want a telephone card without contract.'],
            answerIndex: 0,
            expected: 'I need a pay-as-you-go SIM card.',
            why: '"SIM card" é o chip e "pay as you go" é o pré-pago. "Chip" em inglês é batata frita ou pedaço quebrado.',
            audio: { text: 'I need a pay-as-you-go SIM card.', afterAnswer: true },
            optionsSpeak: true,
            stage: 2,
          },
          {
            key: 'n11-3', type: 'Combine os pares',
            instruction: 'Ligue o documento ao que ele é.',
            question: '',
            kind: 'pares',
            pares: [
              { a: 'Documento com foto', b: 'Photo ID' },
              { a: 'Comprovante de endereço', b: 'Proof of address' },
              { a: 'Chip pré-pago', b: 'Pay-as-you-go SIM' },
              { a: 'Taxa mensal', b: 'Monthly fee' },
            ],
            expected: 'pares',
            stage: 4,
          },
          {
            key: 'n11-4', type: 'Monte a frase',
            instruction: 'Diga o que você quer, logo na porta do banco.',
            question: '',
            kind: 'order',
            tokens: ['account', 'bank', 'a', 'open', 'to', 'like', "I'd"],
            expected: "I'd like to open a bank account",
            compare: 'loose',
            audio: { text: "I'd like to open a bank account.", afterAnswer: true },
            stage: 6,
          },
          {
            key: 'n11-5', type: 'Ouça e escreva',
            instruction: 'Ouça e escreva a pergunta que abre qualquer balcão.',
            question: 'What documents do I need?',
            audio: { text: 'What documents do I need?', isQuestion: true },
            expected: 'What documents do I need',
            compare: 'loose',
            stage: 7,
          },
        ],
      },
      { tipo: 'resumo' },
    ],
  },

  {
    id: 'morar-1-2',
    titulo: 'Registro, número e papelada',
    consegue: 'Você consegue se registrar nos órgãos, preencher formulário e pedir ajuda quando travar.',
    minutos: 12,
    blocos: [
      {
        tipo: 'situacao',
        texto: 'Toda a sua vida no país vai depender de um número — PPS na Irlanda, National Insurance no Reino Unido, SSN nos Estados Unidos. Sem ele não tem salário legal nem médico. O pedido é um formulário e uma conversa curta.',
      },
      {
        tipo: 'frases',
        frases: [
          { en: 'I need to apply for a PPS number.', pt: 'Preciso solicitar o número de PPS.', armadilha: '"Apply for" é solicitar. "Ask a number" não existe nesse sentido.' },
          { en: 'Do I need an appointment?', pt: 'Preciso marcar hora?' },
          { en: 'Could you help me fill in this form?', pt: 'Pode me ajudar a preencher este formulário?', armadilha: 'No Reino Unido e na Irlanda se diz "fill in"; nos Estados Unidos, "fill out". As duas se entendem.' },
          { en: 'What does this box mean?', pt: 'O que esse campo quer dizer?' },
          { en: 'How long does it take to come through?', pt: 'Quanto tempo demora para sair?' },
          { en: 'Can I do it online?', pt: 'Dá para fazer pela internet?' },
          { en: 'Sorry, my English is still basic — could you speak a bit slower?', pt: 'Desculpe, meu inglês ainda é básico — pode falar um pouco mais devagar?', armadilha: 'Dizer isso no começo resolve a conversa inteira. Quase todo atendente baixa o ritmo na hora.' },
        ],
      },
      {
        tipo: 'pratica',
        itens: [
          {
            key: 'n12-1', type: 'Escolha a resposta',
            instruction: 'Você vai começar a conversa num balcão público. O que diz primeiro?',
            question: '',
            options: ['Sorry, my English is still basic — could you speak a bit slower?', 'I speak English bad.', 'My English no good, sorry.'],
            answerIndex: 0,
            expected: 'Sorry, my English is still basic — could you speak a bit slower?',
            why: 'Pede o que você precisa (mais devagar) em vez de só se desculpar. É uma frase comprida, vale decorar: ela muda toda a conversa.',
            audio: { text: 'Sorry, my English is still basic — could you speak a bit slower?', afterAnswer: true },
            optionsSpeak: true,
            stage: 2,
          },
          {
            key: 'n12-2', type: 'Ouça e escolha',
            instruction: 'O atendente respondeu. O que ele disse?',
            question: 'You can apply online, but you will need an appointment to collect it.',
            audio: { text: 'You can apply online, but you will need an appointment to collect it.', isQuestion: true },
            options: ['Pode pedir pela internet, mas precisa marcar hora para retirar', 'Tem de ir pessoalmente desde o começo', 'Só pela internet, sem precisar ir lá', 'Precisa marcar hora para pedir'],
            answerIndex: 0,
            expected: 'Pode pedir pela internet, mas precisa marcar hora para retirar',
            stage: 1,
          },
          {
            key: 'n12-3', type: 'Monte a frase',
            instruction: 'Peça ajuda com o formulário.',
            question: '',
            kind: 'order',
            tokens: ['form', 'this', 'in', 'fill', 'me', 'help', 'you', 'could'],
            expected: 'Could you help me fill in this form',
            compare: 'loose',
            audio: { text: 'Could you help me fill in this form?', afterAnswer: true },
            stage: 6,
          },
          {
            key: 'n12-4', type: 'Combine os pares',
            instruction: 'Ligue a pergunta ao que ela resolve.',
            question: '',
            kind: 'pares',
            pares: [
              { a: 'Se preciso ir lá pessoalmente', b: 'Can I do it online?' },
              { a: 'Se preciso marcar antes', b: 'Do I need an appointment?' },
              { a: 'Quando o documento sai', b: 'How long does it take to come through?' },
              { a: 'O que escrever num campo', b: 'What does this box mean?' },
            ],
            expected: 'pares',
            stage: 4,
          },
          {
            key: 'n12-5', type: 'Ouça e escreva',
            instruction: 'Ouça e escreva.',
            question: 'Do I need an appointment?',
            audio: { text: 'Do I need an appointment?', isQuestion: true },
            expected: 'Do I need an appointment',
            compare: 'loose',
            stage: 7,
          },
        ],
      },
      { tipo: 'resumo' },
    ],
  },
]
