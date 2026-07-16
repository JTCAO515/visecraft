"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronRight,
  ExternalLink,
  GitPullRequest,
  ShieldCheck,
} from "lucide-react";
import {
  landingContent,
  productVersion,
  type ViewModeId,
} from "@/content/landing";
import { trackEvent } from "@/lib/analytics/track";
import { EvidenceBadge } from "@/components/shared/logo";
import { useLocale } from "@/lib/i18n/use-locale";

type LandingCopy = typeof landingContent.en;

export function LandingPage() {
  const [selectedEvent, setSelectedEvent] = useState(0);
  const [mode, setMode] = useState<ViewModeId>("investor");
  const { locale } = useLocale();
  const copy = landingContent[locale];
  const event = copy.timelineEvents[selectedEvent] ?? copy.timelineEvents[0];
  const activeMode = copy.viewModes.find((viewMode) => viewMode.id === mode) ?? copy.viewModes[1];

  useEffect(() => {
    trackEvent("landing_page_visit");
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[var(--bg0)] text-[var(--text)]">
      <section className="hero-stage content-rail grid gap-12 pb-20 pt-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-start lg:pb-24 lg:pt-20">
        <div className="fade-up lg:sticky lg:top-28">
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-0.035em] text-[var(--text)] md:text-6xl lg:text-[4.25rem]">
            {copy.hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--text-dim)]">
            {copy.hero.subtitle}
          </p>
          <div className="mt-7 flex items-center gap-3 border-l border-[var(--jade)] py-1 pl-4 text-sm text-[var(--text)]">
            <ShieldCheck size={17} className="shrink-0 text-[var(--jade)]" />
            <span>{copy.hero.proof}</span>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex h-12 items-center justify-center gap-2 bg-[var(--jade)] px-5 text-sm font-semibold text-[#04100b] transition hover:brightness-110"
              href="/signup"
              onClick={() => trackEvent("get_started_click", { surface: "hero" })}
              style={{ borderRadius: "8px" }}
            >
              {copy.actions.getStarted} <ArrowRight size={17} />
            </Link>
            <a
              className="inline-flex h-12 items-center justify-center gap-2 border border-[var(--line-hi)] px-5 text-sm font-medium text-[var(--blue)] transition hover:border-[var(--blue)]"
              href="https://vp.jtcao.space"
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("view_demo_click", { demo: "visepanda" })}
              style={{ borderRadius: "8px" }}
            >
              {copy.actions.viewDemo} <ExternalLink size={16} />
            </a>
            <Link
              className="inline-flex h-12 items-center justify-center px-2 text-sm text-[var(--text-dim)] hover:text-[var(--text)]"
              href="/login"
              onClick={() => trackEvent("sign_in_click")}
            >
              {copy.actions.signIn}
            </Link>
          </div>
        </div>

        <ProductConsole
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
          event={event}
          mode={mode}
          setMode={setMode}
          copy={copy}
          activeMode={activeMode}
        />
      </section>

      <section className="section-band py-6">
        <div className="content-rail grid gap-6 md:grid-cols-[1fr_2fr] md:items-center">
          <p className="text-sm text-[var(--text-dim)]">
            {copy.trust}
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-3">
            {copy.sourceStrip.map((source) => (
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

      <Section id="proof-engine" label={copy.sections.proof[0]} title={copy.sections.proof[1]}>
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="border-l border-[var(--jade)] bg-[var(--bg1)] p-6" style={{ borderRadius: "0 12px 12px 0" }}>
            <p className="mono-label text-[var(--jade)]">{copy.proofEngine.label}</p>
            <h3 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight">{copy.proofEngine.title}</h3>
            <p className="mt-5 leading-7 text-[var(--text-dim)]">{copy.proofEngine.body}</p>
            <div className="mt-6 grid gap-3">
              {copy.proofEngine.rows.map(([label, body]) => (
                <div key={label} className="grid gap-2 border-t border-[var(--line)] pt-4 md:grid-cols-[150px_1fr]">
                  <span className="mono-label text-[var(--text-faint)]">{label}</span>
                  <span className="text-sm leading-6 text-[var(--text-dim)]">{body}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="surface overflow-hidden">
            <div className="border-b border-[var(--line)] p-5">
              <p className="mono-label text-[var(--text-faint)]">Verification profile</p>
            </div>
            {copy.proofEngine.profile.map(([label, value]) => (
              <div key={label} className="grid gap-3 border-b border-[var(--line)] p-5 last:border-b-0 md:grid-cols-[1fr_auto] md:items-center">
                <span className="text-sm text-[var(--text-dim)]">{label}</span>
                <EvidenceBadge
                  label={value}
                  tone={value.includes("Not") || value.includes("未") ? "amber" : value.includes("Code") || value.includes("代码") ? "jade" : "blue"}
                />
              </div>
            ))}
            <div className="border-t border-[var(--line-hi)] p-5">
              <p className="text-xs leading-5 text-[var(--text-faint)]">
                {localeValue(
                  copy,
                  "No single project score. Each claim keeps its own evidence, verdict, freshness and limitations.",
                  "不做单一项目评分。每条声明都保留自己的证据、结论、时效和限制。",
                )}
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section id="bp-builder" label={copy.sections.bpBuilder[0]} title={copy.sections.bpBuilder[1]}>
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="border-t border-[var(--line-hi)] pt-5">
            <p className="mono-label text-[var(--jade)]">{copy.bpBuilder.label}</p>
            <h3 className="mt-4 text-3xl font-semibold leading-tight">{copy.bpBuilder.title}</h3>
            <p className="mt-5 leading-7 text-[var(--text-dim)]">{copy.bpBuilder.body}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {copy.bpBuilder.outputs.map((item) => (
                <EvidenceBadge key={item} label={item} tone="blue" />
              ))}
            </div>
          </div>

          <div className="grid gap-px overflow-hidden border border-[var(--line)] bg-[var(--line)] md:grid-cols-2" style={{ borderRadius: "12px" }}>
            {copy.bpBuilder.modules.map(([title, body]) => (
              <article key={title} className="bg-[var(--bg1)] p-5">
                <p className="mono-label text-[var(--text-faint)]">BP module</p>
                <h3 className="mt-3 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--text-dim)]">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section id="publish" label={copy.sections.publish[0]} title={copy.sections.publish[1]}>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="surface p-6">
            <p className="mono-label text-[var(--jade)]">{copy.publish.label}</p>
            <h3 className="mt-4 text-3xl font-semibold leading-tight">{copy.publish.title}</h3>
            <p className="mt-5 leading-7 text-[var(--text-dim)]">{copy.publish.body}</p>
          </div>
          <div className="grid border-y border-[var(--line)]">
            {copy.publish.steps.map(([label, body], index) => (
              <div key={label} className="grid gap-4 border-b border-[var(--line)] py-5 last:border-b-0 md:grid-cols-[88px_0.35fr_1fr] md:items-baseline">
                <span className="mono-label text-[var(--text-faint)]">0{index + 1}</span>
                <h3 className="text-xl font-semibold">{label}</h3>
                <p className="text-sm leading-6 text-[var(--text-dim)]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="how-it-works" label={copy.sections.how[0]} title={copy.sections.how[1]}>
        <div className="grid border-y border-[var(--line)]">
          {copy.howItWorks.map((step) => (
            <div key={step.step} className="grid gap-4 border-b border-[var(--line)] py-5 last:border-b-0 md:grid-cols-[120px_0.6fr_1fr] md:items-baseline">
              <span className="mono-label text-[var(--jade)]">{step.step}</span>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-sm leading-6 text-[var(--text-dim)]">{step.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="demo" label={copy.sections.demo[0]} title={copy.sections.demo[1]}>
        <div className="grid gap-8 border border-[var(--line)] bg-[var(--bg1)] p-6 md:grid-cols-[0.9fr_1.1fr]" style={{ borderRadius: "14px" }}>
          <div>
            <h3 className="text-2xl font-semibold">{copy.demo.title}</h3>
            <p className="mt-4 leading-7 text-[var(--text-dim)]">
              {copy.demo.body}
            </p>
            <a
              className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-[var(--blue)]"
              href="https://vp.jtcao.space"
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("view_demo_click", { surface: "demo_section" })}
            >
              {copy.demo.cta} <ExternalLink size={16} />
            </a>
          </div>
          <div className="grid gap-3">
            {copy.demo.rows.map((item, index) => (
              <div key={item} className="grid grid-cols-[32px_1fr_auto] items-center gap-3 border-b border-[var(--line)] py-3 last:border-b-0">
                <span className="mono-label text-[var(--text-faint)]">0{index + 1}</span>
                <span>{item}</span>
                <ChevronRight size={16} className="text-[var(--text-faint)]" />
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="use-cases" label={copy.sections.useCases[0]} title={copy.sections.useCases[1]}>
        <div className="grid gap-px overflow-hidden border border-[var(--line)] bg-[var(--line)] md:grid-cols-2 lg:grid-cols-5" style={{ borderRadius: "12px" }}>
          {copy.useCases.map((useCase) => (
            <article key={useCase.title} className="bg-[var(--bg1)] p-5">
              <h3 className="font-semibold">{useCase.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--text-dim)]">{useCase.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="privacy" label={copy.sections.privacy[0]} title={copy.sections.privacy[1]}>
        <div className="grid gap-5 md:grid-cols-3">
          {copy.privacyCards.map(([title, body]) => (
            <div key={title} className="border-t border-[var(--line-hi)] pt-5">
              <ShieldCheck className="mb-4 text-[var(--jade)]" size={20} />
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--text-dim)]">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="content-rail py-20 md:py-24">
        <div className="border-y border-[var(--line-hi)] py-12 text-center">
          <h2 className="mx-auto max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
            {copy.finalCta.title}
          </h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              className="inline-flex h-12 items-center gap-2 bg-[var(--jade)] px-5 text-sm font-semibold text-[#04100b]"
              href="/signup"
              onClick={() => trackEvent("get_started_click", { surface: "final_cta" })}
              style={{ borderRadius: "8px" }}
            >
              {copy.actions.getStarted} <ArrowRight size={17} />
            </Link>
            <a
              className="inline-flex h-12 items-center gap-2 border border-[var(--line-hi)] px-5 text-sm text-[var(--blue)]"
              href="https://vp.jtcao.space"
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("view_demo_click", { surface: "final_cta" })}
              style={{ borderRadius: "8px" }}
            >
              {copy.actions.viewDemo} <ExternalLink size={16} />
            </a>
          </div>
          <p className="mt-5 text-sm text-[var(--text-dim)]">
            {copy.actions.alreadyHaveAccount}{" "}
            <Link className="text-[var(--text)] underline decoration-[var(--line-hi)] underline-offset-4" href="/login">
              {copy.actions.signIn}.
            </Link>
          </p>
        </div>
      </section>

    </main>
  );
}

function ProductConsole({
  selectedEvent,
  setSelectedEvent,
  event,
  mode,
  setMode,
  copy,
  activeMode,
}: {
  selectedEvent: number;
  setSelectedEvent: (index: number) => void;
  event: LandingCopy["timelineEvents"][number];
  mode: ViewModeId;
  setMode: (mode: ViewModeId) => void;
  copy: LandingCopy;
  activeMode: LandingCopy["viewModes"][number];
}) {
  return (
    <div className="surface fade-up overflow-hidden" style={{ animationDelay: "110ms" }}>
      <div className="grid grid-cols-3 border-b border-[var(--line)]">
        {[
          [copy.consoleLabels.version, `v${productVersion}`],
          [copy.consoleLabels.phase, "MVP Foundation"],
          [copy.consoleLabels.lastVerified, localeValue(copy, "Jul 15 2026", "2026年7月15日")],
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
            <span className="mono-label text-[var(--text-dim)]">{copy.consoleLabels.timeline}</span>
            <GitPullRequest size={16} className="text-[var(--text-faint)]" />
          </div>
          {copy.timelineEvents.map((item, index) => (
            <button
              key={item.title}
              className="grid w-full grid-cols-[76px_18px_1fr] gap-3 border-b border-[var(--line)] p-4 text-left transition hover:bg-[var(--surface-hi)]"
              onClick={() => setSelectedEvent(index)}
            >
              <span className="font-mono text-xs leading-5 text-[var(--text-faint)]">
                <span className="text-[var(--jade)]">v{item.version}</span>
                <br />
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
            <span className="size-1.5 rounded-full bg-[var(--jade)]" /> {copy.consoleLabels.selected}
          </div>
          <h2 className="mt-4 text-2xl font-semibold leading-tight">{event.title}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            <EvidenceBadge label={`v${event.version}`} tone="blue" />
            <EvidenceBadge label={event.status} tone={event.tone as "jade" | "blue" | "amber"} />
            <EvidenceBadge label={event.evidence} tone="neutral" />
          </div>
          <Detail label={copy.consoleLabels.what} body={event.what} />
          <Detail label={copy.consoleLabels.why} body={event.why} />
          <Detail label={copy.consoleLabels.technical} body={event.technical} />
          <Detail label={copy.consoleLabels.business} body={event.business} />
          <div className="mt-5 border-t border-[var(--line)] pt-5">
            <p className="mono-label text-[var(--text-dim)]">{copy.consoleLabels.sources}</p>
            <div className="mt-3 grid gap-2">
              {event.sources.map((source) => (
                <span key={source} className="flex items-center gap-2 text-sm text-[var(--blue)]">
                  <ExternalLink size={14} /> {source}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-6 border-t border-[var(--line)] pt-5">
            <p className="mono-label text-[var(--text-dim)]">{copy.consoleLabels.viewAs}</p>
            <div className="mt-4 flex gap-6 border-b border-[var(--line)]">
              {copy.viewModes.map((viewMode) => (
                <button
                  key={viewMode.id}
                  className="pb-3 text-sm transition"
                  onClick={() => setMode(viewMode.id)}
                  style={{
                    color: mode === viewMode.id ? "var(--text)" : "var(--text-faint)",
                    borderBottom: mode === viewMode.id ? "2px solid var(--jade)" : "2px solid transparent",
                  }}
                >
                  {viewMode.label}
                </button>
              ))}
            </div>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {activeMode.items.map((item) => (
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

function localeValue(copy: LandingCopy, en: string, zh: string) {
  return copy === landingContent.zh ? zh : en;
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
