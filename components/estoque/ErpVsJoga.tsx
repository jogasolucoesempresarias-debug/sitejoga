import Reveal from "../Reveal";
import { ERP } from "@/lib/lp-estoque";

// Bloco 3 — responde a objeção nº 1 do público (Winthor/Sankhya já têm relatório de estoque)
// antes que ela apareça. Tabela em vez de prosa: lê em cinco segundos.
export default function ErpVsJoga() {
  return (
    <section id="erp" className="py-20 md:py-28">
      <div className="container-joga">
        <Reveal>
          <span className="eyebrow">{ERP.eyebrow}</span>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold tracking-tight text-cream sm:text-4xl">
            {ERP.h2a}
            <span className="text-amber">{ERP.h2destaque}</span>
            {ERP.h2b}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mut">{ERP.intro}</p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-12 overflow-hidden rounded-2xl border border-line">
            <div className="grid grid-cols-2 border-b border-line bg-surface">
              <div className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-mut sm:px-7">
                O seu ERP
              </div>
              <div className="border-l border-line px-5 py-4 text-xs font-semibold uppercase tracking-wider text-amber sm:px-7">
                A JOGA
              </div>
            </div>

            {ERP.linhas.map((l) => (
              <div key={l.erp} className="grid grid-cols-2 border-b border-line last:border-b-0">
                <div className="px-5 py-4 text-sm leading-relaxed text-mut sm:px-7 sm:text-[15px]">
                  {l.erp}
                </div>
                <div className="border-l border-line bg-surface/40 px-5 py-4 text-sm leading-relaxed text-cream sm:px-7 sm:text-[15px]">
                  {l.joga}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* derruba a fricção com a TI antes da reunião acontecer */}
        <Reveal delay={0.12}>
          <p className="mt-6 flex items-start gap-3 rounded-xl border border-line bg-surface/40 p-5 text-[15px] leading-relaxed text-cream/85">
            <span className="mt-0.5 flex-none text-amber">🔒</span>
            {ERP.nota}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
