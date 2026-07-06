import Reveal from "./Reveal";
import { waLink } from "@/lib/site";

export default function Conversao() {
  return (
    <section id="conversao" className="border-t border-line py-20 md:py-28">
      <div className="container-joga">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-amber/30 bg-gradient-to-br from-surface to-graphite p-10 text-center md:p-16">
            <div className="bg-grid mask-radial pointer-events-none absolute inset-0 opacity-40" />
            <div className="relative">
              <span className="eyebrow justify-center">Diagnóstico gratuito</span>
              <h2 className="mx-auto mt-5 max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight text-cream sm:text-4xl md:text-[2.75rem]">
                Jogue o jogo certo com o nosso diagnóstico.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-mut">
                Descubra onde sua empresa pode melhorar com os dados que já possui. Um diagnóstico
                inicial gratuito para identificar oportunidades de organização, acompanhamento e
                melhoria da gestão.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="/diagnostico"
                  className="inline-flex items-center justify-center rounded-full bg-amber px-7 py-3.5 font-semibold text-graphite transition-transform hover:-translate-y-0.5"
                >
                  Quero meu diagnóstico gratuito
                </a>
                <a
                  href={waLink("Olá! Quero solicitar o diagnóstico gratuito da JOGA.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-line px-7 py-3.5 font-semibold text-cream transition-colors hover:border-mut hover:bg-surface"
                >
                  Falar no WhatsApp
                </a>
              </div>

              <p className="mt-6 text-sm text-mut">Retorno em até 48h · sem compromisso</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
