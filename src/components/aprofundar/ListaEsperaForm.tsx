"use client";

import { useState } from "react";
import a from "@/app/aprofundar/aprofundar.module.css";

type Props = {
  linkWhatsApp: string;
};

/**
 * Captura rápida de e-mail para a lista de espera da Formação,
 * mantendo também a opção de falar direto pelo WhatsApp.
 */
export function ListaEsperaForm({ linkWhatsApp }: Props) {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);

  return (
    <div className={a.listaEspera}>
      <div className={a.listaEsperaTexto}>
        <h3>Receba as datas da próxima turma</h3>
        <p>
          Deixe seu e-mail para ser avisado assim que abrirmos as inscrições — ou chame direto no WhatsApp.
        </p>
      </div>

      {enviado ? (
        <div className={a.listaEsperaOk} role="status">
          <p>
            <strong>Pronto!</strong> Anotamos <span>{email}</span> na lista de espera da próxima turma.
          </p>
          <small>(demonstração: o envio automático entra junto com o painel)</small>
        </div>
      ) : (
        <form
          className={a.listaEsperaForm}
          onSubmit={(e) => {
            e.preventDefault();
            if (!email.trim()) return;
            setEnviado(true);
          }}
        >
          <label className="visualmente-oculto" htmlFor="formacao-email">
            Seu e-mail para a lista de espera
          </label>
          <input
            id="formacao-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Deixe seu e-mail para receber as datas"
            autoComplete="email"
          />
          <button className="botao" type="submit">
            Quero ser avisado <span className="seta">→</span>
          </button>
        </form>
      )}

      <div className={a.listaEsperaAlt}>
        <span>Prefere falar agora?</span>
        <a className="botao botao--contorno" href={linkWhatsApp} target="_blank" rel="noreferrer">
          Entrar na lista pelo WhatsApp <span className="seta">→</span>
        </a>
      </div>
    </div>
  );
}
