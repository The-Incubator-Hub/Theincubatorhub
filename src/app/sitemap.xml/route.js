import { generateSitemapXml } from "@/lib/sitemap"

export async function GET() {
  const body = await generateSitemapXml()

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  })
}

