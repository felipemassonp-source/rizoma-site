"use client";

/**
 * "Respire com a gente": um convite para três respirações guiadas
 * antes de qualquer leitura. Inspira 4s · segura 2s · expira 6s.
 */

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { getLenis, prefereMenosMovimento } from "./Movimento";
import styles from "./RespireComAGente.module.css";

const CICLOS = 3;

export function RespireComAGente({ className }: { className?: string }) {
  const [aberto, setAberto] = useState(false);
  const [fase, setFase] = useState("Prepare-se");
  const [ciclo, setCiclo] = useState(0);
  const palcoRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const fecharRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!aberto) return;
    getLenis()?.stop();
    document.documentElement.style.overflow = "hidden";
    fecharRef.current?.focus();

    const el = palcoRef.current!;
    const circulo = el.querySelector(`.${styles.circulo}`);
    const anel = el.querySelector(`.${styles.anel}`);
    const lento = prefereMenosMovimento() ? 0.01 : 1;

    const tl = gsap.timeline({ onComplete: () => setFase("Bem-vinda, bem-vindo ao Rizoma.") });
    tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.8 })
      .set(circulo, { scale: 0.35 })
      .call(() => setFase("Prepare-se"))
      .to({}, { duration: 1.5 });

    for (let c = 0; c < CICLOS; c++) {
      tl.call(() => {
        setCiclo(c + 1);
        setFase("Inspire");
      })
        .to(circulo, { scale: 1, duration: 4 * lento, ease: "sine.inOut" })
        .to(anel, { scale: 1.12, opacity: 0.5, duration: 4 * lento, ease: "sine.inOut" }, "<")
        .call(() => setFase("Segure"))
        .to({}, { duration: 2 * lento })
        .call(() => setFase("Expire"))
        .to(circulo, { scale: 0.35, duration: 6 * lento, ease: "sine.inOut" })
        .to(anel, { scale: 0.9, opacity: 0.2, duration: 6 * lento, ease: "sine.inOut" }, "<");
    }
    tlRef.current = tl;

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      tl.kill();
      getLenis()?.start();
      document.documentElement.style.overflow = "";
    };
  }, [aberto]);

  const terminou = fase.startsWith("Bem-vinda");

  return (
    <>
      <button className={`${styles.gatilho} ${className ?? ""}`} onClick={() => setAberto(true)}>
        <span className={styles.pulso} aria-hidden="true" />
        Respire com a gente
      </button>

      {aberto &&
        createPortal(
        <div className={styles.palco} ref={palcoRef} role="dialog" aria-modal="true" aria-label="Respiração guiada">
          <button ref={fecharRef} className={styles.fechar} onClick={() => setAberto(false)}>
            Fechar
          </button>

          <div className={styles.centro}>
            <span className={styles.anel} aria-hidden="true" />
            <span className={styles.circulo} aria-hidden="true" />
            <p className={styles.fase} aria-live="polite">
              {fase}
            </p>
          </div>

          <div className={styles.rodape}>
            {terminou ? (
              <button className="botao" onClick={() => setAberto(false)}>
                Continuar <span className="seta">→</span>
              </button>
            ) : (
              <span>
                Respiração {Math.max(ciclo, 1)} de {CICLOS}
              </span>
            )}
          </div>
        </div>,
          document.body,
        )}
    </>
  );
}
