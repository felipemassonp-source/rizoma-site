"use client";

/** Cursor vivo (só com mouse): um círculo que segue com calma e respira quando para. */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { prefereMenosMovimento } from "./Movimento";

export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches || prefereMenosMovimento()) {
      el.style.display = "none";
      return;
    }
    const x = gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" });
    const mover = (e: PointerEvent) => {
      el.style.opacity = "1";
      x(e.clientX);
      y(e.clientY);
      const alvo = (e.target as HTMLElement).closest("a, button, [data-cursor]");
      el.dataset.ativo = alvo ? "true" : "false";
    };
    const sair = () => (el.style.opacity = "0");
    window.addEventListener("pointermove", mover);
    document.addEventListener("pointerleave", sair);
    return () => {
      window.removeEventListener("pointermove", mover);
      document.removeEventListener("pointerleave", sair);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-ativo="false"
      className="cursor-vivo"
    />
  );
}
