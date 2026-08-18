-- Tabela de Matrículas / Inscrições Online
CREATE TABLE public.matriculas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'pendente', -- 'pendente', 'em_atendimento', 'matriculado', 'cancelado'
  nome_completo TEXT NOT NULL,
  cpf TEXT NOT NULL,
  data_nascimento TEXT DEFAULT '',
  rg_numero TEXT DEFAULT '',
  rg_orgao_emissor TEXT DEFAULT '',
  rg_data_emissao TEXT DEFAULT '',
  naturalidade TEXT DEFAULT '',
  nome_pai TEXT DEFAULT '',
  nome_mae TEXT DEFAULT '',
  cep TEXT DEFAULT '',
  endereco_rua TEXT DEFAULT '',
  endereco_bairro TEXT DEFAULT '',
  endereco_cidade TEXT DEFAULT '',
  endereco_estado TEXT DEFAULT '',
  telefone TEXT DEFAULT '',
  email TEXT DEFAULT '',
  escolaridade TEXT DEFAULT '',
  ano_conclusao TEXT DEFAULT '',
  escola_anterior TEXT DEFAULT '',
  curso_desejado TEXT DEFAULT '',
  observacoes TEXT DEFAULT '',
  respostas_completas JSONB DEFAULT '[]'::jsonb
);

CREATE INDEX matriculas_status_idx ON public.matriculas (status);
CREATE INDEX matriculas_created_at_idx ON public.matriculas (created_at DESC);
CREATE INDEX matriculas_cpf_idx ON public.matriculas (cpf);

ALTER TABLE public.matriculas ENABLE ROW LEVEL SECURITY;

-- Permitir que qualquer visitante insira sua ficha de matrícula
CREATE POLICY "Public insert matriculas" ON public.matriculas
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Leitura e manipulação restrita a administradores
CREATE POLICY "Admins full access to matriculas" ON public.matriculas
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
