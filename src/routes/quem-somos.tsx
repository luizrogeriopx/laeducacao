import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Award, Compass, Heart, Users, Target, Calendar } from "lucide-react";

export const Route = createFileRoute("/quem-somos")({
  component: QuemSomosPage,
  head: () => ({
    title: "Quem Somos | LA Educação Polo Goiânia e Aparecida",
    meta: [
      { name: "description", content: "Conheça a LA Educação. Nossa história, missão, valores e equipe pedagógica. Polo autorizado EAD focado na qualificação profissional e conclusão de estudos." },
      { property: "og:title", content: "Quem Somos | LA Educação Polo Goiânia e Aparecida" },
      { property: "og:description", content: "Nossa história, missão, valores e equipe de professores. Conheça o polo autorizado EAD focado na Educação de Jovens e Adultos e cursos profissionalizantes." },
      { property: "og:url", content: "https://www.laeducacaogo.com.br/quem-somos" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://www.laeducacaogo.com.br/img/banner-cursos-ead-goiania.png" }
    ],
    links: [{ rel: "canonical", href: "https://www.laeducacaogo.com.br/quem-somos" }]
  })
});

function QuemSomosPage() {
  const teachers = [
    { name: "Prof. Dr. Alexandre Silva", role: "Coordenador Pedagógico", desc: "Doutor em Educação com mais de 15 anos de experiência em gestão educacional EAD." },
    { name: "Profª. Msc. Sandra Regina", role: "Supervisora de EJA", desc: "Mestre em Metodologia de Ensino de Jovens e Adultos, orientadora de programas digitais." },
    { name: "Profª. Especialista Letícia Carmo", role: "Tutoria de Linguagens", desc: "Especialista em Língua Portuguesa e Redação com foco em exames supletivos." },
    { name: "Prof. Roberto Mendes", role: "Tutoria de Ciências Exatas", desc: "Licenciado em Matemática, focado em metodologias simplificadas para EAD." }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-800">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative bg-[#1a237e] text-white pt-32 pb-20 px-5 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
          <nav className="text-sm text-neutral-300 mb-2 flex items-center gap-2">
            <Link to="/" className="hover:underline">Início</Link>
            <span>/</span>
            <span className="text-white">Quem Somos</span>
          </nav>
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
            Quem Somos — LA Educação
          </h1>
          <p className="text-lg text-neutral-100 max-w-2xl">
            Transformando vidas através do ensino digital de excelência e qualificando jovens e adultos para o mercado de trabalho em Goiás.
          </p>
        </div>
      </section>

      {/* About Description */}
      <section className="py-16 px-5 max-w-4xl mx-auto prose prose-neutral">
        <h2 className="text-3xl font-bold text-[#1a237e] mb-6">Nossa História</h2>
        <p className="text-neutral-600 leading-relaxed mb-6">
          A LA Educação nasceu com o propósito de democratizar o acesso à educação de qualidade no estado de Goiás. Como um polo autorizado e licenciado para cursos EAD, buscamos remover as barreiras físicas que impediam milhares de pessoas de concluir os estudos ou de obter uma qualificação técnica e profissionalizante essencial para o desenvolvimento profissional.
        </p>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Com sede e polo de apoio regional em Goiânia, atuamos em estreita parceria com instituições educacionais credenciadas nos Conselhos de Educação e registradas no Ministério da Educação (MEC). Nossa jornada é pautada pela ética educacional, pela transparência jurídica e pelo compromisso com o aproveitamento real de cada aluno que confia em nossos programas de <strong>Educação de Jovens e Adultos (EJA)</strong>, Supletivos e Cursos Profissionalizantes.
        </p>

        <h3 className="text-2xl font-bold text-[#1a237e] mt-8 mb-4">Missão, Visão e Valores</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 not-prose">
          <div className="p-6 bg-neutral-50 rounded-xl border border-neutral-200 flex flex-col gap-3">
            <Target className="w-10 h-10 text-[#da1069]" />
            <h4 className="font-bold text-[#1a237e] text-lg">Nossa Missão</h4>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Oferecer ensino flexível, sério e de qualidade, permitindo que jovens e adultos superem lacunas escolares e alcancem melhores cargos e salários no mercado de trabalho.
            </p>
          </div>
          <div className="p-6 bg-neutral-50 rounded-xl border border-neutral-200 flex flex-col gap-3">
            <Compass className="w-10 h-10 text-[#da1069]" />
            <h4 className="font-bold text-[#1a237e] text-lg">Nossa Visão</h4>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Ser reconhecida como a principal referência em educação de jovens e adultos a distância e cursos rápidos profissionalizantes do estado de Goiás até 2028.
            </p>
          </div>
          <div className="p-6 bg-neutral-50 rounded-xl border border-neutral-200 flex flex-col gap-3">
            <Heart className="w-10 h-10 text-[#da1069]" />
            <h4 className="font-bold text-[#1a237e] text-lg">Nossos Valores</h4>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Respeito ao tempo e individualidade do estudante, integridade jurídica absoluta nos certificados emitidos, acolhimento pedagógico e valorização humana.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-[#1a237e] mt-12 mb-4">Nossa Estrutura e Parcerias</h3>
        <p className="text-neutral-600 leading-relaxed mb-6">
          A LA Educação opera sob licença autorizada de sistemas educacionais homologados, garantindo que todo o material de estudo, ambiente virtual de aprendizagem (AVA) e estrutura de provas atenda às diretrizes exigidas pelos Conselhos Estaduais de Educação e Ministério da Educação (MEC). Nossa atuação foca no suporte direto ao estudante em Goiânia, Aparecida de Goiânia e municípios adjacentes em Goiás, com atendimento ágil por WhatsApp e auxílio burocrático na validação de documentos escolares.
        </p>

        <h3 className="text-2xl font-bold text-[#1a237e] mt-12 mb-4">Corpo Docente e Gestão</h3>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Contamos com profissionais experientes na orientação e acompanhamento de alunos da modalidade de Educação de Jovens e Adultos (EJA) a distância. Nossa equipe pedagógica atua na facilitação dos conteúdos didáticos de exatas, biológicas e humanas, garantindo uma aprendizagem focada nas principais necessidades profissionais.
        </p>
      </section>

      {/* Teachers Section */}
      <section className="py-16 bg-neutral-50 border-t border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="text-3xl font-bold text-center text-[#1a237e] mb-12">Corpo Docente em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {teachers.map((t, i) => (
              <div key={i} className="p-6 bg-white rounded-xl shadow-sm border border-neutral-200 text-center flex flex-col gap-3">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-[#da1069] font-bold text-xl">
                  {t.name[5]}
                </div>
                <h3 className="font-bold text-[#1a237e] text-base">{t.name}</h3>
                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">{t.role}</span>
                <p className="text-xs text-neutral-600 leading-relaxed mt-2">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Data Section */}
      <section className="py-16 px-5 max-w-4xl mx-auto">
        <div className="p-8 bg-blue-50 rounded-2xl border border-neutral-200 shadow-sm flex flex-col md:flex-row gap-6 items-center">
          <Award className="w-16 h-16 text-[#1a237e] flex-shrink-0" />
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-bold text-[#1a237e] text-lg mb-2">LA Educação — Licenciado Autorizado</h3>
            <p className="text-neutral-600 text-sm leading-relaxed mb-2">
              Oferecemos total segurança jurídica aos nossos alunos. Nosso polo atua sob o CNPJ <strong>58.208.328/0001-88</strong>.
            </p>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Todos os certificados de conclusão do EJA, Supletivos e cursos técnicos profissionalizantes são válidos em todo o Brasil para faculdade, exames nacionais (ENEM), concursos públicos e comprovação profissional.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
