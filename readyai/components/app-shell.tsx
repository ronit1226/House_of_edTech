import Link from "next/link";
import {
  BriefcaseBusiness,
  BrainCircuit,
  Building2,
  ChartNoAxesCombined,
  FileText,
  MessageSquareText,
  ShieldCheck,
} from "lucide-react";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: ChartNoAxesCombined },
  { href: "/practice", label: "Practice", icon: BrainCircuit },
  { href: "/resume-interview", label: "Resume AI", icon: FileText },
  { href: "/company-interview", label: "Company", icon: Building2 },
  { href: "/study-plan", label: "Planner", icon: BriefcaseBusiness },
  { href: "/mock-interview", label: "Mock Interview", icon: MessageSquareText },
  { href: "/mentor", label: "Mentor", icon: ShieldCheck },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-lg font-semibold">
            ReadyAI
          </Link>
          <nav className="flex flex-wrap gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-8">{children}</main>
      <footer className="border-t border-slate-200 bg-white px-4 py-5 text-center text-sm text-slate-600">
        Ronit Mitra · GitHub:{" "}
        <a className="font-medium text-emerald-700" href="https://github.com/" target="_blank">
          github.com
        </a>{" "}
        · LinkedIn:{" "}
        <a className="font-medium text-emerald-700" href="https://linkedin.com/" target="_blank">
          linkedin.com
        </a>
      </footer>
    </div>
  );
}
