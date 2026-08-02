import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { categorySlug } from "./category";

export interface CourseCategory {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
  price_original: number | null;
  price_current: number | null;
  price_installments: string | null;
  display_installments: boolean;
}

async function assertAdmin(userId: string) {
  const { data, error } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Acesso negado: usuário não é admin.");
}

export const listCategories = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabaseAdmin
    .from("course_categories")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });
  if (error) throw new Error(error.message);
  return { categories: (data ?? []) as CourseCategory[] };
});

export const listCategoriesAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.userId);
    const [{ data: cats, error }, { data: courses, error: cErr }] = await Promise.all([
      supabaseAdmin
        .from("course_categories")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("name", { ascending: true }),
      supabaseAdmin.from("courses").select("category").limit(5000),
    ]);
    if (error) throw new Error(error.message);
    if (cErr) throw new Error(cErr.message);

    const counts = new Map<string, number>();
    for (const c of courses ?? []) {
      counts.set(c.category, (counts.get(c.category) ?? 0) + 1);
    }

    return {
      categories: ((cats ?? []) as CourseCategory[]).map((c) => ({
        ...c,
        course_count: counts.get(c.name) ?? 0,
      })),
    };
  });

export const createCategory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { name: string; sort_order?: number }) => data)
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    const name = data.name.trim();
    if (!name) throw new Error("Nome é obrigatório.");
    const { error } = await supabaseAdmin.from("course_categories").insert({
      name,
      slug: categorySlug(name),
      sort_order: data.sort_order ?? 0,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const updateCategory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (data: { id: string; name?: string; sort_order?: number }) => data,
  )
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    const { data: current, error: curErr } = await supabaseAdmin
      .from("course_categories")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();
    if (curErr) throw new Error(curErr.message);
    if (!current) throw new Error("Categoria não encontrada.");

    const newName = data.name?.trim();
    const patch = {
      updated_at: new Date().toISOString(),
      ...(newName ? { name: newName, slug: categorySlug(newName) } : {}),
      ...(data.sort_order !== undefined ? { sort_order: data.sort_order } : {}),
    };


    const { error } = await supabaseAdmin
      .from("course_categories")
      .update(patch)
      .eq("id", data.id);
    if (error) throw new Error(error.message);

    // Renomear a categoria também renomeia nos cursos
    if (newName && newName !== current.name) {
      const { error: upErr } = await supabaseAdmin
        .from("courses")
        .update({ category: newName, updated_at: new Date().toISOString() })
        .eq("category", current.name);
      if (upErr) throw new Error(upErr.message);
    }
    return { ok: true };
  });

export const deleteCategory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string; moveTo?: string }) => data)
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    const { data: current, error: curErr } = await supabaseAdmin
      .from("course_categories")
      .select("name")
      .eq("id", data.id)
      .maybeSingle();
    if (curErr) throw new Error(curErr.message);
    if (!current) throw new Error("Categoria não encontrada.");

    const target = data.moveTo?.trim() || "Outros";
    const { error: mvErr } = await supabaseAdmin
      .from("courses")
      .update({ category: target, updated_at: new Date().toISOString() })
      .eq("category", current.name);
    if (mvErr) throw new Error(mvErr.message);

    const { error } = await supabaseAdmin
      .from("course_categories")
      .delete()
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// Define o preço da categoria e aplica a todos os cursos dela
export const setCategoryPrice = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (data: {
      id: string;
      price_original: number | null;
      price_current: number | null;
      price_installments: string | null;
      display_installments: boolean;
      apply: boolean;
    }) => data,
  )
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    const { data: current, error: curErr } = await supabaseAdmin
      .from("course_categories")
      .select("name")
      .eq("id", data.id)
      .maybeSingle();
    if (curErr) throw new Error(curErr.message);
    if (!current) throw new Error("Categoria não encontrada.");

    const { error } = await supabaseAdmin
      .from("course_categories")
      .update({
        price_original: data.price_original,
        price_current: data.price_current,
        price_installments: data.price_installments,
        display_installments: data.display_installments,
        updated_at: new Date().toISOString(),
      })
      .eq("id", data.id);
    if (error) throw new Error(error.message);

    let updated = 0;
    if (data.apply) {
      const { data: rows, error: upErr } = await supabaseAdmin
        .from("courses")
        .update({
          price_original: data.price_original,
          price_current: data.price_current,
          price_installments: data.price_installments,
          display_installments: data.display_installments,
          updated_at: new Date().toISOString(),
        })
        .eq("category", current.name)
        .select("id");
      if (upErr) throw new Error(upErr.message);
      updated = rows?.length ?? 0;
    }
    return { ok: true, updated };
  });
