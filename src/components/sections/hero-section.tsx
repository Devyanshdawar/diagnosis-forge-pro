import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { CTAButton } from "@/components/ui/cta-button";
import { EcgLine } from "@/components/ui/ecg-line";
import { ParticleField } from "@/components/ui/particle-field";
import { HeartPulse, Brain, Stethoscope, Microscope, Dna, Eye } from "lucide-react";

const FLOATING_ICONS = [
  { Icon: HeartPulse, top: "18%", left: "8%", delay: "0s" },
  { Icon: Brain, top: "22%", left: "82%", delay: "1s" },
  { Icon: Stethoscope, top: "62%", left: "5%", delay: "2s" },
  { Icon: Microscope, top: "68%", left: "88%", delay: "0.5s" },
  { Icon: Dna, top: "44%", left: "3%", delay: "1.6s" },
  { Icon: Eye, top: "48%", left: "92%", delay: "2.4s" },
];

export function HeroSection() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 pt-24">
      {/* Grid background */}
      <div
        aria-hidden
        className="grid-bg fade-mask-y absolute inset-0 opacity-70"
      />
      {/* Particles */}
      <div className="absolute inset-0">
        <ParticleField className="h-full w-full" />
      </div>
      {/* Glow blobs */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/25 blur-[120px] animate-pulse-glow"
      />
      <div
        aria-hidden
        className="absolute right-[10%] top-[20%] h-[300px] w-[300px] rounded-full bg-[oklch(0.5_0.2_285)]/25 blur-[100px]"
      />

      {/* Floating medical icons */}
      {FLOATING_ICONS.map(({ Icon, top, left, delay }, i) => (
        <div
          key={i}
          aria-hidden
          className="pointer-events-none absolute hidden md:block"
          style={{ top, left, animation: `float 7s ease-in-out ${delay} infinite` }}
        >
          <div className="glass flex h-12 w-12 items-center justify-center rounded-2xl border-white/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="animate-fade-up mx-auto inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5" />
          <span>A research initiative in medical diagnostics</span>
        </div>

        <h1
          className="animate-fade-up mt-8 text-5xl font-semibold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="text-gradient block">Reinventing</span>
          <span className="text-gradient-neon animate-gradient block">
            Medical Diagnosis
          </span>
          <span className="text-gradient block">Through Innovation</span>
        </h1>

        <p
          className="animate-fade-up mx-auto mt-8 max-w-2xl text-base text-muted-foreground sm:text-lg"
          style={{ animationDelay: "0.2s" }}
        >
          We design next-generation diagnostic equipment, AI-assisted clinical
          tools and human-centered medical devices — built for the frontier of
          modern healthcare.
        </p>

        <div
          className="animate-fade-up mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          style={{ animationDelay: "0.3s" }}
        >
          <Link to="/tools">
            <CTAButton size="lg" variant="primary" as="button">
              Explore Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </CTAButton>
          </Link>
          <a href="#about">
            <CTAButton size="lg" variant="secondary" as="button">
              <Play className="h-3.5 w-3.5" />
              Learn More
            </CTAButton>
          </a>
        </div>
      </div>

      {/* ECG line at bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-24 h-24">
        <EcgLine className="h-full w-full opacity-70" />
      </div>

      {/* Scroll indicator */}
      <div className="absolute inset-x-0 bottom-6 flex justify-center">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1">
          <span className="animate-scroll-hint block h-2 w-1 rounded-full bg-primary" />
        </div>
      </div>
    </section>
  );
}
