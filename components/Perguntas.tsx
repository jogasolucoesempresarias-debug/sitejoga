import Reveal from "./Reveal";

const perguntas = [
  "Como as decisões são tomadas na sua empresa hoje?",
  "Seus indicadores estão organizados ou espalhados em várias planilhas?",
  "Você sabe quais clientes estão deixando de comprar?",
  "Conhece os produtos que estão parados no seu estoque?",
  "Sua equipe acompanha metas, margem e resultado em tempo hábil?",
  "Quanto sua empresa pode estar perdendo por falta de informação?",
];

export default function Perguntas() {
  return (
    <section className="border-t border-line bg-ink py-20 md:py-28">
      <div className="container-joga">
        <Reveal>
          <span className="eyebrow">O ponto de partida</span>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight text-cream sm:text-4xl">
            Antes da tecnologia, algumas perguntas.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {perguntas.map((q, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="flex h-full gap-3 rounded-xl border border-line bg-surface p-6">
                <span className="font-display text-lg font-bold text-amber">›</span>
                <p className="text-[15px] leading-relaxed text-cream/90">{q}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-12 max-w-3xl font-display text-xl font-medium leading-snug text-cream sm:text-2xl">
            Quando os dados não estão organizados, a gestão perde{" "}
            <span className="text-amber">velocidade, clareza e capacidade de reação</span>.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
