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
    default: "ViseCraft - Verifiable, Living Project Stories",
    template: "%s | ViseCraft",
  },
  description:
    "ViseCraft transforms real project progress into interactive, verifiable and continuously updated living BPs, project stories and investor updates.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ViseCraft - Verifiable, Living Project Stories",
    description:
      "Turn real project progress into interactive living BPs and project stories, verified at claim level by ViseCraft Proof Engine.",
    url: "/",
    siteName: "ViseCraft",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ViseCraft - Verifiable, Living Project Stories",
    description:
      "Interactive living BPs and project stories, verified at claim level by ViseCraft Proof Engine.",
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
