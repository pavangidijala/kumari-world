import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

// Wire AI_API_KEY (Google Gemini) in .env.local. This route:
// 1. Auths the user via Supabase
// 2. Calls the AI provider with the question
// 3. Saves the Q&A pair to prisma.aiDoubt for history
export async function POST(request: Request) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { question } = await request.json();
  if (!question || typeof question !== "string") {
    return NextResponse.json({ error: "question is required" }, { status: 400 });
  }

  let answer =
    "AI service is not configured yet. Add AI_API_KEY to your environment to enable live explanations.";

  if (process.env.AI_API_KEY) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.AI_API_KEY}`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are a banking exam tutor. Explain this question step by step, concisely: ${question}`,
                  },
                ],
              },
            ],
          }),
        }
      );
      const data = await res.json();
      answer = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? answer;
    } catch {
      answer = "The AI service is temporarily unavailable. Please try again shortly.";
    }
  }

  try {
    await prisma.aiDoubt.create({
      data: { userId: user.id, question, answer },
    });
  } catch {
    // Non-fatal: still return the answer even if history save fails
  }

  return NextResponse.json({ answer });
}
