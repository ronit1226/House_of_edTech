import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";

export default function MentorPage() {
  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">Mentor cohort view</h1>
        <p className="text-slate-600">Aggregated and anonymized only. No individual student records.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        <Card>
          <p className="text-sm text-slate-600">Students represented</p>
          <p className="mt-2 text-3xl font-semibold">42</p>
        </Card>
        <Card>
          <p className="text-sm text-slate-600">Average mastery</p>
          <p className="mt-2 text-3xl font-semibold">63%</p>
        </Card>
        <Card>
          <p className="text-sm text-slate-600">Most common weak topic</p>
          <p className="mt-2 text-3xl font-semibold">DP</p>
        </Card>
      </div>
    </AppShell>
  );
}
