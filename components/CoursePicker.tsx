import Link from 'next/link'
import { Icon } from '@/components/Icon'

/**
 * The front door: which of the two courses you came for.
 *
 * Each card is written in the language of the person who would click it — a
 * Brazilian looking for English reads Portuguese, an English speaker looking
 * for Portuguese reads English. Nobody has to understand the other card, and
 * nobody has to be asked "what language do you speak?" first.
 */
export function CoursePicker() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: 'var(--panel)', color: 'var(--on-panel)', padding: '2.25rem 1.5rem 2rem', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 27, fontWeight: 700, marginBottom: '.4rem' }}>
          LinguaKit
        </div>
        <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,.55)', lineHeight: 1.5 }}>
          Português e inglês, do zero ao avançado
          <br />
          <span style={{ fontSize: 12.5 }}>Portuguese and English, from scratch to fluent</span>
        </div>
      </div>

      <div style={{ flex: 1, padding: '1.5rem', maxWidth: 560, margin: '0 auto', width: '100%' }}>
        <CourseCards />

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: 13, color: 'var(--ink3)', lineHeight: 1.9 }}>
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
      </div>

      {/* The teacher's own way in. Deliberately quiet: the course is built to be
          done alone, and lessons are the side of it, not the point. */}
      <div style={{ padding: '0 1.5rem 1.75rem', textAlign: 'center' }}>
        <Link
          href="/painel"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '.35rem', minHeight: 44,
            padding: '0 .5rem', fontSize: 12, color: 'var(--ink3)', textDecoration: 'none',
          }}
        >
          <Icon name="key" size={14} /> Espaço do professor
        </Link>
      </div>
    </div>
  )
}

/**
 * The two cards, on their own, so the landing page and the bare /test fork can
 * each put them in their own surroundings without the copy drifting apart.
 */
export function CourseCards() {
  return (
    <>
      <Course
        href="/test?lang=en"
        flag="🇺🇸"
        title="Quero aprender inglês"
        blurb="Faça o teste de nível: 30 questões, cerca de 10 minutos. No fim você descobre seu nível e começa o curso."
        cta="Começar o teste →"
      />
      <Course
        href="/test?lang=pt"
        flag="🇧🇷"
        title="I want to learn Portuguese"
        blurb="Take the level test: 30 questions, about 10 minutes. You will find your level and start the course right after."
        cta="Start the test →"
      />
    </>
  )
}

function Course({ href, flag, title, blurb, cta }: {
  href: string
  flag: string
  title: string
  blurb: string
  cta: string
}) {
  return (
    <Link
      href={href}
      style={{
        display: 'block', textDecoration: 'none', color: 'inherit',
        background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16,
        padding: '1.4rem 1.5rem', marginBottom: '.85rem',
      }}
    >
      <div aria-hidden style={{ fontSize: 34, lineHeight: 1, marginBottom: '.6rem' }}>{flag}</div>
      <div style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 20, fontWeight: 700, marginBottom: '.4rem' }}>
        {title}
      </div>
      <div style={{ fontSize: 13.5, color: 'var(--ink3)', lineHeight: 1.6, marginBottom: '.9rem' }}>
        {blurb}
      </div>
      <div style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, padding: '.55rem 1rem', borderRadius: 11, background: 'var(--green)', color: 'var(--on-panel)', fontSize: 14.5, fontWeight: 700 }}>
        {cta}
      </div>
    </Link>
  )
}
