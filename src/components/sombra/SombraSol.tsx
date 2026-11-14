/**
 * Composição para o topo das páginas: um sol (o "O" do logotipo) que se abre
 * e, à frente dele, a sombra de uma postura que nasce da linha do horizonte.
 */

import { Sombra } from "./Sombra";
import styles from "./SombraSol.module.css";

export function SombraSol({ id, className }: { id: string; className?: string }) {
  return (
    <div className={`${styles.palco} ${className ?? ""}`}>
      <span className={styles.sol} aria-hidden="true" />
      <Sombra id={id} className={styles.sombra} atraso={0.5} />
      <span className={styles.horizonte} aria-hidden="true" />
    </div>
  );
}
