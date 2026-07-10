"use client";

import { useMemo, useState } from "react";
import { API_BASE, CONTACT, UPLOAD_PLANILHA_ATIVO } from "@/lib/site";
import UploadPlanilha from "./UploadPlanilha";
import RadarPlacar from "./RadarPlacar";

/* ─────────────────────────────────────────────────────────────
   Questionário do Diagnóstico JOGA (spec §4).
   Uma pergunta por tela, ramifica por setor (Serviços pula Estoque).
   Os `code` de cada opção batem com os do backend (app/schemas.py).
   ───────────────────────────────────────────────────────────── */

type Opcao = { code: string; label: string };
type Pergunta = {
  id: string;
  bloco: string;
  texto: string;
  tipo: "single" | "text";
  opcoes?: Opcao[];
  soComEstoque?: boolean; // pulada quando setor === "servicos"
};

const PERGUNTAS: Pergunta[] = [
  // Bloco 0 — Contexto
  { id: "q1", bloco: "Contexto", texto: "Qual o setor da sua empresa?", tipo: "single", opcoes: [
    { code: "atacado", label: "Atacado distribuidor" },
    { code: "varejo", label: "Varejo / supermercado" },
    { code: "industria", label: "Indústria" },
    { code: "logistica", label: "Logística / transporte" },
    { code: "servicos", label: "Serviços" },
    { code: "outro", label: "Outro" },
  ] },
  { id: "q2", bloco: "Contexto", texto: "Faturamento mensal aproximado?", tipo: "single", opcoes: [
    { code: "ate100k", label: "Até R$100 mil" },
    { code: "100k_500k", label: "R$100–500 mil" },
    { code: "500k_1mi", label: "R$500 mil–1 mi" },
    { code: "1mi_2mi", label: "R$1–2 mi" },
    { code: "2mi_5mi", label: "R$2–5 mi" },
    { code: "5mi_10mi", label: "R$5–10 mi" },
    { code: "mais10mi", label: "+R$10 mi" },
  ] },
  { id: "q3", bloco: "Contexto", texto: "Quantos colaboradores?", tipo: "single", opcoes: [
    { code: "1_10", label: "1–10" },
    { code: "11_50", label: "11–50" },
    { code: "51_100", label: "51–100" },
    { code: "101_200", label: "101–200" },
    { code: "mais200", label: "+200" },
  ] },
  { id: "q4", bloco: "Contexto", texto: "Qual sistema/ERP você usa hoje?", tipo: "single", opcoes: [
    { code: "winthor", label: "Winthor" },
    { code: "sankhya", label: "Sankhya" },
    { code: "bling", label: "Bling / Tiny" },
    { code: "outro", label: "Outro" },
    { code: "nenhum", label: "Não tenho sistema integrado" },
  ] },
  // Bloco 1 — Como você decide hoje
  { id: "q5", bloco: "Como você decide hoje", texto: "Onde estão seus indicadores hoje?", tipo: "single", opcoes: [
    { code: "cabeca", label: "Na cabeça / experiência" },
    { code: "planilhas", label: "Planilhas soltas" },
    { code: "erp", label: "Relatórios do ERP" },
    { code: "bi", label: "Um painel / BI" },
    { code: "nao_acompanho", label: "Não acompanho" },
  ] },
  { id: "q6", bloco: "Como você decide hoje", texto: "Com que frequência você olha os números do negócio?", tipo: "single", opcoes: [
    { code: "dia", label: "Todo dia" },
    { code: "semana", label: "Toda semana" },
    { code: "mes", label: "Todo mês" },
    { code: "problema", label: "Só quando dá problema" },
    { code: "nao_olho", label: "Não olho" },
  ] },
  { id: "q7", bloco: "Como você decide hoje", texto: "Quanto tempo sua equipe gasta montando planilha/relatório por semana?", tipo: "single", opcoes: [
    { code: "quase_nada", label: "Quase nada" },
    { code: "horas", label: "Algumas horas" },
    { code: "dia_inteiro", label: "Um dia inteiro" },
    { code: "mais", label: "Mais que isso" },
    { code: "nao_sei", label: "Não sei / não tenho ideia" },
  ] },
  // Bloco 2 — Comercial
  { id: "q8", bloco: "Comercial", texto: "Você acompanha margem e lucro por produto e por cliente, ou só o faturamento?", tipo: "single", opcoes: [
    { code: "faturamento", label: "Só faturamento" },
    { code: "fat_margens", label: "Faturamento + algumas margens" },
    { code: "margem_completa", label: "Margem completa" },
    { code: "nao_acompanho", label: "Não acompanho" },
  ] },
  { id: "q9", bloco: "Comercial", texto: "Suas metas têm acompanhamento contínuo?", tipo: "single", opcoes: [
    { code: "sem_metas", label: "Não tenho metas" },
    { code: "fim_mes", label: "Tenho, mas só olho no fim do mês" },
    { code: "de_perto", label: "Acompanho de perto" },
  ] },
  { id: "q10", bloco: "Comercial", texto: "Consegue ver o desempenho por vendedor/equipe rapidamente?", tipo: "single", opcoes: [
    { code: "nao", label: "Não" },
    { code: "esforco", label: "Só com esforço / planilha" },
    { code: "facil", label: "Sim, fácil" },
  ] },
  // Bloco 3 — Carteira
  { id: "q11", bloco: "Carteira de clientes", texto: "Você sabe quantos clientes deixaram de comprar nos últimos 60–90 dias?", tipo: "single", opcoes: [
    { code: "nao_ideia", label: "Não faço ideia" },
    { code: "nocao", label: "Tenho uma noção" },
    { code: "exato", label: "Sei exatamente" },
  ] },
  { id: "q12", bloco: "Carteira de clientes", texto: "Sua carteira é classificada (ativos / em risco / inativos)?", tipo: "single", opcoes: [
    { code: "nao", label: "Não" },
    { code: "informal", label: "Informalmente" },
    { code: "formal", label: "Sim, formal" },
  ] },
  { id: "q13", bloco: "Carteira de clientes", texto: "Quanto da sua carteira você considera inativo hoje?", tipo: "single", opcoes: [
    { code: "menos10", label: "Menos de 10%" },
    { code: "10_25", label: "10–25%" },
    { code: "25_50", label: "25–50%" },
    { code: "mais50", label: "Mais de 50%" },
    { code: "nao_sei", label: "Não sei" },
  ] },
  // Bloco 4 — Estoque (pulado p/ Serviços)
  { id: "q14", bloco: "Estoque", soComEstoque: true, texto: "Você sabe quanto dinheiro está parado em produtos sem giro?", tipo: "single", opcoes: [
    { code: "nao", label: "Não" },
    { code: "estimo", label: "Estimo" },
    { code: "exato", label: "Sei exato" },
  ] },
  { id: "q15", bloco: "Estoque", soComEstoque: true, texto: "Tem ruptura de itens importantes com frequência?", tipo: "single", opcoes: [
    { code: "sempre", label: "Sempre" },
    { code: "as_vezes", label: "Às vezes" },
    { code: "raramente", label: "Raramente" },
  ] },
  { id: "q16", bloco: "Estoque", soComEstoque: true, texto: "Suas compras são baseadas em giro/cobertura ou no feeling?", tipo: "single", opcoes: [
    { code: "feeling", label: "No feeling" },
    { code: "misto", label: "Misto" },
    { code: "dados", label: "Em dados (giro/cobertura)" },
  ] },
  // Bloco 5 — Dor e urgência
  { id: "q17", bloco: "Dor e urgência", texto: "Qual a sua maior dor hoje?", tipo: "text" },
  { id: "q18", bloco: "Dor e urgência", texto: "Qual a sua urgência em jogar o jogo certo?", tipo: "single", opcoes: [
    { code: "pra_ontem", label: "Pra ontem" },
    { code: "3_meses", label: "Nos próximos 3 meses" },
    { code: "pesquisando", label: "Sem pressa, estou pesquisando" },
  ] },
];

