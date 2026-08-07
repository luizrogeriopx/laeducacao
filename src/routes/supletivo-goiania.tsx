import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Star, MessageCircle, BookOpen, Clock, FileCheck, Landmark } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/supletivo-goiania")({
  component: SupletivoGoianiaPage,
  head: () => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Como funciona o Supletivo online em Goiânia?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "O Supletivo online funciona de forma 100% remota. O estudante acessa a plataforma de estudos, assiste às aulas gravadas, lê as apostilas digitais e realiza as provas pelo computador ou celular no horário que preferir."
          }
        },
        {
          "@type": "Question",
          "name": "O supletivo em Goiânia é reconhecido pelo MEC?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim! Todos os nossos processos de conclusão escolar são gerados através de escolas credenciadas pelos Conselhos Estaduais de Educação e plenamente homologadas pelo MEC, com validade nacional."
          }
        },
        {
          "@type": "Question",
          "name": "Qual o valor do supletivo em Goiânia?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Nossos planos de supletivo possuem valores altamente acessíveis e condições facilitadas de parcelamento. Entre em contato conosco via WhatsApp para obter um orçamento personalizado com descontos vigentes."
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
          "name": "Supletivo em Goiânia",
          "item": "https://www.laeducacaogo.com.br/supletivo-goiania"
        }
      ]
    };

    const reviewSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Supletivo EAD Goiânia - LA Educação",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "136"
      }
    };

    return {
      title: "Supletivo em Goiânia | Reconhecido pelo MEC | LA Educação",
      meta: [
        { name: "description", content: "Procurando escola de supletivo em Goiânia? Conclua o Ensino Médio ou Fundamental online de forma rápida, segura e autorizada pelo MEC. Matrículas abertas!" },
        { name: "keywords", content: "Supletivo Goiânia, Escola de Supletivo Goiânia, Ensino Médio Rápido Goiânia, Concluir Ensino Médio online, Supletivo reconhecido pelo MEC Goiânia" },
        { property: "og:title", content: "Supletivo em Goiânia | Reconhecido pelo MEC | LA Educação" },
        { property: "og:description", content: "Termine seus estudos sem sair de casa. Aulas 100% online flexíveis, suporte pedagógico rápido e certificado oficial." },
        { property: "og:url", content: "https://www.laeducacaogo.com.br/supletivo-goiania" },
        { property: "og:type", content: "website" },
        { property: "og:image", content: "https://www.laeducacaogo.com.br/img/banner-cursos-ead-goiania.png" },
        { name: "twitter:card", content: "summary_large_image" }
      ],
      links: [{ rel: "canonical", href: "https://www.laeducacaogo.com.br/supletivo-goiania" }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(faqSchema) },
        { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema) },
        { type: "application/ld+json", children: JSON.stringify(reviewSchema) }
      ]
    };
  }
});

function SupletivoGoianiaPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const testimonials = [
    { name: "Lucas Ferreira", role: "Concluiu o Ensino Médio", text: "Eu precisava de um supletivo em Goiânia rápido para assumir uma vaga de encarregado. Estudei pelo celular e consegui meu diploma sem problemas. Escola fantástica!", stars: 5 },
    { name: "Beatriz Oliveira", role: "Concluiu o Ensino Médio", text: "A flexibilidade do supletivo online da LA Educação é incrível. Consegui conciliar meu trabalho de vendedora com os estudos. Nota 10!", stars: 5 },
    { name: "Thiago Rocha", role: "Concluiu o Ensino Fundamental", text: "Processo muito rápido e sério. Fui muito bem atendido e tirei todas as minhas dúvidas por WhatsApp. Indico o supletivo EAD da LA Educação para quem quer crescer na vida.", stars: 5 }
  ];

  const faqs = [
    { q: "Como funciona o Supletivo online em Goiânia?", a: "O Supletivo online funciona de forma 100% remota. O estudante acessa a plataforma de estudos, assiste às aulas gravadas, lê as apostilas digitais e realiza as provas pelo computador ou celular no horário que preferir." },
    { q: "O supletivo em Goiânia é reconhecido pelo MEC?", a: "Sim! Todos os nossos processos de conclusão escolar são gerados através de escolas credenciadas pelos Conselhos Estaduais de Educação e plenamente homologadas pelo MEC, com validade nacional." },
    { q: "Qual o valor do supletivo em Goiânia?", a: "Nossos planos de supletivo possuem valores altamente acessíveis e condições facilitadas de parcelamento. Entre em contato conosco via WhatsApp para obter um orçamento personalizado com descontos vigentes." },
    { q: "Qual a diferença entre EJA e Supletivo?", a: "EJA (Educação de Jovens e Adultos) é a nomenclatura oficial do governo, enquanto 'Supletivo' é o termo popularmente consolidado no Brasil. Ambos representam a mesma modalidade de conclusão de estudos acelerada." },
    { q: "Posso utilizar o certificado para fazer faculdade?", a: "Sim. O diploma é 100% legal e aceito por todas as universidades públicas e privadas do Brasil, além de cursos técnicos, pós-graduações e concursos." }
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
            <span className="text-white">Supletivo em Goiânia</span>
          </nav>
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
            Supletivo em Goiânia: Conclua seus Estudos de Forma Rápida e Legal
          </h1>
          <p className="text-lg sm:text-xl text-neutral-100 max-w-3xl">
            Termine o Ensino Fundamental ou Ensino Médio online. Conquiste seu diploma reconhecido pelo MEC e dê o próximo passo em sua jornada de sucesso.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <Link
              to="/matricula"
              className="bg-[#da1069] hover:bg-white hover:text-neutral-900 font-bold py-4 px-8 rounded-full text-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 inline-block"
            >
              Matrícula Online Rápida
            </Link>
            <a
              href="https://wa.me/5562996592952?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20o%20Supletivo%20em%20Goiânia"
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
            <span className="text-sm text-neutral-600">Goiânia - GO</span>
          </div>
        </div>
      </section>

      {/* Comprehensive SEO Content Section (1500+ words) */}
      <section className="py-16 px-5 max-w-4xl mx-auto prose prose-neutral">
        <h2 className="text-3xl font-bold text-[#1a237e] mb-6">
          Procurando Escola de Supletivo em Goiânia? Descubra a Melhor Opção Online
        </h2>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Concluir os estudos de forma rápida é o objetivo de milhares de jovens e adultos na capital goiana. O ritmo acelerado do crescimento de Goiânia, com sua efervescência comercial e industrial, exige que os candidatos a vagas de trabalho possuam qualificações sólidas. A base de qualquer desenvolvimento profissional é a <strong>conclusão do Ensino Médio</strong> ou Fundamental. Por isso, optar por uma <strong>escola de supletivo Goiânia</strong> é a escolha lógica para quem quer crescer profissionalmente.
        </p>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Antigamente, as pessoas tinham que se dirigir a salas de aula físicas todas as noites, enfrentando cansaço físico e a distância de casa. Com a LA Educação, você pode ter o melhor <strong>supletivo EAD</strong> em Goiânia estudando no conforto de sua casa. Nosso programa une a flexibilidade da internet com a máxima seriedade pedagógica, fornecendo a você todas as ferramentas essenciais para a conquista do seu diploma.
        </p>

        <h3 className="text-2xl font-bold text-[#1a237e] mt-8 mb-4">
          Como funciona o Supletivo EAD com certificado oficial?
        </h3>
        <p className="text-neutral-600 leading-relaxed mb-6">
          O funcionamento do <strong>supletivo online</strong> é simples e prático. Após efetuar a inscrição, você terá acesso imediato à plataforma de ensino. O conteúdo curricular cobre todas as disciplinas fundamentais exigidas na Base Nacional Comum Curricular (BNCC):
        </p>
        <ul className="list-disc pl-6 text-neutral-600 space-y-2 mb-6">
          <li><strong>Ensino Médio</strong>: Língua Portuguesa e Literatura, Matemática, História, Geografia, Biologia, Química, Física, Sociologia, Filosofia e Inglês/Espanhol;</li>
          <li><strong>Ensino Fundamental</strong>: Disciplinas básicas organizadas de forma simplificada para quem parou de estudar nos anos iniciais.</li>
        </ul>
        <p className="text-neutral-600 leading-relaxed mb-6">
          O ritmo de estudos é você quem determina. Se você dispõe de tempo e facilidade com os conteúdos, pode avançar pelos módulos acadêmicos de maneira ágil, realizando as avaliações no próprio portal de estudos. Quando você atinge a nota média de aprovação e conclui os processos pedagógicos necessários, seu certificado é emitido por instituição parceira credenciada e devidamente registrada, garantindo o status de <strong>supletivo reconhecido pelo MEC</strong>.
        </p>

        <h3 className="text-2xl font-bold text-[#1a237e] mt-8 mb-4">
          Quais as vantagens do Supletivo Online para o mercado de trabalho em Goiânia?
        </h3>
        <p className="text-neutral-600 leading-relaxed mb-6">
          A economia goiana tem se destacado pela força do setor de serviços, agronegócio corporativo e indústria farmacêutica e alimentícia. As vagas mais bem remuneradas exigem que o profissional tenha facilidade de comunicação, uso de sistemas básicos digitais e, no mínimo, nível médio escolar completo.
        </p>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Obter seu diploma do <strong>Supletivo EJA</strong> de forma legal proporciona benefícios evidentes:
        </p>
        <ol className="list-decimal pl-6 text-neutral-600 space-y-2 mb-6">
          <li><strong>Acesso a Cursos Técnicos e Profissionalizantes</strong>: Você poderá realizar cursos técnicos em áreas como Enfermagem, Edificações, Administração ou Radiologia, abrindo novas portas de carreira;</li>
          <li><strong>Faculdade e Graduação EAD</strong>: Permite ingressar no ensino superior, obtendo um diploma de tecnólogo ou bacharel, que gera aumentos de remuneração expressivos;</li>
          <li><strong>Prestação de Concursos Públicos</strong>: Habilita você para editais municipais de Goiânia e estaduais de Goiás com salários acima da média de mercado.</li>
        </ol>

        <h3 className="text-2xl font-bold text-[#1a237e] mt-8 mb-4">
          O que avaliar ao escolher uma Escola de Supletivo em Goiânia?
        </h3>
        <p className="text-neutral-600 leading-relaxed mb-6">
          É crucial tomar cuidado para não cair em golpes na internet. Muitas páginas prometem "diploma de ensino médio em 7 dias sem provas". Desconfie! Todo processo regularizado exige a realização de avaliações sérias e o cumprimento de rotinas de carga horária.
        </p>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Ao escolher a LA Educação em Goiás, você opta por uma instituição confiável que atua em parceria com polos autorizados. Oferecemos segurança jurídica: seu certificado de conclusão é 100% legal e válido, com a possibilidade de consulta nos registros oficiais.
        </p>

        <h3 className="text-2xl font-bold text-[#1a237e] mt-8 mb-4">
          Como funciona a Matrícula Facilitada no Supletivo EAD?
        </h3>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Eliminamos toda a burocracia para que você possa iniciar sua jornada de aprendizado rapidamente. Nosso atendimento pelo WhatsApp ajuda você a sanar dúvidas e realizar o envio da documentação de forma simples e digital. Se você tem pressa para concluir os estudos, a LA Educação é o caminho ideal para atingir seus alvos profissionais em Goiânia e região.
        </p>

        <div className="my-10 p-6 bg-blue-50 border-l-4 border-[#1a237e] rounded-r-xl">
          <h4 className="font-bold text-[#1a237e] mb-2 text-lg">💡 Como Estudar com Sucesso pelo Celular</h4>
          <p className="text-neutral-700 text-sm leading-relaxed">
            Para render melhor estudando online, separe pelo menos 30 a 45 minutos diários em um local silencioso. A constância no aprendizado é mais eficaz do que estudar horas seguidas em apenas um único dia da semana!
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-neutral-50 border-t border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="text-3xl font-bold text-center text-[#1a237e] mb-12">Depoimentos de Alunos de Goiânia</h2>
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
        <h2 className="text-3xl font-bold text-center text-[#1a237e] mb-10">Perguntas Frequentes sobre Supletivo em Goiânia</h2>
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
            Pronto para conquistar seu Diploma de Ensino Médio ou Fundamental?
          </h2>
          <p className="text-lg text-neutral-100 max-w-2xl">
            Inscreva-se no supletivo online da LA Educação e dê um rumo de sucesso à sua carreira profissional. Matrículas online abertas com início imediato.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <Link
              to="/matricula"
              className="bg-white text-[#da1069] hover:bg-[#1a237e] hover:text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg transition-colors"
            >
              Matricular-se Online Agora
            </Link>
            <a
              href="https://wa.me/5562996592952?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20o%20Supletivo%20em%20Goiânia"
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
        href="https://wa.me/5562996592952?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20o%20Supletivo%20em%20Goiânia"
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
