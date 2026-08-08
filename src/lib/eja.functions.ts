import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { EJA_DEFAULT, type EjaConfig } from "@/lib/eja-config";

export const getEjaConfig = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin
    .from("site_settings")
    .select("value")
    .eq("key", "eja_landing")
    .maybeSingle();
  if (!data?.value) return { config: EJA_DEFAULT };
  try {
    const parsed = JSON.parse(data.value) as Partial<EjaConfig>;
    return { config: { ...EJA_DEFAULT, ...parsed } as EjaConfig };
  } catch {
    return { config: EJA_DEFAULT };
  }
});

export const updateEjaConfig = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { config: EjaConfig }) => {
    const json = JSON.stringify(data?.config ?? {});
    if (json.length > 60000) throw new Error("Conteúdo muito longo");
    return { config: { ...EJA_DEFAULT, ...(data?.config ?? {}) } as EjaConfig };
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
        key: "eja_landing",
        value: JSON.stringify(data.config),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "key" },
    );
    if (error) throw new Error(error.message);
    return { ok: true, config: data.config };
  });
