import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { listPublishedPosts } from "@/lib/blog.functions";
import { SiteFooter } from "@/components/SiteFooter";
import logo from "@/assets/laeducacao-logo.png";

export const Route = createFileRoute("/blog/")({
  component: BlogList,
  head: () => ({
    title: "Blog LA Educação | EJA, Cursos e Carreira em Goiás",
    meta: [
      {
        name: "keywords",
        content: "EJA Goiânia, EJA Aparecida de Goiânia, Supletivo EAD Goiás, Cursos profissionalizantes Goiânia, Blog LA Educação, Carreira Goiás",
      },
      {
        name: "description",
        content:
          "Confira dicas, notícias e tire dúvidas sobre EJA, Supletivo EAD, cursos profissionalizantes e mercado de trabalho em Goiânia, Aparecida de Goiânia e região.",
      },
      { property: "og:title", content: "Blog LA Educação | EJA, Cursos e Carreira em Goiás" },
      { property: "og:description", content: "Artigos e notícias sobre EJA, supletivo EAD, cursos profissionalizantes e mercado de trabalho em Goiânia, Aparecida e Goiás." },
      { property: "og:url", content: "https://www.laeducacaogo.com.br/blog" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://www.laeducacaogo.com.br/img/banner-cursos-ead-goiania.png" },
      { name: "twitter:image", content: "https://www.laeducacaogo.com.br/img/banner-cursos-ead-goiania.png" },
    ],
    links: [{ rel: "canonical", href: "https://www.laeducacaogo.com.br/blog" }],
  }),
});

function BlogList() {
  const fetchPosts = useServerFn(listPublishedPosts);
  const { data, isLoading } = useQuery({
    queryKey: ["blogPosts"],
    queryFn: () => fetchPosts(),
  });
  const posts = data?.posts ?? [];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-6">
          <Link to="/">
            <img src={logo} alt="LA Educação" className="h-16 w-auto" />
          </Link>
          <nav className="text-sm">
            <Link to="/" className="text-background/90 hover:text-background">
              ← Voltar ao site
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-bold sm:text-4xl">Blog LA Educação</h1>
        <p className="mt-2 text-muted-foreground">
          Dicas, novidades e respostas para suas dúvidas sobre estudos, EJA, cursos técnicos e carreira.
        </p>

        {isLoading && <p className="mt-8 text-muted-foreground">Carregando...</p>}

        {!isLoading && posts.length === 0 && (
          <p className="mt-8 text-muted-foreground">Ainda não há posts publicados.</p>
        )}

        <ul className="mt-8 space-y-6">
          {posts.map((p) => (
            <li key={p.id}>
              <Link
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group block rounded-xl border bg-card p-5 transition-shadow hover:shadow-md sm:flex sm:gap-5"
              >
                {p.cover_image && (
                  <img
                    src={p.cover_image}
                    alt={p.title}
                    loading="lazy"
                    className="mb-3 h-40 w-full rounded-md object-cover sm:mb-0 sm:h-32 sm:w-48"
                  />
                )}
                <div className="flex-1">
                  <h2 className="text-lg font-bold leading-snug group-hover:text-primary sm:text-xl">
                    {p.title}
                  </h2>
                  {p.excerpt && (
                    <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{p.excerpt}</p>
                  )}
                  <p className="mt-3 text-xs text-muted-foreground">
                    {new Date(p.published_at).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </div>
  );
}
