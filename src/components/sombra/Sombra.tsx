"use client";

/**
 * Sombra de uma postura como elemento do site.
 * Entrada: a sombra sobe de trás de uma linha (como o sol nascendo no mar),
 * saindo de um leve desfoque. Depois respira, quase sem se notar.
 * A cor vem do texto ao redor (currentColor).
 */

import { useEffect, useRef } from "react";
import { sombra as pegar } from "./sombras";
import styles from "./Sombra.module.css";

export function Sombra({
  id,
  className,
  rotulo,
  atraso = 0,
}: {
  id: string;
  className?: string;
  rotulo?: string;
  /** atraso da entrada, em segundos */
  atraso?: number;
}) {
  const s = pegar(id);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.dataset.visivel = "true";
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      className={`${styles.sombra} ${className ?? ""}`}
      data-visivel="false"
      role={rotulo ? "img" : undefined}
      aria-label={rotulo}
      aria-hidden={rotulo ? undefined : true}
      style={{ ["--proporcao" as string]: `${s.w} / ${s.h}`, ["--atraso" as string]: `${atraso}s` }}
    >
      <span className={styles.forma} style={{ maskImage: `url(/sombras/${s.id}.webp)`, WebkitMaskImage: `url(/sombras/${s.id}.webp)` }} />
    </span>
  );
}
