"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Logo, Simbolo } from "./Logo";
import { navegacao, contato, linkWhatsApp } from "@/content/site";
import { getLenis, prefereMenosMovimento } from "./movimento/Movimento";
import styles from "./Cabecalho.module.css";

export function Cabecalho() {
  const caminho = usePathname();
  const [aberto, setAberto] = useState(false);
  const [escondido, setEscondido] = useState(false);
  const [rolou, setRolou] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  // Some ao descer, volta ao subir (como uma onda)
  useEffect(() => {
    let ultimo = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setRolou(y > 40);
      if (Math.abs(y - ultimo) < 6) return;
      setEscondido(y > ultimo && y > 240);
      ultimo = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setAberto(false), [caminho]);

  // Animação do menu: as linhas se desenham, os links sobem
  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      tl.current = gsap
        .timeline({ paused: true })
        .set(el, { visibility: "visible" })
        .fromTo(el, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.9, ease: "power3.inOut" })
        .fromTo(
          `.${styles.item}`,
          { yPercent: 110 },
          { yPercent: 0, duration: 0.9, ease: "power3.out", stagger: 0.06 },
          0.45,
        )
        .fromTo(`.${styles.rodapeMenu}`, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.9);
    }, el);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (aberto) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
      if (prefereMenosMovimento()) tl.current?.progress(1);
      else tl.current?.timeScale(1).play();
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
      tl.current?.timeScale(1.8).reverse();
    }
  }, [aberto]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={styles.cabecalho}
        data-escondido={escondido && !aberto}
        data-rolou={rolou}
        data-aberto={aberto}
      >
        <Link href="/" className={styles.marca} aria-label="Rizoma — página inicial">
          <Logo className={styles.logo} />
        </Link>

        <nav className={styles.navDesktop} aria-label="Principal">
          {navegacao.map((item) => (
            <Link key={item.href} href={item.href} aria-current={caminho === item.href ? "page" : undefined}>
              {item.rotulo}
            </Link>
          ))}
        </nav>

        <button
          className={styles.botaoMenu}
          onClick={() => setAberto((v) => !v)}
          aria-expanded={aberto}
          aria-controls="menu-principal"
        >
          <span className={styles.botaoTexto}>{aberto ? "Fechar" : "Menu"}</span>
          <span className={styles.icone} aria-hidden="true">
            <Simbolo className={styles.iconeSimbolo} />
            <svg className={styles.iconeFechar} viewBox="0 0 24 24">
              <path d="M4 4 L20 20 M20 4 L4 20" />
            </svg>
          </span>
        </button>
      </header>

      <div id="menu-principal" ref={menuRef} className={styles.menu} aria-hidden={!aberto} inert={!aberto}>
        <nav className={styles.lista} aria-label="Menu">
          {navegacao.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.link}
              aria-current={caminho === item.href ? "page" : undefined}
              onClick={() => setAberto(false)}
            >
              <span className={styles.item}>
                <span className={styles.numero}>{String(i + 1).padStart(2, "0")}</span>
                {item.rotulo}
              </span>
            </Link>
          ))}
        </nav>

        <div className={styles.rodapeMenu}>
          <a href={linkWhatsApp("Olá! Vim pelo site do Rizoma.")} target="_blank" rel="noreferrer">
            WhatsApp {contato.whatsappExibicao}
          </a>
          <a href={`https://instagram.com/${contato.instagram}`} target="_blank" rel="noreferrer">
            @{contato.instagram}
          </a>
          <span>Armação · Florianópolis</span>
        </div>
      </div>
    </>
  );
}
