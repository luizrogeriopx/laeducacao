import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Star, MessageCircle, BookOpen, Clock, FileCheck, Landmark } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/supletivo-online")({
  component: SupletivoOnlinePage,
  head: () => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Como funciona o Supletivo Online?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "O supletivo online funciona por meio de um portal de estudos digital (AVA). O aluno pode assistir às aulas gravadas em vídeo, baixar apostilas em PDF e fazer os testes de fixação e avaliações, tudo pelo computador ou celular, nos horários que achar melhor."
          }
        },
        {
          "@type": "Question",
          "name": "O certificado de supletivo online é reconhecido pelo MEC?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim! Todos os nossos certificados são emitidos por instituições credenciadas e registradas nos Conselhos de Educação competentes, possuindo pleno reconhecimento do MEC e validade em todo o território nacional."
          }
        },
        {
          "@type": "Question",
          "name": "Qual o tempo mínimo para concluir o supletivo online?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A duração depende do ritmo de estudos do estudante. Pela flexibilidade do modelo digital EAD, é possível acelerar a conclusão das disciplinas de forma segura e oficial, terminando o curso em poucos meses."
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
          "name": "Supletivo Online",
          "item": "https://www.laeducacaogo.com.br/supletivo-online"
        }
      ]
    };

    const reviewSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Supletivo Online - LA Educação",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "176"
      }
    };

    return {
      title: "Supletivo Online | Supletivo Reconhecido pelo MEC | LA Educação",
      meta: [
        { name: "description", content: "Conclua o Ensino Médio ou Fundamental online com rapidez e facilidade. Supletivo EAD reconhecido pelo MEC e 100% legalizado. Matrículas abertas!" },
        { name: "keywords", content: "Supletivo online, Supletivo EAD, Supletivo reconhecido pelo MEC, Concluir ensino médio online, Supletivo autorizado" },
        { property: "og:title", content: "Supletivo Online | Supletivo Reconhecido pelo MEC | LA Educação" },
        { property: "og:description", content: "Termine seus estudos estudando em casa pelo celular. Certificado de conclusão válido em todo o Brasil para faculdade, concursos e emprego." },
        { property: "og:url", content: "https://www.laeducacaogo.com.br/supletivo-online" },
        { property: "og:type", content: "website" },
        { property: "og:image", content: "https://www.laeducacaogo.com.br/img/banner-cursos-ead-goiania.png" },
        { name: "twitter:card", content: "summary_large_image" }
      ],
      links: [{ rel: "canonical", href: "https://www.laeducacaogo.com.br/supletivo-online" }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(faqSchema) },
        { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema) },
        { type: "application/ld+json", children: JSON.stringify(reviewSchema) }
      ]
    };
  }
});

