import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(req: Request) {
  const { prompt } = await req.json();

  // Call Gemini API
  const response = await fetch("https://gemini.googleapis.com/v1/generate", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.GEMINI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ prompt })
  });

  const data = await response.json();
  const questions = data.questions || [];

  // Save each question to Supabase
  for (const q of questions) {
    await supabase.from('questions').insert({
      question: q.question,
      options: q.options,
      answer: q.answer,
      explanation: q.explanation,
      subject: q.subject,
      topic: q.topic,
      difficulty: q.difficulty,
      exam: q.exam
    });
  }

  // ✅ Important: Always return a response
  return NextResponse.json({ questions });
}
