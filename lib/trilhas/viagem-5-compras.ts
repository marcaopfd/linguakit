import type { Licao } from './tipos'

/**
 * Módulo 5 — Perguntar preço e comprar.
 *
 * Vem antes da barganha de propósito: primeiro você aprende a perguntar e a
 * pagar em loja, onde o preço é fixo; depois, no módulo 6, aprende a derrubar
 * preço onde ele não é.
 */
export const LICOES_COMPRAS: Licao[] = [
  {
    id: 'viagem-5-1',
    titulo: 'Tamanho, cor e provar',
    consegue: 'Você consegue perguntar preço, pedir outro tamanho ou cor e experimentar antes de levar.',
    minutos: 12,
    blocos: [
      {
        tipo: 'situacao',
        texto: 'Você achou uma jaqueta que gostou, mas a etiqueta está numa numeração que você não conhece e a cor exposta não é a que você quer. Quatro frases resolvem a loja inteira.',
      },
      {
        tipo: 'frases',
        frases: [
          { en: 'How much is this?', pt: 'Quanto custa isto?' },
          { en: 'Do you have this in a medium?', pt: 'Tem este no M?', armadilha: 'Tamanho em inglês vira palavra: small, medium, large. Dizer "size M" funciona, mas ninguém fala assim.' },
          { en: 'Do you have it in black?', pt: 'Tem na cor preta?' },
          { en: 'Can I try it on?', pt: 'Posso experimentar?', armadilha: '"Try on" é só para roupa e sapato: o "on" é que faz vestir. Sem ele, "try it" é provar comida.' },
          { en: 'Where are the fitting rooms?', pt: 'Onde fica o provador?' },
          { en: "It's a bit tight.", pt: 'Ficou um pouco apertado.' },
          { en: "I'm just browsing, thanks.", pt: 'Só estou dando uma olhada, obrigado.' },
        ],
      },
      {
        tipo: 'pratica',
        itens: [
          {
            key: 'v51-1', type: 'Escolha a resposta',
            instruction: 'Você quer provar a jaqueta. O que pergunta?',
            question: '',
            options: ['Can I try it on?', 'Can I prove it?', 'Can I experiment it?'],
            answerIndex: 0,
            expected: 'Can I try it on?',
            why: '"Prove" é comprovar e "experiment" é fazer experiência científica. Vestir para ver se serve é "try on".',
            audio: { text: 'Can I try it on?', afterAnswer: true },
            optionsSpeak: true,
            stage: 2,
          },
          {
            key: 'v51-2', type: 'Combine os pares',
            instruction: 'Ligue o que você quer ao que você diz.',
            question: '',
            kind: 'pares',
            pares: [
              { a: 'Quero outro tamanho', b: 'Do you have this in a medium?' },
              { a: 'Quero outra cor', b: 'Do you have it in black?' },
              { a: 'Ficou apertado', b: "It's a bit tight." },
              { a: 'Só estou olhando', b: "I'm just browsing, thanks." },
            ],
            expected: 'pares',
            stage: 4,
          },
          {
            key: 'v51-3', type: 'Ouça e escolha',
            instruction: 'A vendedora respondeu. O que ela disse?',
            question: "Sorry, we've only got it in large.",
            audio: { text: "Sorry, we've only got it in large.", isQuestion: true },
            options: ['Só tem no tamanho G', 'Só tem na cor clara', 'Acabou o estoque', 'Chega amanhã'],
            answerIndex: 0,
            expected: 'Só tem no tamanho G',
            stage: 1,
          },
          {
            key: 'v51-4', type: 'Monte a frase',
            instruction: 'Pergunte onde é o provador.',
            question: '',
            kind: 'order',
            tokens: ['rooms', 'fitting', 'the', 'are', 'where'],
            expected: 'Where are the fitting rooms',
            compare: 'loose',
            audio: { text: 'Where are the fitting rooms?', afterAnswer: true },
            stage: 6,
          },
          {
            key: 'v51-5', type: 'Ouça e escreva',
            instruction: 'Ouça e escreva.',
            question: 'How much is this?',
            audio: { text: 'How much is this?', isQuestion: true },
            expected: 'How much is this',
            compare: 'loose',
            stage: 7,
          },
        ],
      },
      { tipo: 'resumo' },
    ],
  },

  {
    id: 'viagem-5-2',
    titulo: 'Pagar, nota e troca',
    consegue: 'Você consegue pagar do jeito que quiser, pedir a nota e trocar o que não serviu.',
    minutos: 12,
    blocos: [
      {
        tipo: 'situacao',
        texto: 'Na fila do caixa vem a pergunta que todo turista trava: "card or cash?". Depois vem o recibo — que você vai querer, porque sem ele não se troca nada, e porque em alguns países dá para pedir o imposto de volta no aeroporto.',
      },
      {
        tipo: 'frases',
        frases: [
          { en: "Card, please.", pt: 'No cartão, por favor.' },
          { en: 'Can I have the receipt?', pt: 'Pode me dar o recibo?', armadilha: '"Receipt" se diz "ri-SSIT" — o P é mudo. E não é "invoice", que é nota fiscal de empresa.' },
          { en: 'Do you take contactless?', pt: 'Aceita por aproximação?' },
          { en: 'Can I get a refund?', pt: 'Posso pedir o dinheiro de volta?' },
          { en: "I'd like to exchange this.", pt: 'Queria trocar isto.' },
          { en: "It doesn't fit.", pt: 'Não serviu.', armadilha: '"Fit" é servir no corpo. "It doesn\'t serve" não existe nesse sentido em inglês.' },
          { en: 'Do you do tax free?', pt: 'Vocês fazem tax free?' },
        ],
      },
      {
        tipo: 'pratica',
        itens: [
          {
            key: 'v52-1', type: 'Ouça e escolha',
            instruction: 'No caixa, a atendente perguntou:',
            question: 'Card or cash?',
            audio: { text: 'Card or cash?', isQuestion: true },
            options: ['Cartão ou dinheiro', 'Crédito ou débito', 'Com sacola ou sem', 'Recibo ou não'],
            answerIndex: 0,
            expected: 'Cartão ou dinheiro',
            stage: 1,
          },
          {
            key: 'v52-2', type: 'Escolha a resposta',
            instruction: 'A calça não serviu e você quer trocar. O que diz?',
            question: '',
            options: ["I'd like to exchange this — it doesn't fit.", "I want to change this, it doesn't serve.", 'This is wrong size, give other.'],
            answerIndex: 0,
            expected: "I'd like to exchange this — it doesn't fit.",
            why: 'Trocar produto é "exchange"; "change" sozinho é trocar dinheiro. E roupa que não serve "doesn\'t fit".',
            audio: { text: "I'd like to exchange this — it doesn't fit.", afterAnswer: true },
            optionsSpeak: true,
            stage: 2,
          },
          {
            key: 'v52-3', type: 'Combine os pares',
            instruction: 'Ligue a situação à frase.',
            question: '',
            kind: 'pares',
            pares: [
              { a: 'Quero o dinheiro de volta', b: 'Can I get a refund?' },
              { a: 'Quero o comprovante', b: 'Can I have the receipt?' },
              { a: 'Vou pagar por aproximação', b: 'Do you take contactless?' },
              { a: 'Quero pedir o imposto de volta', b: 'Do you do tax free?' },
            ],
            expected: 'pares',
            stage: 4,
          },
          {
            key: 'v52-4', type: 'Monte a frase',
            instruction: 'Peça o recibo.',
            question: '',
            kind: 'order',
            tokens: ['receipt', 'the', 'have', 'I', 'can'],
            expected: 'Can I have the receipt',
            compare: 'loose',
            audio: { text: 'Can I have the receipt?', afterAnswer: true },
            stage: 6,
          },
          {
            key: 'v52-5', type: 'Ouça e escreva',
            instruction: 'Ouça e escreva. Cuidado com o P mudo.',
            question: 'Can I have the receipt?',
            audio: { text: 'Can I have the receipt?', isQuestion: true },
            expected: 'Can I have the receipt',
            compare: 'loose',
            stage: 7,
          },
        ],
      },
      { tipo: 'resumo' },
    ],
  },
]
