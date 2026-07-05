import { AppShell } from "@/components/app-shell";
import { PracticeSession } from "@/components/practice-session";
import { questionBank, publicQuestion } from "@/lib/question-bank";

export default function PracticePage() {
  const initialQuestion = questionBank.find((question) => question.topic === "Arrays" && question.difficulty === 3);

  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">Adaptive practice</h1>
        <p className="text-slate-600">
          One question at a time. Difficulty moves based on your answer, and wrong answers get AI coaching.
        </p>
      </div>
      <PracticeSession
        initialQuestion={publicQuestion(initialQuestion ?? questionBank[0])}
        questions={questionBank.map(publicQuestion)}
      />
    </AppShell>
  );
}
