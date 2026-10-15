/**
 * Five-letter Portuguese words for the daily puzzle, in three bands.
 *
 * The course's own vocabulary only held fifty of them, which is fifty days
 * before the game repeats itself. These are written out so a year can pass
 * without the same answer twice, and so the difficulty can be made to rise and
 * fall rather than arrive at random.
 *
 * Length is counted without accents, because that is how the word is typed:
 * "irmão" and "manhã" are five.
 *
 * easy    — a beginner has met these: family, colours, food, the house.
 * medium  — everyday but past the first lessons; common verbs and feelings.
 * hard    — abstract, less frequent, or spelled in a way that catches people.
 */

export const PT_EASY = [
  'verde', 'preto', 'claro', 'tchau', 'vinte', 'cento', 'idade', 'jovem',
  'irmão', 'filho', 'filha', 'primo', 'carro', 'livro', 'porta', 'praia',
  'tarde', 'noite', 'feliz', 'forte', 'pouco', 'muito', 'antes', 'nunca',
  'ontem', 'manhã', 'tempo', 'fruta', 'carne', 'leite', 'prato', 'chave',
  'papel', 'ponte', 'campo', 'festa', 'amigo', 'amiga', 'gente', 'homem',
  'maior', 'menor', 'legal', 'certo', 'longe', 'baixo', 'cheio', 'vazio',
  'limpo', 'velho', 'calor', 'chuva', 'vento', 'terra', 'areia', 'folha',
  'pedra', 'peixe', 'horas', 'meses', 'época', 'prazo', 'falar', 'comer',
  'beber', 'morar', 'andar', 'pular', 'subir', 'pegar', 'jogar', 'lavar',
  'ligar', 'olhar', 'parar', 'pedir', 'tocar', 'virar', 'mudar', 'nadar',
  'casar', 'criar', 'ficar', 'levar', 'pagar', 'poder', 'tomar', 'achar',
  'abrir', 'dizer', 'fazer', 'saber', 'tirar', 'braço', 'perna', 'dente',
  'rosto', 'olhos', 'barba', 'testa', 'unhas', 'ombro', 'peito', 'dedos',
  'corpo', 'nariz', 'massa', 'arroz', 'molho', 'manga', 'limão', 'melão',
  'milho', 'torta', 'pudim', 'copos', 'garfo', 'forno', 'fogão', 'telha',
  'casas', 'lares', 'azuis', 'cinza', 'prata', 'monte', 'serra',
  'lagos', 'nuvem', 'selva', 'clima', 'doces', 'figos', 'pizza',
  'bebês', 'chefe', 'aluno', 'turma', 'dupla', 'casal', 'noiva', 'genro',
  'sogra', 'netos', 'moças', 'gatos', 'vacas', 'porco', 'galos', 'patos',
] as const

export const PT_MEDIUM = [
  'ajuda', 'brisa', 'calma', 'canto', 'carta', 'causa', 'ciclo', 'corte', 'costa', 'curso', 'custo', 'dever', 'donos',
  'dores', 'erros', 'fases', 'feira', 'ferro', 'fibra', 'final',
  'firme', 'força', 'fraco', 'frase', 'fruto', 'ganho', 'gesto',
  'grupo', 'gosto', 'graça', 'greve', 'hábil', 'ideia', 'igual', 'junto', 'justo', 'laços', 'leito', 'leque', 'livre', 'lucro', 'lugar',
  'marca', 'medos', 'meios', 'messe', 'metal', 'metro', 'moeda',
  'molde', 'morte', 'mundo', 'nível', 'nobre', 'norte', 'notas', 'obras',
  'ordem', 'ouvir', 'parte', 'passo', 'pausa', 'perda', 'pesar', 'pires', 'placa', 'plano', 'pobre', 'ponto', 'posse', 'posto', 'praça',
  'prece', 'preço', 'prova', 'quase', 'queda', 'ramos', 'razão',
  'regra', 'reino', 'risco', 'ritmo', 'rumos', 'salão', 'saúde',
  'sinal', 'sonho', 'sorte', 'sabor', 'teste', 'texto', 'tipos', 'troca',
  'turno', 'união', 'valor', 'vidro', 'visão', 'vista', 'volta', 'zonas',
  'caber', 'calar', 'cavar', 'ceder', 'curar', 'errar', 'estar', 'ferir',
  'medir', 'mexer', 'pisar', 'rezar', 'rolar', 'somar', 'sumir', 'votar',
  'secar', 'girar', 'matar', 'notar', 'puxar', 'rodar', 'durar',
  'focar', 'guiar', 'honra', 'lenço', 'linha', 'louça', 'luvas', 'navio',
] as const

export const PT_HARD = [
  'ábaco', 'ácido', 'afeto', 'afins', 'álibi', 'alvos', 'ameno', 'âmbar',
  'ampla', 'anexo', 'ânimo', 'anuir', 'apego', 'apito', 'árduo', 'arfar',
  'astro', 'atroz', 'audaz', 'aviso', 'bafio', 'banal', 'bruma', 'bruto',
  'cacho', 'cauda', 'cerne', 'cetro', 'cisão', 'cofre', 'coral', 'crise',
  'cruel', 'dengo', 'dogma', 'dúbio', 'ébano', 'édito', 'épico', 'ermos',
  'êxito', 'êxodo', 'fardo', 'fauna', 'fenda', 'fluxo', 'fosco', 'frota',
  'fugaz', 'fuste', 'gênio', 'glosa', 'grato', 'hiato', 'hífen', 'horda',
  'ídolo', 'ileso', 'ímpar', 'índio', 'inato', 'jazer', 'lacre', 'lapso',
  'largo', 'lauda', 'liceu', 'limbo', 'lírio', 'lodos', 'magno', 'manso',
  'morno', 'mudez', 'nicho', 'nulos', 'ócios', 'ódios', 'ópera', 'ousar',
  'parco', 'pauta', 'pavor', 'pilar', 'plena', 'prole', 'pudor', 'punho',
  'quota', 'rasgo', 'recuo', 'relvo', 'rigor', 'rixas', 'rouco', 'rubro',
  'sábio', 'sagaz', 'sanar', 'seiva', 'sério', 'surdo', 'tédio', 'tenaz',
  'terno', 'tolos', 'torpe', 'trama', 'trevo', 'ufano', 'vadio', 'veloz',
  'verbo', 'vício', 'vigor', 'vulgo',
  // Reforço: a faixa difícil ficou curta de 122, que é o mínimo para um ano
  // com três faixas alternando.
  'abeto', 'adaga', 'afago', 'algoz', 'ardil', 'arena', 'bardo', 'brado',
  'cerco', 'cisne', 'clero', 'credo', 'dardo', 'duelo', 'forja', 'fosso',
  'galho', 'gleba', 'hiena', 'jaula', 'legar', 'lenha', 'logro', 'lousa',
  'magia', 'manto', 'marco', 'mofar', 'mosto', 'névoa', 'nódoa', 'opaco',
  'orgia', 'pacto', 'pajem', 'palco', 'pilha', 'plebe', 'pluma', 'prumo',
  'quilo', 'raiar', 'rapto', 'regar', 'relva', 'remar', 'renda', 'sacra',
  'salvo', 'seara', 'sedar', 'selar', 'senil', 'sulco', 'talho', 'tapar',
  'tecer', 'tecla', 'teima', 'terço', 'toldo', 'tombo', 'trato', 'treva',
  'trigo', 'trono', 'tutor', 'urdir', 'urnas', 'valsa', 'verve', 'viela',
  'vigia', 'vinco', 'viúvo', 'xisto',
] as const
