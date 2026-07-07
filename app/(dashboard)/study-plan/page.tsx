import { AppShell } from "@/components/app-shell";
import { AiGeneratorPanel } from "@/components/ai-generator-panel";

export default function StudyPlanPage() {
  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="mt-1 text-3xl font-semibold">AI personalized study planner</h1>
        <p className="text-slate-600">
          Turn weak topics and interview deadline into a practical timetable.
        </p>
      </div>
      <AiGeneratorPanel
        endpoint="/api/ai/study-plan"
        buttonLabel="Create study plan"
        fields={[
          {
            type: "text",
            name: "weakTopics",
            label: "Weak topics",
            placeholder: "Graphs, Operating System, Dynamic Programming",
            defaultValue: "Graphs, Operating System, Dynamic Programming",
          },
          {
            type: "number",
            name: "dailyHours",
            label: "Daily study hours",
            placeholder: "3",
            defaultValue: "3",
          },
          {
            type: "text",
            name: "targetCompany",
            label: "Target company",
            placeholder: "TCS, Amazon, Infosys...",
            defaultValue: "TCS",
          },
          {
            type: "text",
            name: "interviewDate",
            label: "Interview date",
            placeholder: "10 days from now",
            defaultValue: "10 days from now",
          },
        ]}
      />
    </AppShell>
  );
}
