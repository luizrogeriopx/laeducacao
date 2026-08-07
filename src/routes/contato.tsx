import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Mail, Phone, MapPin, Landmark, MessageCircle, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contato")({
  component: ContatoPage,
  head: () => ({
    title: "Contato Completo | LA Educação Goiânia e Aparecida",
    meta: [
      { name: "description", content: "Entre em contato com a LA Educação. Fale com nossos atendentes via WhatsApp, envie e-mail ou visite nosso polo em Goiânia. Matrículas abertas!" }
    ],
    links: [{ rel: "canonical", href: "https://www.laeducacaogo.com.br/contato" }]
  })
});

function ContatoPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simular envio de formulário
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-800">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative bg-[#1a237e] text-white pt-32 pb-20 px-5 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
          <nav className="text-sm text-neutral-300 mb-2 flex items-center gap-2">
            <Link to="/" className="hover:underline">Início</Link>
            <span>/</span>
            <span className="text-white">Contato</span>
          </nav>
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
            Fale Conosco
          </h1>
          <p className="text-lg text-neutral-100 max-w-2xl">
            Dúvidas sobre o EJA, Supletivos ou Cursos Profissionalizantes? Nossa equipe está pronta para ajudar você.
          </p>
        </div>
      </section>

      {/* Contact Grid Section */}
      <section className="py-16 px-5 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Info & Map Column */}
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-2xl font-bold text-[#1a237e] mb-6">Informações de Contato</h2>
            <p className="text-neutral-600 mb-6 leading-relaxed">
              Você pode tirar suas dúvidas por telefone, e-mail ou diretamente com a nossa equipe de consultores pedagógicos através do WhatsApp para obter atendimento imediato.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-[#da1069] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-[#1a237e]">WhatsApp de Atendimento</h4>
                <p className="text-sm text-neutral-600">
                  <a href="https://wa.me/5562996592952" target="_blank" rel="noreferrer" className="underline hover:text-[#da1069]">
                    (62) 99659-2952
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-[#da1069] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-[#1a237e]">E-mail de Suporte</h4>
                <p className="text-sm text-neutral-600">
                  <a href="mailto:suporte@trinity.edu.br" className="underline hover:text-[#da1069]">
                    suporte@trinity.edu.br
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-[#da1069] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-[#1a237e]">Endereço de Atendimento</h4>
                <p className="text-sm text-neutral-600">
                  Polo de Atendimento EAD — Goiânia, Goiás
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Landmark className="w-6 h-6 text-[#da1069] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-[#1a237e]">Dados Corporativos</h4>
                <p className="text-sm text-neutral-600">
                  CNPJ: 58.208.328/0001-88 — Licenciado Autorizado LA Educação
                </p>
              </div>
            </div>
          </div>

          {/* Map Embed (Responsive Iframe) */}
          <div className="w-full h-80 rounded-xl overflow-hidden shadow-md border border-neutral-200 mt-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d244837.23439906666!2d-49.42676756616641!3d-16.68695022649069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ef6ab98e27ca7%3A0x6e9f1a0e0e0e0e0e!2zR29pw6JuaWEsIEdP!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              title="Localização Goiânia Goiás"
            />
          </div>
        </div>

        {/* Contact Form Column */}
        <div className="p-8 bg-neutral-50 rounded-2xl border border-neutral-200 shadow-sm">
          <h3 className="text-xl font-bold text-[#1a237e] mb-6">Envie uma Mensagem</h3>
          {submitted ? (
            <div className="p-6 bg-emerald-50 text-emerald-800 rounded-xl text-center flex flex-col gap-3">
              <span className="text-lg font-bold">Mensagem enviada com sucesso!</span>
              <p className="text-sm">Obrigado por entrar em contato. Nossa equipe retornará o mais breve possível.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 bg-[#1a237e] text-white py-2 px-6 rounded-lg text-sm hover:bg-[#da1069] transition-colors"
              >
                Enviar nova mensagem
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-bold text-[#1a237e]">Nome Completo</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Digite seu nome"
                  className="p-3 border rounded-lg bg-white text-sm focus:outline-none focus:border-[#da1069]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-bold text-[#1a237e]">E-mail</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Digite seu e-mail"
                  className="p-3 border rounded-lg bg-white text-sm focus:outline-none focus:border-[#da1069]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-sm font-bold text-[#1a237e]">Telefone com DDD</label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(62) 99999-9999"
                  className="p-3 border rounded-lg bg-white text-sm focus:outline-none focus:border-[#da1069]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-bold text-[#1a237e]">Mensagem</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Como podemos ajudar você?"
                  className="p-3 border rounded-lg bg-white text-sm focus:outline-none focus:border-[#da1069]"
                />
              </div>

              <button
                type="submit"
                className="bg-[#da1069] text-white font-bold py-3 px-8 rounded-lg text-sm hover:bg-[#1a237e] transition-colors flex items-center justify-center gap-2 shadow"
              >
                <Send className="w-4 h-4" /> Enviar Mensagem
              </button>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-neutral-200 text-center">
            <p className="text-sm text-[#1a237e] font-bold mb-3">Prefere falar pelo WhatsApp?</p>
            <a
              href="https://wa.me/5562996592952?text=Olá,%20gostaria%20de%20tirar%20uma%20dúvida"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[oklch(0.65_0.18_145)] hover:bg-[#1a237e] text-white font-bold py-3 px-6 rounded-lg text-sm transition-colors shadow inline-flex items-center gap-2 justify-center w-full"
            >
              <MessageCircle className="w-5 h-5" /> Abrir WhatsApp de Atendimento
            </a>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Widget */}
      <a
        href="https://wa.me/5562996592952?text=Olá,%20gostaria%20de%20saber%20mais"
        target="_blank"
        rel="noopener noreferrer"
        title="Fale Conosco no WhatsApp"
        className="fixed bottom-6 right-6 z-50 bg-[oklch(0.65_0.18_145)] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center"
      >
        <MessageCircle className="w-8 h-8" />
      </a>

      <SiteFooter />
    </div>
  );
}
