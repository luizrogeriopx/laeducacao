import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import {
  deletePost,
  listAllPostsAdmin,
  upsertPost,
  type BlogPost,
} from "@/lib/blog.functions";

export const Route = createFileRoute("/admin/blog")({
  component: AdminBlogPage,
  head: () => ({ meta: [{ title: "Blog — Painel Admin" }] }),
});

type Draft = {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string;
  published: boolean;
};

const EMPTY: Draft = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  cover_image: "",
  published: true,
};

function AdminBlogPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate({ to: "/login" });
      else setReady(true);
    });
  }, [navigate]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }
  return <AdminBlogBody />;
}

function AdminBlogBody() {
  const qc = useQueryClient();
  const fetchAll = useServerFn(listAllPostsAdmin);
  const save = useServerFn(upsertPost);
  const remove = useServerFn(deletePost);

  const q = useQuery({ queryKey: ["adminBlogPosts"], queryFn: () => fetchAll() });
  const [draft, setDraft] = useState<Draft | null>(null);

  const saveMut = useMutation({
    mutationFn: (d: Draft) => save({ data: d }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["adminBlogPosts"] });
      qc.invalidateQueries({ queryKey: ["blogPosts"] });
      setDraft(null);
    },
  });

  const delMut = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["adminBlogPosts"] });
      qc.invalidateQueries({ queryKey: ["blogPosts"] });
    },
  });

  const startEdit = (p: BlogPost) =>
    setDraft({
      id: p.id,
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      content: p.content,
      cover_image: p.cover_image,
      published: p.published,
    });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-6 sm:px-6">
          <h1 className="text-2xl font-bold">Blog — Posts</h1>
          <div className="flex gap-2">
            <Button asChild size="sm" variant="secondary">
              <Link to="/admin/matriculas">Matrículas</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/admin">← Painel</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/blog">Ver blog</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
        {!draft && (
          <div className="flex justify-end">
            <Button onClick={() => setDraft({ ...EMPTY })}>+ Novo post</Button>
          </div>
        )}

        {draft && (
          <section className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold">
              {draft.id ? "Editar post" : "Novo post"}
            </h2>
            <div className="mt-4 grid gap-4">
              <div>
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  value={draft.title}
                  onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="slug">
                  Slug (URL) — deixe vazio para gerar do título
                </Label>
                <Input
                  id="slug"
                  value={draft.slug}
                  onChange={(e) => setDraft({ ...draft, slug: e.target.value })}
                  placeholder="ex: como-terminar-os-estudos-rapido"
                />
              </div>
              <div>
                <Label htmlFor="excerpt">Resumo</Label>
                <Textarea
                  id="excerpt"
                  rows={2}
                  value={draft.excerpt}
                  onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="cover">Imagem de capa (URL)</Label>
                <Input
                  id="cover"
                  value={draft.cover_image}
                  onChange={(e) => setDraft({ ...draft, cover_image: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div>
                <Label htmlFor="content">
                  Conteúdo (Markdown — use # Título, ## Subtítulo, **negrito**, listas com -)
                </Label>
                <Textarea
                  id="content"
                  rows={18}
                  value={draft.content}
                  onChange={(e) => setDraft({ ...draft, content: e.target.value })}
                  className="font-mono text-sm"
                />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={draft.published}
                  onChange={(e) =>
                    setDraft({ ...draft, published: e.target.checked })
                  }
                />
                Publicado (visível no site)
              </label>
              <div className="flex gap-2">
                <Button
                  onClick={() => saveMut.mutate(draft)}
                  disabled={saveMut.isPending || !draft.title.trim()}
                >
                  {saveMut.isPending ? "Salvando..." : "Salvar"}
                </Button>
                <Button variant="outline" onClick={() => setDraft(null)}>
                  Cancelar
                </Button>
              </div>
              {saveMut.isError && (
                <p className="text-sm text-destructive">
                  Erro: {(saveMut.error as Error).message}
                </p>
              )}
            </div>
          </section>
        )}

        <section className="rounded-xl border bg-card shadow-sm">
          <div className="border-b px-6 py-4">
            <h2 className="text-lg font-semibold">Posts existentes</h2>
          </div>
          <div className="divide-y">
            {q.isLoading && (
              <p className="px-6 py-4 text-sm text-muted-foreground">Carregando...</p>
            )}
            {q.data?.posts.length === 0 && (
              <p className="px-6 py-4 text-sm text-muted-foreground">
                Nenhum post ainda.
              </p>
            )}
            {q.data?.posts.map((p) => (
              <div
                key={p.id}
                className="flex flex-wrap items-center justify-between gap-3 px-6 py-4"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{p.title}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    /blog/{p.slug} ·{" "}
                    {p.published ? (
                      <span className="text-[oklch(0.6_0.18_145)]">publicado</span>
                    ) : (
                      <span>rascunho</span>
                    )}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => startEdit(p)}>
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      if (confirm(`Excluir "${p.title}"?`)) delMut.mutate(p.id);
                    }}
                    disabled={delMut.isPending}
                  >
                    Excluir
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
