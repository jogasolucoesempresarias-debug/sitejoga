import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como a JOGA Soluções Empresariais trata os dados coletados pelo site.",
};

export default function PoliticaPage() {
  return (
    <section className="pt-[72px]">
      <div className="container-joga py-16 md:py-24">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display text-3xl font-bold tracking-tight text-cream sm:text-4xl">
            Política de Privacidade
          </h1>
          <p className="mt-3 text-sm text-mut">Última atualização: {new Date().getFullYear()}</p>

          <div className="prose-joga mt-8 space-y-6 text-[15px] leading-relaxed text-mut">
            <Bloco titulo="1. Quem somos">
              A {SITE.name} ({SITE.domain}) oferece soluções de inteligência de negócios, dados,
              automação e Inteligência Artificial. Este documento explica como tratamos os dados
              informados por você neste site.
            </Bloco>
            <Bloco titulo="2. Dados que coletamos">
              Coletamos apenas os dados que você informa voluntariamente nos formulários de contato e
              diagnóstico — como nome, empresa, cargo, telefone/WhatsApp, e-mail, setor, sistema
              utilizado e a descrição do seu desafio —, além das suas respostas ao questionário do
              diagnóstico (usadas para calcular o seu placar de maturidade). Opcionalmente, se você
              escolher, uma planilha de vendas que enviar para uma análise mais aprofundada.
            </Bloco>
            <Bloco titulo="3. Como usamos">
              Usamos esses dados exclusivamente para responder ao seu contato, realizar o diagnóstico
              solicitado e apresentar propostas de solução. Não vendemos nem compartilhamos seus dados
              com terceiros para fins de marketing.
            </Bloco>
            <Bloco titulo="4. Base legal (LGPD)">
              O tratamento se dá com base no seu consentimento e no legítimo interesse de responder a
              uma solicitação comercial iniciada por você, conforme a Lei nº 13.709/2018 (LGPD).
            </Bloco>
            <Bloco titulo="5. Seus direitos">
              Você pode solicitar a qualquer momento o acesso, a correção ou a exclusão dos seus dados,
              bem como revogar o consentimento, pelo e-mail{" "}
              <a href={`mailto:${SITE.email}`} className="text-amber underline">
                {SITE.email}
              </a>
              .
            </Bloco>
            <Bloco titulo="6. Retenção e segurança">
              Mantemos os dados apenas pelo tempo necessário ao atendimento e adotamos medidas
              razoáveis para protegê-los. Arquivos enviados para análise são descartados após a
              conclusão do diagnóstico.
            </Bloco>
            <Bloco titulo="7. Contato">
              Dúvidas sobre esta política? Fale conosco em{" "}
              <a href={`mailto:${SITE.email}`} className="text-amber underline">
                {SITE.email}
              </a>
              .
            </Bloco>
          </div>
        </div>
      </div>
    </section>
  );
}

function Bloco({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-lg font-semibold text-cream">{titulo}</h2>
      <p className="mt-2">{children}</p>
    </div>
  );
}
