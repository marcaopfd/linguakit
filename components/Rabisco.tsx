/**
 * O rabisco.
 *
 * As referências que o Marcos escolheu têm todas a mesma assinatura: um traço
 * limão desenhado à mão, grosso, passando por trás do título. É o que impede
 * que uma página de fundo escuro com um botão verde pareça um painel de
 * administração — o traço diz que alguém desenhou isto.
 *
 * Fica atrás do conteúdo e não recebe toque; é decoração, e some para quem
 * usa leitor de tela.
 */
export function Rabisco({ largura = 260, className, style }: {
  largura?: number
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <svg
      viewBox="0 0 300 120"
      width={largura}
      height={largura * 0.4}
      fill="none"
      aria-hidden
      focusable="false"
      className={className}
      style={{ pointerEvents: 'none', ...style }}
    >
      <path
        d="M14 86 C40 22 76 14 96 44 C113 69 92 104 68 96 C44 88 54 40 96 28 C134 17 160 52 186 66 C214 81 238 62 236 40 C234 22 214 18 206 32 C197 48 214 70 244 72 C266 73 282 60 288 44"
        stroke="var(--accent)"
        strokeWidth="17"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
