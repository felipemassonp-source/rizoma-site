import Link from "next/link";
import { Logo } from "./Logo";
import { contato, navegacao, linkWhatsApp } from "@/content/site";
import { LinhasRespirando } from "./movimento/LinhasRespirando";
import styles from "./Rodape.module.css";

export function Rodape() {
  return (
    <footer className={styles.rodape} data-tema="vinho">
      <div className={styles.ondas} aria-hidden="true">
        <LinhasRespirando linhas={6} amplitude={0.55} />
      </div>

      <div className={`container ${styles.grade}`}>
        <div className={styles.fraseBloco}>
        <p className={styles.frase}>
          Respira.
          <br />
          <span>O essencial acontece agora.</span>
        </p>
        </div>

        <div className={styles.coluna}>
          <h2 className={styles.rotulo}>Navegue</h2>
          <ul>
            {navegacao.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.rotulo}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.coluna}>
          <h2 className={styles.rotulo}>Fale com a gente</h2>
          <ul>
            <li>
              <a href={linkWhatsApp("Olá! Vim pelo site do Rizoma.")} target="_blank" rel="noreferrer">
                WhatsApp {contato.whatsappExibicao}
              </a>
            </li>
            <li>
              <a href={`mailto:${contato.email}`}>{contato.email}</a>
            </li>
            <li>
              <a href={`https://instagram.com/${contato.instagram}`} target="_blank" rel="noreferrer">
                @{contato.instagram}
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.coluna}>
          <h2 className={styles.rotulo}>Onde estamos</h2>
          <address>
            {contato.endereco.linha1}
            <br />
            {contato.endereco.linha2}
          </address>
          <a className={styles.mapa} href={contato.endereco.mapa} target="_blank" rel="noreferrer">
            Abrir no mapa →
          </a>
        </div>
      </div>

      <div className="container">
        <Logo className={styles.logoGrande} comAssinatura />
        <div className={styles.base}>
          <span>© {new Date().getFullYear()} Rizoma — Ioga e Sociedade</span>
          <span>Armação, Florianópolis · SC</span>
        </div>
      </div>
    </footer>
  );
}
