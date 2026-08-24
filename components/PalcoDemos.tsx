"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Palco de demonstrações: abas por módulo, carrossel, lightbox e as três legendas
// (problema / indicadores / decisão). Extraído de Demonstracoes.tsx para ser reusado
// pela LP de Gestão de Estoque — a home e a LP mostram conjuntos de telas diferentes,
// mas o comportamento é o mesmo.

export type TelaDemo = {
  key: string;
  nome: string;
  problema: string;
  indicadores: string;
  decisao: string;
  imgs: string[];
};

export default function PalcoDemos({ telas }: { telas: readonly TelaDemo[] }) {
  const [tab, setTab] = useState(0);
  const [idx, setIdx] = useState(0);
  const [zoom, setZoom] = useState<string | null>(null);
  const fecharRef = useRef<HTMLButtonElement>(null);
  const abridorRef = useRef<HTMLElement | null>(null);

  const sol = telas[tab];
  const imgs = sol.imgs;
  const go = (d: number) => setIdx((i) => (i + d + imgs.length) % imgs.length);
  const selectTab = (t: number) => {
    setTab(t);
    setIdx(0);
  };

  const abrirZoom = (src: string, e: React.MouseEvent<HTMLButtonElement>) => {
    abridorRef.current = e.currentTarget;
    setZoom(src);
  };

  // Devolve o foco para o elemento que abriu — senão o leitor de tela volta ao topo da página.
  const fecharZoom = useCallback(() => {
    setZoom(null);
    abridorRef.current?.focus();
  }, []);

  // Lightbox: fecha no Esc e mantém o foco dentro do overlay enquanto está aberto.
  useEffect(() => {
    if (!zoom) return;
    fecharRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        fecharZoom();
        return;
      }
      // Só há um alvo focável dentro do overlay: manter o Tab preso nele.
      if (e.key === "Tab") {
        e.preventDefault();
        fecharRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [zoom, fecharZoom]);

  return (
    <>
      {/* abas por módulo */}
      <div className="mt-10 flex flex-wrap gap-2">
        {telas.map((s, i) => (
          <button
            key={s.key}
            onClick={() => selectTab(i)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
              i === tab
                ? "bg-amber text-graphite"
                : "border border-line text-mut hover:border-mut hover:text-cream"
            }`}
          >
            {s.nome}
          </button>
        ))}
      </div>

      {/* palco */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-surface">
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <h3 className="font-display text-sm font-semibold text-cream">{sol.nome}</h3>
          <div className="flex items-center gap-3">
            <span className="text-xs text-mut">
              {idx + 1} / {imgs.length}
            </span>
            <div className="flex gap-1.5">
              <button
                onClick={() => go(-1)}
                aria-label="Anterior"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-cream hover:border-amber hover:text-amber"
              >
                ‹
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Próxima"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-cream hover:border-amber hover:text-amber"
              >
                ›
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={(e) => abrirZoom(imgs[idx], e)}
          className="group relative block aspect-[16/10] w-full cursor-zoom-in bg-graphite"
          aria-label="Ampliar imagem"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={imgs[idx]}
            src={imgs[idx]}
            alt={`${sol.nome} — tela ${idx + 1}`}
            loading="lazy"
            className="h-full w-full object-contain"
          />
          <span className="absolute bottom-3 right-3 rounded-full border border-line bg-graphite/80 px-3 py-1 text-xs text-mut opacity-0 transition-opacity group-hover:opacity-100">
            ampliar ⤢
          </span>
        </button>

        {/* dots */}
        <div className="flex flex-wrap justify-center gap-1.5 border-t border-line px-5 py-3">
          {imgs.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Ir para tela ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === idx ? "w-6 bg-amber" : "w-2 bg-line hover:bg-mut"
              }`}
            />
          ))}
        </div>
      </div>

      {/* legenda: problema · indicadores · decisão */}
      <div className="mt-5 grid gap-4 rounded-2xl border border-line bg-surface/50 p-6 sm:grid-cols-3">
        <Legenda rot="Problema analisado" v={sol.problema} />
        <Legenda rot="Indicadores" v={sol.indicadores} />
        <Legenda rot="Decisão apoiada" v={sol.decisao} />
      </div>

      {/* lightbox */}
      {zoom && (
        <div
          onClick={fecharZoom}
          role="dialog"
          aria-modal="true"
          aria-label="Demonstração ampliada"
          className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/90 p-4"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={zoom} alt="Demonstração ampliada" className="max-h-full max-w-full rounded-lg object-contain" />
          <button
            ref={fecharRef}
            onClick={fecharZoom}
            aria-label="Fechar"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-lg text-white hover:bg-white/10"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}

function Legenda({ rot, v }: { rot: string; v: string }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-amber">{rot}</p>
      <p className="mt-1 text-sm leading-relaxed text-cream/90">{v}</p>
    </div>
  );
}
