"use client";

/**
 * Foto que se revela através de faixas horizontais que se recolhem —
 * como as linhas do símbolo se abrindo. Depois, um leve movimento de
 * profundidade enquanto a pessoa rola (sutil, só um detalhe).
 */

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefereMenosMovimento } from "./Movimento";
import styles from "./Revelar.module.css";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  src: string;
  alt: string;
  className?: string;
  faixas?: number;
  sizes?: string;
  priority?: boolean;
  profundidade?: number;
  posicao?: string;
  /** recorte inspirado na marca */
  recorte?: "reto" | "arco" | "arcoInvertido" | "montanha" | "circulo" | "vertical";
  /**
   * como a foto entra. Se não for dado, segue o recorte:
   * círculo → "iris" (abre do centro), arco → "nasce" (sobe como sol), o resto → "faixas".
   */
  entrada?: "faixas" | "iris" | "nasce";
};

export function Revelar({
  src,
  alt,
  className,
  faixas = 6,
  sizes = "(min-width: 900px) 50vw, 100vw",
  priority,
  profundidade = 8,
  posicao = "center",
  recorte = "reto",
  entrada,
}: Props) {
  const modo = entrada ?? (recorte === "circulo" ? "iris" : recorte === "arco" ? "nasce" : "faixas");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefereMenosMovimento()) {
      el?.querySelectorAll<HTMLElement>(`.${styles.faixa}`).forEach((f) => (f.style.transform = "scaleY(0)"));
      return;
    }
    const ctx = gsap.context(() => {
      if (modo === "iris") {
        gsap.fromTo(
          `.${styles.camada}`,
          { clipPath: "circle(0% at 50% 50%)" },
          { clipPath: "circle(75% at 50% 50%)", duration: 1.6, ease: "power3.inOut", scrollTrigger: { trigger: el, start: "top 90%" } },
        );
      } else if (modo === "nasce") {
        gsap.fromTo(
          `.${styles.camada}`,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "power4.inOut", scrollTrigger: { trigger: el, start: "top 90%" } },
        );
      } else gsap.fromTo(
        `.${styles.faixa}`,
        { scaleY: 1 },
        {
          scaleY: 0,
          duration: 1,
          ease: "power3.inOut",
          stagger: { each: 0.08, from: "center" },
          scrollTrigger: { trigger: el, start: "top 94%" },
        },
      );
      gsap.fromTo(
        `.${styles.imagem}`,
        { scale: 1.18 },
        { scale: 1.04, duration: 1.4, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 94%" } },
      );
      if (profundidade) {
        gsap.fromTo(
          `.${styles.camada}`,
          { yPercent: -profundidade / 2 },
          {
            yPercent: profundidade / 2,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      }
    }, el);
    return () => ctx.revert();
  }, [profundidade, modo]);

  return (
    <div ref={ref} className={`${styles.moldura} ${className ?? ""}`} data-recorte={recorte}>
      <div className={styles.camada}>
        <Image
          className={styles.imagem}
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          style={{ objectPosition: posicao }}
        />
      </div>
      {modo === "faixas" && (
        <div className={styles.faixas} aria-hidden="true">
          {Array.from({ length: faixas }).map((_, i) => (
            <span key={i} className={styles.faixa} style={{ transformOrigin: i % 2 ? "top" : "bottom" }} />
          ))}
        </div>
      )}
    </div>
  );
}
