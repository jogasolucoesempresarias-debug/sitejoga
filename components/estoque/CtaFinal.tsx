import Reveal from "../Reveal";
import { btnGhost, btnPrimary } from "@/lib/ui";
import { CTA, FINAL } from "@/lib/lp-estoque";
import { SITE } from "@/lib/site";

// Bloco 11 — CTA final + fechamento de marca.
export default function CtaFinal() {
  return (
    <section id="conversao" className="border-t border-line py-20 pb-28 md:py-28 md:pb-32">
      <div className="container-joga">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-amber/30 bg-gradient-to-br from-surface to-graphite p-10 text-center md:p-16">
            <div className="bg-grid mask-radial pointer-events-none absolute inset-0 opacity-40" />
            <div className="relative">
              <span className="eyebrow justify-center">{FINAL.eyebrow}</span>
              <h2 className="mx-auto mt-5 max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight text-cream sm:text-4xl md:text-[2.75rem]">
                {FINAL.h2a}
                <span className="text-amber">{FINAL.h2destaque}</span>
                {FINAL.h2b}
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-mut">{FINAL.p}</p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a href={CTA.diagnostico.href} className={btnPrimary}>
                  {CTA.diagnostico.label}
                </a>
                <a
                  href={CTA.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={btnGhost}
                >
                  {CTA.whatsapp.label}
                </a>
              </div>

              <p className="mt-6 text-sm text-mut">{FINAL.complemento}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 text-center">
            <p className="font-display text-lg font-medium text-amber">{SITE.closing}</p>
            <p className="mt-1 text-sm text-mut">{FINAL.assinatura}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
