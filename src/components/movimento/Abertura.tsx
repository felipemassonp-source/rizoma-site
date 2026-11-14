"use client";

/**
 * Abertura do site (uma vez por visita):
 * a tela vinho se enche de linhas terracota, como a capa do manual.
 * As linhas se dobram no símbolo, o símbolo se desenha no centro,
 * e então tudo "expira": as faixas se abrem para cima e para baixo
 * e revelam a página. Um toque pula a abertura.
 */

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { getLenis, prefereMenosMovimento } from "./Movimento";
import styles from "./Abertura.module.css";

const N = 16;

export function Abertura() {
  const ref = useRef<HTMLDivElement>(null);
  const [ativa, setAtiva] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let jaViu = false;
    try {
      jaViu =
        localStorage.getItem("rz-abertura") === "1" ||
        sessionStorage.getItem("rz-abertura") === "1";
    } catch {}
    if (jaViu || prefereMenosMovimento()) {
      setAtiva(false);
      document.documentElement.dataset.abertura = "fim";
      return;
    }

    getLenis()?.stop();
    document.documentElement.dataset.abertura = "rodando";
    const linhas = el.querySelectorAll<SVGPathElement>(`.${styles.linha}`);
    const simbolo = el.querySelectorAll<SVGPathElement>(`.${styles.simbolo} path`);
    const faixas = el.querySelectorAll<HTMLElement>(`.${styles.faixa}`);

    const dobra = (i: number, a: number) => {
      const k = Math.abs(i - N / 2) / (N / 2);
      const y = (i + 0.5) * (100 / N);
      const d = a * (1 - k) * 7;
      return `M-10 ${y} L${360 - 40 * (1 - k)} ${y} L430 ${y - d * 0.5} L500 ${y + d} L570 ${y - d * 0.5} L${640 + 40 * (1 - k)} ${y} L1010 ${y}`;
    };

    const estado = { a: 0 };
    const atualizar = () => linhas.forEach((l, i) => l.setAttribute("d", dobra(i, estado.a)));
    atualizar();

    const fim = () => {
      try {
        localStorage.setItem("rz-abertura", "1");
        sessionStorage.setItem("rz-abertura", "1");
      } catch {}
      document.documentElement.dataset.abertura = "fim";
      window.dispatchEvent(new Event("rz-abertura-fim"));
      getLenis()?.start();
      setAtiva(false);
    };

    const tl = gsap.timeline({ onComplete: fim });
    tl.fromTo(linhas, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.7, ease: "power2.inOut", stagger: 0.02 })
      .to(estado, { a: 1, duration: 0.65, ease: "sine.inOut", onUpdate: atualizar }, 0.4)
      .fromTo(simbolo, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.55, ease: "power2.out", stagger: 0.06 }, 0.5)
      .to(estado, { a: 0, duration: 0.45, ease: "sine.inOut", onUpdate: atualizar }, 1.15)
      .to(`.${styles.linhas}, .${styles.simbolo}`, { opacity: 0, duration: 0.35 }, 1.35)
      .to(faixas, {
        yPercent: (i) => (i % 2 ? 101 : -101),
        duration: 0.75,
        ease: "power3.inOut",
        stagger: { each: 0.025, from: "center" },
      }, 1.4);

    const pular = () => tl.progress(1);
    el.addEventListener("click", pular);
    return () => {
      el.removeEventListener("click", pular);
      tl.kill();
    };
  }, []);

  if (!ativa) return null;

  return (
    <div ref={ref} className={styles.abertura} aria-hidden="true">
      <div className={styles.faixas}>
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className={styles.faixa} />
        ))}
      </div>
      <svg className={styles.linhas} viewBox="0 0 1000 100" preserveAspectRatio="none">
        {Array.from({ length: N }).map((_, i) => (
          <path key={i} className={styles.linha} pathLength={1} vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      <svg className={styles.simbolo} viewBox="351 0 137 98.4">
        <path pathLength={1} d="M351 4.6 H488" />
        <path pathLength={1} d="M351 25.1 L389.3 21.7 L419.3 35 L448.4 21.7 L488 25.1" />
        <path pathLength={1} d="M351 53.6 L384.3 40.8 L419.3 63.3 L454.3 40.8 L488 53.6" />
        <path pathLength={1} d="M351 86.1 L379.7 60 L419.3 92.4 L459.3 60 L488 86.1" />
      </svg>
    </div>
  );
}
