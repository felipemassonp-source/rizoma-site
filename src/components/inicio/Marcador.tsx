"use client";

/**
 * Marcador de seção da Início: número, nome em destaque e uma linha que
 * se desenha de ponta a ponta quando a seção chega, dobrando no fim como
 * o símbolo. Separa bem um bloco do outro e leva para a página da seção.
 */

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Sombra } from "../sombra/Sombra";
import styles from "./Marcador.module.css";

const ROTACAO = ["guerreiro", "lua", "lotus", "arvore", "cobra", "pombo", "roda"];

export function Marcador({
  n,
  nome,
  href,
  rotuloLink = "Ver tudo",
  sombra,
}: {
  n: string;
  nome: string;
  href?: string;
  rotuloLink?: string;
  sombra?: string;
}) {
  const pose = sombra ?? ROTACAO[(parseInt(n, 10) - 1 + ROTACAO.length) % ROTACAO.length];
  const ref = useRef<HTMLDivElement>(null);

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
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={styles.marcador} data-visivel="false">
      <span className={styles.numero}>{n}</span>
      <p className={styles.nome}>{nome}</p>
      <span className={styles.linha} aria-hidden="true">
        <svg viewBox="0 0 100 12" preserveAspectRatio="none">
          <path d="M0 6 H88 L92 2 L96 10 L100 6" pathLength={1} />
        </svg>
      </span>
      <Sombra id={pose} className={styles.sombra} />
      {href && (
        <Link href={href} className={styles.link}>
          {rotuloLink} <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  );
}
