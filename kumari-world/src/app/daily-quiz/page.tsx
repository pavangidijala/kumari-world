import { PageShell } from "@/components/dashboard/page-shell";
import { requireUser, displayName } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flame } from "lucide-react";
import Link from "next/link";

// In production: prisma.dailyQuiz.findUnique({ where: { date: today } }) — published by a Vercel Cron job
// hitting /api/cron/daily-quiz every midnight, which auto-generates a Test of type DAILY_QUIZ.
export default async function DailyQuizPage() {
  const user = await requireUser();
  const today = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });

  return (
    <PageShell userName={displayName(user)} title="Daily Quiz" subtitle="A fresh 10-question quiz every day, auto-updated at midnight.">
      <Card className="bg-gradient-to-br from-primary/10 to-transparent">
        <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">{today}</p>
            <p className="text-lg font-semibold">Today&apos;s Quiz: Banking Awareness + Current Affairs</p>
            <p className="text-sm text-muted-foreground mt-1">10 questions · 10 minutes</p>
          </div>
          <Button size="lg" asChild>
            <Link href="/mock-test/daily-quiz-today">Start Today&apos;s Quiz</Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5 flex items-center gap-3">
          <Flame className="h-5 w-5 text-primary" />
          <p className="text-sm">
            Complete today&apos;s quiz to keep your streak alive. Missing a day resets your streak counter.
          </p>
        </CardContent>
      </Card>
    </PageShell>
  );
}
