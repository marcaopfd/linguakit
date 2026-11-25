'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Icon } from '@/components/Icon'

/**
 * Duas telas no mesmo lugar, porque é a mesma pergunta em dois momentos:
 * "quem é você e o que você já pagou".
 *
 * Sem conta, ela pede e-mail e senha — e diz por que, sem rodeio: é assim
 * que você entra de outro aparelho, e é assim que o pagamento te acha.
 *
 * Com conta, ela mostra o estado do plano e o botão de "já paguei e não
 * liberou", que é o socorro para quem comprou antes de se cadastrar ou pagou
 * com outro e-mail. Esse botão existe porque a alternativa é a pessoa pagar,
 * não receber nada e não ter a quem recorrer dentro do produto.
 */
export function TelaDaConta({ studentId, nome, email, curso, plano, estado, valendo, renovaEm, suporte }: {
  studentId: string
  nome: string
  email: string | null
  curso: string
  plano: string
  estado: string
  valendo: boolean
  renovaEm: string | null
  /** O e-mail de suporte, quando houver um configurado. */
  suporte: string | null
}) {
  const emPortugues = curso === 'en'

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <header style={{ background: 'var(--panel)', color: 'var(--on-panel)', padding: '1.5rem 1.25rem 1.6rem' }}>
        <Link
          href={`/learn/${studentId}`}
          style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, fontSize: 13, color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}
        >
          ← {emPortugues ? 'Voltar para o curso' : 'Back to my course'}
        </Link>
        <h1 style={{ fontFamily: 'var(--font-display), Bricolage Grotesque, sans-serif', fontSize: 25, fontWeight: 700, marginTop: '.3rem' }}>
          {emPortugues ? 'Minha conta' : 'My account'}
        </h1>
        <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,.6)', marginTop: '.2rem' }}>{nome}</p>
      </header>

      <main style={{ maxWidth: 520, margin: '0 auto', padding: '1.25rem 1rem 3rem' }}>
        {email
          ? <ContaPronta
              studentId={studentId}
              email={email}
              plano={plano}
              estado={estado}
              valendo={valendo}
              renovaEm={renovaEm}
              suporte={suporte}
              emPortugues={emPortugues}
            />
          : <CriarConta studentId={studentId} emPortugues={emPortugues} />}
      </main>
    </div>
  )
}

