import { CabecaPagina } from "@/components/pagina/Pagina";
import { Loja } from "@/components/loja/Loja";
import { Surgir } from "@/components/movimento/Surgir";
import s from "../paginas.module.css";

export const metadata = { title: "Apoiar" };

const PASSOS = [
  { n: "01", t: "Escolha", d: "Cor, tamanho e quantidade de cada peça." },
  { n: "02", t: "Envie", d: "O pedido chega pronto no WhatsApp do Rizoma." },
  { n: "03", t: "Combine", d: "Pagamento e entrega são combinados direto com a gente." },
];

export default function Apoiar() {
  return (
    <>
      <CabecaPagina
        sobretitulo="Apoiar · lojinha"
        sombra="lua"
        titulo={["Vista o que", "você acredita."]}
        lead={
          <p>
            Bonés, camisetas e acessórios do Rizoma. Todo o lucro vai para os projetos sociais de ioga: o presídio
            feminino, as comunidades e o Movimento Respira.
          </p>
        }
      />

      <section className={s.secao} data-tema="creme" style={{ paddingTop: "2rem" }}>
        <div className="container">
          <Loja />
        </div>
      </section>

      <section className={s.secao} data-tema="vinho">
        <div className="container">
          <p className="sobretitulo">Como funciona</p>
          <Surgir as="ol" filhos className={s.linhasLista} >
            {PASSOS.map((p) => (
              <li key={p.n}>
                <span className={s.n}>{p.n}</span>
                <strong>{p.t}</strong>
                <span>{p.d}</span>
              </li>
            ))}
          </Surgir>
        </div>
      </section>
    </>
  );
}
