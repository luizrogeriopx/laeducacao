import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import {
  listAllCoursesAdmin,
  createCourse,
  updateCourse,
  deleteCourse,
  toggleCourseEnabled,
  isCurrentUserAdmin,
  type Course,
} from "@/lib/courses.functions";
import { listCategories, type CourseCategory } from "@/lib/categories.functions";
import { formatPrice } from "@/lib/utils";


export const Route = createFileRoute("/admin/cursos")({
  component: AdminCoursesPage,
  head: () => ({ meta: [{ title: "Admin · Cursos" }] }),
});

type CourseRow = Course & { enabled: boolean };

interface FormState {
  id?: string;
  title: string;
  description: string;
  image: string;
  url: string;
  category: string;
  price_original: string;
  price_current: string;
  price_installments: string;
  display_installments: boolean;
  custom_pricing: boolean;
  enabled: boolean;
}

const empty: FormState = {
  title: "",
  description: "",
  image: "",
  url: "",
  category: "",
  price_original: "",
  price_current: "",
  price_installments: "",
  display_installments: false,
  custom_pricing: false,
  enabled: true,
};

function toNum(v: string): number | null {
  if (!v.trim()) return null;
  const n = parseFloat(v.replace(/\./g, "").replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

function AdminCoursesPage() {
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
  return <Body />;
}

function Body() {
  const qc = useQueryClient();
  const checkAdmin = useServerFn(isCurrentUserAdmin);
  const listFn = useServerFn(listAllCoursesAdmin);
  const createFn = useServerFn(createCourse);
  const updateFn = useServerFn(updateCourse);
  const deleteFn = useServerFn(deleteCourse);
  const toggleFn = useServerFn(toggleCourseEnabled);
  const listCategoriesFn = useServerFn(listCategories);


  const adminQ = useQuery({ queryKey: ["isAdmin"], queryFn: () => checkAdmin() });
  const coursesQ = useQuery({
    queryKey: ["adminCourses"],
    queryFn: () => listFn(),
    enabled: adminQ.data?.isAdmin === true,
  });
  const catsQ = useQuery({
    queryKey: ["categories"],
    queryFn: () => listCategoriesFn(),
  });
  const categories: CourseCategory[] = catsQ.data?.categories ?? [];


  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(empty);

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["adminCourses"] });
    qc.invalidateQueries({ queryKey: ["courses"] });
  };

  const saveMut = useMutation({
    mutationFn: async (f: FormState) => {
      const cat = categories.find((c) => c.name === f.category);
      const isCustom = f.custom_pricing || !cat;
      const payload = {
        title: f.title,
        description: f.description,
        image: f.image,
        url: f.url,
        category: f.category,
        price_original: isCustom ? toNum(f.price_original) : (cat ? cat.price_original : null),
        price_current: isCustom ? toNum(f.price_current) : (cat ? cat.price_current : null),
        price_installments: isCustom
          ? f.price_installments || null
          : (cat ? cat.price_installments : null),
        display_installments: isCustom
          ? f.display_installments
          : (cat ? cat.display_installments : false),
        custom_pricing: f.custom_pricing,
        enabled: f.enabled,
      };

      if (f.id) return updateFn({ data: { id: f.id, ...payload } });
      return createFn({ data: payload });
    },
    onSuccess: () => {
      invalidate();
      setOpen(false);
      setForm(empty);
    },
  });

  const delMut = useMutation({
    mutationFn: (id: string) => deleteFn({ data: { id } }),
    onSuccess: invalidate,
  });
  const toggleMut = useMutation({
    mutationFn: (v: { id: string; enabled: boolean }) => toggleFn({ data: v }),
    onSuccess: invalidate,
  });

  if (adminQ.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }
  if (!adminQ.data?.isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Acesso restrito.</p>
      </div>
    );
  }

  const courses = (coursesQ.data?.courses ?? []) as CourseRow[];
  const filtered = search
    ? courses.filter(
        (c) =>
          c.title.toLowerCase().includes(search.toLowerCase()) ||
          c.category.toLowerCase().includes(search.toLowerCase()),
      )
    : courses;

  const openNew = () => {
    setForm(empty);
    setOpen(true);
  };
  const openEdit = (c: CourseRow) => {
    setForm({
      id: c.id,
      title: c.title,
      description: c.description ?? "",
      image: c.image ?? "",
      url: c.url ?? "",
      category: c.category ?? "",
      price_original: c.price_original?.toString() ?? "",
      price_current: c.price_current?.toString() ?? "",
      price_installments: c.price_installments ?? "",
      display_installments: c.display_installments ?? false,
      custom_pricing: c.custom_pricing ?? false,
      enabled: c.enabled,
    });
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6 sm:px-6">
          <div>
            <h1 className="text-2xl font-bold">Gerenciar cursos</h1>
            <p className="text-sm text-muted-foreground">
              {courses.length} cursos no banco
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/admin">Voltar</Link>
            </Button>
            <Button size="sm" onClick={openNew}>
              + Novo curso
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Input
          placeholder="Buscar por título ou categoria..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-6 max-w-md"
        />

        {coursesQ.isLoading && (
          <p className="text-muted-foreground">Carregando cursos...</p>
        )}

        <div className="overflow-x-auto rounded-xl border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="p-3">Curso</th>
                <th className="p-3">Categoria</th>
                <th className="p-3">Preço</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-t">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      {c.image && (
                        <img
                          src={c.image}
                          alt=""
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      )}
                      <div className="min-w-0">
                        <div className="truncate font-medium">{c.title}</div>
                        <div className="truncate text-xs text-muted-foreground">
                          {c.slug}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-muted-foreground">{c.category}</td>
                  <td className="p-3">
                    {c.price_current != null
                      ? `R$ ${formatPrice(c.price_current)}`
                      : "—"}
                  </td>
                  <td className="p-3">
                    <span
                      className={
                        c.enabled
                          ? "rounded-full bg-[oklch(0.95_0.05_145)] px-2 py-0.5 text-xs text-[oklch(0.4_0.18_145)]"
                          : "rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                      }
                    >
                      {c.enabled ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex flex-wrap justify-end gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEdit(c)}
                      >
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          toggleMut.mutate({ id: c.id, enabled: !c.enabled })
                        }
                      >
                        {c.enabled ? "Inativar" : "Ativar"}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          if (confirm(`Excluir "${c.title}"?`))
                            delMut.mutate(c.id);
                        }}
                      >
                        Excluir
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && !coursesQ.isLoading && (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-muted-foreground">
                    Nenhum curso encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {form.id ? "Editar curso" : "Novo curso"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div>
              <Label>Título *</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div>
              <Label>Descrição</Label>
              <Textarea
                rows={4}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>
            <div>
              <Label>URL da imagem (capa e perfil)</Label>
              <Input
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="https://..."
              />
              {form.image && (
                <img
                  src={form.image}
                  alt=""
                  className="mt-2 h-20 w-20 rounded-full object-cover"
                />
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Categoria</Label>
                <select
                  className="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                >
                  <option value="">Automática pelo título</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                  {form.category &&
                    !categories.some((c) => c.name === form.category) && (
                      <option value={form.category}>{form.category}</option>
                    )}
                </select>
              </div>
              <div>
                <Label>URL externa (matricula)</Label>
                <Input
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </div>
            {form.category && (
              <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.custom_pricing}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    const cat = categories.find((c) => c.name === form.category);
                    setForm({
                      ...form,
                      custom_pricing: checked,
                      ...(checked && cat && {
                        price_original: form.price_original || (cat.price_original?.toString() ?? ""),
                        price_current: form.price_current || (cat.price_current?.toString() ?? ""),
                        price_installments: form.price_installments || (cat.price_installments ?? ""),
                        display_installments: form.display_installments || (cat.display_installments ?? false),
                      })
                    });
                  }}
                />
                Definir preço personalizado para este curso (ignorar preço da categoria)
              </label>
            )}

            {(!form.category || form.custom_pricing) ? (
              <div className="grid gap-3 rounded-lg border bg-muted/20 p-4">
                <h4 className="text-sm font-semibold">Preços Personalizados</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Preço original</Label>
                    <Input
                      value={form.price_original}
                      onChange={(e) => setForm({ ...form, price_original: e.target.value })}
                      placeholder="249,90"
                    />
                  </div>
                  <div>
                    <Label>Preço atual</Label>
                    <Input
                      value={form.price_current}
                      onChange={(e) => setForm({ ...form, price_current: e.target.value })}
                      placeholder="159,90"
                    />
                  </div>
                </div>
                <div>
                  <Label>Parcelamento</Label>
                  <Input
                    value={form.price_installments}
                    onChange={(e) => setForm({ ...form, price_installments: e.target.value })}
                    placeholder="12x de R$ 16,27"
                  />
                </div>
                <label className="flex items-center gap-2 text-sm cursor-pointer mt-1">
                  <input
                    type="checkbox"
                    checked={form.display_installments}
                    onChange={(e) =>
                      setForm({ ...form, display_installments: e.target.checked })
                    }
                  />
                  Exibir valor parcelado em destaque nas páginas e cartões
                </label>
              </div>
            ) : (
              <div className="rounded-lg border bg-muted/40 p-3 text-sm text-muted-foreground">
                Os preços são herdados da categoria em{" "}
                <Link
                  to="/admin/categorias"
                  className="font-medium text-foreground underline"
                >
                  Categorias e preços
                </Link>
                .
                {(() => {
                  const cat = categories.find((c) => c.name === form.category);
                  return cat?.price_current != null ? (
                    <span className="ml-1">
                      Preço atual de “{cat.name}”: R${" "}
                      {formatPrice(cat.price_current)}
                      {cat.price_installments ? ` ou ${cat.price_installments}` : ""}.
                    </span>
                  ) : null;
                })()}
                {(() => {
                  const cat = categories.find((c) => c.name === form.category);
                  return cat?.display_installments ? (
                    <span className="block mt-1 text-xs text-muted-foreground">
                      * Esta categoria exibe o valor parcelado em destaque.
                    </span>
                  ) : null;
                })()}
              </div>
            )}

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.enabled}
                onChange={(e) =>
                  setForm({ ...form, enabled: e.target.checked })
                }
              />
              Curso ativo (visível no site)
            </label>
            {saveMut.isError && (
              <p className="text-sm text-destructive">
                {(saveMut.error as Error).message}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => saveMut.mutate(form)}
              disabled={saveMut.isPending || !form.title.trim()}
            >
              {saveMut.isPending ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
