"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronRight,
  ExternalLink,
  GitPullRequest,
  Menu,
  ShieldCheck,
  X,
} from "lucide-react";
import {
  capabilities,
  howItWorks,
  navItems,
  pricingPlans,
  problems,
  sourceStrip,
  timelineEvents,
  useCases,
  viewModes,
} from "@/content/landing";
import { trackEvent } from "@/lib/analytics/track";
import { EvidenceBadge, ViseCraftMark } from "@/components/shared/logo";

const modeNames = Object.keys(viewModes) as Array<keyof typeof viewModes>;

export function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(0);
  const [mode, setMode] = useState<keyof typeof viewModes>("Investor");
  const event = timelineEvents[selectedEvent];

  useEffect(() => {
    trackEvent("landing_page_visit");
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[var(--bg0)] text-[var(--text)]">
      <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[rgba(6,9,11,0.88)] backdrop-blur">
        <div className="content-rail flex h-16 items-center justify-between">
          <ViseCraftMark />
          <nav className="hidden items-center gap-8 text-sm text-[var(--text-dim)] lg:flex" aria-label="Primary">
            {navItems.map((item) => (
              <a key={item.href} className="transition hover:text-[var(--text)]" href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <Link
              className="text-sm text-[var(--text-dim)] transition hover:text-[var(--text)]"
              href="/login"
              onClick={() => trackEvent("sign_in_click")}
            >
              Sign in
            </Link>
            <Link
              className="inline-flex h-10 items-center gap-2 border border-[var(--jade)] px-4 text-sm font-medium text-[var(--jade)] transition hover:bg-[rgba(52,211,153,0.1)]"
              href="/signup"
              onClick={() => trackEvent("get_started_click", { surface: "nav" })}
              style={{ borderRadius: "8px" }}
            >
              Get started <ArrowRight size={16} />
            </Link>
          </div>
          <button
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation"
            className="inline-flex size-10 items-center justify-center border border-[var(--line-hi)] text-[var(--text)] lg:hidden"
            onClick={() => setMobileOpen((value) => !value)}
            style={{ borderRadius: "8px" }}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        {mobileOpen ? (
          <div className="border-t border-[var(--line)] bg-[var(--bg1)] lg:hidden">
            <nav className="content-rail flex flex-col py-4 text-sm text-[var(--text-dim)]">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  className="border-b border-[var(--line)] py-3"
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex items-center gap-3 pt-4">
                <Link className="text-[var(--text)]" href="/login" onClick={() => trackEvent("sign_in_click")}>
                  Sign in
                </Link>
                <Link
                  className="border border-[var(--jade)] px-3 py-2 text-[var(--jade)]"
                  href="/signup"
                  onClick={() => trackEvent("get_started_click", { surface: "mobile_nav" })}
                  style={{ borderRadius: "8px" }}
                >
                  Get started
                </Link>
              </div>
            </nav>
          </div>
        ) : null}
      </header>

      <section className="content-rail grid gap-12 pb-20 pt-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:pb-24 lg:pt-20">
        <div className="fade-up">
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] text-[var(--text)] md:text-6xl lg:text-7xl">
            Turn real project progress into an investor-ready story.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--text-dim)]">
            ViseCraft connects your project activity, identifies meaningful progress and turns it into a living pitch page backed by real evidence.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex h-12 items-center justify-center gap-2 bg-[var(--jade)] px-5 text-sm font-semibold text-[#04100b] transition hover:brightness-110"
              href="/signup"
              onClick={() => trackEvent("get_started_click", { surface: "hero" })}
              style={{ borderRadius: "8px" }}
            >
              Get started <ArrowRight size={17} />
            </Link>
            <a
              className="inline-flex h-12 items-center justify-center gap-2 border border-[var(--line-hi)] px-5 text-sm font-medium text-[var(--blue)] transition hover:border-[var(--blue)]"
              href="https://vp.jtcao.space"
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("view_demo_click", { demo: "visepanda" })}
              style={{ borderRadius: "8px" }}
            >
              View live demo <ExternalLink size={16} />
            </a>
            <Link
              className="inline-flex h-12 items-center justify-center px-2 text-sm text-[var(--text-dim)] hover:text-[var(--text)]"
              href="/login"
              onClick={() => trackEvent("sign_in_click")}
            >
              Sign in
            </Link>
          </div>
        </div>

        <ProductConsole
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
          event={event}
          mode={mode}
          setMode={setMode}
        />
      </section>

      <section className="section-band py-6">
        <div className="content-rail grid gap-6 md:grid-cols-[1fr_2fr] md:items-center">
          <p className="text-sm text-[var(--text-dim)]">
            Built from a real founder workflow. First demonstrated through the live development history of VisePanda.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-3">
            {sourceStrip.map((source) => (
              <span key={source.label} className="mono-label flex items-center gap-2 text-[var(--text-faint)]">
                <span
                  className="size-1.5 rounded-full"
                  style={{
                    background: source.status === "supported" ? "var(--jade)" : "var(--amber)",
                  }}
                />
                {source.label}
                <span className="text-[var(--text-faint)]">{source.status}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <Section id="problem" label="Problem" title="Static decks cannot keep up with real execution.">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="border border-[var(--line)] bg-[var(--bg1)] p-6" style={{ borderRadius: "12px" }}>
            <p className="mono-label text-[var(--rose)]">Static deck</p>
            <div className="mt-5 grid gap-3">
              {problems.map((problem) => (
                <p key={problem} className="border-b border-[var(--line)] pb-3 text-sm leading-6 text-[var(--text-dim)] last:border-b-0 last:pb-0">
                  {problem}
                </p>
              ))}
            </div>
          </div>
          <div className="border border-[var(--line)] bg-[var(--bg2)] p-6" style={{ borderRadius: "12px" }}>
            <p className="mono-label text-[var(--jade)]">Living project story</p>
            <div className="mt-5 grid gap-4">
              {[
                ["Activity", "Collect repository and founder activity without forcing it into slide format."],
                ["Narrative", "Translate technical work into business meaning with human review."],
                ["Evidence", "Keep source links and evidence levels attached to every milestone."],
                ["Views", "Switch between founder, investor and public language from the same project base."],
              ].map(([label, body]) => (
                <div key={label} className="grid gap-2 border-b border-[var(--line)] pb-4 last:border-b-0 last:pb-0 md:grid-cols-[120px_1fr]">
                  <span className="mono-label text-[var(--text-faint)]">{label}</span>
                  <span className="text-sm leading-6 text-[var(--text-dim)]">{body}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section id="product" label="Product" title="Progress infrastructure, narrative engine, presentation layer.">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4">
            <Comparison label="Raw project activity" items={["Commits", "Issues", "Releases", "Founder notes"]} />
            <div className="mono-label flex items-center gap-2 text-[var(--jade)]">
              <ArrowRight size={15} /> translated without exaggeration
            </div>
            <Comparison
              label="Investor-ready narrative"
              items={["Business meaning", "Evidence level", "Audience view", "Weekly update"]}
            />
          </div>
          <div className="grid gap-px overflow-hidden border border-[var(--line)] bg-[var(--line)] md:grid-cols-2" style={{ borderRadius: "12px" }}>
            {capabilities.map((capability) => (
              <article key={capability.title} className="bg-[var(--bg1)] p-6">
                <h3 className="text-xl font-semibold">{capability.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--text-dim)]">{capability.body}</p>
                <ul className="mt-5 space-y-2">
                  {capability.points.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-sm text-[var(--text)]">
                      <Check size={15} className="text-[var(--jade)]" /> {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section id="how-it-works" label="How it works" title="From source activity to a living project story.">
        <div className="grid border-y border-[var(--line)]">
          {howItWorks.map((step) => (
            <div key={step.step} className="grid gap-4 border-b border-[var(--line)] py-5 last:border-b-0 md:grid-cols-[120px_0.6fr_1fr] md:items-baseline">
              <span className="mono-label text-[var(--jade)]">{step.step}</span>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-sm leading-6 text-[var(--text-dim)]">{step.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="demo" label="Live demo" title="VisePanda is the first real case study, not the ViseCraft product.">
        <div className="grid gap-8 border border-[var(--line)] bg-[var(--bg1)] p-6 md:grid-cols-[0.9fr_1.1fr]" style={{ borderRadius: "14px" }}>
          <div>
            <h3 className="text-2xl font-semibold">VisePanda - Live case study</h3>
            <p className="mt-4 leading-7 text-[var(--text-dim)]">
              VisePanda is an independent AI travel software project. Its interactive project page became the original inspiration for ViseCraft.
            </p>
            <a
              className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-[var(--blue)]"
              href="https://vp.jtcao.space"
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("view_demo_click", { surface: "demo_section" })}
            >
              Explore the live VisePanda story <ExternalLink size={16} />
            </a>
          </div>
          <div className="grid gap-3">
            {["Timeline", "Version history", "Development challenge", "Roadmap", "Investor view"].map((item, index) => (
              <div key={item} className="grid grid-cols-[32px_1fr_auto] items-center gap-3 border-b border-[var(--line)] py-3 last:border-b-0">
                <span className="mono-label text-[var(--text-faint)]">0{index + 1}</span>
                <span>{item}</span>
                <ChevronRight size={16} className="text-[var(--text-faint)]" />
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="use-cases" label="Use cases" title="Built for teams that need trustable progress, not prettier slides.">
        <div className="grid gap-px overflow-hidden border border-[var(--line)] bg-[var(--line)] md:grid-cols-2 lg:grid-cols-5" style={{ borderRadius: "12px" }}>
          {useCases.map((useCase) => (
            <article key={useCase.title} className="bg-[var(--bg1)] p-5">
              <h3 className="font-semibold">{useCase.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--text-dim)]">{useCase.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="privacy" label="Privacy and evidence" title="Private by default. Evidence-aware by design.">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Visibility control", "Projects are not public by default. Founders choose public, unlisted or protected sharing."],
            ["Least-privilege GitHub", "Repository connection is separate from login and starts with metadata, not full source publishing."],
            ["Human-confirmed AI", "Generated narratives require user review before they become accepted project events."],
          ].map(([title, body]) => (
            <div key={title} className="border-t border-[var(--line-hi)] pt-5">
              <ShieldCheck className="mb-4 text-[var(--jade)]" size={20} />
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--text-dim)]">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="pricing" label="Pricing preview" title="Early access first. Commercial plans later.">
        <div className="grid gap-px overflow-hidden border border-[var(--line)] bg-[var(--line)] md:grid-cols-3" style={{ borderRadius: "12px" }}>
          {pricingPlans.map((plan) => (
            <article key={plan.name} className="bg-[var(--bg1)] p-6">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <span className="mono-label text-[var(--amber)]">{plan.status}</span>
              </div>
              <p className="mt-4 text-sm leading-6 text-[var(--text-dim)]">{plan.body}</p>
              <Link
                className="mt-6 inline-flex items-center gap-2 text-sm text-[var(--blue)]"
                href="/signup"
                onClick={() => trackEvent("signup_start", { plan: plan.name })}
              >
                Join early access <ArrowRight size={15} />
              </Link>
            </article>
          ))}
        </div>
      </Section>

      <section className="content-rail py-20 md:py-24">
        <div className="border-y border-[var(--line-hi)] py-12 text-center">
          <h2 className="mx-auto max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
            Your project is already telling a story. ViseCraft helps you make it visible.
          </h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              className="inline-flex h-12 items-center gap-2 bg-[var(--jade)] px-5 text-sm font-semibold text-[#04100b]"
              href="/signup"
              onClick={() => trackEvent("get_started_click", { surface: "final_cta" })}
              style={{ borderRadius: "8px" }}
            >
              Get started <ArrowRight size={17} />
            </Link>
            <a
              className="inline-flex h-12 items-center gap-2 border border-[var(--line-hi)] px-5 text-sm text-[var(--blue)]"
              href="https://vp.jtcao.space"
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("view_demo_click", { surface: "final_cta" })}
              style={{ borderRadius: "8px" }}
            >
              View live demo <ExternalLink size={16} />
            </a>
          </div>
          <p className="mt-5 text-sm text-[var(--text-dim)]">
            Already have an account?{" "}
            <Link className="text-[var(--text)] underline decoration-[var(--line-hi)] underline-offset-4" href="/login">
              Sign in.
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ProductConsole({
  selectedEvent,
  setSelectedEvent,
  event,
  mode,
  setMode,
}: {
  selectedEvent: number;
  setSelectedEvent: (index: number) => void;
  event: (typeof timelineEvents)[number];
  mode: keyof typeof viewModes;
  setMode: (mode: keyof typeof viewModes) => void;
}) {
  return (
    <div className="surface fade-up overflow-hidden" style={{ animationDelay: "110ms" }}>
      <div className="grid grid-cols-3 border-b border-[var(--line)]">
        {[
          ["Version", "V1"],
          ["Phase", "MVP Foundation"],
          ["Last verified", "Jul 15 2026"],
        ].map(([label, value]) => (
          <div key={label} className="border-r border-[var(--line)] p-4 last:border-r-0">
            <p className="mono-label text-[var(--text-faint)]">{label}</p>
            <p className="mt-1 text-sm text-[var(--jade)]">{value}</p>
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-[0.48fr_0.52fr]">
        <div className="border-b border-[var(--line)] lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between border-b border-[var(--line)] p-4">
            <span className="mono-label text-[var(--text-dim)]">Project timeline</span>
            <GitPullRequest size={16} className="text-[var(--text-faint)]" />
          </div>
          {timelineEvents.map((item, index) => (
            <button
              key={item.title}
              className="grid w-full grid-cols-[66px_18px_1fr] gap-3 border-b border-[var(--line)] p-4 text-left transition hover:bg-[var(--surface-hi)]"
              onClick={() => setSelectedEvent(index)}
            >
              <span className="font-mono text-xs leading-5 text-[var(--text-faint)]">
                {item.date}
                <br />
                {item.time}
              </span>
              <span
                className="mt-1 size-4 rounded-full border"
                style={{
                  background:
                    index === selectedEvent
                      ? "var(--jade)"
                      : item.tone === "amber"
                        ? "var(--amber)"
                        : "var(--blue)",
                  borderColor: index === selectedEvent ? "var(--jade)" : "var(--line-hi)",
                  boxShadow: index === selectedEvent ? "0 0 0 5px rgba(52,211,153,0.14)" : "none",
                }}
              />
              <span>
                <span className={index === selectedEvent ? "text-[var(--jade)]" : "text-[var(--text)]"}>{item.title}</span>
                <span className="mt-2 block">
                  <EvidenceBadge label={item.evidence} tone={item.tone as "jade" | "blue" | "amber"} />
                </span>
              </span>
            </button>
          ))}
        </div>
        <div className="p-5">
          <div className="mono-label flex items-center gap-2 text-[var(--jade)]">
            <span className="size-1.5 rounded-full bg-[var(--jade)]" /> Selected event
          </div>
          <h2 className="mt-4 text-2xl font-semibold leading-tight">{event.title}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            <EvidenceBadge label={event.status} tone={event.tone as "jade" | "blue" | "amber"} />
            <EvidenceBadge label={event.evidence} tone="neutral" />
          </div>
          <Detail label="What happened" body={event.what} />
          <Detail label="Why it matters" body={event.why} />
          <Detail label="Technical summary" body={event.technical} />
          <Detail label="Business meaning" body={event.business} />
          <div className="mt-5 border-t border-[var(--line)] pt-5">
            <p className="mono-label text-[var(--text-dim)]">Source links</p>
            <div className="mt-3 grid gap-2">
              {event.sources.map((source) => (
                <span key={source} className="flex items-center gap-2 text-sm text-[var(--blue)]">
                  <ExternalLink size={14} /> {source}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-6 border-t border-[var(--line)] pt-5">
            <p className="mono-label text-[var(--text-dim)]">View as</p>
            <div className="mt-4 flex gap-6 border-b border-[var(--line)]">
              {modeNames.map((name) => (
                <button
                  key={name}
                  className="pb-3 text-sm transition"
                  onClick={() => setMode(name)}
                  style={{
                    color: mode === name ? "var(--text)" : "var(--text-faint)",
                    borderBottom: mode === name ? "2px solid var(--jade)" : "2px solid transparent",
                  }}
                >
                  {name}
                </button>
              ))}
            </div>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {viewModes[mode].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-[var(--text-dim)]">
                  <Check size={14} className="text-[var(--jade)]" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({
  id,
  label,
  title,
  children,
}: {
  id: string;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="content-rail py-20 md:py-24">
      <div className="mb-10 grid gap-4 md:grid-cols-[220px_1fr] md:items-start">
        <p className="mono-label text-[var(--jade)]">{label}</p>
        <h2 className="max-w-4xl text-3xl font-semibold leading-tight md:text-5xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Detail({ label, body }: { label: string; body: string }) {
  return (
    <div className="mt-5 border-t border-[var(--line)] pt-5">
      <p className="mono-label text-[var(--jade)]">{label}</p>
      <p className="mt-2 text-sm leading-6 text-[var(--text-dim)]">{body}</p>
    </div>
  );
}

function Comparison({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="border border-[var(--line)] bg-[var(--bg1)] p-5" style={{ borderRadius: "12px" }}>
      <p className="mono-label text-[var(--text-faint)]">{label}</p>
      <div className="mt-4 grid gap-2">
        {items.map((item) => (
          <span key={item} className="border-b border-[var(--line)] pb-2 text-sm text-[var(--text-dim)] last:border-b-0 last:pb-0">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--bg1)] py-8">
      <div className="content-rail flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <ViseCraftMark />
        <nav className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-[var(--text-dim)]" aria-label="Footer">
          <a href="#product">Product</a>
          <a href="https://vp.jtcao.space" target="_blank" rel="noreferrer">
            Demo
          </a>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <a href="mailto:hello@jtcao.space">Contact</a>
          <Link href="/login">Sign in</Link>
        </nav>
        <p className="mono-label text-[var(--text-faint)]">© 2026 ViseCraft</p>
      </div>
    </footer>
  );
}
