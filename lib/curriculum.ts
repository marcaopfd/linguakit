export interface VocabItem {
  pt: string;
  en: string;
  ex: string;
  exEn: string;
}

export interface GrammarExample {
  pt: string;
  en: string;
}

export interface Grammar {
  title: string;
  explain: string;
  structure: string;
  examples: GrammarExample[];
  extendedExamples?: GrammarExample[];
}

export interface DialogueLine {
  sp: 'a' | 'b';
  pt: string;
  en: string;
}

export interface Dialogue {
  scene: string;
  lines: DialogueLine[];
}

export interface ExerciseItem {
  q: string;
  opts?: string[];
  ans: string | number;
}

export interface Exercise {
  type: string;
  instruction: string;
  items: ExerciseItem[];
}

export interface Culture {
  title: string;
  text: string;
}

export interface Unit {
  title: string;
  sub: string;
  emoji: string;
  duration: string;
  objectives: string[];
  vocabulary: VocabItem[];
  extraVocab?: VocabItem[];
  grammar: Grammar;
  dialogue: Dialogue;
  exercises: Exercise[];
  extraExercises?: Exercise[];
  commonMistakes?: { wrong: string; correct: string; note?: string; en?: string }[];
  culture: Culture;
  teacherTip?: string;
}

export interface Module {
  id: string;
  label: string;
  name: string;
  desc: string;
  emoji: string;
  color: string;
  accent: string;
  bar: string;
  units: Unit[];
}

export const MODULES: Module[] = [
  {
    "id": "a1",
    "label": "A1",
    "name": "Complete Beginner",
    "desc": "Survival Portuguese. Greetings, numbers, basic needs, and your first real conversations.",
    "color": "#e8f4fd",
    "accent": "#1a5c9e",
    "bar": "#5ba3d4",
    "emoji": "👋",
    "units": [
      {
        "title": "Hello & Goodbye",
        "sub": "Greetings and basic social phrases",
        "emoji": "👋",
        "duration": "~45 min",
        "objectives": [
          "Use olá, oi, bom dia, boa tarde, boa noite correctly",
          "Introduce yourself with name and nationality",
          "End a conversation naturally"
        ],
        "vocabulary": [
          {
            "pt": "olá / oi",
            "en": "hello / hi",
            "ex": "Oi! Tudo bem?",
            "exEn": "Hi! How are you?"
          },
          {
            "pt": "bom dia",
            "en": "good morning",
            "ex": "Bom dia! Como vai?",
            "exEn": "Good morning! How are you?"
          },
          {
            "pt": "boa tarde",
            "en": "good afternoon",
            "ex": "Boa tarde, professora!",
            "exEn": "Good afternoon, teacher!"
          },
          {
            "pt": "boa noite",
            "en": "good evening/night",
            "ex": "Boa noite! Até amanhã.",
            "exEn": "Good night! See you tomorrow."
          },
          {
            "pt": "tchau / até logo",
            "en": "bye / see you soon",
            "ex": "Tchau! Até logo!",
            "exEn": "Bye! See you soon!"
          },
          {
            "pt": "tudo bem?",
            "en": "how are you? / all good?",
            "ex": "Oi! Tudo bem?",
            "exEn": "Hi! All good?"
          }
        ],
        "grammar": {
          "title": "Ser — to be (for identity)",
          "explain": "In Portuguese there are two verbs for \"to be\": ser and estar. Use ser for permanent things like your name, nationality, and profession.",
          "structure": "Eu sou + [name/nationality/profession]",
          "examples": [
            {
              "pt": "Eu sou Sarah.",
              "en": "I am Sarah."
            },
            {
              "pt": "Eu sou irlandesa.",
              "en": "I am Irish."
            },
            {
              "pt": "Ele é professor.",
              "en": "He is a teacher."
            }
          ],
          "extendedExamples": [
            {
              "pt": "Eu sou brasileira.",
              "en": "I am Brazilian."
            },
            {
              "pt": "Eu sou o Pedro.",
              "en": "I am Pedro."
            },
            {
              "pt": "Eu sou médico.",
              "en": "I am a doctor."
            },
            {
              "pt": "Eu sou estudante.",
              "en": "I am a student."
            },
            {
              "pt": "Eu sou americana.",
              "en": "I am American."
            }
          ]
        },
        "dialogue": {
          "scene": "Sarah meets her neighbour for the first time in Dublin.",
          "lines": [
            {
              "sp": "a",
              "pt": "Olá! Eu sou Sarah. E você?",
              "en": "Hello! I am Sarah. And you?"
            },
            {
              "sp": "b",
              "pt": "Oi Sarah! Eu sou Marcos. Muito prazer!",
              "en": "Hi Sarah! I am Marcos. Nice to meet you!"
            },
            {
              "sp": "a",
              "pt": "Muito prazer também! Você é brasileiro?",
              "en": "Nice to meet you too! Are you Brazilian?"
            },
            {
              "sp": "b",
              "pt": "Sim, sou de Salvador. E você, é irlandesa?",
              "en": "Yes, I'm from Salvador. And you, are you Irish?"
            },
            {
              "sp": "a",
              "pt": "Sou sim! De Dublin. Até logo, Marcos!",
              "en": "I am! From Dublin. See you soon, Marcos!"
            },
            {
              "sp": "b",
              "pt": "Até logo! Tchau!",
              "en": "See you! Bye!"
            }
          ]
        },
        "exercises": [
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct greeting for the time shown.",
            "items": [
              {
                "q": "8:00 AM — You see your neighbour.",
                "opts": [
                  "Boa noite",
                  "Bom dia",
                  "Boa tarde"
                ],
                "ans": 1
              },
              {
                "q": "3:00 PM — You arrive at a café.",
                "opts": [
                  "Bom dia",
                  "Tchau",
                  "Boa tarde"
                ],
                "ans": 2
              },
              {
                "q": "9:00 PM — You're leaving a restaurant.",
                "opts": [
                  "Boa noite",
                  "Oi",
                  "Bom dia"
                ],
                "ans": 0
              }
            ]
          },
          {
            "type": "Fill in the blank",
            "instruction": "Complete with the correct form of ser.",
            "items": [
              {
                "q": "Eu ___ Sarah.",
                "ans": "sou"
              },
              {
                "q": "Ele ___ brasileiro.",
                "ans": "é"
              },
              {
                "q": "Você ___ irlandês?",
                "ans": "é"
              }
            ]
          }
        ],
        "culture": {
          "title": "Tudo bem? — The Brazilian greeting ritual 🇧🇷",
          "text": "In Brazil, \"tudo bem?\" is used constantly — as a greeting, not just a real question. The answer is almost always \"tudo bem!\" or \"tudo bom!\" even if things aren't perfect. Brazilians are culturally warm and it's common to greet people with a kiss on the cheek (especially women) or a firm handshake."
        },
        "extraVocab": [
          {
            "pt": "olá",
            "en": "hello",
            "ex": "Olá, eu sou a Maria.",
            "exEn": "Hello, I am Maria."
          },
          {
            "pt": "tchau",
            "en": "bye",
            "ex": "Tchau! Até logo!",
            "exEn": "Bye! See you later!"
          },
          {
            "pt": "prazer",
            "en": "nice to meet you",
            "ex": "Prazer, eu sou o Carlos.",
            "exEn": "Nice to meet you, I am Carlos."
          },
          {
            "pt": "até logo",
            "en": "see you later",
            "ex": "Até logo! Eu sou seu professor.",
            "exEn": "See you later! I am your teacher."
          },
          {
            "pt": "bom dia",
            "en": "good morning",
            "ex": "Bom dia! Eu sou Ana.",
            "exEn": "Good morning! I am Ana."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Eu é professor.",
            "correct": "Eu sou professor.",
            "note": "English speakers sometimes confuse 'sou' and 'é'. Use 'sou' with 'eu' (I) and 'é' with 'ele/ela' (he/she)."
          },
          {
            "wrong": "Eu sou um médico.",
            "correct": "Eu sou médico.",
            "note": "In Brazilian Portuguese, the indefinite article 'um/uma' is usually omitted before professions after 'ser'."
          },
          {
            "wrong": "Eu sou americano. (said by a woman)",
            "correct": "Eu sou americana.",
            "note": "Adjectives of nationality must agree in gender. Women use the feminine form, e.g. 'americana' instead of 'americano'."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct word.",
            "items": [
              {
                "q": "Eu ___ professor.",
                "ans": "sou"
              },
              {
                "q": "___ sou brasileira.",
                "ans": "Eu"
              },
              {
                "q": "Eu ___ a Ana.",
                "ans": "sou"
              },
              {
                "q": "Eu ___ estudante.",
                "ans": "sou"
              },
              {
                "q": "___ sou médico.",
                "ans": "Eu"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option.",
            "items": [
              {
                "q": "Ela ___ brasileira.",
                "opts": [
                  "sou",
                  "é",
                  "somos",
                  "são"
                ],
                "ans": 1
              },
              {
                "q": "Eu ___ americano.",
                "opts": [
                  "é",
                  "são",
                  "sou",
                  "somos"
                ],
                "ans": 2
              },
              {
                "q": "Nós ___ estudantes.",
                "opts": [
                  "sou",
                  "é",
                  "são",
                  "somos"
                ],
                "ans": 3
              },
              {
                "q": "Eles ___ médicos.",
                "opts": [
                  "sou",
                  "é",
                  "somos",
                  "são"
                ],
                "ans": 3
              },
              {
                "q": "Você ___ professor.",
                "opts": [
                  "sou",
                  "é",
                  "somos",
                  "são"
                ],
                "ans": 1
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese.",
            "items": [
              {
                "q": "I am a doctor.",
                "ans": "Eu sou médico."
              },
              {
                "q": "I am Brazilian.",
                "ans": "Eu sou brasileiro."
              },
              {
                "q": "I am a student.",
                "ans": "Eu sou estudante."
              },
              {
                "q": "I am Maria.",
                "ans": "Eu sou a Maria."
              },
              {
                "q": "I am American.",
                "ans": "Eu sou americano."
              }
            ]
          }
        ],
        "teacherTip": "Remind students that 'sou' is only used with 'eu' (I), and that Brazilian Portuguese typically drops the indefinite article before professions — saying 'Eu sou professor' instead of 'Eu sou um professor'. Practising short self-introduction dialogues with greetings like 'olá' and 'prazer' helps students internalize both the vocabulary and the verb pattern naturally."
      },
      {
        "title": "Numbers & Age",
        "sub": "1–100, telling your age, basic quantities",
        "emoji": "🔢",
        "duration": "~45 min",
        "objectives": [
          "Count from 1 to 100 in Portuguese",
          "Ask and say how old someone is",
          "Use numbers in everyday contexts"
        ],
        "vocabulary": [
          {
            "pt": "um / uma",
            "en": "one (m/f)",
            "ex": "Eu tenho um irmão.",
            "exEn": "I have one brother."
          },
          {
            "pt": "dois / duas",
            "en": "two (m/f)",
            "ex": "Dois cafés, por favor.",
            "exEn": "Two coffees, please."
          },
          {
            "pt": "dez",
            "en": "ten",
            "ex": "Dez euros.",
            "exEn": "Ten euros."
          },
          {
            "pt": "vinte",
            "en": "twenty",
            "ex": "Ela tem vinte anos.",
            "exEn": "She is twenty years old."
          },
          {
            "pt": "trinta",
            "en": "thirty",
            "ex": "Trinta reais.",
            "exEn": "Thirty reais."
          },
          {
            "pt": "cem / cento",
            "en": "one hundred",
            "ex": "Cem pessoas.",
            "exEn": "One hundred people."
          }
        ],
        "grammar": {
          "title": "Ter — to have (age in Portuguese)",
          "explain": "In Portuguese, you don't \"be\" an age — you \"have\" years. This is different from English! Use ter (to have) to talk about age.",
          "structure": "Eu tenho + [number] + anos",
          "examples": [
            {
              "pt": "Eu tenho 28 anos.",
              "en": "I am 28 years old."
            },
            {
              "pt": "Ela tem 35 anos.",
              "en": "She is 35 years old."
            },
            {
              "pt": "Quantos anos você tem?",
              "en": "How old are you?"
            }
          ],
          "extendedExamples": [
            {
              "pt": "Eu tenho dezoito anos.",
              "en": "I am eighteen years old."
            },
            {
              "pt": "Eu tenho vinte e cinco anos.",
              "en": "I am twenty-five years old."
            },
            {
              "pt": "Eu tenho trinta anos.",
              "en": "I am thirty years old."
            },
            {
              "pt": "Eu tenho oito anos.",
              "en": "I am eight years old."
            },
            {
              "pt": "Eu tenho quarenta e dois anos.",
              "en": "I am forty-two years old."
            }
          ]
        },
        "dialogue": {
          "scene": "Sarah and Marcos chat about ages over coffee.",
          "lines": [
            {
              "sp": "a",
              "pt": "Marcos, quantos anos você tem?",
              "en": "Marcos, how old are you?"
            },
            {
              "sp": "b",
              "pt": "Tenho trinta e dois anos. E você?",
              "en": "I'm thirty-two. And you?"
            },
            {
              "sp": "a",
              "pt": "Tenho vinte e oito anos.",
              "en": "I'm twenty-eight."
            },
            {
              "sp": "b",
              "pt": "Ah, você é mais nova! Você tem irmãos?",
              "en": "Oh, you're younger! Do you have siblings?"
            },
            {
              "sp": "a",
              "pt": "Tenho dois irmãos. E você?",
              "en": "I have two brothers. And you?"
            },
            {
              "sp": "b",
              "pt": "Tenho uma irmã.",
              "en": "I have one sister."
            }
          ]
        },
        "exercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Write the number in Portuguese.",
            "items": [
              {
                "q": "She is 25 years old. → Ela tem ___ anos.",
                "ans": "vinte e cinco"
              },
              {
                "q": "I have 3 brothers. → Eu tenho ___ irmãos.",
                "ans": "três"
              },
              {
                "q": "Two coffees please. → ___ cafés, por favor.",
                "ans": "dois"
              }
            ]
          }
        ],
        "culture": {
          "title": "Brazilian numbers — regional quirks 🔢",
          "text": "Brazilians often say \"meia\" (half) instead of \"seis\" (six) when giving phone numbers or codes — it's clearer over the phone. So a phone number starting with 6 would be said as \"meia\". Also, in Brazil the comma is used as a decimal separator: R$2,50 means two reais and fifty cents."
        },
        "extraVocab": [
          {
            "pt": "a idade",
            "en": "age",
            "ex": "Qual é a sua idade?",
            "exEn": "What is your age?"
          },
          {
            "pt": "o ano",
            "en": "year",
            "ex": "Eu tenho vinte anos.",
            "exEn": "I am twenty years old."
          },
          {
            "pt": "o aniversário",
            "en": "birthday",
            "ex": "Hoje é o meu aniversário.",
            "exEn": "Today is my birthday."
          },
          {
            "pt": "quantos",
            "en": "how many",
            "ex": "Quantos anos você tem?",
            "exEn": "How old are you?"
          },
          {
            "pt": "jovem",
            "en": "young",
            "ex": "Ela é muito jovem.",
            "exEn": "She is very young."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Eu sou vinte anos.",
            "correct": "Eu tenho vinte anos.",
            "note": "In Portuguese, age uses the verb 'ter' (to have), not 'ser' (to be). Never say 'Eu sou [number] anos.'"
          },
          {
            "wrong": "Eu tenho vinte ano.",
            "correct": "Eu tenho vinte anos.",
            "note": "The word 'anos' must always be plural when expressing age, even in English we say 'years', not 'year'."
          },
          {
            "wrong": "Eu tenho anos vinte.",
            "correct": "Eu tenho vinte anos.",
            "note": "In Portuguese, the number comes before the noun: 'vinte anos', not 'anos vinte'."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct word.",
            "items": [
              {
                "q": "Eu ___ quinze anos.",
                "ans": "tenho"
              },
              {
                "q": "Ela tem vinte e dois ___.",
                "ans": "anos"
              },
              {
                "q": "___ anos você tem?",
                "ans": "Quantos"
              },
              {
                "q": "Eu tenho trinta e ___ anos.",
                "ans": "três"
              },
              {
                "q": "Hoje é o meu ___.",
                "ans": "aniversário"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option.",
            "items": [
              {
                "q": "Eu ___ doze anos.",
                "opts": [
                  "sou",
                  "estou",
                  "tenho",
                  "faço"
                ],
                "ans": 2
              },
              {
                "q": "Quantos ___ você tem?",
                "opts": [
                  "meses",
                  "anos",
                  "dias",
                  "nomes"
                ],
                "ans": 1
              },
              {
                "q": "Ela tem ___ anos.",
                "opts": [
                  "dezasseis",
                  "dezesseis",
                  "seisseis",
                  "dez e seis"
                ],
                "ans": 1
              },
              {
                "q": "Eu tenho vinte e ___ anos.",
                "opts": [
                  "uma",
                  "um",
                  "uno",
                  "uns"
                ],
                "ans": 1
              },
              {
                "q": "___ anos você tem?",
                "opts": [
                  "Quanto",
                  "Qual",
                  "Quantos",
                  "Como"
                ],
                "ans": 2
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese.",
            "items": [
              {
                "q": "I am fourteen years old.",
                "ans": "Eu tenho quatorze anos."
              },
              {
                "q": "How old are you?",
                "ans": "Quantos anos você tem?"
              },
              {
                "q": "She is thirty years old.",
                "ans": "Ela tem trinta anos."
              },
              {
                "q": "Today is my birthday.",
                "ans": "Hoje é o meu aniversário."
              },
              {
                "q": "He is twenty-five years old.",
                "ans": "Ele tem vinte e cinco anos."
              }
            ]
          }
        ],
        "teacherTip": "Remind students that Portuguese uses 'ter' (to have) for age, which feels unnatural for English speakers who say 'I am 20 years old.' A fun memory trick: in Portuguese, you literally 'have' years, so practice the full pattern 'Eu tenho + number + anos' as one fixed chunk from the very beginning."
      },
      {
        "title": "Family & People",
        "sub": "Talking about your family members",
        "emoji": "👨‍👩‍👧",
        "duration": "~50 min",
        "objectives": [
          "Name immediate and extended family members",
          "Describe your family in simple sentences",
          "Use possessives meu/minha correctly"
        ],
        "vocabulary": [
          {
            "pt": "a mãe",
            "en": "mother/mum",
            "ex": "Minha mãe é de Cork.",
            "exEn": "My mum is from Cork."
          },
          {
            "pt": "o pai",
            "en": "father/dad",
            "ex": "O meu pai trabalha em Dublin.",
            "exEn": "My dad works in Dublin."
          },
          {
            "pt": "o irmão / a irmã",
            "en": "brother / sister",
            "ex": "Eu tenho um irmão.",
            "exEn": "I have one brother."
          },
          {
            "pt": "o marido / a esposa",
            "en": "husband / wife",
            "ex": "O meu marido é brasileiro.",
            "exEn": "My husband is Brazilian."
          },
          {
            "pt": "o filho / a filha",
            "en": "son / daughter",
            "ex": "Eles têm uma filha.",
            "exEn": "They have a daughter."
          },
          {
            "pt": "os avós",
            "en": "grandparents",
            "ex": "Meus avós moram em Salvador.",
            "exEn": "My grandparents live in Salvador."
          }
        ],
        "grammar": {
          "title": "Meu / Minha — My (possessives agree with gender)",
          "explain": "In Portuguese, possessives agree with the noun they describe, not the owner. So a woman says \"meu marido\" (because marido is masculine) and \"minha mãe\" (because mãe is feminine).",
          "structure": "meu + [masculine noun] / minha + [feminine noun]",
          "examples": [
            {
              "pt": "Meu irmão se chama Tom.",
              "en": "My brother's name is Tom."
            },
            {
              "pt": "Minha mãe tem 55 anos.",
              "en": "My mum is 55 years old."
            },
            {
              "pt": "O meu pai trabalha aqui.",
              "en": "My dad works here."
            }
          ],
          "extendedExamples": [
            {
              "pt": "Meu pai trabalha muito.",
              "en": "My father works a lot."
            },
            {
              "pt": "Minha mãe é professora.",
              "en": "My mother is a teacher."
            },
            {
              "pt": "Meu irmão tem doze anos.",
              "en": "My brother is twelve years old."
            },
            {
              "pt": "Minha filha estuda inglês.",
              "en": "My daughter studies English."
            },
            {
              "pt": "Meu avô é muito simpático.",
              "en": "My grandfather is very friendly."
            }
          ]
        },
        "dialogue": {
          "scene": "Sarah shows Marcos a photo of her family.",
          "lines": [
            {
              "sp": "a",
              "pt": "Olha! Esta é a minha família.",
              "en": "Look! This is my family."
            },
            {
              "sp": "b",
              "pt": "Que família grande! Quem é ela?",
              "en": "What a big family! Who is she?"
            },
            {
              "sp": "a",
              "pt": "É a minha mãe. Ela se chama Mary.",
              "en": "It's my mum. Her name is Mary."
            },
            {
              "sp": "b",
              "pt": "E este senhor, é o seu pai?",
              "en": "And this gentleman, is he your dad?"
            },
            {
              "sp": "a",
              "pt": "Sim! O meu pai se chama Patrick. Tem 60 anos.",
              "en": "Yes! My dad's name is Patrick. He's 60."
            },
            {
              "sp": "b",
              "pt": "Legal! E você tem filhos?",
              "en": "Cool! And do you have children?"
            },
            {
              "sp": "a",
              "pt": "Ainda não. E você?",
              "en": "Not yet. And you?"
            }
          ]
        },
        "exercises": [
          {
            "type": "Multiple choice",
            "instruction": "Choose meu or minha.",
            "items": [
              {
                "q": "___ pai (father)",
                "opts": [
                  "meu",
                  "minha"
                ],
                "ans": 0
              },
              {
                "q": "___ mãe (mother)",
                "opts": [
                  "meu",
                  "minha"
                ],
                "ans": 1
              },
              {
                "q": "___ irmã (sister)",
                "opts": [
                  "meu",
                  "minha"
                ],
                "ans": 1
              }
            ]
          },
          {
            "type": "Fill in the blank",
            "instruction": "Translate into Portuguese.",
            "items": [
              {
                "q": "My husband is Irish. → ___ marido é irlandês.",
                "ans": "Meu"
              },
              {
                "q": "My sister's name is Claire. → ___ irmã se chama Claire.",
                "ans": "Minha"
              }
            ]
          }
        ],
        "culture": {
          "title": "Family in Brazilian culture 👨‍👩‍👧‍👦",
          "text": "Family (família) is central to Brazilian culture. Sundays are typically family days with big lunches (almoço de domingo) featuring rice, beans, roast meat, and salad. Grandparents often live close to or with their children. Family gatherings (reuniões de família) are frequent and festive — don't be surprised if a \"quick visit\" turns into a 4-hour affair with food and music."
        },
        "extraVocab": [
          {
            "pt": "avô",
            "en": "grandfather",
            "ex": "Meu avô tem setenta anos.",
            "exEn": "My grandfather is seventy years old."
          },
          {
            "pt": "avó",
            "en": "grandmother",
            "ex": "Minha avó mora em São Paulo.",
            "exEn": "My grandmother lives in São Paulo."
          },
          {
            "pt": "sobrinho",
            "en": "nephew",
            "ex": "Meu sobrinho tem cinco anos.",
            "exEn": "My nephew is five years old."
          },
          {
            "pt": "sobrinha",
            "en": "niece",
            "ex": "Minha sobrinha é muito inteligente.",
            "exEn": "My niece is very intelligent."
          },
          {
            "pt": "primo",
            "en": "cousin (male)",
            "ex": "Meu primo mora no Rio de Janeiro.",
            "exEn": "My cousin lives in Rio de Janeiro."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Meu mãe é bonita.",
            "correct": "Minha mãe é bonita.",
            "note": "English speakers often use 'meu' for everything, but Portuguese possessives must agree with the gender of the noun, not the owner. 'Mãe' is feminine, so it requires 'minha'."
          },
          {
            "wrong": "Minha pai trabalha aqui.",
            "correct": "Meu pai trabalha aqui.",
            "note": "'Pai' (father) is masculine, so it requires 'meu', not 'minha'. Always check the gender of the noun being possessed, not who is speaking."
          },
          {
            "wrong": "Meu irmã é médica.",
            "correct": "Minha irmã é médica.",
            "note": "'Irmã' (sister) is feminine, so it takes 'minha'. A helpful trick: nouns ending in -ã or -a are usually feminine and need 'minha'."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with 'meu' or 'minha'.",
            "items": [
              {
                "q": "___ irmão mora em Brasília.",
                "ans": "Meu"
              },
              {
                "q": "___ mãe tem quarenta anos.",
                "ans": "Minha"
              },
              {
                "q": "___ pai é engenheiro.",
                "ans": "Meu"
              },
              {
                "q": "___ filha estuda muito.",
                "ans": "Minha"
              },
              {
                "q": "___ avô é simpático.",
                "ans": "Meu"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option to complete the sentence.",
            "items": [
              {
                "q": "___ prima mora em Salvador.",
                "opts": [
                  "Meu",
                  "Minha",
                  "Seu",
                  "Sua"
                ],
                "ans": 1
              },
              {
                "q": "___ irmão tem vinte anos.",
                "opts": [
                  "Minha",
                  "Sua",
                  "Meu",
                  "Seu"
                ],
                "ans": 2
              },
              {
                "q": "Minha mãe é ___.",
                "opts": [
                  "professor",
                  "médico",
                  "dentista",
                  "enfermeira"
                ],
                "ans": 3
              },
              {
                "q": "___ sobrinho é muito inteligente.",
                "opts": [
                  "Minha",
                  "Meu",
                  "Sua",
                  "Seu"
                ],
                "ans": 1
              },
              {
                "q": "Meu pai é ___.",
                "opts": [
                  "professora",
                  "médica",
                  "dentista",
                  "enfermeira"
                ],
                "ans": 2
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese.",
            "items": [
              {
                "q": "My brother is a doctor.",
                "ans": "Meu irmão é médico."
              },
              {
                "q": "My mother is a teacher.",
                "ans": "Minha mãe é professora."
              },
              {
                "q": "My grandfather lives in Rio de Janeiro.",
                "ans": "Meu avô mora no Rio de Janeiro."
              },
              {
                "q": "My niece is five years old.",
                "ans": "Minha sobrinha tem cinco anos."
              },
              {
                "q": "My cousin is very friendly.",
                "ans": "Meu primo é muito simpático."
              }
            ]
          }
        ],
        "teacherTip": "Remind students that 'meu' and 'minha' agree with the noun they describe, not with the gender of the speaker — so a woman still says 'meu pai' and a man still says 'minha mãe'. Practicing with family vocabulary is ideal because students already know whether each family member is male or female."
      },
      {
        "title": "Colors & Descriptions",
        "sub": "Describing things around you",
        "emoji": "🎨",
        "duration": "~45 min",
        "objectives": [
          "Name the main colours in Portuguese",
          "Describe objects using adjectives",
          "Understand gender agreement with adjectives"
        ],
        "vocabulary": [
          {
            "pt": "vermelho/a",
            "en": "red",
            "ex": "O carro é vermelho.",
            "exEn": "The car is red."
          },
          {
            "pt": "azul",
            "en": "blue",
            "ex": "O céu está azul.",
            "exEn": "The sky is blue."
          },
          {
            "pt": "verde",
            "en": "green",
            "ex": "A bandeira é verde e amarela.",
            "exEn": "The flag is green and yellow."
          },
          {
            "pt": "amarelo/a",
            "en": "yellow",
            "ex": "O sol é amarelo.",
            "exEn": "The sun is yellow."
          },
          {
            "pt": "preto/a",
            "en": "black",
            "ex": "Eu tenho um gato preto.",
            "exEn": "I have a black cat."
          },
          {
            "pt": "branco/a",
            "en": "white",
            "ex": "A casa é branca.",
            "exEn": "The house is white."
          }
        ],
        "grammar": {
          "title": "Adjective gender agreement",
          "explain": "In Portuguese, adjectives must agree in gender (masculine/feminine) and number (singular/plural) with the noun they describe. Most adjectives ending in -o change to -a for feminine.",
          "structure": "[noun m.] + adj-o / [noun f.] + adj-a",
          "examples": [
            {
              "pt": "O carro vermelho.",
              "en": "The red car. (masculine)"
            },
            {
              "pt": "A bicicleta vermelha.",
              "en": "The red bicycle. (feminine)"
            },
            {
              "pt": "Os carros vermelhos.",
              "en": "The red cars. (plural)"
            }
          ],
          "extendedExamples": [
            {
              "pt": "O carro vermelho é novo.",
              "en": "The red car is new."
            },
            {
              "pt": "A mochila amarela é grande.",
              "en": "The yellow backpack is big."
            },
            {
              "pt": "O gato preto é bonito.",
              "en": "The black cat is pretty."
            },
            {
              "pt": "A flor branca é pequena.",
              "en": "The white flower is small."
            },
            {
              "pt": "O caderno azul é meu.",
              "en": "The blue notebook is mine."
            }
          ]
        },
        "dialogue": {
          "scene": "Sarah and Marcos are shopping at a market.",
          "lines": [
            {
              "sp": "a",
              "pt": "Eu gosto desta camiseta. Que cor é esta?",
              "en": "I like this t-shirt. What colour is this?"
            },
            {
              "sp": "b",
              "pt": "É verde! A cor do Brasil.",
              "en": "It's green! Brazil's colour."
            },
            {
              "sp": "a",
              "pt": "E aquela? A amarela?",
              "en": "And that one? The yellow one?"
            },
            {
              "sp": "b",
              "pt": "Também é linda! Azul e amarelo — cores da bandeira.",
              "en": "It's also beautiful! Blue and yellow — flag colours."
            },
            {
              "sp": "a",
              "pt": "Vou levar a verde. Quanto custa?",
              "en": "I'll take the green one. How much is it?"
            }
          ]
        },
        "exercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Write the correct form of the colour.",
            "items": [
              {
                "q": "A bolsa é ___ (red). → A bolsa é ___.",
                "ans": "vermelha"
              },
              {
                "q": "O carro é ___ (black). → O carro é ___.",
                "ans": "preto"
              },
              {
                "q": "A casa é ___ (white). → A casa é ___.",
                "ans": "branca"
              }
            ]
          }
        ],
        "culture": {
          "title": "The Brazilian flag and its colours 🇧🇷",
          "text": "The Brazilian flag features the exact colours Brazilians love most: green (representing forests), yellow (representing gold and wealth), blue (representing the sky), and white (peace). These colours appear everywhere in Brazilian design, fashion, and football culture. Saying \"verde e amarelo\" is immediately associated with national pride."
        },
        "extraVocab": [
          {
            "pt": "claro",
            "en": "light (shade)",
            "ex": "O azul claro é bonito.",
            "exEn": "The light blue is pretty."
          },
          {
            "pt": "escuro",
            "en": "dark (shade)",
            "ex": "Ela usa um vestido verde escuro.",
            "exEn": "She wears a dark green dress."
          },
          {
            "pt": "cor",
            "en": "color",
            "ex": "Qual é a sua cor favorita?",
            "exEn": "What is your favorite color?"
          },
          {
            "pt": "listrado",
            "en": "striped",
            "ex": "O gato é listrado.",
            "exEn": "The cat is striped."
          },
          {
            "pt": "colorido",
            "en": "colorful",
            "ex": "O livro é muito colorido.",
            "exEn": "The book is very colorful."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "A carro vermelho.",
            "correct": "O carro vermelho.",
            "note": "In Portuguese, nouns have grammatical gender. 'Carro' is masculine, so it uses 'o', not 'a'."
          },
          {
            "wrong": "A mesa é brancho.",
            "correct": "A mesa é branca.",
            "note": "Adjectives must agree in gender with the noun. 'Mesa' is feminine, so the adjective must end in -a: 'branca'."
          },
          {
            "wrong": "O vestido é rosa.",
            "correct": "O vestido é rosa.",
            "note": "Actually 'rosa' is correct here — some color adjectives like 'rosa', 'laranja', and 'bege' are invariable and never change their ending regardless of noun gender."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct form of the adjective.",
            "items": [
              {
                "q": "A bolsa é ___. (vermelho)",
                "ans": "vermelha"
              },
              {
                "q": "O livro é ___. (amarelo)",
                "ans": "amarelo"
              },
              {
                "q": "A camisa é ___. (branco)",
                "ans": "branca"
              },
              {
                "q": "O sapato é ___. (preto)",
                "ans": "preto"
              },
              {
                "q": "A caneta é ___. (azul)",
                "ans": "azul"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option to complete the sentence.",
            "items": [
              {
                "q": "O carro é ___.",
                "opts": [
                  "vermelha",
                  "vermelho",
                  "vermelhos",
                  "vermelhas"
                ],
                "ans": 1
              },
              {
                "q": "A flor é ___.",
                "opts": [
                  "brancos",
                  "branco",
                  "brancas",
                  "branca"
                ],
                "ans": 3
              },
              {
                "q": "O gato é ___.",
                "opts": [
                  "preta",
                  "pretas",
                  "preto",
                  "pretos"
                ],
                "ans": 2
              },
              {
                "q": "A mochila é ___.",
                "opts": [
                  "amarelo",
                  "amarela",
                  "amarelos",
                  "amarelas"
                ],
                "ans": 1
              },
              {
                "q": "O caderno é ___.",
                "opts": [
                  "azula",
                  "azulo",
                  "azul",
                  "azuis"
                ],
                "ans": 2
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese.",
            "items": [
              {
                "q": "The green bag is big.",
                "ans": "A bolsa verde é grande."
              },
              {
                "q": "The black car is new.",
                "ans": "O carro preto é novo."
              },
              {
                "q": "The white shirt is small.",
                "ans": "A camisa branca é pequena."
              },
              {
                "q": "The yellow book is mine.",
                "ans": "O livro amarelo é meu."
              },
              {
                "q": "The blue pen is pretty.",
                "ans": "A caneta azul é bonita."
              }
            ]
          }
        ],
        "teacherTip": "Remind students that in Brazilian Portuguese, adjectives must match the gender of the noun they describe — masculine nouns pair with adjectives ending in -o, and feminine nouns with -a. A helpful trick is to have students always learn a noun together with its article (o/a) so gender agreement becomes automatic."
      },
      {
        "title": "Days, Months & Time",
        "sub": "Calendar vocabulary and telling time",
        "emoji": "📅",
        "duration": "~50 min",
        "objectives": [
          "Name all days of the week and months",
          "Tell the time in Portuguese",
          "Talk about schedules and appointments"
        ],
        "vocabulary": [
          {
            "pt": "segunda-feira",
            "en": "Monday",
            "ex": "Na segunda tenho aula.",
            "exEn": "On Monday I have class."
          },
          {
            "pt": "sábado",
            "en": "Saturday",
            "ex": "Sábado é dia de descanso.",
            "exEn": "Saturday is a rest day."
          },
          {
            "pt": "domingo",
            "en": "Sunday",
            "ex": "Domingo é dia de família.",
            "exEn": "Sunday is family day."
          },
          {
            "pt": "que horas são?",
            "en": "what time is it?",
            "ex": "Que horas são agora?",
            "exEn": "What time is it now?"
          },
          {
            "pt": "são duas horas",
            "en": "it's two o'clock",
            "ex": "São duas horas da tarde.",
            "exEn": "It's two in the afternoon."
          },
          {
            "pt": "de manhã / à tarde / à noite",
            "en": "in the morning / afternoon / evening",
            "ex": "Trabalho de manhã.",
            "exEn": "I work in the morning."
          }
        ],
        "grammar": {
          "title": "Days of the week — Portuguese is unique!",
          "explain": "Portuguese days of the week (except Saturday and Sunday) come from church tradition and are numbered. Monday = segunda-feira (second fair/market day). The week starts on Sunday.",
          "structure": "segunda / terça / quarta / quinta / sexta + -feira",
          "examples": [
            {
              "pt": "Hoje é quarta-feira.",
              "en": "Today is Wednesday."
            },
            {
              "pt": "Amanhã é quinta-feira.",
              "en": "Tomorrow is Thursday."
            },
            {
              "pt": "No fim de semana não trabalho.",
              "en": "I don't work on the weekend."
            }
          ],
          "extendedExamples": [
            {
              "pt": "A aula de português é na segunda-feira.",
              "en": "The Portuguese class is on Monday."
            },
            {
              "pt": "Eu trabalho de segunda-feira a sexta-feira.",
              "en": "I work from Monday to Friday."
            },
            {
              "pt": "Na quarta-feira eu vou ao mercado.",
              "en": "On Wednesday I go to the market."
            },
            {
              "pt": "A reunião é na quinta-feira de manhã.",
              "en": "The meeting is on Thursday morning."
            },
            {
              "pt": "Na sexta-feira à noite eu saio com os amigos.",
              "en": "On Friday night I go out with friends."
            }
          ]
        },
        "dialogue": {
          "scene": "Sarah and Marcos plan a coffee meeting.",
          "lines": [
            {
              "sp": "a",
              "pt": "Marcos, quando você está livre esta semana?",
              "en": "Marcos, when are you free this week?"
            },
            {
              "sp": "b",
              "pt": "Terça ou quinta. Você prefere qual?",
              "en": "Tuesday or Thursday. Which do you prefer?"
            },
            {
              "sp": "a",
              "pt": "Quinta-feira está ótimo! Que horas?",
              "en": "Thursday is great! What time?"
            },
            {
              "sp": "b",
              "pt": "São dez da manhã bom para você?",
              "en": "Is ten in the morning good for you?"
            },
            {
              "sp": "a",
              "pt": "Perfeito! Nos vemos quinta às dez.",
              "en": "Perfect! See you Thursday at ten."
            }
          ]
        },
        "exercises": [
          {
            "type": "Multiple choice",
            "instruction": "Select the correct day.",
            "items": [
              {
                "q": "The day after segunda-feira (Monday) is:",
                "opts": [
                  "quarta",
                  "terça",
                  "quinta"
                ],
                "ans": 1
              },
              {
                "q": "The weekend days are:",
                "opts": [
                  "sexta e sábado",
                  "sábado e domingo",
                  "quinta e sexta"
                ],
                "ans": 1
              }
            ]
          },
          {
            "type": "Fill in the blank",
            "instruction": "Complete the time expressions.",
            "items": [
              {
                "q": "It's 8am. → São ___ da manhã.",
                "ans": "oito horas"
              },
              {
                "q": "It's 3pm. → São ___ da tarde.",
                "ans": "três horas"
              }
            ]
          }
        ],
        "culture": {
          "title": "Brazilian time culture ⏰",
          "text": "Brazil operates on what locals call \"hora brasileira\" — Brazilian time. Being 15-30 minutes late to social events is completely normal and not considered rude. However, for work meetings and formal contexts, punctuality is expected. The phrase \"já chego\" (I'm almost there) is famously optimistic — it might mean anything from 5 minutes to an hour."
        },
        "extraVocab": [
          {
            "pt": "a semana",
            "en": "the week",
            "ex": "A semana tem sete dias.",
            "exEn": "The week has seven days."
          },
          {
            "pt": "o fim de semana",
            "en": "the weekend",
            "ex": "No fim de semana eu descanso.",
            "exEn": "On the weekend I rest."
          },
          {
            "pt": "hoje",
            "en": "today",
            "ex": "Hoje é terça-feira.",
            "exEn": "Today is Tuesday."
          },
          {
            "pt": "amanhã",
            "en": "tomorrow",
            "ex": "Amanhã é quarta-feira.",
            "exEn": "Tomorrow is Wednesday."
          },
          {
            "pt": "ontem",
            "en": "yesterday",
            "ex": "Ontem foi segunda-feira.",
            "exEn": "Yesterday was Monday."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "O segunda-feira",
            "correct": "A segunda-feira",
            "note": "All weekdays from segunda to sexta are feminine in Portuguese because 'feira' is a feminine noun."
          },
          {
            "wrong": "Em segunda-feira",
            "correct": "Na segunda-feira",
            "note": "Use 'na' (em + a) before feminine weekdays, not 'em' alone."
          },
          {
            "wrong": "segunda feira",
            "correct": "segunda-feira",
            "note": "Weekday names from segunda to sexta are always written with a hyphen before '-feira'."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct day of the week.",
            "items": [
              {
                "q": "O dia depois de segunda-feira é ___.",
                "ans": "terça-feira"
              },
              {
                "q": "O dia antes de quarta-feira é ___.",
                "ans": "terça-feira"
              },
              {
                "q": "O dia depois de quinta-feira é ___.",
                "ans": "sexta-feira"
              },
              {
                "q": "Hoje é terça-feira. Amanhã é ___.",
                "ans": "quarta-feira"
              },
              {
                "q": "Trabalho de segunda-feira a ___.",
                "ans": "sexta-feira"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option to complete the sentence.",
            "items": [
              {
                "q": "A reunião é ___ quinta-feira.",
                "opts": [
                  "no",
                  "na",
                  "em",
                  "o"
                ],
                "ans": 1
              },
              {
                "q": "Hoje é ___. Amanhã é sexta-feira.",
                "opts": [
                  "segunda-feira",
                  "sábado",
                  "quinta-feira",
                  "quarta-feira"
                ],
                "ans": 2
              },
              {
                "q": "___ segunda-feira eu tenho aula.",
                "opts": [
                  "No",
                  "Nos",
                  "Na",
                  "Nas"
                ],
                "ans": 2
              },
              {
                "q": "Eu trabalho de segunda-feira a ___.",
                "opts": [
                  "domingo",
                  "sábado",
                  "sexta-feira",
                  "quarta-feira"
                ],
                "ans": 2
              },
              {
                "q": "Quarta-feira é o ___ dia da semana de trabalho.",
                "opts": [
                  "primeiro",
                  "segundo",
                  "terceiro",
                  "quarto"
                ],
                "ans": 2
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese.",
            "items": [
              {
                "q": "Today is Monday.",
                "ans": "Hoje é segunda-feira."
              },
              {
                "q": "The class is on Wednesday.",
                "ans": "A aula é na quarta-feira."
              },
              {
                "q": "Tomorrow is Friday.",
                "ans": "Amanhã é sexta-feira."
              },
              {
                "q": "I work on Thursday.",
                "ans": "Eu trabalho na quinta-feira."
              },
              {
                "q": "Yesterday was Tuesday.",
                "ans": "Ontem foi terça-feira."
              }
            ]
          }
        ],
        "teacherTip": "Remind students that the weekday names segunda through sexta come from the Latin counting system for market days ('feira'), making Portuguese unique among Romance languages. Drilling the contraction 'na' (em + a) early will prevent one of the most common errors English speakers make."
      },
      {
        "title": "Food & Eating",
        "sub": "Brazilian cuisine, ordering, and meals",
        "emoji": "🍽️",
        "duration": "~60 min",
        "objectives": [
          "Name essential Brazilian foods and drinks",
          "Order at a restaurant or café",
          "Express preferences with gostar de"
        ],
        "vocabulary": [
          {
            "pt": "o arroz e feijão",
            "en": "rice and beans",
            "ex": "Arroz e feijão todo dia!",
            "exEn": "Rice and beans every day!"
          },
          {
            "pt": "a feijoada",
            "en": "black bean stew (national dish)",
            "ex": "A feijoada é servida aos sábados.",
            "exEn": "Feijoada is served on Saturdays."
          },
          {
            "pt": "o pão de queijo",
            "en": "cheese bread",
            "ex": "Eu amo pão de queijo!",
            "exEn": "I love cheese bread!"
          },
          {
            "pt": "o suco",
            "en": "juice",
            "ex": "Um suco de laranja, por favor.",
            "exEn": "An orange juice, please."
          },
          {
            "pt": "a caipirinha",
            "en": "caipirinha (national cocktail)",
            "ex": "Você quer uma caipirinha?",
            "exEn": "Do you want a caipirinha?"
          },
          {
            "pt": "delicioso/a",
            "en": "delicious",
            "ex": "Está muito delicioso!",
            "exEn": "It's very delicious!"
          }
        ],
        "grammar": {
          "title": "Gostar de — to like (something)",
          "explain": "\"Gostar\" always requires \"de\" before the thing you like. This trips up many English speakers. You cannot say \"eu gosto isso\" — it must be \"eu gosto de isso\" → \"eu gosto disso\".",
          "structure": "Eu gosto de + [noun/infinitive]",
          "examples": [
            {
              "pt": "Eu gosto de feijoada.",
              "en": "I like feijoada."
            },
            {
              "pt": "Ela gosta de cozinhar.",
              "en": "She likes to cook."
            },
            {
              "pt": "Você gosta de café?",
              "en": "Do you like coffee?"
            }
          ],
          "extendedExamples": [
            {
              "pt": "Eu gosto de pizza com queijo.",
              "en": "I like pizza with cheese."
            },
            {
              "pt": "Eu gosto de comer frutas de manhã.",
              "en": "I like eating fruit in the morning."
            },
            {
              "pt": "Eu gosto de arroz e feijão.",
              "en": "I like rice and beans."
            },
            {
              "pt": "Eu gosto de beber suco de laranja.",
              "en": "I like drinking orange juice."
            },
            {
              "pt": "Eu gosto de chocolate quente.",
              "en": "I like hot chocolate."
            }
          ]
        },
        "dialogue": {
          "scene": "Sarah and Marcos go to a traditional Brazilian restaurant.",
          "lines": [
            {
              "sp": "b",
              "pt": "Você já comeu feijoada?",
              "en": "Have you ever eaten feijoada?"
            },
            {
              "sp": "a",
              "pt": "Nunca! O que é?",
              "en": "Never! What is it?"
            },
            {
              "sp": "b",
              "pt": "É o prato mais famoso do Brasil — feijão preto com carnes.",
              "en": "It's Brazil's most famous dish — black beans with meats."
            },
            {
              "sp": "a",
              "pt": "Parece delicioso! Vou experimentar.",
              "en": "Sounds delicious! I'll try it."
            },
            {
              "sp": "b",
              "pt": "E para beber? Suco ou caipirinha?",
              "en": "And to drink? Juice or caipirinha?"
            },
            {
              "sp": "a",
              "pt": "Um suco de maracujá, por favor!",
              "en": "A passion fruit juice, please!"
            },
            {
              "sp": "b",
              "pt": "Boa escolha!",
              "en": "Good choice!"
            }
          ]
        },
        "exercises": [
          {
            "type": "Multiple choice",
            "instruction": "Choose gostar correctly.",
            "items": [
              {
                "q": "I like rice and beans.",
                "opts": [
                  "Eu gosto arroz.",
                  "Eu gosto de arroz e feijão.",
                  "Eu gosto feijão."
                ],
                "ans": 1
              },
              {
                "q": "She likes caipirinha.",
                "opts": [
                  "Ela gosta caipirinha.",
                  "Ela gosta de caipirinha.",
                  "Ela gostar de caipirinha."
                ],
                "ans": 1
              }
            ]
          },
          {
            "type": "Fill in the blank",
            "instruction": "Translate into Portuguese.",
            "items": [
              {
                "q": "Do you like cheese bread? → Você gosta ___ pão de queijo?",
                "ans": "de"
              },
              {
                "q": "It's very delicious! → Está muito ___!",
                "ans": "delicioso"
              }
            ]
          }
        ],
        "culture": {
          "title": "Brazilian food culture 🍛",
          "text": "In Brazil, lunch (almoço) is the main meal of the day — eaten between noon and 2pm. Rice and beans appear at almost every lunch table. The \"prato feito\" (PF) is a cheap, filling lunch plate available at most local restaurants: rice, beans, meat, salad, and sometimes a fried egg. Brazilians say \"bom apetite!\" before eating — always respond with \"obrigado/a!\""
        },
        "extraVocab": [
          {
            "pt": "o café da manhã",
            "en": "breakfast",
            "ex": "Eu gosto de café da manhã.",
            "exEn": "I like breakfast."
          },
          {
            "pt": "o almoço",
            "en": "lunch",
            "ex": "Eu gosto de almoço com arroz.",
            "exEn": "I like lunch with rice."
          },
          {
            "pt": "o jantar",
            "en": "dinner",
            "ex": "Eu gosto de jantar em casa.",
            "exEn": "I like having dinner at home."
          },
          {
            "pt": "a fruta",
            "en": "fruit",
            "ex": "Eu gosto de fruta fresca.",
            "exEn": "I like fresh fruit."
          },
          {
            "pt": "o suco",
            "en": "juice",
            "ex": "Eu gosto de suco de laranja.",
            "exEn": "I like orange juice."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Eu gosto pizza.",
            "correct": "Eu gosto de pizza.",
            "note": "In Portuguese, 'gostar' always requires 'de' before the noun or verb. You cannot skip 'de' the way English skips 'of' in 'I like pizza'."
          },
          {
            "wrong": "Eu gosto de comer-o.",
            "correct": "Eu gosto de comer.",
            "note": "When using an infinitive after 'gostar de', do not add an object pronoun attached to it in this basic A1 pattern. Keep it simple: 'Eu gosto de comer'."
          },
          {
            "wrong": "Eu não gosto pizza fria.",
            "correct": "Eu não gosto de pizza fria.",
            "note": "'De' is required even in negative sentences. English speakers often drop 'de' when negating, but the rule stays the same: 'não gosto de'."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct word.",
            "items": [
              {
                "q": "Eu gosto ___ arroz e feijão.",
                "ans": "de"
              },
              {
                "q": "Eu gosto de ___ suco de laranja.",
                "ans": "beber"
              },
              {
                "q": "Eu não ___ de carne.",
                "ans": "gosto"
              },
              {
                "q": "Eu gosto de ___ no restaurante.",
                "ans": "comer"
              },
              {
                "q": "Eu gosto de café ___ manhã.",
                "ans": "da"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option.",
            "items": [
              {
                "q": "Eu gosto ___ chocolate.",
                "opts": [
                  "em",
                  "para",
                  "de",
                  "com"
                ],
                "ans": 2
              },
              {
                "q": "Eu gosto de ___ frutas todo dia.",
                "opts": [
                  "bebo",
                  "como",
                  "comer",
                  "comendo"
                ],
                "ans": 2
              },
              {
                "q": "Eu gosto de ___.",
                "opts": [
                  "pizza",
                  "pizzas de",
                  "de pizza",
                  "gosto pizza"
                ],
                "ans": 0
              },
              {
                "q": "Eu não gosto ___ verduras.",
                "opts": [
                  "no",
                  "ao",
                  "para",
                  "de"
                ],
                "ans": 3
              },
              {
                "q": "Eu gosto de ___ café da manhã cedo.",
                "opts": [
                  "tomo",
                  "tomando",
                  "tomar",
                  "tomei"
                ],
                "ans": 2
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese.",
            "items": [
              {
                "q": "I like rice and beans.",
                "ans": "Eu gosto de arroz e feijão."
              },
              {
                "q": "I like drinking juice.",
                "ans": "Eu gosto de beber suco."
              },
              {
                "q": "I do not like cold pizza.",
                "ans": "Eu não gosto de pizza fria."
              },
              {
                "q": "I like eating breakfast.",
                "ans": "Eu gosto de tomar café da manhã."
              },
              {
                "q": "I like fruit.",
                "ans": "Eu gosto de fruta."
              }
            ]
          }
        ],
        "teacherTip": "Remind students that 'gostar' is always followed by 'de', whether the next word is a noun or an infinitive verb — this 'de' has no direct equivalent in English and is the most common source of errors. A helpful trick is to teach 'Eu gosto de' as one fixed chunk before introducing new vocabulary."
      },
      {
        "title": "Getting Around",
        "sub": "Transport, directions, and locations",
        "emoji": "🚌",
        "duration": "~50 min",
        "objectives": [
          "Ask for and understand basic directions",
          "Name types of transport",
          "Say where places are using ficar"
        ],
        "vocabulary": [
          {
            "pt": "onde fica...?",
            "en": "where is...?",
            "ex": "Onde fica o metrô?",
            "exEn": "Where is the metro?"
          },
          {
            "pt": "à esquerda / à direita",
            "en": "to the left / to the right",
            "ex": "Vire à esquerda.",
            "exEn": "Turn left."
          },
          {
            "pt": "em frente",
            "en": "straight ahead",
            "ex": "Siga em frente.",
            "exEn": "Go straight ahead."
          },
          {
            "pt": "o ônibus",
            "en": "the bus",
            "ex": "Pego o ônibus todo dia.",
            "exEn": "I take the bus every day."
          },
          {
            "pt": "perto / longe",
            "en": "near / far",
            "ex": "O mercado é perto daqui.",
            "exEn": "The market is near here."
          },
          {
            "pt": "a pé",
            "en": "on foot",
            "ex": "Posso ir a pé.",
            "exEn": "I can go on foot."
          }
        ],
        "grammar": {
          "title": "Ficar — to be located (places)",
          "explain": "For locations, Brazilians use \"ficar\" (literally \"to stay\") instead of \"ser\" or \"estar\". This is unique and essential for asking where things are.",
          "structure": "[place] + fica + [location]",
          "examples": [
            {
              "pt": "O banco fica na esquina.",
              "en": "The bank is on the corner."
            },
            {
              "pt": "Onde fica a farmácia?",
              "en": "Where is the pharmacy?"
            },
            {
              "pt": "Fica longe daqui.",
              "en": "It's far from here."
            }
          ],
          "extendedExamples": [
            {
              "pt": "A farmácia fica na Rua das Flores.",
              "en": "The pharmacy is on Rua das Flores."
            },
            {
              "pt": "O metrô fica longe do hotel.",
              "en": "The subway is far from the hotel."
            },
            {
              "pt": "A padaria fica ao lado do banco.",
              "en": "The bakery is next to the bank."
            },
            {
              "pt": "O museu fica no centro da cidade.",
              "en": "The museum is in the city center."
            },
            {
              "pt": "A parada de ônibus fica na esquina.",
              "en": "The bus stop is on the corner."
            }
          ]
        },
        "dialogue": {
          "scene": "Sarah is lost and asks Marcos for directions.",
          "lines": [
            {
              "sp": "a",
              "pt": "Com licença! Onde fica o metrô mais perto?",
              "en": "Excuse me! Where is the nearest metro?"
            },
            {
              "sp": "b",
              "pt": "Siga em frente e vire à esquerda na segunda rua.",
              "en": "Go straight ahead and turn left at the second street."
            },
            {
              "sp": "a",
              "pt": "Fica longe daqui?",
              "en": "Is it far from here?"
            },
            {
              "sp": "b",
              "pt": "Não, fica a uns cinco minutos a pé.",
              "en": "No, it's about five minutes on foot."
            },
            {
              "sp": "a",
              "pt": "Obrigada! Tem também um café perto?",
              "en": "Thank you! Is there also a café nearby?"
            },
            {
              "sp": "b",
              "pt": "Tem sim! Na esquina à direita.",
              "en": "There is! On the corner to the right."
            }
          ]
        },
        "exercises": [
          {
            "type": "Multiple choice",
            "instruction": "Choose the right answer.",
            "items": [
              {
                "q": "How do you ask where something is?",
                "opts": [
                  "Como é...?",
                  "Onde fica...?",
                  "O que é...?"
                ],
                "ans": 1
              },
              {
                "q": "Turn right = ",
                "opts": [
                  "Vire à esquerda",
                  "Siga em frente",
                  "Vire à direita"
                ],
                "ans": 2
              }
            ]
          },
          {
            "type": "Fill in the blank",
            "instruction": "Complete with ficar.",
            "items": [
              {
                "q": "The bank is on the corner. → O banco ___ na esquina.",
                "ans": "fica"
              },
              {
                "q": "Where is the pharmacy? → Onde ___ a farmácia?",
                "ans": "fica"
              }
            ]
          }
        ],
        "culture": {
          "title": "Transport in Brazil 🚌",
          "text": "São Paulo has one of the largest metro systems in South America, but buses (ônibus) are the backbone of Brazilian urban transport. In Rio, the famous yellow VW Kombis were iconic for decades. Uber and 99 (Brazilian Uber rival) are extremely popular and safe. Brazilians often say \"pegar um Uber\" even when using other apps. In smaller cities, motos-taxis (motorcycle taxis) are common and cheap."
        },
        "extraVocab": [
          {
            "pt": "a esquina",
            "en": "the corner",
            "ex": "O café fica na esquina.",
            "exEn": "The café is on the corner."
          },
          {
            "pt": "o semáforo",
            "en": "the traffic light",
            "ex": "O banco fica perto do semáforo.",
            "exEn": "The bank is near the traffic light."
          },
          {
            "pt": "a calçada",
            "en": "the sidewalk",
            "ex": "A banca fica na calçada.",
            "exEn": "The newsstand is on the sidewalk."
          },
          {
            "pt": "o bairro",
            "en": "the neighborhood",
            "ex": "A escola fica neste bairro.",
            "exEn": "The school is in this neighborhood."
          },
          {
            "pt": "a saída",
            "en": "the exit",
            "ex": "O táxi fica perto da saída.",
            "exEn": "The taxi is near the exit."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "O banco é na Rua Brasil.",
            "correct": "O banco fica na Rua Brasil.",
            "note": "English speakers often use 'é' (ser) for location, but Brazilian Portuguese uses 'fica' when talking about where a place is located."
          },
          {
            "wrong": "O supermercado fica em o centro.",
            "correct": "O supermercado fica no centro.",
            "note": "In Portuguese, 'em + o' must contract to 'no'. Always contract em+o=no and em+a=na."
          },
          {
            "wrong": "A escola fica próximo ao hospital.",
            "correct": "A escola fica perto do hospital.",
            "note": "'Próximo' is more formal/European; at A1 level, 'perto de' is the natural everyday choice in Brazilian Portuguese."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct word.",
            "items": [
              {
                "q": "O hotel ___ perto da praia.",
                "ans": "fica"
              },
              {
                "q": "A biblioteca fica ___ centro da cidade.",
                "ans": "no"
              },
              {
                "q": "A farmácia fica ao lado ___ supermercado.",
                "ans": "do"
              },
              {
                "q": "O aeroporto fica ___ do centro.",
                "ans": "longe"
              },
              {
                "q": "A padaria fica ___ da escola.",
                "ans": "perto"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option.",
            "items": [
              {
                "q": "O banco ___ na esquina.",
                "opts": [
                  "sou",
                  "estou",
                  "fica",
                  "ficamos"
                ],
                "ans": 2
              },
              {
                "q": "A loja fica ___ lado do café.",
                "opts": [
                  "em",
                  "ao",
                  "para",
                  "com"
                ],
                "ans": 1
              },
              {
                "q": "O museu fica ___ do hotel.",
                "opts": [
                  "longe",
                  "longo",
                  "largo",
                  "logo"
                ],
                "ans": 0
              },
              {
                "q": "A parada de ônibus fica ___ rua principal.",
                "opts": [
                  "em a",
                  "no",
                  "na",
                  "num"
                ],
                "ans": 2
              },
              {
                "q": "O restaurante fica ___ do parque.",
                "opts": [
                  "perto",
                  "perto a",
                  "perto em",
                  "perto com"
                ],
                "ans": 0
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese.",
            "items": [
              {
                "q": "The hospital is near the school.",
                "ans": "O hospital fica perto da escola."
              },
              {
                "q": "The bus stop is on the corner.",
                "ans": "A parada de ônibus fica na esquina."
              },
              {
                "q": "The hotel is far from the airport.",
                "ans": "O hotel fica longe do aeroporto."
              },
              {
                "q": "The bakery is next to the bank.",
                "ans": "A padaria fica ao lado do banco."
              },
              {
                "q": "The museum is in the city center.",
                "ans": "O museu fica no centro da cidade."
              }
            ]
          }
        ],
        "teacherTip": "Encourage students to memorize 'fica' as the go-to verb for describing where places are located in Brazilian Portuguese — it is far more natural than 'está' or 'é' in this context. Drilling contractions like 'no', 'na', 'do', 'da' alongside 'fica' from the start will prevent the most common preposition errors."
      },
      {
        "title": "Shopping & Money",
        "sub": "Prices, bargaining, and everyday purchases",
        "emoji": "🛍️",
        "duration": "~50 min",
        "objectives": [
          "Ask for prices and pay in Portuguese",
          "Use numbers in monetary contexts",
          "Negotiate politely"
        ],
        "vocabulary": [
          {
            "pt": "quanto custa?",
            "en": "how much does it cost?",
            "ex": "Quanto custa esta bolsa?",
            "exEn": "How much does this bag cost?"
          },
          {
            "pt": "o real / os reais",
            "en": "the real (Brazilian currency)",
            "ex": "Custa vinte reais.",
            "exEn": "It costs twenty reais."
          },
          {
            "pt": "caro / barato",
            "en": "expensive / cheap",
            "ex": "Está muito caro!",
            "exEn": "It's very expensive!"
          },
          {
            "pt": "tem desconto?",
            "en": "is there a discount?",
            "ex": "Tem desconto para pagar à vista?",
            "exEn": "Is there a discount for cash payment?"
          },
          {
            "pt": "a vista / no cartão",
            "en": "cash / by card",
            "ex": "Pode pagar no cartão.",
            "exEn": "You can pay by card."
          },
          {
            "pt": "o troco",
            "en": "change (money)",
            "ex": "Aqui está o troco.",
            "exEn": "Here is your change."
          }
        ],
        "grammar": {
          "title": "Estar — to be (for prices and temporary states)",
          "explain": "Use estar (not ser) for prices, because prices can change. Also use estar for how things are right now — states that can change.",
          "structure": "Está + [price/state] / Estou + [feeling]",
          "examples": [
            {
              "pt": "Está R$50.",
              "en": "It's R$50."
            },
            {
              "pt": "Está muito caro.",
              "en": "It's very expensive."
            },
            {
              "pt": "Como você está? Estou bem.",
              "en": "How are you? I'm fine."
            }
          ],
          "extendedExamples": [
            {
              "pt": "A camiseta está barata hoje.",
              "en": "The T-shirt is cheap today."
            },
            {
              "pt": "Estou com fome depois de fazer compras.",
              "en": "I am hungry after shopping."
            },
            {
              "pt": "O celular está em promoção por duzentos reais.",
              "en": "The cell phone is on sale for two hundred reais."
            },
            {
              "pt": "Estou cansada de andar no shopping.",
              "en": "I am tired from walking around the mall."
            },
            {
              "pt": "O café está quente e custa cinco reais.",
              "en": "The coffee is hot and costs five reais."
            }
          ]
        },
        "dialogue": {
          "scene": "Sarah shopping at a market in Brazil.",
          "lines": [
            {
              "sp": "a",
              "pt": "Boa tarde! Quanto custa esta camiseta?",
              "en": "Good afternoon! How much does this t-shirt cost?"
            },
            {
              "sp": "b",
              "pt": "Está a oitenta reais.",
              "en": "It's eighty reais."
            },
            {
              "sp": "a",
              "pt": "Nossa, está caro! Tem desconto?",
              "en": "Wow, it's expensive! Is there a discount?"
            },
            {
              "sp": "b",
              "pt": "Pagando à vista, faço por sessenta.",
              "en": "Paying cash, I'll do sixty."
            },
            {
              "sp": "a",
              "pt": "Tudo bem! Vou levar. Aqui estão sessenta reais.",
              "en": "Alright! I'll take it. Here are sixty reais."
            },
            {
              "sp": "b",
              "pt": "Obrigado! Aqui está o troco.",
              "en": "Thank you! Here is your change."
            }
          ]
        },
        "exercises": [
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct verb (ser or estar).",
            "items": [
              {
                "q": "The price is R$30. → O preço ___.",
                "opts": [
                  "é R$30",
                  "está R$30",
                  "fica R$30"
                ],
                "ans": 1
              },
              {
                "q": "The bag is expensive. → A bolsa ___.",
                "opts": [
                  "é cara",
                  "está cara",
                  "fica cara"
                ],
                "ans": 1
              }
            ]
          },
          {
            "type": "Fill in the blank",
            "instruction": "Translate these shopping phrases.",
            "items": [
              {
                "q": "How much does it cost? → ___ custa?",
                "ans": "Quanto"
              },
              {
                "q": "Is there a discount? → Tem ___?",
                "ans": "desconto"
              }
            ]
          }
        ],
        "culture": {
          "title": "Bargaining in Brazil 🛒",
          "text": "In formal shops and supermarkets, prices are fixed. But in markets (feiras), street stalls, and smaller shops, bargaining (\"pechinchar\") is totally normal and expected. Always ask \"tem desconto?\" — the worst they can say is no. Paying in cash (à vista) almost always gets you a better price than a card. The Brazilian real (R$) has coins up to R$1 and notes from R$2 to R$200."
        },
        "extraVocab": [
          {
            "pt": "o troco",
            "en": "the change (money)",
            "ex": "O troco é dois reais.",
            "exEn": "The change is two reais."
          },
          {
            "pt": "a promoção",
            "en": "the sale / the promotion",
            "ex": "O sapato está em promoção.",
            "exEn": "The shoe is on sale."
          },
          {
            "pt": "o preço",
            "en": "the price",
            "ex": "O preço está alto.",
            "exEn": "The price is high."
          },
          {
            "pt": "a vitrine",
            "en": "the shop window",
            "ex": "O vestido está na vitrine.",
            "exEn": "The dress is in the shop window."
          },
          {
            "pt": "o cartão",
            "en": "the card (credit/debit)",
            "ex": "Posso pagar com cartão?",
            "exEn": "Can I pay by card?"
          }
        ],
        "commonMistakes": [
          {
            "wrong": "O preço é muito alto hoje.",
            "correct": "O preço está muito alto hoje.",
            "note": "Use 'estar' for temporary states like prices, which can change. 'Ser' would imply the price is always and permanently high."
          },
          {
            "wrong": "Estou com dez reais.",
            "correct": "Eu tenho dez reais.",
            "note": "To express having money, use 'ter' (to have), not 'estar'. Reserve 'estou' for feelings and temporary states."
          },
          {
            "wrong": "A loja está fechada sempre.",
            "correct": "A loja é fechada aos domingos.",
            "note": "When describing a permanent or scheduled state (like store hours), 'ser' is more natural. 'Estar fechada' works for a temporary closure."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct form of 'estar'.",
            "items": [
              {
                "q": "O tênis ___ em promoção.",
                "ans": "está"
              },
              {
                "q": "Eu ___ cansado depois das compras.",
                "ans": "estou"
              },
              {
                "q": "As laranjas ___ baratas hoje.",
                "ans": "estão"
              },
              {
                "q": "A loja ___ fechada agora.",
                "ans": "está"
              },
              {
                "q": "Nós ___ com fome no shopping.",
                "ans": "estamos"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option to complete the sentence.",
            "items": [
              {
                "q": "O arroz ___ caro no supermercado hoje.",
                "opts": [
                  "estou",
                  "está",
                  "estamos",
                  "estão"
                ],
                "ans": 1
              },
              {
                "q": "Eu ___ feliz com o desconto.",
                "opts": [
                  "está",
                  "estão",
                  "estou",
                  "estamos"
                ],
                "ans": 2
              },
              {
                "q": "Os sapatos ___ em promoção.",
                "opts": [
                  "está",
                  "estou",
                  "estamos",
                  "estão"
                ],
                "ans": 3
              },
              {
                "q": "A calça ___ cara demais.",
                "opts": [
                  "estou",
                  "estamos",
                  "está",
                  "estão"
                ],
                "ans": 2
              },
              {
                "q": "Nós ___ surpresos com o preço.",
                "opts": [
                  "estou",
                  "está",
                  "estão",
                  "estamos"
                ],
                "ans": 3
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese.",
            "items": [
              {
                "q": "The juice is cold.",
                "ans": "O suco está gelado."
              },
              {
                "q": "I am happy with the price.",
                "ans": "Estou feliz com o preço."
              },
              {
                "q": "The shoes are on sale.",
                "ans": "Os sapatos estão em promoção."
              },
              {
                "q": "The store is open now.",
                "ans": "A loja está aberta agora."
              },
              {
                "q": "I am tired at the mall.",
                "ans": "Estou cansado no shopping."
              }
            ]
          }
        ],
        "teacherTip": "Remind students that 'estar' is the go-to verb for prices and feelings because both are temporary — a price can drop tomorrow and a feeling can change in an hour. A quick memory hook: if it can change by the end of the day, it likely needs 'estar'."
      },
      {
        "title": "Weather & Seasons",
        "sub": "Talking about weather and climate",
        "emoji": "☀️",
        "duration": "~40 min",
        "objectives": [
          "Describe weather conditions in Portuguese",
          "Name the four seasons",
          "Talk about temperatures and preferences"
        ],
        "vocabulary": [
          {
            "pt": "está chovendo",
            "en": "it's raining",
            "ex": "Está chovendo muito hoje.",
            "exEn": "It's raining a lot today."
          },
          {
            "pt": "está frio / quente",
            "en": "it's cold / hot",
            "ex": "Está muito frio em Dublin!",
            "exEn": "It's very cold in Dublin!"
          },
          {
            "pt": "o verão / o inverno",
            "en": "summer / winter",
            "ex": "No verão vou ao Brasil.",
            "exEn": "In summer I'm going to Brazil."
          },
          {
            "pt": "a temperatura",
            "en": "the temperature",
            "ex": "A temperatura está a 30 graus.",
            "exEn": "The temperature is 30 degrees."
          },
          {
            "pt": "ensolarado",
            "en": "sunny",
            "ex": "Que dia ensolarado!",
            "exEn": "What a sunny day!"
          },
          {
            "pt": "nublado",
            "en": "cloudy",
            "ex": "O céu está nublado.",
            "exEn": "The sky is cloudy."
          }
        ],
        "grammar": {
          "title": "Estar for weather and temporary states",
          "explain": "Weather in Portuguese uses \"estar\" because it's temporary. \"Está chovendo\" (it's raining), \"está frio\" (it's cold). You'll also use \"está\" to describe how things are right now.",
          "structure": "Está + [weather adjective] / Está + [verb]-ando/endo",
          "examples": [
            {
              "pt": "Está chovendo.",
              "en": "It's raining."
            },
            {
              "pt": "Está muito quente hoje.",
              "en": "It's very hot today."
            },
            {
              "pt": "O tempo está lindo!",
              "en": "The weather is beautiful!"
            }
          ],
          "extendedExamples": [
            {
              "pt": "Está muito quente hoje no Rio de Janeiro.",
              "en": "It is very hot today in Rio de Janeiro."
            },
            {
              "pt": "Está nevando nas montanhas agora.",
              "en": "It is snowing in the mountains right now."
            },
            {
              "pt": "Está nublado e o céu está cinza.",
              "en": "It is cloudy and the sky is gray."
            },
            {
              "pt": "Está chovendo muito forte esta tarde.",
              "en": "It is raining very hard this afternoon."
            },
            {
              "pt": "Está ventando bastante na praia hoje.",
              "en": "It is very windy at the beach today."
            }
          ]
        },
        "dialogue": {
          "scene": "Sarah video calls her mum from Brazil.",
          "lines": [
            {
              "sp": "a",
              "pt": "Mãe! Está um calor incrível aqui em Salvador!",
              "en": "Mum! It's incredibly hot here in Salvador!"
            },
            {
              "sp": "b",
              "pt": "Que bom! Aqui em Dublin está chovendo.",
              "en": "How nice! Here in Dublin it's raining."
            },
            {
              "sp": "a",
              "pt": "Que surpresa, né? Qual é a temperatura lá?",
              "en": "What a surprise, right? What's the temperature there?"
            },
            {
              "sp": "b",
              "pt": "Está a doze graus. E aí?",
              "en": "It's twelve degrees. And there?"
            },
            {
              "sp": "a",
              "pt": "Aqui está a trinta e dois! O verão brasileiro é incrível.",
              "en": "Here it's thirty-two! Brazilian summer is incredible."
            }
          ]
        },
        "exercises": [
          {
            "type": "Multiple choice",
            "instruction": "Choose the right weather expression.",
            "items": [
              {
                "q": "It's raining.",
                "opts": [
                  "Está chovendo",
                  "Está frio",
                  "Está sol"
                ],
                "ans": 0
              },
              {
                "q": "It's sunny and hot.",
                "opts": [
                  "Está nublado",
                  "Está ensolarado e quente",
                  "Está frio e chovendo"
                ],
                "ans": 1
              }
            ]
          }
        ],
        "culture": {
          "title": "Brazil's climate diversity 🌡️",
          "text": "Brazil is a continent-sized country with wildly different climates. The Amazon is hot and humid year-round. The northeast (Salvador, Recife) is tropical and sunny. São Paulo has four proper seasons. The south (Porto Alegre) can get frost in winter. The Brazilian summer (December–March) is the opposite of the European summer — something Irish people find delightfully confusing!"
        },
        "extraVocab": [
          {
            "pt": "a chuva",
            "en": "the rain",
            "ex": "A chuva está forte hoje.",
            "exEn": "The rain is heavy today."
          },
          {
            "pt": "o sol",
            "en": "the sun",
            "ex": "O sol está brilhando agora.",
            "exEn": "The sun is shining now."
          },
          {
            "pt": "a neblina",
            "en": "the fog",
            "ex": "Está com muita neblina de manhã.",
            "exEn": "It is very foggy in the morning."
          },
          {
            "pt": "o vento",
            "en": "the wind",
            "ex": "O vento está frio hoje.",
            "exEn": "The wind is cold today."
          },
          {
            "pt": "a temporada",
            "en": "the season",
            "ex": "A temporada de chuvas está começando.",
            "exEn": "The rainy season is beginning."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "É chovendo agora.",
            "correct": "Está chovendo agora.",
            "note": "English speakers use 'ser' (é) by habit, but weather and temporary actions always use 'estar' (está) in Portuguese."
          },
          {
            "wrong": "Está frio o tempo.",
            "correct": "Está frio.",
            "note": "In Portuguese, weather expressions with 'estar' do not need a subject noun like 'o tempo'; 'está' alone works as an impersonal expression."
          },
          {
            "wrong": "Está chover.",
            "correct": "Está chovendo.",
            "note": "To express an ongoing action, you must use the gerund form (-ando/-endo), not the infinitive. 'Está chover' is incorrect; say 'está chovendo'."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct word.",
            "items": [
              {
                "q": "Hoje ___ muito calor na cidade.",
                "ans": "está"
              },
              {
                "q": "O céu ___ nublado esta manhã.",
                "ans": "está"
              },
              {
                "q": "Está ___. Preciso de um guarda-chuva.",
                "ans": "chovendo"
              },
              {
                "q": "As crianças estão ___ porque está frio.",
                "ans": "tremendo"
              },
              {
                "q": "Está ___ muito forte na praia hoje.",
                "ans": "ventando"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option.",
            "items": [
              {
                "q": "Hoje ___ muito frio lá fora.",
                "opts": [
                  "sou",
                  "somos",
                  "está",
                  "estão"
                ],
                "ans": 2
              },
              {
                "q": "Está ___ agora. Não podemos sair.",
                "opts": [
                  "chuva",
                  "chovendo",
                  "chove",
                  "chover"
                ],
                "ans": 1
              },
              {
                "q": "O tempo ___ quente e úmido no verão.",
                "opts": [
                  "sou",
                  "somos",
                  "são",
                  "está"
                ],
                "ans": 3
              },
              {
                "q": "Está ___ nas montanhas esta semana.",
                "opts": [
                  "neve",
                  "nevar",
                  "nevado",
                  "nevando"
                ],
                "ans": 3
              },
              {
                "q": "Ela ___ com frio porque está ventando.",
                "opts": [
                  "é",
                  "está",
                  "ser",
                  "estamos"
                ],
                "ans": 1
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese.",
            "items": [
              {
                "q": "It is sunny today.",
                "ans": "Está ensolarado hoje."
              },
              {
                "q": "It is raining a lot.",
                "ans": "Está chovendo muito."
              },
              {
                "q": "The weather is cold this week.",
                "ans": "O tempo está frio esta semana."
              },
              {
                "q": "It is very windy outside.",
                "ans": "Está muito ventando lá fora."
              },
              {
                "q": "It is snowing in the mountains.",
                "ans": "Está nevando nas montanhas."
              }
            ]
          }
        ],
        "teacherTip": "Remind students that 'estar' is always used for weather in Brazilian Portuguese because weather is a temporary state — just like how 'está chovendo' describes something happening right now, not a permanent condition. A helpful trick is to link 'está' to the English 'it is,' so 'Está frio' = 'It is cold.'"
      },
      {
        "title": "Daily Routine",
        "sub": "Verbs for daily activities",
        "emoji": "⏰",
        "duration": "~50 min",
        "objectives": [
          "Describe a typical day in Portuguese",
          "Use reflexive verbs for daily actions",
          "Talk about habits with frequency adverbs"
        ],
        "vocabulary": [
          {
            "pt": "acordar",
            "en": "to wake up",
            "ex": "Acordo às sete da manhã.",
            "exEn": "I wake up at seven in the morning."
          },
          {
            "pt": "tomar banho",
            "en": "to shower (take a bath)",
            "ex": "Tomo banho de manhã.",
            "exEn": "I shower in the morning."
          },
          {
            "pt": "tomar café da manhã",
            "en": "to have breakfast",
            "ex": "Tomo café às oito.",
            "exEn": "I have breakfast at eight."
          },
          {
            "pt": "trabalhar",
            "en": "to work",
            "ex": "Trabalho das nove às seis.",
            "exEn": "I work from nine to six."
          },
          {
            "pt": "almoçar",
            "en": "to have lunch",
            "ex": "Almoço ao meio-dia.",
            "exEn": "I have lunch at noon."
          },
          {
            "pt": "dormir",
            "en": "to sleep",
            "ex": "Durmo às onze da noite.",
            "exEn": "I sleep at eleven at night."
          }
        ],
        "grammar": {
          "title": "Regular -ar verbs in present tense",
          "explain": "Most Brazilian Portuguese verbs end in -ar, -er, or -ir. The -ar verbs are the most common. Learn this pattern and you can conjugate hundreds of verbs.",
          "structure": "trabalh- + o/a/amos/am",
          "examples": [
            {
              "pt": "Eu trabalho.",
              "en": "I work."
            },
            {
              "pt": "Ela trabalha.",
              "en": "She works."
            },
            {
              "pt": "Nós trabalhamos.",
              "en": "We work."
            },
            {
              "pt": "Eles trabalham.",
              "en": "They work."
            }
          ],
          "extendedExamples": [
            {
              "pt": "Eu trabalho em um escritório no centro da cidade.",
              "en": "I work in an office in the city center."
            },
            {
              "pt": "Ela trabalha de segunda a sexta-feira.",
              "en": "She works from Monday to Friday."
            },
            {
              "pt": "Nós trabalhamos muito durante a semana.",
              "en": "We work a lot during the week."
            },
            {
              "pt": "Eles trabalham em uma loja perto de casa.",
              "en": "They work in a store near home."
            },
            {
              "pt": "Você trabalha cedo de manhã?",
              "en": "Do you work early in the morning?"
            }
          ]
        },
        "dialogue": {
          "scene": "Sarah describes her daily routine.",
          "lines": [
            {
              "sp": "a",
              "pt": "Eu acordo às sete todos os dias.",
              "en": "I wake up at seven every day."
            },
            {
              "sp": "b",
              "pt": "E você toma café da manhã?",
              "en": "And do you have breakfast?"
            },
            {
              "sp": "a",
              "pt": "Sempre! Tomo café e como torrada.",
              "en": "Always! I have coffee and eat toast."
            },
            {
              "sp": "b",
              "pt": "No Brasil, o café da manhã tem pão de queijo!",
              "en": "In Brazil, breakfast has cheese bread!"
            },
            {
              "sp": "a",
              "pt": "Que maravilha! E você, que horas acorda?",
              "en": "How wonderful! And you, what time do you wake up?"
            },
            {
              "sp": "b",
              "pt": "Acordo às oito. Sou um pouco preguiçoso de manhã.",
              "en": "I wake up at eight. I'm a bit lazy in the morning."
            }
          ]
        },
        "exercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Conjugate the verb in brackets.",
            "items": [
              {
                "q": "Eu ___ (trabalhar) das nove às seis.",
                "ans": "trabalho"
              },
              {
                "q": "Ela ___ (acordar) às sete.",
                "ans": "acorda"
              },
              {
                "q": "Nós ___ (almoçar) ao meio-dia.",
                "ans": "almoçamos"
              }
            ]
          }
        ],
        "culture": {
          "title": "Brazilian daily rhythms 🌅",
          "text": "Brazilians are night owls by nature. Dinner (jantar) rarely happens before 8pm and restaurants are packed at 10pm. Lunch is the big meal. The \"hora do almoço\" (lunch hour) is sacred — many offices close from 12–2pm. Brazilians also love a \"cafezinho\" — a tiny, strong espresso — offered everywhere from offices to mechanic shops. Refusing one is considered slightly rude!"
        },
        "extraVocab": [
          {
            "pt": "acordar",
            "en": "to wake up",
            "ex": "Eu acordo às sete da manhã.",
            "exEn": "I wake up at seven in the morning."
          },
          {
            "pt": "almoçar",
            "en": "to have lunch",
            "ex": "Nós almoçamos juntos todo dia.",
            "exEn": "We have lunch together every day."
          },
          {
            "pt": "descansar",
            "en": "to rest",
            "ex": "Ela descansa depois do trabalho.",
            "exEn": "She rests after work."
          },
          {
            "pt": "jantar",
            "en": "to have dinner",
            "ex": "Eles jantam às oito da noite.",
            "exEn": "They have dinner at eight at night."
          },
          {
            "pt": "terminar",
            "en": "to finish",
            "ex": "Eu termino o trabalho às cinco.",
            "exEn": "I finish work at five."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Ela trabalha-mos juntos.",
            "correct": "Nós trabalhamos juntos.",
            "note": "English speakers sometimes mix up the verb ending with the wrong subject. 'Trabalhamos' goes with 'nós', not 'ela'."
          },
          {
            "wrong": "Eu trabalho-o todo dia.",
            "correct": "Eu trabalho todo dia.",
            "note": "In Brazilian Portuguese, you do not add an extra pronoun after the conjugated -ar verb in simple present sentences like this."
          },
          {
            "wrong": "Eles trabalham-am no banco.",
            "correct": "Eles trabalham no banco.",
            "note": "The ending '-am' already carries the third-person plural meaning. Do not double or extend it."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct present tense form of the verb.",
            "items": [
              {
                "q": "Eu ___ em um hospital todos os dias.",
                "ans": "trabalho"
              },
              {
                "q": "Ela ___ muito cedo de manhã.",
                "ans": "acorda"
              },
              {
                "q": "Nós ___ juntos na empresa.",
                "ans": "trabalhamos"
              },
              {
                "q": "Eles ___ às seis da tarde.",
                "ans": "terminam"
              },
              {
                "q": "Você ___ perto de casa?",
                "ans": "trabalha"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option to complete the sentence.",
            "items": [
              {
                "q": "Eu ___ em um escritório.",
                "opts": [
                  "trabalho",
                  "trabalha",
                  "trabalhamos",
                  "trabalham"
                ],
                "ans": 0
              },
              {
                "q": "Nós ___ de segunda a sexta.",
                "opts": [
                  "trabalho",
                  "trabalha",
                  "trabalhamos",
                  "trabalham"
                ],
                "ans": 2
              },
              {
                "q": "Eles ___ no supermercado.",
                "opts": [
                  "trabalho",
                  "trabalha",
                  "trabalhamos",
                  "trabalham"
                ],
                "ans": 3
              },
              {
                "q": "Ela ___ muito durante a semana.",
                "opts": [
                  "trabalho",
                  "trabalha",
                  "trabalhamos",
                  "trabalham"
                ],
                "ans": 1
              },
              {
                "q": "Você ___ no banco?",
                "opts": [
                  "trabalho",
                  "trabalha",
                  "trabalhamos",
                  "trabalham"
                ],
                "ans": 1
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese.",
            "items": [
              {
                "q": "I work at a school.",
                "ans": "Eu trabalho em uma escola."
              },
              {
                "q": "She wakes up early every day.",
                "ans": "Ela acorda cedo todo dia."
              },
              {
                "q": "We work a lot.",
                "ans": "Nós trabalhamos muito."
              },
              {
                "q": "They have lunch at noon.",
                "ans": "Eles almoçam ao meio-dia."
              },
              {
                "q": "He finishes work at six.",
                "ans": "Ele termina o trabalho às seis."
              }
            ]
          }
        ],
        "teacherTip": "Encourage students to memorize the -ar verb endings as a chant: '-o, -a, -amos, -am', using 'trabalhar' as the model verb. Connecting each ending to a subject pronoun (eu, ele/ela, nós, eles/elas) from the very beginning helps prevent the most common agreement errors."
      },
      {
        "title": "Health & Body",
        "sub": "Body parts, ailments, and pharmacy visits",
        "emoji": "💊",
        "duration": "~50 min",
        "objectives": [
          "Name body parts in Portuguese",
          "Describe symptoms and ailments",
          "Navigate a pharmacy or doctor's visit"
        ],
        "vocabulary": [
          {
            "pt": "a cabeça",
            "en": "head",
            "ex": "Estou com dor de cabeça.",
            "exEn": "I have a headache."
          },
          {
            "pt": "estou doente",
            "en": "I am sick",
            "ex": "Hoje estou doente.",
            "exEn": "Today I am sick."
          },
          {
            "pt": "a farmácia",
            "en": "the pharmacy",
            "ex": "Preciso ir à farmácia.",
            "exEn": "I need to go to the pharmacy."
          },
          {
            "pt": "o remédio",
            "en": "medicine / medication",
            "ex": "Você tem remédio para dor?",
            "exEn": "Do you have medicine for pain?"
          },
          {
            "pt": "me dói",
            "en": "it hurts me",
            "ex": "Me dói a garganta.",
            "exEn": "My throat hurts."
          },
          {
            "pt": "com licença",
            "en": "excuse me (formal)",
            "ex": "Com licença, pode me ajudar?",
            "exEn": "Excuse me, can you help me?"
          }
        ],
        "grammar": {
          "title": "Estar com — to have (symptoms)",
          "explain": "For physical symptoms, Brazilians say \"estou com\" (I am with) rather than \"I have\". \"Estou com febre\" = \"I have a fever\" (literally \"I am with fever\"). Very common and important!",
          "structure": "Estou com + [symptom noun]",
          "examples": [
            {
              "pt": "Estou com febre.",
              "en": "I have a fever."
            },
            {
              "pt": "Estou com fome.",
              "en": "I'm hungry."
            },
            {
              "pt": "Estou com saudade.",
              "en": "I'm missing [someone/somewhere]."
            }
          ],
          "extendedExamples": [
            {
              "pt": "Estou com dor de garganta desde ontem.",
              "en": "I have had a sore throat since yesterday."
            },
            {
              "pt": "Ele está com febre e precisa descansar.",
              "en": "He has a fever and needs to rest."
            },
            {
              "pt": "Estou com fome e com sede ao mesmo tempo.",
              "en": "I am hungry and thirsty at the same time."
            },
            {
              "pt": "Ela está com dor de barriga depois do almoço.",
              "en": "She has a stomachache after lunch."
            },
            {
              "pt": "Estou com tosse e vou ao médico amanhã.",
              "en": "I have a cough and I am going to the doctor tomorrow."
            }
          ]
        },
        "dialogue": {
          "scene": "Sarah isn't feeling well and goes to a pharmacy.",
          "lines": [
            {
              "sp": "a",
              "pt": "Boa tarde! Estou com dor de cabeça e febre.",
              "en": "Good afternoon! I have a headache and fever."
            },
            {
              "sp": "b",
              "pt": "Desde quando? Há quanto tempo?",
              "en": "Since when? How long?"
            },
            {
              "sp": "a",
              "pt": "Desde ontem à noite.",
              "en": "Since yesterday evening."
            },
            {
              "sp": "b",
              "pt": "Entendo. Você tem alergia a algum remédio?",
              "en": "I see. Do you have an allergy to any medicine?"
            },
            {
              "sp": "a",
              "pt": "Não, não tenho.",
              "en": "No, I don't."
            },
            {
              "sp": "b",
              "pt": "Tome este aqui. Dois comprimidos de 8 em 8 horas.",
              "en": "Take this one. Two tablets every 8 hours."
            }
          ]
        },
        "exercises": [
          {
            "type": "Multiple choice",
            "instruction": "Choose the right expression.",
            "items": [
              {
                "q": "I have a fever.",
                "opts": [
                  "Estou com febre",
                  "Tenho febre agora",
                  "Sou doente"
                ],
                "ans": 0
              },
              {
                "q": "My throat hurts.",
                "opts": [
                  "Me dói a cabeça",
                  "Me dói a garganta",
                  "Estou com fome"
                ],
                "ans": 1
              }
            ]
          }
        ],
        "culture": {
          "title": "Healthcare in Brazil 🏥",
          "text": "Brazil has a universal public healthcare system called SUS (Sistema Único de Saúde) — free for everyone including foreigners. However, public hospitals can have long waits. Private clinics (clínicas particulares) are fast but expensive. Pharmacies (farmácias) in Brazil are very accessible — pharmacists can recommend and sell many medications that require prescriptions in Ireland/UK. Brands like Drogasil and Raia are everywhere."
        },
        "extraVocab": [
          {
            "pt": "a dor de cabeça",
            "en": "headache",
            "ex": "Estou com dor de cabeça hoje.",
            "exEn": "I have a headache today."
          },
          {
            "pt": "a febre",
            "en": "fever",
            "ex": "A criança está com febre alta.",
            "exEn": "The child has a high fever."
          },
          {
            "pt": "a tosse",
            "en": "cough",
            "ex": "Estou com tosse há três dias.",
            "exEn": "I have had a cough for three days."
          },
          {
            "pt": "o enjoo",
            "en": "nausea / feeling sick",
            "ex": "Ela está com enjoo no carro.",
            "exEn": "She feels nauseous in the car."
          },
          {
            "pt": "o resfriado",
            "en": "cold (illness)",
            "ex": "Estou com resfriado e vou ficar em casa.",
            "exEn": "I have a cold and I am going to stay home."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Eu tenho febre.",
            "correct": "Eu estou com febre.",
            "note": "English speakers translate 'I have a fever' using 'ter' (to have), but in Brazilian Portuguese, symptoms are expressed with 'estar com' (literally 'to be with')."
          },
          {
            "wrong": "Estou com uma febre.",
            "correct": "Estou com febre.",
            "note": "In English we say 'a fever', but in Brazilian Portuguese symptom nouns after 'estar com' do not take an indefinite article. Drop 'um/uma'."
          },
          {
            "wrong": "Ela está com dor de cabeça agora, então ela é cansada.",
            "correct": "Ela está com dor de cabeça agora, então ela está cansada.",
            "note": "Temporary states like tiredness use 'estar', not 'ser'. Remember: 'ser' is for permanent characteristics; 'estar' is for conditions and feelings."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct word.",
            "items": [
              {
                "q": "Eu estou ___ febre hoje.",
                "ans": "com"
              },
              {
                "q": "Ela está com dor de ___.",
                "ans": "cabeça"
              },
              {
                "q": "Nós estamos com ___ depois da caminhada.",
                "ans": "sede"
              },
              {
                "q": "O menino está ___ tosse e não vai à escola.",
                "ans": "com"
              },
              {
                "q": "Eu estou com dor de ___.",
                "ans": "barriga"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option.",
            "items": [
              {
                "q": "Eu estou com ___ e preciso beber água.",
                "opts": [
                  "sede",
                  "tosse",
                  "febre",
                  "enjoo"
                ],
                "ans": 0
              },
              {
                "q": "Ela está com dor de ___ e vai tomar um remédio.",
                "opts": [
                  "barriga",
                  "fome",
                  "cansaço",
                  "sede"
                ],
                "ans": 0
              },
              {
                "q": "O paciente ___ com febre alta.",
                "opts": [
                  "sou",
                  "estou",
                  "está",
                  "somos"
                ],
                "ans": 2
              },
              {
                "q": "Estou com ___ e preciso comer alguma coisa.",
                "opts": [
                  "tosse",
                  "fome",
                  "febre",
                  "resfriado"
                ],
                "ans": 1
              },
              {
                "q": "Eles estão com ___ depois de viajar de carro.",
                "opts": [
                  "cabeça",
                  "sede",
                  "enjoo",
                  "garganta"
                ],
                "ans": 2
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese.",
            "items": [
              {
                "q": "I have a fever.",
                "ans": "Estou com febre."
              },
              {
                "q": "She has a sore throat.",
                "ans": "Ela está com dor de garganta."
              },
              {
                "q": "We are hungry.",
                "ans": "Estamos com fome."
              },
              {
                "q": "He has a cough.",
                "ans": "Ele está com tosse."
              },
              {
                "q": "I have a stomachache.",
                "ans": "Estou com dor de barriga."
              }
            ]
          }
        ],
        "teacherTip": "Emphasize that 'estar com' is the standard Brazilian Portuguese structure for expressing physical symptoms and sensations — not 'ter'. A memorable classroom trick is to say the pattern means 'to be with' a symptom, as if the symptom is temporarily accompanying you, which reinforces both the grammar and the temporary nature of 'estar'."
      },
      {
        "title": "A1 Review & Conversation",
        "sub": "Putting it all together",
        "emoji": "🎓",
        "duration": "~60 min",
        "objectives": [
          "Have a natural 3-minute conversation in Portuguese",
          "Review all A1 grammar and vocabulary",
          "Identify your strongest and weakest areas"
        ],
        "vocabulary": [
          {
            "pt": "na verdade",
            "en": "actually / in fact",
            "ex": "Na verdade, eu prefiro café.",
            "exEn": "Actually, I prefer coffee."
          },
          {
            "pt": "que bacana!",
            "en": "how cool!",
            "ex": "Que bacana que você está aprendendo português!",
            "exEn": "How cool that you're learning Portuguese!"
          },
          {
            "pt": "não sei",
            "en": "I don't know",
            "ex": "Não sei a resposta.",
            "exEn": "I don't know the answer."
          },
          {
            "pt": "como se diz...?",
            "en": "how do you say...?",
            "ex": "Como se diz \"umbrella\" em português?",
            "exEn": "How do you say \"umbrella\" in Portuguese?"
          },
          {
            "pt": "pode repetir?",
            "en": "can you repeat?",
            "ex": "Pode repetir mais devagar?",
            "exEn": "Can you repeat more slowly?"
          },
          {
            "pt": "entendi!",
            "en": "I understood! / got it!",
            "ex": "Agora entendi!",
            "exEn": "Now I understood!"
          }
        ],
        "grammar": {
          "title": "A1 Grammar — Full review",
          "explain": "Let's review everything from A1: ser vs estar, ter for age, gostar de, meu/minha agreement, ficar for locations, estar com for symptoms, and present tense -ar verbs.",
          "structure": "ser (identity) / estar (state) / ter (have/age) / ficar (location)",
          "examples": [
            {
              "pt": "Eu sou Sarah. (identity)",
              "en": "I am Sarah."
            },
            {
              "pt": "Estou cansada. (state)",
              "en": "I'm tired."
            },
            {
              "pt": "Tenho 28 anos. (age)",
              "en": "I'm 28 years old."
            },
            {
              "pt": "Onde fica o banco? (location)",
              "en": "Where is the bank?"
            }
          ],
          "extendedExamples": [
            {
              "pt": "Eu sou estudante e tenho vinte anos.",
              "en": "I am a student and I am twenty years old."
            },
            {
              "pt": "O banco fica no centro da cidade.",
              "en": "The bank is located in the city center."
            },
            {
              "pt": "Minha mãe está doente hoje.",
              "en": "My mother is sick today."
            },
            {
              "pt": "Nós somos brasileiros e moramos em São Paulo.",
              "en": "We are Brazilian and we live in São Paulo."
            },
            {
              "pt": "O restaurante fica perto do hotel e está aberto agora.",
              "en": "The restaurant is near the hotel and it is open now."
            }
          ]
        },
        "dialogue": {
          "scene": "Sarah has a full conversation with Marcos after one month of study.",
          "lines": [
            {
              "sp": "a",
              "pt": "Marcos! Como vai? Há quanto tempo!",
              "en": "Marcos! How are you? Long time!"
            },
            {
              "sp": "b",
              "pt": "Sarah! Que surpresa! Tudo bom? Seu português está ótimo!",
              "en": "Sarah! What a surprise! All good? Your Portuguese is great!"
            },
            {
              "sp": "a",
              "pt": "Obrigada! Estudo todo dia. Ainda tenho muito a aprender.",
              "en": "Thank you! I study every day. I still have a lot to learn."
            },
            {
              "sp": "b",
              "pt": "Mas você já fala muito bem! Onde você está morando agora?",
              "en": "But you already speak very well! Where are you living now?"
            },
            {
              "sp": "a",
              "pt": "Ainda em Dublin, mas quero visitar o Brasil no verão!",
              "en": "Still in Dublin, but I want to visit Brazil in the summer!"
            },
            {
              "sp": "b",
              "pt": "Que ótimo! Vai adorar Salvador. A cidade mais linda do Brasil!",
              "en": "How great! You'll love Salvador. The most beautiful city in Brazil!"
            }
          ]
        },
        "exercises": [
          {
            "type": "Multiple choice",
            "instruction": "Final A1 review — choose the correct option.",
            "items": [
              {
                "q": "How do you say \"I am from Ireland\"?",
                "opts": [
                  "Eu sou da Irlanda",
                  "Eu estou da Irlanda",
                  "Eu fico da Irlanda"
                ],
                "ans": 0
              },
              {
                "q": "How do you say \"I have a headache\"?",
                "opts": [
                  "Tenho cabeça",
                  "Estou com dor de cabeça",
                  "Sou com dor"
                ],
                "ans": 1
              },
              {
                "q": "\"Where is the bank?\" in Portuguese:",
                "opts": [
                  "Onde é o banco?",
                  "Onde fica o banco?",
                  "Onde está o banco?"
                ],
                "ans": 1
              }
            ]
          }
        ],
        "culture": {
          "title": "You've completed A1! 🎉",
          "text": "Parabéns! Completing A1 means you can introduce yourself, handle basic situations, understand simple texts, and have short conversations. This is already a huge achievement. At this level, you can survive in Brazil — order food, ask for directions, make friends. The next level (A2) will give you the vocabulary and grammar to have real, meaningful conversations."
        },
        "extraVocab": [
          {
            "pt": "médico",
            "en": "doctor",
            "ex": "Meu pai é médico.",
            "exEn": "My father is a doctor."
          },
          {
            "pt": "cansado",
            "en": "tired",
            "ex": "Eu estou cansado hoje.",
            "exEn": "I am tired today."
          },
          {
            "pt": "irmão",
            "en": "brother",
            "ex": "Eu tenho um irmão.",
            "exEn": "I have a brother."
          },
          {
            "pt": "perto",
            "en": "nearby / close",
            "ex": "A escola fica perto de casa.",
            "exEn": "The school is close to home."
          },
          {
            "pt": "feliz",
            "en": "happy",
            "ex": "Ela está muito feliz hoje.",
            "exEn": "She is very happy today."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Eu sou cansado.",
            "correct": "Eu estou cansado.",
            "note": "Use 'estar' for temporary states like feelings or conditions, not 'ser'."
          },
          {
            "wrong": "O parque é na rua principal.",
            "correct": "O parque fica na rua principal.",
            "note": "Use 'ficar' to express the location of places, not 'ser'."
          },
          {
            "wrong": "Eu tenho frio.",
            "correct": "Eu estou com frio.",
            "note": "In Brazilian Portuguese, physical sensations like cold or hunger use 'estar com', not 'ter'."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct word.",
            "items": [
              {
                "q": "Eu ___ vinte e dois anos.",
                "ans": "tenho"
              },
              {
                "q": "A farmácia ___ perto daqui.",
                "ans": "fica"
              },
              {
                "q": "Nós ___ amigos.",
                "ans": "somos"
              },
              {
                "q": "Ela ___ triste hoje.",
                "ans": "está"
              },
              {
                "q": "Você ___ dois irmãos?",
                "ans": "tem"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option.",
            "items": [
              {
                "q": "Ele ___ professor de inglês.",
                "opts": [
                  "estou",
                  "fica",
                  "é",
                  "tenho"
                ],
                "ans": 2
              },
              {
                "q": "A biblioteca ___ na avenida central.",
                "opts": [
                  "tem",
                  "estou",
                  "sou",
                  "fica"
                ],
                "ans": 3
              },
              {
                "q": "Eu ___ com fome agora.",
                "opts": [
                  "sou",
                  "estou",
                  "fico",
                  "tenho"
                ],
                "ans": 1
              },
              {
                "q": "Eles ___ três filhos.",
                "opts": [
                  "são",
                  "estão",
                  "ficam",
                  "têm"
                ],
                "ans": 3
              },
              {
                "q": "Você ___ bem hoje?",
                "opts": [
                  "é",
                  "tem",
                  "está",
                  "fica"
                ],
                "ans": 2
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese.",
            "items": [
              {
                "q": "I am a student.",
                "ans": "Eu sou estudante."
              },
              {
                "q": "She is happy today.",
                "ans": "Ela está feliz hoje."
              },
              {
                "q": "We have one brother.",
                "ans": "Nós temos um irmão."
              },
              {
                "q": "The hospital is near here.",
                "ans": "O hospital fica perto daqui."
              },
              {
                "q": "They are Brazilian.",
                "ans": "Eles são brasileiros."
              }
            ]
          }
        ],
        "teacherTip": "At A1 level, students often confuse 'ser', 'estar', 'ter', and 'ficar' because English uses only 'to be' or 'to have' for all these meanings. Encourage students to link each verb to a core idea: 'ser' for identity, 'estar' for temporary states, 'ter' for possession or age, and 'ficar' for the location of places."
      }
    ]
  },
  {
    "id": "a2",
    "label": "A2",
    "name": "Basic",
    "desc": "Build real conversations. Past tense, more verbs, opinions, and navigating daily life in Brazil.",
    "color": "#fef3e2",
    "accent": "#9a4f0a",
    "bar": "#e8922a",
    "emoji": "💬",
    "units": [
      {
        "title": "Talking About the Past",
        "sub": "Pretérito perfeito — completed actions",
        "emoji": "⏪",
        "duration": "~55 min",
        "objectives": [
          "Use the simple past for completed actions",
          "Conjugate regular and irregular past tense verbs",
          "Tell a story about something that happened"
        ],
        "vocabulary": [
          {
            "pt": "ontem",
            "en": "yesterday",
            "ex": "Ontem fui ao mercado.",
            "exEn": "Yesterday I went to the market."
          },
          {
            "pt": "na semana passada",
            "en": "last week",
            "ex": "Na semana passada trabalhei muito.",
            "exEn": "Last week I worked a lot."
          },
          {
            "pt": "fui",
            "en": "I went (ir)",
            "ex": "Fui ao cinema ontem.",
            "exEn": "I went to the cinema yesterday."
          },
          {
            "pt": "comi",
            "en": "I ate (comer)",
            "ex": "Comi uma feijoada incrível.",
            "exEn": "I ate an incredible feijoada."
          },
          {
            "pt": "vi",
            "en": "I saw (ver)",
            "ex": "Vi um filme ótimo.",
            "exEn": "I saw a great film."
          },
          {
            "pt": "já",
            "en": "already / ever",
            "ex": "Você já foi ao Brasil?",
            "exEn": "Have you ever been to Brazil?"
          }
        ],
        "grammar": {
          "title": "Pretérito Perfeito — Simple Past",
          "explain": "The pretérito perfeito is used for completed actions in the past. Regular -ar verbs: remove -ar, add -ei/-ou/-amos/-aram. Irregular: ir/ser → fui, ver → vi, fazer → fiz.",
          "structure": "-ar verbs: trabalh+ei / trabalh+ou / trabalh+amos",
          "examples": [
            {
              "pt": "Eu trabalhei ontem.",
              "en": "I worked yesterday."
            },
            {
              "pt": "Ela comeu pizza.",
              "en": "She ate pizza."
            },
            {
              "pt": "Nós fomos ao parque.",
              "en": "We went to the park."
            }
          ],
          "extendedExamples": [
            {
              "pt": "Eu trabalhei muito ontem à noite.",
              "en": "I worked a lot last night."
            },
            {
              "pt": "Ela trabalhou no restaurante semana passada.",
              "en": "She worked at the restaurant last week."
            },
            {
              "pt": "Nós trabalhamos juntos no projeto.",
              "en": "We worked together on the project."
            },
            {
              "pt": "Eu viajei para São Paulo no mês passado.",
              "en": "I traveled to São Paulo last month."
            },
            {
              "pt": "Ele chegou cedo e começou a trabalhar.",
              "en": "He arrived early and started to work."
            }
          ]
        },
        "dialogue": {
          "scene": "Sarah tells Marcos about her weekend.",
          "lines": [
            {
              "sp": "a",
              "pt": "Marcos! Que fim de semana incrível!",
              "en": "Marcos! What an incredible weekend!"
            },
            {
              "sp": "b",
              "pt": "O que você fez?",
              "en": "What did you do?"
            },
            {
              "sp": "a",
              "pt": "Fui ao festival de música. Comi comida brasileira e dancei muito!",
              "en": "I went to a music festival. I ate Brazilian food and danced a lot!"
            },
            {
              "sp": "b",
              "pt": "Que legal! Você foi sozinha?",
              "en": "How cool! Did you go alone?"
            },
            {
              "sp": "a",
              "pt": "Não, fui com amigos. Ficamos até meia-noite.",
              "en": "No, I went with friends. We stayed until midnight."
            }
          ]
        },
        "exercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Conjugate in the past tense.",
            "items": [
              {
                "q": "Eu ___ (trabalhar) ontem.",
                "ans": "trabalhei"
              },
              {
                "q": "Ela ___ (comer) sushi.",
                "ans": "comeu"
              },
              {
                "q": "Nós ___ (ir) ao cinema.",
                "ans": "fomos"
              }
            ]
          }
        ],
        "culture": {
          "title": "Brazilian weekends 🎉",
          "text": "Brazilians are famous for their vibrant weekend culture. Saturdays often involve \"futebol\" (football matches) and evening \"churrascos\" (barbecues). Sundays are sacred family time — big lunches that stretch into the afternoon. Music is everywhere: pagode, samba, forró, and funk all have their weekend rituals. The phrase \"aproveitar o fim de semana\" (enjoy the weekend) is taken very seriously!"
        },
        "extraVocab": [
          {
            "pt": "ontem",
            "en": "yesterday",
            "ex": "Eu trabalhei ontem.",
            "exEn": "I worked yesterday."
          },
          {
            "pt": "semana passada",
            "en": "last week",
            "ex": "Ela viajou semana passada.",
            "exEn": "She traveled last week."
          },
          {
            "pt": "já",
            "en": "already",
            "ex": "Nós já terminamos o trabalho.",
            "exEn": "We already finished the work."
          },
          {
            "pt": "cedo",
            "en": "early",
            "ex": "Ele chegou cedo no escritório.",
            "exEn": "He arrived early at the office."
          },
          {
            "pt": "tarde",
            "en": "late",
            "ex": "Eu cheguei tarde na festa.",
            "exEn": "I arrived late to the party."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Eu trabalhou muito.",
            "correct": "Eu trabalhei muito.",
            "note": "English speakers often use the third-person form 'trabalhou' with 'eu'. Remember: 'eu' always takes the -ei ending in the Pretérito Perfeito for -ar verbs."
          },
          {
            "wrong": "Ela trabalhei ontem.",
            "correct": "Ela trabalhou ontem.",
            "note": "The ending -ei is only for 'eu'. For 'ela', 'ele', or 'você', use the -ou ending."
          },
          {
            "wrong": "Nós trabalhou juntos.",
            "correct": "Nós trabalhamos juntos.",
            "note": "For 'nós', the Pretérito Perfeito of -ar verbs uses -amos, which looks the same as the present tense. Context and time words like 'ontem' help clarify the meaning."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct past tense form of the verb in parentheses.",
            "items": [
              {
                "q": "Eu ___ no supermercado ontem. (trabalhar)",
                "ans": "trabalhei"
              },
              {
                "q": "Ela ___ para casa cedo. (chegar)",
                "ans": "chegou"
              },
              {
                "q": "Nós ___ muito na festa. (dançar)",
                "ans": "dançamos"
              },
              {
                "q": "Eu ___ um e-mail para meu chefe. (enviar)",
                "ans": "enviei"
              },
              {
                "q": "Ele ___ o carro na garagem. (estacionar)",
                "ans": "estacionou"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct past tense form to complete the sentence.",
            "items": [
              {
                "q": "Eu ___ muito na escola ontem.",
                "opts": [
                  "estudou",
                  "estudamos",
                  "estudei",
                  "estudaram"
                ],
                "ans": 2
              },
              {
                "q": "Ela ___ com os amigos no parque.",
                "opts": [
                  "brincou",
                  "brinquei",
                  "brincamos",
                  "brincaram"
                ],
                "ans": 0
              },
              {
                "q": "Nós ___ o apartamento semana passada.",
                "opts": [
                  "limpou",
                  "limpei",
                  "limparam",
                  "limpamos"
                ],
                "ans": 3
              },
              {
                "q": "Ele ___ o café da manhã cedo.",
                "opts": [
                  "preparei",
                  "preparou",
                  "preparamos",
                  "prepararam"
                ],
                "ans": 1
              },
              {
                "q": "Eu ___ minha mãe ontem à noite.",
                "opts": [
                  "ligou",
                  "ligaram",
                  "ligamos",
                  "liguei"
                ],
                "ans": 3
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese.",
            "items": [
              {
                "q": "I worked at the bakery yesterday.",
                "ans": "Eu trabalhei na padaria ontem."
              },
              {
                "q": "She arrived late last night.",
                "ans": "Ela chegou tarde ontem à noite."
              },
              {
                "q": "We traveled to Rio de Janeiro last month.",
                "ans": "Nós viajamos para o Rio de Janeiro no mês passado."
              },
              {
                "q": "He called his friend this morning.",
                "ans": "Ele ligou para o amigo esta manhã."
              },
              {
                "q": "I cooked dinner at home last week.",
                "ans": "Eu cozinhei o jantar em casa semana passada."
              }
            ]
          }
        ],
        "teacherTip": "Encourage students to use time markers like 'ontem', 'semana passada', and 'no mês passado' when practicing the Pretérito Perfeito, as these words signal past tense and help reinforce when each verb form is used. Pay special attention to the 'eu' form (-ei), since it is the most commonly confused with the third-person form (-ou) by English speakers."
      },
      {
        "title": "Making Plans",
        "sub": "Future tense with ir + infinitive",
        "emoji": "📆",
        "duration": "~45 min",
        "objectives": [
          "Make plans using ir + infinitive",
          "Invite someone to do something",
          "Accept and decline invitations politely"
        ],
        "vocabulary": [
          {
            "pt": "vou + infinitivo",
            "en": "I'm going to + verb",
            "ex": "Vou viajar no verão.",
            "exEn": "I'm going to travel in the summer."
          },
          {
            "pt": "que tal...?",
            "en": "how about...?",
            "ex": "Que tal jantar juntos?",
            "exEn": "How about having dinner together?"
          },
          {
            "pt": "vamos!",
            "en": "let's go! / let's!",
            "ex": "Vamos ao cinema?",
            "exEn": "Shall we go to the cinema?"
          },
          {
            "pt": "não posso",
            "en": "I can't",
            "ex": "Não posso amanhã.",
            "exEn": "I can't tomorrow."
          },
          {
            "pt": "que pena",
            "en": "what a shame",
            "ex": "Que pena que você não pode!",
            "exEn": "What a shame you can't!"
          },
          {
            "pt": "combinou!",
            "en": "it's a deal! / agreed!",
            "ex": "Combinado! Nos vemos lá.",
            "exEn": "It's a deal! See you there."
          }
        ],
        "grammar": {
          "title": "Ir + Infinitive — Near Future",
          "explain": "The most common way to talk about the future in spoken Brazilian Portuguese is ir (to go) + infinitive. Much more common than the formal future tense in everyday speech.",
          "structure": "ir (conjugated) + verb in infinitive",
          "examples": [
            {
              "pt": "Vou estudar amanhã.",
              "en": "I'm going to study tomorrow."
            },
            {
              "pt": "Ela vai ligar mais tarde.",
              "en": "She's going to call later."
            },
            {
              "pt": "Vamos jantar fora?",
              "en": "Are we going to eat out?"
            }
          ],
          "extendedExamples": [
            {
              "pt": "Eu vou visitar minha avó no domingo.",
              "en": "I am going to visit my grandmother on Sunday."
            },
            {
              "pt": "Nós vamos jantar fora hoje à noite.",
              "en": "We are going to have dinner out tonight."
            },
            {
              "pt": "Ela vai comprar os ingressos para o show.",
              "en": "She is going to buy the tickets for the show."
            },
            {
              "pt": "Vocês vão viajar para o Rio nas férias?",
              "en": "Are you all going to travel to Rio on vacation?"
            },
            {
              "pt": "Eles vão alugar um carro para a viagem.",
              "en": "They are going to rent a car for the trip."
            }
          ]
        },
        "dialogue": {
          "scene": "Sarah invites Marcos to a concert.",
          "lines": [
            {
              "sp": "a",
              "pt": "Marcos, vou ao show da Ivete Sangalo sábado. Quer vir?",
              "en": "Marcos, I'm going to the Ivete Sangalo show on Saturday. Want to come?"
            },
            {
              "sp": "b",
              "pt": "Ivete?! Adoro! Que horas começa?",
              "en": "Ivete?! I love her! What time does it start?"
            },
            {
              "sp": "a",
              "pt": "Às oito da noite. Vamos jantar antes?",
              "en": "At eight in the evening. Shall we have dinner first?"
            },
            {
              "sp": "b",
              "pt": "Boa ideia! Que tal às seis e meia?",
              "en": "Good idea! How about at half six?"
            },
            {
              "sp": "a",
              "pt": "Perfeito! Combinado!",
              "en": "Perfect! It's a deal!"
            }
          ]
        },
        "exercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete with the correct form of ir.",
            "items": [
              {
                "q": "Eu ___ estudar hoje à noite.",
                "ans": "vou"
              },
              {
                "q": "Ela ___ trabalhar amanhã.",
                "ans": "vai"
              },
              {
                "q": "Nós ___ viajar nas férias.",
                "ans": "vamos"
              }
            ]
          }
        ],
        "culture": {
          "title": "Brazilian music culture 🎵",
          "text": "Brazil has one of the richest music cultures in the world. Ivete Sangalo is one of the biggest pop stars. Samba is the national rhythm. Forró comes from the northeast. Funk carioca dominates the favelas. Bossa Nova (João Gilberto, Tom Jobim) is the cool, sophisticated export that conquered the world. Saying you like \"MPB\" (Música Popular Brasileira) instantly earns you cultural credibility with Brazilians."
        },
        "extraVocab": [
          {
            "pt": "o fim de semana",
            "en": "the weekend",
            "ex": "Vamos viajar no fim de semana.",
            "exEn": "We are going to travel on the weekend."
          },
          {
            "pt": "a viagem",
            "en": "the trip",
            "ex": "Ela vai planejar a viagem amanhã.",
            "exEn": "She is going to plan the trip tomorrow."
          },
          {
            "pt": "o ingresso",
            "en": "the ticket",
            "ex": "Nós vamos comprar os ingressos hoje.",
            "exEn": "We are going to buy the tickets today."
          },
          {
            "pt": "o encontro",
            "en": "the meeting / get-together",
            "ex": "Eles vão marcar um encontro na sexta.",
            "exEn": "They are going to schedule a get-together on Friday."
          },
          {
            "pt": "a reserva",
            "en": "the reservation",
            "ex": "Eu vou fazer uma reserva no restaurante.",
            "exEn": "I am going to make a reservation at the restaurant."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Eu vou para estudar amanhã.",
            "correct": "Eu vou estudar amanhã.",
            "note": "In the 'ir + infinitive' future structure, do not add 'para' between 'ir' and the infinitive verb."
          },
          {
            "wrong": "Ela vai fazendo uma reserva.",
            "correct": "Ela vai fazer uma reserva.",
            "note": "After 'ir' in the near future, always use the infinitive (fazer), not the gerund (fazendo)."
          },
          {
            "wrong": "Nós imos viajar no fim de semana.",
            "correct": "Nós vamos viajar no fim de semana.",
            "note": "The first-person plural of 'ir' is 'vamos', not 'imos'. This is a common error for English speakers applying regular verb patterns."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct conjugated form of 'ir'.",
            "items": [
              {
                "q": "Eu ___ assistir ao filme hoje à noite.",
                "ans": "vou"
              },
              {
                "q": "Ela ___ ligar para o restaurante amanhã.",
                "ans": "vai"
              },
              {
                "q": "Nós ___ fazer uma viagem em julho.",
                "ans": "vamos"
              },
              {
                "q": "Vocês ___ comprar os ingressos online.",
                "ans": "vão"
              },
              {
                "q": "Eles ___ reservar uma mesa para o jantar.",
                "ans": "vão"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option to complete the sentence.",
            "items": [
              {
                "q": "Eu vou ___ uma viagem nas férias.",
                "opts": [
                  "fazendo",
                  "fiz",
                  "fazer",
                  "faço"
                ],
                "ans": 2
              },
              {
                "q": "Nós vamos ___ os ingressos hoje.",
                "opts": [
                  "compramos",
                  "comprar",
                  "comprando",
                  "comprei"
                ],
                "ans": 1
              },
              {
                "q": "Ela vai ___ com os amigos no sábado.",
                "opts": [
                  "saindo",
                  "saiu",
                  "saio",
                  "sair"
                ],
                "ans": 3
              },
              {
                "q": "Eles vão ___ um carro para o fim de semana.",
                "opts": [
                  "alugando",
                  "alugaram",
                  "alugar",
                  "alugam"
                ],
                "ans": 2
              },
              {
                "q": "Você vai ___ a reserva no hotel?",
                "opts": [
                  "fazendo",
                  "faz",
                  "fez",
                  "fazer"
                ],
                "ans": 3
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese.",
            "items": [
              {
                "q": "I am going to travel to São Paulo next week.",
                "ans": "Eu vou viajar para São Paulo na semana que vem."
              },
              {
                "q": "He is going to make a reservation for dinner.",
                "ans": "Ele vai fazer uma reserva para o jantar."
              },
              {
                "q": "We are going to buy tickets for the concert.",
                "ans": "Nós vamos comprar ingressos para o show."
              },
              {
                "q": "Are you going to call your friend tonight?",
                "ans": "Você vai ligar para o seu amigo hoje à noite?"
              },
              {
                "q": "They are going to meet on the weekend.",
                "ans": "Eles vão se encontrar no fim de semana."
              }
            ]
          }
        ],
        "teacherTip": "Remind students that 'ir + infinitive' in Brazilian Portuguese works very similarly to 'going to' in English, which makes it an easy structure to grasp conceptually. Focus early practice on drilling the five conjugations of 'ir' (vou, vai, vamos, vão) so students can use the pattern confidently without hesitating on the auxiliary verb."
      },
      {
        "title": "Opinions & Preferences",
        "sub": "Expressing what you think and feel",
        "emoji": "💭",
        "duration": "~50 min",
        "objectives": [
          "Give your opinion on various topics",
          "Express agreement and disagreement",
          "Use achar and pensar correctly"
        ],
        "vocabulary": [
          {
            "pt": "acho que...",
            "en": "I think that...",
            "ex": "Acho que o Brasil é incrível.",
            "exEn": "I think Brazil is incredible."
          },
          {
            "pt": "na minha opinião",
            "en": "in my opinion",
            "ex": "Na minha opinião, é muito caro.",
            "exEn": "In my opinion, it's very expensive."
          },
          {
            "pt": "concordo / discordo",
            "en": "I agree / I disagree",
            "ex": "Concordo com você!",
            "exEn": "I agree with you!"
          },
          {
            "pt": "depende",
            "en": "it depends",
            "ex": "Depende da situação.",
            "exEn": "It depends on the situation."
          },
          {
            "pt": "com certeza",
            "en": "definitely / of course",
            "ex": "Com certeza vou ao Brasil!",
            "exEn": "I'm definitely going to Brazil!"
          },
          {
            "pt": "não tenho certeza",
            "en": "I'm not sure",
            "ex": "Não tenho certeza ainda.",
            "exEn": "I'm not sure yet."
          }
        ],
        "grammar": {
          "title": "Achar que — to think/find (expressing opinions)",
          "explain": "\"Achar\" in Brazilian Portuguese means both \"to find\" and \"to think/believe\". It's the most common way to give an opinion. Note: \"Acho que\" is followed by a full sentence.",
          "structure": "Acho que + [complete sentence]",
          "examples": [
            {
              "pt": "Acho que o café está bom.",
              "en": "I think the coffee is good."
            },
            {
              "pt": "Você acha que vai chover?",
              "en": "Do you think it will rain?"
            },
            {
              "pt": "Ela acha o filme chato.",
              "en": "She finds the film boring."
            }
          ],
          "extendedExamples": [
            {
              "pt": "Acho que o Brasil é um país incrível.",
              "en": "I think Brazil is an incredible country."
            },
            {
              "pt": "Acho que ela fala português muito bem.",
              "en": "I think she speaks Portuguese very well."
            },
            {
              "pt": "Acho que nós precisamos estudar mais.",
              "en": "I think we need to study more."
            },
            {
              "pt": "Acho que esse restaurante é muito caro.",
              "en": "I think this restaurant is very expensive."
            },
            {
              "pt": "Acho que o tempo vai melhorar amanhã.",
              "en": "I think the weather will get better tomorrow."
            }
          ]
        },
        "dialogue": {
          "scene": "Sarah and Marcos debate which is better: São Paulo or Rio.",
          "lines": [
            {
              "sp": "b",
              "pt": "Você prefere São Paulo ou Rio de Janeiro?",
              "en": "Do you prefer São Paulo or Rio de Janeiro?"
            },
            {
              "sp": "a",
              "pt": "Acho que os dois têm charme. Mas prefiro Rio pelo mar.",
              "en": "I think both have charm. But I prefer Rio for the sea."
            },
            {
              "sp": "b",
              "pt": "Discordo! São Paulo tem mais cultura e comida.",
              "en": "I disagree! São Paulo has more culture and food."
            },
            {
              "sp": "a",
              "pt": "Na minha opinião, Rio é mais bonito.",
              "en": "In my opinion, Rio is more beautiful."
            },
            {
              "sp": "b",
              "pt": "Depende do que você procura. São Paulo nunca dorme!",
              "en": "It depends on what you're looking for. São Paulo never sleeps!"
            }
          ]
        },
        "exercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete with acho or acha.",
            "items": [
              {
                "q": "Eu ___ que o Brasil é lindo.",
                "ans": "acho"
              },
              {
                "q": "Você ___ que vai chover?",
                "ans": "acha"
              },
              {
                "q": "Ela ___ o filme interessante.",
                "ans": "acha"
              }
            ]
          }
        ],
        "culture": {
          "title": "São Paulo vs Rio — the eternal debate 🏙️",
          "text": "The rivalry between São Paulo (Sampa) and Rio de Janeiro (Rio) is one of Brazil's great cultural debates. Paulistanos (people from São Paulo) pride themselves on work ethic, food scene, and cultural diversity. Cariocas (people from Rio) are proud of the beach lifestyle, carnival, and natural beauty. Brazilians from both cities passionately defend their hometown — it's all friendly, but very real!"
        },
        "extraVocab": [
          {
            "pt": "a opinião",
            "en": "the opinion",
            "ex": "Qual é a sua opinião sobre o filme?",
            "exEn": "What is your opinion about the movie?"
          },
          {
            "pt": "preferir",
            "en": "to prefer",
            "ex": "Eu prefiro café a chá.",
            "exEn": "I prefer coffee to tea."
          },
          {
            "pt": "concordar",
            "en": "to agree",
            "ex": "Eu concordo com você.",
            "exEn": "I agree with you."
          },
          {
            "pt": "interessante",
            "en": "interesting",
            "ex": "Acho que esse livro é muito interessante.",
            "exEn": "I think this book is very interesting."
          },
          {
            "pt": "legal",
            "en": "cool / nice (informal)",
            "ex": "Acho que a festa foi muito legal.",
            "exEn": "I think the party was really cool."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Eu penso que é bom.",
            "correct": "Acho que é bom.",
            "note": "English speakers often translate 'I think' as 'Eu penso que', but in Brazilian Portuguese, 'Achar que' is the natural, everyday way to express an opinion."
          },
          {
            "wrong": "Acho que não gosto.",
            "correct": "Acho que não gosto disso.",
            "note": "In Portuguese, the object is usually stated explicitly. Leaving it out can sound incomplete or ambiguous."
          },
          {
            "wrong": "Acho que sim é verdade.",
            "correct": "Acho que é verdade.",
            "note": "'Acho que sim' means 'I think so' and is a standalone phrase. Do not combine it with an extra clause — start a new sentence instead."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct word.",
            "items": [
              {
                "q": "Acho que o filme é muito ___.",
                "ans": "interessante"
              },
              {
                "q": "Acho que eles ___ cansados hoje.",
                "ans": "estão"
              },
              {
                "q": "Eu ___ que a música é muito bonita.",
                "ans": "acho"
              },
              {
                "q": "Acho que nós ___ jantar mais cedo.",
                "ans": "devemos"
              },
              {
                "q": "Acho que ela ___ a melhor professora.",
                "ans": "é"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option to complete the sentence.",
            "items": [
              {
                "q": "Acho que o exercício ___ muito difícil.",
                "opts": [
                  "somos",
                  "são",
                  "é",
                  "estamos"
                ],
                "ans": 2
              },
              {
                "q": "Acho que eles ___ português em casa.",
                "opts": [
                  "falo",
                  "fala",
                  "falamos",
                  "falam"
                ],
                "ans": 3
              },
              {
                "q": "Acho que você ___ razão sobre isso.",
                "opts": [
                  "tenho",
                  "têm",
                  "tem",
                  "temos"
                ],
                "ans": 2
              },
              {
                "q": "Acho que nós ___ ir ao mercado hoje.",
                "opts": [
                  "precisa",
                  "precisam",
                  "preciso",
                  "precisamos"
                ],
                "ans": 3
              },
              {
                "q": "Acho que o restaurante ___ fechado agora.",
                "opts": [
                  "estou",
                  "estão",
                  "está",
                  "estamos"
                ],
                "ans": 2
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese.",
            "items": [
              {
                "q": "I think this book is very good.",
                "ans": "Acho que esse livro é muito bom."
              },
              {
                "q": "I think she is very tired.",
                "ans": "Acho que ela está muito cansada."
              },
              {
                "q": "I think we need to practice more.",
                "ans": "Acho que nós precisamos praticar mais."
              },
              {
                "q": "I think the class is very interesting.",
                "ans": "Acho que a aula é muito interessante."
              },
              {
                "q": "I think they speak Portuguese very well.",
                "ans": "Acho que eles falam português muito bem."
              }
            ]
          }
        ],
        "teacherTip": "Remind students that 'Acho que' is the go-to phrase for opinions in everyday Brazilian Portuguese — far more common than 'Penso que'. Encourage them to start every opinion sentence with 'Acho que' until it becomes a natural habit."
      },
      {
        "title": "Describing People & Places",
        "sub": "Adjectives, comparisons, and descriptions",
        "emoji": "🔍",
        "duration": "~55 min",
        "objectives": [
          "Describe people's appearance and personality",
          "Compare things using mais/menos",
          "Use superlatives for extreme descriptions"
        ],
        "vocabulary": [
          {
            "pt": "alto/a / baixo/a",
            "en": "tall / short",
            "ex": "Marcos é alto.",
            "exEn": "Marcos is tall."
          },
          {
            "pt": "simpático/a",
            "en": "friendly / nice",
            "ex": "Ela é muito simpática.",
            "exEn": "She's very friendly."
          },
          {
            "pt": "mais... do que",
            "en": "more... than",
            "ex": "Dublin é mais fria do que Salvador.",
            "exEn": "Dublin is colder than Salvador."
          },
          {
            "pt": "o mais... de",
            "en": "the most... of/in",
            "ex": "É o mais bonito da cidade.",
            "exEn": "It's the most beautiful in the city."
          },
          {
            "pt": "parecido/a com",
            "en": "similar to / looks like",
            "ex": "Ela é parecida com a mãe.",
            "exEn": "She looks like her mother."
          },
          {
            "pt": "diferente de",
            "en": "different from",
            "ex": "Isto é diferente do que eu esperava.",
            "exEn": "This is different from what I expected."
          }
        ],
        "grammar": {
          "title": "Comparatives and Superlatives",
          "explain": "To compare in Portuguese: mais (more) + adjective + do que (than). For \"the most\", use o/a mais + adjective + de (of/in).",
          "structure": "mais + adj + do que / o/a mais + adj + de",
          "examples": [
            {
              "pt": "O Brasil é maior do que a Irlanda.",
              "en": "Brazil is bigger than Ireland."
            },
            {
              "pt": "Salvador é a cidade mais bonita do Brasil.",
              "en": "Salvador is the most beautiful city in Brazil."
            },
            {
              "pt": "Ele é menos tímido do que antes.",
              "en": "He's less shy than before."
            }
          ],
          "extendedExamples": [
            {
              "pt": "São Paulo é maior do que Curitiba.",
              "en": "São Paulo is bigger than Curitiba."
            },
            {
              "pt": "O Amazonas é o rio mais longo do Brasil.",
              "en": "The Amazon is the longest river in Brazil."
            },
            {
              "pt": "Minha irmã é mais alta do que eu.",
              "en": "My sister is taller than me."
            },
            {
              "pt": "Este restaurante é o mais caro do bairro.",
              "en": "This restaurant is the most expensive in the neighborhood."
            },
            {
              "pt": "O verão no Rio é mais quente do que o inverno em Gramado.",
              "en": "Summer in Rio is hotter than winter in Gramado."
            }
          ]
        },
        "dialogue": {
          "scene": "Sarah describes her new colleagues to Marcos.",
          "lines": [
            {
              "sp": "a",
              "pt": "Tenho novos colegas no trabalho. Vou te descrever.",
              "en": "I have new colleagues at work. I'll describe them to you."
            },
            {
              "sp": "b",
              "pt": "Vai! Estou curioso.",
              "en": "Go on! I'm curious."
            },
            {
              "sp": "a",
              "pt": "A Maria é alta, tem cabelo preto e é a mais simpática da equipe.",
              "en": "Maria is tall, has black hair, and is the nicest in the team."
            },
            {
              "sp": "b",
              "pt": "E os outros?",
              "en": "And the others?"
            },
            {
              "sp": "a",
              "pt": "O João é mais quieto, mas muito inteligente. Ele é diferente de todo mundo.",
              "en": "João is quieter, but very intelligent. He's different from everyone else."
            }
          ]
        },
        "exercises": [
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct comparison.",
            "items": [
              {
                "q": "Brazil is bigger than Ireland.",
                "opts": [
                  "Brasil é grande do que Irlanda",
                  "Brasil é maior do que a Irlanda",
                  "Brasil é mais grande que Irlanda"
                ],
                "ans": 1
              },
              {
                "q": "She is the most intelligent in the class.",
                "opts": [
                  "Ela é a mais inteligente da turma",
                  "Ela é mais inteligente da turma",
                  "Ela é muito inteligente da turma"
                ],
                "ans": 0
              }
            ]
          }
        ],
        "culture": {
          "title": "Brazilian beauty standards and appearance 💄",
          "text": "Brazilians are generally very open about discussing appearance — commenting on someone's weight loss (\"emagreceu!\") or tan is considered a compliment, not rude. Brazil has a complex relationship with beauty: it's the world's second-largest market for beauty products and cosmetic surgery. The phrase \"corpo brasileiro\" reflects the cultural obsession with appearance, especially at the beach."
        },
        "extraVocab": [
          {
            "pt": "alto",
            "en": "tall / high",
            "ex": "O prédio é muito alto.",
            "exEn": "The building is very tall."
          },
          {
            "pt": "agradável",
            "en": "pleasant / nice",
            "ex": "Este bairro é muito agradável.",
            "exEn": "This neighborhood is very pleasant."
          },
          {
            "pt": "movimentado",
            "en": "busy / lively",
            "ex": "O centro da cidade é movimentado.",
            "exEn": "The city center is busy."
          },
          {
            "pt": "tranquilo",
            "en": "quiet / peaceful",
            "ex": "A praia é mais tranquila do que a cidade.",
            "exEn": "The beach is quieter than the city."
          },
          {
            "pt": "famoso",
            "en": "famous",
            "ex": "O Cristo Redentor é o monumento mais famoso do Brasil.",
            "exEn": "Christ the Redeemer is the most famous monument in Brazil."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "mais alto que ela",
            "correct": "mais alto do que ela",
            "note": "In Brazilian Portuguese, comparatives require 'do que' (not just 'que') when comparing two things or people."
          },
          {
            "wrong": "o mais alto de todos os mundo",
            "correct": "o mais alto do mundo",
            "note": "Use the definite article contracted with 'de': 'do' (de + o), 'da' (de + a). Do not add extra articles like 'todos os'."
          },
          {
            "wrong": "mais bonita que o mais bonito lugar",
            "correct": "mais bonita do que o lugar mais bonito",
            "note": "English speakers sometimes mix comparative and superlative in the same clause. Use 'mais + adj + do que' for comparatives and 'o/a mais + adj + de' for superlatives separately."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct word.",
            "items": [
              {
                "q": "O Rio de Janeiro é mais bonito ___ Brasília.",
                "ans": "do que"
              },
              {
                "q": "Ela é a aluna mais ___ da turma.",
                "ans": "inteligente"
              },
              {
                "q": "Este hotel é o mais caro ___ cidade.",
                "ans": "da"
              },
              {
                "q": "Meu pai é mais ___ do que meu irmão.",
                "ans": "alto"
              },
              {
                "q": "A Amazônia é a floresta mais grande ___ mundo.",
                "ans": "do"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option.",
            "items": [
              {
                "q": "O metrô é mais ___ do que o ônibus.",
                "opts": [
                  "rápido",
                  "rápidos",
                  "rápida",
                  "rápidas"
                ],
                "ans": 0
              },
              {
                "q": "Esta praça é a mais ___ do bairro.",
                "opts": [
                  "tranquilos",
                  "tranquila",
                  "tranquilo",
                  "tranquilas"
                ],
                "ans": 1
              },
              {
                "q": "João é mais alto ___ Pedro.",
                "opts": [
                  "que",
                  "de",
                  "do que",
                  "da"
                ],
                "ans": 2
              },
              {
                "q": "Salvador é a cidade mais ___ da Bahia.",
                "opts": [
                  "famosos",
                  "famosas",
                  "famoso",
                  "famosa"
                ],
                "ans": 3
              },
              {
                "q": "O apartamento dela é mais ___ do que o meu.",
                "opts": [
                  "agradável",
                  "agradáveis",
                  "agradando",
                  "agradado"
                ],
                "ans": 0
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese.",
            "items": [
              {
                "q": "My city is more lively than this town.",
                "ans": "Minha cidade é mais movimentada do que esta cidade."
              },
              {
                "q": "She is the tallest student in the class.",
                "ans": "Ela é a aluna mais alta da turma."
              },
              {
                "q": "This neighborhood is quieter than the city center.",
                "ans": "Este bairro é mais tranquilo do que o centro da cidade."
              },
              {
                "q": "That building is the most famous in the country.",
                "ans": "Aquele prédio é o mais famoso do país."
              },
              {
                "q": "Rio de Janeiro is more beautiful than I imagined.",
                "ans": "O Rio de Janeiro é mais bonito do que eu imaginava."
              }
            ]
          }
        ],
        "teacherTip": "Remind students that 'do que' is the standard comparative connector in Brazilian Portuguese — simply using 'que' alone is understood but considered informal. Also highlight that the superlative article (o/a) must agree in gender with the noun it describes, so spend time drilling masculine and feminine noun pairings with their correct superlative forms."
      },
      {
        "title": "Home & Living",
        "sub": "Describing your home and neighbourhood",
        "emoji": "🏠",
        "duration": "~50 min",
        "objectives": [
          "Describe rooms and furniture in Portuguese",
          "Talk about where you live",
          "Say what you do at home"
        ],
        "vocabulary": [
          {
            "pt": "o quarto",
            "en": "bedroom",
            "ex": "Meu quarto é pequeno.",
            "exEn": "My bedroom is small."
          },
          {
            "pt": "a sala de estar",
            "en": "living room",
            "ex": "Assistimos TV na sala.",
            "exEn": "We watch TV in the living room."
          },
          {
            "pt": "a cozinha",
            "en": "kitchen",
            "ex": "Gosto de cozinhar na cozinha.",
            "exEn": "I like cooking in the kitchen."
          },
          {
            "pt": "o bairro",
            "en": "neighbourhood",
            "ex": "Moro num bairro tranquilo.",
            "exEn": "I live in a quiet neighbourhood."
          },
          {
            "pt": "morar",
            "en": "to live/reside",
            "ex": "Moro em Dublin há dois anos.",
            "exEn": "I've lived in Dublin for two years."
          },
          {
            "pt": "há + time",
            "en": "for + time (duration)",
            "ex": "Trabalho aqui há seis meses.",
            "exEn": "I've worked here for six months."
          }
        ],
        "grammar": {
          "title": "Há — expressing duration",
          "explain": "\"Há\" + time period means \"for\" or \"ago\" when talking about duration. \"Moro aqui há dois anos\" = \"I've lived here for two years\". This is different from English present perfect — Portuguese uses present tense!",
          "structure": "[present tense verb] + há + [time period]",
          "examples": [
            {
              "pt": "Moro em Dublin há três anos.",
              "en": "I've lived in Dublin for three years."
            },
            {
              "pt": "Trabalho aqui há seis meses.",
              "en": "I've worked here for six months."
            },
            {
              "pt": "Conheço o Marcos há um ano.",
              "en": "I've known Marcos for a year."
            }
          ],
          "extendedExamples": [
            {
              "pt": "Eu moro nesta casa há cinco anos.",
              "en": "I have been living in this house for five years."
            },
            {
              "pt": "Nós moramos neste bairro há muito tempo.",
              "en": "We have been living in this neighborhood for a long time."
            },
            {
              "pt": "Ela trabalha em casa há dois meses.",
              "en": "She has been working from home for two months."
            },
            {
              "pt": "Eles alugam este apartamento há um ano.",
              "en": "They have been renting this apartment for one year."
            },
            {
              "pt": "Eu conheço esta rua há toda a minha vida.",
              "en": "I have known this street my whole life."
            }
          ]
        },
        "dialogue": {
          "scene": "Marcos visits Sarah's apartment for the first time.",
          "lines": [
            {
              "sp": "b",
              "pt": "Que apartamento bonito! Há quanto tempo você mora aqui?",
              "en": "What a beautiful apartment! How long have you lived here?"
            },
            {
              "sp": "a",
              "pt": "Moro aqui há dois anos. Gosto muito do bairro.",
              "en": "I've lived here for two years. I really like the neighbourhood."
            },
            {
              "sp": "b",
              "pt": "Tem tudo perto — mercado, café, parque...",
              "en": "Everything's nearby — supermarket, café, park..."
            },
            {
              "sp": "a",
              "pt": "É ótimo! A minha cozinha é pequena, mas a sala é espaçosa.",
              "en": "It's great! My kitchen is small, but the living room is spacious."
            },
            {
              "sp": "b",
              "pt": "Muito aconchegante!",
              "en": "Very cosy!"
            }
          ]
        },
        "exercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete with há.",
            "items": [
              {
                "q": "I've lived in Dublin for 3 years. → Moro em Dublin ___ três anos.",
                "ans": "há"
              },
              {
                "q": "She's worked here for 6 months. → Ela trabalha aqui ___ seis meses.",
                "ans": "há"
              }
            ]
          }
        ],
        "culture": {
          "title": "Housing in Brazil 🏘️",
          "text": "Brazil's housing culture varies dramatically by class and region. In cities, middle-class Brazilians often live in apartment buildings (prédios) with doormen (porteiros) and security. Houses (casas) are more common in smaller cities and suburbs. Rent is expensive in São Paulo and Rio. The \"condomínio\" — a gated complex with shared amenities — is very popular. Many Brazilians live with family until marriage, especially outside major cities."
        },
        "extraVocab": [
          {
            "pt": "o apartamento",
            "en": "apartment",
            "ex": "Eu moro neste apartamento há dois anos.",
            "exEn": "I have been living in this apartment for two years."
          },
          {
            "pt": "o vizinho",
            "en": "neighbor",
            "ex": "Eu conheço meu vizinho há muitos anos.",
            "exEn": "I have known my neighbor for many years."
          },
          {
            "pt": "o aluguel",
            "en": "rent",
            "ex": "Eu pago este aluguel há seis meses.",
            "exEn": "I have been paying this rent for six months."
          },
          {
            "pt": "a mobília",
            "en": "furniture",
            "ex": "Nós temos essa mobília há dez anos.",
            "exEn": "We have had this furniture for ten years."
          },
          {
            "pt": "o condomínio",
            "en": "condo / housing complex",
            "ex": "Ela mora neste condomínio há três anos.",
            "exEn": "She has been living in this condo for three years."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Eu moro aqui por cinco anos.",
            "correct": "Eu moro aqui há cinco anos.",
            "note": "English speakers often translate 'for' as 'por', but when expressing how long an action has been ongoing up to now, Brazilian Portuguese uses 'há', not 'por'."
          },
          {
            "wrong": "Eu tenho morado aqui há cinco anos.",
            "correct": "Eu moro aqui há cinco anos.",
            "note": "Unlike English, Brazilian Portuguese does not use the present perfect continuous ('tenho morado') for ongoing situations. Use the simple present tense with 'há' instead."
          },
          {
            "wrong": "Há cinco anos eu morei aqui.",
            "correct": "Eu moro aqui há cinco anos.",
            "note": "Using the preterite ('morei') with 'há' implies the action is finished. Use the present tense to show the action is still happening now."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct word.",
            "items": [
              {
                "q": "Eu moro nesta casa ___ três anos.",
                "ans": "há"
              },
              {
                "q": "Nós ___ neste apartamento há dois anos.",
                "ans": "moramos"
              },
              {
                "q": "Ela conhece os vizinhos ___ muito tempo.",
                "ans": "há"
              },
              {
                "q": "Eles alugam esta casa há ___ meses.",
                "ans": "seis"
              },
              {
                "q": "Eu ___ neste bairro há cinco anos.",
                "ans": "trabalho"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option.",
            "items": [
              {
                "q": "Eu moro aqui ___ dois anos.",
                "opts": [
                  "por",
                  "para",
                  "há",
                  "desde"
                ],
                "ans": 2
              },
              {
                "q": "Ela ___ neste apartamento há um ano.",
                "opts": [
                  "moro",
                  "mora",
                  "moram",
                  "moramos"
                ],
                "ans": 1
              },
              {
                "q": "Nós conhecemos nossos vizinhos ___ muito tempo.",
                "opts": [
                  "por",
                  "há",
                  "em",
                  "de"
                ],
                "ans": 1
              },
              {
                "q": "Eles ___ este imóvel há três anos.",
                "opts": [
                  "alugo",
                  "aluga",
                  "alugamos",
                  "alugam"
                ],
                "ans": 3
              },
              {
                "q": "Eu pago o aluguel ___ seis meses.",
                "opts": [
                  "para",
                  "por",
                  "há",
                  "até"
                ],
                "ans": 2
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese.",
            "items": [
              {
                "q": "I have been living in this house for ten years.",
                "ans": "Eu moro nesta casa há dez anos."
              },
              {
                "q": "She has been renting this apartment for six months.",
                "ans": "Ela aluga este apartamento há seis meses."
              },
              {
                "q": "We have known our neighbors for a long time.",
                "ans": "Nós conhecemos nossos vizinhos há muito tempo."
              },
              {
                "q": "They have been living in this neighborhood for three years.",
                "ans": "Eles moram neste bairro há três anos."
              },
              {
                "q": "He has been working from home for two months.",
                "ans": "Ele trabalha em casa há dois meses."
              }
            ]
          }
        ],
        "teacherTip": "Remind students that in Brazilian Portuguese, the simple present tense is used with 'há' to describe actions that started in the past and continue now — there is no need for a perfect tense like in English. A quick side-by-side comparison ('I have lived here for 5 years' = 'Eu moro aqui há 5 anos') helps reinforce this key structural difference."
      },
      {
        "title": "Work & Study",
        "sub": "Talking about your job and education",
        "emoji": "💼",
        "duration": "~50 min",
        "objectives": [
          "Describe your job and workplace",
          "Talk about your education background",
          "Discuss career plans and ambitions"
        ],
        "vocabulary": [
          {
            "pt": "trabalhar como",
            "en": "to work as",
            "ex": "Trabalho como professora.",
            "exEn": "I work as a teacher."
          },
          {
            "pt": "a empresa",
            "en": "the company",
            "ex": "Trabalho numa empresa de tecnologia.",
            "exEn": "I work at a tech company."
          },
          {
            "pt": "estudei",
            "en": "I studied (past)",
            "ex": "Estudei administração.",
            "exEn": "I studied business administration."
          },
          {
            "pt": "me formei em",
            "en": "I graduated in",
            "ex": "Me formei em direito.",
            "exEn": "I graduated in law."
          },
          {
            "pt": "o chefe / a chefe",
            "en": "the boss (m/f)",
            "ex": "Minha chefe é muito exigente.",
            "exEn": "My boss is very demanding."
          },
          {
            "pt": "a reunião",
            "en": "the meeting",
            "ex": "Tenho reunião às dez.",
            "exEn": "I have a meeting at ten."
          }
        ],
        "grammar": {
          "title": "Reflexive verbs — se chamar, se formar",
          "explain": "Brazilian Portuguese uses many reflexive verbs (with \"se\"). \"Me chamar\" = to be called, \"se formar\" = to graduate, \"se sentir\" = to feel. The se changes to match the subject.",
          "structure": "me/se/nos + [reflexive verb]",
          "examples": [
            {
              "pt": "Me chamo Sarah.",
              "en": "My name is Sarah (I call myself Sarah)."
            },
            {
              "pt": "Ela se formou em medicina.",
              "en": "She graduated in medicine."
            },
            {
              "pt": "Como você se sente?",
              "en": "How do you feel?"
            }
          ],
          "extendedExamples": [
            {
              "pt": "Eu me chamo Carlos e trabalho como engenheiro.",
              "en": "My name is Carlos and I work as an engineer."
            },
            {
              "pt": "Ela se forma em medicina no próximo ano.",
              "en": "She graduates in medicine next year."
            },
            {
              "pt": "Nós nos matriculamos no curso de inglês semana passada.",
              "en": "We enrolled in the English course last week."
            },
            {
              "pt": "Ele se prepara todos os dias para o concurso.",
              "en": "He prepares himself every day for the civil service exam."
            },
            {
              "pt": "Nós nos chamamos João e Pedro, somos colegas de trabalho.",
              "en": "Our names are João and Pedro, we are work colleagues."
            }
          ]
        },
        "dialogue": {
          "scene": "Sarah and Marcos talk about their careers.",
          "lines": [
            {
              "sp": "b",
              "pt": "Você trabalha com o quê, Sarah?",
              "en": "What do you do for work, Sarah?"
            },
            {
              "sp": "a",
              "pt": "Trabalho como designer numa empresa de publicidade.",
              "en": "I work as a designer at an advertising company."
            },
            {
              "sp": "b",
              "pt": "Interessante! Você estudou design?",
              "en": "Interesting! Did you study design?"
            },
            {
              "sp": "a",
              "pt": "Sim, me formei em design gráfico há três anos.",
              "en": "Yes, I graduated in graphic design three years ago."
            },
            {
              "sp": "b",
              "pt": "Legal! E eu me formei em história, mas trabalho com turismo.",
              "en": "Cool! And I graduated in history, but I work in tourism."
            }
          ]
        },
        "exercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete with the correct reflexive form.",
            "items": [
              {
                "q": "My name is Sarah. → ___ chamo Sarah.",
                "ans": "Me"
              },
              {
                "q": "She graduated in medicine. → Ela ___ formou em medicina.",
                "ans": "se"
              }
            ]
          }
        ],
        "culture": {
          "title": "Work culture in Brazil 💼",
          "text": "Brazilian work culture is relationship-driven — \"quem você conhece\" (who you know) matters enormously. Business meetings often start with personal chat before getting to business. Brazilians are creative problem-solvers but hierarchy is respected. \"Jeitinho brasileiro\" — the Brazilian way of finding creative solutions to obstacles — is a national trait. Happy hours (called \"happy hour\" in Brazil) are popular and important for networking."
        },
        "extraVocab": [
          {
            "pt": "se formar",
            "en": "to graduate",
            "ex": "Ela vai se formar em junho.",
            "exEn": "She is going to graduate in June."
          },
          {
            "pt": "se chamar",
            "en": "to be called / to be named",
            "ex": "Eu me chamo Ana.",
            "exEn": "My name is Ana."
          },
          {
            "pt": "se especializar",
            "en": "to specialize",
            "ex": "Ele quer se especializar em direito.",
            "exEn": "He wants to specialize in law."
          },
          {
            "pt": "se matricular",
            "en": "to enroll",
            "ex": "Nós nos matriculamos na universidade.",
            "exEn": "We enrolled in the university."
          },
          {
            "pt": "se preparar",
            "en": "to prepare oneself",
            "ex": "Ela se prepara para a prova.",
            "exEn": "She prepares herself for the test."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Eu chamo João.",
            "correct": "Eu me chamo João.",
            "note": "English speakers often drop the reflexive pronoun 'me'. In Brazilian Portuguese, reflexive verbs always need their pronoun: me, se, or nos."
          },
          {
            "wrong": "Ela se forma em junho de medicina.",
            "correct": "Ela se forma em medicina em junho.",
            "note": "In Brazilian Portuguese, the field of study comes before the time expression. Follow the order: verb + subject area + time."
          },
          {
            "wrong": "Nós se matriculamos na faculdade.",
            "correct": "Nós nos matriculamos na faculdade.",
            "note": "The reflexive pronoun must agree with the subject. 'Nós' requires 'nos', not 'se'. Only ele/ela/você/eles/elas/vocês use 'se'."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct reflexive pronoun (me, se, or nos).",
            "items": [
              {
                "q": "Eu ___ chamo Beatriz e sou estudante.",
                "ans": "me"
              },
              {
                "q": "Ele ___ forma em administração este ano.",
                "ans": "se"
              },
              {
                "q": "Nós ___ preparamos para a prova juntos.",
                "ans": "nos"
              },
              {
                "q": "Ela ___ matriculou no curso de informática.",
                "ans": "se"
              },
              {
                "q": "Nós ___ chamamos Lucas e Fernanda.",
                "ans": "nos"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option to complete the sentence.",
            "items": [
              {
                "q": "Eu me ___ Ana, sou professora.",
                "opts": [
                  "chama",
                  "chamam",
                  "chamo",
                  "chamamos"
                ],
                "ans": 2
              },
              {
                "q": "Ela se ___ em direito no ano que vem.",
                "opts": [
                  "formo",
                  "formamos",
                  "formam",
                  "forma"
                ],
                "ans": 3
              },
              {
                "q": "Nós nos ___ no curso de português.",
                "opts": [
                  "matriculo",
                  "matricula",
                  "matriculamos",
                  "matriculam"
                ],
                "ans": 2
              },
              {
                "q": "Ele se ___ para o exame todas as noites.",
                "opts": [
                  "preparo",
                  "preparamos",
                  "preparam",
                  "prepara"
                ],
                "ans": 3
              },
              {
                "q": "Eles se ___ Pedro e Marcos, são colegas.",
                "opts": [
                  "chamo",
                  "chamamos",
                  "chamam",
                  "chama"
                ],
                "ans": 2
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese.",
            "items": [
              {
                "q": "My name is Ricardo and I am a student.",
                "ans": "Eu me chamo Ricardo e sou estudante."
              },
              {
                "q": "She is going to graduate in engineering.",
                "ans": "Ela vai se formar em engenharia."
              },
              {
                "q": "We enrolled in the university this year.",
                "ans": "Nós nos matriculamos na universidade este ano."
              },
              {
                "q": "He prepares himself for the test every day.",
                "ans": "Ele se prepara para a prova todos os dias."
              },
              {
                "q": "What is your name? (formal, to one person)",
                "ans": "Como o senhor se chama?"
              }
            ]
          }
        ],
        "teacherTip": "Remind students that in Brazilian Portuguese, the reflexive pronoun (me, se, nos) is most commonly placed before the verb in everyday speech, unlike European Portuguese where it often follows. Drilling 'Eu me chamo...' as a fixed chunk first helps students internalize the pattern before introducing other reflexive verbs."
      },
      {
        "title": "Hobbies & Free Time",
        "sub": "Leisure activities and cultural interests",
        "emoji": "⚽",
        "duration": "~50 min",
        "objectives": [
          "Talk about hobbies and leisure activities",
          "Say how often you do things",
          "Discuss Brazilian sports and culture"
        ],
        "vocabulary": [
          {
            "pt": "jogar futebol",
            "en": "to play football",
            "ex": "Jogo futebol aos domingos.",
            "exEn": "I play football on Sundays."
          },
          {
            "pt": "assistir a filmes",
            "en": "to watch films",
            "ex": "Gosto de assistir a filmes de comédia.",
            "exEn": "I like watching comedy films."
          },
          {
            "pt": "sempre / às vezes / nunca",
            "en": "always / sometimes / never",
            "ex": "Nunca assisto ao telejornal.",
            "exEn": "I never watch the news."
          },
          {
            "pt": "todo dia / toda semana",
            "en": "every day / every week",
            "ex": "Corro todo dia de manhã.",
            "exEn": "I run every morning."
          },
          {
            "pt": "meu time",
            "en": "my team",
            "ex": "Meu time é o Flamengo.",
            "exEn": "My team is Flamengo."
          },
          {
            "pt": "apaixonado/a por",
            "en": "passionate about",
            "ex": "Sou apaixonada por música.",
            "exEn": "I'm passionate about music."
          }
        ],
        "grammar": {
          "title": "Frequency adverbs and expressions",
          "explain": "Frequency words in Portuguese go before the main verb or after \"ser/estar\". \"Sempre\" (always), \"às vezes\" (sometimes), \"raramente\" (rarely), \"nunca\" (never).",
          "structure": "subject + frequency word + verb",
          "examples": [
            {
              "pt": "Sempre tomo café pela manhã.",
              "en": "I always have coffee in the morning."
            },
            {
              "pt": "Às vezes vou ao cinema.",
              "en": "Sometimes I go to the cinema."
            },
            {
              "pt": "Nunca como carne vermelha.",
              "en": "I never eat red meat."
            }
          ],
          "extendedExamples": [
            {
              "pt": "Eu sempre ouço música antes de dormir.",
              "en": "I always listen to music before going to sleep."
            },
            {
              "pt": "Ela geralmente lê livros nas tardes de sábado.",
              "en": "She usually reads books on Saturday afternoons."
            },
            {
              "pt": "Nós às vezes jogamos futebol no parque.",
              "en": "We sometimes play soccer in the park."
            },
            {
              "pt": "Ele raramente assiste televisão durante a semana.",
              "en": "He rarely watches television during the week."
            },
            {
              "pt": "Você frequentemente tira fotos quando viaja.",
              "en": "You frequently take photos when you travel."
            }
          ]
        },
        "dialogue": {
          "scene": "Sarah and Marcos talk about what they do in their free time.",
          "lines": [
            {
              "sp": "b",
              "pt": "O que você faz nas horas livres?",
              "en": "What do you do in your free time?"
            },
            {
              "sp": "a",
              "pt": "Gosto de correr, ler e às vezes vou a museus.",
              "en": "I like running, reading and sometimes going to museums."
            },
            {
              "sp": "b",
              "pt": "E futebol? Você torce para algum time?",
              "en": "And football? Do you support any team?"
            },
            {
              "sp": "a",
              "pt": "Ainda não tenho um time brasileiro! Você me indica?",
              "en": "I don't have a Brazilian team yet! Can you suggest one?"
            },
            {
              "sp": "b",
              "pt": "Flamengo! O maior time do Brasil. Você vai se apaixonar!",
              "en": "Flamengo! The biggest team in Brazil. You'll fall in love with it!"
            }
          ]
        },
        "exercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Insert the frequency word in the right position.",
            "items": [
              {
                "q": "I always run in the morning. → ___ corro de manhã.",
                "ans": "Sempre"
              },
              {
                "q": "She sometimes goes to the cinema. → Ela ___ vai ao cinema.",
                "ans": "às vezes"
              },
              {
                "q": "They never eat red meat. → Eles ___ comem carne vermelha.",
                "ans": "nunca"
              }
            ]
          }
        ],
        "culture": {
          "title": "Futebol — Brazil's true religion ⚽",
          "text": "Football in Brazil is not just a sport — it's a national identity. The Seleção (national team) is the most successful in World Cup history (5 titles). Club rivalries are fierce: Flamengo vs Fluminense (Rio), Corinthians vs Palmeiras (São Paulo). A Brazilian's \"time do coração\" (heart team) is deeply personal. When Brazil plays in the World Cup, the country essentially stops — schools close, offices empty, streets fall silent, then erupt."
        },
        "extraVocab": [
          {
            "pt": "bordado",
            "en": "embroidery",
            "ex": "Eu faço bordado aos fins de semana.",
            "exEn": "I do embroidery on weekends."
          },
          {
            "pt": "trilha",
            "en": "hiking trail / hike",
            "ex": "Nós fazemos trilha quase todo domingo.",
            "exEn": "We go hiking almost every Sunday."
          },
          {
            "pt": "pintura",
            "en": "painting",
            "ex": "Ela pratica pintura duas vezes por semana.",
            "exEn": "She practices painting twice a week."
          },
          {
            "pt": "academia",
            "en": "gym",
            "ex": "Ele vai à academia frequentemente.",
            "exEn": "He goes to the gym frequently."
          },
          {
            "pt": "culinária",
            "en": "cooking (as a hobby)",
            "ex": "Eles adoram culinária e cozinham todo fim de semana.",
            "exEn": "They love cooking and cook every weekend."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Eu ouço sempre música.",
            "correct": "Eu sempre ouço música.",
            "note": "In Brazilian Portuguese, frequency adverbs like 'sempre', 'nunca', and 'geralmente' come before the main verb, not after it."
          },
          {
            "wrong": "Ela vai nunca à academia.",
            "correct": "Ela nunca vai à academia.",
            "note": "Negative frequency adverbs like 'nunca' must be placed before the verb. Putting them after creates an unnatural and incorrect sentence."
          },
          {
            "wrong": "Eu jogo futebol cada dia.",
            "correct": "Eu jogo futebol todo dia.",
            "note": "English speakers often translate 'every day' as 'cada dia', but the natural Brazilian Portuguese expression is 'todo dia' or 'todos os dias'."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct frequency word or expression.",
            "items": [
              {
                "q": "Ela ___ pratica ioga. (every day)",
                "ans": "todo dia"
              },
              {
                "q": "Nós ___ vamos ao cinema. (sometimes)",
                "ans": "às vezes"
              },
              {
                "q": "Ele ___ joga videogame. (never)",
                "ans": "nunca"
              },
              {
                "q": "Eu ___ ouço podcast durante a semana. (usually)",
                "ans": "geralmente"
              },
              {
                "q": "Você ___ tira fotos quando viaja. (always)",
                "ans": "sempre"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option to complete the sentence.",
            "items": [
              {
                "q": "Eu ___ leio livros nos fins de semana.",
                "opts": [
                  "nunca",
                  "geralmente",
                  "cada",
                  "ainda"
                ],
                "ans": 1
              },
              {
                "q": "Eles ___ jogam futebol no parque aos domingos.",
                "opts": [
                  "raramente",
                  "ontem",
                  "logo",
                  "muito"
                ],
                "ans": 0
              },
              {
                "q": "Ela pratica natação ___ por semana.",
                "opts": [
                  "todo",
                  "duas vezes",
                  "cada",
                  "sempre"
                ],
                "ans": 1
              },
              {
                "q": "Nós ___ vamos à academia durante a semana.",
                "opts": [
                  "frequentemente",
                  "ontem",
                  "depois",
                  "aqui"
                ],
                "ans": 0
              },
              {
                "q": "Você ___ assiste séries à noite?",
                "opts": [
                  "sempre",
                  "agora",
                  "aqui",
                  "muito"
                ],
                "ans": 0
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese.",
            "items": [
              {
                "q": "I sometimes play board games with my family.",
                "ans": "Eu às vezes jogo jogos de tabuleiro com minha família."
              },
              {
                "q": "She never misses her dance class.",
                "ans": "Ela nunca falta à aula de dança."
              },
              {
                "q": "We usually go hiking on Sundays.",
                "ans": "Nós geralmente fazemos trilha aos domingos."
              },
              {
                "q": "He always listens to music while cooking.",
                "ans": "Ele sempre ouve música enquanto cozinha."
              },
              {
                "q": "They rarely watch television during the week.",
                "ans": "Eles raramente assistem televisão durante a semana."
              }
            ]
          }
        ],
        "teacherTip": "Remind students that in Brazilian Portuguese, frequency adverbs (sempre, nunca, geralmente, raramente) are placed directly before the main verb, which differs from English where they can shift position. Practicing short, fixed phrases like 'Eu sempre faço...' or 'Ela nunca vai...' helps students internalize this pattern quickly."
      },
      {
        "title": "At the Restaurant",
        "sub": "Ordering, paying, and dining out fully",
        "emoji": "🍽️",
        "duration": "~55 min",
        "objectives": [
          "Handle a full restaurant experience in Portuguese",
          "Ask about dishes and make special requests",
          "Deal with the bill and tipping"
        ],
        "vocabulary": [
          {
            "pt": "tem mesa?",
            "en": "do you have a table?",
            "ex": "Boa noite! Tem mesa para dois?",
            "exEn": "Good evening! Do you have a table for two?"
          },
          {
            "pt": "o prato principal",
            "en": "the main course",
            "ex": "O prato principal vem com arroz.",
            "exEn": "The main course comes with rice."
          },
          {
            "pt": "está incluído",
            "en": "it's included",
            "ex": "O couvert está incluído?",
            "exEn": "Is the cover charge included?"
          },
          {
            "pt": "sem...",
            "en": "without...",
            "ex": "Sem cebola, por favor.",
            "exEn": "Without onion, please."
          },
          {
            "pt": "está no ponto",
            "en": "it's perfectly done (meat)",
            "ex": "A carne está no ponto.",
            "exEn": "The meat is perfectly done."
          },
          {
            "pt": "a gorjeta",
            "en": "the tip",
            "ex": "A gorjeta não está inclusa.",
            "exEn": "The tip is not included."
          }
        ],
        "grammar": {
          "title": "Making polite requests with poder",
          "explain": "\"Poder\" (can/could) is essential for polite requests in restaurants and everyday life. \"Pode me trazer...?\" = \"Could you bring me...?\" It's more polite than \"Quero\" (I want) in formal situations.",
          "structure": "Pode + infinitive + [complement]?",
          "examples": [
            {
              "pt": "Pode me trazer a conta?",
              "en": "Could you bring me the bill?"
            },
            {
              "pt": "Pode repetir mais devagar?",
              "en": "Could you repeat more slowly?"
            },
            {
              "pt": "Pode tirar a foto?",
              "en": "Could you take the photo?"
            }
          ],
          "extendedExamples": [
            {
              "pt": "Pode trazer mais água, por favor?",
              "en": "Can you bring more water, please?"
            },
            {
              "pt": "Pode repetir o prato principal?",
              "en": "Can you repeat the main course?"
            },
            {
              "pt": "Pode trocar este garfo sujo?",
              "en": "Can you change this dirty fork?"
            },
            {
              "pt": "Pode separar a conta?",
              "en": "Can you split the bill?"
            },
            {
              "pt": "Pode indicar um vinho para o peixe?",
              "en": "Can you suggest a wine for the fish?"
            }
          ]
        },
        "dialogue": {
          "scene": "Sarah dines at a traditional Brazilian churrascaria.",
          "lines": [
            {
              "sp": "a",
              "pt": "Garçom, pode me trazer o cardápio, por favor?",
              "en": "Waiter, could you bring me the menu, please?"
            },
            {
              "sp": "b",
              "pt": "Claro! Já trago. Algo para beber enquanto isso?",
              "en": "Of course! Right away. Something to drink in the meantime?"
            },
            {
              "sp": "a",
              "pt": "Uma água com gás, por favor. Sem gelo.",
              "en": "Sparkling water please. No ice."
            },
            {
              "sp": "b",
              "pt": "Prontinho. O prato do dia é picanha com farofa e vinagrete.",
              "en": "Right away. Today's special is picanha with farofa and vinagrete."
            },
            {
              "sp": "a",
              "pt": "Perfeito! Vou querer isso. Está incluso o couvert?",
              "en": "Perfect! I'll have that. Is the cover charge included?"
            },
            {
              "sp": "b",
              "pt": "Não, senhora. São cinco reais à parte.",
              "en": "No, madam. It's five reais extra."
            }
          ]
        },
        "exercises": [
          {
            "type": "Multiple choice",
            "instruction": "Choose the most polite request.",
            "items": [
              {
                "q": "Asking for the bill:",
                "opts": [
                  "Quero a conta!",
                  "Pode me trazer a conta?",
                  "A conta!"
                ],
                "ans": 1
              },
              {
                "q": "Ordering without onion:",
                "opts": [
                  "Não quero cebola.",
                  "Pode ser sem cebola?",
                  "Tira a cebola."
                ],
                "ans": 1
              }
            ]
          }
        ],
        "culture": {
          "title": "Eating out in Brazil 🥩",
          "text": "Brazil's restaurant scene is incredible. \"Churrascarias\" (steakhouses) serve meat on skewers directly to your table — waiters come continuously until you flip your token to red (stop). \"Kilo restaurants\" (comida a kilo) let you choose what you want and pay by weight — perfect for trying everything. Lunch is always the big meal. Brazilians always say \"bom proveito!\" to everyone eating nearby — a charming tradition."
        },
        "extraVocab": [
          {
            "pt": "a conta",
            "en": "the bill / check",
            "ex": "Pode trazer a conta, por favor?",
            "exEn": "Can you bring the bill, please?"
          },
          {
            "pt": "o cardápio",
            "en": "the menu",
            "ex": "Pode me dar o cardápio?",
            "exEn": "Can you give me the menu?"
          },
          {
            "pt": "o garçom",
            "en": "the waiter",
            "ex": "O garçom anotou o pedido.",
            "exEn": "The waiter wrote down the order."
          },
          {
            "pt": "o pedido",
            "en": "the order",
            "ex": "Pode anotar o meu pedido?",
            "exEn": "Can you take my order?"
          },
          {
            "pt": "a sobremesa",
            "en": "the dessert",
            "ex": "Pode recomendar uma sobremesa?",
            "exEn": "Can you recommend a dessert?"
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Você pode trazendo a conta?",
            "correct": "Você pode trazer a conta?",
            "note": "After 'poder', always use the infinitive form of the verb, never the gerund (-ndo)."
          },
          {
            "wrong": "Pode me dar o menu?",
            "correct": "Pode me dar o cardápio?",
            "note": "The word 'menu' is understood in Brazil, but the standard Brazilian Portuguese word is 'cardápio'. Use 'cardápio' in formal or written contexts."
          },
          {
            "wrong": "Pode trazer a conta para mim, sim?",
            "correct": "Pode trazer a conta, por favor?",
            "note": "English speakers often end requests with a tag question. In Brazilian Portuguese, use 'por favor' to keep the request polite instead."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct word.",
            "items": [
              {
                "q": "Pode ___ a conta, por favor?",
                "ans": "trazer"
              },
              {
                "q": "Pode me dar o ___, por favor?",
                "ans": "cardápio"
              },
              {
                "q": "Pode ___ este copo sujo?",
                "ans": "trocar"
              },
              {
                "q": "O garçom anotou o meu ___.",
                "ans": "pedido"
              },
              {
                "q": "Pode recomendar uma ___?",
                "ans": "sobremesa"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option.",
            "items": [
              {
                "q": "Pode ___ mais pão, por favor?",
                "opts": [
                  "trazendo",
                  "trazer",
                  "traz",
                  "trago"
                ],
                "ans": 1
              },
              {
                "q": "Pode ___ o pedido agora?",
                "opts": [
                  "anotando",
                  "anotei",
                  "anotar",
                  "anota"
                ],
                "ans": 2
              },
              {
                "q": "Pode ___ a mesa perto da janela?",
                "opts": [
                  "reservar",
                  "reservando",
                  "reservei",
                  "reservamos"
                ],
                "ans": 0
              },
              {
                "q": "Pode ___ um vinho tinto para mim?",
                "opts": [
                  "indicando",
                  "indico",
                  "indicar",
                  "indicamos"
                ],
                "ans": 2
              },
              {
                "q": "Pode ___ a sobremesa do dia?",
                "opts": [
                  "explique",
                  "explicando",
                  "explicar",
                  "explico"
                ],
                "ans": 2
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese.",
            "items": [
              {
                "q": "Can you bring the bill, please?",
                "ans": "Pode trazer a conta, por favor?"
              },
              {
                "q": "Can you give me the menu?",
                "ans": "Pode me dar o cardápio?"
              },
              {
                "q": "Can you take my order?",
                "ans": "Pode anotar o meu pedido?"
              },
              {
                "q": "Can you recommend a dessert?",
                "ans": "Pode recomendar uma sobremesa?"
              },
              {
                "q": "Can you change this dirty glass?",
                "ans": "Pode trocar este copo sujo?"
              }
            ]
          }
        ],
        "teacherTip": "Remind students that 'poder' followed by an infinitive is the most natural and polite way to make requests in a Brazilian restaurant — it sounds friendly rather than demanding. Encourage them to always add 'por favor' at the end to reinforce politeness, since Brazilian Portuguese speakers use it frequently in service interactions."
      },
      {
        "title": "Travel & Tourism",
        "sub": "Visiting places and talking about travel",
        "emoji": "✈️",
        "duration": "~55 min",
        "objectives": [
          "Talk about travel plans and past trips",
          "Book accommodation and transport",
          "Ask for tourist information"
        ],
        "vocabulary": [
          {
            "pt": "a passagem",
            "en": "the ticket (transport)",
            "ex": "Comprei a passagem de avião.",
            "exEn": "I bought the plane ticket."
          },
          {
            "pt": "o voo",
            "en": "the flight",
            "ex": "O voo dura doze horas.",
            "exEn": "The flight lasts twelve hours."
          },
          {
            "pt": "a hospedagem",
            "en": "the accommodation",
            "ex": "A hospedagem está reservada.",
            "exEn": "The accommodation is booked."
          },
          {
            "pt": "o cartão postal",
            "en": "the postcard",
            "ex": "Mandei um cartão postal para a mãe.",
            "exEn": "I sent a postcard to my mum."
          },
          {
            "pt": "as férias",
            "en": "the holidays/vacation",
            "ex": "Nas próximas férias vou ao Brasil.",
            "exEn": "On my next holiday I'm going to Brazil."
          },
          {
            "pt": "aproveitar",
            "en": "to enjoy/make the most of",
            "ex": "Aproveita bastante!",
            "exEn": "Make the most of it!"
          }
        ],
        "grammar": {
          "title": "Past + Future — telling a full travel story",
          "explain": "Combine past tense (what you did) with ir + infinitive (what you're going to do) to tell complete travel stories. This is essential for natural conversation.",
          "structure": "[past tense] + ... + vou/vamos + [infinitive]",
          "examples": [
            {
              "pt": "Já fui ao Rio. Agora vou a Salvador.",
              "en": "I've already been to Rio. Now I'm going to Salvador."
            },
            {
              "pt": "Comprei a passagem e vou partir na sexta.",
              "en": "I bought the ticket and I'm leaving on Friday."
            },
            {
              "pt": "Visitamos o Cristo e depois vamos ao Pão de Açúcar.",
              "en": "We visited the Christ and then we're going to Sugarloaf."
            }
          ],
          "extendedExamples": [
            {
              "pt": "Eu visitei o Rio no ano passado e vou voltar no próximo verão.",
              "en": "I visited Rio last year and I'm going to go back next summer."
            },
            {
              "pt": "Nós compramos as passagens ontem e vamos viajar na sexta-feira.",
              "en": "We bought the tickets yesterday and we are going to travel on Friday."
            },
            {
              "pt": "Ela reservou o hotel na semana passada e vai ficar lá por cinco dias.",
              "en": "She booked the hotel last week and is going to stay there for five days."
            },
            {
              "pt": "Eles chegaram em São Paulo de manhã e vão visitar o museu à tarde.",
              "en": "They arrived in São Paulo in the morning and are going to visit the museum in the afternoon."
            },
            {
              "pt": "Eu perdi minha mala no aeroporto, mas vou resolver esse problema agora.",
              "en": "I lost my suitcase at the airport, but I am going to solve this problem now."
            }
          ]
        },
        "dialogue": {
          "scene": "Sarah plans her first trip to Brazil.",
          "lines": [
            {
              "sp": "a",
              "pt": "Marcos! Comprei minha passagem para o Brasil!",
              "en": "Marcos! I bought my ticket to Brazil!"
            },
            {
              "sp": "b",
              "pt": "Sério?! Quando você vai?",
              "en": "Really?! When are you going?"
            },
            {
              "sp": "a",
              "pt": "Em julho. Vou ficar duas semanas. Primeiro Salvador, depois Rio.",
              "en": "In July. I'm staying two weeks. First Salvador, then Rio."
            },
            {
              "sp": "b",
              "pt": "Que itinerário perfeito! Você já reservou a hospedagem?",
              "en": "What a perfect itinerary! Have you booked the accommodation yet?"
            },
            {
              "sp": "a",
              "pt": "Ainda não. Você pode me indicar um bom lugar em Salvador?",
              "en": "Not yet. Can you recommend a good place in Salvador?"
            }
          ]
        },
        "exercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the travel sentences.",
            "items": [
              {
                "q": "I bought the ticket. → Comprei a ___.",
                "ans": "passagem"
              },
              {
                "q": "The flight lasts 11 hours. → O ___ dura onze horas.",
                "ans": "voo"
              },
              {
                "q": "I'm going to stay two weeks. → Vou ___ duas semanas.",
                "ans": "ficar"
              }
            ]
          }
        ],
        "culture": {
          "title": "Travelling in Brazil ✈️",
          "text": "Brazil is a continent — distances are enormous. Flying is often the only practical option between cities. Domestic airlines GOL and LATAM connect major cities. Buses (ônibus interestaduais) are excellent for shorter distances and much cheaper. Salvador's historic Pelourinho district, Rio's beaches, Iguaçu Falls, the Amazon, and Lençóis Maranhenses are all bucket-list destinations. Brazilians are incredibly welcoming to foreigners — you'll never be short of help."
        },
        "extraVocab": [
          {
            "pt": "a passagem",
            "en": "ticket (flight/bus)",
            "ex": "Eu comprei a passagem ontem.",
            "exEn": "I bought the ticket yesterday."
          },
          {
            "pt": "o roteiro",
            "en": "itinerary",
            "ex": "Nós planejamos o roteiro da viagem.",
            "exEn": "We planned the trip itinerary."
          },
          {
            "pt": "a hospedagem",
            "en": "accommodation",
            "ex": "A hospedagem ficou muito cara.",
            "exEn": "The accommodation was very expensive."
          },
          {
            "pt": "o voo",
            "en": "flight",
            "ex": "O voo saiu atrasado de manhã.",
            "exEn": "The flight left late in the morning."
          },
          {
            "pt": "a temporada",
            "en": "season / high season period",
            "ex": "Viajamos fora da temporada para economizar.",
            "exEn": "We traveled off-season to save money."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Eu vou para viajei no Brasil.",
            "correct": "Eu viajei no Brasil e vou viajar de novo.",
            "note": "English speakers sometimes mix up the order of past and future. Use the past tense verb first to describe what already happened, then vou + infinitive for what comes next."
          },
          {
            "wrong": "Nós vamos à comprar as passagens.",
            "correct": "Nós vamos comprar as passagens.",
            "note": "Do not put 'à' between 'vamos' and the infinitive. The pattern is simply vamos + infinitive with no preposition."
          },
          {
            "wrong": "Eu fui visito a praia.",
            "correct": "Eu visitei a praia.",
            "note": "English speakers sometimes combine 'fui' with a present-tense verb. To express a completed action in the past, use the simple past form of the main verb, not 'fui' plus another verb."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct word.",
            "items": [
              {
                "q": "Eu ___ o hotel na semana passada.",
                "ans": "reservei"
              },
              {
                "q": "Nós chegamos cedo e vamos ___ a cidade hoje.",
                "ans": "explorar"
              },
              {
                "q": "Ela perdeu a ___ e precisou comprar outra.",
                "ans": "passagem"
              },
              {
                "q": "Eles viajaram muito e vão ___ em casa amanhã.",
                "ans": "descansar"
              },
              {
                "q": "Eu visitei três países e vou ___ mais dois no próximo mês.",
                "ans": "conhecer"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option.",
            "items": [
              {
                "q": "Nós compramos o roteiro e vamos ___ a viagem amanhã.",
                "opts": [
                  "começa",
                  "começar",
                  "começamos",
                  "começou"
                ],
                "ans": 1
              },
              {
                "q": "Eu ___ em Salvador por uma semana e adorei tudo.",
                "opts": [
                  "fico",
                  "ficava",
                  "fiquei",
                  "ficarei"
                ],
                "ans": 2
              },
              {
                "q": "Ela chegou no aeroporto e vai ___ o passaporte agora.",
                "opts": [
                  "mostra",
                  "mostrou",
                  "mostrando",
                  "mostrar"
                ],
                "ans": 3
              },
              {
                "q": "Eles perderam o ___ e tiveram que esperar o próximo.",
                "opts": [
                  "roteiro",
                  "voo",
                  "câmbio",
                  "guia"
                ],
                "ans": 1
              },
              {
                "q": "Eu visitei o museu ontem e vou ___ a praia hoje.",
                "opts": [
                  "visito",
                  "visitei",
                  "visitar",
                  "visitava"
                ],
                "ans": 2
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese.",
            "items": [
              {
                "q": "We arrived at the hotel yesterday and we are going to visit the beach tomorrow.",
                "ans": "Nós chegamos no hotel ontem e vamos visitar a praia amanhã."
              },
              {
                "q": "I bought the ticket last week and I am going to travel on Saturday.",
                "ans": "Eu comprei a passagem na semana passada e vou viajar no sábado."
              },
              {
                "q": "She loved the city and is going to come back next year.",
                "ans": "Ela adorou a cidade e vai voltar no próximo ano."
              },
              {
                "q": "They planned the itinerary and are going to leave on Friday.",
                "ans": "Eles planejaram o roteiro e vão sair na sexta-feira."
              },
              {
                "q": "We stayed in a cheap accommodation and are going to save more money.",
                "ans": "Nós ficamos em uma hospedagem barata e vamos economizar mais dinheiro."
              }
            ]
          }
        ],
        "teacherTip": "Encourage students to narrate a real or imagined trip using one sentence about what they already did (past) and one about what they plan to do next (vou/vamos + infinitive), since connecting these two tenses in a single story is the core skill at A2 level. Using travel topics like flights, hotels, and sightseeing gives students natural, motivating contexts to practice this pattern."
      },
      {
        "title": "Emotions & Relationships",
        "sub": "Talking about feelings and connections",
        "emoji": "❤️",
        "duration": "~50 min",
        "objectives": [
          "Express a wide range of emotions in Portuguese",
          "Talk about relationships and social connections",
          "Use estar and ficar for emotional states"
        ],
        "vocabulary": [
          {
            "pt": "estou feliz",
            "en": "I'm happy",
            "ex": "Estou muito feliz hoje!",
            "exEn": "I'm very happy today!"
          },
          {
            "pt": "estou com saudade",
            "en": "I'm missing [someone]",
            "ex": "Estou com saudade da minha família.",
            "exEn": "I'm missing my family."
          },
          {
            "pt": "fiquei surpreso/a",
            "en": "I was surprised",
            "ex": "Fiquei surpresa com a notícia.",
            "exEn": "I was surprised by the news."
          },
          {
            "pt": "me sinto",
            "en": "I feel",
            "ex": "Me sinto em casa aqui.",
            "exEn": "I feel at home here."
          },
          {
            "pt": "a amizade",
            "en": "friendship",
            "ex": "A amizade é muito importante.",
            "exEn": "Friendship is very important."
          },
          {
            "pt": "tenho saudade de",
            "en": "I miss",
            "ex": "Tenho saudade de Cork.",
            "exEn": "I miss Cork."
          }
        ],
        "grammar": {
          "title": "Ficar + adjective — to become/get",
          "explain": "\"Ficar\" + adjective expresses a change of state — becoming something. \"Fiquei feliz\" = I got/became happy. It's different from estar (a current state) — ficar implies the state just happened.",
          "structure": "ficar + [adjective describing new state]",
          "examples": [
            {
              "pt": "Fiquei muito feliz com a notícia.",
              "en": "I became very happy with the news."
            },
            {
              "pt": "Ela ficou triste quando soube.",
              "en": "She got sad when she found out."
            },
            {
              "pt": "Ficamos surpresos!",
              "en": "We were surprised!"
            }
          ],
          "extendedExamples": [
            {
              "pt": "Eu fico nervoso antes de uma prova importante.",
              "en": "I get nervous before an important test."
            },
            {
              "pt": "Ela fica triste quando o namorado viaja.",
              "en": "She gets sad when her boyfriend travels."
            },
            {
              "pt": "Nós ficamos animados com a festa de aniversário.",
              "en": "We get excited about the birthday party."
            },
            {
              "pt": "Ele fica com raiva quando as pessoas chegam atrasadas.",
              "en": "He gets angry when people arrive late."
            },
            {
              "pt": "Elas ficam envergonhadas quando erram na frente da turma.",
              "en": "They get embarrassed when they make mistakes in front of the class."
            }
          ]
        },
        "dialogue": {
          "scene": "Sarah talks about her feelings about living abroad.",
          "lines": [
            {
              "sp": "b",
              "pt": "Como você se sente morando longe da família?",
              "en": "How do you feel living far from your family?"
            },
            {
              "sp": "a",
              "pt": "Às vezes fico com saudade. Mas me sinto em casa em Dublin.",
              "en": "Sometimes I get homesick. But I feel at home in Dublin."
            },
            {
              "sp": "b",
              "pt": "Entendo. Eu também fico com saudade do Brasil às vezes.",
              "en": "I understand. I also miss Brazil sometimes."
            },
            {
              "sp": "a",
              "pt": "É difícil, né? Mas faz parte da aventura.",
              "en": "It's hard, isn't it? But it's part of the adventure."
            },
            {
              "sp": "b",
              "pt": "Exatamente. E a gente faz amigos incríveis pelo caminho!",
              "en": "Exactly. And we make incredible friends along the way!"
            }
          ]
        },
        "exercises": [
          {
            "type": "Multiple choice",
            "instruction": "Choose ficar or estar.",
            "items": [
              {
                "q": "I'm happy right now (current state).",
                "opts": [
                  "Estou feliz",
                  "Fiquei feliz",
                  "Fico feliz"
                ],
                "ans": 0
              },
              {
                "q": "I became happy when I heard the news (change of state).",
                "opts": [
                  "Estou feliz",
                  "Fiquei feliz",
                  "Fico feliz"
                ],
                "ans": 1
              }
            ]
          }
        ],
        "culture": {
          "title": "Saudade — the untranslatable emotion 💙",
          "text": "No word captures Brazilian (and Portuguese) culture like \"saudade\" — a melancholic longing for something or someone you love that is absent. It's not exactly sadness, nostalgia, or homesickness — it's all three at once, with love mixed in. Brazilians say \"estou com saudade de você\" (I'm missing you) and it carries enormous emotional weight. The music genre \"bossa nova\" was practically built on saudade."
        },
        "extraVocab": [
          {
            "pt": "animado",
            "en": "excited / pumped up",
            "ex": "Ele fica animado quando vê os amigos.",
            "exEn": "He gets excited when he sees his friends."
          },
          {
            "pt": "chateado",
            "en": "upset / annoyed",
            "ex": "Ela fica chateada quando chove no fim de semana.",
            "exEn": "She gets upset when it rains on the weekend."
          },
          {
            "pt": "com ciúmes",
            "en": "jealous",
            "ex": "Ele fica com ciúmes quando ela fala com outros.",
            "exEn": "He gets jealous when she talks to others."
          },
          {
            "pt": "envergonhado",
            "en": "embarrassed",
            "ex": "Eu fico envergonhado quando erro a pronúncia.",
            "exEn": "I get embarrassed when I mispronounce something."
          },
          {
            "pt": "apaixonado",
            "en": "in love / smitten",
            "ex": "Ela ficou apaixonada pelo colega de trabalho.",
            "exEn": "She fell in love with her coworker."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Eu estou nervoso quando vejo ela.",
            "correct": "Eu fico nervoso quando a vejo.",
            "note": "English speakers often use 'estar' to describe becoming a new emotional state. Use 'ficar' in Brazilian Portuguese to express a change in feeling or reaction to something."
          },
          {
            "wrong": "Ela ficou com triste.",
            "correct": "Ela ficou triste.",
            "note": "Do not use 'com' before a simple adjective after 'ficar'. 'Com' is only used with noun phrases like 'ficar com raiva' or 'ficar com medo', not with adjectives like 'triste' or 'animado'."
          },
          {
            "wrong": "Ele ficou nervosamente.",
            "correct": "Ele ficou nervoso.",
            "note": "After 'ficar', use an adjective (nervoso), not an adverb (nervosamente). This is a direct parallel to English 'he got nervous', where an adjective follows, not an adverb."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct form of 'ficar' or the correct adjective.",
            "items": [
              {
                "q": "Ela ___ chateada quando ele não liga.",
                "ans": "fica"
              },
              {
                "q": "Eu fico muito ___ antes de uma viagem.",
                "ans": "animado"
              },
              {
                "q": "Nós ___ tristes quando o filme termina.",
                "ans": "ficamos"
              },
              {
                "q": "Ele fica ___ quando recebe uma surpresa.",
                "ans": "envergonhado"
              },
              {
                "q": "Vocês ___ com raiva facilmente?",
                "ans": "ficam"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option to complete the sentence.",
            "items": [
              {
                "q": "Ela ___ nervosa antes da apresentação.",
                "opts": [
                  "fica",
                  "está",
                  "tem",
                  "vai"
                ],
                "ans": 0
              },
              {
                "q": "Eu fico ___ quando meu time perde.",
                "opts": [
                  "felizmente",
                  "tristeza",
                  "triste",
                  "tristemente"
                ],
                "ans": 2
              },
              {
                "q": "Eles ficam ___ quando veem os filhos.",
                "opts": [
                  "alegria",
                  "alegremente",
                  "alegres",
                  "alegrado"
                ],
                "ans": 2
              },
              {
                "q": "Você ___ com ciúmes às vezes?",
                "opts": [
                  "ficas",
                  "fica",
                  "ficam",
                  "ficamos"
                ],
                "ans": 1
              },
              {
                "q": "Nós ficamos ___ com a notícia ruim.",
                "opts": [
                  "chateados",
                  "chateamento",
                  "chateando",
                  "chateademente"
                ],
                "ans": 0
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese.",
            "items": [
              {
                "q": "I get happy when I talk to my friends.",
                "ans": "Eu fico feliz quando falo com meus amigos."
              },
              {
                "q": "She gets nervous before the test.",
                "ans": "Ela fica nervosa antes da prova."
              },
              {
                "q": "He gets angry when people are late.",
                "ans": "Ele fica com raiva quando as pessoas chegam atrasadas."
              },
              {
                "q": "We get excited about the trip.",
                "ans": "Nós ficamos animados com a viagem."
              },
              {
                "q": "They get sad when they fight.",
                "ans": "Eles ficam tristes quando brigam."
              }
            ]
          }
        ],
        "teacherTip": "Remind students that 'ficar + adjective' describes a change into a new emotional state triggered by something, not a permanent trait — contrast 'Ela é triste' (she is a sad person by nature) with 'Ela fica triste' (she gets sad in reaction to something). This distinction helps students choose between 'ser', 'estar', and 'ficar' more confidently at the A2 level."
      },
      {
        "title": "A2 Review & Consolidation",
        "sub": "Consolidating all A2 content",
        "emoji": "🎓",
        "duration": "~60 min",
        "objectives": [
          "Narrate a past experience fluently",
          "Make and respond to invitations",
          "Express opinions with confidence"
        ],
        "vocabulary": [
          {
            "pt": "aliás",
            "en": "by the way / moreover",
            "ex": "Aliás, você está ótima hoje!",
            "exEn": "By the way, you look great today!"
          },
          {
            "pt": "por sinal",
            "en": "speaking of which / incidentally",
            "ex": "Por sinal, vi o Marcos ontem.",
            "exEn": "Speaking of which, I saw Marcos yesterday."
          },
          {
            "pt": "enfim",
            "en": "anyway / in short",
            "ex": "Enfim, foi uma ótima viagem.",
            "exEn": "Anyway, it was a great trip."
          },
          {
            "pt": "ou seja",
            "en": "that is / in other words",
            "ex": "Ou seja, você não vai poder vir.",
            "exEn": "In other words, you won't be able to come."
          },
          {
            "pt": "tanto faz",
            "en": "it doesn't matter / either way",
            "ex": "Tanto faz — qualquer dia está bom.",
            "exEn": "Either way — any day works."
          },
          {
            "pt": "que saudade!",
            "en": "I've missed this so much!",
            "ex": "Que saudade dessa música!",
            "exEn": "I've missed this music so much!"
          }
        ],
        "grammar": {
          "title": "A2 Full Grammar Review",
          "explain": "Key A2 structures: pretérito perfeito (past), ir + infinitive (future), há for duration, ficar + adjective (change of state), poder for polite requests, comparatives with mais/menos.",
          "structure": "Review all tenses and key expressions from A2",
          "examples": [
            {
              "pt": "Ontem fui ao mercado. (past)",
              "en": "Yesterday I went to the market."
            },
            {
              "pt": "Vou estudar amanhã. (near future)",
              "en": "I'm going to study tomorrow."
            },
            {
              "pt": "Moro aqui há 2 anos. (duration)",
              "en": "I've lived here for 2 years."
            }
          ],
          "extendedExamples": [
            {
              "pt": "Quando eu era criança, eu morava no campo, mas agora eu moro na cidade.",
              "en": "When I was a child, I used to live in the countryside, but now I live in the city."
            },
            {
              "pt": "Ontem eu fui ao mercado e comprei frutas para a semana.",
              "en": "Yesterday I went to the market and bought fruit for the week."
            },
            {
              "pt": "Todo sábado eu costumo jogar futebol com os meus amigos.",
              "en": "Every Saturday I usually play soccer with my friends."
            },
            {
              "pt": "No próximo mês, nós vamos viajar para o Nordeste.",
              "en": "Next month, we are going to travel to the Northeast."
            },
            {
              "pt": "Ela já terminou o trabalho, mas ainda não enviou o e-mail.",
              "en": "She has already finished the work, but she hasn't sent the email yet."
            }
          ]
        },
        "dialogue": {
          "scene": "Sarah gives a full A2-level account of her first month in Brazil.",
          "lines": [
            {
              "sp": "a",
              "pt": "Então, como foi sua viagem ao Brasil?",
              "en": "So, how was your trip to Brazil?"
            },
            {
              "sp": "b",
              "pt": "Foi incrível! Fui primeiro a Salvador — amei o Pelourinho.",
              "en": "It was incredible! I went first to Salvador — I loved the Pelourinho."
            },
            {
              "sp": "a",
              "pt": "E a comida?",
              "en": "And the food?"
            },
            {
              "sp": "b",
              "pt": "Comi feijoada, acarajé, moqueca... Aliás, aprendi a fazer caipirinha!",
              "en": "I ate feijoada, acarajé, moqueca... By the way, I learned to make caipirinha!"
            },
            {
              "sp": "a",
              "pt": "Que demais! E vai voltar?",
              "en": "How amazing! And are you going back?"
            },
            {
              "sp": "b",
              "pt": "Com certeza! Já estou planejando a próxima viagem.",
              "en": "Definitely! I'm already planning the next trip."
            }
          ]
        },
        "exercises": [
          {
            "type": "Multiple choice",
            "instruction": "A2 review — choose the correct option.",
            "items": [
              {
                "q": "\"I studied at university for 4 years\" →",
                "opts": [
                  "Estudei na universidade por 4 anos",
                  "Estudei na universidade há 4 anos",
                  "Estudo na universidade há 4 anos"
                ],
                "ans": 1
              },
              {
                "q": "Making a polite request:",
                "opts": [
                  "Quero água!",
                  "Pode me trazer água?",
                  "Me traz água."
                ],
                "ans": 1
              },
              {
                "q": "\"She became happy\" →",
                "opts": [
                  "Ela estava feliz",
                  "Ela ficou feliz",
                  "Ela foi feliz"
                ],
                "ans": 1
              }
            ]
          }
        ],
        "culture": {
          "title": "You've completed A2! 🏆",
          "text": "Completing A2 is a major milestone. You can now handle most daily situations, narrate past events, make plans, express opinions, and have genuine conversations. This is the level where Portuguese starts to feel less like studying and more like communicating. At A2+, you can travel independently in Brazil, make Brazilian friends, and enjoy Brazilian culture — music, food, football — with a real understanding of what's happening. The next level (B1) is where true fluency begins."
        },
        "extraVocab": [
          {
            "pt": "costumar",
            "en": "to usually do (habitual action)",
            "ex": "Eu costumo acordar cedo.",
            "exEn": "I usually wake up early."
          },
          {
            "pt": "já",
            "en": "already / yet",
            "ex": "Você já comeu?",
            "exEn": "Have you eaten yet?"
          },
          {
            "pt": "ainda",
            "en": "still / yet",
            "ex": "Ela ainda mora com os pais.",
            "exEn": "She still lives with her parents."
          },
          {
            "pt": "antigamente",
            "en": "in the past / back in the day",
            "ex": "Antigamente, eu não gostava de legumes.",
            "exEn": "In the past, I didn't like vegetables."
          },
          {
            "pt": "logo",
            "en": "soon / shortly",
            "ex": "Ele vai chegar logo.",
            "exEn": "He is going to arrive soon."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Eu sou com fome.",
            "correct": "Eu estou com fome.",
            "note": "English speakers say 'I am hungry' using 'to be', but Portuguese uses 'estar com fome' (literally 'to be with hunger'). Never use 'ser' for physical states."
          },
          {
            "wrong": "Ontem eu ia ao cinema.",
            "correct": "Ontem eu fui ao cinema.",
            "note": "For completed past actions, use the Pretérito Perfeito (fui). The Pretérito Imperfeito (ia) is for habitual or ongoing past actions, not finished single events."
          },
          {
            "wrong": "Eu tenho 30 anos de idade.",
            "correct": "Eu tenho 30 anos.",
            "note": "The phrase 'de idade' is not wrong but is almost never used in everyday Brazilian Portuguese. Simply say 'Eu tenho 30 anos.' Adding 'de idade' sounds overly formal or redundant."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct word.",
            "items": [
              {
                "q": "Quando eu era pequeno, eu ___ muito na praia.",
                "ans": "brincava"
              },
              {
                "q": "Ontem nós ___ um filme muito bom.",
                "ans": "assistimos"
              },
              {
                "q": "Ela ___ viajar para o Japão no ano que vem.",
                "ans": "vai"
              },
              {
                "q": "Todo dia eu ___ café da manhã às sete horas.",
                "ans": "tomo"
              },
              {
                "q": "Eles ainda não ___ para o nosso convite.",
                "ans": "responderam"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option.",
            "items": [
              {
                "q": "Nós ___ ao parque todos os domingos quando éramos crianças.",
                "opts": [
                  "íamos",
                  "fomos",
                  "vamos",
                  "foram"
                ],
                "ans": 0
              },
              {
                "q": "Meu irmão ___ médico desde 2018.",
                "opts": [
                  "estava",
                  "foi",
                  "é",
                  "ser"
                ],
                "ans": 2
              },
              {
                "q": "Eles ___ uma festa linda no fim de semana passado.",
                "opts": [
                  "fazem",
                  "fizeram",
                  "faziam",
                  "vão fazer"
                ],
                "ans": 1
              },
              {
                "q": "Amanhã eu ___ estudar para a prova.",
                "opts": [
                  "fui",
                  "ia",
                  "vou",
                  "fazia"
                ],
                "ans": 2
              },
              {
                "q": "Você ___ com fome agora?",
                "opts": [
                  "é",
                  "ser",
                  "foi",
                  "está"
                ],
                "ans": 3
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese.",
            "items": [
              {
                "q": "When I was young, I used to play in the street.",
                "ans": "Quando eu era jovem, eu brincava na rua."
              },
              {
                "q": "Last week they traveled to São Paulo.",
                "ans": "Na semana passada, eles viajaram para São Paulo."
              },
              {
                "q": "We are going to eat at a restaurant tonight.",
                "ans": "Nós vamos comer em um restaurante hoje à noite."
              },
              {
                "q": "She usually drinks coffee in the morning.",
                "ans": "Ela costuma tomar café de manhã."
              },
              {
                "q": "I have already finished my homework.",
                "ans": "Eu já terminei o meu dever de casa."
              }
            ]
          }
        ],
        "teacherTip": "At A2, students often confuse the Pretérito Perfeito and Imperfeito — remind them that Perfeito is for completed single events ('fui') while Imperfeito is for habits or states in the past ('ia sempre'). Using time markers like 'ontem', 'todo dia', and 'quando era criança' helps students choose the right tense naturally."
      }
    ]
  },
  {
    "id": "b1",
    "label": "B1",
    "name": "Intermediate",
    "desc": "True independence. Complex grammar, nuanced expression, and real Brazilian conversational fluency.",
    "color": "#edf7ed",
    "accent": "#1f6b2e",
    "bar": "#4caf50",
    "emoji": "🌟",
    "units": [
      {
        "title": "The Subjunctive Mood",
        "sub": "Expressing wishes, doubts, and recommendations",
        "emoji": "🎭",
        "duration": "~60 min",
        "objectives": [
          "Use the present subjunctive after trigger phrases",
          "Recognise subjunctive in reading and listening",
          "Express wishes, hopes, and recommendations"
        ],
        "vocabulary": [
          {
            "pt": "espero que",
            "en": "I hope that",
            "ex": "Espero que você venha.",
            "exEn": "I hope you come."
          },
          {
            "pt": "quero que",
            "en": "I want [someone] to",
            "ex": "Quero que você estude.",
            "exEn": "I want you to study."
          },
          {
            "pt": "é importante que",
            "en": "it's important that",
            "ex": "É importante que você descanse.",
            "exEn": "It's important that you rest."
          },
          {
            "pt": "pode ser que",
            "en": "it's possible that",
            "ex": "Pode ser que chova.",
            "exEn": "It may rain."
          },
          {
            "pt": "embora",
            "en": "although / even though",
            "ex": "Embora esteja cansada, vou estudar.",
            "exEn": "Although I'm tired, I'll study."
          },
          {
            "pt": "para que",
            "en": "so that / in order that",
            "ex": "Estudo para que você aprenda.",
            "exEn": "I study so that you learn."
          }
        ],
        "grammar": {
          "title": "Present Subjunctive — forms and triggers",
          "explain": "The subjunctive expresses subjectivity: wishes, doubts, emotions, recommendations. Trigger phrases like \"espero que\", \"é importante que\", \"embora\" are always followed by subjunctive.",
          "structure": "trigger phrase + que + [subjunctive verb]",
          "examples": [
            {
              "pt": "Espero que ele venha.",
              "en": "I hope he comes."
            },
            {
              "pt": "É importante que você durma.",
              "en": "It's important that you sleep."
            },
            {
              "pt": "Embora esteja chovendo, vou sair.",
              "en": "Although it's raining, I'll go out."
            }
          ],
          "extendedExamples": [
            {
              "pt": "Quero que você seja feliz.",
              "en": "I want you to be happy."
            },
            {
              "pt": "É importante que ele chegue cedo.",
              "en": "It is important that he arrive early."
            },
            {
              "pt": "A professora pede que os alunos façam o dever de casa.",
              "en": "The teacher asks that the students do their homework."
            },
            {
              "pt": "Tomara que faça sol no fim de semana.",
              "en": "I hope it's sunny this weekend."
            },
            {
              "pt": "É possível que eles não venham à reunião.",
              "en": "It is possible that they won't come to the meeting."
            }
          ]
        },
        "dialogue": {
          "scene": "Marcos gives Sarah life advice.",
          "lines": [
            {
              "sp": "b",
              "pt": "Espero que você aproveite muito o Brasil.",
              "en": "I hope you make the most of Brazil."
            },
            {
              "sp": "a",
              "pt": "Eu também! Quero que você me mostre todos os lugares.",
              "en": "Me too! I want you to show me all the places."
            },
            {
              "sp": "b",
              "pt": "É importante que você experimente a comida de rua.",
              "en": "It's important that you try street food."
            },
            {
              "sp": "a",
              "pt": "E a capoeira? Quero que eu aprenda.",
              "en": "And capoeira? I want to learn it."
            },
            {
              "sp": "b",
              "pt": "Ótimo! Pode ser que eu conheça um professor.",
              "en": "Great! It's possible I know a teacher."
            }
          ]
        },
        "exercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Conjugate in the subjunctive.",
            "items": [
              {
                "q": "Espero que ele ___ (vir).",
                "ans": "venha"
              },
              {
                "q": "É importante que você ___ (dormir) bem.",
                "ans": "durma"
              },
              {
                "q": "Embora ___ (estar) tarde, vou continuar.",
                "ans": "esteja"
              }
            ]
          }
        ],
        "culture": {
          "title": "Capoeira — martial art, dance, and music 🤸",
          "text": "Capoeira is one of Brazil's greatest cultural exports — a martial art disguised as a dance, created by enslaved Africans who hid their fighting techniques within music and movement. The \"jogo\" (game) between two practitioners is accompanied by the berimbau (a bow instrument) and atabaque drum. Today capoeira is practiced worldwide and is a UNESCO Intangible Cultural Heritage. In Salvador (Bahia), it's everywhere — you'll see it in streets and academies daily."
        },
        "extraVocab": [
          {
            "pt": "esperar",
            "en": "to hope / to wait",
            "ex": "Espero que você venha à festa.",
            "exEn": "I hope you come to the party."
          },
          {
            "pt": "duvidar",
            "en": "to doubt",
            "ex": "Duvido que ele saiba a resposta.",
            "exEn": "I doubt he knows the answer."
          },
          {
            "pt": "sugerir",
            "en": "to suggest",
            "ex": "Sugiro que vocês estudem mais.",
            "exEn": "I suggest you all study more."
          },
          {
            "pt": "permitir",
            "en": "to allow / to permit",
            "ex": "Minha mãe não permite que eu saia tarde.",
            "exEn": "My mom doesn't allow me to go out late."
          },
          {
            "pt": "necessário",
            "en": "necessary",
            "ex": "É necessário que todos estejam presentes.",
            "exEn": "It is necessary that everyone be present."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Quero que você está bem.",
            "correct": "Quero que você esteja bem.",
            "note": "After trigger phrases like 'quero que', the verb must be in the present subjunctive, not the present indicative. English speakers often use the indicative by habit."
          },
          {
            "wrong": "É importante que ele vai estudar.",
            "correct": "É importante que ele estude.",
            "note": "Impersonal expressions like 'é importante que' require the subjunctive. Avoid using 'vai + infinitive' (the future/going-to structure) after 'que' in this context."
          },
          {
            "wrong": "Espero que você pode me ajudar.",
            "correct": "Espero que você possa me ajudar.",
            "note": "'Esperar que' is a classic subjunctive trigger. 'Pode' is indicative; 'possa' is the correct present subjunctive form of 'poder'."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct present subjunctive form of the verb in parentheses.",
            "items": [
              {
                "q": "Espero que ela ___ (falar) com o diretor hoje.",
                "ans": "fale"
              },
              {
                "q": "É necessário que nós ___ (chegar) antes das oito.",
                "ans": "cheguemos"
              },
              {
                "q": "Minha mãe quer que eu ___ (fazer) a cama todos os dias.",
                "ans": "faça"
              },
              {
                "q": "É importante que você ___ (beber) bastante água.",
                "ans": "beba"
              },
              {
                "q": "Duvido que eles ___ (saber) a verdade.",
                "ans": "saibam"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct present subjunctive form to complete each sentence.",
            "items": [
              {
                "q": "Quero que você ___ mais cuidado no trânsito.",
                "opts": [
                  "tem",
                  "teve",
                  "tenha",
                  "tinha"
                ],
                "ans": 2
              },
              {
                "q": "É possível que ela não ___ amanhã.",
                "opts": [
                  "vem",
                  "veio",
                  "vinha",
                  "venha"
                ],
                "ans": 3
              },
              {
                "q": "Sugiro que vocês ___ esse livro.",
                "opts": [
                  "leram",
                  "leem",
                  "leiam",
                  "lerão"
                ],
                "ans": 2
              },
              {
                "q": "A médica recomenda que o paciente ___ mais.",
                "opts": [
                  "dormia",
                  "dorme",
                  "dormiu",
                  "durma"
                ],
                "ans": 3
              },
              {
                "q": "Tomara que ele ___ um bom emprego logo.",
                "opts": [
                  "encontra",
                  "encontrou",
                  "encontre",
                  "encontrará"
                ],
                "ans": 2
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese using the present subjunctive.",
            "items": [
              {
                "q": "I hope you get a good grade.",
                "ans": "Espero que você tire uma boa nota."
              },
              {
                "q": "It is important that we speak Portuguese every day.",
                "ans": "É importante que a gente fale português todo dia."
              },
              {
                "q": "She wants her son to be a doctor.",
                "ans": "Ela quer que o filho dela seja médico."
              },
              {
                "q": "The teacher suggests that the students practice more.",
                "ans": "A professora sugere que os alunos pratiquem mais."
              },
              {
                "q": "It is possible that he doesn't know the answer.",
                "ans": "É possível que ele não saiba a resposta."
              }
            ]
          }
        ],
        "teacherTip": "Remind students that the present subjunctive in Brazilian Portuguese is almost always triggered by a specific phrase before 'que' — such as 'quero que', 'é importante que', or 'espero que'. Drilling these trigger phrases as fixed chunks first helps students recognize when to switch out of the indicative and into the subjunctive naturally."
      },
      {
        "title": "Imperfect Past",
        "sub": "Describing past habits and ongoing states",
        "emoji": "📖",
        "duration": "~60 min",
        "objectives": [
          "Use the imperfect past for habits and states",
          "Contrast pretérito perfeito vs imperfeito",
          "Tell more nuanced stories about the past"
        ],
        "vocabulary": [
          {
            "pt": "quando era criança",
            "en": "when I was a child",
            "ex": "Quando era criança, morava no campo.",
            "exEn": "When I was a child, I lived in the countryside."
          },
          {
            "pt": "costumava",
            "en": "used to",
            "ex": "Costumava acordar cedo.",
            "exEn": "I used to wake up early."
          },
          {
            "pt": "naquele tempo",
            "en": "at that time / back then",
            "ex": "Naquele tempo, não havia internet.",
            "exEn": "Back then, there was no internet."
          },
          {
            "pt": "de repente",
            "en": "suddenly",
            "ex": "De repente, começou a chover.",
            "exEn": "Suddenly, it started to rain."
          },
          {
            "pt": "enquanto",
            "en": "while",
            "ex": "Enquanto ele dormia, ela estudava.",
            "exEn": "While he was sleeping, she was studying."
          },
          {
            "pt": "já não",
            "en": "no longer",
            "ex": "Já não moro lá.",
            "exEn": "I no longer live there."
          }
        ],
        "grammar": {
          "title": "Pretérito Imperfeito vs Perfeito",
          "explain": "Imperfeito: background, habits, ongoing states in the past. Perfeito: completed actions. They work together: imperfeito sets the scene, perfeito tells what happened.",
          "structure": "imperfeito: -ava/-ia (habit/state) + perfeito: -ei/-ou (event)",
          "examples": [
            {
              "pt": "Eu morava em Roma quando conheci o Marcos.",
              "en": "I was living in Rome when I met Marcos."
            },
            {
              "pt": "Enquanto chovia, li um livro.",
              "en": "While it was raining, I read a book."
            },
            {
              "pt": "Antes, eu não gostava de café. Agora adoro.",
              "en": "Before, I didn't like coffee. Now I love it."
            }
          ],
          "extendedExamples": [
            {
              "pt": "Quando eu era criança, brincava na rua todos os dias, mas um dia caí e machuquei o joelho.",
              "en": "When I was a child, I used to play in the street every day, but one day I fell and hurt my knee."
            },
            {
              "pt": "Ela sempre tomava café da manhã em casa, mas ontem saiu sem comer nada.",
              "en": "She always used to have breakfast at home, but yesterday she left without eating anything."
            },
            {
              "pt": "Nós morávamos perto do centro e por isso caminhávamos ao trabalho, mas no inverno passado compramos um carro.",
              "en": "We used to live near the city center and so we would walk to work, but last winter we bought a car."
            },
            {
              "pt": "Ele trabalhava até tarde toda semana, quando de repente perdeu o emprego.",
              "en": "He used to work late every week, when suddenly he lost his job."
            },
            {
              "pt": "As crianças dormiam tranquilas quando um barulho forte as acordou no meio da noite.",
              "en": "The children were sleeping peacefully when a loud noise woke them up in the middle of the night."
            }
          ]
        },
        "dialogue": {
          "scene": "Sarah and Marcos share childhood memories.",
          "lines": [
            {
              "sp": "a",
              "pt": "Marcos, como era sua infância em Salvador?",
              "en": "Marcos, what was your childhood in Salvador like?"
            },
            {
              "sp": "b",
              "pt": "Era maravilhosa. Morava perto da praia. Ia ao mar todo dia.",
              "en": "It was wonderful. I lived near the beach. I went to the sea every day."
            },
            {
              "sp": "a",
              "pt": "Que saudade você deve ter!",
              "en": "You must miss it so much!"
            },
            {
              "sp": "b",
              "pt": "Tenho, sim. E a sua infância em Cork?",
              "en": "I do. And your childhood in Cork?"
            },
            {
              "sp": "a",
              "pt": "Quando era pequena, brincava na rua o dia todo. Era mais simples.",
              "en": "When I was little, I played in the street all day. It was simpler."
            }
          ]
        },
        "exercises": [
          {
            "type": "Multiple choice",
            "instruction": "Choose imperfeito or perfeito.",
            "items": [
              {
                "q": "I used to live in Rio (habit)",
                "opts": [
                  "Eu morei no Rio",
                  "Eu morava no Rio",
                  "Eu vivia no Rio — both b and c correct"
                ],
                "ans": 2
              },
              {
                "q": "Yesterday I went to the market (completed action)",
                "opts": [
                  "Eu ia ao mercado",
                  "Eu fui ao mercado",
                  "Eu ia e ia ao mercado"
                ],
                "ans": 1
              }
            ]
          }
        ],
        "culture": {
          "title": "Brazilian childhood and nostalgia 🌅",
          "text": "Brazilians are deeply nostalgic about childhood. The 80s and 90s in Brazil were a golden era for many — before smartphones, when kids played in the streets, watched Xuxa on TV, and ate \"salgadinhos\" at birthday parties. The word \"saudade\" is often paired with childhood memories. Brazilian children's culture is rich: Mônica's Gang comics, Turma da Mônica, and the \"quadrilha\" dances at June festivals (Festa Junina) are all deeply embedded in national memory."
        },
        "extraVocab": [
          {
            "pt": "costumava",
            "en": "used to (habitually)",
            "ex": "Eu costumava acordar cedo todo dia.",
            "exEn": "I used to wake up early every day."
          },
          {
            "pt": "de repente",
            "en": "suddenly",
            "ex": "De repente, o telefone tocou.",
            "exEn": "Suddenly, the phone rang."
          },
          {
            "pt": "naquela época",
            "en": "back then / at that time",
            "ex": "Naquela época, eu morava no interior.",
            "exEn": "Back then, I lived in the countryside."
          },
          {
            "pt": "enquanto",
            "en": "while / whereas",
            "ex": "Enquanto ela dormia, ele chegou em casa.",
            "exEn": "While she was sleeping, he arrived home."
          },
          {
            "pt": "de vez em quando",
            "en": "once in a while / from time to time",
            "ex": "De vez em quando, nós íamos à praia.",
            "exEn": "Once in a while, we would go to the beach."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Ontem eu comia pizza com meus amigos.",
            "correct": "Ontem eu comi pizza com meus amigos.",
            "note": "English speakers often use the imperfeito for all past actions. For a specific, completed event with a time marker like 'ontem' (yesterday), use the pretérito perfeito (-ei/-ou)."
          },
          {
            "wrong": "Quando eu era jovem, fui à praia todo fim de semana.",
            "correct": "Quando eu era jovem, ia à praia todo fim de semana.",
            "note": "Repeated or habitual past actions must use the imperfeito (ia), not the perfeito (fui). 'Todo fim de semana' signals a habit, not a single event."
          },
          {
            "wrong": "Eu estava muito cansado ontem então dormia cedo.",
            "correct": "Eu estava muito cansado ontem então dormi cedo.",
            "note": "The result or consequence of a specific past situation is a completed event. Use the perfeito (dormi) for the action that happened once as a result, and reserve the imperfeito for the background state (estava)."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct past tense form of the verb in parentheses.",
            "items": [
              {
                "q": "Quando eu era pequeno, eu ___ (brincar) no parque todos os dias.",
                "ans": "brincava"
              },
              {
                "q": "Ontem à noite, ela ___ (ligar) para a mãe dela.",
                "ans": "ligou"
              },
              {
                "q": "Nós ___ (morar) em São Paulo por dez anos antes de nos mudarmos.",
                "ans": "morávamos"
              },
              {
                "q": "De repente, o cachorro ___ (latir) muito alto e todos acordaram.",
                "ans": "latiu"
              },
              {
                "q": "Enquanto eles ___ (jantar), começou a chover forte.",
                "ans": "jantavam"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct verb form to complete each sentence.",
            "items": [
              {
                "q": "Todo verão, minha família ___ para a fazenda dos meus avós.",
                "opts": [
                  "foi",
                  "ia",
                  "irá",
                  "vai"
                ],
                "ans": 1
              },
              {
                "q": "Na semana passada, ele ___ um novo emprego no centro da cidade.",
                "opts": [
                  "encontrava",
                  "encontra",
                  "encontrou",
                  "encontraria"
                ],
                "ans": 2
              },
              {
                "q": "Quando ela era adolescente, ___ muitos livros de aventura.",
                "opts": [
                  "leu",
                  "lerá",
                  "leria",
                  "lia"
                ],
                "ans": 3
              },
              {
                "q": "Nós ___ muito cansados quando o ônibus finalmente chegou.",
                "opts": [
                  "estivemos",
                  "estamos",
                  "estávamos",
                  "estaremos"
                ],
                "ans": 2
              },
              {
                "q": "Enquanto eu estudava, meu irmão ___ a televisão no volume alto.",
                "opts": [
                  "ligava",
                  "ligou",
                  "liga",
                  "ligará"
                ],
                "ans": 1
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese, using the correct past tense in each sentence.",
            "items": [
              {
                "q": "When I was young, I used to play football every Saturday.",
                "ans": "Quando eu era jovem, eu jogava futebol todo sábado."
              },
              {
                "q": "She was reading a book when the phone rang.",
                "ans": "Ela estava lendo um livro quando o telefone tocou."
              },
              {
                "q": "We used to eat at that restaurant all the time, but last month it closed.",
                "ans": "Nós comíamos naquele restaurante o tempo todo, mas no mês passado ele fechou."
              },
              {
                "q": "He suddenly remembered that he forgot his wallet at home.",
                "ans": "De repente, ele lembrou que esqueceu a carteira em casa."
              },
              {
                "q": "The children used to go to school on foot every morning.",
                "ans": "As crianças iam para a escola a pé toda manhã."
              }
            ]
          }
        ],
        "teacherTip": "Help students think of the pretérito imperfeito as the 'background movie screen' (ongoing states and habits) and the pretérito perfeito as the 'action that interrupts it' (a specific completed event). Phrases like 'todo dia,' 'sempre,' and 'enquanto' are strong signals for the imperfeito, while 'ontem,' 'de repente,' and 'naquele momento' typically trigger the perfeito."
      },
      {
        "title": "Conditionals",
        "sub": "Hypothetical situations and consequences",
        "emoji": "🔀",
        "duration": "~60 min",
        "objectives": [
          "Use the conditional tense correctly",
          "Form first, second, and third conditionals",
          "Talk about hypothetical situations naturally"
        ],
        "vocabulary": [
          {
            "pt": "se... então",
            "en": "if... then",
            "ex": "Se estudar, vai passar.",
            "exEn": "If you study, you'll pass."
          },
          {
            "pt": "se eu fosse",
            "en": "if I were",
            "ex": "Se eu fosse rico, viajaria o mundo.",
            "exEn": "If I were rich, I'd travel the world."
          },
          {
            "pt": "teria",
            "en": "I would have (conditional)",
            "ex": "Teria ido, mas estava doente.",
            "exEn": "I would have gone, but I was sick."
          },
          {
            "pt": "pudesse",
            "en": "if I could (subjunctive)",
            "ex": "Se eu pudesse, ficaria mais tempo.",
            "exEn": "If I could, I'd stay longer."
          },
          {
            "pt": "quem dera!",
            "en": "I wish! / if only!",
            "ex": "Quem dera eu falar português perfeito!",
            "exEn": "If only I could speak perfect Portuguese!"
          },
          {
            "pt": "seria",
            "en": "it would be",
            "ex": "Seria incrível viver no Brasil.",
            "exEn": "It would be incredible to live in Brazil."
          }
        ],
        "grammar": {
          "title": "Conditional sentences in Portuguese",
          "explain": "Three types: (1) Real: se + present → future. (2) Hypothetical: se + imperfeito subjuntivo → conditional. (3) Past hypothetical (rare in speech): se + past perfect subjuntivo → conditional perfeito.",
          "structure": "(2) Se + fosse/tivesse/-sse → -ia/-ria",
          "examples": [
            {
              "pt": "Se eu fosse você, estudaria mais.",
              "en": "If I were you, I'd study more."
            },
            {
              "pt": "Se tivesse dinheiro, compraria uma casa.",
              "en": "If I had money, I'd buy a house."
            },
            {
              "pt": "Quem dera poder ficar mais!",
              "en": "If only I could stay longer!"
            }
          ],
          "extendedExamples": [
            {
              "pt": "Se eu tivesse mais tempo, aprenderia outro idioma.",
              "en": "If I had more time, I would learn another language."
            },
            {
              "pt": "Se ela fosse mais cuidadosa, não cometeria tantos erros.",
              "en": "If she were more careful, she would not make so many mistakes."
            },
            {
              "pt": "Se nós soubéssemos o endereço, iríamos à festa.",
              "en": "If we knew the address, we would go to the party."
            },
            {
              "pt": "Se eles pudessem escolher, morariam perto da praia.",
              "en": "If they could choose, they would live near the beach."
            },
            {
              "pt": "Se você fosse rico, o que faria com o dinheiro?",
              "en": "If you were rich, what would you do with the money?"
            }
          ]
        },
        "dialogue": {
          "scene": "Sarah and Marcos daydream about life choices.",
          "lines": [
            {
              "sp": "a",
              "pt": "Se você pudesse morar em qualquer lugar do mundo, onde seria?",
              "en": "If you could live anywhere in the world, where would it be?"
            },
            {
              "sp": "b",
              "pt": "Ah, seria em Lisboa. Perto do Brasil mas na Europa.",
              "en": "Oh, it would be in Lisbon. Close to Brazil but in Europe."
            },
            {
              "sp": "a",
              "pt": "Faz sentido! Se eu não morasse em Dublin, escolheria o Rio.",
              "en": "That makes sense! If I didn't live in Dublin, I'd choose Rio."
            },
            {
              "sp": "b",
              "pt": "Mas e o inverno? O frio te preocuparia?",
              "en": "But what about winter? Would the cold bother you?"
            },
            {
              "sp": "a",
              "pt": "Quem dera ter sol o ano todo! Mas o mar compensaria.",
              "en": "If only there was sun all year! But the sea would make up for it."
            }
          ]
        },
        "exercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the hypothetical conditional.",
            "items": [
              {
                "q": "Se eu ___ (ser) brasileiro, moraria em Salvador.",
                "ans": "fosse"
              },
              {
                "q": "Se ela ___ (ter) tempo, viajaria.",
                "ans": "tivesse"
              },
              {
                "q": "Ele ___ (estudar) mais se pudesse.",
                "ans": "estudaria"
              }
            ]
          }
        ],
        "culture": {
          "title": "Lisboa — Brazil's European home 🇵🇹",
          "text": "Lisbon has become a hub for Brazilian expats — some estimates say over 300,000 Brazilians live in Portugal. The shared language makes the transition easy, though the accents are very different. Brazilians joke that Portuguese sounds \"fancy\" or \"old-fashioned\" to them — like hearing Shakespearean English. Despite this, Brazilian culture has massively influenced Portugal: Brazilian music, soap operas, food, and slang are everywhere in Lisbon today."
        },
        "extraVocab": [
          {
            "pt": "pudesse",
            "en": "could (subjunctive/conditional)",
            "ex": "Se eu pudesse, viajaria para o Brasil.",
            "exEn": "If I could, I would travel to Brazil."
          },
          {
            "pt": "soubesse",
            "en": "knew (subjunctive/conditional)",
            "ex": "Se ela soubesse a resposta, me diria.",
            "exEn": "If she knew the answer, she would tell me."
          },
          {
            "pt": "tivesse",
            "en": "had (subjunctive/conditional)",
            "ex": "Se ele tivesse dinheiro, compraria uma casa.",
            "exEn": "If he had money, he would buy a house."
          },
          {
            "pt": "fosse",
            "en": "were/went (subjunctive/conditional)",
            "ex": "Se eu fosse você, estudaria mais.",
            "exEn": "If I were you, I would study more."
          },
          {
            "pt": "gostaria",
            "en": "would like",
            "ex": "Eu gostaria de morar no exterior se pudesse.",
            "exEn": "I would like to live abroad if I could."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Se eu seria rico, compraria um carro.",
            "correct": "Se eu fosse rico, compraria um carro.",
            "note": "English speakers often use the conditional (-ia/-ria) in the 'if' clause, but in Portuguese the 'se' clause requires the imperfect subjunctive (fosse, tivesse, etc.), not the conditional."
          },
          {
            "wrong": "Se eu teria tempo, te ajudaria.",
            "correct": "Se eu tivesse tempo, te ajudaria.",
            "note": "Never use 'teria' after 'se' in a conditional sentence. The imperfect subjunctive 'tivesse' is required after 'se' in hypothetical conditions."
          },
          {
            "wrong": "Se ela foi mais inteligente, passaria na prova.",
            "correct": "Se ela fosse mais inteligente, passaria na prova.",
            "note": "'Foi' is the simple past indicative, not the subjunctive. Hypothetical conditions require 'fosse' (imperfect subjunctive of 'ser/ir'), not 'foi'."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct imperfect subjunctive or conditional form.",
            "items": [
              {
                "q": "Se eu ___ mais dinheiro, viajaria para a Europa.",
                "ans": "tivesse"
              },
              {
                "q": "Se ela fosse médica, ___ as pessoas de graça.",
                "ans": "ajudaria"
              },
              {
                "q": "Nós ___ mais felizes se morássemos perto da família.",
                "ans": "seríamos"
              },
              {
                "q": "Se você ___ falar português, conseguiria o emprego.",
                "ans": "soubesse"
              },
              {
                "q": "Eles comprariam uma casa maior se ___ possível.",
                "ans": "fosse"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option to complete the conditional sentence.",
            "items": [
              {
                "q": "Se eu ___ você, não faria isso.",
                "opts": [
                  "sou",
                  "fui",
                  "fosse",
                  "serei"
                ],
                "ans": 2
              },
              {
                "q": "Ela viajaria para o Japão se ___ dinheiro suficiente.",
                "opts": [
                  "tem",
                  "teve",
                  "tivesse",
                  "terá"
                ],
                "ans": 2
              },
              {
                "q": "Se nós soubéssemos a verdade, ___ com ele.",
                "opts": [
                  "falamos",
                  "falávamos",
                  "falaríamos",
                  "falaremos"
                ],
                "ans": 2
              },
              {
                "q": "Se eles ___ mais cedo, pegariam o ônibus.",
                "opts": [
                  "saem",
                  "saíram",
                  "saíssem",
                  "sairão"
                ],
                "ans": 2
              },
              {
                "q": "Você ___ mais saudável se fizesse exercícios todo dia.",
                "opts": [
                  "é",
                  "era",
                  "seria",
                  "será"
                ],
                "ans": 2
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese using the pattern Se + fosse/tivesse/-sse → -ia/-ria.",
            "items": [
              {
                "q": "If I were a teacher, I would work at a school.",
                "ans": "Se eu fosse professor, trabalharia em uma escola."
              },
              {
                "q": "If he had a car, he would drive to work.",
                "ans": "Se ele tivesse um carro, iria de carro para o trabalho."
              },
              {
                "q": "If we knew the answer, we would tell you.",
                "ans": "Se nós soubéssemos a resposta, te diríamos."
              },
              {
                "q": "If she could travel, she would go to Paris.",
                "ans": "Se ela pudesse viajar, iria para Paris."
              },
              {
                "q": "If they lived closer, we would see them more often.",
                "ans": "Se eles morassem mais perto, os veríamos com mais frequência."
              }
            ]
          }
        ],
        "teacherTip": "Remind students that in Brazilian Portuguese hypothetical conditionals, the 'se' clause always takes the imperfect subjunctive (fosse, tivesse, pudesse, etc.) — never the conditional form ending in -ia. A simple rule to share: 'Se = subjunctive, then = conditional.'"
      },
      {
        "title": "Passive Voice & Formal Writing",
        "sub": "Understanding and using passive constructions",
        "emoji": "📝",
        "duration": "~60 min",
        "objectives": [
          "Form and use the passive voice",
          "Read formal and journalistic Portuguese",
          "Understand written vs spoken register differences"
        ],
        "vocabulary": [
          {
            "pt": "foi criado/a por",
            "en": "was created by",
            "ex": "O samba foi criado no Rio.",
            "exEn": "Samba was created in Rio."
          },
          {
            "pt": "são vendidos",
            "en": "are sold",
            "ex": "Ingressos são vendidos online.",
            "exEn": "Tickets are sold online."
          },
          {
            "pt": "segundo",
            "en": "according to",
            "ex": "Segundo o jornal, vai chover.",
            "exEn": "According to the newspaper, it will rain."
          },
          {
            "pt": "afirma-se que",
            "en": "it is claimed that",
            "ex": "Afirma-se que a economia vai melhorar.",
            "exEn": "It is claimed the economy will improve."
          },
          {
            "pt": "estima-se que",
            "en": "it is estimated that",
            "ex": "Estima-se que 214 milhões vivem no Brasil.",
            "exEn": "It is estimated that 214 million live in Brazil."
          },
          {
            "pt": "em relação a",
            "en": "regarding / in relation to",
            "ex": "Em relação ao clima, está ótimo.",
            "exEn": "Regarding the weather, it's great."
          }
        ],
        "grammar": {
          "title": "Passive Voice — ser + past participle",
          "explain": "Passive voice: ser (conjugated) + past participle. The participle agrees in gender and number with the subject. Used more in writing than speech — Brazilians prefer active voice in conversation.",
          "structure": "[subject] + ser + [past participle] + por + [agent]",
          "examples": [
            {
              "pt": "O prato foi preparado pelo chef.",
              "en": "The dish was prepared by the chef."
            },
            {
              "pt": "Os ingressos foram vendidos rapidamente.",
              "en": "The tickets were sold quickly."
            },
            {
              "pt": "A lei foi aprovada pelo governo.",
              "en": "The law was approved by the government."
            }
          ],
          "extendedExamples": [
            {
              "pt": "O relatório foi escrito pela analista.",
              "en": "The report was written by the analyst."
            },
            {
              "pt": "A proposta foi aprovada pelo diretor.",
              "en": "The proposal was approved by the director."
            },
            {
              "pt": "Os documentos foram assinados pelo gerente.",
              "en": "The documents were signed by the manager."
            },
            {
              "pt": "A carta foi enviada pela secretária.",
              "en": "The letter was sent by the secretary."
            },
            {
              "pt": "O projeto foi desenvolvido pela equipe técnica.",
              "en": "The project was developed by the technical team."
            }
          ]
        },
        "dialogue": {
          "scene": "Sarah reads a Brazilian news article with Marcos.",
          "lines": [
            {
              "sp": "a",
              "pt": "Este artigo diz que o carnaval foi assistido por dois milhões de pessoas.",
              "en": "This article says the carnival was attended by two million people."
            },
            {
              "sp": "b",
              "pt": "Isso mesmo! É o maior espetáculo da Terra.",
              "en": "That's right! It's the greatest show on Earth."
            },
            {
              "sp": "a",
              "pt": "Aqui diz que foram vendidos quinhentos mil litros de cerveja.",
              "en": "Here it says five hundred thousand litres of beer were sold."
            },
            {
              "sp": "b",
              "pt": "Brasil sendo Brasil! Você já foi ao carnaval?",
              "en": "Brazil being Brazil! Have you ever been to carnival?"
            },
            {
              "sp": "a",
              "pt": "Ainda não, mas está nos meus planos para o próximo ano.",
              "en": "Not yet, but it's in my plans for next year."
            }
          ]
        },
        "exercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Rewrite in the passive voice.",
            "items": [
              {
                "q": "O chef preparou o prato. → O prato ___ ___ pelo chef.",
                "ans": "foi preparado"
              },
              {
                "q": "Eles venderam os ingressos. → Os ingressos ___ ___ rapidamente.",
                "ans": "foram vendidos"
              }
            ]
          }
        ],
        "culture": {
          "title": "Carnaval — the world's biggest party 🎊",
          "text": "Brazilian Carnaval is a 5-day festival before Lent, celebrated differently across the country. Rio's Sambódromo parades are spectacular productions with samba schools competing. Salvador's carnaval is famous for trios elétricos — huge floats with live bands — and is more participatory. Recife has the Frevo, its own unique carnival music and dance. The whole country shuts down. Planning your first carnaval trip? Book hotels at least 6 months ahead."
        },
        "extraVocab": [
          {
            "pt": "aprovado",
            "en": "approved",
            "ex": "O projeto foi aprovado pela diretoria.",
            "exEn": "The project was approved by the board."
          },
          {
            "pt": "publicado",
            "en": "published",
            "ex": "O relatório foi publicado pela empresa.",
            "exEn": "The report was published by the company."
          },
          {
            "pt": "assinado",
            "en": "signed",
            "ex": "O contrato foi assinado pelo gerente.",
            "exEn": "The contract was signed by the manager."
          },
          {
            "pt": "enviado",
            "en": "sent",
            "ex": "O documento foi enviado pelo advogado.",
            "exEn": "The document was sent by the lawyer."
          },
          {
            "pt": "organizado",
            "en": "organized",
            "ex": "O evento foi organizado pela equipe.",
            "exEn": "The event was organized by the team."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "O contrato foi assinar pelo gerente.",
            "correct": "O contrato foi assinado pelo gerente.",
            "note": "English speakers sometimes use the infinitive after 'foi' instead of the past participle. Always use the past participle (e.g., assinado, enviado) to form the passive voice."
          },
          {
            "wrong": "O relatório foi escrito de o analista.",
            "correct": "O relatório foi escrito pelo analista.",
            "note": "The agent in a passive sentence is introduced by 'por', not 'de'. Also remember that 'por + o' contracts to 'pelo' in Brazilian Portuguese."
          },
          {
            "wrong": "Os documentos foram enviada pela equipe.",
            "correct": "Os documentos foram enviados pela equipe.",
            "note": "The past participle must agree in gender and number with the subject. 'Documentos' is masculine plural, so the correct form is 'enviados', not 'enviada'."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct past participle form.",
            "items": [
              {
                "q": "O contrato foi ___ pelo diretor.",
                "ans": "assinado"
              },
              {
                "q": "A carta foi ___ pela secretária.",
                "ans": "escrita"
              },
              {
                "q": "Os relatórios foram ___ pela equipe.",
                "ans": "enviados"
              },
              {
                "q": "A proposta foi ___ pelo gerente.",
                "ans": "aprovada"
              },
              {
                "q": "Os projetos foram ___ pelos engenheiros.",
                "ans": "desenvolvidos"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct form of 'ser' to complete the passive sentence.",
            "items": [
              {
                "q": "O documento ___ assinado pelo advogado.",
                "opts": [
                  "fui",
                  "foi",
                  "fomos",
                  "foram"
                ],
                "ans": 1
              },
              {
                "q": "As cartas ___ enviadas pela diretora.",
                "opts": [
                  "foi",
                  "fui",
                  "foram",
                  "fomos"
                ],
                "ans": 2
              },
              {
                "q": "O relatório ___ escrito pela analista.",
                "opts": [
                  "foram",
                  "fomos",
                  "fui",
                  "foi"
                ],
                "ans": 3
              },
              {
                "q": "Os contratos ___ aprovados pelo gerente.",
                "opts": [
                  "foi",
                  "fui",
                  "fomos",
                  "foram"
                ],
                "ans": 3
              },
              {
                "q": "A proposta ___ organizada pela equipe.",
                "opts": [
                  "foram",
                  "fomos",
                  "foi",
                  "fui"
                ],
                "ans": 2
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese using the passive voice pattern: ser + past participle + por.",
            "items": [
              {
                "q": "The contract was signed by the manager.",
                "ans": "O contrato foi assinado pelo gerente."
              },
              {
                "q": "The report was written by the analyst.",
                "ans": "O relatório foi escrito pela analista."
              },
              {
                "q": "The documents were sent by the secretary.",
                "ans": "Os documentos foram enviados pela secretária."
              },
              {
                "q": "The proposal was approved by the director.",
                "ans": "A proposta foi aprovada pelo diretor."
              },
              {
                "q": "The event was organized by the team.",
                "ans": "O evento foi organizado pela equipe."
              }
            ]
          }
        ],
        "teacherTip": "Remind students that in Brazilian Portuguese passive voice, the past participle must agree in gender and number with the subject — this is a key difference from English, where the past participle never changes. Practicing with formal writing contexts (contracts, reports, proposals) helps students internalize both the grammar and relevant vocabulary simultaneously."
      },
      {
        "title": "Giving Advice & Expressing Obligation",
        "sub": "Modal verbs and expressions of necessity",
        "emoji": "💡",
        "duration": "~55 min",
        "objectives": [
          "Give advice using devia and poderia",
          "Express obligation with ter que and precisar de",
          "Make suggestions politely"
        ],
        "vocabulary": [
          {
            "pt": "deveria",
            "en": "should / ought to",
            "ex": "Você deveria descansar.",
            "exEn": "You should rest."
          },
          {
            "pt": "ter que",
            "en": "to have to / must",
            "ex": "Tenho que trabalhar amanhã.",
            "exEn": "I have to work tomorrow."
          },
          {
            "pt": "precisar de",
            "en": "to need to",
            "ex": "Preciso de ajuda.",
            "exEn": "I need help."
          },
          {
            "pt": "vale a pena",
            "en": "it's worth it",
            "ex": "Vale a pena aprender português.",
            "exEn": "It's worth learning Portuguese."
          },
          {
            "pt": "não adianta",
            "en": "it's no use / pointless",
            "ex": "Não adianta reclamar.",
            "exEn": "It's no use complaining."
          },
          {
            "pt": "que tal + infinitive",
            "en": "how about + verb-ing",
            "ex": "Que tal estudarmos juntos?",
            "exEn": "How about studying together?"
          }
        ],
        "grammar": {
          "title": "Expressing obligation and advice",
          "explain": "Portuguese has a rich system for expressing necessity and advice. Ter que/ter de (must), precisar de (need to), dever (should — more formal), deveria (conditional of dever — softer advice).",
          "structure": "ter que + inf (must) / deveria + inf (should)",
          "examples": [
            {
              "pt": "Você tem que ver isso!",
              "en": "You must see this!"
            },
            {
              "pt": "Você deveria descansar mais.",
              "en": "You should rest more."
            },
            {
              "pt": "Vale a pena tentar.",
              "en": "It's worth trying."
            }
          ],
          "extendedExamples": [
            {
              "pt": "Você tem que estudar mais para passar na prova.",
              "en": "You must study more to pass the test."
            },
            {
              "pt": "Ela deveria falar com o chefe sobre o problema.",
              "en": "She should talk to her boss about the problem."
            },
            {
              "pt": "Nós temos que chegar cedo à reunião amanhã.",
              "en": "We must arrive early to the meeting tomorrow."
            },
            {
              "pt": "Você deveria beber mais água durante o dia.",
              "en": "You should drink more water throughout the day."
            },
            {
              "pt": "Eles têm que terminar o projeto até sexta-feira.",
              "en": "They must finish the project by Friday."
            }
          ]
        },
        "dialogue": {
          "scene": "Marcos gives Sarah advice about learning Portuguese.",
          "lines": [
            {
              "sp": "b",
              "pt": "Sarah, você deveria assistir a séries brasileiras.",
              "en": "Sarah, you should watch Brazilian TV series."
            },
            {
              "sp": "a",
              "pt": "Boa ideia! Tem alguma recomendação?",
              "en": "Good idea! Do you have any recommendations?"
            },
            {
              "sp": "b",
              "pt": "Tem que ver \"Cidade de Deus\" e \"Round 6\" dublado em português.",
              "en": "You must watch \"City of God\" and \"Squid Game\" dubbed in Portuguese."
            },
            {
              "sp": "a",
              "pt": "E preciso fazer aulas também ou só ver séries basta?",
              "en": "And do I need to take classes too or is just watching series enough?"
            },
            {
              "sp": "b",
              "pt": "As duas coisas! Não adianta só uma. Mas vale muito a pena.",
              "en": "Both things! Just one isn't enough. But it's very much worth it."
            }
          ]
        },
        "exercises": [
          {
            "type": "Multiple choice",
            "instruction": "Choose the right expression.",
            "items": [
              {
                "q": "\"You must try the feijoada!\" →",
                "opts": [
                  "Você deveria provar a feijoada.",
                  "Você tem que provar a feijoada.",
                  "Vale a pena provar a feijoada."
                ],
                "ans": 1
              },
              {
                "q": "\"It's worth visiting Salvador\" →",
                "opts": [
                  "Tem que visitar Salvador.",
                  "Vale a pena visitar Salvador.",
                  "Deveria visitar Salvador."
                ],
                "ans": 1
              }
            ]
          }
        ],
        "culture": {
          "title": "Brazilian TV and streaming 📺",
          "text": "Brazilian content on Netflix and Amazon Prime has exploded globally. \"3%\" (sci-fi dystopia), \"Cidade Invisível\" (urban fantasy), \"Dom\" (crime), and \"Irmandade\" (prison drama) are all excellent and available with original Portuguese audio. Brazilian telenovelas are a cultural institution — they're watched by all classes and discuss social issues. Watching with subtitles first, then audio only, is one of the fastest ways to improve listening comprehension."
        },
        "extraVocab": [
          {
            "pt": "o conselho",
            "en": "advice",
            "ex": "Você deveria seguir o conselho do médico.",
            "exEn": "You should follow the doctor's advice."
          },
          {
            "pt": "a obrigação",
            "en": "obligation",
            "ex": "Temos uma obrigação de ajudar os outros.",
            "exEn": "We have an obligation to help others."
          },
          {
            "pt": "o prazo",
            "en": "deadline",
            "ex": "Eu tenho que entregar o relatório antes do prazo.",
            "exEn": "I have to submit the report before the deadline."
          },
          {
            "pt": "descansar",
            "en": "to rest",
            "ex": "Você deveria descansar mais depois do trabalho.",
            "exEn": "You should rest more after work."
          },
          {
            "pt": "evitar",
            "en": "to avoid",
            "ex": "Ele tem que evitar comida gordurosa por causa da saúde.",
            "exEn": "He has to avoid fatty food because of his health."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Eu devo ir ao médico.",
            "correct": "Eu deveria ir ao médico.",
            "note": "English speakers often use 'devo' for soft advice, but 'deveria' (conditional) is the natural Brazilian Portuguese way to say 'I should'. 'Devo' sounds more like a strong moral duty."
          },
          {
            "wrong": "Eu tenho que para estudar.",
            "correct": "Eu tenho que estudar.",
            "note": "Do not insert 'para' between 'ter que' and the infinitive. The structure is simply 'ter que + infinitive' with no preposition in between."
          },
          {
            "wrong": "Você deveria estudando mais.",
            "correct": "Você deveria estudar mais.",
            "note": "After 'deveria', always use the infinitive form of the verb, not the gerund (-ando/-endo). This is a direct transfer error from English 'you should be studying'."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct word or verb form.",
            "items": [
              {
                "q": "Eu tenho que ___ mais cedo amanhã.",
                "ans": "acordar"
              },
              {
                "q": "Você deveria ___ mais frutas e verduras.",
                "ans": "comer"
              },
              {
                "q": "Nós temos que ___ as regras do contrato.",
                "ans": "seguir"
              },
              {
                "q": "Ela deveria ___ com um especialista sobre isso.",
                "ans": "falar"
              },
              {
                "q": "Eles têm que ___ o formulário até hoje.",
                "ans": "entregar"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option to complete the sentence.",
            "items": [
              {
                "q": "Você ___ descansar mais. Está muito cansado.",
                "opts": [
                  "deveria",
                  "deveriam",
                  "deveríamos",
                  "devem"
                ],
                "ans": 0
              },
              {
                "q": "Nós temos que ___ o projeto antes do prazo.",
                "opts": [
                  "terminamos",
                  "terminar",
                  "terminando",
                  "terminei"
                ],
                "ans": 1
              },
              {
                "q": "Ele deveria ___ mais água durante o dia.",
                "opts": [
                  "bebeu",
                  "bebendo",
                  "beber",
                  "bebemos"
                ],
                "ans": 2
              },
              {
                "q": "Eu tenho que ___ ao médico essa semana.",
                "opts": [
                  "indo",
                  "fui",
                  "irei",
                  "ir"
                ],
                "ans": 3
              },
              {
                "q": "Elas ___ que estudar mais para a prova.",
                "opts": [
                  "tem",
                  "tinha",
                  "têm",
                  "tive"
                ],
                "ans": 2
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese.",
            "items": [
              {
                "q": "You should call your mother today.",
                "ans": "Você deveria ligar para a sua mãe hoje."
              },
              {
                "q": "We must finish this work before Friday.",
                "ans": "Nós temos que terminar este trabalho antes de sexta-feira."
              },
              {
                "q": "He should sleep earlier.",
                "ans": "Ele deveria dormir mais cedo."
              },
              {
                "q": "I must pay the bill tomorrow.",
                "ans": "Eu tenho que pagar a conta amanhã."
              },
              {
                "q": "They should talk to the teacher about the problem.",
                "ans": "Eles deveriam falar com o professor sobre o problema."
              }
            ]
          }
        ],
        "teacherTip": "Emphasize that 'deveria' (conditional of 'dever') is the go-to form for soft advice in Brazilian Portuguese, equivalent to 'should', while 'tem que' expresses stronger necessity or obligation. Practicing both in realistic, everyday contexts — such as health, work, and schedules — helps students internalize the difference naturally."
      },
      {
        "title": "Expressing Probability & Uncertainty",
        "sub": "Hedging, doubting, and speculating",
        "emoji": "🤔",
        "duration": "~55 min",
        "objectives": [
          "Express probability and possibility in Portuguese",
          "Use talvez with subjunctive",
          "Sound more natural and nuanced in conversation"
        ],
        "vocabulary": [
          {
            "pt": "talvez",
            "en": "maybe / perhaps",
            "ex": "Talvez eu vá ao Brasil em julho.",
            "exEn": "Maybe I'll go to Brazil in July."
          },
          {
            "pt": "deve ser",
            "en": "it must be / it's probably",
            "ex": "Deve ser tarde já.",
            "exEn": "It must be late already."
          },
          {
            "pt": "provavelmente",
            "en": "probably",
            "ex": "Provavelmente vou me mudar.",
            "exEn": "I'm probably going to move."
          },
          {
            "pt": "por acaso",
            "en": "by any chance / by chance",
            "ex": "Por acaso você viu o meu celular?",
            "exEn": "Have you by any chance seen my phone?"
          },
          {
            "pt": "ao que parece",
            "en": "it seems / apparently",
            "ex": "Ao que parece, vai chover.",
            "exEn": "It seems it's going to rain."
          },
          {
            "pt": "não tenho certeza se",
            "en": "I'm not sure if",
            "ex": "Não tenho certeza se posso ir.",
            "exEn": "I'm not sure if I can go."
          }
        ],
        "grammar": {
          "title": "Talvez + subjunctive",
          "explain": "\"Talvez\" (maybe) is always followed by the subjunctive in standard Portuguese. This trips up intermediate learners — the subjunctive after \"talvez\" is mandatory.",
          "structure": "Talvez + [present subjunctive]",
          "examples": [
            {
              "pt": "Talvez eu vá amanhã.",
              "en": "Maybe I'll go tomorrow."
            },
            {
              "pt": "Talvez ela venha mais tarde.",
              "en": "Maybe she'll come later."
            },
            {
              "pt": "Talvez seja verdade.",
              "en": "Maybe it's true."
            }
          ],
          "extendedExamples": [
            {
              "pt": "Talvez eu viaje para o Brasil no próximo ano.",
              "en": "Maybe I will travel to Brazil next year."
            },
            {
              "pt": "Talvez eles não venham à festa hoje à noite.",
              "en": "Maybe they won't come to the party tonight."
            },
            {
              "pt": "Talvez a gente precise de mais tempo para terminar o projeto.",
              "en": "Maybe we need more time to finish the project."
            },
            {
              "pt": "Talvez ela mude de emprego no próximo mês.",
              "en": "Maybe she will change jobs next month."
            },
            {
              "pt": "Talvez vocês encontrem uma solução melhor para esse problema.",
              "en": "Maybe you all will find a better solution to this problem."
            }
          ]
        },
        "dialogue": {
          "scene": "Sarah and Marcos discuss uncertain plans.",
          "lines": [
            {
              "sp": "a",
              "pt": "Você acha que vai chover no fim de semana?",
              "en": "Do you think it will rain this weekend?"
            },
            {
              "sp": "b",
              "pt": "Ao que parece, sim. Deve ser por causa da frente fria.",
              "en": "It seems so. It's probably because of the cold front."
            },
            {
              "sp": "a",
              "pt": "Que pena. Talvez a gente não consiga ir à praia então.",
              "en": "What a shame. Maybe we won't be able to go to the beach then."
            },
            {
              "sp": "b",
              "pt": "Provavelmente não. Mas talvez tenhamos sorte.",
              "en": "Probably not. But maybe we'll be lucky."
            },
            {
              "sp": "a",
              "pt": "Não tenho certeza se vou esperar. Vou ver como acorda.",
              "en": "I'm not sure I'll wait. I'll see how it wakes up."
            }
          ]
        },
        "exercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete with the correct subjunctive after talvez.",
            "items": [
              {
                "q": "Talvez ela ___ (vir) mais tarde.",
                "ans": "venha"
              },
              {
                "q": "Talvez nós ___ (poder) ajudar.",
                "ans": "possamos"
              },
              {
                "q": "Talvez ___ (ser) tarde demais.",
                "ans": "seja"
              }
            ]
          }
        ],
        "culture": {
          "title": "Weather and Brazilian optimism ☀️",
          "text": "Brazilians have an almost philosophical relationship with uncertainty — captured in the phrase \"vai dar certo\" (it'll work out). This optimism extends to weather, plans, and life in general. \"Deixa que eu resolvo\" (let me sort it out) and \"a gente se vira\" (we'll manage) are national mantras. The concept of \"jeitinho brasileiro\" — finding a creative solution to any problem — is both admired and critiqued as a cultural trait."
        },
        "extraVocab": [
          {
            "pt": "talvez",
            "en": "maybe / perhaps",
            "ex": "Talvez ela venha amanhã.",
            "exEn": "Maybe she will come tomorrow."
          },
          {
            "pt": "provavelmente",
            "en": "probably",
            "ex": "Ele provavelmente está em casa.",
            "exEn": "He is probably at home."
          },
          {
            "pt": "a dúvida",
            "en": "the doubt / uncertainty",
            "ex": "Ainda tenho dúvidas sobre o plano.",
            "exEn": "I still have doubts about the plan."
          },
          {
            "pt": "a possibilidade",
            "en": "the possibility",
            "ex": "Existe uma possibilidade de chuva hoje.",
            "exEn": "There is a possibility of rain today."
          },
          {
            "pt": "incerto",
            "en": "uncertain",
            "ex": "O futuro é incerto para todos nós.",
            "exEn": "The future is uncertain for all of us."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Talvez eu vou ao mercado.",
            "correct": "Talvez eu vá ao mercado.",
            "note": "After 'talvez', you must use the present subjunctive, not the indicative. 'Vou' is indicative; 'vá' is the correct subjunctive form of 'ir'."
          },
          {
            "wrong": "Talvez ele está cansado.",
            "correct": "Talvez ele esteja cansado.",
            "note": "The verb 'estar' must be conjugated in the present subjunctive after 'talvez'. Use 'esteja', not 'está'."
          },
          {
            "wrong": "Talvez eles podem ajudar.",
            "correct": "Talvez eles possam ajudar.",
            "note": "The verb 'poder' must be in the present subjunctive after 'talvez'. 'Podem' is indicative; 'possam' is the correct subjunctive form."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct present subjunctive form of the verb in parentheses.",
            "items": [
              {
                "q": "Talvez ela ___ (vir) ao jantar amanhã.",
                "ans": "venha"
              },
              {
                "q": "Talvez nós ___ (precisar) de um guarda-chuva hoje.",
                "ans": "precisemos"
              },
              {
                "q": "Talvez eles ___ (estar) esperando do lado de fora.",
                "ans": "estejam"
              },
              {
                "q": "Talvez eu ___ (poder) te ajudar com isso.",
                "ans": "possa"
              },
              {
                "q": "Talvez você ___ (ter) razão sobre esse assunto.",
                "ans": "tenha"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct present subjunctive form to complete each sentence with 'talvez'.",
            "items": [
              {
                "q": "Talvez ele ___ um novo apartamento no centro.",
                "opts": [
                  "aluga",
                  "alugue",
                  "alugou",
                  "alugará"
                ],
                "ans": 1
              },
              {
                "q": "Talvez elas ___ mais cedo do que o esperado.",
                "opts": [
                  "chegam",
                  "chegaram",
                  "cheguem",
                  "chegarão"
                ],
                "ans": 2
              },
              {
                "q": "Talvez a Maria ___ um novo emprego este mês.",
                "opts": [
                  "encontra",
                  "encontrou",
                  "encontrará",
                  "encontre"
                ],
                "ans": 3
              },
              {
                "q": "Talvez nós ___ para a praia no fim de semana.",
                "opts": [
                  "vamos",
                  "fomos",
                  "iremos",
                  "vamos"
                ],
                "ans": 2
              },
              {
                "q": "Talvez eu ___ de opinião depois de pensar mais.",
                "opts": [
                  "mudo",
                  "mudei",
                  "mude",
                  "mudarei"
                ],
                "ans": 2
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese using 'talvez' and the present subjunctive.",
            "items": [
              {
                "q": "Maybe he will call me later.",
                "ans": "Talvez ele me ligue mais tarde."
              },
              {
                "q": "Maybe we will have time to visit the museum.",
                "ans": "Talvez a gente tenha tempo para visitar o museu."
              },
              {
                "q": "Maybe they don't know the answer.",
                "ans": "Talvez eles não saibam a resposta."
              },
              {
                "q": "Maybe she needs help with the homework.",
                "ans": "Talvez ela precise de ajuda com a lição de casa."
              },
              {
                "q": "Maybe you will find a better price online.",
                "ans": "Talvez você encontre um preço melhor na internet."
              }
            ]
          }
        ],
        "teacherTip": "Remind students that 'talvez' is unique in Portuguese because it always triggers the subjunctive mood — this is non-negotiable, unlike some other expressions of doubt. A helpful mnemonic: if 'talvez' comes before the verb, the verb must 'change clothes' and put on its subjunctive form."
      },
      {
        "title": "Discourse & Connectors",
        "sub": "Linking ideas for sophisticated speech",
        "emoji": "🔗",
        "duration": "~55 min",
        "objectives": [
          "Use discourse connectors to build complex sentences",
          "Sound more fluent and natural in conversation",
          "Write and speak in a more organised way"
        ],
        "vocabulary": [
          {
            "pt": "além disso",
            "en": "furthermore / besides",
            "ex": "Além disso, é muito barato.",
            "exEn": "Furthermore, it's very cheap."
          },
          {
            "pt": "no entanto",
            "en": "however",
            "ex": "É caro. No entanto, vale a pena.",
            "exEn": "It's expensive. However, it's worth it."
          },
          {
            "pt": "por outro lado",
            "en": "on the other hand",
            "ex": "Por outro lado, tem vantagens.",
            "exEn": "On the other hand, there are advantages."
          },
          {
            "pt": "portanto",
            "en": "therefore",
            "ex": "Estou cansada. Portanto, vou dormir.",
            "exEn": "I'm tired. Therefore, I'll sleep."
          },
          {
            "pt": "apesar de",
            "en": "despite / in spite of",
            "ex": "Apesar da chuva, fui.",
            "exEn": "Despite the rain, I went."
          },
          {
            "pt": "visto que",
            "en": "since / given that",
            "ex": "Visto que é tarde, vou embora.",
            "exEn": "Since it's late, I'm leaving."
          }
        ],
        "grammar": {
          "title": "Advanced connectors for B1+ speech",
          "explain": "Connectors elevate your Portuguese from functional to fluent. They signal your logical thinking and make speech and writing more organised. Many English learners rely on \"e\" (and) and \"mas\" (but) too much.",
          "structure": "Use: além disso / no entanto / portanto / apesar de / visto que",
          "examples": [
            {
              "pt": "O Brasil é grande. Além disso, tem uma diversidade incrível.",
              "en": "Brazil is big. Furthermore, it has incredible diversity."
            },
            {
              "pt": "Apesar de estar cansada, estudei.",
              "en": "Despite being tired, I studied."
            },
            {
              "pt": "Portanto, a resposta é simples.",
              "en": "Therefore, the answer is simple."
            }
          ],
          "extendedExamples": [
            {
              "pt": "Ela trabalha muito; além disso, cuida de dois filhos sozinha.",
              "en": "She works a lot; furthermore, she takes care of two children on her own."
            },
            {
              "pt": "O preço era alto. No entanto, decidimos comprar o apartamento.",
              "en": "The price was high. However, we decided to buy the apartment."
            },
            {
              "pt": "Não dormi bem, portanto estou muito cansado hoje.",
              "en": "I did not sleep well, therefore I am very tired today."
            },
            {
              "pt": "Ele foi à reunião apesar de estar doente.",
              "en": "He went to the meeting despite being sick."
            },
            {
              "pt": "Visto que o museu estava fechado, fomos ao parque em vez disso.",
              "en": "Since the museum was closed, we went to the park instead."
            }
          ]
        },
        "dialogue": {
          "scene": "Sarah gives a structured opinion about living abroad.",
          "lines": [
            {
              "sp": "a",
              "pt": "Morar fora tem muitas vantagens. Em primeiro lugar, você aprende idiomas.",
              "en": "Living abroad has many advantages. First of all, you learn languages."
            },
            {
              "sp": "b",
              "pt": "Concordo. Além disso, você conhece outras culturas.",
              "en": "I agree. Furthermore, you get to know other cultures."
            },
            {
              "sp": "a",
              "pt": "No entanto, apesar das vantagens, a saudade é real.",
              "en": "However, despite the advantages, the homesickness is real."
            },
            {
              "sp": "b",
              "pt": "Exato. Portanto, é uma escolha difícil mas enriquecedora.",
              "en": "Exactly. Therefore, it's a difficult but enriching choice."
            }
          ]
        },
        "exercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete with the correct connector.",
            "items": [
              {
                "q": "It's expensive. ___ (However), it's worth it.",
                "ans": "No entanto"
              },
              {
                "q": "I'm tired. ___ (Therefore), I'm going to sleep.",
                "ans": "Portanto"
              },
              {
                "q": "___ (Despite) the rain, we went to the beach.",
                "ans": "Apesar da"
              }
            ]
          }
        ],
        "culture": {
          "title": "Brazilians abroad — the diaspora 🌍",
          "text": "There are an estimated 3 million Brazilians living outside Brazil, with significant communities in the US, UK, Japan, Portugal, and Ireland. Dublin has a vibrant Brazilian community — Brazilian restaurants, churches, and cultural events are easy to find. Brazilians abroad maintain strong cultural ties through WhatsApp groups, Brazilian food shops, and community celebrations of dates like Carnaval, Festa Junina, and 7 de Setembro (Independence Day). The expat experience deeply shapes Brazilian identity."
        },
        "extraVocab": [
          {
            "pt": "portanto",
            "en": "therefore / so",
            "ex": "Ele estudou muito, portanto passou na prova.",
            "exEn": "He studied a lot, therefore he passed the test."
          },
          {
            "pt": "além disso",
            "en": "furthermore / in addition",
            "ex": "O restaurante é barato. Além disso, a comida é deliciosa.",
            "exEn": "The restaurant is cheap. Furthermore, the food is delicious."
          },
          {
            "pt": "no entanto",
            "en": "however / nevertheless",
            "ex": "Ela gosta de viajar; no entanto, tem medo de avião.",
            "exEn": "She likes to travel; however, she is afraid of planes."
          },
          {
            "pt": "apesar de",
            "en": "despite / in spite of",
            "ex": "Fomos à praia apesar de estar nublado.",
            "exEn": "We went to the beach despite it being cloudy."
          },
          {
            "pt": "visto que",
            "en": "since / given that",
            "ex": "Visto que ele não veio, começamos sem ele.",
            "exEn": "Since he did not come, we started without him."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Apesar de que ele estava cansado, continuou trabalhando.",
            "correct": "Apesar de estar cansado, ele continuou trabalhando.",
            "note": "'Apesar de' must be followed by a noun or infinitive verb, not by 'que' + conjugated verb. Use 'embora' if you want to use a conjugated verb: 'Embora estivesse cansado...'."
          },
          {
            "wrong": "Ela é inteligente. Porém, ela é bonita também.",
            "correct": "Ela é inteligente. Além disso, ela é bonita também.",
            "note": "English speakers often use contrast connectors like 'however' (no entanto / porém) when adding information. Use 'além disso' (furthermore) when the second idea adds to, rather than contrasts with, the first."
          },
          {
            "wrong": "Visto que ele não veio, mas começamos sem ele.",
            "correct": "Visto que ele não veio, começamos sem ele.",
            "note": "'Visto que' already introduces a cause-and-effect relationship, so adding 'mas' (but) creates a contradiction in logic. Drop 'mas' and let the connector do the work."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct connector: além disso, no entanto, portanto, apesar de, or visto que.",
            "items": [
              {
                "q": "Ele não estudou para a prova; ___, tirou uma nota baixa.",
                "ans": "portanto"
              },
              {
                "q": "Gostei do hotel. ___, a localização era perfeita.",
                "ans": "Além disso"
              },
              {
                "q": "O filme era longo. ___, eu assisti até o final.",
                "ans": "No entanto"
              },
              {
                "q": "Fomos ao piquenique ___ estar chovendo um pouco.",
                "ans": "apesar de"
              },
              {
                "q": "___ o trânsito estava ruim, ela chegou atrasada ao trabalho.",
                "ans": "Visto que"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct connector to complete the sentence.",
            "items": [
              {
                "q": "Ele tem muito dinheiro; ___, não é feliz.",
                "opts": [
                  "portanto",
                  "além disso",
                  "no entanto",
                  "visto que"
                ],
                "ans": 2
              },
              {
                "q": "Não temos tempo. ___, não temos dinheiro suficiente.",
                "opts": [
                  "No entanto",
                  "Apesar de",
                  "Visto que",
                  "Além disso"
                ],
                "ans": 3
              },
              {
                "q": "___ ela morou no Brasil por dois anos, fala português muito bem.",
                "opts": [
                  "Apesar de",
                  "No entanto",
                  "Visto que",
                  "Portanto"
                ],
                "ans": 2
              },
              {
                "q": "Estudei bastante, ___ me sinto preparado para o exame.",
                "opts": [
                  "no entanto",
                  "apesar de",
                  "visto que",
                  "portanto"
                ],
                "ans": 3
              },
              {
                "q": "Ele saiu de casa ___ estar com febre.",
                "opts": [
                  "além disso",
                  "apesar de",
                  "portanto",
                  "visto que"
                ],
                "ans": 1
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese using the connector indicated in parentheses.",
            "items": [
              {
                "q": "She is tired. However, she will finish the project. (no entanto)",
                "ans": "Ela está cansada. No entanto, ela vai terminar o projeto."
              },
              {
                "q": "He did not study, therefore he failed the exam. (portanto)",
                "ans": "Ele não estudou, portanto foi reprovado no exame."
              },
              {
                "q": "The hotel is comfortable. Furthermore, it is close to the beach. (além disso)",
                "ans": "O hotel é confortável. Além disso, fica perto da praia."
              },
              {
                "q": "She went to work despite feeling sick. (apesar de)",
                "ans": "Ela foi trabalhar apesar de estar se sentindo mal."
              },
              {
                "q": "Since it was late, we decided to stay home. (visto que)",
                "ans": "Visto que estava tarde, decidimos ficar em casa."
              }
            ]
          }
        ],
        "teacherTip": "Encourage students to notice that 'apesar de' is always followed by a noun or infinitive (never 'que' + conjugated verb), while 'no entanto' and 'além disso' are flexible discourse markers that can start a new sentence — practicing them in short paragraph writing helps students internalize their position and punctuation naturally."
      },
      {
        "title": "Making Complaints & Resolving Problems",
        "sub": "Formal complaint language and problem-solving",
        "emoji": "🛠️",
        "duration": "~55 min",
        "objectives": [
          "Make formal and informal complaints",
          "Request solutions politely but firmly",
          "Navigate bureaucratic and service situations"
        ],
        "vocabulary": [
          {
            "pt": "gostaria de reclamar",
            "en": "I would like to complain",
            "ex": "Gostaria de reclamar sobre o serviço.",
            "exEn": "I would like to complain about the service."
          },
          {
            "pt": "não está funcionando",
            "en": "it's not working",
            "ex": "O ar condicionado não está funcionando.",
            "exEn": "The air conditioning isn't working."
          },
          {
            "pt": "o prazo",
            "en": "the deadline / timeframe",
            "ex": "Qual é o prazo para a resolução?",
            "exEn": "What is the timeframe for resolution?"
          },
          {
            "pt": "entrar em contato",
            "en": "to get in touch / contact",
            "ex": "Por favor, entre em contato conosco.",
            "exEn": "Please get in touch with us."
          },
          {
            "pt": "o responsável",
            "en": "the person in charge",
            "ex": "Posso falar com o responsável?",
            "exEn": "Can I speak to the person in charge?"
          },
          {
            "pt": "providências",
            "en": "measures / steps (to fix something)",
            "ex": "Que providências serão tomadas?",
            "exEn": "What measures will be taken?"
          }
        ],
        "grammar": {
          "title": "Conditional for formal politeness",
          "explain": "Using the conditional tense (-ia endings) makes requests much more polite and formal. \"Quero\" (I want) → \"Gostaria\" (I would like). Essential for customer service, formal emails, and professional contexts.",
          "structure": "gostaria / poderia / deveria + infinitive",
          "examples": [
            {
              "pt": "Gostaria de falar com o gerente.",
              "en": "I would like to speak with the manager."
            },
            {
              "pt": "Poderia verificar minha reserva?",
              "en": "Could you check my reservation?"
            },
            {
              "pt": "Gostaríamos de uma solução.",
              "en": "We would like a solution."
            }
          ],
          "extendedExamples": [
            {
              "pt": "Eu gostaria de falar com o gerente, por favor.",
              "en": "I would like to speak with the manager, please."
            },
            {
              "pt": "O senhor poderia verificar o meu pedido novamente?",
              "en": "Could you check my order again?"
            },
            {
              "pt": "A empresa deveria resolver esse problema com mais rapidez.",
              "en": "The company should resolve this problem more quickly."
            },
            {
              "pt": "Nós gostaríamos de receber uma explicação sobre o atraso.",
              "en": "We would like to receive an explanation about the delay."
            },
            {
              "pt": "Você poderia me enviar o comprovante por e-mail?",
              "en": "Could you send me the receipt by email?"
            }
          ]
        },
        "dialogue": {
          "scene": "Sarah has a problem at her hotel in Brazil.",
          "lines": [
            {
              "sp": "a",
              "pt": "Boa tarde. Gostaria de registrar uma reclamação.",
              "en": "Good afternoon. I would like to register a complaint."
            },
            {
              "sp": "b",
              "pt": "Claro. O que aconteceu?",
              "en": "Of course. What happened?"
            },
            {
              "sp": "a",
              "pt": "O ar condicionado do meu quarto não está funcionando há dois dias.",
              "en": "The air conditioning in my room hasn't been working for two days."
            },
            {
              "sp": "b",
              "pt": "Peço desculpas pelo transtorno. Vou enviar a manutenção imediatamente.",
              "en": "I apologise for the inconvenience. I'll send maintenance immediately."
            },
            {
              "sp": "a",
              "pt": "Agradeço. Mas poderia trocar meu quarto enquanto isso?",
              "en": "Thank you. But could you change my room in the meantime?"
            }
          ]
        },
        "exercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Make these requests more formal using conditional.",
            "items": [
              {
                "q": "Quero falar com o gerente. → ___ falar com o gerente.",
                "ans": "Gostaria de"
              },
              {
                "q": "Pode verificar? → ___ verificar?",
                "ans": "Poderia"
              }
            ]
          }
        ],
        "culture": {
          "title": "Bureaucracy in Brazil — the \"sistema\" 🏛️",
          "text": "Brazil's bureaucracy is notoriously complex — Brazilians call it \"o sistema\" with a mix of affection and exasperation. Opening a bank account, registering a business, or dealing with government services involves extensive documentation. The CPF (tax ID number) is required for almost everything. Brazilians have developed \"jeitinho\" precisely as a response to this bureaucracy — creative ways around the system. Patience and persistence are essential; having a Brazilian friend who knows the system is invaluable."
        },
        "extraVocab": [
          {
            "pt": "reclamação",
            "en": "complaint",
            "ex": "Eu gostaria de registrar uma reclamação.",
            "exEn": "I would like to file a complaint."
          },
          {
            "pt": "reembolso",
            "en": "refund",
            "ex": "O cliente poderia solicitar um reembolso.",
            "exEn": "The customer could request a refund."
          },
          {
            "pt": "atendimento",
            "en": "customer service / service",
            "ex": "O atendimento deveria ser mais rápido.",
            "exEn": "The service should be faster."
          },
          {
            "pt": "prazo",
            "en": "deadline / timeframe",
            "ex": "Vocês poderiam confirmar o prazo de entrega?",
            "exEn": "Could you confirm the delivery timeframe?"
          },
          {
            "pt": "conserto",
            "en": "repair / fix",
            "ex": "O técnico deveria fazer o conserto hoje.",
            "exEn": "The technician should do the repair today."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Eu quero falar com o gerente.",
            "correct": "Eu gostaria de falar com o gerente.",
            "note": "English speakers often use 'querer' directly, which sounds blunt or rude in formal complaint situations. Use 'gostaria de' for polite requests."
          },
          {
            "wrong": "Você poderia de me ajudar?",
            "correct": "Você poderia me ajudar?",
            "note": "English speakers sometimes add 'de' after 'poderia' by analogy with 'gostaria de', but 'poderia' is followed directly by the infinitive without 'de'."
          },
          {
            "wrong": "A empresa deveria resolvendo o problema.",
            "correct": "A empresa deveria resolver o problema.",
            "note": "After 'deveria', 'gostaria', and 'poderia', always use the infinitive (resolver), never the gerund (-ando/-endo form)."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct word.",
            "items": [
              {
                "q": "Eu gostaria ___ falar com o responsável.",
                "ans": "de"
              },
              {
                "q": "O senhor poderia ___ o meu cadastro, por favor?",
                "ans": "verificar"
              },
              {
                "q": "A loja deveria ___ o produto com defeito.",
                "ans": "trocar"
              },
              {
                "q": "Nós gostaríamos de receber o ___.",
                "ans": "reembolso"
              },
              {
                "q": "Você poderia me dar um ___ sobre o conserto?",
                "ans": "prazo"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option.",
            "items": [
              {
                "q": "Eu gostaria de ___ uma reclamação formal.",
                "opts": [
                  "registrando",
                  "registrar",
                  "registrei",
                  "registro"
                ],
                "ans": 1
              },
              {
                "q": "O técnico ___ verificar o equipamento hoje.",
                "opts": [
                  "gostaria",
                  "deveria",
                  "gostaríamos",
                  "deveriam"
                ],
                "ans": 1
              },
              {
                "q": "Você poderia ___ o comprovante de pagamento?",
                "opts": [
                  "enviando",
                  "enviou",
                  "enviar",
                  "enviei"
                ],
                "ans": 2
              },
              {
                "q": "Nós ___ de receber uma resposta mais rápida.",
                "opts": [
                  "poderia",
                  "deveriam",
                  "gostaríamos",
                  "gostaria"
                ],
                "ans": 2
              },
              {
                "q": "O gerente ___ resolver esse problema imediatamente.",
                "opts": [
                  "gostaria",
                  "gostaríamos",
                  "deveriam",
                  "deveria"
                ],
                "ans": 3
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese.",
            "items": [
              {
                "q": "I would like to request a refund.",
                "ans": "Eu gostaria de solicitar um reembolso."
              },
              {
                "q": "Could you check my order, please?",
                "ans": "Você poderia verificar o meu pedido, por favor?"
              },
              {
                "q": "The store should replace the defective product.",
                "ans": "A loja deveria trocar o produto com defeito."
              },
              {
                "q": "We would like to speak with the manager.",
                "ans": "Nós gostaríamos de falar com o gerente."
              },
              {
                "q": "Could you send me the repair timeframe by email?",
                "ans": "Você poderia me enviar o prazo do conserto por e-mail?"
              }
            ]
          }
        ],
        "teacherTip": "Remind students that 'gostaria de', 'poderia', and 'deveria' are the polite equivalents of 'quero', 'pode', and 'deve' — using them transforms a demand into a courteous request, which is essential in formal complaint contexts in Brazilian Portuguese."
      },
      {
        "title": "Narrating Stories",
        "sub": "Storytelling techniques in Portuguese",
        "emoji": "📖",
        "duration": "~60 min",
        "objectives": [
          "Tell engaging stories using varied tenses",
          "Use storytelling connectors and devices",
          "Dramatise events naturally"
        ],
        "vocabulary": [
          {
            "pt": "era uma vez",
            "en": "once upon a time",
            "ex": "Era uma vez um menino de Salvador.",
            "exEn": "Once upon a time there was a boy from Salvador."
          },
          {
            "pt": "de repente",
            "en": "suddenly",
            "ex": "De repente, tudo mudou.",
            "exEn": "Suddenly, everything changed."
          },
          {
            "pt": "foi então que",
            "en": "it was then that",
            "ex": "Foi então que ela decidiu partir.",
            "exEn": "It was then that she decided to leave."
          },
          {
            "pt": "no final",
            "en": "in the end",
            "ex": "No final, tudo deu certo.",
            "exEn": "In the end, everything worked out."
          },
          {
            "pt": "por sorte / por azar",
            "en": "luckily / unluckily",
            "ex": "Por sorte, encontrei meu passaporte.",
            "exEn": "Luckily, I found my passport."
          },
          {
            "pt": "inacreditavelmente",
            "en": "unbelievably",
            "ex": "Inacreditavelmente, chegou a tempo.",
            "exEn": "Unbelievably, he arrived on time."
          }
        ],
        "grammar": {
          "title": "Storytelling: mixing tenses effectively",
          "explain": "Good storytelling in Portuguese mixes tenses: imperfeito (background/description) + perfeito (events) + presente histórico (dramatic effect). The histórico present brings past events into vivid present.",
          "structure": "imperfeito (setting) + perfeito (action) + presente (drama)",
          "examples": [
            {
              "pt": "Era uma noite escura. De repente, alguém bateu à porta.",
              "en": "It was a dark night. Suddenly, someone knocked at the door."
            },
            {
              "pt": "Eu caminhava tranquilamente quando, de repente, começo a chover.",
              "en": "I was walking peacefully when, suddenly, it starts to rain."
            }
          ],
          "extendedExamples": [
            {
              "pt": "Era uma noite escura e fria quando de repente alguém bateu na porta — e agora não sei o que fazer.",
              "en": "It was a dark, cold night when suddenly someone knocked on the door — and now I don't know what to do."
            },
            {
              "pt": "A cidade dormia tranquilamente quando o alarme disparou, e agora todo mundo está em pânico.",
              "en": "The city was sleeping peacefully when the alarm went off, and now everyone is in a panic."
            },
            {
              "pt": "Nós caminhávamos pela praia quando encontramos uma mala perdida, e agora a polícia está aqui.",
              "en": "We were walking along the beach when we found a lost suitcase, and now the police are here."
            },
            {
              "pt": "O restaurante estava cheio e a música tocava baixinho quando ela entrou e todos pararam — é impossível não olhar.",
              "en": "The restaurant was full and the music was playing softly when she walked in and everyone stopped — it's impossible not to stare."
            },
            {
              "pt": "Eu lia o livro no sofá quando meu telefone tocou com uma mensagem estranha, e agora meu coração acelera só de pensar.",
              "en": "I was reading the book on the sofa when my phone rang with a strange message, and now my heart races just thinking about it."
            }
          ]
        },
        "dialogue": {
          "scene": "Marcos tells Sarah the story of how he came to Dublin.",
          "lines": [
            {
              "sp": "b",
              "pt": "Então, como você chegou a Dublin?",
              "en": "So, how did you end up in Dublin?"
            },
            {
              "sp": "a",
              "pt": "É uma história interessante! Era 2019. Eu morava em São Paulo.",
              "en": "It's an interesting story! It was 2019. I was living in São Paulo."
            },
            {
              "sp": "b",
              "pt": "E como foi parar aqui?",
              "en": "And how did you end up here?"
            },
            {
              "sp": "a",
              "pt": "Vi um anúncio de emprego em Dublin. Candidatei sem acreditar muito...",
              "en": "I saw a job ad in Dublin. I applied without believing much..."
            },
            {
              "sp": "b",
              "pt": "E te chamaram!",
              "en": "And they called you!"
            },
            {
              "sp": "a",
              "pt": "Exato! Foi então que minha vida mudou completamente.",
              "en": "Exactly! It was then that my life changed completely."
            }
          ]
        },
        "exercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Choose the right tense for storytelling.",
            "items": [
              {
                "q": "It was a beautiful day (setting). → ___ um dia lindo.",
                "ans": "Era"
              },
              {
                "q": "Suddenly, she arrived (event). → De repente, ela ___.",
                "ans": "chegou"
              },
              {
                "q": "In the end, everything worked out. → No final, tudo ___ certo.",
                "ans": "deu"
              }
            ]
          }
        ],
        "culture": {
          "title": "Brazilian storytelling culture 🗣️",
          "text": "Brazilians are natural storytellers — \"causos\" (folk tales and personal anecdotes) are a beloved tradition, especially in the interior. The \"contador de histórias\" (storyteller) holds a special cultural place. Brazilian literature is extraordinarily rich: Jorge Amado, Clarice Lispector, Guimarães Rosa, and Paulo Coelho have all shaped global literature. The tradition of oral storytelling is especially strong in the northeast, where cordel literature (illustrated ballad booklets) remains a living artform."
        },
        "extraVocab": [
          {
            "pt": "de repente",
            "en": "suddenly",
            "ex": "De repente, ela ouviu um barulho estranho.",
            "exEn": "Suddenly, she heard a strange noise."
          },
          {
            "pt": "enquanto isso",
            "en": "meanwhile",
            "ex": "Enquanto isso, o herói corria pela floresta.",
            "exEn": "Meanwhile, the hero was running through the forest."
          },
          {
            "pt": "naquele momento",
            "en": "at that moment",
            "ex": "Naquele momento, tudo mudou para sempre.",
            "exEn": "At that moment, everything changed forever."
          },
          {
            "pt": "logo depois",
            "en": "shortly after",
            "ex": "Logo depois, ele percebeu o que tinha acontecido.",
            "exEn": "Shortly after, he realized what had happened."
          },
          {
            "pt": "até que",
            "en": "until",
            "ex": "Tudo estava calmo até que a porta se abriu.",
            "exEn": "Everything was calm until the door opened."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Ontem eu estava comia quando ele chegou.",
            "correct": "Ontem eu comia quando ele chegou.",
            "note": "English speakers often translate 'was eating' as 'estava comia', but in Brazilian Portuguese the imperfeito alone ('comia') already expresses an ongoing past action — no auxiliary verb is needed."
          },
          {
            "wrong": "Quando ela entrou, eu lí o livro.",
            "correct": "Quando ela entrou, eu lia o livro.",
            "note": "The background/setting action should use the imperfeito ('lia'), not the perfeito ('lí'). Use the perfeito only for the completed, interrupting action."
          },
          {
            "wrong": "A história é muito dramática agora — eu fui ao mercado e vi algo horrível.",
            "correct": "A história é muito dramática agora — eu estava no mercado quando vi algo horrível.",
            "note": "To create dramatic contrast in storytelling, set the scene with the imperfeito first ('estava'), then deliver the key action with the perfeito ('vi'). Listing two perfeito verbs loses the narrative tension."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct form of the verb in parentheses using the imperfeito, perfeito, or presente as required.",
            "items": [
              {
                "q": "A chuva ___ forte quando o telefone tocou. (cair)",
                "ans": "caía"
              },
              {
                "q": "Nós ___ na sala quando ouvimos um grito. (estar)",
                "ans": "estávamos"
              },
              {
                "q": "De repente, ela ___ a porta e saiu correndo. (abrir)",
                "ans": "abriu"
              },
              {
                "q": "O sol ___ e os pássaros cantavam naquela manhã tranquila. (brilhar)",
                "ans": "brilhava"
              },
              {
                "q": "Agora todo mundo ___ com medo depois do que aconteceu. (ficar)",
                "ans": "fica"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct verb form to complete the sentence.",
            "items": [
              {
                "q": "Eu ___ um livro quando a luz apagou de repente.",
                "opts": [
                  "lia",
                  "li",
                  "lerei",
                  "leio"
                ],
                "ans": 0
              },
              {
                "q": "Eles conversavam na varanda quando o vizinho ___ correndo.",
                "opts": [
                  "chegava",
                  "chegará",
                  "chegou",
                  "chega"
                ],
                "ans": 2
              },
              {
                "q": "Era meia-noite e a rua ___ completamente vazia.",
                "opts": [
                  "estava",
                  "esteve",
                  "estará",
                  "está"
                ],
                "ans": 0
              },
              {
                "q": "De repente, ela ___ que tinha esquecido as chaves.",
                "opts": [
                  "percebia",
                  "percebeu",
                  "percebe",
                  "perceberia"
                ],
                "ans": 1
              },
              {
                "q": "E agora? Ninguém ___ o que fazer com essa situação.",
                "opts": [
                  "sabia",
                  "soube",
                  "saberá",
                  "sabe"
                ],
                "ans": 3
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese, using the pattern: imperfeito (setting) + perfeito (action) + presente (drama).",
            "items": [
              {
                "q": "It was raining and I was waiting at the bus stop when a stranger spoke to me — and now I can't stop thinking about it.",
                "ans": "Estava chovendo e eu esperava no ponto de ônibus quando um estranho me falou — e agora não consigo parar de pensar nisso."
              },
              {
                "q": "The children were playing in the park when they found an old box, and now everyone wants to know what's inside.",
                "ans": "As crianças brincavam no parque quando encontraram uma caixa velha, e agora todo mundo quer saber o que tem dentro."
              },
              {
                "q": "It was a quiet afternoon when my friend called me with terrible news — and now I feel terrible.",
                "ans": "Era uma tarde tranquila quando minha amiga me ligou com uma notícia terrível — e agora eu me sinto péssimo."
              },
              {
                "q": "We were dancing and laughing when suddenly the music stopped, and now the room is silent.",
                "ans": "Nós dançávamos e ríamos quando de repente a música parou, e agora a sala está em silêncio."
              },
              {
                "q": "He was sleeping peacefully when someone knocked on the window, and now he is too scared to move.",
                "ans": "Ele dormia tranquilamente quando alguém bateu na janela, e agora ele está com medo demais para se mover."
              }
            ]
          }
        ],
        "teacherTip": "Encourage students to think of storytelling in three 'layers': the imperfeito paints the background like a movie scene, the perfeito fires the key event like a plot twist, and the presente pulls the listener into the drama as if it's happening right now. Practicing this rhythm with short personal anecdotes helps students internalize the tense-switching naturally."
      },
      {
        "title": "Media & Current Events",
        "sub": "Reading and discussing news and culture",
        "emoji": "📰",
        "duration": "~60 min",
        "objectives": [
          "Read and discuss newspaper articles in Portuguese",
          "Talk about current events and social issues",
          "Use sophisticated vocabulary for analysis"
        ],
        "vocabulary": [
          {
            "pt": "segundo o jornal",
            "en": "according to the newspaper",
            "ex": "Segundo o jornal, haverá eleições.",
            "exEn": "According to the newspaper, there will be elections."
          },
          {
            "pt": "o desafio",
            "en": "the challenge",
            "ex": "O maior desafio é a economia.",
            "exEn": "The biggest challenge is the economy."
          },
          {
            "pt": "a desigualdade",
            "en": "inequality",
            "ex": "A desigualdade é um problema grave.",
            "exEn": "Inequality is a serious problem."
          },
          {
            "pt": "o meio ambiente",
            "en": "the environment",
            "ex": "Precisamos proteger o meio ambiente.",
            "exEn": "We need to protect the environment."
          },
          {
            "pt": "o impacto",
            "en": "the impact",
            "ex": "Qual é o impacto dessa decisão?",
            "exEn": "What is the impact of this decision?"
          },
          {
            "pt": "redes sociais",
            "en": "social media",
            "ex": "As redes sociais mudaram tudo.",
            "exEn": "Social media changed everything."
          }
        ],
        "grammar": {
          "title": "Reported speech in Portuguese",
          "explain": "To report what someone said: present → imperfect. \"Ele diz que...\" (he says that...), \"Ela disse que...\" (she said that...). The tense of the reported clause shifts back one.",
          "structure": "disse que + [verb in imperfect/past]",
          "examples": [
            {
              "pt": "Ela disse que estava cansada.",
              "en": "She said she was tired."
            },
            {
              "pt": "O jornal afirma que a situação é grave.",
              "en": "The newspaper states that the situation is serious."
            },
            {
              "pt": "Eles anunciaram que vão aumentar os preços.",
              "en": "They announced that they are going to raise prices."
            }
          ],
          "extendedExamples": [
            {
              "pt": "O repórter disse que o prefeito havia cancelado a reunião importante.",
              "en": "The reporter said that the mayor had cancelled the important meeting."
            },
            {
              "pt": "A jornalista disse que os manifestantes estavam ocupando a praça central.",
              "en": "The journalist said that the protesters were occupying the central square."
            },
            {
              "pt": "O apresentador disse que o governo ia anunciar novas medidas econômicas.",
              "en": "The presenter said that the government was going to announce new economic measures."
            },
            {
              "pt": "A fonte disse que a empresa tinha demitido mais de duzentos funcionários.",
              "en": "The source said that the company had fired more than two hundred employees."
            },
            {
              "pt": "O locutor disse que a transmissão ao vivo começaria em poucos minutos.",
              "en": "The announcer said that the live broadcast would begin in a few minutes."
            }
          ]
        },
        "dialogue": {
          "scene": "Sarah and Marcos discuss a current issue they read about.",
          "lines": [
            {
              "sp": "a",
              "pt": "Você leu sobre as queimadas na Amazônia?",
              "en": "Did you read about the fires in the Amazon?"
            },
            {
              "sp": "b",
              "pt": "Li sim. É uma situação alarmante.",
              "en": "I did. It's an alarming situation."
            },
            {
              "sp": "a",
              "pt": "Segundo o artigo, foi o pior ano em décadas.",
              "en": "According to the article, it was the worst year in decades."
            },
            {
              "sp": "b",
              "pt": "O impacto no meio ambiente é enorme. E no mundo inteiro.",
              "en": "The impact on the environment is enormous. And worldwide."
            },
            {
              "sp": "a",
              "pt": "Na minha opinião, o Brasil precisa de mais políticas ambientais.",
              "en": "In my opinion, Brazil needs stronger environmental policies."
            },
            {
              "sp": "b",
              "pt": "Concordo. Mas é um desafio político complicado.",
              "en": "I agree. But it's a complicated political challenge."
            }
          ]
        },
        "exercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Report what was said.",
            "items": [
              {
                "q": "She said: \"I am tired.\" → Ela disse que ___ cansada.",
                "ans": "estava"
              },
              {
                "q": "He said: \"I'm going to travel.\" → Ele disse que ___ viajar.",
                "ans": "ia"
              }
            ]
          }
        ],
        "culture": {
          "title": "Amazon — Brazil's global responsibility 🌿",
          "text": "The Amazon rainforest covers 60% of Brazil and generates 20% of the world's freshwater. It's home to 10% of all known species and millions of Indigenous people. Deforestation has been a contentious political issue — peaking under some governments and reducing under others. Brazilians have deeply complex feelings about the Amazon: pride in its majesty, anger at its destruction, and frustration at being lectured by countries that already destroyed their own forests centuries ago."
        },
        "extraVocab": [
          {
            "pt": "manchete",
            "en": "headline",
            "ex": "A manchete do jornal falava sobre as eleições.",
            "exEn": "The newspaper headline was about the elections."
          },
          {
            "pt": "entrevista",
            "en": "interview",
            "ex": "O jornalista fez uma entrevista com o presidente.",
            "exEn": "The journalist conducted an interview with the president."
          },
          {
            "pt": "reportagem",
            "en": "news report / feature story",
            "ex": "A reportagem mostrou os problemas da cidade.",
            "exEn": "The news report showed the city's problems."
          },
          {
            "pt": "fonte",
            "en": "source",
            "ex": "O repórter não revelou a fonte da informação.",
            "exEn": "The reporter did not reveal the source of the information."
          },
          {
            "pt": "transmissão ao vivo",
            "en": "live broadcast",
            "ex": "Assistimos à transmissão ao vivo do discurso.",
            "exEn": "We watched the live broadcast of the speech."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Ele disse que ele é cansado.",
            "correct": "Ele disse que estava cansado.",
            "note": "English speakers often forget to backshift the tense. In reported speech, the present 'é' must shift to the imperfect 'estava' in Portuguese, just as it does in English ('he said he was tired')."
          },
          {
            "wrong": "Ela disse que 'vai viajar amanhã'.",
            "correct": "Ela disse que ia viajar no dia seguinte.",
            "note": "Do not use quotation marks or direct speech after 'disse que'. This is reported speech, so the verb shifts ('vai' becomes 'ia') and time expressions change ('amanhã' becomes 'no dia seguinte')."
          },
          {
            "wrong": "O jornalista disse que as notícias são falsas.",
            "correct": "O jornalista disse que as notícias eram falsas.",
            "note": "Using the present tense 'são' after 'disse que' sounds unnatural in formal reported speech. The imperfect 'eram' is the correct backshifted form for a past statement."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct imperfect or past form of the verb in parentheses.",
            "items": [
              {
                "q": "O repórter disse que o ministro ___ (estar) em viagem.",
                "ans": "estava"
              },
              {
                "q": "A jornalista disse que os preços ___ (subir) muito naquele mês.",
                "ans": "tinham subido"
              },
              {
                "q": "Ele disse que a transmissão ao vivo ___ (começar) às oito horas.",
                "ans": "começava"
              },
              {
                "q": "A fonte disse que o governo ___ (planejar) uma reforma.",
                "ans": "planejava"
              },
              {
                "q": "O apresentador disse que a reportagem ___ (ser) muito importante.",
                "ans": "era"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct verb form to complete the reported speech sentence.",
            "items": [
              {
                "q": "O jornalista disse que a manifestação ___ pacífica.",
                "opts": [
                  "é",
                  "era",
                  "seja",
                  "será"
                ],
                "ans": 1
              },
              {
                "q": "A repórter disse que os políticos ___ a reunião.",
                "opts": [
                  "cancelaram",
                  "cancelam",
                  "cancelarão",
                  "cancelem"
                ],
                "ans": 0
              },
              {
                "q": "Ele disse que a manchete ___ muita atenção do público.",
                "opts": [
                  "atraiu",
                  "atrai",
                  "atraia",
                  "atrairá"
                ],
                "ans": 0
              },
              {
                "q": "A fonte disse que a entrevista ___ no dia seguinte.",
                "opts": [
                  "acontece",
                  "aconteceu",
                  "aconteceria",
                  "aconteça"
                ],
                "ans": 2
              },
              {
                "q": "O locutor disse que as notícias ___ sendo verificadas.",
                "opts": [
                  "estão",
                  "estavam",
                  "estarão",
                  "estejam"
                ],
                "ans": 1
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese using 'disse que' and the correct past or imperfect tense.",
            "items": [
              {
                "q": "The journalist said that the president was traveling abroad.",
                "ans": "O jornalista disse que o presidente estava viajando para o exterior."
              },
              {
                "q": "She said that the news report had shocked many people.",
                "ans": "Ela disse que a reportagem tinha chocado muita gente."
              },
              {
                "q": "The reporter said that the source was reliable.",
                "ans": "O repórter disse que a fonte era confiável."
              },
              {
                "q": "He said that the live broadcast would start at nine o'clock.",
                "ans": "Ele disse que a transmissão ao vivo começaria às nove horas."
              },
              {
                "q": "The presenter said that the headline was misleading.",
                "ans": "A apresentadora disse que a manchete era enganosa."
              }
            ]
          }
        ],
        "teacherTip": "Remind students that 'disse que' triggers a tense backshift in Portuguese, much like in English — the present becomes imperfect ('é' → 'estava') and 'vai' becomes 'ia'. Using the media context is ideal because real headlines and quotes give students authentic practice with this structure."
      },
      {
        "title": "B1 Review & Assessment",
        "sub": "Full B1 competency review",
        "emoji": "🎓",
        "duration": "~70 min",
        "objectives": [
          "Demonstrate B1 competency across all skills",
          "Handle complex conversational situations",
          "Prepare for B2 challenges"
        ],
        "vocabulary": [
          {
            "pt": "cabe ressaltar",
            "en": "it's worth noting",
            "ex": "Cabe ressaltar que o contexto é diferente.",
            "exEn": "It's worth noting that the context is different."
          },
          {
            "pt": "em suma",
            "en": "in summary / in short",
            "ex": "Em suma, foi uma experiência única.",
            "exEn": "In short, it was a unique experience."
          },
          {
            "pt": "de certa forma",
            "en": "in a way / to some extent",
            "ex": "De certa forma, você tem razão.",
            "exEn": "In a way, you're right."
          },
          {
            "pt": "a longo prazo",
            "en": "in the long term",
            "ex": "A longo prazo, vai valer a pena.",
            "exEn": "In the long term, it will be worth it."
          },
          {
            "pt": "cada vez mais",
            "en": "more and more / increasingly",
            "ex": "Estou cada vez mais confiante.",
            "exEn": "I'm becoming more and more confident."
          },
          {
            "pt": "sem dúvida",
            "en": "without a doubt",
            "ex": "Sem dúvida, o português vale a pena.",
            "exEn": "Without a doubt, Portuguese is worth it."
          }
        ],
        "grammar": {
          "title": "B1 Complete Grammar Review",
          "explain": "B1 mastery includes: present and past subjunctive, conditional tense, imperfect vs preterite, passive voice, discourse connectors, reported speech, and advanced question formation.",
          "structure": "All B1 structures working together naturally",
          "examples": [
            {
              "pt": "Embora estivesse cansada, fui mesmo assim.",
              "en": "Although I was tired, I went anyway."
            },
            {
              "pt": "Gostaria que você viesse, se pudesse.",
              "en": "I'd like you to come, if you could."
            },
            {
              "pt": "Ele disse que talvez viesse mais tarde.",
              "en": "He said he might come later."
            }
          ],
          "extendedExamples": [
            {
              "pt": "Quando eu era criança, queria ser médico, mas depois que comecei a estudar línguas, mudei completamente de ideia.",
              "en": "When I was a child, I wanted to be a doctor, but after I started studying languages, I completely changed my mind."
            },
            {
              "pt": "Se você estudar todos os dias, vai conseguir falar português fluentemente em menos de um ano.",
              "en": "If you study every day, you will be able to speak Portuguese fluently in less than a year."
            },
            {
              "pt": "Ela já tinha terminado a lição quando o professor chegou e pediu para todos entregarem os exercícios.",
              "en": "She had already finished the lesson when the teacher arrived and asked everyone to hand in the exercises."
            },
            {
              "pt": "Embora eu esteja cansado, preciso revisar o vocabulário porque a prova é amanhã cedo.",
              "en": "Although I am tired, I need to review the vocabulary because the test is early tomorrow."
            },
            {
              "pt": "Nos últimos meses, tenho aprendido muita gramática nova, o que me ajudou a entender melhor as conversas em português.",
              "en": "In the last few months, I have been learning a lot of new grammar, which helped me understand Portuguese conversations better."
            }
          ]
        },
        "dialogue": {
          "scene": "Sarah has a full B1-level discussion about her language learning journey.",
          "lines": [
            {
              "sp": "b",
              "pt": "Sarah, como você descreveria seu progresso no português?",
              "en": "Sarah, how would you describe your progress in Portuguese?"
            },
            {
              "sp": "a",
              "pt": "Cada vez mais confiante, sem dúvida. No início era muito difícil.",
              "en": "More and more confident, without a doubt. At first it was very difficult."
            },
            {
              "sp": "b",
              "pt": "E o que foi mais difícil? O subjuntivo?",
              "en": "And what was most difficult? The subjunctive?"
            },
            {
              "sp": "a",
              "pt": "O subjuntivo e os dois verbos \"ser\" e \"estar\". Mas agora acho que entendi.",
              "en": "The subjunctive and the two verbs \"ser\" and \"estar\". But now I think I understood."
            },
            {
              "sp": "b",
              "pt": "Em suma, você está indo muito bem! Nível B1 com certeza.",
              "en": "In short, you're doing very well! B1 level for sure."
            }
          ]
        },
        "exercises": [
          {
            "type": "Multiple choice",
            "instruction": "B1 final review.",
            "items": [
              {
                "q": "\"Maybe she comes\" (with talvez) →",
                "opts": [
                  "Talvez ela vem",
                  "Talvez ela venha",
                  "Talvez ela vai vir"
                ],
                "ans": 1
              },
              {
                "q": "\"The book was written by Clarice\" →",
                "opts": [
                  "O livro foi escrito por Clarice",
                  "O livro escreveu Clarice",
                  "Clarice foi escrita o livro"
                ],
                "ans": 0
              },
              {
                "q": "\"If I were rich, I would travel\" →",
                "opts": [
                  "Se eu era rico, viajava",
                  "Se eu fosse rico, viajaria",
                  "Se eu sou rico, viajaria"
                ],
                "ans": 1
              }
            ]
          }
        ],
        "culture": {
          "title": "You've completed B1! 🌟",
          "text": "Completing B1 is a transformational achievement. At this level, you can have real conversations about abstract topics, understand most Brazilian media, read newspapers and books with confidence, and express nuanced opinions. You are no longer a \"learner\" — you're a \"speaker\" of Portuguese. Brazilian friends will no longer simplify their speech for you. You can now consume Brazilian culture in its original form: music, films, literature, podcasts, and comedy. The B2 level will take you to near-native competency in most contexts."
        },
        "extraVocab": [
          {
            "pt": "aprimorar",
            "en": "to improve / to refine",
            "ex": "Preciso aprimorar meu português antes da viagem.",
            "exEn": "I need to improve my Portuguese before the trip."
          },
          {
            "pt": "fluente",
            "en": "fluent",
            "ex": "Ela já é fluente em inglês e está aprendendo francês.",
            "exEn": "She is already fluent in English and is learning French."
          },
          {
            "pt": "revisar",
            "en": "to review / to revise",
            "ex": "Vamos revisar todo o conteúdo antes da prova.",
            "exEn": "Let's review all the content before the test."
          },
          {
            "pt": "a conquista",
            "en": "the achievement / the conquest",
            "ex": "Falar outro idioma é uma conquista incrível.",
            "exEn": "Speaking another language is an incredible achievement."
          },
          {
            "pt": "o progresso",
            "en": "the progress",
            "ex": "Tenho feito muito progresso nas últimas semanas.",
            "exEn": "I have been making a lot of progress in the last few weeks."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Eu estou estudando português desde três anos.",
            "correct": "Eu estudo português há três anos.",
            "note": "English speakers often use 'estar + gerúndio' with 'desde' to mirror 'I have been studying for three years,' but in Brazilian Portuguese, ongoing duration is expressed with the simple present tense + 'há'."
          },
          {
            "wrong": "Se eu terei tempo, vou te ligar.",
            "correct": "Se eu tiver tempo, vou te ligar.",
            "note": "In Portuguese, the future subjunctive ('tiver') is required after 'se' in future real conditionals. English speakers incorrectly apply the future tense ('terei') by translating directly from 'If I will have time.'"
          },
          {
            "wrong": "Ela disse que ela vai vir amanhã.",
            "correct": "Ela disse que vai vir amanhã.",
            "note": "Redundant subject pronouns are grammatically acceptable but sound unnatural in Brazilian Portuguese. The subject is already clear from context, so repeating 'ela' inside the subordinate clause is unnecessary and sounds awkward."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct word.",
            "items": [
              {
                "q": "Eu estudo português ___ dois anos.",
                "ans": "há"
              },
              {
                "q": "Se você ___ mais cedo, poderíamos ter almoçado juntos.",
                "ans": "tivesse chegado"
              },
              {
                "q": "Eles já ___ o relatório antes da reunião começar.",
                "ans": "tinham terminado"
              },
              {
                "q": "Embora ela ___ muito ocupada, sempre arruma tempo para ler.",
                "ans": "esteja"
              },
              {
                "q": "Nas últimas semanas, eu ___ revisado todo o conteúdo do semestre.",
                "ans": "tenho"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option.",
            "items": [
              {
                "q": "Se eu ___ dinheiro suficiente, viajaria pelo mundo inteiro.",
                "opts": [
                  "terei",
                  "tenho",
                  "tivesse",
                  "tive"
                ],
                "ans": 2
              },
              {
                "q": "Quando eu era jovem, ___ jogar futebol todos os fins de semana.",
                "opts": [
                  "costumava",
                  "costumo",
                  "costumei",
                  "costume"
                ],
                "ans": 0
              },
              {
                "q": "Ela ___ estudando português há seis meses quando passou no exame.",
                "opts": [
                  "estava",
                  "está",
                  "esteve",
                  "estará"
                ],
                "ans": 0
              },
              {
                "q": "Para ___ fluente, você precisa praticar todos os dias.",
                "opts": [
                  "ser",
                  "sendo",
                  "seja",
                  "serei"
                ],
                "ans": 0
              },
              {
                "q": "Nós ___ muito progresso desde que começamos o curso.",
                "opts": [
                  "fazíamos",
                  "temos feito",
                  "faremos",
                  "faríamos"
                ],
                "ans": 1
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese.",
            "items": [
              {
                "q": "If she studies harder, she will pass the exam.",
                "ans": "Se ela estudar mais, vai passar na prova."
              },
              {
                "q": "I have been learning Brazilian Portuguese for about a year.",
                "ans": "Eu aprendo português brasileiro há cerca de um ano."
              },
              {
                "q": "Although he was tired, he finished all the exercises.",
                "ans": "Embora ele estivesse cansado, terminou todos os exercícios."
              },
              {
                "q": "They had already left when I arrived at the party.",
                "ans": "Eles já tinham saído quando eu cheguei à festa."
              },
              {
                "q": "She said she would call me later, but she never did.",
                "ans": "Ela disse que me ligaria mais tarde, mas nunca ligou."
              }
            ]
          }
        ],
        "teacherTip": "At the B1 level, students often understand grammar rules in isolation but struggle to combine structures naturally in one sentence. Encourage them to write short paragraphs mixing past, present, and conditional structures so they can see how these patterns work together in real communication."
      }
    ]
  },
  {
    "id": "b2",
    "label": "B2",
    "name": "Upper Intermediate",
    "desc": "Near-fluent expression. Nuanced argumentation, formal registers, complex grammar, and cultural depth.",
    "color": "#f3ecfd",
    "accent": "#6b21a8",
    "bar": "#a855f7",
    "emoji": "🚀",
    "units": [
      {
        "title": "Advanced Subjunctive",
        "sub": "Past subjunctive and complex trigger phrases",
        "emoji": "🧠",
        "duration": "~65 min",
        "objectives": [
          "Use the past and future subjunctive correctly",
          "Navigate complex subordinate clauses",
          "Sound native-like in formal contexts"
        ],
        "vocabulary": [
          {
            "pt": "caso",
            "en": "in case / if (formal)",
            "ex": "Caso haja dúvidas, me avise.",
            "exEn": "In case there are doubts, let me know."
          },
          {
            "pt": "a menos que",
            "en": "unless",
            "ex": "Vou, a menos que chova.",
            "exEn": "I'll go, unless it rains."
          },
          {
            "pt": "conquanto",
            "en": "provided that (formal)",
            "ex": "Farei, conquanto seja possível.",
            "exEn": "I'll do it, provided it's possible."
          },
          {
            "pt": "supondo que",
            "en": "supposing that",
            "ex": "Supondo que ele venha, o que fazemos?",
            "exEn": "Supposing he comes, what do we do?"
          },
          {
            "pt": "desde que",
            "en": "as long as / since (time)",
            "ex": "Pode vir, desde que chegue cedo.",
            "exEn": "You can come, as long as you arrive early."
          },
          {
            "pt": "por mais que",
            "en": "no matter how much",
            "ex": "Por mais que tente, não consigo.",
            "exEn": "No matter how hard I try, I can't."
          }
        ],
        "grammar": {
          "title": "Past Subjunctive and Complex Triggers",
          "explain": "The past subjunctive (imperfeito do subjuntivo) is used after past trigger phrases and in conditional sentences. Formed by taking the 3rd person plural preterite, removing -ram, and adding -sse endings.",
          "structure": "3rd plural preterite → remove -ram → add sse/sse/ssemos/ssem",
          "examples": [
            {
              "pt": "Queria que ele viesse.",
              "en": "I wanted him to come."
            },
            {
              "pt": "A menos que chovesse, iríamos.",
              "en": "Unless it rained, we would go."
            },
            {
              "pt": "Por mais que tentasse, não conseguia.",
              "en": "No matter how hard I tried, I couldn't."
            }
          ],
          "extendedExamples": [
            {
              "pt": "Se eles falassem mais devagar, eu entenderia tudo. (falaram → falasse)",
              "en": "If they spoke more slowly, I would understand everything."
            },
            {
              "pt": "Ela queria que nós fôssemos ao mercado antes das seis. (foram → fôssemos)",
              "en": "She wanted us to go to the market before six."
            },
            {
              "pt": "Era importante que vocês trouxessem os documentos na reunião. (trouxeram → trouxessem)",
              "en": "It was important that you all brought the documents to the meeting."
            },
            {
              "pt": "Se ele pudesse, viajaria para o exterior todo ano. (puderam → pudesse)",
              "en": "If he could, he would travel abroad every year."
            },
            {
              "pt": "Eu precisava que elas vissem o problema antes de tomar uma decisão. (viram → vissem)",
              "en": "I needed them to see the problem before making a decision."
            }
          ]
        },
        "dialogue": {
          "scene": "A formal business discussion between Sarah and a Brazilian colleague.",
          "lines": [
            {
              "sp": "a",
              "pt": "Caso haja alguma alteração no prazo, precisamos ser avisados.",
              "en": "In case there is any change in the deadline, we need to be notified."
            },
            {
              "sp": "b",
              "pt": "Entendido. Garantirei que todos sejam informados imediatamente.",
              "en": "Understood. I'll ensure that everyone is informed immediately."
            },
            {
              "sp": "a",
              "pt": "Desde que a qualidade seja mantida, podemos ser flexíveis.",
              "en": "As long as quality is maintained, we can be flexible."
            },
            {
              "sp": "b",
              "pt": "Perfeito. Por mais que seja desafiador, cumpriremos o prazo.",
              "en": "Perfect. No matter how challenging it is, we'll meet the deadline."
            }
          ]
        },
        "exercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Conjugate in the past subjunctive.",
            "items": [
              {
                "q": "Queria que ele ___ (vir).",
                "ans": "viesse"
              },
              {
                "q": "A menos que ___ (chover), vamos.",
                "ans": "chovesse"
              },
              {
                "q": "Por mais que ___ (tentar), não consigo.",
                "ans": "tentasse"
              }
            ]
          }
        ],
        "culture": {
          "title": "Brazilian business culture 💼",
          "text": "Brazil scores high on the \"relationship index\" — business is personal. First meetings focus on getting to know each other before discussing business. Titles matter: \"Doutor\" is used for anyone with a university degree. Email is formal; WhatsApp is for everything else — even client communications. Hierarchy is respected but informal in tone. \"Feedback\" (the English word) is used directly in Brazilian corporate language, as is \"meeting\", \"workshop\", and many other English business terms."
        },
        "extraVocab": [
          {
            "pt": "subjuntivo",
            "en": "subjunctive",
            "ex": "O subjuntivo passado é usado após expressões de desejo.",
            "exEn": "The past subjunctive is used after expressions of desire."
          },
          {
            "pt": "condicional",
            "en": "conditional",
            "ex": "Se eu tivesse dinheiro, compraria uma casa.",
            "exEn": "If I had money, I would buy a house."
          },
          {
            "pt": "hipótese",
            "en": "hypothesis",
            "ex": "Era uma hipótese de que ela viesse amanhã.",
            "exEn": "It was a hypothesis that she would come tomorrow."
          },
          {
            "pt": "gatilho",
            "en": "trigger",
            "ex": "O gatilho gramatical determina o uso do subjuntivo.",
            "exEn": "The grammatical trigger determines the use of the subjunctive."
          },
          {
            "pt": "irrealidade",
            "en": "unreality / contrary-to-fact",
            "ex": "O imperfeito do subjuntivo expressa irrealidade.",
            "exEn": "The imperfect subjunctive expresses unreality."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Se eu teria mais tempo, estudaria mais.",
            "correct": "Se eu tivesse mais tempo, estudaria mais.",
            "note": "English speakers often use a conditional form after 'se', but Brazilian Portuguese requires the past subjunctive (imperfeito do subjuntivo) in the if-clause, not the conditional tense."
          },
          {
            "wrong": "Ela queria que eu falo mais baixo.",
            "correct": "Ela queria que eu falasse mais baixo.",
            "note": "After expressions of wanting or wishing in the past ('queria que'), the verb in the subordinate clause must be in the past subjunctive, not the present indicative."
          },
          {
            "wrong": "Se eles fossem lá, eles vão aprender muito.",
            "correct": "Se eles fossem lá, eles aprenderiam muito.",
            "note": "When the if-clause uses the past subjunctive (hypothetical/contrary-to-fact), the main clause must use the conditional tense (would), not the simple future or present indicative."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct past subjunctive form of the verb in parentheses.",
            "items": [
              {
                "q": "Se nós ___ (ter) mais tempo, faríamos uma viagem longa.",
                "ans": "tivéssemos"
              },
              {
                "q": "Eles queriam que eu ___ (vir) mais cedo à reunião.",
                "ans": "viesse"
              },
              {
                "q": "Era fundamental que vocês ___ (apresentar) o relatório hoje.",
                "ans": "apresentassem"
              },
              {
                "q": "Se ela ___ (poder), ela aprenderia três idiomas ao mesmo tempo.",
                "ans": "pudesse"
              },
              {
                "q": "O professor pediu que nós ___ (fazer) o exercício em silêncio.",
                "ans": "fizéssemos"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct past subjunctive form to complete the sentence.",
            "items": [
              {
                "q": "Se ele ___ mais cedo, conseguiríamos um bom lugar no restaurante.",
                "opts": [
                  "chegasse",
                  "chega",
                  "chegou",
                  "chegará"
                ],
                "ans": 0
              },
              {
                "q": "Era necessário que elas ___ a proposta antes do prazo.",
                "opts": [
                  "entregam",
                  "entregaram",
                  "entregassem",
                  "entregarão"
                ],
                "ans": 2
              },
              {
                "q": "Eu gostaria que você ___ comigo ao cinema esta noite.",
                "opts": [
                  "vai",
                  "foi",
                  "fosse",
                  "irá"
                ],
                "ans": 2
              },
              {
                "q": "Se nós ___ os documentos, poderíamos assinar o contrato hoje.",
                "opts": [
                  "tivéssemos",
                  "temos",
                  "tivemos",
                  "teremos"
                ],
                "ans": 0
              },
              {
                "q": "O chefe queria que todos os funcionários ___ a nova política.",
                "opts": [
                  "seguem",
                  "seguiram",
                  "seguissem",
                  "seguirão"
                ],
                "ans": 2
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese using the past subjunctive.",
            "items": [
              {
                "q": "If she studied every day, she would pass the exam.",
                "ans": "Se ela estudasse todo dia, passaria na prova."
              },
              {
                "q": "He wanted us to be more careful with the data.",
                "ans": "Ele queria que nós fôssemos mais cuidadosos com os dados."
              },
              {
                "q": "It was important that they arrived on time for the presentation.",
                "ans": "Era importante que eles chegassem na hora para a apresentação."
              },
              {
                "q": "If I could choose, I would live in another country.",
                "ans": "Se eu pudesse escolher, viveria em outro país."
              },
              {
                "q": "She wished her friends would understand the situation.",
                "ans": "Ela queria que os amigos entendessem a situação."
              }
            ]
          }
        ],
        "teacherTip": "Remind students that the past subjunctive stem always comes from the 3rd person plural preterite (eles/elas form): just remove -ram and add -sse, -sse, -ssemos, -ssem. Drilling this single derivation rule with irregular verbs like 'ter' (tiveram → tivesse) and 'vir' (vieram → viesse) early on prevents the most common errors."
      },
      {
        "title": "Nuanced Vocabulary & Register",
        "sub": "Formal, informal, and slang vocabulary",
        "emoji": "🎯",
        "duration": "~60 min",
        "objectives": [
          "Switch between formal and informal registers",
          "Understand Brazilian slang and colloquialisms",
          "Use sophisticated vocabulary appropriately"
        ],
        "vocabulary": [
          {
            "pt": "legal / da hora / maneiro",
            "en": "cool (informal)",
            "ex": "Que legal! / Que da hora!",
            "exEn": "How cool!"
          },
          {
            "pt": "cara",
            "en": "dude / mate (informal)",
            "ex": "Cara, você não vai acreditar.",
            "exEn": "Dude, you won't believe it."
          },
          {
            "pt": "com efeito",
            "en": "indeed / in effect (formal)",
            "ex": "Com efeito, a situação é complexa.",
            "exEn": "Indeed, the situation is complex."
          },
          {
            "pt": "no que tange a",
            "en": "regarding / with regard to (formal)",
            "ex": "No que tange ao orçamento...",
            "exEn": "With regard to the budget..."
          },
          {
            "pt": "saudável",
            "en": "healthy / wholesome",
            "ex": "Uma dieta saudável é essencial.",
            "exEn": "A healthy diet is essential."
          },
          {
            "pt": "surtir efeito",
            "en": "to have an effect / to work",
            "ex": "O remédio surtiu efeito.",
            "exEn": "The medicine worked."
          }
        ],
        "grammar": {
          "title": "Register shifting in Portuguese",
          "explain": "Brazilian Portuguese has a wide register range. Spoken colloquial language differs enormously from written formal language. Key differences: pronoun use (você vs o senhor), contractions, slang, and sentence complexity.",
          "structure": "Formal: o senhor/a senhora / Informal: você / Slang: cê",
          "examples": [
            {
              "pt": "Formal: O senhor poderia me ajudar?",
              "en": "Could you (sir) help me?"
            },
            {
              "pt": "Informal: Você pode me ajudar?",
              "en": "Can you help me?"
            },
            {
              "pt": "Gíria: Cê topa? / Valeu!",
              "en": "You in? / Thanks! (slang)"
            }
          ],
          "extendedExamples": [
            {
              "pt": "Formal: O senhor poderia me informar o horário de funcionamento? | Informal: Você pode me dizer o horário? | Slang: Cê sabe que horas abre?",
              "en": "Formal: Could you inform me of the opening hours? | Informal: Can you tell me the hours? | Slang: You know what time it opens?"
            },
            {
              "pt": "Formal: A senhora deseja mais alguma coisa? | Informal: Você quer mais alguma coisa? | Slang: Cê quer mais alguma coisa?",
              "en": "Formal: Would you like anything else, ma'am? | Informal: Do you want anything else? | Slang: You want anything else?"
            },
            {
              "pt": "Formal: O senhor já tomou uma decisão a respeito? | Informal: Você já decidiu sobre isso? | Slang: Cê já decidiu isso aí?",
              "en": "Formal: Have you already made a decision regarding that? | Informal: Have you decided about this? | Slang: You decided on that yet?"
            },
            {
              "pt": "Formal: A senhora se importaria de aguardar um momento? | Informal: Você pode esperar um pouco? | Slang: Cê consegue esperar um segundo?",
              "en": "Formal: Would you mind waiting for a moment, ma'am? | Informal: Can you wait a bit? | Slang: Can you wait a sec?"
            },
            {
              "pt": "Formal: O senhor tem alguma dúvida que eu possa esclarecer? | Informal: Você tem alguma pergunta? | Slang: Cê tá com dúvida?",
              "en": "Formal: Do you have any question I may clarify for you, sir? | Informal: Do you have any questions? | Slang: You got questions?"
            }
          ]
        },
        "dialogue": {
          "scene": "Sarah navigates a formal meeting and then a chat with a friend.",
          "lines": [
            {
              "sp": "a",
              "pt": "(Formal) No que tange ao projeto, gostaríamos de apresentar uma proposta.",
              "en": "(Formal) With regard to the project, we would like to present a proposal."
            },
            {
              "sp": "b",
              "pt": "(Informal) Cara, que proposta incrível! Mandou bem!",
              "en": "(Informal) Dude, what an incredible proposal! You nailed it!"
            },
            {
              "sp": "a",
              "pt": "(Formal) Com efeito, acredito que surtirá o efeito desejado.",
              "en": "(Formal) Indeed, I believe it will have the desired effect."
            },
            {
              "sp": "b",
              "pt": "(Gíria) É nóis! Vai bombar!",
              "en": "(Slang) That's us! It's going to explode (be a hit)!"
            }
          ]
        },
        "exercises": [
          {
            "type": "Multiple choice",
            "instruction": "Choose the right register for each context.",
            "items": [
              {
                "q": "Formal email opening:",
                "opts": [
                  "Oi cara!",
                  "Prezado Sr. Santos,",
                  "E aí, tudo bem?"
                ],
                "ans": 1
              },
              {
                "q": "Texting a close friend:",
                "opts": [
                  "Gostaríamos de comunicar...",
                  "Ei! Você viu o jogo?",
                  "Com efeito, o evento foi positivo."
                ],
                "ans": 1
              }
            ]
          }
        ],
        "culture": {
          "title": "Brazilian slang — a living language 🗣️",
          "text": "Brazilian Portuguese slang is extraordinarily creative and fast-changing. \"Saudade\" is international; but \"mano\", \"véi\", \"bicho\", \"cara\" are universal greetings between friends. \"Tá bom\" means anything from \"ok\" to \"I give up\". \"Vai dar certo\" (it'll work out) is national optimism condensed into three words. Regional slang varies enormously: Cariocas say \"oxente!\" isn't heard in São Paulo. Learning slang from a genuine Brazilian friend (or Brazilian Netflix) is the fastest path to sounding authentic."
        },
        "extraVocab": [
          {
            "pt": "o registro",
            "en": "register (linguistic level)",
            "ex": "O registro formal é exigido em documentos oficiais.",
            "exEn": "Formal register is required in official documents."
          },
          {
            "pt": "a gíria",
            "en": "slang",
            "ex": "Essa gíria é muito usada entre jovens no Brasil.",
            "exEn": "This slang is widely used among young people in Brazil."
          },
          {
            "pt": "a formalidade",
            "en": "formality",
            "ex": "A formalidade do discurso surpreendeu os convidados.",
            "exEn": "The formality of the speech surprised the guests."
          },
          {
            "pt": "o tratamento",
            "en": "form of address",
            "ex": "O tratamento correto para um juiz é 'Vossa Excelência'.",
            "exEn": "The correct form of address for a judge is 'Your Excellency'."
          },
          {
            "pt": "coloquial",
            "en": "colloquial",
            "ex": "A linguagem coloquial é comum em conversas do dia a dia.",
            "exEn": "Colloquial language is common in everyday conversations."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Você é muito gentil, o senhor.",
            "correct": "O senhor é muito gentil.",
            "note": "English speakers sometimes mix 'você' and 'o senhor' in the same sentence, but in Brazilian Portuguese you must choose one form of address and use it consistently throughout."
          },
          {
            "wrong": "Cê está bem?",
            "correct": "Cê tá bem?",
            "note": "When using slang register with 'cê', Brazilians also reduce 'está' to 'tá'. Using the full verb form 'está' sounds inconsistent and unnatural alongside the slang pronoun 'cê'."
          },
          {
            "wrong": "O senhor pode me ajudar, você?",
            "correct": "O senhor pode me ajudar?",
            "note": "Repeating the subject with a different pronoun at the end is a direct transfer from English ('you'). In Portuguese, the subject pronoun is not restated this way, especially not by switching register mid-sentence."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct form of address (o senhor, você, or cê) based on the register indicated.",
            "items": [
              {
                "q": "[Formal] ___ poderia assinar o documento, por favor?",
                "ans": "O senhor"
              },
              {
                "q": "[Informal] ___ vai à festa amanhã?",
                "ans": "Você"
              },
              {
                "q": "[Slang] ___ viu o jogo ontem à noite?",
                "ans": "Cê"
              },
              {
                "q": "[Formal] ___ já recebeu o contrato enviado por e-mail?",
                "ans": "A senhora"
              },
              {
                "q": "[Informal] ___ entendeu o que eu disse?",
                "ans": "Você"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the option that best fits the register of the sentence.",
            "items": [
              {
                "q": "[Formal] ___ poderia me indicar o caminho para a diretoria?",
                "opts": [
                  "Cê",
                  "Você",
                  "O senhor",
                  "Tu"
                ],
                "ans": 2
              },
              {
                "q": "[Slang] ___ tá sabendo da novidade?",
                "opts": [
                  "A senhora",
                  "O senhor",
                  "Você",
                  "Cê"
                ],
                "ans": 3
              },
              {
                "q": "[Informal] ___ já comeu alguma coisa hoje?",
                "opts": [
                  "Cê",
                  "O senhor",
                  "Você",
                  "A senhora"
                ],
                "ans": 2
              },
              {
                "q": "[Formal] ___ se importaria de repetir a pergunta?",
                "opts": [
                  "Você",
                  "Cê",
                  "A senhora",
                  "Tu"
                ],
                "ans": 2
              },
              {
                "q": "[Slang] ___ foi no show ontem?",
                "opts": [
                  "O senhor",
                  "A senhora",
                  "Você",
                  "Cê"
                ],
                "ans": 3
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese using the register indicated in brackets.",
            "items": [
              {
                "q": "[Formal] Would you like to take a seat, sir?",
                "ans": "O senhor gostaria de tomar assento?"
              },
              {
                "q": "[Informal] Do you want to come with us?",
                "ans": "Você quer vir com a gente?"
              },
              {
                "q": "[Slang] You already know about that, right?",
                "ans": "Cê já sabe disso, né?"
              },
              {
                "q": "[Formal] Could you please review this report, ma'am?",
                "ans": "A senhora poderia revisar este relatório, por favor?"
              },
              {
                "q": "[Informal] Have you ever been to São Paulo?",
                "ans": "Você já foi a São Paulo?"
              }
            ]
          }
        ],
        "teacherTip": "Remind students that in Brazil, 'você' has largely replaced 'tu' in most regions as the default informal pronoun, so mastering the 'o senhor/a senhora' vs. 'você' vs. 'cê' spectrum is more practically useful than focusing on 'tu'. Encourage them to notice register shifts in Brazilian TV shows, films, and podcasts, as context clues (setting, relationship, tone) are the fastest way to internalize when each form is appropriate."
      },
      {
        "title": "Argumentation & Debate",
        "sub": "Building and defending complex arguments",
        "emoji": "⚖️",
        "duration": "~65 min",
        "objectives": [
          "Structure a formal argument in Portuguese",
          "Use counter-argument techniques",
          "Debate complex social and political topics"
        ],
        "vocabulary": [
          {
            "pt": "é inegável que",
            "en": "it's undeniable that",
            "ex": "É inegável que o Brasil mudou.",
            "exEn": "It's undeniable that Brazil has changed."
          },
          {
            "pt": "cabe questionar",
            "en": "it's worth questioning",
            "ex": "Cabe questionar se isso é válido.",
            "exEn": "It's worth questioning whether this is valid."
          },
          {
            "pt": "em contrapartida",
            "en": "on the other hand / in contrast",
            "ex": "Em contrapartida, os dados mostram...",
            "exEn": "In contrast, the data shows..."
          },
          {
            "pt": "à luz de",
            "en": "in light of",
            "ex": "À luz dessas evidências...",
            "exEn": "In light of this evidence..."
          },
          {
            "pt": "não se pode negar",
            "en": "one cannot deny",
            "ex": "Não se pode negar o impacto.",
            "exEn": "One cannot deny the impact."
          },
          {
            "pt": "em última análise",
            "en": "ultimately / in the final analysis",
            "ex": "Em última análise, a decisão é sua.",
            "exEn": "Ultimately, the decision is yours."
          }
        ],
        "grammar": {
          "title": "Impersonal constructions for academic tone",
          "explain": "Formal arguments in Portuguese use impersonal constructions: \"é importante que\" + subjunctive, \"sabe-se que\", \"nota-se que\", \"considera-se\". These create an objective, academic tone.",
          "structure": "sabe-se que / nota-se que / é sabido que + indicative",
          "examples": [
            {
              "pt": "Sabe-se que a desigualdade é um problema estrutural.",
              "en": "It is known that inequality is a structural problem."
            },
            {
              "pt": "Nota-se um aumento na temperatura global.",
              "en": "An increase in global temperature is noted."
            },
            {
              "pt": "Considera-se que o Brasil tem grande potencial.",
              "en": "It is considered that Brazil has great potential."
            }
          ],
          "extendedExamples": [
            {
              "pt": "Sabe-se que o aquecimento global representa uma das maiores ameaças ambientais do século XXI.",
              "en": "It is known that global warming represents one of the greatest environmental threats of the 21st century."
            },
            {
              "pt": "Nota-se que os jovens estão cada vez mais engajados em debates políticos nas redes sociais.",
              "en": "It is noted that young people are increasingly engaged in political debates on social media."
            },
            {
              "pt": "É sabido que a desinformação pode comprometer a qualidade do debate democrático.",
              "en": "It is well known that misinformation can undermine the quality of democratic debate."
            },
            {
              "pt": "Sabe-se que a educação de qualidade é um fator decisivo para o desenvolvimento econômico de um país.",
              "en": "It is known that quality education is a decisive factor in a country's economic development."
            },
            {
              "pt": "Nota-se que, em contextos acadêmicos, o uso de dados concretos fortalece qualquer linha de argumentação.",
              "en": "It is noted that, in academic contexts, the use of concrete data strengthens any line of argumentation."
            }
          ]
        },
        "dialogue": {
          "scene": "Sarah participates in a university seminar debate on education.",
          "lines": [
            {
              "sp": "a",
              "pt": "É inegável que o acesso à educação ainda é desigual no Brasil.",
              "en": "It's undeniable that access to education is still unequal in Brazil."
            },
            {
              "sp": "b",
              "pt": "Concordo. No entanto, cabe questionar se só o investimento resolve.",
              "en": "I agree. However, it's worth questioning whether investment alone solves it."
            },
            {
              "sp": "a",
              "pt": "Em contrapartida, à luz das pesquisas recentes, o ENEM melhorou o acesso.",
              "en": "In contrast, in light of recent research, ENEM has improved access."
            },
            {
              "sp": "b",
              "pt": "Não se pode negar. Mas em última análise, a qualidade também importa.",
              "en": "One cannot deny that. But ultimately, quality matters too."
            }
          ]
        },
        "exercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete with an appropriate academic expression.",
            "items": [
              {
                "q": "___ (It is known that) o Brasil é megadiverso.",
                "ans": "Sabe-se que"
              },
              {
                "q": "Em ___ (in light of) dessas evidências, concluímos...",
                "ans": "à luz"
              },
              {
                "q": "___ (It's undeniable that) o problema é complexo.",
                "ans": "É inegável que"
              }
            ]
          }
        ],
        "culture": {
          "title": "Education in Brazil 🎓",
          "text": "Brazil's education system is one of the most unequal in the world, but has made remarkable progress. The ENEM (university entrance exam) replaced the old vestibular and democratised university access. FIES and ProUni programs give low-income students access to private universities. Brazil's federal universities (USP, UNICAMP, UFRJ) are world-class and free. However, public schools face enormous challenges with quality, infrastructure, and teacher salaries. Education reform is a perennial political battleground."
        },
        "extraVocab": [
          {
            "pt": "o argumento",
            "en": "the argument / the point made",
            "ex": "O argumento apresentado pelo debatedor foi muito convincente.",
            "exEn": "The argument presented by the debater was very convincing."
          },
          {
            "pt": "a evidência",
            "en": "the evidence",
            "ex": "É sabido que a evidência científica deve embasar qualquer debate sério.",
            "exEn": "It is well known that scientific evidence should support any serious debate."
          },
          {
            "pt": "o ponto de vista",
            "en": "the point of view / the perspective",
            "ex": "Nota-se que cada ponto de vista merece ser considerado com cuidado.",
            "exEn": "It is noted that every point of view deserves to be carefully considered."
          },
          {
            "pt": "a controvérsia",
            "en": "the controversy",
            "ex": "Sabe-se que essa controvérsia divide especialistas há décadas.",
            "exEn": "It is known that this controversy has divided experts for decades."
          },
          {
            "pt": "o consenso",
            "en": "the consensus",
            "ex": "É sabido que o consenso acadêmico nem sempre reflete a opinião popular.",
            "exEn": "It is well known that academic consensus does not always reflect popular opinion."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Sabe-se que a economia está mal porque o governo.",
            "correct": "Sabe-se que a economia está em crise devido às políticas do governo.",
            "note": "English speakers often drop or incompletely express the reason clause. In Portuguese, the full subordinate clause must be grammatically complete after 'que'."
          },
          {
            "wrong": "É sabido que as pessoas eles preferem conforto.",
            "correct": "É sabido que as pessoas preferem conforto.",
            "note": "English speakers sometimes add a redundant subject pronoun (like 'eles') after a noun subject, mirroring English emphasis. In Brazilian Portuguese, this is grammatically incorrect and unnecessary."
          },
          {
            "wrong": "Nota-se que o problema seria muito sério.",
            "correct": "Nota-se que o problema é muito sério.",
            "note": "These impersonal constructions require the indicative mood, not the conditional. Using 'seria' (would be) weakens the assertive, academic tone that 'nota-se que' is meant to convey."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct impersonal construction (sabe-se que, nota-se que, or é sabido que).",
            "items": [
              {
                "q": "___ a liberdade de expressão é um direito fundamental em sociedades democráticas.",
                "ans": "É sabido que"
              },
              {
                "q": "___ o número de pessoas sem acesso à água potável ainda é alarmante.",
                "ans": "Nota-se que"
              },
              {
                "q": "___ o debate público melhora quando os participantes respeitam regras de argumentação.",
                "ans": "Sabe-se que"
              },
              {
                "q": "___ a desigualdade social continua sendo um dos maiores desafios do Brasil.",
                "ans": "É sabido que"
              },
              {
                "q": "___ a participação feminina nos espaços de poder tem crescido nos últimos anos.",
                "ans": "Nota-se que"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option to complete the sentence.",
            "items": [
              {
                "q": "Sabe-se que a falta de investimento em educação ___ consequências graves para o país.",
                "opts": [
                  "teria",
                  "traz",
                  "trouxesse",
                  "traria"
                ],
                "ans": 1
              },
              {
                "q": "Nota-se que os debatedores mais eficazes sempre ___ seus argumentos com dados.",
                "opts": [
                  "embasariam",
                  "embasassem",
                  "embasam",
                  "embasarão ter"
                ],
                "ans": 2
              },
              {
                "q": "É sabido que a ___ entre os cidadãos é essencial para o bom funcionamento da democracia.",
                "opts": [
                  "controvérsia",
                  "participação",
                  "omissão",
                  "indiferença"
                ],
                "ans": 1
              },
              {
                "q": "Nota-se que o uso de evidências concretas ___ a credibilidade de qualquer argumento.",
                "opts": [
                  "enfraquecem",
                  "enfraqueça",
                  "fortalece",
                  "fortaleçam"
                ],
                "ans": 2
              },
              {
                "q": "Sabe-se que chegar a um ___ exige diálogo, respeito e boa-fé entre as partes.",
                "opts": [
                  "conflito",
                  "preconceito",
                  "consenso",
                  "equívoco"
                ],
                "ans": 2
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese using sabe-se que, nota-se que, or é sabido que.",
            "items": [
              {
                "q": "It is known that access to quality healthcare is a human right.",
                "ans": "Sabe-se que o acesso à saúde de qualidade é um direito humano."
              },
              {
                "q": "It is noted that corruption undermines citizens' trust in public institutions.",
                "ans": "Nota-se que a corrupção compromete a confiança dos cidadãos nas instituições públicas."
              },
              {
                "q": "It is well known that strong arguments rely on solid evidence, not just opinions.",
                "ans": "É sabido que argumentos sólidos dependem de evidências concretas, não apenas de opiniões."
              },
              {
                "q": "It is noted that social media has changed the way public debates are conducted.",
                "ans": "Nota-se que as redes sociais mudaram a forma como os debates públicos são conduzidos."
              },
              {
                "q": "It is known that economic inequality generates serious social tensions.",
                "ans": "Sabe-se que a desigualdade econômica gera tensões sociais graves."
              }
            ]
          }
        ],
        "teacherTip": "Remind students that 'sabe-se que', 'nota-se que', and 'é sabido que' are impersonal constructions used to present information as widely accepted, lending an objective and academic tone to arguments — always follow them with the indicative mood, never the subjunctive or conditional, since these expressions assert facts rather than express doubt or hypothesis."
      },
      {
        "title": "Literary Portuguese",
        "sub": "Reading and appreciating Brazilian literature",
        "emoji": "📚",
        "duration": "~65 min",
        "objectives": [
          "Read and understand literary Portuguese",
          "Recognise stylistic devices",
          "Discuss literature and culture"
        ],
        "vocabulary": [
          {
            "pt": "a prosa",
            "en": "prose",
            "ex": "A prosa de Clarice é única.",
            "exEn": "Clarice's prose is unique."
          },
          {
            "pt": "o enredo",
            "en": "the plot",
            "ex": "O enredo é surpreendente.",
            "exEn": "The plot is surprising."
          },
          {
            "pt": "o narrador",
            "en": "the narrator",
            "ex": "O narrador é não confiável.",
            "exEn": "The narrator is unreliable."
          },
          {
            "pt": "a metáfora",
            "en": "the metaphor",
            "ex": "Que metáfora poderosa!",
            "exEn": "What a powerful metaphor!"
          },
          {
            "pt": "o conto",
            "en": "the short story",
            "ex": "Leia este conto de Machado.",
            "exEn": "Read this short story by Machado."
          },
          {
            "pt": "a ironia",
            "en": "irony",
            "ex": "A ironia é muito sutil.",
            "exEn": "The irony is very subtle."
          }
        ],
        "grammar": {
          "title": "Literary tenses and structures",
          "explain": "Literature uses the future subjunctive extensively (rare in everyday speech), the pluperfect (tinha/tivera + participle), and literary inversion. Reading literature dramatically improves grammatical intuition.",
          "structure": "Pluperfect: tinha + participle / tivera + participle (literary)",
          "examples": [
            {
              "pt": "Quando ela chegou, ele já tinha saído.",
              "en": "When she arrived, he had already left."
            },
            {
              "pt": "Dissera-lhe que partiria ao amanhecer.",
              "en": "He had told her he would leave at dawn. (literary)"
            },
            {
              "pt": "Jamais o vira tão triste.",
              "en": "Never had she seen him so sad. (literary)"
            }
          ],
          "extendedExamples": [
            {
              "pt": "Quando chegaram à aldeia, perceberam que o incêndio já tinha destruído tudo.",
              "en": "When they arrived at the village, they realized the fire had already destroyed everything."
            },
            {
              "pt": "O cavaleiro tivera lutado bravamente antes de cair no campo de batalha.",
              "en": "The knight had fought bravely before falling on the battlefield."
            },
            {
              "pt": "Ela tinha escrito aquelas cartas anos antes de ele as encontrar na gaveta.",
              "en": "She had written those letters years before he found them in the drawer."
            },
            {
              "pt": "O velho sábio tivera vivido em solidão por toda a sua longa existência.",
              "en": "The old wise man had lived in solitude throughout his long existence."
            },
            {
              "pt": "Ninguém sabia que ela tinha guardado aquele segredo desde a infância.",
              "en": "Nobody knew that she had kept that secret since childhood."
            }
          ]
        },
        "dialogue": {
          "scene": "Sarah and Marcos discuss a Clarice Lispector short story.",
          "lines": [
            {
              "sp": "a",
              "pt": "Li o conto \"A Hora da Estrela\". Que texto denso!",
              "en": "I read the short story \"The Hour of the Star\". What a dense text!"
            },
            {
              "sp": "b",
              "pt": "Clarice é assim. A prosa dela nunca é linear.",
              "en": "Clarice is like that. Her prose is never linear."
            },
            {
              "sp": "a",
              "pt": "O narrador é muito peculiar. Parece que fala direto com o leitor.",
              "en": "The narrator is very peculiar. It seems like he speaks directly to the reader."
            },
            {
              "sp": "b",
              "pt": "Exatamente. É a técnica do fluxo de consciência. Como Joyce.",
              "en": "Exactly. It's the stream of consciousness technique. Like Joyce."
            },
            {
              "sp": "a",
              "pt": "A metáfora da Macabéa como invisível na cidade grande... é poderosa.",
              "en": "The metaphor of Macabéa as invisible in the big city... is powerful."
            }
          ]
        },
        "exercises": [
          {
            "type": "Multiple choice",
            "instruction": "Literary comprehension.",
            "items": [
              {
                "q": "\"Quando ela chegou, ele já tinha saído.\" — What happened first?",
                "opts": [
                  "She arrived first",
                  "He left first",
                  "They left together"
                ],
                "ans": 1
              }
            ]
          }
        ],
        "culture": {
          "title": "Brazilian literature — a world treasure 📖",
          "text": "Brazil produced some of the 20th century's greatest writers. Machado de Assis (Dom Casmurro) is considered Brazil's greatest novelist — his dry irony and unreliable narrators anticipated modernism. Clarice Lispector's stream-of-consciousness prose is like nothing else in world literature. Jorge Amado brought Bahia alive with sensual, political novels. Guimarães Rosa's \"Grande Sertão: Veredas\" reinvented the Portuguese language. Paulo Coelho (The Alchemist) is the most translated living author on Earth."
        },
        "extraVocab": [
          {
            "pt": "narrador",
            "en": "narrator",
            "ex": "O narrador tinha revelado o segredo no início do romance.",
            "exEn": "The narrator had revealed the secret at the beginning of the novel."
          },
          {
            "pt": "manuscrito",
            "en": "manuscript",
            "ex": "O autor tivera o manuscrito em mãos por anos antes de publicá-lo.",
            "exEn": "The author had held the manuscript for years before publishing it."
          },
          {
            "pt": "crepúsculo",
            "en": "twilight / dusk",
            "ex": "O crepúsculo já tivera chegado quando os viajantes pararam.",
            "exEn": "Twilight had already arrived when the travelers stopped."
          },
          {
            "pt": "melancolia",
            "en": "melancholy",
            "ex": "Ela tinha carregado aquela melancolia por toda a vida.",
            "exEn": "She had carried that melancholy throughout her life."
          },
          {
            "pt": "destino",
            "en": "fate / destiny",
            "ex": "O destino tivera sido cruel com aquela família humilde.",
            "exEn": "Fate had been cruel to that humble family."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Ela tinha ido embora antes que eu chegasse, mas eu não sabia isso antes.",
            "correct": "Ela tinha ido embora antes que eu chegasse — use the pluperfect to mark the earlier action clearly.",
            "note": "English speakers often use the simple past for both actions. In Portuguese literary style, the pluperfect (tinha + participle or tivera + participle) must mark the action that happened first."
          },
          {
            "wrong": "Ele tivera chegou cedo.",
            "correct": "Ele tivera chegado cedo.",
            "note": "English speakers sometimes mix the auxiliary with the infinitive or conjugated verb. The literary pluperfect tivera must be followed by the past participle, not the infinitive or a conjugated verb."
          },
          {
            "wrong": "Ele tinha been muito corajoso.",
            "correct": "Ele tinha sido muito corajoso.",
            "note": "English speakers forget that 'been' translates to 'sido' in Portuguese. The past participle of 'ser/estar' is 'sido', not a borrowed English form."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct pluperfect form (tinha or tivera + participle).",
            "items": [
              {
                "q": "Quando o rei morreu, o príncipe já ___ partido para o exílio.",
                "ans": "tinha partido"
              },
              {
                "q": "O poeta tivera ___ aqueles versos em noites de profunda angústia.",
                "ans": "escrito"
              },
              {
                "q": "Eles perceberam que alguém ___ aberto a janela durante a noite.",
                "ans": "tinha aberto"
              },
              {
                "q": "A anciã tivera ___ uma vida repleta de sacrifícios e glórias.",
                "ans": "vivido"
              },
              {
                "q": "Ninguém imaginava que ela ___ guardado a carta por tantos anos.",
                "ans": "tinha guardado"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option to complete the sentence in literary pluperfect.",
            "items": [
              {
                "q": "O explorador ___ atravessado o deserto antes de encontrar a cidade perdida.",
                "opts": [
                  "tinha",
                  "tem",
                  "terá",
                  "teria"
                ],
                "ans": 0
              },
              {
                "q": "Quando a tempestade chegou, os pescadores já ___ voltado ao porto.",
                "opts": [
                  "tiveram",
                  "tivera",
                  "tinham",
                  "teriam"
                ],
                "ans": 2
              },
              {
                "q": "O guerreiro tivera ___ sua espada no altar antes da batalha final.",
                "opts": [
                  "deixar",
                  "deixado",
                  "deixa",
                  "deixando"
                ],
                "ans": 1
              },
              {
                "q": "Ela não sabia que o mensageiro já tinha ___ com a resposta do rei.",
                "opts": [
                  "partir",
                  "partindo",
                  "partido",
                  "partira"
                ],
                "ans": 2
              },
              {
                "q": "Os viajantes tiveram fome porque ___ esquecido as provisões na cabana.",
                "opts": [
                  "tinham",
                  "tiveram",
                  "têm",
                  "terão"
                ],
                "ans": 0
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese using the pluperfect (tinha + participle or tivera + participle).",
            "items": [
              {
                "q": "The old man had lived alone for many years before his granddaughter arrived.",
                "ans": "O velho tinha vivido sozinho por muitos anos antes de sua neta chegar."
              },
              {
                "q": "She had never seen such beauty before that moment.",
                "ans": "Ela nunca tinha visto tanta beleza antes daquele momento."
              },
              {
                "q": "The knight had sworn loyalty to the king long before the war began.",
                "ans": "O cavaleiro tivera jurado lealdade ao rei muito antes de a guerra começar."
              },
              {
                "q": "They realized that someone had stolen the ancient manuscript.",
                "ans": "Eles perceberam que alguém tinha roubado o manuscrito antigo."
              },
              {
                "q": "The narrator had hidden the truth from the reader until the final chapter.",
                "ans": "O narrador tinha escondido a verdade do leitor até o capítulo final."
              }
            ]
          }
        ],
        "teacherTip": "Encourage students to notice the pluperfect in literary texts they read, pointing out that 'tivera + participle' is the synthetic (one-word auxiliary) literary form equivalent to 'tinha + participle', and that both express a past action completed before another past action — the literary form simply adds a formal, elevated tone typical of classic Brazilian literature."
      },
      {
        "title": "Advanced Grammar Refinement",
        "sub": "Eliminating errors and sounding native",
        "emoji": "⚡",
        "duration": "~65 min",
        "objectives": [
          "Eliminate common B2 learner errors",
          "Use clitics and pronoun placement correctly",
          "Master complex agreement rules"
        ],
        "vocabulary": [
          {
            "pt": "outrossim",
            "en": "furthermore (formal)",
            "ex": "Outrossim, cabe ressaltar...",
            "exEn": "Furthermore, it's worth noting..."
          },
          {
            "pt": "nada obstante",
            "en": "nevertheless (formal/legal)",
            "ex": "Nada obstante, a decisão foi tomada.",
            "exEn": "Nevertheless, the decision was made."
          },
          {
            "pt": "em tempo",
            "en": "in time / additionally (correspondence)",
            "ex": "Em tempo: não esqueça de assinar.",
            "exEn": "Additionally: don't forget to sign."
          },
          {
            "pt": "doravante",
            "en": "henceforth (formal)",
            "ex": "Doravante, o prazo será de 30 dias.",
            "exEn": "Henceforth, the deadline will be 30 days."
          },
          {
            "pt": "cujo / cuja",
            "en": "whose / of which",
            "ex": "O livro cujo autor é brasileiro.",
            "exEn": "The book whose author is Brazilian."
          },
          {
            "pt": "o qual / a qual",
            "en": "which (formal relative)",
            "ex": "O projeto o qual apresentamos...",
            "exEn": "The project which we presented..."
          }
        ],
        "grammar": {
          "title": "Relative pronouns and clitic placement",
          "explain": "B2 precision involves: cujo/cuja (whose — never followed by an article), o qual/a qual (formal relative), and mesoclisis (verb + future/conditional + pronoun — only in very formal written Portuguese).",
          "structure": "cujo/cuja + [noun without article] / colocação pronominal",
          "examples": [
            {
              "pt": "O escritor cujo livro venci o prêmio...",
              "en": "The writer whose book won the prize..."
            },
            {
              "pt": "Dar-lhe-ei a resposta amanhã. (formal/literary)",
              "en": "I will give you the answer tomorrow."
            },
            {
              "pt": "O relatório o qual você solicitou...",
              "en": "The report which you requested..."
            }
          ],
          "extendedExamples": [
            {
              "pt": "O cientista cujo trabalho revolucionou a medicina recebeu o prêmio Nobel.",
              "en": "The scientist whose work revolutionized medicine received the Nobel Prize."
            },
            {
              "pt": "Essa é a empresa cuja reputação foi construída ao longo de décadas.",
              "en": "This is the company whose reputation was built over decades."
            },
            {
              "pt": "Não me lembro do nome do autor cujo livro li no semestre passado.",
              "en": "I don't remember the name of the author whose book I read last semester."
            },
            {
              "pt": "A candidata cujas propostas agradaram ao público venceu a eleição.",
              "en": "The candidate whose proposals pleased the public won the election."
            },
            {
              "pt": "Ele me contou tudo sobre o projeto cujos resultados surpreenderam a equipe.",
              "en": "He told me everything about the project whose results surprised the team."
            }
          ]
        },
        "dialogue": {
          "scene": "Sarah writes a formal business report with help from Marcos.",
          "lines": [
            {
              "sp": "a",
              "pt": "Como eu diria \"the project whose deadline is Friday\"?",
              "en": "How would I say \"the project whose deadline is Friday\"?"
            },
            {
              "sp": "b",
              "pt": "\"O projeto cujo prazo é sexta-feira.\" Nunca use cujo seguido de artigo!",
              "en": "\"O projeto cujo prazo é sexta-feira.\" Never use cujo followed by an article!"
            },
            {
              "sp": "a",
              "pt": "E \"the report which I submitted\"?",
              "en": "And \"the report which I submitted\"?"
            },
            {
              "sp": "b",
              "pt": "\"O relatório o qual enviei\" — formal. Ou simplesmente \"que\" no informal.",
              "en": "\"O relatório o qual enviei\" — formal. Or simply \"que\" in informal."
            }
          ]
        },
        "exercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete with cujo/cuja.",
            "items": [
              {
                "q": "The company ___ president is Brazilian...",
                "ans": "cuja"
              },
              {
                "q": "O livro ___ autor ganhou o Nobel...",
                "ans": "cujo"
              }
            ]
          }
        ],
        "culture": {
          "title": "Formal Portuguese in practice 📋",
          "text": "Written formal Portuguese in Brazil — in legal documents, official correspondence, and academic writing — can sound completely different from everyday speech. The \"culta formal\" register has features that Brazilians themselves rarely use in speech. Brazilian legal Portuguese draws heavily from older European Portuguese and can be near-incomprehensible to everyday speakers. This creates a fascinating sociolinguistic divide — native speakers often need translation of their own country's official documents."
        },
        "extraVocab": [
          {
            "pt": "pronome relativo",
            "en": "relative pronoun",
            "ex": "O pronome relativo 'cujo' concorda com o substantivo que o segue.",
            "exEn": "The relative pronoun 'cujo' agrees with the noun that follows it."
          },
          {
            "pt": "colocação pronominal",
            "en": "clitic placement",
            "ex": "A colocação pronominal varia entre o português europeu e o brasileiro.",
            "exEn": "Clitic placement varies between European and Brazilian Portuguese."
          },
          {
            "pt": "ênclise",
            "en": "enclisis (clitic after verb)",
            "ex": "Falou-se muito sobre o assunto na reunião.",
            "exEn": "There was much talk about the subject at the meeting."
          },
          {
            "pt": "próclise",
            "en": "proclisis (clitic before verb)",
            "ex": "Não me disseram nada sobre a decisão.",
            "exEn": "They didn't tell me anything about the decision."
          },
          {
            "pt": "antecedente",
            "en": "antecedent (grammar)",
            "ex": "O antecedente do pronome relativo deve estar claro na frase.",
            "exEn": "The antecedent of the relative pronoun must be clear in the sentence."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "O aluno cujo o pai é médico se saiu bem.",
            "correct": "O aluno cujo pai é médico se saiu bem.",
            "note": "'Cujo' already functions as a determiner, so no article should appear between 'cujo/cuja' and the following noun — never say 'cujo o' or 'cuja a'."
          },
          {
            "wrong": "Me liga quando chegar em casa.",
            "correct": "Liga para mim quando chegar em casa.",
            "note": "In Brazilian Portuguese, starting a sentence with an unstressed pronoun (próclise at the very beginning) sounds unnatural in informal speech; restructure the sentence to avoid it."
          },
          {
            "wrong": "A mulher que seu marido é famoso mora aqui.",
            "correct": "A mulher cujo marido é famoso mora aqui.",
            "note": "English speakers often use 'que' + possessive pronoun to express 'whose'; in Portuguese you must use 'cujo/cuja' agreeing with the noun that follows, not with the antecedent."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct form of 'cujo/cuja/cujos/cujas'.",
            "items": [
              {
                "q": "O médico ___ pesquisa foi publicada na revista é muito respeitado.",
                "ans": "cuja"
              },
              {
                "q": "Visitei a cidade ___ história fascina turistas do mundo inteiro.",
                "ans": "cuja"
              },
              {
                "q": "Ela trabalha para uma ONG ___ projetos ajudam comunidades carentes.",
                "ans": "cujos"
              },
              {
                "q": "O escritor ___ romance venceu o prêmio mora em São Paulo.",
                "ans": "cujo"
              },
              {
                "q": "Essas são as alunas ___ notas foram as mais altas da turma.",
                "ans": "cujas"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the sentence with correct clitic placement in Brazilian Portuguese.",
            "items": [
              {
                "q": "Qual frase usa a colocação pronominal correta no português brasileiro?",
                "opts": [
                  "Me disseram que a reunião foi cancelada.",
                  "Disseram-me que a reunião foi cancelada.",
                  "Disseram me que a reunião foi cancelada.",
                  "Me-disseram que a reunião foi cancelada."
                ],
                "ans": 0
              },
              {
                "q": "O autor ___ romance estreou na lista dos mais vendidos assinou meu exemplar.",
                "opts": [
                  "que",
                  "quem",
                  "cujo",
                  "o qual"
                ],
                "ans": 2
              },
              {
                "q": "Escolha a opção correta para completar: 'Não ___ falei sobre isso ainda.'",
                "opts": [
                  "lhe",
                  "lhe-",
                  "-lhe",
                  "lhe's"
                ],
                "ans": 0
              },
              {
                "q": "A empresa ___ sede fica em Brasília expandiu suas operações.",
                "opts": [
                  "cujo",
                  "cujas",
                  "cuja",
                  "cujos"
                ],
                "ans": 2
              },
              {
                "q": "Qual opção completa corretamente: 'Eles ___ contaram tudo depois da reunião.'",
                "opts": [
                  "nos",
                  "nós",
                  "no",
                  "n'"
                ],
                "ans": 0
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese, paying attention to 'cujo/cuja' and clitic placement.",
            "items": [
              {
                "q": "The professor whose classes I attended every week taught me a lot.",
                "ans": "O professor cujas aulas eu frequentava toda semana me ensinou muito."
              },
              {
                "q": "They told me that the project had been approved.",
                "ans": "Me disseram que o projeto tinha sido aprovado."
              },
              {
                "q": "She is the architect whose buildings are famous across the country.",
                "ans": "Ela é a arquiteta cujos prédios são famosos em todo o país."
              },
              {
                "q": "I don't remember the name of the film whose ending surprised me.",
                "ans": "Não me lembro do nome do filme cujo final me surpreendeu."
              },
              {
                "q": "He called me to explain what had happened at the meeting.",
                "ans": "Ele me ligou para explicar o que tinha acontecido na reunião."
              }
            ]
          }
        ],
        "teacherTip": "Remind students that 'cujo/cuja/cujos/cujas' agrees in gender and number with the noun it precedes — not with the antecedent — and that an article must never appear between 'cujo' and that noun. For clitic placement, emphasize that Brazilian Portuguese strongly favors próclise (pronoun before the verb) in everyday speech, especially after negatives, conjunctions, and in informal contexts."
      },
      {
        "title": "Brazilian Music & Culture",
        "sub": "Deep cultural immersion through music",
        "emoji": "🎶",
        "duration": "~55 min",
        "objectives": [
          "Understand Brazilian musical genres in depth",
          "Analyse song lyrics for language learning",
          "Discuss music and culture fluently"
        ],
        "vocabulary": [
          {
            "pt": "o ritmo",
            "en": "the rhythm",
            "ex": "O ritmo do samba é contagioso.",
            "exEn": "The rhythm of samba is contagious."
          },
          {
            "pt": "a letra",
            "en": "the lyrics",
            "ex": "A letra dessa música é poética.",
            "exEn": "The lyrics of this song are poetic."
          },
          {
            "pt": "o improviso",
            "en": "improvisation",
            "ex": "O jazz e o samba são baseados no improviso.",
            "exEn": "Jazz and samba are based on improvisation."
          },
          {
            "pt": "a influência",
            "en": "the influence",
            "ex": "A influência africana é fundamental.",
            "exEn": "The African influence is fundamental."
          },
          {
            "pt": "consagrado/a",
            "en": "acclaimed / celebrated",
            "ex": "Tom Jobim é um músico consagrado.",
            "exEn": "Tom Jobim is an acclaimed musician."
          },
          {
            "pt": "abordar",
            "en": "to address / deal with (a topic)",
            "ex": "A música aborda temas sociais.",
            "exEn": "The song addresses social themes."
          }
        ],
        "grammar": {
          "title": "Present participle and gerunds for cultural commentary",
          "explain": "For music and culture commentary, the gerund (gerúndio) and present participle are used extensively: \"a letra abordando temas sociais\" (the lyrics addressing social themes). This adds elegance to cultural analysis.",
          "structure": "verb + -ndo (gerund) used as adjective/adverb",
          "examples": [
            {
              "pt": "Uma obra abordando a realidade brasileira.",
              "en": "A work addressing Brazilian reality."
            },
            {
              "pt": "Misturando ritmos africanos e europeus, o samba nasceu.",
              "en": "Mixing African and European rhythms, samba was born."
            },
            {
              "pt": "Sendo o maior festival do mundo, o carnaval atrai milhões.",
              "en": "Being the world's largest festival, carnival attracts millions."
            }
          ],
          "extendedExamples": [
            {
              "pt": "Os músicos entraram no palco tocando com uma energia incrível.",
              "en": "The musicians came onto the stage playing with incredible energy."
            },
            {
              "pt": "Ela passou a noite inteira dançando ao som do forró.",
              "en": "She spent the entire night dancing to the sound of forró."
            },
            {
              "pt": "O percussionista ficou improvisando enquanto o público batia palmas.",
              "en": "The percussionist kept improvising while the audience clapped."
            },
            {
              "pt": "Cantando em uníssono, os foliões tomaram conta das ruas no carnaval.",
              "en": "Singing in unison, the revelers took over the streets at carnival."
            },
            {
              "pt": "O DJ foi mixando os ritmos do funk carioca com a música eletrônica.",
              "en": "The DJ kept mixing the rhythms of funk carioca with electronic music."
            }
          ]
        },
        "dialogue": {
          "scene": "Sarah and Marcos discuss Brazilian music history.",
          "lines": [
            {
              "sp": "a",
              "pt": "O que diferencia a bossa nova do samba tradicional?",
              "en": "What differentiates bossa nova from traditional samba?"
            },
            {
              "sp": "b",
              "pt": "A bossa nova é o samba misturado com jazz americano. Tom Jobim e João Gilberto transformaram tudo.",
              "en": "Bossa nova is samba mixed with American jazz. Tom Jobim and João Gilberto transformed everything."
            },
            {
              "sp": "a",
              "pt": "A Garota de Ipanema deve ser a canção brasileira mais conhecida do mundo.",
              "en": "\"The Girl from Ipanema\" must be the most well-known Brazilian song in the world."
            },
            {
              "sp": "b",
              "pt": "Sem dúvida. E a letra aborda temas simples — uma garota caminhando na praia — mas com uma profundidade incrível.",
              "en": "Without a doubt. And the lyrics address simple themes — a girl walking on the beach — but with incredible depth."
            }
          ]
        },
        "exercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete using the gerund.",
            "items": [
              {
                "q": "___ (Mixing) jazz com samba, surgiu a bossa nova.",
                "ans": "Misturando"
              },
              {
                "q": "A música ___ (addressing) a realidade social...",
                "ans": "abordando"
              }
            ]
          }
        ],
        "culture": {
          "title": "Brazilian music — a global force 🎸",
          "text": "No country of similar size has influenced global music as much as Brazil. Samba and bossa nova are internationally beloved. Tropicália (1960s) blended rock, samba, and protest. Baile funk is now heard in global clubs. Pagode and axé music dominate domestic radio. Brazilian music's secret: its African rhythmic foundation (brought by enslaved people) created polyrhythms that feel both complex and natural. Every Brazilian learns to samba — it's not taught formally; it's absorbed from birth."
        },
        "extraVocab": [
          {
            "pt": "o ritmo",
            "en": "rhythm",
            "ex": "O ritmo do samba é contagiante.",
            "exEn": "The rhythm of samba is contagious."
          },
          {
            "pt": "a batida",
            "en": "beat / drumbeat",
            "ex": "A batida do batuque ecoa pela rua.",
            "exEn": "The drumbeat echoes through the street."
          },
          {
            "pt": "o improviso",
            "en": "improvisation",
            "ex": "O improviso é essencial no choro brasileiro.",
            "exEn": "Improvisation is essential in Brazilian choro music."
          },
          {
            "pt": "a malandragem",
            "en": "cunning / street-smartness (cultural concept)",
            "ex": "A malandragem aparece muito nas letras do samba.",
            "exEn": "Street-smartness appears a lot in samba lyrics."
          },
          {
            "pt": "o refrão",
            "en": "chorus / refrain",
            "ex": "Todo mundo cantou o refrão junto.",
            "exEn": "Everyone sang the chorus together."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Eu estou dance no carnaval.",
            "correct": "Eu estou dançando no carnaval.",
            "note": "English speakers often forget to apply the -ndo ending and use the infinitive or English base form instead. In Brazilian Portuguese, the gerund always ends in -ndo."
          },
          {
            "wrong": "Ela é cantando muito bem.",
            "correct": "Ela está cantando muito bem.",
            "note": "The gerund used to describe an ongoing action requires 'estar', not 'ser'. 'Ser' is used for permanent characteristics, not ongoing actions or states."
          },
          {
            "wrong": "Tocando o violão é muito relaxante para mim praticar.",
            "correct": "Tocar o violão é muito relaxante para mim.",
            "note": "When the gerund functions as the subject of a sentence (like English '-ing' nouns), Brazilian Portuguese more naturally uses the infinitive in formal and semi-formal contexts."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct gerund (-ndo) form of the verb in parentheses.",
            "items": [
              {
                "q": "Os músicos estão ___ (tocar) no festival de jazz.",
                "ans": "tocando"
              },
              {
                "q": "Ela passou horas ___ (ensaiar) a coreografia do axé.",
                "ans": "ensaiando"
              },
              {
                "q": "O sambista ficou ___ (improvisar) na quadra da escola.",
                "ans": "improvisando"
              },
              {
                "q": "Estamos ___ (aprender) sobre a história do baião.",
                "ans": "aprendendo"
              },
              {
                "q": "O público continuou ___ (cantar) mesmo depois do show.",
                "ans": "cantando"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct gerund form to complete each sentence.",
            "items": [
              {
                "q": "Os foliões estavam ___ pelas ruas do Rio durante o carnaval.",
                "opts": [
                  "dançar",
                  "dançado",
                  "dançando",
                  "dançam"
                ],
                "ans": 2
              },
              {
                "q": "O cantor ficou ___ letras novas durante o intervalo.",
                "opts": [
                  "escrever",
                  "escrevendo",
                  "escrevido",
                  "escreve"
                ],
                "ans": 1
              },
              {
                "q": "Ela foi ___ o ritmo com as mãos enquanto ouvia o samba.",
                "opts": [
                  "marcando",
                  "marcar",
                  "marcado",
                  "marca"
                ],
                "ans": 0
              },
              {
                "q": "Os percussionistas continuaram ___ até o amanhecer.",
                "opts": [
                  "tocar",
                  "tocado",
                  "tocam",
                  "tocando"
                ],
                "ans": 3
              },
              {
                "q": "___ juntos, os músicos criaram um arranjo único de bossa nova.",
                "opts": [
                  "Improvisado",
                  "Improvisar",
                  "Improvisando",
                  "Improvisam"
                ],
                "ans": 2
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese, using the gerund (-ndo) form where appropriate.",
            "items": [
              {
                "q": "The children were dancing in the street during the carnival parade.",
                "ans": "As crianças estavam dançando na rua durante o desfile de carnaval."
              },
              {
                "q": "Singing together, the choir created a powerful atmosphere.",
                "ans": "Cantando juntos, o coral criou uma atmosfera poderosa."
              },
              {
                "q": "He spent the afternoon learning the chords of a new bossa nova song.",
                "ans": "Ele passou a tarde aprendendo os acordes de uma nova música de bossa nova."
              },
              {
                "q": "The band kept playing even when it started raining.",
                "ans": "A banda ficou tocando mesmo quando começou a chover."
              },
              {
                "q": "By mixing different rhythms, the DJ created a unique sound.",
                "ans": "Misturando ritmos diferentes, o DJ criou um som único."
              }
            ]
          }
        ],
        "teacherTip": "Remind students that in Brazilian Portuguese, the gerund (-ndo) is used far more frequently in everyday speech than in European Portuguese — Brazilians say 'estou comendo' where Europeans say 'estou a comer'. Use authentic Brazilian music videos as listening material so students can hear gerunds in natural, cultural contexts, which reinforces both grammar and cultural immersion simultaneously."
      },
      {
        "title": "Advanced Reading Comprehension",
        "sub": "Complex texts and critical analysis",
        "emoji": "🔬",
        "duration": "~65 min",
        "objectives": [
          "Read and critically analyse complex texts",
          "Identify author stance and implicit meaning",
          "Respond with sophisticated commentary"
        ],
        "vocabulary": [
          {
            "pt": "implícito",
            "en": "implicit",
            "ex": "O significado implícito é óbvio.",
            "exEn": "The implicit meaning is obvious."
          },
          {
            "pt": "subjacente",
            "en": "underlying",
            "ex": "A questão subjacente é política.",
            "exEn": "The underlying issue is political."
          },
          {
            "pt": "o viés",
            "en": "bias",
            "ex": "O artigo tem um viés ideológico.",
            "exEn": "The article has an ideological bias."
          },
          {
            "pt": "inferir",
            "en": "to infer",
            "ex": "Podemos inferir que...",
            "exEn": "We can infer that..."
          },
          {
            "pt": "corroborar",
            "en": "to corroborate",
            "ex": "Os dados corroboram a tese.",
            "exEn": "The data corroborates the thesis."
          },
          {
            "pt": "refutar",
            "en": "to refute",
            "ex": "É difícil refutar esse argumento.",
            "exEn": "It's hard to refute this argument."
          }
        ],
        "grammar": {
          "title": "Nominalization — making text more sophisticated",
          "explain": "Nominalisation turns verbs and adjectives into nouns, making writing more formal and dense: \"desenvolver\" → \"o desenvolvimento\", \"crescer\" → \"o crescimento\". Essential for B2+ academic writing.",
          "structure": "verb + -mento/-ção/-ção or adj + -dade/-eza",
          "examples": [
            {
              "pt": "O desenvolvimento econômico acelerou.",
              "en": "Economic development accelerated."
            },
            {
              "pt": "A complexidade do problema é evidente.",
              "en": "The complexity of the problem is evident."
            },
            {
              "pt": "O crescimento da desigualdade preocupa.",
              "en": "The growth of inequality is worrying."
            }
          ],
          "extendedExamples": [
            {
              "pt": "O desenvolvimento das ideias ao longo do texto revela a profundidade do pensamento do autor.",
              "en": "The development of ideas throughout the text reveals the depth of the author's thinking."
            },
            {
              "pt": "A complexidade do argumento exige uma leitura cuidadosa e atenta por parte do leitor.",
              "en": "The complexity of the argument requires careful and attentive reading on the part of the reader."
            },
            {
              "pt": "A clareza na organização dos parágrafos facilita a compreensão do texto como um todo.",
              "en": "The clarity in the organization of paragraphs makes it easier to understand the text as a whole."
            },
            {
              "pt": "O reconhecimento dos recursos retóricos usados pelo autor é fundamental para uma análise crítica.",
              "en": "The recognition of the rhetorical devices used by the author is fundamental for a critical analysis."
            },
            {
              "pt": "A sutileza com que o escritor apresenta suas conclusões demonstra grande habilidade narrativa.",
              "en": "The subtlety with which the writer presents his conclusions demonstrates great narrative skill."
            }
          ]
        },
        "dialogue": {
          "scene": "Sarah analyses a Brazilian news opinion piece.",
          "lines": [
            {
              "sp": "a",
              "pt": "Neste artigo, o autor afirma que a desigualdade é estrutural. Mas inferir isso dos dados requer cautela.",
              "en": "In this article, the author states that inequality is structural. But inferring this from the data requires caution."
            },
            {
              "sp": "b",
              "pt": "Você percebe o viés ideológico na escolha das estatísticas?",
              "en": "Do you notice the ideological bias in the choice of statistics?"
            },
            {
              "sp": "a",
              "pt": "Sim. O argumento subjacente é que o Estado precisa intervir mais.",
              "en": "Yes. The underlying argument is that the State needs to intervene more."
            },
            {
              "sp": "b",
              "pt": "Exatamente. E os dados do IBGE corroboram parcialmente essa tese.",
              "en": "Exactly. And the IBGE data partially corroborates this thesis."
            }
          ]
        },
        "exercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Nominalise these verbs.",
            "items": [
              {
                "q": "desenvolver → o ___",
                "ans": "desenvolvimento"
              },
              {
                "q": "crescer → o ___",
                "ans": "crescimento"
              },
              {
                "q": "complexo → a ___",
                "ans": "complexidade"
              }
            ]
          }
        ],
        "culture": {
          "title": "Brazilian media landscape 📡",
          "text": "Brazil has one of the world's largest media ecosystems. Rede Globo is the world's fourth-largest commercial TV network and has immense cultural and political influence — its telenovelas (soap operas) reach 100 million viewers nightly and have historically shaped public opinion. Folha de S.Paulo and O Globo are leading newspapers. Brazilian journalism has faced enormous political pressure and polarisation in recent years. Independent digital journalism — Agência Pública, The Intercept Brasil, Piauí magazine — has become increasingly important."
        },
        "extraVocab": [
          {
            "pt": "o argumento",
            "en": "argument / line of reasoning",
            "ex": "O argumento central do texto é bem desenvolvido.",
            "exEn": "The central argument of the text is well developed."
          },
          {
            "pt": "a abordagem",
            "en": "approach / treatment (of a topic)",
            "ex": "A abordagem do autor sobre o tema é bastante inovadora.",
            "exEn": "The author's approach to the topic is quite innovative."
          },
          {
            "pt": "a inferência",
            "en": "inference",
            "ex": "O leitor precisa fazer inferências para entender o subtexto.",
            "exEn": "The reader needs to make inferences to understand the subtext."
          },
          {
            "pt": "o pressuposto",
            "en": "assumption / presupposition",
            "ex": "O texto parte do pressuposto de que o leitor já conhece o contexto histórico.",
            "exEn": "The text assumes the reader is already familiar with the historical context."
          },
          {
            "pt": "a coerência",
            "en": "coherence / logical consistency",
            "ex": "A coerência dos argumentos é essencial para um texto bem estruturado.",
            "exEn": "The coherence of the arguments is essential for a well-structured text."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "O texto tem muito complexidade.",
            "correct": "O texto tem muita complexidade.",
            "note": "'Complexidade' is feminine, so the quantifier must agree: 'muita', not 'muito'."
          },
          {
            "wrong": "O desenvolvimiento do personagem é interessante.",
            "correct": "O desenvolvimento do personagem é interessante.",
            "note": "English speakers often misspell this nominalization due to Spanish influence; the correct Portuguese form is 'desenvolvimento', not 'desenvolvimiento'."
          },
          {
            "wrong": "Existe uma grande profundidade nos argumentos do autor.",
            "correct": "Há uma grande profundidade nos argumentos do autor.",
            "note": "While 'existe' can technically work here, 'há' is the more natural and idiomatic choice in Brazilian Portuguese when expressing existence in formal written contexts."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct nominalized form of the word in parentheses.",
            "items": [
              {
                "q": "O ___ (desenvolver) da trama surpreende o leitor no final do conto.",
                "ans": "desenvolvimento"
              },
              {
                "q": "A ___ (simples) da linguagem não diminui a força das ideias apresentadas.",
                "ans": "simplicidade"
              },
              {
                "q": "O ___ (reconhecer) do problema social é o primeiro passo para a mudança.",
                "ans": "reconhecimento"
              },
              {
                "q": "A ___ (claro) com que o autor escreve torna o texto acessível a todos.",
                "ans": "clareza"
              },
              {
                "q": "A ___ (argumentar) do ensaio é baseada em evidências históricas sólidas.",
                "ans": "argumentação"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct nominalization to complete each sentence.",
            "items": [
              {
                "q": "A ___ dos personagens é o elemento mais fascinante do romance.",
                "opts": [
                  "complexidade",
                  "complexar",
                  "complexo",
                  "complexação"
                ],
                "ans": 0
              },
              {
                "q": "O ___ do texto revela a intenção crítica do autor em relação à sociedade.",
                "opts": [
                  "estruturamento",
                  "estruturação",
                  "estruturar",
                  "estrutureza"
                ],
                "ans": 1
              },
              {
                "q": "A ___ das metáforas ao longo do poema cria um efeito emocional poderoso.",
                "opts": [
                  "repetição",
                  "repetimento",
                  "repeter",
                  "repetidade"
                ],
                "ans": 0
              },
              {
                "q": "O ___ do leitor é fundamental para interpretar corretamente as entrelinhas do texto.",
                "opts": [
                  "envolvimento",
                  "envolver",
                  "envolvidez",
                  "envolução"
                ],
                "ans": 0
              },
              {
                "q": "A ___ com que o narrador descreve os detalhes indica um estilo altamente literário.",
                "opts": [
                  "preciseza",
                  "preciso",
                  "precisidade",
                  "precisão"
                ],
                "ans": 3
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese, using a nominalization (ending in -mento, -ção, -dade, or -eza) in your answer.",
            "items": [
              {
                "q": "The complexity of the narrative makes the text difficult to analyze.",
                "ans": "A complexidade da narrativa torna o texto difícil de analisar."
              },
              {
                "q": "The development of the argument is clear and well-structured.",
                "ans": "O desenvolvimento do argumento é claro e bem estruturado."
              },
              {
                "q": "The clarity of the author's writing facilitates comprehension.",
                "ans": "A clareza da escrita do autor facilita a compreensão."
              },
              {
                "q": "The recognition of rhetorical patterns is essential for advanced readers.",
                "ans": "O reconhecimento de padrões retóricos é essencial para leitores avançados."
              },
              {
                "q": "The subtlety of the language reflects the maturity of the writer.",
                "ans": "A sutileza da linguagem reflete a maturidade do escritor."
              }
            ]
          }
        ],
        "teacherTip": "Encourage students to actively replace verb phrases with nominalizations when paraphrasing academic texts — for example, transforming 'o autor argumenta que' into 'a argumentação do autor sugere que'. This single habit dramatically raises the register and sophistication of their written Portuguese at B2 level and beyond."
      },
      {
        "title": "B2 Consolidation",
        "sub": "Pulling everything together",
        "emoji": "🏆",
        "duration": "~70 min",
        "objectives": [
          "Demonstrate B2 level across all four skills",
          "Handle any conversation topic with confidence",
          "Prepare for C1 sophistication"
        ],
        "vocabulary": [
          {
            "pt": "malgrado",
            "en": "despite (literary)",
            "ex": "Malgrado os obstáculos, conseguiu.",
            "exEn": "Despite the obstacles, he managed."
          },
          {
            "pt": "não raro",
            "en": "not infrequently / often",
            "ex": "Não raro, as soluções são simples.",
            "exEn": "Not infrequently, solutions are simple."
          },
          {
            "pt": "à medida que",
            "en": "as / to the extent that",
            "ex": "À medida que estudava, melhorava.",
            "exEn": "As she studied, she improved."
          },
          {
            "pt": "tampouco",
            "en": "neither / nor (formal)",
            "ex": "Não concordo, tampouco discordo.",
            "exEn": "I neither agree, nor disagree."
          },
          {
            "pt": "haja vista",
            "en": "given / in view of",
            "ex": "Haja vista a situação...",
            "exEn": "Given the situation..."
          },
          {
            "pt": "eis que",
            "en": "then suddenly / herein (literary)",
            "ex": "Eis que chegou a notícia.",
            "exEn": "Then the news arrived."
          }
        ],
        "grammar": {
          "title": "B2 Complete Mastery Review",
          "explain": "B2 command means: all subjunctive forms, full conditional system, passive voice, relative pronouns, nominalisation, clitic placement, and register switching — all deployed naturally without conscious thought.",
          "structure": "All B2 structures deployed automatically in context",
          "examples": [
            {
              "pt": "Malgrado os desafios, prosseguimos.",
              "en": "Despite the challenges, we continue."
            },
            {
              "pt": "À medida que o tempo passa, aprendemos.",
              "en": "As time passes, we learn."
            },
            {
              "pt": "Haja vista os resultados, a decisão é clara.",
              "en": "Given the results, the decision is clear."
            }
          ],
          "extendedExamples": [
            {
              "pt": "Embora ela tivesse chegado atrasada, o chefe não disse nada, pois sabia que ela sempre se dedicava muito ao trabalho.",
              "en": "Although she had arrived late, the boss said nothing, as he knew she always dedicated herself greatly to her work."
            },
            {
              "pt": "Se eu tivesse estudado mais quando era jovem, teria conseguido uma bolsa de estudos no exterior e minha vida seria completamente diferente agora.",
              "en": "If I had studied more when I was young, I would have gotten a scholarship abroad and my life would be completely different now."
            },
            {
              "pt": "À medida que a reunião avançava, ficou claro que era necessário que todos chegassem a um consenso antes de tomarem qualquer decisão.",
              "en": "As the meeting progressed, it became clear that everyone needed to reach a consensus before making any decision."
            },
            {
              "pt": "Apesar de o projeto ter sido concluído no prazo, a diretora pediu que a equipe revisasse todos os detalhes para que não houvesse erros.",
              "en": "Despite the project having been completed on time, the director asked the team to review all the details so that there would be no errors."
            },
            {
              "pt": "Caso você não consiga resolver o problema sozinho, seria melhor que pedisse ajuda a alguém com mais experiência do que você.",
              "en": "In case you can't solve the problem on your own, it would be better to ask for help from someone with more experience than you."
            }
          ]
        },
        "dialogue": {
          "scene": "Sarah delivers a short speech in Portuguese at a cultural event.",
          "lines": [
            {
              "sp": "a",
              "pt": "Boa noite a todos. É uma honra falar aqui esta noite.",
              "en": "Good evening everyone. It's an honour to speak here tonight."
            },
            {
              "sp": "a",
              "pt": "Há três anos, não falava uma palavra de português. Malgrado as dificuldades iniciais, perseverei.",
              "en": "Three years ago, I didn't speak a single word of Portuguese. Despite the initial difficulties, I persevered."
            },
            {
              "sp": "a",
              "pt": "À medida que aprendi a língua, aprendi também a cultura — e, com ela, descobri o Brasil.",
              "en": "As I learned the language, I also learned the culture — and with it, I discovered Brazil."
            },
            {
              "sp": "a",
              "pt": "Haja vista tudo o que esta língua me deu, só posso dizer: muito obrigada, Brasil.",
              "en": "Given everything this language has given me, I can only say: thank you very much, Brazil."
            }
          ]
        },
        "exercises": [
          {
            "type": "Multiple choice",
            "instruction": "B2 final review.",
            "items": [
              {
                "q": "\"Despite the challenges\" (literary) →",
                "opts": [
                  "Apesar dos desafios",
                  "Malgrado os desafios",
                  "Não obstante os desafios — all are correct"
                ],
                "ans": 2
              },
              {
                "q": "\"As time passes\" →",
                "opts": [
                  "Enquanto o tempo passa",
                  "À medida que o tempo passa",
                  "Conforme o tempo passa — b and c both correct"
                ],
                "ans": 3
              }
            ]
          }
        ],
        "culture": {
          "title": "You've completed B2! 🚀",
          "text": "B2 is near-native fluency. You can now read Brazilian newspapers, enjoy films and literature without subtitles, participate in formal meetings, write academic texts, and handle virtually any social situation. Most Brazilians will consider you fluent. The C1 and C2 levels are about refinement, nuance, and complete mastery — the difference between \"speaking Portuguese\" and \"living in Portuguese\". At B2, you've arrived. Parabéns!"
        },
        "extraVocab": [
          {
            "pt": "embora",
            "en": "although / even though",
            "ex": "Embora estivesse cansado, ele continuou trabalhando.",
            "exEn": "Although he was tired, he kept on working."
          },
          {
            "pt": "à medida que",
            "en": "as / as long as (progressive)",
            "ex": "À medida que o tempo passa, fica mais difícil aprender.",
            "exEn": "As time goes by, it becomes harder to learn."
          },
          {
            "pt": "caso",
            "en": "in case / if (subjunctive trigger)",
            "ex": "Caso você precise de ajuda, me avise.",
            "exEn": "In case you need help, let me know."
          },
          {
            "pt": "apesar de",
            "en": "despite / in spite of",
            "ex": "Apesar de ter estudado bastante, ela não passou na prova.",
            "exEn": "Despite having studied a lot, she didn't pass the test."
          },
          {
            "pt": "desde que",
            "en": "as long as / ever since",
            "ex": "Desde que você se esforce, vai conseguir.",
            "exEn": "As long as you make an effort, you will succeed."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Embora ela é inteligente, não passou na prova.",
            "correct": "Embora ela seja inteligente, não passou na prova.",
            "note": "The conjunction 'embora' always triggers the present subjunctive (seja, tenha, faça, etc.), not the indicative. English speakers often use the indicative by analogy with 'although she is.'"
          },
          {
            "wrong": "Se eu teria mais dinheiro, viajaria pelo mundo.",
            "correct": "Se eu tivesse mais dinheiro, viajaria pelo mundo.",
            "note": "In hypothetical 'if' clauses referring to the present or future, Brazilian Portuguese requires the imperfect subjunctive (tivesse), never the conditional (teria). The conditional goes in the main clause only."
          },
          {
            "wrong": "É importante que você vai ao médico.",
            "correct": "É importante que você vá ao médico.",
            "note": "Impersonal expressions of necessity, importance, or emotion (é importante que, é necessário que, é bom que) require the present subjunctive in the subordinate clause, not the present indicative."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct word or verb form.",
            "items": [
              {
                "q": "Embora ele ___ muito dinheiro, não é feliz.",
                "ans": "tenha"
              },
              {
                "q": "Se nós ___ saído mais cedo, não teríamos perdido o avião.",
                "ans": "tivéssemos"
              },
              {
                "q": "É fundamental que todos os alunos ___ o trabalho até sexta-feira.",
                "ans": "entreguem"
              },
              {
                "q": "Caso você ___ alguma dúvida, pode me perguntar a qualquer momento.",
                "ans": "tenha"
              },
              {
                "q": "Apesar de ___ estudado muito, ela não se sentiu confiante na hora da prova.",
                "ans": "ter"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option to complete each sentence.",
            "items": [
              {
                "q": "Se eu ___ você, pediria desculpas imediatamente.",
                "opts": [
                  "seria",
                  "fosse",
                  "fui",
                  "serei"
                ],
                "ans": 1
              },
              {
                "q": "É necessário que o contrato ___ assinado antes da reunião.",
                "opts": [
                  "foi",
                  "era",
                  "seja",
                  "esteve"
                ],
                "ans": 2
              },
              {
                "q": "Eles continuaram trabalhando ___ de estarem exaustos.",
                "opts": [
                  "embora",
                  "desde que",
                  "apesar",
                  "caso"
                ],
                "ans": 2
              },
              {
                "q": "Tomara que ela ___ a tempo para a apresentação.",
                "opts": [
                  "chega",
                  "chegou",
                  "chegará",
                  "chegue"
                ],
                "ans": 3
              },
              {
                "q": "Nós ___ terminado o relatório se o sistema não tivesse falhado.",
                "opts": [
                  "teríamos",
                  "tínhamos",
                  "temos",
                  "tivemos"
                ],
                "ans": 0
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese.",
            "items": [
              {
                "q": "Although I was tired, I finished all the tasks.",
                "ans": "Embora eu estivesse cansado, terminei todas as tarefas."
              },
              {
                "q": "If she had known the truth, she would have acted differently.",
                "ans": "Se ela tivesse sabido a verdade, teria agido de forma diferente."
              },
              {
                "q": "It is important that everyone participates in the meeting.",
                "ans": "É importante que todos participem da reunião."
              },
              {
                "q": "In case it rains, we will cancel the outdoor event.",
                "ans": "Caso chova, vamos cancelar o evento ao ar livre."
              },
              {
                "q": "Despite having little time, they managed to deliver an excellent project.",
                "ans": "Apesar de terem pouco tempo, eles conseguiram entregar um projeto excelente."
              }
            ]
          }
        ],
        "teacherTip": "At B2, the most critical skill to reinforce is the automatic selection of the subjunctive mood — students must learn to recognize trigger words like 'embora,' 'caso,' 'desde que,' 'é importante que,' and hypothetical 'se' clauses as immediate cues for subjunctive forms. Consistent exposure to these structures in authentic, meaningful contexts — rather than isolated drills — helps students internalize the patterns and deploy them naturally in speech and writing."
      }
    ]
  },
  {
    "id": "c1",
    "label": "C1",
    "name": "Advanced",
    "desc": "Sophisticated mastery. Idiomatic language, cultural depth, academic register, and near-native expression.",
    "color": "#fff0f0",
    "accent": "#9b1c1c",
    "bar": "#ef4444",
    "emoji": "💎",
    "units": [
      {
        "title": "Idiomatic Portuguese",
        "sub": "Expressions, proverbs, and native-like speech",
        "emoji": "🌿",
        "duration": "~65 min",
        "objectives": [
          "Use Brazilian idioms naturally and correctly",
          "Understand proverbs and their cultural meaning",
          "Sound authentic in casual conversation"
        ],
        "vocabulary": [
          {
            "pt": "bater o martelo",
            "en": "to make a final decision",
            "ex": "Bati o martelo: vou ao Brasil.",
            "exEn": "I've made my decision: I'm going to Brazil."
          },
          {
            "pt": "engolir sapo",
            "en": "to put up with something unpleasant",
            "ex": "Engoli muito sapo naquele trabalho.",
            "exEn": "I put up with a lot in that job."
          },
          {
            "pt": "fazer vista grossa",
            "en": "to turn a blind eye",
            "ex": "O chefe fez vista grossa.",
            "exEn": "The boss turned a blind eye."
          },
          {
            "pt": "custar os olhos da cara",
            "en": "to cost an arm and a leg",
            "ex": "O hotel custou os olhos da cara.",
            "exEn": "The hotel cost an arm and a leg."
          },
          {
            "pt": "dar com os burros n'água",
            "en": "to fail / fall through",
            "ex": "O plano deu com os burros n'água.",
            "exEn": "The plan fell through."
          },
          {
            "pt": "em cima da hora",
            "en": "at the last minute",
            "ex": "Chegou em cima da hora.",
            "exEn": "She arrived at the last minute."
          }
        ],
        "grammar": {
          "title": "Fixed expressions and collocations",
          "explain": "C1 fluency is defined by collocation mastery — knowing which words naturally go together. \"Fazer uma pergunta\" (not \"dar uma pergunta\"), \"tirar uma foto\" (not \"fazer uma foto\" — in Brazil), \"bater papo\" (not \"ter uma conversa\" in casual speech).",
          "structure": "Learn verb + noun collocations as fixed units",
          "examples": [
            {
              "pt": "Tirar uma foto (not fazer)",
              "en": "\"Tirar uma foto\" = to take a photo (Brazil)"
            },
            {
              "pt": "Fazer uma pergunta",
              "en": "To ask a question (lit. \"to make a question\")"
            },
            {
              "pt": "Tomar uma decisão",
              "en": "To make/take a decision"
            }
          ],
          "extendedExamples": [
            {
              "pt": "O diretor tomou uma decisão inesperada e cancelou o projeto inteiro.",
              "en": "The director made an unexpected decision and cancelled the entire project."
            },
            {
              "pt": "Você precisa prestar atenção nos detalhes se quiser evitar erros graves.",
              "en": "You need to pay attention to the details if you want to avoid serious mistakes."
            },
            {
              "pt": "Não faz sentido insistir nessa estratégia quando os dados mostram o contrário.",
              "en": "It makes no sense to insist on this strategy when the data shows otherwise."
            },
            {
              "pt": "Ele conseguiu dar conta de todas as tarefas mesmo com prazo apertado.",
              "en": "He managed to handle all the tasks even with a tight deadline."
            },
            {
              "pt": "A comissão prometeu levar em consideração todas as sugestões dos moradores.",
              "en": "The committee promised to take all the residents' suggestions into consideration."
            }
          ]
        },
        "dialogue": {
          "scene": "Sarah uses idioms naturally in a conversation with Marcos.",
          "lines": [
            {
              "sp": "a",
              "pt": "Marcos, bati o martelo — vou ficar no Brasil por seis meses.",
              "en": "Marcos, I've made my final decision — I'm staying in Brazil for six months."
            },
            {
              "sp": "b",
              "pt": "Sério?! Vai custar os olhos da cara!",
              "en": "Really?! It's going to cost an arm and a leg!"
            },
            {
              "sp": "a",
              "pt": "Sei, mas não vou engolir mais sapo no trabalho de Dublin.",
              "en": "I know, but I'm not going to put up with Dublin work anymore."
            },
            {
              "sp": "b",
              "pt": "Entendo. Em cima da hora você decidiu!",
              "en": "I understand. You decided at the last minute!"
            },
            {
              "sp": "a",
              "pt": "Pois é. Mas agora é definitivo!",
              "en": "Indeed. But now it's definitive!"
            }
          ]
        },
        "exercises": [
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct idiomatic meaning.",
            "items": [
              {
                "q": "\"Dar com os burros n'água\" means:",
                "opts": [
                  "To succeed",
                  "To fail completely",
                  "To work hard"
                ],
                "ans": 1
              },
              {
                "q": "\"Fazer vista grossa\" means:",
                "opts": [
                  "To look carefully",
                  "To turn a blind eye",
                  "To see poorly"
                ],
                "ans": 1
              }
            ]
          }
        ],
        "culture": {
          "title": "Brazilian Portuguese idioms — creativity and culture 🇧🇷",
          "text": "Brazilian idioms are extraordinarily creative and often traceable to specific historical or cultural roots. \"Engolir sapo\" (to swallow a frog) comes from the idea that swallowing something disgusting is what you do to avoid conflict. \"Custar os olhos da cara\" (to cost the eyes of the face) — your eyes being the most valuable thing you can offer. Learning idioms is the final frontier of fluency: you're no longer translating; you're thinking in Brazilian Portuguese."
        },
        "extraVocab": [
          {
            "pt": "tomar uma decisão",
            "en": "to make a decision",
            "ex": "Ela precisou tomar uma decisão difícil sobre o emprego.",
            "exEn": "She had to make a difficult decision about the job."
          },
          {
            "pt": "prestar atenção",
            "en": "to pay attention",
            "ex": "Preste atenção ao que o professor está explicando.",
            "exEn": "Pay attention to what the teacher is explaining."
          },
          {
            "pt": "fazer sentido",
            "en": "to make sense",
            "ex": "A proposta dele não faz nenhum sentido para mim.",
            "exEn": "His proposal makes no sense to me."
          },
          {
            "pt": "dar conta de",
            "en": "to handle / to manage",
            "ex": "Ela dá conta de todas as responsabilidades sem reclamar.",
            "exEn": "She handles all the responsibilities without complaining."
          },
          {
            "pt": "levar em consideração",
            "en": "to take into consideration",
            "ex": "É fundamental levar em consideração as opiniões da equipe.",
            "exEn": "It is essential to take the team's opinions into consideration."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "fazer uma decisão",
            "correct": "tomar uma decisão",
            "note": "English speakers translate 'make a decision' literally, but in Brazilian Portuguese the fixed collocation uses 'tomar', not 'fazer'. Verb-noun collocations must be learned as fixed units."
          },
          {
            "wrong": "pagar atenção",
            "correct": "prestar atenção",
            "note": "The English collocation 'pay attention' tempts learners to use 'pagar' (to pay), but the correct Brazilian Portuguese verb in this fixed expression is 'prestar'."
          },
          {
            "wrong": "fazer sentido para mim faz",
            "correct": "faz sentido para mim",
            "note": "English speakers sometimes mirror English word order or add redundant elements. In Brazilian Portuguese, 'fazer sentido' is a fixed verbal phrase and the subject typically follows standard SVO order."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct verb to form the collocation.",
            "items": [
              {
                "q": "O gerente precisou ___ uma decisão antes do fim da reunião.",
                "ans": "tomar"
              },
              {
                "q": "Os alunos devem ___ atenção às instruções do exame.",
                "ans": "prestar"
              },
              {
                "q": "Essa explicação não ___ nenhum sentido para quem não conhece o contexto.",
                "ans": "faz"
              },
              {
                "q": "Ela sempre ___ conta das situações mais complicadas com muita calma.",
                "ans": "dá"
              },
              {
                "q": "O juiz prometeu ___ em consideração todas as evidências apresentadas.",
                "ans": "levar"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct verb to complete the collocation.",
            "items": [
              {
                "q": "Você precisa ___ uma decisão sobre a proposta ainda hoje.",
                "opts": [
                  "fazer",
                  "tomar",
                  "dar",
                  "pegar"
                ],
                "ans": 1
              },
              {
                "q": "Por favor, ___ atenção às mudanças no contrato antes de assinar.",
                "opts": [
                  "pagar",
                  "dar",
                  "ter",
                  "prestar"
                ],
                "ans": 3
              },
              {
                "q": "A explicação do professor finalmente ___ sentido para os estudantes.",
                "opts": [
                  "fez",
                  "teve",
                  "deu",
                  "tomou"
                ],
                "ans": 0
              },
              {
                "q": "O novo funcionário conseguiu ___ conta de todas as demandas do setor.",
                "opts": [
                  "tomar",
                  "fazer",
                  "dar",
                  "levar"
                ],
                "ans": 2
              },
              {
                "q": "A diretoria deve ___ em consideração o impacto social do projeto.",
                "opts": [
                  "tomar",
                  "pegar",
                  "fazer",
                  "levar"
                ],
                "ans": 3
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese, using the correct verb + noun collocation.",
            "items": [
              {
                "q": "We need to make a decision about the budget by Friday.",
                "ans": "Precisamos tomar uma decisão sobre o orçamento até sexta-feira."
              },
              {
                "q": "The students were not paying attention during the lecture.",
                "ans": "Os alunos não estavam prestando atenção durante a aula."
              },
              {
                "q": "None of his arguments make any sense in this context.",
                "ans": "Nenhum dos argumentos dele faz sentido neste contexto."
              },
              {
                "q": "She always manages to handle the most difficult situations.",
                "ans": "Ela sempre dá conta das situações mais difíceis."
              },
              {
                "q": "The board must take the employees' concerns into consideration.",
                "ans": "A diretoria deve levar em consideração as preocupações dos funcionários."
              }
            ]
          }
        ],
        "teacherTip": "Emphasize to students that verb + noun collocations in Brazilian Portuguese are fixed combinations that cannot be translated word-for-word from English — the verb choice is often completely different (e.g., 'tomar' instead of 'fazer' for 'make a decision'). Encourage learners to record and review these collocations as whole chunks rather than trying to construct them from individual word meanings."
      },
      {
        "title": "Advanced Listening & Comprehension",
        "sub": "Regional accents, fast speech, and implicit meaning",
        "emoji": "👂",
        "duration": "~65 min",
        "objectives": [
          "Understand different Brazilian regional accents",
          "Follow fast, natural speech without effort",
          "Catch implicit meaning, irony, and humour"
        ],
        "vocabulary": [
          {
            "pt": "sotaque",
            "en": "accent",
            "ex": "Adoro o sotaque baiano.",
            "exEn": "I love the Baian accent."
          },
          {
            "pt": "gíria regional",
            "en": "regional slang",
            "ex": "Cada região tem sua gíria.",
            "exEn": "Each region has its slang."
          },
          {
            "pt": "subentendido",
            "en": "implied / unspoken",
            "ex": "O subentendido era óbvio.",
            "exEn": "The implied meaning was obvious."
          },
          {
            "pt": "nas entrelinhas",
            "en": "between the lines",
            "ex": "Leia nas entrelinhas.",
            "exEn": "Read between the lines."
          },
          {
            "pt": "tom irônico",
            "en": "ironic tone",
            "ex": "Falou com tom irônico.",
            "exEn": "She spoke with an ironic tone."
          },
          {
            "pt": "duplo sentido",
            "en": "double meaning",
            "ex": "Essa frase tem duplo sentido.",
            "exEn": "This phrase has a double meaning."
          }
        ],
        "grammar": {
          "title": "Discourse analysis at C1 level",
          "explain": "C1 listening means catching not just what is said, but what is implied. Brazilians communicate a lot indirectly. \"Que interessante...\" said with a particular intonation means the opposite. Understanding \"dêixis\" (who \"we\", \"you\", \"here\" refer to) becomes second nature.",
          "structure": "Implicit meaning / indirect communication / irony",
          "examples": [
            {
              "pt": "Que interessante... (ironic)",
              "en": "How... interesting... (means: how terrible)"
            },
            {
              "pt": "Você foi muito corajoso. (ironic)",
              "en": "You were very brave. (means: you were reckless)"
            },
            {
              "pt": "É o jeito... (resigned)",
              "en": "That's just how it is... (accepting an unpleasant situation)"
            }
          ],
          "extendedExamples": [
            {
              "pt": "— Que cheiro delicioso... foi você quem cozinhou? — Digamos que eu dei o meu melhor.",
              "en": "— What a delicious smell... did you cook this? — Let's just say I did my best. (Implying it may not have gone perfectly.)"
            },
            {
              "pt": "O gerente disse que 'consideraria' o pedido de aumento, o que todos entenderam como uma recusa educada.",
              "en": "The manager said he would 'consider' the raise request, which everyone understood as a polite refusal."
            },
            {
              "pt": "— Como foi a reunião com o novo cliente? — Ah, foi muito... interessante.",
              "en": "— How was the meeting with the new client? — Oh, it was very... interesting. (The pause and tone imply it was actually unpleasant.)"
            },
            {
              "pt": "Ela agradeceu o presente com um sorriso forçado e disse que 'nunca tinha visto nada igual'.",
              "en": "She thanked him for the gift with a forced smile and said she 'had never seen anything like it.' (Ironically implying she disliked it.)"
            },
            {
              "pt": "— Você acha que ele vai chegar na hora? — Bom, ele tem um histórico excelente de pontualidade.",
              "en": "— Do you think he'll arrive on time? — Well, he has an excellent track record of punctuality. (Said ironically, implying he is always late.)"
            }
          ]
        },
        "dialogue": {
          "scene": "Sarah navigates a complex conversation with implicit meaning.",
          "lines": [
            {
              "sp": "b",
              "pt": "Você foi \"muito corajosa\" em apresentar aquele projeto sem avisar a chefia...",
              "en": "You were \"very brave\" to present that project without informing management..."
            },
            {
              "sp": "a",
              "pt": "Ah, entendi. Vocé acha que eu errei.",
              "en": "Ah, I understood. You think I made a mistake."
            },
            {
              "sp": "b",
              "pt": "Não disse isso... Mas nas entrelinhas...",
              "en": "I didn't say that... But between the lines..."
            },
            {
              "sp": "a",
              "pt": "O subentendido era bem claro! Mas eu ainda defendo a decisão.",
              "en": "The implied meaning was quite clear! But I still stand by the decision."
            }
          ]
        },
        "exercises": [
          {
            "type": "Multiple choice",
            "instruction": "What does the speaker really mean?",
            "items": [
              {
                "q": "\"Que solução criativa...\" (said slowly, with raised eyebrow)",
                "opts": [
                  "They genuinely admire the solution",
                  "They think the solution is terrible",
                  "They are asking a question"
                ],
                "ans": 1
              }
            ]
          }
        ],
        "culture": {
          "title": "Brazil's regional accents 🗺️",
          "text": "Brazil's regional accents are as distinct as the regions themselves. Cariocas (Rio) speak with a soft \"s\" that sounds like English \"sh\" — \"mesmo\" sounds like \"meshhmo\". Paulistanos (São Paulo) have a more clipped, urban accent. Baianos (Salvador) have a musical, drawn-out rhythm. Gaúchos (Porto Alegre) sound almost European Portuguese. Nordestinos maintain open vowels that sound older and more classical. Learning to understand regional variation is the final challenge of advanced Portuguese."
        },
        "extraVocab": [
          {
            "pt": "subentendido",
            "en": "implied / understood",
            "ex": "O que ele disse estava subentendido nas entrelinhas.",
            "exEn": "What he said was implied between the lines."
          },
          {
            "pt": "ironia",
            "en": "irony",
            "ex": "Ele usou ironia para criticar a situação sem ser direto.",
            "exEn": "He used irony to criticize the situation without being direct."
          },
          {
            "pt": "implícito",
            "en": "implicit",
            "ex": "A mensagem implícita era de que ela não queria continuar na empresa.",
            "exEn": "The implicit message was that she did not want to stay at the company."
          },
          {
            "pt": "nas entrelinhas",
            "en": "between the lines",
            "ex": "É preciso ler nas entrelinhas para entender o que o autor realmente quis dizer.",
            "exEn": "You need to read between the lines to understand what the author really meant."
          },
          {
            "pt": "eufemismo",
            "en": "euphemism",
            "ex": "Dizer 'passou desta para melhor' é um eufemismo para morte.",
            "exEn": "Saying 'passed on to a better place' is a euphemism for death."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Ele falou que sim, então ele quis dizer sim.",
            "correct": "Nem sempre uma resposta afirmativa direta indica concordância genuína em contextos irônicos ou indiretos.",
            "note": "English speakers often interpret affirmative answers at face value. In Brazilian Portuguese communication, tone, context, and hesitation markers like 'olha...' or 'é que...' signal indirect disagreement or reluctance."
          },
          {
            "wrong": "A mensagem era muito implícita, então não tinha significado.",
            "correct": "A mensagem era muito implícita, mas tinha um significado claro no contexto.",
            "note": "English speakers may assume that if something is not stated explicitly, it has no communicative value. In Brazilian Portuguese discourse, implicit meaning is often central to the intended message, especially in formal or polite contexts."
          },
          {
            "wrong": "Ele disse 'que interessante' e eu sabia que ele estava com ironia porque usou palavras negativas.",
            "correct": "Ele disse 'que interessante' com ironia, mesmo sem usar palavras negativas — o tom e o contexto sinalizavam o sarcasmo.",
            "note": "English speakers expect verbal markers of irony. In Brazilian Portuguese, irony is frequently conveyed purely through intonation, pausing, and contextual incongruity, without any negative lexical cues."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct word to express implicit meaning or irony in context.",
            "items": [
              {
                "q": "Quando ela disse que a apresentação foi 'até que razoável', todos entenderam que ela estava sendo ___.",
                "ans": "irônica"
              },
              {
                "q": "O que o diretor disse ficou ___; ninguém precisou perguntar o que ele realmente quis dizer.",
                "ans": "subentendido"
              },
              {
                "q": "Para compreender a fala dele, você precisa ler nas ___.",
                "ans": "entrelinhas"
              },
              {
                "q": "Dizer que alguém 'foi embora mais cedo' é um ___ para dizer que foi demitido.",
                "ans": "eufemismo"
              },
              {
                "q": "A crítica estava ___ no discurso, mas todos na sala perceberam.",
                "ans": "implícita"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the option that best completes the sentence with correct meaning.",
            "items": [
              {
                "q": "Quando ela disse 'adorei o presente', mas desviou o olhar, a mensagem ___ era de desagrado.",
                "opts": [
                  "explícita",
                  "implícita",
                  "direta",
                  "literal"
                ],
                "ans": 1
              },
              {
                "q": "Ele usou um ___ ao dizer que o projeto 'poderia ter ido melhor', evitando críticas diretas.",
                "opts": [
                  "eufemismo",
                  "sinônimo",
                  "arcaísmo",
                  "neologismo"
                ],
                "ans": 0
              },
              {
                "q": "A plateia riu porque reconheceu a ___ no discurso do palestrante sobre 'eficiência' do governo.",
                "opts": [
                  "metáfora",
                  "ironia",
                  "aliteração",
                  "parábola"
                ],
                "ans": 1
              },
              {
                "q": "Para interpretar discursos políticos em C1, é essencial identificar o que está ___ nas falas.",
                "opts": [
                  "inventado",
                  "subentendido",
                  "repetido",
                  "traduzido"
                ],
                "ans": 1
              },
              {
                "q": "O silêncio dele após a pergunta foi ___ — ele claramente não queria responder.",
                "opts": [
                  "irrelevante",
                  "eloquente",
                  "ensurdecedor",
                  "confuso"
                ],
                "ans": 2
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese, preserving the implicit meaning or ironic tone.",
            "items": [
              {
                "q": "She said the report was 'interesting', which everyone knew meant she hated it.",
                "ans": "Ela disse que o relatório era 'interessante', o que todos entenderam como sinal de que ela havia detestado."
              },
              {
                "q": "Reading between the lines, it was clear he had no intention of keeping his promise.",
                "ans": "Lendo nas entrelinhas, ficava claro que ele não tinha a menor intenção de cumprir a promessa."
              },
              {
                "q": "His praise was so exaggerated that it came across as pure irony.",
                "ans": "O elogio dele era tão exagerado que soou como pura ironia."
              },
              {
                "q": "What she left unsaid was far more important than what she actually said.",
                "ans": "O que ela deixou implícito era muito mais importante do que o que ela disse de fato."
              },
              {
                "q": "Using a euphemism instead of saying 'fired' softened the impact of the news.",
                "ans": "Usar um eufemismo em vez de dizer 'demitido' suavizou o impacto da notícia."
              }
            ]
          }
        ],
        "teacherTip": "Encourage students to pay close attention to hesitation markers, unusual pauses, and exaggerated praise in Brazilian Portuguese speech, as these are key signals of irony or indirect communication. Practice with authentic Brazilian media clips — such as political interviews or comedy shows — to develop sensitivity to implicit meaning beyond the literal text."
      },
      {
        "title": "Writing at C1",
        "sub": "Academic and professional writing excellence",
        "emoji": "✍️",
        "duration": "~70 min",
        "objectives": [
          "Write sophisticated academic and professional texts",
          "Use complex syntactic structures naturally",
          "Develop a personal writing voice in Portuguese"
        ],
        "vocabulary": [
          {
            "pt": "por conseguinte",
            "en": "consequently / therefore (formal)",
            "ex": "Por conseguinte, a conclusão é...",
            "exEn": "Consequently, the conclusion is..."
          },
          {
            "pt": "a despeito de",
            "en": "in spite of / despite (formal)",
            "ex": "A despeito das críticas...",
            "exEn": "In spite of the criticism..."
          },
          {
            "pt": "mister",
            "en": "necessary / needed (literary)",
            "ex": "É mister reconhecer o problema.",
            "exEn": "It is necessary to recognise the problem."
          },
          {
            "pt": "nesse diapasão",
            "en": "in this vein / accordingly",
            "ex": "Nesse diapasão, cumpre ressaltar...",
            "exEn": "In this vein, it is worth noting..."
          },
          {
            "pt": "a fortiori",
            "en": "all the more so",
            "ex": "A fortiori, a solução urge.",
            "exEn": "All the more so, the solution is urgent."
          },
          {
            "pt": "cumpre",
            "en": "it is necessary / incumbent (formal)",
            "ex": "Cumpre analisar os dados.",
            "exEn": "It is necessary to analyse the data."
          }
        ],
        "grammar": {
          "title": "Complex syntactic embedding at C1",
          "explain": "C1 writing features deeply embedded subordinate clauses, nominalisations, passive constructions, and formal connectors — all deployed naturally. Sentences become architecturally complex but remain clear.",
          "structure": "Multiple embedded clauses + nominalization + formal connectors",
          "examples": [
            {
              "pt": "A análise dos dados, considerando-se a complexidade do fenômeno, evidencia a necessidade de revisão das políticas vigentes.",
              "en": "The analysis of the data, considering the complexity of the phenomenon, evidences the need to revise current policies."
            },
            {
              "pt": "Mister se faz, portanto, uma abordagem multidimensional do problema.",
              "en": "A multidimensional approach to the problem is therefore necessary."
            }
          ],
          "extendedExamples": [
            {
              "pt": "O reconhecimento de que as políticas implementadas ao longo da última década não produziram os resultados esperados levou à conclusão de que uma reformulação estrutural se fazia necessária.",
              "en": "The recognition that the policies implemented over the last decade had not produced the expected results led to the conclusion that a structural reformulation was necessary."
            },
            {
              "pt": "Não obstante os avanços que foram registrados no campo tecnológico, é inegável que a ampliação do acesso à educação de qualidade continua sendo um desafio que demanda atenção imediata.",
              "en": "Notwithstanding the advances that have been recorded in the technological field, it is undeniable that broadening access to quality education remains a challenge that demands immediate attention."
            },
            {
              "pt": "A suposição de que o crescimento econômico, por si só, seria suficiente para garantir o bem-estar social revelou-se equivocada, dado que a distribuição de renda permaneceu profundamente desigual.",
              "en": "The assumption that economic growth, on its own, would be sufficient to guarantee social well-being proved to be mistaken, given that income distribution remained deeply unequal."
            },
            {
              "pt": "Ademais, a constatação de que os modelos tradicionais de ensino não contemplam as necessidades dos estudantes que pertencem a comunidades historicamente marginalizadas reforça a urgência de uma revisão curricular abrangente.",
              "en": "Furthermore, the realization that traditional teaching models do not address the needs of students who belong to historically marginalized communities reinforces the urgency of a comprehensive curriculum review."
            },
            {
              "pt": "A implementação das medidas que foram propostas pelo comitê técnico, cujas recomendações haviam sido elaboradas com base em dados empíricos coletados ao longo de três anos, foi adiada em virtude de restrições orçamentárias imprevistas.",
              "en": "The implementation of the measures proposed by the technical committee, whose recommendations had been developed based on empirical data collected over three years, was postponed due to unforeseen budgetary constraints."
            }
          ]
        },
        "dialogue": {
          "scene": "Sarah receives feedback on her academic Portuguese writing.",
          "lines": [
            {
              "sp": "b",
              "pt": "Sarah, seu texto tem boa estrutura. Mas pode sofisticar mais.",
              "en": "Sarah, your text has good structure. But you can make it more sophisticated."
            },
            {
              "sp": "a",
              "pt": "Em que sentido? O vocabulário?",
              "en": "In what sense? The vocabulary?"
            },
            {
              "sp": "b",
              "pt": "Não só. A sintaxe. Tente encaixar mais orações subordinadas.",
              "en": "Not only. The syntax. Try to embed more subordinate clauses."
            },
            {
              "sp": "a",
              "pt": "Tipo: \"A análise dos dados, considerando o contexto, evidencia...\"?",
              "en": "Like: \"The analysis of the data, considering the context, evidences...\"?"
            },
            {
              "sp": "b",
              "pt": "Exatamente! Você está entendendo bem a escrita acadêmica.",
              "en": "Exactly! You're understanding academic writing well."
            }
          ]
        },
        "exercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete these formal connectors.",
            "items": [
              {
                "q": "\"Consequently\" (formal) → Por ___",
                "ans": "conseguinte"
              },
              {
                "q": "\"It is necessary to analyse\" → ___ analisar.",
                "ans": "Cumpre"
              },
              {
                "q": "\"In spite of the challenges\" → A ___ dos desafios",
                "ans": "despeito"
              }
            ]
          }
        ],
        "culture": {
          "title": "Brazilian academia and intellectual life 📖",
          "text": "Brazil has a vibrant and rigorous academic tradition. USP (University of São Paulo) is Latin America's top research university. FAPESP and CNPq fund world-class research. Brazilian social sciences produced thinkers like Gilberto Freyre (Casa Grande & Senzala — on race and culture), Darcy Ribeiro (on Indigenous peoples), and Roberto DaMatta (on Brazilian cultural identity). Academic Portuguese is among the most complex written registers in the Portuguese-speaking world."
        },
        "extraVocab": [
          {
            "pt": "nominalização",
            "en": "nominalization",
            "ex": "A nominalização de verbos é um recurso estilístico comum na escrita formal.",
            "exEn": "The nominalization of verbs is a common stylistic device in formal writing."
          },
          {
            "pt": "encadeamento sintático",
            "en": "syntactic chaining",
            "ex": "O encadeamento sintático de orações subordinadas confere precisão ao texto acadêmico.",
            "exEn": "The syntactic chaining of subordinate clauses gives precision to academic text."
          },
          {
            "pt": "coesão textual",
            "en": "textual cohesion",
            "ex": "A coesão textual depende do uso adequado de conectivos formais e referências anafóricas.",
            "exEn": "Textual cohesion depends on the appropriate use of formal connectors and anaphoric references."
          },
          {
            "pt": "cláusula subordinada",
            "en": "subordinate clause",
            "ex": "A cláusula subordinada adverbial causal explica o motivo pelo qual a proposta foi rejeitada.",
            "exEn": "The causal adverbial subordinate clause explains the reason why the proposal was rejected."
          },
          {
            "pt": "conector formal",
            "en": "formal connector",
            "ex": "O uso de conectores formais como 'não obstante' e 'ademais' eleva o registro do texto.",
            "exEn": "The use of formal connectors such as 'notwithstanding' and 'furthermore' elevates the register of the text."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "O fato de que ele foi promovido surpreendeu todos.",
            "correct": "A promoção dele surpreendeu a todos.",
            "note": "English speakers often avoid nominalization by overusing 'o fato de que' (the fact that). At C1, replacing verb phrases with nominalizations like 'a promoção' produces more formal, cohesive writing."
          },
          {
            "wrong": "Apesar de que os resultados foram positivos, ainda há problemas.",
            "correct": "Não obstante os resultados positivos, ainda há problemas.",
            "note": "English speakers frequently use 'apesar de que' + finite clause, but this structure is considered substandard in formal Brazilian Portuguese. Use 'não obstante', 'embora' + subjunctive, or nominalize the complement instead."
          },
          {
            "wrong": "Isso é devido ao fato de que a pesquisa não foi completa.",
            "correct": "Isso se deve à incompletude da pesquisa realizada.",
            "note": "Calquing 'due to the fact that' directly into Portuguese produces heavy, informal constructions. C1 writers should nominalize and use formal prepositional phrases to convey causal relationships concisely."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct nominalized or connector form.",
            "items": [
              {
                "q": "A ___ dos dados coletados durante a pesquisa permitiu identificar padrões relevantes.",
                "ans": "análise"
              },
              {
                "q": "Não ___ as dificuldades enfrentadas, o projeto foi concluído dentro do prazo.",
                "ans": "obstante"
              },
              {
                "q": "A ___ de que reformas urgentes eram necessárias levou o governo a agir imediatamente.",
                "ans": "constatação"
              },
              {
                "q": "Em virtude das restrições ___, o comitê optou por adiar a votação.",
                "ans": "orçamentárias"
              },
              {
                "q": "O relatório, cujas conclusões ___ amplamente debatidas, foi finalmente publicado.",
                "ans": "foram"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the formal connector that best completes the sentence.",
            "items": [
              {
                "q": "Os índices de pobreza aumentaram; ___, a taxa de desemprego atingiu níveis históricos.",
                "opts": [
                  "ademais",
                  "porém",
                  "aliás",
                  "todavia"
                ],
                "ans": 0
              },
              {
                "q": "___ os esforços empreendidos pelo governo, a situação não apresentou melhoras significativas.",
                "opts": [
                  "Não obstante",
                  "Apesar de que",
                  "Mesmo que",
                  "Embora"
                ],
                "ans": 0
              },
              {
                "q": "A proposta foi rejeitada ___ sua relevância para o debate público contemporâneo.",
                "opts": [
                  "a despeito de",
                  "por causa de",
                  "devido a que",
                  "em razão que"
                ],
                "ans": 0
              },
              {
                "q": "O crescimento econômico foi expressivo; ___, os indicadores sociais permaneceram estagnados.",
                "opts": [
                  "contudo",
                  "assim",
                  "logo",
                  "portanto"
                ],
                "ans": 0
              },
              {
                "q": "A implementação das medidas ___ aprovadas pelo conselho será feita de forma gradual.",
                "opts": [
                  "recentemente",
                  "anteriormente",
                  "brevemente",
                  "raramente"
                ],
                "ans": 0
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese using nominalization and formal connectors.",
            "items": [
              {
                "q": "The recognition that the model had failed led to the creation of a new committee.",
                "ans": "O reconhecimento de que o modelo havia falhado levou à criação de um novo comitê."
              },
              {
                "q": "Notwithstanding the challenges encountered, the implementation of the program was considered a success.",
                "ans": "Não obstante os desafios encontrados, a implementação do programa foi considerada um êxito."
              },
              {
                "q": "The assumption that economic development automatically generates social equality has been repeatedly questioned.",
                "ans": "A suposição de que o desenvolvimento econômico gera automaticamente igualdade social tem sido repetidamente questionada."
              },
              {
                "q": "Furthermore, the analysis of the data collected suggests that the proposed measures were insufficient.",
                "ans": "Ademais, a análise dos dados coletados sugere que as medidas propostas foram insuficientes."
              },
              {
                "q": "The conclusion that structural reforms are necessary, whose urgency has been highlighted by several researchers, cannot be ignored.",
                "ans": "A conclusão de que reformas estruturais são necessárias, cuja urgência foi ressaltada por diversos pesquisadores, não pode ser ignorada."
              }
            ]
          }
        ],
        "teacherTip": "Encourage students to actively replace 'o fato de que' + clause structures with nominalizations (e.g., 'a constatação de que', 'o reconhecimento de que', or a single noun phrase), as this is a defining feature of formal C1 writing in Brazilian Portuguese. Have them practice rewriting informal sentences by first identifying the core verb, then transforming it into its nominal form before adding embedded subordinate clauses."
      },
      {
        "title": "Humour, Irony & Cultural Nuance",
        "sub": "The most advanced aspect of language",
        "emoji": "😄",
        "duration": "~65 min",
        "objectives": [
          "Understand and produce Brazilian humour",
          "Navigate irony and sarcasm effectively",
          "Appreciate cultural references and in-jokes"
        ],
        "vocabulary": [
          {
            "pt": "piada",
            "en": "joke",
            "ex": "Conta uma piada!",
            "exEn": "Tell a joke!"
          },
          {
            "pt": "com ironia",
            "en": "ironically / with irony",
            "ex": "Disse com ironia.",
            "exEn": "She said it ironically."
          },
          {
            "pt": "tirar sarro",
            "en": "to mock / to take the mickey",
            "ex": "Estão tirando sarro de mim.",
            "exEn": "They're taking the mickey out of me."
          },
          {
            "pt": "bom humor",
            "en": "good humour",
            "ex": "Ele tem muito bom humor.",
            "exEn": "He has a great sense of humour."
          },
          {
            "pt": "deboche",
            "en": "mockery / irreverence",
            "ex": "O humor brasileiro tem muito deboche.",
            "exEn": "Brazilian humour has a lot of irreverence."
          },
          {
            "pt": "zoar",
            "en": "to tease / to joke around",
            "ex": "Estamos só zoando!",
            "exEn": "We're just joking around!"
          }
        ],
        "grammar": {
          "title": "Subjunctive in jokes and hypotheticals",
          "explain": "Humour in Portuguese heavily uses the subjunctive for hypotheticals and ironic conditionals, and exclamatives with inversion. Understanding these structures is what makes jokes funny — not just comprehensible.",
          "structure": "Que + subjunctive (exclamation) / Ironic conditional",
          "examples": [
            {
              "pt": "Que ele venha logo! (impatient wish)",
              "en": "May he get here soon! (impatient)"
            },
            {
              "pt": "Se eu fosse perfeito... (ironic)",
              "en": "If I were perfect... (self-deprecating irony)"
            },
            {
              "pt": "Tomara que acabe logo! (wish/relief)",
              "en": "I hope it ends soon!"
            }
          ],
          "extendedExamples": [
            {
              "pt": "Que ele chegue ao trabalho na hora por uma vez na vida!",
              "en": "May he arrive at work on time for once in his life!"
            },
            {
              "pt": "Que eu fosse deixar o bolo inteiro pra ele — claro que não!",
              "en": "As if I would leave the whole cake for him — of course not!"
            },
            {
              "pt": "Que todo mundo entendesse a ironia antes de se ofender!",
              "en": "If only everyone understood the irony before taking offense!"
            },
            {
              "pt": "Se eu soubesse que ele fosse reagir assim, jamais teria contado a piada.",
              "en": "Had I known he would react that way, I would never have told the joke."
            },
            {
              "pt": "Que ela venha me dizer que não riu — eu estava lá!",
              "en": "Let her come and tell me she didn't laugh — I was there!"
            }
          ]
        },
        "dialogue": {
          "scene": "Sarah tells her first Portuguese joke.",
          "lines": [
            {
              "sp": "a",
              "pt": "Posso contar uma piada em português?",
              "en": "Can I tell a joke in Portuguese?"
            },
            {
              "sp": "b",
              "pt": "Pode! Estou curioso.",
              "en": "Go ahead! I'm curious."
            },
            {
              "sp": "a",
              "pt": "Por que o livro de matemática está sempre triste? Porque tem muitos problemas!",
              "en": "Why is the mathematics book always sad? Because it has too many problems!"
            },
            {
              "sp": "b",
              "pt": "(Ri) Hahaha! Você contou uma piada em português! Que orgulho!",
              "en": "(Laughs) Hahaha! You told a joke in Portuguese! How proud!"
            },
            {
              "sp": "a",
              "pt": "Só estou zoando. Mas funciona, né?",
              "en": "I'm just messing around. But it works, right?"
            }
          ]
        },
        "exercises": [
          {
            "type": "Multiple choice",
            "instruction": "What does the speaker really mean?",
            "items": [
              {
                "q": "\"Tomara que ele fique mais uma hora!\" (said after a very boring visitor)",
                "opts": [
                  "They want the visitor to stay longer",
                  "They're being sarcastic — they want him to leave",
                  "They genuinely enjoy his company"
                ],
                "ans": 1
              }
            ]
          }
        ],
        "culture": {
          "title": "Brazilian humour — serious business 😂",
          "text": "Brazilians are extraordinarily funny. Brazilian comedy ranges from the clever wordplay of Millôr Fernandes to the absurdist sketch comedy of \"Porta dos Fundos\" (Brazil's most-subscribed YouTube comedy channel). Self-deprecating humour about Brazil's problems is a national sport. Carnival itself is partly a giant act of social satire — allegorical floats have always mocked politicians and social hypocrisy. Brazilians who can laugh at themselves are the most fun people on Earth, and the ability to joke \"em português\" is the ultimate sign of belonging."
        },
        "extraVocab": [
          {
            "pt": "ironia",
            "en": "irony",
            "ex": "A ironia do destino fez com que ele chegasse tarde justamente no dia mais importante.",
            "exEn": "The irony of fate made him arrive late precisely on the most important day."
          },
          {
            "pt": "sarcasmo",
            "en": "sarcasm",
            "ex": "Ela usou o sarcasmo para criticar a decisão sem parecer grosseira.",
            "exEn": "She used sarcasm to criticize the decision without seeming rude."
          },
          {
            "pt": "deboche",
            "en": "mockery / derision",
            "ex": "O deboche do apresentador arrancou gargalhadas da plateia.",
            "exEn": "The host's mockery drew laughter from the audience."
          },
          {
            "pt": "piada de mau gosto",
            "en": "joke in bad taste",
            "ex": "Aquela piada de mau gosto constrangeu todo mundo na reunião.",
            "exEn": "That joke in bad taste embarrassed everyone at the meeting."
          },
          {
            "pt": "zoeira",
            "en": "teasing / ribbing (informal, Brazilian slang)",
            "ex": "A zoeira entre os amigos é saudável, desde que ninguém se magoe.",
            "exEn": "Teasing among friends is healthy, as long as nobody gets hurt."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Que ele vai entender o sarcasmo.",
            "correct": "Que ele entenda o sarcasmo.",
            "note": "After the exclamatory 'Que' expressing a wish or desire, Brazilian Portuguese requires the present subjunctive, not the indicative 'vai'."
          },
          {
            "wrong": "Se eu saberia a resposta, eu falaria.",
            "correct": "Se eu soubesse a resposta, eu falaria.",
            "note": "In hypothetical 'se' clauses, the imperfect subjunctive ('soubesse') is required, not the conditional ('saberia'). English speakers often transfer the conditional directly."
          },
          {
            "wrong": "Que irônico que ele é!",
            "correct": "Que irônico ele é!",
            "note": "In Brazilian Portuguese exclamatory constructions with 'Que', the word 'que' is not repeated before the verb. The structure is 'Que + adjective + subject + verb', without an extra 'que'."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct present subjunctive form of the verb in parentheses.",
            "items": [
              {
                "q": "Que ele ___ (entender) que era só uma brincadeira!",
                "ans": "entenda"
              },
              {
                "q": "Que todos nós ___ (poder) rir dessa situação um dia!",
                "ans": "possamos"
              },
              {
                "q": "Se eu ___ (saber) que era uma piada, teria rido na hora.",
                "ans": "soubesse"
              },
              {
                "q": "Que ela ___ (vir) me explicar o que achou tão ofensivo!",
                "ans": "venha"
              },
              {
                "q": "Que a ironia ___ (ser) sempre bem-vinda nesta casa!",
                "ans": "seja"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option to complete the sentence.",
            "items": [
              {
                "q": "Que ele ___ de vez em quando — é bom para o relacionamento!",
                "opts": [
                  "brinca",
                  "brinque",
                  "brincou",
                  "brincaria"
                ],
                "ans": 1
              },
              {
                "q": "Se ela ___ o sarcasmo, não teria ficado com raiva.",
                "opts": [
                  "entende",
                  "entenderia",
                  "entendesse",
                  "entendeu"
                ],
                "ans": 2
              },
              {
                "q": "Que ___ fosse tão fácil lidar com quem não entende ironia!",
                "opts": [
                  "isso",
                  "este",
                  "aquele",
                  "tal"
                ],
                "ans": 0
              },
              {
                "q": "Que o deboche ___ com bom humor — nem sempre é fácil.",
                "opts": [
                  "receba",
                  "recebe",
                  "seja recebido",
                  "receberia"
                ],
                "ans": 2
              },
              {
                "q": "Se eu ___ que ele se ofenderia, teria escolhido outra piada.",
                "opts": [
                  "soubesse",
                  "sei",
                  "saberia",
                  "sabia"
                ],
                "ans": 0
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese, using the subjunctive where appropriate.",
            "items": [
              {
                "q": "May everyone finally understand that it was just a joke!",
                "ans": "Que todo mundo finalmente entenda que era só uma brincadeira!"
              },
              {
                "q": "If I had known the sarcasm would offend her, I would have stayed quiet.",
                "ans": "Se eu soubesse que o sarcasmo fosse ofendê-la, teria ficado calado."
              },
              {
                "q": "As if he would ever admit he didn't get the joke!",
                "ans": "Que ele fosse admitir que não entendeu a piada — claro que não!"
              },
              {
                "q": "May good humor always prevail in difficult moments.",
                "ans": "Que o bom humor sempre prevaleça nos momentos difíceis."
              },
              {
                "q": "If she understood Brazilian irony better, she would laugh a lot more.",
                "ans": "Se ela entendesse melhor a ironia brasileira, riria muito mais."
              }
            ]
          }
        ],
        "teacherTip": "When teaching 'Que + subjunctive' exclamations in Brazilian Portuguese, highlight that the construction carries emotional weight — surprise, indignation, or wishful thinking — and is deeply tied to comedic timing in Brazilian humour. Pair it with real examples from Brazilian stand-up comedy or memes so students feel the cultural register, not just the grammar rule."
      },
      {
        "title": "C1 Synthesis — Full Language Mastery",
        "sub": "Demonstrating advanced competency",
        "emoji": "👑",
        "duration": "~75 min",
        "objectives": [
          "Demonstrate C1 competency across all skills",
          "Engage with complex, abstract topics fluently",
          "Prepare for C2 native-speaker level"
        ],
        "vocabulary": [
          {
            "pt": "inequivocamente",
            "en": "unequivocally",
            "ex": "Inequivocamente, o melhor.",
            "exEn": "Unequivocally, the best."
          },
          {
            "pt": "hodiernamente",
            "en": "nowadays (very formal)",
            "ex": "Hodiernamente, a tecnologia domina.",
            "exEn": "Nowadays, technology dominates."
          },
          {
            "pt": "coetâneo",
            "en": "contemporary / of the same era",
            "ex": "Os problemas coetâneos são complexos.",
            "exEn": "Contemporary problems are complex."
          },
          {
            "pt": "amalgamar",
            "en": "to amalgamate / merge",
            "ex": "A cultura brasileira amalgama influências.",
            "exEn": "Brazilian culture amalgamates influences."
          },
          {
            "pt": "apreender",
            "en": "to grasp / apprehend (intellectually)",
            "ex": "Difícil apreender toda a complexidade.",
            "exEn": "Difficult to grasp the full complexity."
          },
          {
            "pt": "sobremodo",
            "en": "exceedingly / greatly (literary)",
            "ex": "Contribuiu sobremodo para a arte.",
            "exEn": "He contributed greatly to art."
          }
        ],
        "grammar": {
          "title": "C1 — The full grammar is available to you",
          "explain": "At C1, grammar is no longer a set of rules — it's an intuition. All tenses, all moods, all registers are available automatically. The focus shifts from correctness to elegance, precision, and personal voice.",
          "structure": "Grammar serves communication — not the other way around",
          "examples": [
            {
              "pt": "O Brasil, país que amalgama sob o mesmo céu as mais diversas etnias, culturas e histórias...",
              "en": "Brazil, a country that amalgamates under the same sky the most diverse ethnicities, cultures, and histories..."
            },
            {
              "pt": "Hodiernamente, apreender as nuances de uma cultura exige sobremodo paciência e humildade.",
              "en": "Nowadays, grasping the nuances of a culture requires exceedingly patience and humility."
            }
          ],
          "extendedExamples": [
            {
              "pt": "Embora ele conhecesse todas as regras gramaticais, sua fala soava artificial porque priorizava a forma em vez do significado.",
              "en": "Although he knew all the grammar rules, his speech sounded artificial because he prioritized form over meaning."
            },
            {
              "pt": "Uma comunicadora experiente escolhe as estruturas que melhor transmitem sua intenção, sem se prender rigidamente a padrões fixos.",
              "en": "An experienced communicator chooses the structures that best convey her intention, without rigidly clinging to fixed patterns."
            },
            {
              "pt": "O domínio real do português se manifesta quando a gramática passa a ser um recurso natural, não um obstáculo consciente.",
              "en": "True mastery of Portuguese is revealed when grammar becomes a natural resource, not a conscious obstacle."
            },
            {
              "pt": "Ao negociar um contrato, ele ajustou seu registro automaticamente, usando a gramática como ferramenta de persuasão, não como fim em si mesma.",
              "en": "While negotiating a contract, he automatically adjusted his register, using grammar as a tool for persuasion, not as an end in itself."
            },
            {
              "pt": "Falantes fluentes raramente pensam em regras durante uma conversa; a gramática está a serviço do que precisam dizer.",
              "en": "Fluent speakers rarely think about rules during a conversation; grammar is in service of what they need to say."
            }
          ]
        },
        "dialogue": {
          "scene": "Sarah gives a C1-level reflection on her language journey.",
          "lines": [
            {
              "sp": "a",
              "pt": "Aprendi que uma língua não é um sistema de regras. É uma visão de mundo.",
              "en": "I learned that a language isn't a system of rules. It's a worldview."
            },
            {
              "sp": "b",
              "pt": "Que insight profundo. E como o português mudou a sua visão?",
              "en": "What a profound insight. And how did Portuguese change your view?"
            },
            {
              "sp": "a",
              "pt": "Me ensinou que existe uma palavra — saudade — que contém toda uma filosofia de vida.",
              "en": "It taught me that there is a word — saudade — that contains an entire philosophy of life."
            },
            {
              "sp": "b",
              "pt": "É isso. O português não se apreende apenas com gramática. Apreende-se com o coração.",
              "en": "That's it. Portuguese isn't just grasped with grammar. It's grasped with the heart."
            }
          ]
        },
        "exercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete these C1 vocabulary items.",
            "items": [
              {
                "q": "\"Unequivocally, the best\" → ___, o melhor.",
                "ans": "Inequivocamente"
              },
              {
                "q": "\"Brazilian culture amalgamates influences\" → A cultura brasileira ___ influências.",
                "ans": "amalgama"
              }
            ]
          }
        ],
        "culture": {
          "title": "You've completed C1! 👑",
          "text": "C1 is genuinely advanced. You now operate in Portuguese with the sophistication of an educated native speaker — in formal and informal contexts, written and spoken, with humour and nuance. You can appreciate Clarice Lispector in the original, follow political debates, enjoy stand-up comedy, and write academic papers. The gap between you and a native speaker is now primarily about lived experience — not language ability. C2 (native/bilingual level) is the final frontier: complete mastery of all registers, complete intuition, and the ability to produce and appreciate language at its most refined."
        },
        "extraVocab": [
          {
            "pt": "subjuntivo",
            "en": "subjunctive mood",
            "ex": "É essencial que você domine o subjuntivo para se expressar com precisão.",
            "exEn": "It is essential that you master the subjunctive in order to express yourself precisely."
          },
          {
            "pt": "coesão textual",
            "en": "textual cohesion",
            "ex": "A coesão textual garante que as ideias fluam de forma lógica no discurso.",
            "exEn": "Textual cohesion ensures that ideas flow logically in discourse."
          },
          {
            "pt": "nuance",
            "en": "nuance",
            "ex": "Captar as nuances de uma língua exige anos de exposição e prática intensa.",
            "exEn": "Grasping the nuances of a language requires years of exposure and intense practice."
          },
          {
            "pt": "registro linguístico",
            "en": "language register",
            "ex": "Saber alternar entre registros formais e informais é uma marca de proficiência avançada.",
            "exEn": "Knowing how to switch between formal and informal registers is a hallmark of advanced proficiency."
          },
          {
            "pt": "fluência discursiva",
            "en": "discursive fluency",
            "ex": "A fluência discursiva vai além do vocabulário e envolve a organização das ideias.",
            "exEn": "Discursive fluency goes beyond vocabulary and involves the organization of ideas."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Espero que você vai conseguir o emprego.",
            "correct": "Espero que você consiga o emprego.",
            "note": "After verbs of hope, desire, or emotion followed by 'que', Brazilian Portuguese requires the present subjunctive (consiga), not the indicative future (vai conseguir). English speakers often default to the indicative because English rarely marks the subjunctive overtly."
          },
          {
            "wrong": "Se eu teria mais tempo, estudaria mais.",
            "correct": "Se eu tivesse mais tempo, estudaria mais.",
            "note": "In hypothetical 'se' clauses referring to unreal or contrary-to-fact situations, the imperfect subjunctive (tivesse) is required — never the conditional (teria). This mirrors a similar distinction in English that many learners overlook when switching languages."
          },
          {
            "wrong": "Apesar de ele é inteligente, cometeu um erro grave.",
            "correct": "Apesar de ele ser inteligente, cometeu um erro grave.",
            "note": "After prepositional conjunctions like 'apesar de', 'antes de', and 'depois de' with an explicit subject, Brazilian Portuguese uses the infinitive (ser), not the conjugated indicative (é). English speakers translate word-for-word from 'even though he is', producing the incorrect form."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct word or form.",
            "items": [
              {
                "q": "É fundamental que todos os cidadãos ___ seus direitos.",
                "ans": "conheçam"
              },
              {
                "q": "Se nós ___ sabido da reunião antes, teríamos chegado mais cedo.",
                "ans": "tivéssemos"
              },
              {
                "q": "O palestrante abordou o tema de forma tão ___ que até os leigos entenderam.",
                "ans": "acessível"
              },
              {
                "q": "Embora o relatório ___ sido entregue no prazo, continha várias imprecisões.",
                "ans": "tenha"
              },
              {
                "q": "A diretora pediu que a equipe ___ o projeto até sexta-feira.",
                "ans": "concluísse"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option to complete the sentence.",
            "items": [
              {
                "q": "Por mais que ela ___ se preparado, a prova a surpreendeu.",
                "opts": [
                  "tinha",
                  "tenha",
                  "tivesse",
                  "teve"
                ],
                "ans": 2
              },
              {
                "q": "Caso o contrato ___ assinado até amanhã, o projeto poderá começar na semana seguinte.",
                "opts": [
                  "é",
                  "foi",
                  "seja",
                  "será"
                ],
                "ans": 2
              },
              {
                "q": "O advogado argumentou de modo tão ___ que o júri ficou convencido.",
                "opts": [
                  "superficial",
                  "contundente",
                  "ambíguo",
                  "desorganizado"
                ],
                "ans": 1
              },
              {
                "q": "Tínhamos esperança de que as negociações ___ a um acordo favorável.",
                "opts": [
                  "chegam",
                  "chegariam",
                  "chegassem",
                  "chegaram"
                ],
                "ans": 2
              },
              {
                "q": "A pesquisadora publicou seus resultados sem que ___ revisado os dados finais.",
                "opts": [
                  "tinha",
                  "tivesse",
                  "tenha",
                  "teve"
                ],
                "ans": 1
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese.",
            "items": [
              {
                "q": "Even if she had studied harder, the exam would still have been challenging.",
                "ans": "Mesmo que ela tivesse estudado mais, a prova ainda teria sido desafiadora."
              },
              {
                "q": "It is important that the team present its conclusions clearly and objectively.",
                "ans": "É importante que a equipe apresente suas conclusões de forma clara e objetiva."
              },
              {
                "q": "He spoke as though he had witnessed the entire event himself.",
                "ans": "Ele falou como se tivesse presenciado o evento inteiro pessoalmente."
              },
              {
                "q": "The manager requested that all reports be submitted before the deadline.",
                "ans": "O gerente solicitou que todos os relatórios fossem entregues antes do prazo."
              },
              {
                "q": "Mastering a language requires not only grammar knowledge but also cultural sensitivity.",
                "ans": "Dominar uma língua exige não apenas conhecimento gramatical, mas também sensibilidade cultural."
              }
            ]
          }
        ],
        "teacherTip": "At C1, encourage students to make deliberate stylistic choices — ask them why they chose a particular structure, not just whether it is correct. This metacognitive habit accelerates true mastery by connecting grammar awareness to communicative intent."
      }
    ]
  },
  {
    "id": "c2",
    "label": "C2",
    "name": "Proficient",
    "desc": "Native-level mastery. Complete linguistic command, cultural depth, and authentic Brazilian expression.",
    "color": "#1a1814",
    "accent": "#faf8f3",
    "bar": "#c9a84c",
    "emoji": "⭐",
    "units": [
      {
        "title": "Native-Level Precision",
        "sub": "The final frontier of linguistic mastery",
        "emoji": "🎯",
        "duration": "~75 min",
        "objectives": [
          "Use language with native-level precision and elegance",
          "Master the most refined aspects of Brazilian Portuguese",
          "Achieve complete register versatility"
        ],
        "vocabulary": [
          {
            "pt": "peremptoriamente",
            "en": "peremptorily / emphatically",
            "ex": "Recusou peremptoriamente.",
            "exEn": "She refused emphatically."
          },
          {
            "pt": "com fulcro em",
            "en": "based on / grounded in (legal)",
            "ex": "Com fulcro no artigo 5º...",
            "exEn": "Based on article 5..."
          },
          {
            "pt": "a bem da verdade",
            "en": "to tell the truth / in all fairness",
            "ex": "A bem da verdade, ele tinha razão.",
            "exEn": "In all fairness, he was right."
          },
          {
            "pt": "de somenos",
            "en": "of little importance (literary)",
            "ex": "É questão de somenos importância.",
            "exEn": "It's a matter of little importance."
          },
          {
            "pt": "pretérito mais que perfeito",
            "en": "pluperfect tense",
            "ex": "Ele já saíra quando ela chegou.",
            "exEn": "He had already left when she arrived."
          },
          {
            "pt": "mesóclise",
            "en": "mesoclisis (pronoun inside verb)",
            "ex": "Dar-lhe-ei a resposta.",
            "exEn": "I shall give you the answer."
          }
        ],
        "grammar": {
          "title": "Literary pluperfect and mesoclisis",
          "explain": "The literary pluperfect (saíra, fizera, partira) is used in formal and literary writing — it's the equivalent of \"tinha saído\" but in one word. Mesoclisis — putting a pronoun inside a future or conditional verb — is formal/literary and now mainly found in literature and official documents.",
          "structure": "saíra = tinha saído / Dar-lhe-ei = vou lhe dar (literary)",
          "examples": [
            {
              "pt": "Quando ela chegou, ele já partira.",
              "en": "When she arrived, he had already left. (literary)"
            },
            {
              "pt": "Dir-lhe-ei a verdade amanhã.",
              "en": "I shall tell you the truth tomorrow. (literary)"
            },
            {
              "pt": "Fizera tudo o que estava ao seu alcance.",
              "en": "He had done everything within his reach. (literary)"
            }
          ],
          "extendedExamples": [
            {
              "pt": "Quando os investigadores chegaram à cena, o suspeito já fugira — tinha fugido horas antes.",
              "en": "When the investigators arrived at the scene, the suspect had already fled — he had fled hours earlier."
            },
            {
              "pt": "Ela percebera, naquele instante, que cometera um erro irreparável.",
              "en": "She had realized, at that moment, that she had made an irreparable mistake."
            },
            {
              "pt": "Enviar-lhe-ei o relatório completo assim que a análise estiver concluída.",
              "en": "I will send you the full report as soon as the analysis is complete."
            },
            {
              "pt": "O velho professor dissera aos alunos que a sabedoria verdadeira custava uma vida inteira.",
              "en": "The old professor had told his students that true wisdom cost an entire lifetime."
            },
            {
              "pt": "Contar-te-ei tudo o que souber, mas apenas quando o momento for propício.",
              "en": "I will tell you everything I know, but only when the moment is right."
            }
          ]
        },
        "dialogue": {
          "scene": "Sarah reads a passage from Machado de Assis.",
          "lines": [
            {
              "sp": "a",
              "pt": "\"Dissera-me ele que viria. Veio. E quando chegou, já eu saíra.\"",
              "en": "\"He had told me he would come. He came. And when he arrived, I had already left.\""
            },
            {
              "sp": "b",
              "pt": "Que estrutura complexa e elegante. O Machado usa muito o pluscuamperfecto.",
              "en": "What a complex and elegant structure. Machado uses the pluperfect a lot."
            },
            {
              "sp": "a",
              "pt": "E a mesóclise! \"Dissera-me\" — o pronome no meio do verbo.",
              "en": "And the mesoclisis! \"Dissera-me\" — the pronoun in the middle of the verb."
            },
            {
              "sp": "b",
              "pt": "É isso que torna o Machado tão denso e ao mesmo tempo preciso.",
              "en": "That's what makes Machado so dense and at the same time precise."
            }
          ]
        },
        "exercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Rewrite using the literary pluperfect.",
            "items": [
              {
                "q": "\"Ela tinha saído.\" → Ela ___.",
                "ans": "saíra"
              },
              {
                "q": "\"Eles tinham chegado.\" → Eles ___.",
                "ans": "chegaram — chegaram is pretérito perfeito; literary pluperfect is: chegaram"
              },
              {
                "q": "\"Ele tinha feito tudo.\" → Ele ___ tudo.",
                "ans": "fizera"
              }
            ]
          }
        ],
        "culture": {
          "title": "Machado de Assis — Brazil's greatest writer 📖",
          "text": "Machado de Assis (1839–1908) is considered the greatest writer in the Portuguese language by many scholars — more technically perfect than Eça de Queirós, more innovative than his contemporaries. Born to a free mixed-race father and a Portuguese-Azorean mother in Rio de Janeiro, he transcended all social limits to become the founder of the Brazilian Academy of Letters. His novels — especially Dom Casmurro and Memórias Póstumas de Brás Cubas — feature unreliable narrators, philosophical digressions, and devastating irony that feel completely modern. Reading him in the original is the ultimate test of Portuguese mastery."
        },
        "extraVocab": [
          {
            "pt": "mesóclise",
            "en": "mesoclisis (inserting a clitic pronoun into the middle of a verb form)",
            "ex": "Dar-lhe-ei a resposta assim que souber.",
            "exEn": "I will give you the answer as soon as I know."
          },
          {
            "pt": "pretérito mais-que-perfeito simples",
            "en": "literary pluperfect (synthetic form)",
            "ex": "Quando chegamos, ele já partira.",
            "exEn": "When we arrived, he had already left."
          },
          {
            "pt": "ênclise",
            "en": "enclisis (clitic pronoun placed after the verb)",
            "ex": "Disse-lhe a verdade sem hesitar.",
            "exEn": "I told him the truth without hesitating."
          },
          {
            "pt": "próclise",
            "en": "proclisis (clitic pronoun placed before the verb)",
            "ex": "Não lhe direi nada antes do tempo.",
            "exEn": "I will not tell him anything before the right time."
          },
          {
            "pt": "forma sintética",
            "en": "synthetic form (single-word conjugation replacing a compound tense)",
            "ex": "Ela escrevera a carta antes do amanhecer.",
            "exEn": "She had written the letter before dawn."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Eu vou te dar-lhe o livro amanhã.",
            "correct": "Dar-lhe-ei o livro amanhã.",
            "note": "English speakers often mix colloquial 'vou + infinitive' with literary clitic placement. In formal/literary registers, mesoclisis is used with the future indicative; the clitic is inserted between the verb stem and the ending (-ei, -ás, -á), never left floating."
          },
          {
            "wrong": "Quando cheguei, ele tinha já saído.",
            "correct": "Quando cheguei, ele já saíra. / Quando cheguei, ele já tinha saído.",
            "note": "In literary Portuguese, the synthetic pluperfect (saíra) is preferred over the compound form. Also note that 'já' precedes the verb, not the auxiliary — 'tinha já saído' is unnatural in Brazilian Portuguese; say 'já tinha saído'."
          },
          {
            "wrong": "Ele escreveu-me-á uma carta.",
            "correct": "Ele escrever-me-á uma carta.",
            "note": "Mesoclisis applies to the infinitive stem plus the future ending, not to the conjugated present form. The clitic splits 'escrever' + '-á', yielding 'escrever-me-á', not 'escreveu-me-á', which incorrectly uses the preterite stem."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct literary pluperfect (pretérito mais-que-perfeito simples) of the verb in parentheses.",
            "items": [
              {
                "q": "Quando o médico chegou ao hospital, o paciente já ___ (morrer).",
                "ans": "morrera"
              },
              {
                "q": "Ela percebeu que ___ (cometer) um erro gravíssimo ao assinar o documento.",
                "ans": "cometera"
              },
              {
                "q": "Os soldados ___ (partir) antes do amanhecer, sem deixar qualquer rastro.",
                "ans": "partira"
              },
              {
                "q": "Nós já ___ (ler) o manuscrito quando a editora anunciou o lançamento.",
                "ans": "lêramos"
              },
              {
                "q": "O diplomata ___ (prever) as consequências do tratado anos antes de sua assinatura.",
                "ans": "previra"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct mesoclisis form to complete the literary sentence.",
            "items": [
              {
                "q": "O ministro prometeu que ___ uma resposta formal até o fim da semana.",
                "opts": [
                  "dar-lhe-ia",
                  "lhe daria",
                  "dar-lhe-ei",
                  "lhe dava"
                ],
                "ans": 0
              },
              {
                "q": "Asseguro-vos que ___ os documentos necessários sem demora.",
                "opts": [
                  "enviar-vos-ei",
                  "vou enviar-vos",
                  "enviando-vos",
                  "enviar-vos-ia"
                ],
                "ans": 0
              },
              {
                "q": "Caso precise de ajuda, ___ imediatamente.",
                "opts": [
                  "aviso-te",
                  "avisar-te-ei",
                  "te avisarei",
                  "avisando-te"
                ],
                "ans": 1
              },
              {
                "q": "O embaixador prometeu que ___ as honras devidas durante a cerimônia.",
                "opts": [
                  "prestar-lhe-ia",
                  "lhe prestaria",
                  "prestando-lhe",
                  "prestar-lhe-ei"
                ],
                "ans": 0
              },
              {
                "q": "Confio em vós e ___ todos os segredos de Estado.",
                "opts": [
                  "revelar-vos-ei",
                  "vou revelar-vos",
                  "revelando-vos",
                  "revelar-vos-ia"
                ],
                "ans": 0
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into literary Brazilian Portuguese, using the synthetic pluperfect or mesoclisis as appropriate.",
            "items": [
              {
                "q": "When she arrived, he had already left without saying goodbye.",
                "ans": "Quando ela chegou, ele já partira sem se despedir."
              },
              {
                "q": "I will send you the final decision as soon as the council meets.",
                "ans": "Enviar-lhe-ei a decisão final assim que o conselho se reunir."
              },
              {
                "q": "The general had foreseen the enemy's strategy long before the battle.",
                "ans": "O general previra a estratégia do inimigo muito antes da batalha."
              },
              {
                "q": "She had written the entire novel before turning thirty.",
                "ans": "Ela escrevera o romance inteiro antes de completar trinta anos."
              },
              {
                "q": "I will tell you the whole truth when the time comes.",
                "ans": "Dir-lhe-ei toda a verdade quando o momento chegar."
              }
            ]
          }
        ],
        "teacherTip": "Remind students that mesoclisis and the synthetic pluperfect are essentially restricted to formal written and literary Brazilian Portuguese — native speakers virtually never use them in speech. Focus first on recognition so students can read classic literature fluently, then introduce active production only at the most advanced stage, emphasizing that mixing these forms with casual register sounds strikingly unnatural."
      },
      {
        "title": "Sociolinguistics & Language Variation",
        "sub": "How language and society shape each other",
        "emoji": "🌐",
        "duration": "~70 min",
        "objectives": [
          "Understand sociolinguistic variation in Brazilian Portuguese",
          "Navigate language ideology and attitudes",
          "Discuss language policy and identity"
        ],
        "vocabulary": [
          {
            "pt": "diglossia",
            "en": "diglossia (two language varieties)",
            "ex": "O Brasil tem diglossia entre norma culta e popular.",
            "exEn": "Brazil has diglossia between formal and popular norms."
          },
          {
            "pt": "norma culta",
            "en": "educated/formal standard",
            "ex": "A norma culta é ensinada nas escolas.",
            "exEn": "The formal standard is taught in schools."
          },
          {
            "pt": "variação linguística",
            "en": "linguistic variation",
            "ex": "A variação linguística é natural.",
            "exEn": "Linguistic variation is natural."
          },
          {
            "pt": "preconceito linguístico",
            "en": "linguistic prejudice",
            "ex": "O preconceito linguístico é uma forma de discriminação.",
            "exEn": "Linguistic prejudice is a form of discrimination."
          },
          {
            "pt": "cooficializar",
            "en": "to make co-official (language)",
            "ex": "Algumas línguas indígenas foram cooficializadas.",
            "exEn": "Some Indigenous languages have been made co-official."
          },
          {
            "pt": "lusofonia",
            "en": "the Portuguese-speaking world",
            "ex": "A lusofonia reúne 260 milhões de falantes.",
            "exEn": "The Lusophone world unites 260 million speakers."
          }
        ],
        "grammar": {
          "title": "Language as social identity",
          "explain": "At C2, grammar extends to metalinguistic awareness — understanding how language choices signal identity, class, education, and regional belonging. \"Eu fui\" vs \"eu fui\" (same form, different social meaning depending on context and pronunciation) is a sociolinguistic phenomenon.",
          "structure": "Language variation as social meaning",
          "examples": [
            {
              "pt": "Tu vai vs você vai vs o senhor vai — same meaning, three social registers.",
              "en": "Informal/regional / Standard / Formal/respectful"
            },
            {
              "pt": "A gente vai (colloquial) = nós vamos (formal).",
              "en": "We're going (both mean the same, different registers."
            },
            {
              "pt": "Eu tô vs eu estou — contracted vs full form signals register.",
              "en": "Tô (speech/text) vs estou (formal writing)"
            }
          ],
          "extendedExamples": [
            {
              "pt": "Quando um falante carioca adota expressões típicas do interior de Minas Gerais, ele não está apenas adaptando sua fala — está negociando sua identidade social em tempo real.",
              "en": "When a Rio de Janeiro speaker adopts expressions typical of rural Minas Gerais, they are not merely adapting their speech — they are negotiating their social identity in real time."
            },
            {
              "pt": "O uso do 'tu' em vez do 'você' no Sul do Brasil sinaliza pertencimento regional e funciona como um marcador de solidariedade entre os membros daquela comunidade linguística.",
              "en": "The use of 'tu' instead of 'você' in southern Brazil signals regional belonging and functions as a solidarity marker among members of that linguistic community."
            },
            {
              "pt": "A variação na pronúncia do 'r' retroflexo caipira não é meramente fonética; ela carrega conotações sociais que podem ser exploradas ou suprimidas conforme o contexto interacional.",
              "en": "The variation in the pronunciation of the caipira retroflex 'r' is not merely phonetic; it carries social connotations that can be exploited or suppressed depending on the interactional context."
            },
            {
              "pt": "Ao empregar gírias periféricas em um discurso político, o candidato estava mobilizando variação linguística como instrumento de construção de identidade popular e aproximação com o eleitorado marginalizado.",
              "en": "By employing peripheral slang in a political speech, the candidate was mobilizing linguistic variation as an instrument for constructing a popular identity and connecting with the marginalized electorate."
            },
            {
              "pt": "A alternância entre o português formal e o português coloquial em uma mesma conversa revela como os falantes gerenciam ativamente sua posição social e suas relações de poder.",
              "en": "The alternation between formal and colloquial Portuguese within a single conversation reveals how speakers actively manage their social position and power relations."
            }
          ]
        },
        "dialogue": {
          "scene": "Sarah and Marcos have an academic discussion about Brazilian Portuguese.",
          "lines": [
            {
              "sp": "a",
              "pt": "Marcos, você já reparou como o português falado e escrito no Brasil são quase duas línguas diferentes?",
              "en": "Marcos, have you noticed how spoken and written Portuguese in Brazil are almost two different languages?"
            },
            {
              "sp": "b",
              "pt": "Completamente. É o que os linguistas chamam de diglossia.",
              "en": "Completely. It's what linguists call diglossia."
            },
            {
              "sp": "a",
              "pt": "A norma culta ensinada nas escolas não reflete o que as pessoas falam no dia a dia.",
              "en": "The formal standard taught in schools doesn't reflect what people speak daily."
            },
            {
              "sp": "b",
              "pt": "Exato. E isso cria um preconceito linguístico terrível — como se falar \"errado\" fosse uma falha moral.",
              "en": "Exactly. And this creates terrible linguistic prejudice — as if speaking \"incorrectly\" were a moral failing."
            }
          ]
        },
        "exercises": [
          {
            "type": "Multiple choice",
            "instruction": "Sociolinguistic knowledge.",
            "items": [
              {
                "q": "What is diglossia?",
                "opts": [
                  "Speaking two unrelated languages",
                  "Having two varieties of the same language for different contexts",
                  "A speech disorder"
                ],
                "ans": 1
              }
            ]
          }
        ],
        "culture": {
          "title": "260 million voices — the Lusophone world 🌍",
          "text": "Portuguese is the 6th most spoken language in the world, with 260+ million native speakers. Beyond Brazil and Portugal, it's official in Mozambique, Angola, Cape Verde, Guinea-Bissau, São Tomé e Príncipe, Equatorial Guinea, and Timor-Leste. Each has its own distinct variety. Brazilian Portuguese is the most widely spoken and most globally influential variety. The CPLP (Community of Portuguese Language Countries) works to promote Portuguese globally. By learning Brazilian Portuguese, you've gained access to one of humanity's richest cultural universes."
        },
        "extraVocab": [
          {
            "pt": "sotaque",
            "en": "accent",
            "ex": "O sotaque nordestino carrega marcas profundas de identidade cultural.",
            "exEn": "The northeastern accent carries deep marks of cultural identity."
          },
          {
            "pt": "variante linguística",
            "en": "linguistic variant",
            "ex": "Cada variante linguística reflete o contexto social de seus falantes.",
            "exEn": "Each linguistic variant reflects the social context of its speakers."
          },
          {
            "pt": "estigmatização",
            "en": "stigmatization",
            "ex": "A estigmatização de certas variedades do português perpetua desigualdades sociais.",
            "exEn": "The stigmatization of certain Portuguese varieties perpetuates social inequalities."
          },
          {
            "pt": "prestígio linguístico",
            "en": "linguistic prestige",
            "ex": "O prestígio linguístico associado ao dialeto paulistano influencia percepções de competência profissional.",
            "exEn": "The linguistic prestige associated with the São Paulo dialect influences perceptions of professional competence."
          },
          {
            "pt": "mudança de código",
            "en": "code-switching",
            "ex": "A mudança de código entre o português e o inglês é comum entre brasileiros que vivem no exterior.",
            "exEn": "Code-switching between Portuguese and English is common among Brazilians living abroad."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "O sotaque dele é errado porque não segue a norma padrão.",
            "correct": "O sotaque dele difere da norma padrão, mas não é nem correto nem errado do ponto de vista sociolinguístico.",
            "note": "English speakers often carry prescriptivist assumptions into discussions of language variation. In sociolinguistics, no accent or dialect is inherently 'wrong' — variation carries social meaning, not a hierarchy of correctness."
          },
          {
            "wrong": "Ele faz mudança de código porque não sabe falar português direito.",
            "correct": "Ele faz mudança de código como uma estratégia comunicativa sofisticada, não por deficiência linguística.",
            "note": "English speakers frequently misinterpret code-switching as a sign of linguistic incompetence. In Brazilian Portuguese sociolinguistic discourse, 'mudança de código' is recognized as a skilled, purposeful communicative practice."
          },
          {
            "wrong": "A variante linguística popular não tem prestígio, então ela é menos válida.",
            "correct": "A variante linguística popular carece de prestígio institucional, mas possui prestígio encoberto dentro de sua comunidade de fala.",
            "note": "Students often conflate 'overt prestige' with total social value. Brazilian sociolinguistics distinguishes 'prestígio aberto' (overt) from 'prestígio encoberto' (covert), recognizing that non-standard varieties hold genuine social and identity value for their speakers."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct word.",
            "items": [
              {
                "q": "A variação linguística ___ profundamente ligada à construção da identidade social de cada falante.",
                "ans": "está"
              },
              {
                "q": "Os sociolinguistas brasileiros argumentam que nenhuma variante ___ inerentemente superior às demais.",
                "ans": "é"
              },
              {
                "q": "O uso de certas gírias periféricas pode ___ como um marcador de pertencimento a um grupo específico.",
                "ans": "funcionar"
              },
              {
                "q": "A estigmatização de variedades não padrão ___ desigualdades históricas profundamente enraizadas na sociedade brasileira.",
                "ans": "reflete"
              },
              {
                "q": "Ao mudar de registro linguístico, o falante ___ ativamente sua posição identitária dentro do contexto social.",
                "ans": "negocia"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option.",
            "items": [
              {
                "q": "O sotaque nordestino ___ marcas identitárias que vão muito além da mera variação fonética.",
                "opts": [
                  "carrega",
                  "conquista",
                  "descarta",
                  "ignora"
                ],
                "ans": 0
              },
              {
                "q": "A mudança de código é frequentemente ___ como falta de domínio linguístico, quando na verdade é uma habilidade comunicativa sofisticada.",
                "opts": [
                  "celebrada",
                  "interpretada",
                  "ensinada",
                  "publicada"
                ],
                "ans": 1
              },
              {
                "q": "Comunidades linguísticas periféricas costumam desenvolver um prestígio ___, que valoriza a variante local mesmo sem reconhecimento institucional.",
                "opts": [
                  "normativo",
                  "encoberto",
                  "acadêmico",
                  "prescritivo"
                ],
                "ans": 1
              },
              {
                "q": "A sociolinguística brasileira ___ que todas as variedades do português têm valor comunicativo e cultural equivalente.",
                "opts": [
                  "nega",
                  "questiona",
                  "postula",
                  "proíbe"
                ],
                "ans": 2
              },
              {
                "q": "O falante bilíngue que alterna entre português e inglês ___ sua identidade híbrida por meio da linguagem.",
                "opts": [
                  "apaga",
                  "contradiz",
                  "expressa",
                  "rejeita"
                ],
                "ans": 2
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese.",
            "items": [
              {
                "q": "Linguistic variation is not a flaw; it is a reflection of the speaker's social and cultural identity.",
                "ans": "A variação linguística não é uma falha; é um reflexo da identidade social e cultural do falante."
              },
              {
                "q": "The stigmatization of non-standard Portuguese varieties perpetuates structural inequalities in Brazilian society.",
                "ans": "A estigmatização das variedades não padrão do português perpetua desigualdades estruturais na sociedade brasileira."
              },
              {
                "q": "When speakers shift their linguistic register, they are actively negotiating their position within a social hierarchy.",
                "ans": "Quando os falantes mudam de registro linguístico, eles estão negociando ativamente sua posição dentro de uma hierarquia social."
              },
              {
                "q": "Code-switching between two languages can serve as a powerful marker of hybrid cultural identity.",
                "ans": "A mudança de código entre duas línguas pode servir como um poderoso marcador de identidade cultural híbrida."
              },
              {
                "q": "Sociolinguists argue that every linguistic variant carries social meaning that is inseparable from its community of speakers.",
                "ans": "Os sociolinguistas argumentam que toda variante linguística carrega um significado social inseparável de sua comunidade de falantes."
              }
            ]
          }
        ],
        "teacherTip": "Encourage students to move beyond prescriptivist frameworks by consistently framing linguistic variation as a resource for social meaning-making rather than a deviation from a norm. Use authentic Brazilian media — such as political speeches, funk lyrics, or regional podcasts — to illustrate how speakers strategically deploy different varieties to assert, negotiate, or contest their social identities."
      },
      {
        "title": "C2 Capstone — Total Mastery",
        "sub": "The completion of the journey",
        "emoji": "🏅",
        "duration": "~80 min",
        "objectives": [
          "Demonstrate total C2 mastery",
          "Reflect on the language learning journey",
          "Plan continued immersion and growth"
        ],
        "vocabulary": [
          {
            "pt": "ápice",
            "en": "apex / pinnacle",
            "ex": "Atingiu o ápice da carreira.",
            "exEn": "He reached the pinnacle of his career."
          },
          {
            "pt": "transcender",
            "en": "to transcend",
            "ex": "Sua arte transcende fronteiras.",
            "exEn": "Her art transcends boundaries."
          },
          {
            "pt": "autóctone",
            "en": "indigenous / native",
            "ex": "A fauna autóctone está em risco.",
            "exEn": "The native fauna is at risk."
          },
          {
            "pt": "ab initio",
            "en": "from the beginning (Latin/formal)",
            "ex": "O processo foi revisto ab initio.",
            "exEn": "The process was reviewed from the beginning."
          },
          {
            "pt": "vernáculo",
            "en": "vernacular / native language",
            "ex": "Escreve no vernáculo com maestria.",
            "exEn": "He writes in the vernacular with mastery."
          },
          {
            "pt": "poliglota",
            "en": "polyglot",
            "ex": "Ela é uma poliglota incrível.",
            "exEn": "She's an incredible polyglot."
          }
        ],
        "grammar": {
          "title": "C2 — Language as art",
          "explain": "At C2, grammar is not a constraint but a tool for artistic expression. The question is no longer \"is this correct?\" but \"is this effective? Is this beautiful? Does this achieve the precise effect I want?\" Complete mastery means complete freedom.",
          "structure": "Complete freedom within mastery",
          "examples": [
            {
              "pt": "Há línguas que se aprendem. O português, sente-se.",
              "en": "There are languages you learn. Portuguese, you feel."
            },
            {
              "pt": "Uma poliglota é alguém que nunca perdeu a coragem de começar de novo.",
              "en": "A polyglot is someone who never lost the courage to start over."
            },
            {
              "pt": "A língua é a morada do ser — e o português é uma mansão.",
              "en": "Language is the home of being — and Portuguese is a mansion."
            }
          ],
          "extendedExamples": [
            {
              "pt": "Embora dominasse todas as regras gramaticais, ela escolhia quebrá-las deliberadamente para criar efeito poético.",
              "en": "Although she had mastered all grammatical rules, she chose to break them deliberately to create a poetic effect."
            },
            {
              "pt": "Quem verdadeiramente compreende uma língua sabe quando ignorar o manual e deixar a intuição falar.",
              "en": "Whoever truly understands a language knows when to ignore the textbook and let intuition speak."
            },
            {
              "pt": "A liberdade criativa na escrita só se manifesta plenamente depois que a estrutura foi internalizada de forma inconsciente.",
              "en": "Creative freedom in writing only fully manifests after structure has been internalized unconsciously."
            },
            {
              "pt": "Nas mãos de Guimarães Rosa, o português se tornou matéria-prima para uma obra que transcende qualquer convenção linguística.",
              "en": "In Guimarães Rosa's hands, Portuguese became raw material for a work that transcends any linguistic convention."
            },
            {
              "pt": "Ter maestria é poder escolher entre o coloquial e o erudito com a mesma naturalidade com que se respira.",
              "en": "Having mastery means being able to choose between the colloquial and the erudite as naturally as breathing."
            }
          ]
        },
        "dialogue": {
          "scene": "Sarah's final reflection, fully in Portuguese.",
          "lines": [
            {
              "sp": "a",
              "pt": "Há três anos, o português era um mistério. Hoje, é uma parte de quem eu sou.",
              "en": "Three years ago, Portuguese was a mystery. Today, it's a part of who I am."
            },
            {
              "sp": "b",
              "pt": "É isso que as línguas fazem. Não só nos permitem comunicar — nos transformam.",
              "en": "That's what languages do. They don't just allow us to communicate — they transform us."
            },
            {
              "sp": "a",
              "pt": "Aprendi que \"saudade\" não é só uma palavra. É uma forma de estar no mundo.",
              "en": "I learned that \"saudade\" isn't just a word. It's a way of being in the world."
            },
            {
              "sp": "b",
              "pt": "E o Brasil aprende contigo também. Cada pessoa que abraça nossa língua nos dá um presente.",
              "en": "And Brazil learns from you too. Every person who embraces our language gives us a gift."
            },
            {
              "sp": "a",
              "pt": "Obrigada, Marcos. Por tudo. Pela língua, pela cultura, pela amizade.",
              "en": "Thank you, Marcos. For everything. For the language, the culture, the friendship."
            }
          ]
        },
        "exercises": [
          {
            "type": "Multiple choice",
            "instruction": "Final C2 review.",
            "items": [
              {
                "q": "Literary pluperfect of \"ela tinha chegado\":",
                "opts": [
                  "Ela chegou",
                  "Ela chegara",
                  "Ela tinha chegado — both b and c correct in different registers"
                ],
                "ans": 1
              },
              {
                "q": "Mesoclisis of \"Eu vou lhe dizer\":",
                "opts": [
                  "Dir-lhe-ei",
                  "Direi-lhe",
                  "Dizer-lhe-ei"
                ],
                "ans": 0
              }
            ]
          }
        ],
        "culture": {
          "title": "Parabéns — you've completed C2! ⭐",
          "text": "You have completed the full Brazilian Portuguese curriculum from A1 to C2. This is a rare achievement. You now have access to the full richness of one of the world's great languages and cultures — 500 years of literature, music, cinema, theatre, philosophy, and human experience. Portuguese is the language of Camões and Clarice, of bossa nova and baile funk, of the Amazon and Ipanema, of saudade and alegria. Wherever you go in the Portuguese-speaking world, you carry this language — and it carries you. Muito obrigado/a. O Brasil é seu também."
        },
        "extraVocab": [
          {
            "pt": "a maestria",
            "en": "mastery",
            "ex": "A maestria linguística exige anos de imersão profunda na cultura.",
            "exEn": "Linguistic mastery requires years of deep immersion in the culture."
          },
          {
            "pt": "a fluência",
            "en": "fluency",
            "ex": "A fluência vai além da gramática correta; envolve nuance e intuição.",
            "exEn": "Fluency goes beyond correct grammar; it involves nuance and intuition."
          },
          {
            "pt": "o domínio",
            "en": "command / mastery (of a skill)",
            "ex": "O domínio pleno do subjuntivo distingue o falante avançado do nativo.",
            "exEn": "Full command of the subjunctive distinguishes the advanced speaker from the native one."
          },
          {
            "pt": "a sutileza",
            "en": "subtlety",
            "ex": "As sutilezas do português brasileiro escapam até aos gramáticos mais experientes.",
            "exEn": "The subtleties of Brazilian Portuguese escape even the most experienced grammarians."
          },
          {
            "pt": "a eloquência",
            "en": "eloquence",
            "ex": "Sua eloquência ao discursar emocionou a plateia inteira sem esforço aparente.",
            "exEn": "Her eloquence while speaking moved the entire audience with no apparent effort."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "É importante que ele faz isso agora.",
            "correct": "É importante que ele faça isso agora.",
            "note": "English speakers often use the indicative after conjunctions and impersonal expressions that require the subjunctive in Portuguese. At C2, mastering this distinction is non-negotiable."
          },
          {
            "wrong": "Apesar de estar cansado, mas ele continuou trabalhando.",
            "correct": "Apesar de estar cansado, ele continuou trabalhando.",
            "note": "'Apesar de' already carries a concessive meaning equivalent to 'although,' so adding 'mas' (but) is redundant and grammatically incorrect — a direct interference from English structure."
          },
          {
            "wrong": "Eu me sinto como se eu era um estranho naquele lugar.",
            "correct": "Eu me sentia como se fosse um estranho naquele lugar.",
            "note": "The expression 'como se' (as if) always triggers the imperfect subjunctive in Portuguese, whereas English speakers tend to use the indicative past tense by analogy with English."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct word or form.",
            "items": [
              {
                "q": "Fosse qual ___ o obstáculo, ela o enfrentaria com serenidade inabalável.",
                "ans": "fosse"
              },
              {
                "q": "O escritor redigiu o conto ___ que cada palavra tivesse peso e ressonância próprios.",
                "ans": "de modo"
              },
              {
                "q": "Por mais que ele ___ se expressar com clareza, as palavras pareciam insuficientes.",
                "ans": "tentasse"
              },
              {
                "q": "A língua, ___ nas mãos de quem a domina, torna-se instrumento de transformação social.",
                "ans": "sobretudo"
              },
              {
                "q": "Não há maestria ___ que não tenha passado por anos de erro consciente e revisão.",
                "ans": "alguma"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option to complete the sentence.",
            "items": [
              {
                "q": "Se ela ___ estudado com mais afinco, teria alcançado a fluência muito antes.",
                "opts": [
                  "tivesse",
                  "teve",
                  "tinha",
                  "tenha"
                ],
                "ans": 0
              },
              {
                "q": "O poeta escreveu seus versos ___ forma que desafiassem qualquer interpretação literal.",
                "opts": [
                  "de tal",
                  "com tal",
                  "em tal",
                  "por tal"
                ],
                "ans": 0
              },
              {
                "q": "Quanto mais ele lia os clássicos, ___ refinado se tornava seu estilo narrativo.",
                "opts": [
                  "mais",
                  "tanto",
                  "muito",
                  "tão"
                ],
                "ans": 0
              },
              {
                "q": "A maestria linguística pressupõe não apenas o conhecimento das regras, ___ também a sensibilidade para transgredi-las.",
                "opts": [
                  "mas",
                  "porém",
                  "contudo",
                  "todavia"
                ],
                "ans": 0
              },
              {
                "q": "Ela falava o português ___ que os próprios jornalistas a consultavam sobre uso idiomático.",
                "opts": [
                  "tão bem",
                  "muito bem",
                  "bem demais",
                  "bem assim"
                ],
                "ans": 0
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into Brazilian Portuguese.",
            "items": [
              {
                "q": "The more deeply one masters a language, the more one understands its silences.",
                "ans": "Quanto mais profundamente se domina uma língua, mais se compreende os seus silêncios."
              },
              {
                "q": "She wrote as if every word were the last one available to her.",
                "ans": "Ela escrevia como se cada palavra fosse a última à sua disposição."
              },
              {
                "q": "True eloquence lies not in saying everything, but in knowing what to leave unsaid.",
                "ans": "A verdadeira eloquência não está em dizer tudo, mas em saber o que deixar por dizer."
              },
              {
                "q": "Had he not immersed himself in Brazilian culture, his fluency would have remained superficial.",
                "ans": "Se ele não tivesse se imergido na cultura brasileira, sua fluência teria permanecido superficial."
              },
              {
                "q": "Language, when wielded with mastery, becomes an act of resistance and creation simultaneously.",
                "ans": "A língua, quando manejada com maestria, torna-se simultaneamente um ato de resistência e criação."
              }
            ]
          }
        ],
        "teacherTip": "At C2, encourage students to read Brazilian literary authors such as Clarice Lispector and Guimarães Rosa, whose deliberate subversion of grammatical norms is itself a demonstration of total mastery — showing students that true fluency means internalizing the rules deeply enough to transcend them with intention and elegance."
      }
    ]
  }
];
