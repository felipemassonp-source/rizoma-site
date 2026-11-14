"use client";

/**
 * As linhas do símbolo, vivas: retas que se dobram em montanha/onda
 * e "respiram" — expandem em 4s (inspira) e recolhem em 6s (expira).
 *  - `rolagem`: a dobra cresce conforme a seção passa pela tela
 *  - `seguirCursor`: a dobra acompanha o mouse (ou o dedo) e se aprofunda
 *    quando a pessoa se move rápido — as linhas reagem à presença
 */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefereMenosMovimento, aposAbertura } from "./Movimento";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  linhas?: number;
  amplitude?: number;
  centro?: number;
  espessura?: number;
  rolagem?: boolean;
  comecaReta?: boolean;
  seguirCursor?: boolean;
  /** desenha as linhas da esquerda para a direita ao aparecer */
  desenharAoEntrar?: boolean;
  atrasoEntrada?: number;
  className?: string;
};

const LARG = 1000;
const CICLO = 10;

export function respiracao(t: number) {
  const fase = t % CICLO;
  if (fase < 4) return 0.5 - 0.5 * Math.cos((Math.PI * fase) / 4);
  return 0.5 + 0.5 * Math.cos((Math.PI * (fase - 4)) / 6);
}

export function LinhasRespirando({
  linhas = 8,
  amplitude = 0.8,
  centro = 0.5,
  espessura = 2,
  rolagem = false,
  comecaReta = false,
  seguirCursor = false,
  desenharAoEntrar = false,
  atrasoEntrada = 0,
  className,
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const paths = Array.from(svg.querySelectorAll("path"));
    const passo = 100 / linhas;
    let progresso = comecaReta ? 0 : 1;
    let visivel = true;
    let cx = LARG * centro;
    let alvoCx = cx;
    let impulso = 0;
    let ultimoX = 0;
    const inicio = performance.now() / 1000;

    const desenhar = (folego: number) => {
      paths.forEach((path, i) => {
        const k = (i + 1) / linhas;
        const y0 = passo * (i + 0.5);
        const a = passo * amplitude * 1.6 * k * (0.35 + 0.65 * folego + impulso * 0.9) * progresso;
        const p = 70 + 75 * k;
        const q = 50 + 30 * k;
        // cada linha segue o cursor com um pequeno atraso: a rede ondula
        const c = cx + (alvoCx - cx) * (1 - k) * 0.35;
        path.setAttribute(
          "d",
          `M-20 ${y0} L${c - p - q} ${y0} L${c - p} ${y0 - a * 0.55} L${c} ${y0 + a} L${c + p} ${y0 - a * 0.55} L${c + p + q} ${y0} L${LARG + 20} ${y0}`,
        );
      });
    };

    if (prefereMenosMovimento()) {
      desenhar(0.7);
      return;
    }

    const tick = () => {
      if (!visivel) return;
      cx += (alvoCx - cx) * 0.06;
      impulso *= 0.94;
      desenhar(respiracao(performance.now() / 1000 - inicio));
    };
    gsap.ticker.add(tick);

    const io = new IntersectionObserver(([e]) => (visivel = e.isIntersecting), { rootMargin: "100px" });
    io.observe(svg);

    const mover = (e: PointerEvent) => {
      const r = svg.getBoundingClientRect();
      if (e.clientY < r.top - 200 || e.clientY > r.bottom + 200) return;
      const x = ((e.clientX - r.left) / r.width) * LARG;
      alvoCx = Math.min(LARG * 0.92, Math.max(LARG * 0.08, x));
      impulso = Math.min(0.9, impulso + Math.abs(e.clientX - ultimoX) / 260);
      ultimoX = e.clientX;
    };
    if (seguirCursor) window.addEventListener("pointermove", mover, { passive: true });

    let st: ScrollTrigger | undefined;
    if (rolagem) {
      st = ScrollTrigger.create({
        trigger: svg,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = self.progress;
          progresso = comecaReta ? Math.min(1, v * 1.8) : 0.55 + 0.45 * Math.sin(Math.PI * v);
        },
      });
    }

    let tw: gsap.core.Tween | undefined;
    let cancelarEspera = () => {};
    if (desenharAoEntrar) {
      paths.forEach((p) => {
        p.setAttribute("pathLength", "1");
        p.style.strokeDasharray = "1";
        p.style.strokeDashoffset = "1";
      });
      cancelarEspera = aposAbertura(() => {
        tw = gsap.to(paths, {
          strokeDashoffset: 0,
          duration: 2.2,
          ease: "power3.inOut",
          stagger: 0.07,
          delay: atrasoEntrada,
        });
      });
    }

    desenhar(0);
    return () => {
      gsap.ticker.remove(tick);
      io.disconnect();
      st?.kill();
      tw?.kill();
      cancelarEspera();
      window.removeEventListener("pointermove", mover);
    };
  }, [linhas, amplitude, centro, rolagem, comecaReta, seguirCursor, desenharAoEntrar, atrasoEntrada]);

  return (
    <svg
      ref={svgRef}
      className={className}
      viewBox={`0 0 ${LARG} 100`}
      preserveAspectRatio="none"
      fill="none"
      stroke="currentColor"
      strokeWidth={espessura}
      strokeLinejoin="miter"
      aria-hidden="true"
      style={{ width: "100%", height: "100%", overflow: "visible" }}
    >
      {Array.from({ length: linhas }).map((_, i) => (
        <path key={i} vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}
