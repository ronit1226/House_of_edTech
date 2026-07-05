import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  Building2,
  CalendarClock,
  FileText,
  MessageSquareText,
  type LucideIcon,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  const features: { title: string; copy: string; Icon: LucideIcon }[] = [
    {
      title: "Adaptive engine",
      copy: "Difficulty moves up or down after each answer.",
      Icon: BrainCircuit,
    },
    {
      title: "SM-2 review queue",
      copy: "Weak topics return when memory needs reinforcement.",
      Icon: CalendarClock,
    },
    {
      title: "AI feedback",
      copy: "Wrong answers and mock interviews get tailored feedback.",
      Icon: MessageSquareText,
    },
    {
      title: "Resume interview",
      copy: "Generate questions from a student's real resume skills and projects.",
      Icon: FileText,
    },
    {
      title: "Company mode",
      copy: "Switch preparation style for TCS, Amazon, Infosys, Google, and more.",
      Icon: Building2,
    },
  ];

  return (
    <AppShell>
      <section className="grid gap-8 py-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
            Adaptive placement readiness
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
            ReadyAI diagnoses weak CS topics and schedules exactly what to review next.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-700">
            Students get adaptive questions, spaced repetition, AI explanations for mistakes,
            readiness analytics, and a bounded mock interview flow.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/signup">
                Start diagnostic <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/dashboard">View dashboard</Link>
            </Button>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {features.map(({ title, copy, Icon }) => (
            <Card key={title} className="flex gap-4">
              <Icon className="mt-1 h-5 w-5 text-emerald-700" />
              <div>
                <h2 className="font-semibold">{title}</h2>
                <p className="text-sm leading-6 text-slate-600">{copy}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
