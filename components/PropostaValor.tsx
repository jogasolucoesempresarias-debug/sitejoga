import Reveal from "./Reveal";

const pilares = [
  {
    t: "Clareza",
    d: "Organizar os dados e revelar o que realmente está acontecendo no seu negócio.",
  },
  {
    t: "Direção",
    d: "Indicar prioridades, riscos e oportunidades para a gestão agir no lugar certo.",
  },
  {
    t: "Ação",
    d: "Converter análise em decisão, responsáveis e planos de execução acompanhados.",
  },
];

export default function PropostaValor() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-joga">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal>
            <span className="eyebrow">Proposta de valor</span>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-cream sm:text-4xl">
              A maioria das empresas tem dados. Poucas têm a{" "}
              <span className="text-amber">estrutura</span> para transformá-los em decisão.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-mut">
              A JOGA organiza essa estrutura do início ao fim: integramos sistemas, tratamos e
              modelamos os dados, desenvolvemos indicadores, implantamos automações e conectamos
              Inteligência Artificial para apoiar a gestão diariamente.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-cream">
              O painel é o meio. O verdadeiro produto é uma empresa{" "}
              <span className="font-medium text-amber">mais organizada, eficiente e preparada para decidir</span>.
            </p>
          </Reveal>

          <div className="grid gap-4">
            {pilares.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.1}>
                <div className="rounded-xl border border-line bg-surface p-6">
                  <h3 className="font-display text-lg font-semibold text-amber">{p.t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-mut">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
