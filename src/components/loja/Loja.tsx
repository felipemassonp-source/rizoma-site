"use client";

/**
 * Lojinha do Rizoma: vitrine → escolher cor/tamanho → sacola → dados → pedido pelo WhatsApp.
 * O pagamento é combinado no WhatsApp (nada é cobrado no site).
 * A sacola fica guardada no navegador da pessoa. Na etapa do Firebase,
 * cada pedido também será salvo para a Maira acompanhar pelo painel.
 */

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { produtos, pagamentos, entregas, contato, type Produto } from "@/content/site";
import { Simbolo } from "../Logo";
import { getLenis } from "../movimento/Movimento";
import { Surgir } from "../movimento/Surgir";
import styles from "./Loja.module.css";

type Item = { id: string; produtoId: string; cor: string; tamanho: string; qtd: number };

const real = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const CHAVE = "rz-sacola";

function lerSacola(): Item[] {
  try {
    return JSON.parse(localStorage.getItem(CHAVE) || "[]");
  } catch {
    return [];
  }
}

function travarRolagem(travar: boolean) {
  const lenis = getLenis();
  if (travar) lenis?.stop();
  else lenis?.start();
  document.documentElement.style.overflow = travar ? "hidden" : "";
}

/* ---------- Foto do produto (ou espaço reservado) ---------- */
function FotoProduto({ p, cor, grande = false }: { p: Produto; cor?: string; grande?: boolean }) {
  const hex = p.cores.find((c) => c.nome === cor)?.hex ?? p.cores[0].hex;
  if (p.foto) {
    return <Image src={p.foto} alt={p.nome} fill sizes={grande ? "(min-width: 900px) 50vw, 100vw" : "(min-width: 900px) 30vw, 50vw"} />;
  }
  const escuro = ["#561111", "#5a4140", "#5d6346"].includes(hex);
  return (
    <div className={styles.semFoto} style={{ background: hex, color: escuro ? "var(--creme)" : "var(--vinho)" }}>
      <Simbolo className={styles.semFotoSimbolo} />
      <span>Falta foto</span>
    </div>
  );
}

export function Loja() {
  const [sacola, setSacola] = useState<Item[]>([]);
  const [categoria, setCategoria] = useState("Todos");
  const [aberto, setAberto] = useState<Produto | null>(null);
  const [sacolaAberta, setSacolaAberta] = useState(false);
  const [montado, setMontado] = useState(false);

  useEffect(() => {
    setSacola(lerSacola());
    setMontado(true);
  }, []);

  useEffect(() => {
    if (!montado) return;
    try {
      localStorage.setItem(CHAVE, JSON.stringify(sacola));
    } catch {}
  }, [sacola, montado]);

  useEffect(() => travarRolagem(Boolean(aberto) || sacolaAberta), [aberto, sacolaAberta]);

  const categorias = ["Todos", ...Array.from(new Set(produtos.map((p) => p.categoria)))];
  const lista = categoria === "Todos" ? produtos : produtos.filter((p) => p.categoria === categoria);
  const quantidade = sacola.reduce((n, i) => n + i.qtd, 0);

  const adicionar = (p: Produto, cor: string, tamanho: string, qtd: number) => {
    setSacola((atual) => {
      const id = `${p.id}|${cor}|${tamanho}`;
      const existe = atual.find((i) => i.id === id);
      if (existe) return atual.map((i) => (i.id === id ? { ...i, qtd: i.qtd + qtd } : i));
      return [...atual, { id, produtoId: p.id, cor, tamanho, qtd }];
    });
    setAberto(null);
    setSacolaAberta(true);
  };

  return (
    <>
      <div className={styles.barra}>
        <div className={styles.categorias} role="group" aria-label="Categorias">
          {categorias.map((c) => (
            <button key={c} aria-pressed={categoria === c} onClick={() => setCategoria(c)}>
              {c}
            </button>
          ))}
        </div>
        <button className={styles.botaoSacola} onClick={() => setSacolaAberta(true)}>
          Sacola <span className={styles.contador}>{quantidade}</span>
        </button>
      </div>

      <Surgir as="ul" filhos jeito="abre" className={styles.vitrine}>
        {lista.map((p, i) => (
          <li key={p.id} className={styles.card} data-largo={i % 5 === 0}>
            <button className={styles.cardBotao} onClick={() => setAberto(p)} disabled={p.esgotado}>
              <div className={styles.cardFoto}>
                <FotoProduto p={p} />
                {p.exemplo && <span className={styles.seloExemplo}>produto de exemplo</span>}
                {p.esgotado && <span className={styles.esgotado}>Esgotado</span>}
              </div>
              <div className={styles.cardInfo}>
                <span className={styles.cardCategoria}>{p.categoria}</span>
                <h3>{p.nome}</h3>
                <div className={styles.cardRodape}>
                  <span className={styles.cardPreco}>{real(p.preco)}</span>
                  <span className={styles.cardCores} aria-label={`${p.cores.length} cores`}>
                    {p.cores.map((c) => (
                      <span key={c.nome} style={{ background: c.hex }} />
                    ))}
                  </span>
                </div>
              </div>
            </button>
          </li>
        ))}
      </Surgir>

      {montado &&
        aberto &&
        createPortal(<Detalhe p={aberto} onFechar={() => setAberto(null)} onAdicionar={adicionar} />, document.body)}
      {montado &&
        createPortal(
          <Sacola
            aberta={sacolaAberta}
            itens={sacola}
            setItens={setSacola}
            onFechar={() => setSacolaAberta(false)}
          />,
          document.body,
        )}
    </>
  );
}

