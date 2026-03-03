import { prisma } from "@/lib/prisma.mjs"
import { loadJsonCollection } from "@/lib/content-loader.mjs"
import { logError } from "@/lib/logger.mjs"

function normalizeProgramFromContent(program) {
  const title =
    typeof program?.title === "string" ? program.title.trim() : ""
  const filename =
    typeof program?._sys?.filename === "string" ? program._sys.filename : ""
  const slugFromFilename = filename.replace(/\.json$/i, "").trim()
  const slug =
    typeof program?.slug === "string" && program.slug.trim()
      ? program.slug.trim()
      : slugFromFilename
  const order = Number(program?.order)

  if (!title || !slug) return null

  return {
    slug,
    title,
    isOpen: program?.showInNavbar !== false,
    order: Number.isFinite(order) ? order : 999,
  }
}

export async function loadProgramsFromContent() {
  const records = await loadJsonCollection("program-pages")
  return records
    .map((program) => normalizeProgramFromContent(program))
    .filter(Boolean)
    .sort((a, b) => a.order - b.order)
}

export async function listOpenPrograms() {
  try {
    const dbPrograms = await prisma.program.findMany({
      where: { isOpen: true },
      select: { id: true, slug: true, title: true, isOpen: true },
      orderBy: { title: "asc" },
    })

    if (dbPrograms.length > 0) {
      return dbPrograms
    }
  } catch (error) {
    logError("programs_list_db_failed", error)
  }

  const contentPrograms = await loadProgramsFromContent()
  return contentPrograms.filter((program) => program.isOpen)
}

export async function getProgramBySlug(slug) {
  const normalizedSlug = String(slug || "").trim().toLowerCase()
  if (!normalizedSlug) return null

  try {
    const dbProgram = await prisma.program.findUnique({
      where: { slug: normalizedSlug },
      select: { id: true, slug: true, title: true, isOpen: true },
    })
    if (dbProgram) return dbProgram
  } catch (error) {
    logError("program_get_by_slug_db_failed", error, { slug: normalizedSlug })
  }

  const contentPrograms = await loadProgramsFromContent()
  const matched = contentPrograms.find(
    (program) => program.slug.toLowerCase() === normalizedSlug,
  )
  return matched || null
}

export async function ensureProgramRecord(slug) {
  const normalizedSlug = String(slug || "").trim().toLowerCase()
  if (!normalizedSlug) return null

  try {
    const existing = await prisma.program.findUnique({
      where: { slug: normalizedSlug },
      select: { id: true, slug: true, title: true, isOpen: true },
    })
    if (existing) return existing
  } catch (error) {
    logError("program_ensure_lookup_failed", error, { slug: normalizedSlug })
  }

  const contentProgram = await getProgramBySlug(normalizedSlug)
  if (!contentProgram) return null

  try {
    return await prisma.program.upsert({
      where: { slug: normalizedSlug },
      update: {
        title: contentProgram.title,
        isOpen: contentProgram.isOpen !== false,
      },
      create: {
        slug: normalizedSlug,
        title: contentProgram.title,
        isOpen: contentProgram.isOpen !== false,
      },
      select: { id: true, slug: true, title: true, isOpen: true },
    })
  } catch (error) {
    logError("program_ensure_upsert_failed", error, { slug: normalizedSlug })
    return null
  }
}

