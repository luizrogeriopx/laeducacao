export type CredCategoria = "certificadora" | "tecnico" | "superior";

export type CredInstituicao = {
  logo_url: string;
  categoria: CredCategoria;
  nome: string;
  estado: string;
  cidade: string;
  codigo: string;
  nota_mec: string;
  detalhes: string;
  link_comprovacao: string;
};

export type CredConfig = {
  seo_title: string;
  seo_description: string;
  breadcrumb_label: string;
  hero_title: string;
  hero_subtitle: string;
  hero_note: string;
  search_placeholder: string;
  filtro_todos: string;
  filtro_certificadora: string;
  filtro_tecnico: string;
  filtro_superior: string;
  empty_text: string;
  btn_verificar: string;
  btn_sem_link: string;
  rodape_texto: string;
  rodape_link_label: string;
  rodape_link_url: string;
  cta_label: string;
  instituicoes: CredInstituicao[];
};

export const CRED_DEFAULT: CredConfig = {
  seo_title: "Credenciamentos e Instituições Parceiras | LA Educação",
  seo_description:
    "Consulta pública das instituições parceiras da LA Educação: certificadoras de EJA, escolas técnicas (SISTEC) e faculdades (e-MEC), com códigos e links oficiais de comprovação.",
  breadcrumb_label: "Credenciamentos",
  hero_title: "Consulta de Instituições Parceiras",
  hero_subtitle:
    "Elaboramos esta cartilha de segurança com o intuito de proporcionar tranquilidade durante o processo de venda dos nossos cursos.",
  hero_note:
    "Conscientes de que a LA não se configura como uma Faculdade ou Escola Técnica, é importante ressaltar que todas as instituições parceiras possuem credenciamentos junto ao Ministério da Educação (MEC) ou à Secretaria de Educação.",
  search_placeholder: "Busque por nome, cidade, estado ou código...",
  filtro_todos: "Todos",
  filtro_certificadora: "Certificadoras",
  filtro_tecnico: "Cursos Técnicos (SISTEC)",
  filtro_superior: "Superior (e-MEC)",
  empty_text: "Nenhuma instituição encontrada para essa busca.",
  btn_verificar: "Verificar Oficial",
  btn_sem_link: "Solicite ao Gerente",
  rodape_texto: "Consulta pública SISTEC:",
  rodape_link_label: "sistec.mec.gov.br/consultapublicaunidadeensino",
  rodape_link_url: "https://sistec.mec.gov.br/consultapublicaunidadeensino",
  cta_label: "Quero me matricular",
  instituicoes: [
  {
    logo_url: "https://static.wixstatic.com/media/84df70_0ca4dcab1c7b4c26b909a396de0a2120~mv2.png",
    categoria: "certificadora",
    nome: "Future Escola Técnica",
    estado: "RS",
    cidade: "Porto Alegre",
    codigo: "44237",
    nota_mec: "-",
    detalhes: "Autorização 44237 (SISTEC/MEC) - Aux. Saúde Bucal",
    link_comprovacao: "https://sistec.mec.gov.br/consultapublicaunidadeensino",
  },
  {
    logo_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbBEpp7MZNtQP_EvAC-oZ2PAC_Cf0lybMUCA&s",
    categoria: "certificadora",
    nome: "Escola Múltipla",
    estado: "RS",
    cidade: "-",
    codigo: "-",
    nota_mec: "-",
    detalhes: "Deliberação 509/2022 CEED - EJA",
    link_comprovacao: "https://www.ceed.rs.gov.br/deliberacao-n-0509-2022",
  },
  {
    logo_url: "https://b2b.itecceduc.com/wp-content/uploads/2024/09/logo-itecc.png",
    categoria: "certificadora",
    nome: "ITECC",
    estado: "PA",
    cidade: "Xinguará",
    codigo: "48643",
    nota_mec: "-",
    detalhes: "Resolução N.268 - Centro Educacional Carajás",
    link_comprovacao: "https://sistec.mec.gov.br/consultapublicaunidadeensino",
  },
  {
    logo_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw7HgWYjc0RT03hOQJuSeh1aKK-IbA5CQSpw&s",
    categoria: "certificadora",
    nome: "IEPB",
    estado: "PB",
    cidade: "Campina Grande",
    codigo: "-",
    nota_mec: "-",
    detalhes: "Certificadora PB",
    link_comprovacao: "Solicite PDF ao Gerente",
  },
  {
    logo_url: "https://grupoaprovanexus.com.br/wp-content/uploads/2023/06/Logo-Principal.png",
    categoria: "certificadora",
    nome: "CBIE (Centro Brasileiro Integrado)",
    estado: "MG",
    cidade: "Uberlândia",
    codigo: "-",
    nota_mec: "-",
    detalhes: "Parecer CEE n.644 / Portaria SEE n.1078",
    link_comprovacao:
      "https://www.educacao.mg.gov.br/documentos-legislacao/portaria-see-n-o-1078-2023-centro-brasileiro-de-educacao-integrado-cbeei-ltda/",
  },
  {
    logo_url:
      "https://institutonobelcursos.com.br/wp-content/uploads/2025/03/logo-nobel-png2-e1741300812604.png",
    categoria: "certificadora",
    nome: "Instituto Nobel",
    estado: "GO",
    cidade: "Jaraguá",
    codigo: "-",
    nota_mec: "-",
    detalhes: "Resolução N. 491 - Conselho Estadual GO",
    link_comprovacao:
      "https://goias.gov.br/cee/wp-content/uploads/sites/20/2023/10/2023-491-ceb-resolucao.pdf",
  },
  {
    logo_url: "https://qb-assets.querobolsa.com.br/logos/colorido/large/2254/logo_1720812115.png",
    categoria: "certificadora",
    nome: "IPEMIG",
    estado: "MG",
    cidade: "Belo Horizonte",
    codigo: "17409",
    nota_mec: "4",
    detalhes: "Faculdade",
    link_comprovacao:
      "https://emec.mec.gov.br/emec/consulta-cadastro/detalhamento/d96957f455f6405d14c6542552b0f6eb/MTM0Ng==",
  },
  {
    logo_url:
      "https://static.wixstatic.com/media/7041ac_0d336348890f402dbcba46fafc8a01a0~mv2.png/v1/fit/w_2500,h_1330,al_c/7041ac_0d336348890f402dbcba46fafc8a01a0~mv2.png",
    categoria: "superior",
    nome: "FACULDADE FACINT",
    estado: "PR",
    cidade: "Maringá",
    codigo: "24553",
    nota_mec: "5",
    detalhes: "Faculdade",
    link_comprovacao:
      "https://emec.mec.gov.br/emec/consulta-cadastro/detalhamento/d96957f455f6405d14c6542552b0f6eb/MjQ1NTM=",
  },
  {
    logo_url: "https://raichu-uploads.s3.amazonaws.com/logo_fadyc-faculdade-dynamus_xu1XEq.png",
    categoria: "superior",
    nome: "FADYC",
    estado: "SP",
    cidade: "Campinas",
    codigo: "18696",
    nota_mec: "3",
    detalhes: "Faculdade",
    link_comprovacao:
      "https://emec.mec.gov.br/emec/consulta-cadastro/detalhes-ies/d96957f455f6405d14c6542552b0f6eb/MTg2OTY=",
  },
  {
    logo_url: "https://www.facla.edu.br/wp-content/uploads/2024/11/logofacla.png",
    categoria: "superior",
    nome: "LA FACULDADES",
    estado: "SP",
    cidade: "São Paulo",
    codigo: "26591",
    nota_mec: "3",
    detalhes: "Faculdade",
    link_comprovacao:
      "https://emec.mec.gov.br/emec/consulta-cadastro/detalhamento/d96957f455f6405d14c6542552b0f6eb/MjY1OTE=",
  },
  {
    logo_url: "https://qb-assets.querobolsa.com.br/logos/colorido/large/2254/logo_1720812115.png",
    categoria: "superior",
    nome: "IPEMIG",
    estado: "MG",
    cidade: "Belo Horizonte",
    codigo: "17409",
    nota_mec: "4",
    detalhes: "Faculdade",
    link_comprovacao:
      "https://emec.mec.gov.br/emec/consulta-cadastro/detalhamento/d96957f455f6405d14c6542552b0f6eb/MTM0Ng==",
  },
  {
    logo_url: "https://b2b.itecceduc.com/wp-content/uploads/2024/09/logo-itecc.png",
    categoria: "tecnico",
    nome: "ITECC",
    estado: "PA",
    cidade: "Xinguará",
    codigo: "48643",
    nota_mec: "-",
    detalhes: "Curso Técnico",
    link_comprovacao: "https://sistec.mec.gov.br/consultapublicaunidadeensino",
  },
  {
    logo_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYFu-tV8IwqCMINbaoMIektbk1szwubMruzw&s",
    categoria: "tecnico",
    nome: "CTECNICA",
    estado: "RN",
    cidade: "Natal",
    codigo: "52748",
    nota_mec: "-",
    detalhes: "Curso Técnico",
    link_comprovacao: "https://sistec.mec.gov.br/consultapublicaunidadeensino",
  },
  {
    logo_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdnKOKhGWUnhJYsMK2lnwe0mq9Aaj2t5oxKQ&s",
    categoria: "tecnico",
    nome: "SEI",
    estado: "PA",
    cidade: "Parauapebas",
    codigo: "45630",
    nota_mec: "-",
    detalhes: "Curso Técnico",
    link_comprovacao: "https://sistec.mec.gov.br/consultapublicaunidadeensino",
  },
  {
    logo_url:
      "https://images.educamaisbrasil.com.br/content/tecnico/instituicao/logo/g/wall-escola-tecnica.png",
    categoria: "tecnico",
    nome: "WALL",
    estado: "RJ",
    cidade: "Macaé",
    codigo: "49296",
    nota_mec: "-",
    detalhes: "Curso Técnico",
    link_comprovacao: "https://sistec.mec.gov.br/consultapublicaunidadeensino",
  },
  {
    logo_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWSaeHr2AhtBM_c8d8IKjTGYKJXp9nqkOR6A&s",
    categoria: "tecnico",
    nome: "LATEC",
    estado: "ES",
    cidade: "Aracruz",
    codigo: "52996",
    nota_mec: "-",
    detalhes: "Curso Técnico",
    link_comprovacao: "https://sistec.mec.gov.br/consultapublicaunidadeensino",
  },
  {
    logo_url:
      "https://storage.googleapis.com/ecdt-logo-saida/4a01eea316d967749c30d7fab5021617a1cd1d9d0692843d98a645bfd0d543f9/INSTITUTO-EDUCACIONAL-DARWIN-LTDA.webp",
    categoria: "tecnico",
    nome: "INSTITUTO DARWIN",
    estado: "RJ",
    cidade: "Araruama",
    codigo: "45590",
    nota_mec: "-",
    detalhes: "Curso Técnico",
    link_comprovacao: "https://sistec.mec.gov.br/consultapublicaunidadeensino",
  },
  {
    logo_url:
      "https://i.ytimg.com/vi/J1yFsffQilg/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDQJiu9GtK4VnB8ZfT5RIEXYyFNBg",
    categoria: "superior",
    nome: "Unicive",
    estado: "PR",
    cidade: "Maringá",
    codigo: "3649",
    nota_mec: "4",
    detalhes: "Faculdade",
    link_comprovacao:
      "https://emec.mec.gov.br/emec/consulta-cadastro/detalhamento/d96957f455f6405d14c6542552b0f6eb/MzY0OQ==",
  },
  {
    logo_url:
      "https://wordpress-direta.s3.sa-east-1.amazonaws.com/sites/860/wp-content/uploads/2022/10/13095206/celso-lisboa.jpg",
    categoria: "superior",
    nome: "Centro Univ. Celso Lisboa",
    estado: "RJ",
    cidade: "Rio de Janeiro",
    codigo: "522",
    nota_mec: "4",
    detalhes: "Centro Universitário",
    link_comprovacao:
      "https://emec.mec.gov.br/emec/consulta-cadastro/detalhamento/d96957f455f6405d14c6542552b0f6eb/NTIy",
  },
  {
    logo_url: "https://www.colegiotecnicoglobal.com.br/GLOBAL%20TEC%201.png",
    categoria: "tecnico",
    nome: "Colégio Técnico Global",
    estado: "PA",
    cidade: "Marabá",
    codigo: "57209",
    nota_mec: "",
    detalhes: "Curso Técnico",
    link_comprovacao: "https://sistec.mec.gov.br/consultapublicaunidadeensino",
  },
  {
    logo_url: "https://www.colegiotecnicoglobal.com.br/GLOBAL%20TEC%201.png",
    categoria: "certificadora",
    nome: "Colégio Técnico Global",
    estado: "PA",
    cidade: "Marabá",
    codigo: "57209",
    nota_mec: "",
    detalhes: "Resolução 473/2025",
    link_comprovacao: "https://ioepa.com.br/pages/2025/10/24/2025.10.24.DOE_80.pdf",
  },
  {
    logo_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGFg690nals_DSOAG-PjeCONzaLqJQ-5QxZluvtJtelw&s=10",
    categoria: "certificadora",
    nome: "Inset educação profissional",
    estado: "MA",
    cidade: "São Luis",
    codigo: "52771",
    nota_mec: "",
    detalhes: "RESOLUÇÃO N° 117/2023 – CEE/MA",
    link_comprovacao: "https://pt.scribd.com/document/745649287/RESOLUCAO-no-223-2023-CEE-MA",
  },
  ],
};
