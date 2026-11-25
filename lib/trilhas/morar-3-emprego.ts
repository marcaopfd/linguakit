import type { Licao } from './tipos'

/**
 * Módulo 3 — Procurando emprego.
 *
 * Antes da entrevista vem a parte que elimina mais gente: ler o anúncio e
 * escrever o e-mail. Currículo lá fora é uma página, sem foto e sem número de
 * documento — e quem manda o modelo brasileiro é descartado antes de alguém
 * ler o nome.
 */
export const LICOES_EMPREGO: Licao[] = [
  {
    id: 'morar-3-1',
    titulo: 'Entender o anúncio',
    consegue: 'Você consegue ler um anúncio de vaga e saber se ela serve para você antes de perder tempo.',
    minutos: 12,
    blocos: [
      {
        tipo: 'situacao',
        texto: 'Cinquenta vagas na tela e cada uma com o mesmo bloco de palavras. Metade delas decide se vale candidatar-se: se é meio período, se pede experiência, se paga por hora ou por ano, e se aceita quem ainda não tem carro.',
      },
      {
        tipo: 'frases',
        frases: [
          { en: 'Full-time / part-time', pt: 'Período integral / meio período' },
          { en: 'No experience necessary.', pt: 'Não é necessária experiência.', armadilha: 'A frase que você procura quando está chegando. Aparece muito em restaurante, limpeza e armazém.' },
          { en: 'Immediate start.', pt: 'Início imediato.' },
          { en: 'Must have own transport.', pt: 'Precisa ter transporte próprio.', armadilha: 'Quer dizer carro. Sem carro, não adianta se candidatar — e muita gente perde o dia descobrindo isso na entrevista.' },
          { en: 'Shift work, including weekends.', pt: 'Trabalho por turnos, incluindo fins de semana.' },
          { en: 'Competitive salary.', pt: 'Salário compatível com o mercado.', armadilha: 'Na prática quer dizer "não vamos dizer quanto". Pergunte o valor da hora no primeiro contato.' },
          { en: 'Apply with CV and cover letter.', pt: 'Candidate-se com currículo e carta de apresentação.' },
        ],
      },
      {
        tipo: 'pratica',
        itens: [
          {
            key: 'n31-1', type: 'Ouça e escolha',
            instruction: 'O anúncio diz isto. Você tem carro?',
            question: 'Must have own transport.',
            audio: { text: 'Must have own transport.', isQuestion: true },
            options: ['Precisa ter carro próprio', 'A empresa oferece transporte', 'Precisa morar perto', 'O transporte é reembolsado'],
            answerIndex: 0,
            expected: 'Precisa ter carro próprio',
            why: '"Own transport" é o seu próprio carro. Se a empresa desse transporte, o anúncio diria "transport provided".',
            stage: 1,
          },
          {
            key: 'n31-2', type: 'Combine os pares',
            instruction: 'Ligue o que o anúncio diz ao que ele quer dizer.',
            question: '',
            kind: 'pares',
            pares: [
              { a: 'Pode começar sem experiência', b: 'No experience necessary' },
              { a: 'Querem alguém para já', b: 'Immediate start' },
              { a: 'Vai trabalhar fim de semana', b: 'Shift work, including weekends' },
              { a: 'Não vão dizer o valor no anúncio', b: 'Competitive salary' },
            ],
            expected: 'pares',
            stage: 4,
          },
          {
            key: 'n31-3', type: 'Escolha a resposta',
            instruction: 'Você quer trabalhar 20 horas por semana. Qual anúncio serve?',
            question: '',
            options: ['Part-time, 20 hours a week', 'Full-time, 39 hours a week', 'Shift work, 45 hours a week'],
            answerIndex: 0,
            expected: 'Part-time, 20 hours a week',
            why: '"Part-time" é meio período. "Full-time" costuma ser de 35 a 40 horas.',
            audio: { text: 'Part-time, 20 hours a week.', afterAnswer: true },
            optionsSpeak: true,
            stage: 2,
          },
          {
            key: 'n31-4', type: 'Ouça e escreva',
            instruction: 'Ouça e escreva a frase que você procura nos anúncios.',
            question: 'No experience necessary.',
            audio: { text: 'No experience necessary.', isQuestion: true },
            expected: 'No experience necessary',
            compare: 'loose',
            stage: 7,
          },
          {
            key: 'n31-5', type: 'Qual é mais educado',
            instruction: 'Você vai perguntar o valor da hora por mensagem. Qual você manda?',
            question: '',
            options: ['How much you pay?', 'Could you tell me what the hourly rate is?'],
            answerIndex: 1,
            expected: 'Could you tell me what the hourly rate is?',
            why: 'A pergunta é a mesma, mas a segunda soa como alguém que você contrataria. A primeira, por escrito, parece rude mesmo sem intenção.',
            audio: { text: 'Could you tell me what the hourly rate is?', afterAnswer: true },
            optionsSpeak: true,
            stage: 3,
          },
        ],
      },
      { tipo: 'resumo' },
    ],
  },

  {
    id: 'morar-3-2',
    titulo: 'O e-mail de candidatura',
    consegue: 'Você consegue escrever o e-mail que faz abrirem o seu currículo.',
    minutos: 13,
    blocos: [
      {
        tipo: 'situacao',
        texto: 'O e-mail tem quatro linhas e decide se alguém abre o anexo: onde você viu a vaga, quem você é, por que serve, e quando pode começar. Mais do que isso ninguém lê.',
      },
      {
        tipo: 'frases',
        frases: [
          { en: "I'm writing about the kitchen porter position advertised on Indeed.", pt: 'Escrevo sobre a vaga de auxiliar de cozinha anunciada no Indeed.', armadilha: '"I\'m writing about…" é a abertura padrão de e-mail profissional. Diga logo onde viu a vaga.' },
          { en: 'Please find my CV attached.', pt: 'Segue meu currículo em anexo.', armadilha: 'É a frase feita. "I send in attachment my curriculum" é tradução direta e entrega que você não escreve inglês.' },
          { en: 'I have three years of experience in busy kitchens.', pt: 'Tenho três anos de experiência em cozinhas movimentadas.' },
          { en: "I'm available for an interview any day this week.", pt: 'Estou disponível para entrevista qualquer dia desta semana.' },
          { en: 'I look forward to hearing from you.', pt: 'Fico no aguardo.', armadilha: 'O fecho padrão. Depois dele vai "Kind regards" e o seu nome, nessa ordem.' },
          { en: 'Kind regards,', pt: 'Atenciosamente,' },
          { en: 'Thank you for your time.', pt: 'Obrigado pelo seu tempo.' },
        ],
      },
      {
        tipo: 'pratica',
        itens: [
          {
            key: 'n32-1', type: 'Escolha a resposta',
            instruction: 'Como você anexa o currículo, por escrito?',
            question: '',
            options: ['Please find my CV attached.', 'I send in attachment my curriculum.', 'My CV is going together.'],
            answerIndex: 0,
            expected: 'Please find my CV attached.',
            why: 'É a frase feita que todo recrutador lê sem reparar — e é exatamente isso que você quer. As outras duas entregam a tradução.',
            audio: { text: 'Please find my CV attached.', afterAnswer: true },
            optionsSpeak: true,
            stage: 2,
          },
          {
            key: 'n32-2', type: 'Complete o diálogo',
            instruction: 'Complete a abertura do e-mail.',
            question: 'Dear Sarah,\n\n___ the kitchen porter position advertised on Indeed.',
            options: ["I'm writing about", 'I write for', 'This email is of'],
            answerIndex: 0,
            expected: "I'm writing about",
            audio: { text: "I'm writing about the kitchen porter position advertised on Indeed.", afterAnswer: true },
            stage: 5,
          },
          {
            key: 'n32-3', type: 'Combine os pares',
            instruction: 'Ligue cada linha do e-mail ao seu lugar.',
            question: '',
            kind: 'pares',
            pares: [
              { a: 'Abertura', b: "I'm writing about the position advertised on Indeed." },
              { a: 'O anexo', b: 'Please find my CV attached.' },
              { a: 'Disponibilidade', b: "I'm available for an interview any day this week." },
              { a: 'Fecho', b: 'I look forward to hearing from you.' },
            ],
            expected: 'pares',
            stage: 4,
          },
          {
            key: 'n32-4', type: 'Monte a frase',
            instruction: 'Monte a linha da experiência.',
            question: '',
            kind: 'order',
            tokens: ['kitchens', 'busy', 'in', 'experience', 'of', 'years', 'three', 'have', 'I'],
            expected: 'I have three years of experience in busy kitchens',
            compare: 'loose',
            audio: { text: 'I have three years of experience in busy kitchens.', afterAnswer: true },
            stage: 6,
          },
          {
            key: 'n32-5', type: 'Ouça e escreva',
            instruction: 'Ouça e escreva o fecho padrão.',
            question: 'I look forward to hearing from you.',
            audio: { text: 'I look forward to hearing from you.', isQuestion: true },
            expected: 'I look forward to hearing from you',
            compare: 'loose',
            stage: 7,
          },
        ],
      },
      { tipo: 'resumo' },
    ],
  },
]
