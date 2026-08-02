import { PageShell } from "@/components/dashboard/page-shell";
import { requireUser, displayName } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bookmark } from "lucide-react";

// In production: prisma.bookmark.findMany({ where: { userId }, include: { question: true } })
const bookmarks = [
  { question: "If the code for MOUNTAIN is written as NPVOUJBO, what is the code for RIVER?", subject: "Reasoning" },
  { question: "A sum of ₹8,000 becomes ₹9,800 in 2 years at simple interest. Find the rate.", subject: "Quant" },
  { question: "Choose the word that best replaces the underlined phrase.", subject: "English" },
];

export default async function BookmarksPage() {
  const user = await requireUser();
  return (
    <PageShell userName={displayName(user)} title="Bookmarks" subtitle="Questions you saved to revisit later.">
      <div className="space-y-3">
        {bookmarks.map((b, i) => (
          <Card key={i}>
            <CardContent className="p-4 flex items-start gap-3">
              <Bookmark className="h-4 w-4 text-primary mt-1 shrink-0" />
              <div className="flex-1">
                <p className="text-sm">{b.question}</p>
                <Badge variant="secondary" className="mt-2">{b.subject}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
