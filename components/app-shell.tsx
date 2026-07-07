import Link from "next/link";
import {
  BriefcaseBusiness,
  BrainCircuit,
  Building2,
  ChartNoAxesCombined,
  FileText,
  MessageSquareText,
} from "lucide-react";
import { getSession } from "@/lib/auth";
import { UserMenu } from "@/components/user-menu";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: ChartNoAxesCombined },
  { href: "/practice", label: "Practice", icon: BrainCircuit },
  { href: "/resume-interview", label: "Resume AI", icon: FileText },
  { href: "/company-interview", label: "Company", icon: Building2 },
  { href: "/study-plan", label: "Planner", icon: BriefcaseBusiness },
  { href: "/mock-interview", label: "Mock Interview", icon: MessageSquareText },
];

export async function AppShell({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950" suppressHydrationWarning>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <Link href="/" className="text-lg font-semibold">
            ReadyAI
          </Link>
          <div className="flex flex-wrap items-center gap-2">
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
            {session ? (
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white">
                  {(session.name || session.email).charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900">{session.name || session.email}</p>
                  <p className="text-xs text-slate-500">{session.email}</p>
                </div>
                <UserMenu name={session.name} email={session.email} />
              </div>
            ) : (
              <Link href="/login" className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
                Sign in
              </Link>
            )}
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-8">{children}</main>
      <footer className="border-t border-slate-200 bg-white px-4 py-5 text-center text-sm text-slate-600">
        Ronit Mitra · GitHub:{" "}
        <a className="font-medium text-emerald-700" href="https://github.com/ronit1226" target="_blank" rel="noreferrer">
          github.com/ronit1226
        </a>{" "}
        · LinkedIn:{" "}
        <a
          className="font-medium text-emerald-700"
          href="https://www.linkedin.com/in/ronit-mitra-ronit13/"
          target="_blank"
          rel="noreferrer"
        >
          linkedin.com/in/ronit-mitra-ronit13
        </a>
      </footer>
    </div>
  );
}
