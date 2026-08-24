// Conteúdo da LP de Gestão de Estoque — FONTE ÚNICA.
//
// Os componentes em components/estoque/ só renderizam; todo texto, tabela e — principalmente —
// rótulo e destino de CTA vive aqui. Quando a oferta mudar (spec 11.9: "sessão de análise"),
// muda-se a constante CTA e a página inteira acompanha.
//
// Fonte: JOGA-Brand/LP_Gestao_Estoque_Spec_v1.md (v1.1), seção 4.

import { waLink } from "./site";

/** Rota canônica da LP (trailingSlash está ligado no next.config). */
export const LP_ESTOQUE_PATH = "/solucoes/gestao-de-estoque/";

/**
 * Marcadores de decisão em aberto. Só aparecem com NEXT_PUBLIC_LP_DRAFT=true no .env.local —
 * mesma convenção do UPLOAD_PLANILHA_ATIVO. Página pronta cria ilusão de decidido; isto impede
 * que rascunho seja lido como final.
 */
export const LP_DRAFT = process.env.NEXT_PUBLIC_LP_DRAFT === "true";

/* ─────────────────────────────────────────────────────────────
   CTAs — o único ponto a mexer quando a oferta for decidida
   ───────────────────────────────────────────────────────────── */

// O destino de todo CTA de conversão é o diagnóstico DA PRÓPRIA LP (#questionario).
// A LP não manda ninguém para o /diagnostico geral: aquele são 21 perguntas sobre 5 áreas
// do negócio, das quais só 3 falam de estoque — quem chegou aqui por estoque responderia
// quase tudo de novo, e a página prometeria dinheiro para desembocar num instrumento que
// não fala em dinheiro. Aqui ele responde 12 perguntas e vê o placar na hora.
export const CTA = {
  /** Principal — rola até o questionário da página. */
  primario: { label: "Quero analisar meu estoque", href: "#questionario" },
  /** Secundário do hero: desce para os pilares. */
  secundario: { label: "Conhecer a solução", href: "#pilares" },
  demo: { label: "Ver uma demonstração", href: "#demonstracoes" },
  diagnostico: { label: "Quero o diagnóstico do meu estoque", href: "#questionario" },
  mobile: { label: "Quero meu diagnóstico", href: "#questionario" },
  whatsapp: {
    label: "Falar com a JOGA",
    href: waLink("Olá! Vim pela página de Gestão de Estoque e quero entender como funciona."),
  },
};

/* ─────────────────────────────────────────────────────────────
   Bloco 1 — Hero
   ───────────────────────────────────────────────────────────── */

export const HERO = {
  eyebrow: "Inteligência para estoque e compras",
  h1a: "Seu estoque está trabalhando para a sua empresa ou ",
  h1destaque: "prendendo o seu dinheiro",
  h1b: "?",
  sub: "Excessos, rupturas, produtos parados, risco de validade e oportunidades de compra — identificados e priorizados a partir dos dados que a sua empresa já tem.",
  rodape: "Atacado · Distribuição · Varejo · Indústria",
};

/**
 * Faixa de prova (logo abaixo do hero). Números REAIS, extraídos do dataset do cliente em
 * 13/08/2026 — spec 10.2.
 *
 * `autorizado: false` = ainda sem liberação do cliente para PUBLICAR (escadinha de 4 níveis,
 * spec 10.5). Em modo rascunho (LP_DRAFT) a faixa aparece assim mesmo, para revisão interna:
 * ver a página com os números é diferente de colocá-los no ar.
 */
export const PROVA = {
  // Liberado no nível 3 da escadinha (spec 10.5): números reais, cliente NÃO identificado.
  // ⚠️ Não nomear a empresa, não usar logo, não citar cidade, pessoa ou marca de fornecedor —
  // estoque e ruptura são inteligência competitiva de quem nos deu os dados.
  autorizado: true,
  itens: [
    { valor: "2.918", rot: "SKUs monitorados" },
    { valor: "191", rot: "fornecedores" },
    { valor: "6", rot: "compradores" },
    { valor: "R$ 5,6 mi", rot: "de estoque acompanhado todo dia" },
  ],
  legenda: "Atacado distribuidor · 2 centros de distribuição · ERP Winthor.",
};

/* ─────────────────────────────────────────────────────────────
   Bloco 2 — Os quatro problemas
   ───────────────────────────────────────────────────────────── */

