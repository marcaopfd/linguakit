import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
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
 * ─── Regra um: nada aqui pode ser inventado ─────────────────────────────
 *
 * Os números vêm de `numerosDoProduto()`, que conta o conteúdo de verdade;
 * as dezoito situações são lidas do registro das trilhas, com o nome e a
 * promessa que o aluno vai ver lá dentro; as frases de exemplo existem na
 * lição 1.
 *
 * O que NÃO está aqui, de propósito: depoimento de aluno. O produto ainda
 * não tem aluno pagante, e escrever "a Ana conseguiu o emprego" seria
 * fabricar prova social. Também não há contador regressivo, "últimas vagas"
 * nem preço riscado que nunca existiu. Vendendo para quem está prestes a
 * mudar de país, a confiança é o ativo; queimá-la num truque de urgência é
 * caro e burro.
 *
 * ─── Regra dois: a composição é o argumento ─────────────────────────────
 *
 * A primeira versão desta página era honesta e completa, e parecia genérica.
 * O defeito não era o texto: era a forma. Dez seções do mesmo tamanho, uma
 * embaixo da outra, tudo na mesma largura, e uma classe de animação só
 * aplicada a todos os elementos — título, cartão, número e parágrafo subindo
 * 26px ao mesmo tempo, na mesma curva. Dezoito cartões fazendo isso juntos
 * é um metrônomo, não uma onda.
 *
 * O que mudou:
 *
 *   - A página tem DOIS ATOS. O primeiro é escuro e é o problema: o herói e
 *     "você aprendeu a dizer I would like a coffee" moram na mesma
 *     superfície, então a abertura é um bloco só em vez de duas faixas. A
 *     quebra para o claro é a entrada do produto, e é a única virada brusca
 *     de propósito.
 *   - As dezoito situações saíram da parede de cartões e entraram num
 *     trilho horizontal. Isso não é efeito: uma grade de dezoito retângulos
 *     é percorrida com o olho e esquecida; um trilho é percorrido com o
 *     dedo. O argumento da página é que o curso é organizado por situação —
 *     o trilho é essa frase em movimento.
 *   - A negociação do mercado avança conforme a pessoa rola. Três balões
 *     parados não mostram que negociar tem turnos; vê-los chegar na ordem,
 *     sim. É a animação mais justificada daqui, porque explica o produto em
 *     vez de enfeitá-lo.
 *   - O movimento passou a vir do PAPEL de cada elemento (`lp-lead`,
 *     `lp-apoio`, `lp-enfeite-rola`), e a maior parte da página não se move.
 *
 * Decisões de corte, que contam tanto quanto as de adicionar: não há palavra
 * girando no título (é o clichê de landing page, e repetiria o que o
 * parágrafo já diz), não há parallax de fundo, e os dezoito cartões não
 * entram em cascata — o trilho carrega todos de uma vez, porque um contêiner
 * tem uma entrada só.
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

/** O título em linhas, para cada uma subir da sua própria fenda. */
const TITULO_LINHAS = ['Inglês para quem', 'vai morar fora.']

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

/** A conversa do mercado, que é a da lição de pechinchar. */
const NEGOCIACAO = [
  { quem: 'vendedor' as const, texto: 'This one? Eight hundred baht. Very good quality, handmade.' },
  { quem: 'voce' as const, texto: "That's a bit more than I wanted to spend." },
  { quem: 'vendedor' as const, texto: 'For you, seven hundred. Final price.' },
]

