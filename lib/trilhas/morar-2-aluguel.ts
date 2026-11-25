import type { Licao } from './tipos'

/**
 * Módulo 2 — Alugar casa.
 *
 * O primeiro lugar onde o inglês fraco custa dinheiro de verdade: um contrato
 * mal entendido são seis meses presos a um quarto ruim, e uma caução mal
 * combinada é um mês de salário que não volta.
 */
export const LICOES_ALUGUEL: Licao[] = [
  {
    id: 'morar-2-1',
    titulo: 'Ligar para o anúncio e visitar',
    consegue: 'Você consegue ligar para um anúncio, marcar a visita e perguntar o que realmente importa.',
    minutos: 13,
    blocos: [
      {
        tipo: 'situacao',
        texto: 'Você achou um quarto no valor certo e o anúncio tem um telefone. Quem atende fala rápido e tem mais dez pessoas na fila. As perguntas que decidem se vale a visita são quatro — e uma delas é a que ninguém faz: o que está incluído no preço.',
      },
      {
        tipo: 'frases',
        frases: [
          { en: "Hi, I'm calling about the room advertised on Daft.", pt: 'Oi, estou ligando sobre o quarto anunciado no Daft.', armadilha: '"Calling about" é a abertura pronta. Não traduza "estou ligando por causa do quarto" ao pé da letra.' },
          { en: 'Is it still available?', pt: 'Ainda está disponível?' },
          { en: 'Are bills included?', pt: 'As contas estão incluídas?', armadilha: '"Bills" são luz, gás e água. Perguntar isso muda o preço real em até duzentos por mês, e quase ninguém pergunta.' },
          { en: 'How much is the deposit?', pt: 'Quanto é a caução?' },
          { en: 'Is there a minimum stay?', pt: 'Tem tempo mínimo de permanência?' },
          { en: 'Could I come and see it this week?', pt: 'Posso ir ver esta semana?' },
          { en: 'Who else lives there?', pt: 'Quem mais mora aí?' },
        ],
      },
      {
        tipo: 'pratica',
        itens: [
          {
            key: 'm21-1', type: 'Escolha a resposta',
            instruction: 'Você ligou. Como abre a conversa?',
            question: '',
            options: ["Hi, I'm calling about the room advertised on Daft.", 'Hi, I call for the room of the advertisement.', 'Hello, the room please.'],
            answerIndex: 0,
            expected: "Hi, I'm calling about the room advertised on Daft.",
            why: '"Calling about" é a fórmula que todo anunciante reconhece na primeira palavra — e você tem três segundos antes de ele desligar.',
            audio: { text: "Hi, I'm calling about the room advertised on Daft.", afterAnswer: true },
            optionsSpeak: true,
            stage: 2,
          },
          {
            key: 'm21-2', type: 'Ouça e escolha',
            instruction: 'Ele respondeu. O que foi dito?',
            question: "It's eight hundred a month, bills not included, with a one-month deposit.",
            audio: { text: "It's eight hundred a month, bills not included, with a one-month deposit.", isQuestion: true },
            options: ['800 por mês, contas à parte, caução de um mês', '800 com tudo incluído', '800 de caução e 100 por mês', '800 por mês com contas incluídas'],
            answerIndex: 0,
            expected: '800 por mês, contas à parte, caução de um mês',
            why: '"Bills not included" é a frase que muda o orçamento: some uns 150 a 200 por mês ao valor do anúncio.',
            stage: 1,
          },
          {
            key: 'm21-3', type: 'Combine os pares',
            instruction: 'Ligue a pergunta ao que ela descobre.',
            question: '',
            kind: 'pares',
            pares: [
              { a: 'Quanto vou pagar além do aluguel', b: 'Are bills included?' },
              { a: 'Quanto preciso ter na mão hoje', b: 'How much is the deposit?' },
              { a: 'Se posso sair em três meses', b: 'Is there a minimum stay?' },
              { a: 'Com quem vou dividir a casa', b: 'Who else lives there?' },
            ],
            expected: 'pares',
            stage: 4,
          },
          {
            key: 'm21-4', type: 'Monte a frase',
            instruction: 'Peça para visitar.',
            question: '',
            kind: 'order',
            tokens: ['week', 'this', 'it', 'see', 'and', 'come', 'I', 'could'],
            expected: 'Could I come and see it this week',
            compare: 'loose',
            audio: { text: 'Could I come and see it this week?', afterAnswer: true },
            stage: 6,
          },
          {
            key: 'm21-5', type: 'Ouça e escreva',
            instruction: 'Ouça e escreva a pergunta que economiza duzentos por mês.',
            question: 'Are bills included?',
            audio: { text: 'Are bills included?', isQuestion: true },
            expected: 'Are bills included',
            compare: 'loose',
            stage: 7,
          },
        ],
      },
      { tipo: 'resumo' },
    ],
  },

  {
    id: 'morar-2-2',
    titulo: 'O contrato e a caução',
    consegue: 'Você consegue entender o contrato, negociar o valor e garantir a caução de volta.',
    minutos: 14,
    blocos: [
      {
        tipo: 'situacao',
        texto: 'Gostou do lugar e ele quer fechar hoje. Antes de assinar, três coisas: por quanto tempo você está preso, o que acontece se precisar sair antes, e em que estado o lugar está agora — porque é com esse estado que vão comparar quando você devolver as chaves.',
      },
      {
        tipo: 'frases',
        frases: [
          { en: 'How long is the contract?', pt: 'O contrato é de quanto tempo?' },
          { en: "What's the notice period?", pt: 'Qual é o aviso prévio?', armadilha: '"Notice period" é quantos meses antes você precisa avisar que vai sair. Sem perguntar isso, sair cedo custa caro.' },
          { en: 'Would you consider seven fifty?', pt: 'Você consideraria setecentos e cinquenta?', armadilha: '"Would you consider…" é a forma de negociar aluguel sem ofender. "I want cheaper" encerra a conversa.' },
          { en: 'Can we do an inventory before I move in?', pt: 'Dá para fazer uma vistoria antes de eu entrar?', armadilha: 'Fotografe tudo e peça o "inventory" por escrito. É a única prova de que o arranhão já estava lá.' },
          { en: 'When do I get the deposit back?', pt: 'Quando a caução volta?' },
          { en: 'Is the deposit protected?', pt: 'A caução fica num depósito protegido?' },
          { en: 'Could I have that in writing?', pt: 'Pode me passar isso por escrito?' },
        ],
      },
      {
        tipo: 'pratica',
        itens: [
          {
            key: 'm22-1', type: 'Qual é mais educado',
            instruction: 'O aluguel está acima do seu limite. Qual frase o proprietário escuta?',
            question: '',
            options: ['I want cheaper. Eight hundred is too much.', 'Would you consider seven fifty?'],
            answerIndex: 1,
            expected: 'Would you consider seven fifty?',
            why: '"Would you consider…" põe um número na mesa sem acusar o preço de abusivo — e dá ao proprietário como dizer sim sem perder a pose.',
            audio: { text: 'Would you consider seven fifty?', afterAnswer: true },
            optionsSpeak: true,
            stage: 3,
          },
          {
            key: 'm22-2', type: 'Ouça e escolha',
            instruction: 'Ele explicou o contrato. O que você ouviu?',
            question: "It's a twelve-month lease with a one-month notice period.",
            audio: { text: "It's a twelve-month lease with a one-month notice period.", isQuestion: true },
            options: ['Contrato de 12 meses, aviso prévio de 1 mês', 'Contrato de 1 mês, renovável por 12', 'Doze meses sem possibilidade de sair', 'Um mês de teste e depois 12'],
            answerIndex: 0,
            expected: 'Contrato de 12 meses, aviso prévio de 1 mês',
            stage: 1,
          },
          {
            key: 'm22-3', type: 'Combine os pares',
            instruction: 'Ligue o termo ao que ele significa no seu bolso.',
            question: '',
            kind: 'pares',
            pares: [
              { a: 'Quanto tempo você fica preso', b: 'Lease' },
              { a: 'Quanto antes precisa avisar', b: 'Notice period' },
              { a: 'O dinheiro que fica parado', b: 'Deposit' },
              { a: 'A vistoria do estado do imóvel', b: 'Inventory' },
            ],
            expected: 'pares',
            stage: 4,
          },
          {
            key: 'm22-4', type: 'Monte a frase',
            instruction: 'Peça a vistoria antes de entrar.',
            question: '',
            kind: 'order',
            tokens: ['in', 'move', 'I', 'before', 'inventory', 'an', 'do', 'we', 'can'],
            expected: 'Can we do an inventory before I move in',
            compare: 'loose',
            audio: { text: 'Can we do an inventory before I move in?', afterAnswer: true },
            stage: 6,
          },
          {
            key: 'm22-5', type: 'Ouça e escreva',
            instruction: 'Ouça e escreva. É a frase que protege tudo o que foi combinado.',
            question: 'Could I have that in writing?',
            audio: { text: 'Could I have that in writing?', isQuestion: true },
            expected: 'Could I have that in writing',
            compare: 'loose',
            stage: 7,
          },
        ],
      },
      { tipo: 'simulacao', simulacaoId: 'aluguel-negociar' },
      { tipo: 'resumo' },
    ],
  },
]
