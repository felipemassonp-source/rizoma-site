"use client";

/**
 * Em vez de números soltos, as pessoas: 60 pontos, um por mulher,
 * agrupados nas 5 turmas do projeto Ioga entre as grades.
 * Os pontos acendem um a um conforme a seção entra na tela.
 */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { sociedade } from "@/content/site";
import { prefereMenosMovimento } from "../movimento/Movimento";
import styles from "./PresidioPontos.module.css";

export function PresidioPontos() {
  const ref = useRef<HTMLDivElement>(null);
  const { mulheres, turmas, desde } = sociedade.presidio;
  const porTurma = Math.round(mulheres / turmas);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefereMenosMovimento()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 70%" } });
      tl.from(`.${styles.ponto}`, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(2)",
        stagger: { each: 0.035, grid: "auto" },
      })
        .from(`.${styles.turmaNome}`, { opacity: 0, y: 10, duration: 0.6, stagger: 0.15 }, 0.4)
        .from(`.${styles.frase} [data-n]`, { opacity: 0, y: 14, duration: 0.8, stagger: 0.25 }, 0.2);
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={styles.bloco}>
      <p className={styles.frase}>
        Desde <span data-n>{desde}</span>, <span data-n>{mulheres} mulheres</span> em{" "}
        <span data-n>{turmas} turmas</span> praticam ioga toda semana no Presídio Feminino de Florianópolis.
      </p>

      <div className={styles.turmas} role="img" aria-label={`${mulheres} pontos, um para cada mulher, divididos em ${turmas} turmas`}>
        {Array.from({ length: turmas }).map((_, t) => (
          <div key={t} className={styles.turma}>
            <div className={styles.pontos}>
              {Array.from({ length: porTurma }).map((_, i) => (
                <span key={i} className={styles.ponto} />
              ))}
            </div>
            <span className={styles.turmaNome}>Turma {t + 1}</span>
          </div>
        ))}
      </div>

      <p className={styles.legenda}>Cada ponto é uma mulher. A participação é reconhecida pelo sistema prisional com alvarás de recompensa.</p>
    </div>
  );
}
