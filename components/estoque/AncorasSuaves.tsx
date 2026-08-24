"use client";

import { useEffect } from "react";

/**
 * Rolagem de âncora confiável para a LP.
 *
 * A página tem quatro CTAs apontando para a MESMA âncora (#questionario). O navegador só rola
 * quando o fragmento MUDA: no segundo clique, como a URL já está em #questionario, ele ignora
 * e o botão parece quebrado — o visitante clica num botão âmbar enorme e nada acontece.
 *
 * Solução: um único listener delegado no documento (em vez de mexer nos cinco componentes que
 * renderizam CTA) que assume a rolagem e mantém o hash na URL para o link continuar
 * compartilhável. Respeita prefers-reduced-motion e não interfere em cliques com modificador
 * (ctrl/cmd/meio = abrir em nova aba).
 */
export default function AncorasSuaves() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }
      const alvo = (e.target as HTMLElement | null)?.closest?.("a");
      if (!alvo) return;

      const href = alvo.getAttribute("href");
      if (!href || !href.startsWith("#") || href === "#") return;

      const destino = document.getElementById(href.slice(1));
      if (!destino) return;

      e.preventDefault();
      const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      destino.scrollIntoView({ behavior: reduzir ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", href);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
