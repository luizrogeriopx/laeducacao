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
import { getGoogleTagId, updateGoogleTagId, getSeoKeywords, updateSeoKeywords, getFooterConfig, updateFooterConfig, getChatWidgetUrl, updateChatWidgetUrl, type FooterConfig } from "@/lib/settings.functions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/admin/")({
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
            <Button asChild size="sm" variant="secondary">
              <Link to="/admin/blog">Gerenciar blog</Link>
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

        <GoogleTagSection />

        <SeoKeywordsSection />

        <ChatWidgetSection />

        <FooterConfigSection />





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

function GoogleTagSection() {
  const qc = useQueryClient();
  const getId = useServerFn(getGoogleTagId);
  const updateId = useServerFn(updateGoogleTagId);
  const q = useQuery({ queryKey: ["googleTagId"], queryFn: () => getId() });
  const [value, setValue] = useState("");
  useEffect(() => {
    if (q.data?.value != null) setValue(q.data.value);
  }, [q.data?.value]);

  const mut = useMutation({
    mutationFn: (v: string) => updateId({ data: { value: v } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["googleTagId"] });
    },
  });

  return (
    <section className="rounded-xl border bg-card p-6 shadow-sm">
      <h2 className="text-lg font-semibold">Google Tag (gtag.js)</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Cole apenas o ID de medição (ex.: <code className="rounded bg-muted px-1">G-XXXXXXX</code>).
        O script é injetado automaticamente no <code>&lt;head&gt;</code> de todas as páginas.
        Deixe vazio para desativar.
      </p>
      <div className="mt-4 space-y-2">
        <Label htmlFor="gtag">ID do Google tag</Label>
        <div className="flex gap-2">
          <Input
            id="gtag"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="G-XXXXXXX"
          />
          <Button onClick={() => mut.mutate(value)} disabled={mut.isPending}>
            {mut.isPending ? "Salvando..." : "Salvar"}
          </Button>
        </div>
        {mut.isSuccess && (
          <p className="text-sm text-[oklch(0.6_0.18_145)]">✓ Salvo. Recarregue o site para aplicar.</p>
        )}
        {mut.isError && (
          <p className="text-sm text-destructive">Erro: {(mut.error as Error).message}</p>
        )}
      </div>
    </section>
  );
}

function ChatWidgetSection() {
  const qc = useQueryClient();
  const getUrl = useServerFn(getChatWidgetUrl);
  const updateUrl = useServerFn(updateChatWidgetUrl);
  const q = useQuery({ queryKey: ["chatWidgetUrl"], queryFn: () => getUrl() });
  const [value, setValue] = useState("");
  useEffect(() => {
    if (q.data?.value != null) setValue(q.data.value);
  }, [q.data?.value]);

  const mut = useMutation({
    mutationFn: (v: string) => updateUrl({ data: { value: v } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["chatWidgetUrl"] }),
  });

  return (
    <section className="rounded-xl border bg-card p-6 shadow-sm">
      <h2 className="text-lg font-semibold">Widget de chat (agente de IA)</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Cole apenas a URL do script (terminada em <code className="rounded bg-muted px-1">.js</code>).
        O balão aparece em todas as páginas. Deixe vazio para remover.
      </p>
      <div className="mt-4 space-y-2">
        <Label htmlFor="chat-widget">URL do script</Label>
        <div className="flex gap-2">
          <Input
            id="chat-widget"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="https://app.gptmaker.ai/widget/.../float.js"
          />
          <Button onClick={() => mut.mutate(value)} disabled={mut.isPending}>
            {mut.isPending ? "Salvando..." : "Salvar"}
          </Button>
        </div>
        {mut.isSuccess && (
          <p className="text-sm text-[oklch(0.6_0.18_145)]">✓ Salvo. Recarregue o site para aplicar.</p>
        )}
        {mut.isError && (
          <p className="text-sm text-destructive">Erro: {(mut.error as Error).message}</p>
        )}
      </div>
    </section>
  );
}

function SeoKeywordsSection() {
  const qc = useQueryClient();
  const getKw = useServerFn(getSeoKeywords);
  const updateKw = useServerFn(updateSeoKeywords);
  const q = useQuery({ queryKey: ["seoKeywords"], queryFn: () => getKw() });
  const [value, setValue] = useState("");
  useEffect(() => {
    if (q.data?.value != null) setValue(q.data.value);
  }, [q.data?.value]);

  const mut = useMutation({
    mutationFn: (v: string) => updateKw({ data: { value: v } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["seoKeywords"] });
    },
  });

  return (
    <section className="rounded-xl border bg-card p-6 shadow-sm">
      <h2 className="text-lg font-semibold">Palavras-chave SEO (meta keywords)</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Separe por vírgula. Aparecem na tag <code className="rounded bg-muted px-1">&lt;meta name="keywords"&gt;</code> de todas as páginas. Deixe vazio para remover.
      </p>
      <div className="mt-4 space-y-2">
        <Label htmlFor="seo-kw">Palavras-chave</Label>
        <Textarea
          id="seo-kw"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={8}
          placeholder="Cursos Online, Cursos EAD, ..."
        />
        <div className="flex justify-end">
          <Button onClick={() => mut.mutate(value)} disabled={mut.isPending}>
            {mut.isPending ? "Salvando..." : "Salvar"}
          </Button>
        </div>
        {mut.isSuccess && (
          <p className="text-sm text-[oklch(0.6_0.18_145)]">✓ Salvo. Recarregue o site para aplicar.</p>
        )}
        {mut.isError && (
          <p className="text-sm text-destructive">Erro: {(mut.error as Error).message}</p>
        )}
      </div>
    </section>
  );
}

