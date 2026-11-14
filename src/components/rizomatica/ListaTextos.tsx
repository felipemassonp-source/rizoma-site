"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { Texto } from "@/content/site";
import { Simbolo } from "../Logo";
import styles from "./Rizomatica.module.css";

const CORES = [
  { bg: "var(--vinho)", fg: "var(--creme)" },
  { bg: "var(--terracota)", fg: "var(--creme)" },
  { bg: "var(--creme)", fg: "var(--vinho)" },
];

export function ListaTextos({ textos }: { textos: Texto[] }) {
  const temas = ["Todos", ...Array.from(new Set(textos.flatMap((t) => t.tema.split(" · "))))];
  const [tema, setTema] = useState("Todos");
  const lista = tema === "Todos" ? textos : textos.filter((t) => t.tema.includes(tema));
  const [destaque, ...resto] = lista;

  return (
    <>
      <div className={styles.temas} role="group" aria-label="Filtrar por tema">
        {temas.map((t) => (
          <button key={t} aria-pressed={tema === t} onClick={() => setTema(t)}>
            {t}
          </button>
        ))}
      </div>

      {destaque && (
        <Link href={`/rizomatica/${destaque.slug}`} className={styles.destaque} data-cursor>
          <div className={styles.destaqueCapa}>
            <Image src={destaque.capa} alt="" fill sizes="(min-width: 900px) 55vw, 100vw" />
          </div>
          <div className={styles.destaqueTexto}>
            <span className={styles.meta}>
              Mais recente · {destaque.tema} · {destaque.leitura}
            </span>
            <h2>{destaque.titulo}</h2>
            <p>{destaque.resumo}</p>
            {destaque.exemplo && <span className={styles.selo}>texto de exemplo · apagar pelo painel</span>}
            <span className={styles.ler}>Ler com calma →</span>
          </div>
        </Link>
      )}

      <ul className={styles.capas}>
        {resto.map((t, i) => {
          const c = CORES[i % CORES.length];
          return (
            <li key={t.slug}>
              <Link href={`/rizomatica/${t.slug}`} className={styles.capa} style={{ background: c.bg, color: c.fg }} data-cursor>
                <Simbolo className={styles.capaSimbolo} />
                <span className={styles.meta}>{t.tema}</span>
                <h3>{t.titulo}</h3>
                <p>{t.resumo}</p>
                <span className={styles.capaRodape}>
                  <span>{t.data}</span>
                  {t.exemplo ? <span className={styles.selo}>exemplo</span> : <span>{t.leitura}</span>}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
