// Eventos do Google Analytics 4. Sem GA_ID (ou com bloqueador de anúncio) vira no-op.

type Gtag = (cmd: "event", nome: string, params?: Record<string, unknown>) => void;

export function evento(nome: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  gtag?.("event", nome, params);
}
