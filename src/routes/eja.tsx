import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MessageCircle, Check } from "lucide-react";
import { getEjaConfig } from "@/lib/eja.functions";
import { EjaTestAccess } from "@/components/EjaTestAccess";
import { ejaWhatsappLink, type EjaConfig } from "@/lib/eja-config";

const CANONICAL = "https://www.laeducacaogo.com.br/eja";

export const Route = createFileRoute("/eja")({
  loader: () => getEjaConfig(),
  component: EjaLanding,
  errorComponent: ({ error }) => (
    <div role="alert" className="p-10 text-center">
      {error.message}
    </div>
  ),
  notFoundComponent: () => <div className="p-10 text-center">Página não encontrada.</div>,
  head: ({ loaderData }) => {
    const cfg = loaderData?.config;
    const title = cfg?.seo_title ?? "EJA Online em Goiânia e Aparecida de Goiânia | LA Educação";
    const description = cfg?.seo_description ?? "";
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: (cfg?.faqs ?? []).map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    };
    const courseSchema = {
      "@context": "https://schema.org",
      "@type": "Course",
      name: "EJA — Educação de Jovens e Adultos (Online)",
      description,
      provider: {
        "@type": "EducationalOrganization",
        name: "LA Educação",
        url: "https://www.laeducacaogo.com.br",
        areaServed: ["Goiânia", "Aparecida de Goiânia"],
      },
    };
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: "https://www.laeducacaogo.com.br" },
        { "@type": "ListItem", position: 2, name: "EJA", item: CANONICAL },
      ],
    };
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "keywords", content: cfg?.seo_keywords ?? "" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: CANONICAL },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: CANONICAL }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(faqSchema) },
        { type: "application/ld+json", children: JSON.stringify(courseSchema) },
        { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema) },
      ],
    };
  },
});

