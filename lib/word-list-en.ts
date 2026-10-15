/**
 * Five-letter English words for the daily puzzle, in three bands.
 *
 * Same shape as the Portuguese list and the same reason for existing: the
 * course vocabulary held fifty-eight of them, which runs out in two months.
 *
 * easy    — met in the first levels: food, colours, home, school, weather.
 * medium  — everyday but past the basics.
 * hard    — abstract or uncommon, the kind that needs the letters to be worked
 *           out rather than recalled.
 */

export const EN_EASY = [
  'hello', 'water', 'bread', 'green', 'black', 'white', 'small', 'heavy',
  'cheap', 'juice', 'happy', 'house', 'table', 'chair', 'night', 'light',
  'money', 'phone', 'train', 'apple', 'beach', 'child', 'class', 'clean',
  'close', 'cloud', 'dance', 'drink', 'drive', 'early', 'earth', 'eight',
  'enjoy', 'every', 'field', 'first', 'floor', 'fruit', 'glass', 'grass',
  'great', 'group', 'heart', 'horse', 'hotel', 'hours', 'large', 'learn',
  'leave', 'lemon', 'lunch', 'metal', 'month', 'mouth', 'music', 'never',
  'north', 'often', 'party', 'paper', 'place', 'plant', 'plate', 'price',
  'quick', 'radio', 'right', 'river', 'roads', 'salad', 'sheep', 'shirt',
  'shoes', 'short', 'sleep', 'smile', 'snack', 'sound', 'south', 'speak',
  'sport', 'start', 'store', 'story', 'study', 'sugar', 'sweet', 'teach',
  'thank', 'think', 'three', 'today', 'tired', 'towel', 'tower', 'truck',
  'uncle', 'under', 'visit', 'voice', 'watch', 'where', 'which', 'woman',
  'world', 'write', 'young', 'about', 'after', 'again', 'below', 'books', 'bring', 'build', 'catch', 'clock', 'color', 'count', 'dream',
  'dress', 'fresh', 'front', 'funny', 'laugh', 'match', 'maybe',
  'movie', 'offer', 'order', 'other', 'pizza', 'plane', 'point',
  'ready', 'round', 'shall', 'share', 'shine', 'sorry', 'spend', 'stand',
  'still', 'sunny', 'their', 'there', 'those', 'tooth', ] as const

export const EN_MEDIUM = [
  'above', 'actor', 'adapt', 'adult', 'agent', 'agree', 'ahead', 'alarm',
  'album', 'alert', 'alike', 'alive', 'allow', 'alone', 'along', 'among',
  'anger', 'angle', 'angry', 'apart', 'apply', 'argue', 'arise', 'armed',
  'array', 'arrow', 'aside', 'asset', 'audio', 'avoid', 'award', 'aware',
  'basic', 'basis', 'began', 'begin', 'being', 'bench', 'birth', 'blame',
  'blank', 'blind', 'block', 'blood', 'board', 'boost', 'bound', 'brain',
  'brand', 'brave', 'break', 'breed', 'brief', 'broad', 'broke', 'brown',
  'built', 'buyer', 'check', 'chest', 'chief', 'chose', 'civil', 'claim',
  'clear', 'click', 'climb', 'coach', 'coast', 'could', 'court', 'cover',
  'craft', 'crash', 'cream', 'crime', 'cross', 'crowd', 'crown', 'curve',
  'cycle', 'daily', 'dated', 'dealt', 'death', 'debut', 'delay', 'depth',
  'doing', 'doubt', 'dozen', 'draft', 'drama', 'drawn', 'drill', 'drove',
  'eager', 'elite', 'empty', 'enemy', 'enter', 'entry', 'equal', 'error',
  'event', 'exact', 'exist', 'extra', 'faith', 'false', 'fault', 'fifth',
  'fifty', 'fight', 'final', 'fixed', 'flash', 'fleet', 'fluid', 'focus',
  'force', 'forth', 'forty', 'forum', 'found', 'frame', 'frank', 'fraud',
  'given', 'grace', 'grade', 'grant', 'guard', 'guess', 'guest', 'guide',
  'honor', 'human', 'ideal', 'image', 'index', 'inner', 'input', 'issue',
] as const

export const EN_HARD = [
  'abide', 'abyss', 'acrid', 'adept', 'adorn', 'affix', 'agile', 'aloof',
  'amble', 'amend', 'amiss', 'ample', 'angst', 'aptly', 'ardor', 'arbor',
  'atlas', 'augur', 'avail', 'avert', 'awash', 'azure', 'banal', 'baste',
  'bawdy', 'beget', 'befit', 'belie', 'berth', 'bevel', 'bland', 'bleak',
  'blend', 'bloat', 'blunt', 'bluff', 'bogus', 'brash', 'brisk', 'broth',
  'cache', 'caper', 'carat', 'caste', 'cater', 'caulk', 'cease', 'chafe',
  'chasm', 'chide', 'churl', 'cinch', 'clamp', 'clash', 'cleft', 'cling',
  'clout', 'conch', 'covet', 'cower', 'credo', 'crept', 'crone', 'crude',
  'crypt', 'cubic', 'curio', 'curse', 'cynic', 'daunt', 'debit', 'decay',
  'decoy', 'decry', 'defer', 'deign', 'deity', 'delve', 'demur', 'denim',
  'deter', 'dicey', 'dingy', 'dirge', 'ditty', 'dogma', 'douse', 'dowdy',
  'dowry', 'dread', 'drone', 'dross', 'druid', 'eclat', 'edict', 'eerie',
  'egret', 'eject', 'elate', 'elder', 'elfin', 'elope', 'elude', 'embed',
  'emcee', 'emend', 'emote', 'endow', 'ennui', 'ensue', 'envoy', 'epoch',
  'equip', 'erode', 'ether', 'ethos', 'evade', 'evoke', 'exalt', 'excel',
  'exert', 'exile', 'expel', 'extol', 'exult', 'fable', 'facet', 'feign',
  'feint', 'fetid', 'fiery', 'flair', 'fleck', 'flout', 'foray', 'forge',
  'forte', 'foyer', 'frail', 'frown', 'furor', 'gaffe', 'gamut', 'gauge',
  'gaunt', 'genre', 'girth', 'glean', 'glide', 'gloat', 'gnarl', 'gorge',
  'grasp', 'grate', 'gravy', 'grimy', 'groom', 'grope', 'gruel', 'guile',
] as const
