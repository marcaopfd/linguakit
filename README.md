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
| Portal do aluno | `/learn/[studentId]/...` | link direto, sem senha |
| Teste de nivelamento | `/test?lang=pt\|en` | público |

O aluno recebe um link `/learn/<id>`. O id é um cuid não adivinhável e funciona
como a credencial dele — trate o link como algo privado.

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
```

> O `DATABASE_URL` local aponta para o mesmo banco de produção. Escrever no app
> rodando local altera dados reais de alunos.

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

## Scripts de currículo

`scripts/expand-curriculum.mjs` e `scripts/generate-en-curriculum.mjs` geram
conteúdo com a API da Anthropic e gravam o resultado direto nos arquivos de
currículo. São ferramentas de autoria, rodadas à mão — o app em produção não
chama nenhuma API de IA. Precisam de `ANTHROPIC_API_KEY` no `.env`.

## Deploy

Vercel, conectado ao branch `main`. Push em `main` publica em produção. As
variáveis de ambiente são configuradas no dashboard da Vercel, não neste repo.
