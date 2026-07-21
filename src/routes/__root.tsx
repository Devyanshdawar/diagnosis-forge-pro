import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Toaster } from "sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-gradient-neon text-8xl font-semibold tracking-tighter">404</h1>
        <h2 className="mt-2 text-xl font-semibold text-foreground">
          Signal lost
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          This page isn't in our diagnostic library.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-[0_0_24px_-4px_oklch(0.68_0.19_250_/_0.6)] transition-all hover:brightness-110"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. Refresh or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-full border border-white/10 bg-transparent px-5 text-sm font-medium text-foreground transition-colors hover:bg-white/5"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0a0f1f" },
      { title: "Diagnosis Tools — Reinventing Medical Diagnosis Through Innovation" },
      {
        name: "description",
        content:
          "A research initiative building next-generation diagnostic equipment, AI-assisted clinical tools and human-centered medical devices.",
      },
      { name: "author", content: "Diagnosis Tools" },
      {
        property: "og:title",
        content: "Diagnosis Tools — Reinventing Medical Diagnosis",
      },
      {
        property: "og:description",
        content:
          "Next-generation diagnostic equipment, AI-assisted clinical tools, and human-centered medical devices.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="bg-background text-foreground antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SiteHeader />
      <main className="relative">
        <Outlet />
      </main>
      <SiteFooter />
      <Toaster theme="dark" position="bottom-right" />
    </QueryClientProvider>
  );
}
