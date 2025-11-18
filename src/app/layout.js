import { Inter, Geist_Mono,Montserrat,Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar.js";
import FooterR from "@/components/FooterR.js";

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
