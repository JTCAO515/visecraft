import { requireAuthenticatedUser } from "@/lib/auth/user";

export const dynamic = "force-dynamic";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireAuthenticatedUser();

  return <div className="min-h-screen bg-[var(--bg0)] text-[var(--text)]">{children}</div>;
}
