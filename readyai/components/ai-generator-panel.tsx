"use client";

import { Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Field =
  | { type: "text"; name: string; label: string; placeholder: string; defaultValue?: string }
  | { type: "textarea"; name: string; label: string; placeholder: string; defaultValue?: string }
  | { type: "select"; name: string; label: string; options: string[]; defaultValue?: string }
  | { type: "number"; name: string; label: string; placeholder: string; defaultValue?: string };

export function AiGeneratorPanel({
  endpoint,
  fields,
  buttonLabel,
}: {
  endpoint: string;
  fields: Field[];
  buttonLabel: string;
}) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submit(formData: FormData) {
    setLoading(true);
    setError(null);
    setResult(null);
    const payload = Object.fromEntries(
      fields.map((field) => {
        const value = String(formData.get(field.name) ?? "");
        if (field.type === "number") {
          return [field.name, Number(value)];
        }
        if (field.name === "weakTopics") {
          return [field.name, value.split(",").map((item) => item.trim()).filter(Boolean)];
        }
        return [field.name, value];
      }),
    );
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.error ?? "AI generation failed.");
      return;
    }

    setResult(data.result);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <Card>
        <form action={submit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name}>{field.label}</Label>
              {field.type === "textarea" ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  required
                  defaultValue={field.defaultValue}
                  placeholder={field.placeholder}
                  className="min-h-56 w-full rounded-md border border-slate-300 p-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              ) : field.type === "select" ? (
                <select
                  id={field.name}
                  name={field.name}
                  defaultValue={field.defaultValue ?? field.options[0]}
                  className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-emerald-600"
                >
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <Input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  required={field.name !== "targetCompany" && field.name !== "interviewDate"}
                  defaultValue={field.defaultValue}
                  placeholder={field.placeholder}
                />
              )}
            </div>
          ))}
          {error ? <p className="rounded-md bg-rose-50 p-3 text-sm text-rose-700">{error}</p> : null}
          <Button disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {buttonLabel}
          </Button>
        </form>
      </Card>
      <Card className="min-h-96">
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-emerald-700" />
          <h2 className="font-semibold">AI Output</h2>
        </div>
        {result ? (
          <pre className="whitespace-pre-wrap rounded-lg bg-slate-950 p-5 text-sm leading-6 text-slate-100">
            {result}
          </pre>
        ) : (
          <div className="flex min-h-72 items-center justify-center rounded-lg border border-dashed border-slate-300 p-6 text-center text-sm leading-6 text-slate-600">
            Fill the form and generate a targeted interview asset.
          </div>
        )}
      </Card>
    </div>
  );
}
