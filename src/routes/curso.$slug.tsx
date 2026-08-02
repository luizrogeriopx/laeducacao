import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { getCourseBySlug } from "@/lib/courses.functions";
import { categorySlug } from "@/lib/category";
import { whatsappCourseLink } from "@/lib/whatsapp";
import { SiteFooter } from "@/components/SiteFooter";
import { formatPrice } from "@/lib/utils";

const courseQuery = (slug: string) =>
  queryOptions({
    queryKey: ["course", slug],
    queryFn: () => getCourseBySlug({ data: { slug } }),
  });

export const Route = createFileRoute("/curso/$slug")({
  component: CoursePage,
  loader: ({ params, context }) =>
    context.queryClient.ensureQueryData(courseQuery(params.slug)),
  head: ({ params, loaderData }) => {
    const course = loaderData?.course;
    const url = `https://laeducacao.lovable.app/curso/${params.slug}`;
    const title = course
      ? `${course.title} — LA Educação Goiânia`
      : `Curso ${params.slug} — LA Educação Goiânia`;
    const desc = course?.description
      ? course.description.slice(0, 160)
      : `Matricule-se no curso ${params.slug} com certificado reconhecido pelo MEC na LA Educação Polo Autorizado Goiânia.`;
    const image = course?.image || "https://storage.googleapis.com/gpt-engineer-file-uploads/DHiOjp8ndWUzFfJtfqCiJhEeQ343/social-images/social-1779727637968-LAura.webp";

    const meta = [
      { title },
      { name: "description", content: desc },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:url", content: url },
      { property: "og:type", content: "product" },
      { property: "og:image", content: image },
      { name: "twitter:image", content: image },
    ];

    const scripts = course
      ? [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Course",
              name: course.title,
              description: course.description || desc,
              image: image || undefined,
              provider: {
                "@type": "EducationalOrganization",
                name: "LA Educação Goiânia — Polo Autorizado",
                sameAs: "https://laeducacao.lovable.app",
              },
              ...(course.price_current != null && {
                offers: {
                  "@type": "Offer",
                  price: course.price_current,
                  priceCurrency: "BRL",
                  availability: "https://schema.org/InStock",
                  url,
                },
              }),
              hasCourseInstance: {
                "@type": "CourseInstance",
                courseMode: "Online",
                inLanguage: "pt-BR",
              },
            }),
          },
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Início", item: "https://laeducacao.lovable.app/" },
                { "@type": "ListItem", position: 2, name: course.category, item: `https://laeducacao.lovable.app/categoria/${categorySlug(course.category)}` },
                { "@type": "ListItem", position: 3, name: course.title, item: url },
              ],
            }),
          },
        ]
      : [];

    return {
      meta,
      links: [{ rel: "canonical", href: url }],
      scripts,
    };
  },
});

function CoursePage() {
  const { slug } = Route.useParams();
  const fetchCourse = useServerFn(getCourseBySlug);
  const { data, isLoading } = useQuery({
    queryKey: ["course", slug],
    queryFn: () => fetchCourse({ data: { slug } }),
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  const course = data?.course;
  if (!course) throw notFound();


  return (
    <div className="min-h-screen bg-background">
      {/* Cover */}
      <div className="relative h-56 w-full overflow-hidden bg-muted sm:h-72">
        {course.image && (
          <>
            <img
              src={course.image}
              alt=""
              aria-hidden
              className="h-full w-full object-cover blur-md scale-110 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />
          </>
        )}
        <div className="absolute left-4 top-4">
          <Link
            to="/"
            className="rounded-full bg-background/80 px-3 py-1 text-sm backdrop-blur hover:bg-background"
          >
            ← Início
          </Link>
        </div>
      </div>

      {/* Profile */}
      <div className="relative z-10 mx-auto -mt-20 max-w-3xl px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          {course.image ? (
            <img
              src={course.image}
              alt={course.title}
              className="h-32 w-32 rounded-full border-4 border-background object-cover shadow-lg sm:h-40 sm:w-40"
            />
          ) : (
            <div className="h-32 w-32 rounded-full border-4 border-background bg-muted shadow-lg sm:h-40 sm:w-40" />
          )}

          <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
            {course.title}
          </h1>

          <Link
            to="/categoria/$slug"
            params={{ slug: categorySlug(course.category) }}
            className="mt-2 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground hover:bg-secondary/80"
          >
            {course.category}
          </Link>

          {course.description && (
            <p className="mt-4 max-w-2xl text-muted-foreground">
              {course.description}
            </p>
          )}

          {/* Price */}
          {(course.price_current != null || course.price_original != null) && (
            <div className="mt-6 rounded-xl border bg-card px-6 py-4">
              {course.price_original != null &&
                course.price_current != null &&
                course.price_original > course.price_current && (
                  <p className="text-sm text-muted-foreground line-through">
                    De R$ {formatPrice(course.price_original)}
                  </p>
                )}
              {course.price_current != null && (
                <p className="text-3xl font-bold text-primary">
                  R$ {formatPrice(course.price_current)}
                  <span className="ml-1 text-sm font-normal text-muted-foreground">
                    à vista
                  </span>
                </p>
              )}
              {course.price_installments && (
                <p className="mt-1 text-sm text-muted-foreground">
                  ou {course.price_installments}
                </p>
              )}
            </div>
          )}

          <div className="mt-6 flex w-full max-w-sm flex-col gap-2">
            <Button asChild size="lg" className="bg-[oklch(0.65_0.18_145)] text-white hover:bg-[oklch(0.6_0.18_145)]">
              <a
                href={whatsappCourseLink({ title: course.title, url: course.url })}
                target="_blank"
                rel="noopener noreferrer"
              >
                Matricule-se pelo WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="h-16" />
      <SiteFooter />
    </div>
  );
}

