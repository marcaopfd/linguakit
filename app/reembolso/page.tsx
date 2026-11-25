import type { Metadata } from 'next'
import Link from 'next/link'
import { Contato, PaginaLegal } from '@/components/PaginaLegal'
import { LEGAL } from '@/lib/legal'

export const metadata: Metadata = {
  title: `Reembolso e cancelamento — ${LEGAL.produto}`,
  description: 'Sete dias para desistir, como cancelar, como pausar, e o que acontece com o seu progresso.',
  alternates: { canonical: '/reembolso' },
}

/**
 * Reembolso.
 *
 * Escrito para ser fácil de usar, não para desencorajar. Política de
 * reembolso difícil não reduz reembolso — reduz confiança antes da compra, e
 * aumenta chargeback depois, que é pior para todo mundo.
 */
export default function ReembolsoPage() {
  return (
    <PaginaLegal
      titulo="Reembolso e cancelamento"
      resumo="Sete dias para desistir sem explicar nada. E dá para pausar em vez de cancelar."
    >
      <h2>Sete dias, sem precisar justificar</h2>
      <p>
        Comprou e se arrependeu? Você tem <strong>7 dias corridos a partir da
        compra</strong> para pedir o dinheiro de volta, integralmente, sem
        precisar dar motivo. É o direito de arrependimento do artigo 49 do
        Código de Defesa do Consumidor, e vale mesmo que você já tenha estudado
        nesses dias.
      </p>
      <p>
        Para pedir, <Contato />, ou peça direto pela{' '}
        <strong>{LEGAL.pagamento.nome}</strong>, que é quem processou a compra.
        Os dois caminhos funcionam.
      </p>

      <h2>Quanto tempo leva o estorno</h2>
      <p>
        Quem devolve o dinheiro é a {LEGAL.pagamento.nome}, e o prazo depende de
        como você pagou. Pix costuma voltar em poucos dias úteis; cartão de
        crédito pode aparecer só na fatura seguinte, porque depende da
        operadora. Nenhuma das duas pontas é nossa, e por isso a gente não
        promete uma data exata — o que a gente promete é não atrasar o pedido.
      </p>

      <h2>Depois dos sete dias</h2>
      <p>
        Passado o prazo de arrependimento, a assinatura não é reembolsada
        retroativamente, mas você pode <strong>cancelar a qualquer momento</strong>{' '}
        e continuar usando até o fim do período que já foi pago. Não há multa e
        não há fidelidade.
      </p>

      <h2>Pausar, em vez de cancelar</h2>
      <p>
        Metade de quem assina um curso assim assina por causa de uma viagem — e
        a viagem acaba. Por isso dá para <strong>pausar a assinatura por até
        três meses</strong> sem perder nada: o progresso fica guardado e o
        acesso volta de onde parou quando você retomar.
      </p>

      <h2>O que acontece com o seu progresso</h2>
      <p>
        Nada. Cancelando ou pausando, a sua conta continua existindo e o que
        você estudou continua lá. O que fecha são as partes do plano — as
        trilhas completas, as conversas, o kit de bolso e as músicas. O curso do
        A1 ao C2, o teste, a palavra do dia e a revisão{' '}
        <strong>seguem abertos de graça</strong>, como sempre foram.
      </p>

      <h2>Comprou e não liberou?</h2>
      <p>
        Isso acontece quando o e-mail da compra é diferente do e-mail da conta.
        Entre em Minha conta e toque em <strong>&ldquo;já paguei e não
        liberou&rdquo;</strong> — na maioria das vezes resolve na hora. Se não
        resolver, <Contato /> dizendo qual e-mail você usou na compra, e a gente
        liga as duas pontas à mão.
      </p>
      <p>
        <Link href="/termos">Termos de uso</Link> ·{' '}
        <Link href="/privacidade">Política de privacidade</Link>
      </p>
    </PaginaLegal>
  )
}
