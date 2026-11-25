import type { Licao } from './tipos'

/**
 * Módulo 6 — Inglês da obra.
 *
 * Na obra o inglês fraco não custa dinheiro: custa dedo. Metade deste módulo
 * é segurança, porque entender "mind your head" e "is this isolated?" na hora
 * certa é literalmente o que separa um dia normal de um acidente.
 *
 * A outra metade é o que o encarregado fala o dia inteiro — ferramenta,
 * medida e ordem curta —, e nada disso aparece em curso de inglês.
 */
export const LICOES_OBRA: Licao[] = [
  {
    id: 'morar-6-1',
    titulo: 'Segurança e o que não se ignora',
    consegue: 'Você consegue entender um aviso de segurança na hora e dizer que algo não está seguro.',
    minutos: 13,
    blocos: [
      {
        tipo: 'situacao',
        texto: 'Primeiro dia no canteiro. Antes de qualquer ferramenta vem o "induction" — a conversa de segurança — e depois os avisos que todo mundo grita o dia inteiro. Estes você entende de primeira ou não entende nunca.',
      },
      {
        tipo: 'frases',
        frases: [
          { en: 'Mind your head.', pt: 'Cuidado com a cabeça.', armadilha: '"Mind" aqui é "preste atenção", não "se importar". Aparece em "mind the gap", "mind your step", "mind your head".' },
          { en: 'You need a hard hat and hi-vis on site.', pt: 'Precisa de capacete e colete refletivo no canteiro.', armadilha: '"Hi-vis" é o colete refletivo e "PPE" é todo o equipamento de proteção. Sem eles você não entra, e ninguém discute.' },
          { en: "That doesn't look safe.", pt: 'Isso não parece seguro.', armadilha: 'Você pode e deve dizer isso. Em obra séria, parar o trabalho por segurança nunca dá problema — deixar passar, sim.' },
          { en: 'Is this isolated?', pt: 'Isto está desligado da energia?' },
          { en: 'Watch your step — wet floor.', pt: 'Cuidado onde pisa — chão molhado.' },
          { en: 'Where is the first aid kit?', pt: 'Onde fica a caixa de primeiros socorros?' },
          { en: 'I need to report an incident.', pt: 'Preciso relatar um acidente.' },
        ],
      },
      {
        tipo: 'pratica',
        itens: [
          {
            key: 'm61-1', type: 'Ouça e escolha',
            instruction: 'Gritaram isso perto de você. O que fazer?',
            question: 'Mind your head!',
            audio: { text: 'Mind your head!', isQuestion: true },
            options: ['Abaixar, tem algo na altura da cabeça', 'Olhar para cima com calma', 'Tirar o capacete', 'Prestar atenção no que pensa'],
            answerIndex: 0,
            expected: 'Abaixar, tem algo na altura da cabeça',
            why: '"Mind" é "preste atenção a", não "se importar". É o mesmo "mind" de "mind the gap" no metrô de Londres.',
            stage: 1,
          },
          {
            key: 'm61-2', type: 'Escolha a resposta',
            instruction: 'O andaime está balançando. O que você diz ao encarregado?',
            question: '',
            options: ["That doesn't look safe.", 'I am afraid of this.', 'This is bad, I not go there.'],
            answerIndex: 0,
            expected: "That doesn't look safe.",
            why: 'É a frase padrão para parar um trabalho inseguro, e dizer isso nunca dá problema em obra séria. As outras duas soam como medo pessoal, e não como alerta.',
            audio: { text: "That doesn't look safe.", afterAnswer: true },
            optionsSpeak: true,
            stage: 2,
          },
          {
            key: 'm61-3', type: 'Combine os pares',
            instruction: 'Ligue o equipamento ao nome dele.',
            question: '',
            kind: 'pares',
            pares: [
              { a: 'Capacete', b: 'Hard hat' },
              { a: 'Colete refletivo', b: 'Hi-vis' },
              { a: 'Botina com biqueira', b: 'Safety boots' },
              { a: 'Equipamento de proteção em geral', b: 'PPE' },
            ],
            expected: 'pares',
            stage: 4,
          },
          {
            key: 'm61-4', type: 'Monte a frase',
            instruction: 'Pergunte se a energia está cortada antes de encostar.',
            question: '',
            kind: 'order',
            tokens: ['isolated', 'this', 'is'],
            expected: 'Is this isolated',
            compare: 'loose',
            audio: { text: 'Is this isolated?', afterAnswer: true },
            stage: 6,
          },
          {
            key: 'm61-5', type: 'Ouça e escreva',
            instruction: 'Ouça e escreva. Pergunte isso no primeiro dia, não no dia do acidente.',
            question: 'Where is the first aid kit?',
            audio: { text: 'Where is the first aid kit?', isQuestion: true },
            expected: 'Where is the first aid kit',
            compare: 'loose',
            stage: 7,
          },
        ],
      },
      { tipo: 'resumo' },
    ],
  },

  {
    id: 'morar-6-2',
    titulo: 'Ferramenta, medida e a ordem do encarregado',
    consegue: 'Você consegue pedir a ferramenta certa, entender uma medida e confirmar uma ordem.',
    minutos: 13,
    blocos: [
      {
        tipo: 'situacao',
        texto: 'O encarregado fala rápido, de costas, e já foi embora. Ele disse um nome de ferramenta, um número e uma unidade. Se você não pegou, pergunte — pedir para repetir custa dez segundos, cortar errado custa a peça.',
      },
      {
        tipo: 'frases',
        frases: [
          { en: 'Can you pass me the drill?', pt: 'Pode me passar a furadeira?' },
          { en: 'What size?', pt: 'Qual medida?' },
          { en: 'Two metres by one twenty.', pt: 'Dois metros por um e vinte.', armadilha: 'Obra em Reino Unido e Irlanda mistura metro com polegada e pé. Se ouvir "inch" ou "foot", confirme o número antes de cortar.' },
          { en: 'Should I cut it here?', pt: 'Corto aqui?', armadilha: 'Perguntar antes de cortar é barato. A peça cortada errado, não.' },
          { en: 'Give us a hand with this?', pt: 'Me dá uma mão com isto?', armadilha: '"Give us a hand" é "me dá uma mão" — o "us" é uma só pessoa, e é assim que se fala na obra na Irlanda e no Reino Unido.' },
          { en: "I'll get it done before lunch.", pt: 'Termino isso antes do almoço.' },
          { en: 'Sorry, say that again?', pt: 'Desculpe, repete?' },
        ],
      },
      {
        tipo: 'pratica',
        itens: [
          {
            key: 'm62-1', type: 'Ouça e escolha',
            instruction: 'O encarregado passou e disse isto. Qual é a medida?',
            question: 'Cut it two metres by one twenty.',
            audio: { text: 'Cut it two metres by one twenty.', isQuestion: true },
            options: ['2 m por 1,20 m', '2,20 m de comprimento', '1,20 m por 20 cm', '2 m por 12 cm'],
            answerIndex: 0,
            expected: '2 m por 1,20 m',
            why: '"By" separa as duas medidas: dois metros por um e vinte. Na dúvida, "sorry, say that again?" antes de cortar.',
            stage: 1,
          },
          {
            key: 'm62-2', type: 'Combine os pares',
            instruction: 'Ligue a ferramenta ao nome.',
            question: '',
            kind: 'pares',
            pares: [
              { a: 'Furadeira', b: 'Drill' },
              { a: 'Serra', b: 'Saw' },
              { a: 'Fita métrica', b: 'Tape measure' },
              { a: 'Escada', b: 'Ladder' },
            ],
            expected: 'pares',
            stage: 4,
          },
          {
            key: 'm62-3', type: 'Escolha a resposta',
            instruction: 'Você não entendeu a ordem e ele já virou as costas.',
            question: '',
            options: ['Sorry, say that again?', 'I no understand.', 'Repeat.'],
            answerIndex: 0,
            expected: 'Sorry, say that again?',
            why: 'Curto, educado e normal na obra. "Repeat" sozinho soa como ordem, e a segunda não é inglês.',
            audio: { text: 'Sorry, say that again?', afterAnswer: true },
            optionsSpeak: true,
            stage: 2,
          },
          {
            key: 'm62-4', type: 'Monte a frase',
            instruction: 'Confirme antes de cortar.',
            question: '',
            kind: 'order',
            tokens: ['here', 'it', 'cut', 'I', 'should'],
            expected: 'Should I cut it here',
            compare: 'loose',
            audio: { text: 'Should I cut it here?', afterAnswer: true },
            stage: 6,
          },
          {
            key: 'm62-5', type: 'Ouça e escreva',
            instruction: 'Ouça e escreva o jeito de pedir ajuda na obra.',
            question: 'Give us a hand with this?',
            audio: { text: 'Give us a hand with this?', isQuestion: true },
            expected: 'Give us a hand with this',
            compare: 'loose',
            stage: 7,
          },
        ],
      },
      { tipo: 'resumo' },
    ],
  },
]
