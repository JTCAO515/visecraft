"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics/track";

export function CreateProjectLink({ surface }: { surface: string }) {
  return (
    <Link
      className="inline-flex h-11 items-center gap-2 bg-[var(--jade)] px-4 text-sm font-semibold text-[#04100b]"
      href="/app/projects/new"
      onClick={() => trackEvent("project_creation_click", { surface })}
      style={{ borderRadius: "8px" }}
    >
      Create project <ArrowRight size={16} />
    </Link>
  );
}
