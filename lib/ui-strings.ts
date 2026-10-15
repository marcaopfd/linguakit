/**
 * Lesson and module chrome, in the learner's OWN language.
 *
 * Which one that is, is the opposite of what the course teaches: a Brazilian
 * learning English should read Portuguese buttons, and an English speaker
 * learning Portuguese should read English ones. `uiStrings()` takes the target
 * language already passed around for speech synthesis and flips it, so there is
 * no second prop to keep in sync.
 */
export type UiStrings = {
  back: string
  unit: string
  lessonNotFound: string
  moduleNotFound: string
  completed: string
  markAsDone: string
  steps: { objectives: string; vocabulary: string; grammar: string; dialogue: string; exercises: string; culture: string }
  learningObjectives: string
  commonMistakes: string
  culturalNote: string
  teacherTip: string
  extraPractice: string
  moreExercises: (n: number) => string
  check: string
  typeYourAnswer: string
  listen: string
  playDialogue: string
  stop: string
  slow: string
  unitsCompleted: (done: number, total: number) => string
  done: string

  // Portal do aluno
  loading: string
  studentNotFound: string
  hello: string
  courseLabel: string
  overallProgress: string
  modules: string
  signOut: string

  // "Seus erros"
  yourMistakes: string
  noMistakesYet: string
  noMistakesHint: string
  accuracy: string
  answeredCount: (n: number) => string
  mistakeCount: (n: number) => string
  youAnswered: string
  correctAnswer: string
  seeAll: (n: number) => string
  showLess: string
  blank: string

  // Gravar a própria voz (shadowing)
  record: string
  recordAgain: string
  stopRecording: string
  playYours: string
  micDenied: string
  recordingStaysHere: string

  // Revisão espaçada
  review: string
  reviewDue: (n: number) => string
  reviewNothingDue: string
  reviewNothingDueHint: string
  reviewStart: string
  showAnswer: string
  gotIt: string
  missedIt: string
  reviewProgress: (done: number, total: number) => string
  reviewDone: string
  reviewDoneHint: string
  backToCourse: string
  reviewExplain: string

  // Lembrete do link de acesso (aluno sem conta)
  saveYourLink: string
  saveYourLinkHint: string
  copyLink: string
  linkCopied: string
  couldNotLoad: string
  tryAgain: string

  // Prática (um item por vez)
  practice: string
  practiceStart: string
  practiceEmpty: string
  typeAnswer: string
  verify: string
  continueOn: string
  correctFeedback: string
  wrongFeedback: string
  practiceDone: string
  practiceScore: (right: number, total: number) => string
  nextUnit: string
  moduleFinished: string
  practiceAgain: string
  exitPractice: string

  // Atividades geradas a partir da unidade
  actListenChoose: string
  actListenChooseHint: string
  actSayIt: string
  actSayItHint: string
  actDialogueGap: string
  actDialogueGapHint: string
  actWordOrder: string
  actWordOrderHint: string
  actDictation: string
  actDictationHint: string
  playAudio: string
  playAgain: string
  hearAnswer: string
  tapWordsInOrder: string
  clearSentence: string
  noAudioHere: string

  // Rodadas dentro de uma unidade
  roundLabel: (n: number, total: number) => string
  roundDone: string
  roundDoneHint: string
  keepGoing: string
  takeABreak: string

  // Sotaque do curso
  accentTitle: string
  accentHint: string
  accentMissing: (places: string) => string
  accentNotSaved: string

  // Prática ao vivo (conversa)
  liveTitle: string
  liveSub: string
  liveStart: string
  liveYouAre: string
  liveYourTurn: string
  liveWrong: string
  liveGenderHint: (right: string, wrong: string) => string
  liveDone: string
  liveDoneHint: (right: number, total: number) => string
  liveAgain: string

  // Palavra do dia
  wordTitle: string
  wordSub: string
  wordBands: { easy: string; medium: string; hard: string }
  wordToday: (band: string) => string
  wordTooShort: string
  wordNoReply: string
  wordWon: (tries: number) => string
  wordLost: string
  wordAnswerWas: string
  wordNextIn: string
  wordStreak: (days: number) => string
  wordComeBack: string
  wordEnter: string
  wordDelete: string
}

