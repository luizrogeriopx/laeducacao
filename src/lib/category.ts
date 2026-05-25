// Keyword-based category classifier for course titles.
const RULES: Array<{ category: string; keywords: RegExp }> = [
  { category: "Segurança do Trabalho", keywords: /\bnr[-\s]?\d|brigad|espa[cç]os confinados|trabalho em altura|seguran[cç]a (do|no|em) trabalho|seguran[cç]a (em|nos) ?(instala|servi)/i },
  { category: "Saúde", keywords: /enferm|sa[uú]de|socorr|primeiros socorros|fisio|nutri[cç]|farm[aá]c|radiolog|fonoaudi|podolog|odontolog|cuidador|aph|pr[eé]-?hospitalar|massag/i },
  { category: "Beleza e Estética", keywords: /maquiagem|c[ií]lios|sobrancelha|manicure|pedicure|design de unhas|cabelo|barbeiro|depila[cç]|est[eé]tic|bronze/i },
  { category: "Transporte e Trânsito", keywords: /condutor|motorista|taxista|mototaxi|transporte de passageiros|cfc|centro de forma[cç][aã]o de condutores|ve[ií]culos/i },
  { category: "Gastronomia", keywords: /confeit|culin[aá]r|gastronom|cozinheir|padeiro|churrasq|chef|panific/i },
  { category: "Tecnologia e Design", keywords: /photoshop|design gr[aá]fic|autocad|canva|programa[cç]|inform[aá]tica|tecnologia da informa|montagem.{0,15}(pc|computador)|manuten[cç][aã]o de celular|cria[cç][aã]o de (loja|app)|web|android|ios|youtuber|youtube/i },
  { category: "Marketing e Vendas", keywords: /marketing|vendas|instagram|t[eé]cnica de vendas|frentista/i },
  { category: "Administração e Negócios", keywords: /contabilid|administ|gest[aã]o (em|de)|log[ií]stica|financ|recursos humanos|empreend|secretari/i },
  { category: "Engenharia e Construção", keywords: /engenh|constru[cç][aã]o|eletricista|hidr[aá]ulic|soldador|pedreiro|civil/i },
  { category: "Educação e Pedagogia", keywords: /pedagog|educa[cç][aã]o|did[aá]t|alfabetiza|libras|instrutor|psicopedagog|forma[cç][aã]o pedag/i },
  { category: "Graduação e Pós", keywords: /licenciatura|bacharelado|tecn[oó]logo|p[oó]s[-\s]?gradua|mba|superior (em|sequencial)/i },
  { category: "EJA e Ensino Básico", keywords: /\beja\b|ensino fundamental|ensino m[eé]dio|jovens e adolescentes|jovens e adultos/i },
];

export function classifyCategory(title: string): string {
  for (const r of RULES) if (r.keywords.test(title)) return r.category;
  return "Outros";
}

export function categorySlug(category: string): string {
  return category
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
