import type { Licao } from './tipos'

/**
 * Módulo 5 — Inglês da cozinha.
 *
 * O inglês de cozinha não é o inglês do curso: é curto, gritado e cheio de
 * palavra que não aparece em livro nenhum. "Behind!" não é uma frase, é um
 * aviso de que alguém está passando atrás de você com uma panela quente — e
 * não saber isso é o que causa acidente no primeiro dia.
 *
 * Quem escreveu este módulo lavou prato antes de virar chef. É o inglês que
 * faltou a ele.
 */
export const LICOES_COZINHA: Licao[] = [
  {
    id: 'morar-5-1',
    titulo: 'As palavras gritadas na linha',
    consegue: 'Você consegue entender e responder ao que se grita numa cozinha durante o serviço.',
    minutos: 13,
    blocos: [
      {
        tipo: 'situacao',
        texto: 'Sete e meia da noite, cozinha cheia, e todo mundo grita. Ninguém vai parar para explicar. São oito palavras que se repetem a noite inteira, e saber responder a elas é a diferença entre fazer parte da equipe e atrapalhar.',
      },
      {
        tipo: 'frases',
        frases: [
          { en: 'Behind!', pt: 'Atrás!', armadilha: 'Não é pergunta nem conversa: alguém está passando atrás de você, muitas vezes com algo quente. Você não responde, você só não se mexe para trás.' },
          { en: 'Yes, chef!', pt: 'Sim, chef!', armadilha: 'A resposta a qualquer ordem. Curta e alta. Ficar calado soa como não ter entendido.' },
          { en: 'Heard!', pt: 'Entendido!', armadilha: 'Confirma que você ouviu o pedido. Numa cozinha, silêncio quer dizer que ninguém pegou a comanda.' },
          { en: 'Service!', pt: 'Pronto para sair!' },
          { en: 'How long on the chicken?', pt: 'Quanto tempo para o frango?' },
          { en: 'Two minutes, chef.', pt: 'Dois minutos, chef.' },
          { en: 'We are eighty-six on the salmon.', pt: 'Acabou o salmão.', armadilha: '"Eighty-six" quer dizer que acabou. É gíria de cozinha no mundo inteiro e ninguém traduz.' },
        ],
      },
      {
        tipo: 'pratica',
        itens: [
          {
            key: 'm51-1', type: 'Ouça e escolha',
            instruction: 'Alguém gritou isso bem atrás de você. O que você faz?',
            question: 'Behind!',
            audio: { text: 'Behind!', isQuestion: true },
            options: ['Fico parado onde estou', 'Dou um passo para trás', 'Viro para olhar', 'Respondo "yes chef"'],
            answerIndex: 0,
            expected: 'Fico parado onde estou',
            why: 'Alguém está passando atrás de você com algo quente ou afiado. Dar um passo para trás é exatamente o acidente que o aviso quer evitar.',
            stage: 1,
          },
          {
            key: 'm51-2', type: 'Escolha a resposta',
            instruction: 'O chef gritou "Two steaks, medium rare!". O que você responde?',
            question: 'Two steaks, medium rare!',
            options: ['Heard!', 'Okay, I understand.', 'What?'],
            answerIndex: 0,
            expected: 'Heard!',
            why: 'Uma palavra, alta, confirmando que a comanda foi ouvida. Frase comprida no meio do serviço ninguém escuta.',
            audio: { text: 'Heard!', afterAnswer: true },
            optionsSpeak: true,
            stage: 2,
          },
          {
            key: 'm51-3', type: 'Combine os pares',
            instruction: 'Ligue o grito ao que ele quer dizer.',
            question: '',
            kind: 'pares',
            pares: [
              { a: 'Estou passando atrás de você', b: 'Behind!' },
              { a: 'Ouvi o pedido', b: 'Heard!' },
              { a: 'O prato está pronto para sair', b: 'Service!' },
              { a: 'Acabou esse ingrediente', b: 'Eighty-six!' },
            ],
            expected: 'pares',
            stage: 4,
          },
          {
            key: 'm51-4', type: 'Ouça e escolha',
            instruction: 'O chef perguntou. O que ele quer?',
            question: 'How long on the chicken?',
            audio: { text: 'How long on the chicken?', isQuestion: true },
            options: ['Quanto tempo falta para o frango ficar pronto', 'Se o frango está grande', 'Há quanto tempo o frango está ali', 'Quantos frangos tem'],
            answerIndex: 0,
            expected: 'Quanto tempo falta para o frango ficar pronto',
            why: 'A resposta é um número e a palavra chef: "Two minutes, chef."',
            stage: 1,
          },
          {
            key: 'm51-5', type: 'Ouça e escreva',
            instruction: 'Ouça e escreva a resposta mais usada da cozinha.',
            question: 'Yes, chef!',
            audio: { text: 'Yes, chef!', isQuestion: true },
            expected: 'Yes chef',
            compare: 'loose',
            stage: 7,
          },
        ],
      },
      { tipo: 'resumo' },
    ],
  },

  {
    id: 'morar-5-2',
    titulo: 'Ponto da carne, alergia e limpeza',
    consegue: 'Você consegue acertar o ponto da carne, tratar uma alergia como a cozinha trata e passar na inspeção.',
    minutos: 13,
    blocos: [
      {
        tipo: 'situacao',
        texto: 'Três coisas derrubam quem está começando: errar o ponto da carne, não levar alergia a sério e não saber o vocabulário da limpeza quando o inspetor aparece. As três têm palavra certa, e são poucas.',
      },
      {
        tipo: 'frases',
        frases: [
          { en: 'Rare, medium rare, medium, well done.', pt: 'Mal passada, ao ponto para mal, ao ponto, bem passada.', armadilha: 'São quatro e vêm nessa ordem. "Ao ponto" do Brasil fica entre "medium rare" e "medium" — na dúvida, confirme com o chef.' },
          { en: 'Allergy on table six — no nuts.', pt: 'Alergia na mesa seis — sem castanha.', armadilha: 'Alergia se anuncia em voz alta para a linha inteira. Guardar para si é como ninguém saber.' },
          { en: 'I need a clean board for this.', pt: 'Preciso de uma tábua limpa para isto.' },
          { en: 'Is this still in date?', pt: 'Isto está dentro da validade?' },
          { en: 'Can you prep the onions?', pt: 'Pode descascar e cortar as cebolas?', armadilha: '"Prep" é todo o trabalho de preparação antes do serviço. "Prep list" é a lista do que fazer antes de abrir.' },
          { en: 'Where do the dirty pans go?', pt: 'Onde ficam as panelas sujas?' },
          { en: "I'm on it, chef.", pt: 'Estou cuidando disso, chef.' },
        ],
      },
      {
        tipo: 'pratica',
        itens: [
          {
            key: 'm52-1', type: 'Combine os pares',
            instruction: 'Ligue o ponto ao que ele quer dizer.',
            question: '',
            kind: 'pares',
            pares: [
              { a: 'Bem vermelha por dentro', b: 'Rare' },
              { a: 'Vermelha no centro', b: 'Medium rare' },
              { a: 'Rosada no centro', b: 'Medium' },
              { a: 'Sem nada de rosa', b: 'Well done' },
            ],
            expected: 'pares',
            stage: 4,
          },
          {
            key: 'm52-2', type: 'Escolha a resposta',
            instruction: 'A mesa seis avisou de alergia a castanha. O que você faz?',
            question: '',
            options: ['Allergy on table six — no nuts!', 'Table six does not like nuts.', 'Eu só não ponho castanha e pronto.'],
            answerIndex: 0,
            expected: 'Allergy on table six — no nuts!',
            why: 'Alergia se grita para a linha inteira: quem monta o prato, quem empratra e quem serve precisam saber. Resolver calado é como ninguém saber.',
            audio: { text: 'Allergy on table six — no nuts!', afterAnswer: true },
            optionsSpeak: true,
            stage: 2,
          },
          {
            key: 'm52-3', type: 'Ouça e escolha',
            instruction: 'O chef pediu. O que ele quer?',
            question: 'Can you prep the onions before service?',
            audio: { text: 'Can you prep the onions before service?', isQuestion: true },
            options: ['Descascar e cortar as cebolas antes do serviço', 'Servir as cebolas', 'Comprar cebolas', 'Guardar as cebolas'],
            answerIndex: 0,
            expected: 'Descascar e cortar as cebolas antes do serviço',
            why: '"Prep" é toda a preparação feita antes de a cozinha abrir. É metade do trabalho de quem começa.',
            stage: 1,
          },
          {
            key: 'm52-4', type: 'Monte a frase',
            instruction: 'Pergunte pela validade.',
            question: '',
            kind: 'order',
            tokens: ['date', 'in', 'still', 'this', 'is'],
            expected: 'Is this still in date',
            compare: 'loose',
            audio: { text: 'Is this still in date?', afterAnswer: true },
            stage: 6,
          },
          {
            key: 'm52-5', type: 'Ouça e escreva',
            instruction: 'Ouça e escreva o que se responde quando o chef pede algo.',
            question: "I'm on it, chef.",
            audio: { text: "I'm on it, chef.", isQuestion: true },
            expected: 'Im on it chef',
            compare: 'loose',
            stage: 7,
          },
        ],
      },
      { tipo: 'resumo' },
    ],
  },
]
