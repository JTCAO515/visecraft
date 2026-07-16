import { MarketingShell } from "@/components/marketing/marketing-shell";

export const dynamic = "force-static";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[var(--bg0)] text-[var(--text)]">
      <MarketingShell>{children}</MarketingShell>
    </div>
  );
}
