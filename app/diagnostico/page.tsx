import type { Metadata } from "next";
import DiagnosticoWizard from "@/components/DiagnosticoWizard";

export const metadata: Metadata = {
  title: "Diagnóstico gratuito",
  description:
    "Jogue o jogo certo com o nosso diagnóstico. Responda o questionário e veja na hora o seu placar de maturidade por área. Retorno em até 48h.",
};

export default function DiagnosticoPage() {
  return (
    <section className="pt-[72px]">
      <div className="container-joga py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow justify-center">Diagnóstico gratuito</span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight text-cream sm:text-5xl">
            Jogue o jogo certo com o nosso diagnóstico.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-mut">
            Responda um questionário rápido (5–7 min) e veja na hora o seu raio-x de gestão:
            o nível de maturidade por área e as oportunidades prioritárias — sem custo.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <DiagnosticoWizard />
        </div>
      </div>
    </section>
  );
}
