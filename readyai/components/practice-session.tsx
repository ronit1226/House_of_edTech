"use client";

import { ArrowRight, BrainCircuit, CheckCircle2, Lightbulb, Loader2, XCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Question = {
  id: string;
  topicId: string;
  topic: string;
  category: string;
  difficulty: number;
  content: string;
  options: string[];
};

type AttemptResult = {
  attemptId: string;
  isCorrect: boolean;
  aiExplanation: string | null;
  mastery: number;
  nextQuestion: Question | null;
};

export function PracticeSession({
  initialQuestion,
  questions,
}: {
  initialQuestion: Question;
  questions: Question[];
}) {
  const [question, setQuestion] = useState(initialQuestion);
  const [answer, setAnswer] = useState(initialQuestion.options[0]);
  const [result, setResult] = useState<AttemptResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [streak, setStreak] = useState(0);
  const [answered, setAnswered] = useState(0);

  const difficultyLabel = useMemo(() => {
    return ["", "Beginner", "Easy", "Interview", "Advanced", "Expert"][question.difficulty];
  }, [question.difficulty]);

  async function submit() {
    setLoading(true);
    const response = await fetch("/api/attempts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionId: question.id, submittedAnswer: answer }),
    });
    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setResult({
        attemptId: "",
        isCorrect: false,
        aiExplanation: data.error ?? "Please login first, then start the practice session.",
        mastery: 0,
        nextQuestion: question,
      });
      return;
    }

    setAnswered((value) => value + 1);
    setStreak((value) => (data.isCorrect ? value + 1 : 0));
    setResult(data);
  }

  function next() {
    if (!result?.nextQuestion) {
      return;
    }

    setQuestion(result.nextQuestion);
    setAnswer(result.nextQuestion.options[0]);
    setResult(null);
  }

  function changeSubject(topic: string) {
    const nextQuestion = questions.find((item) => item.topic === topic && item.difficulty === 3) ??
      questions.find((item) => item.topic === topic) ??
      initialQuestion;
    setQuestion(nextQuestion);
    setAnswer(nextQuestion.options[0]);
    setResult(null);
  }

  const subjects = Array.from(new Set(questions.map((item) => item.topic)));

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
      <Card className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              {question.category}
            </p>
            <h1 className="mt-1 text-2xl font-semibold text-slate-950">{question.topic}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={question.topic}
              onChange={(event) => changeSubject(event.target.value)}
              className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-emerald-600"
            >
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
            <div className="rounded-md bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700">
              Level {question.difficulty} · {difficultyLabel}
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
          <p className="text-lg font-semibold leading-8 text-slate-950">{question.content}</p>
        </div>

        <div className="grid gap-3">
          {question.options.map((option, index) => (
            <button
              key={option}
              type="button"
              disabled={Boolean(result)}
              onClick={() => setAnswer(option)}
              className={`rounded-lg border p-4 text-left text-sm transition ${
                answer === option
                  ? "border-emerald-600 bg-emerald-50 text-emerald-950"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              <span className="mr-3 inline-flex h-6 w-6 items-center justify-center rounded-md bg-slate-100 text-xs font-semibold">
                {String.fromCharCode(65 + index)}
              </span>
              {option}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={submit} disabled={loading || Boolean(result)}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <BrainCircuit className="h-4 w-4" />}
            Check with AI coach
          </Button>
          <Button onClick={next} disabled={!result?.nextQuestion} variant="outline">
            Next adaptive question <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {result ? (
          <div
            className={`rounded-lg border p-4 ${
              result.isCorrect ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"
            }`}
          >
            <div className="flex items-center gap-2 font-semibold">
              {result.isCorrect ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-700" />
              ) : (
                <XCircle className="h-5 w-5 text-rose-700" />
              )}
              {result.isCorrect ? "Correct. Difficulty will increase." : "Not quite. Difficulty will adapt down."}
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              Mastery for this topic is now <span className="font-semibold">{result.mastery}%</span>.
            </p>
            {result.aiExplanation ? (
              <div className="mt-3 flex gap-3 rounded-md bg-white p-3 text-sm leading-6 text-slate-700">
                <Lightbulb className="mt-1 h-4 w-4 shrink-0 text-amber-600" />
                <p>{result.aiExplanation}</p>
              </div>
            ) : null}
          </div>
        ) : null}
      </Card>

      <div className="space-y-5">
        <Card>
          <p className="text-sm text-slate-600">Session progress</p>
          <p className="mt-2 text-3xl font-semibold">{answered} answered</p>
          <p className="mt-1 text-sm text-slate-600">{streak} correct streak</p>
        </Card>
        <Card>
          <h2 className="font-semibold">How ReadyAI adapts</h2>
          <div className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
            <p>Correct answer: next question gets harder, capped at level 5.</p>
            <p>Wrong answer: next question becomes easier, and AI explains the misconception.</p>
            <p>Every answer updates mastery and review scheduling in the database.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
