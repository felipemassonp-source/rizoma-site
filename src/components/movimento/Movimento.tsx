"use client";

/**
 * Base do movimento do site:
 *  - rolagem macia (Lenis), como água
 *  - cor do fundo que muda com a rolagem, como o dia passando
 *    (cada seção declara data-tema="creme" | "terracota" | "vinho")
 *  - respeita quem pediu menos animação no sistema
 */

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const TEMAS = {
  creme: { bg: "#f0dabb", fg: "#561111", destaque: "#d73d19" },
  terracota: { bg: "#d73d19", fg: "#f0dabb", destaque: "#561111" },
  vinho: { bg: "#561111", fg: "#f0dabb", destaque: "#d73d19" },
  claro: { bg: "#f8ecda", fg: "#561111", destaque: "#d73d19" },
  vinhoLeitura: { bg: "#3a0b0b", fg: "#f0dabb", destaque: "#e7a17f" },
} as const;

export type Tema = keyof typeof TEMAS;

export function aplicarTema(tema: Tema) {
  const raiz = document.documentElement;
  // no modo noturno de leitura, o texto mantém o fundo escuro
  if (raiz.dataset.leituraNoturna === "true" && tema === "claro") tema = "vinhoLeitura";
  const t = TEMAS[tema] ?? TEMAS.creme;
  raiz.style.setProperty("--bg", t.bg);
  raiz.style.setProperty("--fg", t.fg);
  raiz.style.setProperty("--destaque", t.destaque);
  raiz.dataset.tema = tema;
}

export function prefereMenosMovimento() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

let lenisGlobal: Lenis | null = null;
export function getLenis() {
  return lenisGlobal;
}

export function Movimento() {
  const caminho = usePathname();

  // Rolagem macia (uma vez)
  useEffect(() => {
    if (prefereMenosMovimento()) return;
    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, smoothWheel: true });
    lenisGlobal = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisGlobal = null;
    };
  }, []);

  // Tema por seção (a cada página)
  useEffect(() => {
    // vai para o topo, ou para a seção do link (ex.: /conhecer#maira)
    const ancora = window.location.hash ? document.getElementById(decodeURIComponent(window.location.hash.slice(1))) : null;
    window.scrollTo(0, 0);
    lenisGlobal?.scrollTo(0, { immediate: true });
    const idAncora = ancora
      ? window.setTimeout(() => {
          ScrollTrigger.refresh();
          const y = ancora.getBoundingClientRect().top + window.scrollY - 40;
          if (lenisGlobal) lenisGlobal.scrollTo(y, { duration: 1.6 });
          else window.scrollTo({ top: y, behavior: "smooth" });
        }, 450)
      : 0;

    const secoes = Array.from(document.querySelectorAll<HTMLElement>("[data-tema]"));
    if (secoes.length) aplicarTema((secoes[0].dataset.tema as Tema) || "creme");

    const gatilhos = secoes.map((secao) =>
      ScrollTrigger.create({
        trigger: secao,
        start: "top 55%",
        end: "bottom 55%",
        // calculado depois das seções fixadas (pin), para não sair desalinhado
        refreshPriority: -1,
        onToggle: (self) => {
          if (self.isActive) aplicarTema((secao.dataset.tema as Tema) || "creme");
        },
      }),
    );

    ScrollTrigger.sort();
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => {
      window.clearTimeout(id);
      window.clearTimeout(idAncora);
      gatilhos.forEach((g) => g.kill());
    };
  }, [caminho]);

  return null;
}

/** Executa `cb` quando a abertura do site terminar (ou na hora, se não houver abertura). */
export function aposAbertura(cb: () => void) {
  if (typeof document === "undefined") return () => {};
  const estado = document.documentElement.dataset.abertura;
  if (estado === "fim") {
    cb();
    return () => {};
  }
  let feito = false;
  const rodar = () => {
    if (feito) return;
    feito = true;
    cb();
  };
  window.addEventListener("rz-abertura-fim", rodar, { once: true });
  // se a abertura ainda não começou a decidir, espera um instante e confere
  const id = window.setTimeout(() => {
    if (document.documentElement.dataset.abertura !== "rodando") rodar();
  }, 120);
  return () => {
    window.clearTimeout(id);
    window.removeEventListener("rz-abertura-fim", rodar);
  };
}
