"use client";
import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";

export function Topbar({ userName, exam }: { userName: string; exam?: string | null }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border px-4 lg:px-8 py-4">
      <div>
        <h1 className="font-semibold text-lg">Welcome back, {userName.split(" ")[0]} 👋</h1>
        {exam && <p className="text-sm text-muted-foreground">Preparing for {exam.replaceAll("_", " ")}</p>}
      </div>
      <div className="hidden md:flex items-center relative w-full max-w-sm">
        <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search tests, topics, notes..." className="pl-9" />
      </div>
      <div className="flex items-center gap-1">
        <button className="relative flex h-10 w-10 items-center justify-center rounded-lg hover:bg-accent">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-destructive" />
        </button>
        <ThemeToggle />
      </div>
    </div>
  );
}
