"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  ChevronRight,
  CircleDot,
  ExternalLink,
  FileText,
  GitBranch,
  Globe2,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import { EvidenceBadge } from "@/components/shared/logo";
import {
  ActionLink,
  FaqList,
  MarketingCta,
  PricingCard,
  SectionIntro,
} from "@/components/marketing/marketing-primitives";
import {
  landingContent,
  productVersion,
  type LandingCopy,
  type SignalTone,
} from "@/content/landing";
import { trackEvent } from "@/lib/analytics/track";
import { useLocale } from "@/lib/i18n/use-locale";

export function LandingPage() {
  const [selectedClaim, setSelectedClaim] = useState(0);
  const [selectedScenario, setSelectedScenario] = useState(0);
  const [selectedModule, setSelectedModule] = useState(0);
  const { locale } = useLocale();
  const copy = landingContent[locale];

  useEffect(() => {
    trackEvent("landing_page_visit");
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[var(--bg0)] text-[var(--text)]">
      <Hero
        copy={copy}
        selectedClaim={selectedClaim}
        setSelectedClaim={setSelectedClaim}
      />

      <ProofEngineSection copy={copy} />

      <ScenarioSection
        copy={copy}
        selectedScenario={selectedScenario}
        setSelectedScenario={setSelectedScenario}
      />

      <BpStudioSection
        copy={copy}
        selectedModule={selectedModule}
        setSelectedModule={setSelectedModule}
      />

      <IntegrationsSection copy={copy} />
      <WorkflowSection copy={copy} />
      <ReleaseHistorySection copy={copy} />
      <PlansSection copy={copy} />
      <CaseStudySection copy={copy} />

      <section className="content-rail py-20 md:py-28" id="faq">
        <SectionIntro number="09" title={copy.faq.title} />
        <div className="mt-12 md:ml-[25%]">
          <FaqList items={copy.faq.items} />
        </div>
      </section>

      <MarketingCta
        body={copy.finalCta.body}
        onPrimaryClick={() => trackEvent("get_started_click", { surface: "final_cta" })}
        onSecondaryClick={() => trackEvent("view_demo_click", { surface: "final_cta" })}
        primary={{ href: "/signup", label: copy.actions.getStarted }}
        secondary={{ href: "https://vp.jtcao.space", label: copy.actions.viewDemo, external: true }}
        title={copy.finalCta.title}
      />
    </main>
  );
}

function Hero({
  copy,
  selectedClaim,
  setSelectedClaim,
}: {
  copy: LandingCopy;
  selectedClaim: number;
  setSelectedClaim: (index: number) => void;
}) {
  return (
    <section className="hero-v2 content-rail pb-20 pt-16 md:pb-28 md:pt-24">
      <div className="mx-auto max-w-6xl text-center">
        <h1 className="hero-title fade-up">{copy.hero.title}</h1>
        <p className="fade-up mx-auto mt-7 max-w-3xl text-base leading-8 text-[var(--text-dim)] md:text-lg" style={{ animationDelay: "60ms" }}>
          {copy.hero.subtitle}
        </p>
        <div className="fade-up mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row" style={{ animationDelay: "100ms" }}>
          <ActionLink
            href="/signup"
            onClick={() => trackEvent("get_started_click", { surface: "hero" })}
          >
            {copy.actions.getStarted}
          </ActionLink>
          <ActionLink
            external
            href="https://vp.jtcao.space"
            onClick={() => trackEvent("view_demo_click", { surface: "hero" })}
            variant="secondary"
          >
            {copy.actions.viewDemo}
          </ActionLink>
        </div>
        <div className="mt-7 inline-flex items-center gap-2 text-sm text-[var(--text-dim)]">
          <ShieldCheck aria-hidden="true" className="text-[var(--jade)]" size={16} />
          <span>{copy.hero.proof}</span>
        </div>
      </div>

      <HeroProductInterface
        copy={copy}
        selectedClaim={selectedClaim}
        setSelectedClaim={setSelectedClaim}
      />
    </section>
  );
}

function HeroProductInterface({
  copy,
  selectedClaim,
  setSelectedClaim,
}: {
  copy: LandingCopy;
  selectedClaim: number;
  setSelectedClaim: (index: number) => void;
}) {
  const claim = copy.heroClaims[selectedClaim] ?? copy.heroClaims[0];

  return (
    <div className="product-frame fade-up" style={{ animationDelay: "150ms" }}>
      <div className="product-window-bar">
        <div className="flex items-center gap-3">
          <span className="size-2 rounded-full bg-[var(--jade)]" />
          <span className="mono-label text-[var(--text-dim)]">{copy.interfaceLabels.workspace}</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-[var(--text-faint)]">
          <span>{copy.interfaceLabels.currentVersion}</span>
          <span className="font-mono text-[var(--jade)]">v{productVersion}</span>
        </div>
      </div>

      <div className="hero-fact-rail">
        {copy.hero.facts.map(([label, value]) => (
          <div className="hero-fact" key={label}>
            <span className="mono-label text-[var(--text-faint)]">{label}</span>
            <span className="mt-2 text-sm text-[var(--text)]">{value}</span>
          </div>
        ))}
      </div>

      <div className="product-layout">
        <aside className="product-sidebar" aria-label={copy.interfaceLabels.workspace}>
          <div className="border-b border-[var(--line)] px-5 py-5">
            <p className="mono-label text-[var(--text-faint)]">{copy.interfaceLabels.project}</p>
            <p className="mt-2 font-medium">{copy.interfaceLabels.projectName}</p>
          </div>
          <nav className="p-3" aria-label={copy.interfaceLabels.project}>
            {[
              [copy.interfaceLabels.proofEngine, ShieldCheck],
              [copy.interfaceLabels.timeline, Activity],
              [copy.interfaceLabels.bpStudio, FileText],
              [copy.interfaceLabels.publish, Globe2],
            ].map(([label, Icon], index) => (
              <div
                className={`product-nav-item${index === 0 ? " product-nav-item-active" : ""}`}
                key={String(label)}
              >
                <Icon aria-hidden="true" size={15} />
                <span>{String(label)}</span>
              </div>
            ))}
          </nav>
          <div className="mt-auto border-t border-[var(--line)] p-5">
            <EvidenceBadge label={copy.hero.proof} tone="jade" />
          </div>
        </aside>

        <div className="min-w-0">
          <div className="product-content-header">
            <div>
              <p className="mono-label text-[var(--jade)]">{copy.interfaceLabels.proofEngine}</p>
              <h2 className="mt-2 text-xl font-semibold">{copy.interfaceLabels.claims}</h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-[var(--text-dim)]">
              <CircleDot aria-hidden="true" className="text-[var(--jade)]" size={14} />
              {copy.heroClaims.length}
            </div>
          </div>

          <div className="product-proof-grid">
            <div className="claim-list" role="tablist" aria-label={copy.interfaceLabels.claims}>
              {copy.heroClaims.map((item, index) => (
                <button
                  aria-controls="proof-claim-panel"
                  aria-selected={selectedClaim === index}
                  className={`claim-row${selectedClaim === index ? " claim-row-active" : ""}`}
                  key={item.title}
                  onClick={() => setSelectedClaim(index)}
                  id={`proof-claim-tab-${index}`}
                  role="tab"
                  type="button"
                >
                  <span className="claim-status-dot" style={{ background: toneColor(item.tone) }} />
                  <span className="min-w-0">
                    <span className="block text-sm leading-6 text-[var(--text)]">{item.title}</span>
                    <span className="mt-3 flex flex-wrap items-center gap-2">
                      <EvidenceBadge label={item.verdict} tone={item.tone} />
                      <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--text-faint)]">
                        {item.freshness}
                      </span>
                    </span>
                  </span>
                  <ChevronRight aria-hidden="true" className="mt-1 shrink-0 text-[var(--text-faint)]" size={15} />
                </button>
              ))}
            </div>

            <div
              aria-labelledby={`proof-claim-tab-${selectedClaim}`}
              className="claim-report"
              id="proof-claim-panel"
              role="tabpanel"
            >
              <p className="mono-label text-[var(--text-faint)]">{copy.interfaceLabels.selectedClaim}</p>
              <h3 className="mt-4 text-2xl font-semibold leading-tight">{claim.title}</h3>
              <div className="mt-5 grid gap-px overflow-hidden border border-[var(--line)] bg-[var(--line)] sm:grid-cols-3">
                {[
                  [copy.interfaceLabels.verdict, claim.verdict],
                  [copy.interfaceLabels.evidence, claim.evidenceCount],
                  [copy.interfaceLabels.freshness, claim.freshness],
                ].map(([label, value]) => (
                  <div className="bg-[var(--bg1)] p-4" key={label}>
                    <p className="mono-label text-[var(--text-faint)]">{label}</p>
                    <p className="mt-2 text-sm" style={{ color: label === copy.interfaceLabels.verdict ? toneColor(claim.tone) : "var(--text)" }}>
                      {value}
                    </p>
                  </div>
                ))}
              </div>
              <ReportRow label={copy.interfaceLabels.supportingEvidence}>
                <span className="flex items-center gap-2 text-sm text-[var(--blue)]">
                  <GitBranch aria-hidden="true" size={14} /> {claim.source}
                </span>
                <p className="mt-3 text-sm leading-6 text-[var(--text-dim)]">{claim.summary}</p>
              </ReportRow>
              <ReportRow label={copy.interfaceLabels.limitations}>
                <p className="text-sm leading-6 text-[var(--text-dim)]">{claim.limitations}</p>
              </ReportRow>
              <div className="mt-5 flex flex-col gap-3 border-t border-[var(--line)] pt-5 sm:flex-row sm:items-center sm:justify-between">
                <span className="mono-label text-[var(--text-faint)]">
                  {copy.interfaceLabels.checkedBy} · {copy.interfaceLabels.proofEngineVersion}
                </span>
                <span className="inline-flex items-center gap-2 text-xs text-[var(--jade)]">
                  {copy.interfaceLabels.openReport} <ExternalLink aria-hidden="true" size={13} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProofEngineSection({ copy }: { copy: LandingCopy }) {
  return (
    <section className="section-band" id="proof-engine">
      <div className="content-rail py-20 md:py-28">
        <SectionIntro number="01" title={copy.proofEngine.title} body={copy.proofEngine.body} />
        <div className="mt-14 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="proof-steps">
            {copy.proofEngine.steps.map((step) => (
              <article className="proof-step" key={step.number}>
                <span className="mono-label text-[var(--jade)]">{step.number}</span>
                <div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-dim)]">{step.body}</p>
                </div>
              </article>
            ))}
          </div>
          <VerificationReportPreview copy={copy} />
        </div>
      </div>
    </section>
  );
}

