import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
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
import client from "../../tina/__generated__/client";
import { logTinaFallback } from "@/lib/tina-fallback.mjs";
import {
  buildMetadata,
  getOrganizationJsonLd,
  getSiteUrl,
  getWebsiteJsonLd,
  siteConfig,
} from "@/lib/seo";
import "./globals.css";

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

const rootMetadata = buildMetadata({
  title: siteConfig.defaultTitle,
  description: siteConfig.description,
  path: "/",
  image: siteConfig.defaultOgImage,
})

export const metadata = {
  ...rootMetadata,
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: siteConfig.defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  applicationName: siteConfig.name,
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "education",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
}

const normalizeProgramForNavbar = (program) => {
  const title =
    typeof program?.title === "string" ? program.title.trim() : "";
  const filename =
    typeof program?._sys?.filename === "string" ? program._sys.filename : "";
  const slugFromFilename = filename.replace(/\.json$/i, "").trim();
  const slug =
    typeof program?.slug === "string" && program.slug.trim()
      ? program.slug.trim()
      : slugFromFilename;
  const order = Number(program?.order);

  if (!title || !slug) return null;

  return {
    title,
    slug,
    showInNavbar: program?.showInNavbar !== false,
    order: Number.isFinite(order) ? order : 999,
  };
};

const sortPrograms = (programs) =>
  programs
    .filter((program) => program.showInNavbar)
    .sort((a, b) => a.order - b.order);

const loadProgramsFromContentFiles = async () => {
  const programsDir = path.join(process.cwd(), "content", "program-pages");
  try {
    const entries = await readdir(programsDir, { withFileTypes: true });
    const files = entries.filter(
      (entry) => entry.isFile() && entry.name.endsWith(".json"),
    );

    const parsedPrograms = await Promise.all(
      files.map(async (file) => {
        try {
          const filePath = path.join(programsDir, file.name);
          const raw = await readFile(filePath, "utf8");
          const json = JSON.parse(raw);
          return normalizeProgramForNavbar({
            ...json,
            _sys: { filename: file.name },
          });
        } catch (error) {
          console.error(`Error reading program file ${file.name}:`, error);
          return null;
        }
      }),
    );

    return sortPrograms(parsedPrograms.filter(Boolean));
  } catch (error) {
    console.error("Error loading fallback program files:", error);
    return [];
  }
};

export default async function RootLayout({ children }) {
  const organizationJsonLd = getOrganizationJsonLd()
  const websiteJsonLd = getWebsiteJsonLd()

  // Fetch programs from Tina CMS
  let programs = [];
  try {
    const programsData = await client.queries.programPageConnection?.();
    const tinaPrograms =
      programsData?.data?.programPageConnection?.edges
        ?.map((edge) => normalizeProgramForNavbar(edge?.node))
        .filter(Boolean) || [];
    programs = sortPrograms(tinaPrograms);
  } catch (error) {
    logTinaFallback("layout-navbar-programs", error);
  }

  // Guaranteed fallback when Tina is unavailable/misconfigured.
  if (programs.length === 0) {
    programs = await loadProgramsFromContentFiles();
  }

  return (
    <html lang='en'>
      <body
        className={`${inter.variable} ${geistMono.variable} ${montserrat.variable} ${onest.variable} ${raleway.variable} ${lexend.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
        <Navbar programs={programs} />
        {children}
        <FooterR />
      </body>
    </html>
  );
}
