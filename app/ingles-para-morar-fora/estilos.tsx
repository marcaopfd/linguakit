/**
 * O CSS da página de vendas, junto dela.
 *
 * Não vai para o globals.css porque é a única página que usa: tipo fluido,
 * materiais translúcidos, trilho horizontal e a coreografia ligada à rolagem.
 * Carregar isso em toda lição seria peso sem uso.
 *
 * ─── As regras que guiaram este arquivo ─────────────────────────────────
 *
 * 1. MOVIMENTO COM MOTIVO. Cada animação aqui explica, hierarquiza ou dá
 *    resposta ao toque. A versão anterior tinha uma classe só, `.lp-surge`,
 *    aplicada a tudo: título, cartão, número, parágrafo. Dezoito cartões
 *    subindo 26px no mesmo tempo e na mesma curva é um metrônomo, não uma
 *    onda — e foi exatamente isso que fez a página parecer genérica. Agora o
 *    movimento vem do PAPEL do elemento: `.lp-lead` lidera, `.lp-apoio`
 *    acompanha com menos distância, `.lp-enfeite` só aparece. O resto não se
 *    move.
 *
 * 2. CURVAS FORTES. As curvas nativas do CSS são fracas. `ease-out` aqui é
 *    cubic-bezier(.23,1,.32,1), que sai rápido e assenta — a diferença entre
 *    uma interface que responde e uma que demora.
 *
 * 3. SÓ TRANSFORM E OPACITY no que anima com a rolagem. São as duas
 *    propriedades que o navegador resolve no compositor, fora da thread
 *    principal. A exceção consciente é o FAQ, que anima altura: ele abre uma
 *    vez a cada visita, e a alternativa (conteúdo pulando) é pior.
 *
 * 4. NADA ESCONDIDO DE QUEM NÃO ANIMA. Toda revelação vive dentro de
 *    `@supports (animation-timeline: view())` e de
 *    `prefers-reduced-motion: no-preference`. Sem suporte ou com movimento
 *    reduzido, a página inteira chega visível — não uma página em branco.
 *
 * 5. CONTRASTE CALCULADO, não estimado. Todo texto claro translúcido sobre o
 *    painel usa alfa 0,5 ou mais: dá 4,91 no tema claro e 4,76 no escuro, os
 *    dois acima do mínimo de 4,5. Abaixo disso só texto grande, onde o
 *    mínimo é 3,0.
 */
