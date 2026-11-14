/**
 * Mockup vetorial do Boné Respira (modelo dad hat, visto em 3/4),
 * com o símbolo do Rizoma bordado na frente. A cor do boné muda conforme
 * a escolha; o bordado fica vinho nos bonés claros e creme nos escuros.
 * PROVISÓRIO até chegarem as fotos reais do boné.
 */

import { LinhasSimbolo } from "../Logo";

function escuro(hex: string) {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return 0.299 * r + 0.587 * g + 0.114 * b < 140;
}

export function BoneMockup({ cor, className, rotulo }: { cor: string; className?: string; rotulo?: string }) {
  const bordado = escuro(cor) ? "#f0dabb" : "#561111";
  return (
    <svg className={className} viewBox="0 0 400 300" role="img" aria-label={rotulo ?? "Boné Respira"}>
      {/* sombra no chão */}
      <ellipse cx="190" cy="262" rx="170" ry="14" fill="#000" opacity="0.12" />

      {/* copa */}
      <path d="M108 206 C100 120 160 62 236 62 C312 62 364 118 362 206 C330 216 270 222 220 218 C180 216 140 212 108 206 Z" fill={cor} style={{ transition: "fill 0.6s ease" }} />
      <path d="M262 66 C326 82 364 132 362 206 C340 212 314 216 290 218 C296 160 288 104 262 66 Z" fill="#000" opacity="0.14" />
      <path d="M128 160 C140 112 176 80 220 70 C184 98 160 136 152 184 C142 188 134 194 128 200 Z" fill="#fff" opacity="0.13" />
      <path d="M236 64 C226 112 222 162 224 216" fill="none" stroke="#000" strokeOpacity="0.2" strokeWidth="1.6" />
      <path d="M236 64 C198 96 172 146 166 212" fill="none" stroke="#000" strokeOpacity="0.12" strokeWidth="1.4" />
      <path d="M236 64 C282 96 306 146 312 216" fill="none" stroke="#000" strokeOpacity="0.12" strokeWidth="1.4" />
      {/* faixa de base da copa, onde a aba encosta */}
      <path d="M108 206 C140 212 180 216 220 218 C270 222 330 216 362 206" fill="none" stroke="#000" strokeOpacity="0.22" strokeWidth="2" />
      <circle cx="236" cy="63" r="7" fill={cor} />
      <circle cx="236" cy="63" r="7" fill="#000" opacity="0.18" />

      {/* aba: projeta-se para a frente, à esquerda (vista em 3/4) */}
      <path d="M150 196 C110 200 56 214 30 232 C18 242 30 254 60 254 C130 254 220 238 262 214 C230 204 190 196 150 196 Z" fill={cor} style={{ transition: "fill 0.6s ease" }} />
      <path d="M150 196 C110 200 56 214 30 232 C18 242 30 254 60 254 C130 254 220 238 262 214 C230 204 190 196 150 196 Z" fill="#000" opacity="0.2" />
      <path d="M44 238 C100 236 180 224 240 208" fill="none" stroke="#000" strokeOpacity="0.2" strokeWidth="1.6" strokeDasharray="5 5" />

      {/* bordado: o símbolo do Rizoma */}
      <g transform="translate(160 122) scale(0.5) translate(-351 0)" stroke={bordado} strokeWidth={9.2} fill="none" strokeLinejoin="miter">
        <LinhasSimbolo />
      </g>
    </svg>
  );
}
