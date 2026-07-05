import Link from "next/link";
import { ArrowRight, BrainCircuit, CalendarClock, Building2, FileText, Flame, Target } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { SkillRadarChart } from "@/components/charts/radar-chart";
import { WeakTopicHeatmap } from "@/components/charts/weak-topic-heatmap";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const mastery = [
  { topic: "Arrays", score: 78 },
  { topic: "Dynamic Programming", score: 42 },
  { topic: "Trees and Graphs", score: 61 },
  { topic: "DBMS and SQL", score: 70 },
  { topic: "Operating System", score: 56 },
  { topic: "OOPS", score: 48 },
];

export default function DashboardPage() {
  const readiness = Math.round(mastery.reduce((total, topic) => total + topic.score, 0) / mastery.length);
  const weakTopics = [...mastery].sort((a, b) => a.score - b.score).slice(0, 3);

  return (
    <AppShell>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Placement cockpit</p>
          <h1 className="mt-1 text-3xl font-semibold">Readiness dashboard</h1>
          <p className="text-slate-600">Your current skill map, weak areas, and today’s best next action.</p>
        </div>
        <Button asChild>
          <Link href="/practice">
            Start focused practice <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="mb-5 grid gap-5 md:grid-cols-3">
        <Card className="bg-slate-950 text-white">
          <p className="text-sm text-slate-600">Overall readiness</p>
          <p className="mt-2 text-5xl font-semibold text-emerald-300">{readiness}%</p>
          <p className="mt-3 text-sm leading-6 text-slate-300">Assignment-ready metric from weighted topic mastery.</p>
        </Card>
        <Card>
          <Target className="h-5 w-5 text-emerald-700" />
          <p className="mt-3 text-sm text-slate-600">Highest priority</p>
          <p className="mt-1 text-2xl font-semibold">{weakTopics[0].topic}</p>
          <p className="mt-1 text-sm text-slate-600">{weakTopics[0].score}% mastery</p>
        </Card>
        <Card>
          <Flame className="h-5 w-5 text-rose-600" />
          <p className="mt-3 text-sm text-slate-600">AI recommendation</p>
          <p className="mt-1 text-2xl font-semibold">Review DP today</p>
          <p className="mt-1 text-sm text-slate-600">Then attempt a mock interview.</p>
        </Card>
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <Card>
          <h2 className="font-semibold">Today’s review queue</h2>
          <div className="mt-5 space-y-3">
            {weakTopics.map((topic) => (
              <Link
                key={topic.topic}
                href="/practice"
                className="flex items-center justify-between rounded-md border border-slate-200 p-3 text-sm hover:bg-slate-50"
              >
                <span className="flex items-center gap-2">
                  <CalendarClock className="h-4 w-4 text-emerald-700" />
                  {topic.topic}
                </span>
                <span className="font-medium">{topic.score}%</span>
              </Link>
            ))}
          </div>
          <div className="mt-5 rounded-md bg-emerald-50 p-4 text-sm leading-6 text-emerald-950">
            Focus order: weakest topic first, then one adaptive session, then one interview response.
          </div>
        </Card>
        <Card>
          <h2 className="font-semibold">Skill radar</h2>
          <SkillRadarChart data={mastery} />
        </Card>
      </div>

      <Card className="mt-5">
        <div className="mb-4 flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-emerald-700" />
          <h2 className="font-semibold">Weak-topic heatmap</h2>
        </div>
        <WeakTopicHeatmap data={mastery} />
      </Card>
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        <Card>
          <FileText className="h-5 w-5 text-emerald-700" />
          <h2 className="mt-3 font-semibold">Resume-based AI interview</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Paste your resume and get questions from your own skills, projects, and internships.
          </p>
          <Button asChild className="mt-4" variant="outline">
            <Link href="/resume-interview">Open resume AI</Link>
          </Button>
        </Card>
        <Card>
          <Building2 className="h-5 w-5 text-emerald-700" />
          <h2 className="mt-3 font-semibold">Company interview mode</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Select TCS, Infosys, Amazon, Google, and more to change the interview pattern.
          </p>
          <Button asChild className="mt-4" variant="outline">
            <Link href="/company-interview">Choose company</Link>
          </Button>
        </Card>
        <Card>
          <BrainCircuit className="h-5 w-5 text-emerald-700" />
          <h2 className="mt-3 font-semibold">Personal study planner</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Convert weak topics into a daily timetable for your target company.
          </p>
          <Button asChild className="mt-4" variant="outline">
            <Link href="/study-plan">Create plan</Link>
          </Button>
        </Card>
      </div>
    </AppShell>
  );
}
