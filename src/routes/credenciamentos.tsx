import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ExternalLink, FileText, MapPin, Search, Star } from "lucide-react";
import { getCredConfig } from "@/lib/credenciamentos.functions";
import { CRED_DEFAULT, type CredCategoria, type CredConfig } from "@/lib/credenciamentos-config";

export const Route = createFileRoute("/credenciamentos")({
  component: CredenciamentosPage,
  loader: () => getCredConfig(),
  errorComponent: () => (
    <div className="p-10 text-center text-neutral-500">Não foi possível carregar a página.</div>
  ),
  notFoundComponent: () => <div className="p-10 text-center">Página não encontrada.</div>,
  head: ({ loaderData }) => {
    const cfg = (loaderData?.config ?? CRED_DEFAULT) as CredConfig;
    return {
      title: cfg.seo_title,
      meta: [
        { name: "description", content: cfg.seo_description },
        { property: "og:title", content: cfg.seo_title },
        { property: "og:description", content: cfg.seo_description },
        { property: "og:url", content: "https://www.laeducacaogo.com.br/credenciamentos" },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: "https://www.laeducacaogo.com.br/credenciamentos" }],
    };
  },
});

const BADGE: Record<CredCategoria, { label: string; badge: string; border: string }> = {
  certificadora: {
    label: "Certificadora",
    badge: "bg-[#da1069]/10 text-[#da1069]",
    border: "border-l-4 border-[#da1069]",
  },
  tecnico: {
    label: "Técnico (SISTEC)",
    badge: "bg-[#1a237e]/10 text-[#1a237e]",
    border: "border-l-4 border-[#1a237e]",
  },
  superior: {
    label: "Superior (e-MEC)",
    badge: "bg-purple-100 text-purple-800",
    border: "border-l-4 border-purple-500",
  },
};