export const PROBLEMAS = {
  eyebrow: "O problema",
  h2: "Gestão de estoque: quanto dinheiro pode estar escondido no seu?",
  cards: [
    {
      t: "Dinheiro parado",
      custo: "Capital empatado em item que não gira — e que ainda ocupa espaço no depósito.",
      mostra: "Valor parado por produto, fornecedor e comprador, com há quanto tempo cada item não sai.",
    },
    {
      t: "Ruptura",
      custo: "Venda que não aconteceu e cliente que resolveu no concorrente.",
      mostra: "Itens zerados e com cobertura crítica, valor da venda prejudicada e custo de reposição.",
    },
    {
      t: "Perdas",
      custo: "Mercadoria que vence na prateleira depois de já ter sido paga.",
      mostra: "Lotes por faixa de validade, valor em risco e o que já venceu antes e continua na casa.",
    },
    {
      t: "Compras sem informação",
      custo: "Pedido pelo feeling: compra demais de um item e falta do outro.",
      mostra: "Sugestão por giro e cobertura-alvo, já descontando o que está a caminho.",
    },
  ],
  fecho1: "Nada disso aparece numa tela só. E normalmente só é descoberto meses depois — quando o dinheiro já saiu.",
  fecho2: "Numa operação de milhares de itens, esses quatro problemas convivem em silêncio: o estoque parece saudável, as compras acontecem, as vendas seguem. O rombo não é um evento — é um vazamento.",
};

/* ─────────────────────────────────────────────────────────────
   Bloco 3 — Isso não é mais um relatório do ERP
   ───────────────────────────────────────────────────────────── */

export const ERP = {
  eyebrow: "A diferença",
  h2a: "Seu ERP registra. A gente ",
  h2destaque: "cruza, prioriza e cobra",
  h2b: ".",
  intro: "O ERP sabe quanto tem de cada item. Ele não diz qual dos milhares de produtos você precisa resolver hoje — nem cruza giro, validade, pedido em aberto, orçamento e responsável na mesma linha.",
  linhas: [
    { erp: "Mostra o saldo", joga: "Mostra o saldo em dias de venda — e quanto capital está parado ali" },
    { erp: "Lista os produtos", joga: "Prioriza: o que resolver hoje, nesta ordem" },
    { erp: "Registra o pedido", joga: "Sugere o pedido pela necessidade real, já descontando o que está a caminho" },
    { erp: "Tem relatório de validade", joga: "Transforma validade em plano de ação com responsável, prazo e status" },
    { erp: "Guarda a informação", joga: "Entrega a informação ao responsável, filtrada pela carteira dele" },
    { erp: "Responde quando você pergunta", joga: "Avisa antes de você perguntar" },
  ],
  nota: "A solução lê os dados do seu sistema. Não escreve, não altera e não interfere na operação do ERP.",
};

/* ─────────────────────────────────────────────────────────────
   Bloco 4 — Proposta de valor
   ───────────────────────────────────────────────────────────── */

export const VALOR = {
  eyebrow: "Proposta de valor",
  h2: "Muito mais do que saber quanto existe no estoque.",
  p: "A Gestão de Estoque JOGA organiza os dados para mostrar onde estão os problemas, qual é a prioridade e onde a equipe precisa agir. Milhares de produtos, movimentações, fornecedores e pedidos viram uma visão gerencial simples e acionável.",
  fluxo: ["Dados", "Diagnóstico", "Prioridade", "Decisão", "Ação"],
};

/* ─────────────────────────────────────────────────────────────
   Bloco 5 — Os 4 pilares, em forma de pergunta
   O título é a pergunta que o gestor já se faz; o indicador é só a prova
   de que respondemos. Pergunta primeiro, vocabulário depois.
   ───────────────────────────────────────────────────────────── */

