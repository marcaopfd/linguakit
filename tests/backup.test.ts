import { readFileSync } from 'fs'
import { join } from 'path'
import { describe, expect, it } from 'vitest'

const ler = (p: string) => readFileSync(join(__dirname, '..', p), 'utf8')

/**
 * Backup que esquece uma tabela é pior do que backup nenhum: ele dá a
 * sensação de estar protegido. Esta é a única parte do projeto em que o erro
 * não aparece até o dia em que já é tarde — então o teste olha o schema e
 * cobra cada modelo nos dois scripts.
 */
const schema = ler('prisma/schema.prisma')
const modelos = [...schema.matchAll(/^model\s+(\w+)\s*\{/gm)].map(m => m[1])

/** PrismaClient expõe cada modelo com a inicial minúscula. */
const comoOPrismaChama = (modelo: string) => modelo[0].toLowerCase() + modelo.slice(1)

describe('a cópia de segurança', () => {
  it('conhece todos os modelos do schema', () => {
    expect(modelos.length).toBeGreaterThan(5)
  })

  it('copia toda tabela que existe', () => {
    const backup = ler('scripts/backup.mjs')
    for (const modelo of modelos) {
      expect(backup, `${modelo} não entra no backup`).toContain(`p.${comoOPrismaChama(modelo)}.findMany()`)
    }
  })

  it('sabe restaurar toda tabela que copia', () => {
    const restore = ler('scripts/restore.mjs')
    for (const modelo of modelos) {
      expect(restore, `${modelo} não volta no restore`).toContain(`p.${comoOPrismaChama(modelo)}.upsert(`)
    }
  })
})
