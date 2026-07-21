import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  as?: "button" | "a";
  href?: string;
  children: ReactNode;
}

/** Signature CTA button used across the site. Glass + neon border + hover glow. */
export function CTAButton({
  variant = "primary",
  size = "md",
  className,
  children,
  as = "button",
  href,
  ...rest
}: Props) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none overflow-hidden";
  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-sm",
    lg: "h-14 px-8 text-base",
  };
  const variants = {
    primary:
      "bg-primary text-primary-foreground shadow-[0_0_0_1px_oklch(0.68_0.19_250_/_0.5),0_10px_40px_-10px_oklch(0.68_0.19_250_/_0.6)] hover:shadow-[0_0_0_1px_oklch(0.78_0.19_250_/_0.7),0_16px_60px_-12px_oklch(0.68_0.19_250_/_0.85)] hover:brightness-110",
    secondary:
      "glass text-foreground hover:bg-white/[0.08] border border-white/10 hover:border-primary/40",
    ghost: "text-muted-foreground hover:text-foreground hover:bg-white/5",
  };
  const cls = cn(base, sizes[size], variants[variant], className);
  const content = (
    <>
      <span
        aria-hidden
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
      <span className="relative flex items-center gap-2">{children}</span>
    </>
  );
  if (as === "a") {
    return (
      <a href={href} className={cls}>
        {content}
      </a>
    );
  }
  return (
    <button className={cls} {...rest}>
      {content}
    </button>
  );
}
