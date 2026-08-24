import Reveal from "../Reveal";
import { btnGhost, btnPrimary } from "@/lib/ui";
import { CTA } from "@/lib/lp-estoque";

type Acao = { label: string; href: string };

// CTA distribuído ao longo da página (briefing §21: não depender só do botão do fim).
// Aparece depois dos problemas, dos pilares e das demonstrações.
export default function CtaFaixa({
  texto,
  principal = CTA.primario,
  secundario,
}: {
  texto: string;
  principal?: Acao;
  secundario?: Acao;
}) {
  const externo = secundario?.href.startsWith("http");
  return (
    <Reveal>
      <div className="mt-14 flex flex-col items-center gap-5 rounded-2xl border border-line bg-surface/40 px-6 py-8 text-center sm:px-10">
        <p className="max-w-xl font-display text-lg font-medium leading-snug text-cream sm:text-xl">
          {texto}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={principal.href} className={btnPrimary}>
            {principal.label}
          </a>
          {secundario && (
            <a
              href={secundario.href}
              className={btnGhost}
              {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {secundario.label}
            </a>
          )}
        </div>
      </div>
    </Reveal>
  );
}
