import { dataBR, minutosDeLeitura, type Post } from "@/lib/blog-comum";

// Card de artigo: lista do blog e "continue lendo". `destaque` = o mais recente, largo.
export default function CardPost({ post, destaque = false }: { post: Post; destaque?: boolean }) {
  const href = `/blog/${post.slug}/`;
  return (
    <a
      href={href}
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-amber/50 ${
        destaque ? "md:grid md:grid-cols-[1.25fr_1fr]" : ""
      }`}
    >
      <div className={`relative overflow-hidden bg-surface-2 ${destaque ? "aspect-[16/9] md:aspect-auto md:min-h-[320px]" : "aspect-[16/9]"}`}>
        {post.capa ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.capa}
            alt=""
            loading={destaque ? "eager" : "lazy"}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="bg-grid absolute inset-0 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/joga-mark.svg" alt="" className="h-12 w-12 opacity-40" />
          </div>
        )}
      </div>
      <div className={`flex flex-1 flex-col ${destaque ? "p-7 md:p-9" : "p-6"}`}>
        <span className="eyebrow">{post.categoriaNome}</span>
        <h3
          className={`mt-3 font-display font-semibold leading-snug text-cream transition-colors group-hover:text-amber ${
            destaque ? "text-2xl md:text-3xl" : "text-lg"
          }`}
        >
          {post.titulo}
        </h3>
        <p className={`mt-3 leading-relaxed text-mut ${destaque ? "text-base" : "line-clamp-3 text-[15px]"}`}>
          {post.resumo}
        </p>
        <p className="mt-auto pt-5 text-xs text-mut">
          {dataBR(post.publicado_em)} · {minutosDeLeitura(post.conteudo)} min de leitura
        </p>
      </div>
    </a>
  );
}
