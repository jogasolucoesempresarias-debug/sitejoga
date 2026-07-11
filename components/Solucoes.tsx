import Reveal from "./Reveal";

const solucoes = [
  {
    t: "Gestão de Vendas",
    p: "Acompanhe desempenho, rentabilidade, metas e execução comercial.",
    dores: [
      "Gestão focada só no faturamento",
      "Metas sem acompanhamento contínuo",
      "Baixa visão de margem e mix",
      "Demora para identificar desvios",
    ],
    entregas: [
      "Receita, lucro bruto e margem",
      "Clientes, mix e ticket médio",
      "Desempenho por vendedor, equipe e região",
      "Meta × realizado × projeção",
    ],
  },
  {
    t: "Gestão de Clientes",
    p: "Entenda sua base de clientes e recupere oportunidades de venda.",
    dores: [
      "Clientes que deixaram de comprar",
      "Queda na frequência ou no ticket",
      "Baixa positivação e mix",
      "Carteiras sem acompanhamento",
    ],
    entregas: [
      "Classificação da carteira (ativos, em risco, inativos)",
      "Frequência, ticket e mix por cliente",
      "Potencial de recuperação",
      "Plano de ação comercial",
    ],
  },
  {
    t: "Gestão de Estoque",
    p: "Reduza excessos, rupturas e perdas financeiras.",
    dores: [
      "Capital parado em produtos sem giro",
      "Rupturas de itens relevantes",
      "Mercadorias vencidas",
      "Compras sem base no giro",
    ],
    entregas: [
      "Produtos sem giro e última saída",
      "Valor financeiro parado",
      "Curva ABC e análise de giro",
      "Cobertura, ruptura e prioridades",
    ],
  },
];

export default function Solucoes() {
  return (
    <section id="solucoes" className="border-t border-line bg-ink py-20 md:py-28">
      <div className="container-joga">
        <Reveal>
          <span className="eyebrow">Portfólio</span>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight text-cream sm:text-4xl">
            Três soluções para começar. Uma plataforma para crescer.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {solucoes.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-7">
                <h3 className="font-display text-xl font-semibold text-cream">{s.t}</h3>
                <p className="mt-2 text-[15px] font-medium text-amber">{s.p}</p>

                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-mut">
                    Dores que resolve
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {s.dores.map((d) => (
                      <li key={d} className="flex gap-2 text-sm text-cream/85">
                        <span className="text-mut">•</span> {d}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber">
                    O que entregamos
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {s.entregas.map((e) => (
                      <li key={e} className="flex gap-2 text-sm text-cream/85">
                        <span className="text-amber">✓</span> {e}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-6 rounded-2xl border border-dashed border-line bg-surface/40 p-7 text-center">
            <p className="text-[15px] leading-relaxed text-mut">
              As três primeiras soluções são onde a maioria começa. A mesma metodologia se aplica a{" "}
              <span className="text-cream">qualquer área</span> — logística, compras, financeiro,
              operações e processos específicos do seu negócio. Modulares: implantadas isoladas ou integradas.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
