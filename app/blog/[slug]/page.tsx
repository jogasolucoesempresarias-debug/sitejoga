import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CardPost from "@/components/blog/CardPost";
import {
  absoluta,
  dataBR,
  getPost,
  getPosts,
  minutosDeLeitura,
  relacionados,
} from "@/lib/blog";
import { SITE, waLink } from "@/lib/site";
import { btnGhost, btnPrimary } from "@/lib/ui";

// Site estático: só existem as páginas dos artigos publicados no momento do build.
export const dynamicParams = false;

// Placeholder quando ainda não há artigo: o export estático exige ao menos uma rota
// gerada para um segmento dinâmico. A página dele responde 404 (notFound) e fica fora do sitemap.
const SEM_POSTS = "_sem-artigos";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: SEM_POSTS }];
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { robots: { index: false } };
  const url = `/blog/${post.slug}/`;
  return {
    title: { absolute: `${post.titulo} | Blog JOGA` },
    description: post.resumo,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.titulo,
      description: post.resumo,
      publishedTime: post.publicado_em,
      modifiedTime: post.atualizado_em,
      authors: [post.autorInfo.nome],
      ...(post.capa ? { images: [{ url: absoluta(post.capa) }] } : {}),
    },
    twitter: { card: post.capa ? "summary_large_image" : "summary" },
  };
}

export default async function ArtigoPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const todos = await getPosts();
  const autor = post.autorInfo;
  const cta = post.cta;
  const mais = relacionados(post, todos);

  // Dados estruturados (Google entende autor, data e imagem do artigo).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.titulo,
    description: post.resumo,
    datePublished: post.publicado_em,
    dateModified: post.atualizado_em,
    mainEntityOfPage: absoluta(`/blog/${post.slug}/`),
    ...(post.capa ? { image: absoluta(post.capa) } : {}),
    author: { "@type": "Person", name: autor.nome, jobTitle: autor.papel },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: absoluta("/brand/joga-avatar-dark.png") },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <article className="pt-[72px]">
        <header className="container-joga max-w-[820px] pt-12 md:pt-16">
          <nav className="text-sm text-mut" aria-label="Você está em">
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/blog/" className="hover:text-cream">
              Blog
            </a>
            <span className="mx-2">›</span>
            <span className="text-amber">{post.categoriaNome}</span>
          </nav>

          <h1 className="mt-5 font-display text-[2rem] font-bold leading-[1.1] tracking-tight text-cream sm:text-5xl">
            {post.titulo}
          </h1>
          {post.resumo && <p className="mt-5 text-lg leading-relaxed text-mut sm:text-xl">{post.resumo}</p>}

          <div className="mt-7 flex items-center gap-3 border-y border-line py-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={autor.foto}
              alt={autor.nome}
              className="h-11 w-11 flex-none rounded-full object-cover object-top ring-2 ring-amber/40"
            />
            <div className="text-sm">
              <p className="font-semibold text-cream">{autor.nome}</p>
              <p className="text-mut">
                {dataBR(post.publicado_em)} · {minutosDeLeitura(post.conteudo)} min de leitura
              </p>
            </div>
          </div>
        </header>

        {post.capa && (
          <div className="container-joga mt-8 max-w-[980px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.capa} alt="" className="w-full rounded-2xl border border-line" />
          </div>
        )}

        <div className="container-joga max-w-[820px]">
          {/* HTML sanitizado no backend (nh3: tags e atributos em lista branca). */}
          <div className="prosa mt-10" dangerouslySetInnerHTML={{ __html: post.conteudo }} />

          {/* CTA do assunto do artigo */}
          <aside className="mt-14 overflow-hidden rounded-2xl border border-amber/30 bg-gradient-to-br from-surface to-graphite p-8 md:p-10">
            <span className="eyebrow">Diagnóstico gratuito</span>
            <p className="mt-4 font-display text-xl font-semibold leading-snug text-cream sm:text-2xl">
              {cta.texto}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={cta.href} className={btnPrimary} data-evento="cta_blog">
                {cta.label}
              </a>
              <a
                href={waLink(`Olá! Li o artigo "${post.titulo}" no blog da JOGA e quero conversar.`)}
                target="_blank"
                rel="noopener noreferrer"
                className={btnGhost}
              >
                Falar no WhatsApp
              </a>
            </div>
          </aside>

          {/* Autor */}
          <div className="mt-10 flex gap-4 rounded-2xl border border-line bg-surface p-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={autor.foto}
              alt=""
              className="h-14 w-14 flex-none rounded-full object-cover object-top ring-2 ring-amber/40"
            />
            <div>
              <p className="font-display font-semibold text-cream">{autor.nome}</p>
              <p className="text-sm text-amber">{autor.papel}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-mut">{autor.bio}</p>
            </div>
          </div>
        </div>

        {mais.length > 0 && (
          <section className="container-joga mt-20 pb-6">
            <h2 className="font-display text-2xl font-bold text-cream">Continue lendo</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {mais.map((p) => (
                <CardPost key={p.slug} post={p} />
              ))}
            </div>
          </section>
        )}
        <div className="pb-20 md:pb-28" />
      </article>
    </>
  );
}
