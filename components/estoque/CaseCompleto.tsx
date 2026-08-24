import Reveal from "../Reveal";
import { CASE, LP_DRAFT } from "@/lib/lp-estoque";
import Pendente from "./Pendente";

// Bloco 10 — o case real.
//
// Números reais extraídos do dataset do cliente (spec 10.2). `autorizado: false` = ainda sem
// liberação para PUBLICAR; em rascunho o bloco aparece para revisão interna. Em produção, sem
// autorização, ele não renderiza e NÃO vira texto genérico — melhor página sem case do que case
// inventado, já que a tese da página é "não é promessa, é prova".
export default function CaseCompleto() {
  if (!CASE.autorizado && !LP_DRAFT) return null;

  return (
    <section id="case" className="border-t border-line bg-ink py-20 md:py-28">
      <div className="container-joga">
        {!CASE.autorizado && (
          <Pendente>
            Visível só em rascunho. Números reais, sem autorização de publicação (spec 10.5). Falta
            ainda: as horas/mês da planilha antiga (spec 10.3) e o depoimento em vídeo com as 5
            perguntas (spec 10.6). Liberar = `CASE.autorizado = true`.
          </Pendente>
        )}

        <Reveal>
          <span className="eyebrow">{CASE.eyebrow}</span>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight text-cream sm:text-4xl">
            {CASE.h2}
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] text-mut">{CASE.perfil}</p>
        </Reveal>

        {/* o que a ferramenta IDENTIFICOU — nunca "economizou" (spec 10.1) */}
        <Reveal delay={0.08}>
          <dl className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CASE.achados.map((a) => (
              <div key={a.rot} className="rounded-2xl border border-line bg-surface p-6">
                <dt className="font-display text-3xl font-bold text-amber">{a.valor}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-mut">{a.rot}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* contraste sobre a LEITURA da operação, não sobre a ferramenta anterior:
            boa parte do público já tem ERP e precisa se reconhecer no problema mesmo assim */}
        <Reveal delay={0.12}>
          <div className="mt-6 overflow-hidden rounded-2xl border border-line">
            <div className="grid grid-cols-2 border-b border-line bg-surface">
              <div className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-mut sm:px-7">
                {CASE.antesDepois.rotAntes}
              </div>
              <div className="border-l border-line px-5 py-4 text-xs font-semibold uppercase tracking-wider text-amber sm:px-7">
                {CASE.antesDepois.rotDepois}
              </div>
            </div>
            {CASE.antesDepois.linhas.map(([antes, depois]) => (
              <div key={antes} className="grid grid-cols-2 border-b border-line last:border-b-0">
                <div className="px-5 py-4 text-sm leading-relaxed text-mut sm:px-7 sm:text-[15px]">
                  {antes}
                </div>
                <div className="border-l border-line bg-surface/40 px-5 py-4 text-sm leading-relaxed text-cream sm:px-7 sm:text-[15px]">
                  {depois}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {CASE.depoimento ? (
          <Reveal delay={0.16}>
            <figure className="mt-10 rounded-2xl border border-amber/30 bg-surface/60 p-8 md:p-10">
              <blockquote className="font-display text-xl leading-snug text-cream sm:text-2xl">
                “{CASE.depoimento.texto}”
              </blockquote>
              <figcaption className="mt-5 text-sm text-mut">
                <span className="text-cream">{CASE.depoimento.autor}</span> ·{" "}
                {CASE.depoimento.cargo}
              </figcaption>
            </figure>
          </Reveal>
        ) : (
          <Pendente>
            Aqui entra o depoimento em vídeo. Roteiro das 5 perguntas na spec 10.6 — as perguntas 2
            (&quot;qual foi a primeira coisa que apareceu que você não sabia?&quot;) e 4 (&quot;a ferramenta pegou
            algum problema antes de virar prejuízo?&quot;) são as que geram a frase que vende.
          </Pendente>
        )}
      </div>
    </section>
  );
}
