/**
 * O CSS da porta de entrada.
 *
 * Segue as mesmas regras da página de vendas — curvas fortes, tracking por
 * tamanho, movimento vindo do PAPEL do elemento, e nada escondido de quem
 * não anima. Está duplicado em vez de compartilhado de propósito: a landing
 * está no ar vendendo, e extrair um sistema comum agora significaria mexer
 * nas duas ao mesmo tempo. Quando a terceira página pedir o mesmo, aí vale a
 * extração — com duas, o custo de errar é maior que o da repetição.
 *
 * O que NÃO foi copiado de lá: o trilho horizontal e o texto que acende
 * palavra por palavra. Esta página é curta e tem outra função — ela não
 * convence, ela encaminha. Movimento demais aqui atrasaria quem já sabe para
 * onde vai.
 */
export function EstilosDaHome() {
  return (
    <style>{`
      .hm {
        --gutter: clamp(1.25rem, 5vw, 2.5rem);
        --saida: cubic-bezier(.23, 1, .32, 1);
        --regua: color-mix(in srgb, var(--ink) 11%, transparent);
      }

      /* ── Tipografia: tracking específico do tamanho ── */
      .hm-display {
        font-family: var(--font-display), 'Bricolage Grotesque', sans-serif;
        font-weight: 800;
        font-size: clamp(2.1rem, 7.6vw, 3.6rem);
        letter-spacing: -0.038em;
        line-height: 1.02;
        margin: 0;
        text-wrap: balance;
      }
      .hm-titulo {
        font-family: var(--font-display), 'Bricolage Grotesque', sans-serif;
        font-weight: 800;
        font-size: clamp(1.45rem, 4.4vw, 2.1rem);
        letter-spacing: -0.028em;
        line-height: 1.1;
        margin: 0;
        text-wrap: balance;
      }
      .hm-sub {
        font-family: var(--font-display), 'Bricolage Grotesque', sans-serif;
        font-weight: 700;
        font-size: 1.05rem;
        letter-spacing: -0.018em;
        line-height: 1.25;
        margin: 0;
      }
      .hm-lead {
        font-size: clamp(1rem, 2.2vw, 1.15rem);
        line-height: 1.6;
        letter-spacing: -0.005em;
        margin: 0;
        text-wrap: pretty;
      }
      .hm-olho {
        font-size: 11px;
        font-weight: 700;
        letter-spacing: .18em;
        text-transform: uppercase;
        line-height: 1;
      }

      /* ── Estrutura ── */
      .hm-secao { padding: clamp(2.75rem, 7vw, 4.5rem) var(--gutter); }
      .hm-centro { max-width: 60rem; margin: 0 auto; }
      .hm-estreito { max-width: 38rem; margin: 0 auto; }

      /* Grão nas faixas escuras: superfície escura e lisa parece uma div;
         com grão parece um material. */
      .hm-grao { position: relative; isolation: isolate; }
      .hm-grao::before {
        content: '';
        position: absolute; inset: 0; z-index: -1;
        pointer-events: none; opacity: .5;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.82' numOctaves='3'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.055'/%3E%3C/svg%3E");
      }

      /* ── Botões: resposta imediata ao toque ── */
      .hm-cta {
        display: inline-flex; align-items: center; justify-content: center;
        gap: .4rem; min-height: 54px;
        padding: .85rem clamp(1.2rem, 4vw, 1.9rem);
        border-radius: 999px; text-decoration: none;
        background: var(--accent); color: var(--on-accent);
        font-size: 15.5px; font-weight: 700; letter-spacing: -0.01em;
        transition: transform 160ms var(--saida), box-shadow 220ms var(--saida);
      }
      @media (hover: hover) and (pointer: fine) {
        .hm-cta:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(0,0,0,.18); }
      }
      .hm-cta:active { transform: scale(.97); }

      .hm-link {
        color: var(--ink); font-weight: 600; text-decoration: none;
        display: inline-block; padding: .5rem .25rem; margin: -.5rem -.25rem;
        transition: transform 160ms var(--saida);
      }
      .hm-link:active { transform: scale(.98); }

      /* ── Trilhas: o que esta página precisava destacar ──
         Elas eram uma linha de lista; agora são o bloco central. Cada uma
         ocupa espaço e diz o que entrega, porque é a resposta à pergunta que
         o visitante realmente faz: "serve para o que eu preciso?" */
      .hm-trilhas {
        display: grid;
        gap: .85rem;
        grid-template-columns: 1fr;
      }
      @media (min-width: 720px) {
        .hm-trilhas { grid-template-columns: repeat(3, 1fr); }
      }
      .hm-trilha {
        display: flex; flex-direction: column;
        min-height: 13rem;
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: 18px;
        padding: 1.35rem 1.4rem;
        text-decoration: none; color: inherit;
        transition: transform 180ms var(--saida), box-shadow 220ms var(--saida), border-color 180ms ease;
      }
      @media (hover: hover) and (pointer: fine) {
        .hm-trilha:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 34px rgba(0,0,0,.09);
          border-color: var(--accent-dim);
        }
      }
      .hm-trilha:active { transform: scale(.985); }
      .hm-trilha-pe { margin-top: auto; padding-top: .9rem; }

      /* ── Números ── */
      .hm-numeros {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 0 clamp(1rem, 4vw, 2.5rem);
      }
      @media (min-width: 720px) {
        .hm-numeros { grid-template-columns: repeat(4, 1fr); }
      }
      .hm-numero-bloco { border-top: 1px solid var(--regua); padding: 1rem 0 1.2rem; }
      .hm-numero {
        font-family: var(--font-display), 'Bricolage Grotesque', sans-serif;
        font-weight: 800;
        font-size: clamp(2.1rem, 5.5vw, 3rem);
        letter-spacing: -0.04em;
        line-height: .95;
        font-variant-numeric: tabular-nums;
      }

      /* ── FAQ ── */
      .hm-faq { border-bottom: 1px solid var(--regua); }
      .hm-faq summary {
        cursor: pointer; list-style: none;
        min-height: 56px; padding: 1.1rem 0;
        display: flex; align-items: center; justify-content: space-between; gap: 1rem;
        font-size: 1rem; font-weight: 600; letter-spacing: -0.012em; color: var(--ink);
      }
      .hm-faq summary::-webkit-details-marker { display: none; }
      .hm-faq summary::after {
        content: '+'; flex-shrink: 0;
        font-size: 1.4rem; line-height: 1; color: var(--ink3);
        transition: transform 220ms var(--saida), color 180ms ease;
      }
      .hm-faq[open] summary::after { transform: rotate(45deg); color: var(--ink); }
      .hm-faq p { margin: 0 0 1.2rem; font-size: .95rem; line-height: 1.7; color: var(--ink2); }

      /* ── Coreografia ──
         Papéis, não uma classe para tudo. O que lidera anda mais e demora
         mais; o que acompanha anda menos; enfeite só aparece. */
      @media (prefers-reduced-motion: no-preference) {
        .hm-entra > * {
          animation: hm-subir .6s var(--saida) both;
          animation-delay: var(--atraso, 0ms);
        }
        @keyframes hm-subir { from { opacity: 0; transform: translateY(12px); } }
      }

      @supports (animation-timeline: view()) {
        @media (prefers-reduced-motion: no-preference) {
          .hm-lidera, .hm-apoia {
            animation: hm-rolar linear both;
            animation-timeline: view();
            animation-range: entry 3% entry 40%;
          }
          .hm-apoia { --sobe: 10px; animation-range: entry 5% entry 46%; }
          @keyframes hm-rolar {
            from { opacity: 0; transform: translateY(var(--sobe, 20px)); }
            to   { opacity: 1; transform: none; }
          }
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .hm-entra > *, .hm-lidera, .hm-apoia {
          animation: none !important;
          opacity: 1 !important;
          transform: none !important;
        }
      }
    `}</style>
  )
}
