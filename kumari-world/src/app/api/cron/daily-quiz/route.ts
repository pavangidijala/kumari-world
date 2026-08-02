import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Configured in vercel.json to run once daily. Picks 10 random questions and
// publishes them as a new Test (type DAILY_QUIZ) + DailyQuiz row for today.
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const existing = await prisma.dailyQuiz.findUnique({ where: { date: today } });
  if (existing) {
    return NextResponse.json({ message: "Daily quiz already published for today" });
  }

  const questions = await prisma.question.findMany({ take: 10, orderBy: { createdAt: "desc" } });
  if (questions.length === 0) {
    return NextResponse.json({ message: "No questions available yet" }, { status: 200 });
  }

  const test = await prisma.test.create({
    data: {
      title: `Daily Quiz — ${today.toDateString()}`,
      type: "DAILY_QUIZ",
      examCategory: "IBPS_PO",
      durationMins: 10,
      totalMarks: questions.length,
      sections: [{ name: "Mixed", questionCount: questions.length }],
      questions: {
        create: questions.map((q, i) => ({ questionId: q.id, order: i + 1, section: "Mixed" })),
      },
    },
  });

  await prisma.dailyQuiz.create({
    data: { date: today, testId: test.id, title: test.title },
  });

  return NextResponse.json({ message: "Daily quiz published", testId: test.id });
}
