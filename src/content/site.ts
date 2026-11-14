/**
 * Conteúdo do site.
 *
 * Origem de cada informação:
 *  - Sem marcação: veio do site atual (rizomaiogaesociedade.com.br), reescrito.
 *  - `exemplo: true`: dado FICTÍCIO, só para mostrar o formato visual.
 *    Aparece no site com um selo "exemplo" e deve ser trocado pelo painel.
 *  - `falta`: algo que ainda não existe (ex.: foto) e precisa ser providenciado.
 *
 * Mais adiante, os dados editáveis passam a vir do Firebase (painel da Maira).
 */

export const contato = {
  whatsapp: "5548988390690",
  whatsappExibicao: "(48) 98839-0690",
  email: "rizoma.iogaesociedade@gmail.com",
  instagram: "rizoma.iogaesociedade",
  instagramRespira: "movimento.respira",
  endereco: {
    linha1: "Rod. Francisco Thomas dos Santos, 5449 — subsolo",
    linha2: "Armação do Pântano do Sul, Florianópolis/SC",
    mapa: "https://www.google.com/maps/search/?api=1&query=Rodovia+Francisco+Thomas+dos+Santos+5449+Arma%C3%A7%C3%A3o+Florian%C3%B3polis",
  },
};

export function linkWhatsApp(mensagem: string) {
  return `https://wa.me/${contato.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

export const navegacao = [
  { href: "/", rotulo: "Início" },
  { href: "/conhecer", rotulo: "Conhecer" },
  { href: "/praticar", rotulo: "Praticar" },
  { href: "/aprofundar", rotulo: "Aprofundar" },
  { href: "/sociedade", rotulo: "Sociedade" },
  { href: "/apoiar", rotulo: "Apoiar" },
  { href: "/rizomatica", rotulo: "Rizomática" },
];

/* ───────────────────────── Início / Conhecer ───────────────────────── */

export const pilares = [
  {
    titulo: "Corpo",
    texto: "Prática física com consciência e respeito aos limites do corpo.",
    foto: "/fotos/guerreiro-pb.webp",
    alt: "Maira em postura do guerreiro na beira do mar, em preto e branco",
  },
  {
    titulo: "Reflexão",
    texto: "Um ioga que também pensa e questiona a realidade em que acontece.",
    foto: "/fotos/prece-retrato.webp",
    alt: "Maira de olhos fechados, com as mãos em prece, ao pôr do sol",
  },
  {
    titulo: "Autonomia",
    texto: "Aprender ferramentas que nos conduzem no caminho do autoconhecimento.",
    foto: "/fotos/meditacao-praia.webp",
    alt: "Maira meditando sentada na areia, com o mar e as montanhas ao fundo",
  },
];

export const principios = [
  { titulo: "Acolhimento e diversidade", texto: "Corpos, idades e pensamentos diferentes convivem aqui." },
  { titulo: "Prática adaptada a você", texto: "O ioga serve à pessoa, e não o contrário." },
  { titulo: "Corpo como experiência", texto: "Cada prática é uma investigação, um convite a sentir e refletir." },
  { titulo: "Comunidade viva", texto: "Trilhas, encontros e trocas, com uma professora que conecta corpo e pensamento." },
];

/** Nós da rede do bloco "Por que Rizoma" (palavras do Manual da Marca). */
export const redeRizoma = [
  { palavra: "corpo", x: 10, y: 16 },
  { palavra: "respiração", x: 32, y: 6 },
  { palavra: "pensamento", x: 68, y: 8 },
  { palavra: "presença", x: 91, y: 20 },
  { palavra: "território", x: 80, y: 42 },
  { palavra: "mar", x: 95, y: 60 },
  { palavra: "comunidade", x: 85, y: 86 },
  { palavra: "silêncio", x: 62, y: 95 },
  { palavra: "pessoas", x: 34, y: 93 },
  { palavra: "ideias", x: 9, y: 82 },
  { palavra: "sociedade", x: 5, y: 50 },
  { palavra: "montanha", x: 21, y: 36 },
];

export const sobre = {
  escola: [
    "O Rizoma nasceu do desejo de unir corpo e reflexão, prática e pensamento. Entendemos o ioga como um caminho de autonomia: mais do que repetir posturas, a ideia é compreender o que se faz e por quê.",
    "Acreditamos que o bem-estar é algo que se sente individualmente, mas que se constrói coletivamente. Por isso o Rizoma é escola, é comunidade e é também ação no território onde vive.",
  ],
  conceito: [
    "Na botânica, o rizoma é um caule que cresce sob a terra, para os lados, sem um centro. Diferente da raiz, que vai fundo numa só direção, ele se espalha em rede: qualquer ponto pode brotar e criar novos caminhos.",
    "Os filósofos Gilles Deleuze e Félix Guattari usaram essa imagem em Mil Platôs (1980) para falar de um pensamento que se move e se abre, um antídoto ao senso comum.",
    "O ioga também não é uma tradição única e linear. Ele está na sociedade, é absorvido e reelaborado por ela. Praticar, aqui, é equilibrar duas coisas: incorporar regras e rotinas que nos sustentam e questionar tudo aquilo que pode nos prender e alienar.",
  ],
  maira: {
    nome: "Maira Lopes",
    papel: "Professora e idealizadora",
    bio: [
      "Professora de ioga há 10 anos, Maira construiu um jeito próprio de conduzir as práticas: o foco é que cada pessoa entenda profundamente o que está fazendo e por quê.",
      "É formada em Ciências Sociais pela UNESP e mestre em Ciência Política pela UFSCar. Essa trajetória atravessa as aulas, que juntam o tapete, a filosofia e as questões do nosso tempo.",
    ],
    citacao: "Mais do que posturas, buscamos sentido.",
  },
  espaco: {
    texto:
      "A escola fica na Armação, um bairro de pescadores no sul da ilha onde o mar dita o ritmo dos dias, a 500 metros da praia. A sala comporta confortavelmente 10 pessoas por aula, com tapetes e todo o material incluso.",
    acesso: ["Bicicletário no local", "Várias linhas de ônibus pela rodovia, com pontos próximos", "Estacionamento nas redondezas"],
    fotos: [
      { legenda: "A sala de prática", falta: true },
      { legenda: "Entrada da escola", falta: true },
      { legenda: "Material: tapetes, blocos e cintos", falta: true },
    ],
  },
};

/* ───────────────────────── Praticar ───────────────────────── */

export const modalidades = [
  {
    id: "grupo",
    nome: "Aulas em grupo",
    resumo: "Aulas de 1 hora, cada uma com tema e propósito. Até 10 pessoas, tapetes e material inclusos.",
    detalhe:
      "Não seguimos um estilo fixo de ioga. Cada aula passa por explanação teórica (jñāna), concentração (dhāraṇā), posturas (āsana), respiração (prāṇāyāma) e relaxamento (śavāsana). Sugerimos pelo menos 3 meses contínuos para perceber os benefícios mais profundos. Não precisa de experiência prévia.",
    foto: "/fotos/triangulo-pb.webp",
    exemplo: false,
  },
  {
    id: "praia",
    nome: "Ioga na praia",
    resumo: "Como tudo começou: no calçadão da Armação, com o mar como sala de prática.",
    detalhe:
      "O Rizoma nasceu no calçadão da praia da Armação, em maio de 2021. As aulas na praia acontecem pontualmente, principalmente no verão. Entre na lista de avisos para saber as próximas datas.",
    foto: "/fotos/guerreiro-por-do-sol.webp",
    exemplo: false,
  },
  {
    id: "restaurativo",
    nome: "Ioga restaurativo",
    resumo: "Uma prática lenta, apoiada em almofadas e mantas, para o corpo descansar de verdade.",
    detalhe:
      "Posturas sustentadas por vários minutos, com apoio total do material, para acalmar o sistema nervoso e soltar tensões acumuladas. Indicado para quem está em fase de cansaço, estresse ou recuperação.",
    foto: "/fotos/ponte-sala.webp",
    exemplo: true,
  },
  {
    id: "personal",
    nome: "Personal ioga",
    resumo: "Aulas individuais, no seu ritmo, com um plano pensado para o seu corpo.",
    detalhe:
      "Encontros individuais no Rizoma ou no seu espaço, com uma prática desenhada a partir dos seus objetivos, limites e rotina. Ideal para quem quer começar com mais atenção ou aprofundar algo específico.",
    foto: "/fotos/maira-xicara.webp",
    exemplo: true,
  },
];

/** EXEMPLO — grade fictícia só para visualizar o formato. */
export const grade = {
  exemplo: true,
  dias: [
    { dia: "Segunda", aulas: [{ hora: "08:00", tipo: "Aula em grupo" }, { hora: "19:00", tipo: "Aula em grupo" }] },
    { dia: "Terça", aulas: [{ hora: "18:00", tipo: "Ioga restaurativo" }] },
    { dia: "Quarta", aulas: [{ hora: "08:00", tipo: "Aula em grupo" }, { hora: "19:00", tipo: "Aula em grupo" }] },
    { dia: "Quinta", aulas: [{ hora: "18:00", tipo: "Ioga restaurativo" }] },
    { dia: "Sexta", aulas: [{ hora: "08:00", tipo: "Aula em grupo" }] },
    { dia: "Sábado", aulas: [{ hora: "07:30", tipo: "Ioga na praia", obs: "no verão" }] },
  ],
};

/** EXEMPLO — valores fictícios só para visualizar o formato. */
export const planos = {
  exemplo: true,
  itens: [
    { nome: "Aula experimental", preco: "Gratuita", detalhe: "Uma aula para sentir se o Rizoma é pra você.", destaque: false },
    { nome: "1x por semana", preco: "R$ 220", sufixo: "/mês", detalhe: "4 aulas por mês, com horário de referência flexível.", destaque: false },
    { nome: "2x por semana", preco: "R$ 330", sufixo: "/mês", detalhe: "8 aulas por mês. O ritmo que mais indicamos.", destaque: true },
    { nome: "Personal", preco: "R$ 180", sufixo: "/aula", detalhe: "Aula individual de 1 hora, no Rizoma ou no seu espaço.", destaque: false },
  ],
};

export const perguntas = [
  { p: "Nunca pratiquei ioga. Posso começar?", r: "Pode. Não é preciso experiência prévia: o ritmo é acessível e a prática é adaptada a cada pessoa." },
  { p: "Preciso levar tapete?", r: "Não. Tapetes e todo o material estão inclusos." },
  { p: "E se eu não puder vir no meu horário?", r: "Os horários são flexíveis: você escolhe um horário de referência e, quando precisar trocar, é só avisar." },
  { p: "Quanto tempo até sentir diferença?", r: "Sugerimos pelo menos 3 meses contínuos de aulas para perceber os benefícios mais profundos." },
];

/* ───────────────────────── Aprofundar ───────────────────────── */

export const formacao = {
  nome: "Formação e Aprofundamento em Ioga",
  formato: "Curso extensivo presencial · Florianópolis",
  intro:
    "Se o ioga te chama para ir além da superfície, esse é o caminho. Para quem quer aprofundar o estudo e a prática, construir com segurança uma prática pessoal e compreender o ioga unindo prática, filosofia e estudo do corpo.",
  metodo:
    "Teoria e experiência caminham juntas: anatomia funcional, filosofia, ética, história e prática, em 6 módulos presenciais.",
  modulos: [
    { n: "01", titulo: "Bases históricas e filosóficas do ioga", detalhe: "De onde vem o ioga e como ele chega até nós." },
    { n: "02", titulo: "Fisiologia sutil", detalhe: "Kośāḥ, prāṇaḥ, nāḍyaḥ e cakraḥ." },
    { n: "03", titulo: "O corpo como templo", detalhe: "Anatomia e escuta sutil: āsana, bandha e mudrā." },
    { n: "04", titulo: "Guṇas e introdução ao Ayurveda", detalhe: "As qualidades da natureza no corpo e no cotidiano." },
    { n: "05", titulo: "Tempo, karma, saṁsāra e impermanência", detalhe: "Como a tradição pensa o tempo e a mudança." },
    { n: "06", titulo: "Divindades e o caminho da autonomia", detalhe: "Sādhana: não como dogmas, mas como metáforas." },
  ],
  fatos: [
    { valor: "60h", rotulo: "presenciais" },
    { valor: "6", rotulo: "módulos" },
    { valor: "1", rotulo: "sábado por mês, das 8h às 17h" },
  ],
  inclui: ["Apostila exclusiva", "Certificado", "Kit de boas-vindas", "Café da manhã, almoço e café da tarde"],
  investimento: [
    { forma: "À vista", valor: "R$ 1.900" },
    { forma: "Em até 6x", valor: "R$ 2.100" },
    { forma: "Em até 10x", valor: "R$ 2.500" },
  ],
  descontoAlunos: "Desconto exclusivo para quem já é aluna ou aluno do Rizoma.",
  /** Turma de 2026 (já realizada). Datas da próxima turma: pendente. */
  datasUltimaTurma: ["18/abr", "16/mai", "13/jun", "04/jul", "08/ago", "12/set"],
  frase: "Do tapetinho à compreensão, do corpo à reflexão.",
};

/* ───────────────────────── Sociedade ───────────────────────── */

export const respira = {
  titulo: "Movimento Respira",
  subtitulo: "Práticas de presença, pausa e cuidado em espaços públicos.",
  texto: [
    "Uma iniciativa nascida no Rizoma: ações abertas e gratuitas em praias, praças e calçadões, juntando práticas corporais, respiração, silêncio e encontro. Não exige experiência prévia.",
    "Vivemos sob um ritmo contínuo de aceleração e produtividade. O cuidado com a saúde virou algo individual, e os espaços públicos perderam a função de encontro e pausa. Respirar, aqui, não é só uma técnica: é uma forma de interromper o ritmo automático da vida.",
  ],
  contextos: ["Empresas", "Escolas e universidades", "Coletivos", "Eventos públicos ou privados"],
  frase: "Respira é um convite. À pausa. Ao encontro. Ao corpo presente no mundo.",
  foto: "/fotos/respira-calcadao.webp",
};

export const projetos = [
  {
    id: "grades",
    nome: "Ioga entre as grades",
    desde: "Desde outubro de 2024",
    texto:
      "Aulas semanais no Presídio Feminino de Florianópolis. Já foram cinco turmas, com cerca de 60 mulheres. A participação é reconhecida pelo sistema prisional por meio de alvarás de recompensa.",
    foto: null as string | null,
  },
  {
    id: "cidades",
    nome: "Cidades Invisíveis",
    desde: "Toda quinta-feira",
    texto:
      "Em parceria com o Instituto Cidades Invisíveis, aulas para moradoras das comunidades do Mocotó, Mariquinha e Frei Damião.",
    foto: null as string | null,
  },
  {
    id: "palavras",
    nome: "Palavras que Voam",
    desde: "Com a Prefeitura de Florianópolis",
    texto: "Arrecadação de livros que são distribuídos junto às cestas básicas entregues pelo CRAS.",
    foto: null as string | null,
  },
];

export const sociedade = {
  presidio: { mulheres: 60, turmas: 5, desde: "outubro de 2024" },
};

/** EXEMPLO — agenda fictícia de ações abertas. */
export const agenda = {
  exemplo: true,
  itens: [
    { dia: "07", mes: "dez", titulo: "Respira na praia", local: "Calçadão da Armação", hora: "07:30" },
    { dia: "14", mes: "dez", titulo: "Prática aberta de respiração", local: "Praça do Pântano do Sul", hora: "17:00" },
    { dia: "11", mes: "jan", titulo: "Ioga ao pôr do sol", local: "Praia da Armação", hora: "18:30" },
  ],
};

/* ───────────────────────── Apoiar (lojinha) ───────────────────────── */

export type Produto = {
  id: string;
  nome: string;
  categoria: string;
  descricao: string;
  preco: number;
  cores: { nome: string; hex: string }[];
  tamanhos: string[];
  foto: string | null;
  exemplo: boolean;
  esgotado?: boolean;
};

export const produtos: Produto[] = [
  {
    id: "bone-respira",
    nome: "Boné Respira",
    categoria: "Bonés",
    descricao: "Modelo Dad Hat, tamanho único. Todo o lucro vai para os projetos sociais de ioga.",
    preco: 89.9,
    cores: [
      { nome: "Azul claro", hex: "#a9c6d9" },
      { nome: "Terracota", hex: "#c4562f" },
      { nome: "Off-white", hex: "#efe8dc" },
      { nome: "Caramelo", hex: "#b07a45" },
    ],
    tamanhos: ["Único"],
    foto: null,
    exemplo: false,
  },
  {
    id: "camiseta-rizoma",
    nome: "Camiseta Rizoma",
    categoria: "Camisetas",
    descricao: "Algodão, com o símbolo nas costas e o logotipo vertical no peito.",
    preco: 119.9,
    cores: [
      { nome: "Terracota", hex: "#d73d19" },
      { nome: "Vinho", hex: "#561111" },
      { nome: "Creme", hex: "#f0dabb" },
    ],
    tamanhos: ["P", "M", "G", "GG"],
    foto: "/produtos/camiseta.webp",
    exemplo: true,
  },
  {
    id: "ecobag",
    nome: "Ecobag Linhas",
    categoria: "Acessórios",
    descricao: "Lona crua com as linhas do símbolo. Cabe o tapete e o resto do dia.",
    preco: 69.9,
    cores: [{ nome: "Cru", hex: "#efe8dc" }],
    tamanhos: ["Único"],
    foto: "/produtos/ecobag.webp",
    exemplo: true,
  },
  {
    id: "garrafa",
    nome: "Garrafa térmica",
    categoria: "Acessórios",
    descricao: "Aço inox, 750 ml. Mantém a água fresca na prática e na praia.",
    preco: 139.9,
    cores: [
      { nome: "Terracota", hex: "#d4583a" },
      { nome: "Café", hex: "#5a4140" },
    ],
    tamanhos: ["750 ml"],
    foto: "/produtos/garrafa.webp",
    exemplo: true,
  },
  {
    id: "tapete",
    nome: "Tapete Rizoma",
    categoria: "Prática",
    descricao: "Tapete antiderrapante com o símbolo em baixo-relevo e alça para carregar.",
    preco: 249.9,
    cores: [{ nome: "Verde-oliva", hex: "#5d6346" }],
    tamanhos: ["183 x 61 cm"],
    foto: "/produtos/tapete.webp",
    exemplo: true,
  },
  {
    id: "jaqueta",
    nome: "Jaqueta corta-vento",
    categoria: "Camisetas",
    descricao: "Leve, para os fins de tarde de vento sul na Armação.",
    preco: 289.9,
    cores: [
      { nome: "Vinho", hex: "#561111" },
      { nome: "Creme", hex: "#f0dabb" },
    ],
    tamanhos: ["P", "M", "G"],
    foto: null,
    exemplo: true,
    esgotado: true,
  },
];

export const pagamentos = { exemplo: true, opcoes: ["Pix", "Cartão (link de pagamento)", "Dinheiro na retirada"] };
export const entregas = { exemplo: true, opcoes: ["Retirar no Rizoma", "Entrega na Armação e região", "Envio pelos Correios"] };

/* ───────────────────────── Rizomática ───────────────────────── */

export type Texto = {
  slug: string;
  exemplo: boolean;
  titulo: string;
  tema: string;
  data: string;
  leitura: string;
  resumo: string;
  capa: string;
  corpo: { tipo: "p" | "h2" | "citacao"; texto: string }[];
};

export const textos: Texto[] = [
  {
    slug: "do-tapete-a-sala-de-aula",
    exemplo: true,
    titulo: "Do tapete à sala de aula, e de volta",
    tema: "Corpo · Sociedade",
    data: "2 de novembro de 2026",
    leitura: "5 min de leitura",
    resumo:
      "Durante muito tempo, achei que eram dois caminhos diferentes. Um era o lugar de pensar. O outro, o lugar de sentir. Ou assim eu acreditava.",
    capa: "/fotos/aguia-pb.webp",
    corpo: [
      { tipo: "p", texto: "Durante muito tempo, achei que eram dois caminhos diferentes. De um lado, a universidade: as Ciências Sociais na UNESP, depois o mestrado em Ciência Política na UFSCar, os autores, os conceitos, as horas debruçada sobre perguntas que não tinham resposta fácil. Do outro, o tapete: a respiração, o corpo, o silêncio no final de cada prática." },
      { tipo: "p", texto: "Um era o lugar de pensar. O outro, o lugar de sentir. Ou assim eu acreditava." },
      { tipo: "h2", texto: "Uma separação aprendida" },
      { tipo: "p", texto: "Com os anos, fui percebendo que essa separação era, ela mesma, uma ideia que eu tinha aprendido, e não uma verdade. Quando eu estava no tapete, as perguntas da universidade continuavam comigo. Por que praticamos o que praticamos? Quem decidiu o que é \"o ioga verdadeiro\"? O que acontece com uma tradição quando ela atravessa oceanos, mercados e séculos?" },
      { tipo: "p", texto: "E quando eu estava na sala de aula, o corpo também estava lá. Cansado, curioso, às vezes inquieto. Pensar também é uma experiência do corpo." },
      { tipo: "citacao", texto: "Não acredito num ioga que pede para deixarmos o pensamento na porta." },
      { tipo: "p", texto: "Foi daí que nasceu o jeito que conduzo as aulas hoje. Acredito num ioga que convida a gente a entrar inteira: com as dúvidas, com a história, com o lugar onde vivemos." },
      { tipo: "h2", texto: "A praia como primeira sala" },
      { tipo: "p", texto: "Em 2021, na praia da Armação, comecei dando aula para uma única aluna. Um tapetinho, o mar como parede e nenhuma certeza do que viria depois. Hoje olho para trás e vejo que aquela praia me ensinou o que nenhum livro tinha conseguido: que a prática não precisa de um centro fixo para crescer. Ela cresce para os lados, de encontro em encontro." },
      { tipo: "p", texto: "Como um rizoma." },
      { tipo: "p", texto: "Talvez seja isso que eu mais queira compartilhar com quem chega ao Rizoma. Não um método fechado, mas um convite: praticar com atenção, perguntar sem medo e lembrar que o bem-estar se sente sozinho, mas se constrói junto." },
      { tipo: "p", texto: "Respira. O essencial acontece agora." },
    ],
  },
  {
    slug: "ioga-e-alienacao",
    exemplo: false,
    titulo: "Ioga e alienação",
    tema: "Filosofia · Sociedade",
    data: "publicado no site atual",
    leitura: "texto real",
    resumo:
      "O paradigma moderno abalou a fé. Mas talvez a saída não seja desconstruir todos os sistemas de crença, e sim defender a autonomia: dos Vedas a Patañjali.",
    capa: "/fotos/meditacao-por-do-sol.webp",
    corpo: [
      { tipo: "p", texto: "[Texto publicado no site atual. Colar aqui a versão completa pelo painel.]" },
      { tipo: "p", texto: "Resumo: o texto discute como o pensamento moderno abalou a fé, lembra que religião vem de re-ligar, e defende não a desconstrução dos sistemas de crença, mas a autonomia, passando pelos Vedas e por Patañjali." },
    ],
  },
  {
    slug: "a-pausa-como-gesto-politico",
    exemplo: true,
    titulo: "A pausa como gesto político",
    tema: "Sociedade · Cotidiano",
    data: "5 de outubro de 2026",
    leitura: "4 min de leitura",
    resumo: "Num mundo que mede o valor das horas pela produtividade, parar para respirar em praça pública é quase uma pequena desobediência.",
    capa: "/fotos/respira-praia.webp",
    corpo: [
      { tipo: "p", texto: "Texto de exemplo para visualizar a lista da Rizomática." },
    ],
  },
  {
    slug: "o-que-o-corpo-sabe",
    exemplo: true,
    titulo: "O que o corpo sabe antes de nós",
    tema: "Corpo · Filosofia",
    data: "7 de setembro de 2026",
    leitura: "6 min de leitura",
    resumo: "Antes de a gente nomear o cansaço, o corpo já mudou a respiração. Talvez praticar seja aprender a escutar esse aviso.",
    capa: "/fotos/silhueta-sol.webp",
    corpo: [
      { tipo: "p", texto: "Texto de exemplo para visualizar a lista da Rizomática." },
    ],
  },
];

/** Compatibilidade com a home. */
export const textoExemplo = textos[0];
export const produtoDestaque = produtos[0];
