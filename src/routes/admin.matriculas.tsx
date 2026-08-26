import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import {
  listMatriculasAdmin,
  getMatriculasMetricsAdmin,
  updateMatriculaAdmin,
  deleteMatriculaAdmin,
  type Matricula,
} from "@/lib/matriculas.functions";
import {
  Search,
  MessageCircle,
  Copy,
  Check,
  Trash2,
  Eye,
  FileText,
  User,
  MapPin,
  GraduationCap,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Phone,
  Mail,
  Calendar,
  RefreshCw,
} from "lucide-react";

export const Route = createFileRoute("/admin/matriculas")({
  component: AdminMatriculasPage,
  head: () => ({ meta: [{ title: "Admin · Matrículas" }] }),
});

function DataField({
  label,
  value,
  fallback = "Não informado",
  mono,
  className,
  highlight,
  copiedId,
  onCopy,
  fieldId,
}: {
  label: string;
  value?: string | null;
  fallback?: string;
  mono?: boolean;
  className?: string;
  highlight?: boolean;
  copiedId: string | null;
  onCopy: (text: string, id: string) => void;
  fieldId: string;
}) {
  const shown = value && value.trim() !== "" ? value : fallback;
  const canCopy = Boolean(value && value.trim() !== "");
  const isCopied = copiedId === fieldId;
  return (
    <div
      className={`group relative rounded-lg border p-2.5 ${
        highlight ? "bg-primary/5 border-primary/20" : "bg-muted/20"
      } ${className || ""}`}
    >
      <span
        className={`block text-xs ${highlight ? "font-semibold text-primary" : "text-muted-foreground"}`}
      >
        {label}
      </span>
      <span
        className={`pr-7 block ${highlight ? "text-base font-bold text-foreground" : "font-medium"} ${
          mono ? "font-mono" : ""
        }`}
      >
        {shown}
      </span>
      {canCopy && (
        <button
          type="button"
          title={`Copiar ${label}`}
          aria-label={`Copiar ${label}`}
          onClick={() => onCopy(value as string, fieldId)}
          className="absolute right-1.5 top-1.5 rounded-md p-1.5 text-muted-foreground hover:bg-background hover:text-foreground transition-colors"
        >
          {isCopied ? (
            <Check className="h-3.5 w-3.5 text-emerald-600" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </button>
      )}
    </div>
  );
}


const STATUS_CONFIG: Record<
  string,
  { label: string; badgeClass: string; icon: React.ComponentType<{ className?: string }> }
> = {
  pendente: {
    label: "Pendente",
    badgeClass: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300",
    icon: AlertCircle,
  },
  em_atendimento: {
    label: "Em Atendimento",
    badgeClass: "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/40 dark:text-blue-300",
    icon: Clock,
  },
  matriculado: {
    label: "Matriculado",
    badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300",
    icon: CheckCircle2,
  },
  cancelado: {
    label: "Cancelado",
    badgeClass: "bg-neutral-100 text-neutral-600 border-neutral-300 dark:bg-neutral-800 dark:text-neutral-400",
    icon: XCircle,
  },
};

function formatPhoneForWhatsApp(phone: string | null): string {
  if (!phone) return "";
  const cleaned = phone.replace(/\D/g, "");
  if (!cleaned) return "";
  // Se não tiver código de país (55), adiciona
  if (cleaned.length === 10 || cleaned.length === 11) {
    return `55${cleaned}`;
  }
  return cleaned;
}

function AdminMatriculasPage() {
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

  return <AdminMatriculasBody />;
}

function AdminMatriculasBody() {
  const navigate = useNavigate();
  const qc = useQueryClient();

  const fetchList = useServerFn(listMatriculasAdmin);
  const fetchMetrics = useServerFn(getMatriculasMetricsAdmin);
  const updateMatricula = useServerFn(updateMatriculaAdmin);
  const deleteMatricula = useServerFn(deleteMatriculaAdmin);

  const [selectedStatus, setSelectedStatus] = useState<string>("todas");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeMatricula, setActiveMatricula] = useState<Matricula | null>(null);
  const [observacoesDraft, setObservacoesDraft] = useState<string>("");
  const [statusDraft, setStatusDraft] = useState<string>("");
  const [idToDelete, setIdToDelete] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedFicha, setCopiedFicha] = useState(false);

  const metricsQ = useQuery({
    queryKey: ["adminMatriculasMetrics"],
    queryFn: () => fetchMetrics(),
    refetchInterval: 15000,
  });

  const listQ = useQuery({
    queryKey: ["adminMatriculasList", selectedStatus, searchQuery],
    queryFn: () => fetchList({ data: { status: selectedStatus, search: searchQuery } }),
    refetchInterval: 10000,
  });

  const updateMut = useMutation({
    mutationFn: (data: { id: string; status?: string; observacoes?: string }) =>
      updateMatricula({ data }),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["adminMatriculasList"] });
      qc.invalidateQueries({ queryKey: ["adminMatriculasMetrics"] });
      if (activeMatricula && activeMatricula.id === vars.id) {
        setActiveMatricula((prev) =>
          prev
            ? {
                ...prev,
                status: vars.status !== undefined ? vars.status : prev.status,
                observacoes: vars.observacoes !== undefined ? vars.observacoes : prev.observacoes,
              }
            : null
        );
      }
    },
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => deleteMatricula({ data: { id } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["adminMatriculasList"] });
      qc.invalidateQueries({ queryKey: ["adminMatriculasMetrics"] });
      setIdToDelete(null);
      if (activeMatricula && activeMatricula.id === idToDelete) {
        setActiveMatricula(null);
      }
    },
  });

  const logout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  };

  const openDetails = (m: Matricula) => {
    setActiveMatricula(m);
    setObservacoesDraft(m.observacoes || "");
    setStatusDraft(m.status || "pendente");
    setCopiedFicha(false);
  };

  const handleCopyFicha = (m: Matricula) => {
    const text = `=== FICHA DE PRÉ-MATRÍCULA LA EDUCAÇÃO ===
Data de Registro: ${new Date(m.created_at).toLocaleString("pt-BR")}
Status: ${STATUS_CONFIG[m.status]?.label || m.status}

1. DADOS PESSOAIS:
- Nome Completo: ${m.nome_completo}
- CPF: ${m.cpf}
- Data de Nascimento: ${m.data_nascimento || "Não informado"}
- RG: ${m.rg_numero || "Não informado"}
- Órgão Emissor: ${m.rg_orgao_emissor || "Não informado"}
- Data de Emissão RG: ${m.rg_data_emissao || "Não informado"}
- Naturalidade (Cidade/UF): ${m.naturalidade || "Não informado"}
- Nome do Pai: ${m.nome_pai || "Não consta"}
- Nome da Mãe: ${m.nome_mae || "Não consta"}

2. CONTATO E ENDEREÇO:
- Telefone / WhatsApp: ${m.telefone || "Não informado"}
- E-mail: ${m.email || "Não informado"}
- CEP: ${m.cep || "Não informado"}
- Endereço: ${m.endereco_rua || "Não informado"}
- Bairro: ${m.endereco_bairro || "Não informado"}
- Cidade/UF: ${m.endereco_cidade || "Não informado"} - ${m.endereco_estado || ""}

3. HISTÓRICO ESCOLAR E CURSO:
- Grau de Escolaridade: ${m.escolaridade || "Não informado"}
- Ano de Conclusão: ${m.ano_conclusao || "Não informado"}
- Escola Anterior: ${m.escola_anterior || "Não informado"}
- Curso Desejado: ${m.curso_desejado || "Não informado"}

4. OBSERVAÇÕES INTERNAS:
${m.observacoes || "Nenhuma observação registrada."}
==========================================`;

    navigator.clipboard.writeText(text);
    setCopiedFicha(true);
    setTimeout(() => setCopiedFicha(false), 3000);
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const buildWhatsAppLink = (m: Matricula) => {
    const rawNumber = formatPhoneForWhatsApp(m.telefone);
    if (!rawNumber) return null;
    const msg = encodeURIComponent(
      `Olá, ${m.nome_completo.split(" ")[0]}! Aqui é da secretaria da LA Educação. Recebemos sua solicitação de pré-matrícula para o curso "${m.curso_desejado || "EJA/Cursos"}". Como podemos te ajudar a concluir sua inscrição?`
    );
    return `https://wa.me/${rawNumber}?text=${msg}`;
  };

  const metrics = metricsQ.data || {
    total: 0,
    pendentes: 0,
    emAtendimento: 0,
    matriculados: 0,
    cancelados: 0,
    hoje: 0,
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Admin */}
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">Matrículas & Inscrições</h1>
              {metrics.pendentes > 0 && (
                <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-semibold text-amber-700 dark:text-amber-400">
                  {metrics.pendentes} pendente{metrics.pendentes > 1 ? "s" : ""}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Gerencie todos os dados de pré-matrícula enviados pelo chat online
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild size="sm" variant="outline">
              <Link to="/admin">Dashboard</Link>
            </Button>
            <Button asChild size="sm" variant="secondary">
              <Link to="/admin/cursos">Cursos</Link>
            </Button>
            <Button asChild size="sm" variant="secondary">
              <Link to="/admin/categorias">Categorias</Link>
            </Button>
            <Button asChild size="sm" variant="secondary">
              <Link to="/admin/blog">Blog</Link>
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

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6">
        {/* Metricas Cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl border bg-card p-4 shadow-sm">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Total Recebido
            </p>
            <p className="mt-1 text-2xl font-bold">{metrics.total}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              +{metrics.hoje} recebida{metrics.hoje === 1 ? "" : "s"} hoje
            </p>
          </div>

          <div
            onClick={() => setSelectedStatus("pendente")}
            className={`cursor-pointer rounded-xl border p-4 shadow-sm transition-colors ${
              selectedStatus === "pendente"
                ? "border-amber-400 bg-amber-50/50 dark:bg-amber-950/20"
                : "bg-card hover:border-amber-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                Pendentes
              </p>
              <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </div>
            <p className="mt-1 text-2xl font-bold text-amber-800 dark:text-amber-300">
              {metrics.pendentes}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Aguardando atendimento</p>
          </div>

          <div
            onClick={() => setSelectedStatus("em_atendimento")}
            className={`cursor-pointer rounded-xl border p-4 shadow-sm transition-colors ${
              selectedStatus === "em_atendimento"
                ? "border-blue-400 bg-blue-50/50 dark:bg-blue-950/20"
                : "bg-card hover:border-blue-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-blue-700 dark:text-blue-400 uppercase tracking-wider">
                Em Atendimento
              </p>
              <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="mt-1 text-2xl font-bold text-blue-800 dark:text-blue-300">
              {metrics.emAtendimento}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Contato em andamento</p>
          </div>

          <div
            onClick={() => setSelectedStatus("matriculado")}
            className={`cursor-pointer rounded-xl border p-4 shadow-sm transition-colors ${
              selectedStatus === "matriculado"
                ? "border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20"
                : "bg-card hover:border-emerald-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                Matriculados
              </p>
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="mt-1 text-2xl font-bold text-emerald-800 dark:text-emerald-300">
              {metrics.matriculados}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Inscrição concluída</p>
          </div>
        </div>

        {/* Barra de Filtros e Busca */}
        <div className="flex flex-col gap-4 rounded-xl border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: "todas", label: "Todas" },
              { id: "pendente", label: "Pendentes" },
              { id: "em_atendimento", label: "Em Atendimento" },
              { id: "matriculado", label: "Matriculados" },
              { id: "cancelado", label: "Cancelados" },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setSelectedStatus(st.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  selectedStatus === st.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted/60 text-muted-foreground hover:bg-muted"
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, CPF, curso..."
                className="pl-9 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              title="Atualizar lista"
              onClick={() => {
                listQ.refetch();
                metricsQ.refetch();
              }}
            >
              <RefreshCw className={`h-4 w-4 ${listQ.isFetching ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>

        {/* Tabela de Matrículas */}
        <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
          {listQ.isLoading ? (
            <div className="py-16 text-center text-muted-foreground">
              <RefreshCw className="mx-auto h-6 w-6 animate-spin mb-2" />
              Carregando matrículas...
            </div>
          ) : listQ.isError ? (
            <div className="py-16 text-center text-destructive">
              Erro ao carregar matrículas: {(listQ.error as Error).message}
            </div>
          ) : listQ.data?.matriculas.length === 0 ? (
            <div className="py-16 text-center text-muted-foreground">
              <FileText className="mx-auto h-10 w-10 opacity-40 mb-2" />
              <p className="font-medium text-base">Nenhuma matrícula encontrada</p>
              <p className="text-sm mt-1">
                {searchQuery || selectedStatus !== "todas"
                  ? "Tente ajustar os filtros ou termo de busca."
                  : "As fichas preenchidas no chat em /matricula aparecerão aqui automaticamente."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b bg-muted/40 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Aluno</th>
                    <th className="px-4 py-3">Curso Escolhido</th>
                    <th className="px-4 py-3">Contato</th>
                    <th className="px-4 py-3">Data</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {listQ.data?.matriculas.map((m) => {
                    const statusInfo = STATUS_CONFIG[m.status] || {
                      label: m.status,
                      badgeClass: "bg-muted text-muted-foreground",
                      icon: Clock,
                    };
                    const waLink = buildWhatsAppLink(m);

                    return (
                      <tr
                        key={m.id}
                        className="hover:bg-muted/30 transition-colors group cursor-pointer"
                        onClick={() => openDetails(m)}
                      >
                        <td className="px-4 py-3.5">
                          <div className="font-medium text-foreground">{m.nome_completo}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                            <span>CPF: {m.cpf}</span>
                            {m.naturalidade && <span>• {m.naturalidade}</span>}
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="font-medium text-foreground line-clamp-1">
                            {m.curso_desejado || "Não especificado"}
                          </span>
                          <span className="text-xs text-muted-foreground block mt-0.5">
                            {m.escolaridade || "Grau não informado"}
                          </span>
                        </td>
                        <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center gap-1.5">
                            <span className="text-foreground">{m.telefone || "Sem telefone"}</span>
                            {m.telefone && (
                              <button
                                onClick={() => handleCopyText(m.telefone || "", m.id)}
                                title="Copiar telefone"
                                className="text-muted-foreground hover:text-foreground p-0.5"
                              >
                                {copiedId === m.id ? (
                                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                                ) : (
                                  <Copy className="h-3.5 w-3.5" />
                                )}
                              </button>
                            )}
                          </div>
                          {m.email && (
                            <div className="text-xs text-muted-foreground truncate max-w-[180px]">
                              {m.email}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap text-xs text-muted-foreground">
                          {new Date(m.created_at).toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                          <span className="block text-[10px] text-muted-foreground/70">
                            {new Date(m.created_at).toLocaleTimeString("pt-BR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusInfo.badgeClass}`}
                          >
                            <statusInfo.icon className="h-3 w-3" />
                            {statusInfo.label}
                          </span>
                        </td>
                        <td
                          className="px-4 py-3.5 text-right whitespace-nowrap"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center justify-end gap-1.5">
                            {waLink && (
                              <Button
                                asChild
                                size="sm"
                                variant="outline"
                                className="h-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                              >
                                <a
                                  href={waLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="Abrir no WhatsApp"
                                >
                                  <MessageCircle className="h-4 w-4" />
                                  <span className="hidden md:inline ml-1">WhatsApp</span>
                                </a>
                              </Button>
                            )}

                            <Button
                              size="sm"
                              variant="secondary"
                              className="h-8"
                              onClick={() => openDetails(m)}
                              title="Ver ficha completa"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Ficha
                            </Button>

                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-destructive/80 hover:text-destructive hover:bg-destructive/10"
                              onClick={() => setIdToDelete(m.id)}
                              title="Excluir matrícula"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Modal de Detalhes da Matrícula */}
      {activeMatricula && (
        <Dialog open={true} onOpenChange={(open) => !open && setActiveMatricula(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader className="border-b pb-3">
              <div className="flex flex-wrap items-center justify-between gap-2 pr-6">
                <div>
                  <DialogTitle className="text-xl font-bold flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    {activeMatricula.nome_completo}
                  </DialogTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Inscrição recebida em{" "}
                    {new Date(activeMatricula.created_at).toLocaleString("pt-BR")}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopyFicha(activeMatricula)}
                    className="text-xs"
                  >
                    {copiedFicha ? (
                      <>
                        <Check className="h-3.5 w-3.5 mr-1 text-emerald-500" />
                        Ficha Copiada!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 mr-1" />
                        Copiar Ficha Completa
                      </>
                    )}
                  </Button>

                  {buildWhatsAppLink(activeMatricula) && (
                    <Button
                      asChild
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs"
                    >
                      <a
                        href={buildWhatsAppLink(activeMatricula)!}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="h-3.5 w-3.5 mr-1" />
                        Conversar no WhatsApp
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-6 py-2">
              {/* Gerenciamento de Status */}
              <div className="rounded-lg border bg-muted/30 p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Status da Matrícula
                    </Label>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Atualize o andamento do contato com o aluno
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: "pendente", label: "Pendente" },
                      { id: "em_atendimento", label: "Em Atendimento" },
                      { id: "matriculado", label: "Matriculado" },
                      { id: "cancelado", label: "Cancelado" },
                    ].map((st) => (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => {
                          setStatusDraft(st.id);
                          updateMut.mutate({ id: activeMatricula.id, status: st.id });
                        }}
                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                          statusDraft === st.id
                            ? `${STATUS_CONFIG[st.id]?.badgeClass} ring-2 ring-primary/40`
                            : "bg-background border text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Seção 1: Dados Pessoais & Documentos */}
              <div>
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5 mb-3 border-b pb-1">
                  <User className="h-4 w-4 text-primary" />
                  1. Dados Pessoais e Documentação
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                  <div className="bg-muted/20 p-2.5 rounded-lg border">
                    <span className="text-xs text-muted-foreground block">Nome Completo:</span>
                    <span className="font-medium">{activeMatricula.nome_completo}</span>
                  </div>
                  <div className="bg-muted/20 p-2.5 rounded-lg border">
                    <span className="text-xs text-muted-foreground block">CPF:</span>
                    <span className="font-medium font-mono">{activeMatricula.cpf}</span>
                  </div>
                  <div className="bg-muted/20 p-2.5 rounded-lg border">
                    <span className="text-xs text-muted-foreground block">Data de Nascimento:</span>
                    <span className="font-medium">{activeMatricula.data_nascimento || "Não informada"}</span>
                  </div>
                  <div className="bg-muted/20 p-2.5 rounded-lg border">
                    <span className="text-xs text-muted-foreground block">Número do RG:</span>
                    <span className="font-medium font-mono">{activeMatricula.rg_numero || "Não informado"}</span>
                  </div>
                  <div className="bg-muted/20 p-2.5 rounded-lg border">
                    <span className="text-xs text-muted-foreground block">Órgão Emissor:</span>
                    <span className="font-medium">{activeMatricula.rg_orgao_emissor || "Não informado"}</span>
                  </div>
                  <div className="bg-muted/20 p-2.5 rounded-lg border">
                    <span className="text-xs text-muted-foreground block">Data de Emissão RG:</span>
                    <span className="font-medium">{activeMatricula.rg_data_emissao || "Não informada"}</span>
                  </div>
                  <div className="bg-muted/20 p-2.5 rounded-lg border">
                    <span className="text-xs text-muted-foreground block">Naturalidade:</span>
                    <span className="font-medium">{activeMatricula.naturalidade || "Não informada"}</span>
                  </div>
                  <div className="bg-muted/20 p-2.5 rounded-lg border">
                    <span className="text-xs text-muted-foreground block">Nome da Mãe:</span>
                    <span className="font-medium">{activeMatricula.nome_mae || "Não consta"}</span>
                  </div>
                  <div className="bg-muted/20 p-2.5 rounded-lg border">
                    <span className="text-xs text-muted-foreground block">Nome do Pai:</span>
                    <span className="font-medium">{activeMatricula.nome_pai || "Não consta"}</span>
                  </div>
                </div>
              </div>

              {/* Seção 2: Contato e Endereço */}
              <div>
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5 mb-3 border-b pb-1">
                  <MapPin className="h-4 w-4 text-primary" />
                  2. Contato e Endereço Residencial
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                  <div className="bg-muted/20 p-2.5 rounded-lg border">
                    <span className="text-xs text-muted-foreground block">Telefone / WhatsApp:</span>
                    <span className="font-medium font-mono">{activeMatricula.telefone || "Não informado"}</span>
                  </div>
                  <div className="bg-muted/20 p-2.5 rounded-lg border">
                    <span className="text-xs text-muted-foreground block">E-mail:</span>
                    <span className="font-medium">{activeMatricula.email || "Não informado"}</span>
                  </div>
                  <div className="bg-muted/20 p-2.5 rounded-lg border">
                    <span className="text-xs text-muted-foreground block">CEP:</span>
                    <span className="font-medium font-mono">{activeMatricula.cep || "Não informado"}</span>
                  </div>
                  <div className="bg-muted/20 p-2.5 rounded-lg border sm:col-span-2">
                    <span className="text-xs text-muted-foreground block">Logradouro / Rua:</span>
                    <span className="font-medium">{activeMatricula.endereco_rua || "Não informado"}</span>
                  </div>
                  <div className="bg-muted/20 p-2.5 rounded-lg border">
                    <span className="text-xs text-muted-foreground block">Bairro:</span>
                    <span className="font-medium">{activeMatricula.endereco_bairro || "Não informado"}</span>
                  </div>
                  <div className="bg-muted/20 p-2.5 rounded-lg border">
                    <span className="text-xs text-muted-foreground block">Cidade:</span>
                    <span className="font-medium">{activeMatricula.endereco_cidade || "Não informada"}</span>
                  </div>
                  <div className="bg-muted/20 p-2.5 rounded-lg border">
                    <span className="text-xs text-muted-foreground block">Estado (UF):</span>
                    <span className="font-medium">{activeMatricula.endereco_estado || "Não informado"}</span>
                  </div>
                </div>
              </div>

              {/* Seção 3: Histórico Escolar & Curso */}
              <div>
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5 mb-3 border-b pb-1">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  3. Formação Escolar e Curso de Interesse
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-primary/5 p-3 rounded-lg border border-primary/20 sm:col-span-2">
                    <span className="text-xs font-semibold text-primary block">Curso Pretendido:</span>
                    <span className="text-base font-bold text-foreground">
                      {activeMatricula.curso_desejado || "Não informado"}
                    </span>
                  </div>
                  <div className="bg-muted/20 p-2.5 rounded-lg border">
                    <span className="text-xs text-muted-foreground block">Grau de Escolaridade Atual:</span>
                    <span className="font-medium">{activeMatricula.escolaridade || "Não informado"}</span>
                  </div>
                  <div className="bg-muted/20 p-2.5 rounded-lg border">
                    <span className="text-xs text-muted-foreground block">Ano de Formação / Parada:</span>
                    <span className="font-medium">{activeMatricula.ano_conclusao || "Não informado"}</span>
                  </div>
                  <div className="bg-muted/20 p-2.5 rounded-lg border sm:col-span-2">
                    <span className="text-xs text-muted-foreground block">Escola ou Instituição Anterior:</span>
                    <span className="font-medium">{activeMatricula.escola_anterior || "Não informada"}</span>
                  </div>
                </div>
              </div>

              {/* Seção 4: Anotações da Secretaria */}
              <div>
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5 mb-2">
                  <FileText className="h-4 w-4 text-primary" />
                  Observações e Anotações da Secretaria
                </h3>
                <Textarea
                  placeholder="Insira anotações sobre o atendimento (ex: 'Aluno ligou dia 18/08, combinou de enviar comprovante pelo WhatsApp...')"
                  value={observacoesDraft}
                  onChange={(e) => setObservacoesDraft(e.target.value)}
                  rows={3}
                  className="text-sm"
                />
                <div className="mt-2 flex justify-end">
                  <Button
                    size="sm"
                    disabled={updateMut.isPending || observacoesDraft === activeMatricula.observacoes}
                    onClick={() =>
                      updateMut.mutate({
                        id: activeMatricula.id,
                        observacoes: observacoesDraft,
                      })
                    }
                  >
                    {updateMut.isPending ? "Salvando..." : "Salvar Anotações"}
                  </Button>
                </div>
              </div>

              {/* Seção 5: Respostas Originais do Chat */}
              {activeMatricula.respostas_completas &&
                activeMatricula.respostas_completas.length > 0 && (
                  <details className="rounded-lg border bg-muted/20 p-3 text-xs">
                    <summary className="cursor-pointer font-medium text-muted-foreground hover:text-foreground">
                      Ver Histórico Completo de Perguntas e Respostas do Chat (
                      {activeMatricula.respostas_completas.length} etapas)
                    </summary>
                    <div className="mt-3 space-y-2 divide-y divide-border/60">
                      {activeMatricula.respostas_completas.map((item, idx) => (
                        <div key={idx} className="pt-2">
                          <p className="font-semibold text-muted-foreground">{item.pergunta}</p>
                          <p className="mt-0.5 text-foreground font-medium bg-background p-1.5 rounded border">
                            {item.resposta || "(Sem resposta)"}
                          </p>
                        </div>
                      ))}
                    </div>
                  </details>
                )}
            </div>

            <DialogFooter className="border-t pt-3 flex items-center justify-between sm:justify-between">
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => {
                  setIdToDelete(activeMatricula.id);
                }}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Excluir Registro
              </Button>
              <Button type="button" variant="outline" onClick={() => setActiveMatricula(null)}>
                Fechar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Confirmação de Exclusão */}
      <AlertDialog open={!!idToDelete} onOpenChange={(open) => !open && setIdToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir registro de matrícula?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação removerá permanentemente a ficha deste aluno do banco de dados. Esta ação não
              pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => idToDelete && deleteMut.mutate(idToDelete)}
            >
              {deleteMut.isPending ? "Excluindo..." : "Sim, excluir"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
