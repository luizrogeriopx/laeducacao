import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { getFooterConfig } from "@/lib/settings.functions";
import { Instagram, Facebook, Youtube, MessageCircle } from "lucide-react";

export function SiteFooter() {
  const fetchCfg = useServerFn(getFooterConfig);
  const { data } = useQuery({
    queryKey: ["footerConfig"],
    queryFn: () => fetchCfg(),
  });
  const c = data?.config;
  if (!c) return null;

  return (
    <footer className="mt-16 border-t bg-foreground text-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-bold">{c.company_name}</h3>
          {c.cnpj && (
            <p className="mt-2 text-sm opacity-80">CNPJ: {c.cnpj}</p>
          )}
          {c.tagline && (
            <p className="mt-3 text-sm opacity-80">{c.tagline}</p>
          )}
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide">Atendimento</h4>
          <ul className="mt-3 space-y-2 text-sm opacity-90">
            {c.whatsapp_display && (
              <li>
                WhatsApp:{" "}
                {c.whatsapp_url ? (
                  <a href={c.whatsapp_url} target="_blank" rel="noreferrer" className="underline">
                    {c.whatsapp_display}
                  </a>
                ) : (
                  c.whatsapp_display
                )}
              </li>
            )}
            {c.email && (
              <li>
                Email:{" "}
                <a href={`mailto:${c.email}`} className="underline">
                  {c.email}
                </a>
              </li>
            )}
            {c.hours && <li>Horário: {c.hours}</li>}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide">Redes Sociais</h4>
          <div className="mt-3 flex flex-wrap gap-3">
            {c.instagram && (
              <a href={c.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"
                 className="rounded-full bg-background/10 p-2 hover:bg-background/20">
                <Instagram className="h-5 w-5" />
              </a>
            )}
            {c.facebook && (
              <a href={c.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"
                 className="rounded-full bg-background/10 p-2 hover:bg-background/20">
                <Facebook className="h-5 w-5" />
              </a>
            )}
            {c.youtube && (
              <a href={c.youtube} target="_blank" rel="noreferrer" aria-label="YouTube"
                 className="rounded-full bg-background/10 p-2 hover:bg-background/20">
                <Youtube className="h-5 w-5" />
              </a>
            )}
            {c.tiktok && (
              <a href={c.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok"
                 className="rounded-full bg-background/10 p-2 hover:bg-background/20">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M19.6 6.3a4.8 4.8 0 0 1-3.4-1.5 4.8 4.8 0 0 1-1.3-2.6h-3v13.2a2.7 2.7 0 1 1-2.7-2.7c.3 0 .5 0 .8.1V9.7a5.8 5.8 0 1 0 4.9 5.7V9.3a7.8 7.8 0 0 0 4.7 1.6V7.9c-.1 0-.6-.1-1-.6z"/></svg>
              </a>
            )}
            {c.whatsapp_url && (
              <a href={c.whatsapp_url} target="_blank" rel="noreferrer" aria-label="WhatsApp"
                 className="rounded-full bg-background/10 p-2 hover:bg-background/20">
                <MessageCircle className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {c.copyright && (
        <div className="border-t border-background/10">
          <p className="mx-auto max-w-6xl px-4 py-4 text-center text-xs opacity-70 sm:px-6">
            {c.copyright}
          </p>
        </div>
      )}
    </footer>
  );
}
