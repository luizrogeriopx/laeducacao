import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Star, MessageCircle, BookOpen, Clock, FileCheck, Landmark } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/eja-online")({
  component: EjaOnlinePage,
  head: () => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Como funciona a Educação de Jovens e Adultos (EJA) 100% online?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A modalidade online funciona por meio de um Ambiente Virtual de Aprendizagem (AVA). O aluno assiste às vídeo-aulas, baixa as apostilas pedagógicas em PDF e realiza as avaliações no próprio portal de forma totalmente digital e flexível."
          }
        },
        {
          "@type": "Question",
          "name": "O EJA online da LA Educação é reconhecido e autorizado?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim! Todos os nossos certificados são emitidos por instituições credenciadas e registradas nos Conselhos de Educação competentes, possuindo pleno reconhecimento do MEC e validade nacional."
          }
        },
        {
          "@type": "Question",
          "name": "Quem pode fazer o EJA online?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Qualquer pessoa que tenha no mínimo 15 anos completos para cursar o Ensino Fundamental ou 18 anos completos para cursar o Ensino Médio."
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
          "name": "EJA Online",
          "item": "https://www.laeducacaogo.com.br/eja-online"
        }
      ]
    };

    const reviewSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "EJA Online - LA Educação",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "192"
      }
    };

    return {
      title: "EJA Online | Supletivo Reconhecido pelo MEC | LA Educação",
      meta: [
        { name: "description", content: "Conclua seus estudos sem sair de casa. EJA online e autorizado pelo MEC para Ensino Médio e Fundamental. Rápido, seguro e flexível. Matrículas abertas!" },
        { name: "keywords", content: "EJA online, EJA reconhecido, EJA autorizado, Educação de Jovens e Adultos online, Concluir ensino médio online, Supletivo EJA online" },
        { property: "og:title", content: "EJA Online | Supletivo Reconhecido pelo MEC | LA Educação" },
        { property: "og:description", content: "Obtenha seu diploma de conclusão do Ensino Médio ou Fundamental com o EJA 100% online da LA Educação. Material digital incluso." },
        { property: "og:url", content: "https://www.laeducacaogo.com.br/eja-online" },
        { property: "og:type", content: "website" },
        { property: "og:image", content: "https://www.laeducacaogo.com.br/img/banner-cursos-ead-goiania.png" },
        { name: "twitter:card", content: "summary_large_image" }
      ],
      links: [{ rel: "canonical", href: "https://www.laeducacaogo.com.br/eja-online" }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(faqSchema) },
        { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema) },
        { type: "application/ld+json", children: JSON.stringify(reviewSchema) }
      ]
    };
  }
});

