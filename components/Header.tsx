"use client";

import { useEffect, useState } from "react";
import { NAV } from "@/lib/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-line bg-graphite/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="container-joga flex h-[72px] items-center justify-between gap-6">
        <a href="/#top" className="flex items-center" aria-label="JOGA — início">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/joga-logo-dark.svg" alt="JOGA Soluções Empresariais" className="h-7 w-auto" />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm text-mut transition-colors hover:text-cream"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/diagnostico"
            className="hidden rounded-full bg-amber px-4 py-2 text-sm font-semibold text-graphite transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            Diagnóstico gratuito
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line text-cream md:hidden"
            aria-label="Menu"
          >
            <span className="text-lg leading-none">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-graphite md:hidden">
          <nav className="container-joga flex flex-col py-3">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-2 text-sm text-mut hover:text-cream"
              >
                {n.label}
              </a>
            ))}
            <a
              href="/diagnostico"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-amber px-4 py-2 text-center text-sm font-semibold text-graphite"
            >
              Diagnóstico gratuito
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
