import Link from 'next/link'
import { Icon } from '@/components/Icon'
import { Caramelo } from '@/components/Caramelo'
import { CourseCards } from '@/components/CoursePicker'

export const metadata = {
  title: 'LinguaKit — inglês e português, do zero ao avançado',
  description:
    'Teste de nível em 10 minutos, 50 unidades do A1 ao C2 e exercícios falados — no sotaque do lugar para onde você vai.',
}

/**
 * The page people are sent to.
 *
 * Written in Portuguese because that is who it will be shared with, while the
 * two course cards stay bilingual: an English speaker who lands here still
 * finds their card in their own language, and everything after the click is in
 * it too.
 *
 * Every number on this page is counted from the curriculum, not rounded up for
 * effect. There is nothing here about price or about how many people use it,
 * because neither is mine to invent.
 */
export default function HomePage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Hero */}
      <header style={{ background: 'var(--panel)', color: 'var(--on-panel)', padding: '3rem 1.5rem 2.75rem' }}>
        <div style={{ maxWidth: 580, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: 'var(--on-panel)' }}>
            <Caramelo mood="happy" size={88} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 34, fontWeight: 700, lineHeight: 1.15, marginBottom: '.7rem' }}>
            Inglês e português,<br />do zero ao avançado
          </h1>
          <p style={{ fontSize: 15.5, color: 'rgba(255,255,255,.62)', lineHeight: 1.6, maxWidth: 440, margin: '0 auto' }}>
            Um teste de nível de dez minutos diz exatamente onde você começa.
            Depois são 50 unidades, no seu ritmo, com tudo falado em voz alta.
          </p>
        </div>
      </header>

      {/* The two doors */}
      <main style={{ maxWidth: 560, margin: '0 auto', padding: '1.75rem 1.5rem 0' }}>
        <CourseCards />
      </main>

      {/* The numbers, counted from the curriculum */}
      <section style={{ maxWidth: 560, margin: '0 auto', padding: '1.75rem 1.5rem 0' }}>
        <div style={{ display: 'flex', gap: '.6rem', textAlign: 'center' }}>
          <Figure number="6" label="níveis, do A1 ao C2" />
          <Figure number="50" label="unidades" />
          <Figure number="+1.700" label="exercícios" />
        </div>
      </section>

      {/* What it actually does */}
      <section style={{ maxWidth: 560, margin: '0 auto', padding: '2rem 1.5rem 0' }}>
        <Point
          title="Você ouve antes de ler"
          body="Toda palavra, frase e diálogo é falada. Cinco tipos de atividade nascem do som: ouvir e escolher, ditado, montar a frase, achar a resposta do diálogo e dizer na outra língua."
        />
        <Point
          title="No sotaque do lugar para onde você vai"
          body="Irlanda, Austrália, Reino Unido ou Estados Unidos. Quem vai para Dublin passa o curso ouvindo o inglês que vai encontrar lá, não outro."
        />
        <Point
          title="O que você erra volta"
          body="Errou hoje, aparece de novo amanhã. Acertou, volta daqui a três dias, depois uma semana, depois um mês — até você não errar mais."
        />
        <Point
          title="Uma pergunta por vez"
          body="Nada de parede de exercícios. Uma pergunta, resposta na hora, e rodadas curtas que dá para fazer na fila do mercado."
        />
      </section>

      {/* Close */}
      <section style={{ maxWidth: 560, margin: '0 auto', padding: '2.25rem 1.5rem 0', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 21, fontWeight: 700, marginBottom: '.5rem' }}>
          Comece pelo teste
        </h2>
        <p style={{ fontSize: 14, color: 'var(--ink3)', lineHeight: 1.6, marginBottom: '1.1rem' }}>
          São 30 questões e dez minutos. No fim você recebe seu nível, o que já
          domina, o que falta, e a unidade exata por onde começar.
        </p>
        <Link
          href="/test?lang=en"
          style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, padding: '.85rem 1.5rem', borderRadius: 12, background: 'var(--green)', color: 'var(--on-panel)', fontSize: 15.5, fontWeight: 700, textDecoration: 'none' }}
        >
          Fazer o teste de inglês →
        </Link>
        <div style={{ marginTop: '.85rem' }}>
          <Link href="/test?lang=pt" style={{ fontSize: 13.5, color: 'var(--ink3)', display: 'inline-block', padding: '.85rem .35rem', margin: '-.85rem -.35rem' }}>
            Looking for the Portuguese course?
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ maxWidth: 560, margin: '0 auto', padding: '2.5rem 1.5rem 2rem', textAlign: 'center', borderTop: '1px solid var(--border)', marginTop: '2.5rem' }}>
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
    <div style={{ flex: 1, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '1rem .5rem' }}>
      <div style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 23, fontWeight: 700, lineHeight: 1.1 }}>
        {number}
      </div>
      <div style={{ fontSize: 11.5, color: 'var(--ink3)', marginTop: '.25rem', lineHeight: 1.35 }}>{label}</div>
    </div>
  )
}

function Point({ title, body }: { title: string; body: string }) {
  return (
    <div style={{ marginBottom: '1.6rem' }}>
      <h3 style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 17.5, fontWeight: 700, marginBottom: '.35rem' }}>
        {title}
      </h3>
      <p style={{ fontSize: 14, color: 'var(--ink3)', lineHeight: 1.65 }}>{body}</p>
    </div>
  )
}
