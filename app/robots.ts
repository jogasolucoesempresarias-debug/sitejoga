import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

// A Cloudflare acrescenta por cima os "content signals" dela; isto aqui é o nosso.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api/diagnostico/", "/api/blog/admin"] },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
