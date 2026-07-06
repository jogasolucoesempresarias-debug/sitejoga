import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",            // gera site estático em /out (servido por nginx)
  images: { unoptimized: true },
  trailingSlash: true,         // cada rota vira pasta/index.html (bom p/ nginx)
};

export default nextConfig;
