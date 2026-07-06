"use client";

import { useState } from "react";
import { CONTACT, SITE } from "@/lib/site";

const setores = [
  "Atacado distribuidor",
  "Varejo / supermercado",
  "Indústria",
  "Logística / transporte",
  "Serviços",
  "Outro",
];

const field =
  "w-full rounded-lg border border-line bg-graphite px-4 py-3 text-sm text-cream placeholder:text-mut/60 outline-none focus:border-amber";
const label = "mb-1.5 block text-sm font-medium text-cream/90";

export default function DiagnosticoForm() {
  const [f, setF] = useState({
    nome: "",
    empresa: "",
    cargo: "",
    whats: "",
    email: "",
    setor: "",
    erp: "",
    desafio: "",
    consent: false,
  });
  const [err, setErr] = useState("");

  const set = (k: string, v: string | boolean) => setF((s) => ({ ...s, [k]: v }));

  function mensagem() {
    return (
      `*Diagnóstico gratuito — JOGA*\n\n` +
      `Nome: ${f.nome}\n` +
      `Empresa: ${f.empresa}\n` +
      `Cargo: ${f.cargo}\n` +
      `Setor: ${f.setor}\n` +
      `Sistema/ERP: ${f.erp}\n` +
      `WhatsApp: ${f.whats}\n` +
      `E-mail: ${f.email}\n\n` +
      `Principal desafio: ${f.desafio}`
    );
  }

  function validar() {
    if (!f.nome.trim() || !f.empresa.trim() || (!f.whats.trim() && !f.email.trim())) {
      setErr("Preencha nome, empresa e ao menos um contato (WhatsApp ou e-mail).");
      return false;
    }
    if (!f.consent) {
      setErr("É preciso aceitar o tratamento dos dados para continuar.");
      return false;
    }
    setErr("");
    return true;
  }

  function enviarWhats(e: React.FormEvent) {
    e.preventDefault();
    if (!validar()) return;
    window.open(
      `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(mensagem())}`,
      "_blank"
    );
  }

  function enviarEmail() {
    if (!validar()) return;
    const body = mensagem().replace(/\*/g, "");
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
      "Diagnóstico gratuito — " + (f.empresa || f.nome)
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={enviarWhats} className="rounded-2xl border border-line bg-surface p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label}>Nome *</label>
          <input className={field} value={f.nome} onChange={(e) => set("nome", e.target.value)} />
        </div>
        <div>
          <label className={label}>Empresa *</label>
          <input className={field} value={f.empresa} onChange={(e) => set("empresa", e.target.value)} />
        </div>
        <div>
          <label className={label}>Cargo</label>
          <input className={field} value={f.cargo} onChange={(e) => set("cargo", e.target.value)} />
        </div>
        <div>
          <label className={label}>Setor</label>
          <select className={field} value={f.setor} onChange={(e) => set("setor", e.target.value)}>
            <option value="">Selecione…</option>
            {setores.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label}>WhatsApp</label>
          <input className={field} value={f.whats} onChange={(e) => set("whats", e.target.value)} placeholder="(28) 99999-9999" />
        </div>
        <div>
          <label className={label}>E-mail</label>
          <input className={field} type="email" value={f.email} onChange={(e) => set("email", e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <label className={label}>Sistema / ERP atual</label>
          <input className={field} value={f.erp} onChange={(e) => set("erp", e.target.value)} placeholder="Winthor, TOTVS, Bling, planilhas…" />
        </div>
        <div className="sm:col-span-2">
          <label className={label}>Principal desafio hoje</label>
          <textarea
            className={`${field} min-h-[96px] resize-y`}
            value={f.desafio}
            onChange={(e) => set("desafio", e.target.value)}
          />
        </div>
      </div>

      <label className="mt-5 flex items-start gap-3 text-sm text-mut">
        <input
          type="checkbox"
          checked={f.consent}
          onChange={(e) => set("consent", e.target.checked)}
          className="mt-0.5 h-4 w-4 accent-[#f4a52a]"
        />
        <span>
          Autorizo a JOGA a tratar meus dados para retorno deste contato, conforme a{" "}
          <a href="/politica-privacidade" className="text-amber underline">
            Política de Privacidade
          </a>
          .
        </span>
      </label>

      {err && <p className="mt-4 text-sm text-red-400">{err}</p>}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-amber px-6 py-3.5 font-semibold text-graphite transition-transform hover:-translate-y-0.5"
        >
          Enviar pelo WhatsApp
        </button>
        <button
          type="button"
          onClick={enviarEmail}
          className="inline-flex items-center justify-center rounded-full border border-line px-6 py-3.5 font-semibold text-cream transition-colors hover:border-mut hover:bg-graphite"
        >
          Enviar por e-mail
        </button>
      </div>
      <p className="mt-4 text-sm text-mut">Retorno em até 48h.</p>
    </form>
  );
}
