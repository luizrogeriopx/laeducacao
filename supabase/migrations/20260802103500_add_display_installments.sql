ALTER TABLE public.course_categories
  ADD COLUMN display_installments boolean DEFAULT false;

ALTER TABLE public.courses
  ADD COLUMN display_installments boolean DEFAULT false;
