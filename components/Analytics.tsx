"use client";

import Script from "next/script";
import { useEffect } from "react";
import { GA_ID } from "@/lib/site";
import { evento } from "@/lib/analytics";

// GA4 + cliques que importam, sem espalhar código pelos componentes:
// - qualquer link para wa.me            → "contato_whatsapp"
// - qualquer elemento com data-evento=X → X
// Os leads (diagnóstico concluído) são marcados no próprio formulário ("generate_lead").
export default function Analytics() {
  useEffect(() => {
    if (!GA_ID) return;
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest("a, button") as HTMLElement | null;
      if (!el) return;
      const nome = el.dataset.evento;
      if (nome) evento(nome, { pagina: location.pathname, rotulo: el.textContent?.trim().slice(0, 80) });
      const href = el.getAttribute("href") ?? "";
      if (href.startsWith("https://wa.me/")) evento("contato_whatsapp", { pagina: location.pathname });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  if (!GA_ID) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  );
}
