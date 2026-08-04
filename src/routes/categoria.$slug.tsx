import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { listCourses, type Course } from "@/lib/courses.functions";
import { listCategories, type CourseCategory } from "@/lib/categories.functions";
import { categorySlug } from "@/lib/category";
import { SiteFooter } from "@/components/SiteFooter";
import { formatPrice } from "@/lib/utils";


function getCategoryName(slug: string): string {
  const mapping: Record<string, string> = {
    "seguranca-do-trabalho": "Segurança do Trabalho",
    "saude": "Saúde",
    "beleza-e-estetica": "Beleza e Estética",
    "transporte-e-transito": "Transporte e Trânsito",
    "gastronomia": "Gastronomia",
    "tecnologia-e-design": "Tecnologia e Design",
    "marketing-e-vendas": "Marketing e Vendas",
    "administracao-e-negocios": "Administração e Negócios",
    "engenharia-e-construcao": "Engenharia e Construção",
    "educacao-e-pedagogia": "Educação e Pedagogia",
    "graduacao-e-pos": "Graduação e Pós-Graduação",
    "eja-e-ensino-basico": "EJA e Ensino Básico",
  };
  return (
    mapping[slug] ||
    slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")
  );
}

export const Route = createFileRoute("/categoria/$slug")({
  component: CategoryPage,
  head: ({ params }) => {
    const url = `https://www.laeducacaogo.com.br/categoria/${params.slug}`;
    const name = getCategoryName(params.slug);
    const title = `Cursos de ${name} em Goiânia e Aparecida | LA Educação`;
    const desc = `Confira os cursos online e presenciais da categoria ${name} com certificado reconhecido pelo MEC em Goiânia, Aparecida de Goiânia e Goiás. Matrículas abertas!`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { property: "og:image", content: "https://www.laeducacaogo.com.br/img/banner-cursos-ead-goiania.png" },
        { name: "twitter:image", content: "https://www.laeducacaogo.com.br/img/banner-cursos-ead-goiania.png" },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
});

function CategoryPage() {
  const { slug } = Route.useParams();
  const fetchCourses = useServerFn(listCourses);
  const fetchCategories = useServerFn(listCategories);
  const { data, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: () => fetchCourses(),
  });
  const { data: catData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
  });

  const { categoryName, items, known } = useMemo(() => {
    const courses = data?.courses ?? [];
    const matches = courses.filter((c: Course) => categorySlug(c.category) === slug);
    const cat = (catData?.categories ?? []).find((c: CourseCategory) => c.slug === slug);
    return {
      categoryName: cat?.name ?? matches[0]?.category ?? getCategoryName(slug),
      items: matches,
      known: Boolean(cat),
    };
  }, [data, catData, slug]);

  if (!isLoading && data && catData && items.length === 0 && !known) {
    throw notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Voltar
          </Link>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-[#1a237e]">
            Cursos de {categoryName} em Goiânia e Aparecida
          </h1>
          <p className="mt-1 text-muted-foreground">
            {items.length} curso{items.length === 1 ? "" : "s"} disponível{items.length === 1 ? "" : "s"} para matrícula
          </p>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {items.length === 0 ? (
          <p className="rounded-xl border bg-card p-8 text-center text-muted-foreground">
            Nenhum curso cadastrado nesta categoria no momento.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {items.map((c) => (
              <CourseCardMini key={c.id} course={c} />
            ))}
          </div>
        )}

        {/* Descrição rica para SEO */}
        <CategoryDescription name={categoryName} />
      </main>

      <SiteFooter />
    </div>
  );
}

function CategoryDescription({ name }: { name: string }) {
  return (
    <section className="mt-16 border-t pt-10 text-neutral-600 space-y-6 max-w-4xl">
      <h2 className="text-2xl font-bold text-[#1a237e]">
        Carreira e Mercado de Trabalho para {name} em Goiânia e Goiás
      </h2>
      <p>
        A procura por profissionais qualificados na área de <strong>{name}</strong> tem apresentado crescimento expressivo em <strong>Goiânia</strong>, <strong>Aparecida de Goiânia</strong> e em toda a região de <strong>Goiás</strong>. Com a crescente competitividade do mercado de trabalho goiano, ter em seu currículo um <strong>curso com certificado</strong> reconhecido nacionalmente é o primeiro passo para garantir vagas de destaque, recolocação rápida e salários competitivos.
      </p>
      <p>
        Os cursos oferecidos pela LA Educação na categoria de {name} são estruturados na modalidade EAD (Ensino a Distância) com certificação MEC, permitindo que você gerencie seu tempo livremente e estude quando e onde puder. Nossos estudantes contam com suporte completo via WhatsApp para tirar dúvidas pedagógicas e administrativas, além de acesso a uma plataforma online intuitiva com videoaulas, apostilas e avaliações digitais.
      </p>
      <p>
        Seja você um estudante buscando o primeiro emprego ou um profissional experiente em busca de especialização e promoção na carreira, nossas opções de <strong>cursos online</strong> fornecem todo o suporte e a certificação necessária. Estude onde e quando quiser, e conquiste novos horizontes profissionais com a LA Educação.
      </p>
      <div className="rounded-xl bg-[#f8f9fa] p-6 border border-neutral-100 mt-6 text-center">
        <h3 className="text-lg font-bold text-[#1a237e] mb-2">Matrículas Abertas para {name}</h3>
        <p className="text-sm mb-4">Inscreva-se de forma rápida através do nosso chat de matrícula online ou fale com nossos atendentes em Goiânia.</p>
        <div className="flex justify-center gap-3">
          <Link to="/matricula" className="bg-[#da1069] text-white hover:bg-[#1a237e] font-bold py-2.5 px-6 rounded-full text-sm transition-colors shadow">
            Iniciar Matrícula Online
          </Link>
          <a href="https://wa.me/5562996592952" target="_blank" rel="noopener noreferrer" className="bg-[oklch(0.65_0.18_145)] text-white hover:bg-[oklch(0.6_0.18_145)] font-bold py-2.5 px-6 rounded-full text-sm transition-colors shadow">
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

function CourseCardMini({ course }: { course: Course }) {
  return (
    <Link
      to="/curso/$slug"
      params={{ slug: course.slug }}
      className="group block overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-md"
    >
      <div className="aspect-square w-full overflow-hidden bg-muted">
        {course.image ? (
          <img
            src={course.image}
            alt={`Curso de ${course.title} EAD em Goiânia - LA Educação`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className="p-3">
        <h2 className="line-clamp-2 text-sm font-semibold leading-snug text-neutral-800 group-hover:text-[#1a237e]">
          {course.title}
        </h2>
        {course.hide_price ? null : course.display_installments &&
          course.price_installments ? (
          <p className="mt-1 text-sm font-semibold text-primary">
            {course.price_installments}
          </p>
        ) : (
          course.price_current != null && (
            <p className="mt-1 text-sm font-semibold text-primary">
              R$ {formatPrice(course.price_current)}
            </p>
          )
        )}
      </div>
    </Link>
  );
}
