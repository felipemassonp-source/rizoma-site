import { CabecaPagina, SeloExemplo } from "@/components/pagina/Pagina";
import { Surgir, TextoRespira, Contador } from "@/components/movimento/Surgir";
import { Pendente } from "@/components/Pendente";
import { ListaEsperaForm } from "@/components/aprofundar/ListaEsperaForm";
import { formacao, linkWhatsApp } from "@/content/site";
import s from "../paginas.module.css";
import a from "./aprofundar.module.css";

export const metadata = { title: "Aprofundar" };

const LISTA = linkWhatsApp("Olá, Maira! Quero entrar na lista de espera da próxima turma da Formação e Aprofundamento em Ioga.");
const CORES = ["var(--creme)", "var(--terracota)", "var(--vinho)", "var(--creme)", "var(--terracota)", "var(--vinho)"];

export default function Aprofundar() {
  return (
    <>
      <CabecaPagina
        sobretitulo="Aprofundar · formação em ioga"
        titulo={["Do tapetinho à", "compreensão, do", "corpo à reflexão."]}
        lead={
          <p>
            <strong>{formacao.nome}</strong>: curso presencial de 60 horas em Florianópolis, em 6 módulos, um sábado
            por mês. Para quem quer ir além da superfície e construir com segurança uma prática pessoal.
          </p>
        }
        indice={[
          { href: "#metodo", rotulo: "O método" },
          { href: "#modulos", rotulo: "Os módulos" },
          { href: "#investimento", rotulo: "Investimento" },
          { href: "#turma", rotulo: "Próxima turma" },
        ]}
        tema="terracota"
        sombra="torcao"
        foto="/fotos/escorpiao-estudio.webp"
        fotoAlt="Maira numa postura invertida sobre os antebraços, no estúdio"
      />

      {/* Método */}
      <section className={s.secao} data-tema="creme" id="metodo">
        <div className={`container ${s.duas}`}>
          <div>
            <p className="sobretitulo">O método</p>
            <TextoRespira as="h2" className={s.h2} texto="Teoria e experiência, lado a lado." destaques={["experiência,"]} />
          </div>
          <Surgir className={s.corpo}>
            <p className={s.lead}>{formacao.metodo}</p>
            <dl className={a.fatos}>
              {formacao.fatos.map((f) => (
                <div key={f.rotulo}>
                  <dt><Contador valor={f.valor} /></dt>
                  <dd>{f.rotulo}</dd>
                </div>
              ))}
            </dl>
          </Surgir>
        </div>
      </section>

      {/* Módulos — cartões que se empilham */}
      <section className={s.secao} data-tema="claro" id="modulos">
        <div className="container">
          <div className={s.topoSecao}>
            <div>
              <p className="sobretitulo">O percurso</p>
              <TextoRespira as="h2" className={s.h2} texto="Seis módulos, um sábado por mês." destaques={["sábado"]} />
            </div>
            <p className={s.lead}>Role devagar: cada módulo se assenta sobre o anterior, como camadas de prática.</p>
          </div>
          <ol className={a.pilha}>
            {formacao.modulos.map((m, i) => (
              <li
                key={m.n}
                className={a.modulo}
                style={{ ["--i" as string]: i, background: CORES[i], color: i % 3 === 0 ? "var(--vinho)" : "var(--creme-claro)" }}
              >
                <span className={a.moduloN}>Módulo {m.n}</span>
                <h3>{m.titulo}</h3>
                <p>{m.detalhe}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* O que inclui + investimento */}
      <section className={s.secao} data-tema="vinho" id="investimento">
        <div className={`container ${s.duas}`}>
          <div>
            <p className="sobretitulo">O que está incluso</p>
            <Surgir as="ul" filhos className={s.linhasLista} >
              {formacao.inclui.map((item, i) => (
                <li key={item} style={{ gridTemplateColumns: "3rem 1fr" }}>
                  <span className={s.n}>0{i + 1}</span>
                  <strong>{item}</strong>
                </li>
              ))}
            </Surgir>
          </div>
          <div>
            <p className="sobretitulo">Investimento</p>
            <div className={a.precos}>
              {formacao.investimento.map((p) => (
                <div key={p.forma} className={a.preco}>
                  <span>{p.forma}</span>
                  <strong>{p.valor}</strong>
                </div>
              ))}
            </div>
            <p style={{ marginTop: "1.25rem", opacity: 0.85 }}>{formacao.descontoAlunos}</p>
          </div>
        </div>
      </section>

      {/* Próxima turma */}
      <section className={s.secao} data-tema="creme" id="turma">
        <div className="container">
          <div className={s.topoSecao}>
            <div>
              <p className="sobretitulo">Próxima turma</p>
              <TextoRespira as="h2" className={s.h2} texto="Datas em breve." />
            </div>
            <div style={{ display: "grid", gap: "1rem", justifyItems: "start" }}>
              <Pendente>a turma anunciada no site atual começou em abril de 2026. Faltam as datas da próxima turma.</Pendente>
            </div>
          </div>

          <div className={a.calendario}>
            <SeloExemplo>Formato do calendário, com as datas da turma de 2026</SeloExemplo>
            <ol>
              {formacao.datasUltimaTurma.map((d, i) => (
                <li key={d}>
                  <span>M{i + 1}</span>
                  <strong>{d}</strong>
                  <small>sábado · 8h às 17h</small>
                </li>
              ))}
            </ol>
          </div>

          <ListaEsperaForm linkWhatsApp={LISTA} />
        </div>
      </section>
    </>
  );
}
