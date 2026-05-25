import { createServerFn } from "@tanstack/react-start";

export interface Course {
  id: string;
  slug: string;
  url: string;
  title: string;
  description: string;
  image: string;
}

const SITEMAP_URL = "https://trinity.sistemaead.com/sitemap.xml";
const TITLE_PREFIX_RE = /^LA Educação Polo Autorizado\s*-\s*/i;

// In-memory cache (per worker instance)
let cache: { data: Course[]; expiresAt: number } | null = null;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

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

async function fetchCourse(url: string): Promise<Course | null> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 TrinityCatalog/1.0" },
    });
    if (!res.ok) return null;
    const html = await res.text();

    const rawTitle = extractMeta(html, "og:title");
    const title = rawTitle.replace(TITLE_PREFIX_RE, "").trim();
    const description = extractMeta(html, "og:description");
    const image = extractMeta(html, "og:image");

    const slugMatch = url.match(/\/curso-(\d+)-([^/]+)\/?$/);
    const id = slugMatch?.[1] ?? url;
    const slug = slugMatch?.[2] ?? "";

    if (!title) return null;

    return { id, slug, url, title, description, image };
  } catch {
    return null;
  }
}

async function loadCatalog(): Promise<Course[]> {
  const res = await fetch(SITEMAP_URL, {
    headers: { "User-Agent": "Mozilla/5.0 TrinityCatalog/1.0" },
  });
  if (!res.ok) throw new Error(`Falha ao buscar sitemap: ${res.status}`);
  const xml = await res.text();

  const urls = Array.from(
    xml.matchAll(/https:\/\/trinity\.sistemaead\.com\/curso-[^<\s]+/g),
  ).map((m) => m[0].replace(/[<\s].*$/, ""));

  const unique = Array.from(new Set(urls));

  // Parallel fetch with concurrency limit
  const concurrency = 10;
  const results: Course[] = [];
  for (let i = 0; i < unique.length; i += concurrency) {
    const batch = unique.slice(i, i + concurrency);
    const batchResults = await Promise.all(batch.map(fetchCourse));
    for (const c of batchResults) if (c) results.push(c);
  }

  // Sort by numeric ID descending (newest first, assuming higher IDs are newer)
  results.sort((a, b) => Number(b.id) - Number(a.id));
  return results;
}

export const getCourses = createServerFn({ method: "GET" })
  .inputValidator((data: { refresh?: boolean } | undefined) => data ?? {})
  .handler(async ({ data }) => {
    const now = Date.now();
    if (!data.refresh && cache && cache.expiresAt > now) {
      return { courses: cache.data, cachedAt: cache.expiresAt - CACHE_TTL_MS };
    }
    const courses = await loadCatalog();
    cache = { data: courses, expiresAt: now + CACHE_TTL_MS };
    return { courses, cachedAt: now };
  });
