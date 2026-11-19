// Blog — os artigos moram no backend (joga-diagnostico-api, tabela blog_posts) e são lidos
// AQUI, NO BUILD. O site continua 100% estático: publicar no /admin/blog dispara a GitHub
// Action, que reconstrói o site com o artigo novo.
//
// Se a API não responder no build, o build FALHA de propósito — melhor manter no ar o site
// anterior do que publicar um site sem os artigos. Para buildar sem backend (ex.: mexer só no
// visual), BLOG_OFFLINE=true no .env.local.

import { CATEGORIAS, type Post } from "./blog-comum";
import http from "node:http";
import https from "node:https";
import { SITE } from "./site";

export * from "./blog-comum";

/** De onde o build lê os artigos. Produção: a própria API pública. */
const API = (process.env.BLOG_API_URL ?? SITE.url).replace(/\/$/, "");
/** Prefixo das imagens no HTML gerado. Vazio em produção (mesma origem); no teste local,
 *  aponta pro backend local, já que o servidor estático do /out não tem /api. */
const ASSET = (process.env.BLOG_ASSET_ORIGIN ?? "").replace(/\/$/, "");

let cache: Promise<Post[]> | null = null;

// HTTP direto do Node, de propósito: o `fetch` do Next ou vira rota dinâmica (no-store, que o
// export estático recusa) ou guarda cache entre builds (force-cache → artigo novo não entra).
async function lerJson(url: string): Promise<unknown> {
  const get = url.startsWith("https:") ? https.get : http.get;
  return new Promise((resolve, reject) => {
    const req = get(url, { timeout: 20_000 }, (res: http.IncomingMessage) => {
      if (res.statusCode !== 200) {
        res.resume();
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }
      let corpo = "";
      res.setEncoding("utf8");
      res.on("data", (c: string) => (corpo += c));
      res.on("end", () => {
        try {
          resolve(JSON.parse(corpo));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on("timeout", () => req.destroy(new Error("timeout")));
    req.on("error", reject);
  });
}

async function buscar(): Promise<Post[]> {
  if (process.env.BLOG_OFFLINE === "true") return [];
  const url = `${API}/api/blog/posts`;
  let posts: Post[];
  try {
    posts = (await lerJson(url)) as Post[];
  } catch (e) {
    throw new Error(`[blog] não consegui ler ${url} (${e}). Para buildar sem backend: BLOG_OFFLINE=true`);
  }
  if (!Array.isArray(posts)) throw new Error(`[blog] ${url} não devolveu uma lista`);
  return posts.map((p) => ({
    ...p,
    categoria: p.categoria in CATEGORIAS ? p.categoria : "gestao",
    capa: p.capa ? ASSET + p.capa : null,
    conteudo: ASSET ? p.conteudo.replaceAll('src="/api/blog/img/', `src="${ASSET}/api/blog/img/`) : p.conteudo,
  }));
}

/** Todos os artigos publicados, do mais novo para o mais antigo (1 leitura por build). */
export function getPosts(): Promise<Post[]> {
  cache ??= buscar();
  return cache;
}

export async function getPost(slug: string): Promise<Post | undefined> {
  return (await getPosts()).find((p) => p.slug === slug);
}

