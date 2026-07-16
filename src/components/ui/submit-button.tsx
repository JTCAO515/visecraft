import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Spinner } from "@/components/ui/loading";

export function SubmitButton({
  loading = false,
  loadingLabel = "Submitting",
  children,
  className = "",
  disabled,
  ...buttonProps
}: {
  loading?: boolean;
  loadingLabel?: string;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...buttonProps}
      aria-busy={loading}
      className={`pressable flex h-12 w-full items-center justify-center gap-2 bg-[var(--jade)] text-sm font-semibold text-[#04100b] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      disabled={disabled || loading}
      style={{ borderRadius: "var(--radius-sm)" }}
      type={buttonProps.type ?? "submit"}
    >
      {loading ? <Spinner label="" /> : null}
      {loading ? loadingLabel : children}
    </button>
  );
}
