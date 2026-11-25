/**
 * Confere se as cenas cadastradas ainda tocam.
 *
 * Vídeo de terceiro some: o dono apaga, torna privado, ou desliga a
 * incorporação. Quando isso acontece, a lição não quebra — a cena avisa e
 * segue —, mas alguém precisa saber para trocar o trecho. Este script é esse
 * alguém.
 *
 * Pergunta ao oEmbed do YouTube, que só responde 200 para vídeo público e
 * incorporável. É o mesmo "sim" que o player precisa.
 *
 *   npm run check-scenes
 */
import { readFileSync } from 'fs'

const arquivo = new URL('../lib/trilhas/cenas.json', import.meta.url)

let cenas
try {
  cenas = JSON.parse(readFileSync(arquivo, 'utf8'))
} catch {
  console.log('Nenhuma cena cadastrada ainda (lib/trilhas/cenas.json não existe).')
  process.exit(0)
}

const espera = ms => new Promise(r => setTimeout(r, ms))

/**
 * Confere o corte antes de perguntar ao YouTube: um trecho que começa depois
 * do fim, ou que passa da duração do vídeo, abre o player num lugar que não
 * existe. Isso não depende de rede, então é erro na hora.
 */
function conferirCorte(cena) {
  const { inicio, fim, duracao } = cena
  if (typeof inicio !== 'number' || typeof fim !== 'number') return 'falta início ou fim'
  if (inicio < 0) return 'início negativo'
  if (fim <= inicio) return `fim (${fim}s) não é depois do início (${inicio}s)`
  if (typeof duracao === 'number' && duracao > 0 && fim > duracao) {
    return `fim (${fim}s) passa da duração do vídeo (${duracao}s)`
  }
  return null
}

async function conferir(cena) {
  const url = `https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${cena.videoId}`)}&format=json`
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'LinguaKit/1.0 (scene check)' } })
    if (res.status === 200) {
      const dados = await res.json()
      return { ok: true, titulo: dados.title, canal: dados.author_name }
    }
    // 401 e 403: existe, mas o dono não deixa incorporar. 404: sumiu.
    return { ok: false, motivo: res.status === 404 ? 'não existe mais' : `não pode ser incorporado (${res.status})` }
  } catch (err) {
    return { ok: false, motivo: `não deu para conferir: ${err.message}` }
  }
}

let quebradas = 0
let cortesRuins = 0
for (const cena of cenas) {
  const problema = conferirCorte(cena)
  if (problema) {
    cortesRuins++
    console.log(`  CORTE ${cena.videoId}  ${problema}`)
  }
  const r = await conferir(cena)
  if (r.ok) {
    const canalBate = !cena.canal || r.canal.toLowerCase().includes(cena.canal.toLowerCase())
    console.log(`  ok    ${cena.videoId}  ${r.canal}${canalBate ? '' : `  ⚠ esperava o canal "${cena.canal}"`}`)
  } else {
    quebradas++
    console.log(`  FORA  ${cena.videoId}  ${r.motivo}  (${cena.foco ?? cena.titulo ?? ''})`)
  }
  // Uma por segundo: o oEmbed é gentil, mas não é de graça.
  await espera(400)
}

console.log(
  `\n${cenas.length} cena(s) conferida(s), ${quebradas} fora do ar, ${cortesRuins} com corte inválido.`,
)
process.exit(quebradas || cortesRuins ? 1 : 0)
