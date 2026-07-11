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
        <div className="mx-auto max-w-3xl">
          <DiagnosticoWizard />
        </div>
      </div>
    </section>
  );
}
