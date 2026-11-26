/**
 * Cópia de segurança do banco, em JSON.
 *
 * Por que isto existe: o Neon guarda apenas SEIS HORAS de histórico no plano
 * atual (`history_retention_seconds: 21600`). Seis horas é o bastante para
 * desfazer um erro que você percebeu na hora, e nada mais. Um `deleteMany`
 * errado numa sexta à noite, descoberto na segunda, é perda definitiva — e
 * com aluno pagante isso não é um susto, é o fim da confiança.
 *
 * Não é pg_dump: é a leitura das tabelas pelo Prisma. Para o tamanho deste
 * banco isso é suficiente, e tem a vantagem de rodar sem instalar nada.
 * O que ele NÃO guarda é o esquema — isso já está versionado em
 * prisma/migrations, que é onde deve estar.
 *
 *   node --env-file=.env scripts/backup.mjs
 *
 * Para copiar a produção, aponte DATABASE_URL para ela:
 *
 *   DATABASE_URL="postgres://…produção…" node scripts/backup.mjs
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { PrismaClient } from '@prisma/client'

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..')
const pasta = join(raiz, 'backups')

/**
 * A trava que importa.
 *
 * O arquivo gerado tem e-mail, hash de senha e tudo o que cada aluno
 * estudou. Commitar isso por acidente publica dado pessoal num repositório
 * para sempre — e `git` não esquece. Então o script se recusa a escrever se
 * a pasta não estiver no .gitignore.
 */
function pastaEstaIgnorada() {
  const gitignore = join(raiz, '.gitignore')
  if (!existsSync(gitignore)) return false
  return readFileSync(gitignore, 'utf8')
    .split('\n')
    .some(linha => linha.trim().replace(/\/$/, '') === 'backups')
}

if (!pastaEstaIgnorada()) {
  console.error(
    'Recusando: "backups/" não está no .gitignore.\n'
    + 'O arquivo gerado contém e-mail e hash de senha dos alunos, e um commit\n'
    + 'acidental publicaria isso para sempre. Acrescente "backups/" ao\n'
    + '.gitignore e rode de novo.',
  )
  process.exit(1)
}

const prisma = new PrismaClient()

/** A ordem importa na restauração: pai antes de filho. */
const TABELAS = [
  ['student', p => p.student.findMany()],
  ['testResult', p => p.testResult.findMany()],
  ['studentLesson', p => p.studentLesson.findMany()],
  ['exerciseAttempt', p => p.exerciseAttempt.findMany()],
  ['reviewItem', p => p.reviewItem.findMany()],
  ['paymentNotice', p => p.paymentNotice.findMany()],
  ['musicNote', p => p.musicNote.findMany()],
  ['question', p => p.question.findMany()],
]

const dados = {}
let total = 0

for (const [nome, ler] of TABELAS) {
  const linhas = await ler(prisma)
  dados[nome] = linhas
  total += linhas.length
  console.log(`  ${String(linhas.length).padStart(6)}  ${nome}`)
}

mkdirSync(pasta, { recursive: true })
const carimbo = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
const arquivo = join(pasta, `linguakit-${carimbo}.json`)

writeFileSync(arquivo, JSON.stringify({
  geradoEm: new Date().toISOString(),
  // Só o host, nunca a senha da conexão: o arquivo é para ser guardado, e
  // uma credencial dentro dele transformaria a cópia num risco.
  banco: new URL(process.env.DATABASE_URL ?? 'postgres://desconhecido').host,
  tabelas: dados,
}, null, 2))

console.log(`\n${total} linhas em ${arquivo}`)
console.log('Guarde fora desta máquina: um backup que mora no mesmo lugar que o original não é backup.')

await prisma.$disconnect()
