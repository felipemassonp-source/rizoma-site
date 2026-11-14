import { useId } from "react";

/**
 * Logotipo do Rizoma, redesenhado em vetor a partir do Manual da Marca (Casa14).
 * PROVISÓRIO: trocar pelos arquivos vetoriais originais quando chegarem.
 * Medidas tiradas do slide do manual (unidade = pixel do slide de 1456 px).
 */

type Props = {
  className?: string;
  comAssinatura?: boolean;
  titulo?: string;
};

const TRACO = 11;

export function Simbolo({ className, traco = 9.2 }: { className?: string; traco?: number }) {
  return (
    <svg
      className={className}
      viewBox="351 0 137 98.4"
      fill="none"
      stroke="currentColor"
      strokeWidth={traco}
      strokeLinejoin="miter"
      strokeMiterlimit={10}
      aria-hidden="true"
    >
      <LinhasSimbolo />
    </svg>
  );
}

/** As quatro linhas do símbolo, no sistema de coordenadas do logotipo. */
export function LinhasSimbolo() {
  const id = `rz-simb-${useId().replace(/:/g, "")}`;
  return (
    <g clipPath={`url(#${id})`}>
      <defs>
        <clipPath id={id}>
          <rect x="351" y="0" width="137" height="98.4" />
        </clipPath>
      </defs>
      <path d="M345 4.6 H494" />
      <path d="M345 25.1 L389.3 21.7 L419.3 35 L448.4 21.7 L494 25.1" />
      <path d="M345 53.6 L384.3 40.8 L419.3 63.3 L454.3 40.8 L494 53.6" />
      <path d="M345 86.1 L379.7 60 L419.3 92.4 L459.3 60 L494 86.1" />
    </g>
  );
}

export function Logo({ className, comAssinatura = false, titulo = "Rizoma — Ioga e Sociedade" }: Props) {
  const altura = comAssinatura ? 166 : 98.4;
  const clip = `rz-letras-${useId().replace(/:/g, "")}`;
  return (
    <svg
      className={className}
      viewBox={`0 0 602 ${altura}`}
      fill="none"
      role="img"
      aria-label={titulo}
    >
      <title>{titulo}</title>
      <defs>
        <clipPath id={clip}>
          <rect x="0" y="0" width="602" height="98.4" />
        </clipPath>
      </defs>
      <g
        stroke="currentColor"
        strokeWidth={TRACO}
        strokeLinejoin="miter"
        strokeMiterlimit={10}
        clipPath={`url(#${clip})`}
      >
        {/* R */}
        <path d="M5.5 104 V5.5 H53 A23.5 23.5 0 0 1 53 52.5 H52.5 V69 L86 102" />
        {/* I */}
        <path d="M107.5 0 V104" />
        {/* Z */}
        <path d="M129 5.5 H217.5 L135.5 92.5 H223" />
        {/* O */}
        <circle cx="287" cy="49.2" r="43.7" />
        {/* a */}
        <circle cx="553" cy="49.2" r="43.7" />
        <path d="M596.5 49 V104" />
      </g>
      {/* símbolo no lugar do M */}
      <g stroke="currentColor" strokeWidth={9.2} strokeLinejoin="miter" strokeMiterlimit={10}>
        <LinhasSimbolo />
      </g>
      {comAssinatura && (
        <text
          x="0"
          y="162"
          fill="currentColor"
          fontFamily="var(--fonte-texto), sans-serif"
          fontWeight={400}
          fontSize={36}
          textLength={602}
          lengthAdjust="spacing"
        >
          IOGA E SOCIEDADE
        </text>
      )}
    </svg>
  );
}
