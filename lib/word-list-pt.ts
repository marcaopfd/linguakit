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
  'marca', 'medos', 'meios', 'lazer', 'metal', 'metro', 'moeda',
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
  // Difícil quer dizer "você vai ter de descobrir pelas letras", não "você
  // nunca viu isso na vida" — é um produto para ensinar a língua. Saíram as
  // arcaicas, as literárias, as de Portugal e os jargões; ficaram as que o
  // aluno encontra em texto de verdade, mesmo as que legenda de filme não
  // carrega: hífen, hiato, opaco, fosco, coeso, sanar.
  'adaga', 'afeto', 'afins', 'agudo', 'alvos', 'ameno', 'ampla', 'anexo',
  'apego', 'apelo', 'apito', 'ardil', 'ardor', 'arena', 'aspas', 'astro',
  'atroz', 'audaz', 'aviso', 'banal', 'bardo', 'bruma', 'bruto', 'cabal',
  'cacho', 'cauda', 'cerco', 'cerne', 'cetro', 'cisne', 'clero', 'coeso',
  'cofre', 'coral', 'credo', 'crise', 'cruel', 'dardo', 'dogma', 'duelo',
  'dócil', 'dúbio', 'fardo', 'fauna', 'fenda', 'feroz', 'fluxo', 'forja',
  'fosco', 'fosso', 'frota', 'fugaz', 'furto', 'fútil', 'galho', 'grato',
  'gênio', 'gíria', 'hiato', 'hiena', 'horda', 'hífen', 'ileso', 'imune',
  'inato', 'jaula', 'jejum', 'juros', 'lacre', 'lapso', 'largo', 'lenha',
  'liceu', 'limbo', 'lousa', 'lírio', 'magia', 'magno', 'manso', 'manto',
  'marco', 'meigo', 'mofar', 'morno', 'motim', 'mágoa', 'mútuo', 'nicho',
  'nudez', 'névoa', 'opaco', 'orgia', 'ousar', 'oxalá', 'pacto', 'palco',
  'pauta', 'pavor', 'pilar', 'pilha', 'plebe', 'plena', 'pluma', 'prole',
  'pudor', 'punho', 'pária', 'quilo', 'quota', 'raiar', 'rapto', 'rasgo',
  'recuo', 'regar', 'relva', 'remar', 'renda', 'rigor', 'rixas', 'rouco',
  'rubor', 'rubro', 'ruína', 'sagaz', 'salvo', 'sanar', 'sedar', 'seiva',
  'selar', 'senil', 'sulco', 'surdo', 'surto', 'sábio', 'sério', 'sósia',
  'tapar', 'tecer', 'tecla', 'temor', 'tenaz', 'terno', 'terço', 'toldo',
  'tolos', 'tombo', 'torto', 'tosco', 'trama', 'trato', 'traço', 'treva',
  'trevo', 'trigo', 'trono', 'tutor', 'tédio', 'tênue', 'urnas', 'vadio',
  'valsa', 'vasto', 'veloz', 'verba', 'verbo', 'viela', 'vigia', 'vigor',
  'viúvo', 'vulgo', 'vício', 'xeque', 'xisto', 'ábaco', 'ácido', 'álibi',
  'ápice', 'árduo', 'âmbar', 'ânimo', 'ânsia', 'ébano', 'épico', 'êxito',
  'êxodo', 'ícone', 'ídolo', 'ímpar', 'índio', 'óbito', 'ópera', 'órfão',
] as const
