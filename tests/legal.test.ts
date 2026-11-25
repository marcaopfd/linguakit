import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'
import { describe, expect, it } from 'vitest'
import { dataPorExtenso, LEGAL } from '@/lib/legal'

const raiz = join(__dirname, '..')
const ler = (p: string) => readFileSync(join(raiz, p), 'utf8')

const PAGINAS = ['termos', 'privacidade', 'reembolso', 'contato'] as const

describe('as páginas legais', () => {
  it('existem todas as quatro', () => {
    for (const nome of PAGINAS) {
      expect(() => ler(`app/${nome}/page.tsx`), nome).not.toThrow()
    }
  })

  it('abrem sem login, ou não servem para nada', () => {
    // Elas existem justamente para quem ainda não tem conta ler antes de
    // criar uma. E plataforma de anúncio confere se abrem anônimas.
    const proxy = ler('proxy.ts')
    const publicas = proxy.slice(proxy.indexOf('const PUBLIC_EXACT'), proxy.indexOf('function isUnder'))
    for (const nome of PAGINAS) {
      expect(publicas, nome).toContain(`'/${nome}'`)
    }
  })

  it('estão no sitemap e liberadas no robots', () => {
    for (const nome of PAGINAS) {
      expect(ler('app/sitemap.ts'), nome).toContain(`/${nome}`)
      expect(ler('app/robots.ts'), nome).toContain(`/${nome}`)
    }
  })

  it('são alcançáveis a partir da home e da página de vendas', () => {
    // Política que só existe se você digitar a URL não cumpre o papel.
    for (const pagina of ['app/page.tsx', 'app/ingles-para-morar-fora/page.tsx']) {
      expect(ler(pagina), pagina).toContain('RodapeLegal')
    }
  })

  it('têm título e descrição próprios', () => {
    for (const nome of PAGINAS) {
      const fonte = ler(`app/${nome}/page.tsx`)
      expect(fonte, nome).toContain('export const metadata')
      expect(fonte, nome).toContain('alternates: { canonical:')
    }
  })

  it('leem a identificação de um lugar só', () => {
    // Quatro textos com o nome do responsável escrito à mão viram quatro
    // textos que discordam entre si no dia em que um deles muda.
    for (const nome of PAGINAS) {
      const fonte = ler(`app/${nome}/page.tsx`)
      expect(fonte, nome).toContain("from '@/lib/legal'")
      expect(fonte, nome).not.toMatch(/Marcos\s+Dias/)
    }
  })

  it('não inventam um e-mail de contato', () => {
    // Enquanto LINGUAKIT_SUPORTE não existir, a tela diz que o canal está
    // sendo montado. Um mailto para endereço inexistente é pior que nada.
    const componente = ler('components/PaginaLegal.tsx')
    expect(componente).toContain('if (!LEGAL.email)')
    for (const nome of PAGINAS) {
      expect(ler(`app/${nome}/page.tsx`), nome).not.toMatch(/mailto:[a-z]/)
    }
  })

  it('não prometem o que o produto não faz', () => {
    // O reembolso caro é o que nasce de expectativa que ninguém desfez.
    const termos = ler('app/termos/page.tsx')
    expect(termos).toContain('Não tem certificado')
    expect(termos).toContain('Não tem professor')
    expect(termos).toContain('Não promete prazo de fluência')
  })

  it('dizem os sete dias do Código de Defesa do Consumidor', () => {
    const reembolso = ler('app/reembolso/page.tsx')
    expect(reembolso).toMatch(/7 dias|sete dias/i)
    expect(reembolso).toContain('artigo 49')
  })
})

describe('o que a política de privacidade afirma', () => {
  const politica = ler('app/privacidade/page.tsx')

  it('só diz "não há rastreador" enquanto for verdade', () => {
    // Esta é a afirmação mais fácil de tornar mentira: basta alguém instalar
    // o @vercel/analytics um dia. Aí este teste quebra, e o texto muda junto.
    expect(politica).toContain('Não há nenhum rastreador no site')

    const pacote = JSON.parse(ler('package.json'))
    const deps = { ...pacote.dependencies, ...pacote.devDependencies }
    for (const proibida of ['@vercel/analytics', '@vercel/speed-insights', 'posthog-js', 'react-ga', 'mixpanel-browser']) {
      expect(deps[proibida], proibida).toBeUndefined()
    }

    const fontes = varrer(join(raiz, 'app')).concat(varrer(join(raiz, 'components')))
    for (const arquivo of fontes) {
      const src = readFileSync(arquivo, 'utf8')
      for (const marca of ['googletagmanager', 'gtag(', 'fbq(', 'hotjar']) {
        expect(src.includes(marca), `${arquivo} usa ${marca}`).toBe(false)
      }
    }
  })

  it('só diz que a gravação não sai do aparelho enquanto for verdade', () => {
    expect(politica).toContain('não sai do seu')
    const gravador = ler('components/RecordButton.tsx')
    // Nada de envio: sem fetch e sem FormData no componente que grava.
    expect(gravador).not.toMatch(/\bfetch\s*\(/)
    expect(gravador).not.toContain('FormData')
  })

  it('lista os cookies que existem de verdade', () => {
    for (const cookie of ['lk_student', 'lk_session', 'lk_trilha']) {
      expect(politica, cookie).toContain(cookie)
    }
  })

  it('nomeia quem processa os dados', () => {
    for (const terceiro of ['Vercel', 'Neon', 'YouTube']) {
      expect(politica, terceiro).toContain(terceiro)
    }
    // O processador de pagamento vem do lib/legal, para a política e os
    // termos nunca citarem plataformas diferentes.
    expect(politica).toContain('LEGAL.pagamento.nome')
    expect(LEGAL.pagamento.nome).toBeTruthy()
  })
})

describe('a identificação do site', () => {
  it('tem data de atualização legível', () => {
    expect(LEGAL.atualizadoEm).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(dataPorExtenso('2026-11-25')).toBe('25 de novembro de 2026')
  })

  it('não traz e-mail pessoal cravado no código', () => {
    expect(ler('lib/legal.ts')).not.toMatch(/@gmail|@hotmail|@outlook/)
  })
})

/** Todos os .tsx e .ts de uma pasta, recursivamente. */
function varrer(dir: string): string[] {
  const saida: string[] = []
  for (const item of readdirSync(dir, { withFileTypes: true })) {
    const caminho = join(dir, item.name)
    if (item.isDirectory()) saida.push(...varrer(caminho))
    else if (/\.tsx?$/.test(item.name)) saida.push(caminho)
  }
  return saida
}
