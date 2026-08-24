// Classes de UI compartilhadas — nasceram dentro do DiagnosticoWizard e agora servem
// também a LP de Gestão de Estoque. Fonte única para os botões não divergirem entre páginas.

export const btnPrimary =
  "inline-flex items-center justify-center rounded-full bg-amber px-6 py-3.5 font-semibold text-graphite transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0";

export const btnGhost =
  "inline-flex items-center justify-center rounded-full border border-line px-6 py-3.5 font-semibold text-cream transition-colors hover:border-mut hover:bg-graphite";

export const field =
  "w-full rounded-lg border border-line bg-graphite px-4 py-3 text-sm text-cream placeholder:text-mut/60 outline-none focus:border-amber";

export const labelCls = "mb-1.5 block text-sm font-medium text-cream/90";
