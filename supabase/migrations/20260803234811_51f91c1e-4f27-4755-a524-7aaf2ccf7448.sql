ALTER TABLE public.course_categories ADD COLUMN IF NOT EXISTS hide_price boolean NOT NULL DEFAULT false;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS hide_price boolean NOT NULL DEFAULT false;