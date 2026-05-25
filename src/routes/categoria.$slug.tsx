import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { listCourses, type Course } from "@/lib/courses.functions";
import { categorySlug } from "@/lib/category";
import { SiteFooter } from "@/components/SiteFooter";


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
  const { data, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: () => fetchCourses(),
  });

  const { categoryName, items } = useMemo(() => {
    const courses = data?.courses ?? [];
    const matches = courses.filter((c) => categorySlug(c.category) === slug);
    return {
      categoryName: matches[0]?.category ?? slug,
      items: matches,
    };
  }, [data, slug]);

  if (!isLoading && data && items.length === 0) {
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
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((c) => (
            <CourseCardMini key={c.id} course={c} />
          ))}
        </div>
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
        {course.price_current != null && (
          <p className="mt-1 text-sm font-semibold text-primary">
            R$ {course.price_current.toFixed(2).replace(".", ",")}
          </p>
        )}
      </div>
    </Link>
  );
}
