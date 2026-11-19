"use client";

import { useMemo, useRef, useState } from "react";
import Reveal from "../Reveal";
import RadarPlacar from "../RadarPlacar";
import { btnGhost, btnPrimary, field, labelCls } from "@/lib/ui";
import { API_BASE, CONTACT } from "@/lib/site";
import { evento } from "@/lib/analytics";
import { CTA, NIVEL_STYLE, QUIZ } from "@/lib/lp-estoque";

/* ─────────────────────────────────────────────────────────────
   Bloco 9 — o diagnóstico de estoque da própria LP.
   Fluxo: contexto + 12 perguntas → muro (nome/empresa/WhatsApp) → placar + análise por IA.

   Três decisões que valem explicar:
   • Três opções em vez de SIM/NÃO: perguntas como "sua empresa tem orçamento estruturado de
     compras?" recebem SIM quase sempre. Placar todo verde mata o gancho.
   • O muro só guarda a ANÁLISE. Cobrar contato para mostrar uma contagem seria ofensivo;
     cobrar para mostrar uma leitura escrita para o caso dele é troca justa.
   • O placar é calculado no backend, nunca aqui. Se os dois lados contassem, um dia
     divergiriam — e o visitante veria a divergência antes da gente.
   ───────────────────────────────────────────────────────────── */

type Analise = {
  leitura: string;
  pontos: { titulo: string; texto: string }[];
  fecho: string;
};

type Resultado = {
  id: number;
  placar: Record<string, string>;
  analise: Analise;
};

type Contato = { nome: string; empresa: string; whatsapp: string; email: string; consent: boolean };

