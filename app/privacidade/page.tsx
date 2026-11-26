import type { Metadata } from 'next'
import { Contato, PaginaLegal } from '@/components/PaginaLegal'
import { LEGAL } from '@/lib/legal'

export const metadata: Metadata = {
  title: `Política de Privacidade — ${LEGAL.produto}`,
  description: 'O que o LinguaKit guarda sobre você, por quê, com quem divide e como apagar.',
  alternates: { canonical: '/privacidade' },
}

/**
 * A política de privacidade.
 *
 * Cada afirmação aqui foi conferida no código antes de ser escrita. "Não há
 * rastreador" só está escrito porque não há mesmo; "a gravação não sai do
 * aparelho" só está escrito porque o componente de gravação guarda o áudio
 * num blob do navegador e não envia para lugar nenhum. Política de
 * privacidade que descreve um site imaginário é pior do que não ter, porque
 * vira promessa quebrada.
 */
export default function PrivacidadePage() {
  return (
    <PaginaLegal
      titulo="Política de Privacidade"
      resumo="O que guardamos sobre você, por quê, com quem dividimos e como apagar tudo."
    >
      <h2>O resumo, em quatro linhas</h2>
      <p>
        O {LEGAL.produto} guarda o que precisa para o curso funcionar: o seu
        nome, o seu e-mail, a sua senha em forma embaralhada e o que você
        estudou. <strong>Não há nenhum rastreador no site</strong> — nem Google
        Analytics, nem pixel do Facebook, nem gerenciador de tags. A sua voz,
        quando você grava para comparar a pronúncia, <strong>não sai do seu
        aparelho</strong>. E você pode pedir para apagar tudo.
      </p>

      <h2>Quem é o responsável</h2>
      <p>
        O site é mantido por <strong>{LEGAL.responsavel}</strong>, pessoa
        física, de {LEGAL.localidade}. Para qualquer assunto desta política,{' '}
        <Contato />.
      </p>

      <h2>O que a gente guarda, e por quê</h2>
      <p>
        <strong>Quando você cria uma conta:</strong> o nome que você escolheu
        ser chamado, o seu e-mail e a sua senha. A senha nunca é guardada como
        você a digitou — fica como um <em>hash</em> scrypt, que é um
        embaralhamento de mão única. Nem nós conseguimos ler a sua senha.
      </p>
      <p>
        <strong>Quando você estuda:</strong> as unidades que você concluiu, as
        respostas que você marcou nos exercícios, os erros que entraram na sua
        revisão e o resultado do teste de nível. É disso que o portal monta o
        seu progresso — sem isso, o curso não saberia onde você parou.
      </p>
      <p>
        <strong>Quando você manda uma dúvida:</strong> o texto da pergunta, para
        poder ser respondida. Se a resposta servir para mais gente, a pergunta
        pode ir para a página pública <a href="/duvidas">Dúvidas respondidas</a>
        {' '}— <strong>nunca com o seu nome</strong>, e com a pergunta revisada
        quando ela trouxer algum dado seu. Isso nunca é automático: depende de
        uma decisão de {LEGAL.responsavel}, e basta pedir para sair.
      </p>
      <p>
        <strong>Quando você escreve:</strong> o texto das tarefas das músicas,
        que são as perguntas sem gabarito. Fica guardado na sua conta para
        seguir com você de um aparelho para outro — antes ficava só no
        navegador e se perdia na troca de celular. Ninguém corrige esses
        textos, e eles não são usados para mais nada.
      </p>
      <p>
        <strong>Quando você escolhe:</strong> o curso, o sotaque do áudio e a
        trilha. E, se você marcar a caixa, o seu consentimento para receber
        novidades por e-mail, com a data em que você deu esse consentimento.
      </p>
      <p>
        <strong>Quando você assina:</strong> o plano, o estado dele, até quando
        vale, e uma referência da assinatura na {LEGAL.pagamento.nome}.{' '}
        <strong>Nenhum dado de cartão passa por aqui</strong> — a cobrança
        acontece inteira no site da {LEGAL.pagamento.nome}, e o que chega até
        nós é um aviso dizendo que a compra aconteceu, com o e-mail de quem
        comprou.
      </p>

      <h2>O que a gente não guarda</h2>
      <ul>
        <li>
          <strong>A sua voz.</strong> O botão de gravar usa o microfone do seu
          navegador, guarda o áudio na memória da página para você ouvir, e
          descarta quando você sai. Nada é enviado nem armazenado.
        </li>
        <li>
          <strong>O seu cartão.</strong> Nunca chega aqui. Veja acima.
        </li>
        <li>
          <strong>A sua navegação.</strong> Não há analytics, pixel de anúncio
          ou mapa de calor. Ninguém está contando os seus cliques.
        </li>
      </ul>

      <h2>Cookies e o que fica no seu navegador</h2>
      <p>
        Não usamos cookie de publicidade nem de rastreamento, e por isso não há
        banner de cookies aqui. O que existe:
      </p>
      <ul>
        <li>
          <code>lk_student</code> — o cookie que mantém você logado. É assinado,
          dura 90 dias e não pode ser lido por JavaScript.
        </li>
        <li>
          <code>lk_session</code> — o mesmo, para o painel do professor.
        </li>
        <li>
          <code>lk_trilha</code> e <code>lk_progress</code> — guardados no seu
          próprio navegador para lembrar a trilha escolhida e o progresso
          local. Não chegam ao servidor.
        </li>
        <li>
          <code>lk_musica_…</code> — uma cópia de emergência do que você
          escreveu nas tarefas, criada <em>só</em> quando o salvamento falha,
          para o texto não se perder. Ela é apagada do navegador na primeira
          vez que o texto chega ao servidor.
        </li>
      </ul>

      <h2>Com quem a gente divide</h2>
      <p>
        Com ninguém, para fins de marketing. Os dados passam por quem é preciso
        para o site existir:
      </p>
      <ul>
        <li>
          <strong>Vercel</strong> — hospeda o site e guarda registros técnicos
          de acesso, como qualquer servidor.
        </li>
        <li>
          <strong>Neon</strong> — é onde o banco de dados mora.
        </li>
        <li>
          <strong>{LEGAL.pagamento.nome}</strong> — processa o pagamento e nos
          avisa o resultado. Só entra em cena se você assinar.
        </li>
        <li>
          <strong>YouTube</strong> — as músicas tocam no player do YouTube, pelo
          endereço <code>youtube-nocookie.com</code>, que não planta cookie de
          rastreio antes de você dar play. O script do player, esse sim, é
          carregado do YouTube, e nisso o Google enxerga o seu acesso — é o
          preço de assistir ao vídeo no canal de quem o publicou, que é a única
          forma legal de usá-lo.
        </li>
      </ul>
      <p>
        As fontes do site são servidas do próprio domínio. Elas vêm do Google
        Fonts, mas são baixadas na hora de publicar o site, não quando você o
        visita — o seu navegador não fala com o Google por causa da tipografia.
      </p>

      <h2>Por quanto tempo</h2>
      <p>
        Enquanto a sua conta existir. Se você pedir para apagar, apagamos o seu
        cadastro, o seu progresso, as suas respostas e os avisos de pagamento
        ligados ao seu e-mail. Os registros técnicos da Vercel seguem a política
        de retenção deles, que não controlamos.
      </p>
      <p>
        Uma ressalva honesta sobre <strong>cópias de segurança</strong>: o
        responsável guarda cópias do banco fora do servidor, para o caso de
        perda ou erro, e uma cópia feita antes do seu pedido pode conter os
        seus dados por mais algum tempo. Elas não são usadas para nada além de
        restaurar o serviço, e a exclusão é aplicada na próxima cópia.
      </p>

      <h2>Os seus direitos</h2>
      <p>
        A Lei Geral de Proteção de Dados te dá o direito de saber o que
        guardamos, corrigir o que está errado, pedir uma cópia e pedir que tudo
        seja apagado. Para qualquer um deles, <Contato />. A gente responde no
        prazo da lei.
      </p>
      <p>
        Você também pode fazer boa parte disso sozinho: a sua senha e o seu
        código de recuperação você troca em Minha conta, e o consentimento da
        newsletter você desmarca quando quiser.
      </p>

      <h2>Crianças</h2>
      <p>
        O site não é feito para menores de 13 anos e não pede idade. Se você é
        responsável por uma criança que criou conta aqui, <Contato /> e a gente
        apaga.
      </p>

      <h2>Quando isto mudar</h2>
      <p>
        A data no topo é a da última mudança. Se mudar algo importante — um
        serviço novo no meio do caminho, um dado novo sendo guardado —, a data
        muda junto, e quem tiver conta é avisado.
      </p>
    </PaginaLegal>
  )
}
