import Link from "next/link";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ResultCharts } from "@/components/mock-test/result-charts";
import { Bot, Trophy, Target, TrendingUp } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

// In production: fetch the real Result row via Prisma using attemptId, compute
// score/accuracy/rank/percentile/sectionAnalysis and an AI-generated summary.
export default async function ResultPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const result = { score: 84, totalMarks: 100, accuracy: 78, rank: 214, percentile: 96.2 };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Topbar userName={(user.user_metadata?.full_name as string) || "Student"} />
        <main className="p-4 lg:p-8 space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Result — {params.id.replaceAll("-", " ")}</h1>
            <p className="text-muted-foreground">Here&apos;s how you performed.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card><CardContent className="p-5">
              <Trophy className="h-5 w-5 text-primary mb-2" />
              <p className="text-2xl font-bold">{result.score}/{result.totalMarks}</p>
              <p className="text-sm text-muted-foreground">Score</p>
            </CardContent></Card>
            <Card><CardContent className="p-5">
              <Target className="h-5 w-5 text-primary mb-2" />
              <p className="text-2xl font-bold">{result.accuracy}%</p>
              <p className="text-sm text-muted-foreground">Accuracy</p>
            </CardContent></Card>
            <Card><CardContent className="p-5">
              <TrendingUp className="h-5 w-5 text-primary mb-2" />
              <p className="text-2xl font-bold">{result.percentile}%</p>
              <p className="text-sm text-muted-foreground">Percentile</p>
            </CardContent></Card>
            <Card><CardContent className="p-5">
              <Trophy className="h-5 w-5 text-primary mb-2" />
              <p className="text-2xl font-bold">#{result.rank}</p>
              <p className="text-sm text-muted-foreground">All-India Rank</p>
            </CardContent></Card>
          </div>

          <ResultCharts />

          <Card>
            <CardContent className="p-5 flex gap-3">
              <Bot className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-1">AI Mock Analysis</p>
                <p className="text-sm text-muted-foreground">
                  Strong in English (8/10) and Reasoning. Quant accuracy dipped on Data Interpretation —
                  attempt 2 DI sets daily this week. At this pace you&apos;re tracking for the top 5% band.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button asChild>
              <Link href="/mock-test">Take Another Mock</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
