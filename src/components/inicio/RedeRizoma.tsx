"use client";

/**
 * "Por que Rizoma" em composição editorial fluida (sem travar a rolagem):
 * as linhas da marca dobram suavemente ao rolar, acompanhando a progressão
 * em três tempos (A raiz → O rizoma → Aqui, o ioga) e os conceitos da escola.
 */

import Link from "next/link";
import { redeRizoma } from "@/content/site";
import { LinhasRespirando } from "../movimento/LinhasRespirando";
import { Surgir, TextoRespira } from "../movimento/Surgir";
import styles from "./RedeRizoma.module.css";

const PASSOS = [
  {
    numero: "01",
    pequeno: "A raiz",
    grande: "vai fundo, numa só direção.",
    detalhe: "Um caminho único, linear e vertical.",
  },
  {
    numero: "02",
    pequeno: "O rizoma",
    grande: "cresce para os lados, sem centro.",
    detalhe: "Na botânica e na filosofia, qualquer ponto pode brotar e abrir novos caminhos.",
  },
  {
    numero: "03",
    pequeno: "Aqui, o ioga",
    grande: "é rede: corpo, pensamento e sociedade.",
    detalhe: "Prática que sustenta o cotidiano e questiona o que nos prende.",
  },
];

export function RedeRizoma() {
  return (
    <section className={styles.secao} data-tema="claro" aria-labelledby="titulo-rede">
      <div className={styles.linhasFundo} aria-hidden="true">
        <LinhasRespirando linhas={7} amplitude={0.85} espessura={1.5} rolagem comecaReta />
      </div>

      <div className={`container ${styles.conteudo}`}>
        <div className={styles.topo}>
          <div>
            <p className="sobretitulo" id="titulo-rede">
              Por que Rizoma
            </p>
            <TextoRespira
              as="h2"
              className={styles.titulo}
              texto="Mais do que uma linha única, um espaço em movimento."
              destaques={["movimento."]}
            />
          </div>
          <Link href="/conhecer#conceito" className={`botao botao--contorno ${styles.link}`}>
            Entender o conceito <span className="seta">→</span>
          </Link>
        </div>

        <Surgir as="ol" filhos className={styles.grade}>
          {PASSOS.map((p) => (
            <li key={p.numero} className={styles.passo}>
              <span className={styles.numero}>{p.numero}</span>
              <p className={styles.frase}>
                <span>{p.pequeno}</span> {p.grande}
              </p>
              <p className={styles.detalhe}>{p.detalhe}</p>
            </li>
          ))}
        </Surgir>

        <ul className={styles.palavras} aria-label="Dimensões que se conectam no Rizoma">
          {redeRizoma.map((n) => (
            <li key={n.palavra}>{n.palavra}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
