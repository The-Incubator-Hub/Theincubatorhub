
import { Inter, Geist_Mono, Montserrat, Onest, Raleway, Lexend } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar.js";
import FooterR from "@/components/FooterR.js";
import client from "../../tina/__generated__/client";

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

export default async function RootLayout({ children }) {
  // Fetch programs from Tina CMS
  let programs = []
  try {
    const programsData = await client.queries.programPageConnection()
    programs = programsData.data.programPageConnection.edges
      .map(edge => ({
        title: edge.node.title,
        slug: edge.node.slug || edge.node._sys.filename.replace('.json', ''),
        showInNavbar: edge.node.showInNavbar !== false, // default to true
        order: edge.node.order || 999
      }))
      .filter(program => program.showInNavbar)
      .sort((a, b) => a.order - b.order)
  } catch (error) {
    console.error("Error fetching programs for navbar:", error)
  }

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistMono.variable} ${montserrat.variable} antialiased`}
      >
        <Navbar programs={programs} />
        {children}
        <FooterR />
      </body>
    </html>
  );
}