function VerificationReportPreview({ copy }: { copy: LandingCopy }) {
  const report = copy.proofEngine.report;

  return (
    <div className="verification-preview">
      <div className="flex flex-col gap-5 border-b border-[var(--line)] p-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="mono-label text-[var(--text-faint)]">{report.claimLabel}</p>
          <h3 className="mt-3 max-w-xl text-2xl font-semibold">{report.claim}</h3>
        </div>
        <div className="shrink-0 text-left sm:text-right">
          <EvidenceBadge label={report.verdict} tone="amber" />
          <p className="mt-2 text-xs text-[var(--text-faint)]">{report.confidence}</p>
        </div>
      </div>
      <div className="p-6">
        <p className="mono-label text-[var(--text-faint)]">{copy.interfaceLabels.supportingEvidence}</p>
        <div className="mt-4 border-t border-[var(--line)]">
          {report.evidence.map(([label, status], index) => (
            <div className="grid gap-2 border-b border-[var(--line)] py-4 sm:grid-cols-[1fr_auto]" key={label}>
              <span className="text-sm text-[var(--text-dim)]">{label}</span>
              <span className={index === 2 ? "text-sm text-[var(--amber)]" : "text-sm text-[var(--jade)]"}>{status}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="border-l border-[var(--amber)] pl-4">
            <p className="mono-label text-[var(--amber)]">{report.limitationLabel}</p>
            <p className="mt-3 text-sm leading-6 text-[var(--text-dim)]">{report.limitation}</p>
          </div>
          <div className="border-l border-[var(--blue)] pl-4">
            <p className="mono-label text-[var(--blue)]">{report.freshnessLabel}</p>
            <p className="mt-3 text-sm leading-6 text-[var(--text-dim)]">{report.freshness}</p>
          </div>
        </div>
        <div className="mt-7 border-t border-[var(--line)] pt-5">
          <p className="mono-label text-[var(--jade)]">{report.checkedBy}</p>
          <p className="mt-3 max-w-2xl text-xs leading-5 text-[var(--text-faint)]">{report.disclaimer}</p>
        </div>
      </div>
    </div>
  );
}

function ScenarioSection({
  copy,
  selectedScenario,
  setSelectedScenario,
}: {
  copy: LandingCopy;
  selectedScenario: number;
  setSelectedScenario: (index: number) => void;
}) {
  const scenario = copy.scenarios.items[selectedScenario] ?? copy.scenarios.items[0];

  return (
    <section className="content-rail py-20 md:py-28" id="use-cases">
      <SectionIntro number="02" title={copy.scenarios.title} body={copy.scenarios.body} />
      <div className="mt-14 border-y border-[var(--line-hi)]">
        <div className="scenario-tabs" role="tablist" aria-label={copy.scenarios.title}>
          {copy.scenarios.items.map((item, index) => (
            <button
              aria-controls="scenario-detail-panel"
              aria-selected={selectedScenario === index}
              className={`scenario-tab${selectedScenario === index ? " scenario-tab-active" : ""}`}
              key={item.id}
              id={`scenario-tab-${item.id}`}
              onClick={() => setSelectedScenario(index)}
              role="tab"
              type="button"
            >
              <span className="font-mono text-[10px] text-[var(--text-faint)]">0{index + 1}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        <div
          aria-labelledby={`scenario-tab-${scenario.id}`}
          className="scenario-panel"
          id="scenario-detail-panel"
          role="tabpanel"
        >
          <div className="scenario-summary">
            <p className="mono-label text-[var(--jade)]">{scenario.label}</p>
            <h3 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-4xl">{scenario.title}</h3>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--text-dim)]">{scenario.body}</p>
          </div>
          <div className="scenario-capabilities">
            {scenario.capabilities.map((capability, index) => (
              <article className="capability-row" key={capability.title}>
                <div className="flex items-center justify-between gap-4">
                  <span className="mono-label text-[var(--text-faint)]">{capability.signal}</span>
                  <span className="font-mono text-[10px] text-[var(--text-faint)]">0{index + 1}</span>
                </div>
                <h4 className="mt-4 text-lg font-semibold">{capability.title}</h4>
                <p className="mt-3 text-sm leading-6 text-[var(--text-dim)]">{capability.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BpStudioSection({
  copy,
  selectedModule,
  setSelectedModule,
}: {
  copy: LandingCopy;
  selectedModule: number;
  setSelectedModule: (index: number) => void;
}) {
  const selectedBpModule = copy.bpStudio.modules[selectedModule] ?? copy.bpStudio.modules[0];

  return (
    <section className="section-band" id="bp-studio">
      <div className="content-rail py-20 md:py-28">
        <SectionIntro number="03" title={copy.bpStudio.title} body={copy.bpStudio.body} />
        <div className="bp-studio mt-14">
          <div className="bp-module-list" role="tablist" aria-label={copy.bpStudio.title}>
            {copy.bpStudio.modules.map((item, index) => (
              <button
                aria-controls="bp-module-panel"
                aria-selected={selectedModule === index}
                className={`bp-module-button${selectedModule === index ? " bp-module-button-active" : ""}`}
                key={item.key}
                id={`bp-module-tab-${item.key}`}
                onClick={() => setSelectedModule(index)}
                role="tab"
                type="button"
              >
                <span className="font-mono text-xs text-[var(--text-faint)]">{item.key}</span>
                <span>{item.title}</span>
              </button>
            ))}
          </div>
          <div
            aria-labelledby={`bp-module-tab-${selectedBpModule.key}`}
            className="bp-document"
            id="bp-module-panel"
            role="tabpanel"
          >
            <div className="flex flex-col gap-3 border-b border-[var(--line)] p-5 sm:flex-row sm:items-center sm:justify-between">
              <span className="mono-label text-[var(--text-faint)]">{copy.bpStudio.labels.document}</span>
              <EvidenceBadge label={copy.bpStudio.labels.evidence} tone="jade" />
            </div>
            <div className="grid gap-8 p-6 md:grid-cols-[0.36fr_0.64fr] md:p-8">
              <div>
                <p className="mono-label text-[var(--blue)]">{copy.bpStudio.labels.module} · {selectedBpModule.key}</p>
                <h3 className="mt-4 text-3xl font-semibold leading-tight">{selectedBpModule.title}</h3>
                <p className="mt-5 text-sm leading-7 text-[var(--text-dim)]">{selectedBpModule.body}</p>
              </div>
              <div className="bp-page-preview">
                <div className="flex items-center justify-between gap-4 border-b border-[var(--line)] pb-5">
                  <p className="mono-label text-[var(--text-faint)]">{copy.bpStudio.labels.narrative}</p>
                  <span className="size-2 rounded-full bg-[var(--jade)]" />
                </div>
                <h4 className="mt-7 max-w-lg text-3xl font-semibold leading-[1.12] tracking-[-0.03em]">{selectedBpModule.output}</h4>
                <div className="mt-8 space-y-3" aria-hidden="true">
                  <div className="h-px w-full bg-[var(--line-hi)]" />
                  <div className="h-px w-[88%] bg-[var(--line)]" />
                  <div className="h-px w-[72%] bg-[var(--line)]" />
                </div>
                <div className="mt-9 flex flex-wrap gap-2">
                  <EvidenceBadge label={copy.interfaceLabels.sourceLinked} tone="blue" />
                  <EvidenceBadge label={copy.interfaceLabels.founderReviewed} tone="neutral" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <p className="mono-label text-[var(--text-faint)]">{copy.bpStudio.labels.audienceViews}</p>
          <div className="mt-4 grid border-y border-[var(--line)] md:grid-cols-3">
            {copy.bpStudio.views.map((view, index) => (
              <article className="audience-view" key={view.id}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{view.title}</h3>
                  <span className={`status-line${index === 1 ? " status-line-jade" : ""}`} />
                </div>
                <p className="mt-3 text-sm leading-6 text-[var(--text-dim)]">{view.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function IntegrationsSection({ copy }: { copy: LandingCopy }) {
  return (
    <section className="content-rail py-20 md:py-28" id="integrations">
      <SectionIntro number="04" title={copy.integrations.title} body={copy.integrations.body} />
      <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mono-label text-[var(--jade)]">{copy.integrations.focusLabel}</p>
          <div className="mt-5 border-t border-[var(--line-hi)]">
            {copy.integrations.current.map((integration, index) => {
              const Icon = index === 0 ? GitBranch : FileText;
              return (
                <article className="integration-focus-row" key={integration.name}>
                  <Icon aria-hidden="true" className="text-[var(--blue)]" size={20} />
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-semibold">{integration.name}</h3>
                      <EvidenceBadge label={integration.status} tone="blue" />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[var(--text-dim)]">{integration.body}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        <div>
          <p className="mono-label text-[var(--text-faint)]">{copy.integrations.roadmapLabel}</p>
          <div className="integration-roadmap mt-5">
            {copy.integrations.planned.map((integration) => (
              <div className="integration-roadmap-row" key={integration.name}>
                <span className="font-medium">{integration.name}</span>
                <span className="mono-label text-[var(--text-faint)]">{integration.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="integration-flow mt-14">
        {copy.integrations.flow.map((step, index) => (
          <div className="integration-flow-step" key={step}>
            <span className="font-mono text-[10px] text-[var(--text-faint)]">0{index + 1}</span>
            <span className="mt-2 text-sm">{step}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function WorkflowSection({ copy }: { copy: LandingCopy }) {
  return (
    <section className="section-band">
      <div className="content-rail py-20 md:py-28">
        <SectionIntro number="05" title={copy.workflow.title} />
        <div className="workflow-rail mt-14">
          {copy.workflow.steps.map((step) => (
            <article className="workflow-step" key={step.number}>
              <span className="mono-label text-[var(--jade)]">{step.number}</span>
              <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--text-dim)]">{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReleaseHistorySection({ copy }: { copy: LandingCopy }) {
  return (
    <section className="content-rail py-20 md:py-28" id="releases">
      <SectionIntro number="06" title={copy.releaseHistory.title} body={copy.releaseHistory.body} />
      <div className="release-history mt-14">
        {copy.releaseHistory.items.map((release) => {
          const isCurrent = release.version === productVersion;

          return (
            <article className={`release-report${isCurrent ? " release-report-current" : ""}`} key={release.version}>
              <div className="release-report-marker" aria-hidden="true">
                <span />
              </div>
              <header className="release-report-header">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-sm text-[var(--jade)]">v{release.version}</span>
                    {isCurrent ? <EvidenceBadge label={copy.releaseHistory.currentLabel} tone="jade" /> : null}
                  </div>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.025em]">{release.title}</h3>
                </div>
                <time className="mono-label text-[var(--text-faint)]" dateTime={release.date}>{release.date}</time>
              </header>
              <div className="release-report-body">
                <div>
                  <p className="mono-label text-[var(--text-faint)]">{copy.releaseHistory.labels.delivered}</p>
                  <p className="mt-3 text-sm leading-6 text-[var(--text-dim)]">{release.delivered}</p>
                </div>
                <div>
                  <p className="mono-label text-[var(--text-faint)]">{copy.releaseHistory.labels.productImpact}</p>
                  <p className="mt-3 text-sm leading-6 text-[var(--text-dim)]">{release.productImpact}</p>
                </div>
                <div>
                  <p className="mono-label text-[var(--text-faint)]">{copy.releaseHistory.labels.evidence}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <EvidenceBadge label={release.evidenceStatus} tone={release.evidenceStatus === "Code-backed" ? "jade" : "blue"} />
                    {release.sourceHref ? (
                      <a className="pressable inline-flex items-center gap-2 text-sm text-[var(--blue)]" href={release.sourceHref} rel="noreferrer" target="_blank">
                        {release.evidence} <ExternalLink aria-hidden="true" size={13} />
                      </a>
                    ) : (
                      <span className="text-sm text-[var(--text-dim)]">{release.evidence}</span>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function PlansSection({ copy }: { copy: LandingCopy }) {
  return (
    <section className="content-rail py-20 md:py-28" id="plans">
      <SectionIntro number="07" title={copy.plans.title} body={copy.plans.body} />
      <div className="mt-10 flex items-center gap-3 border-l border-[var(--amber)] pl-4 text-sm text-[var(--text-dim)]">
        <LockKeyhole aria-hidden="true" className="text-[var(--amber)]" size={16} />
        <span>{copy.plans.pending}</span>
      </div>
      <div className="mt-10 grid gap-px overflow-hidden border border-[var(--line)] bg-[var(--line)] lg:grid-cols-2">
        {copy.plans.items.map((plan) => (
          <PricingCard
            includedLabel={copy.plans.included}
            key={plan.name}
            onClick={() => trackEvent("get_started_click", { surface: `plan_${plan.name.toLowerCase()}` })}
            plan={plan}
          />
        ))}
      </div>
    </section>
  );
}

function CaseStudySection({ copy }: { copy: LandingCopy }) {
  return (
    <section className="section-band" id="demo">
      <div className="content-rail py-20 md:py-28">
        <SectionIntro number="08" title={copy.caseStudy.title} body={copy.caseStudy.body} />
        <div className="case-study mt-14">
          <div className="case-study-project">
            <div className="flex items-center gap-3">
              <span className="size-2 rounded-full bg-[var(--jade)]" />
              <span className="mono-label text-[var(--jade)]">{copy.caseStudy.status}</span>
            </div>
            <h3 className="mt-8 text-5xl font-semibold tracking-[-0.05em] md:text-7xl">{copy.caseStudy.project}</h3>
            <a
              className="mt-9 inline-flex items-center gap-2 text-sm font-medium text-[var(--blue)]"
              href="https://vp.jtcao.space"
              onClick={() => trackEvent("view_demo_click", { surface: "case_study" })}
              rel="noreferrer"
              target="_blank"
            >
              {copy.caseStudy.cta} <ExternalLink aria-hidden="true" size={15} />
            </a>
          </div>
          <div className="border-t border-[var(--line-hi)]">
            {copy.caseStudy.rows.map(([label, value], index) => (
              <div className="case-study-row" key={label}>
                <span className="font-mono text-[10px] text-[var(--text-faint)]">0{index + 1}</span>
                <span className="font-medium">{label}</span>
                <span className="text-sm text-[var(--text-dim)]">{value}</span>
                <ChevronRight aria-hidden="true" className="text-[var(--text-faint)]" size={15} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ReportRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-5 border-t border-[var(--line)] pt-5">
      <p className="mono-label text-[var(--text-faint)]">{label}</p>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function toneColor(tone: SignalTone) {
  if (tone === "blue") return "var(--blue)";
  if (tone === "amber") return "var(--amber)";
  if (tone === "rose") return "var(--rose)";
  if (tone === "neutral") return "var(--text-faint)";
  return "var(--jade)";
}
