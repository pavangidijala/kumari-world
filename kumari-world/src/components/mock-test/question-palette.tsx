import { cn } from "@/lib/utils";
import type { MockQuestion, QuestionState } from "@/types";

const statusStyles: Record<string, string> = {
  not_visited: "bg-muted text-muted-foreground border border-border",
  not_answered: "bg-destructive text-destructive-foreground",
  answered: "bg-success text-success-foreground",
  marked: "bg-violet-500 text-white",
  answered_marked: "bg-violet-500 text-white ring-2 ring-success ring-offset-2 ring-offset-background",
};

const legend = [
  { status: "answered", label: "Answered" },
  { status: "not_answered", label: "Not Answered" },
  { status: "not_visited", label: "Not Visited" },
  { status: "marked", label: "Marked for Review" },
  { status: "answered_marked", label: "Answered & Marked" },
];

export function QuestionPalette({
  questions,
  answers,
  currentIndex,
  onJump,
}: {
  questions: MockQuestion[];
  answers: Record<string, QuestionState>;
  currentIndex: number;
  onJump: (index: number) => void;
}) {
  const sections = Array.from(new Set(questions.map((q) => q.section)));

  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <div key={section}>
          <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">{section}</p>
          <div className="grid grid-cols-5 gap-2">
            {questions.map((q, i) =>
              q.section === section ? (
                <button
                  key={q.id}
                  onClick={() => onJump(i)}
                  className={cn(
                    "h-9 w-9 rounded-md text-xs font-semibold flex items-center justify-center transition-transform hover:scale-105",
                    statusStyles[answers[q.id]?.status ?? "not_visited"],
                    i === currentIndex && "outline outline-2 outline-primary outline-offset-2"
                  )}
                >
                  {i + 1}
                </button>
              ) : null
            )}
          </div>
        </div>
      ))}

      <div className="space-y-1.5 pt-2 border-t border-border">
        {legend.map((l) => (
          <div key={l.status} className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className={cn("h-3 w-3 rounded-sm", statusStyles[l.status])} />
            {l.label}
          </div>
        ))}
      </div>
    </div>
  );
}
