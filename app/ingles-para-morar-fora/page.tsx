import type { Metadata } from 'next'
import Link from 'next/link'
import { Icon } from '@/components/Icon'
import { RodapeLegal } from '@/components/PaginaLegal'
import { Rabisco } from '@/components/Rabisco'
import { numerosDoProduto } from '@/lib/numeros'
import { PRECOS, emReais, mensalidadeDoAnual } from '@/lib/precos'
import { TRILHAS } from '@/lib/trilhas'
import { EstilosDaLanding } from './estilos'

/**
 * A página de vendas.
 *
 * Uma regra guiou tudo aqui: **nada nesta página pode ser inventado.** Os
 * números vêm de `numerosDoProduto()`, que conta o conteúdo de verdade; as
 * dezoito situações são lidas do registro das trilhas, com o nome e a
 * promessa que o aluno vai ver lá dentro; as frases de exemplo são frases
 * que existem na lição 1.
 *
 * O que NÃO está aqui, de propósito: depoimento de aluno. O produto ainda
 * não tem aluno pagante, e escrever "a Ana conseguiu o emprego" seria
 * fabricar prova social. No dia em que houver gente de verdade com história
 * de verdade, elas entram — e aí é a parte mais forte da página.
 *
 * Também não há contador regressivo, "últimas vagas" nem preço riscado que
 * nunca existiu. Vendendo para quem está prestes a mudar de país, a confiança
 * é o ativo; queimá-la num truque de urgência é caro e burro.
 */

const TITULO = 'Inglês para morar fora e viajar — LinguaKit'
const DESCRICAO =
  'Curso de inglês organizado pelo motivo de quem estuda: imigração, aluguel, '
  + 'entrevista de emprego, cozinha, obra e mercado. Áudio, conversas para treinar '
  + 'negociação e kit de frases para usar sem internet. Comece de graça.'

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRICAO,
  keywords: [
    'inglês para morar fora',
    'inglês para viajar',
    'inglês para imigração',
    'inglês para entrevista de emprego',
    'curso de inglês online grátis',
    'inglês para intercâmbio',
    'inglês do dia a dia',
  ],
  alternates: { canonical: '/ingles-para-morar-fora' },
  openGraph: {
    title: TITULO,
    description: DESCRICAO,
    type: 'website',
    locale: 'pt_BR',
    url: '/ingles-para-morar-fora',
  },
  twitter: { card: 'summary_large_image', title: TITULO, description: DESCRICAO },
}

const PERGUNTAS: { q: string; a: string }[] = [
  {
    q: 'Funciona mesmo sem professor?',
    a: 'Funciona para o que ele se propõe: te dar as frases certas, o áudio para ouvir, e exercício suficiente para elas saírem na hora. O que um curso sozinho não faz é te corrigir falando — para isso existe gente, e a gente não finge o contrário. O que dá para fazer aqui é chegar do outro lado sabendo o que dizer, em vez de travar.',
  },
  {
    q: 'Quanto tempo por dia?',
    a: 'Quinze minutos. Cada lição foi escrita para caber nesse tempo e terminar em alguma coisa — uma frase que você consegue dizer, não um capítulo que você leu. A Trilha Viagem inteira dá três semanas nesse ritmo; a de morar fora, seis.',
  },
  {
    q: 'E se eu for bem iniciante?',
    a: 'A Trilha Viagem começa no A1, que é do zero mesmo. As respostas da imigração têm três palavras de propósito. E se você quiser saber onde está antes de começar, o teste de nível leva dez minutos e te põe na unidade certa em vez de no começo.',
  },
  {
    q: 'O que exatamente é grátis?',
    a: 'O curso inteiro do A1 ao C2 com 50 unidades, o teste de nível, a palavra do dia, a revisão dos seus erros, o primeiro módulo de cada trilha e a primeira música de cada tipo. Sem prazo e sem cartão — não é um teste de 7 dias que vira cobrança.',
  },
  {
    q: 'Dá para cancelar?',
    a: 'Dá, a qualquer momento, sem multa e sem fidelidade — e você continua usando até o fim do período que já pagou. Cancelar não apaga a sua conta nem o seu progresso: o curso do A1 ao C2 segue aberto de graça, e se você voltar, volta de onde parou. O pagamento é pela Kiwify, com Pix, boleto ou cartão parcelado.',
  },
  {
    q: 'Tem certificado?',
    a: 'Não. Isto é um curso para você conseguir falar, não um papel para anexar. Se o que você precisa é de certificado para visto ou faculdade, o caminho é IELTS ou TOEFL, e este curso não prepara para eles.',
  },
  {
    q: 'Serve para quem vai para a Irlanda, Portugal, Estados Unidos?',
    a: 'Para qualquer lugar onde se fale inglês. As lições marcam a diferença quando ela existe — "on holiday" na Irlanda e no Reino Unido, "on vacation" nos Estados Unidos — e você escolhe o sotaque do áudio.',
  },
  {
    q: 'Preciso de internet para estudar?',
    a: 'Para as lições, sim. Mas o kit de bolso existe exatamente para a hora em que não há: são as 50 frases mais importantes da trilha num PDF que cabe no celular, para abrir no balcão do aeroporto sem dados.',
  },
]

