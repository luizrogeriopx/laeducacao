ALTER TABLE public.course_categories
  ADD COLUMN price_original numeric,
  ADD COLUMN price_current numeric,
  ADD COLUMN price_installments text;