import Image from "next/image";
import type { ReactNode } from "react";
import { Entrada } from "../inicio/Entrada";
import { SombraSol } from "../sombra/SombraSol";
import { Indice } from "./Indice";
import styles from "./Pagina.module.css";

/** Topo das páginas internas: título grande que sobe da máscara + linhas que seguem o cursor. */
export function CabecaPagina({
  sobretitulo,
  titulo,
  lead,
  tema = "creme",
  foto,
  fotoAlt = "",
  sombra,
  indice,
}: {
  sobretitulo: string;
  titulo: string[];
  lead?: ReactNode;
  tema?: "creme" | "terracota" | "vinho" | "claro";
  foto?: string;
  fotoAlt?: string;
  /** sombra de uma postura (com o sol) no lugar da foto */
  sombra?: string;
  /** atalhos para as seções da página: dizem logo o que tem aqui */
  indice?: { href: string; rotulo: string }[];
}) {
  return (
    <section className={styles.cabeca} data-tema={tema} data-com-foto={Boolean(foto || sombra)}>
      <Entrada className={`container ${styles.grade}`}>
        <div className={styles.texto}>
          <p className="sobretitulo" data-surge>
            {sobretitulo}
          </p>
          <h1 className={styles.titulo}>
            {titulo.map((l) => (
              <span data-linha key={l}>
                <span>{l}</span>
              </span>
            ))}
          </h1>
          {lead && (
            <div className={styles.lead} data-surge>
              {lead}
            </div>
          )}
          {indice && indice.length > 0 && <Indice itens={indice} />}
        </div>
        {sombra && <SombraSol id={sombra} className={styles.sombra} />}
        {!sombra && foto && (
          <div className={styles.foto} data-surge>
            <Image src={foto} alt={fotoAlt} fill priority sizes="(min-width: 900px) 35vw, 90vw" />
          </div>
        )}
      </Entrada>
    </section>
  );
}

/** Quadrado reservado para uma foto que ainda não existe. */
export function FotoFaltando({ legenda, className }: { legenda: string; className?: string }) {
  return (
    <figure className={`${styles.falta} ${className ?? ""}`}>
      <span className={styles.faltaIcone} aria-hidden="true">
        ◱
      </span>
      <figcaption>
        <strong>Falta foto</strong>
        {legenda}
      </figcaption>
    </figure>
  );
}

/** Selo para dados fictícios, usados só para mostrar o formato visual. */
export function SeloExemplo({ children = "Exemplo: dados fictícios, trocar pelo painel" }: { children?: ReactNode }) {
  return <span className={styles.selo}>{children}</span>;
}
