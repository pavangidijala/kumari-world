"use client";
import { motion } from "framer-motion";
import {
  Timer, BrainCircuit, Newspaper, BookMarked, CalendarClock, Target,
  LineChart, FileText, AlertCircle, Bot,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  { icon: Timer, title: "Full-Length Mock Tests", desc: "Real exam interface with timer, palette & auto-submit." },
  { icon: Target, title: "Topic-wise Practice", desc: "Drill weak topics until they become your strong ones." },
  { icon: Newspaper, title: "Daily Quiz & Current Affairs", desc: "Auto-updated every single day, zero manual effort." },
  { icon: LineChart, title: "Deep Result Analysis", desc: "Section-wise performance, accuracy & percentile charts." },
  { icon: AlertCircle, title: "Mistake Book", desc: "Wrong answers saved automatically for focused revision." },
  { icon: BookMarked, title: "Bookmarks", desc: "Save tricky questions and revisit them anytime." },
  { icon: CalendarClock, title: "Study Planner & Countdown", desc: "AI-generated daily plan tied to your exam date." },
  { icon: FileText, title: "PDF Notes & Banking Awareness", desc: "Concise, exam-focused notes for every subject." },
  { icon: Bot, title: "AI Doubt Solver", desc: "Get instant, step-by-step explanations for any question." },
  { icon: BrainCircuit, title: "AI Mock Analysis", desc: "Personalised feedback after every test you take." },
];

export function Features() {
  return (
    <section id="features" className="bg-secondary/40 py-20">
      <div className="container">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl font-bold">Everything You Need to Crack It</h2>
          <p className="text-muted-foreground mt-2">One platform. Every tool a serious aspirant needs.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base">{f.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground -mt-2">{f.desc}</CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
