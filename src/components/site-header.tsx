import { Link } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { useEffect, useState } from "react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/diseases", label: "Diseases" },
  { to: "/tools", label: "Tools" },
  { to: "/team", label: "Team" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div
          className={`flex items-center justify-between rounded-full border border-white/[0.06] px-3 py-2 transition-all duration-500 ${
            scrolled ? "glass-strong shadow-2xl" : "bg-transparent"
          }`}
        >
          <Link
            to="/"
            className="flex items-center gap-2 pl-2 pr-3 text-foreground"
          >
            <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/40">
              <Activity className="h-4 w-4 text-primary" />
              <span className="absolute inset-0 animate-pulse-glow rounded-lg bg-primary/30 blur-md" />
            </span>
            <span className="text-sm font-semibold tracking-tight">
              Diagnosis<span className="text-primary">.</span>Tools
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                activeProps={{ className: "text-foreground bg-white/[0.06]" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <Link
            to="/contact"
            className="ml-2 inline-flex h-9 items-center rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground shadow-[0_0_20px_-4px_oklch(0.68_0.19_250_/_0.6)] transition-all hover:brightness-110"
          >
            Join Team
          </Link>
        </div>
      </div>
    </header>
  );
}
