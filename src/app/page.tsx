import Link from "next/link";
import Image from "next/image";
import { Entrada } from "@/components/inicio/Entrada";
import { BoneDestaque } from "@/components/inicio/BoneDestaque";
import { LinhasRespirando } from "@/components/movimento/LinhasRespirando";
import { Revelar } from "@/components/movimento/Revelar";
import { SombraSol } from "@/components/sombra/SombraSol";
import { FotoCheia } from "@/components/movimento/FotoCheia";
import { Surgir, TextoRespira } from "@/components/movimento/Surgir";
import { RespireComAGente } from "@/components/movimento/RespireComAGente";
import { RedeRizoma } from "@/components/inicio/RedeRizoma";
import { PraticarLista } from "@/components/inicio/PraticarLista";
import { PresidioPontos } from "@/components/inicio/PresidioPontos";
import { Marcador } from "@/components/inicio/Marcador";
import { Pendente } from "@/components/Pendente";
import {
  pilares,
  projetos,
  textoExemplo,
  contato,
  linkWhatsApp,
} from "@/content/site";
import s from "./inicio.module.css";

const AGENDAR = linkWhatsApp("Olá, Maira! Vim pelo site e quero agendar uma aula experimental no Rizoma.");

export default function Inicio() {
  return (
    <>
      {/* 1 · Topo — o primeiro fôlego */}
      <section className={s.hero} data-tema="creme">
        <div className={s.heroLinhas} aria-hidden="true">
          <LinhasRespirando linhas={12} amplitude={1.1} centro={0.62} espessura={3} seguirCursor desenharAoEntrar />
        </div>

        <Entrada className={`container ${s.heroGrade}`}>
          <div className={s.heroTexto}>
            <p className="sobretitulo" data-surge>
              Escola de ioga · Armação, Florianópolis
            </p>
            <h1 className={s.heroTitulo}>
              <span data-linha>
                <span>Um espaço para</span>
              </span>
              <span data-linha>
                <span>
                  <em>respirar</em>, pensar
                </span>
              </span>
              <span data-linha>
                <span>e existir com</span>
              </span>
              <span data-linha>
                <span>presença.</span>
              </span>
            </h1>
            <p className={s.heroLead} data-surge>
              Prática corporal, reflexão crítica e compromisso social. Mais do que ensinar posturas, criamos
              espaços para o corpo sentir, pensar e transformar.
            </p>
            <div className={s.heroAcoes} data-surge>
              <a className="botao" href={AGENDAR} target="_blank" rel="noreferrer">
                Agendar aula experimental <span className="seta">→</span>
              </a>
              <RespireComAGente />
            </div>
            <p className={s.heroInfo} data-surge>
              Você fala direto com a Maira no WhatsApp <i aria-hidden="true">·</i> venha com roupa confortável{" "}
              <i aria-hidden="true">·</i> tapetes inclusos
            </p>
          </div>

          <SombraSol id="lotus" className={s.heroSombra} />
        </Entrada>

        <p className={s.rolar} aria-hidden="true">
          <span />
          role devagar
        </p>
      </section>

      {/* 2 · Corpo · Reflexão · Autonomia */}
      <section className={s.pilares} data-tema="terracota">
        <div className="container">
          <div className={s.pilaresGrade}>
            {pilares.map((p, i) => (
              <article key={p.titulo} className={s.pilar} style={{ marginTop: `${i * 6}vw` }}>
                {i === 0 ? (
                  <Revelar src={p.foto} alt={p.alt} className={s.pilarFoto} sizes="(min-width: 900px) 30vw, 90vw" />
                ) : (
                  <Revelar
                    src={p.foto}
                    alt={p.alt}
                    className={s.pilarFoto}
                    recorte={i === 1 ? "circulo" : "reto"}
                    sizes="(min-width: 900px) 30vw, 90vw"
                  />
                )}
                <Surgir>
                  <span className={s.pilarNumero}>0{i + 1}</span>
                  <h3 className={s.pilarTitulo}>{p.titulo}</h3>
                  <p className={s.pilarTexto}>{p.texto}</p>
                </Surgir>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3 · Praticar — as aulas, elevadas para acesso rápido */}
      <section className={s.praticar} data-tema="creme" id="praticar">
        <div className="container">
          <Marcador n="01" nome="Praticar" href="/praticar" rotuloLink="Horários e valores" />
          <div className={s.praticarTopo}>
            <p className={s.praticarFatos}>
              Horários flexíveis <i aria-hidden="true">·</i> até 10 pessoas por aula <i aria-hidden="true">·</i> sem
              experiência prévia <i aria-hidden="true">·</i> tapetes inclusos
            </p>
          </div>
          <PraticarLista />
          <div className={s.praticarRodape}>
            <div>
              <p>Experimente uma aula e sinta se o Rizoma é pra você.</p>
              <span className={s.praticarSub}>
                Agendamento simples pelo WhatsApp direto com a professora.
              </span>
            </div>
            <div className={s.praticarBotoes}>
              <a href={AGENDAR} target="_blank" rel="noreferrer" className="botao">
                Agendar aula experimental <span className="seta">→</span>
              </a>
              <Link href="/praticar" className="botao botao--contorno">
                Ver horários e valores
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4 · Manifesto — por que Rizoma */}
      <RedeRizoma />

      {/* 5 · Pausa — um momento de silêncio */}
      <FotoCheia
        src="/fotos/silhueta-sol.webp"
        alt="Silhueta de Maira numa postura de abertura sobre a pedra, contra o sol se pondo no mar"
        posicao="35% 60%"
      >
        <Surgir className={s.pausaConteudo}>
          <blockquote className={s.pausaFrase}>
            Mais do que posturas,
            <br />
            <span>buscamos sentido.</span>
          </blockquote>
          <cite className={s.pausaAutora}>Maira Lopes · professora e idealizadora</cite>
        </Surgir>
      </FotoCheia>

      {/* 6 · Origem — a praia foi o primeiro estúdio */}
      <section className={s.origem} data-tema="claro">
        <div className="container">
          <Marcador n="02" nome="Como tudo começou" href="/conhecer" rotuloLink="Conhecer" />
        </div>
        <div className={`container ${s.origemGrade}`}>
          <Revelar
            src="/fotos/guerreiro-por-do-sol.webp"
            alt="Maira em postura do guerreiro na beira do mar da Armação, ao entardecer"
            className={s.origemFoto}
            faixas={7}
            profundidade={12}
          />
          <div className={s.origemTexto}>
            <TextoRespira
              as="h2"
              className={s.h2}
              texto="A praia foi o primeiro estúdio."
              destaques={["praia"]}
            />
            <Surgir filhos className={s.origemCorpo}>
              <p className={s.origemData}>Maio de 2021 · calçadão da Armação</p>
              <p>
                As primeiras aulas em Florianópolis foram para uma aluna, com um tapetinho e o mar como sala de prática.
                Dali, a prática cresceu para os lados — de encontro em encontro.
              </p>
              <div className={s.maira}>
                <Image
                  src="/fotos/maira-sorrindo.webp"
                  alt="Retrato de Maira sorrindo na praia"
                  width={88}
                  height={88}
                  className={s.mairaFoto}
                />
                <p>
                  <strong>Maira Lopes</strong> é professora de ioga há 10 anos, formada em Ciências Sociais (UNESP) e mestre
                  em Ciência Política (UFSCar).
                </p>
              </div>
              <Link href="/conhecer#maira" className="botao botao--contorno">
                Conheça a Maira <span className="seta">→</span>
              </Link>
            </Surgir>
          </div>
        </div>
      </section>

      {/* 7 · Aprofundar — a formação */}
      <section className={s.formacao} data-tema="terracota">
        <div className={s.formacaoLinhas} aria-hidden="true">
          <LinhasRespirando linhas={5} amplitude={0.7} centro={0.8} espessura={2} rolagem />
        </div>
        <div className="container">
          <Marcador n="03" nome="Aprofundar" href="/aprofundar" rotuloLink="A formação" />
          <TextoRespira
            as="h2"
            className={s.formacaoTitulo}
            texto="Do tapetinho à compreensão, do corpo à reflexão."
            destaques={["compreensão", "reflexão"]}
          />
          <Surgir className={s.formacaoGrade}>
            <p className={s.formacaoLead}>
              Formação e Aprofundamento em Ioga: para quem quer ir além da superfície, unindo prática, filosofia e
              estudo do corpo.
            </p>
            <dl className={s.formacaoFatos}>
              <div>
                <dt>60h</dt>
                <dd>presenciais</dd>
              </div>
              <div>
                <dt>6</dt>
                <dd>módulos</dd>
              </div>
              <div>
                <dt>1</dt>
                <dd>sábado por mês</dd>
              </div>
            </dl>
            <div className={s.formacaoAcoes}>
              <Link href="/aprofundar" className="botao">
                Conhecer a formação <span className="seta">→</span>
              </Link>
              <Pendente>
                a turma anunciada no site atual começou em abril de 2026. Faltam as datas da próxima turma.
              </Pendente>
            </div>
          </Surgir>
        </div>
      </section>

      {/* 8 · Sociedade — o bem-estar é coletivo */}
      <section className={s.sociedade} data-tema="vinho">
        <div className="container">
          <Marcador n="04" nome="Sociedade" href="/sociedade" rotuloLink="Projetos" />
          <div className={s.sociedadeTopo}>
            <div>
              <TextoRespira
                as="h2"
                className={s.h2}
                texto="O bem-estar se sente individualmente, mas se constrói coletivamente."
                destaques={["coletivamente"]}
              />
            </div>
            <Revelar
              src="/fotos/respira-praia.webp"
              alt="Maira conduzindo uma prática aberta do Movimento Respira na praia, com barcos ao fundo"
              className={s.sociedadeFoto}
              sizes="(min-width: 900px) 40vw, 90vw"
            />
          </div>

          <PresidioPontos />

          <ul className={s.projetos}>
            {[...projetos.map((p) => p.nome), "Movimento Respira"].map((p) => (
              <li key={p}>
                <Link href="/sociedade" className={s.projeto}>
                  <span>{p}</span>
                  <span className={s.projetoSeta} aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 9 · Apoiar — a lojinha */}
      <section className={s.apoiar} data-tema="creme">
        <div className="container">
          <Marcador n="05" nome="Apoiar" href="/apoiar" rotuloLink="Lojinha" />
          <BoneDestaque />
        </div>
      </section>

      {/* 10 · Rizomática — sem pressa, com calma */}
      <section className={s.rizomatica} data-tema="claro">
        <div className="container">
          <Marcador n="06" nome="Rizomática" href="/rizomatica" rotuloLink="Todos os textos" />
          <div className={s.rizomaticaTopo}>
            <div>
              <h2 className={s.h2}>Sem pressa, com calma.</h2>
            </div>
            <p className={s.rizomaticaIntro}>
              Textos para ler devagar. Aqui o ioga encontra a filosofia, a sociedade e o cotidiano. Um texto novo todo
              primeiro domingo do mês.
            </p>
          </div>

          <Surgir>
            <Link href={`/rizomatica/${textoExemplo.slug}`} className={s.texto} data-cursor>
              <div className={s.textoCapa}>
                <Image src={textoExemplo.capa} alt="" fill sizes="(min-width: 900px) 45vw, 90vw" />
              </div>
              <div className={s.textoCorpo}>
                <span className={s.textoSelo}>Texto de exemplo · apagar pelo painel</span>
                <span className={s.textoMeta}>
                  {textoExemplo.tema} · {textoExemplo.leitura}
                </span>
                <h3>{textoExemplo.titulo}</h3>
                <p>{textoExemplo.resumo}</p>
                <span className={s.textoLer}>Ler o texto →</span>
              </div>
            </Link>
          </Surgir>
        </div>
      </section>

      {/* 11 · Onde estamos */}
      <section className={s.local} data-tema="creme">
        <div className="container">
          <Marcador n="07" nome="Onde estamos" />
        </div>
        <div className={`container ${s.localGrade}`}>
          <div>
            <TextoRespira
              as="h2"
              className={s.h2}
              texto="Num bairro de pescadores, onde o mar dita o ritmo dos dias."
              destaques={["mar"]}
            />
          </div>
          <Surgir filhos className={s.localInfo}>
            <p className={s.localDestaque}>A 500 metros da praia da Armação.</p>
            <address>
              {contato.endereco.linha1}
              <br />
              {contato.endereco.linha2}
            </address>
            <ul className={s.localAcesso}>
              <li>Bicicletário no local</li>
              <li>Várias linhas de ônibus pela rodovia</li>
              <li>Estacionamento nas redondezas</li>
            </ul>
            <div className={s.localAcoes}>
              <a className="botao" href={AGENDAR} target="_blank" rel="noreferrer">
                Agendar aula experimental <span className="seta">→</span>
              </a>
              <a className="botao botao--contorno" href={contato.endereco.mapa} target="_blank" rel="noreferrer">
                Como chegar
              </a>
            </div>
          </Surgir>
        </div>
      </section>
    </>
  );
}
