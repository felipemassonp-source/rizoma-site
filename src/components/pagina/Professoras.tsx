import Link from "next/link";
import { perfisProfessoras } from "@/content/site";
import { Rosto } from "./GradeHorarios";
import { Surgir } from "../movimento/Surgir";
import { Pendente } from "../Pendente";
import styles from "./Professoras.module.css";

/** "Quem dá as aulas": uma apresentação bem curta de cada professora, antes da grade. */
export function Professoras() {
  return (
    <div className={styles.bloco}>
      <p className={styles.rotulo}>Quem dá as aulas</p>
      <Surgir as="ul" filhos jeito="abre" className={styles.lista}>
        {perfisProfessoras.map((p) => (
          <li key={p.nome} className={styles.cartao}>
            <Rosto nome={p.nome} tamanho="g" />
            <div className={styles.texto}>
              <strong>{p.nome}</strong>
              <p>{p.resumo}</p>
              {p.link && (
                <Link href={p.link.href} className={styles.link}>
                  {p.link.rotulo} <span aria-hidden="true">→</span>
                </Link>
              )}
              {p.pendente && <Pendente>{p.pendente}</Pendente>}
            </div>
          </li>
        ))}
      </Surgir>
    </div>
  );
}
