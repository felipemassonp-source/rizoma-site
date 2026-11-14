"use client";

/**
 * O rizoma cresce para os lados: no computador, a seção fica parada
 * e o conteúdo desliza na horizontal com a rolagem. No celular, vira
 * um carrossel de arrastar com o dedo.
 */

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefereMenosMovimento } from "./Movimento";
import styles from "./TrilhaHorizontal.module.css";

gsap.registerPlugin(ScrollTrigger);

export function TrilhaHorizontal({ cabeca, children }: { cabeca: ReactNode; children: ReactNode }) {
  const secaoRef = useRef<HTMLDivElement>(null);
  const trilhaRef = useRef<HTMLDivElement>(null);
  const barraRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const secao = secaoRef.current;
    const trilha = trilhaRef.current;
    if (!secao || !trilha || prefereMenosMovimento()) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px)", () => {
      const distancia = () => Math.max(0, trilha.scrollWidth - window.innerWidth);
      const tw = gsap.to(trilha, {
        x: () => -distancia(),
        ease: "none",
        scrollTrigger: {
          trigger: secao,
          start: "top top",
          end: () => `+=${distancia()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (barraRef.current) barraRef.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });
      return () => tw.kill();
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={secaoRef} className={styles.secao}>
      <div className={styles.cabeca}>{cabeca}</div>
      <div ref={trilhaRef} className={styles.trilha}>
        {children}
      </div>
      <div className={styles.progresso} aria-hidden="true">
        <span ref={barraRef} />
      </div>
    </div>
  );
}
