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

## Deploy

Vercel, conectado ao branch `main`. Push em `main` publica em produção. As
variáveis de ambiente são configuradas no dashboard da Vercel, não neste repo.
