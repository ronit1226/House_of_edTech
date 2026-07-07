"use client";

import { FileUp, Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { canGenerateResumeInterview } from "@/lib/resume-interview";

export function ResumeInterviewUploader() {
  const [resumeText, setResumeText] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function readFile(file: File) {
    setFileName(file.name);
    setResumeFile(file);
    setError(null);
    setResult(null);
    if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
      setResumeText("");
      return;
    }
    const text = await file.text();
    setResumeText(text.trim());
  }

  async function generate() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const hasUploadedFile = Boolean(resumeFile);
      const body = hasUploadedFile ? new FormData() : JSON.stringify({ resumeText });

      if (body instanceof FormData && resumeFile) {
        body.append("resumeFile", resumeFile);
        body.append("resumeText", resumeText);
      }

      const response = await fetch("/api/ai/resume-interview", {
        method: "POST",
        ...(hasUploadedFile ? {} : { headers: { "Content-Type": "application/json" } }),
        body,
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Add at least 80 characters of resume text before generating.");
        return;
      }

      setResult(data.result);
    } catch {
      setError("Resume AI generation failed. Check your connection and API configuration.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <Card className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="resumeFile">Upload resume</Label>
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center hover:bg-slate-100">
            <FileUp className="mb-3 h-8 w-8 text-emerald-700" />
            <span className="font-medium">{fileName ?? "Choose resume file"}</span>
            <span className="mt-1 text-sm text-slate-600">TXT, MD, and text-based PDF files are supported.</span>
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
        <div className="space-y-2">
          <Label htmlFor="resumeText">Resume text</Label>
          <textarea
            id="resumeText"
            value={resumeText}
            onChange={(event) => {
              setResumeText(event.target.value);
              setResumeFile(null);
              setFileName(null);
              setError(null);
            }}
            placeholder="Paste your resume text, projects, skills, internship, education, and achievements here."
            className="min-h-56 w-full rounded-md border border-slate-300 p-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
          />
        </div>
        {error ? <p className="rounded-md bg-rose-50 p-3 text-sm text-rose-700">{error}</p> : null}
        <Button
          onClick={generate}
          disabled={loading || !canGenerateResumeInterview({ resumeText, resumeFile })}
        >
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
