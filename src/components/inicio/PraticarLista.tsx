"use client";

/**
 * Modalidades como um índice tipográfico.
 * Computador: cada linha é um link para a modalidade na página Praticar,
 * com uma seta em círculo que se acende ao passar o mouse (sem foto).
 * Celular: tocar abre a linha com foto, resumo e "Saiba mais".
 */

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { modalidades } from "@/content/site";
import styles from "./PraticarLista.module.css";

// A Ioga na praia já aparece no bloco "Como tudo começou": aqui ficam só as aulas da escola.
const AULAS = modalidades.filter((m) => m.id !== "praia");

const ehDesktop = () => window.matchMedia("(min-width: 900px) and (pointer: fine)").matches;

export function PraticarLista() {
  const router = useRouter();
  const [aberta, setAberta] = useState<number | null>(0);

  return (
    <ul className={styles.lista}>
      {AULAS.map((m, i) => (
        <li key={m.id} className={styles.item} data-aberta={aberta === i}>
          <button
            className={styles.linha}
            onClick={() => (ehDesktop() ? router.push(`/praticar#${m.id}`) : setAberta(aberta === i ? null : i))}
            aria-expanded={aberta === i}
          >
            <span className={styles.numero}>0{i + 1}</span>
            <span className={styles.nome}>{m.nome}</span>
            <span className={styles.resumo}>{m.resumo}</span>
            <span className={styles.seta} aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M5 12h13M13 6l6 6-6 6" />
              </svg>
            </span>
            <span className={styles.mais} aria-hidden="true" />
          </button>
          <div className={styles.painel}>
            <div className={styles.painelFoto}>
              <Image src={m.foto} alt="" fill sizes="90vw" />
            </div>
            <p>{m.resumo}</p>
            {m.exemplo && <span className={styles.selo}>texto de exemplo</span>}
            <Link href={`/praticar#${m.id}`} className={styles.saiba}>
              Saiba mais →
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
