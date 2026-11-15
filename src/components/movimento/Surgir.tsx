"use client";

/**
 * Pequenos movimentos de entrada, todos no ritmo da respiração.
 *  - <Surgir>: o bloco entra (três jeitos: "sobe", "abre" e "lento")
 *  - <TextoRespira>: títulos de seção — cada palavra sobe de trás de uma máscara
 *    (a palavra em destaque fica na cor de destaque)
 *  - <Contador>: números que crescem ao entrar na tela
 */

import { Fragment, useEffect, useRef, type CSSProperties, type ReactNode, type ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefereMenosMovimento } from "./Movimento";
import t from "./Texto.module.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * sobe  — sobe um pouco e aparece (o padrão, para quase tudo)
 * abre  — abre de baixo para cima, como uma cortina (cards, blocos de destaque)
 * lento — uma inspiração longa: sobe mais devagar (textos de abertura de seção)
 */
type Jeito = "sobe" | "abre" | "lento";

const JEITOS: Record<Jeito, { de: gsap.TweenVars; para: gsap.TweenVars }> = {
  sobe: { de: { y: 26, opacity: 0 }, para: { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.08 } },
  abre: {
    de: { clipPath: "inset(100% 0% 0% 0%)", y: 30 },
    para: { clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 1.15, ease: "power4.out", stagger: 0.12 },
  },
  lento: { de: { y: 48, opacity: 0 }, para: { y: 0, opacity: 1, duration: 1.7, ease: "sine.out", stagger: 0.18 } },
};

export function Surgir({
  children,
  as: Tag = "div",
  atraso = 0,
  className,
  filhos = false,
  jeito = "sobe",
}: {
  children: ReactNode;
  as?: ElementType;
  atraso?: number;
  className?: string;
  /** anima cada filho direto em sequência */
  filhos?: boolean;
  jeito?: Jeito;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefereMenosMovimento()) return;
    const alvos = filhos ? Array.from(el.children) : el;
    const { de, para } = JEITOS[jeito];
    const tw = gsap.fromTo(alvos, de, {
      ...para,
      delay: atraso,
      ...(jeito === "abre" ? { clearProps: "clipPath" } : {}),
      scrollTrigger: { trigger: el, start: "top 96%" },
    });
    return () => {
      tw.scrollTrigger?.kill();
      tw.kill();
    };
  }, [atraso, filhos, jeito]);
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

export function TextoRespira({
  texto,
  destaques = [],
  className,
  style,
  as: Tag = "p",
}: {
  texto: string;
  destaques?: string[];
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefereMenosMovimento()) return;
    const palavras = el.querySelectorAll(`.${t.palavraDentro}`);
    // começa escondido aqui (e não no CSS) para o texto nunca sumir se o JS falhar
    gsap.set(palavras, { yPercent: 110 });
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 88%" } });
    tl.to(palavras, { yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.055 });
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  const limpa = (p: string) => p.replace(/[.,;:!?—]/g, "").toLowerCase();
  const alvo = destaques.map((d) => limpa(d));

  return (
    <Tag ref={ref} className={className} style={style} aria-label={texto}>
      {texto.split(" ").map((p, i) => {
        const destaque = alvo.includes(limpa(p));
        // o espaço fica FORA da máscara: dentro de um inline-block ele seria descartado
        return (
          <Fragment key={i}>
            <span className={t.palavra} aria-hidden="true">
              <span className={t.palavraDentro} style={destaque ? { color: "var(--destaque)" } : undefined}>
                {p}
              </span>
            </span>{" "}
          </Fragment>
        );
      })}
    </Tag>
  );
}

/** Número que cresce até o valor. Aceita texto como "60h": conta o número e mantém o resto. */
export function Contador({
  valor,
  prefixo = "",
  sufixo = "",
  semFormatacao = false,
}: {
  valor: number | string;
  prefixo?: string;
  sufixo?: string;
  semFormatacao?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const casado = typeof valor === "string" ? valor.match(/^(\d+)(.*)$/) : null;
  const numero = typeof valor === "number" ? valor : casado ? Number(casado[1]) : NaN;
  const resto = sufixo + (casado ? casado[2] : "");
  const fmt = (n: number) => prefixo + (semFormatacao ? String(Math.round(n)) : Math.round(n).toLocaleString("pt-BR")) + resto;

  useEffect(() => {
    const el = ref.current;
    if (!el || Number.isNaN(numero) || prefereMenosMovimento()) return;
    const obj = { n: 0 };
    el.textContent = fmt(0);
    const tw = gsap.to(obj, {
      n: numero,
      duration: Math.min(2.6, 1 + numero / 40),
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = fmt(obj.n);
      },
      scrollTrigger: { trigger: el, start: "top 90%" },
    });
    return () => {
      tw.scrollTrigger?.kill();
      tw.kill();
      el.textContent = fmt(numero);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numero, prefixo, resto, semFormatacao]);

  if (Number.isNaN(numero)) return <span>{String(valor)}</span>;
  return <span ref={ref}>{fmt(numero)}</span>;
}
