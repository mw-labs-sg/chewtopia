-- Chewtopia: the table that carries everything other than scores.
-- Run once in the Supabase SQL editor. Until it exists, scores still sync and
-- the rest of the app just stays per-device — nothing breaks either way.

create table if not exists public.state (
  user_id    uuid        not null references auth.users(id) on delete cascade,
  k          text        not null,
  v          jsonb       not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, k)
);

alter table public.state enable row level security;

drop policy if exists "own state" on public.state;
create policy "own state" on public.state
  for all
  using      (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- What lives in here, one row per key:
--   weak:tc, weak:sc   the tricky-ones bank for each boy
--   books:tc, books:sc the reading log
--   events             anything added to Upcoming
--   acts               weekly after-school activities
--   gone               events that were ticked off or removed
