import Reveal from "../Reveal";
import { CONSULTOR } from "@/lib/lp-estoque";

// Bloco 6 — o diferencial: a informação vai atrás do responsável, não o contrário.
//
// ⚠️ Redação travada na spec 3.3. O que o produto entrega HOJE é relatório recorrente
// filtrado pela carteira de cada um (16 relatórios agendáveis) + alerta de cobertura por
// gatilho. Validade e parado ainda chegam como relatório agendado, não como alerta por evento.
// Não ampliar essa promessa sem construir os dois gatilhos que faltam (spec 11.6).
export default function ConsultorConectado() {
  return (
    <section id="alertas" className="border-t border-line bg-ink py-20 md:py-28">
      <div className="container-joga">
        <Reveal>
          <div className="max-w-3xl">
            <span className="eyebrow">{CONSULTOR.eyebrow}</span>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-cream sm:text-4xl">
              {CONSULTOR.h2}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-mut">{CONSULTOR.p}</p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {CONSULTOR.cards.map((c, i) => (
            <Reveal key={c.t} delay={i * 0.06}>
              <div className="flex h-full items-start gap-4 rounded-xl border border-line bg-surface p-6">
                <span aria-hidden className="mt-0.5 flex-none text-amber">
                  →
                </span>
                <div>
                  <p className="font-display text-[15px] font-semibold text-cream">{c.t}</p>
                  <p className="mt-1 text-sm text-mut">{c.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <div className="mt-10 rounded-2xl border border-amber/30 bg-gradient-to-br from-surface to-graphite p-8 text-center md:p-12">
            <p className="mx-auto max-w-2xl font-display text-xl font-semibold leading-snug text-cream sm:text-2xl">
              {CONSULTOR.impacto[0]}
            </p>
            <p className="mt-4 text-[15px] text-amber">{CONSULTOR.impacto[1]}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
