import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Check, Star, MessageCircle, ArrowRight, BookOpen, Clock, FileCheck, Landmark } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/eja-goiania")({
  component: EjaGoianiaPage,
  head: () => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Como funciona o EJA EAD in Goiânia?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "O EJA EAD (Educação de Jovens e Adultos a Distância) funciona de forma 100% online. Você estuda através de uma plataforma digital (Ambiente Virtual de Aprendizagem) com vídeo-aulas, apostilas e exercícios, realizando as avaliações também pela plataforma de forma flexível e segura."
          }
        },
        {
          "@type": "Question",
          "name": "O supletivo EJA da LA Educação é reconhecido pelo MEC?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim! Todos os nossos certificados são emitidos por instituições parceiras devidamente credenciadas e autorizadas pelos Conselhos Estaduais de Educação e plenamente reconhecidas pelo MEC, com validade em todo o Brasil para faculdade, concursos e empregos."
          }
        },
        {
          "@type": "Question",
          "name": "Qual a idade mínima para fazer o EJA em Goiânia?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A idade mínima para cursar o Ensino Fundamental é de 15 anos completos. Já para o Ensino Médio, a idade mínima exigida é de 18 anos completos."
          }
        },
        {
          "@type": "Question",
          "name": "Quanto tempo demora para concluir os estudos pelo Supletivo EJA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Graças à metodologia EAD flexível, o tempo de conclusão é adaptável ao ritmo de cada estudante. É possível acelerar os estudos de forma segura e regularizada, terminando cada etapa em poucos meses."
          }
        }
      ]
    };

    const courseSchema = {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "EJA - Educação de Jovens e Adultos EAD Goiânia",
      "description": "Conclua o Ensino Médio e Fundamental de forma rápida e online com certificado reconhecido pelo MEC em Goiânia.",
      "provider": {
        "@type": "EducationalOrganization",
        "name": "LA Educação Goiânia",
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
          "name": "EJA em Goiânia",
          "item": "https://www.laeducacaogo.com.br/eja-goiania"
        }
      ]
    };

    const reviewSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "EJA EAD Goiânia - LA Educação",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "148"
      }
    };

    return {
      title: "EJA em Goiânia | Supletivo Reconhecido | LA Educação",
      meta: [
        { name: "description", content: "Procurando EJA em Goiânia? Conclua o Ensino Médio ou Fundamental online de forma rápida e segura. Certificado reconhecido pelo MEC. Inscreva-se já!" },
        { name: "keywords", content: "EJA Goiânia, Educação de Jovens e Adultos Goiânia, Supletivo Goiânia, Escola de EJA Goiânia, Terminar Ensino Médio Goiânia, Supletivo EAD reconhecido pelo MEC" },
        { property: "og:title", content: "EJA em Goiânia | Supletivo Reconhecido | LA Educação" },
        { property: "og:description", content: "Conclua os estudos de forma rápida, segura e autorizada. Aulas 100% online para Ensino Médio e Fundamental. Certificado válido nacionalmente." },
        { property: "og:url", content: "https://www.laeducacaogo.com.br/eja-goiania" },
        { property: "og:type", content: "website" },
        { property: "og:image", content: "https://www.laeducacaogo.com.br/img/banner-cursos-ead-goiania.png" },
        { name: "twitter:card", content: "summary_large_image" }
      ],
      links: [{ rel: "canonical", href: "https://www.laeducacaogo.com.br/eja-goiania" }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(faqSchema) },
        { type: "application/ld+json", children: JSON.stringify(courseSchema) },
        { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema) },
        { type: "application/ld+json", children: JSON.stringify(reviewSchema) }
      ]
    };
  }
});

function EjaGoianiaPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const testimonials = [
    { name: "Ricardo Souza", role: "Concluiu o Ensino Médio", text: "Fazer o EJA EAD na LA Educação em Goiânia mudou minha vida profissional. Consegui terminar o ensino médio online em poucos meses e logo fui promovido no meu trabalho.", stars: 5 },
    { name: "Carla Mendes", role: "Concluiu o Ensino Fundamental", text: "Excelente escola de EJA Goiânia! O atendimento no suporte é maravilhoso e as aulas são bem explicadas. O certificado reconhecido pelo MEC chegou super rápido.", stars: 5 },
    { name: "Marcos Vinícius", role: "Concluiu o Ensino Médio", text: "Eu tinha dúvidas de onde fazer EJA em Goiânia de forma confiável. A LA Educação superou as expectativas. Ensino de qualidade e processo totalmente regularizado.", stars: 5 }
  ];

  const faqs = [
    { q: "Como funciona o EJA EAD em Goiânia?", a: "O EJA EAD (Educação de Jovens e Adultos a Distância) funciona de forma 100% online. Você estuda através de uma plataforma digital (Ambiente Virtual de Aprendizagem) com vídeo-aulas, apostilas e exercícios, realizando as avaliações também pela plataforma de forma flexível e segura." },
    { q: "O supletivo EJA da LA Educação é reconhecido pelo MEC?", a: "Sim! Todos os nossos certificados são emitidos por instituições parceiras devidamente credenciadas e autorizadas pelos Conselhos Estaduais de Educação e plenamente reconhecidas pelo MEC, com validade em todo o Brasil para faculdade, concursos e empregos." },
    { q: "Qual a idade mínima para fazer o EJA em Goiânia?", a: "A idade mínima para cursar o Ensino Fundamental é de 15 anos completos. Já para o Ensino Médio, a idade mínima exigida é de 18 anos completos." },
    { q: "Quanto tempo demora para concluir os estudos pelo Supletivo EJA?", a: "Graças à metodologia EAD flexível, o tempo de conclusão é adaptável ao ritmo de cada estudante. É possível acelerar os estudos de forma segura e regularizada, terminando cada etapa em poucos meses." },
    { q: "Onde fica o polo em Goiânia?", a: "A LA Educação atende toda a região metropolitana de Goiânia. Nossos processos de matrícula e acompanhamento são 100% online, oferecendo máxima comodidade para que você não precise se deslocar." },
    { q: "Quais documentos preciso para realizar a matrícula?", a: "Você precisará apresentar RG, CPF, Comprovante de Residência e o Histórico Escolar anterior (caso possua). Se não tiver o histórico, nossa equipe ajudará a verificar o processo adequado." }
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
            <span className="text-white">EJA em Goiânia</span>
          </nav>
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
            EJA em Goiânia: Conclua seus Estudos com Supletivo EAD Reconhecido
          </h1>
          <p className="text-lg sm:text-xl text-neutral-100 max-w-3xl">
            Termine o Ensino Fundamental ou Ensino Médio de forma 100% online, rápida e segura. Diploma emitido por escola parceira autorizada e reconhecida pelo MEC.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <Link
              to="/matricula"
              className="bg-[#da1069] hover:bg-white hover:text-neutral-900 font-bold py-4 px-8 rounded-full text-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 inline-block"
            >
              Matrícula Online Rápida
            </Link>
            <a
              href="https://wa.me/5562996592952?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20o%20EJA%20em%20Goiânia"
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
            <span className="text-sm text-neutral-600">Goiânia - Goiás</span>
          </div>
        </div>
      </section>

      {/* Comprehensive SEO Content Section */}
      <section className="py-16 px-5 max-w-4xl mx-auto prose prose-neutral">
        <h2 className="text-3xl font-bold text-[#1a237e] mb-6">
          Educação de Jovens e Adultos em Goiânia: A Oportunidade de Mudar o Seu Futuro
        </h2>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Se você está buscando <strong>onde fazer EJA em Goiânia</strong> ou deseja entender <strong>quanto custa o EJA</strong>, veio ao lugar certo. Concluir a educação básica é o passo definitivo para quem busca melhores condições de trabalho, deseja ingressar no ensino superior ou passar em concursos públicos em Goiás. A LA Educação oferece uma solução moderna, rápida e totalmente autorizada para que você obtenha sua <strong>certificação</strong> do Ensino Médio ou Ensino Fundamental sem precisar sair de casa.
        </p>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Muitos adultos que moram na capital goiana enfrentam rotinas exaustivas com jornadas de trabalho duplas, trânsito pesado e compromissos familiares. Diante desse cenário, frequentar uma escola de ensino presencial todas as noites torna-se inviável. É por isso que o <strong>supletivo online</strong> desponta como a melhor alternativa. Estudando de forma digital na nossa <strong>escola de EJA Goiânia</strong>, você tem a flexibilidade necessária para aprender nos horários em que estiver mais descansado e focado, no seu próprio ritmo de aprendizado.
        </p>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Nossa metodologia de <strong>EJA reconhecido</strong> foi estruturada para se adaptar às suas necessidades reais. Se você parou seus estudos há 5, 10 ou 20 anos, não há motivo para preocupação. Nossos tutores pedagógicos estão plenamente capacitados a guiar você por todo o caminho do aprendizado de forma simplificada, dinâmica e com conteúdos totalmente práticos.
        </p>

        <h3 className="text-2xl font-bold text-[#1a237e] mt-8 mb-4">
          Como funciona o Supletivo EJA reconhecido pelo MEC?
        </h3>
        <p className="text-neutral-600 leading-relaxed mb-6">
          O <strong>Supletivo EJA</strong> da LA Educação funciona por meio de uma plataforma de estudos extremamente intuitiva e moderna. Após realizar sua matrícula online, você recebe um login e senha para acessar o Ambiente Virtual de Aprendizagem (AVA). Lá, estão disponibilizados todos os materiais necessários para a sua jornada acadêmica, incluindo:
        </p>
        <ul className="list-disc pl-6 text-neutral-600 space-y-2 mb-6">
          <li><strong>Vídeo-aulas dinâmicas</strong> explicadas de maneira simples e direta por professores especializados;</li>
          <li><strong>Apostilas em formato digital PDF</strong> completas e atualizadas para download e leitura offline;</li>
          <li><strong>Exercícios de fixação</strong> para você testar seus conhecimentos antes de realizar as avaliações;</li>
          <li><strong>Suporte pedagógico humanizado via WhatsApp</strong> para tirar todas as dúvidas com nossa equipe.</li>
        </ul>
        <p className="text-neutral-600 leading-relaxed mb-6">
          As avaliações ocorrem de forma integrada dentro do programa digital, com metodologias validadas pelos Conselhos Estaduais de Educação. Ao concluir as disciplinas obrigatórias do currículo nacional de Educação de Jovens e Adultos (que engloba Linguagens, Matemática, Ciências da Natureza e Ciências Humanas) e atingir a nota mínima exigida, a emissão do certificado é iniciada. Todo o processo é 100% legalizado, assegurando que você obtenha um <strong>diploma de conclusão do Ensino Médio</strong> ou Fundamental autêntico e de validade inquestionável.
        </p>

        <h3 className="text-2xl font-bold text-[#1a237e] mt-8 mb-4">
          Por que obter a Conclusão do Ensino Médio em Goiânia?
        </h3>
        <p className="text-neutral-600 leading-relaxed mb-6">
          O mercado de trabalho em Goiânia e em todo o estado de Goiás está cada vez mais competitivo. Setores em expansão, como o comércio na Região da 44, a indústria farmacêutica em Anápolis e Aparecida, e as grandes empresas de tecnologia e prestação de serviços exigem, no mínimo, a <strong>conclusão do Ensino Médio</strong> como pré-requisito básico em seus processos seletivos.
        </p>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Ao possuir um certificado de <strong>EJA reconhecido</strong>, você destrava portas que antes estavam trancadas. Além disso, obter a conclusão do ensino básico permite que você:
        </p>
        <ol className="list-decimal pl-6 text-neutral-600 space-y-2 mb-6">
          <li><strong>Preste Concursos Públicos</strong>: Milhares de vagas em prefeituras e órgãos estaduais de Goiás exigem nível médio completo, pagando salários iniciais atrativos e estabilidade de carreira;</li>
          <li><strong>Faça Faculdade ou Cursos Técnicos</strong>: O diploma do EJA EAD permite que você realize o Exame Nacional do Ensino Médio (ENEM), se candidate ao ProUni, FIES, ou faça vestibulares em faculdades públicas e privadas;</li>
          <li><strong>Busque Promoções no Emprego Atual</strong>: Muitas empresas deixam de promover colaboradores dedicados simplesmente porque eles não concluíram a escolaridade mínima exigida nas políticas corporativas.</li>
        </ol>

        <h3 className="text-2xl font-bold text-[#1a237e] mt-8 mb-4">
          Comparativo: EJA Tradicional Presencial vs. EJA Online EAD
        </h3>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Para ajudar você a decidir a melhor rota para o seu aprendizado, preparamos um comparativo objetivo detalhando as principais diferenças de funcionamento das modalidades presencial e a distância em Goiânia:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-white border border-neutral-200">
            <thead>
              <tr className="bg-[#1a237e] text-white">
                <th className="py-3 px-4 text-left font-bold text-sm">Característica</th>
                <th className="py-3 px-4 text-left font-bold text-sm">EJA Presencial (Noturno)</th>
                <th className="py-3 px-4 text-left font-bold text-sm">EJA EAD (LA Educação)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-neutral-200">
                <td className="py-3 px-4 text-sm font-bold">Flexibilidade</td>
                <td className="py-3 px-4 text-sm text-neutral-600">Baixa (horários rígidos diários)</td>
                <td className="py-3 px-4 text-sm text-neutral-600">Total (estude 24 horas por dia, 7 dias por semana)</td>
              </tr>
              <tr className="border-b border-neutral-200">
                <td className="py-3 px-4 text-sm font-bold">Tempo de Conclusão</td>
                <td className="py-3 px-4 text-sm text-neutral-600">Longo (mínimo de 1 a 2 anos)</td>
                <td className="py-3 px-4 text-sm text-neutral-600">Acelerado (conforme seu ritmo e dedicação)</td>
              </tr>
              <tr className="border-b border-neutral-200">
                <td className="py-3 px-4 text-sm font-bold">Deslocamento</td>
                <td className="py-3 px-4 text-sm text-neutral-600">Obrigatório (custo com transporte e tempo)</td>
                <td className="py-3 px-4 text-sm text-neutral-600">Zero (estude de casa ou do trabalho pelo celular)</td>
              </tr>
              <tr className="border-b border-neutral-200">
                <td className="py-3 px-4 text-sm font-bold">Suporte a Dúvidas</td>
                <td className="py-3 px-4 text-sm text-neutral-600">Apenas durante o período de aula em sala</td>
                <td className="py-3 px-4 text-sm text-neutral-600">Pedagógico rápido por WhatsApp</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-2xl font-bold text-[#1a237e] mt-8 mb-4">
          Como terminar o Ensino Médio rápido em Goiânia de forma legal
        </h3>
        <p className="text-neutral-600 leading-relaxed mb-6">
          A internet está cheia de promessas milagrosas sobre "concluir o ensino médio em 7 dias". É de suma importância esclarecer que a legislação educacional brasileira exige seriedade no processo de avaliação e estudo. Um <strong>supletivo reconhecido pelo MEC</strong> atua sob diretrizes rápidas de validação de carga horária e verificação de aproveitamento.
        </p>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Na LA Educação, nós aliamos a velocidade permitida pela tecnologia com o rigor legal necessário. A aceleração ocorre porque você não fica preso ao ritmo de uma turma presencial tradicional. Se você já tem conhecimento prévio sobre as matérias ou estuda com maior velocidade, poderá passar pelas disciplinas mais rápido, completando os módulos necessários sem burocracia ou demoras desnecessárias. A <strong>conclusão do Ensino Fundamental</strong> ou Médio ocorre no menor tempo legal possível, garantindo tranquilidade jurídica total para o uso do seu certificado no futuro.
        </p>

        <h3 className="text-2xl font-bold text-[#1a237e] mt-8 mb-4">
          Diferenciais de escolher a LA Educação em Goiás
        </h3>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Além de oferecermos a melhor infraestrutura digital de aprendizado para <strong>EJA Goiás</strong>, nossos alunos em Goiânia contam com vantagens que tornam a jornada de estudos prazerosa e focada no sucesso:
        </p>
        <ul className="list-disc pl-6 text-neutral-600 space-y-2 mb-6">
          <li><strong>Material Didático Gratuito</strong>: Você não precisa gastar rios de dinheiro comprando livros ou apostilas impressas caras. Todo o conteúdo já está incluso no valor do curso e é de fácil leitura;</li>
          <li><strong>Tutores Especializados</strong>: Contamos com profissionais prontos para orientar e garantir que você compreenda as matérias mais complexas, como física, química e matemática;</li>
          <li><strong>Selo de Credibilidade</strong>: Nossa instituição parceira possui reputação ilibada, com registros ativos nos órgãos oficiais competentes, evitando surpresas indesejáveis de certificados falsos ou inválidos;</li>
          <li><strong>Matrícula Rápida via WhatsApp</strong>: Facilitamos todo o processo burocrático inicial para você começar a estudar o quanto antes.</li>
        </ul>

        <div className="my-10 p-6 bg-blue-50 border-l-4 border-[#1a237e] rounded-r-xl">
          <h4 className="font-bold text-[#1a237e] mb-2 text-lg">💡 Dica Importante de Empregabilidade em Goiás</h4>
          <p className="text-neutral-700 text-sm leading-relaxed">
            Não espere a oportunidade perfeita aparecer para só então ir atrás do seu diploma. A maioria dos empregadores de Goiânia realiza a contratação em poucos dias. Ter a <strong>Conclusão do Ensino Médio</strong> já registrada em seu currículo coloca você à frente de centenas de candidatos concorrentes na hora!
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
        <h2 className="text-3xl font-bold text-center text-[#1a237e] mb-10">Perguntas Frequentes sobre EJA em Goiânia</h2>
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
            Inscreva-se hoje mesmo na LA Educação e mude seus rumos profissionais. Matrículas rápidas, sem burocracia e com início imediato.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <Link
              to="/matricula"
              className="bg-white text-[#da1069] hover:bg-[#1a237e] hover:text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg transition-colors"
            >
              Começar Matrícula Grátis
            </Link>
            <a
              href="https://wa.me/5562996592952?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20o%20EJA%20em%20Goiânia"
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
        href="https://wa.me/5562996592952?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20o%20EJA%20em%20Goiânia"
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
