// Blog — artigos, assuntos, autores e o cabeçalho moram no backend (joga-diagnostico-api) e são
// lidos AQUI, NO BUILD, numa chamada só (GET /api/blog/site). O site continua 100% estático:
// salvar no /admin/blog dispara a GitHub Action, que reconstrói o site.
//
// Se a API não responder no build, o build FALHA de propósito — melhor manter no ar o site
// anterior do que publicar um site sem os artigos. Para buildar sem backend (ex.: mexer só no
// visual), BLOG_OFFLINE=true no .env.local.

import http from "node:http";
import https from "node:https";
import type { Autor, Cta, PaginaBlog, Post } from "./blog-comum";
import { SITE } from "./site";

export * from "./blog-comum";

/** De onde o build lê. Produção: a própria API pública. */
const API = (process.env.BLOG_API_URL ?? SITE.url).replace(/\/$/, "");
/** Prefixo das imagens no HTML gerado. Vazio em produção (mesma origem); no teste local,
 *  aponta pro backend local, já que o servidor estático do /out não tem /api. */
const ASSET = (process.env.BLOG_ASSET_ORIGIN ?? "").replace(/\/$/, "");

const PAGINA_OFFLINE: PaginaBlog = {
  titulo: "Gestão com dados, na prática.",
  destaque: "na prática",
  subtitulo: "Artigos da JOGA.",
};
const CTA_RESERVA: Cta = {
  texto: "Descubra onde a sua empresa pode melhorar com os dados que já possui.",
  label: "Fazer o diagnóstico gratuito",
  href: "/diagnostico/",
};

type Resposta = {
  pagina: PaginaBlog;
  categorias: { chave: string; nome: string; cta_texto: string; cta_label: string; cta_href: string }[];
  autores: Autor[];
  posts: (Omit<Post, "categoriaNome" | "cta" | "autorInfo">)[];
};
type Dados = { pagina: PaginaBlog; posts: Post[] };

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

/** Imagem que mora no backend ganha o prefixo do teste local; /socios/... é arquivo do site. */
const img = (u: string) => (u.startsWith("/api/blog/img/") ? ASSET + u : u);

async function buscar(): Promise<Dados> {
  if (process.env.BLOG_OFFLINE === "true") return { pagina: PAGINA_OFFLINE, posts: [] };
  const url = `${API}/api/blog/site`;
  let r: Resposta;
  try {
    r = (await lerJson(url)) as Resposta;
  } catch (e) {
    throw new Error(`[blog] não consegui ler ${url} (${e}). Para buildar sem backend: BLOG_OFFLINE=true`);
  }
  if (!r || !Array.isArray(r.posts)) throw new Error(`[blog] ${url} veio num formato inesperado`);

  const cats = new Map(r.categorias.map((c) => [c.chave, c]));
  const autores = new Map(r.autores.map((a) => [a.chave, a]));
  const autorReserva = r.autores[0] ?? { chave: "", nome: "JOGA", papel: "", bio: "", foto: "" };

  const posts: Post[] = r.posts.map((p) => {
    const c = cats.get(p.categoria);
    const a = autores.get(p.autor) ?? autorReserva;
    return {
      ...p,
      categoriaNome: c?.nome ?? "Artigo",
      cta: c ? { texto: c.cta_texto || CTA_RESERVA.texto, label: c.cta_label, href: c.cta_href } : CTA_RESERVA,
      autorInfo: { ...a, foto: a.foto ? img(a.foto) : "" },
      capa: p.capa ? img(p.capa) : null,
      conteudo: ASSET ? p.conteudo.replaceAll('src="/api/blog/img/', `src="${ASSET}/api/blog/img/`) : p.conteudo,
    };
  });
  return { pagina: r.pagina, posts };
}

let cache: Promise<Dados> | null = null;
function dados(): Promise<Dados> {
  cache ??= buscar();
  return cache;
}

/** Todos os artigos publicados, do mais novo para o mais antigo (1 leitura por build). */
export async function getPosts(): Promise<Post[]> {
  return (await dados()).posts;
}

export async function getPost(slug: string): Promise<Post | undefined> {
  return (await getPosts()).find((p) => p.slug === slug);
}

/** Cabeçalho da página /blog (editado pelo João). */
export async function getPagina(): Promise<PaginaBlog> {
  return (await dados()).pagina;
}
