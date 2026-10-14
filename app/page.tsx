import Link from 'next/link'
import { Caramelo } from '@/components/Caramelo'
import { CourseCards } from '@/components/CoursePicker'
import { Icon } from '@/components/Icon'
import { ProductPreview } from '@/components/ProductPreview'

export const metadata = {
  title: 'LinguaKit — aprenda inglês ou português sozinho, de graça',
  description:
    'Teste de nível em 10 minutos, 50 unidades do A1 ao C2 e mais de 1.700 exercícios falados — no sotaque do lugar para onde você vai. Gratuito.',
}

/**
 * The page people are sent to.
 *
 * It follows the order a stranger needs: what this is, which door is yours,
 * what a question actually looks like, why it is built this way, the doubts
 * that stop someone, and then the ask. The product picture sits high on
 * purpose — before it, the page talked about the course without ever showing
 * it, which is the one thing a visitor is really trying to find out.
 *
 * Written in Portuguese, since that is who it will be shared with, while the
 * two cards stay bilingual so an English speaker still finds theirs.
 *
 * Every number here is counted from the curriculum. There are no testimonials
 * and no user count: inventing either is the cheapest thing on a landing page
 * and the fastest way to deserve nobody's trust. What stands in for proof is
 * being specific about what is actually inside.
 */
export default function HomePage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* 1 — What this is */}
      <header style={{ background: 'var(--panel)', color: 'var(--on-panel)', padding: '2.75rem 1.5rem 2.5rem' }}>
        <div style={{ maxWidth: 580, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: 'var(--on-panel)' }}>
            <Caramelo mood="happy" size={84} />
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.35rem', padding: '.3rem .7rem', borderRadius: 999, border: '1px solid rgba(255,255,255,.22)', fontSize: 11.5, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,.75)', marginBottom: '.9rem' }}>
            Gratuito
          </div>

          {/* Scales with the screen instead of breaking where a <br /> happened
              to be: forced at 375px it fell into three ragged lines. */}
          <h1 style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 'clamp(26px, 7.6vw, 34px)', fontWeight: 700, lineHeight: 1.18, marginBottom: '.75rem', textWrap: 'balance' }}>
            Aprenda inglês sozinho, do zero ao avançado
          </h1>
          <p style={{ fontSize: 15.5, color: 'rgba(255,255,255,.65)', lineHeight: 1.6, maxWidth: 450, margin: '0 auto' }}>
            Um teste de dez minutos diz exatamente onde você começa. Depois são
            50 unidades no seu ritmo, com tudo falado em voz alta — no sotaque
            do lugar para onde você vai.
          </p>
          <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,.4)', lineHeight: 1.5, marginTop: '.7rem' }}>
            Também ensinamos português para quem fala inglês.
          </p>
        </div>
      </header>

      {/* 2 — Which door is yours */}
      <main style={{ maxWidth: 560, margin: '0 auto', padding: '1.75rem 1.5rem 0' }}>
        <CourseCards />
      </main>

      {/* 3 — What it actually looks like */}
      <section style={{ maxWidth: 560, margin: '0 auto', padding: '2.5rem 1.5rem 0' }}>
        <h2 style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 21, fontWeight: 700, textAlign: 'center', marginBottom: '.4rem' }}>
          Uma pergunta por vez
        </h2>
        <p style={{ fontSize: 14, color: 'var(--ink3)', lineHeight: 1.6, textAlign: 'center', maxWidth: 420, margin: '0 auto 1.5rem' }}>
          Sem parede de exercícios. Você ouve, responde, e sabe na hora se
          acertou. É isto que te espera do outro lado:
        </p>
        <ProductPreview />
      </section>

      {/* The numbers, counted from the curriculum */}
      <section style={{ maxWidth: 560, margin: '0 auto', padding: '2rem 1.5rem 0' }}>
        <div style={{ display: 'flex', gap: '.5rem', textAlign: 'center' }}>
          <Figure number="6" label="níveis, do A1 ao C2" />
          <Figure number="50" label="unidades" />
          <Figure number="+1.700" label="exercícios" />
        </div>
      </section>

      {/* 4 — Why it is built this way */}
      <section style={{ maxWidth: 560, margin: '0 auto', padding: '2.25rem 1.5rem 0' }}>
        <Point
          icon="speaker"
          title="Você ouve antes de ler"
          body="Toda palavra, frase e diálogo é falada em voz alta. Cinco tipos de atividade nascem do som: ouvir e escolher, ditado, montar a frase, achar a resposta do diálogo e dizer na outra língua."
        />
        <Point
          icon="headphones"
          title="No sotaque de onde você vai"
          body="Irlanda, Austrália, Reino Unido ou Estados Unidos. Quem vai para Dublin passa o curso ouvindo o inglês que vai encontrar lá, não outro."
        />
        <Point
          icon="repeat"
          title="O que você erra volta"
          body="Errou hoje, aparece de novo amanhã. Acertou, volta daqui a três dias, depois uma semana, depois um mês — até parar de ser um erro."
        />
        <Point
          icon="target"
          title="Começa no seu nível, não no começo"
          body="O teste aponta a unidade exata por onde partir. Quem já sabe alguma coisa não perde tempo repetindo o que já sabe."
        />
      </section>

      {/* 5 — The doubts that stop someone */}
      <section style={{ maxWidth: 560, margin: '0 auto', padding: '2.25rem 1.5rem 0' }}>
        <h2 style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 21, fontWeight: 700, marginBottom: '1rem' }}>
          Perguntas honestas
        </h2>
        <Faq q="Quanto custa?" a="Nada. O curso inteiro é gratuito: as 50 unidades, os exercícios, o áudio e a revisão." />
        <Faq q="Preciso de professor?" a="Não. Ele foi feito para ser feito sozinho, do teste até o C2. Se um dia você quiser aula, dá para combinar — mas o curso não depende disso." />
        <Faq q="Quanto tempo por dia?" a="Uma rodada tem cerca de doze perguntas e dá para fazer na fila do mercado. Quantas rodadas por dia é com você." />
        <Faq q="Funciona no celular?" a="Foi desenhado para o celular primeiro. Dá para salvar na tela de início do iPhone ou do Android e usar como se fosse um aplicativo." />
        <Faq q="E se eu já souber alguma coisa?" a="Melhor ainda. O teste de dez minutos mostra o que você já domina e o que falta, e te coloca na unidade certa em vez de no começo." />
        <Faq q="Como eu sei que estou melhorando?" a="O portal mostra cada unidade concluída, sua porcentagem de acerto e a lista do que você errou — com a resposta certa ao lado." />
      </section>

      {/* 6 — The ask */}
      <section style={{ maxWidth: 560, margin: '0 auto', padding: '2.5rem 1.5rem 0', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 22, fontWeight: 700, marginBottom: '.5rem' }}>
          Comece pelo teste
        </h2>
        <p style={{ fontSize: 14, color: 'var(--ink3)', lineHeight: 1.6, marginBottom: '1.1rem', maxWidth: 400, margin: '0 auto 1.1rem' }}>
          São 30 questões e dez minutos. No fim você recebe seu nível, o que já
          domina, o que falta, e a unidade exata por onde começar.
        </p>
        <Link
          href="/test?lang=en"
          style={{ display: 'inline-flex', alignItems: 'center', minHeight: 50, padding: '.9rem 1.6rem', borderRadius: 12, background: 'var(--green)', color: 'var(--on-panel)', fontSize: 15.5, fontWeight: 700, textDecoration: 'none' }}
        >
          Fazer o teste de inglês →
        </Link>
        <div style={{ marginTop: '.8rem' }}>
          <Link href="/test?lang=pt" style={{ fontSize: 13.5, color: 'var(--ink3)', display: 'inline-block', padding: '.85rem .35rem', margin: '-.85rem -.35rem' }}>
            Looking for the Portuguese course?
          </Link>
        </div>
      </section>

      <footer style={{ maxWidth: 560, margin: '2.5rem auto 0', padding: '2.5rem 1.5rem 2rem', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
        <div style={{ fontSize: 13, color: 'var(--ink3)', lineHeight: 1.9 }}>
          <div>
            Já tem conta?{' '}
            <Link href="/entrar" style={{ color: 'var(--ink)', fontWeight: 600, display: 'inline-block', padding: '.85rem .35rem', margin: '-.85rem -.35rem' }}>
              Entrar
            </Link>
          </div>
          <div>
            Already have an account?{' '}
            <Link href="/entrar" style={{ color: 'var(--ink)', fontWeight: 600, display: 'inline-block', padding: '.85rem .35rem', margin: '-.85rem -.35rem' }}>
              Sign in
            </Link>
          </div>
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

function Figure({ number, label }: { number: string; label: string }) {
  return (
    <div style={{ flex: 1, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '.9rem .4rem' }}>
      <div style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 22, fontWeight: 700, lineHeight: 1.1 }}>
        {number}
      </div>
      <div style={{ fontSize: 11, color: 'var(--ink3)', marginTop: '.25rem', lineHeight: 1.35 }}>{label}</div>
    </div>
  )
}

