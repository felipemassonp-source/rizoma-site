import { CabecaPagina, FotoFaltando } from "@/components/pagina/Pagina";
import { Revelar } from "@/components/movimento/Revelar";
import { FotoCheia } from "@/components/movimento/FotoCheia";
import { Surgir, TextoRespira } from "@/components/movimento/Surgir";
import { FraseRespiro } from "@/components/movimento/Texto";
import { LinhasRespirando } from "@/components/movimento/LinhasRespirando";
import { sobre, contato, linkWhatsApp } from "@/content/site";
import { Principios } from "@/components/pagina/Principios";
import s from "../paginas.module.css";

export const metadata = { title: "Conhecer" };

const AGENDAR = linkWhatsApp("Olá, Maira! Vim pelo site e quero agendar uma aula experimental no Rizoma.");

/**
 * Ordem pensada para quem chega sem conhecer nada:
 * o que é → quem conduz → onde fica → e, para quem quiser ir fundo, por que o nome.
 */
export default function Conhecer() {
  const { maira, espaco } = sobre;
  return (
    <>
      <CabecaPagina
        sobretitulo="Conhecer · a escola e a Maira"
        titulo={["Uma escola de", "ioga no sul", "da ilha."]}
        lead={
          <p>
            O Rizoma é uma escola de ioga na Armação, em Florianópolis, idealizada pela professora Maira Lopes. Aqui
            você conhece a proposta, quem está à frente da escola e onde ela fica.
          </p>
        }
        indice={[
          { href: "#escola", rotulo: "O Rizoma" },
          { href: "#maira", rotulo: "A Maira" },
          { href: "#espaco", rotulo: "O espaço" },
          { href: "#conceito", rotulo: "Por que “Rizoma”" },
        ]}
        foto="/fotos/espaco-sala.webp"
        fotoAlt="A sala de prática do Rizoma ao entardecer, com tapetes e blocos arrumados e o morro visto pela janela"
      />

      {/* 1 · O que é o Rizoma + princípios */}
      <section className={s.secao} data-tema="creme" id="escola">
        <div className="container">
          <div className={s.topoSecao}>
            <div>
              <p className="sobretitulo">O Rizoma</p>
              <TextoRespira as="h2" className={s.h2} texto="Um ioga que também pensa." destaques={["pensa."]} />
            </div>
            <Surgir filhos jeito="lento" className={s.corpo}>
              {sobre.escola.map((t) => (
                <p key={t.slice(0, 20)}>{t}</p>
              ))}
            </Surgir>
          </div>
          <Principios />
        </div>
      </section>

      {/* 2 · Quem está à frente: a Maira (uma foto só) */}
      <section className={s.secao} data-tema="claro" id="maira">
        <div className={`container ${s.duas}`}>
          <div className={s.retratos}>
            <Revelar
              src="/fotos/maira-sorrindo.webp"
              alt="Maira sorrindo na praia ao entardecer, com o cabelo solto"
              className={s.retratoA}
              recorte="arco"
              posicao="50% 30%"
              sizes="(min-width: 900px) 38vw, 90vw"
            />
          </div>
          <div style={{ display: "grid", gap: "1.75rem" }}>
            <p className="sobretitulo">Quem está à frente</p>
            <TextoRespira as="h2" className={s.h2} style={{ marginTop: 0 }} texto={maira.nome} />
            <Surgir filhos className={s.corpo}>
              {maira.bio.map((t) => (
                <p key={t.slice(0, 20)}>{t}</p>
              ))}
            </Surgir>
            <ul className={s.credenciais}>
              <li>
                <span>Ioga</span>
                <span>10 anos ensinando</span>
              </li>
              <li>
                <span>Ciências Sociais</span>
                <span>UNESP</span>
              </li>
              <li>
                <span>Mestrado em Ciência Política</span>
                <span>UFSCar</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3 · Onde fica */}
      <section className={s.secao} data-tema="creme" id="espaco">
        <div className="container">
          <div className={s.topoSecao}>
            <div>
              <p className="sobretitulo">O espaço</p>
              <TextoRespira as="h2" className={s.h2} texto="A 500 metros da praia da Armação." destaques={["praia"]} />
            </div>
            <Surgir className={s.corpo}>
              <p>{espaco.texto}</p>
            </Surgir>
          </div>

          <div className={s.galeria}>
            {espaco.fotos.map((f) => (
              <FotoFaltando key={f.legenda} legenda={f.legenda} />
            ))}
          </div>

          <div className={s.duas} style={{ marginTop: "clamp(2.5rem, 5vw, 4rem)" }}>
            <div className={s.corpo}>
              <address style={{ fontStyle: "normal", fontSize: "var(--t-lead)", lineHeight: 1.45 }}>
                {contato.endereco.linha1}
                <br />
                {contato.endereco.linha2}
              </address>
              <a className="botao botao--contorno" style={{ justifySelf: "start" }} href={contato.endereco.mapa} target="_blank" rel="noreferrer">
                Abrir no mapa <span className="seta">→</span>
              </a>
            </div>
            <ul className={s.acesso}>
              {espaco.acesso.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pausa: uma foto de praia de ponta a ponta */}
      <FotoCheia src="/fotos/agachada-por-do-sol.webp" alt="Silhueta de Maira numa postura agachada, com o braço erguido, contra o sol se pondo no mar" posicao="45% 55%">
        <FraseRespiro className={s.fraseFoto} linhas={["Presença e observação.", "Ação e silêncio."]} realce={[1]} />
        <p style={{ marginTop: "1rem", fontSize: "var(--t-mini)", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase" }}>
          Do Manual da Marca do Rizoma
        </p>
      </FotoCheia>

      {/* 4 · Para quem quer ir fundo: por que o nome */}
      <section className={s.secao} data-tema="vinho" id="conceito">
        <div className={s.conceitoLinhas} aria-hidden="true">
          <LinhasRespirando linhas={8} amplitude={1} espessura={1.5} rolagem comecaReta />
        </div>
        <div className={`container ${s.duas}`}>
          <div>
            <p className="sobretitulo">Por que “Rizoma”</p>
            <blockquote className={s.citacao} style={{ marginTop: "1.5rem" }}>
              Não é raiz.
              <br />
              <span>É movimento.</span>
            </blockquote>
          </div>
          <Surgir filhos className={s.corpo}>
            {sobre.conceito.map((t) => (
              <p key={t.slice(0, 20)}>{t}</p>
            ))}
          </Surgir>
        </div>
      </section>

      {/* Convite */}
      <section className={s.secao} data-tema="terracota">
        <div className={`container ${s.cta}`}>
          <TextoRespira as="h2" className={s.ctaTitulo} texto="Venha respirar com a gente." />
          <a className={`botao ${s.botaoClaro}`} href={AGENDAR} target="_blank" rel="noreferrer">
            Agendar aula experimental <span className="seta">→</span>
          </a>
        </div>
      </section>
    </>
  );
}
