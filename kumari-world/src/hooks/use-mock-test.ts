"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { MockTestMeta, QuestionState, QuestionStatus } from "@/types";

const AUTOSAVE_KEY_PREFIX = "kumari_mock_attempt_";

export function useMockTest(test: MockTestMeta) {
  const router = useRouter();
  const totalSeconds = test.durationMins * 60;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [answers, setAnswers] = useState<Record<string, QuestionState>>(() => {
    const initial: Record<string, QuestionState> = {};
    test.questions.forEach((q) => {
      initial[q.id] = { selected: null, status: "not_visited", timeSpentSec: 0 };
    });
    return initial;
  });
  const submittedRef = useRef(false);

  // Restore autosave (Continue Last Mock)
  useEffect(() => {
    const raw = localStorage.getItem(AUTOSAVE_KEY_PREFIX + test.id);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed.answers) setAnswers(parsed.answers);
        if (typeof parsed.secondsLeft === "number") setSecondsLeft(parsed.secondsLeft);
        if (typeof parsed.currentIndex === "number") setCurrentIndex(parsed.currentIndex);
      } catch {
        /* ignore corrupt autosave */
      }
    }
    // mark first question visited
    setAnswers((prev) => {
      const first = test.questions[0];
      if (!first || prev[first.id]?.status !== "not_visited") return prev;
      return { ...prev, [first.id]: { ...prev[first.id], status: "not_answered" } };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [test.id]);

  // Autosave every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem(
        AUTOSAVE_KEY_PREFIX + test.id,
        JSON.stringify({ answers, secondsLeft, currentIndex })
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [answers, secondsLeft, currentIndex, test.id]);

  const submit = useCallback(() => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    localStorage.setItem(
      AUTOSAVE_KEY_PREFIX + test.id + "_final",
      JSON.stringify({ answers, submittedAt: Date.now() })
    );
    localStorage.removeItem(AUTOSAVE_KEY_PREFIX + test.id);
    router.push(`/mock-test/${test.id}/result`);
  }, [answers, router, test.id]);

  // Timer + auto-submit
  useEffect(() => {
    if (secondsLeft <= 0) {
      submit();
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secondsLeft, submit]);

  const currentQuestion = test.questions[currentIndex];

  function updateStatus(id: string, status: QuestionStatus) {
    setAnswers((prev) => ({ ...prev, [id]: { ...prev[id], status } }));
  }

  function selectOption(optionKey: string) {
    setAnswers((prev) => {
      const prevState = prev[currentQuestion.id];
      const status: QuestionStatus =
        prevState.status === "marked" || prevState.status === "answered_marked" ? "answered_marked" : "answered";
      return { ...prev, [currentQuestion.id]: { ...prevState, selected: optionKey, status } };
    });
  }

  function clearResponse() {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: { ...prev[currentQuestion.id], selected: null, status: "not_answered" } }));
  }

  function goTo(index: number) {
    if (index < 0 || index >= test.questions.length) return;
    setCurrentIndex(index);
    const q = test.questions[index];
    setAnswers((prev) => {
      if (prev[q.id].status !== "not_visited") return prev;
      return { ...prev, [q.id]: { ...prev[q.id], status: "not_answered" } };
    });
  }

  function saveAndNext() {
    goTo(currentIndex + 1);
  }

  function markForReview() {
    setAnswers((prev) => {
      const prevState = prev[currentQuestion.id];
      const status: QuestionStatus = prevState.selected ? "answered_marked" : "marked";
      return { ...prev, [currentQuestion.id]: { ...prevState, status } };
    });
    goTo(currentIndex + 1);
  }

  return {
    currentQuestion,
    currentIndex,
    answers,
    secondsLeft,
    totalSeconds,
    goTo,
    selectOption,
    clearResponse,
    saveAndNext,
    markForReview,
    submit,
    updateStatus,
  };
}
