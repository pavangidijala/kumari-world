# Kumari World — Bank Exam Preparation Platform

A production-ready starter for a premium banking-exam prep platform: Next.js 14 (App Router) +
TypeScript + Tailwind + shadcn/ui-style components + Supabase (Auth/DB/Storage) + Prisma +
Framer Motion + Recharts.

## What's built and working

- Landing page (hero, exam grid for SBI PO/Clerk, IBPS PO/Clerk/RRB, RBI, LIC, NABARD, Insurance, features, dark/light mode)
- Supabase email/password auth (signup, login, session middleware, protected routes)
- Dashboard: score/accuracy/rank/percentile/streak stat cards, weekly/monthly study time charts
  (Recharts), weak/strong topics, AI suggestions card, "Continue Last Mock" card
- Full mock-test engine: live timer with **auto-submit**, Save & Next, Previous, Mark for Review,
  question palette with 5-state colour coding, **autosave every 5s to localStorage** (resume support),
  submit confirmation modal
- Result page with section-wise performance and overall breakdown charts + AI analysis block
- Feature pages: Topic-wise Tests, Previous Year Papers, Daily Quiz, Current Affairs, PDF Notes,
  Study Planner (with exam countdown), Bookmarks, Mistake Book, AI Doubt Solver (chat UI wired to
  an API route), Settings/logout
- Prisma schema covering **every entity you listed**: users, subjects/topics, questions, tests,
  test_questions, test_attempts, answers, results, daily_quizzes, current_affairs, notes,
  bookmarks, mistake_book_entries, streaks, study_sessions, achievements, planner_tasks, ai_doubts
- Supabase RLS policy SQL so users can only ever read/write their own rows
- Two Vercel Cron jobs (`vercel.json`) for "no admin panel" auto-updating content:
  daily quiz publishing + current affairs fetching
- AI Doubt Solver API route wired to call an AI provider (Anthropic API) server-side

## What you still need to plug in

This is a real, working scaffold — not a mockup — but a platform this size (10+ exams, AI
features, scheduled jobs) needs data and API keys before it's "done":

1. **Seed real questions.** The mock test currently uses demo questions
   (`src/lib/demo-mock-data.ts`). Replace with Prisma queries against your `Question`/`Test` tables
   once you've loaded real content (CSV import script or manual entry).
2. **Wire dashboard/result numbers to Prisma.** Stat cards currently show placeholder numbers —
   marked with `// NOTE:` / `// In production:` comments showing exactly which Prisma query to run.
3. **Add your API keys** in `.env.local` (copy from `.env.example`): Supabase URL/keys, Postgres
   connection strings, `NEWS_API_KEY` for current affairs, `CRON_SECRET` for the scheduled jobs.
   The doubt solver uses Google Gemini through Netlify AI Gateway, which is injected automatically
   and needs no key of its own.
4. **Rank/percentile computation** needs a batch job comparing a user's `Result` against all other
   results for the same `Test` — not included, since it depends on your scoring rules.

## Local setup

```bash
npm install

# 1) Create a Supabase project → copy the URL/keys into .env.local
cp .env.example .env.local

# 2) Push the schema to your Supabase Postgres
npx prisma db push

# 3) In the Supabase SQL editor, run:
#    supabase/rls-policies.sql

# 4) Run the dev server
npm run dev
```

Visit `http://localhost:3000`.

## Deploy to Vercel

1. Push this folder to a new GitHub repo.
2. Import the repo in Vercel.
3. Add all variables from `.env.example` in Vercel → Project → Settings → Environment Variables.
4. Deploy. `vercel.json` automatically registers the two cron jobs.
5. In Supabase Auth settings, add your Vercel deployment URL to **Redirect URLs**
   (`https://your-app.vercel.app/auth/callback`).

## Project structure

```
src/
  app/                 → routes (App Router)
    (auth)/login, (auth)/signup
    dashboard/
    mock-test/, mock-test/[id]/, mock-test/[id]/result/
    topic-tests/, previous-papers/, daily-quiz/, current-affairs/
    notes/, planner/, bookmarks/, mistake-book/, ai-doubt-solver/, settings/
    api/ai/doubt-solver, api/cron/daily-quiz, api/cron/current-affairs
    auth/callback/
  components/
    ui/                → shadcn-style primitives (Button, Card, Badge, Tabs, Progress...)
    landing/            → marketing page sections
    dashboard/           → sidebar, topbar, stat cards, charts, insight cards
    mock-test/           → timer, palette, question panel, test runner, result charts
  hooks/use-mock-test.ts → mock test state machine (timer, autosave, autosubmit)
  lib/                  → supabase client/server, prisma singleton, utils
  types/                → shared TypeScript types
prisma/schema.prisma    → full database schema
supabase/rls-policies.sql
vercel.json             → cron schedule
```
