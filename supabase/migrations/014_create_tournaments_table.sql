-- Migration 014: Create tournaments table
-- Apply manually via Supabase SQL Editor.
-- IMPORTANT: After applying, also expose 'tournaments' via Dashboard →
-- Project Settings → Data API (API Exposure toggle) — a GRANT alone
-- is not sufficient for new tables on this project.

CREATE TABLE public.tournaments (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  sport text,
  start_date date not null,
  end_date date,
  location text,
  organiser_id uuid references public.profiles(id) not null,
  created_at timestamptz default now()
);

ALTER TABLE public.tournaments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view tournaments"
ON public.tournaments FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Organisers create their own tournaments"
ON public.tournaments FOR INSERT WITH CHECK (auth.uid() = organiser_id);

GRANT SELECT, INSERT ON public.tournaments TO authenticated;
