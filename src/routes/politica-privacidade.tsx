import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/politica-privacidade")({
  component: PoliticaPrivacidadePage,
  head: () => ({
    title: "Política de Privacidade | LA Educação",
    meta: [
      { name: "description", content: "Política de Privacidade da LA Educação. Saiba como coletamos, protegemos e utilizamos os dados pessoais de nossos alunos e usuários, em conformidade com a LGPD." }
    ],
    links: [{ rel: "canonical", href: "https://www.laeducacaogo.com.br/politica-privacidade" }]
  })
});

function PoliticaPrivacidadePage() {
  return (
    <div className="min-h-screen bg-white font-sans text-neutral-800">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative bg-[#1a237e] text-white pt-32 pb-16 px-5 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
            Política de Privacidade
          </h1>
          <p className="text-sm text-neutral-300">Última atualização: Agosto de 2026</p>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-16 px-5 max-w-3xl mx-auto prose prose-neutral">
        <p className="text-neutral-600 leading-relaxed mb-6">
          A LA Educação está comprometida com a proteção de sua privacidade e de seus dados pessoais. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos as informações fornecidas por alunos, potenciais alunos e visitantes do nosso site [https://laeducacaogo.com.br](https://laeducacaogo.com.br), em conformidade com a Lei Geral de Proteção de Dados (LGPD) — Lei nº 13.709/2018.
        </p>

        <h3 className="text-xl font-bold text-[#1a237e] mt-8 mb-4">1. Informações que Coletamos</h3>
        <p className="text-neutral-600 leading-relaxed mb-4">
          Coletamos informações pessoais que você nos fornece voluntariamente ao interagir com nosso site, preencher formulários de matrícula ou entrar em contato através de canais de atendimento, tais como:
        </p>
        <ul className="list-disc pl-6 text-neutral-600 space-y-2 mb-6">
          <li><strong>Dados de identificação</strong>: Nome completo, CPF, RG, data de nascimento;</li>
          <li><strong>Dados de contato</strong>: Telefone, endereço de e-mail, endereço residencial completo;</li>
          <li><strong>Dados acadêmicos</strong>: Histórico escolar anterior, grau de escolaridade;</li>
          <li><strong>Dados de navegação</strong>: Endereço IP, cookies e dados sobre as páginas que você visitou em nosso portal.</li>
        </ul>

        <h3 className="text-xl font-bold text-[#1a237e] mt-8 mb-4">2. Finalidade do Tratamento de Dados</h3>
        <p className="text-neutral-600 leading-relaxed mb-4">
          Tratamos seus dados pessoais de forma segura e ética para fins legítimos e específicos, que incluem:
        </p>
        <ul className="list-disc pl-6 text-neutral-600 space-y-2 mb-6">
          <li>Processamento e efetivação de sua pré-matrícula escolar e matrícula definitiva nos cursos;</li>
          <li>Prestação de suporte pedagógico e administrativo através do WhatsApp ou e-mail;</li>
          <li>Emissão e validação legal do certificado de conclusão dos estudos e cursos profissionalizantes;</li>
          <li>Envio de comunicações importantes sobre o curso e novidades educacionais (com possibilidade de cancelamento a qualquer momento);</li>
          <li>Cumprimento de obrigações legais impostas pelos Conselhos Estaduais de Educação e órgãos do MEC.</li>
        </ul>

        <h3 className="text-xl font-bold text-[#1a237e] mt-8 mb-4">3. Compartilhamento de Dados</h3>
        <p className="text-neutral-600 leading-relaxed mb-6">
          A LA Educação não vende ou comercializa seus dados pessoais sob nenhuma hipótese. Seus dados poderão ser compartilhados unicamente com:
        </p>
        <ul className="list-disc pl-6 text-neutral-600 space-y-2 mb-6">
          <li>Nossas instituições parceiras e polos autorizados de ensino que emitem oficialmente as certificações escolares;</li>
          <li>Provedores de tecnologia e sistemas de gerenciamento que operam sob rigorosos contratos de confidencialidade;</li>
          <li>Autoridades públicas governamentais, quando exigido por lei ou decisão judicial.</li>
        </ul>

        <h3 className="text-xl font-bold text-[#1a237e] mt-8 mb-4">4. Segurança de suas Informações</h3>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Implementamos medidas técnicas e organizacionais adequadas para proteger os seus dados pessoais contra perdas, uso não autorizado, acessos indevidos, alterações ou vazamentos. Todos os dados coletados nos nossos formulários são transmitidos sob protocolos criptografados (SSL/HTTPS).
        </p>

        <h3 className="text-xl font-bold text-[#1a237e] mt-8 mb-4">5. Seus Direitos como Titular</h3>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Nos termos da LGPD, você possui o direito de confirmar a existência de tratamento de dados, obter acesso aos seus dados pessoais, solicitar correções de informações incompletas ou desatualizadas, bem como requerer a exclusão ou portabilidade de seus dados, enviando e-mail para nossa equipe de atendimento.
        </p>

        <h3 className="text-xl font-bold text-[#1a237e] mt-8 mb-4">6. Cookies</h3>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Utilizamos cookies para melhorar o desempenho do site, analisar o tráfego de usuários e direcionar anúncios de acordo com seus interesses. Você pode gerenciar a ativação de cookies alterando as configurações do seu navegador de internet.
        </p>

        <h3 className="text-xl font-bold text-[#1a237e] mt-8 mb-4">7. Alterações nesta Política</h3>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Esta Política de Privacidade poderá ser atualizada periodicamente para refletir melhorias técnicas ou alterações nas legislações educacionais e de privacidade brasileiras.
        </p>
      </section>

      <SiteFooter />
    </div>
  );
}
