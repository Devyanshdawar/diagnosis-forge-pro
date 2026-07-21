import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { CategoriesSection } from "@/components/sections/categories-section";
import { StatsSection } from "@/components/sections/stats-section";
import { TimelineSection } from "@/components/sections/timeline-section";
import { TeamSection } from "@/components/sections/team-section";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaSection } from "@/components/sections/cta-section";
import {
  categoriesQuery,
  faqsQuery,
  statsQuery,
  teamQuery,
  timelineQuery,
} from "@/lib/queries";

export const Route = createFileRoute("/")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(categoriesQuery);
    context.queryClient.ensureQueryData(statsQuery);
    context.queryClient.ensureQueryData(timelineQuery);
    context.queryClient.ensureQueryData(teamQuery);
    context.queryClient.ensureQueryData(faqsQuery);
  },
  component: HomePage,
});

function SectionFallback() {
  return <div className="h-96 animate-pulse" aria-hidden />;
}

function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <Suspense fallback={<SectionFallback />}>
        <CategoriesSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <StatsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <TimelineSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <TeamSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <FaqSection />
      </Suspense>
      <CtaSection />
    </>
  );
}
