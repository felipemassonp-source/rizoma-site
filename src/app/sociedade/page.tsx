import Link from "next/link";
import { CabecaPagina, FotoFaltando, SeloExemplo } from "@/components/pagina/Pagina";
import { Revelar } from "@/components/movimento/Revelar";
import { Surgir, TextoRespira } from "@/components/movimento/Surgir";
import { PresidioPontos } from "@/components/inicio/PresidioPontos";
import { respira, projetos, agenda, contato, linkWhatsApp } from "@/content/site";
import s from "../paginas.module.css";
import so from "./sociedade.module.css";

export const metadata = { title: "Sociedade" };

export default function Sociedade() {
  return (
    <>
      <CabecaPagina
        sobretitulo="Sociedade · projetos sociais e ações"
        titulo={["O bem-estar", "se constrói", "coletivamente."]}
        lead={
          <p>
            O ioga do Rizoma também sai da sala: aulas no Presídio Feminino, nas comunidades e práticas abertas e
            gratuitas em praias e praças, com o Movimento Respira.
          </p>
        }
        indice={[
          { href: "#respira", rotulo: "Movimento Respira" },
          { href: "#projetos", rotulo: "Projetos sociais" },
          { href: "#agenda", rotulo: "Agenda" },
          { href: "#como-apoiar", rotulo: "Como apoiar" },
        ]}
        tema="vinho"
        sombra="guerreiro"
        foto="/fotos/respira-praia.webp"
        fotoAlt="Maira conduzindo o Movimento Respira na praia, com barcos ao fundo"
      />

      {/* Movimento Respira */}
      <section className={s.secao} data-tema="terracota" id="respira">
        <div className="container">
          <div className={s.duas}>
            <div style={{ display: "grid", gap: "1.5rem" }}>
              <p className="sobretitulo">{respira.titulo}</p>
              <TextoRespira as="h2" className={s.h2} texto={respira.subtitulo} />
              <Surgir filhos className={s.corpo}>
                {respira.texto.map((t) => (
                  <p key={t.slice(0, 20)}>{t}</p>
                ))}
              </Surgir>
            </div>
            <Revelar
              src="/fotos/respira-calcadao.webp"
              alt="Prática aberta do Movimento Respira no calçadão da Armação, com dezenas de pessoas em postura de equilíbrio diante do mar e a bandeira do Respira ao fundo"
              className={so.respiraFoto}
              posicao="60% 58%"
              profundidade={6}
              sizes="(min-width: 900px) 50vw, 100vw"
            />
          </div>

          <div className={so.contexto}>
            <h3>Leve o Respira até você</h3>
            <p className={so.contextoTexto}>
              Além das ações abertas, o Respira também vai até empresas, escolas, coletivos e eventos, com uma proposta
              pensada para cada lugar e cada grupo. Escolha onde você quer levar e fale com a gente pelo WhatsApp:
            </p>
            <ul>
              {respira.contextos.map((c) => (
                <li key={c.nome}>
                  <a
                    href={linkWhatsApp(`Olá, Maira! Quero levar o Movimento Respira para ${c.mensagem}.`)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {c.nome} <span aria-hidden="true">→</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className={s.acoes}>
              <a
                className="botao botao--contorno"
                href={linkWhatsApp("Olá, Maira! Quero levar o Movimento Respira para outro lugar.")}
                target="_blank"
                rel="noreferrer"
              >
                Outro lugar? Fale com a gente
              </a>
              <a className="botao botao--contorno" href={`https://instagram.com/${contato.instagramRespira}`} target="_blank" rel="noreferrer">
                Ver o Respira no Instagram
              </a>
            </div>
          </div>
          <p className={so.frase}>{respira.frase}</p>
        </div>
      </section>

      {/* Projetos */}
      <section className={s.secao} data-tema="vinho" id="projetos">
        <div className="container">
          <p className="sobretitulo">Projetos sociais</p>
          <div className={so.projetos}>
            {projetos.map((p, i) => (
              <article key={p.id} id={p.id} className={so.projeto}>
                <div className={so.projetoTexto}>
                  <span className={so.projetoN}>0{i + 1}</span>
                  <h2>{p.nome}</h2>
                  <span className={so.projetoDesde}>{p.desde}</span>
                  <p>{p.texto}</p>
                </div>
                {p.foto ? (
                  <Revelar
                    src={p.foto}
                    alt={p.fotoAlt}
                    className={so.projetoFoto}
                    recorte={(["arco", "circulo", "reto"] as const)[i % 3]}
                    sizes="360px"
                  />
                ) : (
                  <FotoFaltando legenda={`Uma foto do projeto ${p.nome}`} className={so.projetoFotoFalta} />
                )}
                {p.id === "grades" && (
                  <div className={so.projetoExtra}>
                    <PresidioPontos />
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Agenda */}
      <section className={s.secao} data-tema="claro" id="agenda">
        <div className="container">
          <div className={s.topoSecao}>
            <div>
              <p className="sobretitulo">Agenda</p>
              <h2 className={s.h2}>Próximas ações abertas.</h2>
            </div>
            <div style={{ display: "grid", gap: "1rem", justifyItems: "start" }}>
              <p className={s.lead}>Atividades gratuitas, em espaços públicos. Não é preciso experiência.</p>
              <SeloExemplo>Agenda de exemplo: datas fictícias</SeloExemplo>
            </div>
          </div>
          <Surgir as="ul" filhos className={so.agenda}>
            {agenda.itens.map((e) => (
              <li key={e.titulo}>
                <span className={so.data}>
                  <strong>{e.dia}</strong>
                  {e.mes}
                </span>
                <span className={so.evento}>
                  <strong>{e.titulo}</strong>
                  {e.local} · {e.hora}
                </span>
                <a
                  href={linkWhatsApp(`Olá! Quero participar: ${e.titulo} (${e.dia}/${e.mes}).`)}
                  target="_blank"
                  rel="noreferrer"
                  className={so.eventoLink}
                >
                  Quero ir →
                </a>
              </li>
            ))}
          </Surgir>
        </div>
      </section>

      {/* Apoiar */}
      <section className={s.secao} data-tema="creme" id="como-apoiar">
        <div className={`container ${s.duas} ${s.duasFim}`}>
          <div>
            <p className="sobretitulo">Como apoiar</p>
            <TextoRespira
              as="h2"
              className={s.ctaTitulo}
              texto="Não é porque é social que se faz só por amor."
              destaques={["amor."]}
            />
          </div>
          <div className={s.corpo}>
            <p className={s.lead}>
              Projetos sociais também precisam de recursos. Todo o lucro da lojinha do Rizoma vai para os projetos de
              ioga.
            </p>
            <div className={s.acoes}>
              <Link href="/apoiar" className="botao">
                Ir para a lojinha <span className="seta">→</span>
              </Link>
              <a
                className="botao botao--contorno"
                href={linkWhatsApp("Olá, Maira! Quero propor uma parceria com os projetos sociais do Rizoma.")}
                target="_blank"
                rel="noreferrer"
              >
                Propor parceria
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
