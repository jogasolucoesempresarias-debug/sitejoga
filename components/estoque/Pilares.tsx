import Reveal from "../Reveal";
import { CTA, PILARES } from "@/lib/lp-estoque";
import CtaFaixa from "./CtaFaixa";

// Bloco 5 — os quatro pilares em forma de PERGUNTA.
// O título é a pergunta que o gestor já se faz; o indicador é só a prova de que respondemos.
// Ninguém acorda precisando de uma matriz ABC-XYZ — acorda querendo saber quanto do dinheiro
// dele está morto. Pergunta primeiro, vocabulário depois.
export default function Pilares() {
  return (
    <section id="pilares" className="py-20 md:py-28">
      <div className="container-joga">
        <Reveal>
          <span className="eyebrow">{PILARES.eyebrow}</span>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight text-cream sm:text-4xl">
            {PILARES.h2}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {PILARES.itens.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-7">
                <span className="font-display text-sm font-bold tracking-wider text-amber">
                  {p.n}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-cream sm:text-2xl">
                  {p.pergunta}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-cream/85">{p.resposta}</p>

                <ul className="mt-6 space-y-1.5 border-t border-line pt-5">
                  {p.indicadores.map((ind) => (
                    <li key={ind} className="flex gap-2 text-sm text-mut">
                      <span className="flex-none text-amber">✓</span> {ind}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* fecho: os mesmos indicadores, agora por responsável */}
        <Reveal delay={0.1}>
          <div className="mt-6 rounded-2xl border border-line bg-surface/40 p-7">
            <h3 className="font-display text-lg font-semibold text-cream">{PILARES.fecho.t}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-mut">{PILARES.fecho.p}</p>
            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              {PILARES.fecho.grupos.map((g) => (
                <div key={g.t}>
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber">{g.t}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-cream/85">{g.d}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* lista completa — <details> nativo: acessível e sem JS */}
        <Reveal delay={0.14}>
          <details className="group mt-4 rounded-2xl border border-dashed border-line bg-surface/20 px-7 py-5">
            <summary className="cursor-pointer list-none text-sm font-semibold text-mut transition-colors hover:text-cream">
              <span className="text-amber group-open:hidden">+ </span>
              <span className="hidden text-amber group-open:inline">− </span>
              {PILARES.completa.label}
            </summary>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {PILARES.completa.grupos.map((g) => (
                <div key={g.t}>
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber">{g.t}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-mut">{g.itens}</p>
                </div>
              ))}
            </div>
          </details>
        </Reveal>

        <CtaFaixa texto="Quais dessas perguntas você não consegue responder hoje?" secundario={CTA.demo} />
      </div>
    </section>
  );
}
