import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { AuthForm } from "@/components/auth-form";
import { Card } from "@/components/ui/card";

export default function SignupPage() {
  return (
    <AppShell>
      <Card className="mx-auto max-w-md space-y-5">
        <div>
          <h1 className="text-2xl font-semibold">Create account</h1>
          <p className="text-sm text-slate-600">Start with a diagnostic across six topics.</p>
        </div>
        <AuthForm mode="signup" />
        <p className="text-sm text-slate-600">
          Already registered? <Link className="font-medium text-emerald-700" href="/login">Login</Link>
        </p>
      </Card>
    </AppShell>
  );
}
