import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/blog";
import { SITE } from "@/lib/site";

// Export estático: o sitemap.xml é gerado no build, com os artigos publicados naquele momento.
export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const u = (p: string) => `${SITE.url}${p}`;
  const ultimoPost = posts[0]?.atualizado_em;

  return [
    { url: u("/"), changeFrequency: "monthly", priority: 1 },
    { url: u("/solucoes/gestao-de-estoque/"), changeFrequency: "monthly", priority: 0.9 },
    { url: u("/diagnostico/"), changeFrequency: "monthly", priority: 0.8 },
    ...(posts.length
      ? [
          { url: u("/blog/"), lastModified: ultimoPost, changeFrequency: "weekly" as const, priority: 0.7 },
          ...posts.map((p) => ({
            url: u(`/blog/${p.slug}/`),
            lastModified: p.atualizado_em,
            changeFrequency: "monthly" as const,
            priority: 0.6,
          })),
        ]
      : []),
    { url: u("/politica-privacidade/"), changeFrequency: "yearly", priority: 0.2 },
  ];
}
