"use client";

import { useState } from "react";
import styles from "./Rizomatica.module.css";

/**
 * Cadastro na newsletter. Por enquanto só mostra o formato:
 * na etapa do Firebase, o e-mail será salvo na lista que a Maira vê no painel.
 */
export function Newsletter({ escuro = false }: { escuro?: boolean }) {
  const [enviado, setEnviado] = useState(false);
  return (
    <div className={styles.news} data-escuro={escuro}>
      <div>
        <h2>Receba um texto por mês.</h2>
        <p>Todo primeiro domingo do mês, um texto novo da Rizomática no seu e-mail. Sem pressa, com calma.</p>
      </div>
      {enviado ? (
        <p className={styles.newsOk} role="status">
          Pronto. Até o próximo domingo. <br />
          <small>(demonstração: o cadastro de verdade entra junto com o painel)</small>
        </p>
      ) : (
        <form
          className={styles.newsForm}
          onSubmit={(e) => {
            e.preventDefault();
            setEnviado(true);
          }}
        >
          <label className="visualmente-oculto" htmlFor="news-email">
            Seu e-mail
          </label>
          <input id="news-email" type="email" required placeholder="seu@email.com" autoComplete="email" />
          <button className="botao" type="submit">
            Quero receber
          </button>
        </form>
      )}
    </div>
  );
}
