import { PageShell } from "@/components/dashboard/page-shell";
import { requireUser, displayName } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";

// In production: prisma.mistakeBookEntry.findMany({ where: { userId, mastered: false }, include: { question: true } })
// Rows are created automatically whenever an Answer is scored incorrect during result computation.
const mistakes = [
  { question: "Find the wrong number in the series: 4, 9, 20, 43, 90, 185", subject: "Quant", timesWrong: 3 },
  { question: "Statements & Conclusions — syllogism set 4", subject: "Reasoning", timesWrong: 2 },
  { question: "Fill in the blank with the correct preposition.", subject: "English", timesWrong: 1 },
];

export default async function MistakeBookPage() {
  const user = await requireUser();
  return (
    <PageShell userName={displayName(user)} title="Mistake Book" subtitle="Wrong answers are saved here automatically for focused revision.">
      <div className="space-y-3">
        {mistakes.map((m, i) => (
          <Card key={i}>
            <CardContent className="p-4 flex items-start gap-3">
              <AlertCircle className="h-4 w-4 text-destructive mt-1 shrink-0" />
              <div className="flex-1">
                <p className="text-sm">{m.question}</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary">{m.subject}</Badge>
                  <Badge variant="destructive">Wrong {m.timesWrong}x</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
