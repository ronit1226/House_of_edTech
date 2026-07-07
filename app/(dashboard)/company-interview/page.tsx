import { AppShell } from "@/components/app-shell";
import { AiGeneratorPanel } from "@/components/ai-generator-panel";

export default function CompanyInterviewPage() {
  return (
    <AppShell>
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Company mode</p>
        <h1 className="mt-1 text-3xl font-semibold">Company-specific interview</h1>
      </div>
      <AiGeneratorPanel
        endpoint="/api/ai/company-interview"
        buttonLabel="Generate company interview"
        fields={[
          {
            type: "select",
            name: "company",
            label: "Company",
            options: ["Google", "Amazon", "Microsoft", "TCS", "Infosys", "Accenture", "Capgemini", "Cognizant"],
            defaultValue: "TCS",
          },
          {
            type: "select",
            name: "level",
            label: "Difficulty",
            options: ["easy", "medium", "hard"],
            defaultValue: "medium",
          },
        ]}
      />
    </AppShell>
  );
}
