import ProgramPageClient from "./ProgramPageClient"
import client from "../../../../tina/__generated__/client"
import { notFound } from "next/navigation"
import { readdir, readFile } from "node:fs/promises"
import path from "node:path"
import { logTinaFallback } from "@/lib/tina-fallback.mjs"

const PROGRAMS_DIR = path.join(process.cwd(), "content", "program-pages")

const deriveProgramSlug = (program, filename = "") =>
  (typeof program?.slug === "string" && program.slug.trim()) ||
  filename.replace(".json", "")

async function loadProgramsFromFiles() {
  try {
    const entries = await readdir(PROGRAMS_DIR, { withFileTypes: true })
    const files = entries.filter(
      (entry) => entry.isFile() && entry.name.endsWith(".json")
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
      })
    )

    return programs.filter(Boolean)
  } catch (error) {
    console.error("Error loading local program files:", error)
    return []
  }
}

export async function generateStaticParams() {
  try {
    const programsListData = await client.queries.programPageConnection()
    return programsListData.data.programPageConnection.edges.map((program) => ({
      slug: program.node.slug || program.node._sys.filename.replace('.json', ''),
    }))
  } catch (error) {
    logTinaFallback("programs-generate-static-params", error)
    const localPrograms = await loadProgramsFromFiles()
    return localPrograms.map((program) => ({
      slug: program.slug,
    }))
  }
}

export default async function ProgramPage({ params }) {
  let data = {}
  let query = {}
  let variables = {}

  try {
    // Get the slug from params
    const slug = params.slug
    
    // First, get all programs to find the one with matching slug
    const programsListData = await client.queries.programPageConnection()
    const program = programsListData.data.programPageConnection.edges.find(
      (edge) => (edge.node.slug || edge.node._sys.filename.replace('.json', '')) === slug
    )

    if (!program) {
      notFound()
    }

    const relativePath = `${program.node._sys.filename}`
    variables = { relativePath }
    const res = await client.queries.programPage(variables)
    query = res.query
    data = res.data
    variables = res.variables
  } catch (error) {
    logTinaFallback("programs-page-fetch", error)

    // Fallback: read matching program JSON directly from content files.
    const slug = params.slug
    const localPrograms = await loadProgramsFromFiles()
    const localProgram = localPrograms.find((program) => program.slug === slug)

    if (!localProgram) {
      notFound()
    }

    data = { programPage: localProgram }
  }

  if (!data?.programPage) {
    notFound()
  }

  return (
    <ProgramPageClient 
      initialData={data}
      query={query}
      variables={variables}
    />
  )
}