export default function LandingPage() {
  const n = numerosDoProduto()
  const viagem = TRILHAS.find(t => t.id === 'viagem')!
  const morar = TRILHAS.find(t => t.id === 'morar-fora')!
  const situacoes = [...viagem.modulos, ...morar.modulos]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Course',
        name: 'Inglês para morar fora e viajar',
        description: DESCRICAO,
        inLanguage: 'pt-BR',
        teaches: 'Inglês para situações de viagem, imigração, moradia e trabalho no exterior',
        provider: { '@type': 'Organization', name: 'LinguaKit' },
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'online',
          courseWorkload: 'PT15M',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: PERGUNTAS.map(p => ({
          '@type': 'Question',
          name: p.q,
          acceptedAnswer: { '@type': 'Answer', text: p.a },
        })),
      },
    ],
  }

  return (
    <div className="lp" style={{ background: 'var(--cream)', color: 'var(--ink)' }}>
      <EstilosDaLanding />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ───────────────────────── 1. O gancho ───────────────────────── */}
      <section
        className="lp-secao"
        style={{ background: 'var(--panel)', color: 'var(--on-panel)', position: 'relative', overflow: 'hidden' }}
      >
        <div className="lp-rabisco" aria-hidden>
          <Rabisco largura={420} />
        </div>

        <div className="lp-centro" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 12.5, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 700 }}>
            Para quem vai
          </div>

          <h1 className="lp-display" style={{ marginTop: '1.1rem' }}>
            Inglês para quem<br />vai morar fora.
          </h1>

          <p
            className="lp-display-2"
            style={{ color: 'rgba(242,244,233,.42)', marginTop: '.6rem', maxWidth: '22ch' }}
          >
            E para quem vai só passear, mas não quer passar aperto.
          </p>

          <p className="lp-lead" style={{ color: 'rgba(242,244,233,.72)', marginTop: '2rem', maxWidth: '38ch' }}>
            Um curso organizado pelo <strong style={{ color: 'var(--on-panel)' }}>motivo</strong> de
            quem estuda — imigração, aluguel, entrevista, obra, cozinha, mercado —
            e não pelo capítulo de gramática.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', marginTop: '2.5rem' }}>
            <Link href="/test?lang=en" className="lp-cta">
              Descobrir meu nível — grátis
            </Link>
            <Link
              href="/cadastro"
              style={{ color: 'rgba(242,244,233,.7)', fontSize: 14.5, fontWeight: 600, textDecoration: 'none', padding: '1rem .5rem' }}
            >
              Ou criar minha conta
            </Link>
          </div>

          <p style={{ fontSize: 13.5, color: 'rgba(242,244,233,.55)', marginTop: '1.1rem', lineHeight: 1.6 }}>
            O curso do A1 ao C2 é de graça, sem prazo e sem cartão.<br />
            Dez minutos de teste e você já sabe por onde começar.
          </p>
        </div>
      </section>

      {/* ───────────────────────── 2. O problema ───────────────────────── */}
      <section className="lp-secao">
        <div className="lp-estreito lp-surge">
          <h2 className="lp-display-2">
            Você aprendeu a dizer<br />
            <span style={{ color: 'var(--ink3)' }}>&ldquo;I would like a coffee.&rdquo;</span>
          </h2>
          <p className="lp-lead" style={{ color: 'var(--ink2)', marginTop: '1.5rem' }}>
            O oficial da imigração não vai perguntar sobre café.
          </p>
          <p style={{ fontSize: '1.02rem', lineHeight: 1.7, color: 'var(--ink2)', marginTop: '1.2rem' }}>
            Ele vai fazer cinco perguntas, sempre as mesmas, e esperar respostas
            de três palavras. Depois vem o corretor com um contrato, o
            encarregado gritando numa cozinha, o vendedor dobrando o preço
            porque percebeu o seu sotaque. Nenhum desses momentos está no
            capítulo de <em>present perfect</em>.
          </p>
          <p style={{ fontSize: '1.02rem', lineHeight: 1.7, color: 'var(--ink2)', marginTop: '1rem' }}>
            É por isso que este curso não começa pelo nível. Começa pelo que
            você vai fazer.
          </p>
        </div>
      </section>

      {/* ───────────────────────── 3. A prova ───────────────────────── */}
      <section className="lp-secao" style={{ background: 'var(--paper)' }}>
        <div className="lp-centro lp-surge">
          <h2 className="lp-display-2" style={{ maxWidth: '18ch' }}>
            Escrito frase por frase, à mão.
          </h2>
          <p className="lp-lead" style={{ color: 'var(--ink2)', marginTop: '1rem', maxWidth: '46ch' }}>
            Nada aqui foi gerado na hora por um robô. Cada frase foi escolhida
            porque alguém precisa dela num balcão.
          </p>

          <div className="lp-grade" style={{ marginTop: '2.5rem' }}>
            <Numero valor={n.modulos} rotulo="módulos de trilha" nota={`${n.trilhas} trilhas: viagem e mudança`} />
            <Numero valor={n.frases} rotulo="frases en/pt" nota="com a armadilha de cada uma" />
            <Numero valor={n.exercicios} rotulo="exercícios" nota="ouvir, escrever e gramática" />
            <Numero valor={n.conversas} rotulo="conversas" nota="para treinar a negociação" />
            <Numero valor={n.musicas} rotulo="músicas" nota="com trecho e perguntas" />
            <Numero valor={50} rotulo="unidades grátis" nota="o curso inteiro, A1 ao C2" />
          </div>
        </div>
      </section>

      {/* ───────────────────────── 4. As situações ───────────────────────── */}
      <section className="lp-secao">
        <div className="lp-centro">
          <div className="lp-surge" style={{ maxWidth: '42rem' }}>
            <h2 className="lp-display-2">
              As {situacoes.length} situações<br />que realmente acontecem.
            </h2>
            <p className="lp-lead" style={{ color: 'var(--ink2)', marginTop: '1rem' }}>
              Cada módulo termina numa frase que começa com &ldquo;Você
              consegue&rdquo;. Se no fim você não conseguir, o módulo falhou —
              e é assim que a gente mede.
            </p>
          </div>

          <div className="lp-grade" style={{ marginTop: '2.75rem' }}>
            {situacoes.map((m, i) => (
              <div key={m.id} className="lp-cartao lp-surge">
                <div style={{ display: 'flex', alignItems: 'center', gap: '.55rem' }}>
                  <span style={{ fontSize: 20 }} aria-hidden>{m.emoji}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.09em', textTransform: 'uppercase', color: 'var(--ink3)' }}>
                    {i < viagem.modulos.length ? 'Viagem' : 'Morar fora'}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.08rem', fontWeight: 700, marginTop: '.5rem', letterSpacing: '-0.01em' }}>
                  {m.nome}
                </h3>
                <p style={{ fontSize: '.9rem', lineHeight: 1.6, color: 'var(--ink2)', marginTop: '.35rem' }}>
                  {m.consegue}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── 5. A conversa ───────────────────────── */}
      <section className="lp-secao" style={{ background: 'var(--panel)', color: 'var(--on-panel)' }}>
        <div
          className="lp-centro"
          style={{ display: 'grid', gap: 'clamp(2.5rem, 6vw, 4.5rem)', gridTemplateColumns: 'repeat(auto-fit, minmax(19rem, 1fr))', alignItems: 'center' }}
        >
          <div className="lp-surge">
            <div style={{ fontSize: 12.5, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 700 }}>
              A parte que ninguém ensina
            </div>
            <h2 className="lp-display-2" style={{ marginTop: '1rem' }}>
              O vendedor pede 800.<br />Você tem três cortes.
            </h2>
            <p className="lp-lead" style={{ color: 'rgba(242,244,233,.72)', marginTop: '1.3rem' }}>
              Saber dizer &ldquo;how much is it?&rdquo; é fácil. Difícil é o que
              vem depois: achar caro sem ofender, começar baixo, aguentar o
              silêncio e fechar.
            </p>
            <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'rgba(242,244,233,.6)', marginTop: '1.1rem' }}>
              São {n.conversas} conversas com personagem — o vendedor do
              mercado, o taxista sem taxímetro, a recepção do hotel, o
              corretor, o chef na entrevista. Cada escolha muda o preço, e no
              fim você vê quanto economizou e o que daria para ter dito melhor.
            </p>
            <p style={{ fontSize: '.88rem', lineHeight: 1.6, color: 'rgba(242,244,233,.55)', marginTop: '1.2rem' }}>
              Sem inteligência artificial. Cada resposta do personagem foi
              escrita à mão, o que significa que ela é sempre a mesma, sempre
              correta, e funciona com o celular no modo avião.
            </p>
          </div>

          <div className="lp-surge" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="lp-fone">
              <div className="lp-fone-tela" style={{ padding: '1.1rem' }}>
                <div style={{ fontSize: 10.5, letterSpacing: '.09em', textTransform: 'uppercase', color: 'var(--ink3)', fontWeight: 700 }}>
                  Mercado · pechinchar
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '.5rem', marginTop: '.45rem' }}>
                  <span style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em' }}>฿800</span>
                  <span style={{ fontSize: 12, color: 'var(--ink3)' }}>→ meta ฿520</span>
                </div>

                <Balao quem="vendedor" texto="This one? Eight hundred baht. Very good quality, handmade." />
                <Balao quem="voce" texto="That's a bit more than I wanted to spend." />
                <Balao quem="vendedor" texto="For you, seven hundred. Final price." />

                <div style={{ marginTop: '.9rem', fontSize: 10.5, letterSpacing: '.09em', textTransform: 'uppercase', color: 'var(--ink3)', fontWeight: 700 }}>
                  Sua vez
                </div>
                <Opcao texto="I'll think about it. Thank you." nota="sair é uma jogada" />
                <Opcao texto="Would you do four hundred?" nota="âncora baixa" destaque />
                <Opcao texto="Okay, seven hundred is fine." nota="aceitar cedo demais" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── 6. Kit + músicas ───────────────────────── */}
      <section className="lp-secao">
        <div className="lp-centro" style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(19rem, 1fr))' }}>
          <div className="lp-cartao lp-surge" style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: 12, background: 'var(--accent)', color: 'var(--on-accent)' }}>
              <Icon name="book" size={22} />
            </span>
            <h3 className="lp-display-2" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', marginTop: '1.1rem' }}>
              O kit de bolso
            </h3>
            <p style={{ fontSize: '1rem', lineHeight: 1.65, color: 'var(--ink2)', marginTop: '.6rem' }}>
              As 50 frases que mais importam da sua trilha, num PDF de duas
              páginas. Para a hora em que você está no balcão, sem dados e com
              fila atrás — que é exatamente a hora em que o aplicativo não
              abre.
            </p>
          </div>

          <div className="lp-cartao lp-surge" style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: 12, background: 'var(--accent)', color: 'var(--on-accent)' }}>
              <Icon name="headphones" size={22} />
            </span>
            <h3 className="lp-display-2" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', marginTop: '1.1rem' }}>
              {n.musicas} músicas
            </h3>
            <p style={{ fontSize: '1rem', lineHeight: 1.65, color: 'var(--ink2)', marginTop: '.6rem' }}>
              Do pop ao rap, agrupadas por dificuldade de ouvido. Você recebe o
              vocabulário do tema antes de dar play, ouve um trecho quantas
              vezes quiser — em 0,75× quando a fala for rápida — e no fim
              escreve o que conseguiu pegar.
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────────────── 7. O que é grátis ───────────────────────── */}
      <section className="lp-secao" style={{ background: 'var(--paper)' }}>
        <div className="lp-estreito lp-surge">
          <h2 className="lp-display-2">Grátis de verdade,<br />e o que custa.</h2>
          <p className="lp-lead" style={{ color: 'var(--ink2)', marginTop: '1rem' }}>
            Não é teste de sete dias que vira cobrança. O que é grátis continua
            grátis, sem cartão e sem prazo.
          </p>

          <div style={{ display: 'grid', gap: '.6rem', marginTop: '2rem' }}>
            <Linha titulo="Curso completo, A1 ao C2" detalhe="6 módulos, 50 unidades" tipo="gratis" />
            <Linha titulo="Teste de nível" detalhe="30 questões, dez minutos" tipo="gratis" />
            <Linha titulo="Palavra do dia e revisão dos seus erros" detalhe="todo dia, para sempre" tipo="gratis" />
            <Linha titulo="Primeiro módulo de cada trilha" detalhe="para você ver antes de decidir" tipo="gratis" />
            <Linha titulo="As trilhas inteiras" detalhe={`${n.modulos} módulos, ${n.licoes} lições`} tipo="plano" />
            <Linha titulo="As conversas" detalhe={`${n.conversas} negociações com placar`} tipo="plano" />
            <Linha titulo="Kit de bolso em PDF" detalhe="para usar sem internet" tipo="plano" />
            <Linha titulo={`As ${n.musicas} músicas`} detalhe="uma de cada tipo é aberta" tipo="plano" />
          </div>
        </div>
      </section>

      {/* ───────────────────────── 8. Preço ───────────────────────── */}
      <section className="lp-secao" style={{ background: 'var(--panel)', color: 'var(--on-panel)' }}>
        <div className="lp-estreito" style={{ textAlign: 'center' }}>
          <div className="lp-surge">
            <div style={{ fontSize: 12.5, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 700 }}>
              O plano completo
            </div>
            <div className="lp-display" style={{ marginTop: '1rem' }}>{emReais(PRECOS.annual.centavos)}</div>
            <p className="lp-lead" style={{ color: 'rgba(242,244,233,.72)', marginTop: '.6rem' }}>
              por ano — {mensalidadeDoAnual()} por mês
            </p>
            <p style={{ fontSize: '.95rem', color: 'rgba(242,244,233,.5)', marginTop: '1rem', lineHeight: 1.65 }}>
              Ou {emReais(PRECOS.monthly.centavos)} por mês, para cancelar quando quiser.<br />
              Sem multa e sem fidelidade — e cancelar não apaga nada: a viagem
              acaba, o seu progresso fica.
            </p>
            <p style={{ fontSize: '.92rem', color: 'rgba(242,244,233,.55)', marginTop: '1.3rem', lineHeight: 1.65 }}>
              Menos do que uma aula particular de uma hora. E a aula não vai
              com você para o balcão do aeroporto.
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────────────── 9. Objeções ───────────────────────── */}
      <section className="lp-secao">
        <div className="lp-estreito">
          <h2 className="lp-display-2 lp-surge" style={{ marginBottom: '1.8rem' }}>
            O que você ainda<br />está se perguntando.
          </h2>
          {PERGUNTAS.map(p => (
            <details key={p.q} className="lp-faq">
              <summary>{p.q}</summary>
              <p>{p.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ───────────────────────── 10. O pedido ───────────────────────── */}
      <section className="lp-secao" style={{ background: 'var(--accent)', color: 'var(--on-accent)', textAlign: 'center' }}>
        <div className="lp-estreito lp-surge">
          <h2 className="lp-display" style={{ fontSize: 'clamp(2.1rem, 6.5vw, 4rem)' }}>
            Você vai mesmo,<br />ou ainda está pensando?
          </h2>
          <p className="lp-lead" style={{ marginTop: '1.3rem', opacity: .78, maxWidth: '36ch', marginInline: 'auto' }}>
            Se vai, comece hoje: dez minutos de teste e a primeira lição da sua
            trilha já está aberta, sem pagar nada.
          </p>
          <div style={{ marginTop: '2.2rem' }}>
            <Link
              href="/test?lang=en"
              className="lp-cta"
              style={{ background: 'var(--panel)', color: 'var(--on-panel)' }}
            >
              Começar agora — é grátis
            </Link>
          </div>
          <p style={{ fontSize: 13.5, marginTop: '1.2rem', opacity: .62 }}>
            Já tem conta?{' '}
            <Link href="/entrar" style={{ color: 'var(--on-accent)', fontWeight: 700 }}>Entrar</Link>
          </p>
        </div>
      </section>

      <footer style={{ padding: '2.5rem var(--gutter)', textAlign: 'center', fontSize: 13, color: 'var(--ink3)', lineHeight: 2 }}>
        <div>
          <Link href="/" style={{ color: 'var(--ink2)', fontWeight: 600, textDecoration: 'none' }}>
            LinguaKit
          </Link>
          {' · '}
          <Link href="/test?lang=pt" style={{ color: 'var(--ink3)', textDecoration: 'none' }}>
            Portuguese for English speakers
          </Link>
        </div>
        {/* As legais ficam no rodapé de quem está decidindo comprar: é aqui
            que a pessoa confere quem está do outro lado antes de pagar. */}
        <div style={{ marginTop: '.4rem' }}>
          <RodapeLegal />
        </div>
      </footer>
    </div>
  )
}

function Numero({ valor, rotulo, nota }: { valor: number; rotulo: string; nota: string }) {
  return (
    <div className="lp-cartao lp-surge">
      <div className="lp-numero">{valor}</div>
      <div style={{ fontSize: '.98rem', fontWeight: 700, marginTop: '.3rem' }}>{rotulo}</div>
      <div style={{ fontSize: '.85rem', color: 'var(--ink3)', marginTop: '.15rem', lineHeight: 1.5 }}>{nota}</div>
    </div>
  )
}

function Balao({ quem, texto }: { quem: 'vendedor' | 'voce'; texto: string }) {
  const meu = quem === 'voce'
  return (
    <div style={{ display: 'flex', justifyContent: meu ? 'flex-end' : 'flex-start', marginTop: '.5rem' }}>
      <div
        lang="en"
        style={{
          maxWidth: '86%', fontSize: 12.5, lineHeight: 1.45,
          padding: '.5rem .65rem', borderRadius: 12,
          background: meu ? 'var(--accent)' : 'var(--surface)',
          color: meu ? 'var(--on-accent)' : 'var(--ink)',
          border: meu ? 'none' : '1px solid var(--border)',
        }}
      >
        {texto}
      </div>
    </div>
  )
}

function Opcao({ texto, nota, destaque }: { texto: string; nota: string; destaque?: boolean }) {
  return (
    <div
      style={{
        marginTop: '.35rem', padding: '.5rem .6rem', borderRadius: 10,
        background: 'var(--surface)',
        border: `1.5px solid ${destaque ? 'var(--accent-dim)' : 'var(--border)'}`,
      }}
    >
      <div lang="en" style={{ fontSize: 12.5, color: 'var(--ink)' }}>{texto}</div>
      <div style={{ fontSize: 10.5, color: 'var(--ink3)', marginTop: 1 }}>{nota}</div>
    </div>
  )
}

function Linha({ titulo, detalhe, tipo }: { titulo: string; detalhe: string; tipo: 'gratis' | 'plano' }) {
  const gratis = tipo === 'gratis'
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: '.8rem',
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 12, padding: '.85rem 1rem',
      }}
    >
      <span
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 26, height: 26, borderRadius: 999, flexShrink: 0,
          background: gratis ? 'var(--accent)' : 'var(--paper)',
          color: gratis ? 'var(--on-accent)' : 'var(--ink3)',
        }}
      >
        {gratis ? <Icon name="check" size={14} /> : <Icon name="key" size={13} />}
      </span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'block', fontSize: '.97rem', fontWeight: 600 }}>{titulo}</span>
        <span style={{ display: 'block', fontSize: '.84rem', color: 'var(--ink3)', marginTop: 1 }}>{detalhe}</span>
      </span>
      <span style={{ flexShrink: 0, fontSize: 11, fontWeight: 700, letterSpacing: '.07em', textTransform: 'uppercase', color: gratis ? 'var(--ink2)' : 'var(--ink3)' }}>
        {gratis ? 'grátis' : 'plano'}
      </span>
    </div>
  )
}
