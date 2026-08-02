'use client';
import { useEffect, useState } from 'react';

export default function MockTests() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Generate 20 multiple-choice questions for bank exams (Reasoning, Quant, English, GK).`
        })
      });
      const data = await res.json();
      setQuestions(data.questions);
      setLoading(false);
    };

    loadQuestions();
  }, []);

  if (loading) return <p>Loading questions...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mock Test</h1>
      {questions.map((q, idx) => (
        <div key={idx} className="mb-6">
          <p className="font-semibold">{q.question}</p>
          <ul className="list-disc ml-6">
            {q.options.map((opt: string, i: number) => (
              <li key={i}>{opt}</li>
            ))}
          </ul>
          <p className="text-sm text-gray-600 mt-2">
            Correct Answer: {q.options[q.answer]}
          </p>
          <p className="text-xs text-gray-500">{q.explanation}</p>
        </div>
      ))}
    </div>
  );
}
