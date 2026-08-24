"use client";

import { useEffect, useState } from "react";
import { CTA } from "@/lib/lp-estoque";

// CTA fixo inferior no mobile (briefing §21).
//
// Só aparece depois que o visitante passou do hero — antes disso ele atrapalha a primeira
// dobra e não tem função. O botão flutuante do WhatsApp é escondido no mobile desta rota
// (ver WhatsAppButton) para os dois não se sobreporem.
export default function CtaMobileFixo() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisivel(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-graphite/95 p-3 backdrop-blur-md transition-transform duration-300 md:hidden ${
        visivel ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href={CTA.mobile.href}
        className="flex w-full items-center justify-center rounded-full bg-amber px-6 py-3.5 font-semibold text-graphite"
      >
        {CTA.mobile.label}
      </a>
    </div>
  );
}
