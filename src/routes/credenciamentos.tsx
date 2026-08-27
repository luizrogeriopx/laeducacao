import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ExternalLink, FileText, MapPin, Search, Star } from "lucide-react";

export const Route = createFileRoute("/credenciamentos")({
  component: CredenciamentosPage,
  head: () => ({
    title: "Credenciamentos e Instituições Parceiras | LA Educação",
    meta: [
      {
        name: "description",
        content:
          "Consulta pública das instituições parceiras da LA Educação: certificadoras de EJA, escolas técnicas (SISTEC) e faculdades (e-MEC), com códigos e links oficiais de comprovação.",
      },
      { property: "og:title", content: "Credenciamentos e Instituições Parceiras | LA Educação" },
      {
        property: "og:description",
        content:
          "Cartilha de credenciamentos: certificadoras, cursos técnicos no SISTEC e instituições de ensino superior no e-MEC, com verificação oficial.",
      },
      { property: "og:url", content: "https://www.laeducacaogo.com.br/credenciamentos" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.laeducacaogo.com.br/credenciamentos" }],
  }),
});

type Categoria = "certificadora" | "tecnico" | "superior";

type Instituicao = {
  logo_url: string;
  categoria: Categoria;
  nome: string;
  estado: string;
  cidade: string;
  codigo: string;
  nota_mec: string;
  detalhes: string;
  link_comprovacao: string;
};

const INSTITUICOES: Instituicao[] = [
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
];

const FILTROS: { value: "all" | Categoria; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "certificadora", label: "Certificadoras" },
  { value: "tecnico", label: "Cursos Técnicos (SISTEC)" },
  { value: "superior", label: "Superior (e-MEC)" },
];

const BADGE: Record<Categoria, { label: string; badge: string; border: string }> = {
  certificadora: {
    label: "Certificadora",
    badge: "bg-[#da1069]/10 text-[#da1069]",
    border: "border-l-4 border-[#da1069]",
  },
  tecnico: {
    label: "Técnico (SISTEC)",
    badge: "bg-[#1a237e]/10 text-[#1a237e]",
    border: "border-l-4 border-[#1a237e]",
  },
  superior: {
    label: "Superior (e-MEC)",
    badge: "bg-purple-100 text-purple-800",
    border: "border-l-4 border-purple-500",
  },
};

function CredenciamentosPage() {
  const [filtro, setFiltro] = useState<"all" | Categoria>("all");
  const [busca, setBusca] = useState("");

  const lista = useMemo(() => {
    const q = busca.trim().toLowerCase();
    return INSTITUICOES.filter((i) => {
      const matchCat = filtro === "all" || i.categoria === filtro;
      const matchBusca =
        q === "" ||
        [i.nome, i.cidade, i.estado, i.codigo, i.detalhes].join(" ").toLowerCase().includes(q);
      return matchCat && matchBusca;
    });
  }, [filtro, busca]);

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-800 flex flex-col">
      <SiteHeader />

      <header className="bg-gradient-to-r from-[#1a237e] to-[#da1069] text-white pt-32 pb-14 px-5 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-5">
          <nav className="text-sm text-white/70 flex items-center gap-2">
            <Link to="/" className="hover:text-white">
              Início
            </Link>
            <span>/</span>
            <span className="text-white">Credenciamentos</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold">Consulta de Instituições Parceiras</h1>
          <p className="text-lg md:text-xl font-medium">
            Elaboramos esta cartilha de segurança com o intuito de proporcionar tranquilidade durante o processo de
            venda dos nossos cursos.
          </p>
          <p className="text-sm md:text-base text-white/90 leading-relaxed bg-white/10 p-4 rounded-lg border border-white/20">
            Conscientes de que a LA não se configura como uma Faculdade ou Escola Técnica, é importante ressaltar que
            todas as instituições parceiras possuem credenciamentos junto ao Ministério da Educação (MEC) ou à
            Secretaria de Educação.
          </p>

          <div className="w-full max-w-xl relative">
            <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Busque por nome, cidade, estado ou código..."
              className="w-full pl-12 pr-4 py-4 rounded-full shadow-lg text-neutral-800 bg-white focus:outline-none focus:ring-4 focus:ring-[#da1069]/40 transition"
            />
          </div>
        </div>
      </header>

      <main className="max-w-6xl w-full mx-auto px-5 py-10 flex-grow">
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {FILTROS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFiltro(f.value)}
              className={`px-5 py-2 rounded-full font-medium shadow transition ${
                filtro === f.value
                  ? "bg-[#1a237e] text-white"
                  : "bg-white text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {lista.length === 0 ? (
          <div className="text-center py-20 text-neutral-500">
            <Search size={40} className="mx-auto mb-4 text-neutral-300" />
            <p>Nenhuma instituição encontrada para essa busca.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lista.map((i, idx) => {
              const meta = BADGE[i.categoria];
              const temLink = i.link_comprovacao.includes("http");
              return (
                <article
                  key={`${i.categoria}-${i.nome}-${idx}`}
                  className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition p-6 flex flex-col justify-between ${meta.border}`}
                >
                  <div>
                    <div className="flex justify-between items-start gap-3 mb-4">
                      {i.logo_url ? (
                        <img
                          src={i.logo_url}
                          alt={`Logo ${i.nome}`}
                          loading="lazy"
                          className="h-12 w-auto max-w-[55%] object-contain"
                        />
                      ) : (
                        <div className="bg-neutral-100 h-12 w-12 rounded-full" />
                      )}
                      <span
                        className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide h-fit ${meta.badge}`}
                      >
                        {meta.label}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-neutral-800 mb-1 leading-tight">{i.nome}</h2>

                    {i.nota_mec && i.nota_mec !== "-" ? (
                      <div className="mb-2">
                        <span className="inline-flex items-center gap-1 text-yellow-600 text-xs font-bold bg-yellow-50 px-2 py-1 rounded border border-yellow-200">
                          <Star size={12} /> Nota MEC: {i.nota_mec}
                        </span>
                      </div>
                    ) : null}

                    <div className="text-sm text-neutral-500 mb-3 flex items-center gap-2">
                      <MapPin size={15} />
                      {i.cidade && i.cidade !== "-" ? i.cidade : "Nacional"}
                      {i.estado && i.estado !== "-" ? ` - ${i.estado}` : ""}
                    </div>

                    <div className="bg-neutral-50 p-3 rounded text-sm text-neutral-600">
                      {i.codigo && i.codigo !== "-" ? (
                        <p>
                          <strong>Cód:</strong>{" "}
                          <span className="font-mono text-[#da1069] select-all">{i.codigo}</span>
                        </p>
                      ) : null}
                      <p className="text-xs mt-1 text-neutral-500">{i.detalhes}</p>
                    </div>
                  </div>

                  {temLink ? (
                    <a
                      href={i.link_comprovacao}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center justify-center gap-2 w-full text-center bg-[#1a237e] hover:bg-[#da1069] text-white py-2 rounded-lg transition text-sm font-semibold"
                    >
                      <ExternalLink size={15} /> Verificar Oficial
                    </a>
                  ) : (
                    <span className="mt-4 inline-flex items-center justify-center gap-2 w-full text-center bg-neutral-100 text-neutral-500 py-2 rounded-lg text-sm font-semibold">
                      <FileText size={15} /> Solicite ao Gerente
                    </span>
                  )}
                </article>
              );
            })}
          </div>
        )}

        <div className="text-center mt-14">
          <p className="text-sm text-neutral-500 mb-4">
            Consulta pública SISTEC:{" "}
            <a
              href="https://sistec.mec.gov.br/consultapublicaunidadeensino"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#da1069] font-semibold underline break-all"
            >
              sistec.mec.gov.br/consultapublicaunidadeensino
            </a>
          </p>
          <Link
            to="/matricula"
            className="inline-block bg-[#da1069] text-white font-bold py-3 px-8 rounded-md hover:bg-[#1a237e] transition-colors"
          >
            Quero me matricular
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
