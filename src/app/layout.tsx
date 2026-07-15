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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://visecraft.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ViseCraft - Turn Project Progress Into an Investor-Ready Story",
    template: "%s | ViseCraft",
  },
  description:
    "ViseCraft turns real project activity into interactive living pitch pages, verified timelines and investor-ready updates.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ViseCraft - Turn Project Progress Into an Investor-Ready Story",
    description:
      "Create living pitch pages, verified timelines and investor-ready updates from real project progress.",
    url: "/",
    siteName: "ViseCraft",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ViseCraft - Turn Project Progress Into an Investor-Ready Story",
    description:
      "Interactive living pitch pages backed by real project evidence.",
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
