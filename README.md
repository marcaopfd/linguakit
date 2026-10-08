# LinguaKit

Plataforma de ensino de idiomas com dois cursos espelhados:

- 🇧🇷 **Português para falantes de inglês** — `/pt`
- 🇺🇸 **Inglês para falantes de português** — `/en`

Cada curso tem 6 módulos (A1 → C2) e 50 units, com vocabulário, gramática,
diálogo, exercícios e nota cultural. O currículo vive versionado em
`lib/curriculum.ts` e `lib/curriculum-en.ts`.

## As três superfícies

| Superfície | Rotas | Acesso |
| --- | --- | --- |
| Painel do professor | `/`, `/pt`, `/en`, `/module/[id]`, `/lesson/[mod]/[unit]`, `/students` | senha (`TEACHER_PASSWORD`) |
| Portal do aluno | `/learn/[studentId]/...` | conta própria **ou** link direto |
| Cadastro / entrada do aluno | `/cadastro`, `/entrar` | público |
| Teste de nivelamento | `/test?lang=pt\|en` | público |

Há dois caminhos para o aluno, e os dois continuam valendo:

1. **Conta própria** — ele se cadastra em `/cadastro` (nome, e-mail, senha,
   curso e opt-in de newsletter) e depois entra por `/entrar` de qualquer
   aparelho. A senha é guardada como hash scrypt e a sessão é um cookie
   `lk_student` assinado com HMAC, sem tabela de sessões.
2. **Link direto** — o professor compartilha `/learn/<id>`. O id é um cuid não
   adivinhável e funciona como a credencial; trate o link como privado. É como
   funcionam os alunos criados pelo teste de nivelamento, que não têm senha.

O curso do aluno vem de `Student.course` (escolhido no cadastro) e, para quem
veio pelo teste, de `TestResult.course` — sempre leia com
`student.course ?? student.testResult?.course`.

### Idioma da interface

A navegação da lição e do módulo aparece na língua que o aluno **já sabe**, que é
o oposto da que ele está aprendendo: o brasileiro do curso de inglês lê
"Vocabulário / Gramática / Conferir", e o anglófono do curso de português lê
"Vocabulary / Grammar / Check".

`uiStrings(lang)` em `lib/ui-strings.ts` deriva isso do mesmo `lang` já usado
para a síntese de voz (`pt-BR` ensina português → interface em inglês), então
não há um segundo prop para manter em sincronia. O conteúdo em si nunca é
traduzido — só a navegação.

### Áudio

A lição fala o idioma-alvo através da Web Speech API do navegador
(`lib/speak.ts`): sem servidor, sem chave, sem custo por uso. Há um ▶ em cada
palavra e frase do vocabulário, em cada exemplo de gramática e em cada linha do
diálogo, além de um "Ouvir diálogo" que toca a conversa inteira em sequência
destacando a linha falada, com um modo devagar.

Em ambos os currículos o campo `pt` guarda o idioma-alvo, então um único prop
`lang` (`pt-BR` ou `en-US`) cobre tudo.

Dois cuidados que o código já trata:

- **Vozes de brincadeira.** A Apple distribui vozes como Boing e Bubbles na
  mesma lista das reais, algumas marcadas `en-US`. Escolher só por idioma pode
  cair numa delas, então há uma lista de exclusão por nome e uma de preferência
  (Luciana para pt-BR, Samantha para en-US).
- **Texto que não se lê em voz alta.** `firstVariant()` fala só a primeira
  opção de entradas como "olá / oi", e `normaliseForSpeech()` remove glosas
  entre parênteses como em "book (a ticket)".

### Gravar a própria voz

Cada linha do diálogo tem, ao lado do ▶ do modelo, um 🎤 para o aluno gravar a
si mesmo e comparar — o drill de *shadowing*. Sem nota e sem julgamento: ele
mesmo ouve a diferença.

**A gravação nunca sai do navegador.** Vive como blob URL enquanto a lição está
aberta e é revogada ao ser substituída ou ao sair da tela. Nada é enviado e nada
é guardado — e a interface diz isso ao aluno.

Dois cuidados no `components/RecordButton.tsx`:

- **O microfone é liberado** (`track.stop()`) ao parar de gravar, senão o
  navegador fica indicando captura indefinidamente.
- **`getUserMedia` não rejeita quando o prompt de permissão é ignorado** — ele
  simplesmente nunca resolve. Há um limite de 20s que devolve o botão ao estado
  normal com uma mensagem; e se a permissão chegar depois disso, o stream é
  fechado na hora em vez de abrir o microfone sem o aluno esperar.

A qualidade depende do aparelho do aluno — macOS e iOS têm vozes boas, Android
usa o TTS do Google, Windows antigo é pior. Se um dia isso incomodar, o caminho
é gerar os áudios uma vez e versioná-los, como foi feito com os exercícios.

### Senha esquecida

