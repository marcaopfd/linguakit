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
              "pt": "Eu sou Maria e sou brasileira.",
              "en": "I am Maria and I am Brazilian."
            },
            {
              "pt": "Eu sou João e sou engenheiro.",
              "en": "I am João and I am an engineer."
            },
            {
              "pt": "Eu sou Ana, sou professora e sou americana.",
              "en": "I am Ana, I am a teacher and I am American."
            },
            {
              "pt": "Eu sou Carlos e sou médico.",
              "en": "I am Carlos and I am a doctor."
            },
            {
              "pt": "Eu sou Sophie, sou francesa e sou estudante.",
              "en": "I am Sophie, I am French and I am a student."
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
            "pt": "tudo bem?",
            "en": "How are you? / Is everything okay?",
            "ex": "Tudo bem? Como vai?",
            "exEn": "How are you? How's it going?"
          },
          {
            "pt": "prazer",
            "en": "pleasure / nice to meet you",
            "ex": "Prazer em conhecê-lo!",
            "exEn": "Nice to meet you!"
          },
          {
            "pt": "até logo",
            "en": "see you later",
            "ex": "Tchau! Até logo!",
            "exEn": "Bye! See you later!"
          },
          {
            "pt": "bom dia",
            "en": "good morning",
            "ex": "Bom dia! Tudo bem?",
            "exEn": "Good morning! How are you?"
          },
          {
            "pt": "boa noite",
            "en": "good evening / good night",
            "ex": "Boa noite! Até amanhã.",
            "exEn": "Good evening! See you tomorrow."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Eu estou João.",
            "correct": "Eu sou João.",
            "note": "Use 'ser' (not 'estar') for permanent identity like names, nationalities, and professions. 'Estar' is for location and temporary states."
          },
          {
            "wrong": "Eu sou um professor.",
            "correct": "Eu sou professor.",
            "note": "In Brazilian Portuguese, we omit the article (um/uma) when stating professions after 'ser'. Say 'Sou professor' not 'Sou um professor.'"
          },
          {
            "wrong": "Eu sou inglês. Eu sou um inglês.",
            "correct": "Eu sou inglês.",
            "note": "Nationalities used as adjectives don't need the indefinite article. Only use 'um/uma' if emphasizing 'a person of that nationality' as a noun."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete with the correct form of 'ser' and the appropriate word.",
            "items": [
              {
                "q": "Olá! Eu ___ Lucas e ___ brasileira.",
                "ans": "sou, sou"
              },
              {
                "q": "Meu nome é Ana. Eu ___ professora.",
                "ans": "sou"
              },
              {
                "q": "Prazer! Eu ___ Pedro e ___ engenheiro.",
                "ans": "sou, sou"
              },
              {
                "q": "Tudo bem? Eu ___ italiana.",
                "ans": "sou"
              },
              {
                "q": "Eu ___ Sofia. Eu ___ estudante e ___ russa.",
                "ans": "sou, sou, sou"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option to complete the sentence.",
            "items": [
              {
                "q": "Eu sou ___ e sou médico.",
                "opts": [
                  "um nome",
                  "André",
                  "profissão",
                  "trabalho"
                ],
                "ans": 1
              },
              {
                "q": "___ sou João. ___ sou alemão.",
                "opts": [
                  "Estou, Estou",
                  "Sou, Sou",
                  "Sou, Estou",
                  "Estou, Sou"
                ],
                "ans": 1
              },
              {
                "q": "Qual opção completa corretamente? 'Eu sou ___ .'",
                "opts": [
                  "na escola",
                  "feliz hoje",
                  "dentista",
                  "aqui"
                ],
                "ans": 2
              },
              {
                "q": "Complete: 'Prazer em conhecê-lo! Eu ___ Sophie e ___ francesa.'",
                "opts": [
                  "estou, estou",
                  "sou, estou",
                  "sou, sou",
                  "estou, sou"
                ],
                "ans": 2
              },
              {
                "q": "Qual resposta é correta para 'Quem é você?'",
                "opts": [
                  "Eu estou um professor.",
                  "Eu sou um professor.",
                  "Eu sou professor.",
                  "Eu estou professor."
                ],
                "ans": 2
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the sentence into Brazilian Portuguese.",
            "items": [
              {
                "q": "Hello! I am Robert and I am American.",
                "ans": "Olá! Eu sou Robert e sou americano."
              },
              {
                "q": "I am a teacher.",
                "ans": "Eu sou professor. (or: Sou professor.)"
              },
              {
                "q": "Nice to meet you! I am German.",
                "ans": "Prazer em conhecê-lo! Eu sou alemão."
              },
              {
                "q": "Goodbye! See you later.",
                "ans": "Tchau! Até logo."
              },
              {
                "q": "I am Clara, I am a student and I am Brazilian.",
                "ans": "Eu sou Clara, sou estudante e sou brasileira."
              }
            ]
          }
        ],
        "teacherTip": "Reinforce the distinction between 'ser' and 'estar' by explicitly teaching that 'ser' describes who you are (identity, profession, nationality—permanent qualities), while 'estar' describes where you are or how you feel (temporary states). Use real student names and professions in examples to increase engagement and relevance."
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
              "pt": "Eu tenho 20 anos.",
              "en": "I am 20 years old."
            },
            {
              "pt": "Eu tenho 5 anos.",
              "en": "I am 5 years old."
            },
            {
              "pt": "Eu tenho 42 anos.",
              "en": "I am 42 years old."
            },
            {
              "pt": "Eu tenho 17 anos.",
              "en": "I am 17 years old."
            },
            {
              "pt": "Eu tenho 30 anos.",
              "en": "I am 30 years old."
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
            "pt": "anos",
            "en": "years (age)",
            "ex": "Eu tenho 25 anos.",
            "exEn": "I am 25 years old."
          },
          {
            "pt": "jovem",
            "en": "young",
            "ex": "Ele é muito jovem, tem apenas 10 anos.",
            "exEn": "He is very young, he is only 10 years old."
          },
          {
            "pt": "velho/velha",
            "en": "old",
            "ex": "Meu avó é velho, tem 80 anos.",
            "exEn": "My grandfather is old, he is 80 years old."
          },
          {
            "pt": "idade",
            "en": "age",
            "ex": "Qual é a sua idade?",
            "exEn": "What is your age?"
          },
          {
            "pt": "nascer",
            "en": "to be born",
            "ex": "Ela nasceu em 1995.",
            "exEn": "She was born in 1995."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Eu sou 25 anos.",
            "correct": "Eu tenho 25 anos.",
            "note": "In Portuguese, you 'have' age, not 'are' age. Use 'ter' (to have), not 'ser' (to be)."
          },
          {
            "wrong": "Eu tenho 25 de anos.",
            "correct": "Eu tenho 25 anos.",
            "note": "Do not use 'de' between the number and 'anos'. Say 'tenho 25 anos' directly."
          },
          {
            "wrong": "Ele tem 8 ano.",
            "correct": "Ele tem 8 anos.",
            "note": "Always use the plural 'anos' (years) even after numbers. 'Anos' is always plural in age expressions."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete with the correct word.",
            "items": [
              {
                "q": "Eu ___ 22 anos.",
                "ans": "tenho"
              },
              {
                "q": "Ela ___ 15 anos.",
                "ans": "tem"
              },
              {
                "q": "Nós ___ 30 anos.",
                "ans": "temos"
              },
              {
                "q": "Você ___ quantos anos?",
                "ans": "tem"
              },
              {
                "q": "Eles ___ 50 anos.",
                "ans": "têm"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option.",
            "items": [
              {
                "q": "How do you say 'I am 18 years old' in Portuguese?",
                "opts": [
                  "Eu sou 18 anos.",
                  "Eu tenho 18 anos.",
                  "Eu tenho 18 de anos.",
                  "Eu estou 18 anos."
                ],
                "ans": 1
              },
              {
                "q": "Which sentence is correct?",
                "opts": [
                  "Ela tem 7 ano.",
                  "Ela tem 7 anos.",
                  "Ela tenho 7 anos.",
                  "Ela é 7 anos."
                ],
                "ans": 1
              },
              {
                "q": "Complete: 'Meu irmão _____ 12 anos.'",
                "opts": [
                  "tem",
                  "tenho",
                  "temos",
                  "têm"
                ],
                "ans": 0
              },
              {
                "q": "Which is the correct way to ask someone's age?",
                "opts": [
                  "Você é quantos anos?",
                  "Você está quantos anos?",
                  "Você tem quantos anos?",
                  "Qual é seu ano?"
                ],
                "ans": 2
              },
              {
                "q": "Choose the correct form: 'Nós _____ 25 anos.'",
                "opts": [
                  "tenho",
                  "tem",
                  "temos",
                  "têm"
                ],
                "ans": 2
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the sentence into Portuguese.",
            "items": [
              {
                "q": "I am 16 years old.",
                "ans": "Eu tenho 16 anos."
              },
              {
                "q": "She is 28 years old.",
                "ans": "Ela tem 28 anos."
              },
              {
                "q": "How old are you?",
                "ans": "Você tem quantos anos? / Quantos anos você tem?"
              },
              {
                "q": "They are 35 years old.",
                "ans": "Eles têm 35 anos."
              },
              {
                "q": "My son is 11 years old.",
                "ans": "Meu filho tem 11 anos."
              }
            ]
          }
        ],
        "teacherTip": "Remind students that Portuguese uses 'ter' (to have) for age, not 'ser' (to be) like in English. This is a critical distinction for A1 learners. Practice conjugating 'ter' in present tense alongside age numbers to build confidence with both grammar and vocabulary."
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
              "pt": "Meu pai trabalha na empresa.",
              "en": "My father works at the company."
            },
            {
              "pt": "Minha mãe gosta de ler livros.",
              "en": "My mother likes to read books."
            },
            {
              "pt": "Meu irmão é mais velho que eu.",
              "en": "My brother is older than me."
            },
            {
              "pt": "Minha irmã estuda na universidade.",
              "en": "My sister studies at university."
            },
            {
              "pt": "Meu filho tem cinco anos.",
              "en": "My son is five years old."
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
            "ex": "Meu avô é muito velho.",
            "exEn": "My grandfather is very old."
          },
          {
            "pt": "avó",
            "en": "grandmother",
            "ex": "Minha avó faz um bolo delicioso.",
            "exEn": "My grandmother makes a delicious cake."
          },
          {
            "pt": "tio",
            "en": "uncle",
            "ex": "Meu tio mora em São Paulo.",
            "exEn": "My uncle lives in São Paulo."
          },
          {
            "pt": "tia",
            "en": "aunt",
            "ex": "Minha tia é médica.",
            "exEn": "My aunt is a doctor."
          },
          {
            "pt": "primo",
            "en": "cousin (male)",
            "ex": "Meu primo joga futebol.",
            "exEn": "My cousin plays football."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Meu mãe é professora.",
            "correct": "Minha mãe é professora.",
            "note": "The possessive must agree with the gender of the noun. 'Mãe' is feminine, so use 'minha' not 'meu'."
          },
          {
            "wrong": "Minha pai trabalha muito.",
            "correct": "Meu pai trabalha muito.",
            "note": "The possessive must agree with the gender of the noun. 'Pai' is masculine, so use 'meu' not 'minha'."
          },
          {
            "wrong": "Meu irmã é bonita.",
            "correct": "Minha irmã é bonita.",
            "note": "English speakers sometimes forget that Portuguese possessives change for the gender of the possessed object, not the possessor. 'Irmã' is feminine."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete with meu or minha.",
            "items": [
              {
                "q": "___ primo se chama João.",
                "ans": "Meu"
              },
              {
                "q": "___ avó faz sopa deliciosa.",
                "ans": "Minha"
              },
              {
                "q": "___ tio mora perto de aqui.",
                "ans": "Meu"
              },
              {
                "q": "___ prima estuda medicina.",
                "ans": "Minha"
              },
              {
                "q": "___ avô é aposentado.",
                "ans": "Meu"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option.",
            "items": [
              {
                "q": "Qual é a frase correta?",
                "opts": [
                  "Meu irmã é inteligente.",
                  "Minha irmã é inteligente.",
                  "Meu irmã são inteligente.",
                  "Minha irmã são inteligente."
                ],
                "ans": 1
              },
              {
                "q": "Qual é a frase correta?",
                "opts": [
                  "Minha pai trabalha na escola.",
                  "Meu pai trabalha na escola.",
                  "Minha pai trabalham na escola.",
                  "Meu pai trabalham na escola."
                ],
                "ans": 1
              },
              {
                "q": "Qual é a frase correta?",
                "opts": [
                  "Meu tia é professora.",
                  "Minha tia é professora.",
                  "Meu tia é professoras.",
                  "Minha tia são professora."
                ],
                "ans": 1
              },
              {
                "q": "Qual é a frase correta?",
                "opts": [
                  "Minha primo joga futebol.",
                  "Meu primo joga futebol.",
                  "Minha primo jogam futebol.",
                  "Meu primo jogam futebol."
                ],
                "ans": 1
              },
              {
                "q": "Qual é a frase correta?",
                "opts": [
                  "Meu filha tem dez anos.",
                  "Minha filha tem dez anos.",
                  "Meu filhas tem dez anos.",
                  "Minha filha têm dez anos."
                ],
                "ans": 1
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the sentence into Portuguese.",
            "items": [
              {
                "q": "My sister is kind.",
                "ans": "Minha irmã é gentil."
              },
              {
                "q": "My uncle is tall.",
                "ans": "Meu tio é alto."
              },
              {
                "q": "My grandmother likes coffee.",
                "ans": "Minha avó gosta de café."
              },
              {
                "q": "My son is at home.",
                "ans": "Meu filho está em casa."
              },
              {
                "q": "My cousin studies English.",
                "ans": "Meu primo estuda inglês. (or Minha prima estuda inglês.)"
              }
            ]
          }
        ],
        "teacherTip": "Emphasize that the possessive (meu/minha) agrees with the gender of the noun being possessed, NOT the gender of the person who possesses it. Use color-coding or gesture to reinforce: point to a feminine noun and say 'minha' with exaggerated feminine pronunciation."
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
              "pt": "O carro vermelho é rápido.",
              "en": "The red car is fast."
            },
            {
              "pt": "A casa branca é grande.",
              "en": "The white house is big."
            },
            {
              "pt": "O livro azul é interessante.",
              "en": "The blue book is interesting."
            },
            {
              "pt": "A blusa amarela é bonita.",
              "en": "The yellow blouse is pretty."
            },
            {
              "pt": "O gato preto é pequeno.",
              "en": "The black cat is small."
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
            "en": "light/clear",
            "ex": "O céu é claro.",
            "exEn": "The sky is clear."
          },
          {
            "pt": "escuro",
            "en": "dark",
            "ex": "A noite é escura.",
            "exEn": "The night is dark."
          },
          {
            "pt": "brilhante",
            "en": "bright/shiny",
            "ex": "O sol é brilhante.",
            "exEn": "The sun is bright."
          },
          {
            "pt": "vivo",
            "en": "vivid/bright (color)",
            "ex": "A flor é viva.",
            "exEn": "The flower is vivid."
          },
          {
            "pt": "pálido",
            "en": "pale",
            "ex": "A lua é pálida.",
            "exEn": "The moon is pale."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "A casa branco é bonita.",
            "correct": "A casa branca é bonita.",
            "note": "Adjectives must agree in gender with the noun. Feminine nouns require the -a ending."
          },
          {
            "wrong": "O carro vermelho é rapida.",
            "correct": "O carro vermelho é rápido.",
            "note": "When describing a masculine noun, the adjective must also be masculine (-o ending), even if another adjective is feminine."
          },
          {
            "wrong": "A porta azulo é grande.",
            "correct": "A porta azul é grande.",
            "note": "Some adjectives ending in -l don't change for gender (azul remains azul for both masculine and feminine nouns)."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete with the correct adjective form (masculine -o or feminine -a).",
            "items": [
              {
                "q": "O sofá é ___ (preto).",
                "ans": "preto"
              },
              {
                "q": "A mesa é ___ (redondo).",
                "ans": "redonda"
              },
              {
                "q": "O pão é ___ (quente).",
                "ans": "quente"
              },
              {
                "q": "A maçã é ___ (vermelho).",
                "ans": "vermelha"
              },
              {
                "q": "O caderno é ___ (novo).",
                "ans": "novo"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option.",
            "items": [
              {
                "q": "A blusa ___ é nova.",
                "opts": [
                  "rosa",
                  "rosado",
                  "rosada",
                  "rosos"
                ],
                "ans": 0
              },
              {
                "q": "O sapato ___ é caro.",
                "opts": [
                  "marrom",
                  "marroma",
                  "marrome",
                  "marromd"
                ],
                "ans": 0
              },
              {
                "q": "A flor é ___.",
                "opts": [
                  "belo",
                  "bela",
                  "belim",
                  "beles"
                ],
                "ans": 1
              },
              {
                "q": "O espelho é ___.",
                "opts": [
                  "limpas",
                  "limpa",
                  "limpo",
                  "limpão"
                ],
                "ans": 2
              },
              {
                "q": "A parede é ___ e ___.",
                "opts": [
                  "branco e limpo",
                  "branca e limpa",
                  "brancos e limpos",
                  "brancas e limpas"
                ],
                "ans": 1
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the sentence into Brazilian Portuguese.",
            "items": [
              {
                "q": "The red apple is delicious.",
                "ans": "A maçã vermelha é deliciosa."
              },
              {
                "q": "The green ball is round.",
                "ans": "A bola verde é redonda."
              },
              {
                "q": "The black dog is small.",
                "ans": "O cachorro preto é pequeno."
              },
              {
                "q": "The yellow car is fast.",
                "ans": "O carro amarelo é rápido."
              },
              {
                "q": "The white shirt is clean.",
                "ans": "A camisa branca é limpa."
              }
            ]
          }
        ],
        "teacherTip": "Encourage students to notice that adjectives in Portuguese must always match the gender of the noun they describe—this is different from English. Use color flashcards with masculine and feminine nouns together to reinforce that every adjective has two forms."
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
              "pt": "Segunda-feira é o primeiro dia da semana no Brasil.",
              "en": "Monday is the first day of the week in Brazil."
            },
            {
              "pt": "Terça-feira tenho aula de português.",
              "en": "On Tuesday I have a Portuguese class."
            },
            {
              "pt": "Quarta-feira é meio da semana.",
              "en": "Wednesday is the middle of the week."
            },
            {
              "pt": "Quinta-feira vou ao cinema com amigos.",
              "en": "On Thursday I'm going to the cinema with friends."
            },
            {
              "pt": "Sexta-feira à noite é melhor dia para sair.",
              "en": "Friday night is the best day to go out."
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
            "pt": "fim de semana",
            "en": "weekend",
            "ex": "No fim de semana, eu durmo mais.",
            "exEn": "On the weekend, I sleep more."
          },
          {
            "pt": "semana",
            "en": "week",
            "ex": "Esta semana tem sete dias.",
            "exEn": "This week has seven days."
          },
          {
            "pt": "dia da semana",
            "en": "weekday",
            "ex": "Segunda é um dia da semana.",
            "exEn": "Monday is a weekday."
          },
          {
            "pt": "madrugada",
            "en": "early morning / dawn",
            "ex": "Ele acorda na madrugada.",
            "exEn": "He wakes up in the early morning."
          },
          {
            "pt": "próximo/próxima",
            "en": "next",
            "ex": "Próxima terça-feira tem reunião.",
            "exEn": "Next Tuesday there's a meeting."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Segunda, terça, quarta, quinta, sexta (without -feira)",
            "correct": "Segunda-feira, terça-feira, quarta-feira, quinta-feira, sexta-feira",
            "note": "The word 'feira' (market/fair day) is always required in Brazilian Portuguese. Days are not standalone nouns."
          },
          {
            "wrong": "Segunda-feira é meu dia favorito.",
            "correct": "Terça-feira é meu dia favorito. (or) Segunda-feira é meu dia favorito.",
            "note": "English speakers often capitalize day names like in English, but in Portuguese only the first word of a sentence is capitalized—day names are lowercase unless they start a sentence."
          },
          {
            "wrong": "Na quinta-feira eu vou à praia. (present tense used for future)",
            "correct": "Na quinta-feira, eu vou à praia.",
            "en": "On Thursday, I will go to the beach. (use 'vou' for planned future actions)",
            "note": "While the present tense can express near future in Portuguese, beginners should be consistent. The simple present here works, but clarity comes from context."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct day of the week in Brazilian Portuguese.",
            "items": [
              {
                "q": "Hoje é ___, então amanhã é terça-feira.",
                "ans": "segunda-feira"
              },
              {
                "q": "Eu trabalho de segunda até ___.",
                "ans": "sexta-feira"
              },
              {
                "q": "___ é o dia entre quarta e sexta.",
                "ans": "quinta-feira"
              },
              {
                "q": "A aula de dança é na ___ à noite.",
                "ans": "quarta-feira"
              },
              {
                "q": "Próxima ___ tem jogo de futebol.",
                "ans": "terça-feira"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct Brazilian Portuguese option.",
            "items": [
              {
                "q": "What day comes after quarta-feira?",
                "opts": [
                  "terça-feira",
                  "quinta-feira",
                  "sexta-feira",
                  "segunda-feira"
                ],
                "ans": 1
              },
              {
                "q": "Which phrase is correct?",
                "opts": [
                  "Eu vou segunda",
                  "Eu vou na segunda-feira",
                  "Eu vou a segunda",
                  "Eu vou segundo-feira"
                ],
                "ans": 1
              },
              {
                "q": "Which day is NOT a workday in most of Brazil?",
                "opts": [
                  "segunda-feira",
                  "quarta-feira",
                  "sábado",
                  "quinta-feira"
                ],
                "ans": 2
              },
              {
                "q": "How do you say 'on Friday' in Brazilian Portuguese?",
                "opts": [
                  "em sexta",
                  "na sexta-feira",
                  "o sexta-feira",
                  "sexta dia"
                ],
                "ans": 1
              },
              {
                "q": "Which is the correct order?",
                "opts": [
                  "segunda, terça, quarta, quinta, sexta, sábado, domingo",
                  "segunda-feira, terça-feira, quarta-feira, quinta-feira, sexta-feira, sábado, domingo",
                  "Both A and B are correct",
                  "segunda, terça-feira, quarta, quinta-feira, sexta"
                ],
                "ans": 1
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the sentence into Brazilian Portuguese.",
            "items": [
              {
                "q": "I work on Monday and Tuesday.",
                "ans": "Eu trabalho na segunda-feira e na terça-feira."
              },
              {
                "q": "On Wednesday, we have class.",
                "ans": "Na quarta-feira, nós temos aula."
              },
              {
                "q": "Thursday is my favorite day.",
                "ans": "Quinta-feira é meu dia favorito."
              },
              {
                "q": "Next Friday I'm going to the party.",
                "ans": "Próxima sexta-feira vou à festa."
              },
              {
                "q": "The week starts on Monday in Brazil.",
                "ans": "A semana começa na segunda-feira no Brasil."
              }
            ]
          }
        ],
        "teacherTip": "Emphasize that in Brazilian Portuguese, days of the week (segunda through sexta) always require the word 'feira' attached, making them compound nouns—this is unique to Portuguese! Practice the pattern 'na [day]-feira' for expressing 'on [day]' to help students internalize the preposition + definite article combination."
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
              "pt": "Eu gosto de comer arroz com feijão.",
              "en": "I like eating rice with beans."
            },
            {
              "pt": "Eu gosto de café quente.",
              "en": "I like hot coffee."
            },
            {
              "pt": "Eu gosto de cozinhar na cozinha.",
              "en": "I like cooking in the kitchen."
            },
            {
              "pt": "Eu gosto de pizza com queijo.",
              "en": "I like pizza with cheese."
            },
            {
              "pt": "Eu gosto de frutas frescas.",
              "en": "I like fresh fruits."
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
            "pt": "a sobremesa",
            "en": "dessert",
            "ex": "Eu gosto de sobremesa de chocolate.",
            "exEn": "I like chocolate dessert."
          },
          {
            "pt": "o lanche",
            "en": "snack",
            "ex": "Eu gosto de comer um lanche à tarde.",
            "exEn": "I like eating a snack in the afternoon."
          },
          {
            "pt": "a bebida",
            "en": "drink",
            "ex": "Eu gosto de bebida fria.",
            "exEn": "I like cold drinks."
          },
          {
            "pt": "o tempero",
            "en": "seasoning/spice",
            "ex": "Eu gosto de comida com muito tempero.",
            "exEn": "I like food with a lot of seasoning."
          },
          {
            "pt": "a refeição",
            "en": "meal",
            "ex": "Eu gosto de uma boa refeição no almoço.",
            "exEn": "I like a good meal at lunch."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Eu gosto comer arroz.",
            "correct": "Eu gosto de comer arroz.",
            "note": "The preposition 'de' is mandatory in Portuguese after 'gostar' — do not omit it."
          },
          {
            "wrong": "Eu gosto de o pão.",
            "correct": "Eu gosto de pão.",
            "note": "Do not use the article 'o' after 'gostar de' with uncountable nouns; 'pão' (bread) doesn't need an article here."
          },
          {
            "wrong": "Eu gosto a comida.",
            "correct": "Eu gosto de comida.",
            "note": "English speakers sometimes use 'a' instead of 'de'; in Brazilian Portuguese, 'gostar' always takes the preposition 'de', not 'a'."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete with the correct word or phrase.",
            "items": [
              {
                "q": "Eu gosto ___ leite com açúcar.",
                "ans": "de"
              },
              {
                "q": "Eu gosto de ___ na escola.",
                "ans": "almoçar"
              },
              {
                "q": "Eu gosto ___ frutas vermelhas.",
                "ans": "de"
              },
              {
                "q": "Ela gosto de ___ no fim de semana.",
                "ans": "cozinhar"
              },
              {
                "q": "Nós gostamos de ___ saudável.",
                "ans": "comida"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option.",
            "items": [
              {
                "q": "Qual frase está correta?",
                "opts": [
                  "Eu gosto comer bolo.",
                  "Eu gosto de comer bolo.",
                  "Eu gosto para comer bolo.",
                  "Eu gosto a comer bolo."
                ],
                "ans": 1
              },
              {
                "q": "Como você diz 'I like pasta'?",
                "opts": [
                  "Eu gosto a massa.",
                  "Eu gosto de massa.",
                  "Eu gosto massa.",
                  "Eu gosto para massa."
                ],
                "ans": 1
              },
              {
                "q": "Qual sentença completa a ideia corretamente?",
                "opts": [
                  "Meu amigo gosta de brócolis.",
                  "Meu amigo gosto de brócolis.",
                  "Meu amigo gostam de brócolis.",
                  "Meu amigo gostar de brócolis."
                ],
                "ans": 0
              },
              {
                "q": "Como se diz 'They like drinking water'?",
                "opts": [
                  "Eles gostam beber água.",
                  "Eles gostam de beber água.",
                  "Eles gostam à beber água.",
                  "Eles gostam de a beber água."
                ],
                "ans": 1
              },
              {
                "q": "Qual alternativa está errada?",
                "opts": [
                  "Eu gosto de sorvete.",
                  "Ela gosta de pizza.",
                  "Nós gostamos de salada.",
                  "Você gostam de fruta."
                ],
                "ans": 3
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the sentence into Brazilian Portuguese.",
            "items": [
              {
                "q": "I like eating chicken.",
                "ans": "Eu gosto de comer frango."
              },
              {
                "q": "Do you like rice and beans?",
                "ans": "Você gosta de arroz e feijão?"
              },
              {
                "q": "She likes to cook.",
                "ans": "Ela gosta de cozinhar."
              },
              {
                "q": "We like fresh juice.",
                "ans": "Nós gostamos de suco fresco."
              },
              {
                "q": "They like sweet desserts.",
                "ans": "Eles gostam de sobremesas doces."
              }
            ]
          }
        ],
        "teacherTip": "Emphasize that the preposition 'de' is non-negotiable after 'gostar' in Brazilian Portuguese — this is a frequent error for English speakers who might skip it. Encourage students to practice with both nouns and infinitives (e.g., 'gosto de pizza' vs. 'gosto de comer pizza') to build confidence with this pattern."
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
              "pt": "A escola fica no centro da cidade.",
              "en": "The school is located in the city center."
            },
            {
              "pt": "O banco fica entre a padaria e a loja.",
              "en": "The bank is located between the bakery and the store."
            },
            {
              "pt": "A praça fica perto da igreja.",
              "en": "The square is located near the church."
            },
            {
              "pt": "O restaurante fica na Avenida Paulista.",
              "en": "The restaurant is located on Avenida Paulista."
            },
            {
              "pt": "A livraria fica longe daqui.",
              "en": "The bookstore is located far from here."
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
            "pt": "a estação",
            "en": "the station",
            "ex": "A estação fica perto de aqui.",
            "exEn": "The station is close to here."
          },
          {
            "pt": "o aeroporto",
            "en": "the airport",
            "ex": "O aeroporto fica longe da cidade.",
            "exEn": "The airport is far from the city."
          },
          {
            "pt": "a parada de ônibus",
            "en": "the bus stop",
            "ex": "A parada de ônibus fica na rua principal.",
            "exEn": "The bus stop is on the main street."
          },
          {
            "pt": "o metrô",
            "en": "the subway/metro",
            "ex": "O metrô fica embaixo da cidade.",
            "exEn": "The metro is underground in the city."
          },
          {
            "pt": "a farmácia",
            "en": "the pharmacy",
            "ex": "A farmácia fica ao lado do hospital.",
            "exEn": "The pharmacy is next to the hospital."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "O cinema é perto da estação.",
            "correct": "O cinema fica perto da estação.",
            "note": "Use 'fica' for location, not 'é'. The verb 'ser' describes what something is, while 'ficar' describes where something is located."
          },
          {
            "wrong": "A loja fica em a rua.",
            "correct": "A loja fica na rua.",
            "note": "Use 'na' (em + a) instead of 'em a'. In Brazilian Portuguese, contractions are essential."
          },
          {
            "wrong": "O hospital ficar longe.",
            "correct": "O hospital fica longe.",
            "note": "Use the conjugated form 'fica' (3rd person singular), not the infinitive 'ficar' when speaking about one place."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete with the correct word.",
            "items": [
              {
                "q": "O museu ___ no bairro antigo.",
                "ans": "fica"
              },
              {
                "q": "A pizzaria ___ perto do parque.",
                "ans": "fica"
              },
              {
                "q": "O supermercado ___ longe daqui.",
                "ans": "fica"
              },
              {
                "q": "A biblioteca ___ ao lado da escola.",
                "ans": "fica"
              },
              {
                "q": "O hotel ___ na rua principal.",
                "ans": "fica"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option.",
            "items": [
              {
                "q": "Onde ___ a estação de trem?",
                "opts": [
                  "fica",
                  "é",
                  "está",
                  "tem"
                ],
                "ans": 0
              },
              {
                "q": "O restaurante ___ entre a farmácia e o banco.",
                "opts": [
                  "é",
                  "fica",
                  "está",
                  "ser"
                ],
                "ans": 1
              },
              {
                "q": "A parada de ônibus ___ perto de aqui.",
                "opts": [
                  "ficar",
                  "fica",
                  "ficou",
                  "é"
                ],
                "ans": 1
              },
              {
                "q": "Qual lugar ___ longe da sua casa?",
                "opts": [
                  "ficam",
                  "fica",
                  "é",
                  "está"
                ],
                "ans": 1
              },
              {
                "q": "A escola ___ no centro da cidade.",
                "opts": [
                  "ser",
                  "ficando",
                  "fica",
                  "está"
                ],
                "ans": 2
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the sentence into Portuguese.",
            "items": [
              {
                "q": "The hospital is located far from here.",
                "ans": "O hospital fica longe daqui."
              },
              {
                "q": "The bus stop is near the station.",
                "ans": "A parada de ônibus fica perto da estação."
              },
              {
                "q": "The pharmacy is between the bakery and the store.",
                "ans": "A farmácia fica entre a padaria e a loja."
              },
              {
                "q": "Where is the airport located?",
                "ans": "Onde fica o aeroporto?"
              },
              {
                "q": "The museum is located in the old neighborhood.",
                "ans": "O museu fica no bairro antigo."
              }
            ]
          }
        ],
        "teacherTip": "Emphasize that 'fica' is specifically about location while 'é' describes characteristics. Use physical gestures and point to items in the classroom to help students internalize the difference between 'onde fica?' (where is it located?) and 'o que é?' (what is it?)."
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
              "pt": "O livro está R$ 45 reais.",
              "en": "The book is 45 reais."
            },
            {
              "pt": "A blusa está em promoção.",
              "en": "The blouse is on sale."
            },
            {
              "pt": "Estou sem dinheiro agora.",
              "en": "I am without money right now."
            },
            {
              "pt": "Os sapatos estão lindos e estou feliz com a compra.",
              "en": "The shoes are beautiful and I am happy with the purchase."
            },
            {
              "pt": "Estou cansada de comprar, mas a bolsa está perfeita.",
              "en": "I am tired of shopping, but the bag is perfect."
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
            "pt": "caro",
            "en": "expensive",
            "ex": "Este produto está muito caro.",
            "exEn": "This product is very expensive."
          },
          {
            "pt": "barato",
            "en": "cheap",
            "ex": "A roupa está barata na promoção.",
            "exEn": "The clothes are cheap on sale."
          },
          {
            "pt": "desconto",
            "en": "discount",
            "ex": "Tem desconto de 20% nesta loja.",
            "exEn": "There is a 20% discount in this store."
          },
          {
            "pt": "troco",
            "en": "change (money back)",
            "ex": "Quanto é o meu troco?",
            "exEn": "What is my change?"
          },
          {
            "pt": "carteira",
            "en": "wallet",
            "ex": "Minha carteira está vazia.",
            "exEn": "My wallet is empty."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Eu sou caro.",
            "correct": "Eu estou feliz.",
            "note": "Use 'estar' for temporary feelings and states, not 'ser'. 'Ser' is for permanent characteristics."
          },
          {
            "wrong": "O preço é R$ 30.",
            "correct": "O preço está R$ 30.",
            "note": "Use 'estar' for prices, which are temporary and can change. This is a key A1 distinction."
          },
          {
            "wrong": "Estou caro.",
            "correct": "Estou feliz / O produto está caro.",
            "note": "Use 'estar' + adjective for feelings with people ('estou feliz') and for temporary states of objects ('está caro')."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete with 'está' or 'estou'.",
            "items": [
              {
                "q": "O notebook ___ R$ 2.500 reais.",
                "ans": "está"
              },
              {
                "q": "Eu ___ muito feliz com minha compra.",
                "ans": "estou"
              },
              {
                "q": "A camiseta ___ barata nessa loja.",
                "ans": "está"
              },
              {
                "q": "Meu amigo ___ cansado de comprar.",
                "ans": "está"
              },
              {
                "q": "O desconto ___ de 50% nesta semana.",
                "ans": "está"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option.",
            "items": [
              {
                "q": "Como você ___ com o preço do produto?",
                "opts": [
                  "está",
                  "estou",
                  "sou",
                  "somos"
                ],
                "ans": 1
              },
              {
                "q": "O pão ___ R$ 5 reais cada um.",
                "opts": [
                  "sou",
                  "é",
                  "está",
                  "estou"
                ],
                "ans": 2
              },
              {
                "q": "Nós ___ muito cansados depois de comprar.",
                "opts": [
                  "estamos",
                  "somos",
                  "sois",
                  "estão"
                ],
                "ans": 0
              },
              {
                "q": "A blusa ___ em promoção agora.",
                "opts": [
                  "é",
                  "sou",
                  "está",
                  "somos"
                ],
                "ans": 2
              },
              {
                "q": "Eu ___ sem dinheiro na carteira.",
                "opts": [
                  "sou",
                  "é",
                  "estou",
                  "está"
                ],
                "ans": 2
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the sentence into Portuguese.",
            "items": [
              {
                "q": "The shoes are expensive.",
                "ans": "Os sapatos estão caros."
              },
              {
                "q": "I am happy with the discount.",
                "ans": "Estou feliz com o desconto."
              },
              {
                "q": "The shirt is on sale.",
                "ans": "A camiseta está em promoção."
              },
              {
                "q": "We are tired and the prices are high.",
                "ans": "Estamos cansados e os preços estão altos."
              },
              {
                "q": "How much is the book?",
                "ans": "Quanto está o livro? / O livro está quanto?"
              }
            ]
          }
        ],
        "teacherTip": "Reinforce that 'estar' describes temporary conditions (prices fluctuate, feelings change) while 'ser' describes permanent identity. Use real shopping scenarios and price comparisons to cement the estar + price pattern in students' minds."
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
              "pt": "Está chovendo forte.",
              "en": "It's raining hard."
            },
            {
              "pt": "Está fazendo calor nesta semana.",
              "en": "It's hot this week."
            },
            {
              "pt": "Está ficando frio à noite.",
              "en": "It's getting cold at night."
            },
            {
              "pt": "Está ventando muito no outono.",
              "en": "It's very windy in autumn."
            },
            {
              "pt": "Está nevando nas montanhas.",
              "en": "It's snowing in the mountains."
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
            "pt": "ensolarado",
            "en": "sunny",
            "ex": "Hoje está ensolarado.",
            "exEn": "Today is sunny."
          },
          {
            "pt": "nublado",
            "en": "cloudy",
            "ex": "O céu está nublado.",
            "exEn": "The sky is cloudy."
          },
          {
            "pt": "úmido",
            "en": "humid",
            "ex": "Está muito úmido no verão.",
            "exEn": "It's very humid in summer."
          },
          {
            "pt": "gelado",
            "en": "freezing cold",
            "ex": "No inverno está gelado.",
            "exEn": "In winter it's freezing cold."
          },
          {
            "pt": "abafado",
            "en": "muggy/stuffy",
            "ex": "Está abafado hoje.",
            "exEn": "It's muggy today."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "O tempo é quente.",
            "correct": "Está quente.",
            "note": "Use 'estar' for current weather conditions, not 'ser'. 'Ser' describes permanent characteristics."
          },
          {
            "wrong": "Está chovendo chuva.",
            "correct": "Está chovendo.",
            "note": "The verb 'chover' already means 'to rain'. Don't add 'chuva' (rain) after it; that's redundant."
          },
          {
            "wrong": "Está nublada hoje.",
            "correct": "Está nublado hoje.",
            "note": "Weather adjectives in Portuguese use masculine form (nublado, quente, frio) even when referring to neutral weather, not the sky's gender."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete with the correct form of estar + weather adjective or verb.",
            "items": [
              {
                "q": "No verão, ___ muito quente.",
                "ans": "está"
              },
              {
                "q": "Hoje ___ chovendo à noite.",
                "ans": "está"
              },
              {
                "q": "A primavera ___ começando.",
                "ans": "está"
              },
              {
                "q": "No inverno ___ gelado e escuro.",
                "ans": "está"
              },
              {
                "q": "Agora ___ fazendo sol.",
                "ans": "está"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option.",
            "items": [
              {
                "q": "Como está o tempo hoje?",
                "opts": [
                  "Está nublado e fresco.",
                  "O tempo é nublado.",
                  "Está nublada e fresca.",
                  "O tempo está sendo nublado."
                ],
                "ans": 0
              },
              {
                "q": "O que está acontecendo agora?",
                "opts": [
                  "Está ventando muito.",
                  "Venta muito.",
                  "Está ventada.",
                  "O vento está."
                ],
                "ans": 0
              },
              {
                "q": "Em qual estação está chovendo bastante?",
                "opts": [
                  "Na estação de verão.",
                  "Na estação de outono.",
                  "Na estação gelada.",
                  "Na estação quente."
                ],
                "ans": 1
              },
              {
                "q": "Qual frase está correta?",
                "opts": [
                  "Está nevando na montanha.",
                  "Neva na montanha.",
                  "A neve está na montanha.",
                  "Está nevação."
                ],
                "ans": 0
              },
              {
                "q": "Como você descreve o clima agora?",
                "opts": [
                  "O clima é úmido.",
                  "Está úmido demais.",
                  "Está um clima úmido.",
                  "O clima está úmido e faz calor."
                ],
                "ans": 1
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the sentence into Brazilian Portuguese.",
            "items": [
              {
                "q": "It's windy outside.",
                "ans": "Está ventando lá fora."
              },
              {
                "q": "Summer is hot and humid.",
                "ans": "O verão está quente e úmido."
              },
              {
                "q": "It's getting cold at night.",
                "ans": "Está ficando frio à noite."
              },
              {
                "q": "Is it raining where you are?",
                "ans": "Está chovendo onde você está?"
              },
              {
                "q": "The weather is beautiful today.",
                "ans": "Está um tempo lindo hoje. / O tempo está lindo hoje."
              }
            ]
          }
        ],
        "teacherTip": "Emphasize that 'estar' is used for temporary, changeable weather conditions, while 'ser' describes climate patterns or seasonal norms. Practice the gerund forms (-ando/-endo) since they're crucial for describing ongoing weather: está chovendo, está fazendo calor, está nevando."
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
              "pt": "Eu trabalho em um escritório.",
              "en": "I work in an office."
            },
            {
              "pt": "Você trabalha com computadores?",
              "en": "Do you work with computers?"
            },
            {
              "pt": "Ela trabalha como professora.",
              "en": "She works as a teacher."
            },
            {
              "pt": "Nós trabalhamos juntos todos os dias.",
              "en": "We work together every day."
            },
            {
              "pt": "Eles trabalham muito.",
              "en": "They work a lot."
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
            "ex": "Eu acordo às 7 da manhã.",
            "exEn": "I wake up at 7 in the morning."
          },
          {
            "pt": "almoçar",
            "en": "to have lunch",
            "ex": "Nós almoçamos ao meio-dia.",
            "exEn": "We have lunch at noon."
          },
          {
            "pt": "descansar",
            "en": "to rest",
            "ex": "Ela descansa depois do trabalho.",
            "exEn": "She rests after work."
          },
          {
            "pt": "estudar",
            "en": "to study",
            "ex": "Eles estudam à noite.",
            "exEn": "They study at night."
          },
          {
            "pt": "jantar",
            "en": "to have dinner",
            "ex": "A gente janta às 19h.",
            "exEn": "We have dinner at 7 PM."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Eu trabalho em casa. Você trabalham em casa?",
            "correct": "Eu trabalho em casa. Você trabalha em casa?",
            "note": "English speakers sometimes forget that 'você' (you singular) uses the 3rd person singular verb form, not plural. Use 'trabalha', not 'trabalham'."
          },
          {
            "wrong": "Nós trabalhamos no escritório. Nós trabalhamos muito.",
            "correct": "A gente trabalha no escritório. A gente trabalha muito.",
            "note": "In Brazilian Portuguese, 'a gente' (we/people) is more common than 'nós' in conversation and uses the 3rd person singular form 'trabalha', not 'trabalhamos'."
          },
          {
            "wrong": "Ela trabalho como enfermeira.",
            "correct": "Ela trabalha como enfermeira.",
            "note": "3rd person singular (ela/he/she/it) requires the '-a' ending: 'trabalha', not 'trabalho'."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete with the correct form of 'trabalhar' in the present tense.",
            "items": [
              {
                "q": "Eu ___ como engenheiro.",
                "ans": "trabalho"
              },
              {
                "q": "Minha mãe ___ em um hospital.",
                "ans": "trabalha"
              },
              {
                "q": "Nós ___ oito horas por dia.",
                "ans": "trabalhamos"
              },
              {
                "q": "Você ___ no fim de semana?",
                "ans": "trabalha"
              },
              {
                "q": "Meus pais ___ no comércio.",
                "ans": "trabalham"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option to complete the sentence.",
            "items": [
              {
                "q": "Ele ___ em uma escola.",
                "opts": [
                  "trabalhamos",
                  "trabalham",
                  "trabalha",
                  "trabalho"
                ],
                "ans": 2
              },
              {
                "q": "A gente ___ de segunda a sexta.",
                "opts": [
                  "trabalha",
                  "trabalhamos",
                  "trabalham",
                  "trabalho"
                ],
                "ans": 0
              },
              {
                "q": "Vocês ___ à noite?",
                "opts": [
                  "trabalha",
                  "trabalho",
                  "trabalhamos",
                  "trabalham"
                ],
                "ans": 3
              },
              {
                "q": "Eu ___ perto de casa.",
                "opts": [
                  "trabalha",
                  "trabalho",
                  "trabalhamos",
                  "trabalham"
                ],
                "ans": 1
              },
              {
                "q": "Eles ___ em um restaurante.",
                "opts": [
                  "trabalho",
                  "trabalha",
                  "trabalhamos",
                  "trabalham"
                ],
                "ans": 3
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the sentence into Brazilian Portuguese.",
            "items": [
              {
                "q": "I work every day.",
                "ans": "Eu trabalho todos os dias."
              },
              {
                "q": "She works as a doctor.",
                "ans": "Ela trabalha como médica."
              },
              {
                "q": "We work together.",
                "ans": "Nós trabalhamos juntos. / A gente trabalha junto."
              },
              {
                "q": "They work in the morning.",
                "ans": "Eles trabalham pela manhã."
              },
              {
                "q": "Do you work here?",
                "ans": "Você trabalha aqui?"
              }
            ]
          }
        ],
        "teacherTip": "In Brazilian Portuguese, 'a gente' (we) is much more common in daily conversation than 'nós' and uses the 3rd person singular verb form. Encourage students to use 'a gente trabalha' instead of 'nós trabalhamos' for authentic speech patterns."
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
              "pt": "Estou com gripe.",
              "en": "I have the flu."
            },
            {
              "pt": "Ele está com dor de garganta.",
              "en": "He has a sore throat."
            },
            {
              "pt": "Ela está com dor nas costas.",
              "en": "She has back pain."
            },
            {
              "pt": "Eles estão com náusea.",
              "en": "They feel nauseous."
            },
            {
              "pt": "Você está com alergia?",
              "en": "Do you have an allergy?"
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
            "pt": "dor de cabeça",
            "en": "headache",
            "ex": "Estou com dor de cabeça.",
            "exEn": "I have a headache."
          },
          {
            "pt": "febre",
            "en": "fever",
            "ex": "Ele está com febre alta.",
            "exEn": "He has a high fever."
          },
          {
            "pt": "tosse",
            "en": "cough",
            "ex": "Ela está com tosse.",
            "exEn": "She has a cough."
          },
          {
            "pt": "espinha",
            "en": "pimple/acne",
            "ex": "Tenho espinhas no rosto.",
            "exEn": "I have pimples on my face."
          },
          {
            "pt": "aftas",
            "en": "canker sores",
            "ex": "Estou com aftas na boca.",
            "exEn": "I have canker sores in my mouth."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Eu tenho dor de cabeça.",
            "correct": "Estou com dor de cabeça.",
            "note": "While 'ter' is grammatically correct, 'estar com' is the more natural and common way to express temporary symptoms in Brazilian Portuguese."
          },
          {
            "wrong": "Estou com um febre.",
            "correct": "Estou com febre.",
            "note": "In Portuguese, 'febre' is feminine (a febre), and we don't use an article with symptoms after 'estar com'."
          },
          {
            "wrong": "Estou com uma dor de cabeça muito.",
            "correct": "Estou com uma dor de cabeça muito forte.",
            "en": "When intensifying symptoms, use adjectives like 'forte' (strong) or 'intensa' (intense) rather than placing 'muito' directly after the noun."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete with the correct form of 'estar com' + symptom.",
            "items": [
              {
                "q": "Eu ___ dor de dente.",
                "ans": "estou com"
              },
              {
                "q": "Meu filho ___ febre alta.",
                "ans": "está com"
              },
              {
                "q": "Nós ___ tosse.",
                "ans": "estamos com"
              },
              {
                "q": "Elas ___ dor nas pernas.",
                "ans": "estão com"
              },
              {
                "q": "Você ___ alergia?",
                "ans": "está com"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option.",
            "items": [
              {
                "q": "Como você expressa que tem um resfriado em português?",
                "opts": [
                  "Estou com resfriado.",
                  "Tenho um resfriado muito.",
                  "Sou com resfriado.",
                  "Estou resfriado."
                ],
                "ans": 0
              },
              {
                "q": "Qual frase está correta?",
                "opts": [
                  "Ela tem uma dor de cabeça.",
                  "Ela está com dor de cabeça.",
                  "Ela é com dor de cabeça.",
                  "Ela fica com dor de cabeça."
                ],
                "ans": 1
              },
              {
                "q": "Complete: Ele ___ náusea.",
                "opts": [
                  "estou com",
                  "está com",
                  "estamos com",
                  "estão com"
                ],
                "ans": 1
              },
              {
                "q": "Qual palavra significa 'sore throat'?",
                "opts": [
                  "dor de ouvido",
                  "dor de garganta",
                  "dor de peito",
                  "dor de barriga"
                ],
                "ans": 1
              },
              {
                "q": "Como se diz 'I have a cough' em português?",
                "opts": [
                  "Tenho tosse.",
                  "Estou com tosse.",
                  "Sou com tosse.",
                  "Fico com tosse."
                ],
                "ans": 1
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the sentence into Portuguese using 'estar com'.",
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
                "q": "They have a cough.",
                "ans": "Eles estão com tosse."
              },
              {
                "q": "Do you have a headache?",
                "ans": "Você está com dor de cabeça?"
              },
              {
                "q": "We have back pain.",
                "ans": "Estamos com dor nas costas."
              }
            ]
          }
        ],
        "teacherTip": "Emphasize that 'estar com' is the preferred colloquial way to express temporary symptoms in Brazilian Portuguese, whereas 'ter' (to have) is more formal and less natural. Practice the conjugation of 'estar' thoroughly since students often default to 'ter' due to English influence."
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
              "pt": "Eu sou professor e estou cansado.",
              "en": "I am a teacher and I am tired."
            },
            {
              "pt": "Ela tem 25 anos e é alegre.",
              "en": "She is 25 years old and is cheerful."
            },
            {
              "pt": "O restaurante fica perto e está aberto.",
              "en": "The restaurant is nearby and is open."
            },
            {
              "pt": "Nós temos dois filhos e somos felizes.",
              "en": "We have two children and are happy."
            },
            {
              "pt": "Você tem uma família e está em casa.",
              "en": "You have a family and are at home."
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
            "pt": "ocupado",
            "en": "busy",
            "ex": "Ele está ocupado agora.",
            "exEn": "He is busy now."
          },
          {
            "pt": "cansado",
            "en": "tired",
            "ex": "Eu estou cansado depois do trabalho.",
            "exEn": "I am tired after work."
          },
          {
            "pt": "longe",
            "en": "far",
            "ex": "A escola fica longe daqui.",
            "exEn": "The school is far from here."
          },
          {
            "pt": "irmão",
            "en": "brother",
            "ex": "Eu tenho um irmão.",
            "exEn": "I have a brother."
          },
          {
            "pt": "feliz",
            "en": "happy",
            "ex": "Ela é uma pessoa feliz.",
            "exEn": "She is a happy person."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Eu sou cansado.",
            "correct": "Eu estou cansado.",
            "note": "Use 'estar' for temporary states and feelings. 'Ser cansado' implies you are a tired person by nature (permanent identity)."
          },
          {
            "wrong": "Onde você é?",
            "correct": "Onde você está?",
            "note": "Use 'estar' for location, never 'ser'. 'Ser' is only for identity and permanent characteristics."
          },
          {
            "wrong": "Eu tenho 30 anos e sou feliz.",
            "correct": "Eu tenho 30 anos e estou feliz.",
            "note": "Use 'estar' for current emotional states. Use 'ser' only for personality traits: 'Eu sou uma pessoa feliz' (I am a happy person - trait)."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete with ser, estar, ter, or ficar in the correct form.",
            "items": [
              {
                "q": "Meu primo _____ médico e _____ em São Paulo.",
                "ans": "é, fica"
              },
              {
                "q": "Nós _____ três gatos e eles _____ muito ativos.",
                "ans": "temos, estão"
              },
              {
                "q": "A padaria _____ perto daqui e _____ aberta agora.",
                "ans": "fica, está"
              },
              {
                "q": "Você _____ quantos anos? Eu _____ 22 anos.",
                "ans": "tem, tenho"
              },
              {
                "q": "Eles _____ amigos e _____ muito alegres.",
                "ans": "são, estão"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option.",
            "items": [
              {
                "q": "Meu avô _____ aposentado e _____ muito saudável.",
                "opts": [
                  "é, está",
                  "está, é",
                  "tem, está",
                  "fica, tem"
                ],
                "ans": 0
              },
              {
                "q": "Onde _____ a farmácia? Ela _____ na rua principal.",
                "opts": [
                  "é, fica",
                  "fica, é",
                  "está, fica",
                  "tem, está"
                ],
                "ans": 2
              },
              {
                "q": "Quantos irmãos você _____?",
                "opts": [
                  "és",
                  "estás",
                  "tens",
                  "ficas"
                ],
                "ans": 2
              },
              {
                "q": "A professora _____ ocupada, mas _____ muito simpática.",
                "opts": [
                  "é, está",
                  "está, é",
                  "tem, está",
                  "fica, tem"
                ],
                "ans": 1
              },
              {
                "q": "Nós _____ uma casa grande e ela _____ no centro da cidade.",
                "opts": [
                  "somos, fica",
                  "temos, fica",
                  "estamos, é",
                  "temos, é"
                ],
                "ans": 1
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the sentence into Brazilian Portuguese.",
            "items": [
              {
                "q": "Where do you live? I live in Rio.",
                "ans": "Onde você mora? Eu moro no Rio."
              },
              {
                "q": "She is 28 years old and is a lawyer.",
                "ans": "Ela tem 28 anos e é advogada."
              },
              {
                "q": "The café is open and very busy.",
                "ans": "O café está aberto e muito ocupado."
              },
              {
                "q": "I have a dog and it is very friendly.",
                "ans": "Eu tenho um cachorro e ele é muito amigável."
              },
              {
                "q": "We are happy and tired after the party.",
                "ans": "Nós estamos felizes e cansados depois da festa."
              }
            ]
          }
        ],
        "teacherTip": "Reinforce that 'ser' describes identity and permanent traits, 'estar' describes location and temporary states, 'ter' expresses possession and age, and 'ficar' indicates location. Use consistent visual contrasts (ser = blue identity card, estar = red location pin) to help students internalize the distinctions at this beginner level."
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
              "pt": "Eu trabalhei no projeto ontem.",
              "en": "I worked on the project yesterday."
            },
            {
              "pt": "Ele passou o dia inteiro estudando.",
              "en": "He spent the whole day studying."
            },
            {
              "pt": "Nós conversamos sobre o plano na semana passada.",
              "en": "We talked about the plan last week."
            },
            {
              "pt": "Eles jogaram futebol no fim de semana.",
              "en": "They played football on the weekend."
            },
            {
              "pt": "Vocês visitaram a fábrica há dois dias?",
              "en": "Did you visit the factory two days ago?"
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
            "ex": "Ontem eu trabalhei até tarde.",
            "exEn": "Yesterday I worked until late."
          },
          {
            "pt": "semana passada",
            "en": "last week",
            "ex": "Semana passada nós estudamos muito.",
            "exEn": "Last week we studied a lot."
          },
          {
            "pt": "há dois dias",
            "en": "two days ago",
            "ex": "Há dois dias ela conversou com o chefe.",
            "exEn": "Two days ago she talked to the boss."
          },
          {
            "pt": "no ano passado",
            "en": "last year",
            "ex": "No ano passado eu comecei meu novo trabalho.",
            "exEn": "Last year I started my new job."
          },
          {
            "pt": "durante",
            "en": "during",
            "ex": "Durante a reunião, ele apresentou o projeto.",
            "exEn": "During the meeting, he presented the project."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Eu trabalhai no banco.",
            "correct": "Eu trabalhei no banco.",
            "note": "English speakers often add an extra 'h' sound. Remember: the stress falls on the first syllable of the ending (tra-ba-LHE-i), not on a separate syllable."
          },
          {
            "wrong": "Ele trabalhou ontem. Ele trabalhou hoje também.",
            "correct": "Ele trabalhou ontem. Ele trabalha hoje também.",
            "note": "Don't use pretérito perfeito for habitual actions in present time. Use present tense (trabalha) for current habits; use pretérito perfeito (trabalhou) only for completed past actions."
          },
          {
            "wrong": "Nós trabalhámos no projeto.",
            "correct": "Nós trabalhamos no projeto.",
            "note": "The European Portuguese form is 'trabalhámos,' but in Brazilian Portuguese it's 'trabalhamos' (no accent on the 'a')."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete with the correct form of the -ar verb in pretérito perfeito.",
            "items": [
              {
                "q": "Ontem eu ___ (trabalhar) por 8 horas.",
                "ans": "trabalhei"
              },
              {
                "q": "Semana passada ela ___ (estudar) para o exame.",
                "ans": "estudou"
              },
              {
                "q": "No fim de semana, nós ___ (jogar) futebol no parque.",
                "ans": "jogamos"
              },
              {
                "q": "Há dois dias, vocês ___ (visitar) a exposição?",
                "ans": "visitaram"
              },
              {
                "q": "Eles ___ (conversar) comigo durante a pausa.",
                "ans": "conversaram"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option.",
            "items": [
              {
                "q": "O que você ___ ontem à noite?",
                "opts": [
                  "trabalha",
                  "trabalhei",
                  "trabalhou",
                  "fez"
                ],
                "ans": 3
              },
              {
                "q": "Nós ___ a aula de português na semana passada.",
                "opts": [
                  "começamos",
                  "começou",
                  "começava",
                  "começaremos"
                ],
                "ans": 0
              },
              {
                "q": "Ele ___ o relatório há três dias.",
                "opts": [
                  "entrega",
                  "entregou",
                  "entreguei",
                  "entregaram"
                ],
                "ans": 1
              },
              {
                "q": "Vocês ___ a palestra no auditório?",
                "opts": [
                  "assistiu",
                  "assistiram",
                  "assistem",
                  "assistirão"
                ],
                "ans": 1
              },
              {
                "q": "Eu ___ meu amigo no café ontem.",
                "opts": [
                  "encontro",
                  "encontrei",
                  "encontrou",
                  "encontramos"
                ],
                "ans": 1
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the sentence into Brazilian Portuguese using pretérito perfeito.",
            "items": [
              {
                "q": "I worked at the company for five years.",
                "ans": "Eu trabalhei na empresa por cinco anos."
              },
              {
                "q": "She studied all night last week.",
                "ans": "Ela estudou a noite toda semana passada."
              },
              {
                "q": "We watched a movie yesterday.",
                "ans": "Nós assistimos a um filme ontem."
              },
              {
                "q": "They arrived at the office early this morning.",
                "ans": "Eles chegaram ao escritório cedo esta manhã."
              },
              {
                "q": "Did you talk to your boss two days ago?",
                "ans": "Você conversou com seu chefe há dois dias?"
              }
            ]
          }
        ],
        "teacherTip": "Emphasize that pretérito perfeito is used for completed actions at a specific past time (ontem, semana passada, há dois dias). Have students associate time markers with the past tense to reinforce when to use it. Practice the eu/ele/ela forms first since English speakers often confuse the first and third person conjugations."
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
              "pt": "Eu vou fazer um bolo para o aniversário.",
              "en": "I am going to make a cake for the birthday."
            },
            {
              "pt": "Eles vão comprar ingressos para o show.",
              "en": "They are going to buy tickets for the show."
            },
            {
              "pt": "Nós vamos sair mais cedo do trabalho.",
              "en": "We are going to leave work earlier."
            },
            {
              "pt": "Você vai ligar para a reserva do restaurante?",
              "en": "Are you going to call the restaurant reservation?"
            },
            {
              "pt": "Ela vai estudar português este mês.",
              "en": "She is going to study Portuguese this month."
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
            "pt": "amanhã",
            "en": "tomorrow",
            "ex": "Vou estudar amanhã.",
            "exEn": "I'm going to study tomorrow."
          },
          {
            "pt": "próxima semana",
            "en": "next week",
            "ex": "Ela vai viajar próxima semana.",
            "exEn": "She is going to travel next week."
          },
          {
            "pt": "encontrar",
            "en": "to meet",
            "ex": "Nós vamos encontrar nossos amigos.",
            "exEn": "We are going to meet our friends."
          },
          {
            "pt": "planejado",
            "en": "planned",
            "ex": "Temos um passeio planejado para o fim de semana.",
            "exEn": "We have a planned trip for the weekend."
          },
          {
            "pt": "assistir a",
            "en": "to watch/attend",
            "ex": "Você vai assistir ao filme comigo?",
            "exEn": "Are you going to watch the movie with me?"
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Eu vou a fazer compras.",
            "correct": "Eu vou fazer compras.",
            "note": "English speakers sometimes add prepositions (like 'a') between 'ir' and the infinitive verb. This is incorrect in Brazilian Portuguese—there should be no preposition."
          },
          {
            "wrong": "Nós vamos fazendo um picnic amanhã.",
            "correct": "Nós vamos fazer um picnic amanhã.",
            "note": "The verb after 'ir' must be in the infinitive form, not gerund (-ando/-endo/-indo). The gerund form changes the meaning and is grammatically incorrect here."
          },
          {
            "wrong": "Ele vai a ir à praia.",
            "correct": "Ele vai ir à praia.",
            "note": "Do not conjugate the second verb. The pattern requires 'ir' + infinitive. Only the first 'ir' is conjugated; the second 'ir' stays in infinitive form."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentences with the correct form of 'ir' and the infinitive verb.",
            "items": [
              {
                "q": "Eu ___ ___ uma festa no sábado. (ir / fazer)",
                "ans": "vou fazer"
              },
              {
                "q": "Você ___ ___ seu amigo amanhã? (ir / encontrar)",
                "ans": "vai encontrar"
              },
              {
                "q": "Nós ___ ___ um filme à noite. (ir / assistir)",
                "ans": "vamos assistir"
              },
              {
                "q": "Ela ___ ___ na praia próxima semana. (ir / nadar)",
                "ans": "vai nadar"
              },
              {
                "q": "Eles ___ ___ pizzas para a reunião. (ir / trazer)",
                "ans": "vão trazer"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option to complete each sentence.",
            "items": [
              {
                "q": "Meu professor ___ ___ português comigo amanhã.",
                "opts": [
                  "vai falar",
                  "vão falar",
                  "vai a falar",
                  "vai falando"
                ],
                "ans": 0
              },
              {
                "q": "As crianças ___ ___ na piscina.",
                "opts": [
                  "vai brincar",
                  "vão brincar",
                  "vão a brincar",
                  "vão brincando"
                ],
                "ans": 1
              },
              {
                "q": "Tu ___ ___ no restaurante italiano?",
                "opts": [
                  "vou comer",
                  "vai comer",
                  "vais comer",
                  "vai a comer"
                ],
                "ans": 2
              },
              {
                "q": "Nós ___ ___ nosso projeto antes do fim do mês.",
                "opts": [
                  "vamos finalizar",
                  "vai finalizar",
                  "vou finalizar",
                  "vamos a finalizar"
                ],
                "ans": 0
              },
              {
                "q": "Você ___ ___ uma ligação para o hotel?",
                "opts": [
                  "vai fazer",
                  "vou fazer",
                  "vai a fazer",
                  "vai fazendo"
                ],
                "ans": 0
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the English sentences into Brazilian Portuguese using 'ir + infinitive'.",
            "items": [
              {
                "q": "I am going to buy groceries tomorrow.",
                "ans": "Eu vou comprar mantimentos amanhã."
              },
              {
                "q": "We are going to visit the museum next week.",
                "ans": "Nós vamos visitar o museu próxima semana."
              },
              {
                "q": "They are going to call you later.",
                "ans": "Eles vão ligar para você mais tarde."
              },
              {
                "q": "She is going to learn to dance.",
                "ans": "Ela vai aprender a dançar."
              },
              {
                "q": "Are you going to help us paint the house?",
                "ans": "Você vai nos ajudar a pintar a casa?"
              }
            ]
          }
        ],
        "teacherTip": "Remind students that the 'ir + infinitive' structure is the most common way to express near future in Brazilian Portuguese and is used much more frequently than the simple future tense. Emphasize that only 'ir' changes according to the subject; the infinitive verb always stays unchanged regardless of who is performing the action."
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
              "pt": "Acho que essa música é muito alegre.",
              "en": "I think that song is very cheerful."
            },
            {
              "pt": "Acho que você tem razão sobre isso.",
              "en": "I think you're right about that."
            },
            {
              "pt": "Acho que essa comida é deliciosa.",
              "en": "I find this food delicious."
            },
            {
              "pt": "Acho que seria melhor ir amanhã.",
              "en": "I think it would be better to go tomorrow."
            },
            {
              "pt": "Acho que ele não vai gostar dessa ideia.",
              "en": "I think he won't like that idea."
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
            "pt": "gosto",
            "en": "taste; preference",
            "ex": "Não é do meu gosto.",
            "exEn": "It's not to my taste."
          },
          {
            "pt": "preferir",
            "en": "to prefer",
            "ex": "Eu prefiro café a chá.",
            "exEn": "I prefer coffee to tea."
          },
          {
            "pt": "interessante",
            "en": "interesting",
            "ex": "Acho esse filme muito interessante.",
            "exEn": "I find this movie very interesting."
          },
          {
            "pt": "chato",
            "en": "boring; annoying",
            "ex": "Acho aquele livro chato.",
            "exEn": "I find that book boring."
          },
          {
            "pt": "melhor",
            "en": "better; best",
            "ex": "Acho que essa opção é melhor.",
            "exEn": "I think this option is better."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Acho de que esse filme é bom.",
            "correct": "Acho que esse filme é bom.",
            "note": "Do not use 'de' before 'que' in the pattern 'achar que'. The preposition is unnecessary."
          },
          {
            "wrong": "Acho que é chato de assistir.",
            "correct": "Acho que é chato assistir. / Acho chato assistir.",
            "note": "Use the infinitive directly without 'de' when expressing opinions about activities. 'De' is not needed here."
          },
          {
            "wrong": "Eu acho que você está errado, não é?",
            "correct": "Acho que você está errado.",
            "note": "English speakers often add unnecessary question tags. In Portuguese, avoid 'não é?' when already expressing a complete opinion with 'acho que'."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentences with the correct form of 'achar' or appropriate vocabulary.",
            "items": [
              {
                "q": "Eu ___ que essa série é muito interessante.",
                "ans": "acho"
              },
              {
                "q": "Minha mãe ___ que aquele restaurante é caro.",
                "ans": "acha"
              },
              {
                "q": "Nós ___ que a praia é o melhor lugar para relaxar.",
                "ans": "achamos"
              },
              {
                "q": "Eles ___ que esse jogo é chato.",
                "ans": "acham"
              },
              {
                "q": "Você ___ que vamos ter tempo para ir ao cinema?",
                "ans": "acha"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option that best completes the sentence.",
            "items": [
              {
                "q": "Acho que esse livro é ___ para ler no fim de semana.",
                "opts": [
                  "perfeito",
                  "perfeitamente",
                  "perfeitíssimo",
                  "bem perfeito"
                ],
                "ans": 0
              },
              {
                "q": "Meu pai acha que ___ melhor não sair hoje.",
                "opts": [
                  "é",
                  "está",
                  "são",
                  "estão"
                ],
                "ans": 0
              },
              {
                "q": "Acho que você deveria ___ essa oportunidade.",
                "opts": [
                  "aproveita",
                  "aproveitar",
                  "aproveitando",
                  "aproveitado"
                ],
                "ans": 1
              },
              {
                "q": "Nós achamos que essa comida é ___.",
                "opts": [
                  "delicioso",
                  "deliciosa",
                  "deliciosos",
                  "deliciosas"
                ],
                "ans": 1
              },
              {
                "q": "Acho que eles não ___ entender essa lição.",
                "opts": [
                  "vão",
                  "vou",
                  "vai",
                  "vamos"
                ],
                "ans": 0
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the sentence into Brazilian Portuguese using 'Acho que'.",
            "items": [
              {
                "q": "I think this movie is better than the other one.",
                "ans": "Acho que esse filme é melhor que o outro."
              },
              {
                "q": "I find that song very beautiful.",
                "ans": "Acho que essa música é muito bonita."
              },
              {
                "q": "I think you should try this dessert.",
                "ans": "Acho que você deveria provar essa sobremesa."
              },
              {
                "q": "I think it would be boring to stay at home.",
                "ans": "Acho que seria chato ficar em casa."
              },
              {
                "q": "I think they will like this restaurant.",
                "ans": "Acho que eles vão gostar desse restaurante."
              }
            ]
          }
        ],
        "teacherTip": "Remind students that 'acho que' is very conversational and flexible—it works with simple adjectives, complete clauses, and even conditional sentences. Encourage them to use it as a natural way to soften opinions and make them sound less absolute, which is very typical of Brazilian conversation."
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
              "pt": "São Paulo é mais populosa do que Salvador.",
              "en": "São Paulo is more populated than Salvador."
            },
            {
              "pt": "O Rio de Janeiro é a cidade mais bonita do Brasil.",
              "en": "Rio de Janeiro is the most beautiful city in Brazil."
            },
            {
              "pt": "Minha mãe é mais inteligente do que meu pai.",
              "en": "My mother is more intelligent than my father."
            },
            {
              "pt": "Este é o restaurante mais caro da região.",
              "en": "This is the most expensive restaurant in the area."
            },
            {
              "pt": "A praia do norte é mais fria do que a do sul.",
              "en": "The northern beach is colder than the southern one."
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
            "pt": "aconchegante",
            "en": "cozy/comfortable",
            "ex": "Meu apartamento é muito aconchegante.",
            "exEn": "My apartment is very cozy."
          },
          {
            "pt": "barulhento",
            "en": "noisy",
            "ex": "A rua é mais barulhenta do que eu gosto.",
            "exEn": "The street is noisier than I like."
          },
          {
            "pt": "apertado",
            "en": "tight/cramped",
            "ex": "O quarto é o mais apertado da casa.",
            "exEn": "The bedroom is the most cramped in the house."
          },
          {
            "pt": "ensolarado",
            "en": "sunny",
            "ex": "A praia é mais ensolarada no verão.",
            "exEn": "The beach is sunnier in the summer."
          },
          {
            "pt": "tranquilo",
            "en": "calm/peaceful",
            "ex": "Este parque é o mais tranquilo da cidade.",
            "exEn": "This park is the most peaceful in the city."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "São Paulo é mais grande do que Rio de Janeiro.",
            "correct": "São Paulo é maior do que Rio de Janeiro.",
            "note": "Use 'maior' (comparative form of grande) instead of 'mais grande'. Both are grammatically correct, but 'maior' is more natural in Brazilian Portuguese."
          },
          {
            "wrong": "Esta é a mais bonita casa de todas.",
            "correct": "Esta é a casa mais bonita de todas.",
            "note": "The superlative adjective must come after the noun. The article and noun come first, then 'mais' + adjective."
          },
          {
            "wrong": "Ele é mais inteligente do Brasil.",
            "correct": "Ele é o mais inteligente do Brasil.",
            "en": "When using the superlative, you need the definite article (o/a) before 'mais'.",
            "note": "The superlative form requires the definite article 'o/a' before 'mais' to mean 'the most'."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete with the correct comparative or superlative form.",
            "items": [
              {
                "q": "A Sofia é ___ inteligente ___ o Bruno.",
                "ans": "mais / do que"
              },
              {
                "q": "Este é ___ melhor restaurante ___ cidade.",
                "ans": "o / da"
              },
              {
                "q": "Meu irmão é ___ alto ___ eu.",
                "ans": "mais / do que"
              },
              {
                "q": "A praça é ___ lugar ___ tranquilo ___ parque.",
                "ans": "o / mais / do"
              },
              {
                "q": "Esse hotel é ___ caro ___ aquele.",
                "ans": "mais / do que"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option.",
            "items": [
              {
                "q": "O João é ___ alegre do que a Maria.",
                "opts": [
                  "mais",
                  "o mais",
                  "a mais",
                  "muito"
                ],
                "ans": 0
              },
              {
                "q": "Esta é ___ casa ___ cara da rua.",
                "opts": [
                  "mais a",
                  "a mais",
                  "mais de",
                  "o mais"
                ],
                "ans": 1
              },
              {
                "q": "O Brasil é ___ grande ___ Portugal.",
                "opts": [
                  "maior de",
                  "mais grande de",
                  "maior do que",
                  "mais de"
                ],
                "ans": 2
              },
              {
                "q": "Ela é ___ criativa ___ todos.",
                "opts": [
                  "a mais de",
                  "a mais criativa de",
                  "mais de",
                  "mais criativa"
                ],
                "ans": 1
              },
              {
                "q": "Este apartamento é ___ aconchegante ___ aquele.",
                "opts": [
                  "o mais",
                  "mais",
                  "a mais",
                  "muito mais"
                ],
                "ans": 1
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the sentence into Portuguese.",
            "items": [
              {
                "q": "She is more beautiful than her sister.",
                "ans": "Ela é mais bonita do que sua irmã."
              },
              {
                "q": "This is the most expensive house in the neighborhood.",
                "ans": "Esta é a casa mais cara do bairro."
              },
              {
                "q": "The beach is more peaceful than the city.",
                "ans": "A praia é mais tranquila do que a cidade."
              },
              {
                "q": "He is the tallest student in the class.",
                "ans": "Ele é o aluno mais alto da turma."
              },
              {
                "q": "My apartment is cozier than yours.",
                "ans": "Meu apartamento é mais aconchegante do que o seu."
              }
            ]
          }
        ],
        "teacherTip": "Emphasize the difference between 'mais + adjective + do que' (comparative) and 'o/a mais + adjective + de' (superlative). Have students practice both structures back-to-back with the same adjectives to solidify the pattern. Also teach the common irregular forms like maior, melhor, pior, and menor early to avoid confusion."
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
              "pt": "Ela trabalha como gerente de propriedades há dois anos.",
              "en": "She has been working as a property manager for two years."
            },
            {
              "pt": "Nós temos essa geladeira há muito tempo.",
              "en": "We have had that refrigerator for a long time."
            },
            {
              "pt": "Ele aluga o apartamento há seis meses.",
              "en": "He has been renting the apartment for six months."
            },
            {
              "pt": "Elas vivem no mesmo bairro há dez anos.",
              "en": "They have been living in the same neighborhood for ten years."
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
            "pt": "móvel",
            "en": "furniture",
            "ex": "Comprei um móvel novo para a sala.",
            "exEn": "I bought new furniture for the living room."
          },
          {
            "pt": "aluguel",
            "en": "rent",
            "ex": "O aluguel da minha casa é muito caro.",
            "exEn": "The rent for my house is very expensive."
          },
          {
            "pt": "vizinho",
            "en": "neighbor",
            "ex": "Meu vizinho é muito amigável.",
            "exEn": "My neighbor is very friendly."
          },
          {
            "pt": "reforma",
            "en": "renovation/remodeling",
            "ex": "A reforma da cozinha levou três meses.",
            "exEn": "The kitchen renovation took three months."
          },
          {
            "pt": "condomínio",
            "en": "condominium/apartment building",
            "ex": "Moro em um condomínio fechado.",
            "exEn": "I live in a gated condominium."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Eu moro aqui desde há cinco anos.",
            "correct": "Eu moro aqui há cinco anos.",
            "note": "Don't use 'desde' together with 'há' in duration expressions. Use only 'há' for time period."
          },
          {
            "wrong": "Eu estou morando nesta casa há cinco anos.",
            "correct": "Eu moro nesta casa há cinco anos.",
            "note": "Use simple present tense with 'há', not the progressive form (estar + gerund)."
          },
          {
            "wrong": "Eu tenho a casa há cinco anos atrás.",
            "correct": "Eu tenho a casa há cinco anos.",
            "note": "Don't add 'atrás' (ago) when using 'há'. The word 'há' already expresses 'ago'."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete with the correct word or phrase.",
            "items": [
              {
                "q": "Eu ___ neste apartamento há três anos.",
                "ans": "moro"
              },
              {
                "q": "Eles ___ esse sofá há muito tempo.",
                "ans": "têm"
              },
              {
                "q": "Você ___ na mesma rua há quanto tempo?",
                "ans": "mora"
              },
              {
                "q": "Nós ___ essa geladeira há seis meses.",
                "ans": "temos"
              },
              {
                "q": "Ela ___ a casa há um ano.",
                "ans": "aluga"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option.",
            "items": [
              {
                "q": "Quanto tempo você mora nesta casa?",
                "opts": [
                  "Eu moro há dois anos.",
                  "Eu estou morando há dois anos.",
                  "Eu moro desde há dois anos.",
                  "Eu moro dois anos atrás."
                ],
                "ans": 0
              },
              {
                "q": "Qual frase está correta?",
                "opts": [
                  "Nós temos essa geladeira há cinco anos atrás.",
                  "Nós temos essa geladeira desde há cinco anos.",
                  "Nós temos essa geladeira há cinco anos.",
                  "Nós estamos tendo essa geladeira há cinco anos."
                ],
                "ans": 2
              },
              {
                "q": "Ele aluga o apartamento ___ seis meses.",
                "opts": [
                  "há",
                  "desde",
                  "atrás",
                  "durante"
                ],
                "ans": 0
              },
              {
                "q": "Qual sentença usa corretamente o padrão 'há'?",
                "opts": [
                  "Elas moram no mesmo bairro desde há dez anos.",
                  "Elas moram no mesmo bairro há dez anos.",
                  "Elas estão morando no mesmo bairro há dez anos.",
                  "Elas moram no mesmo bairro há dez anos atrás."
                ],
                "ans": 1
              },
              {
                "q": "Você ___ essa reforma há quanto tempo?",
                "opts": [
                  "termina",
                  "está terminando",
                  "terminou",
                  "terminará"
                ],
                "ans": 0
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the sentence into Brazilian Portuguese.",
            "items": [
              {
                "q": "I have been living in this city for three years.",
                "ans": "Eu moro nesta cidade há três anos."
              },
              {
                "q": "They have had the same furniture for a long time.",
                "ans": "Eles têm o mesmo móvel há muito tempo."
              },
              {
                "q": "She has been renting this apartment for six months.",
                "ans": "Ela aluga este apartamento há seis meses."
              },
              {
                "q": "We have been neighbors for ten years.",
                "ans": "Nós somos vizinhos há dez anos."
              },
              {
                "q": "How long have you been living in this house?",
                "ans": "Há quanto tempo você mora nesta casa?"
              }
            ]
          }
        ],
        "teacherTip": "Remind students that 'há' with present tense describes actions/states that started in the past and continue to the present—similar to English present perfect continuous. Emphasize that 'moro há cinco anos' means they still live there now, making it fundamentally different from past tense 'morei.'"
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
              "pt": "Eu me chamo Pedro e trabalho como professor.",
              "en": "My name is Pedro and I work as a teacher."
            },
            {
              "pt": "Ela se formou em Medicina há três anos.",
              "en": "She graduated in Medicine three years ago."
            },
            {
              "pt": "Nós nos preparamos para a entrevista de emprego.",
              "en": "We prepared ourselves for the job interview."
            },
            {
              "pt": "Eles se chamam Carlos e Ana, e estudam juntos.",
              "en": "Their names are Carlos and Ana, and they study together."
            },
            {
              "pt": "Você se forma este ano?",
              "en": "Are you graduating this year?"
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
            "ex": "Meu irmão se formou em Engenharia.",
            "exEn": "My brother graduated in Engineering."
          },
          {
            "pt": "se chamar",
            "en": "to be called / to be named",
            "ex": "Como você se chama?",
            "exEn": "What is your name?"
          },
          {
            "pt": "a carreira",
            "en": "career",
            "ex": "Ela quer construir uma carreira de sucesso.",
            "exEn": "She wants to build a successful career."
          },
          {
            "pt": "se preparar",
            "en": "to prepare oneself",
            "ex": "Nós nos preparamos para a prova.",
            "exEn": "We prepared ourselves for the test."
          },
          {
            "pt": "a universidade",
            "en": "university",
            "ex": "Ele se matriculou na universidade em janeiro.",
            "exEn": "He enrolled at the university in January."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Eu chamo João.",
            "correct": "Eu me chamo João.",
            "note": "English speakers often forget the reflexive pronoun 'me' with 'chamar'. In Portuguese, you always need the reflexive pronoun: 'me chamo' (I call myself)."
          },
          {
            "wrong": "Ele formou em 2022.",
            "correct": "Ele se formou em 2022.",
            "note": "'Formar' requires the reflexive pronoun 'se' when meaning 'to graduate'. Without it, the meaning changes completely."
          },
          {
            "wrong": "Nós preparamos para o exame.",
            "correct": "Nós nos preparamos para o exame.",
            "note": "The reflexive pronoun 'nos' is essential with 'preparar'. English speakers tend to omit it because English doesn't use reflexive pronouns in this context."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete with the correct reflexive pronoun and verb form.",
            "items": [
              {
                "q": "Meu nome é Carlos. Eu ___ Carlos.",
                "ans": "me chamo"
              },
              {
                "q": "Ela ___ em Administração no ano passado.",
                "ans": "se formou"
              },
              {
                "q": "Nós ___ para a reunião de trabalho amanhã.",
                "ans": "nos preparamos"
              },
              {
                "q": "Vocês ___ para estudar na biblioteca?",
                "ans": "se preparam"
              },
              {
                "q": "Eles ___ João e Marina, e trabalham na mesma empresa.",
                "ans": "se chamam"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option.",
            "items": [
              {
                "q": "Como você se chama?",
                "opts": [
                  "I call you.",
                  "What is your name?",
                  "You are calling yourself.",
                  "Do you know my name?"
                ],
                "ans": 1
              },
              {
                "q": "Qual alternativa está correta?",
                "opts": [
                  "Ela chama-se estudante.",
                  "Ela se chama Maria.",
                  "Ela chama Maria.",
                  "Ela se chamou Maria."
                ],
                "ans": 1
              },
              {
                "q": "Quando ele se forma?",
                "opts": [
                  "When does he graduate?",
                  "When did he graduate?",
                  "He is graduating.",
                  "He has been graduating."
                ],
                "ans": 0
              },
              {
                "q": "Qual frase está correta?",
                "opts": [
                  "Nós preparamos para a prova.",
                  "Nós se preparamos para a prova.",
                  "Nós nos preparamos para a prova.",
                  "Nós me preparamos para a prova."
                ],
                "ans": 2
              },
              {
                "q": "O que significa 'se formar'?",
                "opts": [
                  "To form something",
                  "To be formed",
                  "To graduate",
                  "To study"
                ],
                "ans": 2
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the sentence into Portuguese.",
            "items": [
              {
                "q": "My name is Julia.",
                "ans": "Meu nome é Julia. / Eu me chamo Julia."
              },
              {
                "q": "She graduated in Psychology.",
                "ans": "Ela se formou em Psicologia."
              },
              {
                "q": "We are preparing ourselves for the job interview.",
                "ans": "Nós nos estamos preparando para a entrevista de emprego. / Nós nos preparamos para a entrevista de emprego."
              },
              {
                "q": "They are called Bruno and Sofia.",
                "ans": "Eles se chamam Bruno e Sofia."
              },
              {
                "q": "Are you preparing yourself for the test?",
                "ans": "Você se está preparando para a prova? / Você está se preparando para a prova?"
              }
            ]
          }
        ],
        "teacherTip": "Reinforce that reflexive pronouns in Brazilian Portuguese are essential and can't be omitted like they sometimes are in English. Practice the pattern by having students introduce themselves repeatedly ('Eu me chamo...') and discuss their educational plans ('Eu me preparo para...' or 'Eu me formei em...')."
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
              "pt": "Eu sempre assisto séries à noite.",
              "en": "I always watch series at night."
            },
            {
              "pt": "Ela raramente joga futebol nos finais de semana.",
              "en": "She rarely plays football on weekends."
            },
            {
              "pt": "Nós frequentemente visitamos museus na cidade.",
              "en": "We frequently visit museums in the city."
            },
            {
              "pt": "Ele nunca canta em público.",
              "en": "He never sings in public."
            },
            {
              "pt": "Elas ocasionalmente fazem piqueniques no parque.",
              "en": "They occasionally have picnics in the park."
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
            "pt": "passatempo",
            "en": "hobby, pastime",
            "ex": "Meu passatempo favorito é ler livros.",
            "exEn": "My favorite hobby is reading books."
          },
          {
            "pt": "lazer",
            "en": "leisure, free time",
            "ex": "Nos fins de semana, tenho muito tempo de lazer.",
            "exEn": "On weekends, I have a lot of free time."
          },
          {
            "pt": "relaxar",
            "en": "to relax",
            "ex": "Eu relaxo jogando videogame.",
            "exEn": "I relax by playing video games."
          },
          {
            "pt": "desenhar",
            "en": "to draw",
            "ex": "Ela desenha frequentemente no seu caderno.",
            "exEn": "She draws frequently in her notebook."
          },
          {
            "pt": "dançar",
            "en": "to dance",
            "ex": "Eles dançam regularmente na aula de samba.",
            "exEn": "They dance regularly in samba class."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Eu always assisto filmes.",
            "correct": "Eu sempre assisto filmes.",
            "note": "In Portuguese, the frequency adverb comes after the subject pronoun, not before the verb like in English."
          },
          {
            "wrong": "Ele jogam nunca videogame.",
            "correct": "Ele nunca joga videogame.",
            "note": "The verb must agree with the subject (ele joga, not jogam), and the frequency word comes before the verb."
          },
          {
            "wrong": "Nós frequentemente de dançar gostamos.",
            "correct": "Nós frequentemente gostamos de dançar.",
            "note": "Don't separate the verb from its preposition; the structure is: subject + frequency + verb + preposition + infinitive."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete with the correct frequency adverb.",
            "items": [
              {
                "q": "Eu ___ vou ao cinema nos fins de semana.",
                "ans": "sempre"
              },
              {
                "q": "Ela ___ lê livros porque não tem tempo.",
                "ans": "raramente"
              },
              {
                "q": "Nós ___ jogamos xadrez juntos.",
                "ans": "frequentemente / às vezes"
              },
              {
                "q": "Eles ___ assistem televisão à noite.",
                "ans": "sempre / geralmente"
              },
              {
                "q": "Você ___ nada na piscina?",
                "ans": "nunca / raramente / frequentemente"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option.",
            "items": [
              {
                "q": "Qual frase está correta?",
                "opts": [
                  "Eu sempre de cantar gosto.",
                  "Eu gosto sempre de cantar.",
                  "Eu sempre gosto de cantar.",
                  "Sempre eu gosto de cantar."
                ],
                "ans": 2
              },
              {
                "q": "Complete: 'Meu irmão ___ joga videogame todos os dias.'",
                "opts": [
                  "nunca",
                  "sempre",
                  "raramente",
                  "ocasionalmente"
                ],
                "ans": 1
              },
              {
                "q": "Qual sentença significa 'They sometimes go to the beach'?",
                "opts": [
                  "Eles nunca vão à praia.",
                  "Eles frequentemente vão à praia.",
                  "Eles às vezes vão à praia.",
                  "Eles sempre vão à praia."
                ],
                "ans": 2
              },
              {
                "q": "Complete: 'Eu ___ danço sozinho em casa.'",
                "opts": [
                  "geralmente",
                  "nunca",
                  "frequentemente",
                  "Todas as opções são corretas"
                ],
                "ans": 3
              },
              {
                "q": "Qual frase NÃO está correta?",
                "opts": [
                  "Nós frequentemente viajamos.",
                  "Elas sempre assistem filmes.",
                  "Ele desenha raramente.",
                  "Você regularmente lê jornais."
                ],
                "ans": 2
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the sentence into Portuguese.",
            "items": [
              {
                "q": "I always play guitar on weekends.",
                "ans": "Eu sempre toco guitarra nos fins de semana."
              },
              {
                "q": "She rarely watches soccer matches.",
                "ans": "Ela raramente assiste partidas de futebol."
              },
              {
                "q": "We frequently go to the beach in summer.",
                "ans": "Nós frequentemente vamos à praia no verão."
              },
              {
                "q": "They never paint or draw.",
                "ans": "Eles nunca pintam ou desenham."
              },
              {
                "q": "You always read books before sleeping.",
                "ans": "Você sempre lê livros antes de dormir."
              }
            ]
          }
        ],
        "teacherTip": "Emphasize that frequency adverbs in Portuguese (sempre, nunca, raramente, frequentemente, às vezes) come after the subject pronoun and before the main verb, which is the opposite of English word order. Practice this pattern repeatedly through drills and conversation to help it become automatic."
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
              "pt": "Pode trazer mais pão, por favor?",
              "en": "Can you bring more bread, please?"
            },
            {
              "pt": "Pode preparar o prato sem cebola?",
              "en": "Can you prepare the dish without onion?"
            },
            {
              "pt": "Pode me recomendar um vinho bom?",
              "en": "Can you recommend a good wine to me?"
            },
            {
              "pt": "Pode separar a conta em duas?",
              "en": "Can you split the bill into two?"
            },
            {
              "pt": "Pode trazer a sobremesa e o café, por favor?",
              "en": "Can you bring the dessert and coffee, please?"
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
            "en": "the bill",
            "ex": "Pode trazer a conta, por favor?",
            "exEn": "Can you bring the bill, please?"
          },
          {
            "pt": "sem gelo",
            "en": "without ice",
            "ex": "Pode me trazer água sem gelo?",
            "exEn": "Can you bring me water without ice?"
          },
          {
            "pt": "ao ponto",
            "en": "medium (meat doneness)",
            "ex": "Pode fazer o bife ao ponto?",
            "exEn": "Can you make the steak medium?"
          },
          {
            "pt": "o garçom/a garçonete",
            "en": "the waiter/waitress",
            "ex": "Pode chamar o garçom para nós?",
            "exEn": "Can you call the waiter for us?"
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
            "wrong": "Você pode trazer a conta?",
            "correct": "Pode trazer a conta? / Pode me trazer a conta?",
            "note": "In Brazilian Portuguese restaurants, dropping 'você' is more natural and polite for requests. Use the imperative form with 'pode' as a softener."
          },
          {
            "wrong": "Pode trazer água com gelo para eu.",
            "correct": "Pode trazer água com gelo para mim.",
            "en": "After prepositions like 'para', use the object pronoun 'mim', not 'eu'."
          },
          {
            "wrong": "Pode fazer o bife bem passado?",
            "correct": "Pode fazer o bife bem-passado? / Pode fazer o bife bem passado?",
            "note": "Both forms are acceptable, but 'bem-passado' (hyphenated) is more formal. A2 students should recognize both versions."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the request with the correct word from the vocabulary.",
            "items": [
              {
                "q": "Pode trazer a ___ para nós, por favor?",
                "ans": "conta"
              },
              {
                "q": "Pode preparar meu suco ___ gelo?",
                "ans": "sem"
              },
              {
                "q": "Pode recomendar uma ___ boa?",
                "ans": "sobremesa"
              },
              {
                "q": "Pode fazer o bife ___ ponto?",
                "ans": "ao"
              },
              {
                "q": "Pode chamar o ___ para nós?",
                "ans": "garçom"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option to complete the polite request.",
            "items": [
              {
                "q": "Pode trazer água ___?",
                "opts": [
                  "com gelo",
                  "gelo",
                  "gelado muito",
                  "no gelo"
                ],
                "ans": 0
              },
              {
                "q": "Pode me recomendar ___ bom?",
                "opts": [
                  "um vinho",
                  "vinho um",
                  "um de vinho",
                  "vinho muito"
                ],
                "ans": 0
              },
              {
                "q": "Pode separar a conta em ___?",
                "opts": [
                  "duas",
                  "dois",
                  "à duas",
                  "a duas"
                ],
                "ans": 0
              },
              {
                "q": "Pode preparar o prato ___ cebola?",
                "opts": [
                  "não tem",
                  "sem",
                  "com não",
                  "nada"
                ],
                "ans": 1
              },
              {
                "q": "Pode fazer meu bife ___?",
                "opts": [
                  "bem passado",
                  "passado bem",
                  "muito bem",
                  "bem muito"
                ],
                "ans": 0
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the sentence into Brazilian Portuguese using 'Pode + infinitive'.",
            "items": [
              {
                "q": "Can you bring me a coffee, please?",
                "ans": "Pode trazer um café para mim, por favor?"
              },
              {
                "q": "Can you recommend a good restaurant?",
                "ans": "Pode recomendar um bom restaurante?"
              },
              {
                "q": "Can you prepare the fish without salt?",
                "ans": "Pode preparar o peixe sem sal?"
              },
              {
                "q": "Can you split the bill between us?",
                "ans": "Pode separar a conta entre nós?"
              },
              {
                "q": "Can you bring the dessert menu?",
                "ans": "Pode trazer o cardápio de sobremesa?"
              }
            ]
          }
        ],
        "teacherTip": "Emphasize that 'Pode + infinitive' is more natural and polite in Brazilian restaurant contexts than 'Você pode + infinitive.' Drill the pattern with common requests to build automaticity, and remind students that dropping the subject pronoun makes the request sound more native-like."
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
              "pt": "Visitei o Rio de Janeiro no verão passado e vou voltar no próximo mês.",
              "en": "I visited Rio de Janeiro last summer and I will go back next month."
            },
            {
              "pt": "Ela reservou um hotel em São Paulo ontem e vamos fazer uma reunião lá.",
              "en": "She booked a hotel in São Paulo yesterday and we will have a meeting there."
            },
            {
              "pt": "Comprei passagens aéreas na semana passada e vou partir para Salvador amanhã.",
              "en": "I bought plane tickets last week and I will leave for Salvador tomorrow."
            },
            {
              "pt": "Nós planejamos a viagem em dezembro e vamos explorar as praias de Natal.",
              "en": "We planned the trip in December and we will explore the beaches of Natal."
            },
            {
              "pt": "Ele chegou em Brasília na semana passada e vou encontrá-lo para visitar os monumentos.",
              "en": "He arrived in Brasília last week and I will meet him to visit the monuments."
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
            "pt": "a mala",
            "en": "suitcase",
            "ex": "Eu fiz a mala antes de viajar.",
            "exEn": "I packed my suitcase before traveling."
          },
          {
            "pt": "o voo",
            "en": "flight",
            "ex": "Meu voo saiu atrasado, mas vou chegar no hotel cedo.",
            "exEn": "My flight left late, but I will arrive at the hotel early."
          },
          {
            "pt": "a hospedagem",
            "en": "accommodation",
            "ex": "Reservei uma hospedagem confortável e vou descansar lá.",
            "exEn": "I booked comfortable accommodation and I will rest there."
          },
          {
            "pt": "o pasaporte",
            "en": "passport",
            "ex": "Perdi meu pasaporte, mas vou procurar na embaixada.",
            "exEn": "I lost my passport, but I will look for it at the embassy."
          },
          {
            "pt": "a bagagem",
            "en": "luggage",
            "ex": "Coloquei a bagagem no metrô e vou recuperá-la amanhã.",
            "exEn": "I put the luggage on the metro and I will retrieve it tomorrow."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Eu visitei o museu ontem e vou visitar novamente amanhã.",
            "correct": "Eu visitei o museu ontem e vou visitá-lo novamente amanhã.",
            "note": "In Brazilian Portuguese, when repeating the same verb with a direct object, use the infinitive with the pronoun attached (visitá-lo) rather than repeating the full verb."
          },
          {
            "wrong": "Nós fomos para a praia e vamos a nadar.",
            "correct": "Nós fomos para a praia e vamos nadar.",
            "note": "After 'vou/vamos', use the infinitive directly without the preposition 'a'. The preposition is optional but typically omitted in this construction."
          },
          {
            "wrong": "Eu fiz reserva no hotel e vou chegando amanhã.",
            "correct": "Eu fiz reserva no hotel e vou chegar amanhã.",
            "en": "Use the infinitive form with 'vou/vamos', not the gerund. 'Vou chegando' suggests a continuous action, while 'vou chegar' indicates a future plan."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete with the correct word or phrase.",
            "items": [
              {
                "q": "Nós visitamos o Cristo Redentor no fim de semana passado e vamos ___ fotos lá novamente.",
                "ans": "tirar"
              },
              {
                "q": "Eu reservei uma mesa no restaurante ontem e vou ___ com meus amigos amanhã.",
                "ans": "comer"
              },
              {
                "q": "Ela comprou a ___ na semana passada e vai viajar no próximo mês.",
                "ans": "mala"
              },
              {
                "q": "Eles chegaram em Salvador e vão ___ as praias da região.",
                "ans": "explorar"
              },
              {
                "q": "Eu peguei meu ___ e vou embarcar no voo agora.",
                "ans": "pasaporte"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option.",
            "items": [
              {
                "q": "Ele visitou o museu ontem e ___?",
                "opts": [
                  "vai visitá-lo novamente amanhã",
                  "vai visitar ele novamente amanhã",
                  "vai a visitar novamente amanhã",
                  "vão visitá-lo novamente amanhã"
                ],
                "ans": 0
              },
              {
                "q": "Nós planejamos a viagem em dezembro. Agora vamos ___?",
                "opts": [
                  "a partimos para o Sul",
                  "partir para o Sul",
                  "partindo para o Sul",
                  "a partir para o Sul"
                ],
                "ans": 1
              },
              {
                "q": "Ela comprou uma hospedagem luxuosa e vou ___?",
                "opts": [
                  "ficar lá comigo",
                  "fico lá contigo",
                  "ficando lá comigo",
                  "a ficar lá comigo"
                ],
                "ans": 0
              },
              {
                "q": "Eu cheguei no hotel e vamos ___?",
                "opts": [
                  "descanso agora",
                  "a descansar agora",
                  "descansar agora",
                  "descansando agora"
                ],
                "ans": 2
              },
              {
                "q": "Nós visitamos a Amazônia e vamos ___?",
                "opts": [
                  "a pesquisar a floresta",
                  "pesquisando a floresta",
                  "pesquisar a floresta",
                  "pesquisamos a floresta"
                ],
                "ans": 2
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the sentence into Brazilian Portuguese.",
            "items": [
              {
                "q": "I booked a flight last month and I will travel to Recife next week.",
                "ans": "Reservei um voo no mês passado e vou viajar para Recife na próxima semana."
              },
              {
                "q": "We arrived at the beach yesterday and we will swim in the sea tomorrow.",
                "ans": "Nós chegamos na praia ontem e vamos nadar no mar amanhã."
              },
              {
                "q": "She visited the museums last year and she will see them again this year.",
                "ans": "Ela visitou os museus no ano passado e vou vê-los novamente este ano."
              },
              {
                "q": "They packed their luggage and they will leave for São Paulo.",
                "ans": "Eles fizeram as malas e vão partir para São Paulo."
              },
              {
                "q": "I checked into the hotel and I will rest there tonight.",
                "ans": "Eu me hospedei no hotel e vou descansar lá esta noite."
              }
            ]
          }
        ],
        "teacherTip": "Emphasize that this structure tells a complete travel story by connecting what already happened (past) with what's coming next (future). Have students practice by telling their own travel experiences using this pattern, which reinforces both tense usage and narrative sequencing in a practical context."
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
              "pt": "Quando recebi a notícia, fiquei chocado.",
              "en": "When I received the news, I became shocked."
            },
            {
              "pt": "Minha avó ficou feliz com o presente que ganhei.",
              "en": "My grandmother got happy with the present I received."
            },
            {
              "pt": "Depois da discussão, eles ficaram irritados um com o outro.",
              "en": "After the argument, they became irritated with each other."
            },
            {
              "pt": "Fiquei nervoso antes da entrevista de emprego.",
              "en": "I got nervous before the job interview."
            },
            {
              "pt": "Quando ela deixou o namorado, ficou triste por muito tempo.",
              "en": "When she left her boyfriend, she became sad for a long time."
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
            "pt": "apaixonado/a",
            "en": "in love",
            "ex": "Ela ficou apaixonada pelo colega de trabalho.",
            "exEn": "She fell in love with her coworker."
          },
          {
            "pt": "ciumento/a",
            "en": "jealous",
            "ex": "Ele ficou ciumento quando ela saiu com amigos.",
            "exEn": "He got jealous when she went out with friends."
          },
          {
            "pt": "frustrado/a",
            "en": "frustrated",
            "ex": "Ficamos frustrados com o resultado do jogo.",
            "exEn": "We became frustrated with the game result."
          },
          {
            "pt": "envergonhado/a",
            "en": "embarrassed/ashamed",
            "ex": "O menino ficou envergonhado na frente da classe.",
            "exEn": "The boy was embarrassed in front of the class."
          },
          {
            "pt": "ressentido/a",
            "en": "resentful/hurt",
            "ex": "Ela ficou ressentida com as palavras dele.",
            "exEn": "She felt hurt by his words."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Eu sou nervoso com a notícia.",
            "correct": "Eu fiquei nervoso com a notícia.",
            "note": "Use 'ficar' for a change of state or temporary condition, not 'ser'. 'Ser' describes permanent characteristics."
          },
          {
            "wrong": "Ela ficou apaixonada a ele.",
            "correct": "Ela ficou apaixonada por ele.",
            "note": "Use 'por' (by/for) with 'apaixonado', not 'a'. The correct preposition is essential."
          },
          {
            "wrong": "Ficamos alegres porque temos boas notícias.",
            "correct": "Ficamos alegres com as boas notícias.",
            "en": "English speakers often use 'porque' (because) when they should use a preposition like 'com' (with) to express the cause/reason for the emotion.",
            "note": "Use 'com' + noun or other prepositions to indicate what caused the emotional state, not 'porque' + clause."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentences with the correct form of 'ficar' + adjective.",
            "items": [
              {
                "q": "Quando ele viu o resultado, ___ muito feliz.",
                "ans": "ficou"
              },
              {
                "q": "Nós ___ preocupados com a saúde da avó.",
                "ans": "ficamos"
              },
              {
                "q": "Você ___ arrependido da sua decisão?",
                "ans": "ficou"
              },
              {
                "q": "Eles ___ decepcionados com o filme.",
                "ans": "ficaram"
              },
              {
                "q": "Eu ___ ansioso para o fim de semana.",
                "ans": "fiquei"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option to complete the sentence.",
            "items": [
              {
                "q": "Depois da briga, Maria ___.",
                "opts": [
                  "ficou magoada",
                  "é magoada",
                  "fica magoada sempre",
                  "será magoada"
                ],
                "ans": 0
              },
              {
                "q": "Quando soubemos do casamento, ___ muito animados.",
                "opts": [
                  "fomos",
                  "ficamos",
                  "somos",
                  "estamos"
                ],
                "ans": 1
              },
              {
                "q": "O bebê ___ assustado com o barulho alto.",
                "opts": [
                  "é",
                  "fica sempre",
                  "ficou",
                  "será"
                ],
                "ans": 2
              },
              {
                "q": "Vocês ___ decepcionados ___ o resultado?",
                "opts": [
                  "ficaram / de",
                  "ficaram / com",
                  "foram / para",
                  "são / com"
                ],
                "ans": 1
              },
              {
                "q": "Eu ___ constrangido quando todos olharam para mim.",
                "opts": [
                  "sou",
                  "fiquei",
                  "estou",
                  "fico sempre"
                ],
                "ans": 1
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the sentence into Brazilian Portuguese using 'ficar + adjective'.",
            "items": [
              {
                "q": "She got angry with her sister.",
                "ans": "Ela ficou brava com a irmã."
              },
              {
                "q": "We became sad when we heard the news.",
                "ans": "Ficamos tristes quando ouvimos a notícia."
              },
              {
                "q": "He got embarrassed in front of everyone.",
                "ans": "Ele ficou envergonhado na frente de todos."
              },
              {
                "q": "They became confused about the instructions.",
                "ans": "Eles ficaram confusos com as instruções."
              },
              {
                "q": "I felt relieved after the exam.",
                "ans": "Fiquei aliviado depois da prova."
              }
            ]
          }
        ],
        "teacherTip": "Emphasize that 'ficar + adjective' describes a change or transition into a new emotional state, making it perfect for narrating how feelings change in relationships. Use before/after scenarios (e.g., 'Before: era triste. After: ficou feliz.') to help students visualize the contrast between permanent traits (ser) and temporary changes (ficar)."
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
              "pt": "Eu estava comendo quando você chegou.",
              "en": "I was eating when you arrived."
            },
            {
              "pt": "Nós temos estudado português há dois anos.",
              "en": "We have been studying Portuguese for two years."
            },
            {
              "pt": "Se eu tivesse dinheiro, viajaria para o Brasil.",
              "en": "If I had money, I would travel to Brazil."
            },
            {
              "pt": "Você vai fazer o trabalho amanhã ou já fez?",
              "en": "Are you going to do the work tomorrow or have you already done it?"
            },
            {
              "pt": "Quando criança, eu sempre ia à praia nos fins de semana.",
              "en": "When I was a child, I always went to the beach on weekends."
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
            "pt": "acontecer",
            "en": "to happen",
            "ex": "O que aconteceu ontem?",
            "exEn": "What happened yesterday?"
          },
          {
            "pt": "já",
            "en": "already",
            "ex": "Eu já comi.",
            "exEn": "I have already eaten."
          },
          {
            "pt": "enquanto",
            "en": "while",
            "ex": "Enquanto eu estudava, ela dormia.",
            "exEn": "While I was studying, she was sleeping."
          },
          {
            "pt": "próximo",
            "en": "next",
            "ex": "Próximo mês vou viajar.",
            "exEn": "Next month I'm going to travel."
          },
          {
            "pt": "costumava",
            "en": "used to",
            "ex": "Eu costumava jogar futebol.",
            "exEn": "I used to play football."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Eu tenho ido lá ontem.",
            "correct": "Eu fui lá ontem.",
            "note": "Use simple past (fui) with specific past time expressions, not present perfect (tenho ido)."
          },
          {
            "wrong": "Se você virá, eu ficarei feliz.",
            "correct": "Se você vier, eu ficarei feliz.",
            "en": "Use subjunctive (vier) in conditional clauses with 'se', not future tense (virá)."
          },
          {
            "wrong": "Enquanto eu estou estudando, não me perturbe.",
            "correct": "Enquanto eu estou estudando, não me perturbe. OR Enquanto eu estudava, ela dormia.",
            "note": "Make sure the tense in the dependent clause matches the temporal relationship (simultaneous or sequential)."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete with the correct word or verb form.",
            "items": [
              {
                "q": "Eu ___ na escola quando recebi a notícia.",
                "ans": "estava"
              },
              {
                "q": "Se você ___ tempo, venha tomar café comigo.",
                "ans": "tiver"
              },
              {
                "q": "Nós ___ morado aqui por cinco anos.",
                "ans": "temos"
              },
              {
                "q": "Quando era criança, eu ___ jogar videogame todos os dias.",
                "ans": "costumava"
              },
              {
                "q": "Você ___ visto o filme novo?",
                "ans": "já"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option.",
            "items": [
              {
                "q": "Qual frase está correta?",
                "opts": [
                  "Se eu soubesse, te diria.",
                  "Se eu souber, te digo.",
                  "Se eu sabia, te dizia.",
                  "Se eu saberia, te diria."
                ],
                "ans": 0
              },
              {
                "q": "Complete: 'Eu tenho ___ para o trabalho todos os dias.'",
                "opts": [
                  "ido",
                  "ir",
                  "irei",
                  "ia"
                ],
                "ans": 0
              },
              {
                "q": "Qual alternativa melhor completa a frase? 'Enquanto você dormia, eu ___.'",
                "opts": [
                  "trabalho",
                  "trabalhei",
                  "trabalharei",
                  "trabalhava"
                ],
                "ans": 3
              },
              {
                "q": "Complete: 'Ele ___ que chegaria cedo, mas atrasou.'",
                "opts": [
                  "disse",
                  "diz",
                  "diria",
                  "teria dito"
                ],
                "ans": 0
              },
              {
                "q": "Qual frase usa corretamente o presente perfeito?",
                "opts": [
                  "Ele tem comido pizza ontem.",
                  "Ela tem estudado há três meses.",
                  "Nós temos viajado na semana passada.",
                  "Você tem saído com amigos anteontem."
                ],
                "ans": 1
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the sentence into Brazilian Portuguese.",
            "items": [
              {
                "q": "I have been living here for ten years.",
                "ans": "Eu tenho morado aqui há dez anos."
              },
              {
                "q": "If you studied more, you would pass the exam.",
                "ans": "Se você estudasse mais, você passaria na prova."
              },
              {
                "q": "While I was cooking, my friend arrived.",
                "ans": "Enquanto eu estava cozinhando, meu amigo chegou."
              },
              {
                "q": "She used to wake up early when she was young.",
                "ans": "Ela costumava acordar cedo quando era jovem."
              },
              {
                "q": "Have you already finished your homework?",
                "ans": "Você já terminou o dever de casa?"
              }
            ]
          }
        ],
        "teacherTip": "At A2 level, students often struggle with the distinction between simple past and present perfect, and between conditional and subjunctive moods. Encourage them to focus on the temporal relationship and the certainty of the action when choosing tenses. Create timelines and conditional scenario exercises to reinforce these distinctions."
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
              "pt": "Quero que você venha à festa no sábado.",
              "en": "I want you to come to the party on Saturday."
            },
            {
              "pt": "É necessário que nós estudemos mais para passar no exame.",
              "en": "It is necessary that we study more to pass the exam."
            },
            {
              "pt": "Minha mãe insiste que eu beba mais água.",
              "en": "My mother insists that I drink more water."
            },
            {
              "pt": "Duvido que ele saiba falar italiano fluentemente.",
              "en": "I doubt that he knows how to speak Italian fluently."
            },
            {
              "pt": "É melhor que você se vista aquecido porque vai fazer frio.",
              "en": "It is better that you dress warmly because it will be cold."
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
            "pt": "exigir",
            "en": "to demand, to require",
            "ex": "O professor exige que você entregue o trabalho na segunda-feira.",
            "exEn": "The teacher demands that you submit the work on Monday."
          },
          {
            "pt": "sugerir",
            "en": "to suggest",
            "ex": "Sugiro que assistamos esse filme juntos.",
            "exEn": "I suggest that we watch this movie together."
          },
          {
            "pt": "temer",
            "en": "to fear",
            "ex": "Temo que ele não chegue a tempo.",
            "exEn": "I fear that he won't arrive on time."
          },
          {
            "pt": "é importante que",
            "en": "it is important that",
            "ex": "É importante que você durma bem antes da prova.",
            "exEn": "It is important that you sleep well before the exam."
          },
          {
            "pt": "é possível que",
            "en": "it is possible that",
            "ex": "É possível que chova amanhã.",
            "exEn": "It is possible that it will rain tomorrow."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Eu quero que você vem comigo.",
            "correct": "Eu quero que você venha comigo.",
            "note": "After 'quero que', use the subjunctive form 'venha', not the indicative 'vem'. English speakers often use indicative mood because English doesn't have a subjunctive form that looks different."
          },
          {
            "wrong": "É importante que ele vai estudar.",
            "correct": "É importante que ele estude.",
            "note": "Use subjunctive 'estude' after impersonal expressions like 'é importante que', not future indicative 'vai estudar'."
          },
          {
            "wrong": "Duvido que ela está aqui.",
            "correct": "Duvido que ela esteja aqui.",
            "note": "Verbs expressing doubt or uncertainty require the subjunctive 'esteja', not the present indicative 'está'. This pattern doesn't exist in English, so learners often use simple present instead."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete with the correct subjunctive form of the verb in parentheses.",
            "items": [
              {
                "q": "Espero que você _____ (conseguir) passar na entrevista de emprego.",
                "ans": "consiga"
              },
              {
                "q": "É fundamental que todos nós _____ (participar) da reunião de amanhã.",
                "ans": "participemos"
              },
              {
                "q": "Minha avó pede que eu a _____ (visitar) no fim de semana.",
                "ans": "visite"
              },
              {
                "q": "Não acredito que ele _____ (ter) 40 anos; parece muito mais jovem.",
                "ans": "tenha"
              },
              {
                "q": "É possível que eles _____ (mudar) de casa no próximo mês.",
                "ans": "mudem"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option.",
            "items": [
              {
                "q": "Qual frase usa corretamente o subjuntivo?",
                "opts": [
                  "Acho que ela vem hoje.",
                  "Duvido que ela vem hoje.",
                  "Duvido que ela venha hoje.",
                  "Tenho certeza que ela venha hoje."
                ],
                "ans": 2
              },
              {
                "q": "Complete: 'Recomendo que você _____ mais cuidado.'",
                "opts": [
                  "tem",
                  "tenha",
                  "terá",
                  "tinha"
                ],
                "ans": 1
              },
              {
                "q": "Qual alternativa expressa dúvida ou incerteza corretamente?",
                "opts": [
                  "Tenho certeza que ele faz isso.",
                  "Tenho certeza que ele faça isso.",
                  "Duvido que ele faz isso.",
                  "Duvido que ele faça isso."
                ],
                "ans": 3
              },
              {
                "q": "Complete: 'É essencial que nós _____ nossos documentos.'",
                "opts": [
                  "trazemos",
                  "trazermos",
                  "tragamos",
                  "trazíamos"
                ],
                "ans": 2
              },
              {
                "q": "Qual frase está incorreta?",
                "opts": [
                  "Quero que você estude comigo.",
                  "Sugiro que nós vamos juntos.",
                  "É melhor que eles saiam agora.",
                  "Temo que ele não volte a tempo."
                ],
                "ans": 1
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the sentence into Brazilian Portuguese using the subjunctive mood.",
            "items": [
              {
                "q": "I insist that you tell me the truth.",
                "ans": "Eu insisto que você me diga a verdade."
              },
              {
                "q": "It is unlikely that she will accept this job.",
                "ans": "É improvável que ela aceite este trabalho."
              },
              {
                "q": "We recommend that you visit this museum.",
                "ans": "Recomendamos que você visite este museu."
              },
              {
                "q": "My friends want me to go to the beach with them.",
                "ans": "Meus amigos querem que eu vá à praia com eles."
              },
              {
                "q": "It is possible that the weather will improve tomorrow.",
                "ans": "É possível que o tempo melhore amanhã."
              }
            ]
          }
        ],
        "teacherTip": "Emphasize that the subjunctive in Portuguese requires a change in subject between the main clause and the dependent clause (trigger phrase + que + different subject). If the subject is the same, use an infinitive instead: 'Quero ir' vs. 'Quero que você vá'. This distinction often confuses English speakers since English uses the infinitive in both cases."
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
              "pt": "Eu comia pizza toda semana quando morava em São Paulo, mas quando me mudei, parei de comer.",
              "en": "I used to eat pizza every week when I lived in São Paulo, but when I moved, I stopped eating it."
            },
            {
              "pt": "Eles assistiam a filmes toda noite até que compraram aquele videogame novo.",
              "en": "They used to watch movies every night until they bought that new videogame."
            },
            {
              "pt": "Meu avó contava histórias incríveis enquanto eu o escutava atentamente, mas ele faleceu no mês passado.",
              "en": "My grandfather used to tell incredible stories while I listened to him carefully, but he passed away last month."
            },
            {
              "pt": "Ela trabalha lá há cinco anos quando recebeu uma promoção inesperada.",
              "en": "She had been working there for five years when she received an unexpected promotion."
            },
            {
              "pt": "Nós brincávamos no parque toda tarde, porém um dia a gente se machucou jogando bola.",
              "en": "We used to play in the park every afternoon, but one day we got hurt playing ball."
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
            "pt": "enquanto",
            "en": "while",
            "ex": "Enquanto eu estudava, meu irmão chegou.",
            "exEn": "While I was studying, my brother arrived."
          },
          {
            "pt": "de repente",
            "en": "suddenly",
            "ex": "Eu caminhava tranquilamente quando, de repente, começou a chover.",
            "exEn": "I was walking peacefully when, suddenly, it started to rain."
          },
          {
            "pt": "sempre",
            "en": "always",
            "ex": "Ela sempre tomava café da manhã cedo, mas ontem acordou tarde.",
            "exEn": "She always had breakfast early, but yesterday she woke up late."
          },
          {
            "pt": "acontecer",
            "en": "to happen",
            "ex": "Um acidente aconteceu quando eu dirigia para o trabalho.",
            "exEn": "An accident happened when I was driving to work."
          },
          {
            "pt": "interromper",
            "en": "to interrupt",
            "ex": "Ela interrompeu a conversa que eu tinha com meu chefe.",
            "exEn": "She interrupted the conversation I was having with my boss."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Quando eu cheguei em casa, minha mãe cozinhava o jantar.",
            "correct": "Quando eu cheguei em casa, minha mãe estava cozinhando o jantar.",
            "note": "English speakers often omit 'estar' with the gerund in the imperfect. Use 'estava + gerund' for ongoing actions interrupted by a completed event."
          },
          {
            "wrong": "Eu estudei quando meu amigo me chamou.",
            "correct": "Eu estudava quando meu amigo me chamou.",
            "note": "The background action (studying) should be imperfect (-ava/-ia), not perfect. Only the interrupting event uses the perfect tense."
          },
          {
            "wrong": "Todo dia ele ia ao trabalho e encontrou seus amigos.",
            "correct": "Todo dia ele ia ao trabalho e encontrava seus amigos.",
            "note": "Habitual actions in the past require the imperfect throughout. Use 'encontrava' not 'encontrou' for repeated past habits."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete with the correct verb form (imperfeito or perfeito).",
            "items": [
              {
                "q": "Quando meu telefone _____ (tocar), eu _____ (dormir).",
                "ans": "tocou, dormia"
              },
              {
                "q": "Ela _____ (estudar) Português todo dia até que _____ (decidir) mudar de carreira.",
                "ans": "estudava, decidiu"
              },
              {
                "q": "Nós _____ (caminhar) no parque quando _____ (começar) a chover.",
                "ans": "caminhávamos, começou"
              },
              {
                "q": "Eu _____ (trabalhar) lá por três anos e _____ (receber) um prêmio especial.",
                "ans": "trabalhava, recebi"
              },
              {
                "q": "Eles _____ (jogar) futebol todos os fins de semana, mas _____ (parar) quando _____ (se machucar).",
                "ans": "jogavam, pararam, se machucaram"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct verb form.",
            "items": [
              {
                "q": "Enquanto eu _____ a lição, meu pai _____ do trabalho.",
                "opts": [
                  "estudei / chegou",
                  "estudava / chegava",
                  "estudava / chegou",
                  "estudei / chegava"
                ],
                "ans": 2
              },
              {
                "q": "Ela sempre _____ à praia no verão, mas este ano _____ para a montanha.",
                "opts": [
                  "vai / foi",
                  "ia / ia",
                  "ia / foi",
                  "foi / vai"
                ],
                "ans": 2
              },
              {
                "q": "De repente, um carro _____ enquanto nós _____ a rua.",
                "opts": [
                  "passou / cruzávamos",
                  "passava / cruzamos",
                  "passou / cruzamos",
                  "passava / cruzávamos"
                ],
                "ans": 0
              },
              {
                "q": "Quando eu _____ menino, eu _____ muito chocolate.",
                "opts": [
                  "era / comia",
                  "fui / comi",
                  "era / comi",
                  "fui / comia"
                ],
                "ans": 0
              },
              {
                "q": "Eles _____ na empresa por dez anos até que _____ a oportunidade de abrir seu próprio negócio.",
                "opts": [
                  "trabalharam / tiveram",
                  "trabalhavam / tinham",
                  "trabalhavam / tiveram",
                  "trabalharam / tinham"
                ],
                "ans": 2
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the sentence into Brazilian Portuguese using imperfeito and perfeito correctly.",
            "items": [
              {
                "q": "While I was cooking dinner, my sister called me.",
                "ans": "Enquanto eu cozinhava o jantar, minha irmã me ligou."
              },
              {
                "q": "He used to drink coffee every morning, but yesterday he drank tea instead.",
                "ans": "Ele bebia café toda manhã, mas ontem ele bebeu chá em vez disso."
              },
              {
                "q": "I was reading a book when the earthquake happened.",
                "ans": "Eu lia um livro quando o terremoto aconteceu."
              },
              {
                "q": "They played soccer every weekend until they moved to another city.",
                "ans": "Eles jogavam futebol todo fim de semana até que se mudaram para outra cidade."
              },
              {
                "q": "She was taking a shower when I arrived at the house.",
                "ans": "Ela estava tomando banho quando cheguei na casa."
              }
            ]
          }
        ],
        "teacherTip": "Emphasize that the imperfeito sets the background scene (what was happening/used to happen) while the perfeito interrupts it with a specific completed event. Use 'enquanto' and 'quando' as helpful transition words to show these two time frames clearly."
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
              "pt": "Se eu fosse você, pediria desculpas imediatamente.",
              "en": "If I were you, I would apologize immediately."
            },
            {
              "pt": "Se ela tivesse dinheiro suficiente, compraria um carro novo.",
              "en": "If she had enough money, she would buy a new car."
            },
            {
              "pt": "Se nós ganhássemos o jogo, celebraríamos a noite toda.",
              "en": "If we won the game, we would celebrate all night."
            },
            {
              "pt": "Se vocês tivessem chegado a tempo, teriam visto o show inteiro.",
              "en": "If you had arrived on time, you would have seen the whole show."
            },
            {
              "pt": "Se eu pudesse mudar uma coisa no passado, mudaria minha decisão de trabalho.",
              "en": "If I could change one thing in the past, I would change my work decision."
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
            "pt": "arrependido/a",
            "en": "regretful, sorry",
            "ex": "Se eu tivesse estudado mais, não estaria arrependido agora.",
            "exEn": "If I had studied more, I wouldn't be regretful now."
          },
          {
            "pt": "infelizmente",
            "en": "unfortunately",
            "ex": "Se eu ganhasse na loteria, infelizmente não saberia o que fazer com o dinheiro.",
            "exEn": "If I won the lottery, unfortunately I wouldn't know what to do with the money."
          },
          {
            "pt": "aproveitar",
            "en": "to take advantage of, to make the most of",
            "ex": "Se tivesse mais tempo livre, aproveitaria para viajar.",
            "exEn": "If I had more free time, I would take advantage to travel."
          },
          {
            "pt": "facilitar",
            "en": "to make easier, to facilitate",
            "ex": "Se você falasse português melhor, facilitaria sua vida no Brasil.",
            "exEn": "If you spoke Portuguese better, it would make your life easier in Brazil."
          },
          {
            "pt": "impediria",
            "en": "would prevent",
            "ex": "Se chovesse, isso impediria nosso passeio.",
            "exEn": "If it rained, that would prevent our outing."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Se eu era você, pediria desculpas.",
            "correct": "Se eu fosse você, pediria desculpas.",
            "note": "English speakers often use the imperfect (era) instead of the conditional imperfect (fosse). Remember: 'se' clauses with hypothetical situations require 'fosse/tivesse', not past indicative."
          },
          {
            "wrong": "Se ele teria dinheiro, compraria um carro.",
            "correct": "Se ele tivesse dinheiro, compraria um carro.",
            "note": "Do not use the conditional 'teria' in the 'se' clause. Use the conditional imperfect 'tivesse' instead. The conditional form (-ia) belongs only in the main clause."
          },
          {
            "wrong": "Se você chegasse a tempo, você verá o show.",
            "correct": "Se você chegasse a tempo, você veria o show.",
            "note": "Both clauses must use the same tense framework. Use conditional imperfect (-sse) in the 'se' clause and conditional future (-ia/-ria) in the result clause, not present tense."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentence with the correct conditional form.",
            "items": [
              {
                "q": "Se eu tivesse mais dinheiro, eu ___ uma casa maior.",
                "ans": "compraria"
              },
              {
                "q": "Se nós fôssemos inteligentes, ___ a resposta certa.",
                "ans": "saberíamos"
              },
              {
                "q": "Se ela chegasse cedo, ___ comigo no café.",
                "ans": "tomaria"
              },
              {
                "q": "Se vocês estudassem mais, ___ no teste.",
                "ans": "passariam"
              },
              {
                "q": "Se eu fosse ele, não ___ esse erro.",
                "ans": "cometeria"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct conditional form to complete the sentence.",
            "items": [
              {
                "q": "Se você tivesse tempo, o que ___?",
                "opts": [
                  "você faria",
                  "você faz",
                  "você fez",
                  "você vai fazer"
                ],
                "ans": 0
              },
              {
                "q": "Se ele fosse mais responsável, ___ todos os prazos.",
                "opts": [
                  "cumprisse",
                  "cumpriria",
                  "cumprirá",
                  "cumpriu"
                ],
                "ans": 1
              },
              {
                "q": "Se nós tivéssemos viajado juntos, ___ muito mais divertido.",
                "opts": [
                  "seria",
                  "teria sido",
                  "foi",
                  "fosse"
                ],
                "ans": 1
              },
              {
                "q": "Se ela chegasse na hora, não ___ a reunião.",
                "opts": [
                  "perderia",
                  "perde",
                  "perdeu",
                  "perderá"
                ],
                "ans": 0
              },
              {
                "q": "Se vocês tivessem dúvidas, ___ à professora.",
                "opts": [
                  "perguntariam",
                  "perguntam",
                  "perguntaram",
                  "perguntarão"
                ],
                "ans": 0
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the sentence into Brazilian Portuguese using conditional structures.",
            "items": [
              {
                "q": "If I were rich, I would travel around the world.",
                "ans": "Se eu fosse rico, eu viajaria pelo mundo todo."
              },
              {
                "q": "If you had studied, you would have passed the exam.",
                "ans": "Se você tivesse estudado, você teria passado no exame."
              },
              {
                "q": "If we left now, we would arrive on time.",
                "ans": "Se nós saíssemos agora, nós chegaríamos na hora."
              },
              {
                "q": "If she had known, she would not have made that mistake.",
                "ans": "Se ela tivesse sabido, ela não teria cometido esse erro."
              },
              {
                "q": "If they were in your situation, what would they do?",
                "ans": "Se eles fossem na sua situação, o que eles fariam?"
              }
            ]
          }
        ],
        "teacherTip": "Emphasize that the 'se' clause always uses the imperfect subjunctive (-sse, fosse, tivesse) while the result clause always uses the conditional (-ia, -ria). This is the core structure students must internalize to avoid mixing tenses. Use contrastive examples comparing correct conditionals with incorrect past indicatives."
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
              "pt": "A lei foi sancionada pelo Presidente da República.",
              "en": "The law was signed/enacted by the President of the Republic."
            },
            {
              "pt": "O relatório foi preparado pela equipe de pesquisa.",
              "en": "The report was prepared by the research team."
            },
            {
              "pt": "A apresentação foi realizada por dois especialistas.",
              "en": "The presentation was given by two specialists."
            },
            {
              "pt": "As mudanças foram decididas por consenso entre os gestores.",
              "en": "The changes were decided by consensus among the managers."
            },
            {
              "pt": "O projeto foi desenvolvido por profissionais experientes.",
              "en": "The project was developed by experienced professionals."
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
            "pt": "redigir",
            "en": "to draft; to write",
            "ex": "O documento foi redigido por um advogado.",
            "exEn": "The document was drafted by a lawyer."
          },
          {
            "pt": "aprovado/a",
            "en": "approved",
            "ex": "A proposta foi aprovada por todos os membros.",
            "exEn": "The proposal was approved by all members."
          },
          {
            "pt": "publicado/a",
            "en": "published",
            "ex": "O livro foi publicado por uma editora importante.",
            "exEn": "The book was published by an important publishing house."
          },
          {
            "pt": "investigado/a",
            "en": "investigated",
            "ex": "O caso foi investigado por policiais especializados.",
            "exEn": "The case was investigated by specialized police officers."
          },
          {
            "pt": "implementado/a",
            "en": "implemented",
            "ex": "A nova política foi implementada por diretores.",
            "exEn": "The new policy was implemented by directors."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "A carta foi escrita para o diretor.",
            "correct": "A carta foi escrita pelo diretor.",
            "note": "In passive voice, use 'por' (by) for the agent, not 'para' (for/to). 'Para' indicates destination, not the doer of the action."
          },
          {
            "wrong": "O trabalho foi realizado de todos os alunos.",
            "correct": "O trabalho foi realizado por todos os alunos.",
            "note": "The preposition before the agent is 'por', not 'de'. Use 'de' only in certain expressions like 'ser amado de alguém' (to be loved by someone)."
          },
          {
            "wrong": "A decisão foi tomada por o presidente.",
            "correct": "A decisão foi tomada pelo presidente.",
            "note": "When 'por' precedes the definite article 'o', 'a', 'os', 'as', they contract: pelo, pela, pelos, pelas."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentences with the correct form of 'ser' in the past and the appropriate preposition.",
            "items": [
              {
                "q": "O contrato _____ assinado _____ ambas as partes.",
                "ans": "foi, por"
              },
              {
                "q": "As metas _____ estabelecidas _____ a diretoria.",
                "ans": "foram, pela"
              },
              {
                "q": "A pesquisa _____ conduzida _____ pesquisadores renomados.",
                "ans": "foi, por"
              },
              {
                "q": "As normas _____ implementadas _____ governo federal.",
                "ans": "foram, pelo"
              },
              {
                "q": "O projeto _____ finalizado _____ toda a equipe.",
                "ans": "foi, por"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct passive voice sentence.",
            "items": [
              {
                "q": "Which sentence is grammatically correct?",
                "opts": [
                  "O documento foi preparado de um funcionário.",
                  "O documento foi preparado por um funcionário.",
                  "O documento foi preparado para um funcionário.",
                  "O documento foi preparado em um funcionário."
                ],
                "ans": 1
              },
              {
                "q": "Select the correct passive construction:",
                "opts": [
                  "A lei foi sancionada para o presidente.",
                  "A lei foi sancionada com o presidente.",
                  "A lei foi sancionada pelo presidente.",
                  "A lei foi sancionada de o presidente."
                ],
                "ans": 2
              },
              {
                "q": "Which option correctly uses passive voice?",
                "opts": [
                  "O relatório foi escrito pelos analistas.",
                  "O relatório foi escrito de analistas.",
                  "O relatório foi escrito para analistas.",
                  "O relatório foi escrito nos analistas."
                ],
                "ans": 0
              },
              {
                "q": "Choose the grammatically correct sentence:",
                "opts": [
                  "A decisão era tomada por o gerente.",
                  "A decisão era tomada pelo gerente.",
                  "A decisão era tomada por do gerente.",
                  "A decisão era tomada com o gerente."
                ],
                "ans": 1
              },
              {
                "q": "Which is the correct passive form?",
                "opts": [
                  "As propostas foram rejeitadas pela comissão.",
                  "As propostas foram rejeitadas de comissão.",
                  "As propostas foram rejeitadas para comissão.",
                  "As propostas foram rejeitadas em comissão."
                ],
                "ans": 0
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate each English sentence into Brazilian Portuguese using passive voice.",
            "items": [
              {
                "q": "The report was written by the consultant.",
                "ans": "O relatório foi escrito pelo consultor."
              },
              {
                "q": "The decision was made by the board of directors.",
                "ans": "A decisão foi tomada pelo conselho de administração."
              },
              {
                "q": "The plan was developed by experienced professionals.",
                "ans": "O plano foi desenvolvido por profissionais experientes."
              },
              {
                "q": "The regulations were approved by the government.",
                "ans": "Os regulamentos foram aprovados pelo governo."
              },
              {
                "q": "The project was completed by the entire team.",
                "ans": "O projeto foi concluído por toda a equipe."
              }
            ]
          }
        ],
        "teacherTip": "Emphasize that Brazilian Portuguese uses 'ser + past participle + por' for formal written contexts. Remind students that 'por' always precedes the agent and contracts with definite articles (pelo, pela, pelos, pelas), which is a common mistake for English speakers accustomed to prepositions that don't contract."
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
              "pt": "Você tem que entregar o relatório até sexta-feira.",
              "en": "You must hand in the report by Friday."
            },
            {
              "pt": "Ela deveria conversar com o gerente sobre o aumento.",
              "en": "She should talk to the manager about the raise."
            },
            {
              "pt": "Nós temos que estudar mais para passar no exame.",
              "en": "We must study more to pass the exam."
            },
            {
              "pt": "Você deveria descansar mais; está muito cansado.",
              "en": "You should rest more; you are very tired."
            },
            {
              "pt": "Eles têm que respeitar as regras da empresa.",
              "en": "They must respect the company rules."
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
            "pt": "a responsabilidade",
            "en": "responsibility",
            "ex": "Você tem a responsabilidade de cuidar do projeto.",
            "exEn": "You have the responsibility to take care of the project."
          },
          {
            "pt": "imprescindível",
            "en": "essential/imperative",
            "ex": "É imprescindível que você chegue na hora.",
            "exEn": "It is essential that you arrive on time."
          },
          {
            "pt": "a obrigação",
            "en": "obligation/duty",
            "ex": "Tenho a obrigação de ajudar minha família.",
            "exEn": "I have the obligation to help my family."
          },
          {
            "pt": "recomendável",
            "en": "advisable/recommended",
            "ex": "É recomendável estudar antes da prova.",
            "exEn": "It is advisable to study before the exam."
          },
          {
            "pt": "necessário",
            "en": "necessary",
            "ex": "É necessário trazer documentos para a reunião.",
            "exEn": "It is necessary to bring documents to the meeting."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Você deve de estudar mais.",
            "correct": "Você deve estudar mais. / Você tem que estudar mais.",
            "note": "In Brazilian Portuguese, 'deve' does not require 'de' before the infinitive. Use 'deve + infinitive' or 'tem que + infinitive', not 'deve de'."
          },
          {
            "wrong": "Eu devo que fazer isto.",
            "correct": "Eu tenho que fazer isto. / Eu devo fazer isto.",
            "en": "Don't use 'que' between the obligation verb and the infinitive. Connect directly with the infinitive."
          },
          {
            "wrong": "Deveria você ir à reunião.",
            "correct": "Você deveria ir à reunião.",
            "note": "In B1 statements, maintain standard word order (subject + deveria + infinitive), not inversion. Inversion is used primarily in questions."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete with 'ter que' or 'deveria' in the correct form.",
            "items": [
              {
                "q": "Você ___ chegar cedo amanhã porque a reunião começa às 8 horas.",
                "ans": "tem que"
              },
              {
                "q": "Ele ___ parar de fumar para melhorar sua saúde.",
                "ans": "deveria"
              },
              {
                "q": "Nós ___ pagar a conta antes do final do mês.",
                "ans": "temos que"
              },
              {
                "q": "Elas ___ respeitar o horário de entrada.",
                "ans": "têm que"
              },
              {
                "q": "Você ___ ser mais educado com os colegas.",
                "ans": "deveria"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option.",
            "items": [
              {
                "q": "Qual frase expressa obrigação mais forte?",
                "opts": [
                  "Você deveria fazer isto.",
                  "Você tem que fazer isto.",
                  "É bom fazer isto.",
                  "Talvez você faça isto."
                ],
                "ans": 1
              },
              {
                "q": "Complete: 'O professor disse que nós ___ entregar o trabalho na segunda-feira.'",
                "opts": [
                  "devemos de fazer",
                  "temos que fazer",
                  "devemos fazer",
                  "ambas B e C"
                ],
                "ans": 3
              },
              {
                "q": "Qual opção usa 'deveria' corretamente?",
                "opts": [
                  "Eles deveriam de estudar.",
                  "Eles deveria estudar.",
                  "Eles deveriam estudar.",
                  "Eles deveria de estudar."
                ],
                "ans": 2
              },
              {
                "q": "Complete: 'Se você quer ser saudável, ___ praticar exercícios.'",
                "opts": [
                  "você tem que",
                  "você deveria",
                  "você deve",
                  "todas as opções"
                ],
                "ans": 3
              },
              {
                "q": "Qual sentença expressa conselho/sugestão?",
                "opts": [
                  "Você tem que vir à festa.",
                  "Você deveria vir à festa.",
                  "Você vai vir à festa.",
                  "Você virá à festa."
                ],
                "ans": 1
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the sentence into Brazilian Portuguese.",
            "items": [
              {
                "q": "You must call your mother today.",
                "ans": "Você tem que ligar para sua mãe hoje."
              },
              {
                "q": "She should ask for help from her colleagues.",
                "ans": "Ela deveria pedir ajuda dos seus colegas."
              },
              {
                "q": "We must finish this project by next week.",
                "ans": "Nós temos que terminar este projeto até a próxima semana."
              },
              {
                "q": "He should be more careful with his words.",
                "ans": "Ele deveria ser mais cuidadoso com suas palavras."
              },
              {
                "q": "They must respect the company's policies.",
                "ans": "Eles têm que respeitar as políticas da empresa."
              }
            ]
          }
        ],
        "teacherTip": "Emphasize that 'ter que' expresses strong, non-negotiable obligation (must), while 'deveria' softens the tone as friendly advice or mild suggestion (should). Use context-dependent examples to show how tone changes based on the situation and relationship between speakers."
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
              "pt": "Talvez eu compre um carro novo no próximo ano.",
              "en": "Perhaps I will buy a new car next year."
            },
            {
              "pt": "Talvez ela saiba falar italiano.",
              "en": "Maybe she knows how to speak Italian."
            },
            {
              "pt": "Talvez nós venhamos para a festa mais cedo.",
              "en": "Perhaps we might come to the party earlier."
            },
            {
              "pt": "Talvez o filme seja interessante.",
              "en": "Maybe the movie will be interesting."
            },
            {
              "pt": "Talvez eles estejam em casa agora.",
              "en": "Perhaps they are at home now."
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
            "pt": "improvável",
            "en": "unlikely",
            "ex": "É improvável que ele chegue na hora.",
            "exEn": "It's unlikely that he arrives on time."
          },
          {
            "pt": "possível",
            "en": "possible",
            "ex": "É possível que chova amanhã.",
            "exEn": "It's possible that it rains tomorrow."
          },
          {
            "pt": "provável",
            "en": "probable/likely",
            "ex": "É provável que a reunião seja adiada.",
            "exEn": "It's likely that the meeting will be postponed."
          },
          {
            "pt": "duvidoso",
            "en": "doubtful",
            "ex": "É duvidoso que ele saiba a resposta.",
            "exEn": "It's doubtful that he knows the answer."
          },
          {
            "pt": "incerto",
            "en": "uncertain",
            "ex": "É incerto se ela venha à festa.",
            "exEn": "It's uncertain whether she comes to the party."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Talvez ele vem à festa.",
            "correct": "Talvez ele venha à festa.",
            "note": "After 'talvez', you must use the present subjunctive (venha), not the indicative (vem). The subjunctive is mandatory with talvez."
          },
          {
            "wrong": "Talvez que ela faça isso.",
            "correct": "Talvez ela faça isso.",
            "note": "In Brazilian Portuguese, 'talvez' does not require the conjunction 'que'. Use 'talvez + subjunctive' directly without 'que'."
          },
          {
            "wrong": "Talvez eu sou cansado.",
            "correct": "Talvez eu seja cansado.",
            "note": "Use the subjunctive 'seja' (to be) instead of the indicative 'sou'. The subjunctive expresses uncertainty/possibility."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentences with the correct present subjunctive form of the verb in parentheses.",
            "items": [
              {
                "q": "Talvez ele ___ (vir) mais tarde.",
                "ans": "venha"
              },
              {
                "q": "Talvez nós ___ (poder) ir à praia no fim de semana.",
                "ans": "possamos"
              },
              {
                "q": "Talvez ela ___ (saber) a verdade sobre isso.",
                "ans": "saiba"
              },
              {
                "q": "Talvez eles ___ (estar) ocupados amanhã.",
                "ans": "estejam"
              },
              {
                "q": "Talvez você ___ (querer) tentar novamente.",
                "ans": "queira"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option to complete each sentence.",
            "items": [
              {
                "q": "Talvez o projeto ___ pronto na próxima semana.",
                "opts": [
                  "fica",
                  "fique",
                  "ficará",
                  "ficou"
                ],
                "ans": 1
              },
              {
                "q": "Talvez nós ___ tempo para estudar hoje.",
                "opts": [
                  "temos",
                  "tenhamos",
                  "teremos",
                  "tivemos"
                ],
                "ans": 1
              },
              {
                "q": "Talvez a professora ___ aula de reposição.",
                "opts": [
                  "dá",
                  "der",
                  "dê",
                  "dava"
                ],
                "ans": 2
              },
              {
                "q": "Talvez eu ___ essa oportunidade.",
                "opts": [
                  "aproveito",
                  "aproveitar",
                  "aproveite",
                  "aproveitei"
                ],
                "ans": 2
              },
              {
                "q": "Talvez eles ___ para o Brasil no mês que vem.",
                "opts": [
                  "vão",
                  "vão",
                  "vão",
                  "vão"
                ],
                "ans": 1
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the sentences into Brazilian Portuguese using 'talvez + subjunctive'.",
            "items": [
              {
                "q": "Maybe he understands Portuguese well.",
                "ans": "Talvez ele entenda bem o português."
              },
              {
                "q": "Perhaps we will have lunch together tomorrow.",
                "ans": "Talvez nós almoçemos juntos amanhã."
              },
              {
                "q": "Maybe she knows the answer to the question.",
                "ans": "Talvez ela saiba a resposta da pergunta."
              },
              {
                "q": "Perhaps they will like this restaurant.",
                "ans": "Talvez eles gostem deste restaurante."
              },
              {
                "q": "Maybe you should try a different approach.",
                "ans": "Talvez você tente uma abordagem diferente."
              }
            ]
          }
        ],
        "teacherTip": "Emphasize that 'talvez' ALWAYS triggers the present subjunctive in Brazilian Portuguese—this is non-negotiable and differs from English where 'maybe/perhaps' don't require mood changes. Drill the subjunctive conjugations of high-frequency verbs (ser, estar, ir, ter, poder, querer, saber) alongside 'talvez' to build automaticity."
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
              "pt": "O filme foi interessante; além disso, os atores foram excelentes.",
              "en": "The film was interesting; furthermore, the actors were excellent."
            },
            {
              "pt": "Ele estudou muito; no entanto, não passou no exame.",
              "en": "He studied a lot; however, he didn't pass the exam."
            },
            {
              "pt": "Faz frio e está chovendo; portanto, vou ficar em casa.",
              "en": "It's cold and raining; therefore, I'm going to stay home."
            },
            {
              "pt": "Apesar de estar cansada, ela foi à festa.",
              "en": "Despite being tired, she went to the party."
            },
            {
              "pt": "Visto que você não terminou o trabalho, precisamos conversar com o chefe.",
              "en": "Given that you didn't finish the work, we need to talk to the boss."
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
            "pt": "contudo",
            "en": "however",
            "ex": "Ela queria viajar; contudo, não tinha dinheiro.",
            "exEn": "She wanted to travel; however, she didn't have money."
          },
          {
            "pt": "consequentemente",
            "en": "consequently",
            "ex": "Perdeu o ônibus e, consequentemente, chegou atrasado.",
            "exEn": "He missed the bus and, consequently, arrived late."
          },
          {
            "pt": "ainda que",
            "en": "even though",
            "ex": "Ainda que tivesse cansado, ele continuou trabalhando.",
            "exEn": "Even though he was tired, he continued working."
          },
          {
            "pt": "uma vez que",
            "en": "since / as",
            "ex": "Uma vez que você chegou cedo, podemos começar agora.",
            "exEn": "Since you arrived early, we can start now."
          },
          {
            "pt": "por conseguinte",
            "en": "therefore",
            "ex": "A economia caiu; por conseguinte, muitos perderam seus empregos.",
            "exEn": "The economy fell; therefore, many lost their jobs."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Apesar ele estar doente, foi trabalhar.",
            "correct": "Apesar de estar doente, foi trabalhar.",
            "note": "Always use 'apesar de' with the preposition 'de'. The preposition is mandatory, not optional."
          },
          {
            "wrong": "Visto que a reunião, vamos começar.",
            "correct": "Visto que chegou a hora, vamos começar.",
            "note": "'Visto que' must be followed by a complete clause, not just a noun. It means 'since' or 'given that'."
          },
          {
            "wrong": "Portanto ele chegou atrasado, perdeu a apresentação.",
            "correct": "Ele chegou atrasado; portanto, perdeu a apresentação.",
            "en": "'Portanto' should connect two independent clauses, usually with a semicolon or period before it, not join them like 'because'."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete with the correct connector from the unit.",
            "items": [
              {
                "q": "Ele trabalha muito; ___, sua família está sempre em primeiro lugar.",
                "ans": "no entanto"
              },
              {
                "q": "___ de ter pouco tempo, ela conseguiu terminar o projeto.",
                "ans": "Apesar"
              },
              {
                "q": "A loja estava fechada; ___, fomos para casa.",
                "ans": "portanto"
              },
              {
                "q": "___ você não respondeu meus e-mails, preciso falar com você pessoalmente.",
                "ans": "Visto que"
              },
              {
                "q": "O bolo ficou delicioso e, ___, todo mundo repetiu.",
                "ans": "além disso"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option that best completes the sentence.",
            "items": [
              {
                "q": "Ela conhece bem o assunto; ___, sua opinião é muito valiosa.",
                "opts": [
                  "portanto",
                  "apesar de",
                  "visto que",
                  "no entanto"
                ],
                "ans": 0
              },
              {
                "q": "___ estar com gripe, o médico continuou atendendo seus pacientes.",
                "opts": [
                  "Visto que",
                  "Portanto",
                  "Apesar de",
                  "No entanto"
                ],
                "ans": 2
              },
              {
                "q": "Aquele livro é caro e difícil; ___, é uma leitura obrigatória.",
                "opts": [
                  "além disso",
                  "no entanto",
                  "apesar de",
                  "portanto"
                ],
                "ans": 1
              },
              {
                "q": "___ a empresa investiu mais em tecnologia, seus lucros aumentaram significativamente.",
                "opts": [
                  "Apesar de",
                  "Uma vez que",
                  "No entanto",
                  "Portanto"
                ],
                "ans": 1
              },
              {
                "q": "O gerente é rigoroso; ___, é um chefe muito justo e respeitado.",
                "opts": [
                  "visto que",
                  "além disso",
                  "no entanto",
                  "portanto"
                ],
                "ans": 2
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the sentence into Brazilian Portuguese using the appropriate connector.",
            "items": [
              {
                "q": "Despite the traffic, we arrived on time.",
                "ans": "Apesar do trânsito, chegamos na hora."
              },
              {
                "q": "The project was complex; furthermore, the deadline was very short.",
                "ans": "O projeto era complexo; além disso, o prazo era muito curto."
              },
              {
                "q": "Since it was raining, the game was postponed.",
                "ans": "Visto que estava chovendo, o jogo foi adiado."
              },
              {
                "q": "She studied hard; however, she didn't achieve the grade she wanted.",
                "ans": "Ela estudou muito; no entanto, não conseguiu a nota que queria."
              },
              {
                "q": "He was sick; therefore, he missed the meeting.",
                "ans": "Ele estava doente; portanto, perdeu a reunião."
              }
            ]
          }
        ],
        "teacherTip": "Emphasize that 'apesar de' always requires the preposition 'de' and typically introduces a contrast with what follows. Help students distinguish between 'portanto' (consequence/conclusion) and 'no entanto' (opposition/contrast) as they're often confused by English speakers who may use 'but' and 'so' interchangeably."
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
              "pt": "Gostaria de falar com o gerente sobre este assunto.",
              "en": "I would like to speak with the manager about this matter."
            },
            {
              "pt": "Poderia me oferecer uma solução para este problema?",
              "en": "Could you offer me a solution for this problem?"
            },
            {
              "pt": "Deveria ter recebido meu pedido na semana passada.",
              "en": "I should have received my order last week."
            },
            {
              "pt": "Você poderia devolver meu dinheiro ou trocar o produto?",
              "en": "Could you return my money or exchange the product?"
            },
            {
              "pt": "Deveria ser responsabilidade da empresa resolver este defeito.",
              "en": "It should be the company's responsibility to fix this defect."
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
            "ex": "Tenho uma reclamação sobre o atendimento.",
            "exEn": "I have a complaint about the service."
          },
          {
            "pt": "resolver",
            "en": "to resolve/solve",
            "ex": "Precisamos resolver este problema hoje.",
            "exEn": "We need to resolve this problem today."
          },
          {
            "pt": "insatisfeito/a",
            "en": "unsatisfied/dissatisfied",
            "ex": "O cliente está insatisfeito com o produto.",
            "exEn": "The customer is dissatisfied with the product."
          },
          {
            "pt": "reembolso",
            "en": "refund",
            "ex": "Gostaria de solicitar um reembolso.",
            "exEn": "I would like to request a refund."
          },
          {
            "pt": "defeito",
            "en": "defect/flaw",
            "ex": "O aparelho apresenta um defeito de fabricação.",
            "exEn": "The device has a manufacturing defect."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Gosto de falar com o gerente.",
            "correct": "Gostaria de falar com o gerente.",
            "note": "Use 'gostaria' (conditional) for polite requests, not 'gosto' (present). 'Gosto' is too casual for formal complaints."
          },
          {
            "wrong": "Você pode me dar um reembolso?",
            "correct": "Você poderia me dar um reembolso?",
            "note": "Use 'poderia' (conditional) to sound more polite and formal. 'Pode' is direct and can seem demanding."
          },
          {
            "wrong": "Deveria você resolver este problema.",
            "correct": "Você deveria resolver este problema.",
            "note": "In Portuguese, the subject pronoun comes before the conjugated verb, not after it in conditional statements."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentences with the appropriate conditional verb (gostaria, poderia, or deveria).",
            "items": [
              {
                "q": "Eu ___ registrar uma reclamação sobre a qualidade do serviço.",
                "ans": "gostaria"
              },
              {
                "q": "Você ___ me ajudar a encontrar uma solução?",
                "ans": "poderia"
              },
              {
                "q": "A empresa ___ oferecer um reembolso para este produto defeituoso.",
                "ans": "deveria"
              },
              {
                "q": "Nós ___ falar com o supervisor sobre este assunto.",
                "ans": "gostaríamos"
              },
              {
                "q": "Eles ___ ter entregado o pedido no prazo correto.",
                "ans": "deveriam"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the most polite and formal option to complete the sentence.",
            "items": [
              {
                "q": "___ uma troca de produto, por favor.",
                "opts": [
                  "Quero",
                  "Gostaria",
                  "Preciso",
                  "Tenho"
                ],
                "ans": 1
              },
              {
                "q": "Você ___ verificar o número do meu pedido no sistema?",
                "opts": [
                  "pode",
                  "poderia",
                  "podia",
                  "pôde"
                ],
                "ans": 1
              },
              {
                "q": "Este problema ___ ter sido resolvido há uma semana.",
                "opts": [
                  "pode",
                  "poderia",
                  "deveria",
                  "gostaria"
                ],
                "ans": 2
              },
              {
                "q": "___ de receber uma resposta sobre minha reclamação em 48 horas.",
                "opts": [
                  "Gosto",
                  "Gostei",
                  "Gostaria",
                  "Gostava"
                ],
                "ans": 2
              },
              {
                "q": "Nós ___ uma explicação clara sobre o defeito.",
                "opts": [
                  "queremos",
                  "gostaríamos",
                  "precisamos",
                  "temos"
                ],
                "ans": 1
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the following sentences into Brazilian Portuguese using the conditional form.",
            "items": [
              {
                "q": "I would like to speak with customer service.",
                "ans": "Gostaria de falar com o atendimento ao cliente."
              },
              {
                "q": "Could you help me resolve this issue?",
                "ans": "Você poderia me ajudar a resolver este problema?"
              },
              {
                "q": "The company should offer a refund.",
                "ans": "A empresa deveria oferecer um reembolso."
              },
              {
                "q": "Would you be able to exchange this product?",
                "ans": "Você poderia trocar este produto?"
              },
              {
                "q": "I would like to file a formal complaint.",
                "ans": "Gostaria de fazer uma reclamação formal."
              }
            ]
          }
        ],
        "teacherTip": "Emphasize that the conditional forms (gostaria, poderia, deveria) are essential for B1 students to sound respectful and professional when making complaints in Portuguese. Remind students that English speakers often use the present tense directly ('I want,' 'Can you'), but Brazilian Portuguese expects the conditional for formal, polite requests in service contexts."
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
              "pt": "Era uma noite escura quando o telefone tocou. Atendi a chamada e ouço uma voz desconhecida que me deixa em pânico.",
              "en": "It was a dark night when the phone rang. I answered the call and I hear an unknown voice that leaves me in panic."
            },
            {
              "pt": "Ela caminhava pela rua quando viu o acidente. Corre para ajudar e agora está ao lado da vítima.",
              "en": "She was walking down the street when she saw the accident. She runs to help and now she is beside the victim."
            },
            {
              "pt": "Nós estávamos na festa quando recebemos a notícia. Paramos tudo, pegamos nossos casacos e saímos correndo. Agora estamos no hospital com a família.",
              "en": "We were at the party when we received the news. We stopped everything, grabbed our coats and ran out. Now we are at the hospital with the family."
            },
            {
              "pt": "O sol nascia quando o trem chegou à estação. Ele desceu do vagão, procura entre a multidão e encontra o rosto familiar que tanto esperava.",
              "en": "The sun was rising when the train arrived at the station. He got off the carriage, searches through the crowd and finds the familiar face he had been waiting for."
            },
            {
              "pt": "Eles dirigiam pela estrada quando o carro quebrou. Saíram do veículo, abrem o capô e percebem que estão completamente perdidos.",
              "en": "They were driving down the road when the car broke down. They got out of the vehicle, open the hood and realize they are completely lost."
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
            "pt": "desenrolar",
            "en": "to unfold",
            "ex": "A história se desenrolava lentamente.",
            "exEn": "The story unfolded slowly."
          },
          {
            "pt": "de repente",
            "en": "suddenly",
            "ex": "De repente, ele apareceu na porta.",
            "exEn": "Suddenly, he appeared at the door."
          },
          {
            "pt": "naquele momento",
            "en": "at that moment",
            "ex": "Naquele momento, ela percebeu a verdade.",
            "exEn": "At that moment, she realized the truth."
          },
          {
            "pt": "enquanto isso",
            "en": "meanwhile",
            "ex": "Enquanto isso, o vilão planejava seu ataque.",
            "exEn": "Meanwhile, the villain was planning his attack."
          },
          {
            "pt": "a cena",
            "en": "the scene",
            "ex": "A cena acontecia num castelo antigo.",
            "exEn": "The scene took place in an old castle."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Quando ele chegava, eu vi o presente.",
            "correct": "Quando ele chegou, eu vi o presente. / Quando ele chegava, eu estava vendo o presente.",
            "note": "Use perfeito (chegou) for a completed past action that triggered another action, or imperfeito (chegava) if the arrival was ongoing when something else happened. Don't mix imperfeito with perfeito for sequential actions."
          },
          {
            "wrong": "Ela estava correndo e cai no chão.",
            "correct": "Ela estava correndo e caiu no chão.",
            "note": "Once you start with imperfeito (estava correndo) for the setting, use perfeito (caiu) for the main action that interrupts it, not presente."
          },
          {
            "wrong": "Era noite, fazia frio e começou a chover quando cheguei em casa.",
            "correct": "Era noite, fazia frio e começava a chover quando cheguei em casa.",
            "note": "Use imperfeito (começava) for simultaneous background conditions with another imperfeito action. Use perfeito only for the main narrative action (cheguei)."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete with the correct verb form (imperfeito or perfeito).",
            "items": [
              {
                "q": "Quando eu ___ (chegar) em casa, minha mãe ___ (preparar) o jantar.",
                "ans": "cheguei / preparava"
              },
              {
                "q": "O dia ___ (ser) ensolarado quando ele ___ (receber) a notícia ruim.",
                "ans": "era / recebeu"
              },
              {
                "q": "Nós ___ (caminhar) pela praia quando ___ (ver) o barco no horizonte.",
                "ans": "caminhávamos / vimos"
              },
              {
                "q": "Ela ___ (dormir) tranquilamente quando o terremoto ___ (começar).",
                "ans": "dormia / começou"
              },
              {
                "q": "Enquanto os jogadores ___ (treinar), o técnico ___ (chegar) ao estádio.",
                "ans": "treinavam / chegou"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option to complete the story.",
            "items": [
              {
                "q": "Era uma manhã fria quando o detetive ___ a cena do crime.",
                "opts": [
                  "chegava",
                  "chegou",
                  "chega",
                  "tinha chegado"
                ],
                "ans": 1
              },
              {
                "q": "Os pássaros cantavam enquanto o sol ___.",
                "opts": [
                  "nasceu",
                  "nascia",
                  "nasce",
                  "tinha nascido"
                ],
                "ans": 1
              },
              {
                "q": "Eles estavam muito ocupados quando a ligação ___.",
                "opts": [
                  "vinha",
                  "veio",
                  "vem",
                  "tinha vindo"
                ],
                "ans": 1
              },
              {
                "q": "A chuva ___ quando nós ___ pela cidade.",
                "opts": [
                  "caía / passeávamos",
                  "caiu / passeávamos",
                  "cai / passeamos",
                  "caía / passeamos"
                ],
                "ans": 0
              },
              {
                "q": "Naquele momento, eu ___ a verdade e tudo ___.",
                "opts": [
                  "percebia / mudava",
                  "percebia / muda",
                  "percebi / muda",
                  "percebi / mudou"
                ],
                "ans": 2
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the sentence into Portuguese, using the imperfeito + perfeito + presente pattern.",
            "items": [
              {
                "q": "It was raining when she arrived home and now she is worried.",
                "ans": "Estava chovendo quando ela chegou em casa e agora ela está preocupada."
              },
              {
                "q": "The children were playing in the park when the accident happened and they are still scared.",
                "ans": "As crianças estavam brincando no parque quando o acidente aconteceu e elas ainda estão assustadas."
              },
              {
                "q": "We were having dinner when the phone rang and now we know the secret.",
                "ans": "Estávamos jantando quando o telefone tocou e agora sabemos o segredo."
              },
              {
                "q": "He was walking slowly when he found the lost key and he is very happy.",
                "ans": "Ele estava caminhando lentamente quando encontrou a chave perdida e ele está muito feliz."
              },
              {
                "q": "They were waiting for the bus when the storm started and they are running for shelter.",
                "ans": "Eles estavam esperando pelo ônibus quando a tempestade começou e eles estão correndo para se abrigar."
              }
            ]
          }
        ],
        "teacherTip": "Emphasize that imperfeito sets the atmospheric scene, perfeito provides the narrative action, and presente adds dramatic immediacy—like a movie cuts between background shots, plot events, and close-ups. Have students identify these three layers when reading or listening to stories."
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
              "pt": "O jornalista disse que o ministro estava doente.",
              "en": "The journalist said that the minister was ill."
            },
            {
              "pt": "Ela disse que havia assistido ao debate político na noite anterior.",
              "en": "She said that she had watched the political debate the night before."
            },
            {
              "pt": "O repórter disse que a situação era mais grave do que parecia.",
              "en": "The reporter said that the situation was more serious than it seemed."
            },
            {
              "pt": "Eles disseram que recebiam notícias falsas todos os dias.",
              "en": "They said that they received fake news every day."
            },
            {
              "pt": "A fonte disse que o governo tinha planos de mudança.",
              "en": "The source said that the government had plans for change."
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
            "pt": "notícia",
            "en": "news",
            "ex": "Vi a notícia na televisão ontem.",
            "exEn": "I saw the news on television yesterday."
          },
          {
            "pt": "jornal",
            "en": "newspaper",
            "ex": "O jornal publicou um artigo sobre política.",
            "exEn": "The newspaper published an article about politics."
          },
          {
            "pt": "entrevista",
            "en": "interview",
            "ex": "A entrevista com o presidente foi muito importante.",
            "exEn": "The interview with the president was very important."
          },
          {
            "pt": "fonte",
            "en": "source",
            "ex": "Segundo a fonte, o acidente foi evitado.",
            "exEn": "According to the source, the accident was prevented."
          },
          {
            "pt": "manchete",
            "en": "headline",
            "ex": "A manchete dizia que havia uma greve na cidade.",
            "exEn": "The headline said there was a strike in the city."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Ele disse que ele estava cansado.",
            "correct": "Ele disse que estava cansado.",
            "note": "In reported speech, the subject pronoun is often omitted when it refers to the same person as the main clause."
          },
          {
            "wrong": "Ela disse que viu a notícia ontem.",
            "correct": "Ela disse que tinha visto a notícia no dia anterior / Ela disse que havia visto a notícia.",
            "en": "When reporting past events, use pluperfect (tinha visto) or past perfect instead of simple past."
          },
          {
            "wrong": "O jornalista disse que o caso é importante.",
            "correct": "O jornalista disse que o caso era importante.",
            "note": "After 'disse que', the verb must change to imperfect (era) to maintain the past tense sequence, not stay in present (é)."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete with the correct verb form in imperfect or pluperfect.",
            "items": [
              {
                "q": "O repórter disse que a entrevista ___ (ser) muito produtiva.",
                "ans": "era"
              },
              {
                "q": "Eles disseram que ___ (receber) más notícias daquela fonte.",
                "ans": "recebiam"
              },
              {
                "q": "A jornalista disse que já ___ (ler) a manchete principal.",
                "ans": "tinha lido / havia lido"
              },
              {
                "q": "Ele disse que o ministro ___ (estar) ausente na coletiva de imprensa.",
                "ans": "estava"
              },
              {
                "q": "Elas disseram que ___ (assistir) ao debate na noite anterior.",
                "ans": "tinham assistido / haviam assistido"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option.",
            "items": [
              {
                "q": "O editor disse que a notícia ___ falsa.",
                "opts": [
                  "é",
                  "era",
                  "foi",
                  "fosse"
                ],
                "ans": 1
              },
              {
                "q": "A fonte disse que o acidente ___ no centro da cidade.",
                "opts": [
                  "acontecia",
                  "aconteceu",
                  "aconteceria",
                  "tivesse acontecido"
                ],
                "ans": 0
              },
              {
                "q": "Eles disseram que ___ a reportagem sobre o escândalo político.",
                "opts": [
                  "viram",
                  "tinham visto",
                  "veem",
                  "vejam"
                ],
                "ans": 1
              },
              {
                "q": "O jornalista disse que ___ com o presidente naquele dia.",
                "opts": [
                  "fala",
                  "falaria",
                  "falava",
                  "teria falado"
                ],
                "ans": 2
              },
              {
                "q": "Ela disse que a manchete ___ importante para os leitores.",
                "opts": [
                  "é",
                  "será",
                  "era",
                  "fosse"
                ],
                "ans": 2
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the sentence into Portuguese using reported speech with 'disse que'.",
            "items": [
              {
                "q": "The reporter said that he had watched the news.",
                "ans": "O repórter disse que tinha assistido às notícias. / O repórter disse que havia assistido às notícias."
              },
              {
                "q": "They said that the article was about current events.",
                "ans": "Eles disseram que o artigo era sobre assuntos atuais / notícias de última hora."
              },
              {
                "q": "She said that she received the information from a reliable source.",
                "ans": "Ela disse que recebia a informação de uma fonte confiável."
              },
              {
                "q": "The editor said that the interview was very interesting.",
                "ans": "O editor disse que a entrevista era muito interessante."
              },
              {
                "q": "He said that the headlines were misleading.",
                "ans": "Ele disse que as manchetes eram enganosas / tendenciosas."
              }
            ]
          }
        ],
        "teacherTip": "Reinforce that the time shift is crucial in reported speech: what is 'hoje' becomes 'naquele dia', and present tense becomes imperfect. Have students practice converting direct speech dialogues to reported speech to internalize the pattern naturally."
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
              "pt": "Se você tivesse estudado mais, teria compreendido melhor as estruturas que estamos revisando agora.",
              "en": "If you had studied more, you would have understood the structures we are reviewing now better."
            },
            {
              "pt": "Embora o exame seja desafiador, ele permitirá que você identifique quais áreas precisa melhorar.",
              "en": "Although the exam is challenging, it will allow you to identify which areas you need to improve."
            },
            {
              "pt": "Enquanto você pratica estes exercícios, lembre-se de que cada erro é uma oportunidade de aprendizado.",
              "en": "While you practice these exercises, remember that every mistake is a learning opportunity."
            },
            {
              "pt": "Para que você consiga passar na avaliação, é fundamental que revise todos os tempos verbais e as expressões mais importantes.",
              "en": "In order for you to pass the assessment, it's essential that you review all verb tenses and the most important expressions."
            },
            {
              "pt": "Caso você tenha dúvidas sobre qualquer estrutura gramatical, não hesite em perguntar antes da prova final.",
              "en": "In case you have doubts about any grammatical structure, don't hesitate to ask before the final test."
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
            "pt": "dominar",
            "en": "to master",
            "ex": "Ela conseguiu dominar a gramática depois de muito estudo.",
            "exEn": "She managed to master the grammar after much study."
          },
          {
            "pt": "desafio",
            "en": "challenge",
            "ex": "O maior desafio dele era entender as estruturas complexas.",
            "exEn": "His biggest challenge was understanding complex structures."
          },
          {
            "pt": "avaliação",
            "en": "assessment/evaluation",
            "ex": "A avaliação final vai testar todos os tópicos aprendidos.",
            "exEn": "The final assessment will test all the topics learned."
          },
          {
            "pt": "progresso",
            "en": "progress",
            "ex": "Você está fazendo um progresso incrível no seu português.",
            "exEn": "You are making incredible progress in your Portuguese."
          },
          {
            "pt": "consolidar",
            "en": "to consolidate",
            "ex": "É importante consolidar os conhecimentos antes de avançar.",
            "exEn": "It's important to consolidate knowledge before advancing."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Se você teria estudado, teria passado.",
            "correct": "Se você tivesse estudado, teria passado.",
            "note": "In conditional sentences, use the imperfect subjunctive (tivesse) in the 'if' clause, not the conditional (teria)."
          },
          {
            "wrong": "Embora ele é inteligente, ele não passou na prova.",
            "correct": "Embora ele seja inteligente, ele não passou na prova.",
            "note": "After 'embora' (although), always use the subjunctive mood (seja), not the indicative (é)."
          },
          {
            "wrong": "Eu preciso que você vem aqui amanhã.",
            "correct": "Eu preciso que você venha aqui amanhã.",
            "note": "After expressions of necessity or desire (preciso que), use the subjunctive (venha), not the indicative (vem)."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete with the correct form of the verb in parentheses.",
            "items": [
              {
                "q": "Se você _____ (estudar) mais, _____ (conseguir) melhores resultados na avaliação.",
                "ans": "estudasse, conseguiria"
              },
              {
                "q": "Embora o português _____ (ser) difícil, é importante que nós _____ (persistir) nos estudos.",
                "ans": "seja, persistamos"
              },
              {
                "q": "Enquanto você _____ (revisar) a gramática, eu _____ (preparar) os exercícios de conversação.",
                "ans": "revisa, preparo"
              },
              {
                "q": "Para que você _____ (passar) na prova, é necessário que você _____ (fazer) todos os exercícios.",
                "ans": "passe, faça"
              },
              {
                "q": "Caso ele _____ (não compreender) a estrutura, ele deve _____ (pedir) ajuda ao professor.",
                "ans": "não compreenda, pedir"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option that best completes the sentence.",
            "items": [
              {
                "q": "Se tivéssemos mais tempo, nós _____ todos os tópicos com mais profundidade.",
                "opts": [
                  "revisávamos",
                  "teríamos revisto",
                  "revemos",
                  "revisássemos"
                ],
                "ans": 1
              },
              {
                "q": "Eu sugiro que você _____ as estruturas condicionais antes da prova.",
                "opts": [
                  "consolidou",
                  "consolidar",
                  "consolide",
                  "consolidando"
                ],
                "ans": 2
              },
              {
                "q": "Ainda que ele _____ muita dificuldade, ele conseguiu passar.",
                "opts": [
                  "tem",
                  "teve",
                  "tivesse",
                  "tenha"
                ],
                "ans": 2
              },
              {
                "q": "Assim que você _____ os exercícios, avise-me para que eu possa corrigi-los.",
                "opts": [
                  "termina",
                  "terminaria",
                  "terminar",
                  "terminasse"
                ],
                "ans": 2
              },
              {
                "q": "É essencial que nós _____ todas as expressões idiomáticas para o exame.",
                "opts": [
                  "memorizamos",
                  "memorizar",
                  "memorize",
                  "memorizássemos"
                ],
                "ans": 2
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the sentence into Brazilian Portuguese.",
            "items": [
              {
                "q": "Although studying is challenging, I need you to focus on your progress.",
                "ans": "Embora estudar seja desafiador, preciso que você se concentre no seu progresso."
              },
              {
                "q": "If you had consolidated all the B1 structures, you would pass the assessment easily.",
                "ans": "Se você tivesse consolidado todas as estruturas B1, você passaria na avaliação facilmente."
              },
              {
                "q": "While you review the conditional sentences, remember that practice is essential.",
                "ans": "Enquanto você revisa as orações condicionais, lembre-se de que a prática é essencial."
              },
              {
                "q": "In order for you to master Portuguese, it is necessary that you practice speaking regularly.",
                "ans": "Para que você domine o português, é necessário que você pratique falar regularmente."
              },
              {
                "q": "In case you have any doubts about the subjunctive mood, don't hesitate to ask questions.",
                "ans": "Caso você tenha dúvidas sobre o modo subjuntivo, não hesite em fazer perguntas."
              }
            ]
          }
        ],
        "teacherTip": "At B1 level, students should be seeing grammar as an integrated system rather than isolated rules. During this review, emphasize how conditional structures, subjunctive mood, and temporal conjunctions naturally combine in real conversations and texts to express complex ideas, nuance, and hypothetical situations."
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
              "pt": "Se falassem português fluentemente, conseguiriam o emprego.",
              "en": "If they spoke Portuguese fluently, they would get the job."
            },
            {
              "pt": "Embora terminassem o projeto no prazo, o chefe não ficou satisfeito.",
              "en": "Although they finished the project on time, the boss wasn't satisfied."
            },
            {
              "pt": "Caso partissem agora, chegariam antes do anoitecer.",
              "en": "If they left now, they would arrive before nightfall."
            },
            {
              "pt": "Ainda que comessem tudo, haveria comida para amanhã.",
              "en": "Even if they ate everything, there would be food for tomorrow."
            },
            {
              "pt": "Desejava que vivessem mais perto para nos visitarmos frequentemente.",
              "en": "I wished they lived closer so we could visit each other frequently."
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
            "pt": "duvidasse",
            "en": "if (he/she) doubted",
            "ex": "Se duvidasse da minha palavra, não teria vindo.",
            "exEn": "If he had doubted my word, he wouldn't have come."
          },
          {
            "pt": "exigisse",
            "en": "if (he/she) demanded",
            "ex": "Caso exigisse mais detalhes, eu explicaria tudo.",
            "exEn": "If he demanded more details, I would explain everything."
          },
          {
            "pt": "consentisse",
            "en": "if (he/she) consented",
            "ex": "Ainda que consentisse, haveria problemas legais.",
            "exEn": "Even if he consented, there would be legal problems."
          },
          {
            "pt": "regressasse",
            "en": "if (he/she) returned",
            "ex": "Embora regressasse mais cedo, chegaria atrasado.",
            "exEn": "Although he returned earlier, he would arrive late."
          },
          {
            "pt": "interviesse",
            "en": "if (he/she) intervened",
            "ex": "Desejava que interviesse na discussão.",
            "exEn": "I wished that he would intervene in the discussion."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Se eles falaram português, conseguiriam o emprego.",
            "correct": "Se eles falassem português, conseguiriam o emprego.",
            "note": "English speakers often use preterite instead of past subjunctive after 'se' (if). The subjunctive expresses a hypothetical condition, not a completed action."
          },
          {
            "wrong": "Ainda que chegassem cedo, não entrassem na sala.",
            "correct": "Ainda que chegassem cedo, não entrassem na sala. (or: não pudessem entrar)",
            "note": "Using subjunctive in both clauses is grammatically correct, but speakers often confuse which verbs require subjunctive mood when they're part of a complex trigger."
          },
          {
            "wrong": "Caso partir agora, chegaríamos a tempo.",
            "correct": "Caso partíssemos agora, chegaríamos a tempo.",
            "en": "Infinitive forms don't work after 'caso' (in case); you must use the past subjunctive to maintain the impersonal hypothetical tone."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete with the correct past subjunctive form based on the preterite verb in parentheses.",
            "items": [
              {
                "q": "Se (eles viajaram) ___ para o Brasil, visitariam o Rio de Janeiro.",
                "ans": "viajassem"
              },
              {
                "q": "Caso (vocês recebessem) ___ o convite, compareceriam à festa?",
                "ans": "recebessem"
              },
              {
                "q": "Embora (eles comeram) ___ bastante, ainda tinham fome.",
                "ans": "comessem"
              },
              {
                "q": "Desejava que (vocês voltassem) ___ mais cedo do trabalho.",
                "ans": "voltassem"
              },
              {
                "q": "Se (elas estudaram) ___ mais, teriam passado na prova.",
                "ans": "estudassem"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option to complete the sentence.",
            "items": [
              {
                "q": "Ainda que ___ a verdade, ninguém acreditaria neles.",
                "opts": [
                  "disseram",
                  "dissessem",
                  "diriam",
                  "dizerem"
                ],
                "ans": 1
              },
              {
                "q": "Se os alunos ___ as instruções corretamente, não teriam cometido erros.",
                "opts": [
                  "seguiam",
                  "seguiriam",
                  "seguissem",
                  "seguem"
                ],
                "ans": 2
              },
              {
                "q": "Caso ___ muito dinheiro na loteria, viajaríamos pelo mundo.",
                "opts": [
                  "ganhamos",
                  "ganhássemos",
                  "ganhássemos",
                  "ganhássemos"
                ],
                "ans": 2
              },
              {
                "q": "Embora ___ na reunião, não conseguiram resolver o problema.",
                "opts": [
                  "participassem",
                  "participaram",
                  "participariam",
                  "participem"
                ],
                "ans": 0
              },
              {
                "q": "Desejava que vocês ___ mais atenção aos detalhes.",
                "opts": [
                  "prestassem",
                  "prestaram",
                  "prestariam",
                  "prestam"
                ],
                "ans": 0
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the sentence into Brazilian Portuguese using the past subjunctive.",
            "items": [
              {
                "q": "If they worked harder, they would achieve their goals.",
                "ans": "Se trabalhassem mais, alcançariam seus objetivos."
              },
              {
                "q": "Although they arrived on time, the director was not pleased.",
                "ans": "Embora chegassem a tempo, o diretor não ficou satisfeito."
              },
              {
                "q": "I wish you would listen to my advice.",
                "ans": "Desejava que ouvissem meu conselho."
              },
              {
                "q": "In case they asked for help, I would be ready.",
                "ans": "Caso pedissem ajuda, eu estaria pronto."
              },
              {
                "q": "Even if they spoke Portuguese fluently, the exam would be difficult.",
                "ans": "Ainda que falassem português fluentemente, a prova seria difícil."
              }
            ]
          }
        ],
        "teacherTip": "Reinforce that the past subjunctive is built from the 3rd person plural preterite stem: always remove -ram and add the appropriate ending (-sse, -sses, -ssemos, -ssem). This pattern is consistent across all verbs, making it predictable once students internalize the trigger structures (se, caso, embora, ainda que, desejo que)."
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
              "pt": "Formal: O senhor poderia me ajudar com este documento? / Informal: Você pode me ajudar com esse documento? / Slang: Cê consegue me ajudar com esse documento aí?",
              "en": "Formal: Could you help me with this document? / Informal: Can you help me with this document? / Slang: Can you help me out with that document?"
            },
            {
              "pt": "Formal: A senhora gostaria de tomar um café? / Informal: Você quer tomar um café? / Slang: Cê quer tomar um café?",
              "en": "Formal: Would you like to have a coffee? / Informal: Do you want to have a coffee? / Slang: You wanna grab a coffee?"
            },
            {
              "pt": "Formal: O senhor poderia me conceder um momento de sua atenção? / Informal: Você tem um minutinho para me ouvir? / Slang: Cê tem um tempinho pra me ouvir?",
              "en": "Formal: Could you grant me a moment of your attention? / Informal: Do you have a minute to listen to me? / Slang: You got a sec to listen to me?"
            },
            {
              "pt": "Formal: A senhora compreendeu minhas explicações? / Informal: Você entendeu o que eu falei? / Slang: Cê entendeu o que falei?",
              "en": "Formal: Did you understand my explanations? / Informal: Did you understand what I said? / Slang: You get what I said?"
            },
            {
              "pt": "Formal: O senhor deseja prosseguir com o projeto? / Informal: Você quer continuar com o projeto? / Slang: Cê quer seguir com o projeto?",
              "en": "Formal: Do you wish to proceed with the project? / Informal: Do you want to continue with the project? / Slang: You wanna keep going with the project?"
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
            "pt": "discurso",
            "en": "discourse / speech",
            "ex": "O discurso formal exige vocabulário mais elegante.",
            "exEn": "Formal discourse requires more elegant vocabulary."
          },
          {
            "pt": "gíria",
            "en": "slang",
            "ex": "A gíria é comum entre os jovens, mas inadequada em reuniões profissionais.",
            "exEn": "Slang is common among young people, but inappropriate in professional meetings."
          },
          {
            "pt": "registro linguístico",
            "en": "linguistic register",
            "ex": "É importante dominar diferentes registros linguísticos para se comunicar bem.",
            "exEn": "It's important to master different linguistic registers to communicate well."
          },
          {
            "pt": "coloquialismo",
            "en": "colloquialism",
            "ex": "O coloquialismo 'tá bom' é aceitável entre amigos, mas não numa apresentação.",
            "exEn": "The colloquialism 'tá bom' is acceptable among friends, but not in a presentation."
          },
          {
            "pt": "tom",
            "en": "tone",
            "ex": "O tom da mensagem mudou quando o cliente chegou.",
            "exEn": "The tone of the message changed when the client arrived."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Você é um senhor muito importante.",
            "correct": "O senhor é muito importante. / Você é muito importante.",
            "note": "Don't mix 'você' with 'senhor' in the same sentence. Choose either formal (o senhor/a senhora) or informal (você)."
          },
          {
            "wrong": "Cê pode me ajudar numa reunião com o presidente?",
            "correct": "Você pode me ajudar numa reunião com o presidente?",
            "note": "Use 'cê' only in very casual contexts with close friends, not in professional or semi-formal situations."
          },
          {
            "wrong": "O senhor tá bem?",
            "correct": "O senhor está bem? / Cê tá bem?",
            "note": "Don't mix formal address (o senhor) with casual contractions (tá). Use either formal language throughout or informal throughout."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete with the correct pronoun (o senhor/a senhora, você, or cê) based on the context.",
            "items": [
              {
                "q": "Num encontro profissional com seu chefe: ___ poderia revisar este relatório?",
                "ans": "O senhor/A senhora"
              },
              {
                "q": "Falando com um amigo próximo: ___ tá indo bem?",
                "ans": "Cê"
              },
              {
                "q": "Conversando com uma colega que não conhece bem: ___ tem experiência com este software?",
                "ans": "Você"
              },
              {
                "q": "Numa situação neutra com um cliente: ___ gostaria de água ou café?",
                "ans": "O senhor/A senhora"
              },
              {
                "q": "Com um amigo íntimo: ___ viu o jogo ontem?",
                "ans": "Cê"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the option that best matches the formal register.",
            "items": [
              {
                "q": "Qual frase é mais apropriada para uma carta comercial?",
                "opts": [
                  "Cê precisa assinar esse documento.",
                  "O senhor precisa assinar este documento.",
                  "Você tá precisando assinar isso aí.",
                  "Cê tá precisando assinear esse papel?"
                ],
                "ans": 1
              },
              {
                "q": "Qual é um exemplo apropriado de registro informal entre amigos?",
                "opts": [
                  "Você poderia me conceder um momento?",
                  "O senhor tem disponibilidade?",
                  "Cê consegue me dar um minutinho?",
                  "A senhora deseja conversar?"
                ],
                "ans": 2
              },
              {
                "q": "Qual frase contém um erro de registro?",
                "opts": [
                  "O senhor está bem?",
                  "Você tá tranquilo?",
                  "Cê pode me dar um help?",
                  "O senhor tá bem?"
                ],
                "ans": 3
              },
              {
                "q": "Qual é a alternativa mais formal?",
                "opts": [
                  "Você topa essa ideia?",
                  "Cê topa essa ideia?",
                  "O senhor gostaria de considerar esta proposta?",
                  "Você quer considerar essa proposta?"
                ],
                "ans": 2
              },
              {
                "q": "Qual frase seria adequada numa conversa casual com colegas jovens?",
                "opts": [
                  "O senhor poderia colaborar?",
                  "Cê consegue me ajudar com isso?",
                  "A senhora teria interesse?",
                  "Você poderia me conceder um momento?"
                ],
                "ans": 1
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the sentence into Brazilian Portuguese using the appropriate register.",
            "items": [
              {
                "q": "Sir, could you sign this document? (formal context)",
                "ans": "Senhor, o senhor poderia assinar este documento?"
              },
              {
                "q": "Hey, you wanna grab lunch? (casual with friend)",
                "ans": "Ô, cê quer ir comer uma coisa?"
              },
              {
                "q": "Do you understand what I'm explaining? (semi-formal)",
                "ans": "Você está compreendendo o que estou explicando?"
              },
              {
                "q": "Ma'am, would you like to reschedule? (formal context)",
                "ans": "Senhora, a senhora gostaria de remarcar?"
              },
              {
                "q": "Dude, that's so cool! (very casual)",
                "ans": "Cara, que legal demais!"
              }
            ]
          }
        ],
        "teacherTip": "Emphasize that register shifting is not just about grammar—it's about cultural respect and social awareness in Brazilian Portuguese. Have students practice switching between registers with the same message to develop intuition for when each is appropriate."
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
              "pt": "Sabe-se que a educação é fundamental para o desenvolvimento social.",
              "en": "It is known that education is fundamental for social development."
            },
            {
              "pt": "Nota-se que os argumentos apresentados carecem de fundamentação teórica.",
              "en": "It is noted that the arguments presented lack theoretical foundation."
            },
            {
              "pt": "É sabido que a mudança climática afeta diretamente a economia global.",
              "en": "It is known that climate change directly affects the global economy."
            },
            {
              "pt": "Sabe-se que a maioria dos participantes concorda com essa perspectiva.",
              "en": "It is known that most participants agree with this perspective."
            },
            {
              "pt": "Nota-se que o contraargumento levantado merece consideração séria.",
              "en": "It is noted that the counterargument raised deserves serious consideration."
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
            "pt": "refutar",
            "en": "to refute",
            "ex": "É importante refutar os argumentos fracos do oponente.",
            "exEn": "It is important to refute the opponent's weak arguments."
          },
          {
            "pt": "contraponto",
            "en": "counterpoint",
            "ex": "O contraponto apresentado foi muito convincente.",
            "exEn": "The counterpoint presented was very convincing."
          },
          {
            "pt": "evidência",
            "en": "evidence",
            "ex": "Sabe-se que as evidências científicas apoiam essa tese.",
            "exEn": "It is known that scientific evidence supports this thesis."
          },
          {
            "pt": "premissa",
            "en": "premise",
            "ex": "A premissa inicial do debate era questionável.",
            "exEn": "The initial premise of the debate was questionable."
          },
          {
            "pt": "desacordo",
            "en": "disagreement",
            "ex": "Nota-se que há desacordo entre os especialistas sobre esse tema.",
            "exEn": "It is noted that there is disagreement among experts on this topic."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Sabe-se que a economia seria melhorada.",
            "correct": "Sabe-se que a economia é melhorada / será melhorada.",
            "note": "With impersonal constructions, use indicative mood (present or future), not conditional. The pattern requires factual statements, not hypothetical ones."
          },
          {
            "wrong": "Nota-se que os dados mostrem resultados interessantes.",
            "correct": "Nota-se que os dados mostram resultados interessantes.",
            "note": "The subjunctive mood is incorrect here. After 'nota-se que', always use the indicative because you're stating a known fact, not expressing doubt or possibility."
          },
          {
            "wrong": "É sabido que muitos pessoas discordam.",
            "correct": "É sabido que muitas pessoas discordam.",
            "note": "Agreement error in Portuguese: 'pessoas' is feminine, so use 'muitas', not 'muitos'. This is unrelated to the grammar pattern but common in B2 compositions."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentences with the correct impersonal construction: 'sabe-se que', 'nota-se que', or 'é sabido que'.",
            "items": [
              {
                "q": "___ a economia brasileira enfrentará desafios nos próximos anos.",
                "ans": "Sabe-se que"
              },
              {
                "q": "___ os debatedores apresentaram argumentos bem estruturados.",
                "ans": "Nota-se que"
              },
              {
                "q": "___ a reforma educacional é necessária para o país.",
                "ans": "É sabido que"
              },
              {
                "q": "___ há divergências significativas sobre a melhor abordagem.",
                "ans": "Sabe-se que"
              },
              {
                "q": "___ o contraargumento refuta completamente a tese inicial.",
                "ans": "Nota-se que"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct sentence.",
            "items": [
              {
                "q": "Which sentence uses the impersonal construction correctly?",
                "opts": [
                  "É sabido que a solução fosse implementada rapidamente.",
                  "É sabido que a solução é implementada rapidamente.",
                  "É sabido que a solução será implementar rapidamente.",
                  "É sabido que a solução implementa-se rapidamente."
                ],
                "ans": 1
              },
              {
                "q": "Which option best completes this academic argument?",
                "opts": [
                  "Sabe-se que os dados não provassem validade.",
                  "Sabe-se que os dados não provam validade.",
                  "Sabe-se que os dados não provaram validade claramente.",
                  "Sabe-se que os dados não provem validade."
                ],
                "ans": 1
              },
              {
                "q": "Which sentence is grammatically correct?",
                "opts": [
                  "Nota-se que a premissa fosse questionável para todos.",
                  "Nota-se que a premissa é questionável para todos.",
                  "Nota-se que a premissa seja questionável para todos.",
                  "Nota-se que a premissa foi sendo questionável para todos."
                ],
                "ans": 1
              },
              {
                "q": "Which version sounds most academic?",
                "opts": [
                  "Sabe-se que muitos especialistas discordem da opinião.",
                  "Sabe-se que muitos especialistas discordam da opinião.",
                  "Sabe-se que muitos especialistas estão discordando da opinião.",
                  "Sabe-se que muitos especialistas tenham discordado da opinião."
                ],
                "ans": 1
              },
              {
                "q": "Which sentence follows the B2 academic style?",
                "opts": [
                  "É sabido que a economia melhoraria com essa reforma.",
                  "É sabido que a economia melhora com essa reforma.",
                  "É sabido que a economia pudesse melhorar com essa reforma.",
                  "É sabido que a economia melhorasse com essa reforma."
                ],
                "ans": 1
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the following sentences into Brazilian Portuguese using the impersonal constructions.",
            "items": [
              {
                "q": "It is known that the debate highlighted important social issues.",
                "ans": "Sabe-se que o debate destacou questões sociais importantes."
              },
              {
                "q": "It is noted that the arguments presented lack scientific evidence.",
                "ans": "Nota-se que os argumentos apresentados carecem de evidência científica."
              },
              {
                "q": "It is known that there is disagreement among specialists about climate policy.",
                "ans": "É sabido que há desacordo entre especialistas sobre política climática."
              },
              {
                "q": "It is noted that the counterargument refutes the initial premise effectively.",
                "ans": "Nota-se que o contraargumento refuta a premissa inicial efetivamente."
              },
              {
                "q": "It is known that education plays a crucial role in social development.",
                "ans": "Sabe-se que a educação desempenha um papel crucial no desenvolvimento social."
              }
            ]
          }
        ],
        "teacherTip": "Emphasize that these impersonal constructions (sabe-se que, nota-se que, é sabido que) are essential for academic writing in Portuguese and always require the indicative mood to maintain an objective, authoritative tone. Have students practice converting personal statements into impersonal ones to internalize the register shift."
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
              "pt": "Quando chegou ao castelo, percebeu que havia tivera uma visão estranha na noite anterior.",
              "en": "When he arrived at the castle, he realized that he had had a strange vision the night before."
            },
            {
              "pt": "Ela tinha esquecido todos os seus sofrimentos quando encontrou a carta que ele lhe havia deixado.",
              "en": "She had forgotten all her sufferings when she found the letter he had left for her."
            },
            {
              "pt": "O que ele tivera de mais precioso fora roubado durante aquela noite fatídica.",
              "en": "What he had had most precious was stolen during that fateful night."
            },
            {
              "pt": "Depois que tivera conhecimento da verdade, nunca mais foi o mesmo.",
              "en": "After he had become aware of the truth, he was never the same again."
            },
            {
              "pt": "A esperança que ela tinha nutrido desvaneceu-se como fumaça no vento.",
              "en": "The hope she had nurtured vanished like smoke in the wind."
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
            "pt": "outrora",
            "en": "formerly, once upon a time",
            "ex": "Outrora, ele havia sido um grande escritor.",
            "exEn": "Once, he had been a great writer."
          },
          {
            "pt": "apreensão",
            "en": "apprehension, anxiety",
            "ex": "A apreensão que ele tivera desapareceu quando recebeu a notícia.",
            "exEn": "The apprehension he had felt disappeared when he received the news."
          },
          {
            "pt": "desvelo",
            "en": "care, devotion, vigilance",
            "ex": "Com que desvelo ela tinha cuidado daquele segredo!",
            "exEn": "With what devotion she had guarded that secret!"
          },
          {
            "pt": "enlevo",
            "en": "rapture, delight, enchantment",
            "ex": "O enlevo que ele tivera ao ler aquele poema era indescritível.",
            "exEn": "The rapture he had felt reading that poem was indescribable."
          },
          {
            "pt": "penumbra",
            "en": "penumbra, half-light, semi-darkness",
            "ex": "Na penumbra, ela tinha visto uma figura misteriosa.",
            "exEn": "In the half-light, she had seen a mysterious figure."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Ele tinha ido e tinha voltado antes do anoitecer.",
            "correct": "Ele tinha ido e voltara antes do anoitecer.",
            "note": "In literary contexts, avoid repeating 'tinha' with coordinated verbs; use the literary 'tivera' form or omit it on the second verb."
          },
          {
            "wrong": "Ela tivera feito o trabalho quando cheguei.",
            "correct": "Ela tinha feito o trabalho quando cheguei.",
            "note": "In modern Brazilian Portuguese, 'tinha + participle' is preferred over 'tivera' for most contexts; reserve 'tivera' for highly literary or classical texts."
          },
          {
            "wrong": "O que ele tinha visto era inacreditável.",
            "correct": "O que ele tivera visto era inacreditável.",
            "note": "For dramatic effect in literature, 'tivera' creates a more archaic, poetic tone than the colloquial 'tinha'."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete with the correct pluperfect form (tinha or tivera).",
            "items": [
              {
                "q": "Quando ela chegou, o poeta já ___ partido para terras distantes.",
                "ans": "tinha"
              },
              {
                "q": "Tudo quanto ele ___ conquistado desapareceu numa única noite.",
                "ans": "tivera"
              },
              {
                "q": "A carta que eu ___ escrito nunca foi entregue.",
                "ans": "tinha"
              },
              {
                "q": "Após ___ lido aquele livro antigo, sua perspectiva mudou completamente.",
                "ans": "ter"
              },
              {
                "q": "Os segredos que ela ___ guardado por tantos anos finalmente vieram à tona.",
                "ans": "tinha"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct pluperfect form for each literary context.",
            "items": [
              {
                "q": "Na penumbra do salão, ele percebeu que ___ uma ilusão toda aquela beleza.",
                "opts": [
                  "tinha sido",
                  "tivera sido",
                  "foi",
                  "era"
                ],
                "ans": 1
              },
              {
                "q": "Os anos que ele ___ vivido em solitude o transformaram profundamente.",
                "opts": [
                  "tivera",
                  "tinha",
                  "vivia",
                  "viveria"
                ],
                "ans": 0
              },
              {
                "q": "Quando retornou à cidade, tudo quanto ele ___ deixado estava mudado.",
                "opts": [
                  "tinha deixado",
                  "tivera deixado",
                  "deixou",
                  "deixaria"
                ],
                "ans": 1
              },
              {
                "q": "A esperança que lhe ___ restado morreu naquele instante.",
                "opts": [
                  "tinha restado",
                  "tivera restado",
                  "restava",
                  "restaria"
                ],
                "ans": 1
              },
              {
                "q": "Ele ___ conhecido apenas sofrimento em sua longa e melancólica existência.",
                "opts": [
                  "tinha",
                  "tivera",
                  "conheceu",
                  "conheceria"
                ],
                "ans": 1
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the sentence into Brazilian Portuguese using the pluperfect.",
            "items": [
              {
                "q": "She had loved him more than anything in the world.",
                "ans": "Ela tinha amado (ou tivera amado) him mais que tudo no mundo."
              },
              {
                "q": "When dawn broke, they had already fled.",
                "ans": "Quando raiou a alva, eles já tinham fugido (ou já fugiram)."
              },
              {
                "q": "The dreams he had dreamed vanished like morning mist.",
                "ans": "Os sonhos que ele tinha sonhado (ou tivera sonhado) desvaneceram como neblina matinal."
              },
              {
                "q": "All that she had built crumbled in an instant.",
                "ans": "Tudo que ela tinha construído (ou tivera construído) desabou num instante."
              },
              {
                "q": "He had never seen such beauty before that moment.",
                "ans": "Ele nunca tinha visto (ou nunca tivera visto) tanta beleza antes daquele momento."
              }
            ]
          }
        ],
        "teacherTip": "Emphasize that 'tinha + participle' is the standard pluperfect in modern Brazilian Portuguese, while 'tivera + participle' is reserved for literary, classical, or highly formal writing. Encourage students to recognize both forms when reading literature but to default to 'tinha' in spoken and contemporary written Portuguese."
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
              "pt": "O professor cujo método é inovador recebeu vários prêmios.",
              "en": "The teacher whose method is innovative received several awards."
            },
            {
              "pt": "A empresa cuja história começou há cinquenta anos ainda prospera.",
              "en": "The company whose history began fifty years ago still thrives."
            },
            {
              "pt": "Ele me ofereceu um presente cujo valor era inestimável.",
              "en": "He offered me a gift whose value was invaluable."
            },
            {
              "pt": "Os alunos cuja dedicação impressiona sempre conseguem bolsas.",
              "en": "The students whose dedication impresses always manage to get scholarships."
            },
            {
              "pt": "Essa é a casa cuja porta pintei ontem.",
              "en": "That's the house whose door I painted yesterday."
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
            "pt": "colocação pronominal",
            "en": "clitic placement / pronoun placement",
            "ex": "A colocação pronominal em português é mais complexa que em inglês.",
            "exEn": "Pronoun placement in Portuguese is more complex than in English."
          },
          {
            "pt": "próclise",
            "en": "proclisis (pronoun before verb)",
            "ex": "Em frases negativas, usamos próclise: não me diga isso.",
            "exEn": "In negative sentences, we use proclisis: don't tell me that."
          },
          {
            "pt": "ênclise",
            "en": "enclisis (pronoun after verb)",
            "ex": "No imperativo afirmativo, usamos ênclise: diga-me a verdade.",
            "exEn": "In affirmative imperative, we use enclisis: tell me the truth."
          },
          {
            "pt": "mesóclise",
            "en": "mesoclisis (pronoun within verb form)",
            "ex": "Com futuro e condicional, pode haver mesóclise: dir-lhe-ei tudo.",
            "exEn": "With future and conditional, mesoclisis can occur: I will tell him everything."
          },
          {
            "pt": "antecedente",
            "en": "antecedent (noun that relative pronoun refers to)",
            "ex": "Na frase 'o livro cujo autor é famoso', 'livro' é o antecedente.",
            "exEn": "In the sentence 'the book whose author is famous', 'book' is the antecedent."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "O livro que cujo autor é famoso está esgotado.",
            "correct": "O livro cujo autor é famoso está esgotado.",
            "note": "Don't use 'que' and 'cujo' together. Choose one relative pronoun."
          },
          {
            "wrong": "Ele me deu um livro cujo que lhe pertencia.",
            "correct": "Ele me deu um livro cujo proprietário era ele.",
            "note": "After 'cujo/cuja', use a noun directly without additional relative pronouns."
          },
          {
            "wrong": "Não me diga isso / Não diga-me isso (both in same context)",
            "correct": "Não me diga isso (negative = próclise is obligatory)",
            "note": "In negative sentences, clitic pronouns must come before the verb (próclise), never after."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentences with 'cujo' or 'cuja' as appropriate.",
            "items": [
              {
                "q": "O diretor ___ gestão foi exemplar deixou cargo satisfeito.",
                "ans": "cuja"
              },
              {
                "q": "Os atletas ___ treinador é rigoroso obtêm melhores resultados.",
                "ans": "cujo"
              },
              {
                "q": "A universidade ___ reputação é internacional atrai muitos estudantes.",
                "ans": "cuja"
              },
              {
                "q": "Os projetos ___ orçamento foi aprovado começam em breve.",
                "ans": "cujo"
              },
              {
                "q": "A política ___ objetivo é reduzir desigualdades recebe apoio.",
                "ans": "cuja"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the sentence with correct pronoun placement (colocação pronominal).",
            "items": [
              {
                "q": "Which sentence uses correct clitic placement?",
                "opts": [
                  "Ele diga-me o segredo.",
                  "Ele me diga o segredo.",
                  "Ele me disse o segredo.",
                  "Ele disse-me o segredo."
                ],
                "ans": 2
              },
              {
                "q": "In the negative imperative, where should the pronoun go?",
                "opts": [
                  "Diga-me a verdade.",
                  "Não diga-me a verdade.",
                  "Não me diga a verdade.",
                  "Me não diga a verdade."
                ],
                "ans": 2
              },
              {
                "q": "Which sentence correctly combines 'cujo' with pronoun placement?",
                "opts": [
                  "O médico cujo paciente se recuperou rapidamente foi premiado.",
                  "O médico que cujo paciente se recuperou foi premiado.",
                  "O médico cuja se recuperou o paciente rapidamente.",
                  "O médico cujos que pacientes se recuperaram."
                ],
                "ans": 0
              },
              {
                "q": "Choose the correct clitic placement with future tense:",
                "opts": [
                  "Dar-lhe-ei o dinheiro amanhã.",
                  "Vou lhe dar o dinheiro amanhã.",
                  "Lhe vou dar o dinheiro amanhã.",
                  "Dar lhe-ei o dinheiro amanhã."
                ],
                "ans": 1
              },
              {
                "q": "Which uses 'cujo' correctly?",
                "opts": [
                  "A pessoa cuja nome esqueci voltou.",
                  "A pessoa cujo nome esqueci voltou.",
                  "A pessoa cuja nomes esqueci voltou.",
                  "A pessoa que cujo nome esqueci voltou."
                ],
                "ans": 1
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the sentences into Brazilian Portuguese using 'cujo/cuja' or correct pronoun placement.",
            "items": [
              {
                "q": "The architect whose design won the competition is internationally recognized.",
                "ans": "O arquiteto cujo projeto venceu o concurso é reconhecido internacionalmente."
              },
              {
                "q": "Don't tell me that lie again.",
                "ans": "Não me diga essa mentira novamente."
              },
              {
                "q": "The students whose performance impressed the teachers received scholarships.",
                "ans": "Os alunos cujo desempenho impressionou os professores receberam bolsas."
              },
              {
                "q": "Show me the documents you mentioned.",
                "ans": "Mostre-me os documentos que você mencionou."
              },
              {
                "q": "The company whose CEO is innovative launched a new product.",
                "ans": "A empresa cuja CEO é inovadora lançou um novo produto."
              }
            ]
          }
        ],
        "teacherTip": "Emphasize that 'cujo/cuja' requires a noun immediately after it (without articles), and that clitic placement follows strict rules based on context: negative sentences demand próclise, affirmative imperatives require ênclise, and infinitives typically allow flexibility. Practice these patterns through substitution drills to build automaticity."
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
              "pt": "A música brasileira, misturando ritmos africanos e europeus, conquistou o mundo.",
              "en": "Brazilian music, mixing African and European rhythms, conquered the world."
            },
            {
              "pt": "Os cantores saíram do palco dançando, levando a plateia com eles.",
              "en": "The singers left the stage dancing, taking the audience with them."
            },
            {
              "pt": "Ouvindo a bossa nova, você percebe a influência do jazz americano.",
              "en": "Listening to bossa nova, you notice the influence of American jazz."
            },
            {
              "pt": "As escolas de samba, preparando-se durante meses, apresentam coreografias impressionantes.",
              "en": "The samba schools, preparing for months, present impressive choreographies."
            },
            {
              "pt": "Tocando instrumentos tradicionais, os músicos preservam a herança cultural brasileira.",
              "en": "Playing traditional instruments, the musicians preserve Brazilian cultural heritage."
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
            "pt": "batida",
            "en": "beat/rhythm (also a Brazilian cocktail)",
            "ex": "A batida do samba é contagiante.",
            "exEn": "The samba beat is contagious."
          },
          {
            "pt": "melancolia",
            "en": "melancholy/sadness",
            "ex": "A bossa nova expressa uma melancolia sofisticada.",
            "exEn": "Bossa nova expresses a sophisticated melancholy."
          },
          {
            "pt": "improviso",
            "en": "improvisation",
            "ex": "Os músicos tocaram com muito improviso durante o show.",
            "exEn": "The musicians played with a lot of improvisation during the show."
          },
          {
            "pt": "enredo",
            "en": "story/plot (especially of a carnival school)",
            "ex": "O enredo da escola de samba falava sobre a história afro-brasileira.",
            "exEn": "The samba school's story was about Afro-Brazilian history."
          },
          {
            "pt": "desfile",
            "en": "parade (especially carnival)",
            "ex": "Milhares de pessoas assistiram ao desfile de carnaval.",
            "exEn": "Thousands of people watched the carnival parade."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Eu estou ouvindo música enquanto danço.",
            "correct": "Ouço música dançando. / Dançando, ouço música.",
            "note": "English speakers overuse 'estar + gerund' for simultaneous actions. The simple gerund form is more natural for describing concurrent actions in Brazilian Portuguese cultural contexts."
          },
          {
            "wrong": "O samba, sendo muito rítmico, é dançado em todo o Brasil.",
            "correct": "O samba, muito rítmico, é dançado em todo o Brasil.",
            "note": "Avoid 'sendo' (being) when a simple adjective works. The gerund 'sendo' is less elegant in descriptive sentences about cultural elements."
          },
          {
            "wrong": "Assistindo o desfile, fiquei emocionado.",
            "correct": "Assistindo ao desfile, fiquei emocionado.",
            "note": "The verb 'assistir' requires 'a' (assistir a) when meaning 'to watch.' English speakers often forget the preposition with gerunds."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete with the correct gerund form of the verb in parentheses.",
            "items": [
              {
                "q": "A bossa nova é caracterizada por harmonias sofisticadas, ___ a tradição do samba. (combinar)",
                "ans": "combinando"
              },
              {
                "q": "Os percussionistas, ___ instrumentos tradicionais, criam ritmos únicos. (dominar)",
                "ans": "dominando"
              },
              {
                "q": "___ a história afro-brasileira, o carnaval celebra a diversidade cultural. (contar)",
                "ans": "Contando"
              },
              {
                "q": "As gerações mais velhas ensinam música aos jovens, ___ a cultura viva. (manter)",
                "ans": "mantendo"
              },
              {
                "q": "O forró nordestino conquistou o Brasil inteiro, ___ todos a dançar. (fazer)",
                "ans": "fazendo"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option that completes the sentence using the gerund as adjective or adverb.",
            "items": [
              {
                "q": "A música brasileira, ___ elementos de várias culturas, é rica e diversa.",
                "opts": [
                  "misturando",
                  "mistura",
                  "misturada",
                  "misturar"
                ],
                "ans": 0
              },
              {
                "q": "___ forró a noite toda, os dançarinos não se cansavam.",
                "opts": [
                  "Dançam",
                  "Dançando",
                  "Dança",
                  "Dançar"
                ],
                "ans": 1
              },
              {
                "q": "O samba-enredo, ___ histórias do povo, educa e emociona.",
                "opts": [
                  "contou",
                  "conta",
                  "contando",
                  "contada"
                ],
                "ans": 2
              },
              {
                "q": "Os músicos seguiram ___ suas influências tradicionais com o jazz moderno.",
                "opts": [
                  "misturando",
                  "mistura",
                  "misturar",
                  "misturada"
                ],
                "ans": 0
              },
              {
                "q": "___ a cultura afro-brasileira, o carnaval tornou-se uma celebração global.",
                "opts": [
                  "Celebra",
                  "Celebrando",
                  "Celebrou",
                  "Celebrada"
                ],
                "ans": 1
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the sentence into Brazilian Portuguese, using the gerund form as an adjective or adverb.",
            "items": [
              {
                "q": "Listening to forró music, you feel the joy of the northeast.",
                "ans": "Ouvindo música forró, você sente a alegria do nordeste."
              },
              {
                "q": "The samba school, preparing for months, presented an unforgettable show.",
                "ans": "A escola de samba, preparando-se durante meses, apresentou um show inesquecível."
              },
              {
                "q": "Playing traditional instruments, the musicians preserved Brazilian heritage.",
                "ans": "Tocando instrumentos tradicionais, os músicos preservaram a herança brasileira."
              },
              {
                "q": "Dancing samba, people celebrate their cultural identity.",
                "ans": "Dançando samba, as pessoas celebram sua identidade cultural."
              },
              {
                "q": "Mixing African rhythms with European harmonies, bossa nova was born.",
                "ans": "Misturando ritmos africanos com harmonias europeias, a bossa nova nasceu."
              }
            ]
          }
        ],
        "teacherTip": "Emphasize that the gerund form (-ndo) in Brazilian Portuguese often functions like an English adjective or adverbial phrase describing what is happening simultaneously or as a characteristic. Compare 'A música, sendo popular, toca em todo lugar' with 'A música popular toca em todo lugar' to help students see when the gerund adds a nuance of 'while' or 'while being' versus when a simple adjective suffices."
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
              "pt": "O reconhecimento da importância do tema mudou a perspectiva dos leitores.",
              "en": "The recognition of the importance of the topic changed readers' perspective."
            },
            {
              "pt": "A necessidade de compreensão profunda justifica o estudo detalhado.",
              "en": "The necessity of deep understanding justifies detailed study."
            },
            {
              "pt": "A beleza da prosa contrasta com a dureza do conteúdo.",
              "en": "The beauty of the prose contrasts with the harshness of the content."
            },
            {
              "pt": "O aperfeiçoamento das habilidades de leitura exige prática constante.",
              "en": "The improvement of reading skills requires constant practice."
            },
            {
              "pt": "A sinceridade na discussão promove uma comunicação mais autêntica.",
              "en": "The sincerity in discussion promotes more authentic communication."
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
            "pt": "o aprofundamento",
            "en": "deepening, in-depth exploration",
            "ex": "O aprofundamento do tema exige leitura crítica.",
            "exEn": "The deepening of the topic requires critical reading."
          },
          {
            "pt": "a clareza",
            "en": "clarity",
            "ex": "A clareza da argumentação facilita a compreensão.",
            "exEn": "The clarity of the argument makes comprehension easier."
          },
          {
            "pt": "o desenvolvimento",
            "en": "development, unfolding",
            "ex": "O desenvolvimento das ideias principais ocorre nos parágrafos seguintes.",
            "exEn": "The development of the main ideas occurs in the following paragraphs."
          },
          {
            "pt": "a complexidade",
            "en": "complexity",
            "ex": "A complexidade do texto exigiu várias releituras.",
            "exEn": "The complexity of the text required several re-readings."
          },
          {
            "pt": "a interpretação",
            "en": "interpretation",
            "ex": "A interpretação correta depende do contexto cultural.",
            "exEn": "The correct interpretation depends on cultural context."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "O compreensão do texto é difícil.",
            "correct": "A compreensão do texto é difícil.",
            "note": "Nominalized verbs from 'compreender' become feminine nouns (a compreensão). English speakers often forget to change the article and gender."
          },
          {
            "wrong": "A complexo do assunto requer análise cuidadosa.",
            "correct": "A complexidade do assunto requer análise cuidadosa.",
            "note": "When nominalizing adjectives, you must add the suffix -dade/-eza, not use the adjective itself. 'Complexo' becomes 'complexidade'."
          },
          {
            "wrong": "O realizadamente da tarefa foi rápido.",
            "correct": "A realização da tarefa foi rápida.",
            "note": "Avoid creating double nominalizations or incorrect suffixes. Use 'realização' (from realizar) rather than invented forms."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete with the correct nominalized form.",
            "items": [
              {
                "q": "A ___ do argumento principal aparece no primeiro parágrafo.",
                "ans": "apresentação"
              },
              {
                "q": "A ___ do texto exige paciência e atenção aos detalhes.",
                "ans": "leitura"
              },
              {
                "q": "O ___ das habilidades críticas é essencial para este nível.",
                "ans": "desenvolvimento"
              },
              {
                "q": "A ___ da escrita acadêmica deve ser mantida em todo o trabalho.",
                "ans": "clareza"
              },
              {
                "q": "A ___ do tema cultural enriquece a compreensão global.",
                "ans": "exploração"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct nominalized form.",
            "items": [
              {
                "q": "Qual nominalização melhor completa: 'A ___ da análise demonstra profundidade'?",
                "opts": [
                  "profundo",
                  "profundeza",
                  "profundidade",
                  "profundação"
                ],
                "ans": 2
              },
              {
                "q": "Selecione o termo correto: 'O ___ do conceito foi explicado claramente.'",
                "opts": [
                  "esclarecimento",
                  "esclarecer",
                  "esclarecido",
                  "esclareça"
                ],
                "ans": 0
              },
              {
                "q": "Qual opção nominaliza corretamente 'interpretar'?",
                "opts": [
                  "interpretação",
                  "interpretância",
                  "interpretância",
                  "interpretamento"
                ],
                "ans": 0
              },
              {
                "q": "Complete: 'A ___ entre teoria e prática é notável.'",
                "opts": [
                  "conexãoção",
                  "conexão",
                  "conectação",
                  "conectação"
                ],
                "ans": 1
              },
              {
                "q": "Escolha a forma correta: 'A ___ da narrativa surpreendeu os leitores.'",
                "opts": [
                  "estrutura",
                  "estruturação",
                  "estrutureza",
                  "estruturança"
                ],
                "ans": 0
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the sentence into Portuguese using nominalized forms where appropriate.",
            "items": [
              {
                "q": "The interpretation of this passage requires careful reading.",
                "ans": "A interpretação desta passagem requer leitura cuidadosa."
              },
              {
                "q": "The clarity of the author's argument strengthens the text.",
                "ans": "A clareza do argumento do autor fortalece o texto."
              },
              {
                "q": "The development of complex ideas demands the reader's attention.",
                "ans": "O desenvolvimento de ideias complexas exige a atenção do leitor."
              },
              {
                "q": "Recognition of the text's beauty enhances aesthetic appreciation.",
                "ans": "O reconhecimento da beleza do texto aumenta a apreciação estética."
              },
              {
                "q": "The complexity of the narrative structure makes re-reading necessary.",
                "ans": "A complexidade da estrutura narrativa torna a releitura necessária."
              }
            ]
          }
        ],
        "teacherTip": "Emphasize that nominalization transforms sentences into more formal, academic register—essential for B2 advanced reading. Have students compare simple verb sentences with nominalized versions to see how nominalizations create denser, more sophisticated prose typical of academic texts."
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
              "pt": "Se você tivesse estudado com mais dedicação, teria consolidado melhor as estruturas gramaticais e poderia estar falando com maior fluência agora.",
              "en": "If you had studied with more dedication, you would have consolidated the grammatical structures better and could be speaking with greater fluency now."
            },
            {
              "pt": "Embora o subjuntivo seja complicado, é fundamental que você o domine caso queira aprimorar seu nível de português.",
              "en": "Although the subjunctive is complicated, it is essential that you master it if you want to improve your Portuguese level."
            },
            {
              "pt": "Não obstante as dificuldades iniciais, os alunos conseguiram superar os desafios e consolidaram conhecimentos que lhes permitirão avançar no próximo módulo.",
              "en": "Despite the initial difficulties, the students managed to overcome the challenges and consolidated knowledge that will allow them to advance in the next module."
            },
            {
              "pt": "A menos que você pratique regularmente, dificilmente manterá a fluência que conquistou, portanto é recomendável que continue estudando.",
              "en": "Unless you practice regularly, you will hardly maintain the fluency you achieved, so it is advisable that you continue studying."
            },
            {
              "pt": "Quanto mais você se expõe ao idioma através de leitura, audição e conversação, mais rápido aprimorará suas habilidades e dominará as nuances culturais.",
              "en": "The more you expose yourself to the language through reading, listening, and conversation, the faster you will improve your skills and master the cultural nuances."
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
            "pt": "consolidar",
            "en": "to consolidate",
            "ex": "Precisamos consolidar nossos conhecimentos antes do exame.",
            "exEn": "We need to consolidate our knowledge before the exam."
          },
          {
            "pt": "aprimorar",
            "en": "to improve/refine",
            "ex": "Ela quer aprimorar suas habilidades de comunicação.",
            "exEn": "She wants to refine her communication skills."
          },
          {
            "pt": "dominar",
            "en": "to master",
            "ex": "Para dominar o idioma, você precisa praticar diariamente.",
            "exEn": "To master the language, you need to practice daily."
          },
          {
            "pt": "desafiador",
            "en": "challenging",
            "ex": "A gramática portuguesa é desafiadora para falantes de inglês.",
            "exEn": "Portuguese grammar is challenging for English speakers."
          },
          {
            "pt": "fluência",
            "en": "fluency",
            "ex": "Ele atingiu fluência em português após dois anos de estudo.",
            "exEn": "He achieved fluency in Portuguese after two years of study."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Se eu estudaria mais, consolidaria melhor.",
            "correct": "Se eu estudasse mais, consolidaria melhor.",
            "note": "The conditional (estudaria) cannot follow 'se' in Portuguese. Use the imperfect subjunctive (estudasse) in the if-clause."
          },
          {
            "wrong": "Eu preciso que você estude português porque você quer aprender.",
            "correct": "Eu preciso que você estude português para que você aprenda.",
            "note": "'Porque' (because) introduces a cause; 'para que' (so that) introduces a purpose. Use the latter with subjunctive for intentions."
          },
          {
            "wrong": "Não obstante de suas dificuldades, ele conseguiu consolidar o conhecimento.",
            "correct": "Não obstante suas dificuldades, ele conseguiu consolidar o conhecimento.",
            "note": "'Não obstante' does not take the preposition 'de'. It directly precedes the noun without a preposition."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete with the correct word or phrase.",
            "items": [
              {
                "q": "É fundamental que você ___ seus conhecimentos de gramática antes do exame final.",
                "ans": "consolide"
              },
              {
                "q": "Embora a pronúncia seja difícil, ___ continue tentando melhorar.",
                "ans": "é importante que você"
              },
              {
                "q": "Se você tivesse praticado mais, ___ dominado o subjuntivo.",
                "ans": "teria"
              },
              {
                "q": "A menos que ___ regularmente, não manterá sua fluência.",
                "ans": "você pratique"
              },
              {
                "q": "Quanto mais ___, mais rápido aprimorará suas habilidades.",
                "ans": "você se expuser ao idioma / você estuda"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option.",
            "items": [
              {
                "q": "Qual frase está correta?",
                "opts": [
                  "Se eu teria tempo, estudaria mais.",
                  "Se eu tivesse tempo, estudaria mais.",
                  "Se eu tenho tempo, estudo mais.",
                  "Se eu terei tempo, estudarei mais."
                ],
                "ans": 1
              },
              {
                "q": "Complete: É necessário que todos os alunos ___ seus projetos antes do prazo.",
                "opts": [
                  "entregam",
                  "entreguem",
                  "entregarão",
                  "entregassem"
                ],
                "ans": 1
              },
              {
                "q": "Qual alternativa melhor completa a frase? Não obstante ___, ele conseguiu consolidar seus conhecimentos.",
                "opts": [
                  "das dificuldades",
                  "de as dificuldades",
                  "as dificuldades",
                  "as suas dificuldades"
                ],
                "ans": 2
              },
              {
                "q": "Escolha a opção correta: 'Ele estuda português ___ aprender a falar com fluência.'",
                "opts": [
                  "porque",
                  "para que",
                  "para",
                  "portanto"
                ],
                "ans": 2
              },
              {
                "q": "Qual frase demonstra o uso correto do gerúndio para uma ação contínua?",
                "opts": [
                  "Estudando todos os dias, você consolida seus conhecimentos.",
                  "Estuda todos os dias, você consolida seus conhecimentos.",
                  "Tendo estudado, você consolidará seus conhecimentos.",
                  "Ao estudar todos os dias, consolidando seus conhecimentos."
                ],
                "ans": 0
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the sentence into Portuguese.",
            "items": [
              {
                "q": "Although he had studied hard, he still struggled with the subjunctive mood.",
                "ans": "Embora ele tivesse estudado muito, ainda tinha dificuldade com o subjuntivo."
              },
              {
                "q": "Unless you consolidate your vocabulary, you won't be able to achieve fluency.",
                "ans": "A menos que você consolide seu vocabulário, você não conseguirá atingir fluência."
              },
              {
                "q": "It is essential that you master all B2 structures before moving to the next level.",
                "ans": "É essencial que você domine todas as estruturas de nível B2 antes de avançar para o próximo nível."
              },
              {
                "q": "The more you practice, the faster you will improve your communication skills.",
                "ans": "Quanto mais você pratica, mais rápido aprimora suas habilidades de comunicação."
              },
              {
                "q": "If you had paid more attention in class, you would have consolidated the grammatical concepts.",
                "ans": "Se você tivesse prestado mais atenção na aula, teria consolidado os conceitos gramaticais."
              }
            ]
          }
        ],
        "teacherTip": "At B2, students should deploy multiple complex structures simultaneously and naturally—mix conditional sentences, subjunctive, and advanced connectors in authentic contexts. Encourage them to identify B2 patterns in real Portuguese media (podcasts, news articles) to see fluent speakers using these structures organically."
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
              "pt": "Ele nunca perde uma oportunidade de fazer uma piada.",
              "en": "He never misses an opportunity to make a joke."
            },
            {
              "pt": "Vou aproveitar o tempo para fazer uma leitura aprofundada.",
              "en": "I'm going to use the time to do a thorough reading."
            },
            {
              "pt": "A empresa decidiu tomar uma medida drástica para melhorar os resultados.",
              "en": "The company decided to take a drastic measure to improve results."
            },
            {
              "pt": "Ele fez uma promessa que não conseguiu cumprir.",
              "en": "He made a promise that he couldn't keep."
            },
            {
              "pt": "Precisamos manter uma postura profissional em todas as situações.",
              "en": "We need to maintain a professional stance in all situations."
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
            "pt": "dar um jeito",
            "en": "to find a way, to manage",
            "ex": "Ele sempre dá um jeito de resolver os problemas.",
            "exEn": "He always manages to solve the problems."
          },
          {
            "pt": "levar a mal",
            "en": "to take offense, to take badly",
            "ex": "Não leve a mal, era só uma brincadeira.",
            "exEn": "Don't take offense, it was just a joke."
          },
          {
            "pt": "fazer uma tempestade em copo de água",
            "en": "to make a mountain out of a molehill",
            "ex": "Você está fazendo uma tempestade em copo de água com isso.",
            "exEn": "You're making a mountain out of a molehill about this."
          },
          {
            "pt": "bater papo",
            "en": "to chat, to have a conversation",
            "ex": "Ficamos batendo papo até tarde da noite.",
            "exEn": "We chatted until late at night."
          },
          {
            "pt": "dar um passo atrás",
            "en": "to take a step back, to reconsider",
            "ex": "Precisamos dar um passo atrás e repensar a estratégia.",
            "exEn": "We need to take a step back and reconsider our strategy."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Ele fez um erro grave no seu trabalho.",
            "correct": "Ele cometeu um erro grave no seu trabalho.",
            "note": "In Portuguese, 'cometer um erro' (to commit an error) is the standard collocation, not 'fazer um erro'. English speakers often translate 'to make' directly as 'fazer'."
          },
          {
            "wrong": "Vou fazer uma decisão importante amanhã.",
            "correct": "Vou tomar uma decisão importante amanhã.",
            "en": "I'm going to make an important decision tomorrow.",
            "note": "The correct collocation is 'tomar uma decisão' (to take a decision), not 'fazer uma decisão'. This is a direct translation interference from English."
          },
          {
            "wrong": "Ele recusou aceitar a responsabilidade por sua ação.",
            "correct": "Ele se recusou a aceitar a responsabilidade por sua ação.",
            "note": "The verb 'recusar' requires the reflexive form 'se recusar a' when followed by an infinitive, not just 'recusar'. English speakers often omit the reflexive pronoun."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentences with the correct verb + noun collocation.",
            "items": [
              {
                "q": "Quando recebi a notícia ruim, meu coração ___.",
                "ans": "acelerou"
              },
              {
                "q": "Você precisa ___ uma decisão sobre seu futuro.",
                "ans": "tomar"
              },
              {
                "q": "Ele ___ uma promessa de que voltaria em breve.",
                "ans": "fez"
              },
              {
                "q": "Não ___ a mal o que falei, era apenas uma sugestão.",
                "ans": "leve"
              },
              {
                "q": "Todos os dias ___ com meus colegas sobre os projetos.",
                "ans": "bato papo"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct collocation for each sentence.",
            "items": [
              {
                "q": "Ele sempre ___ de resolver problemas difíceis.",
                "opts": [
                  "faz um jeito",
                  "dá um jeito",
                  "tira um jeito",
                  "pega um jeito"
                ],
                "ans": 1
              },
              {
                "q": "A situação não é grave; você está ___.",
                "opts": [
                  "fazendo uma tempestade em copo de água",
                  "fazendo uma chuva em prato fundo",
                  "criando um furacão em garrafa",
                  "inventando uma tormenta em vidro"
                ],
                "ans": 0
              },
              {
                "q": "Quando ___ com meus amigos sobre política, sempre discordamos.",
                "opts": [
                  "faço conversa",
                  "bato papo",
                  "faço um diálogo",
                  "realizo uma fala"
                ],
                "ans": 1
              },
              {
                "q": "Precisamos ___ e reconsiderar nossa abordagem.",
                "opts": [
                  "dar um passo atrás",
                  "fazer um passo para trás",
                  "tirar um passo atrás",
                  "levar um passo atrás"
                ],
                "ans": 0
              },
              {
                "q": "Ele ___ de entrar na sala porque estava nervoso.",
                "opts": [
                  "recusou",
                  "se recusou a",
                  "recusou de",
                  "negou"
                ],
                "ans": 1
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the following sentences into Brazilian Portuguese, using the correct collocations.",
            "items": [
              {
                "q": "I made a serious mistake at work yesterday.",
                "ans": "Cometi um erro grave no trabalho ontem."
              },
              {
                "q": "We need to take responsibility for our decisions.",
                "ans": "Precisamos assumir a responsabilidade pelas nossas decisões."
              },
              {
                "q": "Don't take it badly; I was just joking with you.",
                "ans": "Não leve a mal; eu estava apenas brincando com você."
              },
              {
                "q": "He always finds a way to make everyone laugh.",
                "ans": "Ele sempre dá um jeito de fazer todos rirem."
              },
              {
                "q": "After the argument, we chatted and resolved everything.",
                "ans": "Depois da briga, batemos papo e resolvemos tudo."
              }
            ]
          }
        ],
        "teacherTip": "At C1 level, focus on helping students recognize that Portuguese collocations often differ significantly from English and even from Latin-based Romance languages. Encourage pattern recognition by grouping similar collocations (e.g., 'tomar' collocations like 'tomar uma decisão', 'tomar cuidado', 'tomar banho') and have students create personalized example sentences based on their own experiences."
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
              "pt": "\"Que trabalho excelente você fez!\" (dito com tom sarcástico)",
              "en": "\"What excellent work you did!\" (said with sarcastic tone) — implies the opposite; poor quality work"
            },
            {
              "pt": "\"Ah, claro, você é sempre tão pontuaal...\" (quando a pessoa é notoriamente atrasada)",
              "en": "\"Ah, of course, you're always so punctual...\" (when the person is notoriously late) — ironic praise masking criticism"
            },
            {
              "pt": "\"Que legal que você não veio à reunião importante ontem.\"",
              "en": "\"How cool that you didn't come to the important meeting yesterday.\" — indirect blame through false approval"
            },
            {
              "pt": "\"Deve ser muito confortável viajar com tão pouco dinheiro.\" (dito para alguém que viaja em economia extrema)",
              "en": "\"It must be very comfortable traveling with so little money.\" (said to someone traveling extremely frugally) — ironic sympathy hiding judgment"
            },
            {
              "pt": "\"Naturalmente, você lembrou de trazer os documentos que pedimos três vezes.\" (dito quando a pessoa esqueceu)",
              "en": "\"Naturally, you remembered to bring the documents we asked for three times.\" (said when the person forgot) — sarcasm implying forgetfulness"
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
            "pt": "pressuposto",
            "en": "presupposition",
            "ex": "O pressuposto por trás dessa frase é que todos já sabem do assunto.",
            "exEn": "The presupposition behind that sentence is that everyone already knows about the subject."
          },
          {
            "pt": "subtexto",
            "en": "subtext",
            "ex": "O subtexto da conversa revelava tensão entre os dois.",
            "exEn": "The subtext of the conversation revealed tension between the two."
          },
          {
            "pt": "ambiguidade",
            "en": "ambiguity",
            "ex": "A ambiguidade intencional deixou espaço para múltiplas interpretações.",
            "exEn": "The intentional ambiguity left room for multiple interpretations."
          },
          {
            "pt": "conotação",
            "en": "connotation",
            "ex": "A palavra carrega uma conotação negativa no contexto social atual.",
            "exEn": "The word carries a negative connotation in the current social context."
          },
          {
            "pt": "inferência",
            "en": "inference",
            "ex": "Pela inferência do tom, podemos deduzir que ele estava descontente.",
            "exEn": "From the inference of his tone, we can deduce that he was unhappy."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Interpretar ironia como sentido literal, especialmente quando a entonação não está clara em textos escritos.",
            "correct": "Considerar o contexto, o tom, a relação entre os falantes, e o que foi dito antes para reconhecer ironia.",
            "note": "English speakers often struggle with Brazilian irony because it relies heavily on tone and shared cultural knowledge, not just linguistic markers."
          },
          {
            "wrong": "Confundir 'subtexto' (subtext) com 'contexto' (context) e não diferenciar o que é explícito do que é implicado.",
            "correct": "Subtexto é o significado não-dito; contexto é a situação ao redor. Sempre analise ambos separadamente.",
            "note": "These are distinct concepts: context surrounds the statement, while subtext lies within it, requiring inference."
          },
          {
            "wrong": "Não reconhecer que pressupostos culturais brasileiros influenciam a comunicação indireta, tratando tudo como universal.",
            "correct": "Estudar pressupostos culturais específicos do Brasil: relacionamentos hierárquicos, familiaridade, e evitação de confronto direto.",
            "note": "Brazilian Portuguese speakers often use indirect communication to maintain harmony; direct refusal is considered rude."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentences with the correct vocabulary related to indirect communication.",
            "items": [
              {
                "q": "O ___ da mensagem era que ele não queria ir à festa, apesar do que disse.",
                "ans": "subtexto"
              },
              {
                "q": "Para entender melhor, você precisa fazer uma ___ sobre o que realmente foi dito entre as linhas.",
                "ans": "inferência"
              },
              {
                "q": "A ___ dessa frase pode levar a mal-entendidos se não considerarmos o tom.",
                "ans": "ambiguidade"
              },
              {
                "q": "Essa palavra tem uma ___ muito negativa em certos círculos sociais.",
                "ans": "conotação"
              },
              {
                "q": "O ___ é que todos nós já conhecemos essa história, por isso ele não precisou explicar.",
                "ans": "pressuposto"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the option that best explains the implicit meaning or irony in each statement.",
            "items": [
              {
                "q": "Quando alguém diz \"Que sorte você tem em sempre sair com pessoas tão interessantes!\" para alguém que sai com pessoas chatas, qual é o significado implícito?",
                "opts": [
                  "A pessoa realmente acha que ele sai com pessoas interessantes.",
                  "É uma crítica irônica sugerindo que ele sai com pessoas entediantes.",
                  "O falante quer ser amigo dessa pessoa.",
                  "É um elogio genuíno."
                ],
                "ans": 1
              },
              {
                "q": "\"Claro, você com certeza não esqueceu nossa conversa de ontem.\" O que essa frase comunica indiretamente?",
                "opts": [
                  "O falante tem certeza de que foi lembrado.",
                  "O falante sarcásticamente implica que a pessoa esqueceu.",
                  "O falante está pedindo desculpas.",
                  "O falante quer marcar outro encontro."
                ],
                "ans": 1
              },
              {
                "q": "Qual é o pressuposto implícito em \"Como é bom viajar com orçamento apertado!\"?",
                "opts": [
                  "Viajar com orçamento apertado é realmente bom.",
                  "O falante nunca viajou.",
                  "Viajar com orçamento apertado é difícil/desconfortável.",
                  "O falante quer ajudar financeiramente."
                ],
                "ans": 2
              },
              {
                "q": "\"Que incrível que você chegou no horário!\" (dito para alguém sempre atrasado). Qual é a ironia?",
                "opts": [
                  "É genuíno elogio.",
                  "É sarcasmo comentando sobre o padrão de atrasos da pessoa.",
                  "O falante tem dificuldade com horários também.",
                  "É um convite para jantar."
                ],
                "ans": 1
              },
              {
                "q": "O subtexto de \"Você definitivamente ouviu o que eu disse, não é?\" expressa:",
                "opts": [
                  "Certeza de que foi ouvido.",
                  "Dúvida ou suspeita de que não foi ouvido.",
                  "Alegria com a comunicação.",
                  "Vontade de repetir."
                ],
                "ans": 1
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate these English sentences into Brazilian Portuguese, paying attention to implicit meaning and irony.",
            "items": [
              {
                "q": "How wonderful that you finally remembered my birthday.",
                "ans": "Que bom que você finalmente lembrou do meu aniversário. (or: Que legal que você finalmente se lembrou do meu aniversário.)"
              },
              {
                "q": "Of course, you're always so helpful with your comments.",
                "ans": "Claro, você é sempre tão prestativo com seus comentários. (or: Naturalmente, você é sempre tão atencioso com seus comentários.)"
              },
              {
                "q": "I'm sure you read the entire email I sent you yesterday.",
                "ans": "Tenho certeza de que você leu o e-mail inteiro que enviei ontem. (or: Com certeza você leu todo o e-mail que mandei para você ontem.)"
              },
              {
                "q": "It must be so easy to understand everything on the first try.",
                "ans": "Deve ser tão fácil entender tudo na primeira vez. (or: Deve ser muito fácil compreender tudo de primeira.)"
              },
              {
                "q": "How brave of you to admit your mistake immediately.",
                "ans": "Que corajoso de sua parte admitir seu erro imediatamente. (or: Que coragem sua em reconhecer o erro tão rápido.)"
              }
            ]
          }
        ],
        "teacherTip": "At C1 level, students must recognize that Brazilian Portuguese heavily relies on context, tone, and shared cultural understanding to convey irony and indirect meaning—often more than explicit linguistic markers. Encourage learners to listen for what is NOT said and to consider the relationship between speakers, as Brazilians frequently soften criticism through irony to maintain social harmony."
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
              "pt": "A implementação de políticas públicas, cujo objetivo é mitigar desigualdades sociais, depende, fundamentalmente, da compreensão de que a redistribuição de recursos, quando realizada de forma equânime, constitui uma medida imperativa para a consecução do desenvolvimento sustentável.",
              "en": "The implementation of public policies, whose objective is to mitigate social inequalities, depends, fundamentally, on the understanding that the redistribution of resources, when carried out equitably, constitutes an imperative measure for achieving sustainable development."
            },
            {
              "pt": "O surgimento de novas tecnologias, ainda que promissor, suscita preocupações quanto à privacidade dos cidadãos, razão pela qual a regulamentação de tais inovações, conforme debatido em fóruns internacionais, revela-se necessária para assegurar que o progresso científico não comprometa direitos fundamentais.",
              "en": "The emergence of new technologies, although promising, raises concerns regarding citizens' privacy, which is why the regulation of such innovations, as debated in international forums, proves necessary to ensure that scientific progress does not compromise fundamental rights."
            },
            {
              "pt": "A análise crítica de fenômenos socioculturais, que perpassa pela investigação de suas raízes históricas e pela consideração de suas implicações contemporâneas, exige uma abordagem multidisciplinar que reconheça a complexidade inerente às manifestações culturais, cujas nuances, frequentemente negligenciadas em estudos superficiais, constituem elementos fundamentais para uma compreensão holística.",
              "en": "The critical analysis of sociocultural phenomena, which passes through the investigation of their historical roots and the consideration of their contemporary implications, requires a multidisciplinary approach that recognizes the complexity inherent in cultural manifestations, whose nuances, frequently neglected in superficial studies, constitute fundamental elements for a holistic understanding."
            },
            {
              "pt": "A reformulação do sistema educacional, considerando-se que a transformação da pedagogia tradicional representa uma necessidade inadiável, deve contemplar não apenas a atualização curricular, mas também a implementação de metodologias inovadoras que, articuladas com a formação continuada de docentes, possibilitem uma educação verdadeiramente inclusiva e emancipatória.",
              "en": "The reformulation of the educational system, considering that the transformation of traditional pedagogy represents an unavoidable necessity, must contemplate not only curricular updating, but also the implementation of innovative methodologies that, articulated with the continuous training of educators, enable truly inclusive and emancipatory education."
            },
            {
              "pt": "A consolidação de economias sustentáveis, cujo fundamento assenta-se na premissa de que o crescimento econômico, quando desvinculado de responsabilidades ambientais, perpetua ciclos de degradação ecológica, demanda uma transição paradigmática que integre, simultaneamente, a viabilidade financeira e a preservação de recursos naturais, configurando-se, portanto, como imperativo estratégico para as gerações futuras.",
              "en": "The consolidation of sustainable economies, whose foundation is based on the premise that economic growth, when disconnected from environmental responsibilities, perpetuates cycles of ecological degradation, demands a paradigmatic transition that simultaneously integrates financial viability and natural resource preservation, configuring itself, therefore, as a strategic imperative for future generations."
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
            "pt": "o encadeamento",
            "en": "chaining; linking",
            "ex": "O encadeamento de ideias complexas exige uso de conectores formais.",
            "exEn": "Chaining complex ideas requires the use of formal connectors."
          },
          {
            "pt": "a nominalização",
            "en": "nominalization",
            "ex": "A nominalização do verbo 'argumentar' resulta em 'argumentação'.",
            "exEn": "The nominalization of the verb 'to argue' results in 'argumentation'."
          },
          {
            "pt": "subordinado",
            "en": "subordinate; embedded",
            "ex": "O período contém três orações subordinadas que se entrelaçam.",
            "exEn": "The sentence contains three subordinate clauses that interweave."
          },
          {
            "pt": "o entrelançamento",
            "en": "interweaving; interlacing",
            "ex": "O entrelançamento de conceitos abstratos demanda clareza estrutural.",
            "exEn": "The interweaving of abstract concepts demands structural clarity."
          },
          {
            "pt": "concomitantemente",
            "en": "concomitantly; at the same time",
            "ex": "O desenvolvimento tecnológico ocorre concomitantemente com questões éticas.",
            "exEn": "Technological development occurs concomitantly with ethical questions."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "O desenvolvimento de tecnologia é importante porque melhora a vida das pessoas.",
            "correct": "O desenvolvimento tecnológico, cujas implicações se estendem a diversos setores da sociedade, contribui, sobremaneira, para a melhoria das condições existenciais, ainda que suscite questões relativas à sustentabilidade ambiental.",
            "note": "At C1, avoid simple causal structures. Use nominalizations ('desenvolvimento tecnológico' instead of 'desenvolvimento de tecnologia'), embedded clauses, and formal connectors to create sophisticated, layered discourse."
          },
          {
            "wrong": "A análise mostra que o problema é complexo e tem muitas causas.",
            "correct": "A análise em questão evidencia que a problemática, cuja natureza multifacetada decorre de uma multiplicidade de fatores interligados, demanda uma abordagem que transcenda perspectivas unilaterais.",
            "note": "English speakers often flatten complex ideas into coordinate structures. Use subordination, nominalization, and formal markers like 'em questão' and 'cuja natureza' to reflect C1 sophistication."
          },
          {
            "wrong": "Quando as pessoas entendem a importância disso, elas mudam de comportamento.",
            "correct": "A compreensão da relevância de tal questão, quando articulada através de processos educacionais sistemáticos, catalisa transformações comportamentais que, embora não imediatas, constituem alicerce para mudanças estruturais de longo alcance.",
            "note": "Avoid oversimplification of cause-and-effect. At C1, use nominalizations ('compreensão', 'transformações comportamentais'), embedded clauses ('quando articulada'), and formal connectors ('embora', 'constituem') to convey nuance and qualification."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete with the correct formal connector or transitional phrase.",
            "items": [
              {
                "q": "A implementação de reformas estruturais, _____, requer consenso político entre as partes envolvidas.",
                "ans": "conquanto necessária"
              },
              {
                "q": "O fenômeno em questão, _____ por estudiosos contemporâneos, revela a complexidade das dinâmicas sociais.",
                "ans": "amplamente debatido"
              },
              {
                "q": "A sustentabilidade ambiental não se limita a questões ecológicas; _____, envolve repercussões econômicas e sociais.",
                "ans": "ao contrário"
              },
              {
                "q": "O desenvolvimento tecnológico, _____ suas vantagens, suscita preocupações legítimas acerca da privacidade.",
                "ans": "não obstante"
              },
              {
                "q": "A análise crítica das políticas públicas pressupõe, _____, compreensão profunda de seus contextos históricos.",
                "ans": "por conseguinte"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the option that best completes the sentence with appropriate nominalization and embedding.",
            "items": [
              {
                "q": "A _____ da inteligência artificial em setores produtivos, embora promissora, implica desafios relativos à requalificação profissional.",
                "opts": [
                  "aplicação sistemática",
                  "aplicar sistematicamente",
                  "ser aplicada sistematicamente",
                  "aplicando-se sistematicamente"
                ],
                "ans": 0
              },
              {
                "q": "A _____ de que recursos naturais são infinitos, a qual permeou paradigmas econômicos pretéritos, revela-se incompatível com dados científicos contemporâneos.",
                "opts": [
                  "crença equivocada",
                  "crer equivocadamente",
                  "ser crido equivocadamente",
                  "acreditando-se equivocadamente"
                ],
                "ans": 0
              },
              {
                "q": "O _____ entre desenvolvimento econômico e preservação ambiental constitui um dos dilemas centrais da contemporaneidade.",
                "opts": [
                  "balancear",
                  "equilíbrio",
                  "balanceado",
                  "equilibrando"
                ],
                "ans": 1
              },
              {
                "q": "A _____ de metodologias pedagógicas inovadoras, concomitantemente com a formação docente, potencializa transformações educacionais duradouras.",
                "opts": [
                  "implementar",
                  "implementada",
                  "implementação",
                  "implementando"
                ],
                "ans": 2
              },
              {
                "q": "O _____ de que as políticas públicas refletem valores coletivos permite compreender sua dimensão ética e política.",
                "opts": [
                  "reconhecer",
                  "reconhecido",
                  "reconhecimento",
                  "reconhecendo"
                ],
                "ans": 2
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the sentence into Brazilian Portuguese, using multiple embedded clauses and nominalizations at C1 level.",
            "items": [
              {
                "q": "The implementation of sustainable practices, which requires a paradigm shift in how societies perceive economic growth, depends fundamentally on political will and social awareness.",
                "ans": "A implementação de práticas sustentáveis, que exige uma mudança paradigmática na forma como as sociedades percebem o crescimento econômico, depende, fundamentalmente, da vontade política e da consciência social."
              },
              {
                "q": "The emergence of artificial intelligence, although promising technological advances, raises legitimate concerns regarding employment and social equity.",
                "ans": "O surgimento da inteligência artificial, embora promissor em avanços tecnológicos, suscita preocupações legítimas acerca do emprego e da equidade social."
              },
              {
                "q": "The analysis of sociocultural phenomena, whose complexity frequently eludes superficial examinations, requires multidisciplinary approaches that recognize the interplay of historical, economic, and symbolic dimensions.",
                "ans": "A análise de fenômenos socioculturais, cuja complexidade frequentemente elude exames superficiais, requer abordagens multidisciplinares que reconheçam a interação de dimensões históricas, econômicas e simbólicas."
              },
              {
                "q": "The reformulation of educational systems, insofar as it presupposes the transformation of traditional pedagogies, must contemplate not only curricular innovation but also the continuous training of educators.",
                "ans": "A reformulação de sistemas educacionais, na medida em que pressupõe a transformação das pedagogias tradicionais, deve contemplar não apenas inovação curricular, mas também a formação continuada de educadores."
              },
              {
                "q": "The consolidation of democratic institutions, which depends on civic participation and the rule of law, constitutes an imperative for societies aspiring to social justice and collective well-being.",
                "ans": "A consolidação de instituições democráticas, que depende da participação cívica e do estado de direito, constitui imperativo para sociedades que aspiram à justiça social e ao bem-estar coletivo."
              }
            ]
          }
        ],
        "teacherTip": "At C1, emphasize that sophisticated writing relies on strategic use of nominalizations (converting verbs into nouns) combined with multiple levels of embedded clauses connected by formal transitional markers. Encourage students to practice 'densifying' simple statements by layering subordinate structures and using connectors like 'conquanto', 'não obstante', and 'concomitantemente' to signal nuanced relationships between ideas."
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
              "pt": "Que eu seja milionário se ele disser a verdade!",
              "en": "If only I were a millionaire if he told the truth! (ironically suggesting he never tells the truth)"
            },
            {
              "pt": "Que venha logo o dia em que você reconheça seu erro!",
              "en": "May the day come when you acknowledge your mistake! (ironically doubting it will happen)"
            },
            {
              "pt": "Se eu fosse acreditar nisso, era porque estava dormindo de olhos abertos!",
              "en": "If I were to believe that, it would be because I was sleeping with my eyes open! (ironic conditional expressing disbelief)"
            },
            {
              "pt": "Que maravilha de futuro nos espera se continuarmos assim!",
              "en": "What a wonderful future awaits us if we continue like this! (ironic exclamation implying the opposite)"
            },
            {
              "pt": "Se ele fosse inteligente, teria entendido a piada na primeira vez!",
              "en": "If he were intelligent, he would have understood the joke the first time! (ironic conditional implying he is not intelligent)"
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
            "pt": "a zoação",
            "en": "teasing, banter",
            "ex": "A zoação entre amigos é uma forma de humor muito brasileira.",
            "exEn": "Teasing between friends is a very Brazilian form of humor."
          },
          {
            "pt": "a tirada",
            "en": "witty remark, quip",
            "ex": "Ele soltou uma tirada bem-humorada na reunião.",
            "exEn": "He delivered a witty remark at the meeting."
          },
          {
            "pt": "a ironia",
            "en": "irony",
            "ex": "A ironia é fundamental para entender piadas sofisticadas.",
            "exEn": "Irony is fundamental to understanding sophisticated jokes."
          },
          {
            "pt": "debochado/a",
            "en": "mocking, cheeky",
            "ex": "Seu tom debochado não convence ninguém.",
            "exEn": "Your mocking tone doesn't convince anyone."
          },
          {
            "pt": "a sutileza",
            "en": "subtlety, nuance",
            "ex": "A sutileza do humor brasileiro às vezes escapa aos estrangeiros.",
            "exEn": "The subtlety of Brazilian humor sometimes escapes foreigners."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Que eu ganhe na loteria se você falar a verdade!",
            "correct": "Que eu seja milionário se você falar a verdade!",
            "note": "English speakers often use indicative mood or wrong verb forms. The subjunctive expresses the ironic hypothetical nature. 'Ganhar' would be indicative; 'seja' (subjunctive) correctly conveys irony."
          },
          {
            "wrong": "Se ele entenderia a ironia, seria diferente.",
            "correct": "Se ele entendesse a ironia, seria diferente.",
            "note": "The conditional 'entenderia' is incorrect after 'se'. Use the imperfect subjunctive 'entendesse' in the 'se' clause, then the conditional in the main clause."
          },
          {
            "wrong": "Que você vai compreender a sutileza do humor!",
            "correct": "Que você compreenda a sutileza do humor!",
            "note": "English speakers default to future tense, but 'Que' + exclamation requires the present subjunctive 'compreenda', not the future 'vai compreender'."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete with the correct subjunctive form of the verb in parentheses.",
            "items": [
              {
                "q": "Que você ___ (entender) a ironia desta piada!",
                "ans": "entenda"
              },
              {
                "q": "Se ele ___ (ser) sensível ao humor, teria rido.",
                "ans": "fosse"
              },
              {
                "q": "Que nós ___ (viver) em um mundo onde a zoação não existisse!",
                "ans": "vivêssemos"
              },
              {
                "q": "Se ela ___ (captar) a sutileza, seria muito diferente.",
                "ans": "captasse"
              },
              {
                "q": "Que ele ___ (reconhecer) o deboche quando o vê!",
                "ans": "reconheça"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the correct option to complete the sentence with proper ironic subjunctive.",
            "items": [
              {
                "q": "Que eu ___ brasileiro de verdade se acredito nessa história!",
                "opts": [
                  "sou",
                  "seja",
                  "fui",
                  "fosse"
                ],
                "ans": 1
              },
              {
                "q": "Se você ___ a piada, teria sorrido.",
                "opts": [
                  "entenderia",
                  "entendeu",
                  "entendesse",
                  "entender"
                ],
                "ans": 2
              },
              {
                "q": "Que ele ___ tão ingênuo para não notar a ironia!",
                "opts": [
                  "é",
                  "seja",
                  "fosse",
                  "seria"
                ],
                "ans": 1
              },
              {
                "q": "Se nós ___ sofisticados, compreenderíamos essa tirada.",
                "opts": [
                  "somos",
                  "seríamos",
                  "fôssemos",
                  "fosse"
                ],
                "ans": 2
              },
              {
                "q": "Que ela ___ a sutileza do humor brasileiro!",
                "opts": [
                  "captasse",
                  "capte",
                  "captura",
                  "captará"
                ],
                "ans": 1
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the sentence into Brazilian Portuguese using Que + subjunctive or ironic conditional.",
            "items": [
              {
                "q": "May you understand the irony of this joke!",
                "ans": "Que você compreenda a ironia desta piada!"
              },
              {
                "q": "If he were sensitive to humor, he would have laughed.",
                "ans": "Se ele fosse sensível ao humor, teria rido."
              },
              {
                "q": "What a wonderful day if he finally caught the joke!",
                "ans": "Que dia maravilhoso se ele finalmente captasse a piada!"
              },
              {
                "q": "If we were truly Brazilian, we would appreciate the banter.",
                "ans": "Se fôssemos brasileiros de verdade, apreciaríamos a zoação."
              },
              {
                "q": "May I be a liar if that's what he actually meant!",
                "ans": "Que eu seja mentiroso se é isso que ele realmente quis dizer!"
              }
            ]
          }
        ],
        "teacherTip": "At C1 level, emphasize that ironic subjunctives in Brazilian Portuguese require both grammatical precision and cultural awareness—native speakers use these structures to signal skepticism, humor, or sarcasm, so students must recognize the pragmatic function alongside the grammar. Practice with authentic Brazilian media (comedy specials, satirical TV shows) to develop intuition for when and how these constructions convey subtle cultural meanings."
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
              "pt": "Não use o subjuntivo porque 'a gramática diz'—use-o porque você precisa expressar dúvida, possibilidade ou desejo genuíno.",
              "en": "Don't use the subjunctive because 'grammar says so'—use it because you genuinely need to express doubt, possibility, or desire."
            },
            {
              "pt": "Escolha entre 'por' e 'para' não por regra memorizada, mas porque uma é mais precisa para o seu significado intencional.",
              "en": "Choose between 'por' and 'para' not by memorized rule, but because one is more precise for your intended meaning."
            },
            {
              "pt": "Os tempos verbais devem refletir sua perspectiva narrativa—use pretérito perfeito ou imperfeito conforme o efeito comunicativo que deseja.",
              "en": "Verb tenses should reflect your narrative perspective—use preterite or imperfect according to the communicative effect you want."
            },
            {
              "pt": "As colocações pronominais surgem naturalmente quando você prioriza clareza e fluidez sobre regras rígidas.",
              "en": "Pronoun placements emerge naturally when you prioritize clarity and flow over rigid rules."
            },
            {
              "pt": "A concordância nominal e verbal existe para servir à precisão da sua mensagem, não ao contrário.",
              "en": "Nominal and verbal agreement exists to serve the precision of your message, not the other way around."
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
            "pt": "matizar",
            "en": "to nuance; to add subtlety",
            "ex": "É importante matizar essa afirmação para evitar generalizações.",
            "exEn": "It's important to nuance that statement to avoid generalizations."
          },
          {
            "pt": "entremeado",
            "en": "interspersed; interwoven",
            "ex": "Seu discurso foi entremeado de exemplos práticos e referências teóricas.",
            "exEn": "His speech was interspersed with practical examples and theoretical references."
          },
          {
            "pt": "vislumbrar",
            "en": "to catch a glimpse of; to foresee",
            "ex": "Conseguimos vislumbrar as possibilidades futuras do projeto.",
            "exEn": "We were able to foresee the future possibilities of the project."
          },
          {
            "pt": "consubstanciar",
            "en": "to embody; to substantiate",
            "ex": "Os resultados consubstanciam a nossa hipótese inicial.",
            "exEn": "The results substantiate our initial hypothesis."
          },
          {
            "pt": "permeabilidade",
            "en": "permeability; openness (to ideas)",
            "ex": "A permeabilidade dessa organização às inovações é notável.",
            "exEn": "This organization's openness to innovations is remarkable."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Se ele chega amanhã, eu o vejo.",
            "correct": "Se ele chegar amanhã, eu o verei. (ou: Se ele chega amanhã, eu o vejo — apenas em narrativa informal)",
            "note": "English speakers often forget the subjunctive with 'if' clauses. In formal Portuguese, use subjunctive for hypothetical conditions; indicative is only for habitual/factual conditions."
          },
          {
            "wrong": "Ele deixou de trabalhar porque estava cansado.",
            "correct": "Ele parou de trabalhar porque estava cansado. (ou: Deixou de trabalhar se o contexto exigir 'ceased as a habit')",
            "note": "'Deixar de' means 'to stop (doing something habitually)' or 'to fail to'; use 'parar de' for 'to stop (an action)'. The nuance matters at C1."
          },
          {
            "wrong": "Não obstante de suas objeções, continuamos.",
            "correct": "Não obstante suas objeções, continuamos. (sem preposição)",
            "note": "'Não obstante' is a preposition and takes the noun directly without 'de'. This is a common mistake because learners overgeneralize prepositions."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete with the most appropriate word or phrase that conveys the intended nuance.",
            "items": [
              {
                "q": "A proposta foi ___ pelo conselho, resultando em melhorias significativas.",
                "ans": "matizada"
              },
              {
                "q": "Seus argumentos foram ___ de dados empíricos robustos.",
                "ans": "consubstanciados"
              },
              {
                "q": "O texto, ___ de referências clássicas e contemporâneas, oferece uma visão abrangente.",
                "ans": "entremeado"
              },
              {
                "q": "Conseguimos ___ as mudanças futuras a partir dos indicadores atuais.",
                "ans": "vislumbrar"
              },
              {
                "q": "A ___ dessa instituição às novas metodologias é fundamental para sua relevância.",
                "ans": "permeabilidade"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the option that best completes the sentence with appropriate register and precision for C1 level.",
            "items": [
              {
                "q": "Embora o relatório apresente dados sólidos, é preciso ___ as conclusões para não cair em determinismo.",
                "opts": [
                  "matizar",
                  "simplificar",
                  "ignorar",
                  "repetir"
                ],
                "ans": 0
              },
              {
                "q": "A importância da leitura crítica ___ todo o currículo desta universidade.",
                "opts": [
                  "permeia",
                  "controla",
                  "limita",
                  "segue"
                ],
                "ans": 0
              },
              {
                "q": "Seus escritos foram ___ de ironia, o que gerou interpretações conflitantes.",
                "opts": [
                  "privados",
                  "entremeados",
                  "desprovidos",
                  "carentes"
                ],
                "ans": 1
              },
              {
                "q": "A pesquisa conseguiu ___ as tendências que emergirão nos próximos cinco anos.",
                "opts": [
                  "ignorar",
                  "negar",
                  "vislumbrar",
                  "descartar"
                ],
                "ans": 2
              },
              {
                "q": "Os dados ___ a hipótese que havia sido proposta inicialmente.",
                "opts": [
                  "contradizem",
                  "consubstanciam",
                  "refutam",
                  "questionam"
                ],
                "ans": 1
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the sentence into Brazilian Portuguese, paying attention to register and nuance at C1 level.",
            "items": [
              {
                "q": "Rather than memorizing rules, you should develop an intuition for when subjunctive feels necessary.",
                "ans": "Em vez de memorizar regras, você deveria desenvolver uma intuição para quando o subjuntivo se faz necessário."
              },
              {
                "q": "His argument, interwoven with personal anecdotes and theoretical frameworks, resonated deeply with the audience.",
                "ans": "Seu argumento, entremeado de anedotas pessoais e marcos teóricos, ressoou profundamente com o público."
              },
              {
                "q": "We can foresee certain challenges, but only if we remain open to revising our initial assumptions.",
                "ans": "Conseguimos vislumbrar certos desafios, mas apenas se permanecermos abertos à revisão de nossas suposições iniciais."
              },
              {
                "q": "The findings substantiate our claim that institutional permeability drives innovation.",
                "ans": "Os achados consubstanciam nossa afirmação de que a permeabilidade institucional impulsiona a inovação."
              },
              {
                "q": "To nuance your position without contradicting yourself requires rhetorical skill and intellectual honesty.",
                "ans": "Matizar sua posição sem se contradizer exige habilidade retórica e honestidade intelectual."
              }
            ]
          }
        ],
        "teacherTip": "At C1, grammar is a tool for precision and effect, not an end in itself. Encourage students to ask 'Why would I choose this structure?' rather than 'What does the rule say?'—this shift in thinking is what separates advanced learners from merely accurate ones. Use authentic texts where native speakers play with or subtly bend rules for communicative impact."
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
              "pt": "Quando chegou à festa, todos já saíram. = Quando chegou à festa, todos já tinham saído.",
              "en": "When he arrived at the party, everyone had already left. (literary pluperfect vs. compound form)"
            },
            {
              "pt": "Dar-lhe-ei o livro amanhã. = Vou lhe dar o livro amanhã.",
              "en": "I will give him the book tomorrow. (mesoclisis in future vs. periphrastic future)"
            },
            {
              "pt": "Se o soubéssemos antes, tê-lo-íamos ajudado. = Se soubéssemos antes, o teríamos ajudado.",
              "en": "If we had known beforehand, we would have helped him. (literary mesoclisis vs. standard form)"
            },
            {
              "pt": "Havia dormido profundamente quando o chamaram. = Tinha dormido profundamente quando o chamaram.",
              "en": "He had slept deeply when they called him. (archaic pluperfect vs. standard compound)"
            },
            {
              "pt": "Prometi-lhe que voltaria. = Prometi que lhe daria uma resposta.",
              "en": "I promised him I would return. (mesoclisis with future vs. standard word order)"
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
            "pt": "ousadia",
            "en": "boldness, audacity",
            "ex": "A ousadia do autor em usar o pretérito mais-que-perfeito simples impressionou os críticos.",
            "exEn": "The author's boldness in using the literary pluperfect impressed the critics."
          },
          {
            "pt": "arcaísmo",
            "en": "archaism",
            "ex": "A mesóclise é considerada um arcaísmo na prosa moderna brasileira.",
            "exEn": "Mesoclisis is considered an archaism in modern Brazilian prose."
          },
          {
            "pt": "nuance",
            "en": "nuance, subtle distinction",
            "ex": "A nuance entre 'tinha saído' e 'saíra' é fundamental para escritores refinados.",
            "exEn": "The nuance between 'tinha saído' and 'saíra' is fundamental for refined writers."
          },
          {
            "pt": "eloquência",
            "en": "eloquence",
            "ex": "A eloquência da linguagem literária exige domínio das formas antigas.",
            "exEn": "The eloquence of literary language requires mastery of archaic forms."
          },
          {
            "pt": "subtileza",
            "en": "subtlety",
            "ex": "A subtileza da inversão do pronome átono mostra sofisticação linguística.",
            "exEn": "The subtlety of inverting the unstressed pronoun shows linguistic sophistication."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Eu tinha saído quando ele chegou.",
            "correct": "Eu saíra quando ele chegou. (in literary context)",
            "note": "English speakers overuse the compound pluperfect (tinha saído) when literary texts call for the simple pluperfect (saíra) for stylistic elegance."
          },
          {
            "wrong": "Vou lhe dar este presente amanhã.",
            "correct": "Dar-lhe-ei este presente amanhã. (in literary/formal contexts)",
            "note": "Mesoclisis is avoided in speech but expected in high-register writing; learners often use periphrastic future instead."
          },
          {
            "wrong": "Se ele tivesse vindo, eu teria lhe ajudado.",
            "correct": "Se ele viesse, eu o ajudaria. or Se ele houvesse vindo, eu lho ajudaria. (literary)",
            "note": "Students confuse conditional sequences with archaic subjunctive forms; tê-lo-ia is correct mesoclisis, not 'teria lhe'."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete with the correct literary pluperfect or mesoclisis form.",
            "items": [
              {
                "q": "Quando o juiz entrou, todos já ___ (sair) da sala.",
                "ans": "saíram or tinham saído (saíram is more literary)"
              },
              {
                "q": "Eu ___ (dar-lhe) uma oportunidade, mas ele a desperdiçou.",
                "ans": "dar-lhe-ia or tê-lo-ia dado"
              },
              {
                "q": "Se nós o ___ (conhecer) antes, tudo seria diferente.",
                "ans": "houvéssemos conhecido or tivéssemos conhecido"
              },
              {
                "q": "O manuscrito ___ (desaparecer) há séculos; ninguém o encontrou.",
                "ans": "desaparecera or tinha desaparecido"
              },
              {
                "q": "Prometo-___ que ___ (voltar) em breve.",
                "ans": "lhe; voltarei or lhe; vou voltar (mesoclisis: prometo-lhe que voltarei)"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the most appropriate literary or formal option.",
            "items": [
              {
                "q": "Em contextos literários, qual forma é mais elegante? 'Ele tinha partido' ou 'Ele partira'?",
                "opts": [
                  "Ele tinha partido",
                  "Ele partira",
                  "Ambas são igualmente formais",
                  "Nenhuma delas; use 'Ele vai partir'"
                ],
                "ans": 1
              },
              {
                "q": "Qual frase usa mesóclise corretamente?",
                "opts": [
                  "Dar-te-ei a resposta.",
                  "Darei-te a resposta.",
                  "Vou te dar a resposta.",
                  "Te darei a resposta."
                ],
                "ans": 0
              },
              {
                "q": "Escolha a versão mais apropriada para um romance: 'Quando ela acordou, ele já saiu' ou 'Quando ela acordou, ele já saíra'?",
                "opts": [
                  "Quando ela acordou, ele já saiu",
                  "Quando ela acordou, ele já saíra",
                  "Quando ela acordou, ele já tinha saído",
                  "Todas são igualmente corretas em ficção"
                ],
                "ans": 1
              },
              {
                "q": "Em qual contexto a mesóclise é mais apropriada?",
                "opts": [
                  "Conversa casual com amigos",
                  "Texto literário ou formal-jurídico",
                  "Mensagem de texto",
                  "Apresentação informal"
                ],
                "ans": 1
              },
              {
                "q": "Complete: 'Se eu o soubesse, ...' (ajudá-lo)",
                "opts": [
                  "o ajudaria",
                  "ajudá-lo-ia",
                  "vou ajudá-lo",
                  "o ajudo"
                ],
                "ans": 1
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate into literary Brazilian Portuguese using pluperfect or mesoclisis where appropriate.",
            "items": [
              {
                "q": "By the time we arrived, they had already left.",
                "ans": "Quando chegamos, eles já saíram. or Quando chegamos, eles já tinham saído. (or more literary: Quando chegamos, eles já se haviam retirado.)"
              },
              {
                "q": "I will give you the answer tomorrow.",
                "ans": "Dar-te-ei a resposta amanhã. (mesoclisis) or Vou te dar a resposta amanhã. (standard)"
              },
              {
                "q": "If I had known, I would have told him.",
                "ans": "Se eu o houvesse sabido, tê-lo-ia dito. or Se eu tivesse sabido, teria lhe dito."
              },
              {
                "q": "The letter had arrived weeks before.",
                "ans": "A carta chegara semanas antes. or A carta tinha chegado semanas antes."
              },
              {
                "q": "We promise you that we will help.",
                "ans": "Prometemos-lhe que ajudaremos. (mesoclisis) or Prometemos que lhe ajudaremos. (standard)"
              }
            ]
          }
        ],
        "teacherTip": "Emphasize that the literary pluperfect (saíra) and mesoclisis (dar-lhe-ei) are markers of sophisticated written Portuguese, rarely used in speech but essential for understanding and producing high-register texts, academic writing, and classic literature. Have students identify these structures in authentic literary excerpts to build recognition before production."
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
              "pt": "Um jovem de classe alta na zona sul de São Paulo pode usar formas mais coloquiais dentro de seu grupo para manter coesão social, mesmo tendo acesso à norma padrão.",
              "en": "A young person from an upper-class family in São Paulo's south zone may use more colloquial forms within their peer group to maintain social cohesion, even though they have access to the standard norm."
            },
            {
              "pt": "O emprego da concordância verbal não-padrão ('a gente vamo') funciona como marcador de lealdade grupal entre falantes de comunidades periféricas.",
              "en": "The use of non-standard verbal agreement ('a gente vamo') functions as a marker of group loyalty among speakers in peripheral communities."
            },
            {
              "pt": "Profissionais liberais frequentemente alternam entre português normativo em contextos formais e variantes locais em situações informais, sinalizando flexibilidade social.",
              "en": "Liberal professionals frequently alternate between normative Portuguese in formal contexts and local variants in informal situations, signaling social flexibility."
            },
            {
              "pt": "A presença de nasalização e rotacismo em um dialeto funciona como índice de origem regional, carregando significado social sobre pertencimento comunitário.",
              "en": "The presence of nasalization and rhotacism in a dialect functions as an index of regional origin, carrying social meaning about community belonging."
            },
            {
              "pt": "Migrantes que adotam características fonológicas da região receptora demonstram como a variação linguística negocia identidades múltiplas e inserção social.",
              "en": "Migrants who adopt phonological characteristics of the receiving region demonstrate how linguistic variation negotiates multiple identities and social insertion."
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
            "pt": "marcador sociolinguístico",
            "en": "sociolinguistic marker",
            "ex": "O uso do 'r' caipira é um marcador sociolinguístico importante na região de São Paulo.",
            "exEn": "The use of the caipira 'r' is an important sociolinguistic marker in the São Paulo region."
          },
          {
            "pt": "estigmatização linguística",
            "en": "linguistic stigmatization",
            "ex": "A estigmatização linguística do dialeto nordestino persiste apesar dos avanços na conscientização social.",
            "exEn": "The linguistic stigmatization of the northeastern dialect persists despite advances in social awareness."
          },
          {
            "pt": "prestígio encoberto",
            "en": "covert prestige",
            "ex": "Alguns falantes mantêm a variante não-padrão por prestígio encoberto dentro de seu grupo social.",
            "exEn": "Some speakers maintain the non-standard variant due to covert prestige within their social group."
          },
          {
            "pt": "identidade linguística",
            "en": "linguistic identity",
            "ex": "A identidade linguística de um falante reflete suas experiências sociais e culturais.",
            "exEn": "A speaker's linguistic identity reflects their social and cultural experiences."
          },
          {
            "pt": "variação dialetal",
            "en": "dialectal variation",
            "ex": "A variação dialetal entre Rio de Janeiro e Salvador demonstra como a geografia molda a linguagem.",
            "exEn": "The dialectal variation between Rio de Janeiro and Salvador demonstrates how geography shapes language."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "A variação linguística é sempre um erro gramatical que deve ser corrigido.",
            "correct": "A variação linguística é um fenômeno socialmente significativo; nem toda variação representa erro, mas sim escolhas ligadas à identidade social.",
            "note": "English speakers often conflate variation with error. At C2, students must understand that variation carries social meaning and is not inherently incorrect."
          },
          {
            "wrong": "Todos os falantes de uma comunidade usam as mesmas formas linguísticas.",
            "correct": "Mesmo dentro de uma mesma comunidade, há estratificação social que resulta em variação sistemática entre grupos de falantes.",
            "note": "This oversimplification ignores intersectionality and the complex social dynamics that create variation within seemingly homogeneous speech communities."
          },
          {
            "wrong": "O prestigio linguístico é determinado apenas pela forma mais correta gramaticalmente.",
            "correct": "O prestígio linguístico é socialmente construído e pode ser tanto manifesto (baseado em normas escolares) quanto encoberto (baseado na lealdade grupal).",
            "note": "C2 students must move beyond prescriptive notions to understand that prestige is multifaceted and culturally contingent, not objectively determined."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete the sentences with appropriate sociolinguistic vocabulary.",
            "items": [
              {
                "q": "A escolha entre 'você' e 'tu' não é aleatória; é um ___ que revela relações de poder e solidariedade entre falantes.",
                "ans": "marcador sociolinguístico"
              },
              {
                "q": "Apesar da ___ do sotaque carioca em contextos de mobilidade social, muitos cariocas mantêm suas características fonológicas como forma de afirmação identitária.",
                "ans": "estigmatização linguística"
              },
              {
                "q": "Linguistas observam ___ quando falantes de classe operária defendem suas variantes não-padrão como mais autênticas ou legítimas.",
                "ans": "prestígio encoberto"
              },
              {
                "q": "A ___ de um indivíduo é formada pelas experiências acumuladas em diferentes comunidades de prática ao longo de sua vida.",
                "ans": "identidade linguística"
              },
              {
                "q": "A ___ entre o português de Recife e o de Porto Alegre ilustra como fatores históricos e geográficos moldam sistemas linguísticos distintos.",
                "ans": "variação dialetal"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the option that best completes the sentence according to sociolinguistic principles.",
            "items": [
              {
                "q": "Quando um falante alterna entre variantes padrão e não-padrão dependendo do contexto social, ele está demonstrando:",
                "opts": [
                  "Falta de competência linguística",
                  "Competência sociolinguística e negociação de identidades múltiplas",
                  "Incapacidade de aprender português corretamente",
                  "Interferência de línguas estrangeiras"
                ],
                "ans": 1
              },
              {
                "q": "A estigmatização de certas variantes linguísticas é fundamentalmente:",
                "opts": [
                  "Uma questão de gramaticalidade objetiva",
                  "Um fenômeno biológico relacionado ao desenvolvimento neurológico",
                  "Uma construção social que reflete hierarquias de poder e prestígio social",
                  "Uma característica inerente ao português brasileiro"
                ],
                "ans": 2
              },
              {
                "q": "Prestígio encoberto refere-se a:",
                "opts": [
                  "Variantes que recebem reconhecimento oficial de instituições educacionais",
                  "Formas linguísticas valorizadas informalmente dentro de grupos específicos, mesmo se estigmatizadas publicamente",
                  "Características que não podem ser percebidas auditivamente",
                  "Erros gramaticais que passam despercebidos"
                ],
                "ans": 1
              },
              {
                "q": "A identidade linguística de um falante é melhor entendida como:",
                "opts": [
                  "Fixa e determinada por seu dialeto nativo",
                  "Dinâmica e negociada através de práticas linguísticas em diferentes contextos sociais",
                  "Irrelevante para a comunicação efetiva",
                  "Determinada exclusivamente pelo nível educacional"
                ],
                "ans": 1
              },
              {
                "q": "Como a variação dialetal funciona como significado social?",
                "opts": [
                  "Indica falta de padronização na linguagem",
                  "Sinaliza origem geográfica, pertencimento comunitário e posições identitárias do falante",
                  "Prova que certas regiões falam melhor português que outras",
                  "É um fenômeno aleatório sem padrão ou organização"
                ],
                "ans": 1
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the sentences into Brazilian Portuguese, paying attention to sociolinguistic concepts.",
            "items": [
              {
                "q": "The speaker's choice of linguistic variants reflects their negotiation of multiple social identities.",
                "ans": "A escolha de variantes linguísticas do falante reflete sua negociação de múltiplas identidades sociais."
              },
              {
                "q": "Linguistic stigmatization often reinforces social inequalities that already exist in the community.",
                "ans": "A estigmatização linguística frequentemente reforça desigualdades sociais que já existem na comunidade."
              },
              {
                "q": "Speakers maintain non-standard variants because they carry covert prestige within their peer groups.",
                "ans": "Os falantes mantêm variantes não-padrão porque carregam prestígio encoberto dentro de seus grupos de pares."
              },
              {
                "q": "Dialectal variation demonstrates that there is no single correct way to speak Portuguese.",
                "ans": "A variação dialetal demonstra que não existe uma única forma correta de falar português."
              },
              {
                "q": "Code-switching between varieties signals the speaker's awareness of social norms and contextual appropriateness.",
                "ans": "A alternância de códigos entre variedades sinaliza a consciência do falante sobre normas sociais e adequação contextual."
              }
            ]
          }
        ],
        "teacherTip": "At C2 level, emphasize that language variation is not a deficiency but a sophisticated social resource. Encourage students to analyze their own linguistic choices as expressions of identity and social positioning, moving them from prescriptive thinking toward descriptive sociolinguistic awareness."
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
              "pt": "Dominar a língua significa saber quando quebrar as regras com intencionalidade artística.",
              "en": "Mastering the language means knowing when to break the rules with artistic intentionality."
            },
            {
              "pt": "O escritor C2 não segue fórmulas; ele as reinventa através da liberdade consciente.",
              "en": "The C2 writer doesn't follow formulas; he reinvents them through conscious freedom."
            },
            {
              "pt": "A verdadeira maestria linguística revela-se na capacidade de criar significados múltiplos através de uma única expressão.",
              "en": "True linguistic mastery reveals itself in the ability to create multiple meanings through a single expression."
            },
            {
              "pt": "Cada palavra torna-se instrumento de nuance quando o falante atinge o domínio total da língua.",
              "en": "Every word becomes an instrument of nuance when the speaker reaches total command of the language."
            },
            {
              "pt": "A arte da língua portuguesa transcende gramática e abraça a poesia implícita em cada construção possível.",
              "en": "The art of the Portuguese language transcends grammar and embraces the poetry implicit in every possible construction."
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
            "pt": "matiz",
            "en": "nuance; shade",
            "ex": "A poesia de Clarice Lispector explora cada matiz da consciência humana.",
            "exEn": "Clarice Lispector's poetry explores every nuance of human consciousness."
          },
          {
            "pt": "reverberação",
            "en": "reverberation; resonance",
            "ex": "As palavras do autor têm uma reverberação profunda na alma do leitor.",
            "exEn": "The author's words have a profound resonance in the reader's soul."
          },
          {
            "pt": "subversão",
            "en": "subversion",
            "ex": "A subversão da linguagem convencional é marca registrada do modernismo brasileiro.",
            "exEn": "The subversion of conventional language is a hallmark of Brazilian modernism."
          },
          {
            "pt": "requinte",
            "en": "refinement; sophistication",
            "ex": "O requinte estilístico de Fernando Pessoa não pode ser ignorado.",
            "exEn": "Fernando Pessoa's stylistic refinement cannot be ignored."
          },
          {
            "pt": "imbricação",
            "en": "interweaving; overlapping",
            "ex": "A imbricação entre forma e conteúdo cria uma obra de arte literária.",
            "exEn": "The interweaving of form and content creates a work of literary art."
          }
        ],
        "commonMistakes": [
          {
            "wrong": "Eu tenho dominado completamente a língua portuguesa.",
            "correct": "Eu domino completamente a língua portuguesa. / Tenho dominado a língua portuguesa ao longo dos anos.",
            "note": "English speakers often overuse present perfect; in Portuguese, simple present is more natural for permanent states at C2 level."
          },
          {
            "wrong": "A reverberação que as palavras fazem no leitor é importante.",
            "correct": "A reverberação que as palavras têm no leitor é importante. / A reverberação que as palavras causam no leitor é importante.",
            "note": "Using 'fazer' instead of 'ter' or 'causar' in this context sounds awkward; choose verbs that express resonance more elegantly."
          },
          {
            "wrong": "A subversão de a língua tradicional é um ato de criatividade.",
            "correct": "A subversão da língua tradicional é um ato de criatividade.",
            "note": "English speakers sometimes incorrectly apply 'de + o/a' instead of using the contracted form 'da/do'; at C2, contractions must be automatic."
          }
        ],
        "extraExercises": [
          {
            "type": "Fill in the blank",
            "instruction": "Complete with the correct word that conveys artistic mastery.",
            "items": [
              {
                "q": "O ___ estilístico de Machado de Assis transcende as convenções do seu tempo.",
                "ans": "requinte"
              },
              {
                "q": "A ___ entre forma poética e significado filosófico caracteriza a obra de Cruz e Sousa.",
                "ans": "imbricação"
              },
              {
                "q": "Cada ___ da narrativa de Grande Sertão: Veredas revela uma camada diferente de complexidade.",
                "ans": "matiz"
              },
              {
                "q": "A ___ das ideias modernistas no Brasil transformou a literatura de forma irreversível.",
                "ans": "reverberação"
              },
              {
                "q": "A ___ da gramática normativa foi necessária para que a literatura brasileira encontrasse sua própria voz.",
                "ans": "subversão"
              }
            ]
          },
          {
            "type": "Multiple choice",
            "instruction": "Choose the option that best expresses C2-level linguistic sophistication.",
            "items": [
              {
                "q": "Qual frase melhor exemplifica o uso artístico da língua?",
                "opts": [
                  "As palavras são bonitas.",
                  "A palavra, em sua essência polissêmica, constitui o espaço onde a ambiguidade se torna virtude criadora.",
                  "As palavras têm muitos significados.",
                  "Usamos palavras para falar."
                ],
                "ans": 1
              },
              {
                "q": "Complete: 'A maestria linguística manifesta-se não na ___ das regras, mas na ___.'",
                "opts": [
                  "violação / sua negação",
                  "submissão / sua reinvenção consciente",
                  "obediência / sua transcendência deliberada",
                  "aceitação / sua rejeição total"
                ],
                "ans": 2
              },
              {
                "q": "Qual construção melhor reflete pensamento C2 sobre domínio da língua?",
                "opts": [
                  "Eu sou fluente em português.",
                  "Meu domínio do português permite-me transitar entre registros com intencionalidade estética.",
                  "Eu falo português muito bem.",
                  "Eu tenho aprendido português há muitos anos."
                ],
                "ans": 1
              },
              {
                "q": "O que distingue um falante C2 de um falante C1?",
                "opts": [
                  "Ele não comete erros.",
                  "Ele fala mais rápido.",
                  "Ele manipula a língua como instrumento de expressão artística, consciente de cada desvio e sua função.",
                  "Ele usa vocabulário mais difícil."
                ],
                "ans": 2
              },
              {
                "q": "Qual frase exemplifica melhor a 'liberdade dentro da maestria'?",
                "opts": [
                  "Você pode fazer o que quiser com a língua.",
                  "Tudo é permitido em português.",
                  "Dominar as estruturas da língua permite escolhas estéticas deliberadas que enriquecem a expressão.",
                  "Não há regras reais em português."
                ],
                "ans": 2
              }
            ]
          },
          {
            "type": "Translation",
            "instruction": "Translate the sentence into Brazilian Portuguese, paying attention to artistic nuance.",
            "items": [
              {
                "q": "The mastery of a language resides in knowing which rules to honor and which to artfully subvert.",
                "ans": "A maestria de uma língua reside em saber quais regras honrar e quais subverter com arte."
              },
              {
                "q": "Every word carries layers of meaning that only a C2 speaker can fully appreciate and manipulate.",
                "ans": "Cada palavra carrega camadas de significado que apenas um falante C2 pode plenamente apreciar e manipular."
              },
              {
                "q": "The reverberation of Clarice Lispector's prose continues to challenge readers decades after her death.",
                "ans": "A reverberação da prosa de Clarice Lispector continua desafiando leitores décadas após sua morte."
              },
              {
                "q": "True linguistic freedom emerges only after complete mastery of the system being transcended.",
                "ans": "A verdadeira liberdade linguística emerge apenas após o domínio completo do sistema sendo transcendido."
              },
              {
                "q": "At the C2 level, one doesn't simply use Portuguese—one conducts it as a symphony of nuance.",
                "ans": "No nível C2, não se usa simplesmente o português—conduz-se como uma sinfonia de matizes."
              }
            ]
          }
        ],
        "teacherTip": "At C2, emphasize that mastery is not about perfection but about conscious control and intentional deviation. Encourage students to study how master writers like Clarice Lispector, Guimarães Rosa, and Fernando Pessoa deliberately break rules to create artistic effect—this is the ultimate expression of language as art."
      }
    ]
  }
];
