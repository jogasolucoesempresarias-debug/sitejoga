// Blog — tipos e funções puras. Seguro no navegador (o filtro da lista usa).
// A leitura da API fica em lib/blog.ts, que só roda no build.
//
// Assuntos, autores e o cabeçalho da página são cadastrados pelo João no /admin/blog — nada
// disso mora mais no código. O build junta tudo em cada Post (categoriaNome, cta, autorInfo).

import { SITE } from "./site";

export type Autor = { chave: string; nome: string; papel: string; bio: string; foto: string };
export type Cta = { texto: string; label: string; href: string };

export type Post = {
  slug: string;
  titulo: string;
  resumo: string;
  categoria: string;
  categoriaNome: string;
  cta: Cta;
  autor: string;
  autorInfo: Autor;
  capa: string | null;
  conteudo: string; // HTML sanitizado no backend (nh3)
  publicado_em: string;
  atualizado_em: string;
};

export type PaginaBlog = { titulo: string; destaque: string; subtitulo: string };

export const BLOG_PATH = "/blog/";

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

/** Mesmo assunto primeiro, depois os mais recentes. */
export function relacionados(p: Post, todos: Post[], n = 3): Post[] {
  const outros = todos.filter((o) => o.slug !== p.slug);
  return [
    ...outros.filter((o) => o.categoria === p.categoria),
    ...outros.filter((o) => o.categoria !== p.categoria),
  ].slice(0, n);
}

/** Título do cabeçalho partido em volta do trecho em laranja (se o trecho existir no título). */
export function partesDoTitulo(p: PaginaBlog): [string, string, string] {
  const i = p.destaque ? p.titulo.indexOf(p.destaque) : -1;
  if (i < 0) return [p.titulo, "", ""];
  return [p.titulo.slice(0, i), p.destaque, p.titulo.slice(i + p.destaque.length)];
}

/** URL absoluta (OG image / JSON-LD exigem). */
export function absoluta(caminho: string): string {
  return caminho.startsWith("http") ? caminho : SITE.url + caminho;
}