const FOOTER_FIELDS: { key: keyof FooterConfig; label: string; textarea?: boolean }[] = [
  { key: "company_name", label: "Nome da empresa" },
  { key: "cnpj", label: "CNPJ" },
  { key: "tagline", label: "Frase de apresentação", textarea: true },
  { key: "whatsapp_display", label: "WhatsApp (exibido)" },
  { key: "whatsapp_url", label: "WhatsApp (link)" },
  { key: "email", label: "Email" },
  { key: "hours", label: "Horário de atendimento", textarea: true },
  { key: "instagram", label: "Instagram (URL)" },
  { key: "facebook", label: "Facebook (URL)" },
  { key: "youtube", label: "YouTube (URL)" },
  { key: "tiktok", label: "TikTok (URL)" },
  { key: "copyright", label: "Texto de copyright" },
];

function FooterConfigSection() {
  const qc = useQueryClient();
  const getCfg = useServerFn(getFooterConfig);
  const updateCfg = useServerFn(updateFooterConfig);
  const q = useQuery({ queryKey: ["footerConfig"], queryFn: () => getCfg() });
  const [cfg, setCfg] = useState<FooterConfig | null>(null);
  useEffect(() => {
    if (q.data?.config) setCfg(q.data.config);
  }, [q.data?.config]);

  const mut = useMutation({
    mutationFn: (c: FooterConfig) => updateCfg({ data: { config: c } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["footerConfig"] }),
  });

  if (!cfg) {
    return (
      <section className="rounded-xl border bg-card p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Rodapé do site</h2>
        <p className="mt-2 text-sm text-muted-foreground">Carregando...</p>
      </section>
    );
  }

  return (
    <section className="rounded-xl border bg-card p-6 shadow-sm">
      <h2 className="text-lg font-semibold">Rodapé do site</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Edite as informações exibidas no rodapé de todas as páginas públicas. Deixe em branco para ocultar um item.
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {FOOTER_FIELDS.map((f) => (
          <div key={f.key} className={f.textarea ? "sm:col-span-2" : ""}>
            <Label htmlFor={`footer-${f.key}`}>{f.label}</Label>
            {f.textarea ? (
              <Textarea
                id={`footer-${f.key}`}
                value={cfg[f.key]}
                onChange={(e) => setCfg({ ...cfg, [f.key]: e.target.value })}
                rows={2}
                className="mt-1"
              />
            ) : (
              <Input
                id={`footer-${f.key}`}
                value={cfg[f.key]}
                onChange={(e) => setCfg({ ...cfg, [f.key]: e.target.value })}
                className="mt-1"
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <Button onClick={() => mut.mutate(cfg)} disabled={mut.isPending}>
          {mut.isPending ? "Salvando..." : "Salvar rodapé"}
        </Button>
      </div>
      {mut.isSuccess && (
        <p className="mt-2 text-sm text-[oklch(0.6_0.18_145)]">✓ Rodapé atualizado.</p>
      )}
      {mut.isError && (
        <p className="mt-2 text-sm text-destructive">Erro: {(mut.error as Error).message}</p>
      )}
    </section>
  );
}