function CredenciamentosPage() {
  const { config } = Route.useLoaderData();
  const cfg = (config ?? CRED_DEFAULT) as CredConfig;
  const [filtro, setFiltro] = useState<"all" | CredCategoria>("all");
  const [busca, setBusca] = useState("");

  const filtros: { value: "all" | CredCategoria; label: string }[] = [
    { value: "all", label: cfg.filtro_todos },
    { value: "certificadora", label: cfg.filtro_certificadora },
    { value: "tecnico", label: cfg.filtro_tecnico },
    { value: "superior", label: cfg.filtro_superior },
  ];

  const lista = useMemo(() => {
    const q = busca.trim().toLowerCase();
    return (cfg.instituicoes ?? []).filter((i) => {
      const matchCat = filtro === "all" || i.categoria === filtro;
      const matchBusca =
        q === "" ||
        [i.nome, i.cidade, i.estado, i.codigo, i.detalhes].join(" ").toLowerCase().includes(q);
      return matchCat && matchBusca;
    });
  }, [filtro, busca, cfg.instituicoes]);

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-800 flex flex-col">
      <SiteHeader />

      <header className="bg-gradient-to-r from-[#1a237e] to-[#da1069] text-white pt-32 pb-14 px-5 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-5">
          <nav className="text-sm text-white/70 flex items-center gap-2">
            <Link to="/" className="hover:text-white">
              Início
            </Link>
            <span>/</span>
            <span className="text-white">{cfg.breadcrumb_label}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold">{cfg.hero_title}</h1>
          {cfg.hero_subtitle ? (
            <p className="text-lg md:text-xl font-medium">{cfg.hero_subtitle}</p>
          ) : null}
          {cfg.hero_note ? (
            <p className="text-sm md:text-base text-white/90 leading-relaxed bg-white/10 p-4 rounded-lg border border-white/20">
              {cfg.hero_note}
            </p>
          ) : null}

          <div className="w-full max-w-xl relative">
            <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder={cfg.search_placeholder}
              className="w-full pl-12 pr-4 py-4 rounded-full shadow-lg text-neutral-800 bg-white focus:outline-none focus:ring-4 focus:ring-[#da1069]/40 transition"
            />
          </div>
        </div>
      </header>

      <main className="max-w-6xl w-full mx-auto px-5 py-10 flex-grow">
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {filtros.map((f) => (
            <button
              key={f.value}
              onClick={() => setFiltro(f.value)}
              className={`px-5 py-2 rounded-full font-medium shadow transition ${
                filtro === f.value
                  ? "bg-[#1a237e] text-white"
                  : "bg-white text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {lista.length === 0 ? (
          <div className="text-center py-20 text-neutral-500">
            <Search size={40} className="mx-auto mb-4 text-neutral-300" />
            <p>{cfg.empty_text}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lista.map((i, idx) => {
              const meta = BADGE[i.categoria] ?? BADGE.certificadora;
              const temLink = (i.link_comprovacao ?? "").includes("http");
              return (
                <article
                  key={`${i.categoria}-${i.nome}-${idx}`}
                  className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition p-6 flex flex-col justify-between ${meta.border}`}
                >
                  <div>
                    <div className="flex justify-between items-start gap-3 mb-4">
                      {i.logo_url ? (
                        <img
                          src={i.logo_url}
                          alt={`Logo ${i.nome}`}
                          loading="lazy"
                          className="h-12 w-auto max-w-[55%] object-contain"
                        />
                      ) : (
                        <div className="bg-neutral-100 h-12 w-12 rounded-full" />
                      )}
                      <span
                        className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide h-fit ${meta.badge}`}
                      >
                        {meta.label}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-neutral-800 mb-1 leading-tight">{i.nome}</h2>

                    {i.nota_mec && i.nota_mec !== "-" ? (
                      <div className="mb-2">
                        <span className="inline-flex items-center gap-1 text-yellow-600 text-xs font-bold bg-yellow-50 px-2 py-1 rounded border border-yellow-200">
                          <Star size={12} /> Nota MEC: {i.nota_mec}
                        </span>
                      </div>
                    ) : null}

                    <div className="text-sm text-neutral-500 mb-3 flex items-center gap-2">
                      <MapPin size={15} />
                      {i.cidade && i.cidade !== "-" ? i.cidade : "Nacional"}
                      {i.estado && i.estado !== "-" ? ` - ${i.estado}` : ""}
                    </div>

                    <div className="bg-neutral-50 p-3 rounded text-sm text-neutral-600">
                      {i.codigo && i.codigo !== "-" ? (
                        <p>
                          <strong>Cód:</strong>{" "}
                          <span className="font-mono text-[#da1069] select-all">{i.codigo}</span>
                        </p>
                      ) : null}
                      <p className="text-xs mt-1 text-neutral-500">{i.detalhes}</p>
                    </div>
                  </div>

                  {temLink ? (
                    <a
                      href={i.link_comprovacao}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center justify-center gap-2 w-full text-center bg-[#1a237e] hover:bg-[#da1069] text-white py-2 rounded-lg transition text-sm font-semibold"
                    >
                      <ExternalLink size={15} /> {cfg.btn_verificar}
                    </a>
                  ) : (
                    <span className="mt-4 inline-flex items-center justify-center gap-2 w-full text-center bg-neutral-100 text-neutral-500 py-2 rounded-lg text-sm font-semibold">
                      <FileText size={15} /> {cfg.btn_sem_link}
                    </span>
                  )}
                </article>
              );
            })}
          </div>
        )}

        <div className="text-center mt-14">
          {cfg.rodape_link_url ? (
            <p className="text-sm text-neutral-500 mb-4">
              {cfg.rodape_texto}{" "}
              <a
                href={cfg.rodape_link_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#da1069] font-semibold underline break-all"
              >
                {cfg.rodape_link_label}
              </a>
            </p>
          ) : null}
          {cfg.cta_label ? (
            <Link
              to="/matricula"
              className="inline-block bg-[#da1069] text-white font-bold py-3 px-8 rounded-md hover:bg-[#1a237e] transition-colors"
            >
              {cfg.cta_label}
            </Link>
          ) : null}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
