import Reveal from "../Reveal";
import { COMO } from "@/lib/lp-estoque";
import Pendente from "./Pendente";

// Bloco 8 — funde "como funciona" (jornada) e "integração com a operação" (fluxo ERP→JOGA)
// do briefing. As garantias no fim são o que a TI e o diretor perguntam antes de aprovar.
export default function ComoFunciona() {
  return (
    <section id="como-funciona" className="border-t border-line bg-ink py-20 md:py-28">
      <div className="container-joga">
        <Reveal>
          <div className="max-w-3xl">
            <span className="eyebrow">{COMO.eyebrow}</span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-cream sm:text-4xl">
              {COMO.h2}
            </h2>
          </div>
        </Reveal>

        {/* fluxo: ERP → JOGA → diagnóstico/indicadores/sugestão → pedido/plano/alerta */}
        <Reveal delay={0.08}>
          <ol className="mt-12 grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-center">
            {COMO.fluxo.map((etapa, i) => (
              <li key={etapa} className="contents">
                <div
                  className={`rounded-xl border px-5 py-4 text-center text-sm font-semibold leading-snug ${
                    i === 1
                      ? "border-amber/40 bg-amber/10 text-amber"
                      : "border-line bg-surface text-cream/90"
                  }`}
                >
                  {etapa}
                </div>
                {i < COMO.fluxo.length - 1 && (
                  <span aria-hidden className="text-center text-lg text-amber">
                    <span className="lg:hidden">↓</span>
                    <span className="hidden lg:inline">→</span>
                  </span>
                )}
              </li>
            ))}
          </ol>
        </Reveal>

        {/* jornada da implantação */}
        <div className="relative mt-16 max-w-3xl">
          <div className="absolute bottom-2 left-[19px] top-2 w-px bg-line md:left-[23px]" />
          <ol className="space-y-6">
            {COMO.etapas.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.05}>
                <li className="relative flex gap-5">
                  <div className="z-10 flex h-10 w-10 flex-none items-center justify-center rounded-full border border-amber/40 bg-graphite font-display text-sm font-bold text-amber md:h-12 md:w-12">
                    {i + 1}
                  </div>
                  <div className="pt-1.5">
                    <h3 className="font-display text-lg font-semibold text-cream">{t}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-mut">{d}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* garantias — o que a TI e o diretor perguntam */}
        <Reveal delay={0.1}>
          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            {COMO.garantias.map((g) => (
              <div key={g.t} className="rounded-xl border border-line bg-surface p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber">{g.t}</p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-cream/85">{g.d}</p>
                {g.pendente && (
                  <Pendente>
                    Este texto é placeholder — preencher em lib/lp-estoque.ts (COMO.garantias).
                  </Pendente>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
