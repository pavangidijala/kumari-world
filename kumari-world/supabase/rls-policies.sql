-- Run this in the Supabase SQL editor after your first `prisma db push`.
-- Enables Row Level Security so users can only access their own rows.
-- Public content tables (questions, tests, notes, current_affairs) are left
-- readable by any authenticated user and are not writable from the client
-- (all writes happen server-side via Prisma using the service role key).

alter table users enable row level security;
alter table test_attempts enable row level security;
alter table answers enable row level security;
alter table results enable row level security;
alter table bookmarks enable row level security;
alter table mistake_book_entries enable row level security;
alter table streaks enable row level security;
alter table study_sessions enable row level security;
alter table user_achievements enable row level security;
alter table planner_tasks enable row level security;
alter table ai_doubts enable row level security;

create policy "Users can view own row" on users
  for select using (auth.uid()::text = id);
create policy "Users can update own row" on users
  for update using (auth.uid()::text = id);

create policy "Users manage own attempts" on test_attempts
  for all using (auth.uid()::text = "userId");

create policy "Users manage own answers" on answers
  for all using (
    exists (select 1 from test_attempts ta where ta.id = answers."attemptId" and ta."userId" = auth.uid()::text)
  );

create policy "Users view own results" on results
  for select using (auth.uid()::text = "userId");

create policy "Users manage own bookmarks" on bookmarks
  for all using (auth.uid()::text = "userId");

create policy "Users manage own mistakes" on mistake_book_entries
  for all using (auth.uid()::text = "userId");

create policy "Users manage own streak" on streaks
  for all using (auth.uid()::text = "userId");

create policy "Users manage own study sessions" on study_sessions
  for all using (auth.uid()::text = "userId");

create policy "Users view own achievements" on user_achievements
  for select using (auth.uid()::text = "userId");

create policy "Users manage own planner tasks" on planner_tasks
  for all using (auth.uid()::text = "userId");

create policy "Users manage own ai doubts" on ai_doubts
  for all using (auth.uid()::text = "userId");

-- Public read-only content
alter table questions enable row level security;
alter table tests enable row level security;
alter table test_questions enable row level security;
alter table notes enable row level security;
alter table current_affairs enable row level security;
alter table daily_quizzes enable row level security;
alter table subjects enable row level security;
alter table topics enable row level security;
alter table achievements enable row level security;

create policy "Authenticated read questions" on questions for select using (auth.role() = 'authenticated');
create policy "Authenticated read tests" on tests for select using (auth.role() = 'authenticated');
create policy "Authenticated read test_questions" on test_questions for select using (auth.role() = 'authenticated');
create policy "Authenticated read notes" on notes for select using (auth.role() = 'authenticated');
create policy "Authenticated read current_affairs" on current_affairs for select using (auth.role() = 'authenticated');
create policy "Authenticated read daily_quizzes" on daily_quizzes for select using (auth.role() = 'authenticated');
create policy "Authenticated read subjects" on subjects for select using (auth.role() = 'authenticated');
create policy "Authenticated read topics" on topics for select using (auth.role() = 'authenticated');
create policy "Authenticated read achievements" on achievements for select using (auth.role() = 'authenticated');

-- Trigger: create a `users` row automatically when someone signs up via Supabase Auth
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, "fullName")
  values (new.id, new.email, new.raw_user_meta_data->>'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
