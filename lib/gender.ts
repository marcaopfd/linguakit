/**
 * Builds the gender mistake an English speaker actually makes.
 *
 * The error is almost never the noun — nobody means to say "professora" for a
 * man. It is agreement: the article, the adjective, the possessive, the
 * participle. "A problema", "o casa", "muito bonito" said of a woman,
 * "obrigado" said by one. So only the agreeing words are flipped here, and the
 * noun is left exactly where it is; flipping that would change who is being
 * talked about rather than produce a mistake.
 *
 * One word changes per variant. A distractor that differs in two places lets
 * the learner find it by shape instead of by grammar.
 *
 * Portuguese only. The English course has nothing to flip, and callers check
 * the course before asking.
 */

/**
 * Masculine → feminine, for words that agree rather than name.
 *
 * Everything here is unambiguous. The bare articles "o" and "a" are not, and
 * they are deliberately absent: "a" is also the preposition in "fica a uns
 * cinco minutos", "o" is also a pronoun, and flipping either produced nonsense
 * that teaches nothing. "um/uma" and "do/da/no/na" carry the same lesson and
 * can only be articles, so the point survives the omission. Likewise absent:
 * "nos" and "nas", which are pronouns in "nos vemos"; "ao/às", which are
 * swallowed by time expressions; and "quanto" and "segundo", which are
 * adverbs at least as often as they agree with anything.
 */
const AGREEING_PAIRS: ReadonlyArray<readonly [string, string]> = [
  // Articles and contractions that cannot be anything else.
  ['um', 'uma'], ['uns', 'umas'],
  ['do', 'da'], ['dos', 'das'],
  ['no', 'na'], ['pelo', 'pela'], ['pelos', 'pelas'],

  // Demonstratives.
  ['este', 'esta'], ['esse', 'essa'], ['aquele', 'aquela'],
  ['estes', 'estas'], ['esses', 'essas'], ['aqueles', 'aquelas'],

  // Possessives.
  ['meu', 'minha'], ['meus', 'minhas'], ['teu', 'tua'], ['teus', 'tuas'],
  ['seu', 'sua'], ['seus', 'suas'], ['nosso', 'nossa'], ['nossos', 'nossas'],

  // Quantifiers and ordinals.
  ['muito', 'muita'], ['muitos', 'muitas'], ['pouco', 'pouca'],
  ['todo', 'toda'], ['todos', 'todas'], ['outro', 'outra'], ['outros', 'outras'],
  ['tanto', 'tanta'],
  ['primeiro', 'primeira'], ['último', 'última'],

  // The one that catches everybody: it agrees with whoever is speaking.
  ['obrigado', 'obrigada'],

  // Frequent adjectives and participles.
  ['bonito', 'bonita'], ['alto', 'alta'], ['baixo', 'baixa'],
  ['novo', 'nova'], ['velho', 'velha'], ['jovem', 'jovem'],
  ['cansado', 'cansada'], ['ocupado', 'ocupada'], ['pronto', 'pronta'],
  ['quieto', 'quieta'], ['aberto', 'aberta'], ['fechado', 'fechada'],
  ['caro', 'cara'], ['barato', 'barata'], ['cheio', 'cheia'],
  ['curioso', 'curiosa'], ['nervoso', 'nervosa'], ['famoso', 'famosa'],
  ['simpático', 'simpática'], ['antipático', 'antipática'],
  ['brasileiro', 'brasileira'], ['americano', 'americana'],
  ['irlandês', 'irlandesa'], ['português', 'portuguesa'],
  ['inglês', 'inglesa'], ['francês', 'francesa'],
  ['casado', 'casada'], ['solteiro', 'solteira'],
  ['perdido', 'perdida'], ['preocupado', 'preocupada'],
  ['obrigatório', 'obrigatória'], ['certo', 'certa'], ['errado', 'errada'],
]

/** Both directions, lowercase keys. Words equal in both genders are skipped. */
const FLIP = new Map<string, string>()
for (const [masc, fem] of AGREEING_PAIRS) {
  if (masc === fem) continue
  FLIP.set(masc, fem)
  FLIP.set(fem, masc)
}

/** Keeps "A" capitalised when it replaces "O" at the start of a sentence. */
function matchCase(original: string, replacement: string): string {
  if (original[0] === original[0]?.toUpperCase() && original[0] !== original[0]?.toLowerCase()) {
    return replacement[0].toUpperCase() + replacement.slice(1)
  }
  return replacement
}

/** Whether a sentence has anything whose gender could be got wrong. */
export function hasGenderedAgreement(sentence: string): boolean {
  return findFlippable(sentence).length > 0
}

/** Positions of the words this sentence could disagree on. */
function findFlippable(sentence: string): { index: number; word: string }[] {
  const out: { index: number; word: string }[] = []
  // Unicode-aware so "simpático" and "irlandês" are single words.
  const words = sentence.match(/[\p{L}\p{M}]+/gu) ?? []

  words.forEach((word, index) => {
    const lower = word.toLowerCase()
    if (!FLIP.has(lower)) return

    // "Nossa, está caro!" is an exclamation, not a possessive. It opens the
    // sentence and is followed by punctuation; the possessive is followed by
    // the thing possessed.
    if (lower === 'nossa' && index === 0 && /^nossa\s*[,!.…]/i.test(sentence.trim())) return

    out.push({ index, word })
  })

  // When a sentence offers several, the most instructive one goes first.
  // "Muito obrigado" can be bent at either word, but "muita obrigado" is a slip
  // nobody makes, while getting "obrigado/obrigada" wrong is the error of the
  // entire language for an English speaker.
  return out.sort((a, b) => priority(b.word) - priority(a.word) || a.index - b.index)
}

function priority(word: string): number {
  return word.toLowerCase().startsWith('obrigad') ? 1 : 0
}

/**
 * The same sentence with one agreement word in the wrong gender, or null when
 * there is nothing to get wrong.
 *
 * `pick` chooses which one when several are available, so a caller with a seed
 * gets the same variant every time.
 */
export function wrongGender(sentence: string, pick = 0): string | null {
  const candidates = findFlippable(sentence)
  if (candidates.length === 0) return null

  const chosen = candidates[pick % candidates.length]
  let seen = -1

  const flipped = sentence.replace(/[\p{L}\p{M}]+/gu, word => {
    seen += 1
    if (seen !== chosen.index) return word
    const other = FLIP.get(word.toLowerCase())
    return other ? matchCase(word, other) : word
  })

  // A flip that changed nothing is not a distractor.
  return flipped === sentence ? null : flipped
}

/**
 * The one word that differs between the right line and the gendered wrong one.
 *
 * Used to name the mistake instead of only marking it: being told "it is alta,
 * not alto" is the whole lesson, and hunting for the difference across two long
 * sentences is not.
 */
export function differingWord(correct: string, wrong: string): { right: string; wrong: string } | null {
  const a = correct.match(/[\p{L}\p{M}]+/gu) ?? []
  const b = wrong.match(/[\p{L}\p{M}]+/gu) ?? []
  if (a.length !== b.length) return null

  let found: { right: string; wrong: string } | null = null
  for (let i = 0; i < a.length; i++) {
    if (a[i] === b[i]) continue
    // More than one difference means this is not a single agreement slip.
    if (found) return null
    found = { right: a[i], wrong: b[i] }
  }
  return found
}
