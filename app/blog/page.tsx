import type { Metadata } from "next";
import ListaBlog from "@/components/blog/ListaBlog";
import { BLOG_PATH, getPosts } from "@/lib/blog";
import { btnPrimary } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Estoque, vendas, carteira de clientes e resultado: como usar os dados que a sua empresa já tem para decidir melhor. Artigos práticos da JOGA.",
  alternates: { canonical: BLOG_PATH },
  openGraph: { type: "website", url: BLOG_PATH, title: "Blog · JOGA Soluções Empresariais" },
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <section className="relative overflow-hidden pt-[72px]">
      <div className="bg-grid mask-radial pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-60" />
      <div className="container-joga relative py-16 md:py-20">
        <span className="eyebrow">Blog</span>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.08] tracking-tight text-cream sm:text-5xl">
          Gestão com dados, <span className="text-amber">na prática</span>.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mut">
          Estoque, vendas, carteira de clientes e resultado — o que olhar, como medir e o que fazer
          com o número. Escrito por quem já esteve do outro lado da mesa.
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
