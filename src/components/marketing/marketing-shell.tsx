"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { landingContent } from "@/content/landing";
import { trackEvent } from "@/lib/analytics/track";
import { useLocale } from "@/lib/i18n/use-locale";
import { LanguageSwitch } from "@/components/shared/language-switch";
import { ViseCraftMark } from "@/components/shared/logo";

export function MarketingShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { locale } = useLocale();
  const copy = landingContent[locale];

  if (pathname !== "/") {
    return children;
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[rgba(6,9,11,0.88)] backdrop-blur">
        <div className="content-rail flex h-16 items-center justify-between">
          <ViseCraftMark />
          <nav className="hidden items-center gap-8 text-sm text-[var(--text-dim)] lg:flex" aria-label="Primary">
            {copy.navItems.map((item) => (
              <a key={item.href} className="transition hover:text-[var(--text)]" href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitch compact />
            <Link
              className="text-sm text-[var(--text-dim)] transition hover:text-[var(--text)]"
              href="/login"
              onClick={() => trackEvent("sign_in_click")}
            >
              {copy.actions.signIn}
            </Link>
            <Link
              className="inline-flex h-10 items-center gap-2 border border-[var(--jade)] px-4 text-sm font-medium text-[var(--jade)] transition hover:bg-[rgba(52,211,153,0.1)]"
              href="/signup"
              onClick={() => trackEvent("get_started_click", { surface: "nav" })}
              style={{ borderRadius: "8px" }}
            >
              {copy.actions.getStarted} <ArrowRight size={16} />
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
              {copy.navItems.map((item) => (
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
                <LanguageSwitch compact />
                <Link className="text-[var(--text)]" href="/login" onClick={() => trackEvent("sign_in_click")}>
                  {copy.actions.signIn}
                </Link>
                <Link
                  className="border border-[var(--jade)] px-3 py-2 text-[var(--jade)]"
                  href="/signup"
                  onClick={() => trackEvent("get_started_click", { surface: "mobile_nav" })}
                  style={{ borderRadius: "8px" }}
                >
                  {copy.actions.getStarted}
                </Link>
              </div>
            </nav>
          </div>
        ) : null}
      </header>
      {children}
      <footer className="border-t border-[var(--line)] bg-[var(--bg1)] py-8">
        <div className="content-rail flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <ViseCraftMark />
          <nav className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-[var(--text-dim)]" aria-label="Footer">
            <a href="#proof-engine">{copy.footer[0]}</a>
            <a href="https://vp.jtcao.space" target="_blank" rel="noreferrer">
              {copy.footer[1]}
            </a>
            <Link href="/privacy">{copy.footer[2]}</Link>
            <Link href="/terms">{copy.footer[3]}</Link>
            <a href="mailto:hello@jtcao.space">{copy.footer[4]}</a>
            <Link href="/login">{copy.footer[5]}</Link>
          </nav>
          <p className="mono-label text-[var(--text-faint)]">© 2026 ViseCraft</p>
        </div>
      </footer>
    </>
  );
}
