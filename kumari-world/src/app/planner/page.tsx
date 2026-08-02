import { PageShell } from "@/components/dashboard/page-shell";
import { requireUser, displayName } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, Sparkles } from "lucide-react";

// In production: prisma.plannerTask.findMany({ where: { userId, date: { gte: today } } }),
// with aiGenerated tasks created by an AI Study Planner endpoint based on weak topics + exam date.
const tasks = [
  { title: "Data Interpretation — 2 sets", subject: "Quant", done: true },
  { title: "Daily Quiz", subject: "Mixed", done: true },
  { title: "Puzzles & Seating practice test", subject: "Reasoning", done: false },
  { title: "Read Current Affairs digest", subject: "GA", done: false },
  { title: "Reading Comprehension — 1 passage", subject: "English", done: false },
];

export default async function PlannerPage() {
  const user = await requireUser();
  const examDate = new Date(user.user_metadata?.exam_date || Date.now() + 45 * 86400000);
  const daysLeft = Math.max(0, Math.ceil((examDate.getTime() - Date.now()) / 86400000));

  return (
    <PageShell userName={displayName(user)} title="Study Planner" subtitle="Your AI-generated daily plan, tied to your exam date.">
      <Card className="bg-gradient-to-br from-primary/10 to-transparent">
        <CardContent className="p-6 flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <CalendarClock className="h-7 w-7" />
          </span>
          <div>
            <p className="text-3xl font-bold">{daysLeft} days left</p>
            <p className="text-sm text-muted-foreground">until your target exam</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <CardTitle className="text-base">Today&apos;s Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {tasks.map((t, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
              <div className="flex items-center gap-3">
                <input type="checkbox" defaultChecked={t.done} className="h-4 w-4 accent-[hsl(var(--primary))]" readOnly />
                <span className={t.done ? "line-through text-muted-foreground text-sm" : "text-sm"}>{t.title}</span>
              </div>
              <Badge variant="outline">{t.subject}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </PageShell>
  );
}
