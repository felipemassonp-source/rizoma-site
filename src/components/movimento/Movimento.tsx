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
  terracota: { bg: "#d73d19", fg: "#f8ecda", destaque: "#561111" },
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

    // Cor do fundo contínua: entre uma seção e a seguinte, as cores se misturam
    // aos poucos conforme a rolagem (sem troca de uma vez).
    const secoes = Array.from(document.querySelectorAll<HTMLElement>("[data-tema]"));
    const temaDe = (el: HTMLElement): Tema => {
      const t = (el.dataset.tema as Tema) || "creme";
      return document.documentElement.dataset.leituraNoturna === "true" && t === "claro" ? "vinhoLeitura" : t;
    };
    const raiz = document.documentElement;
    const pintar = (de: Tema, para: Tema, p: number) => {
      const A = TEMAS[de] ?? TEMAS.creme;
      const B = TEMAS[para] ?? TEMAS.creme;
      raiz.style.setProperty("--bg", gsap.utils.interpolate(A.bg, B.bg, p));
      raiz.style.setProperty("--fg", gsap.utils.interpolate(A.fg, B.fg, p));
      raiz.style.setProperty("--destaque", gsap.utils.interpolate(A.destaque, B.destaque, p));
      raiz.dataset.tema = p < 0.5 ? de : para;
    };

    const gatilhos: ScrollTrigger[] = [];
    const recalcular = () => {
      if (!secoes.length) return;
      let j = -1;
      for (let i = gatilhos.length - 1; i >= 0; i--) {
        if (gatilhos[i].progress > 0) {
          j = i;
          break;
        }
      }
      if (j < 0) return pintar(temaDe(secoes[0]), temaDe(secoes[0]), 0);
      const p = gatilhos[j].progress;
      pintar(temaDe(secoes[j]), temaDe(secoes[j + 1]), gsap.parseEase("sine.inOut")(p));
    };

    for (let i = 1; i < secoes.length; i++) {
      gatilhos.push(
        ScrollTrigger.create({
          trigger: secoes[i],
          start: "top 90%",
          end: "top 35%",
          // calculado depois das seções fixadas (pin), para não sair desalinhado
          refreshPriority: -1,
          onUpdate: recalcular,
          onRefresh: recalcular,
        }),
      );
    }
    recalcular();

    ScrollTrigger.sort();
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120);
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
