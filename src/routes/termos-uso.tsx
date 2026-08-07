import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/termos-uso")({
  component: TermosUsoPage,
  head: () => ({
    title: "Termos de Uso | LA Educação",
    meta: [
      { name: "description", content: "Termos e condições de uso dos serviços educacionais oferecidos pela LA Educação em seu ambiente digital." }
    ],
    links: [{ rel: "canonical", href: "https://www.laeducacaogo.com.br/termos-uso" }]
  })
});

function TermosUsoPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-neutral-800">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative bg-[#1a237e] text-white pt-32 pb-16 px-5 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
            Termos de Uso
          </h1>
          <p className="text-sm text-neutral-300">Última atualização: Agosto de 2026</p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 px-5 max-w-3xl mx-auto prose prose-neutral">
        <p className="text-neutral-600 leading-relaxed mb-6">
          Seja bem-vindo ao portal da LA Educação. Ao navegar em nosso site, preencher formulários de pré-matrícula ou contratar nossos serviços de conclusão escolar EJA, supletivos e qualificações técnicas, você aceita e concorda em cumprir as condições dispostas nestes Termos de Uso.
        </p>

        <h3 className="text-xl font-bold text-[#1a237e] mt-8 mb-4">1. Elegibilidade e Cadastro</h3>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Para contratar nossos serviços educacionais na modalidade de Educação de Jovens e Adultos (EJA) ou Supletivos EAD, você declara ter a idade mínima legal exigida pela legislação brasileira:
        </p>
        <ul className="list-disc pl-6 text-neutral-600 space-y-2 mb-6">
          <li><strong>Ensino Fundamental</strong>: Mínimo de 15 anos completos;</li>
          <li><strong>Ensino Médio</strong>: Mínimo de 18 anos completos.</li>
        </ul>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Você se compromete a fornecer dados pessoais verdadeiros, precisos e atualizados em nossos formulários de matrícula digital, sendo inteiramente responsável por qualquer inconsistência cadastral.
        </p>

        <h3 className="text-xl font-bold text-[#1a237e] mt-8 mb-4">2. Propriedade Intelectual e Acesso ao AVA</h3>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Todo o material didático digital (vídeo-aulas, apostilas em PDF, simulados pedagógicos e imagens) disponibilizado em nosso Ambiente Virtual de Aprendizagem (AVA) é de propriedade intelectual exclusiva da LA Educação e de suas instituições de ensino parceiras credenciadas. É estritamente proibida a reprodução, distribuição, revenda ou cópia não autorizada destes conteúdos.
        </p>

        <h3 className="text-xl font-bold text-[#1a237e] mt-8 mb-4">3. Emissão e Validação do Certificado</h3>
        <p className="text-neutral-600 leading-relaxed mb-6">
          A LA Educação atua como polo licenciado de intermediação e suporte pedagógico de escolas credenciadas aptas a emitir diplomas de Ensino Médio e Fundamental reconhecidos e autorizados pelos Conselhos Estaduais de Educação e Ministério da Educação (MEC). Para a emissão legal da certificação, o aluno deverá cumprir as disciplinas curriculares obrigatórias e atingir as notas de aprovação mínimas exigidas nas provas pedagógicas correspondentes.
        </p>

        <h3 className="text-xl font-bold text-[#1a237e] mt-8 mb-4">4. Conduta do Usuário</h3>
        <p className="text-neutral-600 leading-relaxed mb-6">
          O estudante compromete-se a manter uma conduta ética e civilizada nos canais de comunicação com nossos professores, tutores pedagógicos e equipes de atendimento administrativo. Tentativas de fraude nas provas virtuais ou o fornecimento de documentos escolares e de identificação falsos importarão no cancelamento automático do curso e aplicação das medidas penais e civis aplicáveis.
        </p>

        <h3 className="text-xl font-bold text-[#1a237e] mt-8 mb-4">5. Política de Cancelamento</h3>
        <p className="text-neutral-600 leading-relaxed mb-6">
          O aluno possui o direito de arrependimento e cancelamento de sua matrícula em até 7 (sete) dias corridos após a contratação do curso, com direito a reembolso integral dos valores pagos, em conformidade com o Código de Defesa do Consumidor. Cancelamentos solicitados após esse prazo deverão observar as regras contratuais de rescisão específicas de cada curso.
        </p>

        <h3 className="text-xl font-bold text-[#1a237e] mt-8 mb-4">6. Limitação de Responsabilidades</h3>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Fazemos todos os esforços técnicos para manter nosso site e plataformas de estudos EAD operacionais continuamente. No entanto, não nos responsabilizamos por instabilidades temporárias de servidores externos de internet ou falhas técnicas decorrentes das operadoras de telecomunicação do próprio usuário.
        </p>
      </section>

      <SiteFooter />
    </div>
  );
}
