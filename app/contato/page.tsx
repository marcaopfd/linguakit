import type { Metadata } from 'next'
import Link from 'next/link'
import { Contato, PaginaLegal } from '@/components/PaginaLegal'
import { LEGAL } from '@/lib/legal'

export const metadata: Metadata = {
  title: `Contato — ${LEGAL.produto}`,
  description: 'Como falar com quem faz o LinguaKit.',
  alternates: { canonical: '/contato' },
}

/** Quem está do outro lado, e como chegar nele. */
export default function ContatoPage() {
  return (
    <PaginaLegal
      titulo="Contato"
      resumo="Tem uma pessoa do outro lado, e ela responde."
    >
      <h2>Falar com a gente</h2>
      <p>
        O {LEGAL.produto} é feito por <strong>{LEGAL.responsavel}</strong>, de{' '}
        {LEGAL.localidade} — uma pessoa só, que escreveu cada frase do curso.
        Para qualquer assunto, <Contato />.
      </p>

      <h2>As três coisas mais perguntadas</h2>
      <p>
        <strong>Paguei e não liberou.</strong> Entre em Minha conta e toque em
        &ldquo;já paguei e não liberou&rdquo;. Quase sempre é o e-mail da compra
        diferente do e-mail da conta, e esse botão resolve.
      </p>
      <p>
        <strong>Esqueci a senha.</strong> Use o código de recuperação em{' '}
        <Link href="/recuperar">recuperar minha senha</Link>. Perdeu o código
        também? Abra o link do seu curso, se ainda o tiver, e gere outro em
        Minha conta.
      </p>
      <p>
        <strong>Quero cancelar.</strong> Está tudo em{' '}
        <Link href="/reembolso">Reembolso e cancelamento</Link>, inclusive a
        opção de pausar em vez de cancelar.
      </p>

      <h2>Achou um erro no curso?</h2>
      <p>
        Escreve. Uma frase errada numa lição é pior do que uma lição a menos, e
        quem acha um erro está fazendo um favor — manda o módulo, a lição e o
        que está estranho, que eu corrijo e republico.
      </p>
    </PaginaLegal>
  )
}
