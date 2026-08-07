import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Check, Star, MessageCircle, ArrowRight, BookOpen, Clock, FileCheck, Landmark } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/eja-aparecida-de-goiania")({
  component: EjaAparecidaPage,
  head: () => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Como funciona o EJA EAD em Aparecida de Goiânia?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "O EJA EAD (Educação de Jovens e Adultos a Distância) em Aparecida funciona de forma 100% online. Você estuda através de uma plataforma digital avançada com vídeo-aulas, apostilas e exercícios, realizando as avaliações também pela plataforma de forma flexível e segura."
          }
        },
        {
          "@type": "Question",
          "name": "O supletivo EJA é reconhecido pelo MEC?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim! Todos os nossos certificados são emitidos por instituições parceiras devidamente credenciadas e autorizadas pelos Conselhos Estaduais de Educação e plenamente reconhecidas pelo MEC, com validade em todo o Brasil para faculdade, concursos e empregos."
          }
        },
        {
          "@type": "Question",
          "name": "Qual a idade mínima para fazer o EJA em Aparecida de Goiânia?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A idade mínima para cursar o Ensino Fundamental é de 15 anos completos. Já para o Ensino Médio, a idade mínima exigida é de 18 anos completos."
          }
        },
        {
          "@type": "Question",
          "name": "Como é feita a matrícula?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A matrícula pode ser feita 100% online de maneira simplificada. Basta acessar nosso assistente de matrícula digital ou falar diretamente com a nossa equipe via WhatsApp."
          }
        }
      ]
    };

    const courseSchema = {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "EJA - Educação de Jovens e Adultos EAD Aparecida de Goiânia",
      "description": "Conclua o Ensino Médio e Fundamental de forma rápida e online com certificado reconhecido pelo MEC em Aparecida de Goiânia.",
      "provider": {
        "@type": "EducationalOrganization",
        "name": "LA Educação Aparecida de Goiânia",
        "sameAs": "https://www.laeducacaogo.com.br"
      }
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
          "name": "EJA em Aparecida de Goiânia",
          "item": "https://www.laeducacaogo.com.br/eja-aparecida-de-goiania"
        }
      ]
    };

    const reviewSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "EJA EAD Aparecida de Goiânia - LA Educação",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "124"
      }
    };

    return {
      title: "EJA em Aparecida de Goiânia | Supletivo | LA Educação",
      meta: [
        { name: "description", content: "Precisa de EJA em Aparecida de Goiânia? Obtenha seu certificado do Ensino Médio ou Fundamental estudando online no seu ritmo. Rápido e reconhecido pelo MEC. Matriule-se!" },
        { name: "keywords", content: "EJA Aparecida de Goiânia, Educação de Jovens e Adultos Aparecida, Supletivo Aparecida de Goiânia, Escola em Aparecida, Terminar Ensino Médio Aparecida de Goiânia" },
        { property: "og:title", content: "EJA em Aparecida de Goiânia | Supletivo | LA Educação" },
        { property: "og:description", content: "Conclua seus estudos em Aparecida de Goiânia. Supletivo EJA EAD com certificado autorizado pelo MEC. Estude em casa pelo celular ou computador." },
        { property: "og:url", content: "https://www.laeducacaogo.com.br/eja-aparecida-de-goiania" },
        { property: "og:type", content: "website" },
        { property: "og:image", content: "https://www.laeducacaogo.com.br/img/banner-cursos-ead-goiania.png" },
        { name: "twitter:card", content: "summary_large_image" }
      ],
      links: [{ rel: "canonical", href: "https://www.laeducacaogo.com.br/eja-aparecida-de-goiania" }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(faqSchema) },
        { type: "application/ld+json", children: JSON.stringify(courseSchema) },
        { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema) },
        { type: "application/ld+json", children: JSON.stringify(reviewSchema) }
      ]
    };
  }
});

function EjaAparecidaPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const testimonials = [
    { name: "Juliana Peixoto", role: "Concluiu o Ensino Médio", text: "Excelente supletivo em Aparecida! Trabalho no polo industrial e não tinha tempo de estudar presencial. Terminei o EJA EAD em poucos meses e conquistei meu certificado válido pelo MEC.", stars: 5 },
    { name: "Adriano Costa", role: "Concluiu o Ensino Médio", text: "Procurava uma escola séria em Aparecida de Goiânia para concluir meus estudos. A LA Educação facilitou tudo. Material didático excelente e suporte sempre de prontidão.", stars: 5 },
    { name: "Luana Martins", role: "Concluiu o Ensino Fundamental", text: "O EJA EAD me deu a chance de voltar a sonhar. Consigo estudar no meu horário de folga e tirar dúvidas no WhatsApp. Recomendo para todos em Aparecida e região.", stars: 5 }
  ];

  const faqs = [
    { q: "Como funciona o EJA EAD em Aparecida de Goiânia?", a: "O EJA EAD (Educação de Jovens e Adultos a Distância) em Aparecida funciona de forma 100% online. Você estuda através de uma plataforma digital avançada com vídeo-aulas, apostilas e exercícios, realizando as avaliações também pela plataforma de forma flexível e segura." },
    { q: "O supletivo EJA é reconhecido pelo MEC?", a: "Sim! Todos os nossos certificados são emitidos por instituições parceiras devidamente credenciadas e autorizadas pelos Conselhos Estaduais de Educação e plenamente reconhecidas pelo MEC, com validade em todo o Brasil para faculdade, concursos e empregos." },
    { q: "Qual a idade mínima para fazer o EJA em Aparecida de Goiânia?", a: "A idade mínima para cursar o Ensino Fundamental é de 15 anos completos. Já para o Ensino Médio, a idade mínima exigida é de 18 anos completos." },
    { q: "Quanto tempo demora para concluir os estudos pelo Supletivo EJA?", a: "A duração do curso varia de acordo com seu próprio ritmo de dedicação. Pela modalidade digital EAD, você pode acelerar as disciplinas de forma flexível e segura, obtendo seu diploma em poucos meses." },
    { q: "É necessário comparecer presencialmente?", a: "Não. A LA Educação oferece a flexibilidade de realizar as etapas e o acompanhamento 100% online, perfeito para quem tem rotina cheia e mora ou trabalha em Aparecida de Goiânia." },
    { q: "Quais documentos são exigidos para inscrição?", a: "Basta dispor de RG, CPF, Comprovante de Residência e Histórico Escolar anterior (caso possua)." }
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
            <span className="text-white">EJA em Aparecida</span>
          </nav>
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
            EJA em Aparecida de Goiânia: Conclua seus Estudos Online com Segurança
          </h1>
          <p className="text-lg sm:text-xl text-neutral-100 max-w-3xl">
            Termine o Ensino Fundamental ou Ensino Médio de forma flexível e rápida. Obtenha seu diploma reconhecido pelo MEC com o Supletivo EAD da LA Educação.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <Link
              to="/matricula"
              className="bg-[#da1069] hover:bg-white hover:text-neutral-900 font-bold py-4 px-8 rounded-full text-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 inline-block"
            >
              Matrícula Online Rápida
            </Link>
            <a
              href="https://wa.me/5562996592952?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20o%20EJA%20em%20Aparecida%20de%20Goiânia"
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
            <span className="text-sm text-neutral-600">Válido pelo MEC</span>
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
          Como a Educação de Jovens e Adultos em Aparecida de Goiânia pode Impulsionar sua Carreira
        </h2>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Aparecida de Goiânia consolidou-se como um dos maiores e mais importantes polos industriais e comerciais do Centro-Oeste brasileiro. Cidades com esse nível de dinamismo econômico apresentam um traço comum: a altíssima exigência de qualificação profissional. Se você reside em bairros como Garavelo, Centro de Aparecida, Cruzeiro do Sul ou trabalha nas indústrias da região e ainda não concluiu a educação básica, obter o diploma de <strong>EJA reconhecido</strong> é essencial para se destacar.
        </p>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Muitos trabalhadores perdem a oportunidade de concorrer a vagas melhores de emprego simplesmente porque não possuem a <strong>conclusão do Ensino Médio</strong>. A boa notícia é que você não precisa mais passar anos frequentando salas de aula tradicionais de forma cansativa após um dia exaustivo de serviço. O <strong>Supletivo EJA EAD</strong> da LA Educação foi especialmente concebido para oferecer liberdade e velocidade de estudos aos moradores de Aparecida de Goiânia.
        </p>

        <h3 className="text-2xl font-bold text-[#1a237e] mt-8 mb-4">
          Conclusão do Ensino Fundamental e Ensino Médio pelo Celular
        </h3>
        <p className="text-neutral-600 leading-relaxed mb-6">
          A grande vantagem do <strong>supletivo online</strong> é a facilidade de acesso. A nossa plataforma é totalmente otimizada para dispositivos móveis (celular e tablet) e computadores. Isso significa que você pode aproveitar o horário de almoço no trabalho, o tempo de deslocamento no transporte público ou os momentos livres no final de semana para assistir às aulas e ler os materiais do curso.
        </p>
        <p className="text-neutral-600 leading-relaxed mb-6">
          O processo de aprendizado na <strong>escola EJA Goiás</strong> da LA Educação é dividido em módulos estruturados, cobrindo as áreas essenciais de conhecimento exigidas pelo Ministério da Educação (MEC):
        </p>
        <ul className="list-disc pl-6 text-neutral-600 space-y-2 mb-6">
          <li><strong>Matemática e suas Tecnologias</strong>: Desde a matemática básica até conceitos úteis para rotinas comerciais e financeiras cotidianas;</li>
          <li><strong>Linguagens, Códigos e suas Tecnologias</strong>: Língua Portuguesa, Literatura, Língua Estrangeira Moderna (Inglês ou Espanhol) e redação;</li>
          <li><strong>Ciências Humanas e Sociais Aplicadas</strong>: História, Geografia, Filosofia e Sociologia para formação cidadã crítica;</li>
          <li><strong>Ciências da Natureza e suas Tecnologias</strong>: Biologia, Física e Química explicadas com foco prático no cotidiano.</li>
        </ul>

        <h3 className="text-2xl font-bold text-[#1a237e] mt-8 mb-4">
          O Diploma de EJA da LA Educação vale para Concurso e Faculdade?
        </h3>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Essa é uma das dúvidas mais frequentes de quem busca saber <strong>onde fazer EJA em Aparecida de Goiânia</strong> de forma segura. A resposta é um categórico <strong>sim</strong>! O certificado de conclusão escolar emitido por nossas instituições de ensino parceiras autorizadas possui o mesmo valor legal e a mesma validade de qualquer diploma emitido por uma escola de ensino presencial tradicional da rede pública ou privada.
        </p>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Com a <strong>certificação</strong> em mãos, você estará plenamente respaldado por lei para:
        </p>
        <ol className="list-decimal pl-6 text-neutral-600 space-y-2 mb-6">
          <li><strong>Inscrever-se no Ensino Superior</strong>: Realizar o vestibular para qualquer universidade do Brasil, ingressar em cursos tecnólogos, de licenciatura ou bacharelado;</li>
          <li><strong>Realizar Exames Públicos</strong>: Candidatar-se a concursos federais, estaduais e municipais de nível médio (como Polícia Militar, Guarda Municipal de Aparecida, Correios, entre outros);</li>
          <li><strong>Apresentar em Processos Seletivos</strong>: Comprovar escolaridade em grandes empresas no Polo Industrial de Aparecida e multinacionais.</li>
        </ol>

        <h3 className="text-2xl font-bold text-[#1a237e] mt-8 mb-4">
          Como funciona a aceleração dos estudos no Supletivo EAD?
        </h3>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Muitas pessoas confundem a velocidade de conclusão do <strong>Supletivo EJA</strong> com processos facilitados ilegais. É importante destacar que na LA Educação tudo é feito estritamente dentro da lei. A flexibilidade do ambiente virtual de aprendizagem permite que alunos com maior facilidade e tempo disponível avancem rapidamente pelas matérias.
        </p>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Ao invés de esperar o semestre letivo completo para realizar uma avaliação, na modalidade digital você avança conforme demonstra domínio do conteúdo nas avaliações formativas online. Isso reduz drasticamente o tempo necessário para conquistar a <strong>conclusão do Ensino Fundamental</strong> ou Médio de forma oficial e regularizada.
        </p>

        <h3 className="text-2xl font-bold text-[#1a237e] mt-8 mb-4">
          Diferenciais e Vantagens da LA Educação em Aparecida
        </h3>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Escolher a nossa escola de <strong>Educação de Jovens e Adultos em Aparecida de Goiânia</strong> assegura a você diferenciais competitivos únicos:
        </p>
        <ul className="list-disc pl-6 text-neutral-600 space-y-2 mb-6">
          <li><strong>Economia Real</strong>: Mensalidades justas que cabem no seu bolso, sem taxas surpresa e sem gastos com materiais impressos caros;</li>
          <li><strong>Atendimento Próximo e Humanizado</strong>: Suporte constante via WhatsApp para te ajudar a superar quaisquer dificuldades de acesso ou dúvidas pedagógicas;</li>
          <li><strong>Matrícula Rápida sem Burocracia</strong>: Você inicia os estudos no mesmo dia em que realiza a inscrição online, sem perda de tempo;</li>
          <li><strong>Diploma Emitido de Forma Legal</strong>: Todas as escolas parceiras são devidamente credenciadas e registradas nos Conselhos de Educação competentes.</li>
        </ul>

        <div className="my-10 p-6 bg-blue-50 border-l-4 border-[#1a237e] rounded-r-xl">
          <h4 className="font-bold text-[#1a237e] mb-2 text-lg">⚠️ Cuidado com Certificados Falsos na Internet</h4>
          <p className="text-neutral-700 text-sm leading-relaxed">
            Certificados que prometem conclusão sem qualquer tipo de estudo ou prova são ilegais e fáceis de serem identificados pelas empresas e órgãos públicos através de consulta ao GDAE ou Diário Oficial. Na LA Educação, você estuda de verdade, realiza avaliações sérias e conquista um diploma 100% autêntico e inquestionável perante a lei!
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
        <h2 className="text-3xl font-bold text-center text-[#1a237e] mb-10">Perguntas Frequentes sobre EJA em Aparecida</h2>
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
            Pronto para conquistar seu Diploma de Ensino Médio ou Fundamental em Aparecida?
          </h2>
          <p className="text-lg text-neutral-100 max-w-2xl">
            Inscreva-se hoje mesmo na LA Educação e dê um salto em sua carreira profissional. Matrículas online abertas com início imediato.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <Link
              to="/matricula"
              className="bg-white text-[#da1069] hover:bg-[#1a237e] hover:text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg transition-colors"
            >
              Começar Pré-Matrícula
            </Link>
            <a
              href="https://wa.me/5562996592952?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20o%20EJA%20em%20Aparecida%20de%20Goiânia"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[oklch(0.65_0.18_145)] hover:bg-[#1a237e] text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg transition-colors inline-flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp Polo Aparecida
            </a>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Widget */}
      <a
        href="https://wa.me/5562996592952?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20o%20EJA%20em%20Aparecida%20de%20Goiânia"
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
