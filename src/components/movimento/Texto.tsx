"use client";

/**
 * Movimentos de texto mais raros (no máximo um por página):
 *  - <FraseRespiro>: frase-manifesto que chega letra a letra. O espaçamento
 *    começa aberto e assenta, como uma inspiração que vira expiração.
 *  - <Sequencia>: lista cujos itens se acendem um a um conforme a rolagem
 *    (funciona igual no celular, sem depender do mouse).
 */

import { Children, useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefereMenosMovimento, aposAbertura } from "./Movimento";
import t from "./Texto.module.css";

gsap.registerPlugin(ScrollTrigger);

export function FraseRespiro({
  linhas,
  realce = [],
  as: Tag = "p",
  className,
  imediato = false,
}: {
  /** cada item é uma linha da frase */
  linhas: string[];
  /** índices das linhas em destaque (recebem data-realce para o CSS colorir) */
  realce?: number[];
  as?: ElementType;
  className?: string;
  /** anima logo ao carregar (para o topo da página), em vez de esperar a rolagem */
  imediato?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefereMenosMovimento()) return;
    const letras = el.querySelectorAll(`.${t.letra}`);
    const espacoFinal = getComputedStyle(el).letterSpacing;
    gsap.set(letras, { opacity: 0, yPercent: 35, filter: "blur(6px)" });
    gsap.set(el, { letterSpacing: "0.09em" });

    const rodar = () =>
      gsap
        .timeline()
        .to(letras, {
          opacity: 1,
          yPercent: 0,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power3.out",
          stagger: { each: Math.min(0.045, 1.4 / letras.length) },
        })
        .to(el, { letterSpacing: espacoFinal, duration: 2.2, ease: "power2.inOut", clearProps: "letterSpacing" }, 0);

    let tl: gsap.core.Timeline | null = null;
    let st: ScrollTrigger | null = null;
    let cancelar = () => {};
    if (imediato) {
      cancelar = aposAbertura(() => {
        tl = rodar();
      });
    } else {
      st = ScrollTrigger.create({
        trigger: el,
        start: "top 82%",
        once: true,
        onEnter: () => {
          tl = rodar();
        },
      });
    }
    return () => {
      cancelar();
      st?.kill();
      tl?.kill();
      gsap.set([el, letras], { clearProps: "all" });
    };
  }, [imediato]);

  return (
    <Tag ref={ref} className={className} aria-label={linhas.join(" ")}>
      {linhas.map((linha, i) => (
        <span key={i} className={t.fraseLinha} data-realce={realce.includes(i) || undefined} aria-hidden="true">
          {linha.split(" ").map((palavra, j) => (
            <span key={j}>
              <span className={t.frasePalavra}>
                {Array.from(palavra).map((l, k) => (
                  <span key={k} className={t.letra}>
                    {l}
                  </span>
                ))}
              </span>{" "}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}

export function Sequencia({
  children,
  as: Tag = "ol",
  className,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefereMenosMovimento()) return;
    const itens = Array.from(el.children);
    const tw = gsap.fromTo(
      itens,
      { opacity: 0.16, y: 22 },
      {
        opacity: 1,
        y: 0,
        ease: "none",
        stagger: 0.6,
        scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 55%", scrub: 0.8 },
      },
    );
    return () => {
      tw.scrollTrigger?.kill();
      tw.kill();
      gsap.set(itens, { clearProps: "all" });
    };
  }, []);
  return (
    <Tag ref={ref} className={`${t.sequencia} ${className ?? ""}`}>
      {Children.toArray(children)}
    </Tag>
  );
}
