import { CabecaPagina, SeloExemplo } from "@/components/pagina/Pagina";
import { GradeHorarios } from "@/components/pagina/GradeHorarios";
import { Revelar } from "@/components/movimento/Revelar";
import { Surgir, TextoRespira } from "@/components/movimento/Surgir";
import { FraseRespiro, Sequencia } from "@/components/movimento/Texto";
import { modalidades, planos, perguntas, linkWhatsApp } from "@/content/site";
import s from "../paginas.module.css";
import p from "./praticar.module.css";

export const metadata = { title: "Praticar" };

const AGENDAR = linkWhatsApp("Olá, Maira! Vim pelo site e quero agendar uma aula experimental no Rizoma.");

const ETAPAS = [
  { sanscrito: "jñāna", nome: "Teoria", texto: "Cada aula abre com um tema e um propósito." },
  { sanscrito: "dhāraṇā", nome: "Concentração", texto: "Chegar inteira, trazer a atenção para dentro." },
  { sanscrito: "āsana", nome: "Posturas", texto: "Movimento com consciência e respeito aos limites." },
  { sanscrito: "prāṇāyāma", nome: "Respiração", texto: "Expandir e recolher, no ritmo do corpo." },
  { sanscrito: "śavāsana", nome: "Relaxamento", texto: "O silêncio no final, para o corpo assentar." },
];

