import Reveal from "./Reveal";

type Socio = { nome: string; papel: string; bio: string; foto?: string };

const socios: Socio[] = [
  {
    nome: "João Victor",
    papel: "Negócio · Comercial e Compras",
    foto: "/socios/joao.jpeg",
    bio: "Mais de 15 anos nas áreas comercial e de compras — vendas, gestão de equipes, atacado distribuidor e varejo supermercadista. Domínio de indicadores, rentabilidade, carteira de clientes, estoque e Business Intelligence. Traduz o jogo do cliente em prioridade de negócio.",
  },
  {
    nome: "Gabriel França",
    papel: "Desenvolvedor · Sistemas, Dados e IA",
    foto: "/socios/gabriel.png",
    bio: "Desenvolvedor JOGA. Cria os sistemas de ponta a ponta — banco de dados, back-end, integrações entre ERPs e planilhas, automações e agentes de Inteligência Artificial que rodam no dia a dia das empresas. Transforma dados dispersos em estruturas confiáveis e constrói a base que sustenta o jogo.",
  },
];

export default function Autoridade() {
  return (
    <section id="autoridade" className="py-20 md:py-28">
      <div className="container-joga">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <Reveal>
            <span className="eyebrow">Quem faz a JOGA</span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-cream sm:text-4xl">
              Experiência de quem já esteve do outro lado da mesa.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-mut">
              A JOGA nasceu da vivência prática de profissionais das áreas comercial, compras,
              logística e gestão. Ao longo das suas trajetórias, acompanharam de perto os impactos da
              falta de informação, integração e acompanhamento dos indicadores.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-mut">
              A dupla cobre as duas metades do problema: <span className="text-cream">entender o
              negócio</span> e <span className="text-cream">construir a infraestrutura</span>. Você
              não fala com um técnico que não entende de gestão, nem com um vendedor que não entrega
              tecnologia.
            </p>
          </Reveal>

          <div className="grid gap-5">
            {socios.map((s, i) => (
              <Reveal key={s.nome} delay={i * 0.1}>
                <div className="rounded-2xl border border-line bg-surface p-7">
                  <div className="flex items-center gap-4">
                    {s.foto ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={s.foto}
                        alt={s.nome}
                        className="h-14 w-14 flex-none rounded-full object-cover object-top ring-2 ring-amber/40"
                      />
                    ) : (
                      <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-amber font-display text-lg font-bold text-graphite">
                        {s.nome[0]}
                      </div>
                    )}
                    <div>
                      <h3 className="font-display text-lg font-semibold text-cream">{s.nome}</h3>
                      <p className="text-sm text-amber">{s.papel}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-[15px] leading-relaxed text-mut">{s.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
