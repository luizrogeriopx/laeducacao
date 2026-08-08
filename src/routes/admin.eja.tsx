import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { getEjaConfig, updateEjaConfig } from "@/lib/eja.functions";
import { EJA_DEFAULT, type EjaConfig, type EjaCard, type EjaFaq, type EjaTestimonial } from "@/lib/eja-config";

export const Route = createFileRoute("/admin/eja")({
  component: AdminEja,
});

function linesToArray(v: string) {
  return v.split("\n").map((l) => l.trim()).filter(Boolean);
}
function cardsToText(cards: EjaCard[]) {
  return cards.map((c) => [c.icon, c.title, c.desc].join(" | ")).join("\n");
}
function textToCards(v: string): EjaCard[] {
  return linesToArray(v).map((l) => {
    const [icon = "", title = "", desc = ""] = l.split("|").map((p) => p.trim());
    return { icon, title, desc };
  });
}
function faqsToText(faqs: EjaFaq[]) {
  return faqs.map((f) => `${f.q} | ${f.a}`).join("\n");
}
function textToFaqs(v: string): EjaFaq[] {
  return linesToArray(v).map((l) => {
    const idx = l.indexOf("|");
    return idx === -1
      ? { q: l, a: "" }
      : { q: l.slice(0, idx).trim(), a: l.slice(idx + 1).trim() };
  });
}
function testimonialsToText(t: EjaTestimonial[]) {
  return t.map((x) => `${x.name} | ${x.city} | ${x.text}`).join("\n");
}
function textToTestimonials(v: string): EjaTestimonial[] {
  return linesToArray(v).map((l) => {
    const [name = "", city = "", ...rest] = l.split("|").map((p) => p.trim());
    return { name, city, text: rest.join(" | ") };
  });
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">{label}</Label>
      {children}
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

function AdminEja() {
  const fetchCfg = useServerFn(getEjaConfig);
  const saveCfg = useServerFn(updateEjaConfig);
  const [cfg, setCfg] = useState<EjaConfig>(EJA_DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCfg()
      .then((r) => setCfg(r.config as EjaConfig))
      .catch((e: Error) => toast.error(e.message))
      .finally(() => setLoading(false));
  }, [fetchCfg]);

  const set = <K extends keyof EjaConfig>(key: K, value: EjaConfig[K]) =>
    setCfg((c) => ({ ...c, [key]: value }));

  async function handleSave() {
    setSaving(true);
    try {
      await saveCfg({ data: { config: cfg } });
      toast.success("Landing page da EJA atualizada!");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="p-10 text-center text-muted-foreground">Carregando...</div>;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-6 sm:px-6">
          <h1 className="text-2xl font-bold">Landing page EJA</h1>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/admin">Voltar</Link>
            </Button>
            <Button asChild variant="secondary" size="sm">
              <Link to="/eja">Ver página</Link>
            </Button>
            <Button size="sm" onClick={handleSave} disabled={saving}>
              {saving ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6">
        <section className="space-y-4 rounded-lg border p-5">
          <h2 className="font-semibold">SEO</h2>
          <Field label="Título (title)">
            <Input value={cfg.seo_title} onChange={(e) => set("seo_title", e.target.value)} />
          </Field>
          <Field label="Descrição (meta description)">
            <Textarea rows={3} value={cfg.seo_description} onChange={(e) => set("seo_description", e.target.value)} />
          </Field>
          <Field label="Palavras-chave">
            <Textarea rows={3} value={cfg.seo_keywords} onChange={(e) => set("seo_keywords", e.target.value)} />
          </Field>
        </section>

        <section className="space-y-4 rounded-lg border p-5">
          <h2 className="font-semibold">WhatsApp</h2>
          <Field label="Número (somente dígitos, com DDI)">
            <Input value={cfg.whatsapp_number} onChange={(e) => set("whatsapp_number", e.target.value)} />
          </Field>
          <Field label="Número exibido">
            <Input value={cfg.whatsapp_display} onChange={(e) => set("whatsapp_display", e.target.value)} />
          </Field>
          <Field label="Mensagem padrão">
            <Input value={cfg.whatsapp_message} onChange={(e) => set("whatsapp_message", e.target.value)} />
          </Field>
        </section>

        <section className="space-y-4 rounded-lg border p-5">
          <h2 className="font-semibold">1. Hero</h2>
          <Field label="Título H1">
            <Input value={cfg.hero_h1} onChange={(e) => set("hero_h1", e.target.value)} />
          </Field>
          <Field label="Subtítulo">
            <Textarea rows={3} value={cfg.hero_sub} onChange={(e) => set("hero_sub", e.target.value)} />
          </Field>
          <Field label="Destaques" hint="Um por linha">
            <Textarea
              rows={9}
              value={cfg.hero_badges.join("\n")}
              onChange={(e) => set("hero_badges", linesToArray(e.target.value))}
            />
          </Field>
          <Field label="Texto do botão principal">
            <Input value={cfg.hero_cta} onChange={(e) => set("hero_cta", e.target.value)} />
          </Field>
        </section>

        <section className="space-y-4 rounded-lg border p-5">
          <h2 className="font-semibold">2. Bloco de identificação</h2>
          <Field label="Título">
            <Input value={cfg.ident_title} onChange={(e) => set("ident_title", e.target.value)} />
          </Field>
          <Field label="Texto">
            <Textarea rows={4} value={cfg.ident_text} onChange={(e) => set("ident_text", e.target.value)} />
          </Field>
          <Field label="Botão">
            <Input value={cfg.ident_cta} onChange={(e) => set("ident_cta", e.target.value)} />
          </Field>
        </section>

        <section className="space-y-4 rounded-lg border p-5">
          <h2 className="font-semibold">3. Por que fazer a EJA</h2>
          <Field label="Título">
            <Input value={cfg.why_title} onChange={(e) => set("why_title", e.target.value)} />
          </Field>
          <Field label="Cards" hint="Um por linha: emoji | título | descrição">
            <Textarea rows={6} value={cardsToText(cfg.why_cards)} onChange={(e) => set("why_cards", textToCards(e.target.value))} />
          </Field>
        </section>

        <section className="space-y-4 rounded-lg border p-5">
          <h2 className="font-semibold">4. Como funciona</h2>
          <Field label="Título">
            <Input value={cfg.how_title} onChange={(e) => set("how_title", e.target.value)} />
          </Field>
          <Field label="Etapas" hint="Um por linha: emoji | título | descrição">
            <Textarea rows={6} value={cardsToText(cfg.how_steps)} onChange={(e) => set("how_steps", textToCards(e.target.value))} />
          </Field>
        </section>

        <section className="space-y-4 rounded-lg border p-5">
          <h2 className="font-semibold">5. Para quem é a EJA</h2>
          <Field label="Título">
            <Input value={cfg.who_title} onChange={(e) => set("who_title", e.target.value)} />
          </Field>
          <Field label="Itens" hint="Um por linha">
            <Textarea rows={6} value={cfg.who_items.join("\n")} onChange={(e) => set("who_items", linesToArray(e.target.value))} />
          </Field>
        </section>

        <section className="space-y-4 rounded-lg border p-5">
          <h2 className="font-semibold">6. Oferta</h2>
          <Field label="Título">
            <Input value={cfg.offer_title} onChange={(e) => set("offer_title", e.target.value)} />
          </Field>
          <Field label="Subtítulo">
            <Input value={cfg.offer_subtitle} onChange={(e) => set("offer_subtitle", e.target.value)} />
          </Field>
          <Field label="Preço em destaque">
            <Input value={cfg.offer_price} onChange={(e) => set("offer_price", e.target.value)} />
          </Field>
          <Field label="Destaque do parcelamento">
            <Textarea rows={2} value={cfg.offer_installment} onChange={(e) => set("offer_installment", e.target.value)} />
          </Field>
          <Field label="Observação (condições)">
            <Textarea rows={3} value={cfg.offer_note} onChange={(e) => set("offer_note", e.target.value)} />
          </Field>
          <Field label="Botão">
            <Input value={cfg.offer_cta} onChange={(e) => set("offer_cta", e.target.value)} />
          </Field>
        </section>

        <section className="space-y-4 rounded-lg border p-5">
          <h2 className="font-semibold">7. Diferenciais</h2>
          <Field label="Título">
            <Input value={cfg.diff_title} onChange={(e) => set("diff_title", e.target.value)} />
          </Field>
          <Field label="Cards" hint="Um por linha: emoji | título | descrição (descrição opcional)">
            <Textarea rows={7} value={cardsToText(cfg.diff_cards)} onChange={(e) => set("diff_cards", textToCards(e.target.value))} />
          </Field>
        </section>

        <section className="space-y-4 rounded-lg border p-5">
          <h2 className="font-semibold">8. Prova social</h2>
          <Field label="Título">
            <Input value={cfg.social_title} onChange={(e) => set("social_title", e.target.value)} />
          </Field>
          <Field
            label="Depoimentos"
            hint="Um por linha: nome | cidade | depoimento. Deixe vazio para ocultar a seção (use apenas depoimentos reais)."
          >
            <Textarea
              rows={5}
              value={testimonialsToText(cfg.testimonials)}
              onChange={(e) => set("testimonials", textToTestimonials(e.target.value))}
            />
          </Field>
        </section>

        <section className="space-y-4 rounded-lg border p-5">
          <h2 className="font-semibold">9. FAQ</h2>
          <Field label="Título">
            <Input value={cfg.faq_title} onChange={(e) => set("faq_title", e.target.value)} />
          </Field>
          <Field label="Perguntas" hint="Uma por linha: pergunta | resposta">
            <Textarea rows={12} value={faqsToText(cfg.faqs)} onChange={(e) => set("faqs", textToFaqs(e.target.value))} />
          </Field>
        </section>

        <section className="space-y-4 rounded-lg border p-5">
          <h2 className="font-semibold">10 e 11. Blocos locais</h2>
          <Field label="Título Goiânia">
            <Input value={cfg.goiania_title} onChange={(e) => set("goiania_title", e.target.value)} />
          </Field>
          <Field label="Texto Goiânia">
            <Textarea rows={4} value={cfg.goiania_text} onChange={(e) => set("goiania_text", e.target.value)} />
          </Field>
          <Field label="Título Aparecida de Goiânia">
            <Input value={cfg.aparecida_title} onChange={(e) => set("aparecida_title", e.target.value)} />
          </Field>
          <Field label="Texto Aparecida de Goiânia">
            <Textarea rows={4} value={cfg.aparecida_text} onChange={(e) => set("aparecida_text", e.target.value)} />
          </Field>
        </section>

        <section className="space-y-4 rounded-lg border p-5">
          <h2 className="font-semibold">12. CTA final</h2>
          <Field label="Título">
            <Input value={cfg.final_title} onChange={(e) => set("final_title", e.target.value)} />
          </Field>
          <Field label="Texto">
            <Textarea rows={3} value={cfg.final_text} onChange={(e) => set("final_text", e.target.value)} />
          </Field>
          <Field label="Botão">
            <Input value={cfg.final_cta} onChange={(e) => set("final_cta", e.target.value)} />
          </Field>
        </section>

        <div className="flex justify-end pb-10">
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Salvando..." : "Salvar alterações"}
          </Button>
        </div>
      </main>
    </div>
  );
}
