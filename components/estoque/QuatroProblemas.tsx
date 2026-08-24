import Reveal from "../Reveal";
import { CTA, PROBLEMAS } from "@/lib/lp-estoque";
import CtaFaixa from "./CtaFaixa";

// Bloco 2 — materializa o conceito central do briefing (§2): dinheiro parado → ruptura →
// perdas → compras sem informação. Cada card responde problema / o que custa / o que mostramos.
// Substitui a antiga seção de 8 perguntas, que repetia o questionário do fim da página.
export default function QuatroProblemas() {
  return (
    <section id="problemas" className="border-t border-line bg-ink py-20 md:py-28">
      <div className="container-joga">
        <Reveal>
          <span className="eyebrow">{PROBLEMAS.eyebrow}</span>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold tracking-tight text-cream sm:text-4xl">
            {PROBLEMAS.h2}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {PROBLEMAS.cards.map((c, i) => (
            <Reveal key={c.t} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-7">
                <h3 className="font-display text-xl font-semibold text-cream">{c.t}</h3>

                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-mut">
                    O que custa
                  </p>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-cream/85">{c.custo}</p>
                </div>

                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber">
                    O que a JOGA mostra
                  </p>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-cream/85">{c.mostra}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-12 max-w-3xl font-display text-xl font-medium leading-snug text-cream sm:text-2xl">
            {PROBLEMAS.fecho1}
          </p>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-mut">{PROBLEMAS.fecho2}</p>
        </Reveal>

        <CtaFaixa
          texto="Quer ver onde isso acontece no seu estoque?"
          secundario={CTA.demo}
        />
      </div>
    </section>
  );
}
