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

// Google Analytics 4 — ID de medição (G-XXXXXXX). Não é segredo: vai no HTML de qualquer jeito.
// Vazio = o script do GA nem carrega. NEXT_PUBLIC_GA_ID no .env.local sobrepõe (teste local).
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

// Sócios — usados na seção "Quem faz a JOGA" e como autores do blog.
export type Socio = { chave: "joao" | "gabriel"; nome: string; papel: string; bio: string; foto: string };

export const SOCIOS: Socio[] = [
  {
    chave: "joao",
    nome: "João Victor",
    papel: "Negócio · Comercial e Compras",
    foto: "/socios/joao.jpeg",
    bio: "Mais de 15 anos nas áreas comercial e de compras — vendas, gestão de equipes, atacado distribuidor e varejo supermercadista. Domínio de indicadores, rentabilidade, carteira de clientes, estoque e Business Intelligence. Traduz o jogo do cliente em prioridade de negócio.",
  },
  {
    chave: "gabriel",
    nome: "Gabriel França",
    papel: "Desenvolvedor · Sistemas, Dados e IA",
    foto: "/socios/gabriel.jpeg",
    bio: "Desenvolvedor JOGA. Cria os sistemas de ponta a ponta — banco de dados, back-end, integrações entre ERPs e planilhas, automações e agentes de Inteligência Artificial que rodam no dia a dia das empresas. Transforma dados dispersos em estruturas confiáveis e constrói a base que sustenta o jogo.",
  },
];

// Âncoras com "/" na frente para funcionarem de qualquer página (ex.: a partir de
// /diagnostico voltam para a home e rolam até a seção).
export const NAV = [
  { label: "Soluções", href: "/#solucoes" },
  { label: "O que fazemos", href: "/#camadas" },
  { label: "Como trabalhamos", href: "/#metodologia" },
  { label: "Demonstrações", href: "/#demonstracoes" },
  { label: "Sobre", href: "/#autoridade" },
];

/** Menu com o link do Blog — só entra quando há ao menos um artigo publicado. */
export function navCom(temBlog: boolean) {
  return temBlog ? [...NAV, { label: "Blog", href: "/blog/" }] : NAV;
}
