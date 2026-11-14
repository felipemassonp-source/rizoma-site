"use client";

import Link from "next/link";
import { useState } from "react";
import { produtoDestaque } from "@/content/site";
import { Simbolo } from "../Logo";
import { Pendente } from "../Pendente";
import styles from "./BoneDestaque.module.css";

const real = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function BoneDestaque() {
  const [cor, setCor] = useState(produtoDestaque.cores[1]);
  return (
    <div className={styles.bone}>
      <div className={styles.vitrine} style={{ background: cor.hex }} data-cursor>
        <Simbolo className={styles.simbolo} />
        <span className={styles.nomeCor}>{cor.nome}</span>
      </div>

      <div className={styles.info}>
        <h2 className={styles.titulo}>Vista o que você acredita.</h2>
        <p className={styles.texto}>
          {produtoDestaque.nome}. {produtoDestaque.descricao}
        </p>

        <div className={styles.cores} role="radiogroup" aria-label="Cor do boné">
          {produtoDestaque.cores.map((c) => (
            <button
              key={c.nome}
              role="radio"
              aria-checked={c.nome === cor.nome}
              aria-label={c.nome}
              className={styles.cor}
              style={{ background: c.hex }}
              onClick={() => setCor(c)}
            />
          ))}
        </div>

        <p className={styles.preco}>{real(produtoDestaque.preco)}</p>

        <div className={styles.acoes}>
          <Link href="/apoiar" className="botao">
            Ir para a lojinha <span className="seta">→</span>
          </Link>
        </div>

        <Pendente>fotos reais do boné e dados das camisetas (preço, cores e tamanhos).</Pendente>
      </div>
    </div>
  );
}