const EN: UiStrings = {
  back: 'Back',
  unit: 'Unit',
  lessonNotFound: 'Lesson not found.',
  moduleNotFound: 'Module not found.',
  completed: 'Completed',
  markAsDone: 'Mark as done',
  steps: { objectives: 'Objectives', vocabulary: 'Vocabulary', grammar: 'Grammar', dialogue: 'Dialogue', exercises: 'Exercises', culture: 'Culture' },
  learningObjectives: 'Learning Objectives',
  commonMistakes: 'Common Mistakes',
  culturalNote: 'Cultural Note',
  teacherTip: 'Teacher Tip',
  extraPractice: 'Extra practice',
  moreExercises: n => `+ More exercises (${n})`,
  check: 'Check',
  typeYourAnswer: 'Type your answer...',
  listen: 'Listen',
  playDialogue: 'Play dialogue',
  stop: 'Stop',
  slow: 'Slow',
  unitsCompleted: (done, total) => `${done} of ${total} units completed`,
  done: 'Done',

  loading: 'Loading...',
  studentNotFound: 'Student not found.',
  hello: 'Hello',
  courseLabel: 'Portuguese Course',
  overallProgress: 'Overall progress',
  modules: 'Modules',
  signOut: 'Sign out',

  yourMistakes: 'Your mistakes',
  noMistakesYet: 'Nothing to review yet',
  noMistakesHint: 'Answer the exercises in a lesson and anything you get wrong will show up here.',
  accuracy: 'correct',
  answeredCount: n => `${n} answered`,
  mistakeCount: n => `${n} to review`,
  youAnswered: 'You answered',
  correctAnswer: 'Correct answer',
  seeAll: n => `See all ${n}`,
  showLess: 'Show less',
  blank: 'left blank',

  record: 'Record yourself',
  recordAgain: 'Record again',
  stopRecording: 'Stop recording',
  playYours: 'Play your recording',
  micDenied: 'Could not use the microphone. Check your browser permissions.',
  recordingStaysHere: 'Listen, record yourself, compare. Your recording stays on this device and is never uploaded.',

  review: 'Review',
  reviewDue: n => `${n} due today`,
  reviewNothingDue: 'Nothing due right now',
  reviewNothingDueHint: 'Anything you get wrong comes back here — tomorrow, then further apart each time you get it right.',
  reviewStart: 'Start review',
  showAnswer: 'Show answer',
  gotIt: 'I got it',
  missedIt: 'I missed it',
  reviewProgress: (done, total) => `${done} of ${total}`,
  reviewDone: 'Review finished',
  reviewDoneHint: 'What you missed will come back sooner; what you got right, later.',
  backToCourse: 'Back to my course',
  reviewExplain: 'Get it right and it comes back later. Miss it and it comes back tomorrow.',

  saveYourLink: 'Save this link',
  saveYourLinkHint: 'This page is how you get back into your course. Bookmark it — without it, only your teacher can restore your access.',
  copyLink: 'Copy link',
  linkCopied: 'Link copied',
  couldNotLoad: 'Could not load your course. Your link is fine — this is a connection problem.',
  tryAgain: 'Try again',

  practice: 'Practice',
  practiceStart: 'Practice this unit',
  practiceEmpty: 'This unit has no exercises yet.',
  typeAnswer: 'Type your answer',
  verify: 'Check',
  continueOn: 'Continue',
  correctFeedback: 'Correct!',
  wrongFeedback: 'Correct answer:',
  practiceDone: 'Unit complete',
  practiceScore: (right, total) => `${right} of ${total} correct`,
  nextUnit: 'Next unit',
  moduleFinished: 'You finished this module.',
  practiceAgain: 'Practice again',
  exitPractice: 'Back to my course',

  actListenChoose: 'Listen and choose',
  actListenChooseHint: 'Play the audio and pick what it means.',
  actSayIt: 'Say it in Portuguese',
  actSayItHint: 'Pick the Portuguese for this. Tap an option to hear it.',
  actDialogueGap: 'The reply',
  actDialogueGapHint: 'Listen to the line, then choose the reply that follows',
  actWordOrder: 'Build the sentence',
  actWordOrderHint: 'Listen, then tap the words in the right order.',
  actDictation: 'Dictation',
  actDictationHint: 'Listen and write what you hear. Accents and punctuation are not counted.',
  playAudio: 'Play',
  playAgain: 'Play again',
  hearAnswer: 'Hear it',
  tapWordsInOrder: 'Tap the words in order',
  clearSentence: 'Start over',
  noAudioHere: 'This device has no voice for Portuguese, so the text is shown instead.',

  roundLabel: (n, total) => `Round ${n} of ${total}`,
  roundDone: 'Round complete',
  roundDoneHint: 'The next one asks a little more of you.',
  keepGoing: 'Keep going',
  takeABreak: 'Stop here for now',

  accentTitle: 'Which Portuguese do you want to hear?',
  accentHint: 'Pick where you are headed. Every word, example and dialogue is then read in that accent.',
  accentMissing: places => `Not on this device: ${places}. Another phone or computer may have them.`,
  accentNotSaved: 'The accent played, but could not be saved. It will reset when you come back.',

  liveTitle: 'Live practice',
  liveSub: 'A real situation. You take one side and choose what you say.',
  liveStart: 'Join the conversation',
  liveYouAre: 'You are',
  liveYourTurn: 'What do you say?',
  liveWrong: 'Not that one.',
  liveGenderHint: (right, wrong) => `Gender: it is “${right}”, not “${wrong}”.`,
  liveDone: 'Conversation finished',
  liveDoneHint: (right, total) => `${right} of ${total} right first time.`,
  liveAgain: 'Have it again',

  wordTitle: 'Word of the day',
  wordSub: 'Five letters, six tries. The same word for everyone, today only.',
  wordBands: { easy: 'easy', medium: 'medium', hard: 'hard' },
  wordToday: band => `Today's word is ${band}. Accents are shown, never typed.`,
  wordTooShort: 'Five letters.',
  wordNoReply: 'That did not go through. Press enter again.',
  wordWon: tries => (tries === 1 ? 'First try!' : `Got it in ${tries}.`),
  wordLost: 'Out of tries.',
  wordAnswerWas: 'The word was',
  wordNextIn: 'New word in',
  wordStreak: days => (days === 1 ? '1 day in a row' : `${days} days in a row`),
  wordComeBack: 'Come back tomorrow for the next one.',
  wordEnter: 'Enter',
  wordDelete: 'Delete',
}

