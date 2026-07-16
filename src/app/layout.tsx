import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vc.jtcao.space";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ViseCraft - Evidence for Projects in Motion",
    template: "%s | ViseCraft",
  },
  description:
    "ViseCraft connects project activity, founder review and claim-level verification in one continuously updated evidence record.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ViseCraft - Evidence for Projects in Motion",
    description:
      "Connect project activity, founder review and claim-level verification in one evidence record.",
    url: "/",
    siteName: "ViseCraft",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ViseCraft - Evidence for Projects in Motion",
    description:
      "Project activity, founder review and claim-level verification in one evidence record.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
