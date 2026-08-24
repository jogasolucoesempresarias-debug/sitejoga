import { btnGhost, btnPrimary } from "@/lib/ui";
import { CTA, HERO, LP_DRAFT, PROVA } from "@/lib/lp-estoque";
import Pendente from "./Pendente";

export default function HeroEstoque() {
  return (
    <section id="top" className="relative overflow-hidden pt-[72px]">
      <div className="bg-grid mask-radial pointer-events-none absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-amber/10 blur-[120px]" />

      <div className="container-joga relative grid items-center gap-12 py-20 md:py-28 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <span className="eyebrow rise" style={{ animationDelay: "0s" }}>
            {HERO.eyebrow}
          </span>

          <h1
            className="rise mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-cream sm:text-5xl lg:text-[3.4rem]"
            style={{ animationDelay: "0.06s" }}
          >
            {HERO.h1a}
            <span className="text-amber">{HERO.h1destaque}</span>
            {HERO.h1b}
          </h1>

          <p
            className="rise mt-6 max-w-xl text-lg leading-relaxed text-mut"
            style={{ animationDelay: "0.14s" }}
          >
            {HERO.sub}
          </p>

          <div
            className="rise mt-9 flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "0.22s" }}
          >
            <a href={CTA.primario.href} className={btnPrimary}>
              {CTA.primario.label}
            </a>
            <a href={CTA.secundario.href} className={btnGhost}>
              {CTA.secundario.label}
            </a>
          </div>

          <p className="rise mt-8 text-sm text-mut/80" style={{ animationDelay: "0.3s" }}>
            {HERO.rodape}
          </p>
        </div>

        {/* tela real da solução — o visitante entende o produto antes de descer a página */}
        <div className="rise" style={{ animationDelay: "0.2s" }}>
          <div className="relative overflow-hidden rounded-2xl border border-line bg-surface/60 p-2 backdrop-blur-sm sm:p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/demos/estoque.png"
              alt="Painel de gestão de estoque da JOGA — visão geral com capital parado, ruptura e curva ABC"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      </div>

      <FaixaProva />
    </section>
  );
}

/**
 * Faixa de prova. Números reais do cliente (spec 10.2), ainda sem autorização de PUBLICAÇÃO
 * (spec 10.5). Em rascunho ela aparece para revisão interna — ver a página com os números é
 * diferente de colocá-los no ar. Em produção, sem autorização, ela simplesmente não existe:
 * a regra é a mesma do case, nunca virar texto genérico.
 */
function FaixaProva() {
  if (!PROVA.autorizado && !LP_DRAFT) return null;

  return (
    <div className="relative border-y border-line bg-ink/60">
      <div className="container-joga py-8">
        {!PROVA.autorizado && (
          <Pendente>
            Visível só em rascunho. Números reais do cliente, sem autorização de publicação —
            escadinha de 4 níveis na spec 10.5. Liberar = `PROVA.autorizado = true`.
          </Pendente>
        )}
        <dl className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {PROVA.itens.map((i) => (
            <div key={i.rot}>
              <dt className="font-display text-2xl font-bold text-amber sm:text-3xl">{i.valor}</dt>
              <dd className="mt-1 text-sm leading-snug text-mut">{i.rot}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-xs text-mut/80">{PROVA.legenda}</p>
      </div>
    </div>
  );
}
