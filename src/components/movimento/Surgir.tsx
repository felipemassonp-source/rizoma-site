"use client";

/**
 * Pequenos movimentos de entrada, todos no ritmo da respiração.
 *  - <Surgir>: o bloco sobe devagar e aparece
 *  - <TextoRespira>: as palavras acendem uma a uma conforme a rolagem
 *  - <Contador>: números que crescem ao entrar na tela
 */

import { useEffect, useRef, type ReactNode, type ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefereMenosMovimento } from "./Movimento";

gsap.registerPlugin(ScrollTrigger);

export function Surgir({
  children,
  as: Tag = "div",
  atraso = 0,
  className,
  filhos = false,
}: {
  children: ReactNode;
  as?: ElementType;
  atraso?: number;
  className?: string;
  /** anima cada filho direto em sequência */
  filhos?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefereMenosMovimento()) return;
    const alvos = filhos ? Array.from(el.children) : el;
    const tw = gsap.fromTo(
      alvos,
      { y: 26, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        delay: atraso,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: "top 96%" },
      },
    );
    return () => {
      tw.scrollTrigger?.kill();
      tw.kill();
    };
  }, [atraso, filhos]);
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

export function TextoRespira({
  texto,
  destaques = [],
  className,
  as: Tag = "p",
}: {
  texto: string;
  destaques?: string[];
  className?: string;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefereMenosMovimento()) return;
    const palavras = el.querySelectorAll("[data-palavra]");
    const tw = gsap.fromTo(
      palavras,
      { opacity: 0.22 },
      {
        opacity: 1,
        ease: "none",
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: "top 95%", end: "top 68%", scrub: 0.3 },
      },
    );
    return () => {
      tw.scrollTrigger?.kill();
      tw.kill();
    };
  }, []);

  const limpa = (p: string) => p.replace(/[.,;:!?—]/g, "").toLowerCase();
  const alvo = destaques.map((d) => d.toLowerCase());

  return (
    <Tag ref={ref} className={className} aria-label={texto}>
      {texto.split(" ").map((p, i) => (
        <span
          key={i}
          data-palavra
          aria-hidden="true"
          style={alvo.includes(limpa(p)) ? { color: "var(--destaque)" } : undefined}
        >
          {p}{" "}
        </span>
      ))}
    </Tag>
  );
}

export function Contador({ valor, prefixo = "", semFormatacao = false }: { valor: number; prefixo?: string; semFormatacao?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fmt = (n: number) => prefixo + (semFormatacao ? String(Math.round(n)) : Math.round(n).toLocaleString("pt-BR"));
    if (prefereMenosMovimento()) {
      el.textContent = fmt(valor);
      return;
    }
    const obj = { n: semFormatacao ? valor - 6 : 0 };
    const tw = gsap.to(obj, {
      n: valor,
      duration: 2.4,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = fmt(obj.n);
      },
      scrollTrigger: { trigger: el, start: "top 85%" },
    });
    return () => {
      tw.scrollTrigger?.kill();
      tw.kill();
    };
  }, [valor, prefixo, semFormatacao]);
  return <span ref={ref}>{prefixo + (semFormatacao ? valor : valor.toLocaleString("pt-BR"))}</span>;
}