export const PILARES = {
  eyebrow: "O que a solução entrega",
  h2: "Quatro perguntas que passam a ter resposta todo dia.",
  itens: [
    {
      n: "01",
      pergunta: "Quanto do meu dinheiro está parado?",
      resposta: "Capital parado identificado por produto, fornecedor e comprador — com há quanto tempo cada item não sai.",
      indicadores: [
        "Capital parado e dias sem venda",
        "Estoque excedente",
        "Análise de giro",
        "Curva ABC e matriz ABC-XYZ",
        "Ocupação do depósito (para operações com WMS)",
      ],
    },
    {
      n: "02",
      pergunta: "O que vai faltar amanhã?",
      resposta: "Os itens que vão furar antes de o pedido chegar — com o custo da venda que você deixa de fazer.",
      indicadores: [
        "Cobertura de estoque em dias",
        "Produtos zerados",
        "Ruptura por comprador e por curva ABC",
        "Meta de ruptura acompanhada por comprador",
        "Venda prejudicada e custo de reposição",
      ],
    },
    {
      n: "03",
      pergunta: "O que vai vencer?",
      resposta: "O risco de perda aparece com semanas de antecedência — e já sai como plano de ação.",
      indicadores: [
        "Validade por lote (FEFO)",
        "Faixas de vencimento com valor em risco",
        "Vencidos, histórico e recorrência por produto",
        "O que já venceu antes e continua em estoque",
        "Plano de ação com responsável, prazo e status",
      ],
    },
    {
      n: "04",
      pergunta: "O que eu devo comprar hoje?",
      resposta: "A lista do dia, por fornecedor, calculada pela necessidade real — não pela memória do comprador.",
      indicadores: [
        "Sugestão de compra por fornecedor e por produto",
        "Cobertura-alvo e lead time parametrizados pela sua operação",
        "Lead time real de cada fornecedor",
        "Meta de compras por comprador — orçamento, consumido e saldo",
        "Verbas recebidas dos fornecedores",
        "Pedido pronto como planilha de importação do WinThor",
      ],
    },
  ],
  fecho: {
    t: "E cada comprador, o que está fazendo?",
    p: "Os mesmos indicadores, agora com nome e responsável. A gestão de compras deixa de ser conversa de percepção e passa a ter placar: quem está dentro da meta de ruptura, quem estourou o orçamento, quem deixou capital parado na carteira dele.",
    grupos: [
      {
        t: "Comprador",
        d: "Meta de ruptura e meta de compras acompanhadas individualmente, além de cobertura, excesso, produtos parados e crescimento da carteira dele.",
      },
      { t: "Fornecedor", d: "Performance, lead time real, níveis de estoque, rupturas e excessos." },
      { t: "Produto", d: "Giro, cobertura, histórico, margem e validade." },
    ],
  },
  // Lista completa atrás de um accordion: presente para quem quer, invisível para quem não quer.
  // É o que impede a página de virar catálogo sem esconder profundidade de quem procura.
  completa: {
    label: "Ver todos os indicadores",
    grupos: [
      {
        t: "Saúde do estoque",
        itens: "Cobertura em dias · produtos sem venda · dias sem venda · estoque excedente · valor financeiro parado · produtos zerados · ruptura · ruptura por comprador · ruptura por curva ABC · análise de giro · curva ABC · matriz ABC-XYZ · ocupação do depósito (WMS)",
      },
      {
        t: "Compras",
        itens: "Sugestão por fornecedor · sugestão por produto · cobertura-alvo parametrizável · lead time parametrizável · lead time real do fornecedor · necessidade de reposição · priorização por relevância · planilha de importação de pedido do WinThor",
      },
      {
        t: "Validade e perdas",
        itens: "Validade por lote (FEFO) · próximos ao vencimento · vencidos · histórico de vencimentos · recorrência por produto · fornecedor relacionado · quantidade disponível · o que já venceu e continua em estoque · plano de ação",
      },
      {
        t: "Performance",
        itens: "Desempenho da carteira de compras · crescimento · ruptura · cobertura · excesso · produtos parados · performance de fornecedor · comportamento dos produtos · giro · margem · histórico",
      },
      {
        t: "Orçamento e verbas",
        itens: "Orçamento disponível para compras · acompanhamento da utilização · saldo e % consumido · verbas recebidas dos fornecedores",
      },
    ],
  },
};

/* ─────────────────────────────────────────────────────────────
   Bloco 6 — Consultor conectado ao estoque
   Redação travada na spec 3.3: o que existe é relatório recorrente filtrado
   por carteira + alerta de cobertura por gatilho. Não prometer mais que isso.
   ───────────────────────────────────────────────────────────── */

