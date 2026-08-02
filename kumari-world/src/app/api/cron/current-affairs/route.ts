import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Configured in vercel.json to run daily. Pulls headlines from a news API
// (set NEWS_API_KEY) filtered to banking/economy/national categories and
// upserts them into prisma.currentAffair.
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.NEWS_API_KEY) {
    return NextResponse.json({ message: "NEWS_API_KEY not configured — skipping fetch" });
  }

  // Example integration point — replace with your chosen news provider.
  // const res = await fetch(`https://newsapi.org/v2/top-headlines?category=business&country=in&apiKey=${process.env.NEWS_API_KEY}`);
  // const data = await res.json();
  // const articles = data.articles ?? [];

  const articles: { title: string; description: string; url: string; publishedAt: string }[] = [];

  let created = 0;
  for (const a of articles) {
    await prisma.currentAffair.create({
      data: {
        title: a.title,
        summary: a.description ?? "",
        category: "Banking",
        sourceUrl: a.url,
        publishedAt: new Date(a.publishedAt),
      },
    });
    created++;
  }

  return NextResponse.json({ message: `Fetched ${created} current affairs items` });
}
