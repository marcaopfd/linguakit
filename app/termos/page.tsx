import type { Metadata } from 'next'
import Link from 'next/link'
import { Contato, PaginaLegal } from '@/components/PaginaLegal'
import { LEGAL } from '@/lib/legal'

export const metadata: Metadata = {
  title: `Termos de Uso — ${LEGAL.produto}`,
  description: 'O que o LinguaKit é, o que ele não é, e as regras da sua conta.',
  alternates: { canonical: '/termos' },
}

/**
 * Os termos.
 *
 * A parte mais importante é "O que isto não é". Um curso de idioma vendido
 * online carrega expectativas que ninguém escreveu — certificado, professor,
 * fluência em prazo — e o lugar de desfazê-las é aqui, antes da compra, e não
 * no pedido de reembolso.
 */
export default function TermosPage() {
  return (
    <PaginaLegal
      titulo="Termos de Uso"
      resumo="O que você recebe, o que não vem junto, e as regras da conta."
    >
      <h2>Quem oferece</h2>
      <p>
        O {LEGAL.produto} é mantido por <strong>{LEGAL.responsavel}</strong>,
        pessoa física, de {LEGAL.localidade}. Ao usar o site você concorda com
        o que está escrito aqui.
      </p>

      <h2>O que você recebe</h2>
      <p>
        Um curso de inglês e um de português para estudo por conta própria, com
        lições escritas, áudio, exercícios, trilhas por situação, conversas com
        personagem e um kit de frases em PDF. Uma parte é gratuita e segue
        gratuita; outra parte depende de assinatura. O que está em cada lado
        está escrito na página de planos, e muda só para mais.
      </p>

      <h2>O que isto não é</h2>
      <ul>
        <li>
          <strong>Não tem certificado.</strong> Nada aqui serve como comprovação
          de proficiência para visto, faculdade ou emprego. Para isso existem
          IELTS e TOEFL, e este curso não prepara para eles.
        </li>
        <li>
          <strong>Não tem professor.</strong> Ninguém corrige a sua fala nem
          responde dúvida individual. É material para estudar sozinho, e é
          assim que ele é vendido.
        </li>
        <li>
          <strong>Não promete prazo de fluência.</strong> O que a gente promete
          é o conteúdo que está lá dentro. Quanto você aprende depende de
          quanto você estuda, e ninguém honesto consegue garantir o contrário.
        </li>
      </ul>

      <h2>A sua conta</h2>
      <p>
        A conta é sua e pessoal. A senha e o código de recuperação são a chave
        dela: guarde os dois, não divida com ninguém, e saiba que quem tem o
        link <code>/learn/&lt;id&gt;</code> consegue abrir o seu curso — trate
        esse link como privado.
      </p>
      <p>
        Você pode apagar a sua conta quando quiser: <Contato />. A gente apaga,
        e junto vai o seu progresso.
      </p>

      <h2>O conteúdo</h2>
      <p>
        As lições, frases, exercícios, conversas e textos do {LEGAL.produto} são
        de autoria própria e estão protegidos por direito autoral. Você pode
        usá-los para estudar, imprimir o kit de bolso e levar aonde quiser. Não
        pode redistribuir, revender nem publicar o conteúdo como se fosse seu.
      </p>
      <p>
        Os vídeos de música tocam no canal oficial de quem os publicou, pelo
        player do YouTube. Nada é baixado, recortado ou re-hospedado, e letra
        nenhuma é reproduzida aqui — o que é nosso são as perguntas e o
        vocabulário ao redor.
      </p>

      <h2>Pagamento</h2>
      <p>
        A cobrança é feita pela <strong>{LEGAL.pagamento.nome}</strong>, que é
        quem processa o pagamento e emite o documento fiscal. O {LEGAL.produto}{' '}
        não vê e não guarda dado de cartão. Preço, formas de pagamento e as
        condições de estorno aparecem no próprio checkout e em{' '}
        <Link href="/reembolso">Reembolso e cancelamento</Link>.
      </p>

      <h2>Quando a gente pode encerrar o acesso</h2>
      <p>
        Se alguém usar a conta para revender o conteúdo, dividir acesso em
        massa ou atacar o serviço. Nesses casos a gente encerra o acesso e
        devolve a parte proporcional do que foi pago. Fora isso, o seu acesso é
        seu.
      </p>

      <h2>Mudanças</h2>
      <p>
        Estes termos podem mudar quando o produto mudar. A data no topo é a da
        última versão. Mudança que afete o que você já pagou não vale
        retroativamente.
      </p>

      <h2>Lei e foro</h2>
      <p>
        Vale a lei brasileira, e o Código de Defesa do Consumidor se aplica às
        compras feitas por consumidores no Brasil.
      </p>
    </PaginaLegal>
  )
}