export const CONSULTOR = {
  eyebrow: "O diferencial",
  h2: "Você não precisa procurar o problema. A JOGA faz o problema chegar até você.",
  p: "Você escolhe quais relatórios, para quem e com que frequência. O responsável recebe já filtrado pela carteira dele. E quando a cobertura de um item entra na faixa crítica, o alerta dispara sozinho.",
  cards: [
    { t: "Produto entrando em situação crítica", d: "O responsável recebe a informação." },
    { t: "Mercadoria próxima do vencimento", d: "O responsável recebe a informação." },
    { t: "Produto importante entrando em ruptura", d: "O responsável recebe a informação." },
    { t: "Estoque parado acima do parâmetro", d: "O responsável recebe a informação." },
  ],
  impacto: ["É como ter um consultor conectado ao seu estoque todos os dias.", "O painel mostra. A automação avisa. A gestão decide."],
};

/* ─────────────────────────────────────────────────────────────
   Bloco 7 — Demonstrações
   As imagens atuais têm defeitos conhecidos (spec 6.1) e serão regeradas.
   Validade e Reposição ainda faltam capturar.
   ───────────────────────────────────────────────────────────── */

export const DEMOS = {
  eyebrow: "Demonstrações",
  h2: "Não é promessa. É prova.",
  p: "Telas reais da solução (dados fictícios). Navegue pelos módulos e clique para ampliar.",
  telas: [
    {
      key: "visao",
      nome: "Visão geral",
      problema: "O estoque parece saudável, mas ninguém sabe onde está o dinheiro preso.",
      indicadores: "Valor em estoque, capital parado, itens em ruptura, curva ABC e os maiores ofensores.",
      decisao: "Por onde começar hoje — e qual problema custa mais caro agora.",
      imgs: ["/demos/estoque.png"],
    },
    {
      key: "ruptura",
      nome: "Ruptura",
      problema: "Falta justamente o item que vende — e só se descobre quando o cliente pede.",
      indicadores: "Zerados e negativos, sugestão de compra, o que já está em pedido, venda prejudicada e custo de reposição.",
      decisao: "O que repor primeiro, sem pedir de novo o que já vem a caminho.",
      imgs: ["/demos/estoque-2.png", "/demos/estoque-4.png"],
    },
    {
      key: "cobertura",
      nome: "Cobertura",
      problema: "Estoque medido em quantidade não diz nada. Medido em dias, diz tudo.",
      indicadores: "Cobertura por faixa de dias, valor por faixa e recorte por comprador.",
      decisao: "Onde está o excesso, onde está o risco — e de quem é a carteira.",
      imgs: ["/demos/estoque-3.png"],
    },
    {
      key: "gerencial",
      nome: "Painel gerencial",
      problema: "O diretor só descobre como está o mês quando alguém para para levantar.",
      indicadores: "Orçamento de compras, ruptura, validade e cobertura por faixa, participação por comprador.",
      decisao: "Se o mês está no ritmo — a tempo de corrigir.",
      imgs: ["/demos/estoque-1.png"],
    },
  ],
};

/* ─────────────────────────────────────────────────────────────
   Bloco 8 — Como funciona + integração
   ───────────────────────────────────────────────────────────── */

export const COMO = {
  eyebrow: "Como funciona",
  h2: "Cada estoque tem uma realidade diferente. Por isso, cada implantação é parametrizada.",
  fluxo: [
    "ERP / dados da empresa",
    "JOGA",
    "Diagnóstico + indicadores + sugestão de compras",
    "Pedido / plano de ação / alerta",
  ],
  etapas: [
    ["Entendemos a operação", "Estrutura de compras, estoque, fornecedores, sistemas e as dores prioritárias da empresa."],
    ["Conectamos e organizamos os dados", "Estruturamos as informações que os indicadores exigem."],
    ["Definimos os parâmetros", "Cobertura-alvo, lead time, regras de estoque, compradores e fornecedores."],
    ["Construímos os indicadores e automações", "Painéis, diagnósticos, alertas e relatórios."],
    ["Transformamos informação em ação", "A gestão passa a acompanhar riscos, oportunidades e prioridades continuamente."],
  ],
  garantias: [
    { t: "Como o dado entra", d: "Leitura dos dados do seu sistema. Sem escrita, sem alteração, sem interferir na operação do ERP." },
    { t: "Integração com o WinThor", d: "O pedido gerado na solução sai como planilha de importação, pronta para subir no ERP." },
    { t: "Prazo até a primeira tela", d: "[A DEFINIR — spec 11.3]", pendente: true },
    { t: "Para quem é", d: "[A DEFINIR — spec 10.7.3: porte, segmento, lote/validade, compradores definidos]", pendente: true },
  ],
};

