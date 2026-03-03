import ProgramPageClient from "./ProgramPageClient"
import client from "../../../../tina/__generated__/client"
import { notFound } from "next/navigation"
import { readdir, readFile } from "node:fs/promises"
import path from "node:path"
import { logTinaFallback } from "@/lib/tina-fallback.mjs"
import {
  buildMetadata,
  getSiteUrl,
  siteConfig,
  titleFromSlug,
  toAbsoluteUrl,
} from "@/lib/seo"

const PROGRAMS_DIR = path.join(process.cwd(), "content", "program-pages")

const deriveProgramSlug = (program, filename = "") =>
  (typeof program?.slug === "string" && program.slug.trim()) ||
  filename.replace(".json", "")

const getProgramImage = (program) => {
  const image = program?.programHeader?.images?.[0]?.src
  if (typeof image === "string" && image.trim()) {
    return image
  }
  return siteConfig.defaultOgImage
}

async function loadProgramsFromFiles() {
  try {
    const entries = await readdir(PROGRAMS_DIR, { withFileTypes: true })
    const files = entries.filter(
      (entry) => entry.isFile() && entry.name.endsWith(".json"),
    )

    const programs = await Promise.all(
      files.map(async (file) => {
        try {
          const filePath = path.join(PROGRAMS_DIR, file.name)
          const raw = await readFile(filePath, "utf8")
          const json = JSON.parse(raw)
          return {
            ...json,
            _sys: { filename: file.name },
            slug: deriveProgramSlug(json, file.name),
          }
        } catch (error) {
          console.error(`Error parsing program file ${file.name}:`, error)
          return null
        }
      }),
    )

    return programs.filter(Boolean)
  } catch (error) {
    console.error("Error loading local program files:", error)
    return []
  }
}

async function getProgramPageDataBySlug(slug, context = "programs-page-fetch") {
  let data = {}
  let query = {}
  let variables = {}

  try {
    // First, get all programs to find the one with matching slug
    const programsListData = await client.queries.programPageConnection()
    const program = programsListData.data.programPageConnection.edges.find(
      (edge) =>
        (edge.node.slug || edge.node._sys.filename.replace(".json", "")) ===
        slug,
    )

    if (program) {
      const relativePath = `${program.node._sys.filename}`
      variables = { relativePath }
      const res = await client.queries.programPage(variables)
      query = res.query
      data = res.data
      variables = res.variables
    }
  } catch (error) {
    logTinaFallback(context, error)
  }

  if (!data?.programPage) {
    // Fallback: read matching program JSON directly from content files.
    const localPrograms = await loadProgramsFromFiles()
    const localProgram = localPrograms.find((program) => program.slug === slug)

    if (!localProgram) {
      return null
    }

    data = { programPage: localProgram }
  }

  return { data, query, variables }
}

export async function generateStaticParams() {
  try {
    const programsListData = await client.queries.programPageConnection()
    return programsListData.data.programPageConnection.edges.map((program) => ({
      slug: program.node.slug || program.node._sys.filename.replace(".json", ""),
    }))
  } catch (error) {
    logTinaFallback("programs-generate-static-params", error)
    const localPrograms = await loadProgramsFromFiles()
    return localPrograms.map((program) => ({
      slug: program.slug,
    }))
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const result = await getProgramPageDataBySlug(slug, "programs-metadata-fetch")

  if (!result?.data?.programPage) {
    return buildMetadata({
      title: titleFromSlug(slug),
      description: "Program page",
      path: `/programs/${slug}`,
      noIndex: true,
    })
  }

  const program = result.data.programPage
  const title = program?.programHeader?.title || program?.title || titleFromSlug(slug)
  const description =
    program?.programHeader?.description ||
    `Explore ${title} by The Incubator Hub.`
  const image = getProgramImage(program)
  const trackKeywords = (program?.programHeader?.programs || [])
    .map((track) => track?.name || track)
    .filter(Boolean)

  return buildMetadata({
    title,
    description,
    path: `/programs/${program.slug || slug}`,
    image,
    keywords: ["Programs", "Bootcamp", ...trackKeywords],
  })
}

export default async function ProgramPage({ params }) {
  const { slug } = await params
  const result = await getProgramPageDataBySlug(slug)

  if (!result?.data?.programPage) {
    notFound()
  }

  const { data, query, variables } = result
  const program = data.programPage
  const title = program?.programHeader?.title || program?.title || titleFromSlug(slug)
  const description =
    program?.programHeader?.description ||
    `Explore ${title} by The Incubator Hub.`
  const image = getProgramImage(program)
  const programUrl = toAbsoluteUrl(`/programs/${program.slug || slug}`)

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: title,
    description,
    url: programUrl,
    image: [image.startsWith("http") ? image : toAbsoluteUrl(image)],
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      sameAs: getSiteUrl(),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <ProgramPageClient
        initialData={data}
        query={query}
        variables={variables}
      />
    </>
  )
}

