import type { Metadata } from "next";
import { LP_ESTOQUE_PATH } from "@/lib/lp-estoque";
import HeroEstoque from "@/components/estoque/HeroEstoque";
import QuatroProblemas from "@/components/estoque/QuatroProblemas";
import ErpVsJoga from "@/components/estoque/ErpVsJoga";
import FluxoValor from "@/components/estoque/FluxoValor";
import Pilares from "@/components/estoque/Pilares";
import ConsultorConectado from "@/components/estoque/ConsultorConectado";
import DemosEstoque from "@/components/estoque/DemosEstoque";
import ComoFunciona from "@/components/estoque/ComoFunciona";
import QuizEstoque from "@/components/estoque/QuizEstoque";
import CaseCompleto from "@/components/estoque/CaseCompleto";
import CtaFinal from "@/components/estoque/CtaFinal";
import CtaMobileFixo from "@/components/estoque/CtaMobileFixo";
import AncorasSuaves from "@/components/estoque/AncorasSuaves";

export const metadata: Metadata = {
  // `absolute` escapa do template global "%s · JOGA Soluções Empresariais" (app/layout.tsx).
  title: { absolute: "Gestão de Estoque | JOGA Soluções Empresariais" },
  description:
    "Transforme dados de estoque em decisões. Controle excessos, rupturas, validade, cobertura, compras, fornecedores e capital parado com a Gestão de Estoque JOGA.",
  // O site usa trailingSlash: sem canonical explícito a mesma página existe em duas formas.
  alternates: { canonical: LP_ESTOQUE_PATH },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: LP_ESTOQUE_PATH,
    title: "Gestão de Estoque | JOGA Soluções Empresariais",
    description:
      "Excessos, rupturas, produtos parados, risco de validade e oportunidades de compra — identificados e priorizados a partir dos dados que a sua empresa já tem.",
    // TODO: OG própria (print do cockpit). Hoje herda o avatar da marca do layout.
  },
};

export default function GestaoEstoquePage() {
  return (
    <>
      <HeroEstoque />
      <QuatroProblemas />
      <ErpVsJoga />
      <FluxoValor />
      <Pilares />
      <ConsultorConectado />
      <DemosEstoque />
      <ComoFunciona />
      <QuizEstoque />
      <CaseCompleto />
      <CtaFinal />
      <CtaMobileFixo />
      <AncorasSuaves />
    </>
  );
}
