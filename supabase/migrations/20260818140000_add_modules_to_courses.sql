-- Adiciona coluna de módulos / grade curricular na tabela courses
ALTER TABLE public.courses 
ADD COLUMN IF NOT EXISTS modules JSONB DEFAULT '[]'::jsonb;
