import type { Metadata } from 'next'
import Link from 'next/link'
import { PaginaLegal } from '@/components/PaginaLegal'
import { prisma, withDb } from '@/lib/db'
import { perguntaPublica } from '@/lib/duvidas'
import { LEGAL } from '@/lib/legal'

/**
 * As dúvidas que já foram respondidas, abertas para quem tiver a mesma.
 *
 * Por que esta página existe, e por que ela é a melhor página do site para
 * quem está decidindo comprar: a objeção número um do produto é "funciona
 * mesmo sem professor?". Nenhuma frase de vendas responde isso. Uma lista de
 * perguntas de verdade, com resposta escrita à mão e datada, responde.
 *
 * É também a única prova social que este projeto aceita. Não há depoimento
 * aqui, nem vai haver: depoimento é alguém elogiando, e isso a gente teria
 * que escrever. Dúvida respondida é trabalho, e o trabalho fala sozinho.
 *
 * Nada aparece aqui sem o professor publicar, e o nome de quem perguntou
 * nunca aparece.
 */

const TITULO = 'Dúvidas de inglês, respondidas à mão — LinguaKit'
const DESCRICAO =
  'Perguntas de verdade de quem está aprendendo inglês para morar fora ou '
  + 'viajar, com resposta escrita à mão. Sem robô e sem resposta pronta.'

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRICAO,
  alternates: { canonical: '/duvidas' },
  openGraph: { title: TITULO, description: DESCRICAO, type: 'website', locale: 'pt_BR', url: '/duvidas' },
}

/** A página lê o banco, então renderiza por requisição. */
export const dynamic = 'force-dynamic'

export default async function DuvidasPage() {
  const duvidas = await withDb(() => prisma.question.findMany({
    where: { published: true, answer: { not: null } },
    orderBy: { answeredAt: 'desc' },
    take: 200,
    select: { id: true, text: true, publishedText: true, answer: true, answeredAt: true },
  })).catch(() => [])

  /**
   * FAQPage com perguntas que existem de verdade.
   *
   * É para isto que esse schema foi feito. A landing já usa um FAQPage com as
   * perguntas que eu escrevi; este aqui é com as que as pessoas fizeram, o
   * que é exatamente o conteúdo que a busca quer e que ninguém consegue
   * fabricar.
   */
  const jsonLd = duvidas.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: duvidas.map(d => ({
      '@type': 'Question',
      name: perguntaPublica(d),
      acceptedAnswer: { '@type': 'Answer', text: d.answer },
    })),
  } : null

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <PaginaLegal
        titulo="Dúvidas respondidas"
        resumo="Perguntas que alunos mandaram, respondidas à mão por quem escreveu o curso. Se a sua dúvida está aqui, a resposta é sua também."
      >
        {duvidas.length === 0 ? (
          <>
            <h2>Ainda não há nenhuma publicada</h2>
            <p>
              Esta página se enche com o tempo: cada dúvida que um aluno manda e
              que vale para mais gente vira uma entrada aqui, com a resposta.
              Nada aparece automaticamente — tudo passa pela mão de{' '}
              {LEGAL.responsavel} antes.
            </p>
            <p>
              Enquanto isso, as perguntas mais comuns estão respondidas na{' '}
              <Link href="/ingles-para-morar-fora">página do curso</Link>.
            </p>
          </>
        ) : (
          <>
            <p>
              {duvidas.length === 1
                ? 'Uma dúvida respondida até agora.'
                : `${duvidas.length} dúvidas respondidas, da mais recente para a mais antiga.`}
              {' '}Quem perguntou não é identificado: a pessoa mandou uma
              dúvida, não um depoimento.
            </p>

            {duvidas.map(d => (
              <article key={d.id} id={d.id} style={{ marginTop: '2.25rem' }}>
                <h2 style={{ scrollMarginTop: '1rem' }}>{perguntaPublica(d)}</h2>
                {d.answer?.split('\n').filter(Boolean).map((paragrafo, i) => (
                  <p key={i}>{paragrafo}</p>
                ))}
                {d.answeredAt && (
                  <p style={{ fontSize: '.85rem', opacity: .65 }}>
                    Respondida em{' '}
                    <time dateTime={d.answeredAt.toISOString()}>
                      {d.answeredAt.toLocaleDateString('pt-BR')}
                    </time>
                    {' '}por {LEGAL.responsavel}.
                  </p>
                )}
              </article>
            ))}
          </>
        )}

        <h2>Como mandar a sua</h2>
        <p>
          Dentro do curso, em <strong>Minhas dúvidas</strong>. Você recebe a
          resposta ali mesmo, e só se ela servir para mais gente é que ela
          aparece nesta página — sem o seu nome, e com a pergunta revisada
          quando ela trouxer algum dado seu.
        </p>
        <p>
          Ainda não tem conta? <Link href="/cadastro">Criar a minha</Link> leva
          um minuto e o curso do A1 ao C2 é de graça.
        </p>
      </PaginaLegal>
    </>
  )
}
