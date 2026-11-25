'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CodigoDeRecuperacao } from '@/components/CodigoDeRecuperacao'

/**
 * Esqueci a senha.
 *
 * Não há e-mail para mandar link nenhum, então o que prova que a conta é sua
 * é o código de recuperação que você guardou quando ela nasceu. E-mail mais
 * código valem uma senha nova.
 *
 * A tela não diz se o e-mail existe nem se a conta tem código: essa resposta
 * transformaria a página num jeito de descobrir quem é aluno daqui. Quem não
 * tem o código tem uma saída só, e ela está escrita no fim — falar com o
 * professor, que pode resetar a senha.
 */
export default function RecuperarPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [codigo, setCodigo] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [pronto, setPronto] = useState<{ studentId: string; codigo: string } | null>(null)

  const podeEnviar = email.trim().length > 3 && codigo.trim().length > 0 && senha.length >= 8

  async function enviar(e: React.FormEvent) {
    e.preventDefault()
    if (!podeEnviar || enviando) return
    setEnviando(true)
    setErro('')

    try {
      const res = await fetch('/api/student/recovery/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, codigo, senha }),
      })
      const dados = await res.json()
      if (res.ok) setPronto({ studentId: dados.studentId, codigo: dados.codigo })
      else {
        setErro(dados.error ?? 'Não foi possível trocar a senha.')
        setEnviando(false)
      }
    } catch {
      setErro('Sem conexão agora. Tente de novo.')
      setEnviando(false)
    }
  }

  if (pronto) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--cream)', padding: '2rem 1.5rem 4rem' }}>
        <div style={{ maxWidth: 420, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
            <h1 style={{ fontFamily: 'var(--font-display), Bricolage Grotesque, sans-serif', fontSize: 26, fontWeight: 700, marginBottom: '.3rem' }}>
              Senha trocada
            </h1>
            <p style={{ fontSize: 13, color: 'var(--ink3)', lineHeight: 1.5 }}>
              O código que você usou não vale mais. Aqui está o próximo.
            </p>
          </div>

          <CodigoDeRecuperacao codigo={pronto.codigo} />

          <button
            onClick={() => router.push(`/learn/${pronto.studentId}`)}
            style={{
              width: '100%', minHeight: 50, marginTop: '1rem', borderRadius: 999, border: 'none',
              background: 'var(--accent)', color: 'var(--on-accent)',
              fontSize: 15, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer',
            }}
          >
            Guardei. Ir para o curso →
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', padding: '2rem 1.5rem 4rem' }}>
      <div style={{ maxWidth: 420, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ fontFamily: 'var(--font-display), Bricolage Grotesque, sans-serif', fontSize: 27, fontWeight: 700, marginBottom: '.3rem' }}>
            Esqueci minha senha
          </h1>
          <p style={{ fontSize: 13, color: 'var(--ink3)', lineHeight: 1.55 }}>
            Use o código de recuperação que apareceu quando você criou a conta.
            Com ele você escolhe uma senha nova agora mesmo.
          </p>
        </div>

        <form onSubmit={enviar} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '1.25rem' }}>
          <label style={rotulo}>
            E-mail da conta
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              autoComplete="email" autoFocus style={campo}
            />
          </label>

          <label style={rotulo}>
            Código de recuperação
            <input
              value={codigo}
              onChange={e => setCodigo(e.target.value)}
              placeholder="abcd-efgh-jkmn-pqrs"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              translate="no"
              style={{ ...campo, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', letterSpacing: '.04em' }}
            />
          </label>

          <label style={rotulo}>
            Senha nova (mínimo 8 caracteres)
            <input
              type="password" value={senha} onChange={e => setSenha(e.target.value)}
              autoComplete="new-password" style={campo}
            />
          </label>

          {erro && (
            <p style={{ fontSize: 13, color: 'var(--ink)', background: 'var(--paper)', border: '1px solid var(--border)', borderRadius: 10, padding: '.6rem .7rem', marginTop: '.9rem', lineHeight: 1.5 }}>
              {erro}
            </p>
          )}

          <button
            type="submit"
            disabled={!podeEnviar || enviando}
            style={{
              width: '100%', minHeight: 48, marginTop: '1.1rem', borderRadius: 999, border: 'none',
              background: podeEnviar && !enviando ? 'var(--accent)' : 'var(--border)',
              color: podeEnviar && !enviando ? 'var(--on-accent)' : 'var(--ink3)',
              fontSize: 15, fontWeight: 700, fontFamily: 'inherit',
              cursor: podeEnviar && !enviando ? 'pointer' : 'default',
            }}
          >
            {enviando ? 'Trocando…' : 'Trocar a senha'}
          </button>
        </form>

        <div style={{ background: 'var(--paper)', border: '1px solid var(--border)', borderRadius: 12, padding: '.85rem 1rem', marginTop: '1rem' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink2)' }}>Perdi o código também</div>
          <p style={{ fontSize: 12.5, color: 'var(--ink3)', lineHeight: 1.55, marginTop: '.25rem' }}>
            Se você ainda tem o link do seu curso salvo no navegador, abra ele e
            entre em Minha conta — de lá dá para gerar um código novo. Se não
            tiver mais nem o link, fale com o professor: ele consegue resetar a
            sua senha.
          </p>
        </div>

        <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--ink3)', marginTop: '1.1rem' }}>
          Lembrou?{' '}
          <Link href="/entrar" style={{ color: 'var(--ink)', fontWeight: 600, display: 'inline-block', padding: '.85rem .35rem', margin: '-.85rem -.35rem' }}>
            Entrar
          </Link>
        </p>
      </div>
    </div>
  )
}

const rotulo: React.CSSProperties = {
  display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--ink2)', marginTop: '.9rem',
}

const campo: React.CSSProperties = {
  display: 'block', width: '100%', marginTop: '.3rem', minHeight: 46,
  background: 'var(--paper)', border: '1px solid var(--border)', borderRadius: 10,
  padding: '.6rem .75rem', fontFamily: 'inherit', fontSize: 15, color: 'var(--ink)',
}
