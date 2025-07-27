// app/user/_components/client-user-layout.tsx
"use client";

import { usePathname } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { ToggleTheme } from "@/components/toggle-theme";

const steps = ["upload", "nouns", "target-sentences", "cluster", "report"];

function SessionProgress() {
  const pathname = usePathname();
  const currentStep = steps.findIndex((step) => pathname?.includes(step));
  const percentage =
    currentStep === -1
      ? 0
      : Math.round(((currentStep + 1) / steps.length) * 100);

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2 text-sm text-muted-foreground">
        <span>
          Step {currentStep + 1} of {steps.length}
        </span>
        <span>{percentage}%</span>
      </div>
      <div className="flex items-center space-x-6">
        <Progress value={percentage} />
        <ToggleTheme />
      </div>
    </div>
  );
}

export default function ClientUserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen w-full bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <SessionProgress />
        {children}
      </div>
    </section>
  );
}
