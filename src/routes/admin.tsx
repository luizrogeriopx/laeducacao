import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import {
  syncCourses,
  getLastSync,
  isCurrentUserAdmin,
} from "@/lib/courses.functions";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({ meta: [{ title: "Painel Admin" }] }),
});

function AdminPage() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          navigate({ to: "/login" });
        } else {
          setUserEmail(session.user.email ?? null);
          setChecking(false);
        }
      },
    );
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate({ to: "/login" });
      else {
        setUserEmail(session.user.email ?? null);
        setChecking(false);
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Verificando acesso...</p>
      </div>
    );
  }

  return <AdminBody userEmail={userEmail} />;
}

function AdminBody({ userEmail }: { userEmail: string | null }) {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const checkAdmin = useServerFn(isCurrentUserAdmin);
  const runSync = useServerFn(syncCourses);
  const fetchLog = useServerFn(getLastSync);

  const adminQ = useQuery({
    queryKey: ["isAdmin"],
    queryFn: () => checkAdmin(),
  });

  const logsQ = useQuery({
    queryKey: ["syncLog"],
    queryFn: () => fetchLog(),
    enabled: adminQ.data?.isAdmin === true,
    refetchInterval: 5000,
  });

  const syncMut = useMutation({
    mutationFn: () => runSync(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["courses"] });
      qc.invalidateQueries({ queryKey: ["syncLog"] });
    },
  });

  const logout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  };

  if (adminQ.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  if (!adminQ.data?.isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md rounded-xl border bg-card p-6 text-center shadow">
          <h1 className="text-xl font-bold">Acesso restrito</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sua conta ({userEmail}) não tem permissão de administrador. Peça ao
            dono do site para promover seu e-mail no banco de dados (tabela{" "}
            <code className="rounded bg-muted px-1">user_roles</code>, role{" "}
            <code className="rounded bg-muted px-1">admin</code>).
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <Button variant="outline" onClick={logout}>
              Sair
            </Button>
            <Button asChild>
              <Link to="/">Voltar ao site</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-6 sm:px-6">
          <div>
            <h1 className="text-2xl font-bold">Painel Admin</h1>
            <p className="text-sm text-muted-foreground">{userEmail}</p>
          </div>
          <div className="flex gap-2">
            <Button asChild size="sm">
              <Link to="/admin/cursos">Gerenciar cursos</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/">Ver site</Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={logout}>
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl space-y-6 px-4 py-8 sm:px-6">
        <section className="rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Sincronização de cursos</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Lê o sitemap do site Trinity e atualiza/inclui todos os cursos
            (título, imagem, descrição, preço e categoria detectada
            automaticamente).
          </p>
          <Button
            className="mt-4"
            onClick={() => syncMut.mutate()}
            disabled={syncMut.isPending}
          >
            {syncMut.isPending
              ? "Sincronizando... (pode levar 1-2 minutos)"
              : "Buscar atualizações agora"}
          </Button>
          {syncMut.isSuccess && (
            <p className="mt-3 text-sm text-[oklch(0.6_0.18_145)]">
              ✓ {syncMut.data.total_saved} cursos atualizados de{" "}
              {syncMut.data.total_found} encontrados.
            </p>
          )}
          {syncMut.isError && (
            <p className="mt-3 text-sm text-destructive">
              Erro: {(syncMut.error as Error).message}
            </p>
          )}
        </section>

        <section className="rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Histórico</h2>
          <div className="mt-4 space-y-2 text-sm">
            {logsQ.data?.logs.length === 0 && (
              <p className="text-muted-foreground">Nenhuma sincronização ainda.</p>
            )}
            {logsQ.data?.logs.map((l) => (
              <div
                key={l.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded border px-3 py-2"
              >
                <div>
                  <span
                    className={
                      l.status === "success"
                        ? "font-medium text-[oklch(0.6_0.18_145)]"
                        : l.status === "error"
                        ? "font-medium text-destructive"
                        : "font-medium text-muted-foreground"
                    }
                  >
                    {l.status}
                  </span>
                  <span className="ml-2 text-muted-foreground">
                    {new Date(l.started_at).toLocaleString("pt-BR")}
                  </span>
                </div>
                <div className="text-muted-foreground">
                  {l.total_saved != null
                    ? `${l.total_saved}/${l.total_found} cursos`
                    : l.message ?? ""}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
