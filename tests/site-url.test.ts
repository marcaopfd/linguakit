import { readFileSync, readdirSync, statSync } from 'fs'
import { join } from 'path'
import { describe, expect, it } from 'vitest'
import { SITE_URL, SITE_HOST } from '@/lib/site'

const raiz = join(__dirname, '..')
const ler = (p: string) => readFileSync(join(raiz, p), 'utf8')

/** Todo .ts/.tsx de app/ e lib/, para a varredura não depender de uma lista. */
function arquivos(dir: string, achados: string[] = []): string[] {
  for (const nome of readdirSync(join(raiz, dir))) {
    const rel = `${dir}/${nome}`
    if (statSync(join(raiz, rel)).isDirectory()) arquivos(rel, achados)
    else if (/\.tsx?$/.test(nome)) achados.push(rel)
  }
  return achados
}

describe('o endereço do site', () => {
  it('não tem barra no fim e expõe só o domínio', () => {
    expect(SITE_URL.endsWith('/')).toBe(false)
    expect(SITE_HOST).not.toMatch(/^https?:/)
    expect(SITE_URL).toContain(SITE_HOST)
  })

  it('está escrito à mão num lugar só', () => {
    // Estava em seis: sitemap, robots, as legais e três rodapés de PDF.
    // Trocar de domínio significava caçar os seis — e descobrir o sétimo pelo
    // lado errado, com um aluno abrindo um PDF que aponta para um endereço
    // que não existe mais.
    const culpados = arquivos('app')
      .concat(arquivos('lib'))
      .filter(f => f !== 'lib/site.ts')
      .filter(f => ler(f).includes('linguakit.vercel.app'))
    expect(culpados).toEqual([])
  })

  it('o layout declara metadataBase, senão canonical e og:url saem relativos', () => {
    // og:url relativo não é URL para o WhatsApp nem para o Facebook. A página
    // de vendas chegou a servir <link rel="canonical" href="/ingles-para-...">
    // justamente na semana de comprar tráfego.
    const layout = ler('app/layout.tsx')
    expect(layout).toContain('metadataBase')
    expect(layout).toContain('new URL(SITE_URL)')
  })

  it('sitemap e robots leem daqui', () => {
    for (const arq of ['app/sitemap.ts', 'app/robots.ts']) {
      expect(ler(arq), arq).toContain("from '@/lib/site'")
    }
  })
})
