/**
 * O endereço do site, num lugar só.
 *
 * Ele aparecia escrito à mão em seis arquivos — sitemap, robots, as legais e
 * três rodapés de PDF. Trocar de domínio significava caçar os seis e
 * descobrir o sétimo depois, pelo lado errado: um aluno abrindo um kit de
 * bolso que aponta para um endereço que não existe mais.
 *
 * Vem de variável de ambiente para a troca não precisar de commit nenhum:
 * basta `NEXT_PUBLIC_SITE_URL` na Vercel e um redeploy. O valor padrão é o
 * endereço de hoje, então nada muda enquanto a variável não existir.
 *
 * É `NEXT_PUBLIC_` porque os PDFs são montados no navegador e também
 * precisam dele. Não há segredo aqui: é o endereço público do site.
 */
const BRUTO = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://linguakit.vercel.app'

/** Sem barra no fim, para não gerar "site.com//pagina" ao concatenar. */
export const SITE_URL = BRUTO.replace(/\/+$/, '')

/**
 * Só o domínio, para onde se escreve o endereço para uma pessoa ler — o
 * rodapé de um PDF impresso, por exemplo, onde "https://" é ruído.
 */
export const SITE_HOST = SITE_URL.replace(/^https?:\/\//, '')
