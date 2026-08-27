import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { getCredConfig, updateCredConfig } from "@/lib/credenciamentos.functions";
import {
  CRED_DEFAULT,
  type CredConfig,
  type CredCategoria,
  type CredInstituicao,
} from "@/lib/credenciamentos-config";

export const Route = createFileRoute("/admin/credenciamentos")({
  component: AdminCredenciamentos,
});

const CATEGORIAS: { value: CredCategoria; label: string }[] = [
  { value: "certificadora", label: "Certificadora" },
  { value: "tecnico", label: "Técnico (SISTEC)" },
  { value: "superior", label: "Superior (e-MEC)" },
];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">{label}</Label>
      {children}
    </div>
  );
}

function AdminCredenciamentos() {
  const fetchCfg = useServerFn(getCredConfig);
  const saveCfg = useServerFn(updateCredConfig);
  const [cfg, setCfg] = useState<CredConfig>(CRED_DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCfg()
      .then((r) => setCfg(r.config as CredConfig))
      .catch((e: Error) => toast.error(e.message))
      .finally(() => setLoading(false));
  }, [fetchCfg]);

  const set = <K extends keyof CredConfig>(key: K, value: CredConfig[K]) =>
    setCfg((c) => ({ ...c, [key]: value }));

  const setInst = (idx: number, patch: Partial<CredInstituicao>) =>
    setCfg((c) => ({
      ...c,
      instituicoes: c.instituicoes.map((i, k) => (k === idx ? { ...i, ...patch } : i)),
    }));

  const removeInst = (idx: number) =>
    setCfg((c) => ({ ...c, instituicoes: c.instituicoes.filter((_, k) => k !== idx) }));

  const moveInst = (idx: number, dir: -1 | 1) =>
    setCfg((c) => {
      const arr = [...c.instituicoes];
      const target = idx + dir;
      if (target < 0 || target >= arr.length) return c;
      [arr[idx], arr[target]] = [arr[target], arr[idx]];
      return { ...c, instituicoes: arr };
    });

  const addInst = () =>
    setCfg((c) => ({
      ...c,
      instituicoes: [
        {
          logo_url: "",
          categoria: "certificadora",
          nome: "Nova instituição",
          estado: "",
          cidade: "",
          codigo: "",
          nota_mec: "",
          detalhes: "",
          link_comprovacao: "",
        },
        ...c.instituicoes,
      ],
    }));

  async function handleSave() {
    setSaving(true);
    try {
      await saveCfg({ data: { config: cfg } });
      toast.success("Página de credenciamentos atualizada!");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="p-10 text-center text-muted-foreground">Carregando...</div>;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-card">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-2 px-4 py-5 sm:px-6">
          <h1 className="text-2xl font-bold">Credenciamentos</h1>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/admin">Voltar</Link>
            </Button>
            <Button asChild variant="secondary" size="sm">
              <Link to="/credenciamentos">Ver página</Link>
            </Button>
            <Button size="sm" onClick={handleSave} disabled={saving}>
              {saving ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6">
        <section className="space-y-4 rounded-lg border p-5">
          <h2 className="font-semibold">SEO</h2>
          <Field label="Título (title)">
            <Input value={cfg.seo_title} onChange={(e) => set("seo_title", e.target.value)} />
          </Field>
          <Field label="Descrição (meta description)">
            <Textarea
              rows={3}
              value={cfg.seo_description}
              onChange={(e) => set("seo_description", e.target.value)}
            />
          </Field>
        </section>

        <section className="space-y-4 rounded-lg border p-5">
          <h2 className="font-semibold">Topo da página</h2>
          <Field label="Nome no caminho (breadcrumb)">
            <Input
              value={cfg.breadcrumb_label}
              onChange={(e) => set("breadcrumb_label", e.target.value)}
            />
          </Field>
          <Field label="Título principal">
            <Input value={cfg.hero_title} onChange={(e) => set("hero_title", e.target.value)} />
          </Field>
          <Field label="Subtítulo">
            <Textarea
              rows={2}
              value={cfg.hero_subtitle}
              onChange={(e) => set("hero_subtitle", e.target.value)}
            />
          </Field>
          <Field label="Aviso em destaque">
            <Textarea
              rows={3}
              value={cfg.hero_note}
              onChange={(e) => set("hero_note", e.target.value)}
            />
          </Field>
          <Field label="Texto do campo de busca">
            <Input
              value={cfg.search_placeholder}
              onChange={(e) => set("search_placeholder", e.target.value)}
            />
          </Field>
        </section>

        <section className="grid gap-4 rounded-lg border p-5 sm:grid-cols-2">
          <h2 className="font-semibold sm:col-span-2">Filtros e botões</h2>
          <Field label="Filtro: todos">
            <Input value={cfg.filtro_todos} onChange={(e) => set("filtro_todos", e.target.value)} />
          </Field>
          <Field label="Filtro: certificadoras">
            <Input
              value={cfg.filtro_certificadora}
              onChange={(e) => set("filtro_certificadora", e.target.value)}
            />
          </Field>
          <Field label="Filtro: técnicos">
            <Input
              value={cfg.filtro_tecnico}
              onChange={(e) => set("filtro_tecnico", e.target.value)}
            />
          </Field>
          <Field label="Filtro: superior">
            <Input
              value={cfg.filtro_superior}
              onChange={(e) => set("filtro_superior", e.target.value)}
            />
          </Field>
          <Field label="Botão com link de comprovação">
            <Input value={cfg.btn_verificar} onChange={(e) => set("btn_verificar", e.target.value)} />
          </Field>
          <Field label="Botão sem link">
            <Input value={cfg.btn_sem_link} onChange={(e) => set("btn_sem_link", e.target.value)} />
          </Field>
          <Field label="Mensagem quando não há resultados">
            <Input value={cfg.empty_text} onChange={(e) => set("empty_text", e.target.value)} />
          </Field>
        </section>

        <section className="grid gap-4 rounded-lg border p-5 sm:grid-cols-2">
          <h2 className="font-semibold sm:col-span-2">Rodapé da página</h2>
          <Field label="Texto antes do link">
            <Input value={cfg.rodape_texto} onChange={(e) => set("rodape_texto", e.target.value)} />
          </Field>
          <Field label="Texto do link">
            <Input
              value={cfg.rodape_link_label}
              onChange={(e) => set("rodape_link_label", e.target.value)}
            />
          </Field>
          <Field label="URL do link">
            <Input
              value={cfg.rodape_link_url}
              onChange={(e) => set("rodape_link_url", e.target.value)}
            />
          </Field>
          <Field label="Botão de chamada (CTA)">
            <Input value={cfg.cta_label} onChange={(e) => set("cta_label", e.target.value)} />
          </Field>
        </section>

        <section className="space-y-4 rounded-lg border p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Instituições ({cfg.instituicoes.length})</h2>
            <Button size="sm" onClick={addInst}>
              Adicionar
            </Button>
          </div>

          {cfg.instituicoes.map((i, idx) => (
            <div key={idx} className="space-y-3 rounded-md border p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-semibold">
                  {idx + 1}. {i.nome || "(sem nome)"}
                </span>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" onClick={() => moveInst(idx, -1)}>
                    ↑
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => moveInst(idx, 1)}>
                    ↓
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => removeInst(idx)}>
                    Excluir
                  </Button>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Nome">
                  <Input value={i.nome} onChange={(e) => setInst(idx, { nome: e.target.value })} />
                </Field>
                <Field label="Categoria">
                  <select
                    className="h-9 w-full rounded-md border bg-background px-3 text-sm"
                    value={i.categoria}
                    onChange={(e) => setInst(idx, { categoria: e.target.value as CredCategoria })}
                  >
                    {CATEGORIAS.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Cidade">
                  <Input
                    value={i.cidade}
                    onChange={(e) => setInst(idx, { cidade: e.target.value })}
                  />
                </Field>
                <Field label="Estado (UF)">
                  <Input
                    value={i.estado}
                    onChange={(e) => setInst(idx, { estado: e.target.value })}
                  />
                </Field>
                <Field label="Código">
                  <Input
                    value={i.codigo}
                    onChange={(e) => setInst(idx, { codigo: e.target.value })}
                  />
                </Field>
                <Field label="Nota MEC">
                  <Input
                    value={i.nota_mec}
                    onChange={(e) => setInst(idx, { nota_mec: e.target.value })}
                  />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="URL da logo">
                    <Input
                      value={i.logo_url}
                      onChange={(e) => setInst(idx, { logo_url: e.target.value })}
                    />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field label="Detalhes (ato / autorização)">
                    <Input
                      value={i.detalhes}
                      onChange={(e) => setInst(idx, { detalhes: e.target.value })}
                    />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field label="Link de comprovação">
                    <Input
                      value={i.link_comprovacao}
                      onChange={(e) => setInst(idx, { link_comprovacao: e.target.value })}
                    />
                  </Field>
                </div>
              </div>
            </div>
          ))}
        </section>

        <div className="pb-10">
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Salvando..." : "Salvar alterações"}
          </Button>
        </div>
      </main>
    </div>
  );
}
