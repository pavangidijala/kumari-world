import { PageShell } from "@/components/dashboard/page-shell";
import { requireUser, displayName } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// In production: prisma.currentAffair.findMany({ orderBy: { publishedAt: "desc" }, take: 30 })
// populated by /api/cron/current-affairs, a scheduled job that pulls from a news API daily.
const affairs = [
  { title: "RBI keeps repo rate unchanged in latest MPC meeting", category: "Banking", date: "Today" },
  { title: "Govt announces new PSU bank recapitalisation plan", category: "Economy", date: "Today" },
  { title: "India's forex reserves touch new high", category: "Economy", date: "Yesterday" },
  { title: "SBI launches new digital lending platform", category: "Banking", date: "Yesterday" },
  { title: "NABARD sanctions rural infrastructure fund for FY26", category: "Banking", date: "2 days ago" },
];

export default async function CurrentAffairsPage() {
  const user = await requireUser();
  return (
    <PageShell userName={displayName(user)} title="Current Affairs" subtitle="Auto-updated daily — banking, economy & national highlights.">
      <div className="space-y-3">
        {affairs.map((a, i) => (
          <Card key={i}>
            <CardContent className="p-4 flex items-start justify-between gap-4">
              <div>
                <p className="font-medium">{a.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{a.date}</p>
              </div>
              <Badge variant="secondary" className="shrink-0">{a.category}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
