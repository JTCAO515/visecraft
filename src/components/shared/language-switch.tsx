"use client";

import { Languages } from "lucide-react";
import { localeLabels, type Locale } from "@/content/landing";
import { useLocale } from "@/lib/i18n/use-locale";

export function LanguageSwitch({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useLocale();
  const options: Locale[] = ["en", "zh"];

  return (
    <div
      aria-label="Language switcher"
      className="inline-flex items-center gap-1 border border-[var(--line-hi)] bg-[var(--bg2)] p-1"
      role="group"
      style={{ borderRadius: "8px" }}
    >
      {!compact ? <Languages size={14} className="ml-2 text-[var(--text-faint)]" aria-hidden="true" /> : null}
      {options.map((option) => (
        <button
          aria-pressed={locale === option}
          className="pressable h-8 px-2.5 text-xs font-medium transition"
          key={option}
          onClick={() => setLocale(option)}
          style={{
            color: locale === option ? "var(--bg0)" : "var(--text-dim)",
            background: locale === option ? "var(--jade)" : "transparent",
            borderRadius: "6px",
          }}
          type="button"
        >
          {localeLabels[option]}
        </button>
      ))}
    </div>
  );
}
