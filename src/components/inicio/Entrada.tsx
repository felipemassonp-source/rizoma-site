"use client";

/** Entrada do topo: depois da abertura, as linhas do título sobem de trás de uma máscara. */

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { prefereMenosMovimento, aposAbertura } from "../movimento/Movimento";

export function Entrada({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefereMenosMovimento()) return;
    const ctx = gsap.context(() => {
      gsap.set("[data-linha] > span", { yPercent: 115 });
      gsap.set("[data-surge]", { opacity: 0, y: 24 });
    }, el);
    const cancelar = aposAbertura(() => {
      ctx.add(() => {
        gsap
          .timeline()
          .to("[data-linha] > span", { yPercent: 0, duration: 1.6, ease: "power4.out", stagger: 0.12 })
          .to("[data-surge]", { opacity: 1, y: 0, duration: 1.4, ease: "power3.out", stagger: 0.12, clearProps: "transform" }, 0.5);
      });
    });
    return () => {
      cancelar();
      ctx.revert();
    };
  }, []);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
