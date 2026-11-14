"use client";

/**
 * Os 4 princípios da escola, com movimento no próprio texto:
 * ao entrar na tela, a linha de cada item se desenha, o número gira para o lugar
 * e as palavras do título sobem uma a uma de trás de uma máscara.
 * No computador, passar o mouse desliza o título e acende o número.
 */

import { useEffect, useRef } from "react";
import { principios } from "@/content/site";
import styles from "./Principios.module.css";

export function Principios() {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const itens = ref.current?.querySelectorAll<HTMLElement>("li");
    if (!itens) return;
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.visivel = "true";
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -12% 0px" },
    );
    itens.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, []);

  return (
    <ol ref={ref} className={styles.lista}>
      {principios.map((p, i) => (
        <li key={p.titulo} className={styles.item} data-visivel="false">
          <span className={styles.linha} aria-hidden="true" />
          <span className={styles.numero}>0{i + 1}</span>
          <strong className={styles.titulo}>
            {p.titulo.split(" ").map((palavra, k) => (
              <span key={k}>
                <span className={styles.mascara}>
                  <span className={styles.palavra} style={{ ["--k" as string]: k }}>
                    {palavra}
                  </span>
                </span>{" "}
              </span>
            ))}
          </strong>
          <span className={styles.texto}>{p.texto}</span>
        </li>
      ))}
    </ol>
  );
}
