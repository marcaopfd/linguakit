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
}

/** `lang` is the language being taught; the learner reads the other one. */
export function uiStrings(lang: string): UiStrings {
  return lang.startsWith('pt') ? EN : PT
}
