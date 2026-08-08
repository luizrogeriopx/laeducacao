export type EjaCard = { icon: string; title: string; desc: string };
export type EjaFaq = { q: string; a: string };
export type EjaTestimonial = { name: string; city: string; text: string };

export type EjaConfig = {
  seo_title: string;
  seo_description: string;
  seo_keywords: string;

  whatsapp_number: string;
  whatsapp_display: string;
  whatsapp_message: string;

  hero_h1: string;
  hero_sub: string;
  hero_badges: string[];
  hero_cta: string;

  ident_title: string;
  ident_text: string;
  ident_cta: string;

  why_title: string;
  why_cards: EjaCard[];

  how_title: string;
  how_steps: EjaCard[];

  who_title: string;
  who_items: string[];

  offer_title: string;
  offer_subtitle: string;
  offer_price: string;
  offer_installment: string;
  offer_note: string;
  offer_cta: string;

  diff_title: string;
  diff_cards: EjaCard[];

  social_title: string;
  testimonials: EjaTestimonial[];

  faq_title: string;
  faqs: EjaFaq[];

  goiania_title: string;
  goiania_text: string;
  aparecida_title: string;
  aparecida_text: string;

  final_title: string;
  final_text: string;
  final_cta: string;
};

export const EJA_DEFAULT: EjaConfig = {
  seo_title: "EJA Online em Goiânia e Aparecida de Goiânia | LA Educação",
  seo_description:
    "EJA online em Goiânia e Aparecida de Goiânia. Conclua o Ensino Fundamental ou Médio estudando pelo celular, com suporte no WhatsApp e pagamento facilitado em 10x de R$ 99,90 no boleto.",
  seo_keywords:
    "EJA Goiânia, EJA em Goiânia, EJA online Goiânia, Supletivo Goiânia, Supletivo em Goiânia, EJA Aparecida de Goiânia, EJA online Aparecida, Supletivo Aparecida de Goiânia, EJA online, EJA ensino médio, EJA ensino fundamental",

  whatsapp_number: "5562996592952",
  whatsapp_display: "(62) 99659-2952",
  whatsapp_message: "Olá! Quero fazer minha matrícula na EJA.",

  hero_h1: "EJA Online em Goiânia e Aparecida de Goiânia",
  hero_sub:
    "Conclua seus estudos com a Educação de Jovens e Adultos de forma prática, com acompanhamento e flexibilidade para estudar.",
  hero_badges: [
    "EJA 100% Online",
    "Ensino Fundamental e Médio",
    "Estude de onde estiver",
    "Estude pelo celular, tablet, computador ou notebook",
    "Atendimento pelo WhatsApp",
    "Matrícula rápida",
    "Pagamento facilitado",
    "Escola credenciada ao MEC",
    "Conclusão em até 90 dias",
  ],
  hero_cta: "QUERO FAZER MINHA MATRÍCULA",

  ident_title: "Você parou de estudar e precisa concluir seus estudos?",
  ident_text:
    "Se você não concluiu o Ensino Fundamental ou Médio e precisa do certificado para trabalhar, fazer um curso técnico, prestar concurso ou continuar seus estudos, a EJA pode ser uma alternativa para você.",
  ident_cta: "Falar com um consultor",

  why_title: "Termine seus estudos de forma mais prática",
  why_cards: [
    { icon: "📱", title: "Estude Online", desc: "Acesse seus conteúdos pelo celular, tablet ou computador." },
    { icon: "⏰", title: "Flexibilidade", desc: "Organize seus estudos de acordo com sua rotina." },
    { icon: "📚", title: "Ensino Fundamental e Médio", desc: "Opções para diferentes necessidades educacionais." },
    { icon: "👨‍🏫", title: "Acompanhamento", desc: "Conte com suporte durante sua jornada." },
    { icon: "🎓", title: "Conclusão dos estudos", desc: "Prepare-se para avançar profissionalmente e academicamente." },
  ],

  how_title: "Veja como é simples começar",
  how_steps: [
    { icon: "1️⃣", title: "Faça seu cadastro", desc: "Entre em contato e informe seus dados." },
    { icon: "2️⃣", title: "Realize sua matrícula", desc: "Nossa equipe orientará você sobre documentação e procedimentos." },
    { icon: "3️⃣", title: "Acesse a plataforma", desc: "Estude através do ambiente virtual." },
    { icon: "4️⃣", title: "Conclua sua formação", desc: "Cumpra os requisitos acadêmicos da instituição." },
    {
      icon: "5️⃣",
      title: "Receba sua documentação",
      desc: "Após cumprir todos os requisitos, siga os procedimentos da instituição para emissão da documentação escolar.",
    },
  ],

  who_title: "A EJA pode ser para você se...",
  who_items: [
    "Você não concluiu o Ensino Fundamental;",
    "Você não concluiu o Ensino Médio;",
    "Precisa concluir os estudos;",
    "Quer melhorar suas oportunidades profissionais;",
    "Precisa continuar sua formação;",
    "Trabalha e precisa de flexibilidade para estudar.",
  ],

  offer_title: "Comece sua EJA hoje",
  offer_subtitle: "EJA 100% Online",
  offer_price: "10x de R$ 99,90",
  offer_installment: "PARCELAMENTO NO BOLETO MENSAL: 1 parcela no ato da matrícula por PIX + 9 boletos mensais.",
  offer_note:
    "Condições sujeitas a análise e aos requisitos de elegibilidade da instituição. Podem ser aplicadas taxas administrativas e exigida documentação escolar. Consulte nossa equipe antes de efetivar a matrícula.",
  offer_cta: "QUERO GARANTIR MINHA VAGA",

  diff_title: "Por que escolher a LA Educação?",
  diff_cards: [
    { icon: "⭐", title: "Atendimento personalizado", desc: "" },
    { icon: "📱", title: "Plataforma online", desc: "" },
    { icon: "📚", title: "Material de estudo", desc: "" },
    { icon: "💬", title: "Suporte pelo WhatsApp", desc: "" },
    { icon: "🔐", title: "Ambiente seguro", desc: "" },
    { icon: "📍", title: "Atendimento em Goiânia e Aparecida de Goiânia", desc: "" },
  ],

  social_title: "Quem já estudou com a gente, recomenda",
  testimonials: [],

  faq_title: "Perguntas frequentes sobre EJA",
  faqs: [
    {
      q: "O que é EJA?",
      a: "EJA é a Educação de Jovens e Adultos, uma modalidade de ensino voltada a quem não concluiu o Ensino Fundamental ou Médio na idade regular e deseja retomar e concluir os estudos.",
    },
    {
      q: "Quem pode fazer EJA?",
      a: "Podem cursar a EJA pessoas que atendam à idade mínima exigida pela legislação e pela instituição: a partir de 15 anos para o Ensino Fundamental e a partir de 18 anos para o Ensino Médio.",
    },
    {
      q: "A EJA pode ser feita online?",
      a: "Sim. Na LA Educação o acompanhamento é feito na modalidade online, com conteúdos e atividades acessíveis pelo ambiente virtual, conforme as regras da instituição responsável.",
    },
    {
      q: "A EJA é reconhecida?",
      a: "A documentação escolar é emitida por instituição credenciada junto ao órgão de educação competente. Nossa equipe informa os dados de credenciamento antes da matrícula.",
    },
    {
      q: "Quanto tempo leva para concluir?",
      a: "O tempo varia conforme o ritmo do aluno e o cumprimento dos requisitos acadêmicos da instituição. Consulte nossa equipe para saber os prazos aplicáveis ao seu caso.",
    },
    {
      q: "Preciso fazer provas?",
      a: "Sim. É necessário cumprir as atividades e avaliações previstas pela instituição para a conclusão de cada etapa.",
    },
    {
      q: "Quais documentos são necessários?",
      a: "Em geral são solicitados documento de identidade com foto, CPF, comprovante de endereço e histórico escolar da última etapa cursada. A lista completa é confirmada no atendimento.",
    },
    {
      q: "A EJA oferece Ensino Fundamental e Médio?",
      a: "Sim, há opções para conclusão do Ensino Fundamental e do Ensino Médio.",
    },
    {
      q: "Posso fazer EJA trabalhando?",
      a: "Sim. Os estudos são organizados de forma flexível, para que você possa conciliar com trabalho e rotina pessoal.",
    },
    {
      q: "Como faço minha matrícula?",
      a: "Fale com nossa equipe pelo WhatsApp. Você recebe todas as orientações sobre documentação, condições de pagamento e liberação do acesso à plataforma.",
    },
  ],

  goiania_title: "EJA em Goiânia",
  goiania_text:
    "Está procurando por EJA em Goiânia? A LA Educação oferece atendimento para estudantes de Goiânia e região, com uma modalidade pensada para quem precisa conciliar os estudos com trabalho, família e outras atividades. Se você busca EJA online Goiânia ou supletivo em Goiânia, nossa equipe explica como funciona a matrícula, a documentação e o acesso à plataforma de estudos.",
  aparecida_title: "EJA em Aparecida de Goiânia",
  aparecida_text:
    "Para quem mora em Aparecida de Goiânia e região e procura uma alternativa para concluir os estudos, a EJA pode oferecer mais flexibilidade para conciliar a formação com a rotina. Atendemos quem busca EJA em Aparecida de Goiânia, EJA online Aparecida e supletivo em Aparecida de Goiânia, com suporte pelo WhatsApp do início ao fim.",

  final_title: "Está pronto para concluir seus estudos?",
  final_text: "Fale agora com nossa equipe e descubra como funciona a matrícula na EJA.",
  final_cta: "QUERO SABER MAIS PELO WHATSAPP",
};

export function ejaWhatsappLink(cfg: EjaConfig, message?: string) {
  return `https://wa.me/${cfg.whatsapp_number}?text=${encodeURIComponent(message ?? cfg.whatsapp_message)}`;
}
