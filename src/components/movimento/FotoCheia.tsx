"use client";

/**
 * Foto de ponta a ponta da tela, para as imagens de praia mais bonitas.
 * A foto se abre de uma faixa estreita até ocupar tudo (expandir, como
 * a inspiração) e o texto fica por cima, com um véu escuro para leitura.
 */

import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefereMenosMovimento } from "./Movimento";
import styles from "./FotoCheia.module.css";

gsap.registerPlugin(ScrollTrigger);

export function FotoCheia({
  src,
  alt,
  posicao = "center",
  children,
  tema = "vinho",
}: {
  src: string;
  alt: string;
  posicao?: string;
  children?: ReactNode;
  tema?: "vinho" | "terracota";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefereMenosMovimento()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        `.${styles.janela}`,
        { clipPath: "inset(14% 18% 14% 18% round 999px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 85%", end: "top 15%", scrub: 1 },
        },
      );
      gsap.fromTo(
        `.${styles.imagem}`,
        { scale: 1.25 },
        { scale: 1.02, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className={styles.cheia} data-tema={tema}>
      <div className={styles.janela}>
        <div className={styles.imagem}>
          <Image src={src} alt={alt} fill sizes="100vw" style={{ objectFit: "cover", objectPosition: posicao }} />
        </div>
        <div className={styles.veu} aria-hidden="true" />
      </div>
      {children && <div className={`container ${styles.conteudo}`}>{children}</div>}
    </section>
  );
}
