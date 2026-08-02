"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.12),_transparent_55%)]" />
      <div className="container py-20 md:py-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground"
        >
          <Sparkles className="h-4 w-4" />
          AI-powered doubt solver &amp; mock analysis
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="mx-auto max-w-3xl text-4xl md:text-6xl font-extrabold tracking-tight"
        >
          Crack Banking Exams with{" "}
          <span className="bg-gradient-to-r from-primary to-violet-400 bg-clip-text text-transparent">
            Kumari World
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground"
        >
          Full-length mock tests, topic-wise practice, daily quizzes and auto-updated current affairs — for SBI PO,
          IBPS, RBI, LIC, NABARD and every major banking &amp; insurance exam. One platform, real exam experience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Button size="lg" asChild>
            <Link href="/signup">
              Start Free Mock Test <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/#exams">Explore Exams</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 grid grid-cols-3 max-w-lg mx-auto gap-6 text-sm"
        >
          <div>
            <div className="flex items-center justify-center gap-1 text-2xl font-bold">
              <Users className="h-5 w-5 text-primary" /> 2L+
            </div>
            <p className="text-muted-foreground mt-1">Students</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 text-2xl font-bold">
              <Trophy className="h-5 w-5 text-primary" /> 8K+
            </div>
            <p className="text-muted-foreground mt-1">Selections</p>
          </div>
          <div>
            <div className="text-2xl font-bold">50K+</div>
            <p className="text-muted-foreground mt-1">Questions</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
