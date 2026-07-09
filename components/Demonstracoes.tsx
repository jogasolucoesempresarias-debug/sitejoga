"use client";

import { useState } from "react";
import Reveal from "./Reveal";

type Solucao = {
  key: string;
  nome: string;
  problema: string;
  indicadores: string;
  decisao: string;
  imgs: string[];
};

const solucoes: Solucao[] = [
  {
    key: "carteira",
    nome: "Gestão de Carteira de Clientes",
    problema: "Clientes que reduziram ou pararam de comprar — e ninguém percebe a tempo.",
    indicadores: "Segmentação RFM, recência, frequência, ticket, receita em risco, previsão de recompra e retenção (cohort).",
    decisao: "Quais clientes recuperar primeiro, quem ligar hoje — e por quê.",
    imgs: [
      "/demos/carteira.png",
      "/demos/carteira-2.png",
      "/demos/carteira-8.png",
    ],
  },
  {
    key: "vendas",
    nome: "Gestão de Vendas",
    problema: "Desempenho da equipe e do mix no escuro — quem performa, o que trava, onde há venda perdida.",
    indicadores: "Ranking por lucro, positivação e YoY, cockpit individual do vendedor, categorias/mix e clientes que pararam de comprar um departamento.",
    decisao: "Onde cobrar, quem desenvolver e quais oportunidades de cross-sell recuperar.",
    imgs: [
      "/demos/carteira-3.png",
      "/demos/carteira-5.png",
      "/demos/carteira-6.png",
      "/demos/carteira-7.png",
    ],
  },
  {
    key: "metas",
    nome: "Gestão de Metas",
    problema: "Meta acompanhada só no fim do mês, quando já não dá mais pra corrigir a rota.",
    indicadores: "Realizado vs meta, projeção, falta por dia e % atingido — por supervisor e por vendedor, ao vivo.",
    decisao: "Quem está no ritmo e quem precisa de um empurrão — a tempo de bater a meta.",
    imgs: [
      "/demos/carteira-9.png",
    ],
  },
  {
    key: "estoque",
    nome: "Gestão de Estoque",
    problema: "Capital parado, ruptura e validade.",
    indicadores: "Giro, cobertura, curva ABC, valor parado e itens a vencer.",
    decisao: "O que comprar, o que escoar e onde o caixa está preso.",
    imgs: [
      "/demos/estoque.png",
      "/demos/estoque-1.png",
      "/demos/estoque-2.png",
      "/demos/estoque-3.png",
      "/demos/estoque-4.png",
    ],
  },
  {
    key: "dre",
    nome: "Resultado Gerencial (DRE) + IA",
    problema: "Enxergar da receita bruta ao resultado final — e entender o porquê.",
    indicadores: "DRE em cascata (12 meses), EBITDA, margem e um assistente de IA que analisa os números e responde perguntas.",
    decisao: "Onde a margem escapa, quais custos cortar e o que moveu o resultado.",
    imgs: ["/demos/DRE.png"],
  },
];

export default function Demonstracoes() {
  const [tab, setTab] = useState(0);
  const [idx, setIdx] = useState(0);
  const [zoom, setZoom] = useState<string | null>(null);

  const sol = solucoes[tab];
  const imgs = sol.imgs;
  const go = (d: number) => setIdx((i) => (i + d + imgs.length) % imgs.length);
  const selectTab = (t: number) => {
    setTab(t);
    setIdx(0);
  };

  return (
    <section id="demonstracoes" className="border-t border-line bg-ink py-20 md:py-28">
      <div className="container-joga">
        <Reveal>
          <span className="eyebrow">Demonstrações</span>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight text-cream sm:text-4xl">
            Não é promessa. É prova.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-mut">
            Telas reais das nossas soluções (dados fictícios). Navegue pelas soluções e clique para ampliar.
          </p>
        </Reveal>

        {/* abas por solução */}
        <div className="mt-10 flex flex-wrap gap-2">
          {solucoes.map((s, i) => (
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
            onClick={() => setZoom(imgs[idx])}
            className="group relative block aspect-[16/10] w-full cursor-zoom-in bg-graphite"
            aria-label="Ampliar imagem"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={imgs[idx]}
              src={imgs[idx]}
              alt={`${sol.nome} — tela ${idx + 1}`}
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

        {/* legenda */}
        <div className="mt-5 grid gap-4 rounded-2xl border border-line bg-surface/50 p-6 sm:grid-cols-3">
          <Legenda rot="Problema analisado" v={sol.problema} />
          <Legenda rot="Indicadores" v={sol.indicadores} />
          <Legenda rot="Decisão apoiada" v={sol.decisao} />
        </div>
      </div>

      {/* lightbox */}
      {zoom && (
        <div
          onClick={() => setZoom(null)}
          className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/90 p-4"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={zoom} alt="Demonstração ampliada" className="max-h-full max-w-full rounded-lg object-contain" />
          <button
            onClick={() => setZoom(null)}
            aria-label="Fechar"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-lg text-white hover:bg-white/10"
          >
            ✕
          </button>
        </div>
      )}
    </section>
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
