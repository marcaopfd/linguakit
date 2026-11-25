import type { Licao } from './tipos'

/**
 * Módulo 10 — Vida social.
 *
 * O último módulo é o que decide se a pessoa fica. Trabalho e aluguel se
 * resolvem com frase decorada; amizade, não — e é a falta dela que faz gente
 * voltar depois de um ano com o inglês funcionando.
 *
 * Duas coisas travam o brasileiro no pub: a rodada (quem paga o quê) e o
 * humor, que lá fora é seco e dito com cara séria.
 */
export const LICOES_SOCIAL: Licao[] = [
  {
    id: 'morar-10-1',
    titulo: 'No pub e a regra da rodada',
    consegue: 'Você consegue pedir no bar, entender a regra da rodada e não pagar sozinho a noite inteira.',
    minutos: 12,
    blocos: [
      {
        tipo: 'situacao',
        texto: 'Te chamaram para o pub depois do trabalho. Existe uma regra que ninguém explica e todo mundo segue: cada um paga uma rodada para o grupo inteiro, na sua vez. Quem nunca compra a sua rodada vira assunto; quem compra duas, vira amigo.',
      },
      {
        tipo: 'frases',
        frases: [
          { en: "What are you having?", pt: 'O que você vai querer?', armadilha: 'Quem pergunta isso está pagando. Se perguntarem a você, pode pedir — e a sua vez vem depois.' },
          { en: "It's my round.", pt: 'Esta rodada é minha.', armadilha: 'A regra do pub: cada um paga uma rodada para o grupo. Não oferecer a sua é o jeito mais rápido de não ser chamado de novo.' },
          { en: 'Same again, please.', pt: 'Mais um igual, por favor.' },
          { en: "I'm driving, so just a Coke for me.", pt: 'Estou dirigindo, então só uma Coca para mim.', armadilha: 'Ninguém insiste quando você diz isso. É a saída educada para não beber.' },
          { en: 'Cheers!', pt: 'Saúde! / Valeu! / Obrigado!', armadilha: 'No Reino Unido e na Irlanda "cheers" é brinde, obrigado e tchau — as três coisas, o tempo todo.' },
          { en: 'Do you fancy getting something to eat?', pt: 'Topa comer alguma coisa?', armadilha: '"Fancy" é "ter vontade de". "Do you fancy…?" é o convite mais comum entre britânicos e irlandeses.' },
          { en: 'I should head off, early start tomorrow.', pt: 'Vou indo, amanhã acordo cedo.' },
        ],
      },
      {
        tipo: 'pratica',
        itens: [
          {
            key: 'na1-1', type: 'Ouça e escolha',
            instruction: 'Chegando no pub, um colega diz isto. O que acontece?',
            question: "What are you having? It's my round.",
            audio: { text: "What are you having? It's my round.", isQuestion: true },
            options: ['Ele está pagando esta rodada — peça o seu', 'Ele quer saber o que você bebe normalmente', 'Cada um paga o seu', 'Ele quer que você vá ao balcão'],
            answerIndex: 0,
            expected: 'Ele está pagando esta rodada — peça o seu',
            why: 'Quem diz "it\'s my round" está pagando para o grupo. Recusar é esquisito; a sua vez vem na rodada seguinte.',
            stage: 1,
          },
          {
            key: 'na1-2', type: 'Escolha a resposta',
            instruction: 'Já é a terceira rodada e você ainda não pagou nenhuma. O que diz?',
            question: '',
            options: ["It's my round — what are you having?", 'I pay the next one maybe.', 'Now is my turn to buy.'],
            answerIndex: 0,
            expected: "It's my round — what are you having?",
            why: 'É a frase exata, e dizê-la na hora certa vale mais socialmente do que qualquer inglês bonito.',
            audio: { text: "It's my round — what are you having?", afterAnswer: true },
            optionsSpeak: true,
            stage: 2,
          },
          {
            key: 'na1-3', type: 'Combine os pares',
            instruction: 'Ligue a frase ao momento.',
            question: '',
            kind: 'pares',
            pares: [
              { a: 'Quero o mesmo de novo', b: 'Same again, please.' },
              { a: 'Não vou beber hoje', b: "I'm driving, so just a Coke for me." },
              { a: 'Convidar para comer', b: 'Do you fancy getting something to eat?' },
              { a: 'Hora de ir embora', b: 'I should head off, early start tomorrow.' },
            ],
            expected: 'pares',
            stage: 4,
          },
          {
            key: 'na1-4', type: 'Monte a frase',
            instruction: 'Convide o pessoal para comer.',
            question: '',
            kind: 'order',
            tokens: ['eat', 'to', 'something', 'getting', 'fancy', 'you', 'do'],
            expected: 'Do you fancy getting something to eat',
            compare: 'loose',
            audio: { text: 'Do you fancy getting something to eat?', afterAnswer: true },
            stage: 6,
          },
          {
            key: 'na1-5', type: 'Ouça e escreva',
            instruction: 'Ouça e escreva a palavra que serve para tudo.',
            question: 'Cheers!',
            audio: { text: 'Cheers!', isQuestion: true },
            expected: 'Cheers',
            compare: 'loose',
            stage: 7,
          },
        ],
      },
      { tipo: 'resumo' },
    ],
  },

  {
    id: 'morar-10-2',
    titulo: 'Gíria, ironia e fazer amigo',
    consegue: 'Você consegue sacar a ironia, responder a uma gíria e marcar de sair de novo.',
    minutos: 13,
    blocos: [
      {
        tipo: 'situacao',
        texto: 'Chove há três dias e o colega diz "lovely weather, isn\'t it?" com cara séria. Ele não está confuso: está sendo irônico, e esperar que você entre na brincadeira. Essa é a parte do inglês que nenhum livro ensina.',
      },
      {
        tipo: 'frases',
        frases: [
          { en: "Lovely weather, isn't it?", pt: 'Tempo ótimo, né?', armadilha: 'Dito debaixo de chuva, é ironia. A resposta certa é entrar na piada: "gorgeous, as always".' },
          { en: "You alright?", pt: 'Tudo bem?', armadilha: 'No Reino Unido e na Irlanda isto é "oi", não uma pergunta sobre a sua saúde. Responde-se "yeah, you?" e segue andando.' },
          { en: 'Not bad, yourself?', pt: 'Tudo certo, e você?' },
          { en: "That's grand.", pt: 'Está ótimo.', armadilha: 'Na Irlanda, "grand" quer dizer que está tudo bem — não que é grandioso. Ouve-se cinquenta vezes por dia.' },
          { en: 'I was only joking.', pt: 'Era só brincadeira.' },
          { en: 'We should do this again.', pt: 'A gente devia repetir.', armadilha: 'É assim que se transforma um encontro em amizade. Diga na saída, não no dia seguinte.' },
          { en: "Give me a shout if you're around.", pt: 'Me chama se você estiver por perto.' },
        ],
      },
      {
        tipo: 'pratica',
        itens: [
          {
            key: 'na2-1', type: 'Ouça e escolha',
            instruction: 'Chove sem parar e o colega diz isto. O que ele quer dizer?',
            question: "Lovely weather, isn't it?",
            audio: { text: "Lovely weather, isn't it?", isQuestion: true },
            options: ['Está sendo irônico — o tempo está horrível', 'Ele gosta mesmo de chuva', 'Está perguntando a previsão', 'Quer que você feche a janela'],
            answerIndex: 0,
            expected: 'Está sendo irônico — o tempo está horrível',
            why: 'Ironia britânica é dita com cara séria. A resposta esperada é entrar na brincadeira, não concordar a sério.',
            stage: 1,
          },
          {
            key: 'na2-2', type: 'Escolha a resposta',
            instruction: 'Um colega passa por você e diz "You alright?". O que você responde?',
            question: 'You alright?',
            options: ['Not bad, yourself?', 'No, I am sick today.', 'Yes, why? Do I look bad?'],
            answerIndex: 0,
            expected: 'Not bad, yourself?',
            why: '"You alright?" ali é só "oi". Responder sobre a sua saúde deixa os dois constrangidos.',
            audio: { text: 'Not bad, yourself?', afterAnswer: true },
            optionsSpeak: true,
            stage: 2,
          },
          {
            key: 'na2-3', type: 'Combine os pares',
            instruction: 'Ligue a gíria ao que ela quer dizer de verdade.',
            question: '',
            kind: 'pares',
            pares: [
              { a: 'Oi, tudo bem?', b: 'You alright?' },
              { a: 'Está tudo certo', b: "That's grand." },
              { a: 'Topa?', b: 'Do you fancy it?' },
              { a: 'Me chama', b: 'Give me a shout.' },
            ],
            expected: 'pares',
            stage: 4,
          },
          {
            key: 'na2-4', type: 'Monte a frase',
            instruction: 'Transforme o encontro em amizade, na saída.',
            question: '',
            kind: 'order',
            tokens: ['again', 'this', 'do', 'should', 'we'],
            expected: 'We should do this again',
            compare: 'loose',
            audio: { text: 'We should do this again.', afterAnswer: true },
            stage: 6,
          },
          {
            key: 'na2-5', type: 'Ouça e escreva',
            instruction: 'Ouça e escreva o convite aberto.',
            question: "Give me a shout if you're around.",
            audio: { text: "Give me a shout if you're around.", isQuestion: true },
            expected: 'Give me a shout if youre around',
            compare: 'loose',
            stage: 7,
          },
        ],
      },
      { tipo: 'resumo' },
    ],
  },
]
