"use client";

import { FileUp, Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export function ResumeInterviewUploader() {
  const [resumeText, setResumeText] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function readFile(file: File) {
    setFileName(file.name);
    const text = await file.text();
    setResumeText(text.trim());
  }

  async function generate() {
    setLoading(true);
    setError(null);
    setResult(null);
    const response = await fetch("/api/ai/resume-interview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resumeText }),
    });
    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError("Could not read enough resume text from the uploaded file.");
      return;
    }

    setResult(data.result);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <Card className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="resumeFile">Upload resume</Label>
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center hover:bg-slate-100">
            <FileUp className="mb-3 h-8 w-8 text-emerald-700" />
            <span className="font-medium">{fileName ?? "Choose resume file"}</span>
            <span className="mt-1 text-sm text-slate-600">TXT/MD/PDF files are supported.</span>
            <input
              id="resumeFile"
              type="file"
              accept=".txt,.md,.pdf"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void readFile(file);
              }}
            />
          </label>
        </div>
        {error ? <p className="rounded-md bg-rose-50 p-3 text-sm text-rose-700">{error}</p> : null}
        <Button onClick={generate} disabled={loading || resumeText.trim().length < 80}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          Generate resume interview
        </Button>
      </Card>
      <Card>
        <h2 className="mb-4 font-semibold">Resume AI Output</h2>
        {result ? (
          <pre className="whitespace-pre-wrap rounded-lg bg-slate-950 p-5 text-sm leading-6 text-slate-100">
            {result}
          </pre>
        ) : (
          <div className="flex min-h-96 items-center justify-center rounded-lg border border-dashed border-slate-300 p-6 text-center text-sm leading-6 text-slate-600">
            Upload or paste resume text to generate realistic interview questions from your own profile.
          </div>
        )}
      </Card>
    </div>
  );
}
