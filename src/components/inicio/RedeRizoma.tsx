"use client";

/**
 * "Por que Rizoma" contado como o próprio conceito:
 * a seção para na tela e, enquanto a pessoa rola, uma rede de linhas
 * vai brotando entre palavras soltas (corpo, respiração, sociedade...),
 * sem centro. No meio, a frase muda em três tempos: raiz → rizoma → Rizoma.
 */

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { redeRizoma } from "@/content/site";
import { prefereMenosMovimento } from "../movimento/Movimento";
import styles from "./RedeRizoma.module.css";

gsap.registerPlugin(ScrollTrigger);

// liga cada palavra às duas mais próximas
function arestas() {
  const lista: [number, number][] = [];
  redeRizoma.forEach((a, i) => {
    const perto = redeRizoma
      .map((b, j) => ({ j, d: Math.hypot(a.x - b.x, (a.y - b.y) * 0.8) }))
      .filter((o) => o.j !== i)
      .sort((x, y) => x.d - y.d)
      .slice(0, 3);
    perto.forEach(({ j }) => {
      if (!lista.some(([p, q]) => (p === j && q === i) || (p === i && q === j))) lista.push([i, j]);
    });
  });
  return lista;
}

const LIGACOES = arestas();

// a ligação não é reta: dobra uma vez no meio, como as linhas do símbolo
function caminho(i: number, j: number) {
  const a = redeRizoma[i];
  const b = redeRizoma[j];
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2 + ((i + j) % 2 ? 6 : -6);
  return `M${a.x} ${a.y} L${mx} ${my} L${b.x} ${b.y}`;
}

const FRASES = [
  { pequeno: "A raiz", grande: "vai fundo, numa só direção." },
  { pequeno: "O rizoma", grande: "cresce para os lados, sem centro." },
  { pequeno: "Aqui, o ioga", grande: "é rede: corpo, pensamento e sociedade." },
];

export function RedeRizoma() {
  const ref = useRef<HTMLElement>(null);
  // a animação fixa (pin) prende esta div interna, nunca a <section>:
  // assim o React consegue remover a seção ao trocar de página
  const palcoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const palco = palcoRef.current;
    if (!el || !palco) return;
    if (prefereMenosMovimento()) {
      palco.dataset.estatico = "true";
      return;
    }
    const ctx = gsap.context(() => {
      const linhas = gsap.utils.toArray<SVGPathElement>(`.${styles.ligacao}`);
      const nos = gsap.utils.toArray<HTMLElement>(`.${styles.no}`);
      const frases = gsap.utils.toArray<HTMLElement>(`.${styles.frase}`);

      gsap.set(linhas, { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(nos, { opacity: 0, scale: 0.6 });
      gsap.set(frases.slice(1), { opacity: 0, yPercent: 30 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: palco, start: "top top", end: "+=220%", pin: palco, scrub: 1 },
      });

      // 1º tempo: só a raiz (uma linha vertical que desce)
      tl.fromTo(`.${styles.raiz}`, { scaleY: 0 }, { scaleY: 1, duration: 1, ease: "none" })
        // 2º tempo: a raiz some e a rede brota para os lados
        .to(`.${styles.raiz}`, { opacity: 0, duration: 0.4 }, 1.1)
        .to(frases[0], { opacity: 0, yPercent: -30, duration: 0.5 }, 1.1)
        .to(frases[1], { opacity: 1, yPercent: 0, duration: 0.5 }, 1.4)
        .to(nos, { opacity: 1, scale: 1, duration: 0.6, stagger: { each: 0.12, from: "random" } }, 1.3)
        .to(linhas, { strokeDashoffset: 0, duration: 0.8, stagger: { each: 0.08, from: "random" }, ease: "none" }, 1.4)
        // 3º tempo: o Rizoma
        .to(frases[1], { opacity: 0, yPercent: -30, duration: 0.5 }, 3.2)
        .to(frases[2], { opacity: 1, yPercent: 0, duration: 0.5 }, 3.5)
        .to(`.${styles.rede}`, { color: "var(--terracota)", duration: 0.6 }, 3.5)
        .to({}, { duration: 0.6 });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} data-tema="creme" aria-labelledby="titulo-rede">
      <div ref={palcoRef} className={styles.secao}>
      <h2 id="titulo-rede" className="visualmente-oculto">
        Por que Rizoma
      </h2>

      <span className={styles.raiz} aria-hidden="true" />

      <div className={styles.rede} aria-hidden="true">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={styles.svg}>
          {LIGACOES.map(([i, j]) => (
            <path key={`${i}-${j}`} className={styles.ligacao} d={caminho(i, j)} pathLength={1} vectorEffect="non-scaling-stroke" />
          ))}
        </svg>
        {redeRizoma.map((n) => (
          <span key={n.palavra} className={styles.no} style={{ left: `${n.x}%`, top: `${n.y}%` }}>
            {n.palavra}
          </span>
        ))}
      </div>

      <div className={styles.centro}>
        <p className={styles.rotulo}>Por que Rizoma</p>
        <div className={styles.frases}>
          {FRASES.map((f) => (
            <p key={f.pequeno} className={styles.frase}>
              <span>{f.pequeno}</span> {f.grande}
            </p>
          ))}
        </div>
        <Link href="/conhecer#conceito" className={`botao botao--contorno ${styles.link}`}>
          Entender o conceito <span className="seta">→</span>
        </Link>
      </div>
      </div>
    </section>
  );
}
