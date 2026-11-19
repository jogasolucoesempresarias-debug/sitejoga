// Blog — tipos e funções puras. Seguro no navegador (o filtro da lista usa).
// A leitura da API fica em lib/blog.ts, que só roda no build.

import { SITE, SOCIOS, type Socio } from "./site";

export type Post = {
  slug: string;
  titulo: string;
  resumo: string;
  categoria: Categoria;
  autor: "joao" | "gabriel";
  capa: string | null;
  conteudo: string; // HTML sanitizado no backend (nh3)
  publicado_em: string;
  atualizado_em: string;
};

export type Categoria = "estoque" | "vendas" | "clientes" | "financeiro" | "gestao";

export const BLOG_PATH = "/blog/";

export const CATEGORIAS: Record<
  Categoria,
  { nome: string; cta: { texto: string; label: string; href: string } }
> = {
  estoque: {
    nome: "Estoque",
    cta: {
      texto: "Quer saber quanto do seu estoque está parado ou em risco? Responda 12 perguntas e veja o placar na hora.",
      label: "Quero o diagnóstico do meu estoque",
      href: "/solucoes/gestao-de-estoque/#questionario",
    },
  },
  vendas: {
    nome: "Vendas",
    cta: {
      texto: "Veja onde a sua gestão comercial pode render mais com os dados que você já tem.",
      label: "Fazer o diagnóstico gratuito",
      href: "/diagnostico/",
    },
  },
  clientes: {
    nome: "Clientes",
    cta: {
      texto: "Descubra quantos clientes estão deixando de comprar — e quais recuperar primeiro.",
      label: "Fazer o diagnóstico gratuito",
      href: "/diagnostico/",
    },
  },
  financeiro: {
    nome: "Financeiro",
    cta: {
      texto: "Veja se o seu resultado, a inadimplência e o caixa estão sob controle.",
      label: "Fazer o diagnóstico gratuito",
      href: "/diagnostico/",
    },
  },
  gestao: {
    nome: "Gestão",
    cta: {
      texto: "Descubra onde a sua empresa pode melhorar com os dados que já possui.",
      label: "Fazer o diagnóstico gratuito",
      href: "/diagnostico/",
    },
  },
};

export function autorDe(p: Post): Socio {
  return SOCIOS.find((s) => s.chave === p.autor) ?? SOCIOS[0];
}

export function minutosDeLeitura(html: string): number {
  const palavras = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(palavras / 200));
}

export function dataBR(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "America/Sao_Paulo",
  });
}

/** Mesma categoria primeiro, depois os mais recentes. */
export function relacionados(p: Post, todos: Post[], n = 3): Post[] {
  const outros = todos.filter((o) => o.slug !== p.slug);
  return [
    ...outros.filter((o) => o.categoria === p.categoria),
    ...outros.filter((o) => o.categoria !== p.categoria),
  ].slice(0, n);
}

/** URL absoluta (OG image / JSON-LD exigem). */
export function absoluta(caminho: string): string {
  return caminho.startsWith("http") ? caminho : SITE.url + caminho;
}
