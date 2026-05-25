import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { listCourses, type Course } from "@/lib/courses.functions";
import logo from "@/assets/laeducacao-logo.png";
import { categorySlug } from "@/lib/category";
import { SiteFooter } from "@/components/SiteFooter";


export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "LA Educação Goiânia — Cursos Online com Certificado MEC" },
      {
        name: "description",
        content:
          "Catálogo completo de cursos EAD da LA Educação Polo Autorizado em Goiânia: EJA, Graduação, Pós-Graduação, Técnicos e Profissionalizantes com certificado reconhecido pelo MEC.",
      },
      { property: "og:title", content: "LA Educação Goiânia — Cursos Online com Certificado MEC" },
      { property: "og:description", content: "Catálogo completo de cursos EAD com certificado MEC em Goiânia." },
      { property: "og:url", content: "https://laeducacao.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://laeducacao.lovable.app/" }],
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
      <header className="border-b bg-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-8 sm:px-6">
          <img
            src={logo}
            alt="LA Educação Polo Autorizado"
            className="h-20 w-auto sm:h-24"
          />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8 max-w-md">
          <Input
            type="search"
            placeholder="Buscar curso ou categoria..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

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
