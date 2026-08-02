"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const exams = [
  { code: "SBI_PO", name: "SBI PO", tests: 42, tag: "Popular" },
  { code: "SBI_CLERK", name: "SBI Clerk", tests: 36 },
  { code: "IBPS_PO", name: "IBPS PO", tests: 48, tag: "Popular" },
  { code: "IBPS_CLERK", name: "IBPS Clerk", tests: 40 },
  { code: "IBPS_RRB", name: "IBPS RRB", tests: 30 },
  { code: "RBI", name: "RBI Grade B / Assistant", tests: 22 },
  { code: "LIC", name: "LIC AAO / ADO", tests: 26 },
  { code: "NABARD", name: "NABARD Grade A", tests: 18 },
  { code: "INSURANCE", name: "Insurance Exams", tests: 20 },
];

export function ExamsGrid() {
  return (
    <section id="exams" className="container py-20">
      <div className="text-center max-w-xl mx-auto mb-12">
        <h2 className="text-3xl font-bold">Choose Your Exam</h2>
        <p className="text-muted-foreground mt-2">
          Curated mock tests and study material mapped exactly to the latest exam pattern.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {exams.map((e, i) => (
          <motion.div
            key={e.code}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
          >
            <Link href={`/topic-tests?exam=${e.code}`}>
              <Card className="h-full transition-shadow hover:shadow-lg hover:-translate-y-0.5 transition-transform">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>{e.name}</CardTitle>
                  {e.tag && <Badge>{e.tag}</Badge>}
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{e.tests} mock tests available</CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
