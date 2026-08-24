import Reveal from "../Reveal";
import PalcoDemos from "../PalcoDemos";
import { CTA, DEMOS } from "@/lib/lp-estoque";
import CtaFaixa from "./CtaFaixa";
import Pendente from "./Pendente";

// Bloco 7 — telas reais com dados fictícios, cada uma com as três legendas
// (problema / indicadores / decisão). Reusa o palco extraído de Demonstracoes.tsx.
export default function DemosEstoque() {
  return (
    <section id="demonstracoes" className="py-20 md:py-28">
      <div className="container-joga">
        <Reveal>
          <span className="eyebrow">{DEMOS.eyebrow}</span>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight text-cream sm:text-4xl">
            {DEMOS.h2}
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-mut">{DEMOS.p}</p>
        </Reveal>

        <Pendente>
          Prints pendentes de regeração (spec 6.1): `estoque-1.png` tem nota interna vazada citando
          cliente real e um comprador placeholder; `estoque-3.png` tem &quot;SURO/MÊS&quot; e cobertura que
          não fecha com giro × estoque. Faltam capturar Validade (FEFO) e Reposição. Não linkar nem
          publicar esta página antes disso.
        </Pendente>

        <PalcoDemos telas={DEMOS.telas} />

        <CtaFaixa
          texto="Quer ver essas telas com os dados da sua empresa?"
          secundario={CTA.whatsapp}
        />
      </div>
    </section>
  );
}
