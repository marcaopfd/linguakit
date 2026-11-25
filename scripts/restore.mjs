/**
 * Restaura uma cópia feita por scripts/backup.mjs.
 *
 * Esta é a metade que quase todo mundo esquece. Backup que nunca foi
 * restaurado é uma esperança, não uma garantia — e o dia de descobrir que o
 * formato não presta não pode ser o dia em que o banco caiu.
 *
 *   node --env-file=.env scripts/restore.mjs backups/linguakit-….json
 *
 * Sem --sim ele só mostra o que faria. Com --sim, escreve.
 *
 * Usa upsert por id: rodar duas vezes dá o mesmo resultado que rodar uma, e
 * restaurar por cima de um banco que já tem dados repõe o que falta sem
 * apagar o que está lá. Ele NÃO apaga nada — se você precisa de um banco
 * idêntico ao do arquivo, esvazie antes, de propósito e à mão.
 */
import { readFileSync } from 'fs'
import { PrismaClient } from '@prisma/client'

const arquivo = process.argv[2]
const valendo = process.argv.includes('--sim')

if (!arquivo) {
  console.error('Uso: node --env-file=.env scripts/restore.mjs <arquivo.json> [--sim]')
  process.exit(1)
}

const copia = JSON.parse(readFileSync(arquivo, 'utf8'))
const destino = new URL(process.env.DATABASE_URL ?? 'postgres://desconhecido').host

console.log(`Arquivo:  ${arquivo}`)
console.log(`Gerado:   ${copia.geradoEm}  (de ${copia.banco})`)
console.log(`Destino:  ${destino}`)
if (copia.banco !== destino) {
  console.log('Atenção: o destino não é o mesmo banco de onde a cópia saiu.')
}
console.log(valendo ? '\nEscrevendo.\n' : '\nEnsaio — nada será escrito. Repita com --sim para valer.\n')

const prisma = new PrismaClient()

/** Pai antes de filho: as chaves estrangeiras são RESTRICT. */
const ORDEM = [
  ['student', (p, r) => p.student.upsert({ where: { id: r.id }, update: r, create: r })],
  ['testResult', (p, r) => p.testResult.upsert({ where: { id: r.id }, update: r, create: r })],
  ['studentLesson', (p, r) => p.studentLesson.upsert({ where: { id: r.id }, update: r, create: r })],
  ['exerciseAttempt', (p, r) => p.exerciseAttempt.upsert({ where: { id: r.id }, update: r, create: r })],
  ['reviewItem', (p, r) => p.reviewItem.upsert({ where: { id: r.id }, update: r, create: r })],
  ['paymentNotice', (p, r) => p.paymentNotice.upsert({ where: { id: r.id }, update: r, create: r })],
  ['musicNote', (p, r) => p.musicNote.upsert({ where: { id: r.id }, update: r, create: r })],
]

let escritas = 0
let falhas = 0

for (const [nome, gravar] of ORDEM) {
  const linhas = copia.tabelas?.[nome] ?? []
  if (!valendo) {
    console.log(`  ${String(linhas.length).padStart(6)}  ${nome}`)
    continue
  }

  let ok = 0
  for (const linha of linhas) {
    // As datas voltam do JSON como texto e o Prisma quer Date.
    const r = Object.fromEntries(Object.entries(linha).map(([k, v]) => [
      k,
      typeof v === 'string' && /^\d{4}-\d{2}-\d{2}T[\d:.]+Z$/.test(v) ? new Date(v) : v,
    ]))
    try {
      await gravar(prisma, r)
      ok++
    } catch (err) {
      falhas++
      console.error(`  erro em ${nome}/${linha.id}: ${err.message.split('\n')[0]}`)
    }
  }
  escritas += ok
  console.log(`  ${String(ok).padStart(6)}  ${nome}`)
}

console.log(valendo ? `\n${escritas} linhas gravadas, ${falhas} falhas.` : '\nNada foi escrito.')
await prisma.$disconnect()
process.exit(falhas ? 1 : 0)
