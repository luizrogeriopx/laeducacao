import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    title: "LA Educação Goiânia - Portal EAD",
    meta: [
      {
        name: "keywords",
        content:
          "educação ead, cursos profissionalizantes, la educação, licenciatura, Curso Superior Sequencial, Certificação por Competência, graduação a distância, bacharelado, cursos técnicos, EJA, Supletivo, Ensino Médio Online, Ensino Fundamental Online, Supletivo Online, Graduação, EAD, Ensino Superior Online, Faculdade Online, Concluir Ensino Médio Online",
      },
      {
        name: "description",
        content:
          "Catálogo completo de cursos EAD da LA Educação Polo Autorizado em Goiânia: EJA, Graduação, Pós-Graduação, Técnicos e Profissionalizantes com certificado reconhecido pelo MEC.",
      },
      { property: "og:title", content: "LA Educação Goiânia - Portal EAD" },
      {
        property: "og:description",
        content:
          "Cursos certificados pelo MEC. + de 300 Cursos de alta qualidade com certificação reconhecida a sua disposição.",
      },
      { property: "og:url", content: "https://laeducacao.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://laeducacao.lovable.app/" }],
  }),
});

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
    { src: "/img/Selos_MEC.png", alt: "Selo MEC" },
    { src: "/img/Selos_LA_Educa2.png", alt: "Selo LA Educação" },
    { src: "/img/Selos_LA_EducaReclameAqui.png", alt: "Selo Reclame Aqui" },
    { src: "/img/Selos_LA_EducaGoogle.png", alt: "Selo Google" },
    { src: "/img/Selos_INIPI.png", alt: "Selo INIPI" },
  ];

  const cursosCol1 = [
    "Cursos Livres",
    "Profissionalizantes",
    "Profissionalizantes Avançado",
    "EJA Fundamental e Médio",
    "Técnico",
    "Pós-Técnico",
    "Certificação por Competência",
  ];

  const cursosCol2 = [
    "Superior Sequencial",
    "Extensão Universitária",
    "Licenciatura",
    "Tecnólogo",
    "Pós-Graduação",
    "Bacharelado",
    "Doutorado",
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
            
            {/* Cursos Dropdown */}
            <li className="relative group md:block hidden">
              <span className="text-neutral-700 font-semibold hover:text-[#1a237e] transition-colors cursor-pointer flex items-center gap-1">
                Cursos <span className="text-xs">▼</span>
              </span>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white min-w-[500px] shadow-2xl p-6 rounded-lg border-t-4 border-[#1a237e] grid grid-cols-2 gap-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="flex flex-col gap-2">
                  {cursosCol1.map((c) => (
                    <Link
                      key={c}
                      to="/catalogo"
                      className="text-xs text-neutral-600 hover:text-[#1a237e] hover:pl-1 transition-all pb-1.5 border-b border-neutral-100"
                    >
                      {c}
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  {cursosCol2.map((c) => (
                    <Link
                      key={c}
                      to="/catalogo"
                      className="text-xs text-neutral-600 hover:text-[#1a237e] hover:pl-1 transition-all pb-1.5 border-b border-neutral-100"
                    >
                      {c}
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
                className={`bg-neutral-50 overflow-hidden transition-all duration-300 w-full flex flex-col items-center ${
                  dropdownOpen ? "max-h-[500px] py-4" : "max-h-0"
                }`}
              >
                {[...cursosCol1, ...cursosCol2].map((c) => (
                  <Link
                    key={c}
                    to="/catalogo"
                    onClick={() => setMenuOpen(false)}
                    className="w-full text-sm text-neutral-600 hover:text-[#1a237e] py-1.5 hover:bg-neutral-100"
                  >
                    {c}
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
            Cursos certificados pelo MEC.
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
                className="seal-img max-h-24 object-contain"
              />
            </div>
          ))}
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