const NIVEL_STYLE: Record<string, string> = {
  "Crítico": "border-red-500/30 bg-red-500/10 text-red-400",
  "Atenção": "border-amber/30 bg-amber/10 text-amber",
  "Bom": "border-teal/30 bg-teal/10 text-teal",
  "Maduro": "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
};

// Máscara de telefone BR (celular): vai encaixando enquanto digita → (34) 99943-4613
function maskTelefone(v: string): string {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d ? `(${d}` : "";
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

const field =
  "w-full rounded-lg border border-line bg-graphite px-4 py-3 text-sm text-cream placeholder:text-mut/60 outline-none focus:border-amber";
const labelCls = "mb-1.5 block text-sm font-medium text-cream/90";
const btnPrimary =
  "inline-flex items-center justify-center rounded-full bg-amber px-6 py-3.5 font-semibold text-graphite transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0";
const btnGhost =
  "inline-flex items-center justify-center rounded-full border border-line px-6 py-3.5 font-semibold text-cream transition-colors hover:border-mut hover:bg-graphite";

type Contato = {
  nome: string; empresa: string; cargo: string;
  whatsapp: string; email: string; consent: boolean;
};

type Resultado = {
  id: number;
  placar: Record<string, string>;
  oportunidades: string[];
  mensagem: string;
};

export default function DiagnosticoWizard() {
  const [stage, setStage] = useState<"intro" | "quiz" | "wall" | "result">("intro");
  const [qi, setQi] = useState(0);
  const [respostas, setRespostas] = useState<Record<string, string>>({});
  const [contato, setContato] = useState<Contato>({
    nome: "", empresa: "", cargo: "", whatsapp: "", email: "", consent: false,
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [resultado, setResultado] = useState<Resultado | null>(null);

  // Ramificação: Serviços não responde Estoque.
  const perguntas = useMemo(() => {
    const servicos = respostas.q1 === "servicos";
    return PERGUNTAS.filter((p) => !(p.soComEstoque && servicos));
  }, [respostas.q1]);

  const total = perguntas.length;
  const atual = perguntas[Math.min(qi, total - 1)];

  const setContatoField = (k: keyof Contato, v: string | boolean) =>
    setContato((s) => ({ ...s, [k]: v }));

  function avancar() {
    if (qi < total - 1) setQi(qi + 1);
    else setStage("wall");
  }

  function voltar() {
    if (stage === "wall") { setStage("quiz"); setQi(total - 1); return; }
    if (qi > 0) setQi(qi - 1);
    else setStage("intro");
  }

  function responder(code: string) {
    setRespostas((s) => ({ ...s, [atual.id]: code }));
    // avança automático nas perguntas de escolha única
    setTimeout(avancar, 140);
  }

  function validarWall(): boolean {
    if (!contato.nome.trim() || !contato.empresa.trim() || (!contato.whatsapp.trim() && !contato.email.trim())) {
      setErr("Preencha nome, empresa e ao menos um contato (WhatsApp ou e-mail).");
      return false;
    }
    if (!contato.consent) {
      setErr("É preciso aceitar o tratamento dos dados para continuar.");
      return false;
    }
    setErr("");
    return true;
  }

  function fallbackMsg(): string {
    const linhas = perguntas.map((p) => {
      const code = respostas[p.id];
      if (p.tipo === "text") return `${p.bloco} — ${p.texto} ${code || "-"}`;
      const label = p.opcoes?.find((o) => o.code === code)?.label ?? "-";
      return `${p.texto} ${label}`;
    });
    return (
      `*Diagnóstico JOGA*\n\n` +
      `Nome: ${contato.nome}\nEmpresa: ${contato.empresa}\nCargo: ${contato.cargo}\n` +
      `WhatsApp: ${contato.whatsapp}\nE-mail: ${contato.email}\n\n` +
      linhas.join("\n")
    );
  }

  async function enviar() {
    if (!validarWall()) return;
    setLoading(true);
    setErr("");
    const body = {
      nome: contato.nome,
      empresa: contato.empresa,
      cargo: contato.cargo,
      whatsapp: contato.whatsapp,
      email: contato.email,
      consent: contato.consent,
      setor: respostas.q1,
      erp: respostas.q4,
      faturamento: respostas.q2,
      colaboradores: respostas.q3,
      desafio: respostas.q17 ?? "",
      urgencia: respostas.q18,
      respostas,
    };
    try {
      const r = await fetch(`${API_BASE}/api/diagnostico/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const data: Resultado = await r.json();
      setResultado(data);
      setStage("result");
    } catch {
      // Plano B: abre o WhatsApp com o resumo (não perde o lead).
      setErr("Não conseguimos processar agora — vamos te atender pelo WhatsApp.");
      window.open(
        `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(fallbackMsg())}`,
        "_blank"
      );
    } finally {
      setLoading(false);
    }
  }

  /* ── Telas ─────────────────────────────────────────────── */

  if (stage === "intro") {
    return (
      <Card>
        <span className="eyebrow">5–7 minutos</span>
        <h2 className="mt-4 font-display text-2xl font-bold text-cream sm:text-3xl">
          Vamos montar o raio-x da sua gestão.
        </h2>
        <p className="mt-4 text-mut">
          Responda algumas perguntas rápidas e afiadas. No fim, você vê na hora o seu
          <strong className="text-cream/90"> placar de maturidade</strong> por área e as principais
          oportunidades. O relatório completo chega por contato — retorno em até 48h.
        </p>
        <div className="mt-8">
          <button className={btnPrimary} onClick={() => { setStage("quiz"); setQi(0); }}>
            Começar o diagnóstico
          </button>
        </div>
      </Card>
    );
  }

  if (stage === "quiz") {
    const respondida = respostas[atual.id];
    return (
      <Card>
        <Progresso atual={qi + 1} total={total} bloco={atual.bloco} />
        <div key={atual.id} className="rise">
          <h2 className="mt-6 font-display text-xl font-bold leading-snug text-cream sm:text-2xl">
            {atual.texto}
          </h2>

          {atual.tipo === "single" && (
            <div className="mt-6 grid gap-2.5">
              {atual.opcoes!.map((o) => {
                const sel = respondida === o.code;
                return (
                  <button
                    key={o.code}
                    onClick={() => responder(o.code)}
                    className={`w-full rounded-xl border px-5 py-4 text-left text-sm font-medium transition-colors ${
                      sel
                        ? "border-amber bg-amber/10 text-cream"
                        : "border-line bg-graphite text-cream/90 hover:border-mut"
                    }`}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>
          )}

          {atual.tipo === "text" && (
            <textarea
              className={`${field} mt-6 min-h-[120px] resize-y`}
              placeholder="Escreva com suas palavras (opcional)…"
              value={respostas[atual.id] ?? ""}
              onChange={(e) => setRespostas((s) => ({ ...s, [atual.id]: e.target.value }))}
            />
          )}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <button className={btnGhost} onClick={voltar}>Voltar</button>
          {atual.tipo === "text" && (
            <button className={btnPrimary} onClick={avancar}>Próximo</button>
          )}
        </div>
      </Card>
    );
  }

  if (stage === "wall") {
    return (
      <Card>
        <span className="eyebrow">Quase lá</span>
        <h2 className="mt-4 font-display text-2xl font-bold text-cream sm:text-3xl">
          Pra onde enviamos o seu diagnóstico?
        </h2>
        <p className="mt-3 text-sm text-mut">
          Você já respondeu tudo. Deixe seu contato para ver o placar e receber o relatório completo.
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Nome *</label>
            <input className={field} value={contato.nome} onChange={(e) => setContatoField("nome", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Empresa *</label>
            <input className={field} value={contato.empresa} onChange={(e) => setContatoField("empresa", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Cargo</label>
            <input className={field} value={contato.cargo} onChange={(e) => setContatoField("cargo", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>WhatsApp</label>
            <input
              className={field}
              value={contato.whatsapp}
              onChange={(e) => setContatoField("whatsapp", maskTelefone(e.target.value))}
              inputMode="numeric"
              placeholder="(28) 99999-9999"
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>E-mail</label>
            <input className={field} type="email" value={contato.email} onChange={(e) => setContatoField("email", e.target.value)} />
          </div>
        </div>

        <label className="mt-5 flex items-start gap-3 text-sm text-mut">
          <input
            type="checkbox"
            checked={contato.consent}
            onChange={(e) => setContatoField("consent", e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-[#f4a52a]"
          />
          <span>
            Autorizo a JOGA a tratar meus dados para retorno deste contato, conforme a{" "}
            <a href="/politica-privacidade" className="text-amber underline">Política de Privacidade</a>.
          </span>
        </label>

        {err && <p className="mt-4 text-sm text-red-400">{err}</p>}

        <div className="mt-6 flex items-center justify-between">
          <button className={btnGhost} onClick={voltar} disabled={loading}>Voltar</button>
          <button className={btnPrimary} onClick={enviar} disabled={loading}>
            {loading ? "Processando…" : "Ver meu diagnóstico"}
          </button>
        </div>
      </Card>
    );
  }

  // stage === "result"
  return (
    <Card>
      <span className="eyebrow">Seu raio-x</span>
      <h2 className="mt-4 font-display text-2xl font-bold text-cream sm:text-3xl">
        Placar de maturidade
      </h2>
      <p className="mt-3 text-sm text-mut">{resultado?.mensagem}</p>

      {resultado && (
        <div className="mt-6 flex justify-center">
          <RadarPlacar placar={resultado.placar} />
        </div>
      )}

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {resultado && Object.entries(resultado.placar).map(([area, nivel]) => (
          <div key={area} className="flex items-center justify-between rounded-xl border border-line bg-graphite px-5 py-4">
            <span className="font-medium text-cream">{area}</span>
            <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${NIVEL_STYLE[nivel] ?? "border-line text-mut"}`}>
              {nivel}
            </span>
          </div>
        ))}
      </div>

      <h3 className="mt-8 font-display text-lg font-bold text-cream">
        Identificamos 3 oportunidades
      </h3>
      <div className="mt-4 grid gap-2.5">
        {resultado?.oportunidades.map((titulo, i) => (
          <div key={i} className="rounded-xl border border-line bg-surface/60 p-4">
            <p className="text-sm font-medium text-cream/90">
              <span className="mr-2 text-amber">›</span>{titulo}
            </p>
            <p className="mt-1 text-xs text-mut">🔒 O detalhe vai no relatório completo — retorno em até 48h.</p>
          </div>
        ))}
      </div>

      {UPLOAD_PLANILHA_ATIVO && resultado && (
        <div className="mt-8">
          <UploadPlanilha diagnosticoId={resultado.id} />
        </div>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a
          href={`https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(
            `Olá! Acabei de fazer o Diagnóstico JOGA (${contato.empresa}) e quero conversar.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className={btnPrimary}
        >
          Falar com a JOGA agora
        </a>
      </div>
    </Card>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-line bg-surface p-6 md:p-8">{children}</div>;
}

function Progresso({ atual, total, bloco }: { atual: number; total: number; bloco: string }) {
  const pct = Math.round((atual / total) * 100);
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold uppercase tracking-wider text-amber">{bloco}</span>
        <span className="text-mut">{atual} de {total}</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-line">
        <div className="h-full rounded-full bg-amber transition-all duration-300" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