/* ─────────────────────────────────────────────────────────────
   Bloco 9 — Questionário
   Isca curta: 3 opções (SIM/NÃO enviesa), resultado na hora, SEM formulário.
   A captura acontece aqui mesmo, no muro do questionário desta página.
   ───────────────────────────────────────────────────────────── */

export const QUIZ = {
  eyebrow: "Faz sentido para você?",
  h2: "Descubra em 2 minutos onde a sua gestão de estoque está frágil.",
  p: "Doze perguntas rápidas sobre a sua operação. No fim, você vê o placar por área e uma leitura escrita para o seu caso.",

  opcoes: [
    { code: "sim", label: "Sim" },
    { code: "mais_ou_menos", label: "Mais ou menos" },
    { code: "nao", label: "Não" },
  ],

  // Contexto — serve à análise (sem isso a IA escreve genérico) e qualifica o lead.
  // `setor` e `erp` caem nas MESMAS colunas que o admin do diagnóstico já filtra.
  contexto: {
    titulo: "Sobre a sua operação",
    campos: [
      {
        id: "setor",
        label: "Seu segmento",
        opcoes: [
          { code: "atacado", label: "Atacado / distribuição" },
          { code: "varejo", label: "Varejo" },
          { code: "industria", label: "Indústria" },
          { code: "outro", label: "Outro" },
        ],
      },
      {
        id: "skus",
        label: "Quantos itens no cadastro",
        opcoes: [
          { code: "ate500", label: "Até 500" },
          { code: "500_2000", label: "500 a 2.000" },
          { code: "2000_5000", label: "2.000 a 5.000" },
          { code: "mais5000", label: "Mais de 5.000" },
          { code: "nao_sei", label: "Não sei" },
        ],
      },
      {
        id: "erp",
        label: "Sistema que usa hoje",
        opcoes: [
          { code: "winthor", label: "Winthor" },
          { code: "sankhya", label: "Sankhya" },
          { code: "bling", label: "Bling / Tiny" },
          { code: "outro", label: "Outro" },
          { code: "nenhum", label: "Nenhum integrado" },
        ],
      },
    ],
  },

  // Os códigos e1..e12 são o contrato com o backend (app/estoque_scoring.py).
  // Mudar aqui exige mudar lá — e o texto precisa bater, porque a IA cita a pergunta.
  perguntas: [
    { id: "e1", t: "Você sabe quanto dinheiro está parado em estoque acima da necessidade?" },
    { id: "e2", t: "Sua empresa identifica rapidamente produtos há muitos dias sem venda?" },
    { id: "e3", t: "Você acompanha o percentual de ruptura do estoque?" },
    { id: "e4", t: "A ruptura é acompanhada por comprador e por curva ABC?" },
    { id: "e5", t: "Sua equipe identifica antecipadamente produtos próximos do vencimento?" },
    { id: "e6", t: "Você sabe quanto perdeu por vencimento nos últimos 12 meses?" },
    { id: "e7", t: "Seus compradores trabalham com cobertura-alvo definida?" },
    { id: "e8", t: "O lead time real dos fornecedores é acompanhado?" },
    { id: "e9", t: "Sua empresa tem orçamento estruturado de compras?" },
    { id: "e10", t: "Existe sugestão de compras baseada em parâmetros definidos pela empresa?" },
    { id: "e11", t: "Os responsáveis recebem automaticamente os relatórios e alertas do estoque?" },
    { id: "e12", t: "Cada comprador tem meta de ruptura e de compras acompanhada individualmente?" },
  ],

  // Muro de captura. Curto de propósito: o que está atrás dele é a análise, não uma contagem.
  muro: {
    eyebrow: "Última etapa",
    titulo: "Para onde enviamos a sua leitura?",
    p: "Seu placar e a análise aparecem aqui na tela, na hora. Sem espera e sem e-mail de propaganda.",
    consent:
      "Autorizo a JOGA a tratar meus dados para retorno deste contato, conforme a Política de Privacidade.",
    botao: "Ver meu diagnóstico",
    processando: "Analisando a sua operação…",
    erroCampos: "Preencha nome, empresa e WhatsApp.",
    erroConsent: "É preciso aceitar o tratamento dos dados para continuar.",
    erroApi: "Não conseguimos processar agora — vamos te atender pelo WhatsApp.",
  },
  // O placar por área vem do backend (app/estoque_scoring.py), não é calculado aqui: se os
  // dois lados contassem, uma hora divergiriam e o visitante veria o erro antes da gente.
  resultado: {
    eyebrow: "Sua leitura",
    titulo: "Placar da sua gestão de estoque",
    subPlacar: "Cinco áreas, do capital parado ao acompanhamento.",
    tituloAnalise: "O que isso quer dizer na sua operação",
    fechoRot: "Por onde começar",
    cta: "Quero conversar sobre isso",
    refazer: "Refazer",
    progresso: (r: number, t: number) => `${r} de ${t} respondidas`,
    // Nota de rodapé: honestidade sobre o alcance do questionário.
    ressalva:
      "Esta leitura vem só das suas respostas — nenhum dado do seu sistema foi analisado. Com os dados reais, o retrato fica bem mais fino.",
  },
};

