import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <section className="container py-20 text-center">
      <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-transparent p-10">
        <h2 className="text-3xl font-bold">Ready to start your prep?</h2>
        <p className="text-muted-foreground mt-2">Create a free account and take your first mock test today.</p>
        <Button size="lg" className="mt-6" asChild>
          <Link href="/signup">Create Free Account</Link>
        </Button>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="h-4 w-4" />
          </span>
          Kumari World
        </Link>
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Kumari World. All rights reserved.</p>
        <div className="flex gap-5 text-sm text-muted-foreground">
          <Link href="/current-affairs">Current Affairs</Link>
          <Link href="/notes">Notes</Link>
          <Link href="/login">Login</Link>
        </div>
      </div>
    </footer>
  );
}
