import { AppShell } from "@/components/app-shell";
import { MockInterviewClient } from "@/components/mock-interview-client";

export default function MockInterviewPage() {
  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">AI mock interview</h1>
        <p className="text-slate-600">A bounded 5-question session with qualitative feedback.</p>
      </div>
      <MockInterviewClient />
    </AppShell>
  );
}
