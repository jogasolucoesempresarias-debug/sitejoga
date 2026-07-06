import Reveal from "./Reveal";

const etapas = [
  ["Diagnóstico do negócio", "Entender cenário, processos, sistemas, indicadores e dores prioritárias."],
  ["Mapeamento dos dados", "Identificar onde estão as informações, como são registradas e o que precisa ser tratado."],
  ["Engenharia e organização dos dados", "Integrar fontes, tratar, padronizar e modelar uma base confiável — o alicerce."],
  ["Construção da solução", "Dashboards, relatórios, automações e indicadores personalizados."],
  ["Inteligência e direcionamento", "Transformar dados em diagnósticos, riscos, oportunidades e prioridades; conectar IA onde fizer sentido."],
  ["Plano de ação", "Definir ações, responsáveis, prazos e indicadores de acompanhamento."],
  ["Evolução contínua", "Apoiar a leitura dos resultados e a maturação da gestão."],
];

export default function Metodologia() {
  return (
    <section id="metodologia" className="py-20 md:py-28">
      <div className="container-joga">
        <Reveal>
          <span className="eyebrow">Como trabalhamos</span>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight text-cream sm:text-4xl">
            Cada empresa joga um jogo diferente.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-mut">
            Por isso a jornada começa lendo o seu — e termina numa estrutura que continua evoluindo.
          </p>
        </Reveal>

        <div className="relative mt-14 max-w-3xl">
          <div className="absolute bottom-2 left-[19px] top-2 w-px bg-line md:left-[23px]" />
          <ol className="space-y-6">
            {etapas.map(([t, d], i) => (
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
      </div>
    </section>
  );
}
