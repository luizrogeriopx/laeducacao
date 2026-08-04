import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/catalogo")({
  component: CatalogoPage,
  head: () => ({
    title: "Catálogo de Cursos EAD com Certificado MEC | LA Educação",
    meta: [
      { name: "description", content: "Conheça nossos cursos profissionalizantes, técnicos e EJA EAD em Goiânia e Aparecida de Goiânia. Certificação reconhecida pelo MEC com matrículas abertas." },
      { property: "og:title", content: "Catálogo de Cursos EAD com Certificado MEC | LA Educação" },
      { property: "og:description", content: "Conheça nossos cursos profissionalizantes, técnicos e EJA EAD em Goiânia e Aparecida de Goiânia. Certificação reconhecida pelo MEC com matrículas abertas." },
      { property: "og:url", content: "https://www.laeducacaogo.com.br/catalogo" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://www.laeducacaogo.com.br/img/banner-cursos-ead-goiania.png" },
      { name: "twitter:image", content: "https://www.laeducacaogo.com.br/img/banner-cursos-ead-goiania.png" },
    ],
    links: [{ rel: "canonical", href: "https://www.laeducacaogo.com.br/catalogo" }]
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
        <h1 className="text-white ml-5 text-base opacity-90 hidden sm:inline font-semibold">
          Catálogo de Cursos EAD em Goiânia — LA Educação
        </h1>
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

      <section className="sr-only">
        <h2>Explore o Catálogo de Cursos Online da LA Educação em Goiânia</h2>
        <p>
          O catálogo de cursos da LA Educação reúne as melhores oportunidades de qualificação profissional, ensino técnico e conclusão de estudos com o <strong>Supletivo EJA EAD</strong>. Desenvolvemos esta ferramenta interativa para permitir que estudantes de <strong>Goiânia</strong>, <strong>Aparecida de Goiânia</strong>, <strong>Anápolis</strong>, <strong>Goiás</strong> e de todo o Brasil possam consultar a grade curricular, valores e duração dos cursos com facilidade.
        </p>

        <h2>Categorias de Cursos com Certificado em Destaque</h2>
        <p>
          Navegue pelas nossas principais categorias educacionais e encontre a formação ideal para impulsionar a sua carreira no mercado corporativo e de serviços em Goiás:
        </p>
        <ul>
          <li><strong>EJA e Ensino Básico</strong>: Conclusão do Ensino Fundamental e Ensino Médio EAD de forma rápida e segura.</li>
          <li><strong>Cursos Profissionalizantes</strong>: Qualificações imediatas em áreas administrativas, de saúde e atendimento.</li>
          <li><strong>Cursos Técnicos</strong>: Formações de nível médio técnico voltadas para a prática profissional.</li>
          <li><strong>Graduação e Pós-Graduação</strong>: Cursos superiores e especializações com diploma reconhecido pelo MEC.</li>
        </ul>

        <h2>Cursos Profissionalizantes e Supletivo em Goiânia e Aparecida de Goiânia</h2>
        <p>
          Nosso portfólio inclui os cursos mais solicitados por empresas em Goiás, como o <strong>Curso de Cuidador de Idosos</strong>, <strong>Curso de Atendente de Farmácia</strong>, <strong>Curso de Administração</strong>, <strong>Curso de Recepcionista</strong> e <strong>Curso de Informática</strong>. Todos contam com material de apoio digital, avaliações integradas e certificado oficial.
        </p>

        <h2>Vantagens e Flexibilidade do Ensino Digital EAD</h2>
        <p>
          Estudar a distância na LA Educação oferece a liberdade de gerenciar seu tempo. Nossa plataforma fica disponível 24 horas por dia, permitindo que você estude pelo computador, tablet ou celular. O polo da LA Educação em Goiânia oferece todo o suporte para matrículas abertas, garantindo orientação em cada etapa de sua formação.
        </p>
      </section>
    </div>
  );
}
