import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const getGoogleTagId = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await supabaseAdmin
    .from("site_settings")
    .select("value")
    .eq("key", "google_tag_id")
    .maybeSingle();
  return { value: data?.value ?? "" };
});

export const updateGoogleTagId = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { value: string }) => {
    const v = (data?.value ?? "").trim();
    if (v.length > 200) throw new Error("Valor muito longo");
    if (v && !/^[A-Za-z0-9_-]+$/.test(v))
      throw new Error("Use apenas o ID (ex: G-XXXXXXX), sem espaços ou tags.");
    return { value: v };
  })
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: roleRow } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    if (!roleRow) throw new Error("Acesso restrito");

    const { error } = await supabaseAdmin
      .from("site_settings")
      .upsert(
        { key: "google_tag_id", value: data.value, updated_at: new Date().toISOString() },
        { onConflict: "key" },
      );
    if (error) throw new Error(error.message);
    return { ok: true, value: data.value };
  });

export const getSeoKeywords = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await supabaseAdmin
    .from("site_settings")
    .select("value")
    .eq("key", "seo_keywords")
    .maybeSingle();
  return { value: data?.value ?? "" };
});

export const updateSeoKeywords = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { value: string }) => {
    const v = (data?.value ?? "").trim();
    if (v.length > 5000) throw new Error("Texto muito longo (máx 5000 caracteres)");
    return { value: v };
  })
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: roleRow } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    if (!roleRow) throw new Error("Acesso restrito");

    const { error } = await supabaseAdmin
      .from("site_settings")
      .upsert(
        { key: "seo_keywords", value: data.value, updated_at: new Date().toISOString() },
        { onConflict: "key" },
      );
    if (error) throw new Error(error.message);
    return { ok: true, value: data.value };
  });

export type FooterConfig = {
  company_name: string;
  cnpj: string;
  tagline: string;
  whatsapp_display: string;
  email: string;
  hours: string;
  instagram: string;
  facebook: string;
  youtube: string;
  tiktok: string;
  whatsapp_url: string;
  copyright: string;
};

const FOOTER_DEFAULT: FooterConfig = {
  company_name: "",
  cnpj: "",
  tagline: "",
  whatsapp_display: "",
  email: "",
  hours: "",
  instagram: "",
  facebook: "",
  youtube: "",
  tiktok: "",
  whatsapp_url: "",
  copyright: "",
};

export const getFooterConfig = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await supabaseAdmin
    .from("site_settings")
    .select("value")
    .eq("key", "footer_config")
    .maybeSingle();
  if (!data?.value) return { config: FOOTER_DEFAULT };
  try {
    const parsed = JSON.parse(data.value);
    return { config: { ...FOOTER_DEFAULT, ...parsed } as FooterConfig };
  } catch {
    return { config: FOOTER_DEFAULT };
  }
});

export const updateFooterConfig = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { config: Partial<FooterConfig> }) => {
    const cfg = data?.config ?? {};
    const out: FooterConfig = { ...FOOTER_DEFAULT };
    for (const k of Object.keys(FOOTER_DEFAULT) as (keyof FooterConfig)[]) {
      const v = (cfg as Record<string, unknown>)[k];
      if (typeof v === "string") {
        if (v.length > 1000) throw new Error(`Campo ${k} muito longo`);
        out[k] = v;
      }
    }
    return { config: out };
  })
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: roleRow } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    if (!roleRow) throw new Error("Acesso restrito");

    const { error } = await supabaseAdmin
      .from("site_settings")
      .upsert(
        {
          key: "footer_config",
          value: JSON.stringify(data.config),
          updated_at: new Date().toISOString(),
        },
        { onConflict: "key" },
      );
    if (error) throw new Error(error.message);
    return { ok: true, config: data.config };
  });

