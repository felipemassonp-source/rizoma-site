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
          <div className={styles.aberturaNome}>
          <p className="sobretitulo" data-surge>
            Textos e newsletter da Maira
          </p>
          <h1 className={styles.marca}>
            <span data-linha>
              <span>Rizomática</span>
            </span>
          </h1>
          </div>
          <div className={styles.aberturaTexto} data-surge>
            <SombraSol id="pombo" className={styles.aberturaSombra} />
            <p>
              A Rizomática é o espaço de escrita da Maira: textos para ler devagar, em que o ioga encontra a
              filosofia, a sociedade e o cotidiano, sem fórmulas prontas.
            </p>
            <p className={styles.ritmo}>
              Um texto novo todo primeiro domingo do mês. Leia aqui ou{" "}
              <a href="#newsletter">receba por e-mail</a>.
            </p>
          </div>
        </Entrada>
      </section>

      <section className={styles.lista} data-tema="claro">
        <div className="container">
          <ListaTextos textos={textos} />
        </div>
      </section>

      <section className={styles.newsSecao} data-tema="claro" id="newsletter">
        <div className="container">
          <Newsletter escuro />
        </div>
      </section>
    </>
  );
}
