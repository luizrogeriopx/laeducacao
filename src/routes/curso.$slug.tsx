import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { getCourseBySlug } from "@/lib/courses.functions";
import { categorySlug } from "@/lib/category";
import { whatsappCourseLink } from "@/lib/whatsapp";
import { SiteFooter } from "@/components/SiteFooter";
import { formatPrice } from "@/lib/utils";
import { BookOpen, Clock, CheckCircle2, Layers } from "lucide-react";

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
    const url = `https://www.laeducacaogo.com.br/curso/${params.slug}`;
    const title = course
      ? `${course.title} em Goiânia e Aparecida de Goiânia | LA`
      : `Curso ${params.slug} em Goiânia | LA Educação`;
    const desc = course
      ? `Faça o curso de ${course.title} EAD em Goiânia e Aparecida de Goiânia com certificado reconhecido pelo MEC. Matrículas abertas e suporte via WhatsApp!`
      : `Matricule-se no curso ${params.slug} com certificado reconhecido pelo MEC na LA Educação Polo Autorizado Goiânia.`;
    const image = course?.image || "https://www.laeducacaogo.com.br/img/banner-cursos-ead-goiania.png";

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
                sameAs: "https://www.laeducacaogo.com.br",
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
                { "@type": "ListItem", position: 1, name: "Início", item: "https://www.laeducacaogo.com.br/" },
                { "@type": "ListItem", position: 2, name: course.category, item: `https://www.laeducacaogo.com.br/categoria/${categorySlug(course.category)}` },
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
          {!course.hide_price &&
            (course.price_current != null || course.price_original != null) && (
            <div className="mt-6 rounded-xl border bg-card px-6 py-4">
              {course.display_installments && course.price_installments ? (
                <>
                  <p className="text-3xl font-bold text-primary">
                    {course.price_installments}
                  </p>
                  {course.price_current != null && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      ou R$ {formatPrice(course.price_current)} à vista
                    </p>
                  )}
                </>
              ) : (
                <>
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
                </>
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

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 border-t mt-12 text-neutral-600 space-y-10">
        {/* Grade Curricular / Módulos do Curso */}
        {course.modules && Array.isArray(course.modules) && course.modules.length > 0 && (
          <div className="space-y-4">
            <div className="text-center sm:text-left">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1a237e]/10 px-3 py-1 text-xs font-semibold text-[#1a237e] mb-2">
                <BookOpen className="h-3.5 w-3.5" />
                Conteúdo Programático Oficial
              </span>
              <h2 className="text-2xl font-bold text-[#1a237e]">
                Grade Curricular do Curso ({course.modules.length} Módulos)
              </h2>
              <p className="text-sm text-neutral-600 mt-1">
                Confira todas as disciplinas e competências desenvolvidas ao longo da sua formação:
              </p>
            </div>

            <div className="space-y-3 mt-4">
              {course.modules.map((mod, idx) => (
                <details
                  key={mod.id || idx}
                  className="group rounded-xl border bg-white shadow-sm overflow-hidden transition-all duration-200 open:ring-1 open:ring-primary/20"
                >
                  <summary className="flex items-center justify-between p-4 cursor-pointer select-none font-medium hover:bg-neutral-50/80">
                    <div className="flex items-center gap-3 pr-2">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1a237e]/10 text-xs font-bold text-[#1a237e]">
                        {idx + 1}
                      </span>
                      <span className="text-base font-semibold text-neutral-800">
                        {mod.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {mod.workload && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs text-neutral-600 font-medium">
                          <Clock className="h-3 w-3" />
                          {mod.workload}
                        </span>
                      )}
                      <span className="text-neutral-400 group-open:rotate-180 transition-transform text-xs">
                        ▼
                      </span>
                    </div>
                  </summary>

                  <div className="px-5 pb-5 pt-3 border-t text-sm text-neutral-600 bg-neutral-50/40 space-y-3">
                    {mod.description && (
                      <p className="leading-relaxed text-neutral-700">{mod.description}</p>
                    )}
                    {mod.topics && mod.topics.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-xs text-neutral-800 uppercase tracking-wider mb-2">
                          Tópicos e Aulas Abordadas:
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {mod.topics.map((t, tIdx) => (
                            <li key={tIdx} className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span className="text-neutral-700 text-xs">{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </div>
        )}

        <h2 className="text-2xl font-bold text-[#1a237e] text-center pt-4">
          Por que fazer o curso de {course.title} na LA Educação?
        </h2>
        <p>
          O curso online de <strong>{course.title}</strong> é uma excelente escolha para quem reside em <strong>Goiânia</strong>, <strong>Aparecida de Goiânia</strong> ou em outras cidades de <strong>Goiás</strong> e busca qualificação profissional rápida de alto nível. Com o mercado cada vez mais exigente por certificações oficiais, estar preparado com um curso reconhecido é um diferencial essencial para processos de contratação e progressão de carreira.
        </p>
        
        <h3 className="text-xl font-bold text-[#1a237e] mt-6">Vantagens de Estudar EAD Conosco</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Certificado Reconhecido pelo MEC</strong>: Ao concluir os estudos, você recebe a certificação com validade nacional, aceita em empresas, concursos e faculdades.</li>
          <li><strong>Plataforma de Ensino 100% Online</strong>: Estude no seu próprio ritmo, de manhã, à tarde ou nos finais de semana. O conteúdo completo fica disponível 24 horas por dia.</li>
          <li><strong>Suporte Rápido e Humanizado</strong>: Esqueça o atendimento impessoal. Nosso time em Goiânia está sempre disponível via WhatsApp para auxiliar em questões financeiras, pedagógicas e de emissão de certificado.</li>
          <li><strong>Material Didático Completo</strong>: Apostilas digitais, videoaulas e questionários práticos desenvolvidos por profissionais do setor.</li>
        </ul>

        <h3 className="text-xl font-bold text-[#1a237e] mt-6">Mercado de Trabalho para {course.title} em Goiás</h3>
        <p>
          As empresas de Goiânia, Aparecida de Goiânia, Anápolis e região metropolitana buscam constantemente profissionais capacitados em {course.category}. A certificação obtida ao final deste curso comprova as competências necessárias e coloca seu currículo em posição de destaque diante dos recrutadores locais.
        </p>
        <p>
          A flexibilidade do ensino digital EAD garante que você possa continuar trabalhando enquanto adquire novas competências. Conclua os módulos no seu tempo e esteja pronto para as melhores oportunidades de emprego em Goiás.
        </p>

        <div className="bg-[#f8f9fa] border border-neutral-100 p-6 rounded-xl text-center my-8">
          <h4 className="font-bold text-[#1a237e] text-lg mb-2">Matrículas abertas com início imediato!</h4>
          <p className="text-sm mb-4">Inscreva-se hoje mesmo e turbine sua carreira com o curso de {course.title}.</p>
          <div className="flex justify-center gap-3">
            <Link to="/matricula" className="bg-[#da1069] text-white hover:bg-[#1a237e] font-bold py-2.5 px-6 rounded-full text-sm transition-all shadow">
              Iniciar Matrícula Online
            </Link>
            <Link to="/categoria/$slug" params={{ slug: categorySlug(course.category) }} className="bg-[#1a237e] text-white hover:bg-neutral-800 font-bold py-2.5 px-6 rounded-full text-sm transition-all shadow">
              Ver Outros Cursos de {course.category}
            </Link>
          </div>
        </div>
      </div>

      <div className="h-16" />
      <SiteFooter />
    </div>
  );
}

