import { readdir, stat } from "node:fs/promises"
import path from "node:path"
import { getSiteUrl } from "@/lib/seo"

const STATIC_ROUTES = [
  { path: "/", changeFrequency: "weekly", priority: "1.0" },
  { path: "/about", changeFrequency: "monthly", priority: "0.8" },
  { path: "/blog", changeFrequency: "weekly", priority: "0.8" },
  { path: "/careers", changeFrequency: "weekly", priority: "0.7" },
  { path: "/contact", changeFrequency: "monthly", priority: "0.7" },
  { path: "/donate", changeFrequency: "monthly", priority: "0.8" },
  { path: "/faqs", changeFrequency: "monthly", priority: "0.7" },
  { path: "/gallery", changeFrequency: "weekly", priority: "0.7" },
  { path: "/getinvolved", changeFrequency: "weekly", priority: "0.8" },
  { path: "/partnerships", changeFrequency: "monthly", priority: "0.8" },
  { path: "/press", changeFrequency: "weekly", priority: "0.7" },
  { path: "/resources", changeFrequency: "weekly", priority: "0.8" },
  { path: "/teams", changeFrequency: "monthly", priority: "0.7" },
  { path: "/testimonies", changeFrequency: "monthly", priority: "0.7" },
  { path: "/terms", changeFrequency: "yearly", priority: "0.4" },
  { path: "/privacy", changeFrequency: "yearly", priority: "0.4" },
]

async function loadCollectionSlugs(collectionDir) {
  const absoluteDir = path.join(process.cwd(), "content", collectionDir)
  try {
    const entries = await readdir(absoluteDir, { withFileTypes: true })
    const files = entries.filter(
      (entry) => entry.isFile() && entry.name.endsWith(".json"),
    )

    const records = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(absoluteDir, file.name)
        const fileStat = await stat(filePath)
        return {
          slug: file.name.replace(".json", ""),
          lastModified: fileStat.mtime.toISOString(),
        }
      }),
    )

    return records
  } catch (error) {
    console.error(`[sitemap] Unable to load ${collectionDir} slugs:`, error)
    return []
  }
}

function toSitemapEntry({ loc, lastmod, changefreq, priority }) {
  return [
    "  <url>",
    `    <loc>${loc}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ].join("\n")
}

export async function generateSitemapXml() {
  const siteUrl = getSiteUrl()
  const nowIso = new Date().toISOString()

  const [programSlugs, blogSlugs] = await Promise.all([
    loadCollectionSlugs("program-pages"),
    loadCollectionSlugs("blog-posts"),
  ])

  const staticEntries = STATIC_ROUTES.map((route) =>
    toSitemapEntry({
      loc: `${siteUrl}${route.path}`,
      lastmod: nowIso,
      changefreq: route.changeFrequency,
      priority: route.priority,
    }),
  )

  const programEntries = programSlugs.map((program) =>
    toSitemapEntry({
      loc: `${siteUrl}/programs/${program.slug}`,
      lastmod: program.lastModified || nowIso,
      changefreq: "monthly",
      priority: "0.75",
    }),
  )

  const blogEntries = blogSlugs.map((post) =>
    toSitemapEntry({
      loc: `${siteUrl}/blogdetails/${post.slug}`,
      lastmod: post.lastModified || nowIso,
      changefreq: "monthly",
      priority: "0.70",
    }),
  )

  const urlSet = [...staticEntries, ...programEntries, ...blogEntries].join("\n")

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urlSet,
    "</urlset>",
  ].join("\n")
}