const ESCOLHAS = [
  { texto: "I'll think about it. Thank you.", nota: 'sair é uma jogada' },
  { texto: 'Would you do four hundred?', nota: 'âncora baixa', destaque: true },
  { texto: 'Okay, seven hundred is fine.', nota: 'aceitar cedo demais' },
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

  /** Texto claro sobre o painel. Alfa 0,5 ou mais em texto pequeno: 4,91 de
      contraste no tema claro e 4,76 no escuro, calculados, não estimados. */
  const claro = (alfa: number) => `color-mix(in srgb, var(--on-panel) ${Math.round(alfa * 100)}%, transparent)`

  return (
    <div className="lp" style={{ background: 'var(--cream)', color: 'var(--ink)' }}>
      <EstilosDaLanding />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* A barra flutuante chega quando o herói sai. Enquanto o botão do
          herói está na tela, uma segunda cópia dele ali em cima é ruído;
          depois, é o que mantém a ação ao alcance do polegar. */}
      <header className="lp-topo">
        <Link href="/ingles-para-morar-fora" className="lp-topo-marca">LinguaKit</Link>
        <Link href="/test?lang=en" className="lp-cta-pequeno">
          Teste de nível — grátis
        </Link>
        <div className="lp-progresso" aria-hidden />
      </header>

      {/* ═════════════════ ATO I — O PROBLEMA (escuro) ═════════════════ */}
      <div className="lp-grao" style={{ background: 'var(--panel)', color: 'var(--on-panel)' }}>

        {/* ─────────── 1. O gancho ─────────── */}
        {/* `overflow: clip`, nunca `hidden`. As duas cortam o rabisco que
            escapa, mas `hidden` transforma a seção num CONTÊINER DE ROLAGEM —
            e aí a linha de tempo do herói passa a medir a rolagem DESTA
            seção, que nunca rola. A barra do topo ficava presa em 51% e não
            aparecia nunca. `clip` corta sem criar scroller. */}
        <section className="lp-secao" style={{ position: 'relative', overflow: 'clip', paddingTop: 'clamp(3.5rem, 9vw, 7rem)' }}>
          <div className="lp-rabisco" aria-hidden>
            <Rabisco largura={460} />
          </div>

          <div className="lp-centro lp-heroi lp-entra" style={{ position: 'relative', zIndex: 1 }}>
            <div className="lp-olho lp-enfeite" style={{ color: 'var(--accent)', ['--atraso' as string]: '0ms' } as CSSProperties}>
              Para quem vai
            </div>

            <h1 className="lp-display" style={{ marginTop: '1.15rem', ['--atraso' as string]: '0ms' } as CSSProperties}>
              {TITULO_LINHAS.map((linha, i) => (
                <span key={linha} className="lp-fenda" style={{ ['--atraso' as string]: `${i * 95}ms` } as CSSProperties}>
                  <span>{linha}</span>
                </span>
              ))}
            </h1>

            <p
              className="lp-display-2"
              style={{ color: claro(.45), marginTop: '.7rem', maxWidth: '24ch', ['--atraso' as string]: '190ms' } as CSSProperties}
            >
              E para quem vai só passear, mas não quer passar aperto.
            </p>

            <p className="lp-lead" style={{ color: claro(.72), marginTop: '2.2rem', maxWidth: '40ch', ['--atraso' as string]: '250ms' } as CSSProperties}>
              Um curso organizado pelo <strong style={{ color: 'var(--on-panel)' }}>motivo</strong> de
              quem estuda — imigração, aluguel, entrevista, obra, cozinha, mercado —
              e não pelo capítulo de gramática.
            </p>

            <div
              style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '.75rem', marginTop: '2.5rem', ['--atraso' as string]: '310ms' } as CSSProperties}
            >
              <Link href="/test?lang=en" className="lp-cta">
                Descobrir meu nível — grátis
              </Link>
              <Link href="/cadastro" className="lp-link-fantasma">
                Ou criar minha conta
              </Link>
            </div>

            <p style={{ fontSize: 13.5, color: claro(.55), marginTop: '1.2rem', lineHeight: 1.6, ['--atraso' as string]: '360ms' } as CSSProperties}>
              O curso do A1 ao C2 é de graça, sem prazo e sem cartão.<br />
              Dez minutos de teste e você já sabe por onde começar.
            </p>
          </div>
        </section>

        {/* ─────────── 2. O problema ───────────
            O parágrafo que carrega o argumento acende palavra por palavra
            conforme a pessoa rola. Não é enfeite: ritma a leitura da única
            frase da página que precisa ser lida inteira. */}
        <section className="lp-secao" style={{ paddingTop: 'clamp(2rem, 6vw, 4rem)' }}>
          <div className="lp-estreito">
            <h2 className="lp-display-2 lp-lead">
              Você aprendeu a dizer<br />
              <span style={{ color: claro(.42) }}>&ldquo;I would like a coffee.&rdquo;</span>
            </h2>

            <p className="lp-display-3 lp-apoio" style={{ color: 'var(--accent)', marginTop: '1.9rem' }}>
              O oficial da imigração não vai perguntar sobre café.
            </p>

            <p className="lp-corpo" style={{ color: claro(.72), marginTop: '1.7rem' }}>
              <Acende
                texto="Ele vai fazer cinco perguntas, sempre as mesmas, e esperar respostas de três palavras. Depois vem o corretor com um contrato, o encarregado gritando numa cozinha, o vendedor dobrando o preço porque percebeu o seu sotaque."
                de={6}
                ate={52}
              />
            </p>

            <p className="lp-corpo lp-apoio" style={{ color: claro(.55), marginTop: '1.4rem' }}>
              Nenhum desses momentos está no capítulo de <em>present perfect</em>.
              É por isso que este curso não começa pelo nível. Começa pelo que
              você vai fazer.
            </p>
          </div>
        </section>
      </div>

      {/* ═════════════════ ATO II — O PRODUTO (claro) ═════════════════ */}

      {/* ─────────── 3. A prova, em números ─────────── */}
      <section className="lp-secao">
        <div className="lp-centro">
          <div className="lp-medida">
            <div className="lp-olho lp-enfeite-rola" style={{ color: 'var(--ink3)' }}>Escrito à mão</div>
            <h2 className="lp-display-2 lp-lead" style={{ marginTop: '1rem' }}>
              Frase por frase,<br />por uma pessoa.
            </h2>
            <p className="lp-lead lp-apoio" style={{ color: 'var(--ink2)', marginTop: '1.1rem' }}>
              Nada aqui foi gerado na hora por um robô. Cada frase foi escolhida
              porque alguém precisa dela num balcão.
            </p>
          </div>

          <div className="lp-numeros" style={{ marginTop: 'clamp(2.5rem, 6vw, 4rem)' }}>
            <Numero valor={n.modulos} rotulo="módulos de trilha" nota={`${n.trilhas} trilhas: viagem e mudança`} />
            <Numero valor={n.frases} rotulo="frases en/pt" nota="com a armadilha de cada uma" />
            <Numero valor={n.exercicios} rotulo="exercícios" nota="ouvir, escrever e gramática" />
            <Numero valor={n.conversas} rotulo="conversas" nota="para treinar a negociação" />
            <Numero valor={n.musicas} rotulo="músicas" nota="com trecho e perguntas" />
            <Numero valor={50} rotulo="unidades grátis" nota="o curso inteiro, A1 ao C2" />
          </div>
        </div>
      </section>

      {/* ─────────── 4. O trilho das situações ───────────
          A seção prende no desktop e o trilho anda com a rolagem; no celular
          é rolagem de dedo com encaixe. O deslocamento é calculado a partir
          do número de situações, que vem dos dados — se uma trilha crescer,
          o trilho cresce com ela sem ninguém mexer aqui. */}
      <section
        className="lp-trilho-wrap"
        style={{ ['--n' as string]: situacoes.length, background: 'var(--paper)' } as CSSProperties}
      >
        <div className="lp-trilho-sticky">
          <div style={{ width: '100%' }}>
            <div className="lp-secao-apertada" style={{ paddingBottom: 0 }}>
              <div className="lp-centro">
                <div className="lp-medida">
                  <div className="lp-olho lp-enfeite-rola" style={{ color: 'var(--ink3)' }}>
                    O índice do curso
                  </div>
                  <h2 className="lp-display-2 lp-lead" style={{ marginTop: '1rem' }}>
                    As {situacoes.length} situações que<br />realmente acontecem.
                  </h2>
                  <p className="lp-apoio" style={{ fontSize: '1rem', lineHeight: 1.65, color: 'var(--ink2)', marginTop: '.9rem' }}>
                    Cada módulo termina numa frase que começa com &ldquo;Você
                    consegue&rdquo;. Se no fim você não conseguir, o módulo
                    falhou — e é assim que a gente mede.
                  </p>
                </div>
              </div>
            </div>

            <div className="lp-trilho" style={{ marginTop: 'clamp(1.75rem, 4vw, 2.75rem)' }}>
              {situacoes.map((m, i) => (
                <article key={m.id} className="lp-situacao">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '.5rem' }}>
                    <span style={{ fontSize: 22 }} aria-hidden>{m.emoji}</span>
                    <span className="lp-olho" style={{ color: 'var(--ink3)', fontSize: 10.5 }}>
                      {i < viagem.modulos.length ? 'Viagem' : 'Morar fora'}
                    </span>
                  </div>
                  <h3 className="lp-display-3" style={{ fontSize: '1.15rem', marginTop: '.9rem' }}>
                    {m.nome}
                  </h3>
                  <p style={{ fontSize: '.92rem', lineHeight: 1.6, color: 'var(--ink2)', marginTop: '.45rem' }}>
                    {m.consegue}
                  </p>
                </article>
              ))}
            </div>

            <div className="lp-trilho-regua" aria-hidden />
          </div>
        </div>
      </section>

      {/* ─────────── 5. A conversa ─────────── */}
      <section className="lp-secao lp-grao" style={{ background: 'var(--panel)', color: 'var(--on-panel)' }}>
        <div
          className="lp-centro"
          style={{ display: 'grid', gap: 'clamp(2.5rem, 6vw, 5rem)', gridTemplateColumns: 'repeat(auto-fit, minmax(19rem, 1fr))', alignItems: 'center' }}
        >
          <div>
            <div className="lp-olho lp-enfeite-rola" style={{ color: 'var(--accent)' }}>
              A parte que ninguém ensina
            </div>
            <h2 className="lp-display-2 lp-lead" style={{ marginTop: '1.1rem' }}>
              O vendedor pede 800.<br />Você tem três cortes.
            </h2>
            <p className="lp-lead lp-apoio" style={{ color: claro(.72), marginTop: '1.4rem' }}>
              Saber dizer &ldquo;how much is it?&rdquo; é fácil. Difícil é o que
              vem depois: achar caro sem ofender, começar baixo, aguentar o
              silêncio e fechar.
            </p>
            <p className="lp-apoio" style={{ fontSize: '1rem', lineHeight: 1.7, color: claro(.6), marginTop: '1.2rem' }}>
              São {n.conversas} conversas com personagem — o vendedor do
              mercado, o taxista sem taxímetro, a recepção do hotel, o
              corretor, o chef na entrevista. Cada escolha muda o preço, e no
              fim você vê quanto economizou e o que daria para ter dito melhor.
            </p>
            <p className="lp-apoio" style={{ fontSize: '.9rem', lineHeight: 1.6, color: claro(.55), marginTop: '1.3rem' }}>
              Sem inteligência artificial. Cada resposta do personagem foi
              escrita à mão, o que significa que ela é sempre a mesma, sempre
              correta, e funciona com o celular no modo avião.
            </p>
          </div>

          <div className="lp-conversa" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="lp-fone">
              <div className="lp-fone-tela" style={{ padding: '1.15rem' }}>
                <div className="lp-olho" style={{ color: 'var(--ink3)', fontSize: 10.5 }}>
                  Mercado · pechinchar
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '.5rem', marginTop: '.5rem' }}>
                  <span style={{ fontSize: 27, fontWeight: 800, letterSpacing: '-0.035em' }}>฿800</span>
                  <span style={{ fontSize: 12, color: 'var(--ink3)' }}>→ meta ฿520</span>
                </div>

                {NEGOCIACAO.map((fala, i) => (
                  <Balao key={fala.texto} quem={fala.quem} texto={fala.texto} de={14 + i * 7} />
                ))}

                <div
                  className="lp-turno lp-olho"
                  style={{ marginTop: '1rem', color: 'var(--ink3)', fontSize: 10.5, ['--de' as string]: '35%', ['--ate' as string]: '43%' } as CSSProperties}
                >
                  Sua vez
                </div>
                {ESCOLHAS.map((e, i) => (
                  <Opcao key={e.texto} texto={e.texto} nota={e.nota} destaque={e.destaque} de={38 + i * 4} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── 6. Kit + músicas ─────────── */}
      <section className="lp-secao">
        <div className="lp-centro" style={{ display: 'grid', gap: '1.1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(19rem, 1fr))' }}>
          <Destaque
            icone="book"
            titulo="O kit de bolso"
            texto="As 50 frases que mais importam da sua trilha, num PDF de duas páginas. Para a hora em que você está no balcão, sem dados e com fila atrás — que é exatamente a hora em que o aplicativo não abre."
          />
          <Destaque
            icone="headphones"
            titulo={`${n.musicas} músicas`}
            texto="Do pop ao rap, agrupadas por dificuldade de ouvido. Você recebe o vocabulário do tema antes de dar play, ouve um trecho quantas vezes quiser — em 0,75× quando a fala for rápida — e no fim escreve o que conseguiu pegar."
          />
        </div>
      </section>

      {/* ─────────── 7. O que é grátis ─────────── */}
      <section className="lp-secao" style={{ background: 'var(--paper)' }}>
        <div className="lp-estreito">
          <h2 className="lp-display-2 lp-lead">Grátis de verdade,<br />e o que custa.</h2>
          <p className="lp-lead lp-apoio" style={{ color: 'var(--ink2)', marginTop: '1rem' }}>
            Não é teste de sete dias que vira cobrança. O que é grátis continua
            grátis, sem cartão e sem prazo.
          </p>

          <div style={{ marginTop: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
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

      {/* ─────────── 8. O preço ─────────── */}
      <section className="lp-secao lp-grao" style={{ background: 'var(--panel)', color: 'var(--on-panel)' }}>
        <div className="lp-estreito lp-preco" style={{ textAlign: 'center' }}>
          <div className="lp-olho" style={{ color: 'var(--accent)' }}>O plano completo</div>
          <div className="lp-display" style={{ marginTop: '1.1rem', fontSize: 'clamp(3.5rem, 13vw, 7rem)' }}>
            {emReais(PRECOS.annual.centavos)}
          </div>
          <p className="lp-lead" style={{ color: claro(.72), marginTop: '.5rem' }}>
            por ano — {mensalidadeDoAnual()} por mês
          </p>
          <p style={{ fontSize: '.95rem', color: claro(.55), marginTop: '1.2rem', lineHeight: 1.65 }}>
            Ou {emReais(PRECOS.monthly.centavos)} por mês, para cancelar quando quiser.<br />
            Sem multa e sem fidelidade — e cancelar não apaga nada: a viagem
            acaba, o seu progresso fica.
          </p>
          <p style={{ fontSize: '.92rem', color: claro(.5), marginTop: '1.4rem', lineHeight: 1.65 }}>
            Menos do que uma aula particular de uma hora. E a aula não vai
            com você para o balcão do aeroporto.
          </p>
        </div>
      </section>

      {/* ─────────── 9. Objeções ─────────── */}
      <section className="lp-secao">
        <div className="lp-estreito">
          <h2 className="lp-display-2 lp-lead" style={{ marginBottom: '1.8rem' }}>
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

      {/* ─────────── 10. O pedido ─────────── */}
      <section className="lp-secao" style={{ background: 'var(--accent)', color: 'var(--on-accent)', textAlign: 'center' }}>
        <div className="lp-estreito">
          <h2 className="lp-display lp-lead" style={{ fontSize: 'clamp(2.2rem, 7vw, 4.25rem)' }}>
            Você vai mesmo,<br />ou ainda está pensando?
          </h2>
          <p className="lp-lead lp-apoio" style={{ marginTop: '1.4rem', opacity: .78, maxWidth: '36ch', marginInline: 'auto' }}>
            Se vai, comece hoje: dez minutos de teste e a primeira lição da sua
            trilha já está aberta, sem pagar nada.
          </p>
          <div className="lp-apoio" style={{ marginTop: '2.3rem' }}>
            <Link
              href="/test?lang=en"
              className="lp-cta"
              style={{ background: 'var(--panel)', color: 'var(--on-panel)' }}
            >
              Começar agora — é grátis
            </Link>
          </div>
          <p className="lp-apoio" style={{ fontSize: 13.5, marginTop: '1.3rem', opacity: .66 }}>
            Já tem conta?{' '}
            <Link href="/entrar" style={{ color: 'var(--on-accent)', fontWeight: 700 }}>Entrar</Link>
          </p>
        </div>
      </section>

      <footer style={{ padding: '2.75rem var(--gutter)', textAlign: 'center', fontSize: 13, color: 'var(--ink3)', lineHeight: 2 }}>
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

/**
 * O texto que acende palavra por palavra conforme a página rola.
 *
 * Cada palavra recebe o seu próprio trecho da rolagem num custom property,
 * porque animação com linha de tempo de rolagem ignora `animation-delay` —
 * quem manda é o `animation-range`. As palavras saem de `split(' ')` e
 * voltam com o espaço, então o texto continua selecionável, copiável e lido
 * por leitor de tela como uma frase só.
 */
function Acende({ texto, de, ate }: { texto: string; de: number; ate: number }) {
  const palavras = texto.split(' ')
  const passo = (ate - de) / Math.max(palavras.length - 1, 1)
  return (
    <span className="lp-acende">
      {palavras.map((palavra, i) => (
        <span
          key={i}
          style={{
            ['--de' as string]: `${(de + i * passo).toFixed(2)}%`,
            ['--ate' as string]: `${(de + i * passo + 9).toFixed(2)}%`,
          } as CSSProperties}
        >
          {palavra}
          {i < palavras.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  )
}

function Numero({ valor, rotulo, nota }: { valor: number; rotulo: string; nota: string }) {
  return (
    <div className="lp-ficha lp-apoio">
      <div className="lp-numero">{valor}</div>
      <div style={{ fontSize: '1rem', fontWeight: 700, marginTop: '.45rem', letterSpacing: '-0.012em' }}>{rotulo}</div>
      <div style={{ fontSize: '.86rem', color: 'var(--ink3)', marginTop: '.2rem', lineHeight: 1.5 }}>{nota}</div>
    </div>
  )
}

function Destaque({ icone, titulo, texto }: { icone: 'book' | 'headphones'; titulo: string; texto: string }) {
  return (
    <div className="lp-cartao lp-apoio" style={{ padding: 'clamp(1.6rem, 4vw, 2.6rem)' }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 46, height: 46, borderRadius: 14, background: 'var(--accent)', color: 'var(--on-accent)' }}>
        <Icon name={icone} size={22} />
      </span>
      <h3 className="lp-display-2" style={{ fontSize: 'clamp(1.45rem, 3vw, 2rem)', marginTop: '1.2rem' }}>
        {titulo}
      </h3>
      <p className="lp-corpo" style={{ color: 'var(--ink2)', marginTop: '.65rem', fontSize: '1rem' }}>
        {texto}
      </p>
    </div>
  )
}

function Balao({ quem, texto, de }: { quem: 'vendedor' | 'voce'; texto: string; de: number }) {
  const meu = quem === 'voce'
  return (
    <div
      className="lp-turno"
      style={{
        display: 'flex', justifyContent: meu ? 'flex-end' : 'flex-start', marginTop: '.55rem',
        ['--de' as string]: `${de}%`,
        ['--ate' as string]: `${de + 8}%`,
      } as CSSProperties}
    >
      <div
        lang="en"
        style={{
          maxWidth: '86%', fontSize: 12.5, lineHeight: 1.45,
          padding: '.55rem .7rem', borderRadius: 13,
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

function Opcao({ texto, nota, destaque, de }: { texto: string; nota: string; destaque?: boolean; de: number }) {
  return (
    <div
      className="lp-turno"
      style={{
        marginTop: '.4rem', padding: '.55rem .65rem', borderRadius: 11,
        background: 'var(--surface)',
        border: `1.5px solid ${destaque ? 'var(--accent-dim)' : 'var(--border)'}`,
        ['--de' as string]: `${de}%`,
        ['--ate' as string]: `${de + 6}%`,
      } as CSSProperties}
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
      className="lp-ficha"
      style={{ display: 'flex', alignItems: 'center', gap: '.9rem', paddingBlock: '.95rem' }}
    >
      <span
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 26, height: 26, borderRadius: 999, flexShrink: 0,
          background: gratis ? 'var(--accent)' : 'transparent',
          border: gratis ? 'none' : '1px solid var(--border)',
          color: gratis ? 'var(--on-accent)' : 'var(--ink3)',
        }}
      >
        {gratis ? <Icon name="check" size={14} /> : <Icon name="key" size={13} />}
      </span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'block', fontSize: '.99rem', fontWeight: 600, letterSpacing: '-0.012em' }}>{titulo}</span>
        <span style={{ display: 'block', fontSize: '.85rem', color: 'var(--ink3)', marginTop: 1 }}>{detalhe}</span>
      </span>
      <span className="lp-olho" style={{ flexShrink: 0, fontSize: 10.5, color: gratis ? 'var(--ink2)' : 'var(--ink3)', letterSpacing: '.1em' }}>
        {gratis ? 'grátis' : 'plano'}
      </span>
    </div>
  )
}
