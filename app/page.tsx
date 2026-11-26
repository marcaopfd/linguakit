import Link from 'next/link'
import { RodapeLegal } from '@/components/PaginaLegal'
import { Caramelo } from '@/components/Caramelo'
import { Rabisco } from '@/components/Rabisco'
import { CourseCards } from '@/components/CoursePicker'
import { Icon } from '@/components/Icon'
import { ProductPreview } from '@/components/ProductPreview'
import { numerosDoCursoGeral, numerosDoProduto } from '@/lib/numeros'
import { PRECOS, emReais } from '@/lib/precos'
import { TRILHAS } from '@/lib/trilhas'
import { EstilosDaHome } from './estilos-home'

/**
 * A porta de entrada.
 *
 * Ela não vende: encaminha. Quem chega aqui está decidindo QUAL curso é o
 * dele, e a página inteira existe para responder isso rápido e mandar a
 * pessoa para o lugar certo — o teste, a trilha, ou a página de vendas.
 *
 * ─── O que mudou, e por quê ─────────────────────────────────────────────
 *
 * 1. OS NÚMEROS ERAM FALSOS. A página anunciava "+1.700 exercícios" e o
 *    curso tem 882. Os 1.700 só fechavam somando vocabulário, falas de
 *    diálogo e erros comuns — que são conteúdo, mas não são exercício. Agora
 *    tudo vem de numerosDoCursoGeral(), contado do currículo, e um teste
 *    proíbe número cravado aqui. Exagerar não ganha aluno: custa o direito
 *    de ser levado a sério no resto da página, onde tudo é verdade.
 *
 * 2. AS TRILHAS NÃO EXISTIAM AQUI. O maior diferencial do produto — ser
 *    organizado pelo motivo de quem estuda — não era nem citado na porta de
 *    entrada. Agora elas são o bloco central, lidas de TRILHAS, com o número
 *    real de módulos de cada uma.
 *
 * 3. O PLANO ERA INVISÍVEL. Não havia uma linha sobre o que é pago. Quem
 *    quisesse assinar não tinha como descobrir que dava. Agora existe uma
 *    seção que separa o que é grátis para sempre do que o plano abre, com
 *    preço, lendo de lib/precos.ts.
 *
 * 4. A FORMA. Tipo pequeno, tudo com a mesma largura e sem movimento nenhum.
 *    Agora segue o mesmo sistema da página de vendas: curvas fortes, tracking
 *    por tamanho, movimento vindo do papel do elemento e estado de toque em
 *    tudo que se aperta.
 *
 * O que continua igual de propósito: nenhum depoimento e nenhuma contagem de
 * alunos. Inventar qualquer um dos dois é a coisa mais barata que existe
 * numa página dessas, e o jeito mais rápido de não merecer a confiança de
 * ninguém. O que faz as vezes de prova é ser específico sobre o que tem
 * dentro.
 */

const geral = numerosDoCursoGeral()

export const metadata = {
  title: 'LinguaKit — aprenda inglês ou português sozinho, de graça',
  description:
    `Teste de nível em 10 minutos, ${geral.unidades} unidades do A1 ao C2 e ${geral.exercicios} `
    + 'exercícios falados — no sotaque do lugar para onde você vai. Gratuito.',
}

const PERGUNTAS = [
  { q: 'Quanto custa?', a: `Nada para começar. O curso do A1 ao C2 é gratuito e continua gratuito: as ${geral.unidades} unidades, os exercícios, o áudio e a revisão. O plano pago abre as trilhas de viagem e de mudança, as conversas e o kit de bolso.` },
  { q: 'Preciso de professor?', a: 'Não. Ele foi feito para ser feito sozinho, do teste até o C2. E quando travar, você manda a dúvida de dentro do curso e eu respondo na mão.' },
  { q: 'Quanto tempo por dia?', a: 'Uma rodada tem cerca de doze perguntas e dá para fazer na fila do mercado. Quantas rodadas por dia é com você.' },
  { q: 'Funciona no celular?', a: 'Foi desenhado para o celular primeiro. Dá para salvar na tela de início do iPhone ou do Android e usar como se fosse um aplicativo.' },
  { q: 'E se eu já souber alguma coisa?', a: 'Melhor ainda. O teste de dez minutos mostra o que você já domina e o que falta, e te coloca na unidade certa em vez de no começo.' },
  { q: 'Como eu sei que estou melhorando?', a: 'O portal mostra cada unidade concluída, sua porcentagem de acerto e a lista do que você errou — com a resposta certa ao lado.' },
]

