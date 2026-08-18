import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, useEffect, useRef } from "react";
import { submitMatricula } from "@/lib/matriculas.functions";

export const Route = createFileRoute("/matricula")({
  component: MatriculaPage,
  head: () => ({
    title: "Matrícula Online | EJA e Cursos Técnicos em Goiânia",
    meta: [
      { name: "description", content: "Faça sua pré-matrícula online na LA Educação. Conclua seus estudos ou inicie um curso profissionalizante EAD em Goiânia e Aparecida de Goiânia. Inscreva-se!" },
      { property: "og:title", content: "Matrícula Online | EJA e Cursos Técnicos em Goiânia" },
      { property: "og:description", content: "Faça sua pré-matrícula online na LA Educação. Conclua seus estudos ou inicie um curso profissionalizante EAD com certificado MEC em Goiânia e Aparecida." },
      { property: "og:url", content: "https://www.laeducacaogo.com.br/matricula" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://www.laeducacaogo.com.br/img/banner-cursos-ead-goiania.png" },
      { name: "twitter:image", content: "https://www.laeducacaogo.com.br/img/banner-cursos-ead-goiania.png" },
    ],
    links: [{ rel: "canonical", href: "https://www.laeducacaogo.com.br/matricula" }]
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
  const sendMatricula = useServerFn(submitMatricula);
  const chatEndRef = useRef<HTMLDivElement>(null);

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
      }, 800);
    } else {
      // Finalizar e enviar
      enviarFicha(novasRespostas, nextId + 1);
    }
  };

  const enviarFicha = async (resps: string[], lastId: number) => {
    setIsSending(true);
    setMessages((prev) => [...prev, { id: lastId, text: "", sender: "typing" }]);

    try {
      const respostasCompletas = perguntas.map((pergunta, idx) => ({
        pergunta,
        resposta: resps[idx] || "",
      }));

      await sendMatricula({
        data: {
          nome_completo: resps[0] || "Não informado",
          cpf: resps[1] || "",
          data_nascimento: resps[2] || "",
          rg_numero: resps[3] || "",
          rg_orgao_emissor: resps[4] || "",
          rg_data_emissao: resps[5] || "",
          naturalidade: resps[6] || "",
          nome_pai: resps[7] || "",
          nome_mae: resps[8] || "",
          cep: resps[9] || "",
          endereco_rua: resps[10] || "",
          endereco_bairro: resps[11] || "",
          endereco_cidade: resps[12] || "",
          endereco_estado: resps[13] || "",
          telefone: resps[14] || "",
          email: resps[15] || "",
          escolaridade: resps[16] || "",
          ano_conclusao: resps[17] || "",
          escola_anterior: resps[18] || "",
          curso_desejado: resps[19] || "",
          respostas_completas: respostasCompletas,
        },
      });

      setMessages((prev) =>
        prev
          .filter((m) => m.sender !== "typing")
          .concat({
            id: lastId + 1,
            text: "Matrícula recebida com sucesso! ✅\n\nTodos os seus dados foram registrados no sistema da nossa secretaria. Entraremos em contato em breve pelo número informado para dar continuidade!",
            sender: "bot"
          })
      );
    } catch (err: any) {
      console.error("Erro ao registrar matrícula:", err);
      setMessages((prev) =>
        prev
          .filter((m) => m.sender !== "typing")
          .concat({
            id: lastId + 1,
            text: "Ocorreu um erro ao salvar seus dados. ❌ Por favor, tente novamente ou entre em contato diretamente com nossa secretaria pelo WhatsApp.",
            sender: "bot"
          })
      );
    } finally {
      setIsSending(false);
    }
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
            src="/matricula/img/atendente-la-educacao-goiania.jpeg"
            alt="Ana Luiza - Atendente da LA Educação em Goiânia"
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

      <section className="sr-only">
        <h1>Matrícula Online — EJA, Ensino Médio, Ensino Fundamental e Cursos Profissionalizantes</h1>
        <p>
          Seja bem-vindo ao portal de pré-matrícula da LA Educação. Esta página foi projetada para que você possa iniciar sua inscrição de forma rápida e segura no <strong>supletivo EJA EAD</strong> ou em nossos <strong>cursos profissionalizantes com certificado</strong> reconhecido pelo MEC. Oferecemos suporte completo para moradores de <strong>Goiânia</strong>, <strong>Aparecida de Goiânia</strong>, <strong>Anápolis</strong>, <strong>Trindade</strong>, <strong>Senador Canedo</strong> e todo o estado de <strong>Goiás</strong>.
        </p>

        <h2>Como funciona o processo de matrícula online?</h2>
        <p>
          Nosso chat inteligente guiará você passo a passo para coletar as informações necessárias para a sua ficha de matrícula. Esse processo automatizado e humanizado facilita o envio de dados sem burocracia. Você informará dados como seu nome completo, CPF, RG, data de nascimento, endereço residencial com CEP e suas preferências de curso. O formulário é criptografado e enviado diretamente para a nossa secretaria escolar em Goiânia para processamento imediato.
        </p>

        <h2>Quais são os requisitos para matrícula na EJA (Educação de Jovens e Adultos) EAD?</h2>
        <p>
          Para ingressar na modalidade de jovens e adultos (EJA) do <strong>Ensino Fundamental EAD</strong>, o aluno deve ter idade mínima de 15 anos completos no ato da matrícula. Para ingressar no <strong>Ensino Médio EAD</strong> ou realizar o supletivo para conclusão de nível médio, a idade mínima exigida por lei é de 18 anos completos. Não há limite máximo de idade, e incentivamos todos que desejam retornar aos estudos a realizar a sua inscrição.
        </p>

        <h2>Quais documentos são exigidos para a homologação da matrícula?</h2>
        <p>
          Para concluir com sucesso seu processo e garantir a validade de sua certificação junto ao Ministério da Educação (MEC), os seguintes documentos deverão ser encaminhados para a nossa equipe de suporte pedagógico após o preenchimento do formulário inicial do chat:
        </p>
        <ul>
          <li>Cópia legível do Documento de Identidade (RG) e CPF.</li>
          <li>Comprovante de residência atualizado (Goiânia, Aparecida de Goiânia ou região de Goiás).</li>
          <li>Histórico Escolar anterior da última série concluída (para aproveitamento de matérias).</li>
          <li>Certidão de Nascimento ou de Casamento.</li>
          <li>Título de Eleitor e comprovante de quitação eleitoral (para maiores de 18 anos).</li>
        </ul>

        <h2>Cursos Profissionalizantes de Alta Empregabilidade em Goiás</h2>
        <p>
          A LA Educação também oferece matrículas abertas para diversos <strong>cursos profissionalizantes em Goiânia</strong> e <strong>cursos profissionalizantes em Aparecida de Goiânia</strong>, ideais para quem busca rápida inserção ou recolocação no mercado de trabalho de Goiás. Nossos programas mais populares contam com suporte online e certificado oficial:
        </p>
        <ul>
          <li><strong>Curso de Administração</strong>: Foco em gestão empresarial, contabilidade básica, fluxo de caixa e rotinas de escritório comerciais em Goiânia e região.</li>
          <li><strong>Curso de Cuidador de Idosos</strong>: Qualificação voltada para primeiros socorros, acompanhamento de saúde física e mental e atendimento de idosos com dedicação e profissionalismo.</li>
          <li><strong>Curso de Atendente de Farmácia</strong>: Capacitação para trabalhar no comércio farmacêutico, organizando medicamentos, interpretando receitas e prestando excelente atendimento.</li>
          <li><strong>Curso de Recepcionista</strong>: Desenvolva habilidades de atendimento telefônico, recepção de clientes, etiqueta corporativa e organização de agendas.</li>
          <li><strong>Curso de Informática</strong>: Essencial para qualquer vaga de emprego. Aprenda Word, Excel, navegação corporativa e ferramentas administrativas.</li>
        </ul>

        <h2>Reconhecimento MEC e Validade Nacional do Certificado</h2>
        <p>
          Todos os cursos oferecidos pela LA Educação e suas instituições parceiras credenciadas são integralmente regulamentados e autorizados pelo MEC. O certificado emitido após a conclusão do EJA ou Supletivo EAD possui validade nacional equivalente à do ensino regular presencial. Com ele, você poderá se candidatar a vagas de emprego que exigem o ensino médio ou fundamental completo, inscrever-se em cursos técnicos, realizar exames vestibulares, prestar o ENEM (Exame Nacional do Ensino Médio) ou ingressar na Faculdade / Ensino Superior EAD ou presencial.
        </p>

        <h2>Polo de Atendimento e Atendimento Humanizado</h2>
        <p>
          Nosso polo de apoio ao estudante em Goiânia, Goiás, garante total retaguarda pedagógica e administrativa. Se você tiver qualquer dúvida durante o preenchimento do seu cadastro de matrícula, ou precisar de informações adicionais sobre os cursos e mensalidades, pode entrar em contato conosco pelo WhatsApp (62) 99659-2952 de segunda a sexta-feira, das 08h às 18h. A LA Educação está comprometida em transformar vidas através de um ensino digital acessível e de extrema qualidade.
        </p>
      </section>
    </div>
  );
}
