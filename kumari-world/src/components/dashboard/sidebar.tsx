"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, FileText, ListChecks, History, CalendarClock,
  Newspaper, BookMarked, AlertCircle, Bot, Settings, GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/mock-test", label: "Mock Tests", icon: FileText },
  { href: "/topic-tests", label: "Topic-wise Tests", icon: ListChecks },
  { href: "/previous-papers", label: "Previous Papers", icon: History },
  { href: "/daily-quiz", label: "Daily Quiz", icon: ListChecks },
  { href: "/current-affairs", label: "Current Affairs", icon: Newspaper },
  { href: "/notes", label: "PDF Notes", icon: FileText },
  { href: "/planner", label: "Study Planner", icon: CalendarClock },
  { href: "/bookmarks", label: "Bookmarks", icon: BookMarked },
  { href: "/mistake-book", label: "Mistake Book", icon: AlertCircle },
  { href: "/ai-doubt-solver", label: "AI Doubt Solver", icon: Bot },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col border-r border-border h-screen sticky top-0 px-4 py-6">
      <Link href="/" className="flex items-center gap-2 font-bold mb-8 px-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <GraduationCap className="h-4 w-4" />
        </span>
        Kumari World
      </Link>
      <nav className="flex-1 space-y-1">
        {nav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <Link href="/settings" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent">
        <Settings className="h-4 w-4" />
        Settings
      </Link>
    </aside>
  );
}
