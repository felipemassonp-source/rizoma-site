"use client";

import { useEffect, useState } from "react";
import { grade, modalidades } from "@/content/site";
import styles from "./GradeHorarios.module.css";

const tipos = ["Todas", ...Array.from(new Set(grade.dias.flatMap((d) => d.aulas.map((a) => a.tipo))))];

export function GradeHorarios() {
  const [filtro, setFiltro] = useState("Todas");
  const [dia, setDia] = useState(0);
  // abre no dia de hoje (no celular)
  useEffect(() => setDia(Math.max(0, Math.min(5, new Date().getDay() - 1))), []);

  const visivel = (tipo: string) => filtro === "Todas" || filtro === tipo;
  const ancora = (tipo: string) =>
    modalidades.find((m) => tipo.toLowerCase().includes(m.nome.toLowerCase().split(" ").pop() ?? ""))?.id;

  return (
    <div className={styles.grade}>
      <div className={styles.filtros} role="group" aria-label="Filtrar por modalidade">
        {tipos.map((t) => (
          <button key={t} aria-pressed={filtro === t} onClick={() => setFiltro(t)}>
            {t}
          </button>
        ))}
      </div>

      {/* celular: um dia por vez */}
      <div className={styles.abas} role="tablist" aria-label="Dia da semana">
        {grade.dias.map((d, i) => (
          <button key={d.dia} role="tab" aria-selected={dia === i} onClick={() => setDia(i)}>
            {d.dia.slice(0, 3)}
          </button>
        ))}
      </div>

      <div className={styles.semana}>
        {grade.dias.map((d, i) => (
          <div key={d.dia} className={styles.dia} data-ativo={dia === i}>
            <h3>{d.dia}</h3>
            <ul>
              {d.aulas.map((a) => (
                <li key={a.hora + a.tipo} data-apagada={!visivel(a.tipo)}>
                  <a href={`#${ancora(a.tipo) ?? "modalidades"}`}>
                    <span className={styles.hora}>{a.hora}</span>
                    <span className={styles.tipo}>{a.tipo}</span>
                    {"obs" in a && a.obs ? <span className={styles.obs}>{a.obs}</span> : null}
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