Não há fluxo por e-mail. No painel de alunos, cada aluno com conta tem o botão
**Resetar senha**: ele gera uma senha temporária (`lk-xxxx-xxxx`, sem caracteres
ambíguos), grava o hash e devolve o texto puro **uma única vez** na resposta —
nada é armazenado em claro. Você repassa ao aluno pelo canal que quiser.

Como você conhece seus alunos pessoalmente, a verificação de identidade é sua.
Alunos sem conta (os que vieram do teste) não têm o botão: eles acessam pelo
link e não têm senha para resetar.

> Ressalva conhecida: o reset troca a senha, mas não encerra sessões já abertas
> em outros aparelhos — o cookie é assinado sobre o id, não sobre a senha. Serve
> para "esqueci minha senha", não para expulsar alguém de uma conta invadida.

### Newsletter

`Student.newsletter` só fica `true` com o checkbox marcado no cadastro, e
`newsletterAt` guarda o momento do consentimento. O painel de alunos mostra
quantos aceitaram e tem um botão para copiar a lista de e-mails. Não existe
envio automatizado — a lista é para colar na ferramenta de e-mail que você usar.

## Rodando local

```bash
npm install
npm run dev
```

Precisa de um `.env` na raiz:

```
DATABASE_URL=      # Postgres (Neon), string com pooler
DIRECT_URL=        # Postgres direto, usado pelas migrations
TEACHER_PASSWORD=  # senha do painel do professor
SESSION_SECRET=    # string aleatória longa; é o valor do cookie de sessão
ANTHROPIC_API_KEY= # só para os scripts de currículo; o app não usa
```

O `.env` aponta para o branch **`dev`** do Neon — uma cópia isolada de produção.
As URLs de produção ficam comentadas no mesmo arquivo; só descomente se
precisar inspecionar dados reais, e volte depois.

## Autenticação

`proxy.ts` faz a checagem otimista na borda e redireciona para `/login`. Como o
Next é explícito que proxy não é solução de autorização, cada rota sensível
refaz a checagem com `requireTeacher` de `lib/auth.ts`:

| Rota | Método | Quem |
| --- | --- | --- |
| `/api/results` | `GET` | professor |
| `/api/results` | `POST` | público (envio do teste) |
| `/api/students/[id]` | `GET` | público (portal do aluno) |
| `/api/students/[id]` | `DELETE` | professor |
| `/api/student/signup`, `/login`, `/logout`, `/me` | `POST` / `GET` | público |
| `/api/students/[id]/reset-password` | `POST` | professor |
| `/api/logout` | `POST` | professor |
| `/api/progress` | `GET` / `POST` | público (portal do aluno) |
| `/api/pdf/{pt,en}/[mod]/[unit]` | `GET` | público (aluno baixa a apostila) |

## O que o aluno respondeu

Cada item de exercício respondido vira uma linha em `ExerciseAttempt`, com a
pergunta, o que o aluno marcou, o que era esperado e se acertou. A tela
`/students/[id]` resume isso em "Pontos fracos": acerto geral, acerto por tipo
de exercício e a lista dos erros com a unit de origem — é o material para
preparar a próxima aula.

Só a **primeira** resposta de cada item é guardada. A lição revela a resposta
certa assim que o aluno responde, então uma segunda tentativa registraria ter
lido a resposta, não sabê-la. Isso também limita o crescimento a uma linha por
item por aluno.

A gravação só acontece quando há `studentId` — o professor navegando pelo curso
não gera registro.

## Revisão de erros e atividade

O que o aluno responde serve a duas telas:

- **"Seus erros"** no portal do aluno (`/learn/[studentId]`) — acerto geral e a
  lista do que ele errou, com a resposta dele e a certa. Lê
  `GET /api/student/attempts?studentId=`, que devolve só os campos dessa tela.
- **"Pontos fracos"** no painel do professor (`/students/[id]`) — o mesmo dado
  com acerto por tipo de exercício. Lê `GET /api/attempts`, que é teacher-only
  e existe separada justamente para poder crescer sem afrouxar a rota do aluno.

Cada card de aluno em `/students` traz também **há quanto tempo ele estudou**,
calculado em `lib/last-active.ts` a partir do registro mais recente de
`StudentLesson` ou `ExerciseAttempt` — verde até 2 dias, âmbar até 7, vermelho
depois. É o sinal mais acionável para saber quem está esfriando.

## Progresso

O professor navegando pelo curso guarda progresso em `localStorage` — é um
rascunho pessoal. O portal do aluno lê e grava no banco (`StudentLesson`), então
o progresso acompanha o aluno entre dispositivos e dois alunos no mesmo
navegador não se misturam. A lógica está em `lib/use-progress.ts`.

## Banco

Prisma + Postgres no Neon. O Neon suspende a compute depois de um tempo ocioso,
então a primeira query após inatividade pode falhar enquanto ele acorda —
`withDb()` em `lib/db.ts` faz retry com backoff só nesses erros de conexão.

```bash
npx prisma migrate dev     # cria/aplica migration
npx prisma studio          # inspeciona os dados
```

