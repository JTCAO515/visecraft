export const revalidate = 300;

export default function PublicProjectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="min-h-screen bg-[var(--bg0)] text-[var(--text)]">{children}</div>;
}
