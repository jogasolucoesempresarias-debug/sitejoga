import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Analytics from "@/components/Analytics";
import { getPosts } from "@/lib/blog";
import { SITE } from "@/lib/site";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "JOGA Soluções Empresariais — Clareza para decidir. Direção para crescer.",
    template: "%s · JOGA Soluções Empresariais",
  },
  description:
    "Construímos a camada de inteligência das empresas — da engenharia de dados à IA aplicada à gestão. Soluções para Gestão de Vendas, Gestão de Clientes e Gestão de Estoque.",
  keywords: [
    "business intelligence",
    "engenharia de dados",
    "automação",
    "inteligência artificial",
    "gestão comercial",
    "gestão de estoque",
    "carteira de clientes",
    "Power BI",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE.url,
    siteName: SITE.name,
    title: "JOGA Soluções Empresariais",
    description:
      "Transformamos dados dispersos em informações estratégicas para decisões mais rápidas, seguras e lucrativas.",
    images: [{ url: "/brand/joga-avatar-dark.png", width: 1024, height: 1024, alt: "JOGA" }],
  },
  icons: {
    icon: [{ url: "/brand/joga-mark.svg", type: "image/svg+xml" }],
    apple: "/brand/joga-avatar-light.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // O link "Blog" só aparece no menu quando já existe artigo publicado.
  const temBlog = (await getPosts()).length > 0;
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-screen bg-graphite text-cream antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <Header temBlog={temBlog} />
        <main>{children}</main>
        <Footer temBlog={temBlog} />
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  );
}
