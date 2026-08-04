import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { listCategories } from "@/lib/categories.functions";

export function SiteHeader() {
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

  return (
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
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-neutral-700 font-semibold hover:text-[#1a237e] transition-colors"
            >
              Início
            </Link>
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
                    onClick={() => setMenuOpen(false)}
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
                    onClick={() => setMenuOpen(false)}
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
            <Link
              to="/"
              hash="contato"
              onClick={() => setMenuOpen(false)}
              className="text-neutral-700 font-semibold hover:text-[#1a237e] transition-colors"
            >
              Contato
            </Link>
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
  );
}
