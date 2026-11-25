import type { Licao } from './tipos'

/**
 * Módulo 4 — Entrevista de emprego.
 *
 * As perguntas são sempre as mesmas cinco, e a diferença entre passar e não
 * passar raramente é o inglês: é ter a resposta pronta. Quem chega com as
 * cinco preparadas soa mais fluente do que é.
 *
 * A segunda lição é a que brasileiro não faz: negociar. Lá fora, aceitar a
 * primeira oferta sem uma pergunta é deixar dinheiro na mesa, e ninguém
 * estranha quem pergunta.
 */
export const LICOES_ENTREVISTA: Licao[] = [
  {
    id: 'morar-4-1',
    titulo: 'As perguntas que sempre caem',
    consegue: 'Você consegue responder às cinco perguntas de toda entrevista e falar da sua experiência sem travar.',
    minutos: 14,
    blocos: [
      {
        tipo: 'situacao',
        texto: 'Marcaram a entrevista para amanhã. Você sabe fazer o trabalho — o problema é contar isso em inglês, em voz alta, para um estranho. A boa notícia: são cinco perguntas, as mesmas em qualquer lugar, e cada resposta cabe em duas frases.',
      },
      {
        tipo: 'frases',
        frases: [
          { en: "I've been working in kitchens for five years.", pt: 'Trabalho em cozinha há cinco anos.', armadilha: 'Para tempo de experiência use "I\'ve been working… for", não "I work since". É o erro que mais aparece em entrevista.' },
          { en: 'I started as a kitchen porter and worked my way up.', pt: 'Comecei lavando prato e fui subindo.', armadilha: '"Worked my way up" é a frase que mostra trajetória. Vale mais do que qualquer adjetivo.' },
          { en: "I'm a fast learner and I don't mind hard work.", pt: 'Aprendo rápido e não tenho medo de trabalho pesado.' },
          { en: "I'm available to start straight away.", pt: 'Posso começar imediatamente.', armadilha: 'Disponibilidade imediata pesa muito em restaurante e obra. Diga sem ninguém perguntar.' },
          { en: 'I have full working rights here.', pt: 'Tenho direito a trabalhar aqui.' },
          { en: 'Could you tell me more about the role?', pt: 'Pode me falar mais sobre a vaga?' },
          { en: "Sorry, could you repeat the question?", pt: 'Desculpe, pode repetir a pergunta?' },
        ],
      },
      {
        tipo: 'pratica',
        itens: [
          {
            key: 'm41-1', type: 'Escolha a resposta',
            instruction: '— Tell me about your experience.',
            question: 'Tell me about your experience.',
            options: ["I've been working in kitchens for five years.", 'I work in kitchen since five years.', 'I have five years that I work in kitchen.'],
            answerIndex: 0,
            expected: "I've been working in kitchens for five years.",
            why: 'Tempo de experiência pede "for" com o present perfect continuous. "Since" só com uma data: since 2021.',
            audio: { text: "I've been working in kitchens for five years.", afterAnswer: true },
            optionsSpeak: true,
            stage: 2,
          },
          {
            key: 'm41-2', type: 'Ouça e escolha',
            instruction: 'O gerente perguntou. O que ele quer saber?',
            question: 'When would you be available to start?',
            audio: { text: 'When would you be available to start?', isQuestion: true },
            options: ['Quando você pode começar', 'Quanto você quer ganhar', 'Quantos anos de experiência', 'Onde você mora'],
            answerIndex: 0,
            expected: 'Quando você pode começar',
            stage: 1,
          },
          {
            key: 'm41-3', type: 'Combine os pares',
            instruction: 'Ligue a pergunta clássica à sua resposta.',
            question: '',
            kind: 'pares',
            pares: [
              { a: 'Tell me about yourself', b: "I've been working in kitchens for five years." },
              { a: 'Why should we hire you?', b: "I'm a fast learner and I don't mind hard work." },
              { a: 'When can you start?', b: "I'm available to start straight away." },
              { a: 'Do you have a visa?', b: 'I have full working rights here.' },
            ],
            expected: 'pares',
            stage: 4,
          },
          {
            key: 'm41-4', type: 'Monte a frase',
            instruction: 'Conte a sua trajetória em uma frase.',
            question: '',
            kind: 'order',
            tokens: ['up', 'way', 'my', 'worked', 'and', 'porter', 'kitchen', 'a', 'as', 'started', 'I'],
            expected: 'I started as a kitchen porter and worked my way up',
            compare: 'loose',
            audio: { text: 'I started as a kitchen porter and worked my way up.', afterAnswer: true },
            stage: 6,
          },
          {
            key: 'm41-5', type: 'Ouça e escreva',
            instruction: 'Ouça e escreva a frase que te salva quando não entender.',
            question: 'Sorry, could you repeat the question?',
            audio: { text: 'Sorry, could you repeat the question?', isQuestion: true },
            expected: 'Sorry could you repeat the question',
            compare: 'loose',
            stage: 7,
          },
        ],
      },
      { tipo: 'resumo' },
    ],
  },

  {
    id: 'morar-4-2',
    titulo: 'Salário, horas e o que perguntar no fim',
    consegue: 'Você consegue perguntar quanto paga, negociar sem constranger e fazer a pergunta que te tira do monte.',
    minutos: 13,
    blocos: [
      {
        tipo: 'situacao',
        texto: 'Gostaram de você e veio a parte que brasileiro trava: falar de dinheiro. Lá fora, perguntar o valor por hora e negociar é esperado — quem aceita a primeira oferta calado não parece humilde, parece quem não sabe quanto vale.',
      },
      {
        tipo: 'frases',
        frases: [
          { en: "What's the hourly rate?", pt: 'Quanto é por hora?', armadilha: 'Em trabalho de restaurante, obra e delivery fala-se em "hourly rate", não em salário mensal.' },
          { en: 'Is that before or after tax?', pt: 'Isso é bruto ou líquido?', armadilha: '"Before tax" é bruto, "after tax" é líquido — ou "gross" e "net". A diferença pode ser um quinto do valor.' },
          { en: 'How many hours a week are guaranteed?', pt: 'Quantas horas por semana são garantidas?', armadilha: 'Pergunta decisiva em contrato de zero horas: sem horas garantidas, o salário também não é garantido.' },
          { en: 'Is there a trial shift?', pt: 'Tem turno de experiência?' },
          { en: 'I was hoping for something closer to fifteen an hour.', pt: 'Eu esperava algo mais perto de quinze por hora.', armadilha: 'Esta é a frase de negociar. "I was hoping for…" diz o número sem recusar a oferta.' },
          { en: 'Would there be room to review that after three months?', pt: 'Dá para rever isso depois de três meses?' },
          { en: 'When will you let me know?', pt: 'Quando vocês me dão um retorno?' },
        ],
      },
      {
        tipo: 'pratica',
        itens: [
          {
            key: 'm42-1', type: 'Escolha a resposta',
            instruction: 'Ofereceram treze por hora e você queria quinze. O que diz?',
            question: '',
            options: ['I was hoping for something closer to fifteen an hour.', 'Thirteen is too little for me.', 'I need more money than this.'],
            answerIndex: 0,
            expected: 'I was hoping for something closer to fifteen an hour.',
            why: '"I was hoping for…" põe o seu número sem recusar a oferta nem julgar a dele — é o que mantém a conversa viva.',
            audio: { text: 'I was hoping for something closer to fifteen an hour.', afterAnswer: true },
            optionsSpeak: true,
            stage: 2,
          },
          {
            key: 'm42-2', type: 'Ouça e escolha',
            instruction: 'Ele respondeu sobre o pagamento. O que foi dito?',
            question: "It's thirteen fifty an hour before tax, with twenty hours guaranteed.",
            audio: { text: "It's thirteen fifty an hour before tax, with twenty hours guaranteed.", isQuestion: true },
            options: ['13,50 por hora, bruto, com 20 horas garantidas', '13,50 líquido, 20 horas por dia', '1350 por mês com 20 horas', '13,50 líquido sem horas garantidas'],
            answerIndex: 0,
            expected: '13,50 por hora, bruto, com 20 horas garantidas',
            why: '"Before tax" é bruto. Sobre esse valor ainda saem os impostos — por isso se pergunta.',
            stage: 1,
          },
          {
            key: 'm42-3', type: 'Combine os pares',
            instruction: 'Ligue a pergunta ao que ela te protege.',
            question: '',
            kind: 'pares',
            pares: [
              { a: 'Quanto entra na conta de verdade', b: 'Is that before or after tax?' },
              { a: 'Se o mês vai fechar', b: 'How many hours a week are guaranteed?' },
              { a: 'Se dá para subir depois', b: 'Would there be room to review that after three months?' },
              { a: 'Até quando esperar resposta', b: 'When will you let me know?' },
            ],
            expected: 'pares',
            stage: 4,
          },
          {
            key: 'm42-4', type: 'Monte a frase',
            instruction: 'Pergunte pelo valor da hora.',
            question: '',
            kind: 'order',
            tokens: ['rate', 'hourly', 'the', "what's"],
            expected: "What's the hourly rate",
            compare: 'loose',
            audio: { text: "What's the hourly rate?", afterAnswer: true },
            stage: 6,
          },
          {
            key: 'm42-5', type: 'Ouça e escreva',
            instruction: 'Ouça e escreva a pergunta que separa bruto de líquido.',
            question: 'Is that before or after tax?',
            audio: { text: 'Is that before or after tax?', isQuestion: true },
            expected: 'Is that before or after tax',
            compare: 'loose',
            stage: 7,
          },
        ],
      },
      { tipo: 'simulacao', simulacaoId: 'entrevista-cozinha' },
      { tipo: 'resumo' },
    ],
  },
]
