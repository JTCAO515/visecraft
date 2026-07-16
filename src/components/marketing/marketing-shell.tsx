"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ActionLink } from "@/components/marketing/marketing-primitives";
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
      <header className="floating-page-header">
        <div className="content-rail material-chrome flex h-14 items-center justify-between px-4">
          <ViseCraftMark />
          <nav className="hidden items-center gap-8 text-sm text-[var(--text-dim)] lg:flex" aria-label={copy.a11y.primaryNavigation}>
            {copy.navItems.map((item) => (
              <a key={item.href} className="floating-nav-link" href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitch compact />
            <Link
              className="floating-nav-link pressable text-sm text-[var(--text-dim)] hover:text-[var(--text)]"
              href="/login"
              onClick={() => trackEvent("sign_in_click")}
            >
              {copy.actions.signIn}
            </Link>
            <ActionLink
              href="/signup"
              onClick={() => trackEvent("get_started_click", { surface: "nav" })}
            >
              {copy.actions.getStarted}
            </ActionLink>
          </div>
          <button
            aria-expanded={mobileOpen}
            aria-label={copy.a11y.toggleNavigation}
            className="pressable inline-flex size-10 items-center justify-center border border-[var(--line-hi)] text-[var(--text)] lg:hidden"
            onClick={() => setMobileOpen((value) => !value)}
            style={{ borderRadius: "8px" }}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        {mobileOpen ? (
          <div className="content-rail material-thick mt-2 lg:hidden">
            <nav className="flex flex-col px-4 py-3 text-sm text-[var(--text-dim)]">
              {copy.navItems.map((item) => (
                <a
                  key={item.href}
                  className="pressable-row border-b border-[var(--line)] py-3"
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="grid gap-3 pt-4">
                <div className="flex items-center justify-between gap-3">
                  <LanguageSwitch compact />
                  <Link className="text-[var(--text)]" href="/login" onClick={() => trackEvent("sign_in_click")}>
                    {copy.actions.signIn}
                  </Link>
                </div>
                <ActionLink
                  href="/signup"
                  onClick={() => {
                    setMobileOpen(false);
                    trackEvent("get_started_click", { surface: "mobile_nav" });
                  }}
                >
                  {copy.actions.getStarted}
                </ActionLink>
              </div>
            </nav>
          </div>
        ) : null}
      </header>
      {children}
      <footer className="border-t border-[var(--line)] bg-[var(--bg1)] py-8">
        <div className="content-rail flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <ViseCraftMark />
          <nav className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-[var(--text-dim)]" aria-label={copy.a11y.footerNavigation}>
            <a href="#proof-engine">{copy.footer[0]}</a>
            <a href="https://vp.jtcao.space" target="_blank" rel="noreferrer">
              {copy.footer[1]}
            </a>
            <Link href="/privacy">{copy.footer[2]}</Link>
            <Link href="/terms">{copy.footer[3]}</Link>
            <a href="mailto:hello@jtcao.space">{copy.footer[4]}</a>
            <Link href="/login">{copy.footer[5]}</Link>
          </nav>
          <p className="mono-label text-[var(--text-faint)]">{copy.footerCopyright}</p>
        </div>
      </footer>
    </>
  );
}
