"use client";

import { Bot, Loader2, Mic, Send, Sparkles, UserRound } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Message = {
  role: "assistant" | "student";
  content: string;
  timestamp: string;
};

export function MockInterviewClient() {
  const [interviewId, setInterviewId] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<Message[]>([]);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const answered = transcript.filter((message) => message.role === "student").length;

  async function start() {
    setLoading(true);
    setError(null);
    const res = await fetch("/api/mock-interview/start", { method: "POST" });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Please login first to start an interview.");
      return;
    }

    setInterviewId(data.interviewId);
    setTranscript(data.transcript);
    setFinished(false);
  }

  async function send() {
    if (!interviewId || response.trim().length < 3) {
      return;
    }

    setLoading(true);
    setError(null);
    const res = await fetch("/api/mock-interview/respond", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ interviewId, response }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Could not send response.");
      return;
    }

    setTranscript(data.transcript);
    setFinished(data.finished);
    setResponse("");
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
      <Card className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold">Technical interview room</h2>
            <p className="text-sm text-slate-600">5 focused questions with AI feedback after every answer.</p>
          </div>
          <Button onClick={start} disabled={loading}>
            {loading && !interviewId ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mic className="h-4 w-4" />}
            {interviewId ? "Restart interview" : "Start interview"}
          </Button>
        </div>

        {error ? <p className="rounded-md bg-rose-50 p-3 text-sm text-rose-700">{error}</p> : null}

        <div className="min-h-80 space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
          {transcript.length === 0 ? (
            <div className="flex min-h-72 flex-col items-center justify-center text-center text-slate-600">
              <Sparkles className="mb-3 h-8 w-8 text-emerald-700" />
              <p className="font-medium text-slate-900">Start when ready.</p>
              <p className="mt-1 max-w-md text-sm">
                The AI interviewer will ask CS/IT placement questions and evaluate clarity, correctness, and completeness.
              </p>
            </div>
          ) : (
            transcript.map((message, index) => (
              <div
                key={`${message.timestamp}-${index}`}
                className={`flex gap-3 ${message.role === "student" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" ? <Bot className="mt-2 h-5 w-5 text-emerald-700" /> : null}
                <div
                  className={`max-w-2xl whitespace-pre-wrap rounded-lg p-4 text-sm leading-6 ${
                    message.role === "student"
                      ? "bg-emerald-600 text-white"
                      : "border border-slate-200 bg-white text-slate-800"
                  }`}
                >
                  {message.content}
                </div>
                {message.role === "student" ? <UserRound className="mt-2 h-5 w-5 text-slate-500" /> : null}
              </div>
            ))
          )}
        </div>

        <div className="space-y-3">
          <textarea
            value={response}
            onChange={(event) => setResponse(event.target.value)}
            disabled={!interviewId || finished || loading}
            className="min-h-32 w-full rounded-md border border-slate-300 p-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            placeholder={finished ? "Interview complete." : "Type your answer like you would in a real interview..."}
          />
          <Button onClick={send} disabled={!interviewId || finished || loading || response.trim().length < 3}>
            {loading && interviewId ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            Send answer
          </Button>
        </div>
      </Card>

      <div className="space-y-5">
        <Card>
          <p className="text-sm text-slate-600">Interview progress</p>
          <p className="mt-2 text-3xl font-semibold">{Math.min(answered, 5)}/5</p>
          <p className="mt-1 text-sm text-slate-600">{finished ? "Final feedback saved" : "Questions answered"}</p>
        </Card>
        <Card>
          <h3 className="font-semibold">Scoring rubric</h3>
          <div className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
            <p>Correctness: does the technical idea work?</p>
            <p>Completeness: did you mention edge cases and complexity?</p>
            <p>Clarity: can an interviewer follow your explanation?</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
