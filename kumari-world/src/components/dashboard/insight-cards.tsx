import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Bot, PlayCircle, TrendingDown, TrendingUp } from "lucide-react";

const weak = [
  { topic: "Data Interpretation", accuracy: 42 },
  { topic: "Puzzles & Seating", accuracy: 51 },
  { topic: "Cloze Test", accuracy: 55 },
];

const strong = [
  { topic: "Simplification", accuracy: 91 },
  { topic: "Syllogism", accuracy: 87 },
  { topic: "Banking Awareness", accuracy: 84 },
];

export function ContinueMockCard() {
  return (
    <Card className="bg-gradient-to-br from-primary/10 to-transparent">
      <CardContent className="p-5 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <PlayCircle className="h-6 w-6" />
          </span>
          <div>
            <p className="font-semibold">Continue: IBPS PO Prelims Mock 7</p>
            <p className="text-sm text-muted-foreground">62 of 100 questions attempted · 18 min left</p>
          </div>
        </div>
        <Button asChild>
          <Link href="/mock-test/demo-resume">Resume Test</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export function AiSuggestionsCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2">
        <Bot className="h-5 w-5 text-primary" />
        <CardTitle className="text-base">AI Suggestions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <p className="rounded-lg bg-muted p-3">
          Your Data Interpretation accuracy dropped 8% this week — spend 20 mins/day on DI sets before your next mock.
        </p>
        <p className="rounded-lg bg-muted p-3">
          Great consistency in Simplification! Try a harder difficulty set to keep improving.
        </p>
        <Button variant="outline" size="sm" asChild>
          <Link href="/planner">View Full Study Plan</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export function TopicsCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <TrendingDown className="h-4 w-4 text-destructive" />
          <CardTitle className="text-base">Weak Topics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {weak.map((t) => (
            <div key={t.topic}>
              <div className="flex justify-between text-sm mb-1">
                <span>{t.topic}</span>
                <Badge variant="destructive">{t.accuracy}%</Badge>
              </div>
              <Progress value={t.accuracy} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <TrendingUp className="h-4 w-4 text-success" />
          <CardTitle className="text-base">Strong Topics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {strong.map((t) => (
            <div key={t.topic}>
              <div className="flex justify-between text-sm mb-1">
                <span>{t.topic}</span>
                <Badge variant="success">{t.accuracy}%</Badge>
              </div>
              <Progress value={t.accuracy} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
