import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { categorySlug } from "@/lib/category";

const BASE_URL = "https://www.laeducacaogo.com.br";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const [{ data: courses }, { data: posts }] = await Promise.all([
          supabaseAdmin
            .from("courses")
            .select("slug, category, updated_at")
            .eq("enabled", true)
            .limit(2000),
          supabaseAdmin
            .from("blog_posts")
            .select("slug, updated_at")
            .eq("published", true)
            .limit(2000),
        ]);

        const entries: { path: string; lastmod?: string; priority?: string; changefreq?: string }[] = [
          { path: "/", changefreq: "daily", priority: "1.0" },
          { path: "/eja-goiania", changefreq: "weekly", priority: "0.9" },
          { path: "/eja-aparecida-de-goiania", changefreq: "weekly", priority: "0.9" },
          { path: "/supletivo-goiania", changefreq: "weekly", priority: "0.9" },
          { path: "/supletivo-aparecida-de-goiania", changefreq: "weekly", priority: "0.9" },
          { path: "/eja-online", changefreq: "weekly", priority: "0.9" },
          { path: "/supletivo-online", changefreq: "weekly", priority: "0.9" },
          { path: "/quem-somos", changefreq: "monthly", priority: "0.7" },
          { path: "/politica-privacidade", changefreq: "monthly", priority: "0.5" },
          { path: "/termos-uso", changefreq: "monthly", priority: "0.5" },
          { path: "/contato", changefreq: "monthly", priority: "0.7" },
          { path: "/blog", changefreq: "daily", priority: "0.9" },
          { path: "/catalogo", changefreq: "weekly", priority: "0.8" },
          { path: "/matricula", changefreq: "weekly", priority: "0.8" },
        ];

        const cats = new Set<string>();
        for (const c of courses ?? []) {
          if (c.category) cats.add(c.category);
          entries.push({
            path: `/curso/${c.slug}`,
            lastmod: c.updated_at ?? undefined,
            changefreq: "weekly",
            priority: "0.8",
          });
        }
        for (const cat of cats) {
          entries.push({
            path: `/categoria/${categorySlug(cat)}`,
            changefreq: "weekly",
            priority: "0.7",
          });
        }
        for (const p of posts ?? []) {
          entries.push({
            path: `/blog/${p.slug}`,
            lastmod: p.updated_at ?? undefined,
            changefreq: "monthly",
            priority: "0.7",
          });
        }

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
