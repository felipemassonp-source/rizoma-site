"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { grade, modalidades, professoras, rostos } from "@/content/site";
import styles from "./GradeHorarios.module.css";

type Prof = (typeof professoras)[number];
const filtros = ["Todas", ...professoras] as const;

/** Rostinho redondo da professora. Sem foto: círculo tracejado com a inicial, guardando o lugar. */
export function Rosto({ nome, tamanho = "p" }: { nome: Prof; tamanho?: "p" | "m" | "g" }) {
  const foto = rostos[nome];
  return (
    <span className={styles.rosto} data-tamanho={tamanho} data-sem-foto={!foto} title={foto ? nome : `${nome} (foto em breve)`}>
      {foto ? <Image src={foto} alt="" fill sizes="64px" /> : <span aria-hidden="true">{nome[0]}</span>}
    </span>
  );
}

export function GradeHorarios() {
  const [filtro, setFiltro] = useState<(typeof filtros)[number]>("Todas");
  const [dia, setDia] = useState(0);
  // abre no dia de hoje (no celular); fim de semana abre na segunda
  useEffect(() => {
    const hoje = new Date().getDay() - 1;
    setDia(hoje >= 0 && hoje < grade.dias.length ? hoje : 0);
  }, []);

  const visivel = (prof?: string) => filtro === "Todas" || filtro === prof;
  const ancora = (tipo: string) =>
    modalidades.find((m) => tipo.toLowerCase().includes(m.nome.toLowerCase().split(" ").pop() ?? ""))?.id;

  return (
    <div className={styles.grade}>
      <div className={styles.topo}>
        {/* quem conduz: as duas com "Todas", só uma quando filtrada */}
        <div className={styles.quem} aria-live="polite">
          <div className={styles.rostos}>
            {professoras.map((p) => (
              <span key={p} className={styles.rostoSlot} data-visivel={visivel(p)}>
                <Rosto nome={p} tamanho="g" />
              </span>
            ))}
          </div>
          <p>
            {filtro === "Todas" ? (
              <>
                Aulas com a <strong>Maira</strong> e com a <strong>Taili</strong>
              </>
            ) : (
              <>
                Aulas com a <strong>{filtro}</strong>
              </>
            )}
          </p>
        </div>

        <div className={styles.filtros} role="group" aria-label="Filtrar por professora">
          <span className={styles.filtrosRotulo}>Com quem</span>
          {filtros.map((t) => (
            <button key={t} aria-pressed={filtro === t} onClick={() => setFiltro(t)}>
              <span className={styles.botaoRostos} aria-hidden="true">
                {(t === "Todas" ? professoras : [t]).map((p) => (
                  <Rosto key={p} nome={p} />
                ))}
              </span>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* celular: um dia por vez */}
      <div className={styles.abas} role="tablist" aria-label="Dia da semana">
        {grade.dias.map((d, i) => (
          <button key={d.dia} role="tab" aria-selected={dia === i} onClick={() => setDia(i)}>
            {d.dia.slice(0, 3)}
          </button>
        ))}
      </div>

      <div className={styles.semana} style={{ ["--dias" as string]: grade.dias.length }}>
        {grade.dias.map((d, i) => (
          <div key={d.dia} className={styles.dia} data-ativo={dia === i}>
            <h3>{d.dia}</h3>
            <ul>
              {d.aulas.map((a) => (
                <li key={a.hora + a.tipo} data-apagada={!visivel(a.professora)}>
                  <a href={`#${ancora(a.tipo) ?? "modalidades"}`}>
                    <span className={styles.hora}>{a.hora}</span>
                    <span className={styles.tipo}>{a.tipo}</span>
                    {a.professora && (
                      <span className={styles.prof}>
                        <Rosto nome={a.professora} />
                        com {a.professora}
                      </span>
                    )}
                    {a.obs ? <span className={styles.obs}>{a.obs}</span> : null}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
