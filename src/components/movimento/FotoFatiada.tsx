"use client";

/**
 * Foto fatiada em faixas horizontais, como as linhas do logotipo.
 * As faixas chegam desencontradas (umas da esquerda, outras da direita)
 * e se alinham conforme a pessoa rola, recompondo a imagem.
 */

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefereMenosMovimento } from "./Movimento";
import styles from "./FotoFatiada.module.css";

gsap.registerPlugin(ScrollTrigger);

const N = 5;
const ALTURA = 18.4; // % de cada faixa
const PASSO = (100 - ALTURA) / (N - 1); // espaço entre o topo das faixas

export function FotoFatiada({
  src,
  alt,
  className,
  sizes = "(min-width: 900px) 40vw, 90vw",
  posicao = "center",
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  posicao?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefereMenosMovimento()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(`.${styles.faixa}`).forEach((f, i) => {
        gsap.fromTo(
          f,
          { xPercent: (i % 2 ? 1 : -1) * (10 + i * 3) },
          { xPercent: 0, ease: "none", scrollTrigger: { trigger: el, start: "top 95%", end: "center 55%", scrub: 1 } },
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={`${styles.fatiada} ${className ?? ""}`} role="img" aria-label={alt}>
      {Array.from({ length: N }).map((_, i) => {
        const topo = i * PASSO;
        return (
          <div key={i} className={styles.faixa} style={{ top: `${topo}%`, height: `${ALTURA}%` }}>
            <div className={styles.recorte} style={{ top: `${(-topo / ALTURA) * 100}%`, height: `${(100 / ALTURA) * 100}%` }}>
              <Image src={src} alt="" fill sizes={sizes} style={{ objectFit: "cover", objectPosition: posicao }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
