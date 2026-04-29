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
  grammar: Grammar;
  dialogue: Dialogue;
  exercises: Exercise[];
  culture: Culture;
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
      }
    ]
  }
];
