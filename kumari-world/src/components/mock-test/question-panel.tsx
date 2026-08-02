import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { MockQuestion } from "@/types";

export function QuestionPanel({
  question,
  index,
  total,
  selected,
  onSelect,
  onClear,
  onPrev,
  onSaveNext,
  onMarkForReview,
  onSubmit,
}: {
  question: MockQuestion;
  index: number;
  total: number;
  selected: string | null;
  onSelect: (key: string) => void;
  onClear: () => void;
  onPrev: () => void;
  onSaveNext: () => void;
  onMarkForReview: () => void;
  onSubmit: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1">
        <p className="text-xs font-semibold uppercase text-primary mb-2">
          {question.section} · Question {index + 1} of {total}
        </p>
        <p className="text-base font-medium leading-relaxed mb-6">{question.questionText}</p>

        <div className="space-y-3">
          {question.options.map((opt) => (
            <button
              key={opt.key}
              onClick={() => onSelect(opt.key)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors",
                selected === opt.key
                  ? "border-primary bg-primary/10 font-medium"
                  : "border-border hover:bg-accent"
              )}
            >
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
                  selected === opt.key ? "border-primary bg-primary text-primary-foreground" : "border-border"
                )}
              >
                {opt.key}
              </span>
              {opt.text}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4">
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClear}>
            Clear Response
          </Button>
          <Button variant="secondary" onClick={onMarkForReview}>
            Mark for Review &amp; Next
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onPrev} disabled={index === 0}>
            Previous
          </Button>
          {index === total - 1 ? (
            <Button onClick={onSubmit}>Submit Test</Button>
          ) : (
            <Button onClick={onSaveNext}>Save &amp; Next</Button>
          )}
        </div>
      </div>
    </div>
  );
}
