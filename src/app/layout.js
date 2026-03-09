import FooterR from "@/components/Footer.js";
import Navbar from "@/components/Navbar.js";
import {
  Geist_Mono,
  Inter,
  Lexend,
  Montserrat,
  Onest,
  Raleway,
} from "next/font/google";
import "./globals.css";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "The Incubator Hub — Empowering Africa's Tech Future",
  description:
    "The Incubator Hub provides world-class tech training programs to empower individuals across Africa with digital skills.",
  manifest: "/manifest.json",
  themeColor: "#1a1a2e",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "IncubatorHub",
  },
  openGraph: {
    title: "The Incubator Hub",
    description: "Empowering Africa's Tech Future",
    url: "https://theincubatorhub.org",
    siteName: "The Incubator Hub",
    type: "website",
  },
};

function loadPrograms() {
  try {
    const dir = join(process.cwd(), "content", "program-pages");
    const { readdirSync } = require("node:fs");
    const files = readdirSync(dir).filter((f) => f.endsWith(".json"));
    return files
      .map((f) => {
        try {
          const raw = readFileSync(join(dir, f), "utf-8");
          const data = JSON.parse(raw);
          return {
            title: data.title,
            slug: data.slug || f.replace(".json", ""),
            showInNavbar: data.showInNavbar !== false,
            order: data.order || 999,
          };
        } catch {
          return null;
        }
      })
      .filter(Boolean)
      .filter((p) => p.showInNavbar)
      .sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error("Error loading programs for navbar:", error);
    return [];
  }
}

export default async function RootLayout({ children }) {
  const programs = loadPrograms();

  // Get session for auth-aware navbar
  let session = null;
  try {
    const { getAuthSession } = await import("@/lib/auth.mjs");
    session = await getAuthSession();
  } catch {
    // Session loading is optional — navbar degrades gracefully
  }

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1a1a2e" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body
        className={`${inter.variable} ${geistMono.variable} ${montserrat.variable} ${onest.variable} ${raleway.variable} ${lexend.variable} antialiased`}
      >
        <Navbar programs={programs} session={session} />
        {children}
        <FooterR />
      </body>
    </html>
  );
}
