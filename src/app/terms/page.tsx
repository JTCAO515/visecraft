import type { Metadata } from "next";
import Link from "next/link";
import { ViseCraftMark } from "@/components/shared/logo";

export const metadata: Metadata = {
  title: "Terms",
  description: "ViseCraft early access terms overview.",
};

export default function TermsPage() {
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
        <h1 className="mt-4 text-5xl font-semibold">Terms</h1>
        <p className="mt-5 leading-7 text-[var(--text-dim)]">
          These early access terms are a product placeholder, not a final commercial contract. They exist so the landing page does not point to a dead link.
        </p>
        {[
          ["Early access", "ViseCraft v1.0.4 is an MVP surface for product validation, investor demos and early user interviews."],
          ["No fabricated evidence", "Users are responsible for reviewing generated narratives and keeping published project claims accurate."],
          ["Repository data", "Connecting a repository should be treated as a separate authorization step from account login."],
          ["Commercial plans", "Pricing is marked as preview until a formal plan is published."],
        ].map(([title, body]) => (
          <section key={title} className="mt-8 border-t border-[var(--line)] pt-6">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="mt-3 leading-7 text-[var(--text-dim)]">{body}</p>
          </section>
        ))}
      </section>
    </main>
  );
}
