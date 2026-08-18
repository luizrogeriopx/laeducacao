import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { classifyCategory } from "./category";

export interface CourseModule {
  id: string;
  title: string;
  workload?: string;
  description?: string;
  topics?: string[];
}

export interface Course {
  id: string;
  slug: string;
  url: string;
  title: string;
  description: string;
  image: string;
  category: string;
  price_original: number | null;
  price_current: number | null;
  price_installments: string | null;
  display_installments: boolean;
  custom_pricing: boolean;
  hide_price: boolean;
  modules?: CourseModule[];
}

const SITEMAP_URL = "https://trinity.sistemaead.com/sitemap.xml";
const TITLE_PREFIX_RE = /^LA Educa[cç][aã]o Polo Autorizado\s*-\s*/i;

function decodeEntities(s: string): string {
  return s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function extractMeta(html: string, property: string): string {
  const re = new RegExp(
    `<meta\\s+property=["']${property}["']\\s+content=["']([^"']*)["']`,
    "i",
  );
  const m = html.match(re);
  return m ? decodeEntities(m[1]) : "";
}

function parsePriceBR(s: string): number | null {
  // "249,90" -> 249.90 ; "1.299,90" -> 1299.90
  const cleaned = s.replace(/\./g, "").replace(",", ".");
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : null;
}

interface ScrapedCourse extends Omit<Course, "category" | "modules"> {
  category: string;
}

async function scrapeCourse(url: string): Promise<ScrapedCourse | null> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 TrinityCatalog/1.0" },
    });
    if (!res.ok) return null;
    const html = await res.text();

    const rawTitle = extractMeta(html, "og:title");
    const title = rawTitle.replace(TITLE_PREFIX_RE, "").trim();
    if (!title) return null;
    const description = extractMeta(html, "og:description");
    const image = extractMeta(html, "og:image");

    // Prices: "de R$ 249,90 por" / "R$ 159,90 à vista" / "12x de R$ 16,27"
    const original = html.match(/pc_de[^>]*>de<\/span>\s*<span[^>]*pc_valor[^>]*>\s*R\$\s*([\d.,]+)/i);
    const current = html.match(/a_vista[^>]*>[\s\S]{0,200}?R\$\s*([\d.,]+)\s*[\s\S]{0,40}?vista/i)
      ?? html.match(/R\$\s*([\d.,]+)\s*<[^>]*>?\s*\u00e0?\s*vista/i);
    const installments = html.match(/(\d+\s*x\s*de\s*R\$\s*[\d.,]+)/i);

    const slugMatch = url.match(/\/curso-(\d+)-([^/]+)\/?$/);
    const id = slugMatch?.[1] ?? url;
    const slug = slugMatch?.[2] ?? "";

    return {
      id,
      slug,
      url,
      title,
      description,
      image,
      category: classifyCategory(title),
      price_original: original ? parsePriceBR(original[1]) : null,
      price_current: current ? parsePriceBR(current[1]) : null,
      price_installments: installments ? installments[1].replace(/\s+/g, " ") : null,
      display_installments: false,
      custom_pricing: false,
      hide_price: false,
    };
  } catch {
    return null;
  }
}

// Public read: list all courses
export const listCourses = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabaseAdmin
    .from("courses")
    .select("*")
    .eq("enabled", true)
    .order("category", { ascending: true })
    .order("title", { ascending: true })
    .limit(1000);
  if (error) throw new Error(error.message);
  return { courses: (data ?? []) as unknown as Course[] };
});

export const getCourseBySlug = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { data: row, error } = await supabaseAdmin
      .from("courses")
      .select("*")
      .eq("slug", data.slug)
      .eq("enabled", true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return { course: (row ?? null) as unknown as Course | null };
  });

// Admin-only sync
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

