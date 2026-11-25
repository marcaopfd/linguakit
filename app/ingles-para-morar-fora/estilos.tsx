/**
 * O CSS da página de vendas, junto dela.
 *
 * Não vai para o globals.css porque é a única página que usa: tipo fluido,
 * grade de situações e a revelação ao rolar. Carregar isso em toda lição
 * seria peso sem uso.
 *
 * A revelação respeita `prefers-reduced-motion`: quem pediu menos movimento
 * recebe a página inteira já visível, e não uma página em branco.
 */
export function EstilosDaLanding() {
  return (
    <style>{`
      .lp { --gutter: clamp(1.25rem, 5vw, 3rem); }

      /* Tipo fluido: o mesmo texto cabe no celular e domina o desktop,
         sem três breakpoints para manter. */
      .lp-display {
        font-family: var(--font-display), 'Bricolage Grotesque', sans-serif;
        font-weight: 800;
        letter-spacing: -0.035em;
        line-height: 1.02;
        font-size: clamp(2.5rem, 8.5vw, 5.75rem);
        margin: 0;
      }
      .lp-display-2 {
        font-family: var(--font-display), 'Bricolage Grotesque', sans-serif;
        font-weight: 800;
        letter-spacing: -0.03em;
        line-height: 1.06;
        font-size: clamp(1.9rem, 5.6vw, 3.4rem);
        margin: 0;
      }
      .lp-lead {
        font-size: clamp(1rem, 2.4vw, 1.3rem);
        line-height: 1.55;
        margin: 0;
      }

      .lp-secao { padding: clamp(4rem, 11vw, 8.5rem) var(--gutter); }
      .lp-centro { max-width: 68rem; margin: 0 auto; }
      .lp-estreito { max-width: 46rem; margin: 0 auto; }

      .lp-grade {
        display: grid;
        gap: .9rem;
        grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
      }

      .lp-cartao {
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: 18px;
        padding: 1.35rem 1.4rem;
      }

      .lp-numero {
        font-family: var(--font-display), 'Bricolage Grotesque', sans-serif;
        font-weight: 800;
        letter-spacing: -0.03em;
        font-size: clamp(2.4rem, 6vw, 3.6rem);
        line-height: 1;
      }

      .lp-cta {
        display: inline-flex; align-items: center; justify-content: center;
        gap: .5rem; min-height: 58px; padding: .9rem clamp(1.25rem, 5vw, 2rem);
        text-align: center;
        border-radius: 999px; text-decoration: none;
        background: var(--accent); color: var(--on-accent);
        font-size: clamp(.95rem, 3.6vw, 1.05rem); font-weight: 700;
        transition: transform .18s ease, box-shadow .18s ease;
        box-shadow: 0 1px 0 rgba(0,0,0,.04);
      }
      .lp-cta:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(0,0,0,.16); }

      /* Revelação ao rolar, só com CSS: sem JavaScript, sem biblioteca, sem
         conteúdo escondido de quem lê com leitor de tela. */
      @supports (animation-timeline: view()) {
        @media (prefers-reduced-motion: no-preference) {
          .lp-surge {
            animation: lp-surgir linear both;
            animation-timeline: view();
            animation-range: entry 0% entry 42%;
          }
          @keyframes lp-surgir {
            from { opacity: 0; transform: translateY(26px); }
            to   { opacity: 1; transform: none; }
          }
        }
      }

      /* O rabisco é enfeite: no celular ele atravessava o título, e um
         título ilegível custa mais do que o enfeite vale. Some abaixo de
         900px, onde não há margem para ele. */
      .lp-rabisco { position: absolute; top: 4%; right: -6%; opacity: .4; z-index: 0; }
      @media (max-width: 900px) { .lp-rabisco { display: none; } }

      /* O telefone de mentira que mostra conteúdo de verdade. */
      .lp-fone {
        width: min(300px, 78vw);
        border-radius: 34px;
        padding: 10px;
        background: #0b0d08;
        box-shadow: 0 30px 70px rgba(0,0,0,.35), inset 0 0 0 1px rgba(255,255,255,.08);
      }
      .lp-fone-tela {
        background: var(--cream);
        /* A tela do telefone é clara dentro de uma seção escura. Sem esta
           linha, o que não tiver cor explícita herda o branco da seção e
           desaparece — foi o que aconteceu com o preço. */
        color: var(--ink);
        border-radius: 25px;
        overflow: hidden;
        min-height: 400px;
      }

      .lp-faq { border-bottom: 1px solid var(--border); }
      .lp-faq summary {
        cursor: pointer; list-style: none;
        padding: 1.15rem 0; min-height: 56px;
        display: flex; align-items: center; justify-content: space-between; gap: 1rem;
        font-size: 1.02rem; font-weight: 600; color: var(--ink);
      }
      .lp-faq summary::-webkit-details-marker { display: none; }
      .lp-faq summary::after {
        content: '+'; flex-shrink: 0;
        font-size: 1.4rem; line-height: 1; color: var(--ink3);
        transition: transform .2s ease;
      }
      .lp-faq[open] summary::after { transform: rotate(45deg); }
      .lp-faq p { margin: 0 0 1.15rem; font-size: .96rem; line-height: 1.65; color: var(--ink2); }
    `}</style>
  )
}
