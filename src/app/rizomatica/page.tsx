import { textos } from "@/content/site";
import { Entrada } from "@/components/inicio/Entrada";
import { ListaTextos } from "@/components/rizomatica/ListaTextos";
import { Newsletter } from "@/components/rizomatica/Newsletter";
import { SombraSol } from "@/components/sombra/SombraSol";
import styles from "@/components/rizomatica/Rizomatica.module.css";

export const metadata = { title: "Rizomática" };

export default function Rizomatica() {
  return (
    <>
      <section className={styles.abertura} data-tema="claro">
        <Entrada className={`container ${styles.aberturaGrade}`}>
          <h1 className={styles.marca}>
            <span data-linha>
              <span>Rizomática</span>
            </span>
          </h1>
          <div className={styles.aberturaTexto} data-surge>
            <SombraSol id="pombo" className={styles.aberturaSombra} />
            <p>
              Textos da Maira para ler devagar. Aqui o ioga encontra a filosofia, a sociedade e o cotidiano, sem
              fórmulas prontas.
            </p>
            <p className={styles.ritmo}>Um texto novo todo primeiro domingo do mês.</p>
          </div>
        </Entrada>
      </section>

      <section className={styles.lista} data-tema="claro">
        <div className="container">
          <ListaTextos textos={textos} />
        </div>
      </section>

      <section className={styles.newsSecao} data-tema="claro">
        <div className="container">
          <Newsletter escuro />
        </div>
      </section>
    </>
  );
}
