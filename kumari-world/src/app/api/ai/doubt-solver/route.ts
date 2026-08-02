import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

// Uses Google Gemini via Netlify AI Gateway. This route:
// 1. Auths the user via Supabase
// 2. Calls Gemini with the question
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
    "AI service is not configured yet. Enable Netlify AI Gateway on this site to get live explanations.";

  if (process.env.GEMINI_API_KEY) {
    try {
      const ai = new GoogleGenAI({});
      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `You are a banking exam tutor. Explain this question step by step, concisely: ${question}`,
      });
      answer = result.text ?? answer;
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