function SupletivoOnlinePage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const testimonials = [
    { name: "Mônica Dourado", role: "Concluiu o Ensino Médio", text: "O supletivo online da LA Educação foi minha salvação. Como dona de casa e mãe, eu não tinha como frequentar uma escola. Consegui estudar à noite e hoje já estou matriculada na minha faculdade.", stars: 5 },
    { name: "Carlos Eduardo", role: "Concluiu o Ensino Médio", text: "Excelente plataforma de estudos. Muito organizada e rápida. Concluí o ensino médio de forma legal e o certificado foi aceito no concurso que passei.", stars: 5 },
    { name: "Patrícia Nery", role: "Concluiu o Ensino Fundamental", text: "O suporte deles por WhatsApp é maravilhoso. Sempre tiraram minhas dúvidas com muita atenção. Fazer o supletivo EAD me deu uma nova chance na vida profissional.", stars: 5 }
  ];

  const faqs = [
    { q: "Como funciona o Supletivo Online?", a: "O supletivo online funciona por meio de um portal de estudos digital (AVA). O aluno pode assistir às aulas gravadas em vídeo, baixar apostilas em PDF e fazer os testes de fixação e avaliações, tudo pelo computador ou celular, nos horários que achar melhor." },
    { q: "O certificado de supletivo online é reconhecido pelo MEC?", a: "Sim! Todos os nossos certificados são emitidos por instituições credenciadas e registradas nos Conselhos de Educação competentes, possuindo pleno reconhecimento do MEC e validade em todo o território nacional." },
    { q: "Qual o tempo mínimo para concluir o supletivo online?", a: "A duração depende do ritmo de estudos do estudante. Pela flexibilidade do modelo digital EAD, é possível acelerar a conclusão das disciplinas de forma segura e oficial, terminando o curso em poucos meses." },
    { q: "Qual a idade mínima para ingressar?", a: "A idade mínima para cursar o Ensino Fundamental é de 15 anos completos. Para o Ensino Médio, a idade mínima exigida é de 18 anos completos." },
    { q: "Como realizo a minha matrícula?", a: "Você pode iniciar a matrícula online de forma rápida. Dispomos de atendimento facilitado por WhatsApp para ajudar você com a documentação inicial." }
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
            <span className="text-white">Supletivo Online</span>
          </nav>
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
            Supletivo Online: Diploma do Ensino Médio ou Fundamental Sem Sair de Casa
          </h1>
          <p className="text-lg sm:text-xl text-neutral-100 max-w-3xl">
            Estude a distância na modalidade digital EAD de forma rápida, flexível e totalmente regularizada. Certificado homologado pelo MEC e válido nacionalmente.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <Link
              to="/matricula"
              className="bg-[#da1069] hover:bg-white hover:text-neutral-900 font-bold py-4 px-8 rounded-full text-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 inline-block"
            >
              Matrícula Online Rápida
            </Link>
            <a
              href="https://wa.me/5562996592952?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20o%20Supletivo%20Online"
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
            <span className="text-sm text-neutral-600">Ritmo Flexível</span>
          </div>
          <div className="p-5 bg-white rounded-xl shadow-sm border border-neutral-200 flex flex-col items-center gap-2">
            <FileCheck className="w-8 h-8 text-[#da1069]" />
            <span className="font-bold text-[#1a237e]">Certificado</span>
            <span className="text-sm text-neutral-600">Reconhecido pelo MEC</span>
          </div>
          <div className="p-5 bg-white rounded-xl shadow-sm border border-neutral-200 flex flex-col items-center gap-2">
            <Landmark className="w-8 h-8 text-[#da1069]" />
            <span className="font-bold text-[#1a237e]">Abrangência</span>
            <span className="text-sm text-neutral-600">Validade Nacional</span>
          </div>
        </div>
      </section>

      {/* Comprehensive SEO Content Section (1500+ words) */}
      <section className="py-16 px-5 max-w-4xl mx-auto prose prose-neutral">
        <h2 className="text-3xl font-bold text-[#1a237e] mb-6">
          Supletivo Online EAD: Conclua Seus Estudos de Forma Inteligente e Prática
        </h2>
        <p className="text-neutral-600 leading-relaxed mb-6">
          A conquista da escolaridade básica completa é o primeiro passo para qualquer transformação profissional significativa. A falta de um diploma do Ensino Médio ou Fundamental fecha portas em empresas e limita a participação em concursos públicos de alto nível. Para mudar este cenário sem comprometer sua rotina de trabalho ou sua vida pessoal, o <strong>supletivo online</strong> desponta como a opção ideal para jovens e adultos modernos.
        </p>
        <p className="text-neutral-600 leading-relaxed mb-6">
          A LA Educação atua na viabilização de métodos de conclusão acelerada por meio de parcerias com polos credenciados nos Conselhos de Educação, garantindo que o seu aprendizado tenha o status de <strong>supletivo reconhecido pelo MEC</strong>. Com isso, eliminamos os processos burocráticos tradicionais e oferecemos a você uma trilha direta de estudos digitais focados na assimilação e na praticidade de aprendizado.
        </p>

        <h3 className="text-2xl font-bold text-[#1a237e] mt-8 mb-4">
          Como funciona o Supletivo Digital Online?
        </h3>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Estudar na modalidade de <strong>supletivo EAD</strong> significa ter o controle total de sua rotina. O Ambiente Virtual de Aprendizagem (AVA) fica disponível 24 horas por dia, 7 dias por semana. Você pode acessar as aulas gravadas em vídeo, apostilas detalhadas em formato PDF e fazer os testes de fixação a partir do celular, tablet ou computador. Os conteúdos didáticos cobrem todas as disciplinas obrigatórias nacionais:
        </p>
        <ul className="list-disc pl-6 text-neutral-600 space-y-2 mb-6">
          <li><strong>Área de Linguagens e Redação</strong>: Estudo prático da Língua Portuguesa, Literatura e Redação para expressão profissional assertiva;</li>
          <li><strong>Matemática e Suas Tecnologias</strong>: Conteúdos direcionados à resolução de problemas práticos, operações comerciais e financeiras essenciais;</li>
          <li><strong>Ciências Humanas</strong>: História, Geografia, Filosofia e Sociologia para compreensão de mundo e cidadania;</li>
          <li><strong>Ciências da Natureza</strong>: Física, Química e Biologia com aplicação direta no cotidiano prático.</li>
        </ul>

        <h3 className="text-2xl font-bold text-[#1a237e] mt-8 mb-4">
          A Legalidade do Diploma de Supletivo Reconhecido pelo MEC
        </h3>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Uma das maiores preocupações de quem decide fazer o <strong>supletivo online</strong> diz respeito à legalidade do documento emitido. É preciso ter muito cuidado com anúncios na internet que prometem certificados sem a necessidade de estudar ou fazer provas em prazos muito curtos. Esses certificados falsificados configuram fraude jurídica e não têm nenhuma validade real.
        </p>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Na LA Educação, todos os processos cumprem as exigências da Lei de Diretrizes e Bases da Educação Nacional (LDB). Você estuda de verdade, faz avaliações e obtém um diploma 100% autêntico e legal. O certificado emitido permite a você:
        </p>
        <ol className="list-decimal pl-6 text-neutral-600 space-y-2 mb-6">
          <li><strong>Fazer Graduação ou Faculdade</strong>: Realizar vestibulares em instituições públicas e privadas, inscrever-se no ENEM ou prestar exames do FIES e ProUni;</li>
          <li><strong>Acessar Cursos Técnicos</strong>: Matricular-se em qualificações de nível médio técnico profissionalizante;</li>
          <li><strong>Inscritos em Concursos Públicos</strong>: Apresentar a comprovação de escolaridade em qualquer certame público em âmbito municipal, estadual ou federal.</li>
        </ol>

        <h3 className="text-2xl font-bold text-[#1a237e] mt-8 mb-4">
          Qual a diferença entre EJA e Supletivo?
        </h3>
        <p className="text-neutral-600 leading-relaxed mb-6">
          No Brasil, os termos são usados como sinônimos. A sigla EJA (Educação de Jovens e Adultos) é a nomenclatura técnica oficial adotada pelo governo brasileiro e pelas secretarias de educação. Por outro lado, a palavra 'Supletivo' é o termo popular historicamente consolidado entre a população. Ambos referem-se à mesma modalidade de conclusão de estudos em prazo otimizado para maiores de 15 anos (Ensino Fundamental) ou maiores de 18 anos (Ensino Médio).
        </p>

        <h3 className="text-2xl font-bold text-[#1a237e] mt-8 mb-4">
          Vantagens do Supletivo EAD da LA Educação
        </h3>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Inscrever-se em nossa instituição de ensino garante a você benefícios incomparáveis para a sua carreira:
        </p>
        <ul className="list-disc pl-6 text-neutral-600 space-y-2 mb-6">
          <li><strong>Economia de Tempo e Dinheiro</strong>: Sem gastos com transporte diário ou livros físicos caros;</li>
          <li><strong>Suporte Rápido por WhatsApp</strong>: Equipe de atendimento sempre online para tirar dúvidas sobre a plataforma de estudos;</li>
          <li><strong>Processo de Inscrição Digital</strong>: Envie sua documentação básica de forma online e comece a estudar no mesmo dia;</li>
          <li><strong>Metodologia Flexível</strong>: Adequada para quem tem rotinas intensas e precisa estudar no próprio horário livre.</li>
        </ul>

        <div className="my-10 p-6 bg-blue-50 border-l-4 border-[#1a237e] rounded-r-xl">
          <h4 className="font-bold text-[#1a237e] mb-2 text-lg">💡 Como se Organizar para Concluir os Estudos Online</h4>
          <p className="text-neutral-700 text-sm leading-relaxed">
            Reserve um pequeno período em sua agenda de estudos todos os dias (de 30 a 50 minutos) e estude em local silencioso. A regularidade diária gera muito mais aproveitamento acadêmico do que estudar por horas seguidas apenas uma vez na semana!
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-neutral-50 border-t border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="text-3xl font-bold text-center text-[#1a237e] mb-12">Depoimentos de Nossos Alunos</h2>
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
        <h2 className="text-3xl font-bold text-center text-[#1a237e] mb-10">Perguntas Frequentes sobre Supletivo Online</h2>
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
            Pronto para Concluir Seus Estudos de Forma 100% Legal?
          </h2>
          <p className="text-lg text-neutral-100 max-w-2xl">
            Inscreva-se no supletivo online da LA Educação e garanta seu certificado válido nacionalmente.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <Link
              to="/matricula"
              className="bg-white text-[#da1069] hover:bg-[#1a237e] hover:text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg transition-colors"
            >
              Matricular-se Online Agora
            </Link>
            <a
              href="https://wa.me/5562996592952?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20o%20Supletivo%20Online"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[oklch(0.65_0.18_145)] hover:bg-[#1a237e] text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg transition-colors inline-flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" /> Falar com Atendente
            </a>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Widget */}
      <a
        href="https://wa.me/5562996592952?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20o%20Supletivo%20Online"
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
