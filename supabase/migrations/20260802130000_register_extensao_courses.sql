-- Migration to register new Extensão Universitária category and courses

-- 1. Insert new Category
INSERT INTO public.course_categories (
  name, slug, sort_order, price_original, price_current, price_installments, display_installments
) VALUES (
  'Extensão Universitária', 
  'extensao-universitaria', 
  0, 
  NULL, 
  199.90, 
  NULL, 
  false
) ON CONFLICT (name) DO NOTHING;

-- 2. Insert new Extensão Universitária courses
INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-ext-1', 
  'psicologia-da-aprendizagem-e-do-desenvolvimento', 
  'manual://manual-ext-1', 
  'Psicologia da Aprendizagem e do Desenvolvimento', 
  '', 
  '/img/extensao/1762789098279-50fe2fd0-c530-4085-8863-7b5616ecf7fd.png', 
  'Extensão Universitária', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-ext-2', 
  'psicomotricidade-na-educacao-especial', 
  'manual://manual-ext-2', 
  'Psicomotricidade na Educação Especial', 
  '', 
  '/img/extensao/1762789098293-9caf6b6e-9b6e-481d-8448-5c2855bac336.png', 
  'Extensão Universitária', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-ext-3', 
  'educacao-especial-e-a-inclusao-escolar', 
  'manual://manual-ext-3', 
  'Educação Especial e a Inclusão Escolar', 
  '', 
  '/img/extensao/1762789098329-3169d453-24d0-4ae8-943a-f9477e9ecad4.png', 
  'Extensão Universitária', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-ext-4', 
  'tecnologias-e-aprendizado', 
  'manual://manual-ext-4', 
  'Tecnologias e Aprendizado', 
  '', 
  '/img/extensao/1762789098365-9dbf8da6-6196-4893-b8fd-72cb884c9704.png', 
  'Extensão Universitária', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-ext-5', 
  'transtorno-do-espectro-autista', 
  'manual://manual-ext-5', 
  'Transtorno do Espectro Autista', 
  '', 
  '/img/extensao/1762789098409-635150c8-899d-42b0-a7e2-7b0d81ea8029.png', 
  'Extensão Universitária', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-ext-6', 
  'aba-analise-do-comportamento-aplicada', 
  'manual://manual-ext-6', 
  'ABA - Análise do Comportamento Aplicada', 
  '', 
  '/img/extensao/1762789098429-3c12a719-2e8d-46cc-970f-ece884999253.png', 
  'Extensão Universitária', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-ext-7', 
  'interprete-de-libras-em-sala-de-aula', 
  'manual://manual-ext-7', 
  'Intérprete de Libras em Sala de Aula', 
  '', 
  '/img/extensao/1762789098454-1b025544-7fa8-4891-bc98-c6110ec61186.png', 
  'Extensão Universitária', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-ext-8', 
  'politicas-educacionais-e-gestao', 
  'manual://manual-ext-8', 
  'Políticas Educacionais e Gestão', 
  '', 
  '/img/extensao/1762789098459-f056ea90-81de-44a2-bed1-40ec43144b15.png', 
  'Extensão Universitária', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-ext-9', 
  'educacao-basica-e-o-letramento-digital', 
  'manual://manual-ext-9', 
  'Educação Básica e o Letramento Digital', 
  '', 
  '/img/extensao/1762789098466-c46c21a3-0a36-416a-a3d2-ed1c82762c81.png', 
  'Extensão Universitária', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-ext-10', 
  'educacao-em-direitos-humanos', 
  'manual://manual-ext-10', 
  'Educação em Direitos Humanos', 
  '', 
  '/img/extensao/1762789098472-1f1c1656-27df-497b-b0eb-8298a7ee9d77.png', 
  'Extensão Universitária', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-ext-11', 
  'autismo-infantil-sindrome-de-asperger-e-rett', 
  'manual://manual-ext-11', 
  'Autismo Infantil, Síndrome de Asperger e Rett', 
  '', 
  '/img/extensao/1762789098538-966e4721-ac1d-47ff-b546-cd3398f57bcd.png', 
  'Extensão Universitária', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-ext-12', 
  'modelo-educacional-hibrido', 
  'manual://manual-ext-12', 
  'Modelo Educacional Híbrido', 
  '', 
  '/img/extensao/1762789098580-c264fe98-b086-4bd6-8ad7-3999bbce369e.png', 
  'Extensão Universitária', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-ext-13', 
  'atuacao-docente-na-educacao-inclusiva', 
  'manual://manual-ext-13', 
  'Atuação Docente na Educação Inclusiva', 
  '', 
  '/img/extensao/1762789098649-52cb98aa-6582-41d1-812b-e3231207d105.png', 
  'Extensão Universitária', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-ext-14', 
  'historia-da-educacao-especial-e-inclusiva-no-brasil', 
  'manual://manual-ext-14', 
  'História da Educação Especial e Inclusiva no Brasil', 
  '', 
  '/img/extensao/1762789098651-378a9c14-d36f-4310-8747-c2f9bad214e0.png', 
  'Extensão Universitária', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-ext-15', 
  'educacao-e-as-tics', 
  'manual://manual-ext-15', 
  'Educação e as TICs', 
  '', 
  '/img/extensao/1762789098659-c83a4f27-83ef-4670-9aff-848cd414ecf0.png', 
  'Extensão Universitária', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

