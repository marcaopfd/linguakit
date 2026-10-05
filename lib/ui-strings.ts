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
}

/** `lang` is the language being taught; the learner reads the other one. */
export function uiStrings(lang: string): UiStrings {
  return lang.startsWith('pt') ? EN : PT
}
