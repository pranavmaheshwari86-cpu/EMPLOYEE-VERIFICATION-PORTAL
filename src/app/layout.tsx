import type { Metadata, Viewport } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "AETHERIS — AI-Powered Employee Verification Ecosystem",
  description:
    "The world's first AI-native employee verification ecosystem. Companies hire through proof of skill, project intelligence, and real-world capability.",
  keywords: [
    "AI hiring",
    "employee verification",
    "talent intelligence",
    "recruitment platform",
    "skill verification",
    "AI recruitment",
  ],
  authors: [{ name: "AETHERIS Platform" }],
  openGraph: {
    title: "AETHERIS — Verified Talent for the AI Era",
    description:
      "The world's first AI-native employee verification ecosystem where companies hire through proof.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AETHERIS — Verified Talent for the AI Era",
    description:
      "AI-native employee verification ecosystem. Hire through proof.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#030712",
  width: "device-width",
  initialScale: 1,
};

import { AIWidgetWrapper as AIWidget } from "@/components/ui/ai-widget-wrapper";
import { Toaster } from "react-hot-toast";
import { GlobalBackground } from "@/components/effects/GlobalBackground";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Barlow:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&family=Almarai:wght@300;400;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body noise-overlay">
        <GlobalBackground />
        {children}
        <AIWidget />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: "20px",
              background: "#1a1a1a",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.1)",
              fontSize: "14px",
            },
          }}
        />
      </body>
    </html>
  );
}
