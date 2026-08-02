"use client";
import { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, Loader2, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Msg {
  role: "user" | "ai";
  text: string;
}

export default function AiDoubtSolverPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", text: "Hi! Paste any question you're stuck on and I'll explain it step by step." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    const question = input;
    setMessages((m) => [...m, { role: "user", text: question }]);
    setInput("");
    setLoading(true);

    try {
      // Wire this to /api/ai/doubt-solver, which calls Gemini server-side
      // and saves the Q&A to prisma.aiDoubt for history.
      const res = await fetch("/api/ai/doubt-solver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "ai", text: data.answer ?? "Sorry, I couldn't process that right now." }]);
    } catch {
      setMessages((m) => [...m, { role: "ai", text: "Something went wrong reaching the AI service." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col h-screen">
        <Topbar userName="Student" />
        <main className="flex-1 flex flex-col p-4 lg:p-8 overflow-hidden">
          <h1 className="text-2xl font-bold mb-1">AI Doubt Solver</h1>
          <p className="text-muted-foreground mb-4">Instant, step-by-step explanations for any question.</p>

          <Card className="flex-1 flex flex-col overflow-hidden">
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={cn("flex gap-3", m.role === "user" && "flex-row-reverse")}>
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                      m.role === "ai" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                    )}
                  >
                    {m.role === "ai" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </span>
                  <div
                    className={cn(
                      "max-w-[75%] rounded-xl px-4 py-2.5 text-sm",
                      m.role === "ai" ? "bg-muted" : "bg-primary text-primary-foreground"
                    )}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" /> Thinking...
                </div>
              )}
            </CardContent>
            <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-border p-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your doubt here..."
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={loading}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </Card>
        </main>
      </div>
    </div>
  );
}
