import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { marked } from "marked";
import { useMemo } from "react";
import { getPostBySlug } from "@/lib/blog.functions";
import { SiteFooter } from "@/components/SiteFooter";
import logo from "@/assets/laeducacao-logo.png";

export const Route = createFileRoute("/blog/$slug")({
  component: BlogPostPage,
  loader: async ({ params }) => {
    const { post } = await getPostBySlug({ data: { slug: params.slug } });
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.post;
    if (!p) return {};
    const url = `https://laeducacao.lovable.app/blog/${p.slug}`;
    return {
      meta: [
        { title: `${p.title} — Blog LA Educação` },
        { name: "description", content: p.excerpt || p.title },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.excerpt || p.title },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        ...(p.cover_image ? [{ property: "og:image", content: p.cover_image }] : []),
        ...(p.cover_image ? [{ name: "twitter:image", content: p.cover_image }] : []),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: p.title,
            description: p.excerpt,
            datePublished: p.published_at,
            dateModified: p.updated_at,
            image: p.cover_image || undefined,
            author: { "@type": "Organization", name: "LA Educação Goiânia" },
            publisher: {
              "@type": "Organization",
              name: "LA Educação Goiânia",
            },
            mainEntityOfPage: url,
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Post não encontrado</h1>
        <Link to="/blog" className="mt-4 inline-block text-primary underline">
          Voltar ao blog
        </Link>
      </div>
    </div>
  ),
});

function BlogPostPage() {
  const { post: initial } = Route.useLoaderData();
  const fetchPost = useServerFn(getPostBySlug);
  const { data } = useQuery({
    queryKey: ["blogPost", initial.slug],
    queryFn: () => fetchPost({ data: { slug: initial.slug } }),
    initialData: { post: initial },
  });
  const post = data?.post ?? initial;
  const html = useMemo(() => marked.parse(post.content || "", { async: false }) as string, [post.content]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-6">
          <Link to="/">
            <img src={logo} alt="LA Educação" className="h-16 w-auto" />
          </Link>
          <nav className="text-sm">
            <Link to="/blog" className="text-background/90 hover:text-background">
              ← Blog
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <article>
          <p className="text-sm text-muted-foreground">
            {new Date(post.published_at).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
          <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">{post.title}</h1>
          {post.excerpt && (
            <p className="mt-3 text-lg text-muted-foreground">{post.excerpt}</p>
          )}
          {post.cover_image && (
            <img
              src={post.cover_image}
              alt={post.title}
              className="mt-6 w-full rounded-xl object-cover"
            />
          )}
          <div
            className="blog-content mt-8"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
