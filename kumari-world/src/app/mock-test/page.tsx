import Link from "next/link";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const mockTests = [
  { id: "ibps-po-prelims-1", title: "IBPS PO Prelims Mock 1", exam: "IBPS PO", duration: 60, questions: 100, attempted: true },
  { id: "ibps-po-prelims-2", title: "IBPS PO Prelims Mock 2", exam: "IBPS PO", duration: 60, questions: 100, attempted: false },
  { id: "sbi-clerk-prelims-1", title: "SBI Clerk Prelims Mock 1", exam: "SBI Clerk", duration: 60, questions: 100, attempted: false },
  { id: "rbi-assistant-1", title: "RBI Assistant Full Mock 1", exam: "RBI", duration: 60, questions: 100, attempted: false },
];

export default async function MockTestListPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Topbar userName={(user.user_metadata?.full_name as string) || "Student"} />
        <main className="p-4 lg:p-8">
          <h1 className="text-2xl font-bold mb-1">Full-Length Mock Tests</h1>
          <p className="text-muted-foreground mb-6">Real exam pattern, live timer, sectional analysis.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {mockTests.map((t) => (
              <Card key={t.id}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-base">{t.title}</CardTitle>
                  {t.attempted && <Badge variant="secondary">Attempted</Badge>}
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {t.exam} · {t.questions} Qs · {t.duration} mins
                  </p>
                  <Button asChild size="sm">
                    <Link href={`/mock-test/${t.id}`}>{t.attempted ? "Re-attempt" : "Start Test"}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
