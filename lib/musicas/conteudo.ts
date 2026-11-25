import type { ConteudoMusica } from './tipos'

/**
 * O conteúdo escrito de cada música, pelo videoId.
 *
 * Regra de casa, sem exceção: nenhuma letra aqui. O `tema` é comentário
 * nosso sobre o assunto da música — o tipo de coisa que se lê na contracapa
 * de um disco. O `vocabulario` é o inglês do tema, escolhido para servir
 * depois do play também: "How much is it?" vale na loja, não só na música.
 * Quando uma expressão curta é o próprio título ou a ideia central, ela
 * entra nomeada como tal, que é o que se pode citar.
 *
 * As perguntas vêm em par: uma de sentido (do que isso fala?) e uma de
 * língua (como se diz isso?). Nenhuma pede a letra de volta.
 */
export const CONTEUDO: Record<string, ConteudoMusica> = {
  // ——— Pop ———
  JGwWNGJdvx8: {
    artista: 'Ed Sheeran',
    nome: 'Shape of You',
    familia: 'pop',
    tema: 'Paquera. O cantor conhece alguém numa noite fora e se encanta — pelo corpo, pelo jeito, pela noite inteira. O clipe conta outra história por cima: ele treina boxe e se apaixona na academia.',
    vocabulario: [
      { en: 'shape', pt: 'forma, o jeito do corpo', nota: 'No título, "the shape of you" é o corpo dela, não figura geométrica.' },
      { en: 'to fall in love with someone', pt: 'se apaixonar por alguém', nota: 'Sempre "fall in love WITH". "Fall in love ON" não existe.' },
      { en: "Let's grab a drink.", pt: 'Vamos tomar algo.', nota: 'Convite informal. "Grab" aqui é "pegar rapidinho".' },
    ],
    perguntas: [
      {
        pergunta: 'A música fala de que situação?',
        opcoes: ['Conhecer alguém numa noite fora e se encantar', 'Terminar um namoro de dez anos', 'Voltar para a cidade onde nasceu'],
        resposta: 0,
        porque: 'É uma música de paquera: o encontro, a atração, a noite.',
      },
      {
        pergunta: 'Qual frase um inglês usaria para chamar alguém para sair?',
        opcoes: ["Let's grab a drink.", "Let's make a drink.", "Let's take a drink."],
        resposta: 0,
        porque: '"Grab a drink" é a expressão feita. "Make a drink" é preparar a bebida em casa.',
      },
    ],
    tarefas: [
      'Escreva em inglês uma frase que você conseguiu pegar de ouvido, mesmo faltando uma palavra. Depois ouça de novo em 0,75× e complete.',
      'Em uma frase, em português: o que o cantor quer dessa pessoa?',
    ],
  },
  EkHTsc9PU2A: {
    artista: 'Jason Mraz',
    nome: "I'm Yours",
    familia: 'pop',
    tema: 'A decisão de parar de enrolar. Depois de muito pensar se vale a pena, ele se entrega: é seu, e pronto. Cantado devagar, com ukulele — a música mais fácil do lote para quem está começando a ouvir.',
    vocabulario: [
      { en: "I'm yours.", pt: 'Sou seu. / Sou sua.', nota: 'Possessivo com "be": I\'m yours, it\'s mine, they\'re ours.' },
      { en: 'to take a chance on someone', pt: 'se arriscar com alguém', nota: '"Take a chance on me" = arrisca comigo.' },
      { en: 'laid-back', pt: 'tranquilo, de boa', nota: 'Serve para o clima da música e para descrever uma pessoa.' },
    ],
    perguntas: [
      {
        pergunta: 'O que o cantor decide na música?',
        opcoes: ['Parar de enrolar e se entregar', 'Terminar e viajar sozinho', 'Pedir demissão'],
        resposta: 0,
        porque: 'O título já é a decisão: "sou seu".',
      },
      {
        pergunta: 'Como se traduz "I\'m yours"?',
        opcoes: ['Sou seu', 'Está meu', 'Eu tenho você'],
        resposta: 0,
        porque: 'Em inglês o possessivo vem depois do verbo "be": "I\'m yours", "the book is mine".',
      },
    ],
    tarefas: [
      'Ouça em 0,75× e escreva três palavras que você reconheceu sem olhar nada.',
      'Em português: o que teria acontecido se ele continuasse enrolando?',
    ],
  },
  '6k8cpUkKK4c': {
    artista: 'Bruno Mars',
    nome: 'Count on Me',
    familia: 'pop',
    tema: 'Amizade. A promessa de estar lá quando o outro precisar — atravessar o mar, procurar no escuro, o que for. É o vocabulário mais simples das quarenta: bom para a primeira música que você ouve inteira.',
    vocabulario: [
      { en: 'to count on someone', pt: 'contar com alguém', nota: 'É "count ON". Essa preposição é a pegadinha para brasileiro.' },
      { en: 'to be there for someone', pt: 'estar presente para alguém' },
      { en: 'friendship', pt: 'amizade', nota: '"-ship" faz nome abstrato: friend → friendship.' },
    ],
    perguntas: [
      {
        pergunta: 'A música é sobre o quê?',
        opcoes: ['Amizade: estar presente quando o outro precisa', 'Um casamento', 'Mudar de país'],
        resposta: 0,
      },
      {
        pergunta: 'Como se diz "pode contar comigo"?',
        opcoes: ['You can count on me.', 'You can count with me.', 'You can count in me.'],
        resposta: 0,
        porque: 'Em inglês se conta "on" alguém. Traduzir o "com" do português erra aqui.',
      },
    ],
    tarefas: [
      'Escreva, em inglês, uma frase sua usando "count on": quem você pode chamar às três da manhã?',
      'Em português: a música promete o quê, exatamente?',
    ],
  },
  ZbZSe6N_BXs: {
    artista: 'Pharrell Williams',
    nome: 'Happy',
    familia: 'pop',
    tema: 'A sensação de estar feliz sem motivo e sem pedir licença — e de não dar bola para quem vem estragar. Presente simples do começo ao fim: é a música para fixar como se fala de sentimento em inglês.',
    vocabulario: [
      { en: 'happy', pt: 'feliz', nota: 'Vai com "be": "I am happy". "I have happy" não existe.' },
      { en: 'to clap', pt: 'bater palmas', nota: '"Clap along" = acompanhe batendo palma.' },
      { en: 'to feel like + -ing', pt: 'estar com vontade de', nota: '"I feel like dancing" = estou com vontade de dançar.' },
    ],
    perguntas: [
      {
        pergunta: 'Do que a música fala?',
        opcoes: ['Da sensação de estar feliz, sem motivo específico', 'De uma briga de casal', 'De saudade de casa'],
        resposta: 0,
      },
      {
        pergunta: 'Qual está certo?',
        opcoes: ['I am happy.', 'I have happy.', 'I stay happy today.'],
        resposta: 0,
        porque: 'Sentimento em inglês vem com o verbo "be". O português usa "estar", o inglês usa "be" para os dois.',
      },
    ],
    tarefas: [
      'Escreva em inglês três coisas que te deixam feliz, cada uma com "I feel happy when…".',
      'Em português: a música diz o que sobre quem tenta estragar o seu dia?',
    ],
  },
  LjhCEhWiKXk: {
    artista: 'Bruno Mars',
    nome: 'Just The Way You Are',
    familia: 'pop',
    tema: 'Dizer a alguém que ela é bonita exatamente como é, e que não precisa mudar nada. Aula inteira de como descrever uma pessoa em inglês: olhos, sorriso, risada, jeito.',
    vocabulario: [
      { en: 'just the way you are', pt: 'exatamente como você é', nota: '"The way" aqui é "o jeito", não "o caminho".' },
      { en: 'gorgeous', pt: 'belíssima, deslumbrante', nota: 'Mais forte que "beautiful". Serve para pessoa, lugar e comida.' },
      { en: 'to smile', pt: 'sorrir', nota: 'Verbo e substantivo: "her smile" = o sorriso dela.' },
    ],
    perguntas: [
      {
        pergunta: 'O que o cantor diz para a pessoa?',
        opcoes: ['Que ela é bonita como é e não precisa mudar', 'Que ela precisa mudar o cabelo', 'Que ele vai embora'],
        resposta: 0,
      },
      {
        pergunta: '"The way you are" quer dizer…',
        opcoes: ['o jeito que você é', 'o caminho que você faz', 'a maneira certa'],
        resposta: 0,
        porque: '"Way" é "jeito" quando fala de pessoa. "On my way" é que é caminho.',
      },
    ],
    tarefas: [
      'Descreva alguém em inglês em três frases, usando "her eyes…", "his smile…", "the way she…".',
      'Em português: por que o elogio da música é diferente de "você é linda"?',
    ],
  },
  CevxZvSJLk8: {
    artista: 'Katy Perry',
    nome: 'Roar',
    familia: 'pop',
    tema: 'Alguém que engolia tudo calada e descobriu a própria voz. Cheia de verbos de força: rugir, levantar, aguentar, enfrentar.',
    vocabulario: [
      { en: 'to roar', pt: 'rugir', nota: 'O som do leão. Em inglês serve de metáfora para quem fala alto e é ouvido.' },
      { en: 'to stand up for yourself', pt: 'se impor, se defender' },
      { en: 'to hold back', pt: 'se segurar, se conter', nota: '"I held back" = eu me calei, me contive.' },
    ],
    perguntas: [
      {
        pergunta: 'A música fala de quem?',
        opcoes: ['De alguém que se calava e passou a se impor', 'De um safári na África', 'De perder o emprego'],
        resposta: 0,
      },
      {
        pergunta: 'Como se diz "eu me calei por muito tempo"?',
        opcoes: ['I held back for too long.', 'I hold back since much time.', 'I was holding back by long.'],
        resposta: 0,
        porque: '"Held" é o passado de "hold". E tempo decorrido vai com "for".',
      },
    ],
    tarefas: [
      'Escreva em inglês uma situação em que você se calou e hoje falaria: "I used to hold back when…".',
      'Em português: o que mudou na pessoa da música, entre o começo e o refrão?',
    ],
  },
  '09R8_2nJtjg': {
    artista: 'Maroon 5',
    nome: 'Sugar',
    familia: 'pop',
    tema: 'A letra é sobre querer alguém de um jeito meio desesperado. O clipe é outra coisa: a banda invade casamentos de verdade em Los Angeles e toca de surpresa — é por isso que essa música está aqui, porque a tela está cheia de gente se cumprimentando e comemorando.',
    vocabulario: [
      { en: 'sugar', pt: 'açúcar — e também "meu amor"', nota: 'Apelido carinhoso no inglês americano, como "honey" e "babe".' },
      { en: 'wedding', pt: 'casamento (o dia, a festa)', nota: '"Marriage" é o casamento como estado. O dia é "wedding".' },
      { en: 'Congratulations!', pt: 'Parabéns!', nota: 'É o que se diz no casamento, na formatura e na promoção.' },
    ],
    perguntas: [
      {
        pergunta: 'O que acontece no clipe?',
        opcoes: ['A banda invade casamentos de verdade e toca de surpresa', 'A banda toca num estádio', 'A banda grava no estúdio'],
        resposta: 0,
      },
      {
        pergunta: 'Qual palavra é o dia da festa de casamento?',
        opcoes: ['wedding', 'marriage', 'married'],
        resposta: 0,
        porque: '"Wedding day", "wedding dress", "wedding cake" — tudo do dia. "Marriage" é a vida a dois.',
      },
    ],
    tarefas: [
      'Escreva em inglês três frases que você diria para os noivos numa festa.',
      'Em português: assista sem som e escreva o que o clipe conta. Depois ouça com som — mudou algo?',
    ],
  },
  nfWlot6h_JM: {
    artista: 'Taylor Swift',
    nome: 'Shake It Off',
    familia: 'pop',
    tema: 'Não dar bola para quem fala mal. A música é uma aula de frase feita do dia a dia: a crítica chega e você sacode o ombro e segue.',
    vocabulario: [
      { en: 'to shake something off', pt: 'tirar de si, não dar bola', nota: 'A imagem é física: a crítica cai do ombro quando você sacode.' },
      { en: 'hater', pt: 'quem fala mal de você', nota: 'De "hate" (odiar) + "-er". Virou palavra do português também.' },
      { en: 'to play it cool', pt: 'fingir que não se importa' },
    ],
    perguntas: [
      {
        pergunta: 'Qual é a mensagem?',
        opcoes: ['Não dar bola para quem fala mal', 'Aprender a dançar', 'Pedir desculpa aos amigos'],
        resposta: 0,
      },
      {
        pergunta: 'Você usa "shake it off" quando…',
        opcoes: ['alguém te critica e você decide ignorar', 'você está com frio', 'você perde a chave'],
        resposta: 0,
        porque: 'Serve para crítica, fora e tropeço: qualquer coisa que você decide deixar para trás.',
      },
    ],
    tarefas: [
      'Escreva em inglês uma frase com "shake it off" sobre algo que te incomodou esta semana.',
      'Em português: qual é a diferença entre "shake it off" e "forget it"?',
    ],
  },
  hLQl3WQQoQ0: {
    artista: 'Adele',
    nome: 'Someone Like You',
    familia: 'pop',
    tema: 'Reencontrar um amor antigo e descobrir que ele seguiu a vida: casou, se acomodou, está bem. Tudo no passado, com arrependimento — é a música para ouvir o passado em inglês.',
    vocabulario: [
      { en: 'to move on', pt: 'virar a página, seguir a vida' },
      { en: 'to settle down', pt: 'se acomodar, construir família' },
      { en: 'I wish you the best.', pt: 'Desejo o melhor para você.', nota: 'Educado e definitivo: se diz ao encerrar as coisas.' },
    ],
    perguntas: [
      {
        pergunta: 'A música fala de quê?',
        opcoes: ['Reencontrar um ex que já seguiu a vida', 'Brigar com a mãe', 'Comprar uma casa'],
        resposta: 0,
      },
      {
        pergunta: '"I wish you the best" é…',
        opcoes: ['desejo o melhor para você', 'eu quero o melhor de você', 'eu queria você melhor'],
        resposta: 0,
        porque: '"Wish" + pessoa + coisa: "I wish you luck", "I wish you a good trip".',
      },
    ],
    tarefas: [
      'Escreva três frases suas no passado: "I used to…", "We were…", "I never thought…".',
      'Em português: ela está com raiva, com saudade, ou conformada? Por que você acha isso?',
    ],
  },
  YQHsXMglC9A: {
    artista: 'Adele',
    nome: 'Hello',
    familia: 'pop',
    tema: 'Um telefonema para alguém do passado, anos depois, só para pedir desculpa. Serve de aula dupla: falar ao telefone e se desculpar em inglês.',
    vocabulario: [
      { en: 'to call someone', pt: 'ligar para alguém', nota: '"Call me" = me liga. "Ring me" é o mesmo, mais britânico.' },
      { en: "I'm sorry for…", pt: 'desculpa por…', nota: 'Depois de "for" vem substantivo ou -ing: "sorry for being late".' },
      { en: "It doesn't matter.", pt: 'Não tem importância.' },
    ],
    perguntas: [
      {
        pergunta: 'O que ela faz na música?',
        opcoes: ['Liga para alguém do passado para pedir desculpa', 'Reclama do vizinho', 'Conta que vai se casar'],
        resposta: 0,
      },
      {
        pergunta: 'Como pedir desculpa por chegar tarde?',
        opcoes: ['Sorry for being late.', 'Sorry to be late ago.', 'Sorry for I am late.'],
        resposta: 0,
        porque: 'Depois de "for" o verbo vira -ing. Essa é das trocas mais comuns no inglês de brasileiro.',
      },
    ],
    tarefas: [
      'Escreva em inglês o que você diria ligando para alguém com quem não fala há anos — três frases.',
      'Em português: ela liga esperando o quê? E o que parece receber?',
    ],
  },
  '450p7goxZqg': {
    artista: 'John Legend',
    nome: 'All of Me',
    familia: 'pop',
    tema: 'Amar a pessoa inteira, defeitos incluídos, e se entregar por inteiro em troca. Cheia de adjetivo e de verbo "to be": boa para ouvir como se descreve gente de verdade.',
    vocabulario: [
      { en: 'flaw', pt: 'defeito', nota: '"I love your flaws" = amo seus defeitos. Nada a ver com "flor".' },
      { en: 'to give someone your all', pt: 'se entregar por inteiro' },
      { en: 'all of me', pt: 'tudo o que eu sou', nota: '"All of + pronome" = a pessoa inteira: all of you, all of us.' },
    ],
    perguntas: [
      {
        pergunta: 'A música diz que…',
        opcoes: ['Ele ama a pessoa inteira, defeitos incluídos', 'Ele vai embora amanhã', 'Ele não acredita em casamento'],
        resposta: 0,
      },
      {
        pergunta: '"Flaw" quer dizer…',
        opcoes: ['defeito', 'flor', 'chão'],
        resposta: 0,
        porque: 'Flor é "flower" e chão é "floor". As três se parecem no papel e não no som.',
      },
    ],
    tarefas: [
      'Escreva em inglês três frases com "all of": "all of me", "all of you", "all of it".',
      'Em português: a música fala de amor fácil ou difícil? O que na letra te faz pensar isso?',
    ],
  },
  RBumgq5yVrA: {
    artista: 'Passenger',
    nome: 'Let Her Go',
    familia: 'pop',
    tema: 'A gente só vê o valor de uma coisa quando ela vai embora: a luz, quando apaga; a pessoa, quando sai. A música é construída em cima dessa estrutura repetida — bom treino para condicional.',
    vocabulario: [
      { en: 'to let someone go', pt: 'deixar alguém ir' },
      { en: 'to miss someone', pt: 'sentir falta de alguém', nota: '"I miss you" = sinto sua falta. "I have miss of you" não existe.' },
      { en: 'only when…', pt: 'só quando…', nota: 'A estrutura da música inteira: "only when… you…".' },
    ],
    perguntas: [
      {
        pergunta: 'Qual é a ideia central?',
        opcoes: ['A gente só vê o valor quando perde', 'Viajar sozinho é melhor', 'Trabalhar demais faz mal'],
        resposta: 0,
      },
      {
        pergunta: 'Como se diz "sinto sua falta"?',
        opcoes: ['I miss you.', 'I have miss of you.', 'I feel your lack.'],
        resposta: 0,
        porque: '"Miss" é verbo em inglês. Em português "falta" é substantivo, e daí vem a confusão.',
      },
    ],
    tarefas: [
      'Escreva três frases suas no molde da música: "You only… when you…".',
      'Em português: a música dá um conselho ou só constata? Qual é a diferença?',
    ],
  },
  '2Vv-BfVoq4g': {
    artista: 'Ed Sheeran',
    nome: 'Perfect',
    familia: 'pop',
    tema: 'Uma dança devagar com a pessoa com quem ele pretende passar a vida. É promessa do começo ao fim — a música para ouvir o futuro em inglês.',
    vocabulario: [
      { en: 'I will…', pt: 'eu vou… (promessa)', nota: '"Will" é a promessa feita na hora. "Going to" é o plano que já existia.' },
      { en: 'barefoot', pt: 'descalço', nota: '"Bare" (nu) + "foot" (pé). Dançar "barefoot on the grass".' },
      { en: 'to hold someone', pt: 'segurar, abraçar alguém' },
    ],
    perguntas: [
      {
        pergunta: 'Do que fala a música?',
        opcoes: ['De um amor que ele pretende levar para a vida', 'De uma viagem de trabalho', 'De uma briga no trânsito'],
        resposta: 0,
      },
      {
        pergunta: 'Qual soa como promessa feita agora?',
        opcoes: ['I will marry you.', 'I am marrying you yesterday.', 'I married you tomorrow.'],
        resposta: 0,
        porque: '"Will" serve para a decisão do momento. As outras duas misturam tempo com advérbio e não existem.',
      },
    ],
    tarefas: [
      'Escreva três promessas em inglês com "I will…".',
      'Em português: o que a música chama de "perfect"? A pessoa, a noite, ou a vida que vem?',
    ],
  },
  hT_nvWreIhg: {
    artista: 'OneRepublic',
    nome: 'Counting Stars',
    familia: 'pop',
    tema: 'A escolha entre contar dinheiro e contar estrelas: largar a segurança para ir atrás do que se quer. É cantada rápido, e é por isso que ela está aqui — treino de ouvido com letra simples.',
    vocabulario: [
      { en: 'to count stars', pt: 'contar estrelas', nota: 'No lugar de contar dinheiro: sonhar em vez de somar.' },
      { en: 'to make a living', pt: 'ganhar a vida', nota: '"What do you do for a living?" = do que você vive?' },
      { en: 'to pay the bills', pt: 'pagar as contas' },
    ],
    perguntas: [
      {
        pergunta: 'A escolha da música é entre…',
        opcoes: ['Sonhar e correr atrás de dinheiro', 'Dois times de futebol', 'Dois países'],
        resposta: 0,
      },
      {
        pergunta: '"To make a living" é…',
        opcoes: ['ganhar a vida', 'fazer uma vida nova', 'morar'] ,
        resposta: 0,
        porque: 'É a expressão feita para "do que você tira o seu dinheiro".',
      },
    ],
    tarefas: [
      'Ouça uma vez em velocidade normal e uma em 0,75×. Escreva o que você só entendeu na segunda.',
      'Em português: o que a música acha que vale mais? Como ela mostra isso?',
    ],
  },
  '7wtfhZwyrcc': {
    artista: 'Imagine Dragons',
    nome: 'Believer',
    familia: 'pop',
    tema: 'A dor como professora: foi ela que o fez acreditar. Refrão martelado, palavra por palavra — a batida ajuda a separar as sílabas.',
    vocabulario: [
      { en: 'pain', pt: 'dor', nota: 'Dor física e dor da alma, as duas com a mesma palavra.' },
      { en: 'believer', pt: 'quem acredita', nota: '"-er" transforma verbo em pessoa: believe → believer, play → player.' },
      { en: 'to go through something', pt: 'passar por algo difícil' },
    ],
    perguntas: [
      {
        pergunta: 'O que a música diz sobre a dor?',
        opcoes: ['Que foi a dor que o fez acreditar', 'Que a dor não existe', 'Que dor é só no corpo'],
        resposta: 0,
      },
      {
        pergunta: 'Quem acredita é um…',
        opcoes: ['believer', 'believing', 'belief'],
        resposta: 0,
        porque: '"-er" faz a pessoa; "-ing" faz a ação; "belief" é a crença em si.',
      },
    ],
    tarefas: [
      'Escreva cinco palavras em "-er" que você conhece e o verbo de cada uma.',
      'Em português: você concorda com a tese da música? Por quê?',
    ],
  },
  '2vjPBrBU-TM': {
    artista: 'Sia',
    nome: 'Chandelier',
    familia: 'pop',
    tema: 'Por baixo da festa, alguém que bebe para não sentir e dança até cair. A música é alegre no som e triste no assunto — é aqui que entra o exercício de interpretar, e não de traduzir.',
    vocabulario: [
      { en: 'chandelier', pt: 'lustre', nota: 'Palavra de origem francesa: o "ch" soa como "x" — /xan-de-LÍR/.' },
      { en: 'to swing', pt: 'balançar, se pendurar' },
      { en: 'to hold on', pt: 'se segurar, aguentar', nota: '"Hold on!" sozinho é "espera aí!".' },
    ],
    perguntas: [
      {
        pergunta: 'Por baixo da festa, a música fala de…',
        opcoes: ['Alguém que bebe para não sentir', 'Uma festa de aniversário feliz', 'Decoração de casa'],
        resposta: 0,
        porque: 'A batida é de festa; o que se conta é o dia seguinte dela.',
      },
      {
        pergunta: '"Chandelier" é…',
        opcoes: ['lustre', 'vela', 'janela'],
        resposta: 0,
      },
    ],
    tarefas: [
      'Escreva em inglês uma frase que você pegou e marque a palavra que não entendeu.',
      'Em português: por que a música é animada se o assunto é triste? O que isso faz com quem ouve?',
    ],
  },
  '4NRXx6U8ABQ': {
    artista: 'The Weeknd',
    nome: 'Blinding Lights',
    familia: 'pop',
    tema: 'Dirigir pela cidade de madrugada, sem conseguir dormir, pensando em alguém. Cantada na velocidade real da fala — é o teste de ouvido depois das mais devagar.',
    vocabulario: [
      { en: 'blinding', pt: 'que cega, ofuscante', nota: 'De "blind" (cego) + "-ing": a luz que cega.' },
      { en: 'downtown', pt: 'centro da cidade', nota: 'No inglês americano, "downtown" é para onde se vai à noite.' },
      { en: "I can't sleep.", pt: 'Não consigo dormir.', nota: '"Can\'t" + verbo = não consigo. Não precisa de "to".' },
    ],
    perguntas: [
      {
        pergunta: 'Qual é a cena da música?',
        opcoes: ['Dirigir pela cidade de noite pensando em alguém', 'Um almoço de família', 'Uma entrevista de emprego'],
        resposta: 0,
      },
      {
        pergunta: '"Blinding lights" são luzes que…',
        opcoes: ['cegam', 'piscam devagar', 'estão apagadas'],
        resposta: 0,
        porque: 'O "-ing" diz o que a luz faz com quem olha.',
      },
    ],
    tarefas: [
      'Ouça duas vezes e escreva as palavras do refrão que você consegue isolar.',
      'Em português: a música é sobre saudade, sobre insônia, ou sobre as duas coisas?',
    ],
  },
  DyDfgMOUjCI: {
    artista: 'Billie Eilish',
    nome: 'bad guy',
    familia: 'pop',
    tema: 'Deboche. Ela debocha de quem se acha durão e assume o papel de vilã só para provocar. Canta baixo e mastiga as palavras — difícil de propósito, e o melhor treino de ouvido do lote pop.',
    vocabulario: [
      { en: 'bad guy', pt: 'o vilão, o cara mau', nota: 'No cinema, "the bad guy" é o antagonista.' },
      { en: 'tough', pt: 'durão, difícil', nota: 'Escreve-se com "gh" e soa como "f": /tâf/.' },
      { en: 'to make fun of someone', pt: 'tirar uma com alguém', nota: 'Diferente de "to have fun with someone", que é se divertir junto.' },
    ],
    perguntas: [
      {
        pergunta: 'Qual é o tom da música?',
        opcoes: ['Deboche: ela debocha de quem se acha durão', 'Declaração de amor séria', 'Protesto político'],
        resposta: 0,
      },
      {
        pergunta: '"To make fun of someone" é…',
        opcoes: ['tirar uma com alguém', 'fazer alguém se divertir', 'brincar junto'],
        resposta: 0,
        porque: 'Com "of" é zoar. Para se divertir junto é "have fun with".',
      },
    ],
    tarefas: [
      'Ouça em 0,75× e escreva duas palavras que você só conseguiu pegar na velocidade menor.',
      'Em português: ela está se elogiando ou debochando? O que no jeito de cantar te diz isso?',
    ],
  },
  pok8H_KF1FA: {
    artista: 'Doja Cat',
    nome: 'Say So',
    familia: 'pop',
    tema: 'A reclamação de quem está cansada de esperar: se você gosta de mim, fala logo. Gíria atual e ritmo quase falado.',
    vocabulario: [
      { en: 'to say so', pt: 'dizer isso, falar logo', nota: '"If you like me, say so" = se gosta de mim, fala.' },
      { en: 'to beat around the bush', pt: 'enrolar, não ir direto ao ponto' },
      { en: 'crush', pt: 'paixonite', nota: '"I have a crush ON him" — a preposição é "on".' },
    ],
    perguntas: [
      {
        pergunta: 'Qual é a reclamação da música?',
        opcoes: ['A pessoa gosta dela mas não fala', 'Ela perdeu o voo', 'O vizinho faz barulho'],
        resposta: 0,
      },
      {
        pergunta: 'Como dizer "tenho uma paixonite por ele"?',
        opcoes: ['I have a crush on him.', 'I have a crush in him.', 'I am crush for him.'],
        resposta: 0,
        porque: 'Mais um caso de "on" onde o português usaria "por".',
      },
    ],
    tarefas: [
      'Escreva em inglês o que você diria para alguém que está enrolando — duas frases.',
      'Em português: o tom dela é de mágoa, de impaciência, ou de provocação?',
    ],
  },
  wXhTHyIgQ_U: {
    artista: 'Post Malone',
    nome: 'Circles',
    familia: 'pop',
    tema: 'Um namoro que volta sempre ao mesmo lugar: briga, reconcilia, briga de novo. Uma metáfora só, repetida muitas vezes — fácil de guardar.',
    vocabulario: [
      { en: 'to run in circles', pt: 'andar em círculos, não sair do lugar' },
      { en: 'to let go', pt: 'largar, soltar', nota: 'Sem objeto é "soltar". Com objeto, "let it go" = deixa pra lá.' },
      { en: 'again and again', pt: 'de novo e de novo' },
    ],
    perguntas: [
      {
        pergunta: 'Qual é a metáfora da música?',
        opcoes: ['Um namoro que volta ao mesmo lugar', 'Uma corrida de carro', 'Uma roda-gigante'],
        resposta: 0,
      },
      {
        pergunta: '"We run in circles" quer dizer que…',
        opcoes: ['nada muda, a história se repete', 'os dois correm no parque', 'os dois estão tontos'],
        resposta: 0,
      },
    ],
    tarefas: [
      'Escreva em inglês três expressões de repetição: "again and again", "over and over", e uma sua.',
      'Em português: quem a música culpa pelo círculo — ele, ela, ou os dois?',
    ],
  },

  // ——— Clássicos ———
  '1G4isv_Fylg': {
    artista: 'Coldplay',
    nome: 'Paradise',
    familia: 'classico',
    tema: 'Uma menina que sonhava com o paraíso quando a vida não saiu como esperava. O clipe conta a história de um elefante que atravessa o mundo até achar os seus — e não tem uma palavra de diálogo, o que faz dele o melhor exercício de interpretar sem traduzir.',
    vocabulario: [
      { en: 'to dream of / about', pt: 'sonhar com', nota: 'Nunca "dream with". Em inglês se sonha "of" ou "about".' },
      { en: 'paradise', pt: 'paraíso' },
      { en: 'to run away', pt: 'fugir' },
    ],
    perguntas: [
      {
        pergunta: 'No clipe…',
        opcoes: ['Um elefante atravessa o mundo até achar os seus', 'Dois carros disputam uma corrida', 'A banda toca num bar'],
        resposta: 0,
      },
      {
        pergunta: 'Como se diz "sonhei com você"?',
        opcoes: ['I dreamed of you.', 'I dreamed with you.', 'I dreamed in you.'],
        resposta: 0,
        porque: 'O "com" do português não atravessa: em inglês é "of" ou "about".',
      },
    ],
    tarefas: [
      'Assista sem som e escreva em português o que o clipe conta. Depois ouça.',
      'Em inglês: três frases com "I dream of…".',
    ],
  },
  dvgZkm1xWPE: {
    artista: 'Coldplay',
    nome: 'Viva La Vida',
    familia: 'classico',
    tema: 'Um rei que perdeu o trono, olhando para trás: antes mandava, agora varre a rua que era dele. Vocabulário histórico e tudo no passado — "used to" aparece como estrutura central.',
    vocabulario: [
      { en: 'used to + verbo', pt: 'costumava, antigamente', nota: '"I used to own it" = aquilo era meu, antigamente. Não confunda com "to be used to" (estar acostumado).' },
      { en: 'to rule', pt: 'governar, reinar', nota: 'Também "a rule" = uma regra. Mesma palavra, sentidos distantes.' },
      { en: 'king', pt: 'rei' },
    ],
    perguntas: [
      {
        pergunta: 'Quem fala na música?',
        opcoes: ['Um rei que perdeu o trono', 'Um menino na escola', 'Um turista em Paris'],
        resposta: 0,
      },
      {
        pergunta: '"I used to work there" quer dizer…',
        opcoes: ['eu trabalhava lá, antigamente', 'eu estou acostumado a trabalhar lá', 'eu usei o trabalho'],
        resposta: 0,
        porque: '"Used to + verbo" é hábito do passado. "Be used to + -ing" é estar acostumado. Troque e muda tudo.',
      },
    ],
    tarefas: [
      'Escreva três frases com "I used to…" sobre a sua vida de dez anos atrás.',
      'Em português: por que a música é alegre se o rei perdeu tudo?',
    ],
  },
  bx1Bh8ZvH84: {
    artista: 'Oasis',
    nome: 'Wonderwall',
    familia: 'classico',
    tema: 'A pessoa que talvez seja a que te salva. "Wonderwall" não existe no dicionário: é palavra inventada. Está aqui pelo sotaque de Manchester, que é difícil de propósito — se você entende esse, entende o resto.',
    vocabulario: [
      { en: 'maybe', pt: 'talvez', nota: 'No norte da Inglaterra sai quase "mebbe".' },
      { en: 'to save someone', pt: 'salvar alguém' },
      { en: 'wonderwall', pt: 'palavra inventada pela banda', nota: 'Não está no dicionário: é a pessoa que te segura de pé.' },
    ],
    perguntas: [
      {
        pergunta: '"Wonderwall", na música, é…',
        opcoes: ['A pessoa que pode te salvar', 'Um muro de verdade', 'Um bairro de Londres'],
        resposta: 0,
      },
      {
        pergunta: 'O sotaque da música é…',
        opcoes: ['britânico, do norte da Inglaterra', 'americano do Texas', 'australiano'],
        resposta: 0,
        porque: 'Oasis é de Manchester. O "u" de "but" sai fechado, quase como o "u" do português.',
      },
    ],
    tarefas: [
      'Ouça uma vez e escreva as palavras que soaram diferentes do inglês americano que você está acostumado.',
      'Em português: o que a música pede, exatamente? Ela pede ou só torce?',
    ],
  },
  A_MjCqQoLLA: {
    artista: 'The Beatles',
    nome: 'Hey Jude',
    familia: 'classico',
    tema: 'Um consolo: alguém dizendo a um menino triste que tenha coragem, que pegue a música triste e faça dela algo melhor. Inglês dos anos 60, cantado claro e devagar — mais fácil de entender que quase tudo de hoje.',
    vocabulario: [
      { en: 'to make it better', pt: 'melhorar as coisas' },
      { en: "Don't be afraid.", pt: 'Não tenha medo.', nota: 'Imperativo negativo: "don\'t" + verbo, sem sujeito.' },
      { en: 'to let someone into your heart', pt: 'deixar alguém entrar' },
    ],
    perguntas: [
      {
        pergunta: 'A música é…',
        opcoes: ['Um consolo: alguém dizendo ao outro que tenha coragem', 'Uma briga', 'Uma despedida de alguém que morreu'],
        resposta: 0,
      },
      {
        pergunta: '"Don\'t be afraid" é…',
        opcoes: ['Não tenha medo', 'Não seja estranho', 'Não fique parado'],
        resposta: 0,
        porque: '"Afraid" é medo. "Weird" é estranho, "still" é parado.',
      },
    ],
    tarefas: [
      'Escreva três conselhos em inglês no imperativo: "Don\'t…", "Take…", "Remember…".',
      'Em português: a música consola como? Dizendo que vai passar, ou dizendo o que fazer?',
    ],
  },
  fJ9rUzIMcZQ: {
    artista: 'Queen',
    nome: 'Bohemian Rhapsody',
    familia: 'classico',
    tema: 'Um rapaz confessa à mãe que matou um homem, e a música atravessa balada, ópera e rock numa faixa só. A ideia que sobra no fim é "nada importa de verdade". É a mais difícil das quarenta, e está aqui por isso.',
    vocabulario: [
      { en: 'Mama', pt: 'Mãe', nota: 'Chamamento informal, como "mãe" no português falado.' },
      { en: 'to let someone down', pt: 'decepcionar alguém', nota: '"I let you down" = eu te decepcionei.' },
      { en: 'nothing really matters', pt: 'nada importa de verdade', nota: 'A ideia central da música, e também frase do dia a dia: "it doesn\'t matter".' },
    ],
    perguntas: [
      {
        pergunta: 'A música é famosa por…',
        opcoes: ['Juntar balada, ópera e rock numa faixa só', 'Ser a mais curta do Queen', 'Ter sido feita para um filme'],
        resposta: 0,
      },
      {
        pergunta: '"To let someone down" é…',
        opcoes: ['decepcionar alguém', 'deixar alguém descer', 'abaixar alguém'],
        resposta: 0,
        porque: 'Verbo com preposição muda de sentido: "let down" não tem a ver com descer.',
      },
    ],
    tarefas: [
      'Ouça o trecho três vezes: uma só ouvindo, uma em 0,75×, uma anotando. Escreva o que mudou entre a primeira e a terceira.',
      'Em português: o que você entendeu da história? Não tem resposta certa — escreva a sua leitura.',
    ],
  },

  // ——— Rap antigo ———
  '4B_UYYPb-Gk': {
    artista: 'Run-DMC',
    nome: 'Walk This Way (ft. Aerosmith)',
    familia: 'rap-antigo',
    tema: 'A gravação de 1986 que juntou rap e rock e abriu o rap para o grande público: Run-DMC refez um sucesso do Aerosmith com a própria banda dentro. Pronúncia marcada, pausada, fácil de acompanhar — é o rap para começar.',
    vocabulario: [
      { en: 'Walk this way, please.', pt: 'Venha por aqui, por favor.', nota: 'É o que o garçom diz levando você à mesa. Nada a ver com o jeito de andar.' },
      { en: 'crossover', pt: 'mistura de dois estilos' },
      { en: 'Watch me!', pt: 'Olha só! / Me vê!' },
    ],
    perguntas: [
      {
        pergunta: 'O que essa gravação fez pela história?',
        opcoes: ['Juntou rap e rock e abriu o rap para o grande público', 'Inventou o reggae', 'Foi a primeira música gravada em estúdio'],
        resposta: 0,
      },
      {
        pergunta: 'Num restaurante, "walk this way, please" quer dizer…',
        opcoes: ['venha por aqui', 'ande desse jeito', 'caminhe mais rápido'],
        resposta: 0,
        porque: '"This way" é "por aqui". Você vai ouvir isso em todo restaurante e hotel.',
      },
    ],
    tarefas: [
      'Escreva em inglês três frases que um garçom diria ao te receber.',
      'Em português: o que o rap tem que o rock não tem, pelo que você ouviu aqui?',
    ],
  },
  '3JcmQONgXJM': {
    artista: 'Will Smith',
    nome: "Gettin' Jiggy Wit It",
    familia: 'rap-antigo',
    tema: 'Festa, dança e exibição, sem um palavrão — Will Smith fez carreira de rap limpo. A grafia do título é a aula: "wit it" é "with it" como se fala de verdade, com o "th" caindo.',
    vocabulario: [
      { en: 'to get jiggy', pt: 'dançar, se soltar', nota: 'Gíria dos anos 90. Hoje soa datada, e é de propósito.' },
      { en: 'wit it', pt: '"with it" na fala rápida', nota: 'O "th" desaparece. Ouvir isso é metade de entender inglês falado.' },
      { en: 'to show off', pt: 'se exibir' },
    ],
    perguntas: [
      {
        pergunta: 'Qual é o assunto da música?',
        opcoes: ['Festa, dança e se exibir, sem palavrão', 'Política dos Estados Unidos', 'Um divórcio'],
        resposta: 0,
      },
      {
        pergunta: 'Por que o título escreve "wit it" e não "with it"?',
        opcoes: ['Porque imita a fala rápida, onde o "th" desaparece', 'Porque é erro de impressão', 'Porque "wit" é outro verbo'],
        resposta: 0,
        porque: 'Rap escreve como se fala. "Gonna", "wanna" e "wit it" são a fala no papel.',
      },
    ],
    tarefas: [
      'Escreva cinco palavras que mudam na fala rápida: "going to" → "gonna", e mais quatro.',
      'Em português: dá para ouvir onde o "th" cai? Em que palavras você notou?',
    ],
  },
  vCadcBR95oU: {
    artista: 'Salt-N-Pepa',
    nome: 'Push It',
    familia: 'rap-antigo',
    tema: 'Um convite para dançar com duplo sentido claro: de 1987, feito por três mulheres numa cena de rap que era só de homens. Refrão curto e repetido — fácil de pegar mesmo com o inglês ainda curto.',
    aviso: 'Duplo sentido sexual do começo ao fim. Não tem palavrão, mas não é música para tocar numa sala de aula de criança.',
    vocabulario: [
      { en: 'to push', pt: 'empurrar', nota: 'Na porta: "push" é empurre, "pull" é puxe. Vale saber antes de viajar.' },
      { en: 'Come on!', pt: 'Vamos! / Anda!' },
      { en: 'the beat', pt: 'a batida' },
    ],
    perguntas: [
      {
        pergunta: 'A música é…',
        opcoes: ['Um convite para dançar, com duplo sentido', 'Uma música de ninar', 'Um hino de futebol'],
        resposta: 0,
      },
      {
        pergunta: 'Numa porta nos Estados Unidos, "push" quer dizer…',
        opcoes: ['empurre', 'puxe', 'pare'],
        resposta: 0,
        porque: '"Push" empurra, "pull" puxa. Trocar os dois é o erro que todo turista comete uma vez.',
      },
    ],
    tarefas: [
      'Escreva em inglês cinco placas que você vai ler numa viagem: push, pull, e três que você conhece.',
      'Em português: o que havia de novo em três mulheres fazendo isso em 1987?',
    ],
  },
  z5rRZdiu1UE: {
    artista: 'Beastie Boys',
    nome: 'Sabotage',
    familia: 'rap-antigo',
    tema: 'Gritado, rápido, com guitarra — o extremo do treino de ouvido. O clipe é uma paródia de série policial dos anos 70, com bigode falso e perseguição de carro.',
    vocabulario: [
      { en: 'sabotage', pt: 'sabotagem', nota: 'Quase igual nos dois idiomas, mas o acento vai no fim: /sa-bo-TÁJ/.' },
      { en: "I'm fed up.", pt: 'Estou de saco cheio.', nota: 'Literalmente "estou alimentado até em cima".' },
      { en: 'to set someone up', pt: 'armar para alguém' },
    ],
    perguntas: [
      {
        pergunta: 'O clipe é…',
        opcoes: ['Uma paródia de série policial dos anos 70', 'Um show ao vivo', 'Um desenho animado'],
        resposta: 0,
      },
      {
        pergunta: '"I\'m fed up" quer dizer…',
        opcoes: ['estou de saco cheio', 'estou alimentado', 'estou acima'],
        resposta: 0,
      },
    ],
    tarefas: [
      'Não tente entender tudo. Ouça e escreva as três palavras que você conseguiu isolar no meio do grito.',
      'Em português: o que o clipe está debochando?',
    ],
  },
  PWgvGjAhvIw: {
    artista: 'Outkast',
    nome: 'Hey Ya!',
    familia: 'rap-antigo',
    tema: 'Batida alegre, letra triste: fala de casais que continuam juntos sem se amar mais, e todo mundo dança sem perceber. Sotaque do sul dos Estados Unidos, onde "y\'all" é palavra de todo dia.',
    vocabulario: [
      { en: "y'all", pt: 'vocês', nota: '"You all" no sul dos EUA. O inglês padrão não tem plural de "you", então o sul inventou um.' },
      { en: 'to shake it', pt: 'sacudir' },
      { en: 'to stay together', pt: 'continuar junto' },
    ],
    perguntas: [
      {
        pergunta: 'Qual é o contraste da música?',
        opcoes: ['Batida alegre com letra triste sobre casais sem amor', 'Batida triste com letra alegre', 'Nenhum: é tudo alegre'],
        resposta: 0,
        porque: 'A música brinca exatamente com isso: ninguém escuta a letra porque está dançando.',
      },
      {
        pergunta: '"Y\'all" é…',
        opcoes: ['vocês, no sul dos Estados Unidos', 'um nome próprio', 'um tipo de dança'],
        resposta: 0,
      },
    ],
    tarefas: [
      'Escreva em inglês a mesma frase duas vezes: uma com "you all" e uma com "y\'all".',
      'Em português: você teria notado a letra triste sem ninguém avisar? O que isso diz sobre ouvir música em outra língua?',
    ],
  },
  T6QKqFPRZSA: {
    artista: 'Lauryn Hill',
    nome: 'Doo Wop (That Thing)',
    familia: 'rap-antigo',
    tema: 'Conselho e crítica, dados em rima e cantados ao mesmo tempo: ela fala com os rapazes e com as moças, e pede amor-próprio dos dois lados. Rap cantado — bom degrau entre o pop e o rap duro.',
    aviso: 'Fala de sexo de modo indireto ("that thing") e tem uma ou outra palavra forte.',
    vocabulario: [
      { en: 'Watch out!', pt: 'Cuidado!', nota: 'Grito de aviso. "Watch out for the step" = cuidado com o degrau.' },
      { en: 'self-respect', pt: 'amor-próprio', nota: '"Self-" é "próprio": self-respect, self-control, self-made.' },
      { en: 'that thing', pt: '"aquilo"', nota: 'Jeito de falar de sexo sem nomear. O inglês faz muito isso.' },
    ],
    perguntas: [
      {
        pergunta: 'Qual é o conselho da música?',
        opcoes: ['Se respeitar e não se vender por atenção', 'Comprar roupa de marca', 'Sair de casa cedo'],
        resposta: 0,
      },
      {
        pergunta: '"Watch out!" é…',
        opcoes: ['Cuidado!', 'Olhe para fora!', 'Assista!'],
        resposta: 0,
        porque: '"Watch" sozinho é assistir; com "out" vira aviso de perigo.',
      },
    ],
    tarefas: [
      'Escreva quatro palavras com "self-" e o que cada uma quer dizer.',
      'Em português: ela fala com quem? E cobra a mesma coisa dos dois lados?',
    ],
  },

  // ——— Rap atual ———
  eXvBjCO19QY: {
    artista: '2Pac',
    nome: 'Changes',
    familia: 'rap-atual',
    tema: 'Rap de protesto: racismo, pobreza, violência policial e a pergunta de por que nada muda. É o vocabulário social do inglês — o que aparece em jornal e em discussão de verdade.',
    aviso: 'Tem palavrão e fala de violência policial, drogas e racismo sem meio-termo.',
    vocabulario: [
      { en: 'to make a change', pt: 'mudar algo, fazer diferença' },
      { en: 'the way things are', pt: 'como as coisas são' },
      { en: 'poverty', pt: 'pobreza', nota: 'De "poor" (pobre). O "-ty" faz o nome abstrato.' },
    ],
    perguntas: [
      {
        pergunta: 'A música fala de…',
        opcoes: ['Racismo, pobreza e violência policial nos EUA', 'Uma festa', 'Um time de basquete'],
        resposta: 0,
      },
      {
        pergunta: 'Em "we gotta make a change", "gotta" é a fala rápida de…',
        opcoes: ['have got to (ter que)', 'go to', 'get a'],
        resposta: 0,
        porque: '"Gotta", "gonna" e "wanna" são "got to", "going to" e "want to" na boca.',
      },
    ],
    tarefas: [
      'Escreva três frases com "gotta" e as mesmas três por extenso.',
      'Em português: a música acha que a mudança vem de onde — de cima ou de dentro?',
    ],
  },
  _JZom_gVfuw: {
    artista: 'The Notorious B.I.G.',
    nome: 'Juicy',
    familia: 'rap-atual',
    tema: 'A história de vida contada em rima: de um apartamento pobre no Brooklyn ao sucesso, sem esconder nada do caminho. Em inglês isso se chama "rags to riches", e a música é o exemplo mais citado do gênero.',
    aviso: 'Palavrão em quantidade e menções a crime e drogas.',
    vocabulario: [
      { en: 'rags to riches', pt: 'da miséria à riqueza', nota: 'Expressão feita: a história de quem subiu de baixo. "Rags" são trapos.' },
      { en: 'to make it', pt: 'conseguir, vencer', nota: '"I made it" = eu consegui. Serve para prova, voo e vida.' },
      { en: 'the projects', pt: 'conjunto habitacional pobre, nos EUA' },
    ],
    perguntas: [
      {
        pergunta: 'A música conta…',
        opcoes: ['A subida de alguém pobre até o sucesso', 'Um crime não resolvido', 'Uma viagem à Europa'],
        resposta: 0,
      },
      {
        pergunta: '"I made it" quer dizer…',
        opcoes: ['eu consegui', 'eu fiz isso', 'eu fui feito'],
        resposta: 0,
        porque: '"Make it" é chegar lá: no avião, na prova, na vida.',
      },
    ],
    tarefas: [
      'Escreva três frases com "make it": no voo, no trabalho e na vida.',
      'Em português: a música se orgulha do quê — do dinheiro, ou de ter saído de onde saiu?',
    ],
  },
  PBwAxmrE194: {
    artista: 'Wu-Tang Clan',
    nome: 'C.R.E.A.M.',
    familia: 'rap-atual',
    tema: 'O título é sigla: "Cash Rules Everything Around Me" — o dinheiro manda em tudo em volta de mim. Fala de crescer sem nada em Nova York. Das quarenta, é a de gíria mais fechada: aqui você vai entender pouco, e está tudo bem.',
    aviso: 'Palavrão e relato de crime e cadeia.',
    vocabulario: [
      { en: 'C.R.E.A.M.', pt: 'sigla de "Cash Rules Everything Around Me"', nota: '"O dinheiro manda em tudo em volta de mim."' },
      { en: 'cash', pt: 'dinheiro vivo', nota: '"Cash or card?" é a pergunta no caixa.' },
      { en: 'to get by', pt: 'se virar, sobreviver com pouco' },
    ],
    perguntas: [
      {
        pergunta: 'C.R.E.A.M. é a sigla de…',
        opcoes: ['Cash Rules Everything Around Me', 'Crime Rules Every American Man', 'Clean Rap Every Afternoon Music'],
        resposta: 0,
      },
      {
        pergunta: '"To get by" é…',
        opcoes: ['se virar com o que tem', 'passar por alguém', 'chegar'],
        resposta: 0,
      },
    ],
    tarefas: [
      'Escreva em inglês duas perguntas que você ouve no caixa de uma loja.',
      'Em português: anote quantas palavras você entendeu do trecho. Ouça de novo em 0,75× e anote de novo.',
    ],
  },
  'tvTRZJ-4EyI': {
    artista: 'Kendrick Lamar',
    nome: 'HUMBLE.',
    familia: 'rap-atual',
    tema: 'O refrão manda a pessoa sentar e ser humilde. Fala muito rápido, e é o retrato do rap de hoje: é por ela que se mede o quanto o ouvido já aguenta.',
    aviso: 'Palavrão em quase toda frase e imagens sexuais diretas.',
    vocabulario: [
      { en: 'humble', pt: 'humilde', nota: 'O "h" é aspirado em inglês: soa /HÂM-bol/, nunca "umble".' },
      { en: 'to stay humble', pt: 'manter os pés no chão' },
      { en: 'to show off', pt: 'se exibir' },
    ],
    perguntas: [
      {
        pergunta: 'O refrão manda a pessoa…',
        opcoes: ['Sentar e ser humilde', 'Correr mais rápido', 'Pagar a conta'],
        resposta: 0,
      },
      {
        pergunta: '"Humble" quer dizer…',
        opcoes: ['humilde', 'úmido', 'humano'],
        resposta: 0,
        porque: 'Úmido é "humid" e humano é "human". As três começam igual e terminam em lugares diferentes.',
      },
    ],
    tarefas: [
      'Ouça em 0,75× e escreva o refrão como você ouviu, mesmo errado. Depois compare com o que você escreveu na velocidade normal.',
      'Em português: ele fala com quem? Com um rival, com o público, ou consigo mesmo?',
    ],
  },
  xpVfcZ0ZcFM: {
    artista: 'Drake',
    nome: "God's Plan",
    familia: 'rap-atual',
    tema: 'Gente desejando o mal e as coisas dando certo de todo jeito. O clipe é o motivo de ela estar aqui: Drake pegou o orçamento do vídeo, quase um milhão de dólares, e distribuiu para pessoas de verdade — escola, mercado, abrigo. A tela é uma aula de agradecimento em inglês.',
    aviso: 'Palavrão pontual.',
    vocabulario: [
      { en: 'to wish someone bad', pt: 'desejar o mal a alguém' },
      { en: "I got your back.", pt: 'Pode contar comigo.', nota: 'Literalmente "cuido das suas costas".' },
      { en: 'Thank you so much.', pt: 'Muito obrigado.', nota: 'O clipe está cheio disso. Ouça como as pessoas respondem.' },
    ],
    perguntas: [
      {
        pergunta: 'No clipe, o que ele faz com o dinheiro do orçamento?',
        opcoes: ['Dá para pessoas de verdade, na rua e em instituições', 'Compra um carro', 'Aluga um estádio'],
        resposta: 0,
      },
      {
        pergunta: '"I got your back" é…',
        opcoes: ['pode contar comigo', 'peguei suas costas', 'estou atrás de você'],
        resposta: 0,
      },
    ],
    tarefas: [
      'Escreva em inglês quatro jeitos de agradecer, do mais seco ao mais caloroso.',
      'Em português: o clipe muda o sentido da letra? Como?',
    ],
  },
  QK8mJJJvaes: {
    artista: 'Macklemore',
    nome: 'Thrift Shop',
    familia: 'rap-atual',
    tema: 'Deboche de quem paga caro em roupa de marca: ele se veste em bazar de usados e acha ótimo. Casa direto com a Trilha Viagem — é a música de comprar, perguntar preço e pechinchar.',
    aviso: 'Palavrão no refrão e piada de banheiro.',
    vocabulario: [
      { en: 'thrift shop', pt: 'loja de usados, bazar', nota: 'Em inglês britânico, "charity shop".' },
      { en: 'This is a bargain.', pt: 'Isso é uma pechincha.' },
      { en: 'How much is it?', pt: 'Quanto custa?', nota: '"How much" para dinheiro, "how many" para quantidade.' },
    ],
    perguntas: [
      {
        pergunta: 'A música debocha de…',
        opcoes: ['Quem paga caro em roupa de marca', 'Quem anda de ônibus', 'Quem cozinha em casa'],
        resposta: 0,
      },
      {
        pergunta: 'Numa loja, como perguntar o preço?',
        opcoes: ['How much is it?', 'How many is it?', 'What price he has?'],
        resposta: 0,
        porque: 'Dinheiro é incontável em inglês: sempre "how much".',
      },
    ],
    tarefas: [
      'Escreva o diálogo de uma compra em inglês: você pergunta o preço, acha caro e pede desconto.',
      'Em português: o orgulho da música é de economizar, ou de não ligar para marca?',
    ],
  },
  VYOjWnS4cMY: {
    artista: 'Childish Gambino',
    nome: 'This Is America',
    familia: 'rap-atual',
    tema: 'Aqui o clipe diz mais que a letra, e é de propósito: dança alegre na frente da câmera e violência no fundo, para mostrar como se olha para um lado e não para o outro. O exercício é interpretar a imagem.',
    aviso: 'Violência armada em cena e palavrão. É pesado de ver, não só de ouvir.',
    vocabulario: [
      { en: 'to look away', pt: 'desviar o olhar' },
      { en: 'gun violence', pt: 'violência armada' },
      { en: 'to distract', pt: 'distrair', nota: '"A distraction" = aquilo que tira a sua atenção do que importa.' },
    ],
    perguntas: [
      {
        pergunta: 'O clipe mostra…',
        opcoes: ['Dança alegre na frente e violência no fundo, de propósito', 'Um show normal', 'Um jogo de futebol americano'],
        resposta: 0,
      },
      {
        pergunta: '"To look away" é…',
        opcoes: ['desviar o olhar', 'olhar de longe', 'procurar'],
        resposta: 0,
      },
    ],
    tarefas: [
      'Assista uma vez olhando só para o fundo da tela. Escreva em português o que você viu lá.',
      'Em inglês: uma frase sua com "look away".',
    ],
  },
  PsO6ZnUZI0g: {
    artista: 'Kanye West',
    nome: 'Stronger',
    familia: 'rap-atual',
    tema: 'O refrão é uma frase de Nietzsche virada música: o que não me mata me fortalece. A base vem de um trecho do Daft Punk — é o que em inglês se chama "sample". Refrão simples por cima de rap rápido: dá para pegar o refrão na primeira e o resto na terceira.',
    aviso: 'Palavrão pontual.',
    vocabulario: [
      { en: 'stronger', pt: 'mais forte', nota: 'Comparativo curto: strong → stronger. "More strong" não existe.' },
      { en: 'to work harder', pt: 'trabalhar mais, com mais afinco' },
      { en: 'sample', pt: 'trecho de outra música usado numa nova' },
    ],
    perguntas: [
      {
        pergunta: 'O refrão vem de uma frase famosa de…',
        opcoes: ['Nietzsche: o que não me mata me fortalece', 'Shakespeare', 'Bob Marley'],
        resposta: 0,
      },
      {
        pergunta: 'Qual é o comparativo certo?',
        opcoes: ['stronger', 'more strong', 'strongest than'],
        resposta: 0,
        porque: 'Adjetivo curto leva "-er". "More" só entra nos longos: more beautiful, more difficult.',
      },
    ],
    tarefas: [
      'Escreva cinco comparativos: strong, fast, big, beautiful, difficult. Dois levam "-er", três levam "more" — descubra quais.',
      'Em português: a frase do refrão é verdade na sua experiência? Escreva duas linhas.',
    ],
  },
  cjIvu7e6Wq8: {
    artista: 'Missy Elliott',
    nome: 'Work It',
    familia: 'rap-atual',
    tema: 'Brincadeira com o som das palavras do começo ao fim — tem até um trecho gravado de trás para frente, que ninguém entende e é a piada. Ouvir isso treina uma coisa útil: separar o som da palavra do sentido dela.',
    aviso: 'Duplo sentido sexual direto e palavrão.',
    vocabulario: [
      { en: 'Work it!', pt: 'Arrasa! / Manda ver!', nota: 'Se grita para quem está se saindo bem — na pista, no palco, na foto.' },
      { en: 'backwards', pt: 'de trás para frente', nota: '"-wards" dá direção: backwards, forwards, upwards.' },
      { en: 'to show what you can do', pt: 'mostrar do que é capaz' },
    ],
    perguntas: [
      {
        pergunta: 'A música é famosa por…',
        opcoes: ['Brincar com o som: tem um trecho gravado de trás para frente', 'Ser cantada em espanhol', 'Não ter batida'],
        resposta: 0,
      },
      {
        pergunta: '"Backwards" é…',
        opcoes: ['de trás para frente', 'de costas no chão', 'para o lado'],
        resposta: 0,
      },
    ],
    tarefas: [
      'Escreva quatro palavras terminadas em "-wards" e a direção de cada uma.',
      'Em português: teve um trecho em que você não entendeu nada? Esse é o da brincadeira. Escreva como ele soou para você.',
    ],
  },
}
