import { PageShell } from "@/components/dashboard/page-shell";
import { requireUser, displayName } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// In production: prisma.test.findMany({ where: { type: "PREVIOUS_YEAR" }, orderBy: { createdAt: "desc" } })
const papers = [
  { id: "ibps-po-2025-prelims", exam: "IBPS PO", year: 2025, phase: "Prelims" },
  { id: "ibps-po-2024-mains", exam: "IBPS PO", year: 2024, phase: "Mains" },
  { id: "sbi-clerk-2025-prelims", exam: "SBI Clerk", year: 2025, phase: "Prelims" },
  { id: "rbi-assistant-2024-prelims", exam: "RBI", year: 2024, phase: "Prelims" },
  { id: "ibps-rrb-2024-po", exam: "IBPS RRB", year: 2024, phase: "Officer Scale I" },
  { id: "lic-aao-2023", exam: "LIC", year: 2023, phase: "AAO" },
];

export default async function PreviousPapersPage() {
  const user = await requireUser();
  return (
    <PageShell userName={displayName(user)} title="Previous Year Papers" subtitle="Solve real papers from the last few years, exam-day format.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {papers.map((p) => (
          <Card key={p.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">{p.exam} — {p.phase}</CardTitle>
              <Badge variant="outline">{p.year}</Badge>
            </CardHeader>
            <CardContent className="flex justify-end">
              <Button size="sm" asChild>
                <Link href={`/mock-test/${p.id}`}>Attempt Paper</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
