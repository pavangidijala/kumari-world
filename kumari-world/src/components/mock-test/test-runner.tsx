"use client";
import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Timer } from "@/components/mock-test/timer";
import { QuestionPalette } from "@/components/mock-test/question-palette";
import { QuestionPanel } from "@/components/mock-test/question-panel";
import { Button } from "@/components/ui/button";
import { useMockTest } from "@/hooks/use-mock-test";
import type { MockTestMeta } from "@/types";

export function TestRunner({ test }: { test: MockTestMeta }) {
  const mt = useMockTest(test);
  const [confirmSubmit, setConfirmSubmit] = useState(false);

  const answeredCount = Object.values(mt.answers).filter(
    (a) => a.status === "answered" || a.status === "answered_marked"
  ).length;

  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center justify-between border-b border-border px-4 lg:px-8 py-3">
        <div>
          <p className="font-semibold">{test.title}</p>
          <p className="text-xs text-muted-foreground">
            {answeredCount}/{test.questions.length} answered
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Timer secondsLeft={mt.secondsLeft} totalSeconds={mt.totalSeconds} />
          <Button size="sm" variant="destructive" onClick={() => setConfirmSubmit(true)}>
            Submit
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <QuestionPanel
            question={mt.currentQuestion}
            index={mt.currentIndex}
            total={test.questions.length}
            selected={mt.answers[mt.currentQuestion.id]?.selected ?? null}
            onSelect={mt.selectOption}
            onClear={mt.clearResponse}
            onPrev={() => mt.goTo(mt.currentIndex - 1)}
            onSaveNext={mt.saveAndNext}
            onMarkForReview={mt.markForReview}
            onSubmit={() => setConfirmSubmit(true)}
          />
        </div>
        <aside className="hidden md:block w-72 shrink-0 overflow-y-auto border-l border-border p-4">
          <QuestionPalette
            questions={test.questions}
            answers={mt.answers}
            currentIndex={mt.currentIndex}
            onJump={mt.goTo}
          />
        </aside>
      </div>

      {confirmSubmit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-xl border border-border bg-card p-6 text-center">
            <AlertTriangle className="mx-auto mb-3 h-8 w-8 text-destructive" />
            <h3 className="font-semibold text-lg mb-1">Submit the test?</h3>
            <p className="text-sm text-muted-foreground mb-5">
              You&apos;ve answered {answeredCount} of {test.questions.length} questions. This cannot be undone.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setConfirmSubmit(false)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={mt.submit}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
