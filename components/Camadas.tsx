import Reveal from "./Reveal";

const camadas = [
  {
    n: "01",
    t: "Engenharia de Dados",
    d: "Integração e organização das informações de ERPs, planilhas, APIs e sistemas — com padronização, qualidade e modelagem.",
    g: "Uma base única e confiável. Fim do “cada relatório dá um número diferente”.",
  },
  {
    n: "02",
    t: "Inteligência Analítica",
    d: "Indicadores, dashboards, análises gerenciais e diagnósticos que revelam o desempenho do negócio.",
    g: "Enxergar o que está acontecendo com clareza e no tempo certo.",
  },
  {
    n: "03",
    t: "Automação de Processos",
    d: "Integração entre sistemas e automação de tarefas repetitivas que consomem o tempo da equipe.",
    g: "Menos retrabalho. A equipe foca no que exige decisão e relacionamento.",
  },
  {
    n: "04",
    t: "Inteligência Artificial",
    d: "Agentes inteligentes conectados aos dados e processos já existentes na empresa.",
    g: "Respostas rápidas, tarefas executadas e apoio à decisão no dia a dia.",
  },
  {
    n: "05",
    t: "Acompanhamento Estratégico",
    d: "Planos de ação, responsáveis, metas e leitura contínua dos resultados.",
    g: "A informação vira prioridade, execução e evolução da gestão.",
  },
];

export default function Camadas() {
  return (
    <section id="camadas" className="border-t border-line py-20 md:py-28">
      <div className="container-joga">
        <Reveal>
          <span className="eyebrow">O que realmente fazemos</span>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight text-cream sm:text-4xl">
            Cinco camadas da inteligência do seu negócio.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-mut">
            Mais do que dashboards: construímos o sistema inteiro — da base de dados à IA. Cada camada
            se monta sobre a anterior.
          </p>
        </Reveal>

        {/* sticky-stack: cada camada empilha sobre a anterior conforme rola */}
        <div className="mt-14">
          {camadas.map((c, i) => (
            <div
              key={c.n}
              className="sticky pb-6"
              style={{ top: `${96 + i * 18}px` }}
            >
              <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_-20px_40px_-24px_rgba(0,0,0,0.6)]">
                <div className="h-1 w-full bg-gradient-to-r from-amber to-transparent" />
                <div className="grid gap-6 p-7 md:grid-cols-[auto_1fr_1fr] md:items-center md:p-9">
                  <div className="font-display text-5xl font-bold text-amber/90 md:text-6xl">
                    {c.n}
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-cream md:text-2xl">
                      {c.t}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-mut">{c.d}</p>
                  </div>
                  <div className="rounded-xl border border-line bg-graphite/60 p-4">
                    <p className="text-[13px] font-semibold uppercase tracking-wider text-amber">
                      O que o cliente ganha
                    </p>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-cream/90">{c.g}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Reveal>
          <p className="mt-10 font-display text-lg font-medium text-cream">
            A JOGA não entrega apenas números. Entrega{" "}
            <span className="text-amber">entendimento, prioridade e direção</span>.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
