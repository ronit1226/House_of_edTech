import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { AuthForm } from "@/components/auth-form";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <AppShell>
      <Card className="mx-auto max-w-md space-y-5">
        <div>
          <h1 className="text-2xl font-semibold">Login</h1>
          <p className="text-sm text-slate-600">Access your readiness dashboard.</p>
        </div>
        <AuthForm mode="login" />
        <p className="text-sm text-slate-600">
          New here? <Link className="font-medium text-emerald-700" href="/signup">Create account</Link>
        </p>
      </Card>
    </AppShell>
  );
}