export default function Praticar() {
  return (
    <>
      <CabecaPagina
        sobretitulo="Praticar · aulas, horários e valores"
        titulo={["Corpo, pensamento", "e presença se", "encontram aqui."]}
        lead={
          <p>
            Aulas de ioga de 1 hora, para até 10 pessoas, com tapetes e material inclusos. Não é preciso experiência
            prévia: a primeira aula é experimental.
          </p>
        }
        indice={[
          { href: "#aula", rotulo: "Como é uma aula" },
          { href: "#modalidades", rotulo: "Modalidades" },
          { href: "#horarios", rotulo: "Horários" },
          { href: "#valores", rotulo: "Valores" },
          { href: "#perguntas", rotulo: "Perguntas" },
        ]}
        sombra="arvore"
        foto="/fotos/corvo-pedra.webp"
        fotoAlt="Maira em equilíbrio sobre os braços numa pedra à beira-mar"
      />

      {/* Como é uma aula */}
      <section className={s.secao} data-tema="vinho" id="aula">
        <div className="container">
          <div className={s.topoSecao}>
            <div>
              <p className="sobretitulo">Como é uma aula</p>
              <FraseRespiro as="h2" className={s.h2} linhas={["Uma hora,", "cinco tempos."]} realce={[1]} />
            </div>
            <p className={s.lead}>Não seguimos um estilo fixo de ioga. Cada aula tem tema e propósito, e passa por cinco momentos.</p>
          </div>
          <Sequencia className={p.etapas}>
            {ETAPAS.map((e, i) => (
              <li key={e.nome} style={{ ["--i" as string]: i }}>
                <div className={p.etapaGesto}>
                  <span className={p.etapaSans}>{e.sanscrito}</span>
                  <strong>{e.nome}</strong>
                  <span>{e.texto}</span>
                </div>
              </li>
            ))}
          </Sequencia>
        </div>
      </section>

      {/* Modalidades */}
      <section className={s.secao} data-tema="creme" id="modalidades">
        <div className="container">
          <p className="sobretitulo">Modalidades</p>
          <div className={p.modalidades}>
            {modalidades.map((m, i) => (
              <article key={m.id} id={m.id} className={p.modalidade} data-invertida={i % 2 === 1}>
                {i === 2 ? (
                  <Revelar src={m.foto} alt="" className={p.modalidadeFoto} sizes="(min-width: 900px) 45vw, 90vw" />
                ) : (
                  <Revelar
                    src={m.foto}
                    alt=""
                    className={p.modalidadeFoto}
                    recorte={(["reto", "arco", "reto", "circulo"] as const)[i % 4]}
                    sizes="(min-width: 900px) 45vw, 90vw"
                  />
                )}
                <Surgir className={p.modalidadeTexto}>
                  <span className={p.modalidadeN}>0{i + 1}</span>
                  <h2>{m.nome}</h2>
                  <p className={s.lead}>{m.resumo}</p>
                  <p>{m.detalhe}</p>
                  {m.exemplo && <SeloExemplo>Texto de exemplo: não existe no site atual</SeloExemplo>}
                  <a
                    className="botao botao--contorno"
                    href={linkWhatsApp(`Olá, Maira! Quero saber mais sobre: ${m.nome}.`)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {m.id === "praia" ? "Entrar na lista de avisos" : "Quero saber mais"} <span className="seta">→</span>
                  </a>
                </Surgir>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Horários */}
      <section className={s.secao} data-tema="claro" id="horarios">
        <div className="container">
          <div className={s.topoSecao}>
            <div>
              <p className="sobretitulo">Horários</p>
              <TextoRespira as="h2" className={s.h2} texto="Escolha seu horário de referência." destaques={["referência."]} />
            </div>
            <div style={{ display: "grid", gap: "1rem", justifyItems: "start" }}>
              <p className={s.lead}>
                As aulas são conduzidas pela Maira e pela Taili. Os horários são flexíveis: sempre que precisar trocar,
                é só avisar.
              </p>
            </div>
          </div>
          <GradeHorarios />
        </div>
      </section>

      {/* Planos */}
      <section className={s.secao} data-tema="creme" id="valores">
        <div className="container">
          <div className={s.topoSecao}>
            <div>
              <p className="sobretitulo">Valores</p>
              <TextoRespira as="h2" className={s.h2} texto="Sugerimos pelo menos 3 meses contínuos." destaques={["contínuos."]} />
            </div>
            <div style={{ display: "grid", gap: "1rem", justifyItems: "start" }}>
              <p className={s.lead}>É o tempo para perceber os benefícios mais profundos da prática.</p>
              <SeloExemplo>Valores de exemplo: preços fictícios</SeloExemplo>
            </div>
          </div>
          <Surgir filhos jeito="abre" className={p.planos}>
            {planos.itens.map((pl) => (
              <article key={pl.nome} className={p.plano} data-destaque={pl.destaque}>
                {pl.destaque && <span className={p.planoSelo}>mais indicado</span>}
                <h3>{pl.nome}</h3>
                <p className={p.planoPreco}>
                  {pl.preco}
                  {pl.sufixo && <small>{pl.sufixo}</small>}
                </p>
                <p>{pl.detalhe}</p>
                <a
                  className="botao"
                  href={linkWhatsApp(`Olá, Maira! Tenho interesse no plano: ${pl.nome}.`)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Quero esse <span className="seta">→</span>
                </a>
              </article>
            ))}
          </Surgir>
        </div>
      </section>

      {/* Perguntas */}
      <section className={s.secao} data-tema="claro" id="perguntas">
        <div className={`container ${s.duas}`}>
          <div>
            <p className="sobretitulo">Perguntas</p>
            <TextoRespira as="h2" className={s.h2} texto="Antes da primeira aula." />
          </div>
          <div className={p.faq}>
            {perguntas.map((q) => (
              <details key={q.p}>
                <summary>{q.p}</summary>
                <p>{q.r}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={s.secao} data-tema="terracota">
        <div className={`container ${s.cta}`}>
          <TextoRespira as="h2" className={s.ctaTitulo} texto="Experimente uma aula e sinta se o Rizoma é pra você." />
          <a className={`botao ${s.botaoClaro}`} href={AGENDAR} target="_blank" rel="noreferrer">
            Agendar aula experimental <span className="seta">→</span>
          </a>
        </div>
      </section>
    </>
  );
}
