import { useSuspenseQuery } from "@tanstack/react-query";
import * as Icons from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { statsQuery } from "@/lib/queries";

type IconName = keyof typeof Icons;

export function StatsSection() {
  const { data: stats } = useSuspenseQuery(statsQuery);

  return (
    <section id="stats" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="gradient-border gradient-border-inner relative overflow-hidden rounded-3xl p-10 md:p-16">
          <div
            aria-hidden
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(ellipse at top, oklch(0.4 0.2 260 / 0.35), transparent 60%)",
            }}
          />
          <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => {
              const Icon =
                (Icons[(s.icon ?? "Activity") as IconName] as React.ComponentType<{
                  className?: string;
                }>) ?? Icons.Activity;
              return (
                <Reveal key={s.id} delay={i * 80}>
                  <div className="text-center sm:text-left">
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/12 ring-1 ring-primary/30">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-5xl font-semibold tracking-tighter text-gradient-neon">
                      <AnimatedCounter value={Number(s.value)} suffix={s.suffix ?? ""} />
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      {s.label}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
