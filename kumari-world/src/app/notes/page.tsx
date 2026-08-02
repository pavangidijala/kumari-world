import { PageShell } from "@/components/dashboard/page-shell";
import { requireUser, displayName } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";

// In production: prisma.note.findMany() with fileUrl pointing at a Supabase Storage bucket ("notes").
const notes = [
  { title: "Banking Awareness — Complete Notes", subject: "Banking Awareness", size: "2.4 MB" },
  { title: "Quantitative Aptitude Shortcuts", subject: "Quant", size: "1.8 MB" },
  { title: "Reasoning Puzzles Practice Set", subject: "Reasoning", size: "3.1 MB" },
  { title: "Static GK for Bank Exams 2026", subject: "General Awareness", size: "2.9 MB" },
  { title: "English Grammar Rules & Errors", subject: "English", size: "1.5 MB" },
];

export default async function NotesPage() {
  const user = await requireUser();
  return (
    <PageShell userName={displayName(user)} title="PDF Notes" subtitle="Concise, exam-focused notes for every subject.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {notes.map((n) => (
          <Card key={n.title}>
            <CardContent className="p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileText className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-medium text-sm">{n.title}</p>
                  <p className="text-xs text-muted-foreground">{n.subject} · {n.size}</p>
                </div>
              </div>
              <Button size="icon" variant="outline" aria-label="Download">
                <Download className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
