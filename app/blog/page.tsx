import type { Metadata } from "next";
import ListaBlog from "@/components/blog/ListaBlog";
import { BLOG_PATH, getPagina, getPosts, partesDoTitulo } from "@/lib/blog";
import { btnPrimary } from "@/lib/ui";

// Título e texto vêm do "Cabeçalho do blog" do /admin/blog.
export async function generateMetadata(): Promise<Metadata> {
  const pagina = await getPagina();
  return {
    title: "Blog",
    description: pagina.subtitulo,
    alternates: { canonical: BLOG_PATH },
    openGraph: { type: "website", url: BLOG_PATH, title: "Blog · JOGA Soluções Empresariais", description: pagina.subtitulo },
  };
}

export default async function BlogPage() {
  const [posts, pagina] = await Promise.all([getPosts(), getPagina()]);
  const [antes, destaque, depois] = partesDoTitulo(pagina);

  return (
    <section className="relative overflow-hidden pt-[72px]">
      <div className="bg-grid mask-radial pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-60" />
      <div className="container-joga relative py-16 md:py-20">
        <span className="eyebrow">Blog</span>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.08] tracking-tight text-cream sm:text-5xl">
          {antes}
          {destaque && <span className="text-amber">{destaque}</span>}
          {depois}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mut">
          {pagina.subtitulo}
        </p>

        {posts.length ? (
          <ListaBlog posts={posts} />
        ) : (
          <div className="mt-12 rounded-2xl border border-dashed border-line bg-surface/40 p-10 text-center">
            <p className="text-lg text-cream">Os primeiros artigos estão chegando.</p>
            <p className="mt-2 text-mut">Enquanto isso, veja onde a sua empresa pode melhorar.</p>
            <a href="/diagnostico/" className={`${btnPrimary} mt-6`}>
              Fazer o diagnóstico gratuito
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