// Cores por nível — mesmas do diagnóstico geral, para os dois placares falarem a mesma língua.
export const NIVEL_STYLE: Record<string, string> = {
  "Crítico": "border-red-500/30 bg-red-500/10 text-red-400",
  "Atenção": "border-amber/30 bg-amber/10 text-amber",
  "Bom": "border-teal/30 bg-teal/10 text-teal",
  "Maduro": "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
};

/* ─────────────────────────────────────────────────────────────
   Bloco 10 — O case completo
   Casca: sem autorização do cliente (spec 11.4), o bloco não renderiza.
   Melhor página sem case do que case inventado — a tese da página é "é prova".
   ───────────────────────────────────────────────────────────── */

export const CASE = {
  // Nível 3 da escadinha (spec 10.5): números reais, cliente anônimo. Ver aviso em PROVA.
  autorizado: true,
  eyebrow: "O caso real",
  h2: "O que apareceu quando tudo ficou numa tela só.",
  perfil:
    "Atacado distribuidor · 2 centros de distribuição · ERP Winthor — 2.918 SKUs, 191 fornecedores e 6 compradores.",

  // ⚠️ REGRA DE REDAÇÃO (spec 10.1): sempre "identificamos", nunca "economizamos".
  // "Economizamos" exige provar causalidade, e não há série histórica para isso (spec 10.4).
  // "Identificamos" é o que a ferramenta achou — incontestável e igualmente forte.
  achados: [
    { valor: "R$ 204 mil", rot: "de capital parado identificados — 3,6% do estoque" },
    { valor: "358", rot: "produtos zerados que não estavam em lista nenhuma" },
    { valor: "R$ 1,9 mi", rot: "de estoque acima da necessidade, com nome e responsável" },
    { valor: "R$ 42,8 mil", rot: "a vencer em 90 dias, R$ 5,1 mil em risco urgente" },
  ],

  // ⚠️ Não falar em "planilha" aqui: boa parte do público JÁ tem sistema e se reconhece no
  // problema mesmo com ERP no ar — o relatório existe, só que alguém precisa puxar, cruzar e
  // interpretar. O contraste é sobre a leitura da operação, não sobre a ferramenta anterior.
  antesDepois: {
    rotAntes: "Antes",
    rotDepois: "Com a Gestão de Estoque JOGA",
    linhas: [
      ["Uma foto do mês, que alguém precisava preparar", "O dado do momento, sem ninguém preparar"],
      ["Cada resposta num relatório diferente", "Giro, validade, pedido e responsável na mesma linha"],
      ["Os itens que dava tempo de olhar", "2.918 SKUs, todos os dias"],
      ["O problema aparecia depois de acontecer", "O problema chega antes, para quem responde por ele"],
    ],
  },

  depoimento: null as null | { texto: string; autor: string; cargo: string },
};

/* ─────────────────────────────────────────────────────────────
   Bloco 11 — CTA final
   ───────────────────────────────────────────────────────────── */

export const FINAL = {
  eyebrow: "Próximo passo",
  h2a: "Seu estoque já tem os dados. Falta ",
  h2destaque: "transformá-los em decisão",
  h2b: ".",
  p: "Descubra onde a sua empresa pode reduzir excessos, prevenir rupturas, controlar perdas e melhorar as decisões de compra.",
  complemento: "Diagnóstico inicial sem compromisso.",
  assinatura: "Jogue o jogo certo com a JOGA.",
};
