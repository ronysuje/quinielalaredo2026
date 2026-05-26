create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  username text,
  approved boolean default false,
  is_admin boolean default false,
  created_at timestamptz default now()
);

create table if not exists matches (
  id bigint generated always as identity primary key,
  match_no text not null,
  stage text default 'Group Stage',
  kickoff timestamptz,
  team_a text not null,
  team_b text not null,
  score_a int,
  score_b int,
  locked boolean default false,
  created_at timestamptz default now()
);

create table if not exists picks (
  id bigint generated always as identity primary key,
  user_id uuid references profiles(id) on delete cascade,
  match_id bigint references matches(id) on delete cascade,
  pick_a int not null,
  pick_b int not null,
  points int default 0,
  updated_at timestamptz default now(),
  unique(user_id, match_id)
);

create table if not exists reactions (
  id bigint generated always as identity primary key,
  user_id uuid references profiles(id) on delete cascade,
  emoji text not null,
  message text,
  created_at timestamptz default now()
);

alter table profiles enable row level security;
alter table matches enable row level security;
alter table picks enable row level security;
alter table reactions enable row level security;

create policy "profiles read" on profiles for select using (true);
create policy "profiles insert own" on profiles for insert with check (auth.uid() = id);
create policy "profiles update own" on profiles for update using (auth.uid() = id);

create policy "matches read" on matches for select using (true);
create policy "picks read" on picks for select using (true);
create policy "picks own insert" on picks for insert with check (auth.uid() = user_id);
create policy "picks own update" on picks for update using (auth.uid() = user_id);
create policy "reactions read" on reactions for select using (true);
create policy "reactions own insert" on reactions for insert with check (auth.uid() = user_id);

insert into matches (match_no, stage, kickoff, team_a, team_b) values
('M1','Group Stage','2026-06-11 19:00:00+00','Mexico','TBD'),
('M2','Group Stage','2026-06-12 19:00:00+00','Canada','TBD'),
('M11','Group Stage','2026-06-14 19:00:00+00','TBD','TBD'),
('M70','Round of 32','2026-06-28 19:00:00+00','TBD','TBD')
on conflict do nothing;
