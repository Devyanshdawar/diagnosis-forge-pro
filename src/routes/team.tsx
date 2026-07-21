import { createFileRoute } from "@tanstack/react-router";
import { TeamSection } from "@/components/sections/team-section";
import { teamQuery } from "@/lib/queries";
import { Suspense } from "react";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team — Diagnosis Tools" },
      {
        name: "description",
        content:
          "Researchers, engineers, clinicians and designers building the next generation of diagnostics.",
      },
      { property: "og:title", content: "Team — Diagnosis Tools" },
      {
        property: "og:description",
        content:
          "Meet the people behind Diagnosis Tools.",
      },
    ],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(teamQuery);
  },
  component: TeamPage,
});

function TeamPage() {
  return (
    <div className="pt-24">
      <Suspense fallback={<div className="h-96 animate-pulse" aria-hidden />}>
        <TeamSection />
      </Suspense>
    </div>
  );
}
