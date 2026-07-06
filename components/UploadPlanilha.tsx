"use client";

import { useRef, useState } from "react";
import { API_BASE } from "@/lib/site";

/* Fase 2b — upload opcional do export cru do ERP, ligado à tela de resultado.
   Sobe o arquivo → o backend lê as colunas (3 camadas). Se a leitura for por IA,
   mostra "detectei assim, confere?" antes de analisar. Exibe os achados (sem R$). */

type Mapeamento = { cliente: string | null; data_compra: string | null; valor: string | null };
type Achados = { frases: string[]; formato: string; total_clientes: number };
type Resp = {
  ok: boolean;
  precisa_confirmar?: boolean;
  mapeamento?: Mapeamento;
  colunas?: string[];
  amostra?: string[][];
  achados?: Achados;
  fallback_modelo?: boolean;
  erro?: string;
};

const field =
  "w-full rounded-lg border border-line bg-graphite px-3 py-2 text-sm text-cream outline-none focus:border-amber";
const btnPrimary =
  "inline-flex items-center justify-center rounded-full bg-amber px-5 py-3 font-semibold text-graphite transition-transform hover:-translate-y-0.5 disabled:opacity-60";
const btnGhost =
  "inline-flex items-center justify-center rounded-full border border-line px-5 py-3 font-semibold text-cream transition-colors hover:border-mut hover:bg-graphite";

export default function UploadPlanilha({ diagnosticoId }: { diagnosticoId: number }) {
  const [file, setFile] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [confirmar, setConfirmar] = useState<Resp | null>(null);
  const [mapa, setMapa] = useState<Mapeamento | null>(null);
  const [achados, setAchados] = useState<Achados | null>(null);
  const [fallback, setFallback] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function enviar(mapeamentoConfirmado?: Mapeamento) {
    if (!file) { setErr("Selecione um arquivo."); return; }
    if (!consent) { setErr("Autorize a análise do arquivo para continuar."); return; }
    setLoading(true);
    setErr("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("diagnostico_id", String(diagnosticoId));
      if (mapeamentoConfirmado) fd.append("mapeamento", JSON.stringify(mapeamentoConfirmado));

      const r = await fetch(`${API_BASE}/api/diagnostico/upload`, { method: "POST", body: fd });
      const data: Resp = await r.json();

      if (data.precisa_confirmar && data.mapeamento) {
        setConfirmar(data);
        setMapa(data.mapeamento);
      } else if (data.ok && data.achados?.frases) {
        setAchados(data.achados);
        setConfirmar(null);
      } else if (data.fallback_modelo) {
        setFallback(true);
        setErr(data.erro || "Não consegui ler essa planilha.");
      } else {
        setErr(data.erro || "Não consegui processar o arquivo.");
      }
    } catch {
      setErr("Falha ao enviar o arquivo. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  // ── Resultado da análise ────────────────────────────────
  if (achados) {
    return (
      <div className="rounded-2xl border border-teal/30 bg-teal/5 p-5">
        <p className="text-sm font-semibold text-cream">Sua carteira, de verdade:</p>
        <ul className="mt-3 space-y-2">
          {achados.frases.map((f, i) => (
            <li key={i} className="flex gap-2 text-sm text-cream/90">
              <span className="text-teal">✓</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-mut">
          Esses são os seus números reais ({achados.total_clientes} clientes). O detalhe completo — quem
          recuperar primeiro e como — vai no relatório e na conversa com a JOGA.
        </p>
      </div>
    );
  }

  // ── Confirmação do mapeamento (camada IA) ───────────────
  if (confirmar && mapa) {
    const cols = confirmar.colunas || [];
    const campo = (alvo: keyof Mapeamento, rot: string, opcional = false) => (
      <div>
        <label className="mb-1 block text-xs font-medium text-cream/80">{rot}</label>
        <select
          className={field}
          value={mapa[alvo] ?? ""}
          onChange={(e) => setMapa({ ...mapa, [alvo]: e.target.value || null })}
        >
          {opcional && <option value="">— nenhuma —</option>}
          {cols.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
    );
    return (
      <div className="rounded-2xl border border-line bg-surface/60 p-5">
        <p className="text-sm font-semibold text-cream">Detectei estas colunas — confere?</p>
        <p className="mt-1 text-xs text-mut">Ajuste se algo ficou trocado e confirme para ver sua carteira.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {campo("cliente", "Cliente")}
          {campo("data_compra", "Data da compra", true)}
          {campo("valor", "Valor")}
        </div>
        {err && <p className="mt-3 text-sm text-red-400">{err}</p>}
        <div className="mt-4 flex gap-3">
          <button className={btnPrimary} disabled={loading} onClick={() => enviar(mapa)}>
            {loading ? "Analisando…" : "Confirmar e analisar"}
          </button>
          <button className={btnGhost} onClick={() => { setConfirmar(null); setFile(null); }}>Cancelar</button>
        </div>
      </div>
    );
  }

  // ── Estado inicial (escolher arquivo) ───────────────────
  return (
    <div className="rounded-2xl border border-line bg-surface/50 p-5">
      <p className="text-sm font-semibold text-cream">Quer ir mais fundo?</p>
      <p className="mt-1 text-sm text-mut">
        Tem um relatório de vendas do seu sistema? Suba aqui <strong className="text-cream/90">do jeito que
        sai</strong> — a gente organiza e te mostra sua carteira de verdade (% inativa, quem sumiu…).
      </p>

      <div className="mt-4">
        <input
          ref={inputRef}
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={(e) => { setFile(e.target.files?.[0] ?? null); setErr(""); setFallback(false); }}
          className="block w-full text-sm text-mut file:mr-4 file:rounded-full file:border-0 file:bg-graphite file:px-4 file:py-2 file:text-sm file:font-semibold file:text-cream hover:file:bg-line"
        />
      </div>

      <label className="mt-4 flex items-start gap-3 text-sm text-mut">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 accent-[#f4a52a]" />
        <span>
          Autorizo a análise deste arquivo. Ele é processado na hora e <strong className="text-cream/90">não
          é armazenado</strong> — guardamos apenas o resumo (conforme a{" "}
          <a href="/politica-privacidade" className="text-amber underline">Política de Privacidade</a>).
        </span>
      </label>

      {err && <p className="mt-3 text-sm text-red-400">{err}</p>}
      {fallback && (
        <p className="mt-2 text-sm text-mut">
          Não tem o export certo?{" "}
          <a href={`${API_BASE}/api/diagnostico/modelo`} className="text-amber underline">Baixe o modelo</a>,
          preencha e suba.
        </p>
      )}

      <div className="mt-4 flex items-center gap-3">
        <button className={btnPrimary} disabled={loading || !file} onClick={() => enviar()}>
          {loading ? "Enviando…" : "Analisar minha planilha"}
        </button>
        <a href={`${API_BASE}/api/diagnostico/modelo`} className="text-xs text-mut underline hover:text-cream">
          baixar modelo
        </a>
      </div>
    </div>
  );
}