/* ---------- Detalhe do produto ---------- */
function Detalhe({
  p,
  onFechar,
  onAdicionar,
}: {
  p: Produto;
  onFechar: () => void;
  onAdicionar: (p: Produto, cor: string, tamanho: string, qtd: number) => void;
}) {
  const [cor, setCor] = useState(p.cores[0].nome);
  const [tamanho, setTamanho] = useState(p.tamanhos.length === 1 ? p.tamanhos[0] : "");
  const [qtd, setQtd] = useState(1);
  const fechar = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    fechar.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onFechar();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onFechar]);

  return (
    <div className={styles.fundo} onClick={onFechar}>
      <div className={styles.detalhe} role="dialog" aria-modal="true" aria-label={p.nome} onClick={(e) => e.stopPropagation()}>
        <button ref={fechar} className={styles.fechar} onClick={onFechar} aria-label="Fechar">
          ✕
        </button>
        <div className={styles.detalheFoto}>
          <FotoProduto p={p} cor={cor} grande />
        </div>
        <div className={styles.detalheInfo}>
          <span className={styles.cardCategoria}>{p.categoria}</span>
          <h2>{p.nome}</h2>
          <p className={styles.detalhePreco}>{real(p.preco)}</p>
          <p>{p.descricao}</p>
          {p.exemplo && <p className={styles.aviso}>✎ Produto de exemplo, criado só para visualizar a loja.</p>}

          <fieldset className={styles.opcao}>
            <legend>
              Cor: <strong>{cor}</strong>
            </legend>
            <div className={styles.cores}>
              {p.cores.map((c) => (
                <button
                  key={c.nome}
                  type="button"
                  aria-label={c.nome}
                  aria-pressed={cor === c.nome}
                  style={{ background: c.hex }}
                  onClick={() => setCor(c.nome)}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className={styles.opcao}>
            <legend>Tamanho</legend>
            <div className={styles.tamanhos}>
              {p.tamanhos.map((t) => (
                <button key={t} type="button" aria-pressed={tamanho === t} onClick={() => setTamanho(t)}>
                  {t}
                </button>
              ))}
            </div>
          </fieldset>

          <div className={styles.comprar}>
            <div className={styles.qtd}>
              <button type="button" onClick={() => setQtd(Math.max(1, qtd - 1))} aria-label="Diminuir">
                −
              </button>
              <span aria-live="polite">{qtd}</span>
              <button type="button" onClick={() => setQtd(qtd + 1)} aria-label="Aumentar">
                +
              </button>
            </div>
            <button className="botao" disabled={!tamanho} onClick={() => onAdicionar(p, cor, tamanho, qtd)}>
              {tamanho ? "Colocar na sacola" : "Escolha o tamanho"}
            </button>
          </div>
          <p className={styles.nota}>Todo o lucro vai para os projetos sociais de ioga do Rizoma.</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Sacola + finalizar ---------- */
function Sacola({
  aberta,
  itens,
  setItens,
  onFechar,
}: {
  aberta: boolean;
  itens: Item[];
  setItens: (fn: (i: Item[]) => Item[]) => void;
  onFechar: () => void;
}) {
  const [etapa, setEtapa] = useState<"itens" | "dados">("itens");
  const [dados, setDados] = useState({ nome: "", email: "", telefone: "", pagamento: pagamentos.opcoes[0], entrega: entregas.opcoes[0], obs: "" });

  useEffect(() => {
    if (!aberta) setEtapa("itens");
  }, [aberta]);

  const linhas = useMemo(
    () =>
      itens
        .map((i) => ({ ...i, p: produtos.find((p) => p.id === i.produtoId)! }))
        .filter((i) => i.p),
    [itens],
  );
  const total = linhas.reduce((t, i) => t + i.p.preco * i.qtd, 0);

  const mudar = (id: string, d: number) =>
    setItens((a) => a.map((i) => (i.id === id ? { ...i, qtd: i.qtd + d } : i)).filter((i) => i.qtd > 0));

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    const numero = String(Math.floor(1000 + Math.random() * 9000));
    const msg = [
      `🧡 NOVO PEDIDO — Lojinha Rizoma`,
      `Pedido #${numero}`,
      ``,
      ...linhas.map((i) => `• ${i.qtd}x ${i.p.nome} — ${i.cor} — ${i.tamanho} — ${real(i.p.preco * i.qtd)}`),
      ``,
      `Total: ${real(total)}`,
      ``,
      `Nome: ${dados.nome}`,
      `E-mail: ${dados.email}`,
      `Telefone: ${dados.telefone}`,
      `Pagamento: ${dados.pagamento}`,
      `Entrega: ${dados.entrega}`,
      ...(dados.obs ? [`Observações: ${dados.obs}`] : []),
      ``,
      `Todo o lucro vai para os projetos sociais do Rizoma.`,
    ].join("\n");
    window.open(`https://wa.me/${contato.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  };

  return (
    <div className={styles.sacolaFundo} data-aberta={aberta} onClick={onFechar} aria-hidden={!aberta}>
      <aside
        className={styles.sacola}
        role="dialog"
        aria-modal="true"
        aria-label="Sacola"
        onClick={(e) => e.stopPropagation()}
        inert={!aberta}
      >
        <header className={styles.sacolaTopo}>
          <h2>{etapa === "itens" ? "Sua sacola" : "Seus dados"}</h2>
          <button onClick={onFechar} aria-label="Fechar sacola">
            ✕
          </button>
        </header>

        {linhas.length === 0 ? (
          <div className={styles.vazia}>
            <Simbolo className={styles.vaziaSimbolo} />
            <p>Sua sacola está vazia.</p>
            <button className="botao botao--contorno" onClick={onFechar}>
              Ver produtos
            </button>
          </div>
        ) : etapa === "itens" ? (
          <>
            <ul className={styles.itens}>
              {linhas.map((i) => (
                <li key={i.id}>
                  <div className={styles.itemFoto}>
                    <FotoProduto p={i.p} cor={i.cor} />
                  </div>
                  <div className={styles.itemInfo}>
                    <strong>{i.p.nome}</strong>
                    <span>
                      {i.cor} · {i.tamanho}
                    </span>
                    <div className={styles.qtd}>
                      <button onClick={() => mudar(i.id, -1)} aria-label="Diminuir">
                        −
                      </button>
                      <span>{i.qtd}</span>
                      <button onClick={() => mudar(i.id, 1)} aria-label="Aumentar">
                        +
                      </button>
                    </div>
                  </div>
                  <span className={styles.itemPreco}>{real(i.p.preco * i.qtd)}</span>
                </li>
              ))}
            </ul>
            <footer className={styles.sacolaRodape}>
              <div className={styles.total}>
                <span>Total</span>
                <strong>{real(total)}</strong>
              </div>
              <button className="botao" onClick={() => setEtapa("dados")}>
                Continuar <span className="seta">→</span>
              </button>
            </footer>
          </>
        ) : (
          <form className={styles.form} onSubmit={enviar}>
            <label>
              Nome
              <input required value={dados.nome} onChange={(e) => setDados({ ...dados, nome: e.target.value })} autoComplete="name" />
            </label>
            <label>
              E-mail
              <input type="email" required value={dados.email} onChange={(e) => setDados({ ...dados, email: e.target.value })} autoComplete="email" />
            </label>
            <label>
              WhatsApp
              <input type="tel" required value={dados.telefone} onChange={(e) => setDados({ ...dados, telefone: e.target.value })} autoComplete="tel" placeholder="(48) 9 0000-0000" />
            </label>
            <fieldset>
              <legend>Forma de pagamento</legend>
              {pagamentos.opcoes.map((o) => (
                <label key={o} className={styles.radio}>
                  <input type="radio" name="pagamento" checked={dados.pagamento === o} onChange={() => setDados({ ...dados, pagamento: o })} />
                  {o}
                </label>
              ))}
            </fieldset>
            <fieldset>
              <legend>Entrega</legend>
              {entregas.opcoes.map((o) => (
                <label key={o} className={styles.radio}>
                  <input type="radio" name="entrega" checked={dados.entrega === o} onChange={() => setDados({ ...dados, entrega: o })} />
                  {o}
                </label>
              ))}
            </fieldset>
            <p className={styles.aviso}>✎ Formas de pagamento e entrega de exemplo: a Maira confirma quais vão valer.</p>
            <label>
              Observações (opcional)
              <textarea rows={2} value={dados.obs} onChange={(e) => setDados({ ...dados, obs: e.target.value })} />
            </label>
            <footer className={styles.sacolaRodape}>
              <div className={styles.total}>
                <span>Total</span>
                <strong>{real(total)}</strong>
              </div>
              <button type="submit" className="botao">
                Enviar pedido pelo WhatsApp <span className="seta">→</span>
              </button>
              <button type="button" className={styles.voltar} onClick={() => setEtapa("itens")}>
                ← Voltar para a sacola
              </button>
            </footer>
          </form>
        )}
      </aside>
    </div>
  );
}
