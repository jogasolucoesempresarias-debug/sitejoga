// Constantes da JOGA — fonte única de contatos, links e frases-chave.

export const SITE = {
  name: "JOGA Soluções Empresariais",
  domain: "jogasolucoes.com.br",
  url: "https://jogasolucoes.com.br",
  email: "joga@jogasolucoes.com.br",
  signature: "Descubra qual jogo sua empresa precisa jogar.",
  closing: "Clareza para decidir. Direção para crescer.",
};

export const CONTACT = {
  whatsappNumber: "5528999920221",
  whatsappDisplay: "+55 28 99992-0221",
  instagram: "https://www.instagram.com/jogasolucoes",
  facebook: "https://www.facebook.com/profile.php?id=61590689945998",
};

// Link de WhatsApp com mensagem pré-preenchida
export function waLink(text = "Olá! Vim pelo site da JOGA e quero saber mais sobre as soluções de vocês.") {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

// Base da API do diagnóstico (backend FastAPI joga-diagnostico-api).
// Vazio = mesma origem (produção, atrás do Traefik). Em dev, definir
// NEXT_PUBLIC_API_URL=http://localhost:8000 no .env.local. Como o site é
// export estático, esse valor é embutido no build.
export const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

// Upload de planilha (Fase 2b) — OFF em produção até estar redondo.
// Pra testar localmente: NEXT_PUBLIC_UPLOAD_ATIVO=true no .env.local (embutido no build).
export const UPLOAD_PLANILHA_ATIVO = process.env.NEXT_PUBLIC_UPLOAD_ATIVO === "true";

// Âncoras com "/" na frente para funcionarem de qualquer página (ex.: a partir de
// /diagnostico voltam para a home e rolam até a seção).
export const NAV = [
  { label: "Soluções", href: "/#solucoes" },
  { label: "O que fazemos", href: "/#camadas" },
  { label: "Como trabalhamos", href: "/#metodologia" },
  { label: "Demonstrações", href: "/#demonstracoes" },
  { label: "Sobre", href: "/#autoridade" },
];
