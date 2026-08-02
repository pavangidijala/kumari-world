import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";

export function StatCard({
  icon: Icon,
  label,
  value,
  delta,
  suffix,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  delta?: number;
  suffix?: string;
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-4 w-4" />
          </span>
          {typeof delta === "number" && (
            <span
              className={cn(
                "flex items-center text-xs font-semibold",
                delta >= 0 ? "text-success" : "text-destructive"
              )}
            >
              {delta >= 0 ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
              {Math.abs(delta)}%
            </span>
          )}
        </div>
        <p className="mt-3 text-2xl font-bold">
          {value}
          {suffix && <span className="text-sm font-medium text-muted-foreground">{suffix}</span>}
        </p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}