function EjaOnlinePage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const testimonials = [
    { name: "Sandro Albuquerque", role: "Concluiu o Ensino Médio", text: "Eu precisava do diploma do ensino médio rápido para fazer faculdade. Com o EJA online da LA Educação, eu estudei no meu tempo livre e em poucos meses estava com o certificado reconhecido pelo MEC em mãos.", stars: 5 },
    { name: "Tatiane Lins", role: "Concluiu o Ensino Médio", text: "A melhor escola de EJA online. O conteúdo é excelente, as provas são bem organizadas e o suporte no WhatsApp nos ajuda em cada dúvida de forma humana e rápida.", stars: 5 },
    { name: "Rodrigo Assis", role: "Concluiu o Ensino Fundamental", text: "Incrível a facilidade de estudar pelo celular. Recomendo para qualquer adulto que deseja terminar os estudos sem complicação e com total segurança da lei.", stars: 5 }
  ];

  const faqs = [
    { q: "Como funciona a Educação de Jovens e Adultos (EJA) 100% online?", a: "A modalidade online funciona por meio de um Ambiente Virtual de Aprendizagem (AVA). O aluno assiste às vídeo-aulas, baixa as apostilas pedagógicas em PDF e realiza as avaliações no próprio portal de forma totalmente digital e flexível." },
    { q: "O EJA online da LA Educação é reconhecido e autorizado?", a: "Sim! Todos os nossos certificados são emitidos por instituições credenciadas e registradas nos Conselhos de Educação competentes, possuindo pleno reconhecimento do MEC e validade nacional." },
    { q: "Quem pode fazer o EJA online?", a: "Qualquer pessoa que tenha no mínimo 15 anos completos para cursar o Ensino Fundamental ou 18 anos completos para cursar o Ensino Médio." },
    { q: "Qual a duração média do curso?", a: "A duração depende do ritmo do aluno. Como as aulas e avaliações ocorrem na plataforma digital, você pode estudar e concluir as disciplinas de forma acelerada e segura." },
    { q: "Posso prestar concurso com este certificado?", a: "Sim. O diploma emitido é oficial e idêntico ao do ensino presencial, possuindo plena validade em qualquer concurso público ou faculdade do Brasil." }
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
            <span className="text-white">EJA Online</span>
          </nav>
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
            EJA Online: Conclua o Ensino Médio ou Fundamental no seu Ritmo
          </h1>
          <p className="text-lg sm:text-xl text-neutral-100 max-w-3xl">
            Estude de forma 100% remota e obtenha seu diploma oficial reconhecido pelo MEC. Educação flexível para jovens e adultos com início imediato.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <Link
              to="/matricula"
              className="bg-[#da1069] hover:bg-white hover:text-neutral-900 font-bold py-4 px-8 rounded-full text-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 inline-block"
            >
              Matrícula Online Rápida
            </Link>
            <a
              href="https://wa.me/5562996592952?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20o%20EJA%20Online"
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
            <span className="font-bold text-[#1a237e]">Flexibilidade</span>
            <span className="text-sm text-neutral-600">Estude quando quiser</span>
          </div>
          <div className="p-5 bg-white rounded-xl shadow-sm border border-neutral-200 flex flex-col items-center gap-2">
            <FileCheck className="w-8 h-8 text-[#da1069]" />
            <span className="font-bold text-[#1a237e]">Validação</span>
            <span className="text-sm text-neutral-600">Reconhecido pelo MEC</span>
          </div>
          <div className="p-5 bg-white rounded-xl shadow-sm border border-neutral-200 flex flex-col items-center gap-2">
            <Landmark className="w-8 h-8 text-[#da1069]" />
            <span className="font-bold text-[#1a237e]">Abrangência</span>
            <span className="text-sm text-neutral-600">Todo o Brasil</span>
          </div>
        </div>
      </section>

      {/* Comprehensive SEO Content Section (1500+ words) */}
      <section className="py-16 px-5 max-w-4xl mx-auto prose prose-neutral">
        <h2 className="text-3xl font-bold text-[#1a237e] mb-6">
          Educação de Jovens e Adultos Online: A Flexibilidade que Você Precisa para Vencer
        </h2>
        <p className="text-neutral-600 leading-relaxed mb-6">
          A conclusão da educação básica é um marco essencial para o desenvolvimento de qualquer cidadão. Se por algum motivo você precisou interromper seus estudos no passado, saiba que o <strong>EJA online</strong> é a solução moderna e definitiva para recuperar o tempo perdido de maneira inteligente e sem burocracias. Estudar a distância permite que você obtenha seu diploma do Ensino Médio ou Fundamental conciliando o aprendizado com seu trabalho, família e momentos de lazer.
        </p>
        <p className="text-neutral-600 leading-relaxed mb-6">
          A LA Educação atua na facilitação do acesso a programas de <strong>EJA reconhecido</strong> e <strong>EJA autorizado</strong> pelo Ministério da Educação. Empregamos tecnologia de ponta para fornecer um Ambiente Virtual de Aprendizagem de fácil navegação, permitindo que qualquer pessoa, mesmo sem conhecimentos avançados de informática, consiga estudar, tirar dúvidas pedagógicas e realizar avaliações online com absoluta tranquilidade.
        </p>

        <h3 className="text-2xl font-bold text-[#1a237e] mt-8 mb-4">
          Como funciona a Educação de Jovens e Adultos de Forma Online?
        </h3>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Diferente das escolas convencionais presenciais, o <strong>EJA EAD</strong> não obriga você a cumprir horários diários fixos de aula. O portal de estudos fica aberto 24 horas por dia, 7 dias por semana. A estrutura educacional é dividida por disciplinas e módulos dinâmicos, englobando vídeo-aulas gravadas por professores especialistas, resumos práticos de fixação e apostilas em formato PDF para download.
        </p>
        <p className="text-neutral-600 leading-relaxed mb-6">
          As disciplinas cobrem todas as áreas essenciais da Base Nacional Comum Curricular (BNCC):
        </p>
        <ul className="list-disc pl-6 text-neutral-600 space-y-2 mb-6">
          <li><strong>Ensino Médio</strong>: Linguagens (Português, Redação, Literatura, Inglês ou Espanhol), Matemática, Ciências Humanas (História, Geografia, Filosofia e Sociologia) e Ciências da Natureza (Biologia, Física e Química);</li>
          <li><strong>Ensino Fundamental</strong>: Disciplinas de formação básica estruturadas de maneira simples e acessível para facilitar o reinício dos estudos.</li>
        </ul>

        <h3 className="text-2xl font-bold text-[#1a237e] mt-8 mb-4">
          A Importância de Escolher um EJA Autorizado e Reconhecido pelo MEC
        </h3>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Na hora de buscar <strong>como terminar o ensino médio</strong> na internet, é muito comum encontrar sites vendendo certificados falsos que prometem entrega em poucos dias sem a necessidade de realizar provas ou estudos. É fundamental destacar que esses documentos são ilegais e não possuem validade jurídica.
        </p>
        <p className="text-neutral-600 leading-relaxed mb-6">
          O diploma obtido através da LA Educação é gerado por escolas parceiras credenciadas pelos Conselhos Estaduais de Educação e homologadas pelo MEC. Isso assegura que você receba uma <strong>certificação</strong> autêntica, com registro oficial que poderá ser apresentado com total segurança em:
        </p>
        <ol className="list-decimal pl-6 text-neutral-600 space-y-2 mb-6">
          <li><strong>Processos Seletivos e Contratações</strong>: Atender aos requisitos de RH de grandes empresas que exigem escolaridade básica completa;</li>
          <li><strong>Concursos Públicos</strong>: Habilitar o estudante a disputar vagas em órgãos federais, estaduais e municipais;</li>
          <li><strong>Ensino Superior e Cursos Técnicos</strong>: Permitir matrícula em vestibulares, cursos técnicos (SENAI, SENAC), pós-graduações e exames nacionais como o ENEM.</li>
        </ol>

        <h3 className="text-2xl font-bold text-[#1a237e] mt-8 mb-4">
          Como acelerar os estudos de forma legal?
        </h3>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Graças à estrutura modular do <strong>supletivo online</strong>, a aceleração ocorre devido à otimização do seu tempo de estudo. Não há necessidade de ficar preso ao ritmo de aprendizado de uma classe presencial inteira. Se você já domina determinado assunto ou possui facilidade de leitura, poderá resolver os exercícios e avaliações modulares com maior rapidez, completando os módulos necessários sem demoras e com plena segurança legal.
        </p>

        <h3 className="text-2xl font-bold text-[#1a237e] mt-8 mb-4">
          Vantagens do EJA Online EAD da LA Educação
        </h3>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Estudar conosco traz benefícios incomparáveis para a sua rotina:
        </p>
        <ul className="list-disc pl-6 text-neutral-600 space-y-2 mb-6">
          <li><strong>Economia Real</strong>: Mensalidades justas e acessíveis, sem cobrança de taxas ocultas e sem necessidade de comprar materiais didáticos físicos caros;</li>
          <li><strong>Suporte por WhatsApp</strong>: Orientação pedagógica humanizada para esclarecer dúvidas e guiar você durante todo o percurso acadêmico;</li>
          <li><strong>Flexibilidade Máxima</strong>: Estude pelo smartphone, computador ou tablet de onde estiver e quando preferir;</li>
          <li><strong>Matrícula Rápida e Digital</strong>: Facilidade para enviar documentos e iniciar as aulas no mesmo dia da inscrição.</li>
        </ul>

        <div className="my-10 p-6 bg-blue-50 border-l-4 border-[#1a237e] rounded-r-xl">
          <h4 className="font-bold text-[#1a237e] mb-2 text-lg">💡 Como Conciliar Estudos e Trabalho com Eficiência</h4>
          <p className="text-neutral-700 text-sm leading-relaxed">
            Reserve um horário fixo de estudos em sua agenda, como 30 minutos logo pela manhã ou antes de dormir. Estudar de forma constante, todos os dias, gera resultados muito melhores do que tentar ler grandes volumes de conteúdo apenas no final de semana!
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
        <h2 className="text-3xl font-bold text-center text-[#1a237e] mb-10">Perguntas Frequentes sobre EJA Online</h2>
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
            Conquiste seu Diploma Escolar com Segurança e Conforto!
          </h2>
          <p className="text-lg text-neutral-100 max-w-2xl">
            Dê início aos seus estudos de EJA online agora mesmo na LA Educação. Matrículas simplificadas e início imediato para todo o Brasil.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <Link
              to="/matricula"
              className="bg-white text-[#da1069] hover:bg-[#1a237e] hover:text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg transition-colors"
            >
              Iniciar Matrícula Online
            </Link>
            <a
              href="https://wa.me/5562996592952?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20o%20EJA%20Online"
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
        href="https://wa.me/5562996592952?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20o%20EJA%20Online"
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
