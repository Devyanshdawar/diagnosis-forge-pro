import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, Suspense } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Search, SlidersHorizontal } from "lucide-react";
import { diseasesQuery } from "@/lib/queries";
import { Reveal } from "@/components/ui/reveal";

export const Route = createFileRoute("/diseases")({
  head: () => ({
    meta: [
      { title: "Disease Explorer — Diagnosis Tools" },
      {
        name: "description",
        content:
          "Explore diseases across categories, severity and risk levels. Descriptions, symptoms, causes and treatment approaches.",
      },
      { property: "og:title", content: "Disease Explorer — Diagnosis Tools" },
      {
        property: "og:description",
        content:
          "A searchable, filterable library of diseases and diagnostic considerations.",
      },
    ],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(diseasesQuery);
  },
  component: DiseasesPage,
});

function DiseasesPage() {
  return (
    <div className="relative min-h-screen pt-32 pb-24">
      <div className="grid-bg fade-mask-y pointer-events-none absolute inset-0 opacity-30" />
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
              Disease Explorer
            </p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tighter sm:text-6xl">
              <span className="text-gradient">Explore the</span>{" "}
              <span className="text-gradient-neon">diagnostic library</span>
            </h1>
            <p className="mt-6 text-base text-muted-foreground">
              Search across categories, severity and risk level. Data is served
              live from the content database.
            </p>
          </div>
        </Reveal>

        <Suspense
          fallback={<div className="mt-16 h-96 animate-pulse" aria-hidden />}
        >
          <ExplorerBody />
        </Suspense>
      </div>
    </div>
  );
}

function ExplorerBody() {
  const { data: diseases } = useSuspenseQuery(diseasesQuery);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [risk, setRisk] = useState<string>("all");

  const categories = useMemo(
    () => Array.from(new Set(diseases.map((d) => d.category).filter(Boolean))) as string[],
    [diseases],
  );
  const risks = useMemo(
    () => Array.from(new Set(diseases.map((d) => d.risk_level).filter(Boolean))) as string[],
    [diseases],
  );

  const filtered = diseases.filter((d) => {
    if (q && !(d.name + " " + (d.short_description ?? "")).toLowerCase().includes(q.toLowerCase()))
      return false;
    if (category !== "all" && d.category !== category) return false;
    if (risk !== "all" && d.risk_level !== risk) return false;
    return true;
  });

  return (
    <>
      <div className="glass-strong mt-12 rounded-2xl border border-white/[0.06] p-4">
        <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search diseases…"
              className="h-11 w-full rounded-xl border border-white/10 bg-card/60 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
              aria-label="Search diseases"
            />
          </div>
          <Select
            value={category}
            onChange={setCategory}
            options={[{ v: "all", l: "All categories" }, ...categories.map((c) => ({ v: c, l: c }))]}
          />
          <Select
            value={risk}
            onChange={setRisk}
            options={[{ v: "all", l: "All risk levels" }, ...risks.map((r) => ({ v: r, l: r }))]}
          />
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <SlidersHorizontal className="h-3 w-3" />
          <span>{filtered.length} results</span>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((d, i) => (
          <Reveal key={d.id} delay={i * 40}>
            <article className="hover-lift group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-card/60 p-6 backdrop-blur-md transition-colors hover:border-primary/40">
              <div className="flex items-center gap-2">
                {d.category && (
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-primary">
                    {d.category}
                  </span>
                )}
                {d.risk_level && (
                  <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                    {d.risk_level}
                  </span>
                )}
              </div>
              <h3 className="mt-4 text-xl font-semibold tracking-tight">
                {d.name}
              </h3>
              {d.short_description && (
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {d.short_description}
                </p>
              )}
              {d.symptoms && d.symptoms.length > 0 && (
                <div className="mt-4">
                  <div className="text-[10px] font-medium uppercase tracking-widest text-primary/80">
                    Symptoms
                  </div>
                  <ul className="mt-2 flex flex-wrap gap-1">
                    {d.symptoms.slice(0, 4).map((s: string) => (
                      <li
                        key={s}
                        className="rounded-full border border-white/[0.06] bg-white/[0.02] px-2 py-0.5 text-[11px] text-muted-foreground"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          </Reveal>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full rounded-2xl border border-white/[0.06] bg-card/40 p-10 text-center text-sm text-muted-foreground">
            No diseases match your filters.
          </div>
        )}
      </div>
    </>
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { v: string; l: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-11 rounded-xl border border-white/10 bg-card/60 px-4 text-sm text-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
    >
      {options.map((o) => (
        <option key={o.v} value={o.v} className="bg-background">
          {o.l}
        </option>
      ))}
    </select>
  );
}