function Point({ icon, title, body }: { icon: 'speaker' | 'headphones' | 'repeat' | 'target'; title: string; body: string }) {
  return (
    <div style={{ display: 'flex', gap: '.85rem', marginBottom: '1.5rem' }}>
      <div style={{ flexShrink: 0, marginTop: 3, color: 'var(--ink3)' }}>
        <Icon name={icon} size={19} />
      </div>
      <div>
        <h3 style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 17, fontWeight: 700, marginBottom: '.3rem' }}>
          {title}
        </h3>
        <p style={{ fontSize: 14, color: 'var(--ink3)', lineHeight: 1.65 }}>{body}</p>
      </div>
    </div>
  )
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <details style={{ borderBottom: '1px solid var(--border)' }}>
      <summary style={{ cursor: 'pointer', listStyle: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', minHeight: 52, fontSize: 14.5, fontWeight: 600 }}>
        {q}
        <span aria-hidden style={{ color: 'var(--ink3)', fontSize: 18, lineHeight: 1 }}>
          <span className="lk-faq-closed">+</span>
          <span className="lk-faq-open">−</span>
        </span>
      </summary>
      <p style={{ fontSize: 14, color: 'var(--ink3)', lineHeight: 1.65, padding: '0 0 .9rem' }}>{a}</p>
    </details>
  )
}
