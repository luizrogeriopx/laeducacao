import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getCourses, type Course } from "@/lib/courses.functions";

const WHATSAPP_NUMBER = "5562996592952";

export const Route = createFileRoute("/")({
  component: Catalog,
  head: () => ({
    meta: [
      { title: "Catálogo de Cursos - Trinity" },
      {
        name: "description",
        content:
          "Catálogo completo de cursos online. Matricule-se agora pelo WhatsApp.",
      },
    ],
  }),
});

function whatsappLink(course: Course) {
  const msg = `Olá! Tenho interesse em me matricular no curso: ${course.title} (${course.url})`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function Catalog() {
  const fetchCourses = useServerFn(getCourses);
  const [query, setQuery] = useState("");

  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["courses"],
    queryFn: () => fetchCourses({ data: {} }),
    staleTime: 60 * 60 * 1000,
  });

  const courses = data?.courses ?? [];
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return courses;
    return courses.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q),
    );
  }, [courses, query]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Catálogo de Cursos
          </h1>
          <p className="mt-2 text-muted-foreground">
            Atualizado automaticamente a partir do site oficial. Matricule-se
            pelo WhatsApp.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Input
              type="search"
              placeholder="Buscar curso..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="sm:max-w-md"
            />
            <Button
              variant="outline"
              onClick={() =>
                fetchCourses({ data: { refresh: true } }).then(() => refetch())
              }
              disabled={isFetching}
            >
              {isFetching ? "Atualizando..." : "Atualizar agora"}
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {isLoading && (
          <p className="text-center text-muted-foreground">
            Carregando catálogo (pode levar alguns segundos na primeira vez)...
          </p>
        )}
        {isError && (
          <p className="text-center text-destructive">
            Erro ao carregar cursos. Tente novamente.
          </p>
        )}
        {!isLoading && !isError && (
          <>
            <p className="mb-4 text-sm text-muted-foreground">
              {filtered.length} curso{filtered.length === 1 ? "" : "s"}
              {query && ` encontrado${filtered.length === 1 ? "" : "s"}`}
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function CourseCard({ course }: { course: Course }) {
  return (
    <Card className="flex flex-col overflow-hidden p-0 transition-shadow hover:shadow-lg">
      {course.image ? (
        <div className="aspect-square w-full overflow-hidden bg-muted">
          <img
            src={course.image}
            alt={course.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div className="aspect-square w-full bg-muted" />
      )}
      <div className="flex flex-1 flex-col p-4">
        <h2 className="text-base font-semibold leading-snug text-foreground">
          {course.title}
        </h2>
        {course.description && (
          <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
            {course.description}
          </p>
        )}
        <div className="mt-4 flex flex-1 flex-col justify-end gap-2">
          <a
            href={whatsappLink(course)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Matricular pelo WhatsApp
          </a>
          <a
            href={course.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center text-xs text-muted-foreground hover:text-foreground"
          >
            Ver detalhes no site →
          </a>
        </div>
      </div>
    </Card>
  );
}
