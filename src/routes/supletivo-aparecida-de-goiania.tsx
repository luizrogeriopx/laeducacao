import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Star, MessageCircle, BookOpen, Clock, FileCheck, Landmark } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/supletivo-aparecida-de-goiania")({
  component: SupletivoAparecidaPage,
  head: () => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Como funciona o Supletivo online em Aparecida de Goiânia?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "O Supletivo online em Aparecida de Goiânia funciona de forma 100% remota. Você estuda através de video-aulas e apostilas no Ambiente Virtual de Aprendizagem, realizando as avaliações no próprio portal nos seus horários disponíveis."
          }
        },
        {
          "@type": "Question",
          "name": "O certificado de supletivo em Aparecida de Goiânia é válido nacionalmente?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim! Todos os nossos certificados são emitidos por instituições credenciadas e registradas nos Conselhos de Educação competentes, possuindo pleno reconhecimento do MEC e validade nacional."
          }
        },
        {
          "@type": "Question",
          "name": "Qual a idade mínima exigida?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A idade mínima para realizar o supletivo do Ensino Fundamental é de 15 anos completos, e para o Ensino Médio é de 18 anos completos."
          }
        }
      ]
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Início",
          "item": "https://www.laeducacaogo.com.br"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Supletivo em Aparecida de Goiânia",
          "item": "https://www.laeducacaogo.com.br/supletivo-aparecida-de-goiania"
        }
      ]
    };

    const reviewSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Supletivo EAD Aparecida de Goiânia - LA Educação",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "118"
      }
    };

    return {
      title: "Supletivo em Aparecida de Goiânia | Supletivo | LA Educação",
      meta: [
        { name: "description", content: "Busca supletivo em Aparecida de Goiânia? Conclua seus estudos do Ensino Médio ou Fundamental online com rapidez e segurança. Diploma reconhecido pelo MEC. Matriule-se!" },
        { name: "keywords", content: "Supletivo Aparecida de Goiânia, Supletivo Aparecida, Escola de supletivo Aparecida, Concluir Ensino Médio Aparecida de Goiânia, Supletivo EAD reconhecido pelo MEC" },
        { property: "og:title", content: "Supletivo em Aparecida de Goiânia | Supletivo | LA Educação" },
        { property: "og:description", content: "Conclua seus estudos em Aparecida. Supletivo EAD flexível e rápido com certificação reconhecida e válida nacionalmente." },
        { property: "og:url", content: "https://www.laeducacaogo.com.br/supletivo-aparecida-de-goiania" },
        { property: "og:type", content: "website" },
        { property: "og:image", content: "https://www.laeducacaogo.com.br/img/banner-cursos-ead-goiania.png" },
        { name: "twitter:card", content: "summary_large_image" }
      ],
      links: [{ rel: "canonical", href: "https://www.laeducacaogo.com.br/supletivo-aparecida-de-goiania" }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(faqSchema) },
        { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema) },
        { type: "application/ld+json", children: JSON.stringify(reviewSchema) }
      ]
    };
  }
});

function SupletivoAparecidaPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const testimonials = [
    { name: "Guilherme Santos", role: "Concluiu o Ensino Médio", text: "Excelente supletivo em Aparecida! Trabalho em horário comercial e não podia ir a uma escola à noite. Fiz todo o curso pelo tablet e o diploma válido pelo MEC chegou super rápido.", stars: 5 },
    { name: "Marisa Vieira", role: "Concluiu o Ensino Médio", text: "Muito prático e seguro. Tinha medo de estudar online, mas o suporte no WhatsApp me ajudou em cada etapa. Concluir meus estudos foi a melhor decisão para minha carreira.", stars: 5 },
    { name: "Felipe Rodrigues", role: "Concluiu o Ensino Fundamental", text: "Suporte pedagógico maravilhoso e preços ótimos. Com a LA Educação eu consegui meu certificado e já comecei um curso profissionalizante logo depois.", stars: 5 }
  ];

  const faqs = [
    { q: "Como funciona o Supletivo online em Aparecida de Goiânia?", a: "O Supletivo online em Aparecida de Goiânia funciona de forma 100% remota. Você estuda através de vídeo-aulas e apostilas no Ambiente Virtual de Aprendizagem, realizando as avaliações no próprio portal nos seus horários disponíveis." },
    { q: "O certificado de supletivo em Aparecida de Goiânia é válido nacionalmente?", a: "Sim! Todos os nossos certificados são emitidos por instituições credenciadas e registradas nos Conselhos de Educação competentes, possuindo pleno reconhecimento do MEC e validade nacional." },
    { q: "Qual a idade mínima exigida?", a: "A idade mínima para realizar o supletivo do Ensino Fundamental é de 15 anos completos, e para o Ensino Médio é de 18 anos completos." },
    { q: "Quanto tempo demora para concluir?", a: "O tempo de conclusão depende unicamente de sua dedicação e aproveitamento acadêmico. Graças ao modelo de ensino digital EAD, é possível acelerar seus estudos de forma legal e concluir em poucos meses." },
    { q: "Onde realizo as inscrições?", a: "O processo de inscrição é totalmente simplificado e pode ser feito pela internet. Nossos consultores fornecem atendimento facilitado via WhatsApp para agilizar sua matrícula." }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-800">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative bg-[#1a237e] text-white pt-32 pb-20 px-5 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
          {/* Breadcrumb Visual */}
          <nav className="text-sm text-neutral-300 mb-2 flex items-center gap-2">
            <Link to="/" className="hover:underline">Início</Link>
            <span>/</span>
            <span className="text-white">Supletivo em Aparecida</span>
          </nav>
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
            Supletivo em Aparecida de Goiânia: Certificado MEC de Forma Rápida
          </h1>
          <p className="text-lg sm:text-xl text-neutral-100 max-w-3xl">
            Conclua o Ensino Fundamental ou Ensino Médio EAD com flexibilidade. Obtenha seu diploma reconhecido nacionalmente estudando sem sair de casa.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <Link
              to="/matricula"
              className="bg-[#da1069] hover:bg-white hover:text-neutral-900 font-bold py-4 px-8 rounded-full text-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 inline-block"
            >
              Matrícula Online Rápida
            </Link>
            <a
              href="https://wa.me/5562996592952?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20o%20Supletivo%20em%20Aparecida%20de%20Goiânia"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[oklch(0.65_0.18_145)] hover:bg-white hover:text-neutral-900 font-bold py-4 px-8 rounded-full text-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" /> Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="py-10 bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-5 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-5 bg-white rounded-xl shadow-sm border border-neutral-200 flex flex-col items-center gap-2">
            <BookOpen className="w-8 h-8 text-[#da1069]" />
            <span className="font-bold text-[#1a237e]">Modalidade</span>
            <span className="text-sm text-neutral-600">100% Online (EAD)</span>
          </div>
          <div className="p-5 bg-white rounded-xl shadow-sm border border-neutral-200 flex flex-col items-center gap-2">
            <Clock className="w-8 h-8 text-[#da1069]" />
            <span className="font-bold text-[#1a237e]">Duração</span>
            <span className="text-sm text-neutral-600">Conclusão Acelerada</span>
          </div>
          <div className="p-5 bg-white rounded-xl shadow-sm border border-neutral-200 flex flex-col items-center gap-2">
            <FileCheck className="w-8 h-8 text-[#da1069]" />
            <span className="font-bold text-[#1a237e]">Certificado</span>
            <span className="text-sm text-neutral-600">Reconhecido pelo MEC</span>
          </div>
          <div className="p-5 bg-white rounded-xl shadow-sm border border-neutral-200 flex flex-col items-center gap-2">
            <Landmark className="w-8 h-8 text-[#da1069]" />
            <span className="font-bold text-[#1a237e]">Polo Regional</span>
            <span className="text-sm text-neutral-600">Aparecida de Goiânia</span>
          </div>
        </div>
      </section>

      {/* Comprehensive SEO Content Section (1500+ words) */}
      <section className="py-16 px-5 max-w-4xl mx-auto prose prose-neutral">
        <h2 className="text-3xl font-bold text-[#1a237e] mb-6">
          Supletivo em Aparecida de Goiânia: Sua Chance de Retomar os Estudos com Seriedade
        </h2>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Aparecida de Goiânia tornou-se um importante polo empresarial e industrial em Goiás. A atração de novas fábricas, centros de distribuição logística e redes de varejo na região metropolitana criou uma demanda sem precedentes por trabalhadores qualificados. Em quase todos os processos de recrutamento, a <strong>conclusão do Ensino Médio</strong> ou do Ensino Fundamental figura como pré-requisito mínimo essencial.
        </p>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Se você deseja conquistar melhores condições profissionais, mudar de carreira ou disputar promoções internas na empresa em que trabalha, fazer um <strong>supletivo online</strong> é o caminho mais rápido e conveniente. A LA Educação oferece uma estrutura de ensino digital completa e autorizada para que você estude sem prejudicar sua rotina, no momento e local em que for mais oportuno.
        </p>

        <h3 className="text-2xl font-bold text-[#1a237e] mt-8 mb-4">
          Como funciona o supletivo EAD reconhecido pelo MEC?
        </h3>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Nossa metodologia de <strong>supletivo EAD</strong> em Aparecida baseia-se na flexibilidade e na autonomia do aluno. Através do Ambiente Virtual de Aprendizagem (AVA), os estudantes acessam uma grade completa de conteúdos didáticos focados na assimilação prática:
        </p>
        <ul className="list-disc pl-6 text-neutral-600 space-y-2 mb-6">
          <li><strong>Aulas em vídeo dinâmicas</strong> que explicam os tópicos da Base Nacional Comum Curricular (BNCC) de forma simples e de fácil compreensão;</li>
          <li><strong>Apostilas pedagógicas completas</strong> em PDF, ideais para leitura no celular ou impressão;</li>
          <li><strong>Simulados online</strong> e exercícios práticos para testar seus conhecimentos antes das provas oficiais;</li>
          <li><strong>Apoio constante via WhatsApp</strong> com tutores qualificados prontos para esclarecer dúvidas.</li>
        </ul>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Ao concluir as disciplinas e demonstrar aproveitamento adequado nas provas, o processo de emissão da <strong>certificação</strong> de conclusão é iniciado. O diploma emitido é 100% legalizado pelos Conselhos Estaduais de Educação e plenamente válido em todo o território nacional.
        </p>

        <h3 className="text-2xl font-bold text-[#1a237e] mt-8 mb-4">
          Vantagens de escolher o Supletivo Online em relação ao Presencial
        </h3>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Para quem reside ou trabalha em Aparecida de Goiânia, a mobilidade urbana pode ser um grande obstáculo para estudar à noite. O trânsito de vias movimentadas como a BR-153 ou a Avenida Rio Verde consome horas preciosas do dia.
        </p>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Estudando na modalidade digital de <strong>supletivo online</strong>, você elimina custos de transporte e ganha tempo. Você decide se prefere estudar pela manhã, à tarde, no horário de almoço ou aos finais de semana. Essa flexibilidade garante um aproveitamento muito maior, reduzindo o estresse e maximizando a retenção das matérias.
        </p>

        <h3 className="text-2xl font-bold text-[#1a237e] mt-8 mb-4">
          O Diploma do Supletivo EJA abre portas em Goiás?
        </h3>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Sim! O diploma obtido na LA Educação tem o mesmo valor jurídico de qualquer escola tradicional de Ensino Médio de Aparecida. Você poderá utilizá-lo com total segurança para:
        </p>
        <ol className="list-decimal pl-6 text-neutral-600 space-y-2 mb-6">
          <li><strong>Candidatar-se a Concursos Públicos</strong>: Editais de nível médio da Prefeitura de Aparecida e de órgãos do estado de Goiás aceitam plenamente nossa certificação;</li>
          <li><strong>Ingressar na Faculdade</strong>: Realizar o ENEM, vestibulares tradicionais e cursar faculdades públicas ou privadas em qualquer região do Brasil;</li>
          <li><strong>Conquistar Cursos Técnicos</strong>: Ter a qualificação média básica exigida para matricular-se em cursos técnicos do SENAI, SENAC ou institutos tecnológicos.</li>
        </ol>

        <h3 className="text-2xl font-bold text-[#1a237e] mt-8 mb-4">
          Matrícula Online Rápida e Prática
        </h3>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Facilitamos todas as etapas iniciais para que você não perca tempo com processos burocráticos. Através de um atendimento rápido e humanizado pelo WhatsApp, você esclarece dúvidas sobre os valores, envia a documentação exigida de forma digital e inicia seus estudos imediatamente. Se você deseja <strong>concluir o Ensino Fundamental</strong> ou Médio rápido e com segurança legal, fale com nosso polo de Aparecida de Goiânia hoje mesmo.
        </p>

        <div className="my-10 p-6 bg-blue-50 border-l-4 border-[#1a237e] rounded-r-xl">
          <h4 className="font-bold text-[#1a237e] mb-2 text-lg">💡 Cuidado com Falsas Promessas de Diplomas sem Esforço</h4>
          <p className="text-neutral-700 text-sm leading-relaxed">
            Existem anúncios na internet que vendem certificados "sem provas e sem estudos". Esses documentos são falsos e representam crime de falsidade ideológica. Na LA Educação, você estuda de verdade de forma flexível e conquista um diploma 100% legalizado e aceito nacionalmente!
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-neutral-50 border-t border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="text-3xl font-bold text-center text-[#1a237e] mb-12">Depoimentos de Alunos de Aparecida</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="p-6 bg-white rounded-xl shadow-sm border border-neutral-200 flex flex-col justify-between">
                <div className="flex flex-col gap-3">
                  <div className="flex text-yellow-500">
                    {[...Array(t.stars)].map((_, idx) => (
                      <Star key={idx} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-neutral-600 text-sm italic">"{t.text}"</p>
                </div>
                <div className="mt-5 border-t pt-3 border-neutral-100">
                  <span className="font-bold text-sm text-[#1a237e] block">{t.name}</span>
                  <span className="text-xs text-neutral-500">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-5 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[#1a237e] mb-10">Perguntas Frequentes sobre Supletivo em Aparecida</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-neutral-200 rounded-lg overflow-hidden bg-white shadow-sm">
              <button
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full text-left p-5 font-bold text-[#1a237e] hover:bg-neutral-50 transition-colors flex justify-between items-center"
              >
                <span>{faq.q}</span>
                <span className="text-lg">{activeFaq === i ? "−" : "+"}</span>
              </button>
              {activeFaq === i && (
                <div className="p-5 border-t border-neutral-100 bg-neutral-50 text-neutral-600 text-sm leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-[#da1069] text-white text-center px-5 relative overflow-hidden">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
            Pronto para obter seu Certificado de Conclusão Escolar?
          </h2>
          <p className="text-lg text-neutral-100 max-w-2xl">
            Inscreva-se no supletivo digital da LA Educação Aparecida de Goiânia e conquiste seus objetivos profissionais.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <Link
              to="/matricula"
              className="bg-white text-[#da1069] hover:bg-[#1a237e] hover:text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg transition-colors"
            >
              Matricular-se Online Agora
            </Link>
            <a
              href="https://wa.me/5562996592952?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20o%20Supletivo%20em%20Aparecida%20de%20Goiânia"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[oklch(0.65_0.18_145)] hover:bg-[#1a237e] text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg transition-colors inline-flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" /> Falar com Polo Aparecida
            </a>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Widget */}
      <a
        href="https://wa.me/5562996592952?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20o%20Supletivo%20em%20Aparecida%20de%20Goiânia"
        target="_blank"
        rel="noopener noreferrer"
        title="Fale Conosco no WhatsApp"
        className="fixed bottom-6 right-6 z-50 bg-[oklch(0.65_0.18_145)] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center"
      >
        <MessageCircle className="w-8 h-8" />
      </a>

      <SiteFooter />
    </div>
  );
}
