"use client";

/**
 * Ferramentas de leitura: barra de progresso feita com o próprio símbolo
 * (a linha começa reta e vai se dobrando até o fim do texto),
 * modo noturno (fundo vinho) e tamanho da letra.
 */

import { useEffect, useRef, useState } from "react";
import styles from "./Rizomatica.module.css";

export function Leitura({ alvo }: { alvo: string }) {
  const pathRef = useRef<SVGPathElement>(null);
  const [noturno, setNoturno] = useState(false);
  const [grande, setGrande] = useState(false);

  useEffect(() => {
    const artigo = document.getElementById(alvo);
    const path = pathRef.current;
    if (!artigo || !path) return;
    const atualizar = () => {
      const r = artigo.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, total)));
      const a = 7 * p; // profundidade da dobra
      path.setAttribute("d", `M0 8 L${430 - 40 * p} 8 L470 ${8 - a * 0.6} L500 ${8 + a} L530 ${8 - a * 0.6} L${570 + 40 * p} 8 L1000 8`);
      path.style.strokeDashoffset = String(1 - p);
    };
    atualizar();
    window.addEventListener("scroll", atualizar, { passive: true });
    window.addEventListener("resize", atualizar);
    return () => {
      window.removeEventListener("scroll", atualizar);
      window.removeEventListener("resize", atualizar);
    };
  }, [alvo]);

  useEffect(() => {
    const raiz = document.documentElement;
    raiz.dataset.leituraNoturna = String(noturno);
    raiz.style.setProperty("--bg", noturno ? "#3a0b0b" : "#f8ecda");
    raiz.style.setProperty("--fg", noturno ? "#f0dabb" : "#561111");
    return () => {
      delete raiz.dataset.leituraNoturna;
    };
  }, [noturno]);

  useEffect(() => {
    document.getElementById(alvo)?.setAttribute("data-grande", String(grande));
  }, [grande, alvo]);

  return (
    <>
      <div className={styles.progresso} aria-hidden="true">
        <svg viewBox="0 0 1000 16" preserveAspectRatio="none">
          <path ref={pathRef} pathLength={1} vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      <div className={styles.ferramentas}>
        <button onClick={() => setGrande((g) => !g)} aria-pressed={grande} title="Tamanho da letra">
          A<span>A</span>
        </button>
        <button onClick={() => setNoturno((n) => !n)} aria-pressed={noturno} title="Modo noturno">
          {noturno ? "☀" : "☾"}
        </button>
      </div>
    </>
  );
}
