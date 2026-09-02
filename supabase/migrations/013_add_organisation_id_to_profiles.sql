-- Add organisation_id to profiles
-- This links a coach to an organiser

ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS organisation_id UUID REFERENCES public.profiles(id);

CREATE INDEX IF NOT EXISTS idx_profiles_organisation_id ON public.profiles(organisation_id);
