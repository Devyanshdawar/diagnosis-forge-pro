import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { CTAButton } from "@/components/ui/cta-button";

export function CtaSection() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-5xl px-4">
        <Reveal>
          <div className="gradient-border gradient-border-inner relative overflow-hidden rounded-3xl p-10 text-center md:p-16">
            <div
              aria-hidden
              className="absolute inset-0 animate-gradient opacity-70"
              style={{
                background:
                  "linear-gradient(120deg, oklch(0.28 0.12 260 / 0.7), oklch(0.2 0.15 280 / 0.5), oklch(0.3 0.14 235 / 0.7))",
              }}
            />
            <div
              aria-hidden
              className="absolute -bottom-24 left-1/2 h-64 w-[520px] -translate-x-1/2 rounded-full bg-primary/30 blur-[100px]"
            />
            <div className="relative">
              <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                <span className="text-gradient">Build the future</span>{" "}
                <span className="text-gradient-neon">of diagnostics</span>
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground">
                Researchers, engineers, clinicians and designers — we're
                building the tools that will shape the next decade of care.
                Let's talk.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link to="/contact">
                  <CTAButton size="lg" variant="primary" as="button">
                    Join the Team
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </CTAButton>
                </Link>
                <Link to="/tools">
                  <CTAButton size="lg" variant="secondary" as="button">
                    See What We Build
                  </CTAButton>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
