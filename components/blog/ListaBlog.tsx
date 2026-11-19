"use client";

import { useState } from "react";
import CardPost from "./CardPost";
import { CATEGORIAS, type Categoria, type Post } from "@/lib/blog-comum";

// Filtro por assunto no próprio navegador — todos os artigos já vêm no HTML (bom p/ Google).
export default function ListaBlog({ posts }: { posts: Post[] }) {
  const [filtro, setFiltro] = useState<Categoria | null>(null);
  const presentes = (Object.keys(CATEGORIAS) as Categoria[]).filter((c) =>
    posts.some((p) => p.categoria === c)
  );
  const visiveis = filtro ? posts.filter((p) => p.categoria === filtro) : posts;
  const [primeiro, ...resto] = visiveis;

  const chip = (ativo: boolean) =>
    `rounded-full border px-4 py-1.5 text-sm transition-colors ${
      ativo ? "border-amber bg-amber text-graphite font-semibold" : "border-line text-mut hover:border-mut hover:text-cream"
    }`;

  return (
    <>
      {presentes.length > 1 && (
        <div className="mt-10 flex flex-wrap gap-2">
          <button className={chip(filtro === null)} onClick={() => setFiltro(null)}>
            Todos
          </button>
          {presentes.map((c) => (
            <button key={c} className={chip(filtro === c)} onClick={() => setFiltro(c)}>
              {CATEGORIAS[c].nome}
            </button>
          ))}
        </div>
      )}

      <div className="mt-8">
        {primeiro && <CardPost post={primeiro} destaque />}
        {resto.length > 0 && (
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {resto.map((p) => (
              <CardPost key={p.slug} post={p} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
