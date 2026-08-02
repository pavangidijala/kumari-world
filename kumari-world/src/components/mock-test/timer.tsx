import { Clock } from "lucide-react";
import { formatSeconds } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function Timer({ secondsLeft, totalSeconds }: { secondsLeft: number; totalSeconds: number }) {
  const low = secondsLeft < totalSeconds * 0.1;
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg border px-3 py-1.5 font-mono text-sm font-semibold",
        low ? "border-destructive/40 bg-destructive/10 text-destructive" : "border-border bg-muted"
      )}
    >
      <Clock className="h-4 w-4" />
      {formatSeconds(secondsLeft)}
    </div>
  );
}
