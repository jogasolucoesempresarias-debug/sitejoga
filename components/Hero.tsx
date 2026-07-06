import HeroVisual from "./HeroVisual";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-[72px]">
      {/* motivo de fundo: grade de dados */}
      <div className="bg-grid mask-radial pointer-events-none absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-amber/10 blur-[120px]" />

      <div className="container-joga relative grid items-center gap-12 py-20 md:py-28 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <span className="eyebrow rise" style={{ animationDelay: "0s" }}>
            Dados · Inteligência · Resultados
          </span>

          <h1
            className="rise mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-cream sm:text-5xl lg:text-[3.4rem]"
            style={{ animationDelay: "0.06s" }}
          >
            Descubra qual <span className="text-amber">jogo</span> sua empresa precisa{" "}
            <span className="text-amber">jogar</span>.
          </h1>

          <p
            className="rise mt-6 max-w-xl text-lg leading-relaxed text-mut"
            style={{ animationDelay: "0.14s" }}
          >
            Construímos a estrutura de dados, automação e inteligência que permite sua empresa
            decidir melhor — todos os dias.
          </p>

          <div
            className="rise mt-9 flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "0.22s" }}
          >
            <a
              href="/diagnostico"
              className="inline-flex items-center justify-center rounded-full bg-amber px-6 py-3.5 font-semibold text-graphite transition-transform hover:-translate-y-0.5"
            >
              Solicitar diagnóstico gratuito
            </a>
            <a
              href="#solucoes"
              className="inline-flex items-center justify-center rounded-full border border-line px-6 py-3.5 font-semibold text-cream transition-colors hover:border-mut hover:bg-surface"
            >
              Conhecer as soluções
            </a>
          </div>

          <p className="rise mt-8 text-sm text-mut/80" style={{ animationDelay: "0.3s" }}>
            Atacado · Varejo · Indústria · Logística · Serviços
          </p>
        </div>

        <div className="rise hidden lg:block" style={{ animationDelay: "0.2s" }}>
          <div className="relative aspect-[5/4] w-full rounded-2xl border border-line bg-surface/60 p-6 backdrop-blur-sm">
            <HeroVisual />
            <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-xs text-mut">
              <span>Dados dispersos</span>
              <span className="text-amber">→ Direção</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