// Máscara de celular BR — mesma do DiagnosticoWizard.
function maskTelefone(v: string): string {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d ? `(${d}` : "";
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export default function QuizEstoque() {
  const [contexto, setContexto] = useState<Record<string, string>>({});
  const [respostas, setRespostas] = useState<Record<string, string>>({});
  const [contato, setContato] = useState<Contato>({
    nome: "", empresa: "", whatsapp: "", email: "", consent: false,
  });
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const muroRef = useRef<HTMLDivElement>(null);
  const resultadoRef = useRef<HTMLDivElement>(null);

  const total = QUIZ.perguntas.length;
  const respondidas = Object.keys(respostas).length;
  const completo = respondidas === total;

  const setCampo = (k: keyof Contato, v: string | boolean) =>
    setContato((s) => ({ ...s, [k]: v }));

  function responder(id: string, code: string) {
    setRespostas((s) => {
      const novo = { ...s, [id]: code };
      if (Object.keys(novo).length === total) {
        setTimeout(
          () => muroRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }),
          140
        );
      }
      return novo;
    });
  }

  // Plano B: se a API cair, o lead não se perde — vai pro WhatsApp com tudo preenchido.
  const resumoWhats = useMemo(() => {
    const rot: Record<string, string> = { sim: "Sim", mais_ou_menos: "Mais ou menos", nao: "Não" };
    const linhas = QUIZ.perguntas.map((p) => `${p.t} ${rot[respostas[p.id]] ?? "-"}`);
    return (
      `*Diagnóstico de Estoque — JOGA*\n\n` +
      `Nome: ${contato.nome}\nEmpresa: ${contato.empresa}\nWhatsApp: ${contato.whatsapp}\n\n` +
      linhas.join("\n")
    );
  }, [respostas, contato]);

  async function enviar() {
    if (!contato.nome.trim() || !contato.empresa.trim() || !contato.whatsapp.trim()) {
      setErro(QUIZ.muro.erroCampos);
      return;
    }
    if (!contato.consent) {
      setErro(QUIZ.muro.erroConsent);
      return;
    }
    setErro("");
    setLoading(true);
    try {
      const r = await fetch(`${API_BASE}/api/diagnostico/estoque`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: contato.nome,
          empresa: contato.empresa,
          whatsapp: contato.whatsapp,
          email: contato.email || null,
          consent: contato.consent,
          setor: contexto.setor ?? null,
          erp: contexto.erp ?? null,
          skus: contexto.skus ?? null,
          respostas,
        }),
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const data: Resultado = await r.json();
      setResultado(data);
      evento("generate_lead", { origem: "lp-estoque" });
      setTimeout(
        () => resultadoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
        140
      );
    } catch {
      setErro(QUIZ.muro.erroApi);
      window.open(
        `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(resumoWhats)}`,
        "_blank"
      );
    } finally {
      setLoading(false);
    }
  }

  function refazer() {
    setResultado(null);
    setRespostas({});
    setContexto({});
    setContato({ nome: "", empresa: "", whatsapp: "", email: "", consent: false });
    setErro("");
  }

  /* ── Resultado ─────────────────────────────────────────── */
  if (resultado) {
    return (
      <section id="questionario" className="py-20 md:py-28">
        <div className="container-joga" ref={resultadoRef}>
          <Reveal>
            <span className="eyebrow">{QUIZ.resultado.eyebrow}</span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-cream sm:text-4xl">
              {QUIZ.resultado.titulo}
            </h2>
            <p className="mt-3 text-mut">{QUIZ.resultado.subPlacar}</p>
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-[auto_1fr] lg:items-center">
            <div className="mx-auto">
              <RadarPlacar placar={resultado.placar} />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {Object.entries(resultado.placar).map(([area, nivel]) => (
                <div
                  key={area}
                  className="flex items-center justify-between rounded-xl border border-line bg-surface px-5 py-4"
                >
                  <span className="font-medium text-cream">{area}</span>
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                      NIVEL_STYLE[nivel] ?? "border-line text-mut"
                    }`}
                  >
                    {nivel}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* análise escrita pela IA a partir das respostas — sem nenhum valor em R$ */}
          <div className="mt-10 rounded-2xl border border-line bg-surface p-7 md:p-9">
            <h3 className="font-display text-xl font-semibold text-cream">
              {QUIZ.resultado.tituloAnalise}
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-cream/90">
              {resultado.analise.leitura}
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {resultado.analise.pontos.map((p, i) => (
                <div key={i} className="rounded-xl border border-line bg-graphite p-5">
                  <p className="font-display text-[15px] font-semibold text-amber">{p.titulo}</p>
                  <p className="mt-2 text-sm leading-relaxed text-cream/85">{p.texto}</p>
                </div>
              ))}
            </div>

            {resultado.analise.fecho && (
              <div className="mt-7 rounded-xl border border-amber/30 bg-amber/5 p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber">
                  {QUIZ.resultado.fechoRot}
                </p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-cream">
                  {resultado.analise.fecho}
                </p>
              </div>
            )}

            <p className="mt-6 text-xs leading-relaxed text-mut/80">{QUIZ.resultado.ressalva}</p>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={CTA.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className={btnPrimary}
            >
              {QUIZ.resultado.cta}
            </a>
            <button onClick={refazer} className={btnGhost}>
              {QUIZ.resultado.refazer}
            </button>
          </div>
        </div>
      </section>
    );
  }

  /* ── Questionário + muro ───────────────────────────────── */
  return (
    <section id="questionario" className="py-20 md:py-28">
      <div className="container-joga">
        <Reveal>
          <div className="max-w-2xl">
            <span className="eyebrow">{QUIZ.eyebrow}</span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-cream sm:text-4xl">
              {QUIZ.h2}
            </h2>
            <p className="mt-4 text-lg text-mut">{QUIZ.p}</p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-surface">
            <div className="border-b border-line px-6 py-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold uppercase tracking-wider text-amber">
                  {QUIZ.contexto.titulo}
                </span>
                <span className="text-mut">{QUIZ.resultado.progresso(respondidas, total)}</span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-line">
                <div
                  className="h-full rounded-full bg-amber transition-all duration-300"
                  style={{ width: `${(respondidas / total) * 100}%` }}
                />
              </div>
            </div>

            {/* contexto: alimenta a análise e qualifica o lead */}
            <div className="grid gap-5 border-b border-line px-6 py-6 sm:grid-cols-3">
              {QUIZ.contexto.campos.map((c) => (
                <div key={c.id}>
                  <p className="text-xs font-semibold uppercase tracking-wider text-mut">
                    {c.label}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {c.opcoes.map((o) => {
                      const sel = contexto[c.id] === o.code;
                      return (
                        <button
                          key={o.code}
                          onClick={() => setContexto((s) => ({ ...s, [c.id]: o.code }))}
                          aria-pressed={sel}
                          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                            sel
                              ? "border-amber bg-amber/10 text-amber"
                              : "border-line text-mut hover:border-mut hover:text-cream"
                          }`}
                        >
                          {o.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <ol>
              {QUIZ.perguntas.map((p, i) => (
                <li
                  key={p.id}
                  className="flex flex-col gap-4 border-b border-line px-6 py-5 last:border-b-0 md:flex-row md:items-center md:justify-between md:gap-8"
                >
                  <p className="flex gap-3 text-[15px] leading-relaxed text-cream/90">
                    <span className="flex-none font-display text-sm font-bold text-mut">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {p.t}
                  </p>
                  <div className="flex flex-none gap-2">
                    {QUIZ.opcoes.map((o) => {
                      const sel = respostas[p.id] === o.code;
                      return (
                        <button
                          key={o.code}
                          onClick={() => responder(p.id, o.code)}
                          aria-pressed={sel}
                          className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                            sel
                              ? "border-amber bg-amber/10 text-amber"
                              : "border-line text-mut hover:border-mut hover:text-cream"
                          }`}
                        >
                          {o.label}
                        </button>
                      );
                    })}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        {/* muro — só aparece com o questionário completo */}
        <div ref={muroRef}>
          {completo && (
            <div className="mt-6 rounded-2xl border border-amber/30 bg-gradient-to-br from-surface to-graphite p-7 md:p-9">
              <span className="eyebrow">{QUIZ.muro.eyebrow}</span>
              <h3 className="mt-4 font-display text-2xl font-bold text-cream">
                {QUIZ.muro.titulo}
              </h3>
              <p className="mt-3 text-[15px] text-mut">{QUIZ.muro.p}</p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelCls}>Nome *</label>
                  <input
                    className={field}
                    value={contato.nome}
                    onChange={(e) => setCampo("nome", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>Empresa *</label>
                  <input
                    className={field}
                    value={contato.empresa}
                    onChange={(e) => setCampo("empresa", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>WhatsApp *</label>
                  <input
                    className={field}
                    value={contato.whatsapp}
                    onChange={(e) => setCampo("whatsapp", maskTelefone(e.target.value))}
                    inputMode="numeric"
                    placeholder="(28) 99999-9999"
                  />
                </div>
                <div>
                  <label className={labelCls}>E-mail (opcional)</label>
                  <input
                    className={field}
                    type="email"
                    value={contato.email}
                    onChange={(e) => setCampo("email", e.target.value)}
                  />
                </div>
              </div>

              <label className="mt-5 flex items-start gap-3 text-sm text-mut">
                <input
                  type="checkbox"
                  checked={contato.consent}
                  onChange={(e) => setCampo("consent", e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-[#f4a52a]"
                />
                <span>
                  {QUIZ.muro.consent.replace(" Política de Privacidade.", " ")}
                  <a href="/politica-privacidade" className="text-amber underline">
                    Política de Privacidade
                  </a>
                  .
                </span>
              </label>

              {erro && <p className="mt-4 text-sm text-red-400">{erro}</p>}

              <div className="mt-6">
                <button onClick={enviar} disabled={loading} className={btnPrimary}>
                  {loading ? QUIZ.muro.processando : QUIZ.muro.botao}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
