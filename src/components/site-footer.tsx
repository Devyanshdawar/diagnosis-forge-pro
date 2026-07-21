import { Link } from "@tanstack/react-router";
import { Activity, Github, Linkedin, Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative mt-32 border-t border-white/5 pt-16 pb-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 text-foreground">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/40">
              <Activity className="h-4 w-4 text-primary" />
            </span>
            <span className="text-sm font-semibold tracking-tight">
              Diagnosis<span className="text-primary">.</span>Tools
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Reinventing medical diagnosis through innovative equipment,
            AI-assisted tools, and human-centered design.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/diseases" className="hover:text-foreground">
                Disease Explorer
              </Link>
            </li>
            <li>
              <Link to="/tools" className="hover:text-foreground">
                Diagnostic Tools
              </Link>
            </li>
            <li>
              <Link to="/team" className="hover:text-foreground">
                Team
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-foreground">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground">Connect</h4>
          <div className="mt-4 flex gap-2">
            <a
              aria-label="GitHub"
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              aria-label="LinkedIn"
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              aria-label="Email"
              href="mailto:hello@diagnosis.tools"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl px-4 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Diagnosis Tools. A research initiative.
      </div>
    </footer>
  );
}
