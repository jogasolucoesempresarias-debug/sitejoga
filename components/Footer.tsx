import { SITE, CONTACT, NAV, waLink } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="container-joga grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/joga-logo-dark.svg" alt="JOGA" className="h-8 w-auto" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-mut">
            Construímos a camada de inteligência das empresas — da engenharia de dados à IA
            aplicada à gestão.
          </p>
          <p className="mt-4 font-display text-sm font-medium text-amber">{SITE.closing}</p>
        </div>

        <div>
          <h4 className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-mut">
            Navegação
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-cream/80 transition-colors hover:text-amber">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-mut">
            Contato
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="text-cream/80 hover:text-amber">
                WhatsApp {CONTACT.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="text-cream/80 hover:text-amber">
                {SITE.email}
              </a>
            </li>
            <li>
              <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="text-cream/80 hover:text-amber">
                Instagram @jogasolucoes
              </a>
            </li>
            <li>
              <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" className="text-cream/80 hover:text-amber">
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-joga flex flex-col items-center justify-between gap-2 py-5 text-xs text-mut sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}. Todos os direitos reservados.</p>
          <a href="/politica-privacidade" className="hover:text-cream">
            Política de Privacidade
          </a>
        </div>
      </div>
    </footer>
  );
}
