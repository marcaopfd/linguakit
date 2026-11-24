import type { Licao } from './tipos'

/**
 * Módulo 8 — Emergências.
 *
 * O módulo que ninguém quer usar e todo mundo acaba usando. Três lições, na
 * ordem da gravidade: a farmácia, o médico e o que fazer quando some o
 * passaporte ou a carteira.
 *
 * Aqui as frases são curtas de propósito. Quem está passando mal, com dor ou
 * com medo não monta frase comprida em língua estrangeira — e não precisa.
 */
export const LICOES_EMERGENCIAS: Licao[] = [
  {
    id: 'viagem-8-1',
    titulo: 'Na farmácia',
    consegue: 'Você consegue explicar um sintoma na farmácia e sair com o remédio certo.',
    minutos: 11,
    blocos: [
      {
        tipo: 'situacao',
        texto: 'Dor de cabeça, estômago embrulhado ou uma queimadura de sol. Na farmácia fora do Brasil o balconista costuma ser farmacêutico de verdade e pode indicar o remédio — mas só se entender o sintoma.',
      },
      {
        tipo: 'frases',
        frases: [
          { en: 'I have a headache.', pt: 'Estou com dor de cabeça.', armadilha: 'Em inglês se TEM a dor: "I have a headache". "I am with pain" não existe.' },
          { en: 'Do you have something for a sore throat?', pt: 'Tem alguma coisa para dor de garganta?' },
          { en: "I've got an upset stomach.", pt: 'Estou com o estômago embrulhado.' },
          { en: 'Is this over the counter?', pt: 'Isto é vendido sem receita?', armadilha: '"Over the counter" é o que se compra sem receita; com receita é "prescription only".' },
          { en: 'How many times a day?', pt: 'Quantas vezes por dia?' },
          { en: "I'm allergic to penicillin.", pt: 'Sou alérgico a penicilina.' },
          { en: 'Something for sunburn, please.', pt: 'Algo para queimadura de sol, por favor.' },
        ],
      },
      {
        tipo: 'pratica',
        itens: [
          {
            key: 'v81-1', type: 'Escolha a resposta',
            instruction: 'Você está com dor de cabeça. O que diz no balcão?',
            question: '',
            options: ['I have a headache.', 'I am with pain in the head.', 'My head is paining.'],
            answerIndex: 0,
            expected: 'I have a headache.',
            why: 'Em inglês a dor se tem, não se está com ela. E cada dor tem o seu nome pronto: headache, toothache, stomach ache.',
            audio: { text: 'I have a headache.', afterAnswer: true },
            optionsSpeak: true,
            stage: 2,
          },
          {
            key: 'v81-2', type: 'Combine os pares',
            instruction: 'Ligue o sintoma ao inglês.',
            question: '',
            kind: 'pares',
            pares: [
              { a: 'Dor de garganta', b: 'A sore throat' },
              { a: 'Dor de cabeça', b: 'A headache' },
              { a: 'Estômago embrulhado', b: 'An upset stomach' },
              { a: 'Queimadura de sol', b: 'Sunburn' },
            ],
            expected: 'pares',
            stage: 4,
          },
          {
            key: 'v81-3', type: 'Ouça e escolha',
            instruction: 'O farmacêutico explicou. O que ele disse?',
            question: 'Take one tablet twice a day, after food.',
            audio: { text: 'Take one tablet twice a day, after food.', isQuestion: true },
            options: ['Um comprimido duas vezes ao dia, depois de comer', 'Dois comprimidos uma vez ao dia', 'Um comprimido em jejum', 'Dois por dia antes de comer'],
            answerIndex: 0,
            expected: 'Um comprimido duas vezes ao dia, depois de comer',
            why: '"Twice a day" é duas vezes ao dia e "after food" é depois de comer — a confusão entre as duas é o erro mais comum.',
            stage: 1,
          },
          {
            key: 'v81-4', type: 'Monte a frase',
            instruction: 'Pergunte se precisa de receita.',
            question: '',
            kind: 'order',
            tokens: ['counter', 'the', 'over', 'this', 'is'],
            expected: 'Is this over the counter',
            compare: 'loose',
            audio: { text: 'Is this over the counter?', afterAnswer: true },
            stage: 6,
          },
          {
            key: 'v81-5', type: 'Ouça e escreva',
            instruction: 'Ouça e escreva. É a frase que evita um acidente.',
            question: "I'm allergic to penicillin.",
            audio: { text: "I'm allergic to penicillin.", isQuestion: true },
            expected: 'Im allergic to penicillin',
            compare: 'loose',
            stage: 7,
          },
        ],
      },
      { tipo: 'resumo' },
    ],
  },

  {
    id: 'viagem-8-2',
    titulo: 'No médico',
    consegue: 'Você consegue marcar consulta, dizer onde dói e há quanto tempo.',
    minutos: 12,
    blocos: [
      {
        tipo: 'situacao',
        texto: 'Passou do que a farmácia resolve. No consultório as perguntas são sempre as mesmas três: onde dói, desde quando, e se você toma algum remédio. Prepare as três respostas antes de entrar.',
      },
      {
        tipo: 'frases',
        frases: [
          { en: 'I need to see a doctor.', pt: 'Preciso ver um médico.' },
          { en: 'It hurts here.', pt: 'Dói aqui.', armadilha: 'Duas palavras e um dedo apontando resolvem. Não precisa do nome da parte do corpo.' },
          { en: 'Since yesterday.', pt: 'Desde ontem.' },
          { en: "I've had a fever for two days.", pt: 'Estou com febre há dois dias.', armadilha: 'Em inglês "for" marca a duração: "for two days". Usar "since" aqui exige uma data — "since Monday".' },
          { en: "I'm taking medication for blood pressure.", pt: 'Tomo remédio para pressão.' },
          { en: 'Do I need a prescription?', pt: 'Preciso de receita?' },
          { en: 'Can I have a receipt for my insurance?', pt: 'Pode me dar um recibo para o seguro?', armadilha: 'Peça sempre. Sem o recibo, o seguro viagem não reembolsa nada.' },
        ],
      },
      {
        tipo: 'pratica',
        itens: [
          {
            key: 'v82-1', type: 'Ouça e escolha',
            instruction: 'A médica perguntou. O que ela quer saber?',
            question: 'How long have you had this?',
            audio: { text: 'How long have you had this?', isQuestion: true },
            options: ['Desde quando você está assim', 'Onde dói', 'Que remédio você toma', 'Quantos anos você tem'],
            answerIndex: 0,
            expected: 'Desde quando você está assim',
            stage: 1,
          },
          {
            key: 'v82-2', type: 'Escolha a resposta',
            instruction: 'Você está com febre há dois dias. Como responde?',
            question: '',
            options: ["I've had a fever for two days.", 'I have fever since two days.', 'I am with fever two days.'],
            answerIndex: 0,
            expected: "I've had a fever for two days.",
            why: 'Duração leva "for": for two days. "Since" pede um ponto no tempo — since Monday, since yesterday.',
            audio: { text: "I've had a fever for two days.", afterAnswer: true },
            optionsSpeak: true,
            stage: 2,
          },
          {
            key: 'v82-3', type: 'Combine os pares',
            instruction: 'Ligue a pergunta do médico à sua resposta.',
            question: '',
            kind: 'pares',
            pares: [
              { a: 'Where does it hurt?', b: 'It hurts here.' },
              { a: 'How long have you had this?', b: 'Since yesterday.' },
              { a: 'Any medication?', b: "I'm taking medication for blood pressure." },
              { a: 'Any allergies?', b: "I'm allergic to penicillin." },
            ],
            expected: 'pares',
            stage: 4,
          },
          {
            key: 'v82-4', type: 'Monte a frase',
            instruction: 'Peça o recibo do seguro.',
            question: '',
            kind: 'order',
            tokens: ['insurance', 'my', 'for', 'receipt', 'a', 'have', 'I', 'can'],
            expected: 'Can I have a receipt for my insurance',
            compare: 'loose',
            audio: { text: 'Can I have a receipt for my insurance?', afterAnswer: true },
            stage: 6,
          },
          {
            key: 'v82-5', type: 'Ouça e escreva',
            instruction: 'Ouça e escreva.',
            question: 'I need to see a doctor.',
            audio: { text: 'I need to see a doctor.', isQuestion: true },
            expected: 'I need to see a doctor',
            compare: 'loose',
            stage: 7,
          },
        ],
      },
      { tipo: 'resumo' },
    ],
  },

  {
    id: 'viagem-8-3',
    titulo: 'Perdi, roubaram, preciso de ajuda',
    consegue: 'Você consegue pedir ajuda, registrar um roubo e falar com o consulado.',
    minutos: 12,
    blocos: [
      {
        tipo: 'situacao',
        texto: 'Sumiu a carteira com o passaporte dentro. É a pior hora possível para procurar palavra, então são frases curtas e diretas — e uma delas é a que destrava tudo: o boletim de ocorrência, sem o qual nenhum seguro paga.',
      },
      {
        tipo: 'frases',
        frases: [
          { en: 'I need help, please.', pt: 'Preciso de ajuda, por favor.' },
          { en: "I've lost my passport.", pt: 'Perdi meu passaporte.' },
          { en: 'My wallet was stolen.', pt: 'Roubaram minha carteira.', armadilha: 'Em inglês quem foi roubado é a coisa: "my wallet was stolen". Dizer "I was stolen" quer dizer que roubaram você inteiro.' },
          { en: 'I need to report a theft.', pt: 'Preciso registrar um roubo.' },
          { en: 'I need a police report for my insurance.', pt: 'Preciso do boletim para o seguro.', armadilha: 'Sem o "police report" nenhum seguro reembolsa. Peça antes de sair da delegacia.' },
          { en: 'Can you call the Brazilian consulate?', pt: 'Pode ligar para o consulado brasileiro?' },
          { en: 'Could I use your phone?', pt: 'Posso usar o seu telefone?' },
        ],
      },
      {
        tipo: 'pratica',
        itens: [
          {
            key: 'v83-1', type: 'Escolha a resposta',
            instruction: 'Levaram a sua carteira. O que você diz ao policial?',
            question: '',
            options: ['My wallet was stolen.', 'I was stolen.', 'They stole me the wallet.'],
            answerIndex: 0,
            expected: 'My wallet was stolen.',
            why: 'Quem é roubado em inglês é o objeto, não a pessoa. "I was stolen" diz que levaram você.',
            audio: { text: 'My wallet was stolen.', afterAnswer: true },
            optionsSpeak: true,
            stage: 2,
          },
          {
            key: 'v83-2', type: 'Monte a frase',
            instruction: 'Peça o documento que o seguro exige.',
            question: '',
            kind: 'order',
            tokens: ['insurance', 'my', 'for', 'report', 'police', 'a', 'need', 'I'],
            expected: 'I need a police report for my insurance',
            compare: 'loose',
            audio: { text: 'I need a police report for my insurance.', afterAnswer: true },
            stage: 6,
          },
          {
            key: 'v83-3', type: 'Ouça e escolha',
            instruction: 'O policial respondeu. O que ele disse?',
            question: "Fill in this form and we'll give you a copy of the report.",
            audio: { text: "Fill in this form and we'll give you a copy of the report.", isQuestion: true },
            options: ['Preencha o formulário e damos uma cópia do boletim', 'Volte amanhã com o passaporte', 'Não registramos roubo de turista', 'Ligue para o consulado primeiro'],
            answerIndex: 0,
            expected: 'Preencha o formulário e damos uma cópia do boletim',
            stage: 1,
          },
          {
            key: 'v83-4', type: 'Combine os pares',
            instruction: 'Ligue a emergência à frase.',
            question: '',
            kind: 'pares',
            pares: [
              { a: 'Sumiu o passaporte', b: "I've lost my passport." },
              { a: 'Preciso falar com o Brasil', b: 'Can you call the Brazilian consulate?' },
              { a: 'Preciso registrar o roubo', b: 'I need to report a theft.' },
              { a: 'Meu celular acabou', b: 'Could I use your phone?' },
            ],
            expected: 'pares',
            stage: 4,
          },
          {
            key: 'v83-5', type: 'Ouça e escreva',
            instruction: 'Ouça e escreva as quatro palavras que pedem socorro.',
            question: 'I need help, please.',
            audio: { text: 'I need help, please.', isQuestion: true },
            expected: 'I need help please',
            compare: 'loose',
            stage: 7,
          },
        ],
      },
      { tipo: 'resumo' },
    ],
  },
]
