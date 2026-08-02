import { TestRunner } from "@/components/mock-test/test-runner";
import { getDemoMockTest } from "@/lib/demo-mock-data";

// In production: const test = await prisma.test.findUnique({ where: { id: params.id }, include: {...} });
export default function MockTestPage({ params }: { params: { id: string } }) {
  const test = getDemoMockTest(params.id);
  return <TestRunner test={test} />;
}