export const syncCourses = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.userId);

    const { data: logRow, error: logErr } = await supabaseAdmin
      .from("sync_log")
      .insert({ status: "running" })
      .select("id")
      .single();
    if (logErr) throw new Error(logErr.message);
    const logId = logRow.id;

    try {
      const res = await fetch(SITEMAP_URL, {
        headers: { "User-Agent": "Mozilla/5.0 TrinityCatalog/1.0" },
      });
      if (!res.ok) throw new Error(`Sitemap status ${res.status}`);
      const xml = await res.text();

      const urls = Array.from(
        xml.matchAll(/https:\/\/trinity\.sistemaead\.com\/curso-[^<\s]+/g),
      ).map((m) => m[0].replace(/[<\s].*$/, ""));
      const unique = Array.from(new Set(urls));

      // Somente cursos novos: nunca sobrescreve os que já estão no banco
      const { data: existing, error: exErr } = await supabaseAdmin
        .from("courses")
        .select("id,url")
        .limit(5000);
      if (exErr) throw new Error(exErr.message);
      const existingIds = new Set((existing ?? []).map((r) => r.id));
      const existingUrls = new Set((existing ?? []).map((r) => r.url));

      const newUrls = unique.filter((u) => {
        if (existingUrls.has(u)) return false;
        const id = u.match(/\/curso-(\d+)-/)?.[1];
        return !(id && existingIds.has(id));
      });

      const results: ScrapedCourse[] = [];
      const concurrency = 10;
      for (let i = 0; i < newUrls.length; i += concurrency) {
        const batch = newUrls.slice(i, i + concurrency);
        const batchResults = await Promise.all(batch.map(scrapeCourse));
        for (const c of batchResults) if (c && !existingIds.has(c.id)) results.push(c);
      }

      if (results.length > 0) {
        const rows = results.map((c) => ({
          ...c,
          modules: [] as any,
          enabled: true,
          updated_at: new Date().toISOString(),
        }));
        const { error: upErr } = await supabaseAdmin
          .from("courses")
          .upsert(rows, { onConflict: "id", ignoreDuplicates: true });
        if (upErr) throw new Error(upErr.message);
      }

      await supabaseAdmin
        .from("sync_log")
        .update({
          status: "success",
          finished_at: new Date().toISOString(),
          total_found: unique.length,
          total_saved: results.length,
        })
        .eq("id", logId);

      return { ok: true, total_found: unique.length, total_saved: results.length };
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      await supabaseAdmin
        .from("sync_log")
        .update({
          status: "error",
          finished_at: new Date().toISOString(),
          message: msg,
        })
        .eq("id", logId);
      throw new Error(msg);
    }
  });

export const getLastSync = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.userId);
    const { data, error } = await supabaseAdmin
      .from("sync_log")
      .select("*")
      .order("started_at", { ascending: false })
      .limit(5);
    if (error) throw new Error(error.message);
    return { logs: data ?? [] };
  });

export const isCurrentUserAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    return { isAdmin: !!data };
  });

// ---- Admin CRUD ----

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

export const listAllCoursesAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.userId);
    const { data, error } = await supabaseAdmin
      .from("courses")
      .select("*")
      .order("enabled", { ascending: false })
      .order("category", { ascending: true })
      .order("title", { ascending: true })
      .limit(2000);
    if (error) throw new Error(error.message);
    return { courses: (data ?? []) as unknown as (Course & { enabled: boolean })[] };
  });

interface CourseInput {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  category?: string;
  price_original?: number | null;
  price_current?: number | null;
  price_installments?: string | null;
  display_installments?: boolean;
  custom_pricing?: boolean;
  enabled?: boolean;
  modules?: CourseModule[];
}

export const createCourse = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: CourseInput) => data)
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    if (!data.title?.trim()) throw new Error("Título é obrigatório.");
    const baseSlug = slugify(data.title) || `curso-${Date.now()}`;
    const id = `manual-${Date.now()}`;
    const row = {
      id,
      slug: baseSlug,
      url: data.url?.trim() || `manual://${id}`,
      title: data.title.trim(),
      description: data.description ?? "",
      image: data.image ?? "",
      category: data.category?.trim() || classifyCategory(data.title),
      price_original: data.price_original ?? null,
      price_current: data.price_current ?? null,
      price_installments: data.price_installments ?? null,
      display_installments: data.display_installments ?? false,
      custom_pricing: data.custom_pricing ?? false,
      enabled: data.enabled ?? true,
      modules: (data.modules ?? []) as any,
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabaseAdmin.from("courses").insert(row);
    if (error) throw new Error(error.message);
    return { ok: true, id };
  });

export const updateCourse = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string } & CourseInput) => data)
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    const { id, ...rest } = data;
    const patch = {
      ...(rest.title !== undefined && { title: rest.title }),
      ...(rest.description !== undefined && { description: rest.description }),
      ...(rest.image !== undefined && { image: rest.image }),
      ...(rest.url !== undefined && { url: rest.url }),
      ...(rest.category !== undefined && { category: rest.category }),
      ...(rest.price_original !== undefined && { price_original: rest.price_original }),
      ...(rest.price_current !== undefined && { price_current: rest.price_current }),
      ...(rest.price_installments !== undefined && { price_installments: rest.price_installments }),
      ...(rest.display_installments !== undefined && { display_installments: rest.display_installments }),
      ...(rest.custom_pricing !== undefined && { custom_pricing: rest.custom_pricing }),
      ...(rest.enabled !== undefined && { enabled: rest.enabled }),
      ...(rest.modules !== undefined && { modules: rest.modules as any }),
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabaseAdmin.from("courses").update(patch).eq("id", id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteCourse = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    const { error } = await supabaseAdmin.from("courses").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const toggleCourseEnabled = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string; enabled: boolean }) => data)
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    const { error } = await supabaseAdmin
      .from("courses")
      .update({ enabled: data.enabled, updated_at: new Date().toISOString() })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
