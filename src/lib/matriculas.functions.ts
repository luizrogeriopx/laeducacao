import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export interface Matricula {
  id: string;
  created_at: string;
  updated_at: string;
  status: "pendente" | "em_atendimento" | "matriculado" | "cancelado" | string;
  nome_completo: string;
  cpf: string;
  data_nascimento: string | null;
  rg_numero: string | null;
  rg_orgao_emissor: string | null;
  rg_data_emissao: string | null;
  naturalidade: string | null;
  estado_civil: string | null;
  cor_raca: string | null;

  nome_pai: string | null;
  nome_mae: string | null;
  cep: string | null;
  endereco_rua: string | null;
  endereco_bairro: string | null;
  endereco_cidade: string | null;
  endereco_estado: string | null;
  telefone: string | null;
  email: string | null;
  escolaridade: string | null;
  ano_conclusao: string | null;
  escola_anterior: string | null;
  curso_desejado: string | null;
  observacoes: string | null;
  respostas_completas: Array<{ pergunta: string; resposta: string }> | null;
}

const MatriculaSubmissionSchema = z.object({
  nome_completo: z.string().trim().min(2, "Nome é obrigatório"),
  cpf: z.string().trim().min(11, "CPF é obrigatório"),
  data_nascimento: z.string().trim().optional().default(""),
  rg_numero: z.string().trim().optional().default(""),
  rg_orgao_emissor: z.string().trim().optional().default(""),
  rg_data_emissao: z.string().trim().optional().default(""),
  naturalidade: z.string().trim().optional().default(""),
  estado_civil: z.string().trim().optional().default(""),
  cor_raca: z.string().trim().optional().default(""),

  nome_pai: z.string().trim().optional().default(""),
  nome_mae: z.string().trim().optional().default(""),
  cep: z.string().trim().optional().default(""),
  endereco_rua: z.string().trim().optional().default(""),
  endereco_bairro: z.string().trim().optional().default(""),
  endereco_cidade: z.string().trim().optional().default(""),
  endereco_estado: z.string().trim().optional().default(""),
  telefone: z.string().trim().optional().default(""),
  email: z.string().trim().optional().default(""),
  escolaridade: z.string().trim().optional().default(""),
  ano_conclusao: z.string().trim().optional().default(""),
  escola_anterior: z.string().trim().optional().default(""),
  curso_desejado: z.string().trim().optional().default(""),
  respostas_completas: z
    .array(
      z.object({
        pergunta: z.string(),
        resposta: z.string(),
      })
    )
    .optional()
    .default([]),
});

async function assertAdmin(userId: string) {
  const { data, error } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Acesso negado: usuário não é administrador.");
}

// 1. Envio público da matrícula (página /matricula)
export const submitMatricula = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => MatriculaSubmissionSchema.parse(data))
  .handler(async ({ data }) => {
    const row = {
      status: "pendente",
      nome_completo: data.nome_completo,
      cpf: data.cpf,
      data_nascimento: data.data_nascimento || null,
      rg_numero: data.rg_numero || null,
      rg_orgao_emissor: data.rg_orgao_emissor || null,
      rg_data_emissao: data.rg_data_emissao || null,
      naturalidade: data.naturalidade || null,
      nome_pai: data.nome_pai || null,
      nome_mae: data.nome_mae || null,
      cep: data.cep || null,
      endereco_rua: data.endereco_rua || null,
      endereco_bairro: data.endereco_bairro || null,
      endereco_cidade: data.endereco_cidade || null,
      endereco_estado: data.endereco_estado || null,
      telefone: data.telefone || null,
      email: data.email || null,
      escolaridade: data.escolaridade || null,
      ano_conclusao: data.ano_conclusao || null,
      escola_anterior: data.escola_anterior || null,
      curso_desejado: data.curso_desejado || null,
      observacoes: "",
      respostas_completas: data.respostas_completas as any,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data: inserted, error } = await supabaseAdmin
      .from("matriculas")
      .insert(row)
      .select("id")
      .single();

    if (error) {
      console.error("Erro ao salvar matrícula:", error);
      throw new Error("Não foi possível salvar os dados da matrícula.");
    }

    return { ok: true, id: inserted.id };
  });

// 2. Listagem de matrículas (Painel Admin)
export const listMatriculasAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data?: { status?: string; search?: string }) => ({
    status: data?.status || "",
    search: data?.search || "",
  }))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);

    let query = supabaseAdmin
      .from("matriculas")
      .select("*")
      .order("created_at", { ascending: false });

    if (data?.status && data.status !== "todas") {
      query = query.eq("status", data.status);
    }

    if (data?.search && data.search.trim() !== "") {
      const s = data.search.trim();
      query = query.or(
        `nome_completo.ilike.%${s}%,cpf.ilike.%${s}%,telefone.ilike.%${s}%,email.ilike.%${s}%,curso_desejado.ilike.%${s}%`
      );
    }

    const { data: rows, error } = await query.limit(500);
    if (error) throw new Error(error.message);

    return { matriculas: (rows ?? []) as unknown as Matricula[] };
  });

// 3. Obter detalhes de uma matrícula
export const getMatriculaAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);

    const { data: row, error } = await supabaseAdmin
      .from("matriculas")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return { matricula: (row ?? null) as unknown as Matricula | null };
  });

// 4. Atualizar status e anotações
export const updateMatriculaAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string; status?: string; observacoes?: string }) =>
    z
      .object({
        id: z.string().uuid(),
        status: z.string().optional(),
        observacoes: z.string().optional(),
      })
      .parse(data)
  )
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);

    const patch: {
      updated_at: string;
      status?: string;
      observacoes?: string;
    } = {
      updated_at: new Date().toISOString(),
      ...(data.status !== undefined && { status: data.status }),
      ...(data.observacoes !== undefined && { observacoes: data.observacoes }),
    };

    const { error } = await supabaseAdmin
      .from("matriculas")
      .update(patch)
      .eq("id", data.id);

    if (error) throw new Error(error.message);
    return { ok: true };
  });

// 5. Excluir matrícula
export const deleteMatriculaAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);

    const { error } = await supabaseAdmin.from("matriculas").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// 6. Obter métricas de contagem para o Dashboard
export const getMatriculasMetricsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.userId);

    const { data, error } = await supabaseAdmin
      .from("matriculas")
      .select("id, status, created_at");

    if (error) throw new Error(error.message);

    const list = data ?? [];
    const total = list.length;
    const pendentes = list.filter((m) => m.status === "pendente").length;
    const emAtendimento = list.filter((m) => m.status === "em_atendimento").length;
    const matriculados = list.filter((m) => m.status === "matriculado").length;
    const cancelados = list.filter((m) => m.status === "cancelado").length;

    const todayStr = new Date().toISOString().slice(0, 10);
    const hoje = list.filter((m) => m.created_at.startsWith(todayStr)).length;

    return {
      total,
      pendentes,
      emAtendimento,
      matriculados,
      cancelados,
      hoje,
    };
  });
