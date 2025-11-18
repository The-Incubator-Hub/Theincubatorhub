<<<<<<< HEAD
<<<<<<< HEAD
import { Inter, Geist, Geist_Mono, Montserrat, Onest, Raleway, Lexend } from "next/font/google";
=======
import { Inter, Geist_Mono } from "next/font/google";
>>>>>>> origin/main
=======
import { Inter, Geist_Mono } from "next/font/google";
>>>>>>> e2b131b068bd36b6614045899791147ef1f19d04
import "./globals.css";
import Navbar from "@/components/Navbar.js";
import FooterR from "@/components/FooterR.js";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

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
  title: "Incubator",
  description: "Incubator is a technology company that provide technical training services to individual",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <FooterR />
      </body>
    </html>
  );
}
