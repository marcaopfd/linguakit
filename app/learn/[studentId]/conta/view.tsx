'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CodigoDeRecuperacao } from '@/components/CodigoDeRecuperacao'
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
export function TelaDaConta({ studentId, nome, email, curso, plano, estado, valendo, renovaEm, suporte, codigoEm }: {
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
  /** Quando o código de recuperação em vigor foi gerado. Nulo se não há um. */
  codigoEm: string | null
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
              codigoEm={codigoEm}
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
  const [codigo, setCodigo] = useState<string | null>(null)

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
        // O código aparece antes de a tela virar: é a única vez que ele
        // existe em claro. Só depois de "guardei" é que recarregamos, e aí o
        // servidor já pode ter achado um pagamento esperando este e-mail.
        if (dados.codigo) setCodigo(dados.codigo)
        else router.refresh()
      } else {
        setErro(dados.error ?? 'Não foi possível criar a conta.')
        setEnviando(false)
      }
    } catch {
      setErro('Sem conexão agora. Tente de novo.')
      setEnviando(false)
    }
  }

  if (codigo) {
    return (
      <>
        <div style={{ ...cartao(), marginBottom: '.75rem' }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--ink)' }}>
            {emPortugues ? 'Conta criada' : 'Account created'}
          </h2>
          <p style={{ fontSize: 13, color: 'var(--ink3)', lineHeight: 1.55, marginTop: '.25rem' }}>
            {emPortugues
              ? 'Falta uma coisa só, e ela leva dez segundos.'
              : 'One last thing, and it takes ten seconds.'}
          </p>
        </div>
        <CodigoDeRecuperacao codigo={codigo} emPortugues={emPortugues} />
        <button type="button" onClick={() => router.refresh()} style={botao(true)}>
          {emPortugues ? 'Guardei. Continuar' : 'Saved it. Continue'}
        </button>
      </>
    )
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
function ContaPronta({ studentId, email, plano, estado, valendo, renovaEm, suporte, codigoEm, emPortugues }: {
  studentId: string
  email: string
  plano: string
  estado: string
  valendo: boolean
  renovaEm: string | null
  suporte: string | null
  codigoEm: string | null
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

      <SenhaERecuperacao
        studentId={studentId}
        codigoEm={codigoEm}
        emPortugues={emPortugues}
      />

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

/**
 * Senha e código de recuperação: as duas coisas que decidem se a pessoa ainda
 * vai conseguir entrar daqui a seis meses.
 *
 * As duas pedem a senha atual quando não há sessão neste navegador. Quem
 * chegou só com o link /learn/<id> não troca senha nem tira código novo — o
 * link é a chave de ler o curso, e deixá-lo valer aqui faria um link
 * compartilhado sem pensar virar a conta de outra pessoa.
 */
function SenhaERecuperacao({ studentId, codigoEm, emPortugues }: {
  studentId: string
  codigoEm: string | null
  emPortugues: boolean
}) {
  const [aberto, setAberto] = useState<'nenhum' | 'senha' | 'codigo'>('nenhum')
  const [atual, setAtual] = useState('')
  const [nova, setNova] = useState('')
  const [recado, setRecado] = useState('')
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [codigoNovo, setCodigoNovo] = useState<string | null>(null)

  function limpar() {
    setAtual('')
    setNova('')
    setErro('')
    setRecado('')
    setCodigoNovo(null)
  }

  async function trocarSenha(e: React.FormEvent) {
    e.preventDefault()
    if (nova.length < 8 || enviando) return
    setEnviando(true)
    setErro('')
    setRecado('')
    try {
      const res = await fetch('/api/student/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, atual, nova }),
      })
      const dados = await res.json()
      if (res.ok) {
        setRecado(emPortugues ? 'Senha trocada.' : 'Password changed.')
        setAtual('')
        setNova('')
      } else {
        setErro(dados.error ?? (emPortugues ? 'Não deu certo.' : 'It did not work.'))
      }
    } catch {
      setErro(emPortugues ? 'Sem conexão agora.' : 'No connection right now.')
    }
    setEnviando(false)
  }

  async function gerarCodigo(e: React.FormEvent) {
    e.preventDefault()
    if (enviando) return
    setEnviando(true)
    setErro('')
    try {
      const res = await fetch('/api/student/recovery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, senha: atual }),
      })
      const dados = await res.json()
      if (res.ok) {
        setCodigoNovo(dados.codigo)
        setAtual('')
      } else {
        setErro(dados.error ?? (emPortugues ? 'Não deu certo.' : 'It did not work.'))
      }
    } catch {
      setErro(emPortugues ? 'Sem conexão agora.' : 'No connection right now.')
    }
    setEnviando(false)
  }

  return (
    <div style={{ ...cartao(), marginTop: '.75rem' }}>
      <div style={{ fontSize: 11.5, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--ink3)', fontWeight: 600 }}>
        {emPortugues ? 'Senha e recuperação' : 'Password and recovery'}
      </div>
      <p style={{ fontSize: 12.5, color: 'var(--ink3)', lineHeight: 1.55, marginTop: '.4rem' }}>
        {codigoEm
          ? (emPortugues
            ? `Você tem um código de recuperação, gerado em ${new Date(codigoEm).toLocaleDateString('pt-BR')}. Se não souber mais onde ele está, gere outro — o antigo deixa de valer.`
            : `You have a recovery code, created on ${new Date(codigoEm).toLocaleDateString('en-IE')}. If you no longer know where it is, create another — the old one stops working.`)
          : (emPortugues
            ? 'Você ainda não tem um código de recuperação. Ele é o que devolve a sua conta se você esquecer a senha — e, sem ele, só restaria pedir ajuda ao professor.'
            : 'You have no recovery code yet. It is what gets your account back if you forget your password — without it, the only way back is asking your teacher.')}
      </p>

      {codigoNovo && (
        <div style={{ marginTop: '.75rem' }}>
          <CodigoDeRecuperacao codigo={codigoNovo} emPortugues={emPortugues} />
        </div>
      )}

      {aberto === 'nenhum' && !codigoNovo && (
        <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', marginTop: '.75rem' }}>
          <button type="button" onClick={() => { limpar(); setAberto('codigo') }} style={{ ...botaoFraco(), marginTop: 0, flex: '1 1 160px', width: 'auto' }}>
            {codigoEm
              ? (emPortugues ? 'Gerar novo código' : 'New recovery code')
              : (emPortugues ? 'Criar meu código' : 'Create my code')}
          </button>
          <button type="button" onClick={() => { limpar(); setAberto('senha') }} style={{ ...botaoFraco(), marginTop: 0, flex: '1 1 160px', width: 'auto' }}>
            {emPortugues ? 'Trocar a senha' : 'Change password'}
          </button>
        </div>
      )}

      {aberto === 'senha' && (
        <form onSubmit={trocarSenha} style={{ marginTop: '.5rem' }}>
          <label style={rotulo()}>
            {emPortugues ? 'Senha atual' : 'Current password'}
            <input type="password" value={atual} onChange={e => setAtual(e.target.value)} autoComplete="current-password" style={campo()} />
          </label>
          <label style={rotulo()}>
            {emPortugues ? 'Senha nova (mínimo 8 caracteres)' : 'New password (at least 8 characters)'}
            <input type="password" value={nova} onChange={e => setNova(e.target.value)} autoComplete="new-password" style={campo()} />
          </label>
          <button type="submit" disabled={nova.length < 8 || enviando} style={botao(nova.length >= 8 && !enviando)}>
            {emPortugues ? 'Trocar a senha' : 'Change password'}
          </button>
        </form>
      )}

      {aberto === 'codigo' && !codigoNovo && (
        <form onSubmit={gerarCodigo} style={{ marginTop: '.5rem' }}>
          <label style={rotulo()}>
            {emPortugues ? 'Sua senha, para confirmar' : 'Your password, to confirm'}
            <input type="password" value={atual} onChange={e => setAtual(e.target.value)} autoComplete="current-password" style={campo()} />
          </label>
          <p style={{ fontSize: 11.5, color: 'var(--ink3)', lineHeight: 1.5, marginTop: '.4rem' }}>
            {emPortugues
              ? 'Se você já entrou com senha neste aparelho, pode deixar em branco.'
              : 'If you already signed in with your password on this device, you can leave it blank.'}
          </p>
          <button type="submit" disabled={enviando} style={botao(!enviando)}>
            {enviando
              ? (emPortugues ? 'Gerando…' : 'Creating…')
              : (emPortugues ? 'Gerar o código' : 'Create the code')}
          </button>
        </form>
      )}

      {(erro || recado) && (
        <p style={{ fontSize: 12.5, color: erro ? 'var(--ink)' : 'var(--ink2)', lineHeight: 1.55, marginTop: '.6rem' }}>
          {erro || recado}
        </p>
      )}

      {aberto !== 'nenhum' && (
        <button type="button" onClick={() => { limpar(); setAberto('nenhum') }} style={{ ...botaoFraco(), marginTop: '.5rem' }}>
          {emPortugues ? 'Fechar' : 'Close'}
        </button>
      )}
    </div>
  )
}
