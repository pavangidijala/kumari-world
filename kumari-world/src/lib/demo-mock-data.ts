import type { MockTestMeta } from "@/types";

// In production, fetch this from Prisma: prisma.test.findUnique({ where: { id }, include: { questions: { include: { question: true } } } })
export function getDemoMockTest(id: string): MockTestMeta {
  const sections = [
    { name: "Reasoning", questionCount: 10 },
    { name: "Quantitative Aptitude", questionCount: 10 },
    { name: "English Language", questionCount: 10 },
  ];

  const questions = sections.flatMap((section) =>
    Array.from({ length: section.questionCount }, (_, i) => ({
      id: `${section.name}-${i + 1}`,
      section: section.name,
      questionText: `[${section.name}] Sample question ${i + 1}: Choose the correct option based on the given data/passage.`,
      options: [
        { key: "A", text: "Option A" },
        { key: "B", text: "Option B" },
        { key: "C", text: "Option C" },
        { key: "D", text: "Option D" },
        { key: "E", text: "None of these" },
      ],
      correctOption: ["A", "B", "C", "D", "E"][i % 5],
    }))
  );

  return {
    id,
    title: "IBPS PO Prelims Full Mock Test",
    durationMins: 60,
    negativeMark: 0.25,
    sections,
    questions,
  };
}
