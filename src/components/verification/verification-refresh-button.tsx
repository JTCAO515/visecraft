"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/toast";

export function VerificationRefreshButton() {
  const router = useRouter();
  const { toast } = useToast();
  const [pending, startTransition] = useTransition();

  function refreshVerification() {
    startTransition(() => {
      router.refresh();
    });
    toast({
      title: "Verification refresh started",
      description: "The report is being rebuilt from the latest evidence available to this project.",
      tone: "info",
    });
  }

  return (
    <button
      aria-busy={pending}
      className="inline-flex h-9 items-center gap-2 border border-[var(--line-hi)] px-3 text-sm text-[var(--blue)] disabled:cursor-wait disabled:opacity-60"
      disabled={pending}
      onClick={refreshVerification}
      style={{ borderRadius: "var(--radius-sm)" }}
      type="button"
    >
      <RefreshCw aria-hidden="true" className={pending ? "animate-spin" : ""} size={14} />
      {pending ? "Refreshing" : "Re-run verification"}
    </button>
  );
}
