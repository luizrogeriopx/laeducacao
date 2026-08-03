import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { listCourses, type Course } from "@/lib/courses.functions";
import { listCategories, type CourseCategory } from "@/lib/categories.functions";
import { categorySlug } from "@/lib/category";
import { SiteFooter } from "@/components/SiteFooter";
import { formatPrice } from "@/lib/utils";


export const Route = createFileRoute("/categoria/$slug")({
  component: CategoryPage,
  head: ({ params }) => {
    const url = `https://laeducacao.lovable.app/categoria/${params.slug}`;
    const title = `Cursos de ${params.slug} — LA Educação Goiânia`;
    const desc = `Confira os cursos da categoria ${params.slug} com certificado reconhecido pelo MEC na LA Educação Polo Autorizado Goiânia.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
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
      categoryName: cat?.name ?? matches[0]?.category ?? slug,
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
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {categoryName}
          </h1>
          <p className="mt-1 text-muted-foreground">
            {items.length} curso{items.length === 1 ? "" : "s"}
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
      </main>

      <SiteFooter />
    </div>
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
            alt={course.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className="p-3">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug">
          {course.title}
        </h3>
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
