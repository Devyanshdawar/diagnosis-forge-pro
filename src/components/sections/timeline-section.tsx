import { useSuspenseQuery } from "@tanstack/react-query";
import { Reveal } from "@/components/ui/reveal";
import { timelineQuery } from "@/lib/queries";

export function TimelineSection() {
  const { data: events } = useSuspenseQuery(timelineQuery);

  return (
    <section id="timeline" className="relative py-32">
      <div className="mx-auto max-w-4xl px-4">
        <Reveal>
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
              Roadmap
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              <span className="text-gradient">From research to</span>{" "}
              <span className="text-gradient-neon">clinic</span>
            </h2>
          </div>
        </Reveal>

        <div className="relative mt-20">
          {/* central line */}
          <div
            aria-hidden
            className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent md:left-1/2 md:-translate-x-1/2"
          />
          <ul className="space-y-12">
            {events.map((e, i) => {
              const rightSide = i % 2 === 1;
              return (
                <li key={e.id} className="relative">
                  <Reveal delay={i * 60}>
                    <div
                      className={`grid gap-4 md:grid-cols-2 md:gap-16 ${
                        rightSide ? "" : "md:[&>*:first-child]:order-2"
                      }`}
                    >
                      {/* spacer for side */}
                      <div className="hidden md:block" />
                      <div className="relative pl-10 md:pl-0">
                        {/* dot */}
                        <span
                          aria-hidden
                          className="absolute -left-[3px] top-2 h-3 w-3 rounded-full bg-primary shadow-[0_0_16px_oklch(0.68_0.19_250_/_0.9)] md:left-auto md:top-3 md:-ml-[7px] md:right-auto"
                          style={{
                            left: rightSide ? undefined : undefined,
                          }}
                        />
                        <div
                          className={`gradient-border gradient-border-inner rounded-2xl p-6 ${
                            rightSide ? "md:ml-6" : "md:mr-6"
                          }`}
                        >
                          <div className="text-xs font-medium uppercase tracking-widest text-primary">
                            {e.event_date}
                          </div>
                          <h3 className="mt-2 text-lg font-semibold tracking-tight">
                            {e.title}
                          </h3>
                          {e.description && (
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                              {e.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
