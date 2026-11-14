"use client";

import Link from "next/link";
import { useState } from "react";
import { produtoDestaque } from "@/content/site";
import Image from "next/image";
import { Pendente } from "../Pendente";
import styles from "./BoneDestaque.module.css";

const real = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function BoneDestaque() {
  const [cor, setCor] = useState(produtoDestaque.cores[1]);
  return (
    <div className={styles.bone}>
      <div className={styles.vitrine} data-cursor>
        <Image
          src={produtoDestaque.foto ?? ""}
          alt="Bonés Respira nas cores azul claro, terracota e off-white, numa prateleira com caixas do Respira"
          fill
          sizes="(min-width: 900px) 40vw, 90vw"
        />
      </div>

      <div className={styles.info}>
        <h2 className={styles.titulo}>Vista o que você acredita.</h2>
        <p className={styles.texto}>
          {produtoDestaque.nome}. {produtoDestaque.descricao}
        </p>

        <p className={styles.corEscolhida}>
          Cor: <strong>{cor.nome}</strong>
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

        <Pendente>dados das camisetas (preço, cores e tamanhos).</Pendente>
      </div>
    </div>
  );
}
