import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/catalogo")({
  component: CatalogoPage,
  head: () => ({
    title: "Catálogo de Cursos - LA Educação",
    meta: [
      { name: "description", content: "Explore o catálogo completo de cursos online com certificado MEC da LA Educação." }
    ]
  })
});

function CatalogoPage() {
  return (
    <div className="w-full h-screen overflow-hidden flex flex-col font-sans">
      {/* Barra de Ferramentas Superior */}
      <header className="h-[60px] bg-[#1a237e] flex items-center px-5 shadow-lg relative z-10">
        <Link
          to="/"
          className="bg-[#da1069] text-white hover:bg-white hover:text-[#1a237e] text-sm font-semibold py-2 px-4 rounded transition-all duration-200 flex items-center gap-2 transform hover:-translate-y-0.5"
        >
          <span>←</span> Voltar ao Site
        </Link>
        <span className="text-white ml-5 text-base opacity-90 hidden sm:inline">
          Catálogo LA Educação
        </span>
      </header>

      {/* Container do Iframe */}
      <div className="flex-1 w-full bg-neutral-100">
        <iframe
          src="https://licenciado.laeducacao.com.br/catalogo-la"
          title="Catalogo LA Educação"
          className="w-full h-full border-none"
          allowFullScreen
        />
      </div>
    </div>
  );
}
