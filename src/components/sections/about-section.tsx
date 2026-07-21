import { Reveal } from "@/components/ui/reveal";
import { Cpu, HeartPulse, Microscope, ShieldCheck } from "lucide-react";

const PILLARS = [
  {
    Icon: Cpu,
    title: "AI-Assisted",
    body: "Neural networks trained on multimodal medical signals to surface early, actionable insights.",
  },
  {
    Icon: Microscope,
    title: "Research-Grade",
    body: "Every device grounded in peer-reviewed research and refined through clinical collaboration.",
  },
  {
    Icon: HeartPulse,
    title: "Human-Centered",
    body: "Tools designed for clinicians, patients and rural care — not just labs.",
  },
  {
    Icon: ShieldCheck,
    title: "Privacy First",
    body: "On-device processing wherever possible, with rigorous data-minimization by default.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
              About the project
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              <span className="text-gradient">Diagnostics, </span>
              <span className="text-gradient-neon">reimagined</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Diagnosis Tools is a research initiative focused on improving
              medical diagnosis by designing innovative diagnostic equipment,
              AI-assisted tools, and optimized medical devices.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map(({ Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 80}>
              <div className="gradient-border gradient-border-inner hover-lift group relative h-full overflow-hidden rounded-2xl p-6">
                <div
                  aria-hidden
                  className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/15 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="relative">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/12 ring-1 ring-primary/30">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
