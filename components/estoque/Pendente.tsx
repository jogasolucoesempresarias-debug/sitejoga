import { LP_DRAFT } from "@/lib/lp-estoque";

// Marcador de decisão em aberto. Só aparece com NEXT_PUBLIC_LP_DRAFT=true no .env.local
// (mesma convenção do UPLOAD_PLANILHA_ATIVO) — nunca vai para produção.
//
// Existe porque página pronta cria ilusão de decidido: sem os marcadores, rascunho passa
// a ser lido como final e as decisões pendentes somem da conversa.
export default function Pendente({ children }: { children: React.ReactNode }) {
  if (!LP_DRAFT) return null;
  return (
    <div className="my-4 rounded-xl border border-dashed border-amber/50 bg-amber/5 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-amber">Decisão em aberto</p>
      <p className="mt-1 text-sm leading-relaxed text-cream/80">{children}</p>
    </div>
  );
}
