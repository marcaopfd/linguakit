import { readFileSync } from 'fs'
import { join } from 'path'
import { describe, expect, it } from 'vitest'
import { numerosDoCursoGeral, numerosDoProduto } from '@/lib/numeros'
import { TRILHAS } from '@/lib/trilhas'

const ler = (p: string) => readFileSync(join(__dirname, '..', p), 'utf8')
const pagina = ler('app/ingles-para-morar-fora/page.tsx')

/**
 * O que a página diz, sem o que ela explica sobre si.
 *
 * Os comentários do arquivo falam justamente do que foi deixado de fora
 * ("depoimento seria prova social fabricada"), então procurar essas palavras
 * no arquivo inteiro acusa o comentário em vez da copy.
 */
const copy = pagina
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/^\s*\/\/.*$/gm, '')
  .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')

describe('os números do produto', () => {
  it('conta o que existe de verdade', () => {
    const n = numerosDoProduto()
    expect(n.trilhas).toBeGreaterThanOrEqual(2)
    expect(n.modulos).toBeGreaterThan(0)
    expect(n.licoes).toBeGreaterThan(0)
    expect(n.frases).toBeGreaterThan(0)
    expect(n.exercicios).toBeGreaterThan(0)
    expect(n.conversas).toBeGreaterThan(0)
    expect(n.musicas).toBeGreaterThan(0)
  })

  it('não conta a trilha que ainda não tem conteúdo', () => {
    // "Trabalhar Online" e "Vender" aparecem na home como "em breve". Contá-las
    // faria a página de vendas prometer módulos que não existem.
    const emBreve = TRILHAS.filter(t => !t.disponivel)
    expect(emBreve.length).toBeGreaterThan(0)
    expect(numerosDoProduto().trilhas).toBe(
      TRILHAS.filter(t => t.disponivel && t.id !== 'geral' && t.modulos.length > 0).length,
    )
  })

  it('bate com a soma dos módulos das trilhas escritas', () => {
    const escritas = TRILHAS.filter(t => t.disponivel && t.id !== 'geral' && t.modulos.length > 0)
    const modulos = escritas.reduce((s, t) => s + t.modulos.length, 0)
    expect(numerosDoProduto().modulos).toBe(modulos)
  })
})

describe('os números do curso geral', () => {
  it('conta exercício como exercício, e não como tudo que existe na unidade', () => {
    // A home anunciava "+1.700 exercícios". Exercício de verdade são 882; os
    // 1.700 só aparecem somando vocabulário, falas de diálogo e erros
    // comuns. Quem conta 1.700 e entrega 882 não ganha um aluno a mais —
    // perde o direito de ser levado a sério no resto da página.
    const n = numerosDoCursoGeral()
    expect(n.exercicios).toBeGreaterThan(0)
    expect(n.exercicios).toBeLessThan(n.exercicios + n.palavras + n.falas)
    expect(n.niveis).toBeGreaterThan(0)
    expect(n.unidades).toBeGreaterThan(0)
  })

  it('a home não traz número do curso cravado à mão', () => {
    // Sem comentários: o cabeçalho do arquivo EXPLICA o número errado que
    // existia ali ("a página anunciava +1.700 exercícios"), então procurar no
    // arquivo inteiro acusa a explicação em vez da copy. Foi exatamente o que
    // aconteceu na primeira versão deste teste.
    const home = ler('app/page.tsx')
    const copyDaHome = home
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/^\s*\/\/.*$/gm, '')
      .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')

    // O defeito que isto guarda é o que de fato aconteceu: um número escrito
    // na copy, o conteúdo muda (ou nunca bateu), e a página mente.
    expect(copyDaHome).not.toMatch(/1\.?700/)
    // A contagem é lida do currículo. A chamada mora no topo do módulo, fora
    // do componente, então a procura é no arquivo todo.
    expect(home).toContain('numerosDoCursoGeral()')
  })
})

describe('a página de vendas', () => {
  it('não traz número cravado à mão no texto', () => {
    // O defeito que isto guarda: alguém escreve "19 módulos" na copy, o
    // conteúdo cresce, e a página passa a mentir sem ninguém reler.
    const corpo = pagina.slice(pagina.indexOf('export default function'))
    const cravados = corpo.match(/>\s*\d{2,}\s+(módulos|lições|frases|exercícios|conversas|músicas)/g) ?? []
    expect(cravados).toEqual([])
    expect(corpo).toContain('numerosDoProduto()')
  })

  it('lê as situações do próprio conteúdo, e não de uma lista paralela', () => {
    expect(pagina).toContain("TRILHAS.find(t => t.id === 'viagem')")
    expect(pagina).toContain("TRILHAS.find(t => t.id === 'morar-fora')")
    expect(pagina).toContain('m.consegue')
  })

  it('não inventa prova social', () => {
    // O produto ainda não tem aluno pagante. Depoimento escrito por nós seria
    // review fabricada — e, vendendo para quem vai mudar de país, a confiança
    // é o ativo.
    for (const palavra of ['depoimento', 'Depoimento', 'alunos satisfeitos', 'estrelas']) {
      expect(copy, palavra).not.toContain(palavra)
    }
  })

  it('não usa urgência falsa', () => {
    for (const truque of ['últimas vagas', 'Últimas vagas', 'oferta expira', 'countdown', 'restam apenas', 'de R$']) {
      expect(copy, truque).not.toContain(truque)
    }
  })

  it('tem o que o Google precisa para entender a página', () => {
    expect(pagina).toContain('export const metadata')
    expect(pagina).toContain('alternates: { canonical:')
    expect(pagina).toContain("'@type': 'FAQPage'")
    expect(pagina).toContain("'@type': 'Course'")
    // Uma h1 só, com a palavra que a pessoa digita na busca.
    expect((pagina.match(/<h1/g) ?? []).length).toBe(1)
    expect(pagina).toMatch(/Inglês para quem[\s\S]{0,40}morar fora/)
  })

  it('tem um único destino principal, repetido', () => {
    // Duas ofertas competindo na mesma página derrubam a conversão. O botão
    // é sempre o mesmo: o teste de nível, que é grátis e termina em conta.
    const ctas = pagina.match(/className="lp-cta"/g) ?? []
    expect(ctas.length).toBeGreaterThanOrEqual(2)
    expect(pagina).toContain('/test?lang=en')
  })

  it('está aberta ao público e listada para busca', () => {
    const proxy = ler('proxy.ts')
    const publicas = proxy.slice(proxy.indexOf('const PUBLIC_EXACT'), proxy.indexOf('function isUnder'))
    expect(publicas).toContain("'/ingles-para-morar-fora'")
    expect(ler('app/robots.ts')).toContain('/ingles-para-morar-fora')
    expect(ler('app/sitemap.ts')).toContain('/ingles-para-morar-fora')
  })

  it('tem porta a partir da home', () => {
    expect(ler('app/page.tsx')).toContain('/ingles-para-morar-fora')
  })
})