/** Quem veio pelo teste e ainda não tem e-mail nem senha. */
function CriarConta({ studentId, emPortugues }: { studentId: string; emPortugues: boolean }) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [novidades, setNovidades] = useState(false)
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)

  const pronto = email.trim().length > 3 && senha.length >= 8

  async function enviar(e: React.FormEvent) {
    e.preventDefault()
    if (!pronto || enviando) return
    setEnviando(true)
    setErro('')

    try {
      const res = await fetch('/api/student/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, email, password: senha, newsletter: novidades }),
      })
      const dados = await res.json()
      if (res.ok) {
        // O servidor pode ter achado um pagamento esperando por este e-mail.
        // Recarregar é o jeito honesto de mostrar o estado novo.
        router.refresh()
      } else {
        setErro(dados.error ?? 'Não foi possível criar a conta.')
        setEnviando(false)
      }
    } catch {
      setErro('Sem conexão agora. Tente de novo.')
      setEnviando(false)
    }
  }

  return (
    <form onSubmit={enviar} style={cartao()}>
      <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--ink)' }}>
        {emPortugues ? 'Criar minha conta' : 'Create my account'}
      </h2>
      <p style={{ fontSize: 13, color: 'var(--ink3)', lineHeight: 1.55, marginTop: '.3rem' }}>
        {emPortugues
          ? 'Seu progresso já está salvo neste link. A conta serve para duas coisas: entrar de outro aparelho, e receber o plano quando você assinar — o pagamento te encontra pelo e-mail.'
          : 'Your progress is already saved in this link. The account does two things: it lets you sign in from another device, and it is how your plan reaches you — payment finds you by email.'}
      </p>

      <label style={rotulo()}>
        {emPortugues ? 'E-mail' : 'Email'}
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoComplete="email"
          style={campo()}
        />
      </label>

      <label style={rotulo()}>
        {emPortugues ? 'Senha (mínimo 8 caracteres)' : 'Password (at least 8 characters)'}
        <input
          type="password"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          autoComplete="new-password"
          style={campo()}
        />
      </label>

      <label style={{ display: 'flex', alignItems: 'flex-start', gap: '.55rem', marginTop: '.9rem', fontSize: 12.5, color: 'var(--ink2)', lineHeight: 1.5, cursor: 'pointer' }}>
        <input
          type="checkbox"
          checked={novidades}
          onChange={e => setNovidades(e.target.checked)}
          style={{ marginTop: 2, width: 16, height: 16, accentColor: 'var(--accent-dim)' }}
        />
        {emPortugues
          ? 'Quero receber novidades do curso por e-mail.'
          : 'Send me course news by email.'}
      </label>

      {erro && (
        <p style={{ fontSize: 13, color: 'var(--ink)', background: 'var(--paper)', border: '1px solid var(--border)', borderRadius: 10, padding: '.6rem .7rem', marginTop: '.9rem', lineHeight: 1.5 }}>
          {erro}
        </p>
      )}

      <button type="submit" disabled={!pronto || enviando} style={botao(pronto && !enviando)}>
        {enviando
          ? (emPortugues ? 'Criando…' : 'Creating…')
          : (emPortugues ? 'Criar conta' : 'Create account')}
      </button>
    </form>
  )
}

/** Quem já tem e-mail e senha: o estado do plano e o que fazer com ele. */
function ContaPronta({ studentId, email, plano, estado, valendo, renovaEm, suporte, emPortugues }: {
  studentId: string
  email: string
  plano: string
  estado: string
  valendo: boolean
  renovaEm: string | null
  suporte: string | null
  emPortugues: boolean
}) {
  const router = useRouter()
  const [conferindo, setConferindo] = useState(false)
  const [recado, setRecado] = useState('')

  async function conferirPagamento() {
    setConferindo(true)
    setRecado('')
    try {
      const res = await fetch('/api/student/pagamento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId }),
      })
      const dados = await res.json()
      if (dados.encontrado) {
        setRecado('Achamos o seu pagamento. Plano liberado.')
        router.refresh()
      } else {
        setRecado(
          `Nenhum pagamento à espera para ${email}. Se você pagou com outro e-mail, `
          + (suporte
            ? `escreva para ${suporte} dizendo qual foi — a gente liga as duas pontas.`
            : 'anote qual foi e nos avise: a gente liga as duas pontas à mão.'),
        )
      }
    } catch {
      setRecado('Não deu para conferir agora. Tente de novo em um minuto.')
    }
    setConferindo(false)
  }

  async function sair() {
    await fetch('/api/student/logout', { method: 'POST' })
    router.push('/entrar')
  }

  return (
    <>
      <div style={cartao()}>
        <div style={{ fontSize: 11.5, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--ink3)', fontWeight: 600 }}>
          {emPortugues ? 'E-mail da conta' : 'Account email'}
        </div>
        <div style={{ fontSize: 15, color: 'var(--ink)', marginTop: '.2rem', wordBreak: 'break-all' }}>{email}</div>
        <p style={{ fontSize: 12, color: 'var(--ink3)', lineHeight: 1.5, marginTop: '.5rem' }}>
          {emPortugues
            ? 'É por este e-mail que o pagamento te encontra. Use o mesmo na hora de assinar.'
            : 'This is the email payment uses to find you. Use the same one when you subscribe.'}
        </p>
      </div>

      <div style={{ ...cartao(), marginTop: '.75rem' }}>
        <div style={{ fontSize: 11.5, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--ink3)', fontWeight: 600 }}>
          {emPortugues ? 'Meu plano' : 'My plan'}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginTop: '.3rem' }}>
          <span style={{ fontSize: 17, fontWeight: 700, color: 'var(--ink)' }}>
            {nomeDoPlano(plano, estado, valendo, emPortugues)}
          </span>
          {valendo && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.25rem', background: 'var(--accent)', color: 'var(--on-accent)', borderRadius: 999, padding: '.15rem .5rem', fontSize: 11, fontWeight: 700 }}>
              <Icon name="check" size={12} /> {emPortugues ? 'ativo' : 'active'}
            </span>
          )}
        </div>
        {renovaEm && (
          <div style={{ fontSize: 12.5, color: 'var(--ink3)', marginTop: '.3rem' }}>
            {(valendo ? (emPortugues ? 'Renova em ' : 'Renews on ') : (emPortugues ? 'Valeu até ' : 'Valid until '))}
            {new Date(renovaEm).toLocaleDateString(emPortugues ? 'pt-BR' : 'en-IE')}
          </div>
        )}

        <Link href={`/learn/${studentId}/assinar`} style={{ ...botao(true), textDecoration: 'none', display: 'flex' }}>
          {valendo
            ? (emPortugues ? 'Ver o plano' : 'See my plan')
            : (emPortugues ? 'Ver os planos' : 'See the plans')}
        </Link>

        {!valendo && (
          <>
            <button type="button" onClick={conferirPagamento} disabled={conferindo} style={botaoFraco()}>
              {conferindo
                ? (emPortugues ? 'Conferindo…' : 'Checking…')
                : (emPortugues ? 'Já paguei e não liberou' : 'I paid and it did not unlock')}
            </button>
            {recado && (
              <p style={{ fontSize: 12.5, color: 'var(--ink2)', lineHeight: 1.55, marginTop: '.6rem' }}>{recado}</p>
            )}
          </>
        )}
      </div>

      <button type="button" onClick={sair} style={{ ...botaoFraco(), marginTop: '1.25rem' }}>
        {emPortugues ? 'Sair desta conta' : 'Sign out'}
      </button>
    </>
  )
}

