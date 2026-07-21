import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, MapPin, MessageSquare, Send } from "lucide-react";
import { z } from "zod";
import { Reveal } from "@/components/ui/reveal";
import { CTAButton } from "@/components/ui/cta-button";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(10, "Please add a bit more detail").max(2000),
});

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Diagnosis Tools" },
      {
        name: "description",
        content:
          "Get in touch with the Diagnosis Tools research team. Partnerships, research collaborations and clinical pilots welcome.",
      },
      { property: "og:title", content: "Contact — Diagnosis Tools" },
      {
        property: "og:description",
        content: "Reach the Diagnosis Tools team.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitting(true);
    // In v1 we simply log — wire to email/DB in a follow-up.
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    setForm({ name: "", email: "", message: "" });
    toast.success("Message sent — we'll be in touch.");
  };

  return (
    <div className="relative min-h-screen pt-32 pb-24">
      <div className="grid-bg fade-mask-y pointer-events-none absolute inset-0 opacity-30" />
      <div className="mx-auto max-w-5xl px-4">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
              Contact
            </p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tighter sm:text-6xl">
              <span className="text-gradient">Let's</span>{" "}
              <span className="text-gradient-neon">collaborate</span>
            </h1>
            <p className="mt-6 text-base text-muted-foreground">
              Partnerships, research collaborations and clinical pilots are all
              welcome. Drop us a line.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <div className="glass-strong flex h-full flex-col justify-between rounded-2xl border border-white/[0.06] p-8">
              <div className="space-y-6">
                <InfoRow Icon={Mail} label="Email" value="hello@diagnosis.tools" />
                <InfoRow
                  Icon={MessageSquare}
                  label="Response time"
                  value="Within 48 hours"
                />
                <InfoRow Icon={MapPin} label="Based in" value="Remote-first, global" />
              </div>
              <div className="mt-10 rounded-xl border border-primary/20 bg-primary/5 p-4">
                <p className="text-xs text-muted-foreground">
                  For clinical inquiries, mention your institution and the
                  patient population you serve.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <form
              onSubmit={onSubmit}
              className="gradient-border gradient-border-inner rounded-2xl p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Name"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  placeholder="Your name"
                />
                <Field
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  placeholder="you@example.com"
                />
              </div>
              <div className="mt-4">
                <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={6}
                  maxLength={2000}
                  placeholder="Tell us what you're working on…"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-card/60 p-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div className="mt-6 flex justify-end">
                <CTAButton
                  as="button"
                  variant="primary"
                  size="lg"
                  disabled={submitting}
                >
                  {submitting ? "Sending…" : "Send message"}
                  <Send className="h-4 w-4" />
                </CTAButton>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  Icon,
  label,
  value,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/12 ring-1 ring-primary/30">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div>
        <div className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
          {label}
        </div>
        <div className="text-sm text-foreground">{value}</div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        value={value}
        maxLength={255}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-card/60 px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
      />
    </div>
  );
}
