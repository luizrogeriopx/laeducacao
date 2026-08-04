import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { listCategories } from "@/lib/categories.functions";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Quem pode se matricular no Supletivo EJA EAD?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Para ingressar no Ensino Fundamental do EJA, o aluno precisa ter no mínimo 15 anos completos. Para o Ensino Médio EAD, a idade mínima exigida é de 18 anos completos."
          }
        },
        {
          "@type": "Question",
          "name": "O certificado de EJA EAD da LA Educação é igual ao do ensino presencial?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim. Os certificados emitidos pela nossa instituição parceira autorizada são 100% equivalentes aos do ensino presencial tradicional e plenamente reconhecidos pelo MEC em todo o Brasil. Você poderá usá-lo para ingressar no Ensino Superior (Faculdade), prestar concursos públicos ou apresentar em processos seletivos de emprego."
          }
        },
        {
          "@type": "Question",
          "name": "Quanto tempo leva para concluir o Ensino Médio pelo Supletivo EAD?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "O tempo de conclusão varia conforme a disponibilidade de estudos do aluno. A grande vantagem do EAD é a flexibilidade, permitindo uma aceleração segura do aprendizado."
          }
        },
        {
          "@type": "Question",
          "name": "Como realizo a matrícula para os Cursos Profissionalizantes ou EJA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A matrícula pode ser feita de forma 100% online e simplificada. Basta acessar nosso assistente de matrícula online no site ou entrar em contato direto com nossa equipe via WhatsApp no número (62) 99659-2952."
          }
        }
      ]
    };
    return {
      title: "EJA, Supletivo e Cursos Profissionalizantes em Goiânia | LA",
      meta: [
        {
          name: "keywords",
          content:
            "EJA Goiânia, EJA Aparecida de Goiânia, Supletivo Goiânia, Supletivo EAD, Ensino Médio EAD, Concluir Ensino Médio, Concluir Ensino Fundamental, Escola EJA Goiás, Cursos Profissionalizantes Goiânia, Cursos Profissionalizantes Aparecida de Goiânia, Curso de Informática Goiânia, Curso de Administração Goiânia, Curso de Cuidador de Idosos, Curso de Atendente de Farmácia, Curso de Recepcionista, Cursos com Certificado, Cursos Online, Cursos Presenciais, Matrículas Abertas, Escola Profissionalizante Goiânia",
        },
        {
          name: "description",
          content:
            "Conclua o Ensino Médio ou Fundamental EAD em Goiânia e Aparecida de Goiânia. Cursos profissionalizantes e EJA com certificado reconhecido pelo MEC. Matriule-se!",
        },
        { property: "og:title", content: "EJA, Supletivo e Cursos Profissionalizantes em Goiânia | LA" },
        {
          property: "og:description",
          content:
            "Conclua seus estudos EAD ou faça um curso profissionalizante com certificado reconhecido pelo MEC. Matrículas abertas em Goiânia, Aparecida e Goiás!",
        },
        { property: "og:url", content: "https://www.laeducacaogo.com.br/" },
        { property: "og:image", content: "https://www.laeducacaogo.com.br/img/banner-cursos-ead-goiania.png" },
        { name: "twitter:image", content: "https://www.laeducacaogo.com.br/img/banner-cursos-ead-goiania.png" },
      ],
      links: [{ rel: "canonical", href: "https://www.laeducacaogo.com.br/" }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(faqSchema),
        }
      ]
    };
  },
});

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Carregar categorias dinamicamente do banco de dados (gerenciado no painel admin)
  const fetchCategories = useServerFn(listCategories);
  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
  });

  const categories = categoriesData?.categories ?? [];
  const half = Math.ceil(categories.length / 2);
  const col1 = categories.slice(0, half);
  const col2 = categories.slice(half);

  // Carregar script do widget GPTMaker
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.gptmaker.ai/widget/3F20C1D85027C301595EF26BB4C5A46E/float.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      // Remover script ao desmontar o componente para evitar duplicações
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Monitorar rolagem da página para encolher o header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Selos de confiança
  const seals = [
    { src: "/img/selo-mec-reconhecido.png", alt: "Selo MEC de Reconhecimento e Validação Nacional" },
    { src: "/img/selo-la-educacao-goiania.png", alt: "Selo LA Educação - Cursos EAD em Goiânia" },
    { src: "/img/selo-la-educacao-reclame-aqui.png", alt: "Selo Reclame Aqui - Excelente Reputação LA Educação" },
    { src: "/img/selo-la-educacao-avaliacao-google.png", alt: "Selo Google Avaliação Cinco Estrelas" },
    { src: "/img/selo-inipi-certificados.png", alt: "Selo INIPI de Certificação Profissional de Qualidade" },
  ];

  return (
    <div className="home-theme min-h-screen flex flex-col font-sans text-neutral-800 bg-white">
      {/* Header & Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-all duration-300 flex items-center ${
          isScrolled ? "h-[70px] bg-white/95" : "h-[80px]"
        }`}
      >
        <nav className="w-full max-w-6xl mx-auto px-5 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold tracking-wider text-[#1a237e] uppercase">
            LA<span className="text-neutral-700 font-normal"> Educação</span>
          </Link>

          {/* Menu Toggle (Mobile) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1.5 cursor-pointer md:hidden focus:outline-none"
            aria-label="Toggle menu"
          >
            <span
              className={`w-7 h-[3px] bg-[#1a237e] rounded-sm transition-all duration-300 ${
                menuOpen ? "transform translateY(9px) rotate(45deg)" : ""
              }`}
            />
            <span
              className={`w-7 h-[3px] bg-[#1a237e] rounded-sm transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-7 h-[3px] bg-[#1a237e] rounded-sm transition-all duration-300 ${
                menuOpen ? "transform translateY(-9px) rotate(-45deg)" : ""
              }`}
            />
          </button>

          {/* Links (Desktop e Mobile) */}
          <ul
            className={`flex items-center gap-6 list-none md:flex-row flex-col fixed md:static top-[70px] md:top-auto bg-white md:bg-transparent shadow-lg md:shadow-none w-full md:w-auto left-0 transition-all duration-500 py-8 md:py-0 ${
              menuOpen ? "right-0 block" : "-right-full hidden md:flex"
            }`}
          >
            <li>
              <a
                href="#home"
                onClick={() => setMenuOpen(false)}
                className="text-neutral-700 font-semibold hover:text-[#1a237e] transition-colors"
              >
                Início
              </a>
            </li>
            
            {/* Cursos Dropdown (Desktop) */}
            <li className="relative group md:block hidden">
              <span className="text-neutral-700 font-semibold hover:text-[#1a237e] transition-colors cursor-pointer flex items-center gap-1">
                Cursos <span className="text-xs">▼</span>
              </span>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white min-w-[500px] shadow-2xl p-6 rounded-lg border-t-4 border-[#1a237e] grid grid-cols-2 gap-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="flex flex-col gap-2">
                  {col1.map((cat) => (
                    <Link
                      key={cat.id}
                      to="/categoria/$slug"
                      params={{ slug: cat.slug }}
                      className="text-xs text-neutral-600 hover:text-[#1a237e] hover:pl-1 transition-all pb-1.5 border-b border-neutral-100"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  {col2.map((cat) => (
                    <Link
                      key={cat.id}
                      to="/categoria/$slug"
                      params={{ slug: cat.slug }}
                      className="text-xs text-neutral-600 hover:text-[#1a237e] hover:pl-1 transition-all pb-1.5 border-b border-neutral-100"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </li>

            {/* Mobile Cursos Accordion */}
            <li className="w-full text-center md:hidden">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full text-neutral-700 font-semibold hover:text-[#1a237e] transition-colors py-2 flex justify-center items-center gap-1 focus:outline-none"
              >
                Cursos <span className="text-xs transition-transform duration-300">{dropdownOpen ? "▲" : "▼"}</span>
              </button>
              <div
                className={`bg-neutral-50 overflow-hidden transition-all duration-300 w-full flex flex-col items-center max-h-[300px] overflow-y-auto ${
                  dropdownOpen ? "py-4" : "max-h-0"
                }`}
              >
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to="/categoria/$slug"
                    params={{ slug: cat.slug }}
                    onClick={() => setMenuOpen(false)}
                    className="w-full text-center text-sm text-neutral-600 hover:text-[#1a237e] py-1.5 hover:bg-neutral-100 block"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </li>

            {/* Blog */}
            <li>
              <Link
                to="/blog"
                onClick={() => setMenuOpen(false)}
                className="text-neutral-700 font-semibold hover:text-[#1a237e] transition-colors"
              >
                Blog
              </Link>
            </li>

            <li>
              <a
                href="#contato"
                onClick={() => setMenuOpen(false)}
                className="text-neutral-700 font-semibold hover:text-[#1a237e] transition-colors"
              >
                Contato
              </a>
            </li>
            <li>
              <a
                href="https://lafaculdadesava.simpleacademy.tech/login"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1a237e] text-white font-semibold py-2.5 px-5 rounded-md hover:bg-[#da1069] transition-colors text-center inline-block w-[90%] md:w-auto"
              >
                PORTAL DO ALUNO
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Banner */}
      <section
        id="home"
        className="home-hero flex items-center justify-center text-center text-white px-5 pt-20"
      >
        <div className="max-w-3xl flex flex-col items-center gap-5">
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
            EJA, Supletivo e Cursos EAD em Goiânia
          </h1>
          <p className="text-lg sm:text-xl text-neutral-100 max-w-2xl">
            + de 300 Cursos de alta qualidade com certificação reconhecida a sua disposição.
          </p>
          <Link
            to="/catalogo"
            className="bg-[#da1069] hover:bg-white hover:text-neutral-900 font-bold py-4 px-10 rounded-full text-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 inline-block"
          >
            Ver Catálogo Completo
          </Link>
        </div>
      </section>

      {/* Selos de Confiança */}
      <section className="py-20 w-full max-w-6xl mx-auto px-5 text-center">
        <h2 className="text-3xl font-bold text-[#1a237e] mb-12">Selos de Confiança</h2>
        
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
          {seals.map((s, idx) => (
            <div key={idx} className="flex justify-center items-center p-2">
              <img
                src={s.src}
                alt={s.alt}
                loading="lazy"
                className="seal-img max-h-24 object-contain"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Conteúdo Otimizado para SEO (EJA, Supletivo, Cursos Profissionalizantes) */}
      <section className="py-20 bg-neutral-50 text-neutral-800 border-t border-neutral-200">
        <div className="max-w-4xl mx-auto px-5">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a237e] text-center leading-tight mb-8">
            Supletivo EJA EAD e Cursos Profissionalizantes em Goiânia e Aparecida de Goiânia
          </h2>
          
          <div className="prose prose-neutral max-w-none text-base leading-relaxed space-y-6 text-neutral-600">
            <p>
              Está procurando por <strong>EJA Goiânia</strong> ou <strong>EJA Aparecida de Goiânia</strong>? A LA Educação é a escolha ideal para quem precisa de flexibilidade para <strong>concluir o Ensino Médio</strong> ou <strong>concluir o Ensino Fundamental</strong>. Nossa escola de <strong>EJA EAD</strong> em Goiás oferece uma estrutura de ensino focada no desenvolvimento profissional do aluno, permitindo que você estude online com materiais atualizados e professores especializados, sem prejudicar sua rotina de trabalho.
            </p>

            <p>
              Nossa instituição destaca-se pela alta qualidade do material didático, aulas 100% online e suporte via WhatsApp para tirar todas as suas dúvidas. O <strong>Supletivo EAD</strong> da LA Educação emite certificados reconhecidos pelo MEC e válidos em todo o território nacional. Com isso, ao concluir seus estudos conosco, você estará apto a ingressar em faculdades, prestar concursos públicos de nível médio e se destacar em entrevistas de emprego na região de Goiânia e Aparecida.
            </p>

            <h3 className="text-2xl font-bold text-[#1a237e] mt-10 mb-4">
              Como Funciona o Supletivo EJA EAD em Goiás?
            </h3>
            <p>
              O processo de conclusão escolar na modalidade <strong>Supletivo EAD</strong> é rápido e dinâmico. Ele é voltado para jovens e adultos que não tiveram a oportunidade de concluir os estudos na idade convencional. Para se matricular no Ensino Fundamental EJA, a idade mínima exigida é de 15 anos completos. Já para o Ensino Médio EAD, o aluno deve ter a idade mínima de 18 anos completos.
            </p>
            <p>
              Estudando na nossa <strong>escola EJA Goiás</strong>, você realiza todo o curso em nosso Ambiente Virtual de Aprendizagem (AVA), realizando leituras, assistindo a vídeo-aulas e resolvendo exercícios práticos. Ao final do programa, após a aprovação, seu certificado é gerado de forma oficial e regularizada.
            </p>

            <h3 className="text-2xl font-bold text-[#1a237e] mt-10 mb-4">
              Cursos Profissionalizantes EAD de Alta Qualidade em Goiânia e Aparecida
            </h3>
            <p>
              Além de oferecer educação básica de jovens e adultos, a LA Educação é uma renomada <strong>Escola Profissionalizante em Goiânia</strong> e Aparecida de Goiânia. Nossos <strong>cursos com certificado</strong> preparam você de forma imediata para o mercado corporativo de Goiás.
            </p>
            <p>
              Se você visa qualificação rápida e foco em contratação rápida, oferecemos cursos essenciais:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Curso de Administração Goiânia</strong>: Desenvolva habilidades de gestão financeira, planejamento, fluxo de caixa e rotinas de escritório comerciais em Goiás.
              </li>
              <li>
                <strong>Curso de Cuidador de Idosos</strong>: Capacite-se na assistência de saúde, nutrição e bem-estar físico e psicológico para a terceira idade, uma das profissões mais demandadas atualmente em Goiânia e região metropolitana.
              </li>
              <li>
                <strong>Curso de Atendente de Farmácia</strong>: Aprenda noções de farmacologia, organização de estoque, receitas médicas e excelência no atendimento ao cliente.
              </li>
              <li>
                <strong>Curso de Recepcionista</strong>: Desenvolva etiqueta corporativa, atendimento telefônico, domínio de planilhas e organização de consultórios e hotéis.
              </li>
              <li>
                <strong>Curso de Informática Goiânia</strong>: Capacitação no Pacote Office (Word, Excel e PowerPoint) e navegação segura para funções administrativas modernas.
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-[#1a237e] mt-10 mb-4">
              Vantagens de Estudar na LA Educação
            </h3>
            <p>
              Estudar conosco traz diversos benefícios fundamentais para o seu sucesso profissional em Goiânia, Aparecida de Goiânia e toda a região metropolitana:
            </p>
            <ul className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Certificado Autorizado MEC</strong>: Estude com a tranquilidade de que seu certificado é válido em qualquer empresa, faculdade ou concurso em Goiás e no Brasil.
              </li>
              <li>
                <strong>Ensino 100% Flexível</strong>: Defina seu próprio horário. O ambiente virtual fica aberto 24 horas por dia, 7 dias por semana.
              </li>
              <li>
                <strong>Matrícula Rápida e Facilitada</strong>: Sem burocracia. O processo de matrícula pode ser iniciado totalmente online, com auxílio do nosso time de atendimento.
              </li>
              <li>
                <strong>Diferenciais Competitivos</strong>: Cursos online e presenciais com excelente custo-benefício e parcelamento em até 12 vezes sem juros.
              </li>
            </ul>

            <div className="my-10 p-6 bg-white rounded-xl border border-neutral-200 shadow-sm text-center">
              <h4 className="text-xl font-bold text-[#1a237e] mb-3">
                Garanta sua vaga hoje mesmo!
              </h4>
              <p className="mb-5 text-sm text-neutral-500">
                Matrículas abertas para EJA, Supletivo EAD e Cursos Profissionalizantes com descontos exclusivos.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/matricula"
                  className="bg-[#da1069] text-white hover:bg-[#1a237e] font-bold py-3 px-8 rounded-full text-base transition-colors shadow"
                >
                  Fazer Pré-Matrícula Online
                </Link>
                <a
                  href="https://wa.me/5562996592952"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[oklch(0.65_0.18_145)] text-white hover:bg-[oklch(0.6_0.18_145)] font-bold py-3 px-8 rounded-full text-base transition-colors shadow inline-flex items-center gap-2"
                >
                  Falar no WhatsApp
                </a>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-[#1a237e] mt-10 mb-4">
              Perguntas Frequentes (FAQ) — Dúvidas Comuns
            </h3>
            <div className="space-y-4 pb-6">
              <div className="border-b border-neutral-200 pb-3">
                <h4 className="font-bold text-[#1a237e] text-base mb-1">
                  1. Quem pode se matricular no Supletivo EJA EAD?
                </h4>
                <p className="text-sm text-neutral-600">
                  Para ingressar no Ensino Fundamental do EJA, o aluno precisa ter no mínimo 15 anos completos. Para o Ensino Médio EAD, a idade mínima exigida é de 18 anos completos. Não há limite máximo de idade.
                </p>
              </div>
              <div className="border-b border-neutral-200 pb-3">
                <h4 className="font-bold text-[#1a237e] text-base mb-1">
                  2. O certificado de EJA EAD da LA Educação é igual ao do ensino presencial?
                </h4>
                <p className="text-sm text-neutral-600">
                  Sim. Os certificados emitidos pela nossa instituição parceira autorizada são 100% equivalentes aos do ensino presencial tradicional e plenamente reconhecidos pelo MEC em todo o Brasil.
                </p>
              </div>
              <div className="border-b border-neutral-200 pb-3">
                <h4 className="font-bold text-[#1a237e] text-base mb-1">
                  3. Quanto tempo leva para concluir o Ensino Médio pelo Supletivo EAD?
                </h4>
                <p className="text-sm text-neutral-600">
                  O tempo de conclusão varia conforme a disponibilidade de estudos do aluno. A grande vantagem do EAD é a flexibilidade, permitindo uma aceleração segura do aprendizado com avaliações flexíveis.
                </p>
              </div>
              <div className="border-b border-neutral-200 pb-3">
                <h4 className="font-bold text-[#1a237e] text-base mb-1">
                  4. Como realizo a matrícula para os Cursos Profissionalizantes ou EJA?
                </h4>
                <p className="text-sm text-neutral-600">
                  A matrícula pode ser realizada 100% online. Basta acessar nosso assistente de matrícula online no site ou entrar em contato direto com nossa equipe via WhatsApp no número (62) 99659-2952.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contato" className="bg-[#121212] text-neutral-400 py-16 mt-auto">
        <div className="max-w-6xl mx-auto px-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          
          {/* Info */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white text-lg font-bold">Licenciado Autorizado LA Educação</h3>
            <p className="text-sm">CNPJ: 58.208.328/0001-88</p>
            <p className="text-sm">Transformando vidas através do ensino digital de excelência.</p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[#da1069] text-base font-semibold">Links Úteis</h4>
            <ul className="list-none flex flex-col gap-2.5 text-sm">
              <li>
                <a href="#" className="hover:text-[#da1069] transition-colors">
                  Trabalhe Conosco
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#da1069] transition-colors">
                  Termos e Condições
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#da1069] transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#da1069] transition-colors">
                  Dúvidas Frequentes
                </a>
              </li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[#da1069] text-base font-semibold">Redes Sociais</h4>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/lic.laeducacao.goiania"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                className="bg-neutral-800 w-10 h-10 flex items-center justify-center rounded-full text-white font-bold hover:bg-[#da1069] transition-colors text-sm"
              >
                fb
              </a>
              <a
                href="https://www.instagram.com/lic.laeducacao.goiania"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="bg-neutral-800 w-10 h-10 flex items-center justify-center rounded-full text-white font-bold hover:bg-[#da1069] transition-colors text-sm"
              >
                Ig
              </a>
              <a
                href="https://wa.me/5562996592952"
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp"
                className="bg-neutral-800 w-10 h-10 flex items-center justify-center rounded-full text-white font-bold hover:bg-[#da1069] transition-colors text-sm"
              >
                Wa
              </a>
            </div>
          </div>

          {/* Atendimento */}
          <div className="flex flex-col gap-3 text-sm">
            <h4 className="text-[#da1069] text-base font-semibold">Atendimento</h4>
            <p>WhatsApp: (62) 9 9659-2952</p>
            <p>Email: suporte@trinity.edu.br</p>
            <p>Horário: Seg a Sex, 08h às 18h</p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="max-w-6xl mx-auto px-5 mt-12 pt-6 border-t border-neutral-800 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} LA Educação - Licenciado Goiânia. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