O script de build roda `prisma migrate deploy` antes do `next build`, então
migrations pendentes são aplicadas em produção no deploy da Vercel. Depois de
mudar o schema, reinicie o `npm run dev` — o servidor mantém o Prisma Client
antigo em memória e falha com "Unknown argument" até reiniciar.

## Scripts de currículo

Ferramentas de autoria, rodadas à mão. O app em produção não chama nenhuma API
de IA — todo conteúdo é gerado aqui e commitado.

| Script | O que faz |
| --- | --- |
| `generate-en-curriculum.mjs` | Gera o currículo base do curso de inglês |
| `expand-curriculum.mjs` | Adiciona extras ao curso PT (`lib/curriculum.ts`) |
| `expand-curriculum-en.mjs` | Adiciona extras ao curso EN (`lib/curriculum-en.ts`) |

Os "extras" são `extraVocab`, `extendedExamples`, `commonMistakes`,
`extraExercises` e `teacherTip`. Os `extraExercises` são o que o botão
"More exercises" libera na tela da lição.

Cada script salva o progresso num cache JSON depois de cada unit, então dá para
interromper e retomar sem repagar o que já foi gerado. Escrevem um arquivo
`*-expanded.ts` para você revisar antes de sobrescrever o currículo:

```bash
node scripts/expand-curriculum-en.mjs
cp lib/curriculum-en-expanded.ts lib/curriculum-en.ts
```

## Por que as páginas são Server Components

Os currículos somam ~835 KB de JSON. Como as páginas eram `'use client'` e
importavam `MODULES` / `EN_MODULES` direto, o bundler mandava tudo para o
navegador: uma lição baixava o curso inteiro (374 KB ou 461 KB) para renderizar
uma unit de ~6 KB, e o dashboard carregava os dois cursos para desenhar nomes de
módulo e barras de progresso.

Agora cada `page.tsx` é Server Component: lê o currículo no servidor e passa
adiante só o que a tela usa.

| Tela | Recebe |
| --- | --- |
| Lição | a `Unit` e um `LessonContext` (label, nome, total de units) |
| Módulo | um `ModuleSummary` — metadados + título/sub/emoji/duração das units |
| Dashboard, `/pt`, `/en`, portal, detalhe do aluno | `ModuleSummary[]`, ~13 KB |

Os tipos ficam em `lib/curriculum-index.ts`. Importe deles **apenas tipos** em
componentes de cliente (`import type`), que somem na compilação; as funções
recebem os módulos por parâmetro em vez de importá-los, para que nada puxe os
arquivos grandes sem querer.

Telas que precisam de estado do cliente (localStorage, fetch) ficam num
`view.tsx` ao lado do `page.tsx`. As de aluno resolvem o curso lendo o
`Student` do Prisma no servidor, em vez de buscar pelo navegador.

**Se um componente de cliente voltar a importar `lib/curriculum*.ts`, os 835 KB
voltam para o bundle.** Para conferir depois de um build:

```bash
grep -l "Hello & Goodbye" .next/static/chunks/*.js
```

Nenhum resultado é o esperado.

## Testes

```bash
npm test          # uma passada
npm run test:watch
```

Vitest, sem banco e sem servidor — a suíte roda em menos de meio segundo, então
vale rodar antes de cada push.

Ela cobre de propósito só o que já quebrou ou pode vazar:

| Arquivo | O que protege |
| --- | --- |
| `tests/student-auth.test.ts` | hash de senha, e o token de sessão contra id trocado, assinatura forjada, validade esticada, expirado e segredo diferente |
| `tests/teacher-auth.test.ts` | `requireTeacher`, incluindo negar todo mundo quando `SESSION_SECRET` não está definido |
| `tests/route-guards.test.ts` | lê o próprio código-fonte (ver abaixo) |
| `tests/content-helpers.test.ts` | normalização do texto falado e o idioma da interface, que é fácil de inverter |

`route-guards` é diferente dos outros: em vez de executar as rotas, ele lê
`prisma/schema.prisma` e os arquivos de rota. Isso pega três classes de erro que
um teste unitário comum não pegaria:

1. **Tabela nova referenciando `Student` sem limpeza no DELETE.** O teste
   descobre sozinho quais modelos apontam para `Student` e exige que o handler
   remova cada um. As chaves estrangeiras são `RESTRICT`, então esquecer uma
   quebra a exclusão em produção — foi exatamente o que aconteceu com
   `ExerciseAttempt`.
2. **Handler teacher-only sem `requireTeacher`.** Como `/api/students`,
   `/api/results` e `/api/attempts` estão na allowlist do proxy, o proxy não
   protege a metade privada; cada handler precisa checar por conta.
3. **`include` em vez de `select` na rota pública de aluno.** `include` devolve
   toda coluna escalar, então um campo sensível novo vazaria sozinho.

Os três foram verificados reintroduzindo cada defeito e confirmando que a suíte
falha com uma mensagem que diz o que fazer.

## Deploy

Vercel, conectado ao branch `main`. Push em `main` publica em produção. As
variáveis de ambiente são configuradas no dashboard da Vercel, não neste repo.
