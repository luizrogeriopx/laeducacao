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
  type CourseModule,
} from "@/lib/courses.functions";
import { listCategories, type CourseCategory } from "@/lib/categories.functions";
import { formatPrice } from "@/lib/utils";
import {
  Plus,
  Trash2,
  Copy,
  ArrowUp,
  ArrowDown,
  BookOpen,
  Layers,
  Check,
  ChevronDown,
  ChevronUp,
  Search,
} from "lucide-react";

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
  modules: CourseModule[];
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
  modules: [],
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

  // Estados para o modal de cópia de módulos
  const [copyModalOpen, setCopyModalOpen] = useState(false);
  const [selectedSourceCourseId, setSelectedSourceCourseId] = useState<string>("");
  const [copyMode, setCopyMode] = useState<"replace" | "append">("replace");
  const [searchSourceCourse, setSearchSourceCourse] = useState("");
  const [expandedModuleIdx, setExpandedModuleIdx] = useState<number | null>(null);

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
        modules: f.modules,
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
    setExpandedModuleIdx(null);
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
      modules: Array.isArray(c.modules) ? c.modules : [],
    });
    setExpandedModuleIdx(null);
    setOpen(true);
  };

  // Funções de gerenciamento de módulos
  const addModule = () => {
    const nextNum = form.modules.length + 1;
    const newMod: CourseModule = {
      id: `mod-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      title: `Módulo ${nextNum}: Novo Módulo`,
      workload: "",
      description: "",
      topics: [],
    };
    setForm((prev) => ({
      ...prev,
      modules: [...prev.modules, newMod],
    }));
    setExpandedModuleIdx(form.modules.length);
  };

  const updateModule = (index: number, patch: Partial<CourseModule>) => {
    setForm((prev) => {
      const updated = [...prev.modules];
      updated[index] = { ...updated[index], ...patch };
      return { ...prev, modules: updated };
    });
  };

  const removeModule = (index: number) => {
    setForm((prev) => ({
      ...prev,
      modules: prev.modules.filter((_, i) => i !== index),
    }));
  };

  const moveModule = (index: number, direction: -1 | 1) => {
    setForm((prev) => {
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= prev.modules.length) return prev;
      const updated = [...prev.modules];
      const temp = updated[index];
      updated[index] = updated[targetIndex];
      updated[targetIndex] = temp;
      return { ...prev, modules: updated };
    });
  };

  const handleConfirmCopyModules = () => {
    const sourceCourse = courses.find((c) => c.id === selectedSourceCourseId);
    if (!sourceCourse || !sourceCourse.modules || sourceCourse.modules.length === 0) return;

    // Clona os módulos gerando novos IDs para independência
    const clonedModules: CourseModule[] = sourceCourse.modules.map((m, idx) => ({
      id: `mod-${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 7)}`,
      title: m.title,
      workload: m.workload || "",
      description: m.description || "",
      topics: m.topics ? [...m.topics] : [],
    }));

    setForm((prev) => ({
      ...prev,
      modules: copyMode === "replace" ? clonedModules : [...prev.modules, ...clonedModules],
    }));

    setCopyModalOpen(false);
    setSelectedSourceCourseId("");
  };

  // Cursos elegíveis como origem para cópia
  const coursesWithModules = courses.filter(
    (c) => c.id !== form.id && Array.isArray(c.modules) && c.modules.length > 0
  );

  const filteredSourceCourses = searchSourceCourse
    ? coursesWithModules.filter(
        (c) =>
          c.title.toLowerCase().includes(searchSourceCourse.toLowerCase()) ||
          c.category.toLowerCase().includes(searchSourceCourse.toLowerCase())
      )
    : coursesWithModules;

  const selectedSourceCourse = courses.find((c) => c.id === selectedSourceCourseId);

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
          <div className="flex flex-wrap gap-2">
            <Button asChild size="sm" variant="secondary">
              <Link to="/admin/matriculas">Matrículas</Link>
            </Button>
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
                <th className="p-3">Grade / Módulos</th>
                <th className="p-3">Preço</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-t hover:bg-muted/30 transition-colors">
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
                    {Array.isArray(c.modules) && c.modules.length > 0 ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 dark:bg-blue-950/50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 dark:text-blue-300">
                        <Layers className="h-3 w-3" />
                        {c.modules.length} módulo{c.modules.length > 1 ? "s" : ""}
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">Sem grade</span>
                    )}
                  </td>
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
                  <td colSpan={6} className="p-6 text-center text-muted-foreground">
                    Nenhum curso encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal Principal de Edição de Curso */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {form.id ? "Editar curso" : "Novo curso"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-5">
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
                rows={3}
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
                  className="mt-2 h-16 w-16 rounded-full object-cover border"
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
                <Label>URL externa (matrícula)</Label>
                <Input
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </div>

            {/* SEÇÃO DE MÓDULOS / GRADE CURRICULAR */}
            <div className="rounded-xl border bg-card p-4 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3">
                <div>
                  <h3 className="font-semibold text-base flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    Grade Curricular / Módulos do Curso
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary font-bold">
                      {form.modules.length}
                    </span>
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Cadastre a ementa ou copie a estrutura completa de módulos de outro curso
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-xs border-primary/40 hover:bg-primary/5 text-primary"
                    onClick={() => {
                      setSelectedSourceCourseId("");
                      setSearchSourceCourse("");
                      setCopyModalOpen(true);
                    }}
                  >
                    <Copy className="h-3.5 w-3.5 mr-1" />
                    Copiar de Outro Curso
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    className="text-xs"
                    onClick={addModule}
                  >
                    <Plus className="h-3.5 w-3.5 mr-1" />
                    Adicionar Módulo
                  </Button>
                </div>
              </div>

              {form.modules.length === 0 ? (
                <div className="rounded-lg border border-dashed p-6 text-center text-muted-foreground">
                  <Layers className="mx-auto h-8 w-8 opacity-40 mb-1" />
                  <p className="text-sm font-medium">Nenhum módulo cadastrado</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Clique em "+ Adicionar Módulo" ou "Copiar de Outro Curso" para importar uma grade pronta.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {form.modules.map((mod, idx) => {
                    const isExpanded = expandedModuleIdx === idx;
                    return (
                      <div
                        key={mod.id || idx}
                        className="rounded-lg border bg-muted/20 p-3 text-sm space-y-3 transition-colors hover:border-border"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div
                            className="flex items-center gap-2 flex-1 cursor-pointer select-none"
                            onClick={() =>
                              setExpandedModuleIdx(isExpanded ? null : idx)
                            }
                          >
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                              {idx + 1}
                            </span>
                            <span className="font-semibold text-foreground truncate max-w-xs sm:max-w-md">
                              {mod.title || `Módulo ${idx + 1}`}
                            </span>
                            {mod.workload && (
                              <span className="rounded bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground">
                                {mod.workload}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => moveModule(idx, -1)}
                              disabled={idx === 0}
                              title="Mover para cima"
                              className="p-1 rounded text-muted-foreground hover:text-foreground disabled:opacity-30"
                            >
                              <ArrowUp className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => moveModule(idx, 1)}
                              disabled={idx === form.modules.length - 1}
                              title="Mover para baixo"
                              className="p-1 rounded text-muted-foreground hover:text-foreground disabled:opacity-30"
                            >
                              <ArrowDown className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeModule(idx)}
                              title="Excluir módulo"
                              className="p-1 rounded text-destructive/80 hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setExpandedModuleIdx(isExpanded ? null : idx)
                              }
                              className="p-1 rounded text-muted-foreground hover:text-foreground"
                            >
                              {isExpanded ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Campos detalhados do Módulo */}
                        {isExpanded && (
                          <div className="grid gap-3 pt-2 border-t border-border/60">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div className="sm:col-span-2">
                                <Label className="text-xs">Título do Módulo *</Label>
                                <Input
                                  value={mod.title}
                                  onChange={(e) =>
                                    updateModule(idx, { title: e.target.value })
                                  }
                                  placeholder="Ex: Módulo 1 - Fundamentos e Introdução"
                                  className="text-xs h-8"
                                />
                              </div>
                              <div>
                                <Label className="text-xs">Carga Horária (opcional)</Label>
                                <Input
                                  value={mod.workload || ""}
                                  onChange={(e) =>
                                    updateModule(idx, { workload: e.target.value })
                                  }
                                  placeholder="Ex: 40 horas ou 20h"
                                  className="text-xs h-8"
                                />
                              </div>
                            </div>

                            <div>
                              <Label className="text-xs">Resumo / Ementa do Módulo</Label>
                              <Textarea
                                rows={2}
                                value={mod.description || ""}
                                onChange={(e) =>
                                  updateModule(idx, { description: e.target.value })
                                }
                                placeholder="Breve descrição dos temas abordados neste módulo..."
                                className="text-xs"
                              />
                            </div>

                            <div>
                              <Label className="text-xs">
                                Tópicos / Disciplinas (digite um por linha)
                              </Label>
                              <Textarea
                                rows={3}
                                value={(mod.topics || []).join("\n")}
                                onChange={(e) =>
                                  updateModule(idx, {
                                    topics: e.target.value
                                      .split("\n")
                                      .map((t) => t.trim())
                                      .filter(Boolean),
                                  })
                                }
                                placeholder="1. Introdução à disciplina&#10;2. Legislação e ética&#10;3. Exercícios práticos"
                                className="text-xs font-mono"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* PREÇOS PERSONALIZADOS */}
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
                      ...(checked &&
                        cat && {
                          price_original:
                            form.price_original || (cat.price_original?.toString() ?? ""),
                          price_current:
                            form.price_current || (cat.price_current?.toString() ?? ""),
                          price_installments:
                            form.price_installments || (cat.price_installments ?? ""),
                          display_installments:
                            form.display_installments || (cat.display_installments ?? false),
                        }),
                    });
                  }}
                />
                Definir preço personalizado para este curso (ignorar preço da categoria)
              </label>
            )}

            {!form.category || form.custom_pricing ? (
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
              {saveMut.isPending ? "Salvando..." : "Salvar Curso"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DIALOG DE COPIAR MÓDULOS DE OUTRO CURSO */}
      <Dialog open={copyModalOpen} onOpenChange={setCopyModalOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Copy className="h-5 w-5 text-primary" />
              Copiar Módulos de Outro Curso
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <p className="text-xs text-muted-foreground">
              Selecione o curso de origem para importar a grade curricular e todos os módulos cadastrados.
            </p>

            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Filtrar cursos..."
                value={searchSourceCourse}
                onChange={(e) => setSearchSourceCourse(e.target.value)}
                className="pl-9 text-xs"
              />
            </div>

            <div className="max-h-48 overflow-y-auto rounded-lg border bg-muted/20 p-2 space-y-1">
              {filteredSourceCourses.length === 0 ? (
                <p className="py-6 text-center text-xs text-muted-foreground">
                  Nenhum outro curso com módulos cadastrados foi encontrado.
                </p>
              ) : (
                filteredSourceCourses.map((c) => {
                  const isSelected = selectedSourceCourseId === c.id;
                  const modCount = c.modules?.length || 0;
                  return (
                    <div
                      key={c.id}
                      onClick={() => setSelectedSourceCourseId(c.id)}
                      className={`flex items-center justify-between p-2.5 rounded-md cursor-pointer transition-colors text-xs ${
                        isSelected
                          ? "bg-primary text-primary-foreground font-semibold"
                          : "hover:bg-muted text-foreground"
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <p className="truncate">{c.title}</p>
                        <p
                          className={`text-[10px] truncate ${
                            isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
                          }`}
                        >
                          {c.category}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] shrink-0 font-bold ${
                          isSelected
                            ? "bg-white text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {modCount} módulo{modCount > 1 ? "s" : ""}
                      </span>
                    </div>
                  );
                })
              )}
            </div>

            {/* Pré-visualização dos módulos do curso selecionado */}
            {selectedSourceCourse &&
              selectedSourceCourse.modules &&
              selectedSourceCourse.modules.length > 0 && (
                <div className="rounded-lg border bg-card p-3 text-xs space-y-2">
                  <p className="font-semibold text-foreground flex items-center justify-between">
                    <span>Módulos a serem importados:</span>
                    <span className="text-primary font-bold">
                      {selectedSourceCourse.modules.length} módulos
                    </span>
                  </p>
                  <div className="max-h-36 overflow-y-auto space-y-1 divide-y divide-border/60">
                    {selectedSourceCourse.modules.map((m, i) => (
                      <div key={i} className="pt-1 flex items-center justify-between text-muted-foreground">
                        <span className="truncate pr-2 font-medium text-foreground">
                          {i + 1}. {m.title}
                        </span>
                        {m.workload && (
                          <span className="text-[10px] shrink-0">{m.workload}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Modo de Cópia */}
            <div className="rounded-lg border bg-muted/30 p-3 space-y-2 text-xs">
              <Label className="font-semibold text-foreground block">
                Como deseja aplicar os módulos?
              </Label>
              <div className="flex flex-col sm:flex-row gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="copyMode"
                    value="replace"
                    checked={copyMode === "replace"}
                    onChange={() => setCopyMode("replace")}
                  />
                  <span>Substituir módulos atuais</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="copyMode"
                    value="append"
                    checked={copyMode === "append"}
                    onChange={() => setCopyMode("append")}
                  />
                  <span>Adicionar ao final dos existentes</span>
                </label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setCopyModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              size="sm"
              disabled={!selectedSourceCourseId}
              onClick={handleConfirmCopyModules}
            >
              <Check className="h-4 w-4 mr-1" />
              Copiar Módulos Selecionados
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
