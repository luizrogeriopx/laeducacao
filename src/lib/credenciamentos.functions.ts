import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { CRED_DEFAULT, type CredConfig } from "@/lib/credenciamentos-config";

export const getCredConfig = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin
    .from("site_settings")
    .select("value")
    .eq("key", "credenciamentos")
    .maybeSingle();
  if (!data?.value) return { config: CRED_DEFAULT };
  try {
    const parsed = JSON.parse(data.value) as Partial<CredConfig>;
    return { config: { ...CRED_DEFAULT, ...parsed } as CredConfig };
  } catch {
    return { config: CRED_DEFAULT };
  }
});

export const updateCredConfig = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { config: CredConfig }) => {
    const cfg = { ...CRED_DEFAULT, ...(data?.config ?? {}) } as CredConfig;
    const json = JSON.stringify(cfg);
    if (json.length > 200000) throw new Error("Conteúdo muito longo");
    return { config: cfg };
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

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("site_settings").upsert(
      {
        key: "credenciamentos",
        value: JSON.stringify(data.config),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "key" },
    );
    if (error) throw new Error(error.message);
    return { ok: true, config: data.config };
  });
