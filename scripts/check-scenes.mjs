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
for (const cena of cenas) {
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

console.log(`\n${cenas.length} cena(s) conferida(s), ${quebradas} fora do ar.`)
process.exit(quebradas ? 1 : 0)
