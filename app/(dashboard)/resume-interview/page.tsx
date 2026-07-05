import { AppShell } from "@/components/app-shell";
import { ResumeInterviewUploader } from "@/components/resume-interview-uploader";

export default function ResumeInterviewPage() {
  return (
    <AppShell>
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Resume intelligence</p>
        <h1 className="mt-1 text-3xl font-semibold">Resume-based AI interview</h1>
        <p className="text-slate-600">
          Paste resume text and ReadyAI extracts skills, projects, experience, and interview questions.
        </p>
      </div>
      <ResumeInterviewUploader />
    </AppShell>
  );
}
