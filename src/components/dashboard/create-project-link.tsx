"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics/track";
import { useLocale } from "@/lib/i18n/use-locale";

export function CreateProjectLink({ surface }: { surface: string }) {
  const { locale } = useLocale();

  return (
    <Link
      className="inline-flex h-11 items-center gap-2 bg-[var(--jade)] px-4 text-sm font-semibold text-[#04100b]"
      href="/app/projects/new"
      onClick={() => trackEvent("project_creation_click", { surface })}
      style={{ borderRadius: "8px" }}
    >
      {locale === "zh" ? "创建项目" : "Create project"} <ArrowRight size={16} />
    </Link>
  );
}
