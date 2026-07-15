import type { Metadata } from "next";
import Link from "next/link";
import { ViseCraftMark } from "@/components/shared/logo";

export const metadata: Metadata = {
  title: "Privacy",
  description: "ViseCraft privacy principles for early access users.",
};

export default function PrivacyPage() {
  return (
    <PolicyPage title="Privacy" intro="ViseCraft is built around private-by-default project storytelling and evidence-aware publishing.">
      <PolicySection title="Project visibility">
        Projects are not public by default. Founders control whether a project is private, unlisted or public.
      </PolicySection>
      <PolicySection title="GitHub access">
        Account login is separate from repository connection. ViseCraft starts with metadata-oriented activity and does not require publishing full private source code.
      </PolicySection>
      <PolicySection title="AI-generated content">
        AI output is treated as draft narrative. Users can edit, hide or delete generated content before it is accepted.
      </PolicySection>
      <PolicySection title="Analytics">
        Basic product analytics are reserved for page visits and CTA events. Passwords, tokens and private repository data must not be sent as analytics payloads.
      </PolicySection>
    </PolicyPage>
  );
}

function PolicyPage({ title, intro, children }: { title: string; intro: string; children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[var(--bg0)] text-[var(--text)]">
      <header className="border-b border-[var(--line)] bg-[var(--bg1)]">
        <div className="content-rail flex h-16 items-center justify-between">
          <ViseCraftMark />
          <Link className="text-sm text-[var(--text-dim)] hover:text-[var(--text)]" href="/">
            Home
          </Link>
        </div>
      </header>
      <section className="content-rail max-w-3xl py-14">
        <p className="mono-label text-[var(--jade)]">ViseCraft</p>
        <h1 className="mt-4 text-5xl font-semibold">{title}</h1>
        <p className="mt-5 leading-7 text-[var(--text-dim)]">{intro}</p>
        <div className="mt-10 space-y-8">{children}</div>
      </section>
    </main>
  );
}

function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-[var(--line)] pt-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-3 leading-7 text-[var(--text-dim)]">{children}</p>
    </section>
  );
}
