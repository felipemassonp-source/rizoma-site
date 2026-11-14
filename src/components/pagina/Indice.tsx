"use client";

/**
 * "Nesta página": atalhos para as seções, logo abaixo do topo.
 * Diz de cara o que a pessoa vai encontrar e leva até lá com a rolagem macia.
 */

import type { MouseEvent } from "react";
import { getLenis } from "../movimento/Movimento";
import styles from "./Pagina.module.css";

export function Indice({ itens }: { itens: { href: string; rotulo: string }[] }) {
  const ir = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    const alvo = document.getElementById(href.slice(1));
    if (!alvo) return;
    e.preventDefault();
    const y = alvo.getBoundingClientRect().top + window.scrollY - 40;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(y, { duration: 1.6 });
    else window.scrollTo({ top: y, behavior: "smooth" });
    history.replaceState(null, "", href);
  };

  return (
    <nav className={styles.indice} aria-label="Nesta página" data-surge>
      <span className={styles.indiceRotulo}>Nesta página</span>
      <ul>
        {itens.map((i) => (
          <li key={i.href}>
            <a href={i.href} onClick={(e) => ir(e, i.href)}>
              {i.rotulo}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