const PT: UiStrings = {
  back: 'Voltar',
  unit: 'Unit',
  lessonNotFound: 'Lição não encontrada.',
  moduleNotFound: 'Módulo não encontrado.',
  completed: 'Concluída',
  markAsDone: 'Marcar como concluída',
  steps: { objectives: 'Objetivos', vocabulary: 'Vocabulário', grammar: 'Gramática', dialogue: 'Diálogo', exercises: 'Exercícios', culture: 'Cultura' },
  learningObjectives: 'Objetivos da lição',
  commonMistakes: 'Erros comuns',
  culturalNote: 'Nota cultural',
  teacherTip: 'Dica do professor',
  extraPractice: 'Prática extra',
  moreExercises: n => `+ Mais exercícios (${n})`,
  check: 'Conferir',
  typeYourAnswer: 'Digite sua resposta...',
  listen: 'Ouvir',
  playDialogue: 'Ouvir diálogo',
  stop: 'Parar',
  slow: 'Devagar',
  unitsCompleted: (done, total) => `${done} de ${total} units concluídas`,
  done: 'Concluída',

  loading: 'Carregando...',
  studentNotFound: 'Aluno não encontrado.',
  hello: 'Olá',
  courseLabel: 'Curso de Inglês',
  overallProgress: 'Progresso geral',
  modules: 'Módulos',
  signOut: 'Sair',

  yourMistakes: 'Seus erros',
  noMistakesYet: 'Nada para revisar ainda',
  noMistakesHint: 'Responda os exercícios de uma lição e o que você errar aparece aqui.',
  accuracy: 'de acerto',
  answeredCount: n => `${n} respondidos`,
  mistakeCount: n => `${n} para revisar`,
  youAnswered: 'Você respondeu',
  correctAnswer: 'Resposta certa',
  seeAll: n => `Ver todos os ${n}`,
  showLess: 'Mostrar menos',
  blank: 'em branco',

  record: 'Gravar sua voz',
  recordAgain: 'Gravar de novo',
  stopRecording: 'Parar gravação',
  playYours: 'Ouvir sua gravação',
  micDenied: 'Não foi possível usar o microfone. Verifique a permissão do navegador.',
  recordingStaysHere: 'Ouça, grave sua voz e compare. Sua gravação fica neste aparelho e nunca é enviada.',

  review: 'Revisão',
  reviewDue: n => `${n} para revisar hoje`,
  reviewNothingDue: 'Nada para revisar agora',
  reviewNothingDueHint: 'O que você errar volta aqui — amanhã, e depois cada vez mais espaçado conforme você acerta.',
  reviewStart: 'Começar revisão',
  showAnswer: 'Mostrar resposta',
  gotIt: 'Acertei',
  missedIt: 'Errei',
  reviewProgress: (done, total) => `${done} de ${total}`,
  reviewDone: 'Revisão concluída',
  reviewDoneHint: 'O que você errou volta mais cedo; o que acertou, mais tarde.',
  backToCourse: 'Voltar para o curso',
  reviewExplain: 'Acertou, volta mais tarde. Errou, volta amanhã.',

  saveYourLink: 'Salve este link',
  saveYourLinkHint: 'Esta página é o seu acesso ao curso. Guarde nos favoritos — sem ela, só o seu professor consegue recuperar o seu acesso.',
  copyLink: 'Copiar link',
  linkCopied: 'Link copiado',
  couldNotLoad: 'Não foi possível carregar seu curso. Seu link está certo — é um problema de conexão.',
  tryAgain: 'Tentar de novo',

  practice: 'Praticar',
  practiceStart: 'Praticar esta unit',
  practiceEmpty: 'Esta unit ainda não tem exercícios.',
  typeAnswer: 'Digite sua resposta',
  verify: 'Conferir',
  continueOn: 'Continuar',
  correctFeedback: 'Acertou!',
  wrongFeedback: 'Resposta certa:',
  practiceDone: 'Unit concluída',
  practiceScore: (right, total) => `${right} de ${total} certas`,
  nextUnit: 'Próxima unit',
  moduleFinished: 'Você terminou este módulo.',
  practiceAgain: 'Praticar de novo',
  exitPractice: 'Voltar para o curso',

  actListenChoose: 'Ouvir e escolher',
  actListenChooseHint: 'Toque para ouvir e escolha o que significa.',
  actSayIt: 'Como se diz em inglês',
  actSayItHint: 'Escolha a frase em inglês. Toque numa opção para ouvir.',
  actDialogueGap: 'A resposta',
  actDialogueGapHint: 'Ouça a fala e escolha a resposta que vem depois',
  actWordOrder: 'Montar a frase',
  actWordOrderHint: 'Ouça e toque nas palavras na ordem certa.',
  actDictation: 'Ditado',
  actDictationHint: 'Ouça e escreva o que você ouviu. Acento e pontuação não contam.',
  playAudio: 'Ouvir',
  playAgain: 'Ouvir de novo',
  hearAnswer: 'Ouvir',
  tapWordsInOrder: 'Toque nas palavras na ordem',
  clearSentence: 'Começar de novo',
  noAudioHere: 'Este aparelho não tem voz em inglês, então o texto aparece no lugar.',

  roundLabel: (n, total) => `Rodada ${n} de ${total}`,
  roundDone: 'Rodada concluída',
  roundDoneHint: 'A próxima pede um pouco mais de você.',
  keepGoing: 'Continuar',
  takeABreak: 'Parar por aqui',

  accentTitle: 'Qual inglês você quer ouvir?',
  accentHint: 'Escolha para onde você vai. Todas as palavras, exemplos e diálogos passam a ser falados nesse sotaque.',
  accentMissing: places => `Neste aparelho não tem: ${places}. Outro celular ou computador pode ter.`,
  accentNotSaved: 'O sotaque tocou, mas não deu para salvar. Ele volta ao normal quando você voltar.',

  liveTitle: 'Prática ao vivo',
  liveSub: 'Uma situação real. Você assume um lado e escolhe o que diz.',
  liveStart: 'Entrar na conversa',
  liveYouAre: 'Você é',
  liveYourTurn: 'O que você diz?',
  liveWrong: 'Não é essa.',
  liveGenderHint: (right, wrong) => `Atenção: é “${right}”, não “${wrong}”.`,
  liveDone: 'Conversa concluída',
  liveDoneHint: (right, total) => `${right} de ${total} de primeira.`,
  liveAgain: 'Conversar de novo',

  wordTitle: 'Palavra do dia',
  wordSub: 'Cinco letras, seis tentativas. A mesma palavra para todo mundo, só hoje.',
  wordBands: { easy: 'fácil', medium: 'média', hard: 'difícil' },
  wordToday: band => `A palavra de hoje é ${band}. Acentos aparecem, mas não precisam ser digitados.`,
  wordTooShort: 'São cinco letras.',
  wordNoReply: 'Não foi dessa vez. Aperte enviar de novo.',
  wordWon: tries => (tries === 1 ? 'De primeira!' : `Acertou em ${tries}.`),
  wordLost: 'Acabaram as tentativas.',
  wordAnswerWas: 'A palavra era',
  wordNextIn: 'Palavra nova em',
  wordStreak: days => (days === 1 ? '1 dia seguido' : `${days} dias seguidos`),
  wordComeBack: 'Volte amanhã para a próxima.',
  wordEnter: 'Enviar',
  wordDelete: 'Apagar',
}

/** `lang` is the language being taught; the learner reads the other one. */
export function uiStrings(lang: string): UiStrings {
  return lang.startsWith('pt') ? EN : PT
}
