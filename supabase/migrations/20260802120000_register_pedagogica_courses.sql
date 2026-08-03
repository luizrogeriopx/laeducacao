-- Migration to register new Formação Pedagógica courses

-- 1. Insert new Formação Pedagógica courses
INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-ped-1', 
  'formacao-pedagogica-em-artes-visuais', 
  'manual://manual-ped-1', 
  'Formação Pedagógica em Artes Visuais', 
  '', 
  '/img/pedagogica/1762789285435-1be9d294-e2c8-490c-b356-a9bd3de1ff66.png', 
  'Formação Pedagógica', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-ped-2', 
  'formacao-pedagogica-em-letras-portugues-libras', 
  'manual://manual-ped-2', 
  'Formação Pedagógica em Letras - Português/Libras', 
  '', 
  '/img/pedagogica/1762789287414-4c94afcb-7b77-4c18-92e7-ab5a0ad7b5c9.png', 
  'Formação Pedagógica', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-ped-3', 
  'formacao-pedagogica-em-musica', 
  'manual://manual-ped-3', 
  'Formação Pedagógica em Música', 
  '', 
  '/img/pedagogica/1762789291233-3133ba1b-933f-4264-a89e-dcd56083f1ea.png', 
  'Formação Pedagógica', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-ped-4', 
  'formacao-pedagogica-em-quimica', 
  'manual://manual-ped-4', 
  'Formação Pedagógica em Química', 
  '', 
  '/img/pedagogica/1762789289736-62273e99-556f-428a-9e82-6d153f16fd5f.png', 
  'Formação Pedagógica', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-ped-5', 
  'formacao-pedagogica-em-matematica', 
  'manual://manual-ped-5', 
  'Formação Pedagógica em Matemática', 
  '', 
  '/img/pedagogica/1762789290654-12ceac21-1709-4cd7-87ee-6ebc5698277d.png', 
  'Formação Pedagógica', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-ped-6', 
  'formacao-pedagogica-em-sociologia', 
  'manual://manual-ped-6', 
  'Formação Pedagógica em Sociologia', 
  '', 
  '/img/pedagogica/1762789290944-9ec4f999-7a5c-4069-b157-f2c4399b2f8a.png', 
  'Formação Pedagógica', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-ped-7', 
  'formacao-pedagogica-em-geografia', 
  'manual://manual-ped-7', 
  'Formação Pedagógica em Geografia', 
  '', 
  '/img/pedagogica/1762789291629-d79ce951-a912-474a-bd14-2e2b7a44f1de.png', 
  'Formação Pedagógica', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-ped-8', 
  'formacao-pedagogica-em-historia', 
  'manual://manual-ped-8', 
  'Formação Pedagógica em História', 
  '', 
  '/img/pedagogica/1762789291704-196c2746-ab46-4ab0-b282-8d8ade67f468.png', 
  'Formação Pedagógica', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-ped-9', 
  'formacao-pedagogica-em-letras-portugues-espanhol', 
  'manual://manual-ped-9', 
  'Formação Pedagógica em Letras - Português/Espanhol', 
  '', 
  '/img/pedagogica/1762789291790-047aca8d-2089-45d3-aa09-10585d0bc4d1.png', 
  'Formação Pedagógica', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-ped-10', 
  'formacao-pedagogica-em-letras-portugues-ingles', 
  'manual://manual-ped-10', 
  'Formação Pedagógica em Letras - Português/Inglês', 
  '', 
  '/img/pedagogica/1762789291852-95b488d2-aded-46b0-8aff-cee6b3ed0b13.png', 
  'Formação Pedagógica', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-ped-11', 
  'formacao-pedagogica-em-filosofia', 
  'manual://manual-ped-11', 
  'Formação Pedagógica em Filosofia', 
  '', 
  '/img/pedagogica/1762789291943-2389e0cc-584f-4317-9bee-c1748438f511.png', 
  'Formação Pedagógica', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-ped-12', 
  'formacao-pedagogica-em-educacao-especial', 
  'manual://manual-ped-12', 
  'Formação Pedagógica em Educação Especial', 
  '', 
  '/img/pedagogica/1762789292090-90ff19c7-ec9a-470a-83f1-8003bcf9e7e1.png', 
  'Formação Pedagógica', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-ped-13', 
  'formacao-pedagogica-em-fisica', 
  'manual://manual-ped-13', 
  'Formação Pedagógica em Física', 
  '', 
  '/img/pedagogica/1762789292215-702928a3-e412-40ec-951b-16dceae230e0.png', 
  'Formação Pedagógica', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-ped-14', 
  'formacao-pedagogica-em-ciencias-da-religiao', 
  'manual://manual-ped-14', 
  'Formação Pedagógica em Ciências da Religião', 
  '', 
  '/img/pedagogica/1762789292361-6f14fea1-d950-48e7-bbc7-465e5d76c7fb.png', 
  'Formação Pedagógica', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

