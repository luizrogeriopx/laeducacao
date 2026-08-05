-- Migration to register new Licenciatura category and courses

-- 1. Insert new Category
INSERT INTO public.course_categories (
  name, slug, sort_order, price_original, price_current, price_installments, display_installments
) VALUES (
  'Licenciatura', 
  'licenciatura', 
  0, 
  NULL, 
  NULL, 
  NULL, 
  false
) ON CONFLICT (name) DO NOTHING;

-- 2. Insert new Licenciatura courses
INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-lic-1', 
  'licenciatura-em-ciencias-sociais', 
  'manual://manual-lic-1', 
  'Licenciatura em Ciências Sociais', 
  '', 
  '/img/licenciatura/1762789512866-5c547c65-16ba-4cfe-bd1d-9182bd93804e.png', 
  'Licenciatura', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-lic-2', 
  'licenciatura-em-artes-visuais', 
  'manual://manual-lic-2', 
  'Licenciatura em Artes Visuais', 
  '', 
  '/img/licenciatura/1762789512826-8aebe312-c99a-4dd5-bff0-1a26e9777417.png', 
  'Licenciatura', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-lic-3', 
  'licenciatura-em-historia', 
  'manual://manual-lic-3', 
  'Licenciatura em História', 
  '', 
  '/img/licenciatura/1762789512830-563aa868-2129-40d3-befd-8e3d9847c25d.png', 
  'Licenciatura', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-lic-4', 
  'licenciatura-em-pedagogia', 
  'manual://manual-lic-4', 
  'Licenciatura em Pedagogia', 
  '', 
  '/img/licenciatura/1762789512903-2453b697-fdef-4bb1-8012-205e572487ff.png', 
  'Licenciatura', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.courses (
  id, slug, url, title, description, image, category, 
  price_original, price_current, price_installments, 
  display_installments, custom_pricing, enabled, updated_at
) VALUES (
  'manual-lic-5', 
  'licenciatura-em-matematica', 
  'manual://manual-lic-5', 
  'Licenciatura em Matemática', 
  '', 
  '/img/licenciatura/1762789512861-86504d39-4770-425f-a92a-a7671a641956.png', 
  'Licenciatura', 
  NULL, NULL, NULL, 
  false, false, true, now()
) ON CONFLICT (id) DO NOTHING;
