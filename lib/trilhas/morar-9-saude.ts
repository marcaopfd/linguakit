import type { Licao } from './tipos'

/**
 * Módulo 9 — Médico, escola e burocracia.
 *
 * O sistema de saúde fora do Brasil funciona por porta de entrada: você não
 * escolhe o especialista, você fala com o clínico geral — o GP — e ele
 * decide. Quem não sabe disso liga para o lugar errado e espera semanas.
 */
export const LICOES_SAUDE: Licao[] = [
  {
    id: 'morar-9-1',
    titulo: 'Marcar consulta e explicar o sintoma',
    consegue: 'Você consegue marcar consulta com o clínico geral e explicar o que está sentindo.',
    minutos: 13,
    blocos: [
      {
        tipo: 'situacao',
        texto: 'Você acordou mal e precisa de médico. Fora do Brasil quase tudo começa no GP — o clínico geral do seu bairro —, e é ele quem encaminha para especialista. A ligação tem três partes: quem você é, o que está sentindo, e desde quando.',
      },
      {
        tipo: 'frases',
        frases: [
          { en: "I'd like to book an appointment with the GP.", pt: 'Queria marcar uma consulta com o clínico geral.', armadilha: '"GP" é general practitioner, o clínico geral. É a porta de entrada: sem ele, não se chega ao especialista.' },
          { en: "I'm registered at this practice.", pt: 'Sou cadastrado nesta clínica.', armadilha: '"Practice" aqui é a clínica, não "prática". E é preciso estar "registered" antes de precisar.' },
          { en: 'How soon can I be seen?', pt: 'Para quando consegue me atender?' },
          { en: "It's quite urgent.", pt: 'É bastante urgente.' },
          { en: "I've had a sore throat and a fever since Monday.", pt: 'Estou com dor de garganta e febre desde segunda.' },
          { en: 'Do I need a referral?', pt: 'Preciso de encaminhamento?', armadilha: '"Referral" é o encaminhamento que o GP dá para o especialista. Sem ele, o especialista não atende.' },
          { en: "Is this covered by my insurance?", pt: 'Meu seguro cobre isso?' },
        ],
      },
      {
        tipo: 'pratica',
        itens: [
          {
            key: 'n91-1', type: 'Escolha a resposta',
            instruction: 'Você está com dor no joelho há semanas. Para quem você liga primeiro?',
            question: '',
            options: ["I'd like to book an appointment with the GP.", 'I want to see a knee specialist.', 'I need to go to the hospital.'],
            answerIndex: 0,
            expected: "I'd like to book an appointment with the GP.",
            why: 'O GP é a porta de entrada: é ele que dá o "referral" para o especialista. Ligar direto para o especialista é perder semanas.',
            audio: { text: "I'd like to book an appointment with the GP.", afterAnswer: true },
            optionsSpeak: true,
            stage: 2,
          },
          {
            key: 'n91-2', type: 'Ouça e escolha',
            instruction: 'A recepção respondeu. O que foi dito?',
            question: 'The earliest we have is Thursday morning, unless it is urgent.',
            audio: { text: 'The earliest we have is Thursday morning, unless it is urgent.', isQuestion: true },
            options: ['O mais cedo é quinta de manhã, a não ser que seja urgente', 'Só atendem às quintas', 'Não há vaga esta semana', 'Precisa vir agora de manhã'],
            answerIndex: 0,
            expected: 'O mais cedo é quinta de manhã, a não ser que seja urgente',
            why: 'Se for urgente, diga: "it\'s quite urgent". Quase sempre abrem um horário no mesmo dia.',
            stage: 1,
          },
          {
            key: 'n91-3', type: 'Combine os pares',
            instruction: 'Ligue a palavra do sistema de saúde ao que ela é.',
            question: '',
            kind: 'pares',
            pares: [
              { a: 'Clínico geral', b: 'GP' },
              { a: 'A clínica onde você é cadastrado', b: 'Practice' },
              { a: 'Encaminhamento ao especialista', b: 'Referral' },
              { a: 'Receita do remédio', b: 'Prescription' },
            ],
            expected: 'pares',
            stage: 4,
          },
          {
            key: 'n91-4', type: 'Monte a frase',
            instruction: 'Diga o sintoma e desde quando.',
            question: '',
            kind: 'order',
            tokens: ['Monday', 'since', 'fever', 'a', 'and', 'throat', 'sore', 'a', 'had', "I've"],
            expected: "I've had a sore throat and a fever since Monday",
            compare: 'loose',
            audio: { text: "I've had a sore throat and a fever since Monday.", afterAnswer: true },
            stage: 6,
          },
          {
            key: 'n91-5', type: 'Ouça e escreva',
            instruction: 'Ouça e escreva a pergunta que destrava o especialista.',
            question: 'Do I need a referral?',
            audio: { text: 'Do I need a referral?', isQuestion: true },
            expected: 'Do I need a referral',
            compare: 'loose',
            stage: 7,
          },
        ],
      },
      { tipo: 'resumo' },
    ],
  },

  {
    id: 'morar-9-2',
    titulo: 'Escola do filho e papelada do governo',
    consegue: 'Você consegue falar com a escola do seu filho e resolver a burocracia sem travar.',
    minutos: 12,
    blocos: [
      {
        tipo: 'situacao',
        texto: 'Matricular o filho, entender o bilhete que veio na mochila, avisar que ele não vai à aula. São conversas curtas, mas com palavras próprias — e nenhuma delas aparece em curso de inglês geral.',
      },
      {
        tipo: 'frases',
        frases: [
          { en: "I'd like to enrol my son in school.", pt: 'Queria matricular meu filho na escola.', armadilha: 'No Reino Unido e na Irlanda escreve-se "enrol"; nos Estados Unidos, "enroll". As duas se dizem igual.' },
          { en: 'He will be off school today — he is unwell.', pt: 'Ele não vai à aula hoje — está doente.', armadilha: '"Off school" é faltar à aula. "Unwell" é o jeito educado de dizer doente.' },
          { en: 'What do I need to bring?', pt: 'O que preciso levar?' },
          { en: 'Is there a waiting list?', pt: 'Tem lista de espera?' },
          { en: 'Could you explain this letter to me?', pt: 'Pode me explicar esta carta?' },
          { en: 'When is parents evening?', pt: 'Quando é a reunião de pais?', armadilha: '"Parents evening" é a reunião de pais com os professores. Nos Estados Unidos é "parent-teacher conference".' },
          { en: 'He needs extra help with English.', pt: 'Ele precisa de reforço em inglês.' },
        ],
      },
      {
        tipo: 'pratica',
        itens: [
          {
            key: 'n92-1', type: 'Escolha a resposta',
            instruction: 'Seu filho acordou com febre. O que você diz na secretaria?',
            question: '',
            options: ['He will be off school today — he is unwell.', 'He not goes to school, he is sick.', 'My son is bad today.'],
            answerIndex: 0,
            expected: 'He will be off school today — he is unwell.',
            why: '"Off school" é a expressão para faltar à aula, e "unwell" é como se diz doente sem dramatizar.',
            audio: { text: 'He will be off school today — he is unwell.', afterAnswer: true },
            optionsSpeak: true,
            stage: 2,
          },
          {
            key: 'n92-2', type: 'Ouça e escolha',
            instruction: 'A secretária respondeu. O que ela disse?',
            question: 'You will need his birth certificate and a proof of address.',
            audio: { text: 'You will need his birth certificate and a proof of address.', isQuestion: true },
            options: ['Certidão de nascimento e comprovante de endereço', 'Só o passaporte dele', 'Boletim da escola anterior', 'Carteira de vacinação'],
            answerIndex: 0,
            expected: 'Certidão de nascimento e comprovante de endereço',
            stage: 1,
          },
          {
            key: 'n92-3', type: 'Combine os pares',
            instruction: 'Ligue o termo da escola ao que ele é.',
            question: '',
            kind: 'pares',
            pares: [
              { a: 'Matricular', b: 'Enrol' },
              { a: 'Faltar à aula', b: 'Be off school' },
              { a: 'Reunião de pais', b: 'Parents evening' },
              { a: 'Reforço escolar', b: 'Extra help' },
            ],
            expected: 'pares',
            stage: 4,
          },
          {
            key: 'n92-4', type: 'Monte a frase',
            instruction: 'Peça ajuda para entender um documento.',
            question: '',
            kind: 'order',
            tokens: ['me', 'to', 'letter', 'this', 'explain', 'you', 'could'],
            expected: 'Could you explain this letter to me',
            compare: 'loose',
            audio: { text: 'Could you explain this letter to me?', afterAnswer: true },
            stage: 6,
          },
          {
            key: 'n92-5', type: 'Ouça e escreva',
            instruction: 'Ouça e escreva.',
            question: 'What do I need to bring?',
            audio: { text: 'What do I need to bring?', isQuestion: true },
            expected: 'What do I need to bring',
            compare: 'loose',
            stage: 7,
          },
        ],
      },
      { tipo: 'resumo' },
    ],
  },
]
