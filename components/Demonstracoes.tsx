import Reveal from "./Reveal";
import PalcoDemos, { type TelaDemo } from "./PalcoDemos";

const solucoes: TelaDemo[] = [
  {
    key: "carteira",
    nome: "Gestão de Clientes",
    problema: "Clientes que reduziram ou pararam de comprar — e ninguém percebe a tempo.",
    indicadores: "Segmentação RFM, recência, frequência, ticket, receita em risco, previsão de recompra e retenção (cohort).",
    decisao: "Quais clientes recuperar primeiro, quem ligar hoje — e por quê.",
    imgs: [
      "/demos/carteira.png",
      "/demos/carteira-2.png",
      "/demos/carteira-8.png",
    ],
  },
  {
    key: "vendas",
    nome: "Gestão de Vendas",
    problema: "Desempenho da equipe e do mix no escuro — quem performa, o que trava, onde há venda perdida.",
    indicadores: "Ranking por lucro, positivação e YoY, cockpit individual do vendedor, categorias/mix e clientes que pararam de comprar um departamento.",
    decisao: "Onde cobrar, quem desenvolver e quais oportunidades de cross-sell recuperar.",
    imgs: [
      "/demos/carteira-3.png",
      "/demos/carteira-5.png",
      "/demos/carteira-6.png",
      "/demos/carteira-7.png",
    ],
  },
  {
    key: "metas",
    nome: "Gestão de Metas",
    problema: "Meta acompanhada só no fim do mês, quando já não dá mais pra corrigir a rota.",
    indicadores: "Realizado vs meta, projeção, falta por dia e % atingido — por supervisor e por vendedor, ao vivo.",
    decisao: "Quem está no ritmo e quem precisa de um empurrão — a tempo de bater a meta.",
    imgs: [
      "/demos/carteira-9.png",
    ],
  },
  {
    key: "estoque",
    nome: "Gestão de Estoque",
    problema: "Capital parado, ruptura e validade.",
    indicadores: "Giro, cobertura, curva ABC, valor parado e itens a vencer.",
    decisao: "O que comprar, o que escoar e onde o caixa está preso.",
    imgs: [
      "/demos/estoque.png",
      "/demos/estoque-1.png",
      "/demos/estoque-2.png",
      "/demos/estoque-3.png",
      "/demos/estoque-4.png",
    ],
  },
  {
    key: "dre",
    nome: "Resultado Gerencial (DRE) + IA",
    problema: "Enxergar da receita bruta ao resultado final — e entender o porquê.",
    indicadores: "DRE em cascata (12 meses), EBITDA, margem e um assistente de IA que analisa os números e responde perguntas.",
    decisao: "Onde a margem escapa, quais custos cortar e o que moveu o resultado.",
    imgs: ["/demos/DRE.png"],
  },
];

export default function Demonstracoes() {
  return (
    <section id="demonstracoes" className="border-t border-line bg-ink py-20 md:py-28">
      <div className="container-joga">
        <Reveal>
          <span className="eyebrow">Demonstrações</span>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight text-cream sm:text-4xl">
            Não é promessa. É prova.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-mut">
            Telas reais das nossas soluções (dados fictícios). Navegue pelas soluções e clique para ampliar.
          </p>
        </Reveal>

        <PalcoDemos telas={solucoes} />
      </div>
    </section>
  );
}
