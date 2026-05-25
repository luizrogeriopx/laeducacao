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
