import { readdir, readFile } from "node:fs/promises"
import path from "node:path"

export async function loadCollectionDocument(collection, fileName, rootKey) {
  const filePath = path.join(process.cwd(), "content", collection, fileName)
  try {
    const raw = await readFile(filePath, "utf8")
    const json = JSON.parse(raw)
    return rootKey ? { [rootKey]: json } : json
  } catch (error) {
    console.error(
      `[content-loader] Failed to load content/${collection}/${fileName}:`,
      error,
    )
    return rootKey ? { [rootKey]: {} } : {}
  }
}

export async function loadSingletonPage({ collection, fileName, rootKey }) {
  const data = await loadCollectionDocument(collection, fileName, rootKey)
  return {
    data,
    query: {},
    variables: { relativePath: fileName },
  }
}

export async function loadJsonCollection(collection) {
  const directory = path.join(process.cwd(), "content", collection)
  try {
    const entries = await readdir(directory, { withFileTypes: true })
    const files = entries.filter(
      (entry) => entry.isFile() && entry.name.endsWith(".json"),
    )

    const records = await Promise.all(
      files.map(async (file) => {
        try {
          const filePath = path.join(directory, file.name)
          const raw = await readFile(filePath, "utf8")
          const json = JSON.parse(raw)
          return {
            ...json,
            _sys: { filename: file.name },
          }
        } catch (error) {
          console.error(
            `[content-loader] Failed to parse content/${collection}/${file.name}:`,
            error,
          )
          return null
        }
      }),
    )

    return records.filter(Boolean)
  } catch (error) {
    console.error(
      `[content-loader] Failed to list collection content/${collection}:`,
      error,
    )
    return []
  }
}

