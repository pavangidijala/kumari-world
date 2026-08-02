import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";
import { StatCard } from "@/components/dashboard/stat-card";
import { ProgressCharts } from "@/components/dashboard/progress-charts";
import { ContinueMockCard, AiSuggestionsCard, TopicsCard } from "@/components/dashboard/insight-cards";
import { Trophy, Target, Flame, Clock, TrendingUp, Award, BarChart3 } from "lucide-react";

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const fullName = (user.user_metadata?.full_name as string) || user.email?.split("@")[0] || "Student";

  // NOTE: replace these placeholder values with real Prisma queries, e.g.
  // const latest = await prisma.result.findFirst({ where: { userId: user.id }, orderBy: { createdAt: "desc" } });
  const stats = {
    lastScore: 68,
    currentScore: 84,
    improvement: 16,
    accuracy: 78,
    rank: 214,
    percentile: 96.2,
    streak: 12,
    studyTimeToday: "1h 45m",
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Topbar userName={fullName} exam={(user.user_metadata?.target_exam as string) ?? "IBPS PO"} />
        <main className="p-4 lg:p-8 space-y-6">
          <ContinueMockCard />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon={BarChart3} label="Last Mock Score" value={stats.lastScore} suffix="/100" />
            <StatCard icon={Trophy} label="Current Mock Score" value={stats.currentScore} suffix="/100" delta={stats.improvement} />
            <StatCard icon={Target} label="Accuracy" value={stats.accuracy} suffix="%" />
            <StatCard icon={TrendingUp} label="Percentile" value={stats.percentile} suffix="%" />
            <StatCard icon={Award} label="All-India Rank" value={`#${stats.rank}`} />
            <StatCard icon={Flame} label="Study Streak" value={stats.streak} suffix=" days" />
            <StatCard icon={Clock} label="Study Time Today" value={stats.studyTimeToday} />
            <StatCard icon={Target} label="Marks Improvement" value={`+${stats.improvement}`} />
          </div>

          <ProgressCharts />
          <TopicsCard />
          <AiSuggestionsCard />
        </main>
      </div>
    </div>
  );
}
