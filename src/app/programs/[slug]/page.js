import ProgramPageClient from "./ProgramPageClient"
import { notFound } from "next/navigation"
import {
  buildMetadata,
  getSiteUrl,
  siteConfig,
  titleFromSlug,
  toAbsoluteUrl,
} from "@/lib/seo"
import { loadJsonCollection } from "@/lib/content-loader.mjs"

const getProgramImage = (program) => {
  const image = program?.programHeader?.images?.[0]?.src
  if (typeof image === "string" && image.trim()) {
    return image
  }
  return siteConfig.defaultOgImage
}

async function loadPrograms() {
  const programs = await loadJsonCollection("program-pages")
  return programs.map((program) => ({
    ...program,
    slug:
      (typeof program?.slug === "string" && program.slug.trim()) ||
      String(program?._sys?.filename || "").replace(".json", ""),
  }))
}

async function getProgramBySlug(slug) {
  const programs = await loadPrograms()
  return programs.find((program) => program.slug === slug) || null
}

export async function generateStaticParams() {
  const programs = await loadPrograms()
  return programs.map((program) => ({ slug: program.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const program = await getProgramBySlug(slug)

  if (!program) {
    return buildMetadata({
      title: titleFromSlug(slug),
      description: "Program page",
      path: `/programs/${slug}`,
      noIndex: true,
    })
  }

  const title =
    program?.programHeader?.title || program?.title || titleFromSlug(slug)
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
    path: `/programs/${program.slug}`,
    image,
    keywords: ["Programs", "Bootcamp", ...trackKeywords],
  })
}

export default async function ProgramPage({ params }) {
  const { slug } = await params
  const program = await getProgramBySlug(slug)

  if (!program) {
    notFound()
  }

  const title =
    program?.programHeader?.title || program?.title || titleFromSlug(slug)
  const description =
    program?.programHeader?.description ||
    `Explore ${title} by The Incubator Hub.`
  const image = getProgramImage(program)
  const programUrl = toAbsoluteUrl(`/programs/${program.slug}`)

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
      <ProgramPageClient initialData={{ programPage: program }} />
    </>
  )
}

