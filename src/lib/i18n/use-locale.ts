"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { type Locale } from "@/content/landing";

const storageKey = "visecraft_locale";
const localeEvent = "visecraft-locale-change";

function normalizeLocale(value: string | null): Locale {
  return value === "zh" ? "zh" : "en";
}

export function useLocale() {
  const locale = useSyncExternalStore<Locale>(
    (notify) => {
      window.addEventListener(localeEvent, notify);
      window.addEventListener("storage", notify);
      return () => {
        window.removeEventListener(localeEvent, notify);
        window.removeEventListener("storage", notify);
      };
    },
    () => normalizeLocale(window.localStorage.getItem(storageKey)),
    () => "en" as Locale,
  );

  const setLocale = useCallback((nextLocale: Locale) => {
    window.localStorage.setItem(storageKey, nextLocale);
    window.dispatchEvent(new CustomEvent(localeEvent, { detail: nextLocale }));
    document.documentElement.lang = nextLocale === "zh" ? "zh-CN" : "en";
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  }, [locale]);

  return { locale, setLocale };
}