function nomeDoPlano(plano: string, estado: string, valendo: boolean, emPortugues: boolean): string {
  if (estado === 'paused') return emPortugues ? 'Pausado' : 'Paused'
  if (!valendo) return emPortugues ? 'Gratuito' : 'Free'
  if (plano === 'annual') return emPortugues ? 'Anual' : 'Annual'
  if (plano === 'monthly') return emPortugues ? 'Mensal' : 'Monthly'
  return emPortugues ? 'Completo' : 'Full'
}

function cartao(): React.CSSProperties {
  return {
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: 16, padding: '1.1rem',
  }
}

function rotulo(): React.CSSProperties {
  return { display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--ink2)', marginTop: '.9rem' }
}

function campo(): React.CSSProperties {
  return {
    display: 'block', width: '100%', marginTop: '.3rem', minHeight: 46,
    background: 'var(--paper)', border: '1px solid var(--border)', borderRadius: 10,
    padding: '.6rem .75rem', fontFamily: 'inherit', fontSize: 15, color: 'var(--ink)',
  }
}

function botao(ativo: boolean): React.CSSProperties {
  return {
    width: '100%', minHeight: 48, marginTop: '1.1rem',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    borderRadius: 999, border: 'none',
    background: ativo ? 'var(--accent)' : 'var(--border)',
    color: ativo ? 'var(--on-accent)' : 'var(--ink3)',
    fontSize: 15, fontWeight: 700, fontFamily: 'inherit',
    cursor: ativo ? 'pointer' : 'default',
  }
}

function botaoFraco(): React.CSSProperties {
  return {
    width: '100%', minHeight: 46, marginTop: '.6rem',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    borderRadius: 999, background: 'var(--surface)',
    border: '1px solid var(--border)', color: 'var(--ink2)',
    fontSize: 14, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer',
  }
}
