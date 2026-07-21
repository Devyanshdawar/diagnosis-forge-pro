import { useSuspenseQuery } from "@tanstack/react-query";
import { Github, Linkedin, Mail } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { teamQuery } from "@/lib/queries";

export function TeamSection() {
  const { data: team } = useSuspenseQuery(teamQuery);

  return (
    <section id="team" className="relative py-32">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
              Team
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              <span className="text-gradient">The people building the</span>{" "}
              <span className="text-gradient-neon">future of care</span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => {
            const initials = m.name
              .split(" ")
              .map((s) => s[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();
            return (
              <Reveal key={m.id} delay={i * 70}>
                <article className="hover-lift group relative h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-card/60 p-6 text-center backdrop-blur-md transition-colors hover:border-primary/40">
                  <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-[oklch(0.5_0.2_285)]/30 ring-1 ring-primary/40">
                    <span className="text-2xl font-semibold tracking-tight text-foreground">
                      {initials}
                    </span>
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                  </div>
                  <h3 className="mt-5 text-base font-semibold tracking-tight">
                    {m.name}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-widest text-primary">
                    {m.role}
                  </p>
                  {m.bio && (
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {m.bio}
                    </p>
                  )}
                  <div className="mt-5 flex justify-center gap-2">
                    {m.linkedin_url && (
                      <a
                        href={m.linkedin_url}
                        aria-label={`${m.name} on LinkedIn`}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                      >
                        <Linkedin className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {m.github_url && (
                      <a
                        href={m.github_url}
                        aria-label={`${m.name} on GitHub`}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                      >
                        <Github className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {m.email && (
                      <a
                        href={`mailto:${m.email}`}
                        aria-label={`Email ${m.name}`}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                      >
                        <Mail className="h-3.5 w-3.5" />
                      </a>
                    )}
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
