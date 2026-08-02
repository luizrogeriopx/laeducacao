-- Migration to register new technical courses and update existing covers

-- 1. Update cover images for existing technical courses
UPDATE public.courses SET image = '/img/tecnicos/TEC3.jpeg' WHERE title ILIKE '%segurança do trabalho%' AND category = 'Técnicos';
UPDATE public.courses SET image = '/img/tecnicos/TEC24.png' WHERE title ILIKE '%refrigeração%' AND category = 'Técnicos';
UPDATE public.courses SET image = '/img/tecnicos/TEC36.png' WHERE (title ILIKE '%transações imobiliárias%' OR title ILIKE '%tti%') AND category = 'Técnicos';

-- 2. Insert new technical courses
INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-tec-1', 
  'tecnico-em-desenvolvimento-de-sistemas', 
  'manual://manual-tec-1', 
  'Técnico em Desenvolvimento de Sistemas', 
  '', 
  '/img/tecnicos/TEC1.jpeg', 
  'Técnicos', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-tec-2', 
  'tecnico-em-eletrotecnica-12-meses', 
  'manual://manual-tec-2', 
  'Técnico em Eletrotécnica (12 Meses)', 
  '', 
  '/img/tecnicos/TEC2.jpeg', 
  'Técnicos', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-tec-3', 
  'tecnico-em-logistica', 
  'manual://manual-tec-3', 
  'Técnico em Logística', 
  '', 
  '/img/tecnicos/TEC5.jpeg', 
  'Técnicos', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-tec-4', 
  'tecnico-em-analises-clinicas', 
  'manual://manual-tec-4', 
  'Técnico em Análises Clínicas', 
  '', 
  '/img/tecnicos/TEC7.jpeg', 
  'Técnicos', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-tec-5', 
  'tecnico-em-enfermagem', 
  'manual://manual-tec-5', 
  'Técnico em Enfermagem', 
  '', 
  '/img/tecnicos/TEC8.jpeg', 
  'Técnicos', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-tec-6', 
  'tecnico-em-radiologia', 
  'manual://manual-tec-6', 
  'Técnico em Radiologia', 
  '', 
  '/img/tecnicos/TEC9.jpeg', 
  'Técnicos', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-tec-7', 
  'tecnico-em-agente-comunitario-de-saude', 
  'manual://manual-tec-7', 
  'Técnico em Agente Comunitário de Saúde', 
  '', 
  '/img/tecnicos/TEC12.png', 
  'Técnicos', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-tec-8', 
  'tecnico-em-veterinaria', 
  'manual://manual-tec-8', 
  'Técnico em Veterinária', 
  '', 
  '/img/tecnicos/TEC13.png', 
  'Técnicos', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-tec-9', 
  'tecnico-em-papel-e-celulose-6-meses', 
  'manual://manual-tec-9', 
  'Técnico em Papel e Celulose (6 Meses)', 
  '', 
  '/img/tecnicos/TEC14.png', 
  'Técnicos', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-tec-10', 
  'tecnico-em-eletroeletronica-12-meses', 
  'manual://manual-tec-10', 
  'Técnico em Eletroeletrônica (12 Meses)', 
  '', 
  '/img/tecnicos/TEC15.png', 
  'Técnicos', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-tec-11', 
  'tecnico-em-papel-e-celulose-12-meses', 
  'manual://manual-tec-11', 
  'Técnico em Papel e Celulose (12 Meses)', 
  '', 
  '/img/tecnicos/TEC16.png', 
  'Técnicos', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-tec-12', 
  'tecnico-em-mineracao-12-meses', 
  'manual://manual-tec-12', 
  'Técnico em Mineração (12 Meses)', 
  '', 
  '/img/tecnicos/TEC18.png', 
  'Técnicos', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-tec-13', 
  'tecnico-em-administracao-12-meses', 
  'manual://manual-tec-13', 
  'Técnico em Administração (12 Meses)', 
  '', 
  '/img/tecnicos/TEC20.png', 
  'Técnicos', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-tec-14', 
  'tecnico-em-eletromecanica', 
  'manual://manual-tec-14', 
  'Técnico em Eletromecânica', 
  '', 
  '/img/tecnicos/TEC22.png', 
  'Técnicos', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-tec-15', 
  'tecnico-em-farmacia-6-meses', 
  'manual://manual-tec-15', 
  'Técnico em Farmácia (6 Meses)', 
  '', 
  '/img/tecnicos/TEC23.png', 
  'Técnicos', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-tec-16', 
  'tecnico-em-mecanica-12-meses', 
  'manual://manual-tec-16', 
  'Técnico em Mecânica (12 Meses)', 
  '', 
  '/img/tecnicos/TEC25.png', 
  'Técnicos', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-tec-17', 
  'tecnico-em-meio-ambiente-12-meses', 
  'manual://manual-tec-17', 
  'Técnico em Meio Ambiente (12 Meses)', 
  '', 
  '/img/tecnicos/TEC26.png', 
  'Técnicos', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-tec-18', 
  'tecnico-em-cuidador-de-idosos', 
  'manual://manual-tec-18', 
  'Técnico em Cuidador de Idosos', 
  '', 
  '/img/tecnicos/TEC27.png', 
  'Técnicos', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-tec-19', 
  'tecnico-em-estetica', 
  'manual://manual-tec-19', 
  'Técnico em Estética', 
  '', 
  '/img/tecnicos/TEC28.png', 
  'Técnicos', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-tec-20', 
  'tecnico-em-informatica', 
  'manual://manual-tec-20', 
  'Técnico em Informática', 
  '', 
  '/img/tecnicos/TEC29.png', 
  'Técnicos', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-tec-21', 
  'tecnico-em-teologia', 
  'manual://manual-tec-21', 
  'Técnico em Teologia', 
  '', 
  '/img/tecnicos/TEC33.png', 
  'Técnicos', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-tec-22', 
  'tecnico-em-secretaria-escolar-12-meses', 
  'manual://manual-tec-22', 
  'Técnico em Secretaria Escolar (12 Meses)', 
  '', 
  '/img/tecnicos/TEC35.png', 
  'Técnicos', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-tec-23', 
  'tecnico-em-telecomunicacoes-6-meses', 
  'manual://manual-tec-23', 
  'Técnico em Telecomunicações (6 Meses)', 
  '', 
  '/img/tecnicos/TEC37.png', 
  'Técnicos', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-tec-24', 
  'tecnico-em-mecanica-6-meses', 
  'manual://manual-tec-24', 
  'Técnico em Mecânica (6 Meses)', 
  '', 
  '/img/tecnicos/TEC38.png', 
  'Técnicos', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-tec-25', 
  'tecnico-em-meio-ambiente-6-meses', 
  'manual://manual-tec-25', 
  'Técnico em Meio Ambiente (6 Meses)', 
  '', 
  '/img/tecnicos/TEC39.png', 
  'Técnicos', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-tec-26', 
  'tecnico-em-edificacoes-6-meses', 
  'manual://manual-tec-26', 
  'Técnico em Edificações (6 Meses)', 
  '', 
  '/img/tecnicos/TEC40.png', 
  'Técnicos', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-tec-27', 
  'tecnico-em-eletroeletronica-6-meses', 
  'manual://manual-tec-27', 
  'Técnico em Eletroeletrônica (6 Meses)', 
  '', 
  '/img/tecnicos/TEC41.png', 
  'Técnicos', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-tec-28', 
  'tecnico-em-mineracao-6-meses', 
  'manual://manual-tec-28', 
  'Técnico em Mineração (6 Meses)', 
  '', 
  '/img/tecnicos/TEC43.png', 
  'Técnicos', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-tec-29', 
  'tecnico-em-eletrotecnica-6-meses', 
  'manual://manual-tec-29', 
  'Técnico em Eletrotécnica (6 Meses)', 
  '', 
  '/img/tecnicos/TEC44.png', 
  'Técnicos', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-tec-30', 
  'tecnico-em-administracao-6-meses', 
  'manual://manual-tec-30', 
  'Técnico em Administração (6 Meses)', 
  '', 
  '/img/tecnicos/TEC45.png', 
  'Técnicos', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-tec-31', 
  'tecnico-em-farmacia-6-meses-crf', 
  'manual://manual-tec-31', 
  'Técnico em Farmácia (6 Meses) - CRF', 
  '', 
  '/img/tecnicos/TEC47.png', 
  'Técnicos', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-tec-32', 
  'tecnico-em-secretaria-escolar-6-meses', 
  'manual://manual-tec-32', 
  'Técnico em Secretaria Escolar (6 Meses)', 
  '', 
  '/img/tecnicos/TEC50.png', 
  'Técnicos', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

