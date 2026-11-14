import type { Metadata, Viewport } from "next";
import { Urbanist } from "next/font/google";
import { Cabecalho } from "@/components/Cabecalho";
import { Rodape } from "@/components/Rodape";
import { Movimento } from "@/components/movimento/Movimento";
import { Cursor } from "@/components/movimento/Cursor";
import { Abertura } from "@/components/movimento/Abertura";
import "./globals.css";

/*
 * Fonte: o manual não traz o nome da fonte. A mais provável é a Sofia Pro (paga).
 * Usamos a Urbanist (Google Fonts, gratuita), a alternativa mais próxima.
 */
const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-urbanist",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Rizoma — Ioga e Sociedade · Armação, Florianópolis",
    template: "%s · Rizoma — Ioga e Sociedade",
  },
  description:
    "Escola de ioga na Armação, em Florianópolis. Prática corporal, reflexão crítica e compromisso social. Aulas em grupo, ioga na praia, formação e projetos sociais.",
  openGraph: {
    locale: "pt_BR",
    type: "website",
    siteName: "Rizoma — Ioga e Sociedade",
  },
};

export const viewport: Viewport = {
  themeColor: "#f0dabb",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={urbanist.variable} suppressHydrationWarning>
      <head>
        {/* decide antes da pintura se a abertura deve aparecer */}
        <script
          dangerouslySetInnerHTML={{
            __html: "try{if(localStorage.getItem(\"rz-abertura\")===\"1\"||sessionStorage.getItem(\"rz-abertura\")===\"1\"||matchMedia(\"(prefers-reduced-motion: reduce)\").matches)document.documentElement.dataset.abertura=\"fim\"}catch(e){}",
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <a href="#conteudo" className="visualmente-oculto">
          Pular para o conteúdo
        </a>
        <Movimento />
        <Abertura />
        <Cabecalho />
        <main id="conteudo">{children}</main>
        <Rodape />
        <Cursor />
      </body>
    </html>
  );
}