export default function HomePage() {
  const n = numerosDoProduto()
  const trilhas = TRILHAS.filter(t => t.disponivel)

  return (
    <div className="hm" style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <EstilosDaHome />

      {/* ───────────── 1. O que é isto ───────────── */}
      <header
        className="hm-secao hm-grao"
        style={{ background: 'var(--panel)', color: 'var(--on-panel)', position: 'relative', overflow: 'clip', paddingBottom: 'clamp(2rem, 5vw, 3rem)' }}
      >
        <div className="hm-centro hm-entra" style={{ textAlign: 'center', position: 'relative' }}>
          <div aria-hidden style={{ position: 'absolute', top: -64, left: '50%', transform: 'translateX(-50%)', opacity: .5 }}>
            <Rabisco largura={260} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <Caramelo mood="happy" size={88} />
          </div>

          <div
            className="hm-olho"
            style={{ color: 'var(--accent)', marginTop: '1.1rem', ['--atraso' as string]: '60ms' }}
          >
            Grátis, sem prazo e sem cartão
          </div>

          <h1 className="hm-display" style={{ marginTop: '.9rem', ['--atraso' as string]: '60ms' }}>
            {/* Sem <br />: a quebra forçada caía depois de "sozinho," e a
                primeira linha ainda quebrava sozinha, dando três linhas
                desiguais no celular. text-wrap: balance distribui melhor do
                que qualquer quebra que eu escolha para uma largura só. */}
            Aprenda inglês sozinho, do zero ao avançado.
          </h1>

          <p
            className="hm-lead"
            style={{ color: 'color-mix(in srgb, var(--on-panel) 72%, transparent)', maxWidth: '36rem', margin: '1.2rem auto 0', ['--atraso' as string]: '170ms' }}
          >
            Um teste de dez minutos diz exatamente onde você começa. Depois são{' '}
            {geral.unidades} unidades no seu ritmo, com tudo falado em voz alta
            — no sotaque do lugar para onde você vai.
          </p>

          <p
            style={{ fontSize: 13.5, color: 'color-mix(in srgb, var(--on-panel) 55%, transparent)', marginTop: '.8rem', ['--atraso' as string]: '230ms' }}
          >
            Também ensinamos português para quem fala inglês.
          </p>
        </div>
      </header>

      {/* ───────────── 2. Qual porta é a sua ───────────── */}
      <section className="hm-secao" style={{ paddingTop: 'clamp(1.5rem, 4vw, 2.25rem)' }}>
        <div className="hm-estreito">
          <CourseCards />
        </div>
      </section>

      {/* ───────────── 3. As trilhas ─────────────
          O diferencial do produto é ser organizado pelo MOTIVO de quem
          estuda, e isso não aparecia na porta de entrada. Os números de
          módulos vêm do registro das trilhas. */}
      <section className="hm-secao" style={{ background: 'var(--paper)' }}>
        <div className="hm-centro">
          <div className="hm-lidera" style={{ maxWidth: '34rem' }}>
            <div className="hm-olho" style={{ color: 'var(--ink3)' }}>Por onde começar</div>
            <h2 className="hm-titulo" style={{ marginTop: '.9rem' }}>
              O curso é organizado pelo seu motivo.
            </h2>
            <p className="hm-lead" style={{ color: 'var(--ink2)', marginTop: '.8rem' }}>
              Ninguém aprende inglês &ldquo;em geral&rdquo;. Aprende porque vai
              viajar, porque vai se mudar, ou porque quer subir de nível. Cada
              caminho tem o seu.
            </p>
          </div>

          <div className="hm-trilhas" style={{ marginTop: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
            {trilhas.map(t => (
              <Link
                key={t.id}
                href={t.id === 'geral' ? '/test?lang=en' : '/ingles-para-morar-fora'}
                className="hm-trilha hm-apoia"
              >
                <span style={{ fontSize: 30 }} aria-hidden>{t.emoji}</span>
                <h3 className="hm-sub" style={{ marginTop: '.85rem' }}>{t.nome}</h3>
                <p style={{ fontSize: '.92rem', lineHeight: 1.6, color: 'var(--ink2)', marginTop: '.4rem' }}>
                  {t.promessa}
                </p>
                <div className="hm-trilha-pe hm-olho" style={{ color: 'var(--ink3)' }}>
                  {t.id === 'geral'
                    ? `${geral.niveis} níveis · ${geral.unidades} unidades`
                    : `${t.modulos.length} módulos`}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── 4. O que é, por dentro ───────────── */}
      <section className="hm-secao">
        <div className="hm-estreito">
          <div className="hm-lidera" style={{ textAlign: 'center' }}>
            <h2 className="hm-titulo">Uma pergunta por vez</h2>
            <p className="hm-lead" style={{ color: 'var(--ink2)', marginTop: '.7rem' }}>
              Sem parede de exercícios. Você ouve, responde, e sabe na hora se
              acertou. É isto que te espera do outro lado:
            </p>
          </div>
          <div className="hm-apoia" style={{ marginTop: '1.75rem' }}>
            <ProductPreview />
          </div>
        </div>
      </section>

      {/* ───────────── 5. Os números, contados do conteúdo ───────────── */}
      <section className="hm-secao" style={{ paddingTop: 0 }}>
        <div className="hm-centro">
          <div className="hm-numeros">
            <Numero valor={geral.niveis} rotulo="níveis, do A1 ao C2" />
            <Numero valor={geral.unidades} rotulo="unidades" />
            <Numero valor={geral.exercicios} rotulo="exercícios falados" />
            <Numero valor={geral.palavras} rotulo="palavras com áudio" />
          </div>
        </div>
      </section>

      {/* ───────────── 6. Por que é assim ───────────── */}
      <section className="hm-secao" style={{ background: 'var(--paper)' }}>
        <div className="hm-estreito">
          <Ponto
            icon="speaker"
            title="Você ouve antes de ler"
            body="Toda palavra, frase e diálogo é falada em voz alta. Cinco tipos de atividade nascem do som: ouvir e escolher, ditado, montar a frase, achar a resposta do diálogo e dizer na outra língua."
          />
          <Ponto
            icon="headphones"
            title="No sotaque de onde você vai"
            body="Irlanda, Austrália, Reino Unido ou Estados Unidos. Quem vai para Dublin passa o curso ouvindo o inglês que vai encontrar lá, não outro."
          />
          <Ponto
            icon="repeat"
            title="O que você erra volta"
            body="Errou hoje, aparece de novo amanhã. Acertou, volta daqui a três dias, depois uma semana, depois um mês — até parar de ser um erro."
          />
          <Ponto
            icon="target"
            title="Começa no seu nível, não no começo"
            body="O teste aponta a unidade exata por onde partir. Quem já sabe alguma coisa não perde tempo repetindo o que já sabe."
          />
        </div>
      </section>

      {/* ───────────── 7. O que é grátis, e o que custa ─────────────
          Não havia uma linha sobre o plano nesta página. Quem quisesse
          assinar não tinha como descobrir que dava. */}
      <section className="hm-secao hm-grao" style={{ background: 'var(--panel)', color: 'var(--on-panel)' }}>
        <div className="hm-centro">
          <div className="hm-lidera" style={{ maxWidth: '34rem' }}>
            <div className="hm-olho" style={{ color: 'var(--accent)' }}>Grátis de verdade</div>
            <h2 className="hm-titulo" style={{ marginTop: '.9rem' }}>
              O curso inteiro não custa nada.<br />O plano abre o resto.
            </h2>
          </div>

          <div
            style={{
              display: 'grid', gap: '1rem', marginTop: 'clamp(1.75rem, 4vw, 2.5rem)',
              gridTemplateColumns: 'repeat(auto-fit, minmax(17rem, 1fr))',
            }}
          >
            <div className="hm-apoia" style={{ borderTop: '1px solid color-mix(in srgb, var(--on-panel) 18%, transparent)', paddingTop: '1rem' }}>
              <div className="hm-olho" style={{ color: 'var(--accent)' }}>Sempre grátis</div>
              <p style={{ fontSize: '.98rem', lineHeight: 1.7, color: 'color-mix(in srgb, var(--on-panel) 76%, transparent)', marginTop: '.7rem' }}>
                As {geral.unidades} unidades do A1 ao C2, o teste de nível, a
                palavra do dia, a revisão dos seus erros, o primeiro módulo de
                cada trilha e a primeira música de cada tipo. Sem prazo e sem
                cartão.
              </p>
            </div>

            <div className="hm-apoia" style={{ borderTop: '1px solid color-mix(in srgb, var(--on-panel) 18%, transparent)', paddingTop: '1rem' }}>
              <div className="hm-olho" style={{ color: 'color-mix(in srgb, var(--on-panel) 55%, transparent)' }}>
                No plano
              </div>
              <p style={{ fontSize: '.98rem', lineHeight: 1.7, color: 'color-mix(in srgb, var(--on-panel) 76%, transparent)', marginTop: '.7rem' }}>
                As trilhas inteiras ({n.modulos} módulos), as {n.conversas} conversas
                com personagem, as {n.musicas} músicas e o kit de bolso em PDF.
                A partir de {emReais(PRECOS.monthly.centavos)} por mês.
              </p>
              <Link href="/ingles-para-morar-fora" className="hm-link" style={{ color: 'var(--accent)', marginTop: '.8rem' }}>
                Ver o que tem dentro →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── 8. Perguntas ───────────── */}
      <section className="hm-secao">
        <div className="hm-estreito">
          <h2 className="hm-titulo hm-lidera" style={{ marginBottom: '1.25rem' }}>
            Perguntas honestas
          </h2>
          {PERGUNTAS.map(p => (
            <details key={p.q} className="hm-faq">
              <summary>{p.q}</summary>
              <p>{p.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ───────────── 9. O pedido ───────────── */}
      <section className="hm-secao" style={{ background: 'var(--accent)', color: 'var(--on-accent)', textAlign: 'center' }}>
        <div className="hm-estreito">
          <h2 className="hm-display hm-lidera" style={{ fontSize: 'clamp(1.9rem, 6vw, 3rem)' }}>
            Comece pelo teste.
          </h2>
          <p className="hm-lead hm-apoia" style={{ opacity: .8, marginTop: '1rem', maxWidth: '30rem', marginInline: 'auto' }}>
            São 30 questões e dez minutos. No fim você recebe seu nível, o que
            já domina, o que falta, e a unidade exata por onde começar.
          </p>
          <div className="hm-apoia" style={{ marginTop: '1.9rem' }}>
            <Link href="/test?lang=en" className="hm-cta" style={{ background: 'var(--panel)', color: 'var(--on-panel)' }}>
              Fazer o teste de inglês →
            </Link>
          </div>
          <p className="hm-apoia" style={{ fontSize: 13.5, marginTop: '1.2rem', opacity: .75, lineHeight: 2 }}>
            Não quer fazer o teste agora?{' '}
            <Link href="/cadastro" className="hm-link" style={{ color: 'var(--on-accent)' }}>Criar minha conta</Link>
            <br />
            <Link href="/test?lang=pt" className="hm-link" style={{ color: 'var(--on-accent)', fontWeight: 500 }}>
              Looking for the Portuguese course?
            </Link>
          </p>
        </div>
      </section>

      <footer className="hm-secao" style={{ textAlign: 'center', paddingTop: 'clamp(2rem, 5vw, 3rem)' }}>
        <div style={{ fontSize: 13.5, color: 'var(--ink3)', lineHeight: 2 }}>
          <div>
            Já tem conta? <Link href="/entrar" className="hm-link">Entrar</Link>
          </div>
          <div>
            Already have an account? <Link href="/entrar" className="hm-link">Sign in</Link>
          </div>
          <div>
            <Link href="/duvidas" className="hm-link" style={{ color: 'var(--ink3)', fontWeight: 500 }}>
              Dúvidas respondidas
            </Link>
          </div>
        </div>
        <div style={{ marginTop: '.75rem' }}>
          <RodapeLegal />
        </div>
        <Link
          href="/painel"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '.35rem', minHeight: 44, padding: '0 .5rem', marginTop: '.75rem', fontSize: 12, color: 'var(--ink3)', textDecoration: 'none' }}
        >
          <Icon name="key" size={14} /> Espaço do professor
        </Link>
      </footer>
    </div>
  )
}

function Numero({ valor, rotulo }: { valor: number; rotulo: string }) {
  return (
    <div className="hm-numero-bloco hm-apoia">
      <div className="hm-numero">{valor}</div>
      <div style={{ fontSize: '.88rem', color: 'var(--ink3)', marginTop: '.35rem', lineHeight: 1.45 }}>
        {rotulo}
      </div>
    </div>
  )
}

function Ponto({ icon, title, body }: { icon: 'speaker' | 'headphones' | 'repeat' | 'target'; title: string; body: string }) {
  return (
    <div className="hm-apoia" style={{ display: 'flex', gap: '1rem', marginBottom: '1.75rem' }}>
      <span
        style={{
          flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 40, height: 40, borderRadius: 11,
          background: 'var(--accent)', color: 'var(--on-accent)',
        }}
      >
        <Icon name={icon} size={19} />
      </span>
      <div>
        <h3 className="hm-sub">{title}</h3>
        <p style={{ fontSize: '.95rem', color: 'var(--ink2)', lineHeight: 1.7, marginTop: '.35rem' }}>{body}</p>
      </div>
    </div>
  )
}
