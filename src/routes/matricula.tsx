import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";

export const Route = createFileRoute("/matricula")({
  component: MatriculaPage,
  head: () => ({
    title: "Matrícula Online - LA Educação",
    meta: [
      { name: "description", content: "Faça sua matrícula online no portal da LA Educação de forma rápida através do nosso chat inteligente." }
    ]
  })
});

interface Message {
  id: number;
  text: string;
  sender: "bot" | "user" | "typing";
}

const perguntas = [
  "Olá! Vamos iniciar sua matrícula😊 Qual seu nome completo?",
  "Qual o seu CPF?",
  "Sua Data de nascimento?",
  "Apenas os números do seu RG?",
  "Órgão emissor do RG?",
  "Data de emissão do RG?",
  "Cidade e Estado de Nascimento:",
  "Nome do pai se consta no seu RG? (Se não constar, digite 'Não consta')",
  "Nome da mãe se consta no seu RG? (Se não constar, digite 'Não consta')",
  "CEP da sua rua?",
  "Rua?",
  "Bairro?",
  "Cidade?",
  "Estado?",
  "Seu Telefone com DDD?",
  "O Seu melhor E-mail?",
  "Seu grau de Escolaridade?",
  "Ano dessa formação?",
  "Nome da escola ou instituição?",
  "Em Qual curso deseja matricular?"
];

function validarCPF(cpf: string) {
  const cleanCpf = cpf.replace(/[^\d]+/g, "");
  if (cleanCpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cleanCpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cleanCpf.charAt(i)) * (10 - i);
  let resto = 11 - (soma % 11);
  if (resto >= 10) resto = 0;
  if (resto !== parseInt(cleanCpf.charAt(9))) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cleanCpf.charAt(i)) * (11 - i);
  resto = 11 - (soma % 11);
  if (resto >= 10) resto = 0;
  if (resto !== parseInt(cleanCpf.charAt(10))) return false;

  return true;
}

function applyMask(value: string, step: number): string {
  let v = value;
  if (step === 1) {
    // CPF
    v = v.replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  } else if (step === 2 || step === 5) {
    // Datas
    v = v.replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d)/, "$1/$2");
  } else if (step === 9) {
    // CEP
    v = v.replace(/\D/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2");
  } else if (step === 14) {
    // Telefone
    v = v.replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  }
  return v;
}

function MatriculaPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: perguntas[0], sender: "bot" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [step, setStep] = useState(0);
  const [respostas, setRespostas] = useState<string[]>([]);
  const [isSending, setIsSending] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Carregar script do EmailJS
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/emailjs-com@2/dist/email.min.js";
    script.async = true;
    script.onload = () => {
      if ((window as any).emailjs) {
        (window as any).emailjs.init("si2ZQ_-rNh6YsXuHQ");
      }
    };
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Rolar para o final do chat ao receber nova mensagem
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const val = inputValue.trim();
    if (!val || isSending) return;

    // Validação de CPF
    if (step === 1 && !validarCPF(val)) {
      alert("CPF inválido! Por favor, digite um CPF válido.");
      return;
    }

    const nextId = messages.length + 1;
    const newMessages = [...messages, { id: nextId, text: val, sender: "user" } as Message];
    setMessages(newMessages);
    
    const novasRespostas = [...respostas, val];
    setRespostas(novasRespostas);
    setInputValue("");

    const nextStep = step + 1;
    setStep(nextStep);

    if (nextStep < perguntas.length) {
      // Simular digitação do bot
      const typingId = nextId + 1;
      setMessages((prev) => [...prev, { id: typingId, text: "", sender: "typing" }]);

      setTimeout(() => {
        setMessages((prev) =>
          prev
            .filter((m) => m.sender !== "typing")
            .concat({ id: typingId, text: perguntas[nextStep], sender: "bot" })
        );
      }, 1000);
    } else {
      // Finalizar e enviar
      enviarFicha(novasRespostas, nextId + 1);
    }
  };

  const enviarFicha = (resps: string[], lastId: number) => {
    setIsSending(true);
    setMessages((prev) => [...prev, { id: lastId, text: "", sender: "typing" }]);

    setTimeout(() => {
      const emailjs = (window as any).emailjs;
      const textoFormulario = resps
        .map((resp, idx) => `${perguntas[idx]}\nResposta: ${resp}`)
        .join("\n\n");

      if (emailjs) {
        emailjs
          .send("service_laeducacaogo", "template_8mm84u5", {
            message: textoFormulario
          })
          .then(() => {
            setMessages((prev) =>
              prev
                .filter((m) => m.sender !== "typing")
                .concat({
                  id: lastId + 1,
                  text: "Matrícula enviada com sucesso! ✅ Agora é só aguardar o contato da nossa secretaria no número informado!",
                  sender: "bot"
                })
            );
            setIsSending(false);
          })
          .catch((err: any) => {
            console.error("Erro no EmailJS:", err);
            setMessages((prev) =>
              prev
                .filter((m) => m.sender !== "typing")
                .concat({
                  id: lastId + 1,
                  text: "Ocorreu um erro ao enviar sua matrícula via e-mail. ❌ Por favor, tente novamente ou entre em contato direto pelo WhatsApp.",
                  sender: "bot"
                })
            );
            setIsSending(false);
          });
      } else {
        // Fallback caso o script do EmailJS não tenha carregado
        console.error("SDK do EmailJS não carregou.");
        setMessages((prev) =>
          prev
            .filter((m) => m.sender !== "typing")
            .concat({
              id: lastId + 1,
              text: "Serviço de envio temporariamente indisponível. ❌ Por favor, copie suas respostas e nos envie diretamente.",
              sender: "bot"
            })
        );
        setIsSending(false);
      }
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    const maskedVal = applyMask(rawVal, step);
    setInputValue(maskedVal);
  };

  return (
    <div className="w-full h-screen bg-[#ece5dd] flex items-center justify-center font-sans">
      <div className="w-full max-w-[500px] h-full sm:h-[90vh] sm:rounded-xl sm:shadow-2xl overflow-hidden bg-white flex flex-col">
        {/* Header do Chat */}
        <header className="bg-[#075e54] text-white p-4 flex items-center gap-3 relative shadow-md">
          <Link to="/" className="text-white hover:opacity-85 text-xl font-bold pr-2">
            ←
          </Link>
          <img
            src="/matricula/img/agente.jpeg"
            alt="Ana Luiza"
            className="w-11 h-11 rounded-full object-cover border-2 border-white/50"
          />
          <div className="flex-1 min-w-0">
            <h1 className="font-bold text-base leading-tight truncate">Ana Luiza | Secretária</h1>
            <p className="text-xs text-white/80 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
              Online
            </p>
          </div>
        </header>

        {/* Histórico do Chat */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#ece5dd]">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex w-full ${m.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {m.sender === "typing" ? (
                <div className="bg-white rounded-lg px-4 py-3 shadow-sm text-neutral-400 text-sm flex gap-1 items-center">
                  <span>Digitando</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce delay-100" />
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce delay-200" />
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce delay-300" />
                </div>
              ) : (
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2.5 shadow-sm text-sm break-words whitespace-pre-wrap ${
                    m.sender === "user"
                      ? "bg-[#dcf8c6] text-neutral-800 rounded-tr-none"
                      : "bg-white text-neutral-800 rounded-tl-none"
                  }`}
                >
                  {m.text}
                </div>
              )}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Área de Entrada */}
        <div className="p-3 bg-neutral-100 border-t flex items-center gap-2">
          <input
            type="text"
            className="flex-1 bg-white border border-neutral-300 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#075e54] text-neutral-800"
            placeholder={
              step >= perguntas.length ? "Matrícula finalizada..." : "Digite sua resposta..."
            }
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={step >= perguntas.length || isSending}
          />
          <button
            onClick={handleSend}
            disabled={step >= perguntas.length || isSending || !inputValue.trim()}
            className="bg-[#075e54] hover:bg-[#0b8a7b] disabled:bg-neutral-300 text-white rounded-full p-2.5 flex items-center justify-center cursor-pointer transition-colors shadow focus:outline-none"
            aria-label="Enviar resposta"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 transform rotate-45"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 9.725A9.604 9.604 0 002 12c0 1.278.249 2.502.7 3.633L6 12zm0 0h12m-12 0l3-3m-3 3l3 3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
