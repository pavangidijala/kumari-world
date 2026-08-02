import { PageShell } from "@/components/dashboard/page-shell";
import { requireUser, displayName } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// In production, group by prisma.subject -> topic and count prisma.question by topicId.
const subjects = [
  { name: "Quantitative Aptitude", topics: ["Simplification", "Data Interpretation", "Number Series", "Quadratic Equations", "Time & Work"] },
  { name: "Reasoning", topics: ["Puzzles & Seating", "Syllogism", "Blood Relations", "Coding-Decoding", "Inequalities"] },
  { name: "English Language", topics: ["Reading Comprehension", "Cloze Test", "Para Jumbles", "Error Spotting"] },
  { name: "Banking & General Awareness", topics: ["Banking Terms", "RBI Policies", "Static GK", "Financial Awareness"] },
];

export default async function TopicTestsPage({ searchParams }: { searchParams: { exam?: string } }) {
  const user = await requireUser();
  return (
    <PageShell
      userName={displayName(user)}
      title="Topic-wise Tests"
      subtitle={searchParams.exam ? `Filtered for ${searchParams.exam.replaceAll("_", " ")}` : "Practice one topic at a time and build accuracy."}
    >
      <div className="space-y-8">
        {subjects.map((s) => (
          <Card key={s.name}>
            <CardHeader>
              <CardTitle className="text-base">{s.name}</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {s.topics.map((t) => (
                <div key={t} className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
                  <span className="text-sm font-medium">{t}</span>
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/mock-test/topic-${t.toLowerCase().replaceAll(/[^a-z]+/g, "-")}`}>Practice</Link>
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
