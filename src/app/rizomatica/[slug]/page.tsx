import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { textos } from "@/content/site";
import { Leitura } from "@/components/rizomatica/Leitura";
import { Newsletter } from "@/components/rizomatica/Newsletter";
import { Simbolo } from "@/components/Logo";
import styles from "@/components/rizomatica/Rizomatica.module.css";

export function generateStaticParams() {
  return textos.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = textos.find((x) => x.slug === slug);
  return { title: t ? `${t.titulo} · Rizomática` : "Rizomática", description: t?.resumo };
}

export default async function TextoPagina({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = textos.findIndex((t) => t.slug === slug);
  if (i < 0) notFound();
  const t = textos[i];
  const proximo = textos[(i + 1) % textos.length];

  return (
    <article data-tema="claro" className={styles.artigo}>
      <Leitura alvo="corpo-texto" />

      <header className={`container ${styles.artigoTopo}`}>
        <Link href="/rizomatica" className={styles.voltar}>
          ← Rizomática
        </Link>
        <span className={styles.meta}>
          {t.tema} · {t.data} · {t.leitura}
        </span>
        <h1>{t.titulo}</h1>
        <p className={styles.artigoResumo}>{t.resumo}</p>
        {t.exemplo && <span className={styles.selo}>texto de exemplo · criado para mostrar o formato, apagar pelo painel</span>}
      </header>

      <div className={`container ${styles.artigoCapa}`}>
        <div>
          <Image src={t.capa} alt="" fill priority sizes="(min-width: 1200px) 1100px, 100vw" />
        </div>
      </div>

      <div id="corpo-texto" className={styles.corpoTexto}>
        {t.corpo.map((b, k) =>
          b.tipo === "h2" ? (
            <h2 key={k}>{b.texto}</h2>
          ) : b.tipo === "citacao" ? (
            <blockquote key={k}>{b.texto}</blockquote>
          ) : (
            <p key={k} className={k === 0 ? styles.primeiro : undefined}>
              {b.texto}
            </p>
          ),
        )}

        <footer className={styles.assinatura}>
          <Image src="/fotos/maira-sorrindo.webp" alt="" width={64} height={64} />
          <div>
            <strong>Maira Lopes</strong>
            <span>Professora e idealizadora do Rizoma</span>
          </div>
          <Simbolo className={styles.assinaturaSimbolo} />
        </footer>
      </div>

      <div className="container">
        <Newsletter escuro />
        <Link href={`/rizomatica/${proximo.slug}`} className={styles.proximo} data-cursor>
          <span className={styles.meta}>Próximo texto</span>
          <strong>{proximo.titulo}</strong>
          <span className={styles.ler}>Continuar lendo →</span>
        </Link>
      </div>
    </article>
  );
}
