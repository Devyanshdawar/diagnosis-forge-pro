import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ChevronDown, Search } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { faqsQuery } from "@/lib/queries";

export function FaqSection() {
  const { data: faqs } = useSuspenseQuery(faqsQuery);
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = faqs.filter((f) =>
    (f.question + " " + f.answer).toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <section id="faq" className="relative py-32">
      <div className="mx-auto max-w-3xl px-4">
        <Reveal>
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
              FAQ
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              <span className="text-gradient">Questions,</span>{" "}
              <span className="text-gradient-neon">answered</span>
            </h2>
          </div>
        </Reveal>

        <div className="relative mt-10">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search questions…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-12 w-full rounded-full border border-white/10 bg-card/60 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
            aria-label="Search FAQs"
          />
        </div>

        <ul className="mt-8 space-y-3">
          {filtered.map((f) => {
            const open = openId === f.id;
            return (
              <li key={f.id}>
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : f.id)}
                  aria-expanded={open}
                  className="glass w-full rounded-2xl border border-white/[0.06] px-6 py-5 text-left transition-colors hover:border-primary/30"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-base font-medium tracking-tight text-foreground">
                      {f.question}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-primary transition-transform duration-300 ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  <div
                    className={`grid transition-all duration-500 ease-out ${
                      open
                        ? "mt-3 grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden text-sm leading-relaxed text-muted-foreground">
                      {f.answer}
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
          {filtered.length === 0 && (
            <li className="rounded-2xl border border-white/[0.06] bg-card/40 p-6 text-center text-sm text-muted-foreground">
              No questions match your search.
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}
