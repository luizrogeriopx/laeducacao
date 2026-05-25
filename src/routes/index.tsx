import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { listCourses, type Course } from "@/lib/courses.functions";
import logo from "@/assets/laeducacao-logo.png";
import { categorySlug } from "@/lib/category";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Catálogo de Cursos - LA Educação Goiânia" },
      {
        name: "description",
        content:
          "Conheça todos os cursos da LA Educação Polo Autorizado, organizados por categoria.",
      },
    ],
  }),
});

function HomePage() {
  const fetchCourses = useServerFn(listCourses);
  const [query, setQuery] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: () => fetchCourses(),
  });

  const courses = data?.courses ?? [];
  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? courses.filter(
          (c) =>
            c.title.toLowerCase().includes(q) ||
            c.description.toLowerCase().includes(q) ||
            c.category.toLowerCase().includes(q),
        )
      : courses;
    const map = new Map<string, Course[]>();
    for (const c of filtered) {
      const arr = map.get(c.category) ?? [];
      arr.push(c);
      map.set(c.category, arr);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [courses, query]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Catálogo de Cursos
          </h1>
          <p className="mt-2 text-muted-foreground">
            LA Educação Polo Autorizado · Cursos organizados por categoria
          </p>
          <div className="mt-6 max-w-md">
            <Input
              type="search"
              placeholder="Buscar curso ou categoria..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {isLoading && (
          <p className="text-muted-foreground">Carregando cursos...</p>
        )}
        {!isLoading && courses.length === 0 && (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <p className="text-muted-foreground">
              Nenhum curso cadastrado ainda. Faça login no{" "}
              <Link to="/admin" className="text-primary underline">
                painel administrativo
              </Link>{" "}
              e clique em "Buscar atualizações".
            </p>
          </div>
        )}

        <div className="space-y-12">
          {grouped.map(([cat, items]) => (
            <section key={cat}>
              <div className="mb-4 flex items-end justify-between">
                <h2 className="text-2xl font-bold">{cat}</h2>
                <Link
                  to="/categoria/$slug"
                  params={{ slug: categorySlug(cat) }}
                  className="text-sm text-primary hover:underline"
                >
                  Ver todos →
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {items.slice(0, 4).map((c) => (
                  <CourseCardMini key={c.id} course={c} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
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
