import { ImageResponse } from 'next/og'
import { numerosDoProduto } from '@/lib/numeros'

/**
 * O card da página de vendas — e a capa do produto na Kiwify.
 *
 * Sem este arquivo, a landing herdava o card do site inteiro, que anuncia o
 * curso GRÁTIS ("do zero ao avançado, 6 níveis, 50 unidades"). Colar o link
 * da página de vendas no WhatsApp mostrava a oferta errada, e a mesma imagem
 * iria para o checkout de um produto pago. Para quem vai comprar tráfego, o
 * card é metade do anúncio.
 *
 * Os números vêm de `numerosDoProduto()`, pela mesma razão que na página: o
 * conteúdo cresce e a imagem cresce junto, sem ninguém reabrir este arquivo.
 *
 * Serve como capa na Kiwify porque é 1200×630 em cima do mesmo preto e do
 * mesmo limão do produto. Baixe em /ingles-para-morar-fora/opengraph-image.
 */

export const alt = 'LinguaKit — inglês para morar fora e viajar'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const INK = '#12150f'
const CREAM = '#f2f4e9'
const LIME = '#cbf24d'

/**
 * A fonte de título do site, buscada no build com rede de proteção: se o
 * Google estiver fora, o card sai na fonte padrão, que é muito melhor do que
 * derrubar o build por causa de uma tipografia.
 */
async function display(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,800&display=swap',
      { headers: { 'User-Agent': 'Mozilla/5.0' } },
    ).then(r => r.text())

    const url = css.match(/src: url\((https:[^)]+)\) format\('(?:truetype|opentype)'\)/)?.[1]
    if (!url) return null
    return await fetch(url).then(r => r.arrayBuffer())
  } catch {
    return null
  }
}

export default async function Image() {
  const font = await display()
  const n = numerosDoProduto()
  const familia = font ? 'Bricolage Grotesque' : undefined

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: INK,
          color: CREAM,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
        }}
      >
        <div style={{ display: 'flex', fontSize: 22, color: LIME, letterSpacing: 4, fontWeight: 700 }}>
          PARA QUEM VAI
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: 96,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: -4,
              fontFamily: familia,
            }}
          >
            <span>Inglês para quem</span>
            <span>vai morar fora.</span>
          </div>

          <div style={{ display: 'flex', fontSize: 30, color: 'rgba(242,244,233,.62)', marginTop: 26, lineHeight: 1.35 }}>
            Imigração, aluguel, entrevista, cozinha, obra, mercado.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', fontSize: 21, color: 'rgba(242,244,233,.45)', letterSpacing: 1.5 }}>
            {n.modulos} MÓDULOS · {n.frases} FRASES · {n.conversas} CONVERSAS · {n.musicas} MÚSICAS
          </div>
          <div
            style={{
              display: 'flex',
              background: LIME,
              color: INK,
              fontSize: 23,
              fontWeight: 700,
              padding: '12px 26px',
              borderRadius: 999,
            }}
          >
            LinguaKit
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: font
        ? [{ name: 'Bricolage Grotesque', data: font, style: 'normal' as const, weight: 800 as const }]
        : undefined,
    },
  )
}
