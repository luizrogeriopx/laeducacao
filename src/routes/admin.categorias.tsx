import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { isCurrentUserAdmin } from "@/lib/courses.functions";
import { formatPrice } from "@/lib/utils";
import {
  listCategoriesAdmin,
  createCategory,
  updateCategory,
  deleteCategory,
  setCategoryPrice,
} from "@/lib/categories.functions";

export const Route = createFileRoute("/admin/categorias")({
  component: AdminCategoriesPage,
  head: () => ({ meta: [{ title: "Admin · Categorias" }] }),
});

interface CatRow {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
  price_original: number | null;
  price_current: number | null;
  price_installments: string | null;
  display_installments: boolean;
  course_count: number;
}

function toNum(v: string): number | null {
  if (!v.trim()) return null;
  const n = parseFloat(v.replace(/\./g, "").replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

function AdminCategoriesPage() {
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
  const listFn = useServerFn(listCategoriesAdmin);
  const createFn = useServerFn(createCategory);
  const updateFn = useServerFn(updateCategory);
  const deleteFn = useServerFn(deleteCategory);
  const priceFn = useServerFn(setCategoryPrice);

  const adminQ = useQuery({ queryKey: ["isAdmin"], queryFn: () => checkAdmin() });
  const catsQ = useQuery({
    queryKey: ["adminCategories"],
    queryFn: () => listFn(),
    enabled: adminQ.data?.isAdmin === true,
  });

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["adminCategories"] });
    qc.invalidateQueries({ queryKey: ["adminCourses"] });
    qc.invalidateQueries({ queryKey: ["courses"] });
  };

  const [newName, setNewName] = useState("");
  const [editing, setEditing] = useState<CatRow | null>(null);
  const [editName, setEditName] = useState("");
  const [editOrder, setEditOrder] = useState("0");

  const [pricing, setPricing] = useState<CatRow | null>(null);
  const [pOriginal, setPOriginal] = useState("");
  const [pCurrent, setPCurrent] = useState("");
  const [pInstall, setPInstall] = useState("");
  const [displayInstallments, setDisplayInstallments] = useState(false);
  const [applyAll, setApplyAll] = useState(true);

  const createMut = useMutation({
    mutationFn: (name: string) => createFn({ data: { name } }),
    onSuccess: () => {
      setNewName("");
      invalidate();
    },
  });
  const updateMut = useMutation({
    mutationFn: (v: { id: string; name: string; sort_order: number }) =>
      updateFn({ data: v }),
    onSuccess: () => {
      setEditing(null);
      invalidate();
    },
  });
  const deleteMut = useMutation({
    mutationFn: (id: string) => deleteFn({ data: { id } }),
    onSuccess: invalidate,
  });
  const priceMut = useMutation({
    mutationFn: (v: {
      id: string;
      price_original: number | null;
      price_current: number | null;
      price_installments: string | null;
      display_installments: boolean;
      apply: boolean;
    }) => priceFn({ data: v }),
    onSuccess: () => {
      setPricing(null);
      invalidate();
    },
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

  const cats = (catsQ.data?.categories ?? []) as CatRow[];

  const openEdit = (c: CatRow) => {
    setEditing(c);
    setEditName(c.name);
    setEditOrder(String(c.sort_order));
  };
  const openPricing = (c: CatRow) => {
    setPricing(c);
    setPOriginal(c.price_original?.toString() ?? "");
    setPCurrent(c.price_current?.toString() ?? "");
    setPInstall(c.price_installments ?? "");
    setDisplayInstallments(c.display_installments ?? false);
    setApplyAll(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-6 sm:px-6">
          <div>
            <h1 className="text-2xl font-bold">Categorias e preços</h1>
            <p className="text-sm text-muted-foreground">
              {cats.length} categorias · o preço definido aqui vale para todos os
              cursos da categoria
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/admin">Voltar</Link>
            </Button>
            <Button asChild variant="secondary" size="sm">
              <Link to="/admin/cursos">Gerenciar cursos</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex flex-wrap gap-2">
          <Input
            placeholder="Nova categoria..."
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="max-w-xs"
          />
          <Button
            onClick={() => createMut.mutate(newName)}
            disabled={!newName.trim() || createMut.isPending}
          >
            {createMut.isPending ? "Criando..." : "+ Criar categoria"}
          </Button>
        </div>
        {createMut.isError && (
          <p className="mb-4 text-sm text-destructive">
            {(createMut.error as Error).message}
          </p>
        )}

        {catsQ.isLoading && (
          <p className="text-muted-foreground">Carregando categorias...</p>
        )}

        <div className="overflow-x-auto rounded-xl border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="p-3">Categoria</th>
                <th className="p-3">Cursos</th>
                <th className="p-3">Preço da categoria</th>
                <th className="p-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {cats.map((c) => (
                <tr key={c.id} className="border-t">
                  <td className="p-3">
                    <div className="font-medium">{c.name}</div>
                    <div className="text-xs text-muted-foreground">{c.slug}</div>
                  </td>
                  <td className="p-3 text-muted-foreground">{c.course_count}</td>
                  <td className="p-3">
                    {c.price_current != null ? (
                      <>
                        <span className="font-medium">
                          R$ {formatPrice(c.price_current)}
                        </span>
                        {c.price_installments && (
                          <span className="ml-1 text-xs text-muted-foreground">
                            ou {c.price_installments}
                          </span>
                        )}
                      </>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex flex-wrap justify-end gap-1">
                      <Button size="sm" onClick={() => openPricing(c)}>
                        Editar preços
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEdit(c)}
                      >
                        Renomear
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          if (
                            confirm(
                              `Excluir "${c.name}"? Os ${c.course_count} cursos irão para "Outros".`,
                            )
                          )
                            deleteMut.mutate(c.id);
                        }}
                      >
                        Excluir
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {cats.length === 0 && !catsQ.isLoading && (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-muted-foreground">
                    Nenhuma categoria cadastrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Editar nome / ordem */}
      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar categoria</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div>
              <Label>Nome</Label>
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Renomear atualiza a categoria em todos os cursos dela.
              </p>
            </div>
            <div>
              <Label>Ordem de exibição</Label>
              <Input
                type="number"
                value={editOrder}
                onChange={(e) => setEditOrder(e.target.value)}
              />
            </div>
            {updateMut.isError && (
              <p className="text-sm text-destructive">
                {(updateMut.error as Error).message}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>
              Cancelar
            </Button>
            <Button
              disabled={!editName.trim() || updateMut.isPending}
              onClick={() =>
                editing &&
                updateMut.mutate({
                  id: editing.id,
                  name: editName,
                  sort_order: parseInt(editOrder || "0", 10) || 0,
                })
              }
            >
              {updateMut.isPending ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Editar preços da categoria */}
      <Dialog open={!!pricing} onOpenChange={(o) => !o && setPricing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Preços · {pricing?.name}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Preço original</Label>
                <Input
                  value={pOriginal}
                  onChange={(e) => setPOriginal(e.target.value)}
                  placeholder="249,90"
                />
              </div>
              <div>
                <Label>Preço atual</Label>
                <Input
                  value={pCurrent}
                  onChange={(e) => setPCurrent(e.target.value)}
                  placeholder="159,90"
                />
              </div>
            </div>
            <div>
              <Label>Parcelamento</Label>
              <Input
                value={pInstall}
                onChange={(e) => setPInstall(e.target.value)}
                placeholder="12x de R$ 16,27"
              />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={displayInstallments}
                onChange={(e) => setDisplayInstallments(e.target.checked)}
              />
              Exibir valor parcelado em destaque nas páginas e cartões
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={applyAll}
                onChange={(e) => setApplyAll(e.target.checked)}
              />
              Aplicar a todos os {pricing?.course_count ?? 0} cursos desta
              categoria
            </label>
            {priceMut.isError && (
              <p className="text-sm text-destructive">
                {(priceMut.error as Error).message}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPricing(null)}>
              Cancelar
            </Button>
            <Button
              disabled={priceMut.isPending}
              onClick={() =>
                pricing &&
                priceMut.mutate({
                  id: pricing.id,
                  price_original: toNum(pOriginal),
                  price_current: toNum(pCurrent),
                  price_installments: pInstall.trim() || null,
                  display_installments: displayInstallments,
                  apply: applyAll,
                })
              }
            >
              {priceMut.isPending ? "Salvando..." : "Salvar preços"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