function EjaLanding() {
  const { config } = Route.useLoaderData();
  const cfg = config as EjaConfig;
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const wa = (msg?: string) => ejaWhatsappLink(cfg, msg);

  const seals = [
    { src: "/img/selo-mec-reconhecido.png", alt: "Selo MEC de Reconhecimento e Validação Nacional" },
    { src: "/img/selo-la-educacao-goiania.png", alt: "Selo LA Educação - Cursos EAD em Goiânia" },
    { src: "/img/selo-la-educacao-reclame-aqui.png", alt: "Selo Reclame Aqui - Excelente Reputação LA Educação" },
    { src: "/img/selo-la-educacao-avaliacao-google.png", alt: "Selo Google Avaliação Cinco Estrelas" },
    { src: "/img/selo-inipi-certificados.png", alt: "Selo INIPI de Certificação Profissional de Qualidade" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-800">
      <SiteHeader />

      {/* Hero */}
      <section className="bg-[#1a237e] text-white pt-32 pb-16 px-5">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center gap-6">
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">{cfg.hero_h1}</h1>
          <p className="text-lg sm:text-xl text-neutral-100 max-w-3xl">{cfg.hero_sub}</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-left w-full max-w-4xl">
            {cfg.hero_badges.map((b, i) => (
              <li key={i} className="flex items-start gap-2 bg-white/10 rounded-lg px-4 py-3 text-sm">
                <Check className="w-4 h-4 mt-0.5 shrink-0 text-[oklch(0.75_0.18_145)]" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <a
            href={wa()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#da1069] hover:bg-white hover:text-neutral-900 font-bold py-4 px-10 rounded-full text-lg shadow-lg transition-all inline-flex items-center gap-2"
          >
            <MessageCircle className="w-5 h-5" /> {cfg.hero_cta}
          </a>
        </div>
      </section>

      {/* Identificação */}
      <section className="py-16 px-5 bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-5">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1a237e]">{cfg.ident_title}</h2>
          <p className="text-neutral-600 leading-relaxed">{cfg.ident_text}</p>
          <a
            href={wa(`${cfg.ident_cta} sobre a EJA`)}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[oklch(0.65_0.18_145)] text-white font-bold py-3 px-8 rounded-full shadow hover:opacity-90 transition inline-flex items-center gap-2"
          >
            <MessageCircle className="w-5 h-5" /> {cfg.ident_cta}
          </a>
        </div>
      </section>

      {/* Por que fazer a EJA */}
      <section className="py-16 px-5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1a237e] text-center mb-10">{cfg.why_title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cfg.why_cards.map((c, i) => (
              <div key={i} className="p-6 rounded-xl border border-neutral-200 shadow-sm bg-white">
                <div className="text-3xl mb-3">{c.icon}</div>
                <h3 className="font-bold text-[#1a237e] mb-1">{c.title}</h3>
                <p className="text-sm text-neutral-600">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="py-16 px-5 bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1a237e] text-center mb-10">{cfg.how_title}</h2>
          <ol className="space-y-4">
            {cfg.how_steps.map((s, i) => (
              <li key={i} className="flex gap-4 items-start bg-white p-5 rounded-xl border border-neutral-200">
                <span className="text-2xl">{s.icon}</span>
                <div>
                  <h3 className="font-bold text-[#1a237e]">{s.title}</h3>
                  <p className="text-sm text-neutral-600">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Para quem é */}
      <section className="py-16 px-5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1a237e] text-center mb-8">{cfg.who_title}</h2>
          <ul className="space-y-3">
            {cfg.who_items.map((w, i) => (
              <li key={i} className="flex gap-3 items-start text-neutral-700">
                <Check className="w-5 h-5 text-[#da1069] shrink-0 mt-0.5" />
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Oferta */}
      <section className="py-16 px-5 bg-[#1a237e] text-white">
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold">{cfg.offer_title}</h2>
          <p className="text-neutral-200 font-semibold">{cfg.offer_subtitle}</p>
          <div className="bg-white text-[#1a237e] rounded-2xl px-10 py-8 shadow-xl w-full">
            <div className="text-4xl sm:text-5xl font-extrabold">{cfg.offer_price}</div>
            <p className="mt-3 text-sm font-bold uppercase tracking-wide text-[#da1069] whitespace-pre-line leading-relaxed">
              {cfg.offer_installment}
            </p>
          </div>
          <a
            href={wa(cfg.offer_cta)}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#da1069] hover:bg-white hover:text-[#1a237e] font-bold py-4 px-10 rounded-full text-lg shadow-lg transition inline-flex items-center gap-2"
          >
            <MessageCircle className="w-5 h-5" /> {cfg.offer_cta}
          </a>
          <p className="text-xl sm:text-2xl font-extrabold uppercase tracking-wide text-white">
            {cfg.offer_note}
          </p>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-16 px-5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1a237e] text-center mb-10">{cfg.diff_title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cfg.diff_cards.map((c, i) => (
              <div key={i} className="p-6 rounded-xl border border-neutral-200 bg-neutral-50 flex gap-3 items-start">
                <span className="text-2xl">{c.icon}</span>
                <div>
                  <h3 className="font-bold text-[#1a237e]">{c.title}</h3>
                  {c.desc ? <p className="text-sm text-neutral-600">{c.desc}</p> : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prova social */}
      {cfg.testimonials.length > 0 && (
        <section className="py-16 px-5 bg-neutral-50 border-y border-neutral-200">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a237e] text-center mb-10">{cfg.social_title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cfg.testimonials.map((t, i) => (
                <div key={i} className="p-6 bg-white rounded-xl border border-neutral-200 shadow-sm">
                  <p className="text-sm text-neutral-600 italic">"{t.text}"</p>
                  <div className="mt-4 pt-3 border-t border-neutral-100">
                    <span className="block font-bold text-sm text-[#1a237e]">{t.name}</span>
                    <span className="text-xs text-neutral-500">{t.city}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1a237e] text-center mb-10">{cfg.faq_title}</h2>
          <div className="space-y-3">
            {cfg.faqs.map((f, i) => (
              <div key={i} className="border border-neutral-200 rounded-lg bg-white overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left p-5 font-bold text-[#1a237e] hover:bg-neutral-50 flex justify-between items-center gap-3"
                >
                  <span>{f.q}</span>
                  <span>{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div className="p-5 border-t border-neutral-100 bg-neutral-50 text-sm text-neutral-600 leading-relaxed">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO local */}
      <section className="py-16 px-5 bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold text-[#1a237e] mb-3">{cfg.goiania_title}</h2>
            <p className="text-neutral-600 leading-relaxed text-sm">{cfg.goiania_text}</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#1a237e] mb-3">{cfg.aparecida_title}</h2>
            <p className="text-neutral-600 leading-relaxed text-sm">{cfg.aparecida_text}</p>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 px-5 bg-[#da1069] text-white text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-5">
          <h2 className="text-3xl sm:text-4xl font-extrabold">{cfg.final_title}</h2>
          <p className="text-lg text-neutral-100">{cfg.final_text}</p>
          <a
            href={wa(cfg.final_cta)}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#da1069] hover:bg-[#1a237e] hover:text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg transition inline-flex items-center gap-2"
          >
            <MessageCircle className="w-5 h-5" /> {cfg.final_cta}
          </a>
          <p className="font-semibold">WhatsApp: {cfg.whatsapp_display}</p>
        </div>
      </section>

      <EjaTestAccess />

      {/* Certificação Garantida */}
      <section className="py-16 px-5 bg-white">

        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1a237e] mb-10">CERTIFICAÇÃO GARANTIDA</h2>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
            {seals.map((s, idx) => (
              <div key={idx} className="flex justify-center items-center p-2">
                <img
                  src={s.src}
                  alt={s.alt}
                  loading="lazy"
                  className="seal-img max-h-24 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
