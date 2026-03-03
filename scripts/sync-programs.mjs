import { readdir, readFile } from "node:fs/promises"
import path from "node:path"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const baseDir = path.join(process.cwd(), "content", "program-pages")
  const entries = await readdir(baseDir, { withFileTypes: true })
  const jsonFiles = entries.filter(
    (entry) => entry.isFile() && entry.name.endsWith(".json"),
  )

  for (const file of jsonFiles) {
    const raw = await readFile(path.join(baseDir, file.name), "utf8")
    const json = JSON.parse(raw)
    const slug =
      (typeof json.slug === "string" && json.slug.trim()) ||
      file.name.replace(".json", "")
    const title =
      (typeof json.title === "string" && json.title.trim()) || slug

    await prisma.program.upsert({
      where: { slug },
      update: {
        title,
        isOpen: json.showInNavbar !== false,
      },
      create: {
        slug,
        title,
        isOpen: json.showInNavbar !== false,
      },
    })
  }

  console.info(`Synced ${jsonFiles.length} program records.`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

