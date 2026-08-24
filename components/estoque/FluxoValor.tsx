import Reveal from "../Reveal";
import { VALOR } from "@/lib/lp-estoque";

// Bloco 4 — a proposta de valor em uma faixa: DADOS → DIAGNÓSTICO → PRIORIDADE → DECISÃO → AÇÃO.
export default function FluxoValor() {
  return (
    <section className="border-t border-line bg-ink py-20 md:py-28">
      <div className="container-joga">
        <Reveal>
          <div className="max-w-3xl">
            <span className="eyebrow">{VALOR.eyebrow}</span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-cream sm:text-4xl">
              {VALOR.h2}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-mut">{VALOR.p}</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ol className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-stretch">
            {VALOR.fluxo.map((etapa, i) => (
              <li key={etapa} className="flex flex-1 items-center gap-3">
                <div className="flex flex-1 items-center justify-center rounded-xl border border-line bg-surface px-4 py-5 text-center">
                  <span className="font-display text-sm font-semibold uppercase tracking-wider text-cream sm:text-base">
                    {etapa}
                  </span>
                </div>
                {i < VALOR.fluxo.length - 1 && (
                  <span aria-hidden className="flex-none text-lg text-amber sm:text-xl">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
