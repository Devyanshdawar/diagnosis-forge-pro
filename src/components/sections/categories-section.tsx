import { useSuspenseQuery } from "@tanstack/react-query";
import * as Icons from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { categoriesQuery } from "@/lib/queries";

// Types are loose here because DB is CMS-driven
type IconName = keyof typeof Icons;

function getIcon(name: string | null | undefined) {
  const key = (name ?? "Sparkles") as IconName;
  const Comp = (Icons[key] as React.ComponentType<{ className?: string }>) ?? Icons.Sparkles;
  return Comp;
}

export function CategoriesSection() {
  const { data: categories } = useSuspenseQuery(categoriesQuery);

  return (
    <section id="categories" className="relative py-32">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
      />
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
              Project Categories
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              <span className="text-gradient">Where our tools</span>{" "}
              <span className="text-gradient-neon">make a difference</span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => {
            const Icon = getIcon(c.icon);
            return (
              <Reveal key={c.id} delay={i * 50}>
                <article
                  className="hover-lift group relative h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-card/60 p-6 backdrop-blur-md transition-colors hover:border-primary/40"
                  style={{ perspective: "1000px" }}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(400px circle at var(--mx, 50%) var(--my, 0%), oklch(0.68 0.19 250 / 0.18), transparent 60%)",
                    }}
                  />
                  <div className="relative">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/12 ring-1 ring-primary/25 transition-transform duration-500 group-hover:scale-110 group-hover:ring-primary/60">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {c.name}
                    </h3>
                    {c.description && (
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {c.description}
                      </p>
                    )}
                    <div className="mt-6 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      Explore →
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