export function EstilosDaLanding() {
  return (
    <style>{`
      .lp {
        --gutter: clamp(1.25rem, 5vw, 3rem);

        /* A barra do topo é irmã do herói, não filha dele, então o nome da
           linha de tempo precisa ser declarado aqui para as duas se
           encontrarem. Sem isto a barra simplesmente nunca aparece. */
        timeline-scope: --heroi;

        /* As curvas. Nomeadas uma vez, usadas em tudo. */
        --saida: cubic-bezier(.23, 1, .32, 1);
        --entra-sai: cubic-bezier(.77, 0, .175, 1);

        /* A régua fina que separa sem pesar: um traço de tinta diluída, que
           se adapta aos dois temas sozinho. Borda cheia num layout editorial
           parece formulário. */
        --regua: color-mix(in srgb, var(--ink) 11%, transparent);
      }

      /* ═══════════════════════ TIPOGRAFIA ═══════════════════════
         Tracking é específico do tamanho, nunca um valor para todos. Texto
         grande precisa de tracking NEGATIVO (as letras se afastam demais
         quando crescem); texto pequeno precisa de um pouco de positivo para
         respirar. Line-height anda ao contrário do tamanho: apertado no
         título, solto no corpo. */

      .lp-display {
        font-family: var(--font-display), 'Bricolage Grotesque', sans-serif;
        font-weight: 800;
        font-size: clamp(2.6rem, 8.8vw, 6.25rem);
        letter-spacing: -0.045em;
        line-height: .96;
        margin: 0;
        text-wrap: balance;
      }
      .lp-display-2 {
        font-family: var(--font-display), 'Bricolage Grotesque', sans-serif;
        font-weight: 800;
        font-size: clamp(1.9rem, 5.4vw, 3.5rem);
        letter-spacing: -0.032em;
        line-height: 1.04;
        margin: 0;
        text-wrap: balance;
      }
      .lp-display-3 {
        font-family: var(--font-display), 'Bricolage Grotesque', sans-serif;
        font-weight: 800;
        font-size: clamp(1.35rem, 3vw, 1.9rem);
        letter-spacing: -0.022em;
        line-height: 1.12;
        margin: 0;
      }
      .lp-lead {
        font-size: clamp(1.05rem, 2.3vw, 1.35rem);
        letter-spacing: -0.006em;
        line-height: 1.5;
        margin: 0;
        text-wrap: pretty;
      }
      .lp-corpo {
        font-size: 1.02rem;
        line-height: 1.72;
        margin: 0;
        text-wrap: pretty;
      }
      /* O sobretítulo é pequeno, então ganha tracking positivo: em caixa
         alta e 11,5px, as letras colam sem ele. */
      .lp-olho {
        font-size: 11.5px;
        font-weight: 700;
        letter-spacing: .185em;
        text-transform: uppercase;
        line-height: 1;
      }

      /* ═══════════════════════ ESTRUTURA ═══════════════════════
         O ritmo varia de propósito. Seções do mesmo tamanho, uma embaixo da
         outra, é o que faz uma página longa parecer um formulário. */
      .lp-secao { padding: clamp(4.5rem, 11vw, 9rem) var(--gutter); position: relative; }
      .lp-secao-apertada { padding: clamp(3rem, 7vw, 5rem) var(--gutter); }
      .lp-centro { max-width: 70rem; margin: 0 auto; }
      .lp-estreito { max-width: 46rem; margin: 0 auto; }
      .lp-medida { max-width: 34rem; }

      /* ═══════════════════════ MATERIAIS ═══════════════════════ */

      /* Grão de filme nas seções escuras.
         Uma superfície escura e lisa na web parece uma div; com grão parece
         um material. Fica só no escuro porque é lá que ele lê — sobre creme,
         grão só suja o texto. Gerado em SVG, sem imagem para baixar. */
      .lp-grao { position: relative; isolation: isolate; }
      .lp-grao::before {
        content: '';
        position: absolute;
        inset: 0;
        z-index: -1;
        pointer-events: none;
        opacity: .5;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.82' numOctaves='3'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.055'/%3E%3C/svg%3E");
      }

      /* A barra que flutua. Material escuro nos dois temas, como todo
         --panel deste projeto: ela passa por cima de seção clara e de seção
         escura, e um material que muda de cor no meio do caminho pisca. */
      .lp-topo {
        /* Fixa, e não grudenta. Grudenta ela OCUPA uma faixa no fluxo mesmo
           com opacidade zero, e o herói escuro abria com um risco de creme
           em cima — a barra invisível aparecendo como um vão. */
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 60;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding: .7rem var(--gutter);
        background: color-mix(in srgb, var(--panel) 72%, transparent);
        backdrop-filter: blur(18px) saturate(170%);
        -webkit-backdrop-filter: blur(18px) saturate(170%);
        /* Aresta clara no topo: é a luz pegando na beirada do material. */
        box-shadow: inset 0 1px 0 color-mix(in srgb, var(--on-panel) 12%, transparent),
                    0 1px 24px rgba(0,0,0,.18);
      }
      /* Translucidez é preferência do sistema: quem pediu menos recebe
         material opaco, não um vidro mais forte. */
      @media (prefers-reduced-transparency: reduce) {
        .lp-topo { background: var(--panel); backdrop-filter: none; -webkit-backdrop-filter: none; }
      }
      .lp-topo-marca {
        font-family: var(--font-display), 'Bricolage Grotesque', sans-serif;
        font-weight: 800;
        font-size: 15px;
        letter-spacing: -0.02em;
        color: var(--on-panel);
        text-decoration: none;
      }
      /* A linha de progresso. Numa página desta altura ela responde "quanto
         falta", que é a pergunta que faz a pessoa desistir no meio. */
      .lp-progresso {
        position: absolute;
        left: 0; right: 0; bottom: 0;
        height: 2px;
        background: var(--accent);
        transform: scaleX(0);
        transform-origin: 0 50%;
      }

      /* ═══════════════════════ BOTÕES ═══════════════════════
         Pressionar tem que dar resposta imediata. scale(.97) em :active é a
         diferença entre um botão que ouviu e um que vai pensar. */
      .lp-cta {
        display: inline-flex; align-items: center; justify-content: center;
        gap: .5rem;
        min-height: 58px;
        padding: .9rem clamp(1.25rem, 5vw, 2.1rem);
        border-radius: 999px;
        text-align: center; text-decoration: none;
        background: var(--accent); color: var(--on-accent);
        font-size: clamp(.95rem, 3.6vw, 1.05rem); font-weight: 700;
        letter-spacing: -0.01em;
        /* Propriedades nomeadas, nunca "all": "all" anima coisas que você
           não sabe que existem e paga por todas. Acento grave não entra em
           comentário daqui: este CSS mora dentro de um template literal, e
           um acento grave fecha a string no meio do arquivo. */
        transition: transform 160ms var(--saida), box-shadow 220ms var(--saida);
        box-shadow: 0 1px 2px rgba(0,0,0,.06);
      }
      /* Hover só onde hover existe. No toque, :hover dispara no tap e fica
           preso aceso depois do dedo sair. */
      @media (hover: hover) and (pointer: fine) {
        .lp-cta:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(0,0,0,.18); }
      }
      .lp-cta:active { transform: scale(.97); box-shadow: 0 1px 2px rgba(0,0,0,.06); }

      .lp-cta-pequeno {
        min-height: 40px; padding: .45rem 1rem;
        font-size: 13.5px;
        border-radius: 999px;
        display: inline-flex; align-items: center;
        background: var(--accent); color: var(--on-accent);
        font-weight: 700; text-decoration: none;
        transition: transform 160ms var(--saida);
      }
      .lp-cta-pequeno:active { transform: scale(.97); }

      .lp-link-fantasma {
        display: inline-flex; align-items: center;
        min-height: 44px; padding: .5rem;
        font-size: 14.5px; font-weight: 600; text-decoration: none;
        color: color-mix(in srgb, var(--on-panel) 70%, transparent);
        transition: color 180ms ease, transform 160ms var(--saida);
      }
      @media (hover: hover) and (pointer: fine) {
        .lp-link-fantasma:hover { color: var(--on-panel); }
      }
      .lp-link-fantasma:active { transform: scale(.98); }

      /* ═══════════════════════ COMPOSIÇÃO ═══════════════════════ */

      /* O cartão não tem borda: tem uma régua em cima e ar embaixo. Dezoito
         retângulos com borda viram uma planilha; dezoito blocos separados
         por régua viram uma lista editorial. */
      .lp-ficha {
        border-top: 1px solid var(--regua);
        padding: 1.15rem 0 1.4rem;
      }

      .lp-cartao {
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: 20px;
        padding: 1.35rem 1.4rem;
      }

      /* A grade de números: a primeira célula é maior, porque um número
         importa mais que os outros cinco. Grade de iguais não tem
         hierarquia, e sem hierarquia o olho não tem para onde ir. */
      /* Três por linha, duas linhas. Com auto-fit cabiam quatro e sobravam
         dois na segunda fila, e uma fileira incompleta parece um erro de
         diagramação, não uma escolha. */
      .lp-numeros {
        display: grid;
        gap: 0 clamp(1.5rem, 4vw, 3.5rem);
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
      @media (min-width: 760px) {
        .lp-numeros { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      }
      .lp-numero {
        font-family: var(--font-display), 'Bricolage Grotesque', sans-serif;
        font-weight: 800;
        font-size: clamp(3rem, 7vw, 4.75rem);
        letter-spacing: -0.045em;
        line-height: .92;
        /* Dígitos de largura fixa: sem isso, 273 e 195 ficam com larguras
           diferentes e a coluna de números desalinha. */
        font-variant-numeric: tabular-nums;
      }

      /* ═══════════════════════ O TRILHO DAS SITUAÇÕES ═══════════════════════
         Dezoito cartões numa grade vertical são uma parede: a pessoa rola
         por cima sem ler nenhum. Em trilho, ela percorre — e o percurso é
         justamente o argumento da página, que o curso é organizado por
         situação.

         No celular: rolagem horizontal de dedo, com encaixe. É o gesto que
         a pessoa já conhece, e nada é sequestrado.
         No desktop: a seção prende e o trilho anda com a rolagem. */

      .lp-trilho-sticky { overflow: clip; }
      .lp-trilho {
        display: flex;
        gap: var(--trilho-gap, 1rem);
        padding-inline: var(--gutter);
      }
      .lp-situacao {
        flex: 0 0 var(--trilho-card, 19rem);
        display: flex;
        flex-direction: column;
        /* Altura mínima para o trilho ter peso. Cartões com a altura do
           próprio texto ficam desiguais e o trilho vira um gráfico de
           barras. */
        min-height: 15rem;
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: 20px;
        padding: 1.5rem;
        scroll-snap-align: center;
      }
      /* A promessa desce para o pé do cartão: o título fica no alto, alinhado
         com o dos vizinhos, e a linha de baixo vira uma régua de leitura. */
      .lp-situacao > p { margin-top: auto; }

      /* Quanto falta do trilho. Numa faixa que prende a página, a pessoa
         precisa saber que isto tem fim. */
      .lp-trilho-regua {
        height: 2px;
        background: var(--regua);
        margin: clamp(1.5rem, 3vw, 2.25rem) var(--gutter) 0;
        position: relative;
        overflow: hidden;
      }
      .lp-trilho-regua::after {
        content: '';
        position: absolute;
        inset: 0;
        background: var(--accent);
        transform: scaleX(0);
        transform-origin: 0 50%;
      }
      @media (max-width: 899px) { .lp-trilho-regua { display: none; } }

      @media (max-width: 899px) {
        .lp-trilho {
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding-bottom: 1.25rem;
          /* Deixa o último cartão chegar ao centro da tela. */
          scroll-padding-inline: var(--gutter);
        }
        .lp-situacao { --trilho-card: 16.5rem; }
      }

      /* ═══════════════════════ O TELEFONE ═══════════════════════ */
      .lp-fone {
        width: min(300px, 78vw);
        border-radius: 36px;
        padding: 10px;
        background: #0b0d08;
        box-shadow: 0 40px 80px -20px rgba(0,0,0,.55),
                    inset 0 0 0 1px rgba(255,255,255,.09);
      }
      .lp-fone-tela {
        background: var(--cream);
        /* A tela do telefone é clara dentro de uma seção escura. Sem esta
           linha, o que não tiver cor explícita herda o claro da seção e
           desaparece — foi o que aconteceu com o preço. */
        color: var(--ink);
        border-radius: 27px;
        overflow: hidden;
        min-height: 400px;
      }

      /* ═══════════════════════ FAQ ═══════════════════════ */
      .lp-faq { border-bottom: 1px solid var(--regua); }
      .lp-faq summary {
        cursor: pointer; list-style: none;
        padding: 1.25rem 0; min-height: 56px;
        display: flex; align-items: center; justify-content: space-between; gap: 1rem;
        font-size: 1.05rem; font-weight: 600; letter-spacing: -0.012em; color: var(--ink);
      }
      .lp-faq summary::-webkit-details-marker { display: none; }
      .lp-faq summary::after {
        content: '+'; flex-shrink: 0;
        font-size: 1.5rem; line-height: 1; color: var(--ink3);
        transition: transform 220ms var(--saida), color 180ms ease;
      }
      .lp-faq[open] summary::after { transform: rotate(45deg); color: var(--ink); }
      @media (hover: hover) and (pointer: fine) {
        .lp-faq summary:hover::after { color: var(--ink); }
      }
      .lp-faq p { margin: 0 0 1.35rem; font-size: .98rem; line-height: 1.7; color: var(--ink2); max-width: 44rem; }

      /* O FAQ abre na hora, sem animação de altura, e isso foi medido, não
         assumido.
         Eu tinha escrito a receita moderna — "interpolate-size:
         allow-keywords" com transição de block-size em "::details-content" —
         e conferi no navegador quadro a quadro: o bloco pulava de 0 para a
         altura final em dois quadros, com height e com block-size, mesmo com
         tudo computando certo (interpolate-size herdando, allow-discrete
         registrado, ::details-content suportado). Em vez de deixar CSS que
         finge animar, tirei. O giro do "+" para "×" é o retorno que o toque
         precisa, e esse funciona.
         Isto também devolve a página inteira à regra de só animar transform e
         opacity: não há mais exceção. */

      /* ═══════════════════════ COREOGRAFIA ═══════════════════════

         Papéis, não uma classe para tudo:

           .lp-lead     — o que a pessoa precisa ver. Anda mais, demora mais.
           .lp-apoio    — o que acompanha. Anda menos.
           .lp-enfeite  — selo, régua, sobretítulo. Só aparece, não anda.

         Um contêiner, uma entrada. Se o bloco entra, os filhos dele já
         estão lá — animar os dois é fazer a pessoa esperar duas vezes. */

      @media (prefers-reduced-motion: no-preference) {
        /* ── A entrada do herói: acontece no carregamento, uma vez ──
           Os intervalos ENCURTAM (120ms, 60ms, 60ms, 50ms). Intervalos
           iguais soam como metrônomo; intervalos que fecham soam como onda. */
        .lp-entra > * {
          animation: lp-subir .62s var(--saida) both;
          animation-delay: var(--atraso, 0ms);
        }
        .lp-entra > .lp-enfeite { animation-name: lp-aparecer; animation-duration: .5s; }

        @keyframes lp-subir {
          from { opacity: 0; transform: translateY(14px); }
        }
        @keyframes lp-aparecer {
          from { opacity: 0; }
        }

        /* O título sobe de dentro de uma fenda, linha por linha. O texto
           está no HTML inteiro — quem lê com leitor de tela e quem indexa
           recebem a frase completa; só o desenho é recortado. */
        .lp-fenda { display: block; overflow: hidden; padding-bottom: .04em; }
        .lp-fenda > span {
          display: block;
          animation: lp-da-fenda .78s var(--saida) both;
          animation-delay: var(--atraso, 0ms);
        }
        @keyframes lp-da-fenda {
          from { transform: translateY(104%); }
        }
      }

      @supports (animation-timeline: view()) {
        @media (prefers-reduced-motion: no-preference) {

          /* ── Entradas ligadas à rolagem ── */
          .lp-lead, .lp-apoio, .lp-enfeite-rola {
            animation: lp-subir-rolando linear both;
            animation-timeline: view();
            animation-range: entry 2% entry 38%;
          }
          .lp-apoio { animation-range: entry 4% entry 44%; }
          .lp-enfeite-rola { animation-name: lp-aparecer; animation-range: entry 0% entry 30%; }

          @keyframes lp-subir-rolando {
            from { opacity: 0; transform: translateY(var(--sobe, 22px)); }
            to   { opacity: 1; transform: none; }
          }
          .lp-apoio { --sobe: 12px; }

          /* ── O texto que acende palavra por palavra ──
             Serve para ritmar a leitura do parágrafo que carrega o
             argumento. Cada palavra recebe o seu próprio trecho da rolagem
             pelo style inline, porque linha de tempo de rolagem ignora
             animation-delay: quem manda é o animation-range.

             O piso é 0,32 de opacidade e o trecho é curto: a palavra fica
             apagada por um instante, nunca é um estado de descanso. */
          .lp-acende > span {
            animation: lp-acender linear both;
            animation-timeline: view();
            animation-range: cover var(--de, 10%) cover var(--ate, 40%);
          }
          @keyframes lp-acender {
            from { opacity: .32; }
            to   { opacity: 1; }
          }

          /* ── A barra de cima aparece quando o herói sai ──
             Enquanto o herói está na tela, o botão dele está na tela: uma
             segunda barra ali em cima seria repetição. Quando o herói sai, a
             barra materializa e o botão volta a ficar ao alcance do polegar. */
          .lp-heroi { view-timeline-name: --heroi; view-timeline-axis: block; }
          .lp-topo {
            animation: lp-topo-chega linear both;
            animation-timeline: --heroi;
            animation-range: exit 25% exit 85%;
          }
          @keyframes lp-topo-chega {
            from { opacity: 0; transform: translateY(-100%); }
            to   { opacity: 1; transform: none; }
          }

          /* ── A linha de progresso ── */
          .lp-progresso {
            animation: lp-progredir linear both;
            animation-timeline: scroll(root block);
          }
          @keyframes lp-progredir {
            to { transform: scaleX(1); }
          }

          /* ── A conversa que avança conforme a pessoa rola ──
             Esta é a animação mais justificada da página: ela EXPLICA o
             produto. Ler três balões parados não mostra que a negociação
             tem turnos; vê-los chegar na ordem, sim. */
          .lp-conversa { view-timeline-name: --conversa; view-timeline-axis: block; }
          .lp-turno {
            animation: lp-turno-chega linear both;
            animation-timeline: --conversa;
            animation-range: cover var(--de, 15%) cover var(--ate, 35%);
          }
          @keyframes lp-turno-chega {
            from { opacity: 0; transform: translateY(10px) scale(.97); }
            to   { opacity: 1; transform: none; }
          }

          /* ── O trilho das situações, no desktop ──
             A seção é alta; enquanto ela cobre a tela, o trilho anda. O
             deslocamento sai da CONTA do conteúdo: número de cartões vindo
             dos dados, vezes a largura de cada um, menos a tela. O min(0px,…)
             é o que impede o trilho de andar para o lado errado se um dia
             sobrarem poucos cartões. */
          @media (min-width: 900px) {
            .lp-trilho-wrap {
              height: calc(var(--n, 18) * 34vh);
              view-timeline-name: --trilho;
              view-timeline-axis: block;
            }
            .lp-trilho-sticky {
              position: sticky;
              top: 0;
              height: 100vh;
              display: flex;
              align-items: center;
            }
            .lp-trilho {
              animation: lp-trilhar linear both;
              animation-timeline: --trilho;
              animation-range: contain 0% contain 100%;
            }
            .lp-trilho-regua::after {
              animation: lp-progredir linear both;
              animation-timeline: --trilho;
              animation-range: contain 0% contain 100%;
            }

            @keyframes lp-trilhar {
              to {
                transform: translateX(min(0px, calc(
                  100vw - var(--n, 18) * (var(--trilho-card, 19rem) + var(--trilho-gap, 1rem)) - var(--gutter) * 2
                )));
              }
            }
          }

          /* ── O preço cresce um fio ao entrar ──
             Dois por cento. Não é para a pessoa ver o movimento: é para o
             número chegar com peso em vez de já estar lá. */
          .lp-preco {
            animation: lp-preco-chega linear both;
            animation-timeline: view();
            animation-range: entry 10% entry 70%;
          }
          @keyframes lp-preco-chega {
            from { opacity: 0; transform: scale(.98); }
            to   { opacity: 1; transform: none; }
          }
        }
      }

      /* Sem suporte a linha de tempo de rolagem, ou com movimento reduzido:
         tudo visível e parado. Esta regra é a rede de segurança, e vem
         DEPOIS de propósito. */
      @media (prefers-reduced-motion: reduce) {
        .lp-lead, .lp-apoio, .lp-enfeite, .lp-enfeite-rola,
        .lp-entra > *, .lp-fenda > span, .lp-turno, .lp-preco, .lp-acende > span {
          animation: none !important;
          opacity: 1 !important;
          transform: none !important;
        }
        .lp-topo { opacity: 1; transform: none; }
        .lp-progresso { display: none; }
      }

      /* ═══════════════════════ ENFEITES ═══════════════════════ */
      /* O rabisco atravessava o título no celular, e um título ilegível
         custa mais do que o enfeite vale. */
      .lp-rabisco { position: absolute; top: 2%; right: -8%; opacity: .32; z-index: 0; }
      @media (max-width: 900px) { .lp-rabisco { display: none; } }


    `}</style>
  )
}
