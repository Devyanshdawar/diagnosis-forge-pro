import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Check, X } from "lucide-react";
import { toolsQuery } from "@/lib/queries";
import { Reveal } from "@/components/ui/reveal";

export const Route = createFileRoute("/tools")({
  head: () => ({
    meta: [
      { title: "Diagnostic Tools — Diagnosis Tools" },
      {
        name: "description",
        content:
          "Portable ECG, retinal AI scanners, smart stethoscopes and breath biomarker analyzers. Explore our diagnostic hardware.",
      },
      { property: "og:title", content: "Diagnostic Tools — Diagnosis Tools" },
      {
        property: "og:description",
        content:
          "Portable, AI-assisted diagnostic devices designed for the frontier of modern healthcare.",
      },
    ],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(toolsQuery);
  },
  component: ToolsPage,
});

function ToolsPage() {
  return (
    <div className="relative min-h-screen pt-32 pb-24">
      <div className="grid-bg fade-mask-y pointer-events-none absolute inset-0 opacity-30" />
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
              Diagnostic Tools
            </p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tighter sm:text-6xl">
              <span className="text-gradient">Devices built for</span>{" "}
              <span className="text-gradient-neon">the frontier</span>
            </h1>
            <p className="mt-6 text-base text-muted-foreground">
              Our diagnostic hardware combines AI, optics and clinical
              workflows — designed for real-world use, not just labs.
            </p>
          </div>
        </Reveal>
        <Suspense fallback={<div className="mt-16 h-96 animate-pulse" aria-hidden />}>
          <ToolsGrid />
        </Suspense>
      </div>
    </div>
  );
}

function ToolsGrid() {
  const { data: tools } = useSuspenseQuery(toolsQuery);

  return (
    <div className="mt-14 grid gap-6 md:grid-cols-2">
      {tools.map((t, i) => (
        <Reveal key={t.id} delay={i * 60}>
          <article className="gradient-border gradient-border-inner hover-lift relative flex h-full flex-col overflow-hidden rounded-2xl p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[10px] font-medium uppercase tracking-widest text-primary/80">
                  {t.technology}
                </div>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                  {t.name}
                </h3>
                {t.tagline && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t.tagline}
                  </p>
                )}
              </div>
              {t.status && (
                <span className="shrink-0 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-primary">
                  {t.status}
                </span>
              )}
            </div>
            {t.description && (
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                {t.description}
              </p>
            )}

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {t.advantages && t.advantages.length > 0 && (
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-widest text-primary/80">
                    Advantages
                  </div>
                  <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                    {t.advantages.map((a: string) => (
                      <li key={a} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {t.limitations && t.limitations.length > 0 && (
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                    Limitations
                  </div>
                  <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                    {t.limitations.map((a: string) => (
                      <li key={a} className="flex items-start gap-2">
                        <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/70" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {t.applications && t.applications.length > 0 && (
              <div className="mt-6 border-t border-white/[0.06] pt-5">
                <div className="text-[10px] font-medium uppercase tracking-widest text-primary/80">
                  Applications
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {t.applications.map((a: string) => (
                    <span
                      key={a}
                      className="rounded-full border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 text-[11px] text-muted-foreground"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>
        </Reveal>
      ))}
    </div>
  );
}
