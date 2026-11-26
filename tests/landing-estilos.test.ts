import { readFileSync } from 'fs'
import { join } from 'path'
import { describe, expect, it } from 'vitest'

const ler = (p: string) => readFileSync(join(__dirname, '..', p), 'utf8')
const fonte = ler('app/ingles-para-morar-fora/estilos.tsx')

/** Só o CSS, sem o TSX em volta. */
const css = fonte.slice(fonte.indexOf('<style>{`') + 9, fonte.indexOf('`}</style>'))

/**
 * O CSS sem os comentários.
 *
 * Os comentários daqui explicam justamente as armadilhas — "no toque, :hover
 * dispara no tap" — então procurar :hover no arquivo inteiro acusa a
 * explicação em vez da regra. Esta é a mesma pegadinha que já apareceu no
 * teste das páginas legais.
 */
const regras = css.replace(/\/\*[\s\S]*?\*\//g, '')

describe('o CSS da landing', () => {
  it('não tem acento grave dentro do template literal', () => {
    // Já quebrou o arquivo duas vezes: um acento grave num comentário de CSS
    // FECHA a string JavaScript, e o erro aparece 200 linhas abaixo, em
    // lugares que não têm nada a ver. Errei isto, documentei, e errei de
    // novo no mesmo arquivo — então vira teste.
    expect(css).not.toContain('`')
  })

  it('não usa transition: all', () => {
    // `all` anima propriedades que você não sabe que existem, e paga por
    // todas — inclusive as que forçam layout.
    expect(css).not.toMatch(/transition:\s*all/)
  })

  it('não anima a partir de scale(0)', () => {
    // Nada no mundo real some e volta do nada. Entrada começa em 0.95 ou
    // mais, junto com opacidade.
    expect(css).not.toMatch(/scale\(0\)/)
  })

  it('não usa ease-in em animação de interface', () => {
    // ease-in começa devagar, justo no instante em que a pessoa está
    // olhando: a interface parece lenta mesmo na mesma duração.
    const curvas = css.match(/animation(?:-timing-function)?:[^;]*ease-in[^-][^;]*/g) ?? []
    expect(curvas).toEqual([])
  })

  it('tem estado de pressionado em tudo que se aperta', () => {
    for (const botao of ['.lp-cta', '.lp-cta-pequeno', '.lp-link-fantasma']) {
      expect(css, botao).toContain(`${botao}:active`)
    }
    expect(css).toMatch(/\.lp-cta:active\s*\{[^}]*scale\(\.9\d\)/)
  })

  it('só liga hover onde hover existe', () => {
    // Em tela de toque, :hover dispara no tap e fica aceso depois do dedo
    // sair. Todo bloco de hover vive atrás da media query.
    const hovers = regras.match(/\.lp-[a-z-]+:hover/g) ?? []
    expect(hovers.length).toBeGreaterThan(0)
    const blocos = regras.split('@media (hover: hover) and (pointer: fine)')
    // Nenhum :hover antes do primeiro bloco protegido.
    expect(blocos[0]).not.toMatch(/:hover/)
  })

  it('devolve a página parada para quem pediu menos movimento', () => {
    const reduzido = css.slice(css.indexOf('@media (prefers-reduced-motion: reduce)'))
    for (const classe of ['.lp-lead', '.lp-apoio', '.lp-turno', '.lp-acende > span']) {
      expect(reduzido, classe).toContain(classe)
    }
    expect(reduzido).toContain('animation: none !important')
  })

  it('esconde a revelação atrás de @supports', () => {
    // Sem linha de tempo de rolagem, a página tem que chegar visível — e não
    // em branco, com o conteúdo esperando um evento que nunca vem.
    const timeline = css.indexOf('animation-timeline: view()')
    const supports = css.indexOf('@supports (animation-timeline: view())')
    expect(supports).toBeGreaterThan(0)
    expect(timeline).toBeGreaterThan(supports)
  })

  it('não cria contêiner de rolagem onde há linha de tempo', () => {
    // overflow: hidden faz da seção um scroller, e a linha de tempo passa a
    // medir a rolagem DELA, que nunca acontece. Foi assim que a barra do
    // topo ficou presa em 51% e nunca apareceu.
    const pagina = ler('app/ingles-para-morar-fora/page.tsx')
    expect(pagina).not.toMatch(/overflow:\s*'hidden'/)
    expect(css).not.toMatch(/\.lp-trilho-sticky\s*\{[^}]*overflow:\s*hidden/)
  })
})
