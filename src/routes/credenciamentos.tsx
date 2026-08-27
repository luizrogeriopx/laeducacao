import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { GraduationCap, ShieldCheck, ExternalLink, BookOpen, School, Search } from "lucide-react";

export const Route = createFileRoute("/credenciamentos")({
  component: CredenciamentosPage,
  head: () => ({
    title: "Credenciamentos e Autorizações | LA Educação",
    meta: [
      {
        name: "description",
        content:
          "Consulte publicamente os credenciamentos da LA Educação: faculdades no e-MEC, escolas técnicas no SISTEC e certificadoras de EJA autorizadas pelos Conselhos Estaduais de Educação.",
      },
      { property: "og:title", content: "Credenciamentos e Autorizações | LA Educação" },
      {
        property: "og:description",
        content:
          "Códigos e-MEC, códigos SISTEC e atos de autorização das nossas escolas certificadoras de EJA, cursos técnicos e profissionalizantes.",
      },
      { property: "og:url", content: "https://www.laeducacaogo.com.br/credenciamentos" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.laeducacaogo.com.br/credenciamentos" }],
  }),
});

const FACULDADES = [
  {
    nome: "UNIFEMM",
    codigo: "84",
    nota: "4",
    url: "https://emec.mec.gov.br/emec/consulta-cadastro/detalhes-ies/d96957f455f6405d14c6542552b0f6eb/NDk2Mg==",
  },
  {
    nome: "UNIMAIS",
    codigo: "18549",
    nota: "4",
    url: "https://emec.mec.gov.br/emec/consulta-cadastro/detalhes-ies/d96957f455f6405d14c6542552b0f6eb/NDk5NQ==",
  },
  {
    nome: "Faculdade Vincent",
    codigo: "24553",
    nota: "5",
    url: "https://emec.mec.gov.br/emec/consulta-cadastro/detalhamento/d96957f455f6405d14c6542552b0f6eb/MjQ1MT==",
  },
  {
    nome: "FADYC",
    codigo: "18696",
    nota: "3",
    url: "https://emec.mec.gov.br/emec/consulta-cadastro/detalhes-ies/d96957f455f6405d14c6542552b0f6eb/MTg2OTY=",
  },
  {
    nome: "LA Faculdade",
    codigo: "26591",
    nota: "3",
    url: "https://emec.mec.gov.br/emec/consulta-cadastro/detalhamento/d96957f455f6405d14c6542552b0f6eb/MjY1OTE=",
  },
  {
    nome: "FAMAR – Faculdade Aliança do Maranhão",
    codigo: "18543",
    nota: "4",
    url: "https://emec.mec.gov.br/emec/consulta-cadastro/detalhamento/d96957f455f6405d14c6542552b0f6eb/MTg2MjM=",
  },
];

const ESCOLAS_SISTEC = [
  { escola: "ITECC", estado: "PA", cidade: "Xinguará", codigo: "48643" },
  { escola: "TÉCNICA", estado: "RN", cidade: "Natal", codigo: "52748" },
  { escola: "CTEC", estado: "MT", cidade: "Várzea Grande", codigo: "55071" },
  { escola: "AUGE – Centro de Formação Profissional", estado: "PA", cidade: "Belém", codigo: "50510" },
  { escola: "WALL – Escola Técnica", estado: "RJ", cidade: "Macaé", codigo: "49296" },
  { escola: "LA Tec – Escola Técnica", estado: "ES", cidade: "Aracruz", codigo: "52996" },
  { escola: "DARWIN", estado: "RJ", cidade: "Araruama", codigo: "45590" },
  { escola: "FRATEC – Escola Técnica", estado: "RJ", cidade: "Itaboraí", codigo: "30899" },
];

const EJA_CERTIFICADORAS = [
  {
    uf: "PA",
    nome: "ITECC",
    texto:
      "RESOLUÇÃO N. 268 de 09/11/2022 – Centro Educacional Carajás. Processo 2020/346473 – CEE/PA, Parecer nº 331/2022.",
  },
  {
    uf: "MT",
    nome: "CTEC",
    texto:
      "ATO 00049/2024 – CEE/MT. Com fulcro no Processo nº 1670/2023/SIPE/CEE-MT e no Parecer CEB nº 24/2024, aprovado em 16 de janeiro de 2024, concede NOVA AUTORIZAÇÃO para oferta da Educação Básica, Etapas Ensino Fundamental e Ensino Médio, nas modalidades Educação de Jovens e Adultos e Educação a Distância – EJA/EaD, pelo período de 01/01/2024 a 31/12/2024.",
  },
  {
    uf: "MT",
    nome: "CEIBTEC",
    texto:
      "Credenciamento ATO 22/2019 – CEE/MT. Ato autorizativo 252/2022, publicado no Diário Oficial da União em 22/06/2022.",
  },
  {
    uf: "RS",
    nome: "Escola Múltipla",
    texto:
      "Instituição de ensino devidamente autorizada pela deliberação nº 509/2022 CEED a oferecer o curso de Educação de Jovens e Adultos (EJA) no Estado do Rio Grande do Sul.",
  },
  {
    uf: "PB",
    nome: "IEPB Campina",
    texto: "Certificadora autorizada. Documentação (PDF) disponível mediante solicitação ao seu gerente.",
  },
  {
    uf: "MG",
    nome: "CBIE – Centro Brasileiro Integrado de Educação",
    texto:
      "Autorização e credenciamento: Parecer CEE nº 644, D.O.E./MG de 14 de julho de 2023, e Portaria SEE nº 1078, D.O.E./MG de 18 de julho de 2023. Entidade mantenedora: Centro Brasileiro de Educação Integrado – CBEEI Ltda.",
  },
  {
    uf: "GO",
    nome: "Instituto Nobel",
    texto:
      "Autorizado pelo Conselho Estadual de Educação de Goiás pela RESOLUÇÃO N. 491, de 07 de julho de 2023, conforme Lei nº 9.394/96, considerando a Resolução CEE/CP nº 003, de 16 de fevereiro de 2018.",
  },
];

function SectionTitle({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle?: string }) {
  return (
    <div className="flex flex-col items-center text-center gap-3 mb-10">
      <div className="w-14 h-14 rounded-full bg-[#1a237e]/10 text-[#1a237e] flex items-center justify-center">
        {icon}
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-[#1a237e] uppercase tracking-wide">{title}</h2>
      {subtitle ? <p className="max-w-3xl text-neutral-600 text-sm md:text-base">{subtitle}</p> : null}
    </div>
  );
}

function CredenciamentosPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-neutral-800">
      <SiteHeader />

      <section className="bg-[#1a237e] text-white pt-32 pb-16 px-5 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
          <nav className="text-sm text-neutral-300 flex items-center gap-2">
            <Link to="/" className="hover:text-white">
              Início
            </Link>
            <span>/</span>
            <span className="text-white">Credenciamentos</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-extrabold">Credenciamentos e Autorizações</h1>
          <p className="text-neutral-200 max-w-3xl">
            Transparência total: consulte aqui os códigos e-MEC das faculdades, os códigos SISTEC das escolas técnicas e
            os atos de autorização das certificadoras de EJA com as quais trabalhamos. Todos os links são de consulta
            pública oficial.
          </p>
        </div>
      </section>

      {/* Faculdades */}
      <section className="py-16 px-5">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            icon={<GraduationCap size={28} />}
            title="Faculdades e Centros Universitários"
            subtitle="O e-MEC foi criado para fazer a tramitação eletrônica dos processos de regulamentação de instituições de Ensino Superior. Também é utilizado pelos alunos para se certificarem de que uma determinada instituição ou curso está autorizado pelo MEC."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FACULDADES.map((f) => (
              <div
                key={f.codigo}
                className="border border-neutral-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3"
              >
                <h3 className="font-bold text-lg text-[#1a237e]">{f.nome}</h3>
                <div className="flex gap-2 text-xs">
                  <span className="bg-neutral-100 rounded-full px-3 py-1 font-semibold">Código e-MEC: {f.codigo}</span>
                  <span className="bg-[#da1069]/10 text-[#da1069] rounded-full px-3 py-1 font-semibold">
                    Nota MEC: {f.nota}
                  </span>
                </div>
                <a
                  href={f.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center justify-center gap-2 bg-[#1a237e] text-white font-semibold py-2.5 px-4 rounded-md hover:bg-[#da1069] transition-colors text-sm"
                >
                  Consultar no e-MEC <ExternalLink size={15} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SISTEC */}
      <section className="py-16 px-5 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            icon={<School size={28} />}
            title="Cursos Técnicos e Competências"
            subtitle="O SISTEC – Sistema Nacional de Informações da Educação Profissional e Tecnológica tem como finalidade servir como mecanismo de registro e divulgação dos dados da educação profissional e tecnológica e de validação de diplomas de cursos de Educação Profissional Técnica de Nível Médio."
          />

          <div className="bg-white border border-neutral-200 rounded-xl p-6 mb-8">
            <h3 className="font-bold text-[#1a237e] mb-3 flex items-center gap-2">
              <Search size={18} /> Quer ter a certeza de que seu curso será reconhecido pelo MEC?
            </h3>
            <ol className="list-decimal list-inside text-sm text-neutral-700 space-y-1.5">
              <li>
                Acesse{" "}
                <a
                  href="https://sistec.mec.gov.br/consultapublicaunidadeensino"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#da1069] font-semibold underline break-all"
                >
                  sistec.mec.gov.br/consultapublicaunidadeensino
                </a>
              </li>
              <li>Selecione o Estado da escola;</li>
              <li>Selecione o Município da escola;</li>
              <li>Procure o nome da escola;</li>
              <li>Pronto! Verifique o rol de todos os cursos autorizados pela instituição.</li>
            </ol>
            <p className="text-sm text-neutral-600 mt-4">
              🚨 <strong>Caso não encontre:</strong> aperte <strong>CTRL + F</strong> para abrir o localizador e digite o
              código da escola.
            </p>
          </div>

          <h3 className="text-center font-bold text-[#1a237e] uppercase tracking-wide mb-5">
            Nossas escolas certificadoras
          </h3>
          <div className="overflow-x-auto bg-white border border-neutral-200 rounded-xl">
            <table className="w-full text-sm">
              <thead className="bg-[#1a237e] text-white">
                <tr>
                  <th className="text-left py-3 px-4">Escola</th>
                  <th className="text-left py-3 px-4">Estado</th>
                  <th className="text-left py-3 px-4">Cidade</th>
                  <th className="text-right py-3 px-4">Código SISTEC</th>
                </tr>
              </thead>
              <tbody>
                {ESCOLAS_SISTEC.map((e) => (
                  <tr key={e.codigo} className="border-t border-neutral-100">
                    <td className="py-3 px-4 font-semibold">{e.escola}</td>
                    <td className="py-3 px-4">{e.estado}</td>
                    <td className="py-3 px-4">{e.cidade}</td>
                    <td className="py-3 px-4 text-right font-bold text-[#da1069]">{e.codigo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* EJA */}
      <section className="py-16 px-5">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            icon={<ShieldCheck size={28} />}
            title="EJA – Educação de Jovens e Adultos"
            subtitle="Certificadoras autorizadas pelos Conselhos Estaduais de Educação para oferta de Ensino Fundamental e Médio na modalidade EJA/EaD."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {EJA_CERTIFICADORAS.map((c) => (
              <div key={`${c.uf}-${c.nome}`} className="border border-neutral-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-[#1a237e] text-white text-xs font-bold rounded-md px-2.5 py-1">{c.uf}</span>
                  <h3 className="font-bold text-[#1a237e]">{c.nome}</h3>
                </div>
                <p className="text-sm text-neutral-700 leading-relaxed">{c.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Profissionalizantes */}
      <section className="py-16 px-5 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            icon={<BookOpen size={28} />}
            title="Cursos Profissionalizantes"
            subtitle="Cursos livres e profissionalizantes, nas modalidades Comum e Avançado."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white border border-neutral-200 rounded-xl p-6">
              <h3 className="font-bold text-[#1a237e] mb-2">Certificadora – LA Educação</h3>
              <p className="text-sm text-neutral-700 leading-relaxed">
                Decreto Legal nº 5.154, de julho de 2004, Art. 1º e 3º, de acordo com as normas do Ministério da Educação
                (MEC) pela Resolução CNE nº 04/99, Art. 11º. Institutos devidamente formalizados podem certificar cursos
                Livres/Profissionalizantes.
              </p>
            </div>
            <div className="bg-white border border-neutral-200 rounded-xl p-6">
              <h3 className="font-bold text-[#1a237e] mb-2">
                Aux. Saúde Bucal — Certificadora Future Escola Técnica
              </h3>
              <p className="text-sm text-neutral-700 leading-relaxed">
                Escola de ensino técnico e profissional, CNPJ 06.164.092/0001-21, com número de autorização 44237, ativo
                no SISTEC/MEC.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 px-5 bg-[#1a237e] text-white text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-4">
          <h2 className="text-2xl md:text-3xl font-bold">Ficou com alguma dúvida sobre a certificação?</h2>
          <p className="text-neutral-200">Fale com nossa equipe e comprove cada credenciamento antes de se matricular.</p>
          <Link
            to="/matricula"
            className="bg-[#da1069] text-white font-bold py-3 px-8 rounded-md hover:bg-white hover:text-[#1a237e] transition-colors"
          >
            Quero me matricular
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
